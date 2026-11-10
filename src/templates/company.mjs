import {
  t,
  tx,
  esc,
  route,
  workPath,
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
  ROUTES,
  external,
} from "./base.mjs";

const L = (es, en) => ({ es, en });

/* ---------- Technology ---------- */
const TECH = [
  {
    code: "T1",
    name: L("Interfaz", "Frontend"),
    why: L(
      "Interfaces rápidas y accesibles. Usamos frameworks cuando el producto los necesita y HTML sin dependencias cuando no.",
      "Fast, accessible interfaces. We use frameworks when the product needs them and dependency-free HTML when it does not.",
    ),
    rows: [
      ["HTML · CSS · JavaScript", L("Sitios livianos y fáciles de mantener (Adulam, PsicoQuiz, este sitio)", "Lightweight, maintainable sites (Adulam, PsicoQuiz, this site)")],
      ["TypeScript", L("Modo estricto en productos con lógica de negocio", "Strict mode in products with business logic")],
      ["React 19 · Next.js 16", L("App Router, Server Components y Server Actions", "App Router, Server Components and Server Actions")],
      ["Tailwind CSS 4", L("Sistemas de interfaz con tokens propios", "Interface systems with custom tokens")],
      ["PWA", L("Aplicaciones instalables para uso móvil diario", "Installable apps for daily mobile use")],
    ],
  },
  {
    code: "T2",
    name: L("Backend y datos", "Backend & data"),
    why: L(
      "La autorización vive en el servidor y en la base de datos, nunca solo en la interfaz.",
      "Authorization lives on the server and in the database — never in the interface alone.",
    ),
    rows: [
      ["PostgreSQL", L("Modelo relacional con migraciones versionadas", "Relational model with versioned migrations")],
      ["Supabase", L("Auth, Postgres, Storage y Row Level Security", "Auth, Postgres, Storage and Row Level Security")],
      ["Prisma 7", L("Acceso tipado a datos en herramientas internas", "Typed data access in internal tools")],
      ["Zod", L("Validación de cada entrada en el servidor", "Validation of every server input")],
      ["REST · Route Handlers · Webhooks", L("APIs e integraciones", "APIs and integrations")],
    ],
  },
  {
    code: "T3",
    name: L("Infraestructura y entrega", "Infrastructure & delivery"),
    why: L(
      "Despliegues reproducibles, entornos de vista previa y nada de secretos en el repositorio.",
      "Reproducible deployments, preview environments and no secrets in the repository.",
    ),
    rows: [
      ["Cloudflare Workers · OpenNext", L("Next.js ejecutado en el borde", "Next.js running at the edge")],
      ["Vercel", L("Despliegue de productos y demos", "Product and demo deployment")],
      ["GitHub Pages · GitHub Actions", L("CI, validación y despliegue continuo", "CI, validation and continuous deployment")],
      ["gitleaks", L("Detección de secretos en CI", "Secret scanning in CI")],
    ],
  },
  {
    code: "T4",
    name: L("Calidad", "Quality"),
    why: L("Una fase se cierra con pruebas, no con una impresión.", "A phase closes with tests, not with an impression."),
    rows: [
      ["Vitest", L("Pruebas unitarias de esquemas y reglas", "Unit tests for schemas and rules")],
      ["Playwright · axe-core", L("E2E, responsive y accesibilidad", "E2E, responsive and accessibility")],
      ["pgTAP", L("Pruebas SQL de aislamiento entre usuarios", "SQL tests for isolation between users")],
      ["ESLint · Prettier", L("Cero avisos permitidos", "Zero warnings allowed")],
    ],
  },
  {
    code: "T5",
    name: L("Seguridad", "Security"),
    why: L(
      "Marcos públicos y herramientas conocidas, aplicados con criterio y siempre con autorización.",
      "Public frameworks and well-known tools, applied with judgement and always with authorization.",
    ),
    rows: [
      ["OWASP Top 10 · ASVS · API Security", L("Referencia para evaluar aplicaciones y APIs", "Reference for assessing applications and APIs")],
      ["OWASP Top 10 for LLM Applications", L("Referencia para sistemas con IA", "Reference for AI systems")],
      ["Burp Suite", L("Pruebas de aplicaciones web", "Web application testing")],
      ["Python", L("Herramientas propias: cifrado, phishing, escaneo", "In-house tooling: encryption, phishing, scanning")],
      ["Linux · Redes", L("Formación continua y laboratorios", "Continuous training and labs")],
      ["RLS · MFA TOTP · CSP · HSTS", L("Controles que implementamos en nuestros productos", "Controls we implement in our products")],
    ],
  },
  {
    code: "T6",
    name: L("IA", "AI"),
    why: L(
      "Práctica en crecimiento. Integramos modelos con permisos mínimos, revisión humana y registros; evaluamos sistemas con IA con los marcos de OWASP. Aún no publicamos un caso de IA en producción.",
      "A growing practice. We integrate models with least privilege, human review and logging, and we assess AI systems using OWASP frameworks. We have not yet published an AI case in production.",
    ),
    rows: [
      [L("Integración de modelos", "Model integration"), L("Desde el servidor; nunca claves en el cliente", "Server-side; never keys in the client")],
      [L("Automatización", "Automation"), L("Tareas programadas y flujos con aprobación humana", "Scheduled jobs and human-approved workflows")],
    ],
  },
];

