# CodeGurex — Plan SEO

Fecha: 2026-11-14. Método: skill *claude-seo* (AgriciDaniel), plantilla **agencia + negocio local**. Sus scripts no se ejecutaron en este entorno, así que las mismas comprobaciones (títulos, descripciones, H1, número de palabras, anclas genéricas) se aplicaron con un script propio y quedaron fijadas en `validate.mjs`.

## 1. Diagnóstico: por qué no llegan visitas

| # | Problema | Evidencia | Prioridad |
|---|---|---|---|
| 1 | **El sitio casi no tiene autoridad ni presencia indexada.** | En las búsquedas de prueba no apareció ninguna página del sitio (el buscador usado no admite `site:`; hay que confirmarlo en Search Console). No se conocen enlaces desde otros sitios. | Crítica |
| 2 | **No existe ficha de Google Business Profile** (o no está enlazada). | Para "desarrollo de software Manta" o "páginas web Manta", los resultados son casi solo tesis universitarias en PDF: la competencia local es mínima y una ficha bien hecha aparecería en el mapa. | Crítica |
| 3 | **Títulos y H1 genéricos**: el H1 de la portada era "Technology. Software. Security." y ningún título mencionaba Manta ni Ecuador. | Auditoría de las 57 páginas. | Alta → **corregido** |
| 4 | **Páginas de servicio cortas**: 300–430 palabras (la skill pide 800 para páginas de servicio). | Auditoría. | Alta → **mejorado a 500–660** |
| 5 | **Redirecciones antiguas con `meta refresh`**: Google las acepta, pero una 301 transmite mejor la autoridad. | 14 URLs del sitio anterior. | Media |
| 6 | **Sin contenido informativo** (blog o guías): no hay páginas que respondan a preguntas que la gente busca. | Arquitectura actual. | Media |

## 2. Lo que ya se cambió en el código

- **Títulos (30–60 caracteres)** con la palabra clave primero, la ubicación cuando aplica y la marca al final. Ejemplos:
  - Portada: *Software a medida y ciberseguridad en Ecuador | CodeGurex*
  - *Diseño de páginas web en Manta y Ecuador | CodeGurex*
  - *Pentesting web y auditoría de seguridad en Ecuador*
  - *BARBUS: software de gestión para barberías | CodeGurex*
- **H1 descriptivos** en todas las páginas. En la portada, "Technology. Software. Security." se mantiene como titular visual y el H1 pasa a ser *"Desarrollo de software, páginas web y ciberseguridad en Ecuador."*
- **Descripciones (110–165 caracteres)** escritas por página, no recortadas automáticamente.
- **Servicios:** se añaden las secciones *Por qué con CodeGurex* (con evidencia real), *Preguntas frecuentes* (3–4 por servicio, en ES y EN) y *Dónde trabajamos* (Manta → todo Ecuador → remoto).
- **Datos estructurados:** la portada pasa de `Organization` a `ProfessionalService`, con dirección (Manta, Manabí, EC), zona de servicio (Ecuador y global) y el catálogo de los 10 servicios. Cada servicio enlaza a la organización por `@id`.
- **Anclas descriptivas:** se eliminan "Leer el caso" y "Ver productos".
- **`/llms.txt`:** resumen del sitio para buscadores con IA (ChatGPT, Perplexity, Gemini). Se genera en cada build.
- **`validate.mjs`** ahora bloquea el despliegue si un título o una descripción se sale de rango, o si aparece un ancla genérica.

## 2b. Segunda pasada (agencia, 2026-11-15)

Medido con Lighthouse móvil en producción antes de los cambios: **SEO 83–85**, rendimiento 98–99, accesibilidad 100. Con el código nuevo (build local): **SEO 100**, rendimiento 98–99, accesibilidad 100, en portada, servicio, artículo y página local.

