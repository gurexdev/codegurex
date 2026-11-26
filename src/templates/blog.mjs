import {
  t,
  tx,
  esc,
  route,
  servicePath,
  workPath,
  serviceById,
  workById,
  statusTag,
  sheetLabel,
  crumbs,
  breadcrumbSchema,
  titleBlock,
  ctaBand,
  page,
  SITE,
  ROUTES,
} from "./base.mjs";
import { ARTICLES, AUTHOR, LOCAL_PAGE } from "../content/articles.mjs";
import { SERVICES } from "../content/services.mjs";

const L = (es, en) => ({ es, en });
export const articlePath = (a, lang) => `${ROUTES.blog[lang]}${a.slug[lang]}/`;
export const localPath = (lang) => (lang === "es" ? `/${LOCAL_PAGE.slug.es}/` : `/en/${LOCAL_PAGE.slug.en}/`);

const dateLabel = (iso, lang) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === "es" ? "es-EC" : "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const wordCount = (a, lang) =>
  a.body
    .map((b) => (b[0] === "ul" || b[0] === "ol" ? b[1].map((i) => i[lang]).join(" ") : b[0] === "code" ? "" : tx(b[1], lang)))
    .join(" ")
    .split(/\s+/).length;

function relatedLinks(items, lang) {
  return items
    .map(([kind, id]) => {
      if (kind === "service") {
        const s = serviceById(id);
        return `<li><a class="index-row" href="${servicePath(s, lang)}"><span class="num">${lang === "es" ? "Servicio" : "Service"}</span><h3>${t(s.name, lang)}</h3><p>${t(s.short, lang)}</p><span class="go" aria-hidden="true">→</span></a></li>`;
      }
      const w = workById(id);
      return `<li><a class="index-row" href="${workPath(w, lang)}"><span class="num">${lang === "es" ? "Caso" : "Case"}</span><h3>${esc(tx(w.name, lang))}</h3><p>${t(w.summary, lang)}</p><span class="go" aria-hidden="true">→</span></a></li>`;
    })
    .join("");
}

function renderBlock(block, lang) {
  const [type, a, b] = block;
  if (type === "p") return `<p>${t(a, lang)}</p>`;
  if (type === "h2") return `<h2>${t(a, lang)}</h2>`;
  if (type === "ul") return `<ul>${a.map((i) => `<li>${t(i, lang)}</li>`).join("")}</ul>`;
  if (type === "ol") return `<ol>${a.map((i) => `<li>${t(i, lang)}</li>`).join("")}</ol>`;
  if (type === "note") return `<p class="note">${t(a, lang)}</p>`;
  if (type === "code") return `<figure class="code"><div class="bar mono"><span>${lang === "es" ? "Ejemplo" : "Example"}</span><span>${esc(a.toUpperCase())}</span></div><pre><code>${esc(b)}</code></pre></figure>`;
  return "";
}

export function blogIndex(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const trail = [[route("blog", lang), "Blog"]];
  const items = ARTICLES.map(
    (a, i) => `<li><a class="index-row" href="${articlePath(a, lang)}"><span class="num">${String(i + 1).padStart(2, "0")}</span><h3>${t(a.h1, lang)}</h3><p><span class="mono muted">${t(a.topic, lang)} · ${dateLabel(a.published, lang)}</span><br>${t(a.description, lang)}</p><span class="go" aria-hidden="true">→</span></a></li>`,
  ).join("");
  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <h1>${tr("Blog de desarrollo de software y ciberseguridad", "Software development and cybersecurity blog")}</h1>
        <p class="lead">${tr(
          "Guías escritas desde proyectos reales: cómo elegir un proveedor, cómo proteger una aplicación y cómo construir un SaaS que no mezcle los datos de tus clientes.",
          "Guides written from real projects: how to choose a provider, how to protect an application and how to build a SaaS that never mixes your customers' data.",
        )}</p>
      </div>
      ${titleBlock([
        [tr("Artículos", "Articles"), String(ARTICLES.length)],
        [tr("Autor", "Author"), esc(AUTHOR.name)],
        [tr("Temas", "Topics"), tr("Software · SaaS · Seguridad", "Software · SaaS · Security")],
      ])}
    </div>
  </div>
</section>
<section class="section" aria-labelledby="posts-title">
  <div class="wrap">
    <h2 id="posts-title" class="sr-only">${tr("Artículos", "Articles")}</h2>
    <ul class="index">${items}</ul>
  </div>
</section>
${ctaBand(lang)}`;
  return page({
    lang,
    paths: ROUTES.blog,
    current: "blog",
    title: tr("Blog de software y ciberseguridad | CodeGurex", "Software & cybersecurity blog | CodeGurex"),
    description: tr(
      "Guías prácticas de CodeGurex sobre desarrollo de software, SaaS, Supabase, pentesting y seguridad web, escritas desde proyectos reales en Ecuador.",
      "Practical CodeGurex guides on software development, SaaS, Supabase, pentesting and web security, written from real projects.",
    ),
    body,
    schema: [
      breadcrumbSchema(lang, trail),
      { "@type": "Blog", name: "CodeGurex Blog", url: `${SITE.origin}${ROUTES.blog[lang]}`, publisher: { "@id": `${SITE.origin}/#organization` }, inLanguage: lang },
    ],
  });
}

