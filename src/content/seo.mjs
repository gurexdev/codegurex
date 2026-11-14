import { L } from "./site.mjs";

// Search-facing copy, kept apart from the design copy so it can be tuned without touching layout.
// Rules (from the claude-seo quality gates): title 30–60 chars with the primary keyword first and
// the brand last; description 120–160 chars; one descriptive H1 per page; no invented facts.

export const PAGE_SEO = {
  home: {
    title: L("Software a medida y ciberseguridad en Ecuador | CodeGurex", "Software development & cybersecurity company | CodeGurex"),
    description: L(
      "Empresa de desarrollo de software, páginas web, SaaS y ciberseguridad en Manta, Ecuador. Diseñamos, construimos y protegemos sistemas para empresas.",
      "Software development, websites, SaaS and cybersecurity company based in Ecuador. We design, build and secure digital systems for businesses worldwide.",
    ),
    h1: L(
      "Desarrollo de software, páginas web y ciberseguridad en Ecuador.",
      "Software development, websites and cybersecurity from Ecuador.",
    ),
  },
  solutions: {
    title: L("Soluciones de software para empresas en Ecuador | CodeGurex", "Software solutions for businesses | CodeGurex"),
    description: L(
      "Páginas web, plataformas, sistemas de gestión, integración de IA y seguridad, organizados según lo que tu empresa necesita resolver. Manta, Ecuador.",
      "Websites, platforms, business systems, AI integration and security, organized around what your business needs to solve. Based in Ecuador.",
    ),
    h1: L("Soluciones de software según lo que tu empresa necesita.", "Software solutions shaped around what your business needs."),
  },
  services: {
    title: L("Servicios de desarrollo de software y pentesting | CodeGurex", "Software development & security services | CodeGurex"),
    description: L(
      "Diseño web, software a medida, SaaS, CRM, APIs, IA, pentesting web y seguridad de APIs y nube. Alcance, proceso y entregables de cada servicio.",
      "Web design, custom software, SaaS, CRM, APIs, AI, web pentesting and API and cloud security. Scope, process and deliverables for every service.",
    ),
    h1: L("Servicios de desarrollo de software y ciberseguridad.", "Software development and cybersecurity services."),
  },
  work: {
    title: L("Portafolio de software y páginas web | CodeGurex", "Software & web development portfolio | CodeGurex"),
    description: L(
      "Casos reales: SaaS para barberías, CRM de ventas, plataforma deportiva, web para consultorio médico en Manta y herramientas de seguridad, con su estado.",
      "Real cases: a barbershop SaaS, a sales CRM, a sports platform, a medical-practice website in Ecuador and security tools, each with its status.",
    ),
    h1: L("Portafolio: software y páginas web que hoy están en uso.", "Portfolio: software and websites in use today."),
  },
  products: {
    title: L("Productos de software y seguridad propios | CodeGurex", "Our software and security products | CodeGurex"),
    description: L(
      "Productos desarrollados por CodeGurex: Sentinel (seguridad), BARBUS para barberías, CostFlow para pequeños negocios y herramientas internas.",
      "Products built by CodeGurex: Sentinel (security), BARBUS for barbershops, CostFlow for small businesses and internal tools, each with its status.",
    ),
    h1: L("Productos propios de software y seguridad.", "Our own software and security products."),
  },
  sentinel: {
    title: L("CodeGurex Sentinel: análisis de logs y exposición", "CodeGurex Sentinel: log analysis & exposure | CodeGurex"),
    description: L(
      "Sentinel, la línea de seguridad de CodeGurex: análisis de logs de autenticación disponible; exposición web, APIs, IA y nube en hoja de ruta.",
      "Sentinel, CodeGurex's security product line: authentication-log analysis available; web, API, AI and cloud exposure on the roadmap.",
    ),
    h1: L("CodeGurex Sentinel: seguridad para la era de la IA", "CodeGurex Sentinel: security for the AI era"),
  },
  technology: {
    title: L("Tecnologías: Next.js, Supabase, Cloudflare y más | CodeGurex", "Our stack: Next.js, Supabase, Cloudflare | CodeGurex"),
    description: L(
      "TypeScript, Next.js, React, PostgreSQL con Row Level Security, Cloudflare, Vercel, Playwright y Python: cómo y para qué los usamos en proyectos reales.",
      "TypeScript, Next.js, React, PostgreSQL with Row Level Security, Cloudflare, Vercel, Playwright and Python: how and why we use them on real projects.",
    ),
    h1: L("Tecnologías que usamos en proyectos reales.", "Technologies we use on real projects."),
  },
  about: {
    title: L("Empresa de software y ciberseguridad en Manta | CodeGurex", "About CodeGurex: software & security, Ecuador"),
    description: L(
      "CodeGurex es una empresa independiente de desarrollo de software y ciberseguridad fundada en Manta, Ecuador, con clientes desde 2022.",
      "CodeGurex is an independent software development and cybersecurity company founded in Manta, Ecuador, building for clients since 2022.",
    ),
    h1: L("Empresa de software y ciberseguridad fundada en Manta, Ecuador.", "A software and cybersecurity company founded in Manta, Ecuador."),
  },
  contact: {
    title: L("Contacto: cotiza tu página web o software | CodeGurex", "Contact: request a software or security quote"),
    description: L(
      "Cuéntanos qué necesitas: página web, software a medida, SaaS, integración de IA o evaluación de seguridad. Respondemos por WhatsApp o correo.",
      "Tell us what you need: a website, custom software, SaaS, AI integration or a security assessment. We reply by WhatsApp or email.",
    ),
  },
  privacy: {
    title: L("Política de privacidad y uso de datos | CodeGurex", "Privacy policy and data use | CodeGurex"),
    description: L(
      "Qué datos puede recibir CodeGurex desde codegurex.com, para qué los usa, cuánto tiempo los conserva y cómo ejercer tus derechos sobre ellos.",
      "What data CodeGurex may receive through codegurex.com, why it is used, how long it is kept and how to exercise your rights over it.",
    ),
  },
};

