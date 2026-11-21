import { pageMeta, pageH1 } from "../content/seo-helpers.mjs";
import { WORK_SEO } from "../content/seo.mjs";
import {
  t,
  tx,
  esc,
  route,
  workPath,
  servicePath,
  statusTag,
  sheetLabel,
  crumbs,
  breadcrumbSchema,
  titleBlock,
  paras,
  ctaBand,
  picture,
  flow,
  page,
  SITE,
  UI,
  WORK,
  SERVICES,
  ROUTES,
  external,
} from "./base.mjs";
import { DISCIPLINES } from "../content/site.mjs";
import { INDEX_ONLY } from "../content/work.mjs";
import { schematic } from "./drawing.mjs";

const L = (es, en) => ({ es, en });

function thumb(w, lang) {
  if (w.images.length) return picture(w.images[0][0], tx(w.images[0][1], lang), { sizes: "(min-width: 1180px) 30vw, (min-width: 760px) 45vw, 100vw" });
  return `<div class="thumb-schematic">${schematic(w.id === "security-lab" ? "lab" : "stack")}</div>`;
}

export function workIndex(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const trail = [[route("work", lang), tr("Trabajo", "Work")]];
  const count = (key) => WORK.filter((w) => w.disciplines.includes(key)).length;
  const filters = [`<button type="button" aria-pressed="true" data-filter="all">${tr("Todo", "All")}<span>${WORK.length}</span></button>`]
    .concat(
      Object.entries(DISCIPLINES).map(
        ([key, label]) => `<button type="button" aria-pressed="false" data-filter="${key}">${t(label, lang)}<span>${count(key)}</span></button>`,
      ),
    )
    .join("");

  const items = WORK.map(
    (w, i) => `<li class="work-item${w.spotlight ? " is-spotlight" : ""}" data-disciplines="${w.disciplines.join(" ")}">
  <a href="${workPath(w, lang)}">
    <div class="thumb">${thumb(w, lang)}</div>
    <div class="meta mono"><span>${String(i + 1).padStart(2, "0")} · ${esc(w.year)}</span>${statusTag(w.status, lang)}</div>
    <h3>${esc(tx(w.name, lang))}</h3>
    <p>${t(w.kind, lang)}</p>
  </a>
</li>`,
  ).join("");

  const others = INDEX_ONLY.map(
    (o) => `<li><div class="index-row"><span class="num">${statusTag(o.status, lang)}</span><h3>${esc(o.name)}</h3><p>${t(o.kind, lang)}. <span class="mono">${esc(o.stack)}</span><br><small class="muted">${t(o.note, lang)}</small></p><span></span></div></li>`,
  ).join("");

  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <h1>${esc(pageH1("work", lang))}</h1>
        <p class="lead">${tr(
          "Productos en producción, sistemas para clientes, plataformas en desarrollo e investigación propia. Cada caso indica qué evidencia lo respalda.",
          "Products in production, client systems, platforms in development and in-house research. Every case states the evidence behind it.",
        )}</p>
      </div>
      ${titleBlock([
        [tr("Casos", "Cases"), String(WORK.length)],
        [tr("En producción", "In production"), String(WORK.filter((w) => ["production", "client"].includes(w.status)).length)],
        [tr("En desarrollo", "In development"), String(WORK.filter((w) => w.status === "development").length)],
        [tr("Métricas inventadas", "Invented metrics"), "0"],
      ])}
    </div>
  </div>
</section>
<section class="section" aria-labelledby="work-list-title">
  <div class="wrap">
    <h2 id="work-list-title" class="sr-only">${tr("Proyectos", "Projects")}</h2>
    <div class="filters" role="group" aria-label="${tr("Filtrar por disciplina", "Filter by discipline")}" data-filters>${filters}</div>
    <p class="sr-only" aria-live="polite" data-filter-status></p>
    <ul class="work-grid" data-work-grid>${items}</ul>
    <div class="empty-filter" data-empty hidden>
      <p><strong>${tr("Todavía no publicamos un caso de IA en producción.", "We have not yet published an AI case study in production.")}</strong></p>
      <p class="muted">${tr(
        "Preferimos decirlo a inventarlo. Nuestros proyectos de IA empiezan con un piloto acotado y criterios de éxito acordados.",
        "We would rather say so than invent one. Our AI engagements start with a scoped pilot and agreed success criteria.",
      )}</p>
      <a class="arrow-link" href="${route("services", lang)}${lang === "es" ? "ia-automatizacion/" : "ai-automation/"}">${tr("Ver el servicio de IA y automatización", "See the AI & automation service")}</a>
    </div>
  </div>
</section>
<section class="section rule-top" aria-labelledby="other-title">
  <div class="wrap">
    ${sheetLabel("+", L("Otros proyectos", "Other projects"), lang)}
    <h2 id="other-title" class="sr-only">${tr("Otros proyectos", "Other projects")}</h2>
    <ul class="index">${others}</ul>
  </div>
</section>
${ctaBand(lang)}`;

  return page({
    lang,
    paths: ROUTES.work,
    current: "work",
    ...pageMeta("work", lang),
    body,
    schema: [breadcrumbSchema(lang, trail)],
  });
}

const firstSentence = (text) => (text || "").split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡“"(])/)[0];

export function caseStudy(w, lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const paths = { es: workPath(w, "es"), en: workPath(w, "en") };
  const name = esc(tx(w.name, lang));
  const trail = [
    [route("work", lang), tr("Trabajo", "Work")],
    [paths[lang], name],
  ];
  const idx = WORK.indexOf(w);
  const next = WORK[(idx + 1) % WORK.length];

  const figures = w.images.length
    ? `<div class="figure-stack">${w.images
        .map(
          ([base, alt], i) =>
            `<figure class="case-figure"><div class="bar mono"><span>FIG. ${String(i + 1).padStart(2, "0")}</span><span>${tr("Captura real", "Actual screenshot")}</span></div>${picture(base, tx(alt, lang), { eager: i === 0, sizes: "(min-width: 1360px) 1300px, 100vw" })}<figcaption>${t(alt, lang)}</figcaption></figure>`,
        )
        .join("")}</div>`
    : "";

  const codeBlock = w.code
    ? `<figure class="code"><div class="bar mono"><span>${t(w.codeCaption, lang)}</span><span>Python</span></div><pre><code>${esc(w.code)}</code></pre></figure>`
    : "";

  const linkLabel = /github\.com/.test(w.link || "") ? tr("Ver el código", "View the code") : tr("Visitar el sitio", "Visit the site");
  const linkRow = w.link ? `<div class="actions">${external(w.link, linkLabel, "btn btn-line")}</div>` : "";

  const body = `
<section class="page-hero case-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <p class="plate-meta mono"><span>${t(w.sector, lang)}</span>${statusTag(w.status, lang)}</p>
    <div class="page-hero-grid">
      <div>
        <h1>${t(WORK_SEO[w.id].h1, lang)}</h1>
        <p class="lead">${t(w.summary, lang)}</p>
        ${linkRow}
      </div>
      ${titleBlock([
        [tr("Tipo", "Type"), t(w.kind, lang)],
        [tr("Año", "Year"), esc(w.year)],
        [tr("Estado", "Status"), statusTag(w.status, lang)],
        [tr("Disciplinas", "Disciplines"), w.disciplines.map((d) => t(DISCIPLINES[d], lang)).join(" · ")],
        [tr("Base de evidencia", "Evidence basis"), t(w.basis, lang)],
      ])}
    </div>
  </div>
</section>
${figures ? `<section class="section on-white"><div class="wrap">${figures}</div></section>` : ""}
<section class="section" aria-labelledby="snapshot-title">
  <div class="wrap">
    <h2 id="snapshot-title" class="sr-only">${tr("Resumen de", "Summary of")} ${name}</h2>
    <dl class="snapshot">
      <div><dt class="mono">${tr("El reto", "Challenge")}</dt><dd>${esc(firstSentence(tx(w.challenge, lang)))}</dd></div>
      <div><dt class="mono">${tr("La solución", "Solution")}</dt><dd>${esc(firstSentence(tx(w.solution, lang)))}</dd></div>
      <div><dt class="mono">${tr("El resultado", "Outcome")}</dt><dd>${esc(firstSentence(tx(w.results[0], lang)))}</dd></div>
    </dl>
  </div>
</section>
<section class="section rule-top">
  <div class="wrap">
    <div class="split"><h2>${tr("El reto de", "The challenge behind")} ${name}</h2><div class="body">${paras(w.context, lang)}${paras(w.challenge, lang)}</div></div>
    <div class="split"><h2>${tr("Cómo construimos", "How we built")} ${name}</h2><div class="body">${paras(w.solution, lang)}${codeBlock}</div></div>
    <div class="split"><h2>${tr("Arquitectura de", "Architecture of")} ${name}</h2><div class="body">${flow(w.architecture, lang)}</div></div>
    <div class="split"><h2>${tr("Funciones principales de", "Key features of")} ${name}</h2><div class="body"><ul class="checklist">${w.features.map((f) => `<li>${t(f, lang)}</li>`).join("")}</ul></div></div>
    <div class="split"><h2>${tr("Stack tecnológico de", "Tech stack of")} ${name}</h2><div class="body">
      <table class="spec-table"><thead><tr><th scope="col">${tr("Tecnología", "Technology")}</th><th scope="col">${tr("Uso", "Purpose")}</th></tr></thead><tbody>
      ${w.stack.map(([a, b]) => `<tr><th scope="row">${esc(tx(a, lang))}</th><td>${t(b, lang)}</td></tr>`).join("")}
      </tbody></table>
    </div></div>
    <div class="split"><h2>${tr("Resultados de", "Results of")} ${name}</h2><div class="body">
      <ul class="result-list">${w.results.map((r) => `<li><span>${t(r, lang)}</span></li>`).join("")}</ul>
      ${w.pending ? `<p class="note warn">${t(w.pending, lang)}</p>` : ""}
      <table class="spec-table"><tbody>
        <tr><th scope="row">${tr("Contribución de CodeGurex", "CodeGurex contribution")}</th><td>${t(w.contribution, lang)}</td></tr>
        ${w.evidence.map(([a, b]) => `<tr><th scope="row">${t(a, lang)}</th><td>${t(b, lang)}</td></tr>`).join("")}
      </tbody></table>
    </div></div>
  </div>
</section>
${(() => {
  const services = SERVICES.filter((s) => s.evidence.includes(w.id));
  if (!services.length) return "";
  return `<section class="section rule-top" aria-labelledby="case-services">
  <div class="wrap">
    ${sheetLabel("S", { es: "Servicios demostrados en este caso", en: "Services shown in this case" }, lang)}
    <h2 id="case-services" class="sr-only">${tr("Servicios aplicados en", "Services used in")} ${name}</h2>
    <ul class="index">${services
      .map((s) => `<li><a class="index-row" href="${servicePath(s, lang)}"><span class="num">→</span><h3>${t(s.name, lang)}</h3><p>${t(s.short, lang)}</p><span class="go" aria-hidden="true">→</span></a></li>`)
      .join("")}</ul>
  </div>
</section>`;
})()}
<section class="on-ink">
  <div class="wrap">
    <a class="next-case" href="${workPath(next, lang)}"><span class="mono">${tr("Siguiente caso", "Next case")} →</span><strong>${esc(tx(next.name, lang))}</strong><span class="muted">${t(next.kind, lang)}</span></a>
  </div>
</section>
${ctaBand(lang)}`;

  return page({
    lang,
    paths,
    current: "work",
    title: tx(WORK_SEO[w.id].title, lang),
    description: tx(w.summary, lang),
    body,
    schema: [
      breadcrumbSchema(lang, trail),
      {
        "@type": "CreativeWork",
        name: tx(w.name, lang),
        description: tx(w.summary, lang),
        creator: { "@type": "Organization", name: "CodeGurex", url: `${SITE.origin}/` },
        url: `${SITE.origin}${paths[lang]}`,
        inLanguage: lang,
      },
    ],
  });
}
