// Hero drawing: an exploded axonometric section of a digital system.
// Three plates (interface, services/AI, data/infrastructure) inside a dashed security
// perimeter. Each part maps to one company capability: Build, Integrate, Secure.
import { t } from "./base.mjs";

const A = 170; // half width of a plate
const B = 98; // half height (A * tan 30°)
const T = 9; // plate thickness
const CX = 250;
const INK = "#0a1120";
const BLUE = "#2350f5";

const n = (v) => +v.toFixed(1);
const pts = (list) => list.map(([x, y]) => `${n(x)},${n(y)}`).join(" ");

function plate(cy, inner) {
  const top = [
    [CX, cy - B],
    [CX + A, cy],
    [CX, cy + B],
    [CX - A, cy],
  ];
  const left = [
    [CX - A, cy],
    [CX, cy + B],
    [CX, cy + B + T],
    [CX - A, cy + T],
  ];
  const right = [
    [CX, cy + B],
    [CX + A, cy],
    [CX + A, cy + T],
    [CX, cy + B + T],
  ];
  // Plane coordinates u,v ∈ [-100, 100] projected onto the plate's top face.
  const k = A / (200 * 0.866);
  const m = `matrix(${n(0.866 * k * 1000) / 1000} ${n(0.5 * k * 1000) / 1000} ${-n(0.866 * k * 1000) / 1000} ${n(0.5 * k * 1000) / 1000} ${CX} ${cy})`;
  return `<polygon points="${pts(left)}" fill="#e7eaf1" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="${pts(right)}" fill="#d9dee8" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="${pts(top)}" fill="#ffffff" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>
<g transform="${m}" fill="none" stroke="${INK}" stroke-width="1" vector-effect="non-scaling-stroke">${inner}</g>`;
}

const ns = 'vector-effect="non-scaling-stroke"';

const interfaceLayer = `
<rect x="-80" y="-80" width="160" height="160" ${ns}/>
<line x1="-80" y1="-62" x2="80" y2="-62" ${ns}/>
<rect x="-80" y="-62" width="34" height="142" fill="#eef1f7" ${ns}/>
<rect x="-38" y="-52" width="34" height="24" ${ns}/>
<rect x="2" y="-52" width="34" height="24" ${ns}/>
<rect x="42" y="-52" width="32" height="24" fill="${BLUE}" stroke="${BLUE}" ${ns}/>
<polyline points="-36,40 -16,18 4,28 24,2 44,12 72,-14" stroke="${BLUE}" stroke-width="1.6" ${ns}/>
<line x1="-38" y1="56" x2="74" y2="56" ${ns}/>
<line x1="-38" y1="68" x2="40" y2="68" ${ns}/>
<line x1="-72" y1="-48" x2="-54" y2="-48" ${ns}/>
<line x1="-72" y1="-36" x2="-54" y2="-36" ${ns}/>
<line x1="-72" y1="-24" x2="-54" y2="-24" ${ns}/>`;

const servicesLayer = `
<line x1="0" y1="8" x2="-56" y2="-48" ${ns}/>
<line x1="0" y1="8" x2="54" y2="-52" ${ns}/>
<line x1="0" y1="8" x2="-52" y2="58" ${ns}/>
<line x1="0" y1="8" x2="58" y2="52" ${ns}/>
<line x1="-56" y1="-48" x2="54" y2="-52" stroke-dasharray="4 4" ${ns}/>
<circle cx="0" cy="8" r="16" fill="${BLUE}" stroke="${BLUE}" ${ns}/>
<circle cx="0" cy="8" r="24" ${ns}/>
<rect x="-66" y="-58" width="20" height="20" fill="#fff" ${ns}/>
<circle cx="54" cy="-52" r="11" fill="#fff" ${ns}/>
<rect x="-62" y="48" width="20" height="20" fill="#fff" ${ns}/>
<circle cx="58" cy="52" r="11" fill="#fff" ${ns}/>`;

function dataLayer() {
  let cells = "";
  const filled = new Set(["0-1", "1-3", "2-0", "3-2", "2-2"]);
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      const x = -70 + i * 36;
      const y = -70 + j * 36;
      const on = filled.has(`${i}-${j}`);
      cells += `<rect x="${x}" y="${y}" width="28" height="28"${on ? ` fill="${INK}"` : ' fill="#fff"'} ${ns}/>`;
    }
  return cells;
}

function callout(num, anchor, y, title, lines) {
  const [ax, ay] = anchor;
  return `<circle cx="${ax}" cy="${ay}" r="3.5" fill="${BLUE}"/>
<polyline points="${ax},${ay} ${ax + 18},${y} 470,${y}" fill="none" stroke="${BLUE}" stroke-width="1"/>
<circle cx="482" cy="${y}" r="10" fill="${BLUE}"/>
<text class="callout-num" x="482" y="${y + 3.5}" text-anchor="middle">${num}</text>
<text class="callout-title" x="500" y="${y + 6}">${title}</text>
${lines.map((line, i) => `<text class="callout-text" x="472" y="${y + 30 + i * 16}">${line}</text>`).join("")}`;
}