| Cambio | Motivo |
|---|---|
| **Blog** (`/blog/`) con 4 artículos de experto en ES y EN: cómo elegir una empresa de software en Ecuador, qué es un pentest web, Row Level Security en Supabase y checklist de seguridad web | Capturar búsquedas informativas y demostrar experiencia (E-E-A-T). Cada artículo tiene autor, fecha, `BlogPosting` y enlaces a servicios y casos |
| **Página local** "Desarrollo de software y páginas web en Manta" (EN: *Software development company in Ecuador*) | Búsquedas locales con casi nula competencia. Es una sola página con trabajo real en Manta (sin páginas puerta por ciudad) |
| Cada caso enlaza a los servicios que demuestra | Enlazado interno: reparte la autoridad hacia las páginas comerciales |
| Pie de página con "Manta, Manabí, Ecuador" | Coherencia de nombre, dirección y teléfono (NAP) |
| Correo sin ofuscar (`<!--email_off-->`) | Cloudflare reemplazaba el correo por "[email protected]" para los rastreadores |
| Enlace de idioma con nombre accesible coherente y "Política de privacidad" en lugar de "Más información" | Fallos de Lighthouse (*label-content-name-mismatch*, *link-text*) |
| 404 sin canonical ni hreflang; redirecciones sin `noindex` contradictorio | Señales limpias para Google |
| CSS minificado y versión de assets renovada (`?v=2`) | Rendimiento y caché |
| `llms.txt` incluye artículos y la página local | GEO |

## 2c. Legibilidad y alcance internacional (2026-11-21)

Revisión de un consultor SEO externo: demasiado texto corrido, encabezados genéricos y posicionamiento demasiado local para una cartera de clientes mayoritariamente extranjera.

| Antes | Después |
|---|---|
| 21 páginas con párrafos de más de 45 palabras | 0. Los textos se parten en grupos de 1–2 frases (`paras()` y un filtro global en `page()`); `validate.mjs` falla por encima de 60 palabras |
| H2 genéricos repetidos ("El problema", "Para quién", "Contexto"…) y la llamada final como H2 en 33 páginas por idioma | H2 únicos con el nombre del servicio o proyecto ("Qué incluye: Seguridad de aplicaciones web", "El reto de BRISEL"); la llamada final deja de ser encabezado; `validate.mjs` falla si un H2 se repite en una página |
| FAQ de servicios siempre abiertas | Acordeones `<details>`: Google las lee, el visitante abre solo la que le interesa |
| Casos de estudio en 8 bloques de texto | Resumen inicial en tres columnas (reto, solución, resultado) y luego el detalle |
| Títulos con "en Ecuador" / "en Manta" | Títulos sin ciudad. En inglés, foco *nearshore* (GMT-5, USD, ES/EN), que es como buscan equipos remotos los clientes de EE. UU. |
| Ubicación solo local | Franja en la portada: GMT-5, facturación en USD, ES·EN, 100 % remoto. `areaServed: Worldwide` primero en el esquema. La página de Manta se mantiene para la búsqueda local |

## 3. Lo que tienes que hacer tú (en orden de impacto)

### Urgente — Cloudflare está limitando tu visibilidad
1. **robots.txt gestionado / AI Crawl Control** (Cloudflare → tu dominio → *AI Crawl Control* o *Security → Bots → Manage robots.txt*): hoy Cloudflare antepone reglas que **bloquean GPTBot, ClaudeBot, Google-Extended, GoogleOther, Applebot-Extended, Baiduspider y más de 25 bots**, y Lighthouse marca el archivo como inválido. Si quieres aparecer y ser citado por asistentes de IA, desactiva el robots.txt gestionado (o permite al menos los bots de búsqueda). Es una decisión de negocio: bloquearlos impide que entrenen con tu contenido, pero también reduce tu presencia en ChatGPT, Claude y Gemini.
2. **JavaScript Detections / Bot Fight Mode** (*Security → Bots*): Cloudflare inyecta un script en línea que tu CSP bloquea (error en consola, −puntos en Lighthouse). Desactívalo o acepta el error.
3. **Web Analytics automático** (*Analytics & Logs → Web Analytics*): Cloudflare inyecta su beacon y tu CSP lo bloquea. Ya usas Google Analytics: desactiva la inyección automática.
4. **Caché de assets** (*Caching → Cache Rules*): regla para `/assets/*` con *Edge/Browser TTL* de 1 año. Los archivos llevan versión (`?v=`), así que es seguro.
5. **Verifica** que `http://codegurex.com` y `https://www.codegurex.com` redirigen con 301 a `https://codegurex.com/` (no se pudo comprobar desde el entorno de auditoría).

### Sin cambios respecto a la primera pasada

