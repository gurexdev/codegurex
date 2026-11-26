import { pageMeta, pageH1 } from "../content/seo-helpers.mjs";
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
// Engineering disciplines, not languages. Every row names the project where it is used,
// and every figure is counted from the repositories (2026-11-17).
const METRICS = [
  ["94", L("políticas Row Level Security en PostgreSQL", "Row Level Security policies in PostgreSQL"), "PREZ"],
  ["37", L("funciones de base de datos con privilegios endurecidos", "database functions with hardened privileges"), "PREZ"],
  ["4", L("trabajos de CI que validan cada cambio antes de fusionarlo", "CI jobs that validate every change before merge"), "PREZ"],
  ["24", L("decisiones de arquitectura documentadas (ADR)", "documented architecture decisions (ADRs)"), "PREZ"],
  ["100", L("en las cuatro categorías de Lighthouse móvil", "across all four mobile Lighthouse categories"), "BRISEL"],
  ["0", L("problemas de accesibilidad WCAG 2 AA (axe) en producción", "WCAG 2 AA accessibility issues (axe) in production"), "BRISEL · ADULAM · CodeGurex"],
];

const PIPELINE = [
  [L("Calidad", "Quality"), [L("Formato (Prettier)", "Formatting (Prettier)"), L("ESLint, cero avisos", "ESLint, zero warnings"), L("TypeScript estricto", "Strict TypeScript"), "Vitest", "pnpm audit"]],
  [L("Base de datos", "Database"), [L("Migraciones desde cero", "Migrations from scratch"), L("pgTAP: RLS y privilegios", "pgTAP: RLS and privileges"), L("Supabase advisors (falla con un aviso)", "Supabase advisors (fail on warning)")]],
  [L("Extremo a extremo", "End to end"), [L("Build de producción", "Production build"), L("Playwright en móvil, tablet y escritorio", "Playwright on mobile, tablet and desktop"), L("axe-core", "axe-core")]],
  [L("Identidad", "Identity"), [L("Supabase local con Auth y correo", "Local Supabase with Auth and email"), L("Registro, recuperación y MFA TOTP", "Sign-up, recovery and TOTP MFA"), L("Matriz Node.js / workerd", "Node.js / workerd matrix")]],
];

