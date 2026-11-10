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
    if (!/rel="canonical"/.test(html) || !/noindex/.test(html)) fail(file, "redirect stub must have canonical and noindex");
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

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) fail(file, "missing <title>");
  if (!description) fail(file, "missing meta description");
  if (is404) continue;
  if (title && title.length > 75) fail(file, `title too long (${title.length})`);
  if (description && (description.length < 50 || description.length > 200)) fail(file, `description length ${description.length}`);
  if (titles.has(title)) fail(file, `duplicate title with ${titles.get(title)}`);
  titles.set(title, file);
  if (descriptions.has(description)) fail(file, `duplicate description with ${descriptions.get(description)}`);
  descriptions.set(description, file);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  if (canonical !== ORIGIN + url) fail(file, `canonical ${canonical} does not match ${ORIGIN + url}`);
  if (!/property="og:image" content="https:\/\/codegurex\.com\/assets\/og-(es|en)\.png"/.test(html)) fail(file, "missing og:image");

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
