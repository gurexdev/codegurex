# CodeGurex.com — Informe de pruebas

Fecha de ejecución: 2026-11-10.

## Comandos

```bash
node build.mjs          # genera dist/
node validate.mjs       # validación estática
node scripts/qa.mjs     # navegador real (requiere Playwright)
```

## Resultados

| Prueba | Alcance | Resultado |
|---|---|---|
| Build | 56 páginas (28 ES + 28 EN), 404, 14 redirecciones, sitemap, manifest | ✅ |
| Validación estática (`validate.mjs`) | 57 páginas + 14 redirecciones: enlaces y recursos locales, fragmentos, `noopener`, CSP (sin inline), JSON-LD válido, un `h1`, `lang`, skip link, títulos ≤ 75 y únicos, descripciones únicas, canonical, `og:image`, **hreflang recíproco**, sitemap sin páginas inexistentes, ausencia de imágenes retiradas | ✅ |
| QA visual (`qa.mjs`) | 57 páginas × escritorio (1440 px) y móvil (390 px): sin desbordamiento horizontal, sin errores de consola, sin imágenes rotas | ✅ |
| Comportamiento (`qa.mjs`) | Menú móvil (abre / cierra con Esc), filtros de trabajo (incluye estado vacío honesto en IA), formulario: preselección por URL, errores, rechazo de credenciales, mensaje de WhatsApp correcto | ✅ |
| Accesibilidad (axe-core 4.10, WCAG 2 A/AA + buenas prácticas) | 56 páginas | ✅ 0 violaciones (tras corregir contraste de estados y jerarquía de encabezados) |
| CSP | Inyección de script inline bloqueada por la política | ✅ |

## Rendimiento

- Sin frameworks en el cliente: `site.css` ≈ 40 KB, `site.js` ≈ 11 KB sin comprimir.
- Fuentes autoalojadas: Archivo (90 KB, variable) con `preload` y `font-display: swap`; JetBrains Mono (40 KB).
- Capturas en WebP en dos tamaños (900 / 1600 px) con `srcset`, `loading="lazy"` y dimensiones declaradas. Total de imágenes de proyecto: ≈ 390 KB.
- No se pudo ejecutar Lighthouse contra el dominio en vivo desde este entorno (red restringida).
