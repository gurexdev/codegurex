import { SITE, ROUTES, NAV, UI, STATUS, STATUS_TONE, LOCALE } from "../content/site.mjs";
import { SERVICES, TRACKS } from "../content/services.mjs";
import { WORK } from "../content/work.mjs";

export const ASSET_VERSION = "1";

/* ---------- Helpers ---------- */
export const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Resolve a { es, en } value (or plain value) for a language. */
export const tx = (value, lang) =>
  value && typeof value === "object" && "es" in value ? value[lang] : value;

/** Translate and escape. */
export const t = (value, lang) => esc(tx(value, lang));

export const other = (lang) => (lang === "es" ? "en" : "es");

export const route = (key, lang) => ROUTES[key][lang];
export const servicePath = (service, lang) =>
  `${ROUTES.services[lang]}${service.slug[lang]}/`;
export const workPath = (item, lang) => `${ROUTES.work[lang]}${item.slug[lang]}/`;
export const serviceById = (id) => SERVICES.find((s) => s.id === id);
export const workById = (id) => WORK.find((w) => w.id === id);
export const absolute = (path) => `${SITE.origin}${path}`;

export const statusTag = (key, lang) =>
  `<span class="status ${STATUS_TONE[key]}">${t(STATUS[key], lang)}</span>`;

export const external = (href, label, cls = "arrow-link") =>
  `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;

/* ---------- Brand mark ----------
   The original CodeGurex symbol (a "C" built from triangles inside a hexagon),
   redrawn as geometry so it stays sharp at any size. */
function markPath() {
  const c = 50;
  const R = 46;
  const r = 23;
  const point = (radius, k) => {
    const a = ((-90 + 60 * k) * Math.PI) / 180;
    return [c + radius * Math.cos(a), c + radius * Math.sin(a)];
  };
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const shrink = (tri, f = 0.84) => {
    const cx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3;
    const cy = (tri[0][1] + tri[1][1] + tri[2][1]) / 3;
    return tri.map(([x, y]) => [cx + (x - cx) * f, cy + (y - cy) * f]);
  };
  const tris = [];
  for (let k = 0; k < 6; k++) {
    if (k === 1) continue; // the opening of the C
    const o1 = point(R, k);
    const o2 = point(R, k + 1);
    const i1 = point(r, k);
    const i2 = point(r, k + 1);
    const m = mid(o1, o2);
    tris.push([o1, m, i1], [m, i2, i1], [m, o2, i2]);
  }
  return tris
    .map((tri) => shrink(tri))
    .map((tri) => `M${tri.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")}Z`)
    .join("");
}
export const MARK_PATH = markPath();
export const mark = (fill = "#2350f5") =>
  `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path fill="${fill}" d="${MARK_PATH}"/></svg>`;

const brand = (lang, onInk = false) =>
  `<a class="brand" href="${route("home", lang)}" aria-label="CodeGurex — ${t(UI.home, lang)}">${mark(onInk ? "#93a6ff" : "#2350f5")}<span>CODE<b>GUREX</b></span></a>`;

/* ---------- Header ---------- */
function header(lang, current, alternate) {
  const links = NAV.map(
    ([key, label]) =>
      `<li><a href="${route(key, lang)}"${current === key ? ' aria-current="page"' : ""}>${t(label, lang)}</a></li>`,
  ).join("");
  const mobileLinks = NAV.map(
    ([key, label], i) =>
      `<li><a href="${route(key, lang)}"${current === key ? ' aria-current="page"' : ""}>${t(label, lang)}<span>0${i + 1}</span></a></li>`,
  ).join("");
  return `<header class="site-header">
  <div class="wrap header-row">
    ${brand(lang)}
    <nav class="primary-nav" aria-label="${t(UI.mainNav, lang)}"><ul>${links}</ul></nav>
    <div class="header-actions">
      <a class="lang-link" href="${alternate}" hreflang="${other(lang)}" lang="${other(lang)}" aria-label="${t(UI.langLabel, lang)}">${t(UI.langShort, lang)}</a>
      <a class="btn btn-small header-cta" href="${route("contact", lang)}">${t(UI.discuss, lang)}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-open-label="${t(UI.menuOpen, lang)}" data-close-label="${t(UI.menuClose, lang)}" aria-label="${t(UI.menuOpen, lang)}"><i></i>${t(UI.menu, lang)}</button>
    </div>
  </div>
  <nav class="mobile-nav" id="mobile-nav" aria-label="${t(UI.mainNav, lang)}" hidden>
    <ul>${mobileLinks}</ul>
    <a class="btn btn-blue" href="${route("contact", lang)}">${t(UI.discuss, lang)}</a>
  </nav>
</header>`;
}

