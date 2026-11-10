// Visual and behavioural QA against dist/: serves the build locally, then for each page
// checks console errors, CSP violations, horizontal overflow and broken images, and
// optionally saves screenshots.  Usage: node scripts/qa.mjs [--shots DIR]
import { createServer } from "node:http";
import { readFile, stat, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const { chromium } = createRequire(import.meta.url)("playwright");
const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const shotsArg = process.argv.indexOf("--shots");
const shots = shotsArg > -1 ? process.argv[shotsArg + 1] : null;
const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1].split(",") : null;

const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2", ".ico": "image/x-icon", ".xml": "application/xml", ".webmanifest": "application/manifest+json" };
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.endsWith("/")) path += "index.html";
  const file = normalize(join(dist, path));
  if (!file.startsWith(dist)) return res.writeHead(403).end();
  try {
    await stat(file);
    res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end(await readFile(join(dist, "404.html")));
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
let paths = [...sitemap.matchAll(/<loc>https:\/\/codegurex\.com([^<]+)<\/loc>/g)].map((m) => m[1]);
paths.push("/no-existe/");
if (only) paths = paths.filter((p) => only.includes(p));

const browser = await chromium.launch();
const viewports = [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
];
const failures = [];
if (shots) await mkdir(shots, { recursive: true });

for (const [label, viewport] of viewports) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  // Block third-party analytics in QA; it is not part of what we test.
  await context.route(/googletagmanager|google-analytics/, (route) => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && !/googletagmanager|ERR_FAILED/.test(m.text()) && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  for (const path of paths) {
    errors.length = 0;
    await page.goto(base + path, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
      h1: document.querySelectorAll("h1").length,
      offenders: [...document.querySelectorAll("body *")]
        .filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1)
        .slice(-3)
        .map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(" ")[0]}`),
    }));
    if (result.overflow > 1) failures.push(`${label} ${path}: horizontal overflow ${result.overflow}px (${result.offenders.join(", ")})`);
    if (result.brokenImages.length) failures.push(`${label} ${path}: broken images ${result.brokenImages.join(", ")}`);
    if (result.h1 !== 1) failures.push(`${label} ${path}: expected 1 h1, found ${result.h1}`);
    if (errors.length && path !== "/no-existe/") failures.push(`${label} ${path}: console errors: ${errors.join(" | ")}`);
    if (shots) {
      const name = `${label}${path.replace(/\//g, "_") || "_"}.png`;
      await page.screenshot({ path: join(shots, name), fullPage: true });
    }
  }
  await context.close();
}

/* ---------- Behaviour ---------- */
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.route(/googletagmanager|google-analytics/, (route) => route.abort());
  const page = await context.newPage();
  const expect = (ok, msg) => ok || failures.push(`behaviour: ${msg}`);
  await page.addInitScript(() => {
    window.__opened = [];
    window.open = (url) => window.__opened.push(url);
    localStorage.setItem("codegurex_analytics_consent", "denied");
  });

  // Mobile menu opens, closes with Escape.
  await page.goto(base + "/");
  await page.click(".menu-toggle");
  expect(await page.isVisible("#mobile-nav"), "mobile menu opens");
  await page.keyboard.press("Escape");
  expect(!(await page.isVisible("#mobile-nav")), "mobile menu closes with Escape");

  // Work filters: AI shows the honest empty state; Cybersecurity filters the grid.
  await page.goto(base + "/trabajo/");
  await page.click('[data-filter="ai"]');
  expect(await page.isVisible("[data-empty]"), "AI filter shows empty-state message");
  await page.click('[data-filter="security"]');
  const visible = await page.$$eval(".work-item", (els) => els.filter((e) => !e.hidden).length);
  expect(visible === 3, `security filter shows 3 items (got ${visible})`);

  // Contact form: query preselects the security track and service.
  await page.goto(base + "/contacto/?track=secure&service=api-security");
  expect(await page.isChecked('input[name="track"][value="secure"]'), "track preselected from URL");
  expect((await page.inputValue("#f-service")) === "api-security", "service preselected from URL");
  expect(await page.isVisible("[data-auth]"), "authorization checkbox shown for security track");

  // Validation errors on empty submit.
  await page.click('button[type="submit"]');
  expect((await page.textContent("#f-name-error")).length > 0, "name error shown");

  // Credentials are rejected.
  await page.waitForTimeout(3100);
  await page.fill("#f-name", "Ana Prueba");
  await page.fill("#f-message", "Necesitamos revisar nuestra API. password: hunter2 por si sirve");
  await page.check("#f-auth");
  await page.check("#f-privacy");
  await page.click('button[type="submit"]');
  expect((await page.textContent("#f-message-error")).length > 0, "credential in message is rejected");
  expect((await page.evaluate(() => window.__opened.length)) === 0, "nothing opened when invalid");

  // Valid submission prepares a WhatsApp message.
  await page.fill("#f-message", "Necesitamos revisar la autorización de nuestra API de pedidos antes del lanzamiento.");
  await page.click('button[type="submit"]');
  const opened = await page.evaluate(() => window.__opened[0] || "");
  expect(opened.startsWith("https://wa.me/593963223403?text="), "WhatsApp URL prepared");
  expect(decodeURIComponent(opened).includes("Seguridad de APIs"), "message includes selected service");
  await context.close();
}
await browser.close();
server.close();
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`QA passed: ${paths.length} pages × ${viewports.length} viewports, no overflow, console errors or broken images.`);