export function heroDrawing(lang) {
  const L = (es, en) => (lang === "es" ? es : en);
  const label = L(
    "Dibujo técnico: sección axonométrica de un sistema digital en tres capas — interfaz, servicios con IA y datos — dentro de un perímetro de seguridad.",
    "Technical drawing: axonometric section of a digital system in three layers — interface, AI-enabled services and data — inside a security perimeter.",
  );
  const hull = pts([
    [CX, 20],
    [454, 138],
    [454, 400],
    [CX, 514],
    [46, 400],
    [46, 138],
  ]);
  return `<figure class="drawing" data-drawing>
  <div class="drawing-bar mono"><span>FIG. 01 — ${L("Sección del sistema", "System section")}</span><span>${L("Escala", "Scale")} 1:1</span></div>
  <svg viewBox="0 0 668 540" role="img" aria-labelledby="fig-title">
    <title id="fig-title">${label}</title>
    <g class="layer layer-secure">
      <polygon class="hull" points="${hull}" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="7 6"/>
      <rect x="448" y="263" width="12" height="12" fill="${BLUE}"/>
      <rect x="40" y="263" width="12" height="12" fill="#fff" stroke="${INK}"/>
    </g>
    <g class="dims" stroke="${INK}" stroke-width="0.8">
      <line x1="18" y1="52" x2="18" y2="481"/>
      <line x1="12" y1="52" x2="24" y2="52"/>
      <line x1="12" y1="481" x2="24" y2="481"/>
      <line x1="12" y1="160" x2="24" y2="160"/>
      <line x1="12" y1="272" x2="24" y2="272"/>
      <line x1="80" y1="160" x2="80" y2="374" stroke-dasharray="2 4"/>
      <line x1="420" y1="160" x2="420" y2="374" stroke-dasharray="2 4"/>
    </g>
    <text class="dim" x="0" y="0" transform="translate(12 300) rotate(-90)" text-anchor="middle">${L("SECCIÓN A–A · 3 CAPAS", "SECTION A–A · 3 LAYERS")}</text>
    <g class="layer layer-integrate layer-data">${plate(374, dataLayer())}</g>
    <g class="layer layer-integrate">${plate(262, servicesLayer)}</g>
    <g class="layer layer-build">${plate(150, interfaceLayer)}</g>
    <g class="layer layer-build">${callout("01", [318, 132], 92, L("Construir", "Build"), [L("Interfaz y aplicación", "Interface & application"), "Web · Apps · SaaS"])}</g>
    <g class="layer layer-integrate">${callout("02", [340, 292], 232, L("Integrar", "Integrate"), [L("APIs, datos e IA", "APIs, data & AI"), L("Automatización", "Automation")])}</g>
    <g class="layer layer-secure">${callout("03", [430, 412], 412, L("Proteger", "Secure"), [L("Perímetro y controles", "Perimeter & controls"), L("AppSec · API · IA · Nube", "AppSec · API · AI · Cloud")])}</g>
  </svg>
  <div class="drawing-foot" role="group" aria-label="${L("Resaltar una capa del dibujo", "Highlight a layer of the drawing")}">
    <button type="button" aria-pressed="false" data-layer="build"><span class="mono">01 · A</span><strong>${L("Construir", "Build")}</strong></button>
    <button type="button" aria-pressed="false" data-layer="integrate"><span class="mono">02 · B</span><strong>${L("Integrar", "Integrate")}</strong></button>
    <button type="button" aria-pressed="false" data-layer="secure"><span class="mono">03 · C</span><strong>${L("Proteger", "Secure")}</strong></button>
  </div>
</figure>`;
}

// Small schematic used as thumbnail when a project has no public screenshot.
export function schematic(kind = "stack") {
  if (kind === "lab")
    return `<svg viewBox="0 0 200 140" aria-hidden="true"><rect x="10" y="10" width="180" height="120" fill="${INK}"/><g font-family="monospace" font-size="9" fill="#93a6ff"><text x="22" y="34">$ python gestor.py</text><text x="22" y="52" fill="#dfe5f3">PBKDF2-HMAC-SHA256</text><text x="22" y="70" fill="#dfe5f3">iterations = 480000</text><text x="22" y="88" fill="#dfe5f3">Fernet · AES-128-CBC</text><text x="22" y="106">$ _</text></g></svg>`;
  return `<svg viewBox="0 0 200 140" aria-hidden="true" fill="none" stroke="${INK}" stroke-width="1.2"><rect x="30" y="14" width="140" height="28" fill="#fff"/><rect x="30" y="56" width="140" height="28" fill="#fff"/><rect x="30" y="98" width="140" height="28" fill="${BLUE}" stroke="${BLUE}"/><line x1="100" y1="42" x2="100" y2="56"/><line x1="100" y1="84" x2="100" y2="98"/><line x1="44" y1="28" x2="90" y2="28"/><line x1="44" y1="70" x2="120" y2="70"/><circle cx="150" cy="28" r="5"/><circle cx="150" cy="70" r="5"/></svg>`;
}

export { t };