/* ---------- Footer ---------- */
function footer(lang) {
  const list = (items) => `<ul>${items.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>`;
  const byTrack = (track) =>
    SERVICES.filter((s) => (Array.isArray(track) ? track.includes(s.track) : s.track === track)).map((s) => [
      servicePath(s, lang),
      t(s.name, lang),
    ]);
  return `<footer class="site-footer on-ink">
  <div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">
        ${brand(lang, true)}
        <p>${t(UI.footerTagline, lang)}</p>
        <p class="mono">${t(UI.location, lang)}</p>
      </div>
      <div class="footer-cols">
        <div><h2>${t(UI.footerBuild, lang)}</h2>${list(byTrack(["build", "integrate"]))}</div>
        <div><h2>${t(UI.footerSecure, lang)}</h2>${list([...byTrack("secure"), [route("sentinel", lang), "CodeGurex Sentinel"]])}</div>
        <div><h2>${t(UI.footerCompany, lang)}</h2>${list(
          [["solutions"], ["work"], ["products"], ["technology"], ["about"]].map(([k]) => [
            route(k, lang),
            t(NAV.find(([key]) => key === k)[1], lang),
          ]),
        )}</div>
        <div><h2>${t(UI.footerContact, lang)}</h2><ul>
          <li><a href="${route("contact", lang)}">${t(UI.discuss, lang)}</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li><a href="${SITE.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp ${SITE.phoneDisplay}</a></li>
          <li><a href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="${SITE.github}" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul></div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>${t(UI.footerNote, lang)}</p>
      <p class="mono">© 2026 CodeGurex · <a href="${route("privacy", lang)}">${t(UI.footerLegal, lang)}</a> · <button type="button" data-consent-open>${t(UI.privacyPrefs, lang)}</button></p>
    </div>
  </div>
</footer>`;
}

/* ---------- Document ---------- */
export const CSP =
  "default-src 'self'; img-src 'self' data: https://*.google-analytics.com https://www.googletagmanager.com; style-src 'self'; script-src 'self' https://www.googletagmanager.com; font-src 'self'; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests";

/**
 * Render a full HTML page.
 * paths: { es, en } — this page's path in both languages (null for single-language pages).
 */
export function page({ lang, paths, current, title, description, body, schema = [], robots = "index, follow", ogImage }) {
  const self = paths[lang];
  const alternate = paths[other(lang)];
  const image = ogImage || `${SITE.origin}/assets/og-${lang}.png`;
  const graph = schema.length
    ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": schema }).replace(/</g, "\\u003c")}</script>`
    : "";
  return `<!doctype html>
<html lang="${lang}">
<head>
<!-- Google tag (gtag.js) -->
<script src="/assets/analytics.js?v=${ASSET_VERSION}"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.analyticsId}"></script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${robots}">
<meta name="author" content="CodeGurex">
<meta name="theme-color" content="#0a1120">
<link rel="canonical" href="${absolute(self)}">
<link rel="alternate" hreflang="es" href="${absolute(paths.es)}">
<link rel="alternate" hreflang="en" href="${absolute(paths.en)}">
<link rel="alternate" hreflang="x-default" href="${absolute(paths.en)}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/assets/mark.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/favicon-512.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
<meta property="og:type" content="website">
<meta property="og:site_name" content="CodeGurex">
<meta property="og:locale" content="${LOCALE[lang]}">
<meta property="og:locale:alternate" content="${LOCALE[other(lang)]}">
<meta property="og:url" content="${absolute(self)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<link rel="stylesheet" href="/assets/site.css?v=${ASSET_VERSION}">
<script src="/assets/site.js?v=${ASSET_VERSION}" defer></script>
${graph}
</head>
<body>
<a class="skip" href="#main">${t(UI.skip, lang)}</a>
${header(lang, current, alternate)}
<main id="main">
${body}
</main>
${footer(lang)}
</body>
</html>
`;
}

