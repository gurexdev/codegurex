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

  const featured = ["prez", "barbus", "crm"].map(workById);
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
    <a class="arrow-link" href="${workPath(w, lang)}">${t(UI.readCase, lang)}</a>
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
      <h1 id="hero-title"><span>Technology.</span><span>Software.</span><span class="accent">Security.</span></h1>
      <p class="hero-statement">${tr("Ingeniería de soluciones digitales para un mundo conectado.", "Engineering digital solutions for a connected world.")}</p>
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
      <a class="arrow-link" href="${route("products", lang)}">${tr("Ver productos", "View products")}</a>
    </div>
  </div>
</section>

<section class="section on-white rule-top" aria-labelledby="work-title">
  <div class="wrap">
    ${sheetLabel("02", L("Trabajo seleccionado", "Selected work"), lang)}
    <div class="section-head">
      <h2 id="work-title">${tr("Software que hoy usan negocios reales.", "Software real businesses use today.")}</h2>
      <p>${tr(
        "Cada proyecto indica su estado y la evidencia que lo respalda. No publicamos métricas que no podamos demostrar.",
        "Every project states its status and the evidence behind it. We do not publish metrics we cannot prove.",
      )}</p>
    </div>
    <div class="plates">${plates}</div>
    <p class="actions more"><a class="btn btn-line" href="${route("work", lang)}">${t(UI.allWork, lang)}</a></p>
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
      <h2 id="tech-title">${tr("Herramientas elegidas por el problema, no por moda.", "Tools chosen for the problem, not for fashion.")}</h2>
      <p>${tr(
        "TypeScript, Next.js y React en la interfaz; PostgreSQL con Row Level Security en los datos; Cloudflare, Vercel y GitHub Actions para desplegar; Python para herramientas de seguridad.",
        "TypeScript, Next.js and React on the interface; PostgreSQL with Row Level Security for data; Cloudflare, Vercel and GitHub Actions to ship; Python for security tooling.",
      )}</p>
    </div>
    <a class="arrow-link" href="${route("technology", lang)}">${tr("Cómo usamos cada tecnología", "How we use each technology")}</a>
  </div>
</section>
${ctaBand(lang)}`;

  const description = tr(
    "CodeGurex diseña, desarrolla y protege productos digitales: sitios web, aplicaciones, plataformas SaaS, integraciones con IA y evaluaciones de ciberseguridad.",
    "CodeGurex designs, develops and secures digital products: websites, applications, SaaS platforms, AI integrations and cybersecurity assessments.",
  );

  const schema = [
    {
      "@type": "Organization",
      "@id": `${SITE.origin}/#organization`,
      name: "CodeGurex",
      url: `${SITE.origin}/`,
      logo: `${SITE.origin}/favicon-512.png`,
      email: SITE.email,
      telephone: SITE.phone,
      slogan: "Technology. Software. Security.",
      description,
      foundingLocation: { "@type": "Country", name: "Ecuador" },
      areaServed: "Worldwide",
      founder: { "@type": "Person", name: "Jose Alejandro Gutierrez Guerrero", jobTitle: "CEO & Founder" },
      sameAs: [SITE.linkedin, SITE.github],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        telephone: SITE.phone,
        availableLanguage: ["es", "en"],
      },
      knowsAbout: ["Software engineering", "Web application development", "SaaS development", "Application security", "API security", "AI security", "AI integration"],
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
    title: tr("CodeGurex — Tecnología, software y seguridad", "CodeGurex — Technology, Software & Security"),
    description,
    body,
    schema,
  });
}
