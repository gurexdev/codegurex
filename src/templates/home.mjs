import { pageMeta, pageH1 } from "../content/seo-helpers.mjs";
import {
  t,
  tx,
  esc,
  route,
  servicePath,
  workPath,
  workById,
  statusTag,
  sheetLabel,
  ctaBand,
  picture,
  flow,
  page,
  SITE,
  UI,
  SERVICES,
  TRACKS,
  ROUTES,
} from "./base.mjs";
import { heroDrawing } from "./drawing.mjs";
import { ENGAGEMENT } from "../content/services.mjs";

const L = (es, en) => ({ es, en });

export function home(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);

  const matrix = ["build", "integrate", "secure"]
    .map((key) => {
      const track = TRACKS[key];
      const items = SERVICES.filter((s) => s.track === key)
        .map((s) => `<li><a href="${servicePath(s, lang)}">${t(s.name, lang)}</a></li>`)
        .join("");
      return `<article class="matrix-col">
  <header><span class="track-code">${track.code}</span><span class="mono muted">${SERVICES.filter((s) => s.track === key).length} ${tr("servicios", "services")}</span></header>
  <h3>${t(track.name, lang)}</h3>
  <p class="sub">${t(track.title, lang)}</p>
  <p>${t(track.summary, lang)}</p>
  <ul>${items}</ul>
</article>`;
    })
    .join("");

  const featured = ["brisel", "prez", "adulam"].map(workById);
  const more = ["crm", "barbus", "costflow"].map(workById);
  const moreCards = more
    .map(
      (w) => `<li class="work-item">
  <a href="${workPath(w, lang)}">
    <div class="thumb">${picture(w.images[0][0], tx(w.images[0][1], lang), { sizes: "(min-width: 1180px) 30vw, (min-width: 760px) 45vw, 100vw" })}</div>
    <div class="meta mono"><span>${t(w.sector, lang).split(" · ")[0]}</span>${statusTag(w.status, lang)}</div>
    <h3>${esc(tx(w.name, lang))}</h3>
    <p>${t(w.kind, lang)}</p>
  </a>
</li>`,
    )
    .join("");
  const plates = featured
    .map((w, i) => {
      const fig = w.images.length
        ? `<figure class="plate-figure"><div class="bar mono"><span>PL-0${i + 1}</span><span>${esc(tx(w.name, lang))}</span></div>${picture(w.images[0][0], tx(w.images[0][1], lang))}<figcaption>${t(w.images[0][1], lang)}</figcaption></figure>`
        : `<figure class="plate-figure"><div class="bar mono"><span>PL-0${i + 1}</span><span>${esc(tx(w.name, lang))} · ${tr("Arquitectura", "Architecture")}</span></div><div class="plate-diagram">${flow(w.architecture, lang)}</div><figcaption>${tr("Diagrama de arquitectura basado en el código del proyecto. Las capturas se publicarán al abrir el entorno de staging.", "Architecture diagram based on the project's code. Screenshots will be published when the staging environment opens.")}</figcaption></figure>`;
      return `<article class="plate">
  ${fig}
  <div class="plate-copy">
    <div class="plate-meta mono"><span>${t(w.sector, lang)}</span>${statusTag(w.status, lang)}</div>
    <h3>${esc(tx(w.name, lang))}</h3>
    <p class="kind">${t(w.kind, lang)}</p>
    <p>${t(w.summary, lang)}</p>
    <ul class="tags">${w.stack
      .slice(0, 4)
      .map(([name]) => `<li>${esc(tx(name, lang))}</li>`)
      .join("")}</ul>
    <a class="arrow-link" href="${workPath(w, lang)}">${tr("Caso completo:", "Full case study:")} ${esc(tx(w.name, lang))}</a>
  </div>
</article>`;
    })
    .join("");

  const process = ENGAGEMENT.build
    .map(([name, desc]) => `<li><h3>${t(name, lang)}</h3><p>${t(desc, lang)}</p></li>`)
    .join("");

  const principles = [
    [L("Autorización antes de evaluar", "Authorization before testing"), L("Ninguna prueba sale del alcance acordado por escrito.", "No test leaves the scope agreed in writing.")],
    [L("Evidencia antes que suposición", "Evidence before assumption"), L("Cada hallazgo se puede explicar, reproducir y verificar.", "Every finding can be explained, reproduced and verified.")],
    [L("Prioridad antes que volumen", "Priority before volume"), L("Un buen informe distingue lo crítico de lo accesorio.", "A good report separates what is critical from what is not.")],
    [L("Seguridad desde el diseño", "Security by design"), L("Lo aplicamos primero en el software que construimos.", "We apply it first to the software we build.")],
  ]
    .map(([a, b], i) => `<li><b>0${i + 1}</b><strong>${t(a, lang)}</strong><span>${t(b, lang)}</span></li>`)
    .join("");

  const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div>
      <p class="hero-kicker mono"><span>CODEGUREX</span><span>${tr("Tecnología · Software · Seguridad", "Technology · Software · Security")}</span></p>
      <p class="hero-display"><span>Technology.</span><span>Software.</span><span class="accent">Security.</span></p>
      <h1 id="hero-title" class="hero-statement">${esc(pageH1("home", lang))}</h1>
      <p class="lead">${tr(
        "Diseñamos, desarrollamos y protegemos productos digitales, sistemas de negocio y aplicaciones inteligentes.",
        "We design, develop and secure digital products, business systems and intelligent applications.",
      )}</p>
      <div class="actions">
        <a class="btn btn-blue" href="${route("contact", lang)}">${t(UI.discuss, lang)}</a>
        <a class="btn btn-line" href="${route("work", lang)}">${t(UI.explore, lang)}</a>
      </div>
    </div>
    <div class="hero-figure">${heroDrawing(lang)}</div>
  </div>
