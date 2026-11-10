# CodeGurex — Auditoría corporativa y estrategia (Fase 1–2)

- **Fecha:** 2026-11-10
- **Alcance:** sitio actual (`gurexdev/codegurex`), historial Git (44 commits), repositorios accesibles en GitHub (`gurexdev/*`, `josssdev/*`), portafolio personal privado del fundador, CV publicado en ese repositorio y capturas existentes en `img/`.
- **Regla aplicada:** solo se publica lo que tiene evidencia. Lo que no se pudo comprobar se marca como **no verificado**.

> Limitación del entorno: la red de esta sesión no permitió abrir los dominios en vivo (`codegurex.com`, `barbus.vercel.app`, `alertmanta.com`, `*.vercel.app`, `josssdev.github.io`). Los estados "en producción" de proyectos sin repositorio accesible se basan en documentos del propietario (CV, README de perfil y portafolio) y en capturas reales, y así se indica.

---

## 1. Inventario de capacidades (con evidencia)

| Capacidad | Evidencia verificada | Nivel |
|---|---|---|
| Sitios corporativos y web estática | Sitio CodeGurex (este repo), Consultorio Adulam (`josssdev/Consultorio`, `josssdev/Adulam-Web`) | Demostrada |
| Aplicaciones web a medida | CRM comercial (`gurexdev/CRM-DEMO`, ~2.750 líneas JS), PsicoQuiz (`gurexdev/PsicoQuiz`) | Demostrada |
| SaaS multi-tenant | PREZ (código revisado: RLS + pgTAP), CodeGurex Finance (aislamiento por `ownerId`), BARBUS y CostFlow (documentados por el propietario, capturas reales) | Demostrada |
| Autenticación, roles y MFA | PREZ: Supabase Auth, verificación de correo, MFA TOTP obligatorio para personal, guardas `requireUser`/`requireRole` | Demostrada |
| Modelado de datos y PostgreSQL | PREZ: 11 migraciones SQL versionadas; Finance: Prisma 7 + Postgres | Demostrada |
| Calidad y pruebas | PREZ: Vitest, Playwright, axe-core, pgTAP, ESLint, Prettier, gitleaks, GitHub Actions | Demostrada |
| Despliegue y nube | Cloudflare Workers vía OpenNext (PREZ), Vercel, GitHub Pages + Actions (este sitio) | Demostrada |
| Seguridad de aplicaciones | Cabeceras CSP/HSTS, RLS, modelo de amenazas (PREZ `docs/THREAT_MODEL.md`), herramientas Python | Demostrada |
| Herramientas de seguridad | Gestor de contraseñas (Fernet + PBKDF2 480k), Detector de phishing (heurísticas URL/correo), Escáner de puertos (sockets + `ThreadPoolExecutor`) | Demostrada (educativas) |
| Integraciones | WhatsApp (citas/tienda/contacto), importación/exportación Excel (CRM), generación de PDF (documentado), Supabase REST | Demostrada |
| IA e integración de modelos | **Sin implementación publicada encontrada.** "CodeGurex AI Office" no apareció en ningún repositorio accesible. | **No verificada** |
| Evaluación de seguridad de IA | Metodología descrita en el sitio actual (OWASP GenAI). Sin caso publicado. | Servicio ofrecido, sin caso |

## 2. Evaluación del sitio actual

**Arquitectura:** HTML estático + CSS/JS propios, generador Node (`generate-service-pages.mjs`), validación (`validate.mjs`), despliegue GitHub Pages con Actions. Sin dependencias. **Se conserva la arquitectura** (no hay motivo técnico para migrar a un framework).

**Conservar**
- Disciplina de honestidad: estados *disponible / en desarrollo / dirección futura* en Sentinel.
- Analítica GA4 con consentimiento previo (Consent Mode, publicidad desactivada).
- Política de privacidad, formulario sin almacenamiento de datos (WhatsApp), aviso de no enviar credenciales.
- Caso documentado de CodeGurex.com (−91,1 % de peso en imágenes, verificado en commit `928af53`).
- El concepto **"Security for the AI Era"** como identidad de la división de seguridad.

**Problemas**
1. **Posicionamiento incompleto:** el sitio comunica solo ciberseguridad; el desarrollo de software —que es donde está la mayor parte de la evidencia— desapareció del sitio en el commit `6571629`.
2. **Portafolio eliminado:** los casos (Adulam, PsicoQuiz, CRM, CostFlow) se retiraron de la Home; hoy no hay prueba visible de capacidad de ingeniería.
3. **Datos ilustrativos que parecen métricas:** la Home muestra "Security score 82", "97 assets", "23 risks". Aunque se rotulan como ilustrativos, en un primer vistazo parecen datos reales.
4. **Imágenes generadas con IA** (`img/Phishing.*`, `img/Escaner.*`, `img/Gestor.*`): estética "hacker neón" con datos inventados. No son capturas de las herramientas. **Retiradas.**
5. **Dato incorrecto heredado:** el sitio anterior atribuía Next.js/React a PsicoQuiz; el repositorio es HTML/CSS/JavaScript sin framework.
6. **Idiomas mezclados:** Home en inglés con conmutador JS; páginas internas solo en español; sin `hreflang`, sin URLs por idioma.
7. **Cabeceras:** `_headers` no se aplica en GitHub Pages. Las cabeceras dependen de la capa de borde (Cloudflare) si existe; debe confirmarse.
8. **Marca:** el wordmark dice "CodeGurex Security", lo que limita la marca a una sola división.
9. Sin página 404 propia.

