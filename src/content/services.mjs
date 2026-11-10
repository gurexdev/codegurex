import { L } from "./site.mjs";

// Tracks group services by the three company capabilities.
export const TRACKS = {
  build: {
    code: "A",
    name: L("Construir", "Build"),
    title: L("Ingeniería de software", "Software engineering"),
    summary: L(
      "Sitios, aplicaciones, plataformas SaaS y sistemas de negocio diseñados, desarrollados y mantenidos de principio a fin.",
      "Websites, applications, SaaS platforms and business systems — designed, built and maintained end to end.",
    ),
  },
  integrate: {
    code: "B",
    name: L("Integrar", "Integrate"),
    title: L("IA, APIs y automatización", "AI, APIs & automation"),
    summary: L(
      "Conectamos sistemas, datos y modelos para que la operación dependa menos de tareas manuales.",
      "We connect systems, data and models so operations depend less on manual work.",
    ),
  },
  secure: {
    code: "C",
    name: L("Proteger", "Secure"),
    title: L("Ciberseguridad", "Cybersecurity"),
    summary: L(
      "Evaluación autorizada de aplicaciones, APIs, sistemas con IA e infraestructura, con hallazgos priorizados y un plan de corrección.",
      "Authorized assessment of applications, APIs, AI systems and infrastructure, with prioritized findings and a remediation plan.",
    ),
  },
};