// Location statement reused on service pages (local relevance without doorway pages).
export const WHERE = L(
  "CodeGurex trabaja desde Manta, Manabí, y puede atender de forma remota a empresas de cualquier ciudad de Ecuador —Guayaquil, Quito, Portoviejo o Cuenca— y de otros países, en español e inglés.",
  "CodeGurex works from Manta, Ecuador, and can serve companies remotely anywhere in Ecuador and in other countries, in Spanish and English.",
);

export const SERVICE_SEO = {
  "web-development": {
    title: L("Diseño de páginas web en Manta y Ecuador | CodeGurex", "Corporate website design & development | CodeGurex"),
    h1: L("Diseño y desarrollo de páginas web corporativas", "Corporate website design and development"),
    description: L(
      "Diseño de páginas web corporativas rápidas, bilingües y preparadas para Google, con SEO técnico y seguridad incluidos. Desde Manta para todo Ecuador.",
      "Fast, bilingual, search-ready corporate websites with technical SEO and security built in. Designed and developed by CodeGurex.",
    ),
    why: L(
      "Construimos la web como un sistema: contenido, velocidad, SEO técnico y seguridad se diseñan juntos. Nuestro propio sitio y el del Consultorio Médico Familiar ADULAM en Manta se publicaron con cero problemas de accesibilidad detectados por axe, cabeceras de seguridad activas y datos estructurados.",
      "We build a website as a system: content, speed, technical SEO and security are designed together. Our own site and the ADULAM medical practice's site were published with zero accessibility issues detected by axe, active security headers and structured data.",
    ),
    faq: [
      [L("¿Cuánto cuesta una página web?", "How much does a website cost?"), L("Depende del número de páginas, de los idiomas, de las integraciones y de si el contenido ya existe. Después de una conversación corta te enviamos el alcance y el precio por escrito, antes de empezar.", "It depends on the number of pages, languages, integrations and whether the content already exists. After a short call we send you the scope and price in writing, before any work starts.")],
      [L("¿La página web será mía?", "Will I own the website?"), L("Sí. El código queda en tu repositorio, el dominio a tu nombre y te entregamos la documentación para mantenerla o cambiar de proveedor.", "Yes. The code lives in your repository, the domain is in your name and you receive the documentation to maintain it or change providers.")],
      [L("¿Incluye SEO para aparecer en Google?", "Does it include SEO?"), L("Incluye SEO técnico: títulos y descripciones por página, datos estructurados, sitemap, velocidad, versión móvil e idiomas. Aparecer arriba también depende del contenido y de los enlaces de otros sitios; eso lo planificamos contigo.", "It includes technical SEO: per-page titles and descriptions, structured data, sitemap, speed, mobile and languages. Ranking also depends on content and links from other sites, which we plan with you.")],
      [L("¿Pueden mejorar mi web actual en vez de rehacerla?", "Can you improve my current site instead of rebuilding it?"), L("Sí. Empezamos con una revisión técnica de rendimiento, SEO y seguridad, y decidimos juntos si conviene mejorar lo que existe o reconstruir.", "Yes. We start with a technical review of performance, SEO and security, and decide together whether to improve what exists or rebuild.")],
    ],
  },
  "web-applications": {
    title: L("Desarrollo de software a medida en Ecuador | CodeGurex", "Custom web application development | CodeGurex"),
    h1: L("Desarrollo de software y aplicaciones web a medida", "Custom software and web application development"),
    description: L(
      "Desarrollo de software a medida: aplicaciones web, portales y herramientas internas con usuarios, permisos e importación de Excel. Manta, Ecuador.",
      "Custom software development: web applications, portals and internal tools with users, permissions and Excel import, built by CodeGurex.",
    ),
    why: L(
      "Hemos construido sistemas que negocios usan cada día: el CRM comercial de un fabricante de productos de limpieza, el sistema de documentos médicos del Consultorio ADULAM y aplicaciones como PsicoQuiz. Diseñamos primero el modelo de datos y los permisos, y después la interfaz.",
      "We have built systems businesses use every day: the sales CRM of a cleaning-products manufacturer, the ADULAM practice's medical-documents system and apps such as PsicoQuiz. We design the data model and permissions first, then the interface.",
    ),
    faq: [
      [L("¿Qué diferencia hay entre una página web y una aplicación web?", "What is the difference between a website and a web application?"), L("Una página web informa. Una aplicación web permite trabajar: tiene usuarios, permisos, datos que se guardan y procesos que se repiten cada día.", "A website informs. A web application lets people work: it has users, permissions, stored data and processes repeated every day.")],
      [L("¿Funciona en el celular?", "Does it work on phones?"), L("Sí. Diseñamos para móvil y, cuando aporta, la publicamos como aplicación instalable (PWA), sin pasar por las tiendas de aplicaciones.", "Yes. We design for mobile and, when useful, publish it as an installable app (PWA) without going through app stores.")],
      [L("¿Puedo importar mis datos de Excel?", "Can I import my Excel data?"), L("Sí. Hemos implementado importación y exportación de Excel en sistemas reales, y migramos los datos existentes al empezar.", "Yes. We have implemented Excel import and export in real systems, and we migrate your existing data at the start.")],
      [L("¿Qué pasa después de la entrega?", "What happens after delivery?"), L("Capacitamos a tu equipo y acordamos un plan de soporte y mejoras mientras el sistema está en uso.", "We train your team and agree a support and improvement plan while the system is in use.")],
    ],
  },
  "saas-development": {
    title: L("Desarrollo de plataformas SaaS multi-tenant | CodeGurex", "SaaS platform development (multi-tenant) | CodeGurex"),
    h1: L("Desarrollo de plataformas SaaS multi-tenant", "Multi-tenant SaaS platform development"),
    description: L(
      "Desarrollamos plataformas SaaS donde cada cliente ve solo sus datos: Row Level Security, MFA, roles y pruebas de aislamiento. Casos BARBUS y PREZ.",
      "We build SaaS platforms where every customer sees only their own data: Row Level Security, MFA, roles and isolation tests. See BARBUS and PREZ.",
    ),
    why: L(
      "BARBUS y CostFlow son productos SaaS propios en uso, y PREZ es una plataforma con autenticación, MFA para el personal y políticas RLS verificadas con pruebas pgTAP. Sabemos lo que cuesta mantener un SaaS porque operamos los nuestros.",
      "BARBUS and CostFlow are our own SaaS products in use, and PREZ is a platform with authentication, staff MFA and RLS policies verified with pgTAP tests. We know what running a SaaS takes because we run our own.",
    ),
    faq: [
      [L("¿Qué significa multi-tenant?", "What does multi-tenant mean?"), L("Una sola plataforma sirve a muchos clientes y cada uno ve únicamente su información. Lo aplicamos en la base de datos con Row Level Security, no solo en la interfaz.", "One platform serves many customers and each one sees only their own information. We enforce it in the database with Row Level Security, not only in the interface.")],
      [L("¿Cómo comprueban que un cliente no ve datos de otro?", "How do you verify one customer cannot see another's data?"), L("Con pruebas automatizadas que intentan leer, crear, editar y borrar datos ajenos y deben fallar. En PREZ se ejecutan con pgTAP sobre la base de datos.", "With automated tests that try to read, create, edit and delete someone else's data and must fail. In PREZ they run with pgTAP against the database.")],
      [L("¿Pueden integrar pagos y suscripciones?", "Can you integrate payments and subscriptions?"), L("Sí, como una fase propia: validamos webhooks, reintentos y estados de suscripción en un entorno de pruebas del proveedor antes de cobrar dinero real.", "Yes, as its own phase: we validate webhooks, retries and subscription states in the provider's sandbox before charging real money.")],
      [L("¿Necesito tener todo definido para empezar?", "Do I need everything defined to start?"), L("No. Empezamos con un producto mínimo que resuelva el problema principal y lo ampliamos por fases con criterios de aceptación claros.", "No. We start with a minimum product that solves the main problem and extend it in phases with clear acceptance criteria.")],
    ],
  },
  "business-systems": {
    title: L("Sistemas de gestión y CRM a medida en Ecuador | CodeGurex", "Custom CRM and business management systems | CodeGurex"),
    h1: L("Sistemas de gestión y CRM a medida", "Custom CRM and business management systems"),
    description: L(
      "CRM de ventas, inventario, caja y reportes a medida: metas, rankings, alertas e importación de Excel. Dejamos atrás las hojas de cálculo. Ecuador.",
      "Custom sales CRM, inventory, cash and reporting: targets, rankings, alerts and Excel import. Move beyond spreadsheets with CodeGurex.",
    ),
    why: L(
      "Desarrollamos el CRM de ventas de un fabricante ecuatoriano —KPIs, metas, proyección de cierre y alertas de clientes que dejan de comprar— y sistemas de gestión como BARBUS y CostFlow con ingresos, gastos, inventario y cuentas por cobrar.",
      "We built the sales CRM of an Ecuadorian manufacturer — KPIs, targets, month-end projection and alerts for customers who stop buying — and business systems such as BARBUS and CostFlow with income, expenses, inventory and receivables.",
    ),
    faq: [
      [L("¿Por qué no usar un CRM ya existente?", "Why not use an existing CRM?"), L("Si tu proceso es estándar, un CRM comercial puede bastar. Un sistema a medida conviene cuando dependes de hojas de cálculo, necesitas indicadores propios o pagas por funciones que no usas.", "If your process is standard, an off-the-shelf CRM may be enough. A custom system makes sense when you depend on spreadsheets, need your own indicators or pay for features you do not use.")],
      [L("¿Pueden migrar mis hojas de cálculo?", "Can you migrate my spreadsheets?"), L("Sí. Limpiamos y migramos los datos existentes, y dejamos un importador para seguir cargando archivos de Excel si lo necesitas.", "Yes. We clean and migrate existing data, and leave an importer so you can keep loading Excel files if needed.")],
      [L("¿Mis vendedores lo pueden usar desde el celular?", "Can my sales team use it from their phones?"), L("Sí. Lo publicamos como aplicación instalable, pensada para consultar y registrar en la calle.", "Yes. We publish it as an installable app designed for checking and logging on the road.")],
      [L("¿Qué indicadores puede mostrar?", "What indicators can it show?"), L("Los que necesite tu negocio. En el CRM comercial incluimos ventas, pedidos, conversión, ticket promedio, proyección del mes contra la meta y alertas.", "Whatever your business needs. The sales CRM includes sales, orders, conversion, average ticket, month projection against target and alerts.")],
    ],
  },
  "apis-integrations": {
    title: L("Desarrollo de APIs e integraciones con WhatsApp | CodeGurex", "API development and integrations | CodeGurex"),
    h1: L("Desarrollo de APIs e integraciones", "API development and integrations"),
    description: L(
      "Conectamos tu software con WhatsApp, Excel, PDF, pagos y otros sistemas mediante APIs seguras: validación en el servidor, webhooks y claves protegidas.",
      "We connect your software to WhatsApp, Excel, PDF, payments and other systems through secure APIs: server-side validation, webhooks and protected keys.",
    ),
    why: L(
      "Integramos lo que los negocios usan de verdad: mensajes de WhatsApp preparados para citas y pedidos, importación de Excel, generación de PDF y bases de datos Supabase. Las claves nunca llegan al navegador.",
      "We integrate what businesses actually use: prepared WhatsApp messages for appointments and orders, Excel import, PDF generation and Supabase databases. Keys never reach the browser.",
    ),
    faq: [
      [L("¿Pueden conectar mi sistema con WhatsApp?", "Can you connect my system to WhatsApp?"), L("Sí. La forma más simple es preparar mensajes con enlaces de WhatsApp, como en el sitio de ADULAM. Para envíos automáticos se usa la API oficial de WhatsApp Business, que requiere una cuenta verificada de Meta.", "Yes. The simplest approach is preparing messages with WhatsApp links, as on the ADULAM site. Automated sending uses the official WhatsApp Business API, which requires a verified Meta account.")],
      [L("¿Dónde se guardan las claves de las integraciones?", "Where are integration keys stored?"), L("En el servidor, como variables de entorno o secretos del proveedor. Nunca en el código del navegador ni en el repositorio.", "On the server, as environment variables or provider secrets. Never in browser code or in the repository.")],
      [L("¿Qué pasa si un servicio externo falla?", "What happens if an external service fails?"), L("Diseñamos reintentos, operaciones idempotentes y registros para que un fallo no duplique pagos ni pierda datos.", "We design retries, idempotent operations and logging so a failure does not duplicate payments or lose data.")],
      [L("¿Documentan la API?", "Do you document the API?"), L("Sí. Entregamos la documentación de endpoints, formatos y errores, junto con pruebas.", "Yes. We deliver documentation of endpoints, formats and errors, along with tests.")],
    ],
  },
  "ai-automation": {
    title: L("Integración de IA y automatización para empresas | CodeGurex", "AI integration and business automation | CodeGurex"),
    h1: L("Integración de inteligencia artificial y automatización de procesos", "AI integration and business process automation"),
    description: L(
      "Integramos IA y automatizamos procesos con un piloto acotado y medible: permisos mínimos, revisión humana y datos protegidos. Para empresas en Ecuador.",
      "We integrate AI and automate processes starting with a scoped, measurable pilot: least privilege, human review and protected data.",
    ),
    why: L(
      "Unimos dos disciplinas que rara vez van juntas: construimos la integración y evaluamos su seguridad con los marcos de OWASP para aplicaciones con LLM. Así la IA ahorra tiempo sin abrir una puerta a tus datos.",
      "We combine two disciplines that rarely go together: we build the integration and assess its security with OWASP's frameworks for LLM applications, so AI saves time without opening a door to your data.",
    ),
    faq: [
      [L("¿Por dónde empiezo con inteligencia artificial?", "Where do I start with AI?"), L("Por una tarea repetitiva basada en texto o documentos, con un resultado que se pueda medir: tiempo ahorrado, errores evitados o respuestas resueltas.", "With a repetitive task based on text or documents, and an outcome you can measure: time saved, errors avoided or questions resolved.")],
      [L("¿Mis datos se envían a terceros?", "Is my data sent to third parties?"), L("Depende del proveedor del modelo. Lo definimos antes del piloto, enviamos solo los datos necesarios y evitamos datos sensibles.", "It depends on the model provider. We decide it before the pilot, send only the necessary data and avoid sensitive data.")],
      [L("¿Tienen casos de IA publicados?", "Do you have published AI case studies?"), L("Todavía no publicamos un caso de IA en producción. Por eso cada proyecto empieza con un piloto y criterios de éxito acordados.", "We have not yet published an AI case in production. That is why each project starts with a pilot and agreed success criteria.")],
      [L("¿Toda automatización necesita IA?", "Does every automation need AI?"), L("No. Muchas automatizaciones son reglas, tareas programadas e integraciones entre sistemas; usamos IA solo donde aporta.", "No. Many automations are rules, scheduled jobs and integrations between systems; we use AI only where it adds value.")],
    ],
  },
  "application-security": {
    title: L("Pentesting web y auditoría de seguridad en Ecuador", "Web application pentesting & security audits | CodeGurex"),
    h1: L("Pentesting y evaluación de seguridad de aplicaciones web", "Web application pentesting and security assessment"),
    description: L(
      "Pentesting web autorizado: autenticación, sesiones, control de acceso, configuración y dependencias, con evidencia y un plan de corrección priorizado.",
      "Authorized web pentesting: authentication, sessions, access control, configuration and dependencies, with evidence and a prioritized remediation plan.",
    ),
    why: L(
      "Evaluamos como desarrolladores que también construyen: entendemos por qué aparece cada fallo y cómo corregirlo sin romper el producto. Tomamos como referencia OWASP Top 10 y ASVS, y entregamos hallazgos verificados, no listas genéricas de un escáner.",
      "We assess as developers who also build: we understand why each flaw appears and how to fix it without breaking the product. We follow OWASP Top 10 and ASVS and deliver verified findings, not a scanner's generic list.",
    ),
    faq: [
      [L("¿Qué es un pentest web?", "What is a web pentest?"), L("Es una evaluación autorizada en la que se intenta encontrar fallos de seguridad explotables en tu aplicación, para corregirlos antes de que alguien los aproveche.", "An authorized assessment that looks for exploitable security flaws in your application so you can fix them before someone abuses them.")],
      [L("¿Puede afectar a mi sitio en producción?", "Can it affect my live site?"), L("Acordamos por escrito el alcance y la ventana de pruebas. Preferimos un entorno de pruebas y evitamos acciones destructivas.", "We agree the scope and testing window in writing. We prefer a staging environment and avoid destructive actions.")],
      [L("¿Qué recibo al final?", "What do I receive?"), L("Un informe con cada hallazgo, su evidencia, severidad, impacto y recomendación, ordenado por prioridad. Según el alcance, revalidamos las correcciones.", "A report with each finding, its evidence, severity, impact and recommendation, ordered by priority. Depending on scope, we revalidate fixes.")],
      [L("¿Necesito dar autorización?", "Do I need to give authorization?"), L("Sí, siempre por escrito. Solo evaluamos sistemas propios del cliente o expresamente autorizados.", "Yes, always in writing. We only assess systems the client owns or has explicitly authorized.")],
    ],
  },
  "api-security": {
    title: L("Auditoría de seguridad de APIs según OWASP | CodeGurex", "API security assessment (OWASP API Top 10) | CodeGurex"),
    h1: L("Auditoría de seguridad de APIs", "API security assessment"),
    description: L(
      "Auditoría de seguridad de APIs según OWASP API Top 10: autorización por objeto, exposición de datos, límites y políticas RLS de la base de datos.",
      "API security assessment based on the OWASP API Top 10: object-level authorization, data exposure, rate limits and database RLS policies.",
    ),
    why: L(
      "Diseñamos APIs y políticas de base de datos en nuestros propios productos, así que sabemos dónde suelen fallar: en la autorización por objeto y en respuestas que devuelven más datos de los necesarios.",
      "We design APIs and database policies in our own products, so we know where they usually fail: object-level authorization and responses that return more data than needed.",
    ),
    faq: [
      [L("¿Cuál es el fallo más común en una API?", "What is the most common API flaw?"), L("La falta de autorización por objeto: cambiar un identificador en la petición y obtener datos de otro usuario. Es el primer riesgo del OWASP API Security Top 10.", "Missing object-level authorization: changing an identifier in the request and getting another user's data. It is the first risk in the OWASP API Security Top 10.")],
      [L("¿Necesitan acceso al código?", "Do you need access to the code?"), L("No es obligatorio. Con documentación, cuentas de prueba y, si es posible, el código, la evaluación es más profunda y eficiente.", "It is not required. With documentation, test accounts and, ideally, the code, the assessment is deeper and more efficient.")],
      [L("¿Revisan también la base de datos?", "Do you review the database too?"), L("Si usas Supabase o PostgreSQL con Row Level Security, revisamos las políticas, porque ahí se decide qué datos puede leer cada usuario.", "If you use Supabase or PostgreSQL with Row Level Security, we review the policies, because that is where each user's data access is decided.")],
    ],
  },
  "ai-security": {
    title: L("Seguridad de IA: prompt injection, RAG y agentes | CodeGurex", "AI security: prompt injection, RAG & agents | CodeGurex"),
    h1: L("Seguridad para aplicaciones con IA y agentes", "Security for AI applications and agents"),
    description: L(
      "Evaluamos aplicaciones con IA: inyección de prompts, fuga de datos, RAG, herramientas, agentes y servidores MCP, según OWASP Top 10 para LLM.",
      "We assess AI applications: prompt injection, data leakage, RAG, tools, agents and MCP servers, following the OWASP Top 10 for LLM Applications.",
    ),
    why: L(
      "Es el núcleo de nuestra división “Security for the AI Era”: revisamos qué puede leer, decidir y ejecutar tu sistema con IA, y proponemos controles concretos como permisos mínimos y confirmaciones humanas.",
      "This is the core of our “Security for the AI Era” division: we review what your AI system can read, decide and execute, and propose concrete controls such as least privilege and human confirmation.",
    ),
    faq: [
      [L("¿Qué es la inyección de prompts?", "What is prompt injection?"), L("Es cuando un texto malicioso —escrito por un usuario o escondido en un documento o página— cambia las instrucciones del modelo y lo lleva a revelar datos o actuar de forma no prevista.", "It is when malicious text — typed by a user or hidden in a document or web page — changes the model's instructions and makes it reveal data or act in unintended ways.")],
      [L("¿Por qué un agente es más riesgoso que un chatbot?", "Why is an agent riskier than a chatbot?"), L("Porque además de responder puede actuar: enviar correos, consultar bases de datos o llamar APIs. Un error de permisos se convierte en una acción real.", "Because besides answering it can act: send emails, query databases or call APIs. A permission mistake becomes a real action.")],
      [L("¿Evalúan servidores MCP?", "Do you assess MCP servers?"), L("Sí. Revisamos qué herramientas exponen, con qué permisos y qué datos pueden alcanzar.", "Yes. We review which tools they expose, with which permissions and what data they can reach.")],
    ],
  },
  "cloud-security": {
    title: L("Hardening de servidores y seguridad en la nube | CodeGurex", "Server hardening and cloud security | CodeGurex"),
    h1: L("Hardening de servidores y seguridad en la nube", "Server hardening and cloud security"),
    description: L(
      "Revisamos servidores y plataformas cloud: servicios expuestos, HTTPS, firewall, secretos, copias de seguridad y permisos de CI/CD, con correcciones priorizadas.",
      "We review servers and cloud platforms: exposed services, HTTPS, firewall, secrets, backups and CI/CD permissions, with prioritized fixes.",
    ),
    why: L(
      "Desplegamos nuestros productos en Cloudflare, Vercel, Supabase y GitHub Actions con detección de secretos y cabeceras de seguridad. Revisamos tu infraestructura con la misma lista que aplicamos a la nuestra.",
      "We deploy our products on Cloudflare, Vercel, Supabase and GitHub Actions with secret scanning and security headers. We review your infrastructure with the same checklist we apply to ours.",
    ),
    faq: [
      [L("¿Qué es el hardening?", "What is hardening?"), L("Es reducir la superficie de ataque: cerrar servicios innecesarios, endurecer configuraciones por defecto, proteger secretos y limitar permisos.", "Reducing the attack surface: closing unnecessary services, tightening default settings, protecting secrets and limiting permissions.")],
      [L("¿Revisan Vercel, Cloudflare o Supabase?", "Do you review Vercel, Cloudflare or Supabase?"), L("Sí. Revisamos variables de entorno, reglas de acceso, cabeceras, políticas de base de datos y permisos de despliegue.", "Yes. We review environment variables, access rules, headers, database policies and deployment permissions.")],
      [L("¿Hacen cambios en mi servidor?", "Will you change my server?"), L("Solo si lo acordamos por escrito. Podemos entregar las recomendaciones para tu equipo o aplicarlas nosotros.", "Only if agreed in writing. We can hand recommendations to your team or apply them ourselves.")],
    ],
  },
};