export function article(a, lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const paths = { es: articlePath(a, "es"), en: articlePath(a, "en") };
  const trail = [
    [route("blog", lang), "Blog"],
    [paths[lang], t(a.title, lang)],
  ];
  const minutes = Math.max(3, Math.round(wordCount(a, lang) / 200));
  const founderUrl = `${SITE.origin}${ROUTES.about[lang]}#${lang === "es" ? "fundador" : "founder"}`;
  const body = `
<article>
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <p class="plate-meta mono"><span>${t(a.topic, lang)}</span><span>${minutes} min</span></p>
    <h1 class="article-title">${t(a.h1, lang)}</h1>
    <p class="byline">${tr("Por", "By")} <a href="${ROUTES.about[lang]}#${lang === "es" ? "fundador" : "founder"}">${esc(AUTHOR.name)}</a>, ${t(AUTHOR.role, lang)} · <time datetime="${a.published}">${dateLabel(a.published, lang)}</time></p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="prose">${a.body.map((b) => renderBlock(b, lang)).join("")}</div>
  </div>
</section>
</article>
<section class="section on-white rule-top" aria-labelledby="related-title">
  <div class="wrap">
    ${sheetLabel("→", L("Relacionado", "Related"), lang)}
    <h2 id="related-title" class="sr-only">${tr("Servicios y casos relacionados con", "Services and cases related to")} ${t(a.title, lang)}</h2>
    <ul class="index">${relatedLinks(a.related, lang)}</ul>
  </div>
</section>
${ctaBand(lang)}`;
  return page({
    lang,
    paths,
    current: "blog",
    title: `${tx(a.title, lang)}${tx(a.title, lang).length <= 47 ? " | CodeGurex" : ""}`,
    description: tx(a.description, lang),
    body,
    ogType: "article",
    articleMeta: { published: a.published, modified: a.updated || a.published, author: AUTHOR.name, section: tx(a.topic, lang) },
    schema: [
      breadcrumbSchema(lang, trail),
      {
        "@type": "BlogPosting",
        headline: tx(a.h1, lang),
        description: tx(a.description, lang),
        datePublished: a.published,
        dateModified: a.updated || a.published,
        inLanguage: lang,
        mainEntityOfPage: `${SITE.origin}${paths[lang]}`,
        image: `${SITE.origin}/assets/og-${lang}.png`,
        wordCount: wordCount(a, lang),
        author: { "@type": "Person", "@id": `${SITE.origin}/#founder`, name: AUTHOR.name, jobTitle: tx(AUTHOR.role, lang), url: founderUrl },
        publisher: { "@id": `${SITE.origin}/#organization` },
      },
    ],
  });
}

export function localLanding(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const p = LOCAL_PAGE;
  const paths = { es: localPath("es"), en: localPath("en") };
  const trail = [[paths[lang], t(p.h1, lang)]];
  const local = ["adulam", "barbus", "crm"].map(workById);
  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <h1>${t(p.h1, lang)}</h1>
        <p class="lead">${t(p.intro, lang)}</p>
        <div class="actions"><a class="btn btn-blue" href="${route("contact", lang)}">${tr("Cotizar un proyecto", "Request a quote")}</a><a class="btn btn-line" href="${route("work", lang)}">${tr("Ver el portafolio", "See the portfolio")}</a></div>
      </div>
      ${titleBlock([
        [tr("Ubicación", "Location"), "Manta, Manabí, Ecuador"],
        [tr("Atención", "Service area"), tr("Ecuador y remoto", "Ecuador and remote")],
        [tr("Clientes desde", "Clients since"), "2022"],
        [tr("Contacto", "Contact"), `<a href="${SITE.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp ${SITE.phoneDisplay}</a>`],
      ])}
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    ${p.sections.map(([h, b]) => `<div class="split"><h2>${t(h, lang)}</h2><div class="body"><p>${t(b, lang)}</p></div></div>`).join("")}
  </div>
</section>
<section class="section on-white rule-top" aria-labelledby="local-work">
  <div class="wrap">
    ${sheetLabel("M", L("Trabajo en Manta", "Local work"), lang)}
    <h2 id="local-work" class="section-title">${tr("Sistemas que hoy usan negocios de Manta", "Systems local businesses use today")}</h2>
    <ul class="index">${local
      .map((w) => `<li><a class="index-row" href="${workPath(w, lang)}"><span class="num">${statusTag(w.status, lang)}</span><h3>${esc(tx(w.name, lang))}</h3><p>${t(w.summary, lang)}</p><span class="go" aria-hidden="true">→</span></a></li>`)
      .join("")}</ul>
  </div>
</section>
<section class="section rule-top" aria-labelledby="local-services">
  <div class="wrap">
    ${sheetLabel("S", L("Servicios", "Services"), lang)}
    <h2 id="local-services" class="section-title">${tr("Servicios disponibles en Manta y todo Ecuador", "Services available across Ecuador")}</h2>
    <ul class="index">${SERVICES.map((s) => `<li><a class="index-row" href="${servicePath(s, lang)}"><span class="num">→</span><h3>${t(s.name, lang)}</h3><p>${t(s.short, lang)}</p><span class="go" aria-hidden="true">→</span></a></li>`).join("")}</ul>
  </div>
</section>
<section class="section on-white rule-top" aria-labelledby="local-faq">
  <div class="wrap">
    <div class="split">
      <h2 id="local-faq">${tr("Preguntas frecuentes", "Frequently asked questions")}</h2>
      <div class="body faq">${p.faq.map(([q, a]) => `<h3>${t(q, lang)}</h3><p>${t(a, lang)}</p>`).join("")}</div>
    </div>
  </div>
</section>
${ctaBand(lang)}`;
  return page({
    lang,
    paths,
    current: "",
    title: tx(p.title, lang),
    description: tx(p.description, lang),
    body,
    schema: [
      breadcrumbSchema(lang, trail),
      {
        "@type": "WebPage",
        name: tx(p.h1, lang),
        url: `${SITE.origin}${paths[lang]}`,
        about: { "@id": `${SITE.origin}/#organization` },
        spatialCoverage: { "@type": "Place", name: "Manta, Manabí, Ecuador" },
      },
    ],
  });
}
