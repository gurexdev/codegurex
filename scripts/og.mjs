// Renders the Open Graph images (1200×630) with the site's own fonts and mark.
// Usage: node scripts/og.mjs   (requires Playwright; output is committed in src/assets)
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { MARK_PATH } from "../src/templates/base.mjs";

// CommonJS require honours NODE_PATH, so a globally installed Playwright also works.
const { chromium } = createRequire(import.meta.url)("playwright");

const font = (f) => readFile(fileURLToPath(new URL(`../src/assets/fonts/${f}`, import.meta.url))).then((b) => b.toString("base64"));
const [archivo, mono] = await Promise.all([font("archivo.woff2"), font("jetbrains-mono.woff2")]);

const copy = {
  es: ["Ingeniería de soluciones digitales para un mundo conectado.", "Software · SaaS · IA · Ciberseguridad"],
  en: ["Engineering digital solutions for a connected world.", "Software · SaaS · AI · Cybersecurity"],
};

const html = (lang) => `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(data:font/woff2;base64,${archivo}) format("woff2");font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:M;src:url(data:font/woff2;base64,${mono}) format("woff2");font-weight:100 800}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0a1120;color:#e9edf6;font-family:A;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background:linear-gradient(#172034 1px,transparent 1px) 0 0/48px 48px,linear-gradient(90deg,#172034 1px,transparent 1px) 0 0/48px 48px}
.frame{position:absolute;inset:40px;border:1px solid #2a3550;padding:56px 60px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;justify-content:space-between;font-family:M;font-size:16px;letter-spacing:.08em;color:#9aa6bf;text-transform:uppercase}
.brand{display:flex;align-items:center;gap:16px;font-family:A;letter-spacing:-.01em;text-transform:none;font-weight:750;font-stretch:118%;font-size:30px;color:#fff}
.brand b{color:#93a6ff}
h1{font-size:92px;font-weight:700;font-stretch:120%;letter-spacing:-.035em;line-height:.94}
h1 span{color:#93a6ff}
p{font-size:30px;font-weight:600;font-stretch:108%;max-width:26ch;margin-top:22px;color:#dfe5f3}
.foot{font-family:M;font-size:16px;letter-spacing:.08em;text-transform:uppercase;color:#9aa6bf;display:flex;justify-content:space-between}
</style></head><body><div class="grid"></div><div class="frame">
<div class="top"><div class="brand"><svg width="44" height="44" viewBox="0 0 100 100"><path fill="#93a6ff" d="${MARK_PATH}"/></svg>CODE<b>GUREX</b></div><span>codegurex.com</span></div>
<div><h1>Technology. Software. <span>Security.</span></h1><p>${copy[lang][0]}</p></div>
<div class="foot"><span>${copy[lang][1]}</span><span>${lang.toUpperCase()}</span></div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const lang of ["es", "en"]) {
  await page.setContent(html(lang));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: fileURLToPath(new URL(`../src/assets/og-${lang}.png`, import.meta.url)) });
}
await browser.close();
console.log("OG images written to src/assets/");