export const SERVICES = [
  {
    id: "web-development",
    track: "build",
    slug: L("desarrollo-web", "web-development"),
    name: L("Sitios web corporativos", "Corporate websites"),
    short: L(
      "Sitios corporativos, landing pages y webs de negocio rápidos, accesibles y preparados para buscadores.",
      "Fast, accessible, search-ready corporate websites, landing pages and business sites.",
    ),
    seo: L(
      "Desarrollo de sitios web corporativos | CodeGurex",
      "Corporate website development | CodeGurex",
    ),
    problem: L(
      "Muchas empresas tienen una web que se ve bien pero carga lento, no explica qué hacen, no aparece en buscadores o no convierte visitas en conversaciones. Rehacerla cada dos años es caro.",
      "Many companies have a website that looks fine but loads slowly, does not explain what they do, does not show up in search or does not turn visits into conversations. Rebuilding it every two years is expensive.",
    ),
    audience: [
      L("Empresas que necesitan una presencia digital creíble", "Companies that need a credible digital presence"),
      L("Negocios con varias sedes, servicios o líneas de producto", "Businesses with several locations, services or product lines"),
      L("Equipos que quieren medir y mejorar su web existente", "Teams that want to measure and improve an existing site"),
    ],
    included: [
      L("Arquitectura de contenido y navegación", "Content architecture and navigation"),
      L("Diseño visual propio, sin plantillas", "Original visual design, no templates"),
      L("Desarrollo responsive y accesible (WCAG)", "Responsive, accessible development (WCAG)"),
      L("SEO técnico: metadatos, datos estructurados, sitemap, hreflang", "Technical SEO: metadata, structured data, sitemap, hreflang"),
      L("Optimización de imágenes y carga", "Image and loading optimization"),
      L("Cabeceras de seguridad y formularios seguros", "Security headers and safe forms"),
      L("Versión bilingüe cuando se requiere", "Bilingual version when needed"),
    ],
    deliverables: [
      L("Sitio publicado en tu dominio", "Site published on your domain"),
      L("Código fuente en tu repositorio", "Source code in your repository"),
      L("Guía de mantenimiento y despliegue", "Maintenance and deployment guide"),
      L("Informe técnico de rendimiento y SEO", "Technical performance and SEO report"),
    ],
    capabilities: ["HTML", "CSS", "JavaScript", "Next.js", "SEO", "GitHub Actions", "Vercel", "Cloudflare"],
    evidence: ["codegurex-com", "adulam"],
  },
  {
    id: "web-applications",
    track: "build",
    slug: L("aplicaciones-web", "web-applications"),
    name: L("Aplicaciones web a medida", "Custom web applications"),
    short: L(
      "Aplicaciones para la operación diaria: portales, paneles, herramientas internas y productos interactivos.",
      "Applications for day-to-day operations: portals, dashboards, internal tools and interactive products.",
    ),
    seo: L(
      "Desarrollo de aplicaciones web a medida | CodeGurex",
      "Custom web application development | CodeGurex",
    ),
    problem: L(
      "Cuando la operación vive en hojas de cálculo, chats y cuadernos, la información se pierde, se duplica y nadie sabe cuál es la versión correcta.",
      "When operations live in spreadsheets, chat threads and notebooks, information gets lost and duplicated, and nobody knows which version is correct.",
    ),
    audience: [
      L("Empresas con procesos que hoy se hacen a mano", "Companies with processes still done by hand"),
      L("Organizaciones que necesitan un portal para clientes o pacientes", "Organizations that need a customer or patient portal"),
      L("Equipos que necesitan una herramienta interna específica", "Teams that need a specific internal tool"),
    ],
    included: [
      L("Levantamiento del proceso y del modelo de datos", "Process discovery and data modelling"),
      L("Interfaz diseñada para el uso diario", "Interface designed for daily use"),
      L("Autenticación y permisos por rol", "Authentication and role-based permissions"),
      L("Aplicación instalable (PWA) cuando aporta", "Installable app (PWA) where it helps"),
      L("Importación y exportación de datos (Excel, PDF)", "Data import and export (Excel, PDF)"),
      L("Pruebas y despliegue continuo", "Testing and continuous deployment"),
    ],
    deliverables: [
      L("Aplicación en producción", "Application in production"),
      L("Repositorio, documentación y credenciales transferidas", "Repository, documentation and handed-over credentials"),
      L("Sesión de capacitación", "Training session"),
      L("Plan de mejora continua", "Continuous improvement plan"),
    ],
    capabilities: ["TypeScript", "React", "Next.js", "Supabase", "PostgreSQL", "PWA"],
    evidence: ["crm", "psicoquiz", "adulam"],
  },
  {
    id: "saas-development",
    track: "build",
    slug: L("saas", "saas-development"),
    name: L("Plataformas SaaS", "SaaS platforms"),
    short: L(
      "Productos por suscripción multi-tenant, donde cada cliente ve solo sus datos.",
      "Multi-tenant subscription products where every customer sees only their own data.",
    ),
    seo: L("Desarrollo de plataformas SaaS | CodeGurex", "SaaS platform development | CodeGurex"),
    problem: L(
      "Un SaaS no es una web con login. Necesita aislamiento de datos entre clientes, roles, planes, onboarding y una base que no se rompa cuando crece el número de cuentas.",
      "A SaaS is not a website with a login. It needs data isolation between customers, roles, plans, onboarding and a foundation that holds as the number of accounts grows.",
    ),
    audience: [
      L("Fundadores que quieren lanzar un producto digital", "Founders launching a digital product"),
      L("Negocios que quieren convertir su conocimiento en software", "Businesses turning their know-how into software"),
      L("Equipos con un MVP que necesita bases sólidas", "Teams with an MVP that needs a solid foundation"),
    ],
    included: [
      L("Arquitectura multi-tenant con Row Level Security", "Multi-tenant architecture with Row Level Security"),
      L("Registro, verificación, recuperación y MFA", "Sign-up, verification, recovery and MFA"),
      L("Roles, permisos y panel de administración", "Roles, permissions and admin panel"),
      L("Migraciones de base de datos versionadas", "Versioned database migrations"),
      L("Pruebas de aislamiento entre clientes", "Tenant-isolation tests"),
      L("Preparación para suscripciones y pagos", "Readiness for subscriptions and payments"),
    ],
    deliverables: [
      L("Producto desplegado con entornos separados", "Product deployed with separate environments"),
      L("Documentación de arquitectura, datos y amenazas", "Architecture, data and threat-model documentation"),
      L("Suite de pruebas automatizadas", "Automated test suite"),
      L("Hoja de ruta por fases con criterios de aceptación", "Phased roadmap with acceptance criteria"),
    ],
    capabilities: ["Next.js", "Supabase", "PostgreSQL", "RLS", "Zod", "Cloudflare Workers", "Playwright"],
    evidence: ["prez", "barbus", "costflow"],
  },
  {
    id: "business-systems",
    track: "build",
    slug: L("sistemas-de-gestion", "business-systems"),
    name: L("Sistemas de gestión y CRM", "Business systems & CRM"),
    short: L(
      "CRM, paneles de ventas, inventario, caja y reportes adaptados a cómo trabaja tu empresa.",
      "CRM, sales dashboards, inventory, cash and reporting shaped around how your company works.",
    ),
    seo: L("Sistemas de gestión y CRM a medida | CodeGurex", "Custom business systems and CRM | CodeGurex"),
    problem: L(
      "Las herramientas genéricas obligan a adaptar el negocio al software. Un sistema propio permite medir lo que de verdad importa: metas, vendedores, clientes en riesgo, márgenes.",
      "Generic tools force the business to adapt to the software. A tailored system measures what actually matters: targets, sales reps, at-risk customers, margins.",
    ),
    audience: [
      L("Equipos comerciales que trabajan con Excel", "Sales teams working out of Excel"),
      L("Negocios que necesitan control de inventario y caja", "Businesses that need inventory and cash control"),
      L("Direcciones que necesitan indicadores confiables", "Management that needs reliable indicators"),
    ],
    included: [
      L("KPIs, metas y proyecciones", "KPIs, targets and projections"),
      L("Rankings de vendedores, productos y clientes", "Rankings of reps, products and customers"),
      L("Alertas (clientes en riesgo, productos en caída)", "Alerts (at-risk customers, declining products)"),
      L("Importación desde Excel y exportación de reportes", "Excel import and report export"),
      L("Acceso móvil e instalable", "Mobile, installable access"),
    ],
    deliverables: [
      L("Sistema en uso con datos migrados", "System in use with migrated data"),
      L("Manual de uso", "User guide"),
      L("Soporte durante la adopción", "Support during adoption"),
    ],
    capabilities: ["JavaScript", "Charts", "Excel I/O", "Supabase", "PWA"],
    evidence: ["crm", "barbus", "costflow"],
  },
  {
    id: "apis-integrations",
    track: "integrate",
    slug: L("apis-integraciones", "apis-integrations"),
    name: L("APIs e integraciones", "APIs & integrations"),
    short: L(
      "Conectamos tu software con mensajería, datos, pagos y servicios externos de forma segura.",
      "We connect your software to messaging, data, payments and external services — securely.",
    ),
    seo: L("Desarrollo de APIs e integraciones | CodeGurex", "API development and integrations | CodeGurex"),
    problem: L(
      "Cada sistema aislado obliga a copiar datos a mano. Las integraciones mal hechas, además, exponen claves y datos que no deberían salir del servidor.",
      "Every isolated system means copying data by hand. Poorly built integrations also expose keys and data that should never leave the server.",
    ),
    audience: [
      L("Empresas con varios sistemas que no se hablan", "Companies with several systems that do not talk to each other"),
      L("Productos que necesitan webhooks o una API propia", "Products that need webhooks or their own API"),
    ],
    included: [
      L("Diseño de endpoints y contratos de datos", "Endpoint and data-contract design"),
      L("Validación de entradas en el servidor (Zod)", "Server-side input validation (Zod)"),
      L("Webhooks verificados e idempotentes", "Verified, idempotent webhooks"),
      L("Integración con WhatsApp, correo, Excel y PDF", "WhatsApp, email, Excel and PDF integration"),
      L("Gestión de secretos fuera del cliente", "Secrets kept out of the client"),
    ],
    deliverables: [
      L("Integración funcionando en producción", "Integration running in production"),
      L("Documentación de la API", "API documentation"),
      L("Pruebas de contrato y de errores", "Contract and failure-mode tests"),
    ],
    capabilities: ["REST", "Route Handlers", "Server Actions", "Zod", "Supabase", "Webhooks"],
    evidence: ["prez", "crm"],
  },
  {
    id: "ai-automation",
    track: "integrate",
    slug: L("ia-automatizacion", "ai-automation"),
    name: L("IA y automatización", "AI & automation"),
    short: L(
      "Asistentes, integración de modelos y automatización de procesos, empezando por un piloto acotado y medible.",
      "Assistants, model integration and process automation — starting with a scoped, measurable pilot.",
    ),
    seo: L("Integración de IA y automatización de procesos | CodeGurex", "AI integration and business automation | CodeGurex"),
    problem: L(
      "La IA puede ahorrar horas o crear riesgos nuevos: datos sensibles enviados a terceros, respuestas inventadas, agentes con más permisos de los necesarios. La diferencia está en el diseño.",
      "AI can save hours or create new risks: sensitive data sent to third parties, fabricated answers, agents with more permissions than they need. The difference is in the design.",
    ),
    audience: [
      L("Empresas con tareas repetitivas basadas en texto o documentos", "Companies with repetitive text or document work"),
      L("Productos que quieren añadir funciones con IA", "Products adding AI features"),
    ],
    included: [
      L("Identificación de procesos donde la IA aporta", "Identifying processes where AI adds value"),
      L("Piloto con datos acotados y métricas definidas", "Pilot with bounded data and defined metrics"),
      L("Integración del modelo en tu aplicación", "Model integration into your application"),
      L("Controles: permisos mínimos, revisión humana, registros", "Controls: least privilege, human review, logging"),
      L("Automatización de flujos con o sin IA", "Workflow automation with or without AI"),
    ],
    deliverables: [
      L("Informe de viabilidad y riesgos", "Feasibility and risk report"),
      L("Piloto funcional", "Working pilot"),
      L("Recomendación de continuidad basada en resultados", "Go/no-go recommendation based on results"),
    ],
    capabilities: ["Next.js", "Server Actions", "Cron", "OWASP GenAI"],
    evidence: [],
    note: L(
      "Práctica en crecimiento: todavía no publicamos un caso de IA en producción. Por eso cada proyecto empieza con un piloto acotado y criterios de éxito acordados.",
      "A growing practice: we have not yet published an AI case study in production. That is why every engagement starts with a scoped pilot and agreed success criteria.",
    ),
  },
  {
    id: "application-security",
    track: "secure",
    slug: L("seguridad-aplicaciones", "application-security"),
    name: L("Seguridad de aplicaciones web", "Web application security"),
    short: L(
      "Evaluación autorizada de aplicaciones web: autenticación, sesiones, permisos, configuración y exposición.",
      "Authorized assessment of web applications: authentication, sessions, permissions, configuration and exposure.",
    ),
    seo: L("Evaluación de seguridad de aplicaciones web | CodeGurex", "Web application security assessment | CodeGurex"),
    problem: L(
      "Una aplicación puede funcionar perfectamente y aun así permitir que un usuario lea datos de otro, que una sesión no expire o que una cabecera ausente habilite ataques conocidos.",
      "An application can work perfectly and still let one user read another user's data, keep sessions alive forever, or miss a header that enables well-known attacks.",
    ),
    audience: [
      L("Productos antes de su lanzamiento", "Products before launch"),
      L("Aplicaciones con datos de clientes o pacientes", "Applications handling customer or patient data"),
      L("Equipos que necesitan una segunda revisión independiente", "Teams that need an independent second review"),
    ],
    included: [
      L("Revisión de autenticación, sesiones y recuperación", "Authentication, session and recovery review"),
      L("Pruebas de control de acceso (IDOR, escalamiento)", "Access-control testing (IDOR, escalation)"),
      L("Validación de entradas y salidas", "Input and output handling"),
      L("Cabeceras, TLS y configuración", "Headers, TLS and configuration"),
      L("Dependencias y exposición de secretos", "Dependencies and secret exposure"),
    ],
    deliverables: [
      L("Mapa de exposición", "Exposure map"),
      L("Hallazgos con evidencia, severidad e impacto", "Findings with evidence, severity and impact"),
      L("Plan de corrección priorizado", "Prioritized remediation plan"),
      L("Revalidación de correcciones (según alcance)", "Fix revalidation (per scope)"),
    ],
    capabilities: ["OWASP Top 10", "OWASP ASVS", "Burp Suite", "Linux", "Python"],
    evidence: ["security-lab", "codegurex-com"],
  },
  {
    id: "api-security",
    track: "secure",
    slug: L("seguridad-apis", "api-security"),
    name: L("Seguridad de APIs", "API security"),
    short: L(
      "Identidad, autorización por objeto, exposición de datos y abuso de lógica en tus APIs.",
      "Identity, object-level authorization, data exposure and business-logic abuse in your APIs.",
    ),
    seo: L("Auditoría de seguridad de APIs | CodeGurex", "API security assessment | CodeGurex"),
    problem: L(
      "Las APIs son la puerta trasera de casi todo producto moderno. Los fallos más comunes no son exóticos: falta de autorización por objeto, respuestas que devuelven más datos de los necesarios y ausencia de límites.",
      "APIs are the back door of almost every modern product. The most common failures are not exotic: missing object-level authorization, responses that return more data than needed and no rate limits.",
    ),
    audience: [
      L("Productos con aplicación móvil o frontend separado", "Products with a mobile app or separate frontend"),
      L("Plataformas que exponen APIs a socios", "Platforms exposing APIs to partners"),
    ],
    included: [
      L("Inventario de endpoints y flujos", "Endpoint and flow inventory"),
      L("Autorización por objeto y por función", "Object- and function-level authorization"),
      L("Exposición excesiva de datos", "Excessive data exposure"),
      L("Límites, cuotas y abuso de lógica", "Limits, quotas and logic abuse"),
      L("Políticas de base de datos (RLS) cuando aplica", "Database policies (RLS) where relevant"),
    ],
    deliverables: [
      L("Inventario de la superficie de la API", "API surface inventory"),
      L("Hallazgos reproducibles", "Reproducible findings"),
      L("Plan de corrección y pruebas de regresión sugeridas", "Remediation plan and suggested regression tests"),
    ],
    capabilities: ["OWASP API Security Top 10", "REST", "JWT", "Supabase RLS", "pgTAP"],
    evidence: ["prez"],
  },
  {
    id: "ai-security",
    track: "secure",
    slug: L("seguridad-ia", "ai-security"),
    name: L("Seguridad de IA y agentes", "AI & agent security"),
    short: L(
      "Modelos, prompts, RAG, herramientas, agentes y permisos: qué puede leer, decidir y ejecutar tu sistema con IA.",
      "Models, prompts, RAG, tools, agents and permissions: what your AI system can read, decide and execute.",
    ),
    seo: L("Seguridad para aplicaciones con IA y agentes | CodeGurex", "AI application and agent security | CodeGurex"),
    problem: L(
      "Los sistemas con IA ya no solo responden: consultan datos, llaman APIs y ejecutan acciones. Una instrucción manipulada puede convertirse en una fuga de datos o en una acción no autorizada.",
      "AI systems no longer just answer: they query data, call APIs and take actions. A manipulated instruction can become a data leak or an unauthorized action.",
    ),
    audience: [
      L("Productos que integran LLMs, RAG o agentes", "Products integrating LLMs, RAG or agents"),
      L("Empresas que conectan IA a datos internos", "Companies connecting AI to internal data"),
      L("Equipos que usan servidores MCP o herramientas", "Teams using MCP servers or tool calling"),
    ],
    included: [
      L("Inyección de prompts directa e indirecta", "Direct and indirect prompt injection"),
      L("Exposición de datos sensibles y del contexto", "Sensitive data and context exposure"),
      L("Permisos de herramientas y agentes", "Tool and agent permissions"),
      L("Envenenamiento de fuentes RAG", "RAG source poisoning"),
      L("Confirmaciones humanas y límites de acción", "Human confirmations and action limits"),
    ],
    deliverables: [
      L("Mapa de la cadena modelo → datos → herramientas", "Map of the model → data → tools chain"),
      L("Hallazgos priorizados", "Prioritized findings"),
      L("Controles recomendados y plan de corrección", "Recommended controls and remediation plan"),
    ],
    capabilities: ["OWASP Top 10 for LLM Applications", "OWASP GenAI", "Threat modelling"],
    evidence: [],
    note: L(
      "Esta evaluación toma como referencia los marcos públicos de OWASP para aplicaciones con LLM. Es parte de la división “Security for the AI Era”.",
      "This assessment follows OWASP's public frameworks for LLM applications. It is part of the “Security for the AI Era” division.",
    ),
  },
  {
    id: "cloud-security",
    track: "secure",
    slug: L("seguridad-nube", "cloud-security"),
    name: L("Infraestructura y nube", "Cloud & infrastructure security"),
    short: L(
      "Configuración, identidad, secretos, servicios expuestos y hardening de servidores y plataformas cloud.",
      "Configuration, identity, secrets, exposed services and hardening of servers and cloud platforms.",
    ),
    seo: L("Hardening de infraestructura y nube | CodeGurex", "Cloud and infrastructure hardening | CodeGurex"),
    problem: L(
      "La mayoría de incidentes en la nube no nacen de ataques sofisticados, sino de configuraciones por defecto, secretos en repositorios y servicios expuestos que nadie recordaba.",
      "Most cloud incidents do not come from sophisticated attacks but from default settings, secrets in repositories and exposed services nobody remembered.",
    ),
    audience: [
      L("Empresas con servidores propios o VPS", "Companies running their own servers or VPS"),
      L("Productos desplegados en Vercel, Cloudflare o Supabase", "Products deployed on Vercel, Cloudflare or Supabase"),
    ],
    included: [
      L("Inventario de servicios expuestos", "Exposed-service inventory"),
      L("HTTPS, firewall y cabeceras", "HTTPS, firewall and headers"),
      L("Secretos y variables de entorno", "Secrets and environment variables"),
      L("Copias de seguridad y recuperación", "Backups and recovery"),
      L("Revisión de CI/CD y permisos del repositorio", "CI/CD and repository permission review"),
    ],
    deliverables: [
      L("Línea base de configuración segura", "Secure configuration baseline"),
      L("Lista de correcciones por prioridad", "Prioritized fix list"),
      L("Procedimiento de respaldo y recuperación", "Backup and recovery procedure"),
    ],
    capabilities: ["Linux", "Cloudflare", "Vercel", "Supabase", "GitHub Actions", "gitleaks"],
    evidence: ["prez", "codegurex-com"],
  },
];

