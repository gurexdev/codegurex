// Static site generator for codegurex.com — zero dependencies.
// src/content (bilingual data) + src/templates → dist/
import { cp, copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { SITE, LANGS, ROUTES, LEGACY } from "./src/content/site.mjs";
import { SERVICES } from "./src/content/services.mjs";
import { WORK } from "./src/content/work.mjs";
import { MARK_PATH, servicePath, workPath, CSP } from "./src/templates/base.mjs";
import { home } from "./src/templates/home.mjs";
import { solutions, servicesIndex, serviceDetail } from "./src/templates/services.mjs";
import { workIndex, caseStudy } from "./src/templates/work.mjs";
import { technology, products, sentinel, about } from "./src/templates/company.mjs";
import { contact, privacy, notFound, redirectStub } from "./src/templates/contact.mjs";
import { blogIndex, article, articlePath, localLanding, localPath } from "./src/templates/blog.mjs";
import { ARTICLES } from "./src/content/articles.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");

async function write(path, content) {
  const file = path.endsWith("/") ? join(dist, path, "index.html") : join(dist, path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

// ---------- Pages ----------
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const pages = []; // { paths: {es,en}, priority, lastmod }
const add = (paths, priority, render, lastmod = BUILD_DATE) => {
  pages.push({ paths, priority, lastmod });
  return Promise.all(LANGS.map((lang) => write(paths[lang], render(lang))));
};

await add(ROUTES.home, "1.0", home);
await add(ROUTES.solutions, "0.8", solutions);
await add(ROUTES.services, "0.9", servicesIndex);
for (const service of SERVICES) {
  await add({ es: servicePath(service, "es"), en: servicePath(service, "en") }, "0.8", (lang) => serviceDetail(service, lang));
}
await add(ROUTES.work, "0.9", workIndex);
for (const item of WORK) {
  await add({ es: workPath(item, "es"), en: workPath(item, "en") }, "0.7", (lang) => caseStudy(item, lang));
}
await add(ROUTES.products, "0.7", products);
await add(ROUTES.sentinel, "0.7", sentinel);
await add(ROUTES.technology, "0.6", technology);
await add(ROUTES.about, "0.7", about);
await add(ROUTES.contact, "0.8", contact);
await add(ROUTES.privacy, "0.2", privacy);
await add(ROUTES.blog, "0.7", blogIndex);
for (const a of ARTICLES) {
  await add({ es: articlePath(a, "es"), en: articlePath(a, "en") }, "0.7", (lang) => article(a, lang), a.updated || a.published);
}
await add({ es: localPath("es"), en: localPath("en") }, "0.9", localLanding);
await write("404.html", notFound());

// ---------- Legacy URLs → new routes ----------
const legacyTarget = (value) => {
  if (typeof value === "string") return ROUTES[value].es;
  const [kind, id] = value;
  if (kind === "service") return servicePath(SERVICES.find((s) => s.id === id), "es");
  return workPath(WORK.find((w) => w.id === id), "es");
};
for (const [file, value] of Object.entries(LEGACY)) {
  await write(file, redirectStub(legacyTarget(value)));
}

// ---------- Sitemap (with hreflang alternates) ----------
const loc = (p) => `${SITE.origin}${p}`;
const urls = pages
  .flatMap(({ paths, priority, lastmod }) =>
    LANGS.map(
      (lang) => `  <url>
    <loc>${loc(paths[lang])}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${loc(paths.es)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${loc(paths.en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc(paths.en)}"/>
  </url>`,
    ),
  )
  .join("\n");
await write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
);
// llms.txt: a plain summary for AI search engines and assistants (GEO).
{
  const svc = (lang) => SERVICES.map((s) => `- [${s.name[lang]}](${SITE.origin}${servicePath(s, lang)}): ${s.short[lang]}`).join("\n");
  const cases = (lang) => WORK.map((w) => `- [${typeof w.name === "string" ? w.name : w.name[lang]}](${SITE.origin}${workPath(w, lang)}): ${w.summary[lang]}`).join("\n");
  await write(
    "llms.txt",
    `# CodeGurex

> CodeGurex is an independent software development and cybersecurity company founded in Manta, Ecuador. It designs, builds and secures websites, custom software, SaaS platforms, business systems and AI integrations, and performs authorized security assessments of web applications, APIs, AI systems and cloud infrastructure. Spanish and English. Contact: ${SITE.email}.

Every project on the site states its real status (in production, in development, planned) and the evidence behind it. No invented clients, metrics or certifications.

## Services (English)
${svc("en")}

## Servicios (español)
${svc("es")}

## Case studies
${cases("en")}

## Articles
${ARTICLES.map((a) => `- [${a.h1.en}](${SITE.origin}${articlePath(a, "en")}): ${a.description.en}`).join("\n")}

## Company
- [Software development company in Ecuador](${SITE.origin}${localPath("en")})
- [About](${SITE.origin}${ROUTES.about.en})
- [Products and CodeGurex Sentinel](${SITE.origin}${ROUTES.products.en})
- [Technology](${SITE.origin}${ROUTES.technology.en})
- [Contact](${SITE.origin}${ROUTES.contact.en})
`,
  );
}
// IndexNow key file (public by design) so search engines can verify our submissions.
{
  const { INDEXNOW_KEY } = await import("./scripts/indexnow.mjs");
  await write(`${INDEXNOW_KEY}.txt`, INDEXNOW_KEY);
}
await write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE.origin}/sitemap.xml\n`);

// ---------- Manifest, headers, brand mark ----------
await write(
  "site.webmanifest",
  JSON.stringify(
    {
      name: "CodeGurex",
      short_name: "CodeGurex",
      description: "Technology. Software. Security.",
      start_url: "/",
      display: "standalone",
      background_color: "#f4f5f7",
      theme_color: "#0a1120",
      icons: [
        { src: "/favicon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        { src: "/assets/mark.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      ],
    },
    null,
    2,
  ),
);
await write(
  "assets/mark.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#2350f5" d="${MARK_PATH}"/></svg>\n`,
);
// Applied by Cloudflare Pages-compatible edges; GitHub Pages ignores it (the CSP is also sent as <meta>).
await write(
  "_headers",
  `/*
  Content-Security-Policy: ${CSP}; frame-ancestors 'none'
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Referrer-Policy: strict-origin-when-cross-origin
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Cross-Origin-Opener-Policy: same-origin-allow-popups

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/assets/img/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*.css
  Cache-Control: public, max-age=604800

/assets/*.js
  Cache-Control: public, max-age=604800
`,
);

// ---------- Static assets ----------
await cp(join(root, "src/assets"), join(dist, "assets"), { recursive: true });
// Minify CSS (comments and whitespace only; safe for this hand-written stylesheet).
{
  const cssPath = join(dist, "assets/site.css");
  const css = await readFile(cssPath, "utf8");
  const min = css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
  await writeFile(cssPath, min);
}
for (const file of ["favicon.ico", "favicon-512.png", "CNAME", ".nojekyll"]) {
  await copyFile(join(root, file), join(dist, file));
}

console.log(`Build completed: ${pages.length * LANGS.length} pages, ${Object.keys(LEGACY).length} redirects → dist/`);