</section>

<section class="global-strip" aria-labelledby="global-title">
  <div class="wrap">
    <h2 id="global-title" class="mono">${tr("Equipo remoto para clientes de cualquier país", "A remote team for clients in any country")}</h2>
    <ul>
      <li><strong>GMT-5</strong><span>${tr("Horario alineado con EE. UU. y Latinoamérica", "Working hours aligned with the US and Latin America")}</span></li>
      <li><strong>USD</strong><span>${tr("Facturación en dólares estadounidenses", "Billing in US dollars")}</span></li>
      <li><strong>ES · EN</strong><span>${tr("Reuniones y documentación en español e inglés", "Meetings and documentation in English and Spanish")}</span></li>
      <li><strong>100 %</strong><span>${tr("Remoto: videollamadas y entregas revisables en línea", "Remote: video calls and reviewable online previews")}</span></li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="cap-title">
  <div class="wrap">
    ${sheetLabel("01", L("Capacidades", "Capabilities"), lang)}
    <div class="section-head">
      <h2 id="cap-title">${tr("Construimos, integramos y protegemos tecnología.", "We build, integrate and secure technology.")}</h2>
      <p>${tr(
        "Un solo equipo responsable del sistema completo: desde la base de datos y los permisos hasta la interfaz, el despliegue y la evaluación de seguridad.",
        "One team accountable for the whole system: from the database and permissions to the interface, deployment and security assessment.",
      )}</p>
    </div>
    <div class="matrix">${matrix}</div>
    <div class="matrix-foot">
      <p><strong>D · ${tr("Productos e innovación", "Products & innovation")}.</strong> ${tr(
        "Desarrollamos productos propios —CodeGurex Sentinel, BARBUS, CostFlow— y herramientas internas. Cada uno muestra su estado real.",
        "We build our own products — CodeGurex Sentinel, BARBUS, CostFlow — and internal tools. Each shows its real status.",
      )}</p>
      <a class="arrow-link" href="${route("products", lang)}">${tr("Productos de CodeGurex", "CodeGurex products")}</a>
    </div>
  </div>
</section>

<section class="section on-white rule-top" aria-labelledby="work-title">
  <div class="wrap">
    ${sheetLabel("02", L("Trabajo seleccionado", "Selected work"), lang)}
    <div class="section-head">
      <h2 id="work-title">${tr("Productos digitales que se ven, se usan y venden.", "Digital products that look sharp, work hard and sell.")}</h2>
      <p>${tr(
        "Cada proyecto indica su estado y la evidencia que lo respalda. No publicamos métricas que no podamos demostrar.",
        "Every project states its status and the evidence behind it. We do not publish metrics we cannot prove.",
      )}</p>
    </div>
    <div class="plates">${plates}</div>
    <h3 class="more-title mono">${tr("Más sistemas en uso", "More systems in use")}</h3>
    <ul class="work-grid">${moreCards}</ul>
    <p class="actions more"><a class="btn btn-line" href="${route("work", lang)}">${tr("Ver el portafolio completo", "See the full portfolio")}</a></p>
  </div>
</section>