const TECH = [
  {
    code: "T1",
    name: L("Arquitectura de aplicaciones", "Application architecture"),
    why: L(
      "Elegimos la arquitectura por el problema: renderizado en servidor para productos con datos privados, sitios estáticos para contenido y JavaScript mínimo cuando la velocidad en el celular decide la venta.",
      "We choose the architecture for the problem: server rendering for products with private data, static sites for content, and minimal JavaScript when phone speed decides the sale.",
    ),
    rows: [
      ["Next.js 16 · React 19", L("App Router con React Server Components y Server Actions; Cache Components y Partial Prefetching en PREZ", "App Router with React Server Components and Server Actions; Cache Components and Partial Prefetching in PREZ"), "PREZ · Finance"],
      [L("Monolito modular", "Modular monolith"), L("10 dominios de negocio (entrenamiento, nutrición, consultas, administración…) en un solo despliegue, sin microservicios innecesarios", "10 business domains (training, nutrition, consultations, admin…) in one deployment, without needless microservices"), "PREZ"],
      ["Astro", L("Sitios de contenido que funcionan completos sin JavaScript, con imágenes optimizadas en el build", "Content sites that work fully without JavaScript, with build-time image optimization"), "ADULAM"],
      ["Preact · Vite", L("Aplicaciones con estado complejo en ≈11 KB de JavaScript comprimido", "Apps with complex state in ≈11 KB of compressed JavaScript"), "BRISEL"],
      ["History API", L("Capas de interfaz sincronizadas con el botón atrás y enlaces compartibles por ficha", "UI layers synced with the back button and shareable per-item links"), "BRISEL"],
      ["PWA · Service Workers", L("Aplicaciones instalables desde el navegador; con página sin conexión en PREZ", "Browser-installable apps, with an offline page in PREZ"), "PREZ · CRM · Finance"],
      [L("Generador estático propio (Node.js ESM)", "Custom static generator (Node.js ESM)"), L("Sitio bilingüe sin dependencias en ejecución, con validación previa al despliegue", "Bilingual site with zero runtime dependencies and pre-deploy validation"), "CodeGurex.com"],
    ],
  },
  {
    code: "T2",
    name: L("Datos, identidad y multi-tenancy", "Data, identity and multi-tenancy"),
    why: L(
      "La autorización se aplica en la base de datos, no solo en la interfaz. Así un error en una pantalla no se convierte en una fuga de datos entre clientes.",
      "Authorization is enforced in the database, not only in the interface, so a bug on one screen never becomes a data leak between customers.",
    ),
    rows: [
      ["PostgreSQL · PL/pgSQL", L("Modelo relacional, triggers y funciones SECURITY DEFINER con privilegios revocados por defecto", "Relational modelling, triggers and SECURITY DEFINER functions with privileges revoked by default"), "PREZ · Finance"],
      ["Row Level Security", L("Aislamiento por usuario y por organización en cada tabla, verificado con pruebas", "Per-user and per-organization isolation on every table, verified by tests"), "PREZ · BARBUS"],
      ["Supabase Auth · Storage", L("Verificación de correo, recuperación, MFA TOTP obligatorio para el personal y archivos con políticas", "Email verification, recovery, mandatory TOTP MFA for staff and policy-guarded storage"), "PREZ"],
      [L("Migraciones SQL versionadas", "Versioned SQL migrations"), L("La base completa se reconstruye desde cero en cada ejecución de CI", "The whole database is rebuilt from scratch on every CI run"), "PREZ"],
      ["Prisma 7 · driver adapters", L("Acceso tipado a 9 modelos con transacciones y validación de propiedad en cada acción", "Typed access to 9 models with transactions and ownership checks on every action"), "Finance"],
      ["Zod", L("Contratos de datos validados en cada frontera del servidor", "Data contracts validated at every server boundary"), "PREZ"],
    ],
  },
  {
    code: "T3",
    name: L("Calidad y pruebas automatizadas", "Quality and automated testing"),
    why: L(
      "Una fase se cierra con evidencia. Las pruebas corren solas en cada cambio y bloquean la fusión si algo falla.",
      "A phase closes with evidence. Tests run automatically on every change and block the merge when something fails.",
    ),
    rows: [
      [L("TypeScript estricto", "Strict TypeScript"), L("Tipos de punta a punta, con rutas tipadas generadas", "End-to-end types, including generated typed routes"), "PREZ · BRISEL · Finance"],
      ["Playwright", L("E2E en tres tamaños de pantalla, incluidos registro, recuperación y MFA con códigos TOTP generados en la prueba", "E2E at three screen sizes, including sign-up, recovery and MFA with TOTP codes generated in the test"), "PREZ"],
      ["pgTAP", L("10 suites de pruebas SQL sobre RLS, privilegios y paneles administrativos", "10 SQL test suites covering RLS, privileges and admin panels"), "PREZ"],
      ["Vitest", L("Pruebas unitarias de esquemas, precios y reglas de negocio", "Unit tests for schemas, pricing and business rules"), "PREZ"],
      ["axe-core · Lighthouse", L("Accesibilidad WCAG 2.2 AA y rendimiento medidos por script, también sin JavaScript", "WCAG 2.2 AA accessibility and performance measured by script, including a no-JavaScript pass"), "ADULAM"],
    ],
  },
  {
    code: "T4",
    name: L("Seguridad aplicada (DevSecOps)", "Applied security (DevSecOps)"),
    why: L(
      "La seguridad empieza en el diseño: modelamos amenazas antes de programar y automatizamos los controles para que no dependan de la memoria de nadie.",
      "Security starts at design time: we model threats before writing code and automate controls so they never depend on anyone's memory.",
    ),
    rows: [
      [L("Modelado de amenazas STRIDE", "STRIDE threat modelling"), L("Por activo y flujo, cruzado con OWASP Top 10 y OWASP API Security Top 10", "Per asset and flow, mapped to the OWASP Top 10 and OWASP API Security Top 10"), "PREZ"],
      [L("Cabeceras de seguridad", "Security headers"), L("Content Security Policy, HSTS, COOP, Permissions-Policy y frame-ancestors en cada respuesta", "Content Security Policy, HSTS, COOP, Permissions-Policy and frame-ancestors on every response"), "PREZ · CodeGurex.com"],
      ["gitleaks · pnpm audit", L("Detección de secretos y de dependencias vulnerables en CI", "Secret scanning and vulnerable-dependency checks in CI"), "PREZ"],
      [L("Criptografía aplicada", "Applied cryptography"), L("Cifrado autenticado Fernet y derivación PBKDF2-HMAC-SHA256 con 480.000 iteraciones", "Fernet authenticated encryption and PBKDF2-HMAC-SHA256 key derivation at 480,000 iterations"), L("Laboratorio", "Security lab")],
      ["OWASP ASVS · API Top 10 · LLM Top 10", L("Marcos de referencia para evaluar aplicaciones, APIs y sistemas con IA", "Reference frameworks for assessing applications, APIs and AI systems"), L("Servicios de seguridad", "Security services")],
      ["Burp Suite · Python", L("Pruebas manuales de aplicaciones web y herramientas propias de análisis", "Manual web application testing and in-house analysis tooling"), L("Servicios de seguridad", "Security services")],
    ],
  },
  {
    code: "T5",
    name: L("Infraestructura, edge y CI/CD", "Infrastructure, edge and CI/CD"),
    why: L(
      "Despliegues reproducibles en el borde de la red, sin servidores que mantener y sin secretos en el repositorio.",
      "Reproducible deployments at the network edge, with no servers to babysit and no secrets in the repository.",
    ),
    rows: [
      ["Cloudflare Workers · OpenNext", L("Next.js ejecutado en el edge; validado contra el runtime workerd en CI", "Next.js running at the edge, validated against the workerd runtime in CI"), "PREZ"],
      [L("Workers con assets embebidos", "Workers with embedded assets"), L("Sitio completo dentro de un Worker, con caché por ETag y cabeceras de seguridad", "An entire site inside a Worker, with ETag caching and security headers"), "BRISEL"],
      ["Cloudflare Pages · Vercel", L("Publicación continua de sitios y productos", "Continuous deployment of sites and products"), "ADULAM · BARBUS · CostFlow"],
      ["GitHub Actions", L("Pipelines con lockfile congelado, servicios efímeros (Supabase en Docker) y despliegue condicionado a la validación", "Pipelines with frozen lockfiles, ephemeral services (Supabase in Docker) and validation-gated deploys"), "PREZ · CodeGurex.com"],
    ],
  },
  {
    code: "T6",
    name: L("Rendimiento y SEO técnico", "Performance and technical SEO"),
    why: L(
      "Un sitio lento pierde clientes antes de que lean la primera línea. Medimos Core Web Vitals y optimizamos cada recurso en el build.",
      "A slow site loses customers before they read the first line. We measure Core Web Vitals and optimize every asset at build time.",
    ),
    rows: [
      ["Core Web Vitals", L("LCP, INP y CLS medidos con Lighthouse en móvil", "LCP, INP and CLS measured with mobile Lighthouse"), "BRISEL · ADULAM · CodeGurex.com"],
      ["fontTools", L("Instanciado y recorte de fuentes variables a los caracteres del español", "Instancing and subsetting variable fonts down to the characters Spanish needs"), "BRISEL"],
      ["sharp · ffmpeg", L("Imágenes WebP responsivas generadas en el build y video recomprimido de 21 MB a 4,3 MB", "Responsive WebP images generated at build time and video recompressed from 21 MB to 4.3 MB"), "ADULAM"],
      ["JSON-LD · hreflang · llms.txt", L("Datos estructurados (MedicalClinic, ProfessionalService, BlogPosting), sitios bilingües y legibilidad para buscadores con IA", "Structured data (MedicalClinic, ProfessionalService, BlogPosting), bilingual sites and readability for AI search"), "ADULAM · CodeGurex.com"],
    ],
  },
  {
    code: "T7",
    name: L("IA", "AI"),
    why: L(
      "Práctica en crecimiento. Integramos modelos desde el servidor, con permisos mínimos, revisión humana y registros, y evaluamos sistemas con IA con los marcos de OWASP. Aún no publicamos un caso de IA en producción.",
      "A growing practice. We integrate models server-side with least privilege, human review and logging, and assess AI systems with OWASP frameworks. We have not yet published an AI case in production.",
    ),
    rows: [
      [L("Integración de modelos", "Model integration"), L("Llamadas desde el servidor; nunca claves en el cliente", "Server-side calls; never keys in the client"), L("Servicio de IA", "AI service")],
      [L("Seguridad de IA", "AI security"), L("Inyección de prompts, RAG, herramientas, agentes y servidores MCP", "Prompt injection, RAG, tools, agents and MCP servers"), L("Servicio de seguridad de IA", "AI security service")],
    ],
  },
];

