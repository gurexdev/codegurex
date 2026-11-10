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
  UI,
  SERVICES,
  TRACKS,
  ROUTES,
} from "./base.mjs";
import { ENGAGEMENT } from "../content/services.mjs";

const L = (es, en) => ({ es, en });

const SOLUTIONS = [
  {
    code: "S1",
    name: L("Presencia digital", "Digital presence"),
    need: L("Necesito que mi empresa se entienda, se encuentre y genere contactos.", "I need my company to be understood, found and contacted."),
    items: [L("Sitios corporativos", "Corporate websites"), L("Landing pages", "Landing pages"), L("Webs de negocio", "Business websites"), L("Experiencias de comercio electrónico", "E-commerce experiences")],
    services: ["web-development"],
    work: ["codegurex-com", "adulam"],
  },
  {
    code: "S2",
    name: L("Plataformas digitales", "Digital platforms"),
    need: L("Necesito un producto o un portal que mis clientes usen todos los días.", "I need a product or portal my customers use every day."),
    items: [L("Aplicaciones web", "Web applications"), L("Plataformas SaaS", "SaaS platforms"), L("Portales de clientes", "Customer portals"), L("Paneles administrativos", "Admin dashboards")],
    services: ["web-applications", "saas-development"],
    work: ["prez", "barbus", "costflow"],
  },
  {
    code: "S3",
    name: L("Tecnología de negocio", "Business technology"),
    need: L("Necesito ordenar mi operación y dejar de depender de hojas de cálculo.", "I need to organize operations and stop depending on spreadsheets."),
    items: [L("CRM", "CRM systems"), L("Gestión de procesos", "Process management"), L("Automatización de flujos", "Workflow automation"), L("APIs e integraciones", "APIs and integrations")],
    services: ["business-systems", "apis-integrations"],
    work: ["crm", "barbus"],
  },
  {
    code: "S4",
    name: L("Sistemas inteligentes", "Intelligent systems"),
    need: L("Quiero usar IA donde realmente ahorre tiempo, sin crear riesgos nuevos.", "I want to use AI where it actually saves time, without creating new risks."),
    items: [L("Aplicaciones con IA", "AI-powered applications"), L("Asistentes", "AI assistants"), L("Integración de modelos", "Model integration"), L("Automatización inteligente", "Intelligent automation")],
    services: ["ai-automation", "ai-security"],
    work: [],
  },
  {
    code: "S5",
    name: L("Seguridad", "Security"),
    need: L("Necesito saber qué estoy exponiendo y qué corregir primero.", "I need to know what I am exposing and what to fix first."),
    items: [L("Seguridad de aplicaciones", "Application security"), L("Seguridad de APIs", "API security"), L("Seguridad en la nube", "Cloud security"), L("Seguridad de IA", "AI security")],
    services: ["application-security", "api-security", "cloud-security", "ai-security"],
    work: ["security-lab", "prez"],
  },
];

