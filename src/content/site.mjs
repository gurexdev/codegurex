// Global configuration, routes and shared copy. Every user-facing string is { es, en }.
export const L = (es, en) => ({ es, en });

export const SITE = {
  origin: "https://codegurex.com",
  name: "CodeGurex",
  email: "contacto@codegurex.com",
  phone: "+593963223403",
  phoneDisplay: "+593 96 322 3403",
  whatsapp: "https://wa.me/593963223403",
  github: "https://github.com/gurexdev",
  linkedin: "https://www.linkedin.com/in/codegurex/",
  analyticsId: "G-3NH66XEY32",
  updated: "2026-11-10",
  version: "2026.11",
};

export const LANGS = ["es", "en"];
export const LOCALE = { es: "es_EC", en: "en_US" };

// Static routes. Dynamic routes (services, work) are registered from their content files.
export const ROUTES = {
  home: L("/", "/en/"),
  solutions: L("/soluciones/", "/en/solutions/"),
  services: L("/servicios/", "/en/services/"),
  work: L("/trabajo/", "/en/work/"),
  products: L("/productos/", "/en/products/"),
  sentinel: L("/productos/sentinel/", "/en/products/sentinel/"),
  technology: L("/tecnologia/", "/en/technology/"),
  about: L("/nosotros/", "/en/about/"),
  contact: L("/contacto/", "/en/contact/"),
  privacy: L("/privacidad/", "/en/privacy/"),
};

export const NAV = [
  ["solutions", L("Soluciones", "Solutions")],
  ["services", L("Servicios", "Services")],
  ["work", L("Trabajo", "Work")],
  ["products", L("Productos", "Products")],
  ["technology", L("Tecnología", "Technology")],
  ["about", L("Empresa", "Company")],
];

export const UI = {
  skip: L("Saltar al contenido", "Skip to content"),
  menu: L("Menú", "Menu"),
  menuOpen: L("Abrir menú", "Open menu"),
  menuClose: L("Cerrar menú", "Close menu"),
  mainNav: L("Navegación principal", "Main navigation"),
  langLabel: L("Read this page in English", "Leer esta página en español"),
  langShort: L("EN", "ES"),
  discuss: L("Hablemos de tu proyecto", "Discuss a project"),
  explore: L("Ver nuestro trabajo", "Explore our work"),
  requestAssessment: L("Solicitar evaluación de seguridad", "Request a security assessment"),
  talkEngineering: L("Hablar con ingeniería", "Talk to our engineering team"),
  exploreSolutions: L("Explorar soluciones", "Explore our solutions"),
  readCase: L("Leer el caso", "Read the case study"),
  viewService: L("Ver servicio", "View service"),
  allWork: L("Todo el trabajo", "All work"),
  allServices: L("Todos los servicios", "All services"),
  home: L("Inicio", "Home"),
  breadcrumb: L("Ruta de navegación", "Breadcrumb"),
  status: L("Estado", "Status"),
  sheet: L("Hoja", "Sheet"),
  rev: L("Rev", "Rev"),
  footerTagline: L(
    "Ingeniería de software, integración inteligente y ciberseguridad. Empresa independiente fundada en Ecuador, con atención internacional.",
    "Software engineering, intelligent integration and cybersecurity. An independent company founded in Ecuador, working internationally.",
  ),
  footerCompany: L("Empresa", "Company"),
  footerBuild: L("Construir", "Build"),
  footerSecure: L("Proteger", "Secure"),
  footerContact: L("Contacto", "Contact"),
  footerLegal: L("Privacidad", "Privacy"),
  footerNote: L(
    "Todo lo publicado aquí corresponde a trabajo verificable. Los estados de cada proyecto y producto se indican de forma explícita.",
    "Everything published here is verifiable work. The status of every project and product is stated explicitly.",
  ),
  location: L("Ecuador · Atención internacional", "Ecuador · Working internationally"),
  privacyPrefs: L("Preferencias de privacidad", "Privacy preferences"),
};

// Delivery status vocabulary — used across work, products and Sentinel.
export const STATUS = {
  production: L("En producción", "In production"),
  published: L("Publicado", "Published"),
  demo: L("Demo pública", "Public demo"),
  development: L("En desarrollo", "In development"),
  internal: L("Uso interno", "Internal use"),
  private: L("Privado · bajo pedido", "Private · on request"),
  available: L("Disponible", "Available"),
  planned: L("Planificado", "Planned"),
  client: L("Cliente activo", "Active client"),
};
export const STATUS_TONE = {
  production: "live",
  published: "live",
  demo: "live",
  client: "live",
  available: "live",
  development: "dev",
  internal: "dev",
  private: "dev",
  planned: "plan",
};

// Work filters (section 5.4 of the brief).
export const DISCIPLINES = {
  engineering: L("Ingeniería de software", "Software Engineering"),
  web: L("Desarrollo web", "Web Development"),
  saas: L("SaaS y plataformas", "SaaS & Platforms"),
  security: L("Ciberseguridad", "Cybersecurity"),
  ai: L("IA y automatización", "AI & Automation"),
};

// Legacy URLs that must keep working after the restructure.
export const LEGACY = {
  "auditoria-web.html": ["service", "web-development"],
  "seo-tecnico.html": ["service", "web-development"],
  "rendimiento-web.html": ["service", "web-development"],
  "seguridad-web.html": ["service", "application-security"],
  "seguridad-aplicaciones-ia.html": ["service", "ai-security"],
  "seguridad-agentes-ia.html": ["service", "ai-security"],
  "seguridad-apis.html": ["service", "api-security"],
  "hardening-infraestructura-nube.html": ["service", "cloud-security"],
  "codegurex-sentinel.html": "sentinel",
  "caso-codegurex.html": ["work", "codegurex-com"],
  "nosotros.html": "about",
  "fundador.html": "about",
  "contacto.html": "contact",
  "privacidad.html": "privacy",
};