## 3. Inventario de proyectos

| Proyecto | Categoría | Estado | Tecnologías verificadas | Contribución CodeGurex | Evidencia | Portafolio |
|---|---|---|---|---|---|---|
| **BARBUS** | SaaS · gestión para barberías | En producción (según propietario) | Next.js, React, Supabase, PWA (según CV) | Producto completo | CV, README de perfil, captura `img/barbus.png`, URL `barbus.vercel.app` (no abierta) | **Recomendado** — código no revisado |
| **PREZ** | Plataforma · rendimiento deportivo y salud | En desarrollo (Fase 2 completada en código; pagos pendientes) | Next.js 16, React 19, TS estricto, Tailwind 4, Supabase (Auth, Postgres, RLS, Storage), Zod, Cloudflare Workers/OpenNext, Vitest, Playwright, axe, pgTAP | Arquitectura, desarrollo, seguridad, pruebas | Repo privado `gurexdev/PREZ` revisado: 11 migraciones, 10 módulos, 193 archivos TS, docs de arquitectura/amenazas | **Recomendado** — sin capturas aún |
| **CostFlow** | SaaS · compras, ventas, fiados, inventario | Publicado (demo) | Next.js, Supabase, multi-tenant (según CV) | Producto completo | Captura `img/Dashboard.png`, CV; repo `codegurex/costflow` no accesible | **Recomendado** |
| **CRM comercial (Tahor Clean CRM)** | Sistema interno · CRM | Demo pública con datos sintéticos | JavaScript, PWA, gráficos, importación/exportación Excel, cliente Supabase en versión real | Desarrollo completo | Repo `gurexdev/CRM-DEMO` revisado; captura real | **Recomendado** (se presenta el CRM, no el sitio corporativo excluido) |
| **Consultorio Médico Familiar ADULAM** (sitio nuevo, 2026) | Salud · sitio web 24 h | En producción (`adulam-bnm.pages.dev`) | Astro, CSS con tokens, JSON-LD MedicalClinic/FAQPage/MedicalWebPage, Cloudflare Pages, Playwright + axe + Lighthouse | Estrategia, diseño, desarrollo, SEO local, publicación; cliente desde 2022 | Repo privado `gurexdev/adulam-web` revisado; sitio en vivo verificado (axe 0 en 3 páginas × 2 tamaños, cabeceras activas); 2 capturas reales | **Recomendado** — reemplaza al sitio de 2022 (`josssdev/Consultorio`, retirado del portafolio) |
| **PsicoQuiz** | App educativa | Publicado | HTML, CSS, JavaScript, `localStorage` (59 preguntas, 6 modos) | Desarrollo completo | Repo `gurexdev/PsicoQuiz`, captura | Recomendado |
| **CodeGurex.com** | Web corporativa · rendimiento · seguridad | En producción | HTML, CSS, JS, Node (build), GitHub Actions | Todo | Este repo, commit `928af53` | Recomendado |
| **Laboratorio de seguridad (3 herramientas)** | Ciberseguridad · Python | Publicado (educativo) | Python estándar, `cryptography` (Fernet, PBKDF2), `socket`, `concurrent.futures` | Todo | `gurexdev/Gestor-Contrase-as`, `Detector-Phishing`, `Esc-ner-Puertos` | Recomendado (con fragmentos reales de código) |
| **Gurex Blue Sentinel** | Seguridad defensiva · análisis de logs | Privado, demo bajo pedido | Python, salida JSON, pruebas unitarias (según propietario) | Todo | Descrito en portafolio y README de perfil; repo **no accesible** | Productos (estado declarado por el propietario) |
| **CodeGurex Finance** | Producto interno · finanzas de agencia | Funcional (uso interno) | Next.js 16, TS, Tailwind 4, Supabase Auth, Prisma 7, Postgres, Recharts, PWA | Todo | Repo `gurexdev/codegurex-finance` revisado (15 commits) | Productos (interno) |
| **AlertManta** | Plataforma de información local | Publicado (según propietario) | Next.js, mapas (según CV) | Desarrollo | CV y portafolio; sin repo ni captura | Índice de proyectos (sin caso detallado) |
| **CodeGurex AI Office** | IA | **No encontrado** | — | — | Ninguna | Excluido hasta tener evidencia |
| **JOREX VOID** | Gaming / eventos | **No encontrado** | — | — | Ninguna | Excluido hasta tener evidencia |
| **Corevo** | Nutrición deportiva | No verificado | — | — | Solo captura; muestra "+12.000 atletas activos" sin respaldo | Excluido (cifra no verificable) |
| MediDocs Pro, setdj, codegurex-path, DeLight, tahor-clean | — | — | — | — | — | **Excluidos por instrucción** |
| `-linux-practice` | Práctica | Vacío (solo README) | — | — | — | Interno |

