# CodeGurex — Sistema de diseño

## Concepto: "lámina de ingeniería"

CodeGurex construye y protege sistemas. El lenguaje visual toma prestado el de un **plano técnico**: hojas numeradas, bloques de título, cotas, leyendas y diagramas originales. Cada decisión responde a una razón:

| Decisión | Razón |
|---|---|
| Reglas (líneas) en lugar de tarjetas con sombra | Evita el aspecto de plantilla; ordena la información como una especificación. |
| Numeración de hojas (`01`, `A`, `PL-01`, `FIG. 01`) | Comunica método y trazabilidad, la promesa central de la marca. |
| Bloque de título (tabla tipo CAD) en cada cabecera | Datos verificables (estado, año, evidencia) visibles antes que cualquier adjetivo. |
| Diagramas dibujados, no ilustraciones | Cuando no hay capturas (PREZ, Sentinel), se muestra la arquitectura real en vez de imágenes de archivo. |
| Un solo color de acento | El azul de la marca original; todo lo demás es tinta, papel y gris. |
| Estados con forma, no solo color | Disponible ● / En desarrollo ◐ / Planificado ◌: legibles para personas con daltonismo. |

## Tokens

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#0a1120` | Texto, bordes estructurales, secciones oscuras |
| `--ink-2` / `--ink-3` | `#172034` / `#2a3550` | Superficies y reglas sobre fondo oscuro |
| `--paper` | `#f4f5f7` | Fondo general (gris frío) |
| `--white` | `#ffffff` | Superficies de figuras y formularios |
| `--rule` / `--rule-strong` | `#d4d8e0` / `#a9b0bd` | Reglas finas / bordes de controles |
| `--muted` | `#586174` | Texto secundario (contraste AA sobre papel) |
| `--blue` | `#2350f5` | Acento de marca, enlaces, foco |
| `--peri` | `#93a6ff` | Acento sobre fondo oscuro (periwinkle) |
| `--live` / `--dev` / `--plan` | `#08704c` / `#8a5000` / `#6d7487` | Estados (contraste AA verificado con axe) |

## Tipografía

- **Archivo** (variable, ejes `wght` 100–900 y `wdth` 62–125 %). Títulos en ancho expandido (112–120 %) para una voz industrial y reconocible; cuerpo al 100 %.
- **JetBrains Mono** para metadatos técnicos: etiquetas de hoja, estados, cotas.
- Ambas autoalojadas en `src/assets/fonts/` (licencia SIL OFL incluida). Sin Google Fonts: lo exige la CSP y evita enviar IPs a terceros.

Escala fluida con `clamp()`: display, h1, h2, h3, lead, body (17 px), small, mono (12 px).

## Componentes

| Componente | Clase | Dónde |
|---|---|---|
| Etiqueta de hoja | `.sheet-label` | Encabezado de cada sección |
| Bloque de título | `.title-block` | Cabecera de páginas internas y casos |
| Dibujo del hero | `.drawing` (`src/templates/drawing.mjs`) | Home — sección axonométrica interactiva |
| Matriz de capacidades | `.matrix` | Home — Construir / Integrar / Proteger |
| Lámina de proyecto | `.plate` | Home — trabajo destacado |
| Diagrama de arquitectura | `.flow` | Casos, Home (sin capturas) |
| Proceso | `.process` | Home, servicios, contacto |
| Índice | `.index` | Servicios, productos, evidencia |
| Bloque dividido | `.split` | Prosa de servicios y casos |
| Estado | `.status.live/.dev/.plan` | Todo el sitio |
| Banda de CTA | `.cta-band` | Final de casi todas las páginas (dos vías) |
| Botones | `.btn`, `.btn-blue`, `.btn-line`, `.btn-small` | — |

## Marca

El símbolo original (una "C" de triángulos dentro de un hexágono) se redibujó como geometría (`MARK_PATH` en `src/templates/base.mjs`) para que sea nítido a cualquier tamaño. El wordmark pasa de "CodeGurex Security" a **CODEGUREX** (Code en tinta, Gurex en azul), porque la marca ahora cubre tres capacidades. "Security for the AI Era" se conserva como identidad de la división de seguridad y de Sentinel.

## Lo que se evita a propósito

Glassmorphism, degradados decorativos, robots, capuchas, código verde neón, estadísticas ilustrativas que parecen reales, muros de logotipos y animaciones sin función. La única animación es la transición de opacidad al resaltar una capa del dibujo, desactivada con `prefers-reduced-motion`.