// Case-study search titles and descriptive H1s (the plain project name is not a search phrase).
export const WORK_SEO = {
  prez: {
    title: L("PREZ: plataforma de entrenamiento con Next.js y Supabase", "PREZ: training platform built with Next.js & Supabase"),
    h1: L("PREZ: plataforma de entrenamiento y nutrición deportiva", "PREZ: training and sports-nutrition platform"),
  },
  barbus: {
    title: L("BARBUS: software de gestión para barberías | CodeGurex", "BARBUS: barbershop management software | CodeGurex"),
    h1: L("BARBUS: software de gestión para barberías", "BARBUS: barbershop management software"),
  },
  crm: {
    title: L("CRM de ventas a medida para un fabricante | CodeGurex", "Custom sales CRM for a manufacturer | CodeGurex"),
    h1: L("CRM de ventas a medida para un fabricante ecuatoriano", "Custom sales CRM for an Ecuadorian manufacturer"),
  },
  costflow: {
    title: L("CostFlow: sistema de inventario y fiados | CodeGurex", "CostFlow: inventory & store-credit SaaS | CodeGurex"),
    h1: L("CostFlow: sistema de ventas, inventario y fiados para pequeños negocios", "CostFlow: sales, inventory and store-credit system for small businesses"),
  },
  adulam: {
    title: L("Página web para consultorio médico en Manta | CodeGurex", "Medical practice website in Ecuador | CodeGurex"),
    h1: L("Página web para el Consultorio Médico Familiar ADULAM en Manta", "Website for the ADULAM family medical practice in Manta"),
  },
  psicoquiz: {
    title: L("PsicoQuiz: app web educativa de psicopatología", "PsicoQuiz: educational web app | CodeGurex"),
    h1: L("PsicoQuiz: aplicación web para estudiar psicopatología", "PsicoQuiz: a web app for studying psychopathology"),
  },
  "codegurex-com": {
    title: L("Rediseño de CodeGurex.com: velocidad y seguridad", "CodeGurex.com redesign: speed and security"),
    h1: L("Rediseño de CodeGurex.com: rendimiento, SEO y seguridad", "CodeGurex.com redesign: performance, SEO and security"),
  },
  "security-lab": {
    title: L("Herramientas de ciberseguridad en Python | CodeGurex", "Cybersecurity tools in Python | CodeGurex"),
    h1: L("Herramientas de ciberseguridad en Python: cifrado, phishing y puertos", "Cybersecurity tools in Python: encryption, phishing and ports"),
  },
};