<section class="section rule-top" aria-labelledby="process-title">
  <div class="wrap">
    ${sheetLabel("03", L("Método", "Method"), lang)}
    <div class="section-head">
      <h2 id="process-title">${tr("Entendemos el negocio antes de escribir código.", "We understand the business before we write code.")}</h2>
      <p>${tr(
        "Fases cortas, criterios de aceptación definidos y verificación antes de publicar. Una fase se cierra con evidencia, no con una fecha.",
        "Short phases, defined acceptance criteria and verification before release. A phase closes with evidence, not with a date.",
      )}</p>
    </div>
    <ol class="process">${process}</ol>
  </div>
</section>

<section class="section on-ink" aria-labelledby="division-title">
  <div class="wrap">
    ${sheetLabel("04", L("División de seguridad", "Security division"), lang)}
    <div class="division">
      <div>
        <p class="mono">Security for the AI Era</p>
        <h2 id="division-title" class="statement">${tr(
          "Las aplicaciones ahora razonan. Los agentes <em>actúan</em>. La seguridad tiene que evolucionar con ellos.",
          "Applications now reason. Agents <em>take action</em>. Security has to evolve with them.",
        )}</h2>
        <p class="lead">${tr(
          "Evaluamos aplicaciones, APIs, sistemas con IA e infraestructura para convertir una exposición incierta en prioridades claras.",
          "We assess applications, APIs, AI systems and infrastructure to turn uncertain exposure into clear priorities.",
        )}</p>
        <div class="actions">
          <a class="btn" href="${route("contact", lang)}?track=secure">${t(UI.requestAssessment, lang)}</a>
          <a class="btn btn-line" href="${route("sentinel", lang)}">CodeGurex Sentinel</a>
        </div>
      </div>
      <ul class="principles">${principles}</ul>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="tech-title">
  <div class="wrap">
    ${sheetLabel("05", L("Tecnología", "Technology"), lang)}
    <div class="section-head">
      <h2 id="tech-title">${tr("Ingeniería de software con estándares de producción.", "Software engineering to production standards.")}</h2>
      <p>${tr(
        "Next.js 16 con React Server Components, PostgreSQL con Row Level Security verificada por pruebas, despliegue en el edge con Cloudflare Workers, CI con Playwright y pgTAP, y modelado de amenazas antes de escribir la primera línea.",
        "Next.js 16 with React Server Components, PostgreSQL with test-verified Row Level Security, edge deployment on Cloudflare Workers, CI with Playwright and pgTAP, and threat modelling before the first line of code.",
      )}</p>
    </div>
    <a class="arrow-link" href="${route("technology", lang)}">${tr("Ver nuestro stack y prácticas de ingeniería", "See our stack and engineering practices")}</a>
  </div>
</section>
${ctaBand(lang)}`;

  const description = pageMeta("home", lang).description;

  const schema = [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.origin}/#organization`,
      name: "CodeGurex",
      url: `${SITE.origin}/`,
      logo: `${SITE.origin}/favicon-512.png`,
      image: `${SITE.origin}/assets/og-${lang}.png`,
      email: SITE.email,
      telephone: SITE.phone,
      slogan: "Technology. Software. Security.",
      description,
      address: { "@type": "PostalAddress", addressLocality: "Manta", addressRegion: "Manabí", addressCountry: "EC" },
      areaServed: [{ "@type": "Place", name: "Worldwide" }, { "@type": "Country", name: "Ecuador" }],
      foundingLocation: { "@type": "Place", name: "Manta, Ecuador" },
      founder: { "@type": "Person", name: "Jose Alejandro Gutierrez Guerrero", jobTitle: "CEO & Founder" },
      sameAs: [SITE.linkedin, SITE.github],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        telephone: SITE.phone,
        availableLanguage: ["es", "en"],
      },
      knowsAbout: ["Desarrollo de software", "Diseño de páginas web", "Desarrollo SaaS", "Pentesting", "Seguridad de APIs", "Seguridad de IA", "Integración de IA"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: tr("Servicios de CodeGurex", "CodeGurex services"),
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: tx(s.name, lang), url: `${SITE.origin}${servicePath(s, lang)}` },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.origin}/#website`,
      url: `${SITE.origin}/`,
      name: "CodeGurex",
      inLanguage: ["es", "en"],
      publisher: { "@id": `${SITE.origin}/#organization` },
    },
  ];

  return page({
    lang,
    paths: ROUTES.home,
    current: "home",
    ...pageMeta("home", lang),
    body,
    schema,
  });
}