**Separación:** trabajo para clientes (Adulam, CRM comercial), productos propios (BARBUS, CostFlow, Sentinel, Finance), plataforma en desarrollo (PREZ — propiedad por confirmar), laboratorio/experimental (herramientas Python, PsicoQuiz).

## 4. Selección recomendada de portafolio

Casos detallados, elegidos para cubrir capacidades distintas:
1. **PREZ** — arquitectura, autenticación, RLS, pruebas, Cloudflare.
2. **BARBUS** — SaaS en producción para un vertical concreto.
3. **CRM comercial** — software de negocio, analítica, importación de datos.
4. **CostFlow** — SaaS para pequeños negocios.
5. **Consultorio Adulam** — relación de cliente sostenida en el sector salud.
6. **PsicoQuiz** — producto interactivo y lógica de aplicación.
7. **CodeGurex.com** — rendimiento, entrega segura e identidad.
8. **Laboratorio de seguridad** — ingeniería de seguridad con código real.

## 5. Información faltante (necesaria del propietario)

1. Capturas reales del interior de **BARBUS**, **CostFlow** y **PREZ** (paneles, no landing).
2. Confirmar propiedad de **PREZ** (¿producto propio o desarrollo para un cliente?) y si puede mostrarse públicamente.
3. Repositorio o evidencia de **CodeGurex AI Office**, **JOREX VOID** y del estado real de **Sentinel** (descubrimiento web declarado como "base disponible" en el sitio anterior; no se encontró código).
4. Autorización explícita de **Tahor Clean** y **Adulam** para mostrarse como clientes.
5. Cuenta pública correcta: el sitio enlaza `github.com/codegurex` y `linkedin.com/in/codegurex`; los repos viven en `github.com/gurexdev` y el CV usa `linkedin.com/in/gurexdev`.
6. Confirmar si `codegurex.com` pasa por Cloudflare (para que las cabeceras de seguridad apliquen).
7. Redes sociales, identidad visual y alcance exacto del trabajo con Adulam (no verificables desde aquí).

## 6. Evaluación técnica

- Sitio estático, sin backend: superficie de ataque mínima. **Se mantiene.**
- Nuevo generador sin dependencias (`src/` → `dist/`): contenido bilingüe en datos, plantillas en módulos, validación sobre la salida.
- URLs antiguas: se generan páginas de redirección con `canonical` y `noindex` para no perder enlaces.
- CSP por `<meta>` en cada página (defensa en profundidad en GitHub Pages) + `_headers` para una capa de borde compatible.

## 7. Arquitectura del sitio

```
/ (ES)                         /en/ (EN)
├─ soluciones/                 ├─ solutions/
├─ servicios/                  ├─ services/
│  ├─ desarrollo-web/          │  ├─ web-development/
│  ├─ aplicaciones-web/        │  ├─ web-applications/
│  ├─ saas/                    │  ├─ saas-development/
│  ├─ sistemas-de-gestion/     │  ├─ business-systems/
│  ├─ apis-integraciones/      │  ├─ apis-integrations/
│  ├─ ia-automatizacion/       │  ├─ ai-automation/
│  ├─ seguridad-aplicaciones/  │  ├─ application-security/
│  ├─ seguridad-apis/          │  ├─ api-security/
│  ├─ seguridad-ia/            │  ├─ ai-security/
│  └─ seguridad-nube/          │  └─ cloud-security/
├─ trabajo/ (+8 casos)         ├─ work/ (+8 case studies)
├─ productos/                  ├─ products/
│  └─ sentinel/                │  └─ sentinel/
├─ tecnologia/                 ├─ technology/
├─ nosotros/                   ├─ about/
├─ contacto/                   ├─ contact/
└─ privacidad/                 └─ privacy/
```

## 8. Posicionamiento

**CODEGUREX — Technology. Software. Security.**
"Engineering digital solutions for a connected world."

Tres capacidades: **Construir** (ingeniería de software), **Integrar** (IA, APIs y automatización), **Proteger** (ciberseguridad). Cuarta área: **Productos e innovación**. "Security for the AI Era" queda como identidad de la división de seguridad y de Sentinel.

Tono: empresa de ingeniería independiente, concreta y verificable. No se declaran equipo, oficinas, certificaciones ni clientes internacionales.

## 9. Hoja de ruta

| Fase | Estado |
|---|---|
| 1 · Descubrimiento | Completada (este documento) |
| 2 · Estrategia | Completada (secciones 7–8) |
| 3 · Dirección creativa | `docs/DESIGN_SYSTEM.md` |
| 4 · Contenido ES/EN | `src/content/` |
| 5 · Implementación | `src/`, `build.mjs` |
| 6 · QA | `docs/TESTING.md` |
| 7 · Seguridad | `docs/SECURITY.md` |
| 8 · Despliegue | `docs/DEPLOYMENT.md` — sin publicar en producción hasta fusionar a `main` |
| Siguiente | Capturas internas reales, autorización de clientes, evidencia de IA |