export function solutions(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const trail = [[route("solutions", lang), tr("Soluciones", "Solutions")]];
  const rows = SOLUTIONS.map(
    (s) => `<section class="split" aria-labelledby="sol-${s.code}">
  <header>
    <p class="mono muted">${s.code}</p>
    <h2 id="sol-${s.code}">${t(s.name, lang)}</h2>
  </header>
  <div class="body">
    <p class="lead">“${t(s.need, lang)}”</p>
    <ul class="checklist cols">${s.items.map((i) => `<li>${t(i, lang)}</li>`).join("")}</ul>
    <table class="spec-table">
      <tbody>
        <tr><th scope="row">${tr("Servicios", "Services")}</th><td>${s.services
          .map((id) => serviceById(id))
          .map((sv) => `<a class="arrow-link" href="${servicePath(sv, lang)}">${t(sv.name, lang)}</a>`)
          .join("<br>")}</td></tr>
        <tr><th scope="row">${tr("Evidencia", "Evidence")}</th><td>${
          s.work.length
            ? s.work
                .map(workById)
                .map((w) => `<a href="${workPath(w, lang)}">${esc(tx(w.name, lang))}</a>`)
                .join(" · ")
            : tr("Aún sin caso publicado. Empezamos con un piloto acotado.", "No published case yet. We start with a scoped pilot.")
        }</td></tr>
      </tbody>
    </table>
  </div>
</section>`,
  ).join("");

  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <h1>${tr("Soluciones organizadas por lo que tu negocio necesita.", "Solutions organized around what your business needs.")}</h1>
        <p class="lead">${tr(
          "No empezamos por la tecnología. Empezamos por el problema: presencia, operación, producto, inteligencia o riesgo.",
          "We do not start with technology. We start with the problem: presence, operations, product, intelligence or risk.",
        )}</p>
      </div>
      ${titleBlock([
        [tr("Hoja", "Sheet"), tr("Soluciones", "Solutions")],
        [tr("Áreas", "Areas"), "5"],
        [tr("Servicios", "Services"), String(SERVICES.length)],
        [tr("Idiomas", "Languages"), "ES · EN"],
      ])}
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">${rows}</div>
</section>
${ctaBand(lang)}`;

  return page({
    lang,
    paths: ROUTES.solutions,
    current: "solutions",
    title: tr("Soluciones de software y ciberseguridad | CodeGurex", "Software and cybersecurity solutions | CodeGurex"),
    description: tr(
      "Presencia digital, plataformas, tecnología de negocio, sistemas inteligentes y seguridad: soluciones de CodeGurex organizadas por necesidad.",
      "Digital presence, platforms, business technology, intelligent systems and security: CodeGurex solutions organized by business need.",
    ),
    body,
    schema: [breadcrumbSchema(lang, trail)],
  });
}

export function servicesIndex(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const trail = [[route("services", lang), tr("Servicios", "Services")]];
  let n = 0;
  const groups = ["build", "integrate", "secure"]
    .map((key) => {
      const track = TRACKS[key];
      const list = SERVICES.filter((s) => s.track === key)
        .map(
          (s) => `<li><a class="index-row" href="${servicePath(s, lang)}"><span class="num">${track.code}.${String(++n).padStart(2, "0")}</span><h3>${t(s.name, lang)}</h3><p>${t(s.short, lang)}</p><span class="go" aria-hidden="true">→</span></a></li>`,
        )
        .join("");
      return `<section class="section${key === "secure" ? " on-ink" : key === "integrate" ? " on-white" : ""}" aria-labelledby="track-${key}">
  <div class="wrap">
    ${sheetLabel(track.code, track.name, lang)}
    <div class="section-head">
      <h2 id="track-${key}">${t(track.title, lang)}</h2>
      <p>${t(track.summary, lang)}</p>
    </div>
    <ul class="index">${list}</ul>
  </div>
</section>`;
    })
    .join("");

  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <h1>${tr("Servicios de ingeniería y de seguridad.", "Engineering and security services.")}</h1>
        <p class="lead">${tr(
          "Separamos con claridad lo que construimos de lo que evaluamos. Cada servicio explica el problema, el alcance, el proceso y los entregables.",
          "We clearly separate what we build from what we assess. Each service explains the problem, scope, process and deliverables.",
        )}</p>
      </div>
      ${titleBlock([
        ["A", t(TRACKS.build.title, lang)],
        ["B", t(TRACKS.integrate.title, lang)],
        ["C", t(TRACKS.secure.title, lang)],
      ])}
    </div>
  </div>
</section>
${groups}
${ctaBand(lang)}`;

  return page({
    lang,
    paths: ROUTES.services,
    current: "services",
    title: tr("Servicios: desarrollo de software, IA y ciberseguridad | CodeGurex", "Services: software development, AI and cybersecurity | CodeGurex"),
    description: tr(
      "Desarrollo web, aplicaciones a medida, SaaS, sistemas de gestión, APIs, IA y evaluaciones de seguridad de aplicaciones, APIs, IA y nube.",
      "Web development, custom applications, SaaS, business systems, APIs, AI and security assessments for applications, APIs, AI and cloud.",
    ),
    body,
    schema: [breadcrumbSchema(lang, trail)],
  });
}