/* ---------- Shared components ---------- */
export const sheetLabel = (code, label, lang) =>
  `<p class="sheet-label mono"><b>${esc(code)}</b><span>${t(label, lang)}</span></p>`;

export function crumbs(lang, trail) {
  const items = [[route("home", lang), t(UI.home, lang)], ...trail];
  return `<nav class="crumbs mono" aria-label="${t(UI.breadcrumb, lang)}"><ol>${items
    .map(([href, label], i) =>
      i === items.length - 1 ? `<li aria-current="page">${label}</li>` : `<li><a href="${href}">${label}</a></li>`,
    )
    .join("")}</ol></nav>`;
}

export function breadcrumbSchema(lang, trail) {
  const items = [[route("home", lang), tx(UI.home, lang)], ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([href, name], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: String(name).replace(/<[^>]+>/g, ""),
      item: absolute(href),
    })),
  };
}

export const titleBlock = (rows) =>
  `<dl class="title-block">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;

export function ctaBand(lang) {
  return `<section class="section on-ink" aria-labelledby="cta-title">
  <div class="wrap">
    ${sheetLabel("→", { es: "Siguiente paso", en: "Next step" }, lang)}
    <h2 id="cta-title" class="statement">${lang === "es" ? "¿Qué necesitas <em>construir</em> o <em>proteger</em>?" : "What do you need to <em>build</em> or <em>secure</em>?"}</h2>
    <div class="cta-band">
      <a href="${route("contact", lang)}?track=build">
        <span class="mono">A · ${t(TRACKS.build.name, lang)} / B · ${t(TRACKS.integrate.name, lang)}</span>
        <strong>${t(UI.discuss, lang)}</strong>
        <span>${lang === "es" ? "Sitios, aplicaciones, plataformas SaaS, sistemas de negocio, integraciones e IA." : "Websites, applications, SaaS platforms, business systems, integrations and AI."}</span>
        <span class="go" aria-hidden="true">→</span>
      </a>
      <a href="${route("contact", lang)}?track=secure">
        <span class="mono">C · ${t(TRACKS.secure.name, lang)}</span>
        <strong>${t(UI.requestAssessment, lang)}</strong>
        <span>${lang === "es" ? "Aplicaciones, APIs, sistemas con IA e infraestructura. Solo sistemas propios o autorizados." : "Applications, APIs, AI systems and infrastructure. Owned or authorized systems only."}</span>
        <span class="go" aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</section>`;
}

export function flow(layers, lang) {
  return `<div class="flow">${layers
    .map(
      ([name, items]) =>
        `<div class="flow-layer"><p class="flow-name">${t(name, lang)}</p><ul>${items.map((i) => `<li>${t(i, lang)}</li>`).join("")}</ul></div>`,
    )
    .join("")}</div>`;
}

export function picture(base, alt, { eager = false, sizes = "(min-width: 960px) 60vw, 100vw" } = {}) {
  return `<img src="/assets/img/work/${base}-1600.webp" srcset="/assets/img/work/${base}-900.webp 900w, /assets/img/work/${base}-1600.webp 1600w" sizes="${sizes}" width="1600" height="830" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}

export { SITE, ROUTES, NAV, UI, STATUS, SERVICES, TRACKS, WORK };