export function technology(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const trail = [[route("technology", lang), tr("Tecnología", "Technology")]];
  const metrics = METRICS.map(
    ([n, label, where]) => `<li><strong>${esc(n)}</strong><span>${t(label, lang)}</span><small class="mono">${t(where, lang)}</small></li>`,
  ).join("");
  const groups = TECH.map(
    (g) => `<section class="tech-group" aria-labelledby="${g.code}">
  <div><p class="mono muted">${g.code}</p><h2 id="${g.code}">${t(g.name, lang)}</h2><p>${t(g.why, lang)}</p></div>
  <table class="spec-table tech-table"><thead><tr><th scope="col">${tr("Tecnología", "Technology")}</th><th scope="col">${tr("Cómo la usamos", "How we use it")}</th><th scope="col">${tr("Dónde", "Where")}</th></tr></thead><tbody>
  ${g.rows.map(([a, b, c]) => `<tr><th scope="row">${t(a, lang)}</th><td>${t(b, lang)}</td><td class="mono">${t(c, lang)}</td></tr>`).join("")}
  </tbody></table>
</section>`,
  ).join("");

  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <h1>${esc(pageH1("technology", lang))}</h1>
        <p class="lead">${tr(
          "No listamos lenguajes. Mostramos cómo diseñamos, probamos, protegemos y desplegamos sistemas reales. Cada cifra de esta página está contada en nuestros repositorios.",
          "We do not list languages. We show how we design, test, secure and ship real systems. Every figure on this page is counted from our repositories.",
        )}</p>
      </div>
      ${titleBlock([
        [tr("Lenguajes", "Languages"), "TypeScript · SQL · Python"],
        [tr("Disciplinas", "Disciplines"), String(TECH.length)],
        [tr("Criterio", "Rule"), tr("Solo lo usado en proyectos reales", "Only what real projects use")],
        [tr("Actualizado", "Updated"), "2026-11-17"],
      ])}
    </div>
  </div>
</section>
<section class="section on-ink" aria-labelledby="metrics-title">
  <div class="wrap">
    ${sheetLabel("#", L("En cifras", "By the numbers"), lang)}
    <h2 id="metrics-title" class="statement">${tr("Estándares de producción, <em>medidos</em>.", "Production standards, <em>measured</em>.")}</h2>
    <ul class="metrics">${metrics}</ul>
  </div>
</section>
<section class="section on-white" aria-labelledby="pipeline-title">
  <div class="wrap">
    ${sheetLabel("CI", L("Integración continua", "Continuous integration"), lang)}
    <div class="section-head">
      <h2 id="pipeline-title">${tr("Lo que pasa antes de que un cambio llegue a producción.", "What happens before a change reaches production.")}</h2>
      <p>${tr(
        "Este es el pipeline real de PREZ. Cada pull request ejecuta cuatro trabajos en paralelo y no se puede fusionar si uno falla.",
        "This is PREZ's actual pipeline. Every pull request runs four jobs in parallel and cannot be merged if one fails.",
      )}</p>
    </div>
    <ol class="pipeline">${PIPELINE.map(
      ([name, steps], i) => `<li><p class="mono"><b>JOB ${i + 1}</b> ${t(name, lang)}</p><ul>${steps.map((st) => `<li>${t(st, lang)}</li>`).join("")}</ul></li>`,
    ).join("")}</ol>
    <p class="pipeline-gate mono">${tr("Los 4 en verde → se puede fusionar a main · el despliegue a producción requiere autorización", "All 4 green → merge to main allowed · production deploys require sign-off")}</p>
  </div>
</section>
<section class="section"><div class="wrap">${groups}</div></section>
<section class="section on-white rule-top" aria-labelledby="process-title">
  <div class="wrap">
    <div class="split">
      <h2 id="process-title">${tr("Ingeniería documentada", "Documented engineering")}</h2>
      <div class="body"><p>${tr(
        "Cada producto serio arranca con una auditoría inicial y deja por escrito su arquitectura, su modelo de datos, su modelo de amenazas, su estrategia de pruebas y cada decisión técnica con su alternativa descartada. En PREZ son 24 decisiones registradas, y ninguna fase se cierra sin evidencia.",
        "Every serious product starts with an initial audit and documents its architecture, data model, threat model, testing strategy and every technical decision with the alternative it rejected. PREZ has 24 recorded decisions, and no phase closes without evidence.",
      )}</p>
      <a class="arrow-link" href="${workPath(workById("prez"), lang)}">${tr("Ver el caso PREZ", "See the PREZ case study")}</a></div>
    </div>
  </div>
</section>
${ctaBand(lang)}`;

  return page({
    lang,
    paths: ROUTES.technology,
    current: "technology",
    ...pageMeta("technology", lang),
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
        <h1>${esc(pageH1("products", lang))}</h1>
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
    ...pageMeta("products", lang),
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
        <h1>${esc(pageH1("sentinel", lang))}</h1>
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
    ...pageMeta("sentinel", lang),
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
        <h1>${esc(pageH1("about", lang))}</h1>
        <p class="lead">${tr(
          "CodeGurex diseña, construye y protege software. Nació en Manta, Ecuador, y trabaja con organizaciones de cualquier lugar que necesitan tecnología bien hecha y segura.",
          "CodeGurex designs, builds and secures software. It was born in Manta, Ecuador, and works with organizations anywhere that need technology done well and done securely.",
        )}</p>
      </div>
      ${titleBlock([
        [tr("Origen", "Origin"), `<a href="${lang === "es" ? "/desarrollo-de-software-manta/" : "/en/software-development-ecuador/"}">Manta, Ecuador</a>`],
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
    ...pageMeta("about", lang),
    body,
    schema: [
      breadcrumbSchema(lang, trail),
      {
        "@type": "AboutPage",
        name: tr("Sobre CodeGurex", "About CodeGurex"),
        url: `${SITE.origin}${ROUTES.about[lang]}`,
        about: { "@id": `${SITE.origin}/#organization` },
        mainEntity: { "@id": `${SITE.origin}/#founder` },
      },
      {
        "@type": "Person",
        "@id": `${SITE.origin}/#founder`,
        name: "Jose Alejandro Gutierrez Guerrero",
        jobTitle: "CEO & Founder",
        url: `${SITE.origin}${ROUTES.about[lang]}#${lang === "es" ? "fundador" : "founder"}`,
        worksFor: { "@type": "Organization", "@id": `${SITE.origin}/#organization`, name: "CodeGurex", url: `${SITE.origin}/` },
        homeLocation: { "@type": "Place", name: "Manta, Ecuador" },
        sameAs: [SITE.linkedin, SITE.github],
        knowsAbout: ["Software engineering", "Next.js", "PostgreSQL", "Supabase Row Level Security", "Application security", "OWASP", "Cloudflare Workers"],
      },
    ],
  });
}
