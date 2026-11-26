# CodeGurex — Kit de lanzamiento (visibilidad y primeros clientes)

Fecha: 2026-11-26.

**Diagnóstico.** La web está técnicamente lista: SEO 100 en Lighthouse local, títulos y H2 únicos, 70 páginas en ES/EN, datos estructurados. Aun así, en búsquedas de prueba **no aparece ninguna página de codegurex.com**, ni siquiera buscando la marca: los buscadores casi no la conocen. Además, Google Analytics solo cuenta a quien pulsa "Aceptar", así que muestra casi cero aunque haya visitas.

Más cambios en la web no resuelven esto. Lo resuelven estas acciones, en este orden.

---

## Paso 1 · Hoy (40 minutos): que Google y Bing sepan que existes

### Google Search Console
1. Entra en <https://search.google.com/search-console> → **Agregar propiedad → Dominio** → `codegurex.com`.
2. Copia el registro TXT y créalo en **Cloudflare → DNS → Add record → TXT** (nombre `@`). Vuelve y pulsa **Verificar**.
3. **Sitemaps** → envía `https://codegurex.com/sitemap.xml`.
4. **Inspección de URLs** → pega cada URL y pulsa **Solicitar indexación** (hay un límite diario; reparte en dos días):
   - `https://codegurex.com/`
   - `https://codegurex.com/en/`
   - `https://codegurex.com/servicios/aplicaciones-web/`
   - `https://codegurex.com/en/services/web-applications/`
   - `https://codegurex.com/servicios/saas/`
   - `https://codegurex.com/servicios/seguridad-aplicaciones/`
   - `https://codegurex.com/trabajo/`
   - `https://codegurex.com/trabajo/brisel-catalogo-mayorista/`
   - `https://codegurex.com/blog/que-es-un-pentest-web/`
   - `https://codegurex.com/desarrollo-de-software-manta/`

### Bing Webmaster Tools
1. Entra en <https://www.bing.com/webmasters> → **Importar desde Google Search Console**.
2. Bing alimenta a Copilot, DuckDuckGo, Yahoo y la búsqueda de ChatGPT. Desde este cambio, **cada despliegue avisa automáticamente a Bing y otros buscadores por IndexNow** (paso en GitHub Actions).

---

## Paso 2 · Hoy (15 minutos): ajustes de Cloudflare

| Ajuste | Dónde | Qué hacer |
|---|---|---|
| robots.txt gestionado | *AI Crawl Control* o *Security → Bots* | Desactivar. Hoy antepone reglas que bloquean a GPTBot, ClaudeBot, Google-Extended y más de 25 bots, y Lighthouse marca el archivo como inválido |
| Web Analytics | *Analytics & Logs → Web Analytics → Add site* | Activar con **inyección automática**. Es analítica sin cookies: cuenta **todas** las visitas sin pedir consentimiento |
| Cabecera CSP | La regla de *Transform Rules → Response headers* donde se definió `Content-Security-Policy` | Reemplazar su valor por el de abajo (permite Cloudflare Web Analytics) |
| JavaScript Detections | *Security → Bots* | Desactivar (la CSP bloquea ese script de todas formas) |

Valor nuevo de la cabecera `Content-Security-Policy`:

```text
default-src 'self'; img-src 'self' data: https://*.google-analytics.com https://www.googletagmanager.com; style-src 'self'; script-src 'self' https://www.googletagmanager.com https://static.cloudflareinsights.com; font-src 'self'; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://cloudflareinsights.com; object-src 'none'; base-uri 'self'; form-action 'self' https://wa.me; frame-ancestors 'none'; upgrade-insecure-requests
```

---

## Paso 3 · Esta semana: perfiles que dan autoridad y enlaces

Usa **exactamente** el mismo nombre, web y teléfono en todos (consistencia NAP).

- **Nombre:** CodeGurex
- **Web:** https://codegurex.com
- **Correo:** contacto@codegurex.com
- **WhatsApp:** +593 96 322 3403

### Textos para copiar

**Descripción corta (ES, 250 caracteres):**
> CodeGurex diseña, desarrolla y protege software: aplicaciones web, plataformas SaaS, sistemas de gestión, integraciones con IA y evaluaciones de ciberseguridad. Equipo remoto en Ecuador (GMT-5), en español e inglés.

**Short description (EN, 250 characters):**
> CodeGurex designs, builds and secures software: web applications, SaaS platforms, business systems, AI integrations and security assessments. A nearshore team in Ecuador (GMT-5), working in English and Spanish.

**Descripción larga (ES, ≈700 caracteres) — Google Business Profile, LinkedIn, directorios:**
> CodeGurex es una empresa de ingeniería de software y ciberseguridad. Construimos aplicaciones web, plataformas SaaS multi-tenant, CRM y sistemas de gestión con Next.js, TypeScript, PostgreSQL y Cloudflare, y evaluamos la seguridad de aplicaciones, APIs y sistemas con IA según OWASP. Cada proyecto se entrega con pruebas automatizadas, código a nombre del cliente y documentación. Trabajamos 100 % en remoto con empresas de cualquier país, desde Ecuador (GMT-5, facturación en USD), en español e inglés. Proyectos en uso: BRISEL, BARBUS, PREZ, Consultorio ADULAM y un CRM comercial.

