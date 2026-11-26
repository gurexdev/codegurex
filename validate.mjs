// Static validation of the generated site (run after `node build.mjs`).
// Checks SEO metadata, hreflang reciprocity, links and assets, CSP compliance and basic accessibility.
import { readdir, readFile, access } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("./dist/", import.meta.url));
const ORIGIN = "https://codegurex.com";
const failures = [];
const fail = (file, msg) => failures.push(`${file}: ${msg}`);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}
const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  );

const files = (await walk(dist)).filter((f) => f.endsWith(".html"));
const pages = new Map(); // url path -> { file, html }
for (const file of files) {
  const html = await readFile(file, "utf8");
  const rel = "/" + relative(dist, file).replace(/\\/g, "/");
  const url = rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel;
  pages.set(url, { file: rel, html });
}

const titles = new Map();
const descriptions = new Map();
let checked = 0;

for (const [url, { file, html }] of pages) {
  const isRedirect = /http-equiv="refresh"/.test(html);
  const is404 = url === "/404.html";

  // Resolve local links and assets.
  for (const m of html.matchAll(/(?:src|href|srcset)="([^"]+)"/g)) {
    for (const candidate of m[1].split(",").map((s) => s.trim().split(" ")[0])) {
      if (!candidate || /^(https?:|mailto:|tel:|data:)/.test(candidate)) continue;
      if (candidate.startsWith("#")) {
        const id = candidate.slice(1);
        if (id && !new RegExp(`id="${id}"`).test(html)) fail(file, `broken fragment ${candidate}`);
        continue;
      }
      const path = decodeURIComponent(candidate.split(/[?#]/)[0]);
      const target = path.endsWith("/") ? join(dist, path, "index.html") : join(dist, path);
      if (!(await exists(target))) fail(file, `missing local target ${candidate}`);
    }
  }
  for (const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))
    if (!/rel="[^"]*noopener/.test(m[0])) fail(file, "target=_blank without rel=noopener");
  if (/href="#"/.test(html)) fail(file, 'placeholder href="#"');
  if (/\sstyle="/.test(html)) fail(file, "inline style attribute (blocked by CSP)");
  if (/\son[a-z]+="/i.test(html)) fail(file, "inline event handler (blocked by CSP)");
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const attrs = m[1];
    if (!/src=/.test(attrs) && !/type="application\/ld\+json"/.test(attrs)) fail(file, "inline executable script (blocked by CSP)");
    if (/type="application\/ld\+json"/.test(attrs)) {
      try {
        JSON.parse(m[2]);
      } catch {
        fail(file, "invalid JSON-LD");
      }
    }
  }
  // Retired assets must never come back (AI-generated imagery and excluded projects).
  if (/(?:src|href|srcset)="[^"]*(?:Phishing|Escaner|Gestor\.|MediDocs|Hospitalario|corevo|codefinan)/i.test(html)) fail(file, "references a retired asset");

  if (isRedirect) {
    if (!/rel="canonical"/.test(html)) fail(file, "redirect stub must have a canonical to its target");
    continue;
  }
  checked++;

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) fail(file, `duplicate ids: ${[...new Set(dup)].join(", ")}`);
  if (/<img(?![^>]*\salt=)[^>]*>/.test(html)) fail(file, "image without alt");
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) fail(file, "must contain exactly one <h1>");
  if (!/<html lang="(es|en)">/.test(html)) fail(file, "missing lang attribute");
  if (!/<main id="main">/.test(html) || !/class="skip" href="#main"/.test(html)) fail(file, "missing skip link / main landmark");
  if (!/http-equiv="Content-Security-Policy"/.test(html)) fail(file, "missing CSP meta");
  if ((html.match(/src="\/assets\/analytics\.js/g) || []).length !== 1) fail(file, "analytics bootstrap must load exactly once");
  if (!/<head>\s*<!-- Google tag \(gtag\.js\) -->\s*<script src="\/assets\/analytics\.js[^"]*"><\/script>\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-3NH66XEY32"><\/script>/.test(html))
    fail(file, "Google tag must follow <head> immediately");

  // Readability: no wall-of-text paragraphs, no repeated H2s within a page.
  const main = html.match(/<main id="main">([\s\S]*)<\/main>/)?.[1] || "";
  for (const m of main.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g)) {
    const words = m[1].replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    if (words > 60) fail(file, `paragraph of ${words} words (max 60): "${m[1].replace(/<[^>]+>/g, "").slice(0, 60)}…"`);
  }
  const h2s = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  const dupH2 = h2s.filter((h, i) => h2s.indexOf(h) !== i);
  if (dupH2.length) fail(file, `repeated H2: ${[...new Set(dupH2)].join(" | ")}`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) fail(file, "missing <title>");
  if (!description) fail(file, "missing meta description");
  if (is404) continue;
  const plainTitle = title?.replace(/&amp;/g, "&");
  if (plainTitle && (plainTitle.length < 30 || plainTitle.length > 60)) fail(file, `title length ${plainTitle.length} outside 30–60`);
  const plainDesc = description?.replace(/&amp;/g, "&");
  if (plainDesc && (plainDesc.length < 110 || plainDesc.length > 165)) fail(file, `description length ${plainDesc.length} outside 110–165`);
  // Generic anchor text tells search engines nothing about the target page.
  for (const m of html.matchAll(/<a\b[^>]*>([^<]{1,40})<\/a>/g)) {
    if (/^\s*(leer el caso|read the case study|ver servicio|view service|ver más|read more|aquí|click here|todo el trabajo|all work|ver productos|view products)\s*$/i.test(m[1]))
      fail(file, `generic anchor text "${m[1].trim()}"`);
  }
  if (titles.has(title)) fail(file, `duplicate title with ${titles.get(title)}`);
  titles.set(title, file);
  if (descriptions.has(description)) fail(file, `duplicate description with ${descriptions.get(description)}`);
  descriptions.set(description, file);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  if (canonical !== ORIGIN + url) fail(file, `canonical ${canonical} does not match ${ORIGIN + url}`);
  if (!/property="og:image" content="https:\/\/codegurex\.com\/assets\/og-(es|en)\.png"/.test(html)) fail(file, "missing og:image");
  if (!/property="og:image:alt" content="[^"]+"/.test(html)) fail(file, "missing og:image:alt");
  if (!/name="robots" content="index, follow, max-image-preview:large/.test(html)) fail(file, "robots meta should allow large image previews and snippets");

  // hreflang must be reciprocal.
  const alt = Object.fromEntries([...html.matchAll(/hreflang="(es|en|x-default)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
  if (!alt.es || !alt.en || !alt["x-default"]) fail(file, "incomplete hreflang set");
  for (const lang of ["es", "en"]) {
    const other = pages.get(alt[lang]?.replace(ORIGIN, ""));
    if (!other) fail(file, `hreflang ${lang} points to a missing page`);
    else if (!other.html.includes(`hreflang="es" href="${alt.es}"`) || !other.html.includes(`hreflang="en" href="${alt.en}"`))
      fail(file, `hreflang ${lang} is not reciprocal`);
  }
}

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!pages.has(m[1].replace(ORIGIN, ""))) fail("sitemap.xml", `lists missing page ${m[1]}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Validation passed: ${checked} pages, ${pages.size - checked} redirects/aux, links, hreflang, metadata and CSP rules OK.`);
