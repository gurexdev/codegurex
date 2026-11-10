# CodeGurex.com — Despliegue

## Arquitectura

```
src/content/*.mjs   contenido ES/EN (servicios, casos, rutas, textos)
src/templates/*.mjs plantillas (layout, home, servicios, trabajo, empresa, contacto)
src/assets/         CSS, JS, fuentes, imágenes, OG
build.mjs           genera dist/  (sin dependencias)
validate.mjs        valida dist/
scripts/qa.mjs      QA en navegador (Playwright)
scripts/og.mjs      regenera las imágenes Open Graph
```

## Flujo

1. Push a `main` → GitHub Actions (`.github/workflows/pages.yml`): `node build.mjs` → `node validate.mjs` → publica `dist/` en GitHub Pages.
2. Si la validación falla, **no se despliega**.
3. Las ramas de trabajo (como `claude/*`) no despliegan.

## Antes de fusionar a `main`

- [ ] Revisar el sitio en local: `node build.mjs && npx http-server dist` (o cualquier servidor estático).
- [ ] Confirmar los puntos de `docs/AUDIT.md §5` (autorizaciones de clientes, propiedad de PREZ, estado de Sentinel, cuentas de GitHub/LinkedIn).
- [ ] Confirmar que Cloudflare aplica las cabeceras de `dist/_headers`.

## Rollback

El sitio anterior queda íntegro en el historial:

- Último commit del sitio anterior: **`8337c02`** ("Remove WhatsApp badge from README").
- Reversión rápida: `git revert <commit de fusión>` en `main` y push; Actions vuelve a publicar la versión anterior.
- Alternativa: ejecutar el workflow manualmente (`workflow_dispatch`) desde un branch creado en `8337c02`.

## URLs anteriores

Las 14 URLs `.html` del sitio anterior generan páginas con `meta refresh`, `canonical` y `noindex` hacia su nueva ubicación (`LEGACY` en `src/content/site.mjs`), para no perder enlaces ni posicionamiento.

## Añadir contenido

- **Nuevo caso:** añadir un objeto a `WORK` en `src/content/work.mjs` (ambos idiomas) y sus capturas en `src/assets/img/work/<id>-900.webp` y `-1600.webp`.
- **Nuevo servicio:** añadir a `SERVICES` en `src/content/services.mjs`.
- El sitemap, la navegación del pie, los filtros y el hreflang se generan solos.