### Semana 1 — que Google sepa que existes
1. **Google Search Console** (search.google.com/search-console): agrega `codegurex.com` como propiedad de dominio (verificación por DNS en Cloudflare). Envía `https://codegurex.com/sitemap.xml`. Usa *Inspección de URL → Solicitar indexación* para la portada y los 5 servicios principales.
2. **Google Business Profile** (business.google.com): crea la ficha "CodeGurex" como **negocio de área de servicio** (sin mostrar dirección, si trabajas desde casa), categoría principal *Empresa de software* y secundarias *Diseñador de páginas web* y *Servicio de seguridad informática*. Zona: Manta, Manabí, Ecuador. Web: `https://codegurex.com/`. Teléfono: el mismo del sitio.
3. **Bing Webmaster Tools**: importa la propiedad desde Search Console. Bing alimenta a ChatGPT Search.
4. **Cloudflare → Rules → Redirect Rules / Bulk Redirects**: carga `docs/cloudflare-redirects.csv` para que las 14 URLs antiguas respondan con 301.

### Semanas 2–4 — primeros enlaces y reseñas
5. **Enlaces desde tus propios proyectos**, la fuente de autoridad más rápida y legítima: en el pie de ADULAM (ya enlaza a codegurex.com), BARBUS y CostFlow, usa un texto descriptivo como *"Desarrollado por CodeGurex — desarrollo de software en Ecuador"*, que enlace a la portada o a `/servicios/saas/`.
6. **Reseñas en Google Business Profile** de clientes reales (ADULAM, Tahor Clean, usuarios de BARBUS). Pídelas con el enlace directo de reseñas de la ficha. Nunca compres reseñas.
7. **Perfiles consistentes** (mismo nombre, web y teléfono): LinkedIn (página de empresa, no solo perfil personal), Clutch, GoodFirms, directorios de Ecuador y la Cámara de Comercio de Manta.
8. **Unifica cuentas**: el sitio enlaza a `linkedin.com/in/codegurex` y `github.com/gurexdev`, mientras que el CV usa `linkedin.com/in/gurexdev`. Elige una identidad y úsala en todas partes.

### Mes 2–3 — contenido que atrae búsquedas
9. **Sección de artículos** (`/blog/`), un artículo cada dos semanas, escrito desde tu experiencia real. Temas propuestos con su intención de búsqueda:

| Artículo | Búsqueda objetivo | Basado en |
|---|---|---|
| Cuánto cuesta una página web en Ecuador y de qué depende | "cuánto cuesta una página web Ecuador" | Tus propuestas reales (necesito tus rangos de precio) |
| Row Level Security en Supabase: cómo aislar los datos de cada cliente | "supabase row level security" | BARBUS y PREZ |
| Checklist de seguridad antes de lanzar tu web | "seguridad página web checklist" | Cabeceras, CSP y formularios de este sitio |
| Qué es un pentest web y cuándo lo necesita tu empresa | "qué es un pentest" / "pentesting Ecuador" | Servicio de seguridad de aplicaciones |
| Software a medida vs. CRM genérico: cómo decidir | "software a medida vs CRM" | Caso del CRM comercial |
| Inyección de prompts: el riesgo de conectar IA a tus datos | "prompt injection qué es" | Servicio de seguridad de IA |

10. **Página de precios orientativos** o rangos, si estás dispuesto a publicarlos: es una de las búsquedas comerciales más frecuentes y casi ninguna empresa local responde.

## 4. Cómo saber si funciona

| Señal | Dónde verla | Meta a 90 días | Si no se cumple |
|---|---|---|---|
| Páginas indexadas | Search Console → Páginas | ≥ 45 de 56 | Revisar "Rastreada, no indexada" y reforzar el contenido de esas páginas |
| Impresiones | Search Console → Rendimiento | Crecimiento semana a semana desde la indexación | Revisar las consultas reales y ajustar títulos |
| Búsquedas con "Manta" o "Ecuador" | Search Console → Consultas | Aparecer en el top 20 de 5 consultas locales | Priorizar Google Business Profile y reseñas |
| Vistas y acciones en la ficha | Google Business Profile → Rendimiento | Llamadas o clics a la web desde el mapa | Completar la ficha: fotos, servicios y publicaciones |
| Contactos | WhatsApp y correo con el origen "web" | Primer contacto orgánico | Revisar la conversión de las páginas de servicio |

El SEO de un dominio nuevo tarda **de 2 a 6 meses** en dar resultados estables. Las acciones 1–4 son las que más aceleran ese plazo.