export function serviceDetail(service, lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const track = TRACKS[service.track];
  const paths = { es: servicePath(service, "es"), en: servicePath(service, "en") };
  const trail = [
    [route("services", lang), tr("Servicios", "Services")],
    [paths[lang], t(service.name, lang)],
  ];
  const isSecurity = service.track === "secure";
  const steps = ENGAGEMENT[service.track];
  const evidence = service.evidence.map(workById);
  const related = SERVICES.filter((s) => s.track === service.track && s.id !== service.id);
  const ctaHref = `${route("contact", lang)}?track=${isSecurity ? "secure" : "build"}&service=${service.id}`;
  const ctaLabel = isSecurity ? t(UI.requestAssessment, lang) : t(UI.discuss, lang);

  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <p class="mono muted">${track.code} · ${t(track.title, lang)}</p>
        <h1>${t(service.name, lang)}</h1>
        <p class="lead">${t(service.short, lang)}</p>
        <div class="actions"><a class="btn btn-blue" href="${ctaHref}">${ctaLabel}</a></div>
      </div>
      ${titleBlock([
        [tr("División", "Division"), t(track.name, lang)],
        [tr("Para", "For"), t(service.audience[0], lang)],
        [tr("Entregables", "Deliverables"), String(service.deliverables.length)],
        [tr("Fases", "Phases"), String(steps.length)],
      ])}
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="split">
      <h2>${tr("El problema", "The problem")}</h2>
      <div class="body"><p class="lead">${t(service.problem, lang)}</p>${service.note ? `<p class="note">${t(service.note, lang)}</p>` : ""}</div>
    </div>
    <div class="split">
      <h2>${tr("Para quién", "Who it is for")}</h2>
      <div class="body"><ul class="checklist">${service.audience.map((a) => `<li>${t(a, lang)}</li>`).join("")}</ul></div>
    </div>
    <div class="split">
      <h2>${tr("Qué incluye", "What is included")}</h2>
      <div class="body"><ul class="checklist cols">${service.included.map((a) => `<li>${t(a, lang)}</li>`).join("")}</ul></div>
    </div>
    <div class="split">
      <h2>${tr("Entregables", "Deliverables")}</h2>
      <div class="body">
        <table class="spec-table"><thead><tr><th scope="col">#</th><th scope="col">${tr("Entregable", "Deliverable")}</th></tr></thead><tbody>
        ${service.deliverables.map((d, i) => `<tr><th scope="row">D${i + 1}</th><td>${t(d, lang)}</td></tr>`).join("")}
        </tbody></table>
      </div>
    </div>
    <div class="split">
      <h2>${tr("Capacidades técnicas", "Technical capabilities")}</h2>
      <div class="body"><ul class="tags">${service.capabilities.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
      <a class="arrow-link" href="${route("technology", lang)}">${tr("Cómo usamos estas tecnologías", "How we use these technologies")}</a></div>
    </div>
  </div>
</section>
<section class="section ${isSecurity ? "on-ink" : "on-white rule-top"}" aria-labelledby="engagement">
  <div class="wrap">
    ${sheetLabel("→", L("Cómo trabajamos", "How the engagement works"), lang)}
    <div class="section-head">
      <h2 id="engagement">${isSecurity ? tr("Evaluación autorizada, de principio a fin.", "Authorized assessment, end to end.") : tr("Del descubrimiento a la operación.", "From discovery to operation.")}</h2>
      <p>${
        isSecurity
          ? tr("Solo evaluamos sistemas propios del cliente o expresamente autorizados por escrito. No pidas ni envíes credenciales por canales públicos.", "We only assess systems owned by the client or explicitly authorized in writing. Never share credentials through public channels.")
          : tr("Cada fase se revisa contigo antes de avanzar. El código, la documentación y los accesos son tuyos.", "Every phase is reviewed with you before moving on. The code, documentation and access are yours.")
      }</p>
    </div>
    <ol class="process steps-${steps.length}">${steps.map(([a, b]) => `<li><h3>${t(a, lang)}</h3><p>${t(b, lang)}</p></li>`).join("")}</ol>
  </div>
</section>
${
  evidence.length
    ? `<section class="section" aria-labelledby="evidence-title"><div class="wrap">
  ${sheetLabel("E", L("Evidencia", "Evidence"), lang)}
  <h2 id="evidence-title" class="sr-only">${tr("Trabajo relacionado", "Related work")}</h2>
  <ul class="index">${evidence
    .map(
      (w) => `<li><a class="index-row" href="${workPath(w, lang)}"><span class="num">${statusTag(w.status, lang)}</span><h3>${esc(tx(w.name, lang))}</h3><p>${t(w.summary, lang)}</p><span class="go" aria-hidden="true">→</span></a></li>`,
    )
    .join("")}</ul>
</div></section>`
    : ""
}
<section class="section rule-top" aria-labelledby="related-title">
  <div class="wrap">
    ${sheetLabel(track.code, L("Servicios relacionados", "Related services"), lang)}
    <h2 id="related-title" class="sr-only">${tr("Servicios relacionados", "Related services")}</h2>
    <ul class="index">${related
      .map((s) => `<li><a class="index-row" href="${servicePath(s, lang)}"><span class="num">${track.code}</span><h3>${t(s.name, lang)}</h3><p>${t(s.short, lang)}</p><span class="go" aria-hidden="true">→</span></a></li>`)
      .join("")}</ul>
  </div>
</section>
${ctaBand(lang)}`;

  const schema = [
    breadcrumbSchema(lang, trail),
    {
      "@type": "Service",
      name: tx(service.name, lang),
      description: tx(service.short, lang),
      serviceType: tx(track.title, lang),
      provider: { "@type": "Organization", name: "CodeGurex", url: `${SITE.origin}/` },
      areaServed: "Worldwide",
      url: `${SITE.origin}${paths[lang]}`,
    },
  ];

  return page({
    lang,
    paths,
    current: "services",
    title: tx(service.seo, lang),
    description: `${tx(service.short, lang)} ${tx(service.problem, lang)}`.slice(0, 158).replace(/\s+\S*$/, "…"),
    body,
    schema,
  });
}