export function technology(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const trail = [[route("technology", lang), tr("Tecnología", "Technology")]];
  const groups = TECH.map(
    (g) => `<section class="tech-group" aria-labelledby="${g.code}">
  <div><p class="mono muted">${g.code}</p><h2 id="${g.code}">${t(g.name, lang)}</h2><p>${t(g.why, lang)}</p></div>
  <table class="spec-table"><thead><tr><th scope="col">${tr("Tecnología", "Technology")}</th><th scope="col">${tr("Cómo la usamos", "How we use it")}</th></tr></thead><tbody>
  ${g.rows.map(([a, b]) => `<tr><th scope="row">${t(a, lang)}</th><td>${t(b, lang)}</td></tr>`).join("")}
  </tbody></table>
</section>`,
  ).join("");

  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <h1>${tr("Tecnología que usamos en proyectos reales.", "Technology we use on real projects.")}</h1>
        <p class="lead">${tr(
          "Sin muros de logotipos. Cada tecnología aparece aquí porque la usamos en un proyecto verificable, y explicamos para qué.",
          "No wall of logos. Each technology is listed because we use it on a verifiable project, and we explain what for.",
        )}</p>
      </div>
      ${titleBlock([
        [tr("Criterio", "Rule"), tr("Solo tecnologías verificadas", "Verified technologies only")],
        [tr("Grupos", "Groups"), String(TECH.length)],
        [tr("Actualizado", "Updated"), SITE.updated],
      ])}
    </div>
  </div>
</section>
<section class="section"><div class="wrap">${groups}</div></section>
${ctaBand(lang)}`;

  return page({
    lang,
    paths: ROUTES.technology,
    current: "technology",
    title: tr("Tecnología y stack de ingeniería | CodeGurex", "Technology and engineering stack | CodeGurex"),
    description: tr(
      "TypeScript, Next.js, React, PostgreSQL, Supabase con RLS, Cloudflare, Vercel, pruebas automatizadas y herramientas de seguridad: cómo y para qué las usa CodeGurex.",
      "TypeScript, Next.js, React, PostgreSQL, Supabase with RLS, Cloudflare, Vercel, automated testing and security tooling: how and why CodeGurex uses them.",
    ),
    body,
    schema: [breadcrumbSchema(lang, trail)],
  });
}

/* ---------- Products ---------- */
const PRODUCTS = [
  {
    name: "CodeGurex Sentinel",
    kind: L("Seguridad · Línea de producto", "Security · Product line"),
    status: "development",
    text: L(
      "Herramientas para observar y priorizar la exposición de sistemas modernos. Primer módulo: análisis de logs de autenticación.",
      "Tools to observe and prioritize exposure in modern systems. First module: authentication-log analysis.",
    ),
    href: (lang) => route("sentinel", lang),
  },
  {
    name: "BARBUS",
    kind: L("SaaS · Barberías", "SaaS · Barbershops"),
    status: "production",
    text: L("Gestión de agenda, ingresos, gastos, inventario y empleados para barberías.", "Scheduling, income, expenses, inventory and staff management for barbershops."),
    href: (lang) => workPath(workById("barbus"), lang),
  },
  {
    name: "CostFlow",
    kind: L("SaaS · Pequeños negocios", "SaaS · Small businesses"),
    status: "published",
    text: L("Compras, ventas, fiados e inventario con utilidad automática.", "Purchases, sales, store credit and inventory with automatic profit."),
    href: (lang) => workPath(workById("costflow"), lang),
  },
  {
    name: "CodeGurex Finance",
    kind: L("Herramienta interna", "Internal tool"),
    status: "internal",
    text: L(
      "Ingresos, gastos, suscripciones, clientes y proyectos de la operación de CodeGurex. Next.js 16, Prisma 7, Supabase Auth y aislamiento de datos por propietario.",
      "Income, expenses, subscriptions, customers and projects for CodeGurex operations. Next.js 16, Prisma 7, Supabase Auth and per-owner data isolation.",
    ),
  },
];

export function products(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const trail = [[route("products", lang), tr("Productos", "Products")]];
  const rows = PRODUCTS.map((p, i) => {
    const inner = `<span class="num">D.${String(i + 1).padStart(2, "0")}</span><h3>${esc(p.name)}<br><small class="mono muted">${t(p.kind, lang)}</small></h3><p>${statusTag(p.status, lang)}<br>${t(p.text, lang)}</p><span class="go" aria-hidden="true">${p.href ? "→" : ""}</span>`;
    return `<li>${p.href ? `<a class="index-row" href="${p.href(lang)}">${inner}</a>` : `<div class="index-row">${inner}</div>`}</li>`;
  }).join("");

  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <h1>${tr("Productos e innovación.", "Products & innovation.")}</h1>
        <p class="lead">${tr(
          "Construimos productos propios para resolver problemas que conocemos de cerca. También es la forma más honesta de demostrar lo que sabemos hacer.",
          "We build our own products to solve problems we know first-hand. It is also the most honest way to show what we can do.",
        )}</p>
      </div>
      ${titleBlock([
        [tr("Leyenda", "Legend"), `${statusTag("production", lang)}<br>${statusTag("development", lang)}<br>${statusTag("planned", lang)}`],
      ])}
    </div>
  </div>
</section>
<section class="section" aria-labelledby="products-list"><div class="wrap"><h2 id="products-list" class="sr-only">${tr("Productos", "Products")}</h2><ul class="index">${rows}</ul></div></section>
${ctaBand(lang)}`;

  return page({
    lang,
    paths: ROUTES.products,
    current: "products",
    title: tr("Productos e innovación | CodeGurex", "Products & innovation | CodeGurex"),
    description: tr(
      "Productos propios de CodeGurex: Sentinel (seguridad), BARBUS y CostFlow (SaaS) y herramientas internas, cada uno con su estado real.",
      "CodeGurex's own products: Sentinel (security), BARBUS and CostFlow (SaaS) and internal tools, each with its real status.",
    ),
    body,
    schema: [breadcrumbSchema(lang, trail)],
  });
}