**Long description (EN, ≈700 characters):**
> CodeGurex is a software engineering and cybersecurity company. We build web applications, multi-tenant SaaS platforms, CRMs and business systems with Next.js, TypeScript, PostgreSQL and Cloudflare, and we assess the security of applications, APIs and AI systems following OWASP. Every project ships with automated tests, code owned by the client and documentation. We work 100% remotely with companies anywhere, from Ecuador (GMT-5, USD billing), in English and Spanish. Systems in use include BRISEL, BARBUS, PREZ, the ADULAM medical practice and a sales CRM.

### Dónde publicarlos

| Plataforma | URL | Por qué |
|---|---|---|
| Google Business Profile | <https://business.google.com> | Mapa y búsquedas locales. Crear como **negocio de área de servicio**; categorías: *Empresa de software*, *Diseñador de páginas web*, *Servicio de seguridad informática* |
| LinkedIn — Página de empresa | <https://www.linkedin.com/company/setup/new/> | En las búsquedas solo aparece el perfil personal "Code Gurex". Una página de empresa aparece en Google por la marca y enlaza a la web |
| Clutch | <https://clutch.co/get-listed> | Donde comparan proveedores las empresas de EE. UU. y Europa. Pide a 2–3 clientes que dejen reseña verificada |
| GoodFirms | <https://www.goodfirms.co/get-listed> | Directorio internacional de empresas de software |
| Bing Places | <https://www.bingplaces.com> | Se importa desde Google Business Profile |
| Crunchbase | <https://www.crunchbase.com/add-new> | Perfil de empresa con enlace; refuerza la entidad "CodeGurex" |
| GitHub | Perfil `gurexdev` | Ya enlaza a codegurex.com; añade la web también al campo *Website* del perfil |

---

## Paso 4 · Enlaces desde tus propios proyectos

Es la fuente de autoridad más rápida y totalmente legítima.

| Proyecto | Estado | Acción |
|---|---|---|
| Consultorio ADULAM | Ya enlaza a codegurex.com en el pie | Nada |
| BRISEL | Crédito "codegurex" **sin enlace** (`src/config/store.ts`, `credit.url: ''`) | Poner `url: 'https://codegurex.com'` y volver a desplegar (`npm run deploy`) |
| BARBUS, CostFlow | Por revisar | Pie con "Desarrollado por CodeGurex" enlazando a `https://codegurex.com` |

---

## Paso 5 · Distribuye los artículos (con canonical)

Publica los 4 artículos del blog también en **dev.to**, **Hashnode** o **Medium** con la URL original como canónica. Así ganas lectores y enlaces sin que Google lo vea como contenido duplicado. En dev.to, al inicio del artículo:

```yaml
---
title: "Row Level Security en Supabase: cómo aislar los datos de cada cliente en un SaaS"
canonical_url: https://codegurex.com/blog/row-level-security-supabase-saas/
tags: supabase, postgres, security, saas
---
```

Haz lo mismo en LinkedIn (artículo o publicación con un resumen y el enlace).

---

## Paso 6 · Primeros clientes mientras el SEO madura (30 días)

El SEO de un dominio nuevo tarda **de 2 a 6 meses** en traer tráfico estable. Mientras tanto, los clientes llegan por contacto directo:

1. **LinkedIn, 3 publicaciones por semana:** un caso (BRISEL, PREZ, el CRM), un consejo técnico de los artículos y un "antes/después". Siempre con enlace al caso en codegurex.com.
2. **Plataformas de proyectos con tu portafolio:** Upwork y Contra (clientes de EE. UU.), Workana (Latinoamérica). En cada propuesta, enlaza el caso más parecido.
3. **10 mensajes directos por semana** a negocios que ya venden por WhatsApp o Instagram (como BRISEL) o a startups que necesitan revisar su seguridad. Plantilla:

> Hola, [nombre]. Vi que [empresa] recibe pedidos por WhatsApp. Hace poco construimos para BRISEL un catálogo mayorista donde el cliente arma el pedido por talla y color y llega ordenado al WhatsApp de la marca: https://codegurex.com/trabajo/brisel-catalogo-mayorista/. Si te sirve algo parecido, te cuento en 15 minutos cómo lo haríamos para ustedes.

4. **Pide referidos y reseñas** a ADULAM, BRISEL y Tahor Clean: una reseña en Google Business Profile o en Clutch vale más que cualquier cambio en la web.

---

## Cómo medir (no uses solo Google Analytics)

| Qué | Dónde | Señal de que funciona |
|---|---|---|
| Páginas indexadas | Search Console → Páginas | Pasa de 0 a más de 40 en 2–6 semanas |
| Impresiones y consultas | Search Console → Rendimiento | Aparecen consultas con tu marca y luego con servicios |
| Visitas reales | Cloudflare Web Analytics | Cuenta todas las visitas, sin consentimiento |
| Bing | Bing Webmaster → URL submission | IndexNow aceptado tras cada despliegue |
| Contactos | WhatsApp y correo | Pregunta siempre "¿cómo nos encontraste?" |
