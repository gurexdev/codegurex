# CodeGurex.com — Revisión de seguridad

Fecha: 2026-11-10. Alcance: el sitio generado en `dist/` y su proceso de build.

## Superficie

Sitio estático sin backend, sin base de datos, sin cuentas de usuario y sin secretos. El único JavaScript es propio (`site.js`, `analytics.js`) más la etiqueta de Google Analytics.

## Controles implementados

| Control | Implementación | Verificación |
|---|---|---|
| Content Security Policy | `<meta http-equiv>` en cada página: `default-src 'self'`, sin `unsafe-inline`, sin `eval`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` | `validate.mjs` rechaza estilos/scripts/manejadores inline; Playwright confirmó que la CSP bloquea scripts inyectados |
| Cabeceras HTTP | `dist/_headers`: CSP + `frame-ancestors 'none'`, HSTS, `nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy, COOP | Aplica en un borde compatible (Cloudflare Pages/Workers). **GitHub Pages lo ignora** — ver limitaciones |
| Enlaces externos | `rel="noopener noreferrer"` en todo `target="_blank"` | `validate.mjs` |
| Formulario | Sin envío a servidor. Validación de longitud/formato, limpieza de caracteres de control, honeypot, tiempo mínimo de llenado (3 s), enfriamiento (20 s), rechazo de credenciales y claves privadas en el texto | `scripts/qa.mjs` (pruebas de comportamiento) |
| Minimización de datos | No se piden teléfono, datos médicos ni accesos. El mensaje se arma en el dispositivo y se envía solo si el usuario lo confirma en WhatsApp/correo | Revisión de código |
| Analítica | Consent Mode v2: `analytics_storage` empieza en *denied*; señales publicitarias siempre *denied*. `page_location` sin query string para no filtrar texto a terceros | `analytics.js` |
| Sin secretos | El repo no contiene claves ni variables de entorno | Revisión manual |
| Dependencias | Cero dependencias de ejecución; build con Node estándar | `package.json` |
| Contenido sensible | Captura de CodeGurex Finance **no publicada** (mostraba cifras financieras reales); captura original contenía un correo personal | Decisión de auditoría |

## Limitaciones conocidas

1. **GitHub Pages no envía cabeceras personalizadas.** `frame-ancestors` y HSTS solo aplican si `codegurex.com` pasa por Cloudflare con reglas de cabeceras o si se migra a Cloudflare Pages. La política de privacidad indica que Cloudflare presta DNS y protección: **confirmar** que las cabeceras se configuran en el borde.
2. La protección antispam del formulario es del lado del cliente. Es suficiente porque no existe endpoint que abusar: el mensaje solo se envía desde la app del usuario.
3. La etiqueta de Google Analytics es un script de terceros permitido por la CSP (`www.googletagmanager.com`).

## Recomendaciones

- Configurar en Cloudflare las cabeceras de `dist/_headers` (Transform Rules) o migrar a Cloudflare Pages.
- Añadir `security.txt` en `/.well-known/` cuando exista un buzón dedicado.