/* ---------- Sentinel ---------- */
export function sentinel(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const trail = [
    [route("products", lang), tr("Productos", "Products")],
    [route("sentinel", lang), "Sentinel"],
  ];
  const col = (status, title, items) => `<section>
  ${statusTag(status, lang)}
  <h3>${t(title, lang)}</h3>
  <ul>${items.map(([a, b]) => `<li><strong>${t(a, lang)}</strong><span>${t(b, lang)}</span></li>`).join("")}</ul>
</section>`;

  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <p class="mono muted">Security for the AI Era</p>
        <h1>CodeGurex Sentinel</h1>
        <p class="lead">${tr(
          "Una línea de producto para observar, entender y priorizar la exposición de aplicaciones, APIs, identidades, agentes de IA e infraestructura.",
          "A product line to observe, understand and prioritize exposure across applications, APIs, identities, AI agents and infrastructure.",
        )}</p>
      </div>
      ${titleBlock([
        [tr("Estado general", "Overall status"), statusTag("development", lang)],
        [tr("Primer módulo", "First module"), tr("Análisis de logs de autenticación", "Authentication-log analysis")],
        [tr("Acceso", "Access"), tr("Demostración bajo pedido", "Demo on request")],
      ])}
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="split">
      <h2>${tr("Qué es", "What it is")}</h2>
      <div class="body"><p class="lead">${tr(
        "Sentinel reúne las herramientas defensivas que desarrollamos en CodeGurex. Su objetivo es que un equipo pueda ver qué está expuesto, cómo se conectan los riesgos y qué corregir primero.",
        "Sentinel brings together the defensive tools we build at CodeGurex. Its goal is to let a team see what is exposed, how risks connect and what to fix first.",
      )}</p></div>
    </div>
    <div class="split">
      <h2>${tr("El problema", "The problem")}</h2>
      <div class="body"><p>${tr(
        "Las aplicaciones modernas conectan modelos, APIs, agentes y servicios en la nube. La superficie de ataque crece más rápido que la capacidad de un equipo pequeño para revisarla, y los registros que podrían alertar de un ataque rara vez se analizan.",
        "Modern applications connect models, APIs, agents and cloud services. The attack surface grows faster than a small team's ability to review it, and the logs that could warn of an attack are rarely analysed.",
      )}</p></div>
    </div>
    <div class="split">
      <h2>${tr("Implementación actual", "Current implementation")}</h2>
      <div class="body">
        <p>${tr(
          "El primer módulo disponible es <strong>Blue Sentinel</strong>: un analizador defensivo en Python que procesa logs de autenticación, detecta patrones de fuerza bruta y genera evidencia estructurada en JSON, con pruebas unitarias.",
          "The first available module is <strong>Blue Sentinel</strong>: a defensive Python analyzer that processes authentication logs, detects brute-force patterns and produces structured JSON evidence, with unit tests.",
        )}</p>
        <p class="note">${tr(
          "Por tratarse de una herramienta defensiva, el código no es público. La demostración se comparte con contexto profesional verificado.",
          "As a defensive tool, its code is not public. The demonstration is shared with verified professional context.",
        )}</p>
      </div>
    </div>
  </div>
</section>
<section class="section on-ink" aria-labelledby="roadmap-title">
  <div class="wrap">
    ${sheetLabel("R", L("Hoja de ruta", "Roadmap"), lang)}
    <div class="section-head">
      <h2 id="roadmap-title">${tr("Lo que existe, lo que se construye y lo que viene.", "What exists, what is being built and what comes next.")}</h2>
      <p>${tr("Nunca presentamos una capacidad futura como si ya existiera.", "We never present a future capability as if it already existed.")}</p>
    </div>
    <div class="roadmap">
      ${col("available", L("Hoy", "Today"), [
        [L("Análisis de logs de autenticación", "Authentication-log analysis"), L("Detección de fuerza bruta con evidencia en JSON", "Brute-force detection with JSON evidence")],
      ])}
      ${col("development", L("Ahora", "Now"), [
        [L("Descubrimiento de exposición web", "Web exposure discovery"), L("Dominios, aplicaciones y cabeceras", "Domains, applications and headers")],
        [L("Priorización de hallazgos", "Finding prioritization"), L("Por exposición, impacto y esfuerzo", "By exposure, impact and effort")],
      ])}
      ${col("planned", L("Después", "Next"), [
        [L("Superficie de APIs", "API surface"), L("Inventario y autorización", "Inventory and authorization")],
        [L("Sistemas con IA y agentes", "AI systems and agents"), L("Permisos, herramientas y servidores MCP", "Permissions, tools and MCP servers")],
        [L("Nube", "Cloud"), L("Configuración e identidad", "Configuration and identity")],
      ])}
    </div>
  </div>
</section>
${ctaBand(lang)}`;

  return page({
    lang,
    paths: ROUTES.sentinel,
    current: "products",
    title: tr("CodeGurex Sentinel — Seguridad para la era de la IA", "CodeGurex Sentinel — Security for the AI Era"),
    description: tr(
      "CodeGurex Sentinel: línea de producto de seguridad. Disponible: análisis de logs de autenticación. En desarrollo: exposición web. Planificado: APIs, IA y nube.",
      "CodeGurex Sentinel: a security product line. Available: authentication-log analysis. In development: web exposure. Planned: APIs, AI and cloud.",
    ),
    body,
    schema: [breadcrumbSchema(lang, trail)],
  });
}

/* ---------- About ---------- */
export function about(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const trail = [[route("about", lang), tr("Empresa", "Company")]];
  const principles = [
    [L("Práctico", "Practical"), L("Tecnología que resuelve un problema concreto del negocio, no tecnología por sí misma.", "Technology that solves a concrete business problem — not technology for its own sake.")],
    [L("Seguro desde el diseño", "Secure by design"), L("Permisos, datos y amenazas se piensan antes de escribir la interfaz.", "Permissions, data and threats are considered before the interface is written.")],
    [L("Verificable", "Verifiable"), L("Lo que afirmamos se puede comprobar: código, pruebas, capturas o documentación.", "What we claim can be checked: code, tests, screenshots or documentation.")],
    [L("Transparente", "Transparent"), L("El código y los accesos pertenecen al cliente. Explicamos lo técnico en lenguaje claro.", "Code and access belong to the client. We explain technical matters in plain language.")],
    [L("Responsable", "Responsible"), L("Solo evaluamos sistemas autorizados y tratamos cada dato con cuidado.", "We only assess authorized systems and treat every piece of data with care.")],
  ];
  const learning = ["CompTIA Security+", "eJPT", "IBM", "Google", "Cisco Networking Academy", "TryHackMe"];

  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <h1>${tr("Una empresa de ingeniería independiente.", "An independent engineering company.")}</h1>
        <p class="lead">${tr(
          "CodeGurex diseña, construye y protege software. Nació en Manta, Ecuador, y trabaja con organizaciones de cualquier lugar que necesitan tecnología bien hecha y segura.",
          "CodeGurex designs, builds and secures software. It was born in Manta, Ecuador, and works with organizations anywhere that need technology done well and done securely.",
        )}</p>
      </div>
      ${titleBlock([
        [tr("Origen", "Origin"), "Manta, Ecuador"],
        [tr("Atención", "Service"), tr("Internacional · remoto", "International · remote")],
        [tr("Software para clientes", "Client software"), tr("Desde 2022", "Since 2022")],
        [tr("Idiomas", "Languages"), tr("Español · Inglés", "Spanish · English")],
      ])}
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="split">
      <h2>${tr("Por qué existimos", "Why we exist")}</h2>
      <div class="body">
        <p class="lead">${tr(
          "Una aplicación puede verse bien y seguir expuesta. Un sistema puede funcionar y aun así obligar a un negocio a trabajar a mano. CodeGurex existe para cerrar esa distancia: construir lo que el negocio necesita y asegurarse de que resista.",
          "An application can look good and still be exposed. A system can work and still force a business to do things by hand. CodeGurex exists to close that gap: build what the business needs and make sure it holds up.",
        )}</p>
        <p>${tr(
          "Empezamos desarrollando para negocios reales —un consultorio médico, barberías, un fabricante— y aprendimos que la seguridad no es un servicio aparte: es una propiedad del software. Por eso las dos disciplinas viven en la misma empresa.",
          "We started by building for real businesses — a medical practice, barbershops, a manufacturer — and learned that security is not a separate service: it is a property of software. That is why both disciplines live in the same company.",
        )}</p>
      </div>
    </div>
    <div class="split">
      <h2>${tr("Cómo pensamos la ingeniería", "Our engineering philosophy")}</h2>
      <div class="body"><ul class="principles-light checklist">${principles.map(([a, b]) => `<li><strong>${t(a, lang)}.</strong> ${t(b, lang)}</li>`).join("")}</ul></div>
    </div>
    <div class="split">
      <h2>${tr("Nuestro enfoque de seguridad", "Our approach to security")}</h2>
      <div class="body"><p>${tr(
        "Aplicamos primero en nuestros productos lo que recomendamos a otros: Row Level Security, MFA para el personal, validación en el servidor, cabeceras de seguridad, pruebas de aislamiento y modelos de amenazas documentados. Cuando evaluamos sistemas de terceros, lo hacemos con alcance autorizado por escrito y entregamos evidencia, no listas genéricas.",
        "We first apply to our own products what we recommend to others: Row Level Security, MFA for staff, server-side validation, security headers, isolation tests and documented threat models. When we assess third-party systems, we work under written authorization and deliver evidence, not generic checklists.",
      )}</p></div>
    </div>
    <div class="split">
      <h2>${tr("Visión", "Vision")}</h2>
      <div class="body"><p>${tr(
        "Ser el socio técnico al que una empresa en Latinoamérica —o en cualquier parte— puede confiar tanto la construcción de su producto como su seguridad. Crecer con productos propios, casos verificables y un equipo que mantenga este estándar.",
        "To be the technical partner a company in Latin America — or anywhere — can trust with both building its product and securing it. To grow through our own products, verifiable cases and a team that keeps this standard.",
      )}</p></div>
    </div>
  </div>
</section>
<section class="section on-white rule-top" id="${tr("fundador", "founder")}" aria-labelledby="founder-title">
  <div class="wrap">
    ${sheetLabel("F", L("Fundador", "Founder"), lang)}
    <div class="division">
      <div>
        <h2 id="founder-title" class="statement">Jose Alejandro Gutierrez Guerrero</h2>
        <p class="mono muted">CEO &amp; Founder · Full-stack &amp; Application Security</p>
      </div>
      <div>
        <p class="lead">${tr(
          "Desarrolla software para negocios desde 2022: el sitio y el sistema de recetas del Consultorio Adulam, BARBUS, el CRM de un fabricante y plataformas como PREZ. Se encarga del sistema completo: base de datos, permisos, servidor y pruebas de seguridad.",
          "Has built software for businesses since 2022: the Adulam practice's website and prescription system, BARBUS, a manufacturer's CRM and platforms such as PREZ. Handles the whole system: database, permissions, server and security testing.",
        )}</p>
        <p>${tr("Formación continua en ciberseguridad, redes y Linux:", "Ongoing training in cybersecurity, networking and Linux:")}</p>
        <ul class="tags">${learning.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
        <p class="note">${tr(
          "Estas referencias describen estudios y preparación en curso. No se presentan como certificaciones obtenidas.",
          "These references describe ongoing study and preparation. They are not presented as certifications held.",
        )}</p>
        <div class="actions">${external(SITE.linkedin, "LinkedIn")} ${external(SITE.github, "GitHub")}</div>
      </div>
    </div>
  </div>
</section>
${ctaBand(lang)}`;

  return page({
    lang,
    paths: ROUTES.about,
    current: "about",
    title: tr("Sobre CodeGurex — Empresa de ingeniería y seguridad", "About CodeGurex — Engineering and security company"),
    description: tr(
      "CodeGurex es una empresa independiente de ingeniería de software y ciberseguridad fundada en Ecuador, con atención internacional.",
      "CodeGurex is an independent software engineering and cybersecurity company founded in Ecuador, working internationally.",
    ),
    body,
    schema: [
      breadcrumbSchema(lang, trail),
      {
        "@type": "AboutPage",
        name: tr("Sobre CodeGurex", "About CodeGurex"),
        url: `${SITE.origin}${ROUTES.about[lang]}`,
        about: { "@type": "Organization", name: "CodeGurex", url: `${SITE.origin}/` },
      },
    ],
  });
}