export const ENGAGEMENT = {
  build: [
    [L("Descubrimiento", "Discovery"), L("Entendemos el negocio, los usuarios y los datos. Definimos alcance y criterios de aceptación.", "We learn the business, its users and its data. We define scope and acceptance criteria.")],
    [L("Arquitectura", "Architecture"), L("Modelo de datos, permisos, integraciones y decisiones técnicas documentadas.", "Data model, permissions, integrations and documented technical decisions.")],
    [L("Construcción", "Build"), L("Entregas por fases, revisables en un entorno de vista previa.", "Phased delivery, reviewable in a preview environment.")],
    [L("Verificación", "Verification"), L("Pruebas automatizadas, accesibilidad y revisión de seguridad antes de publicar.", "Automated tests, accessibility and a security review before release.")],
    [L("Operación", "Operation"), L("Despliegue, capacitación y mejora continua con el sistema en uso.", "Deployment, training and continuous improvement while in use.")],
  ],
  integrate: [
    [L("Diagnóstico", "Assessment"), L("Identificamos el proceso, los sistemas involucrados y el riesgo de los datos.", "We identify the process, the systems involved and the data risk.")],
    [L("Diseño", "Design"), L("Contratos de datos, permisos mínimos y manejo de errores.", "Data contracts, least privilege and error handling.")],
    [L("Piloto", "Pilot"), L("Una primera versión acotada con métricas definidas.", "A first scoped version with defined metrics.")],
    [L("Despliegue", "Rollout"), L("Integración en producción con registros y monitoreo.", "Production integration with logging and monitoring.")],
  ],
  secure: [
    [L("Contexto", "Context"), L("Entendemos el sistema, los datos y la preocupación principal.", "We understand the system, the data and the main concern.")],
    [L("Alcance autorizado", "Authorized scope"), L("Acordamos por escrito qué se evalúa, con qué acceso y en qué ventana.", "We agree in writing what is tested, with what access and when.")],
    [L("Evaluación", "Assessment"), L("Revisamos la superficie y verificamos cada hallazgo.", "We review the surface and verify every finding.")],
    [L("Priorización", "Prioritization"), L("Ordenamos por exposición, impacto y esfuerzo de corrección.", "We rank by exposure, impact and remediation effort.")],
    [L("Entrega", "Report"), L("Informe con evidencia y plan de corrección; revalidación según alcance.", "Report with evidence and a remediation plan; revalidation per scope.")],
  ],
};
