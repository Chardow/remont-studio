// Двустаен апартамент, изглед отгоре. Всеки слой има „старо“ и „ново“ състояние.
// Състоянието се управлява с класове на корена: .n-<слой> показва новото.
// Подът има три варианта (.f-ribena, .f-laminat, .f-granit), цветовете идват от CSS променливи.

export const LAYERS = ['izkartvane', 'instalatsii', 'dograma', 'zamazki', 'steni', 'nastilki', 'banya', 'darvodelski', 'osvetlenie', 'obzavezhdane', 'pochistvane'];

const W = 640, H = 440;

function defs(p) {
  return `<defs>
  <pattern id="${p}-oldwood" width="40" height="14" patternUnits="userSpaceOnUse">
    <rect width="40" height="14" fill="#8C6B4F"/><path d="M0 13.5h40M18 0v14" stroke="#6E513A" stroke-width="1.2"/>
    <path d="M4 5h9M24 9h11" stroke="#9E7C5E" stroke-width="1"/>
  </pattern>
  <pattern id="${p}-ribena" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="28" height="28" fill="#D8B48A"/><rect width="14" height="28" fill="#CFA77B"/>
    <path d="M0 0v28M14 0v28M0 7h14M14 21h14M0 21h14M14 7h14" stroke="#B88F62" stroke-width=".8"/>
  </pattern>
  <pattern id="${p}-laminat" width="90" height="16" patternUnits="userSpaceOnUse">
    <rect width="90" height="16" fill="#E2CBA8"/><path d="M0 15.5h90M60 0v16" stroke="#C8AE88" stroke-width="1"/>
    <path d="M8 6h20M68 10h14" stroke="#D6BD98" stroke-width="1"/>
  </pattern>
  <pattern id="${p}-granit" width="44" height="44" patternUnits="userSpaceOnUse">
    <rect width="44" height="44" fill="#D9DCDF"/><path d="M0 43.5h44M43.5 0v44" stroke="#BCC2C8" stroke-width="1"/>
  </pattern>
  <pattern id="${p}-oldtile" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect width="16" height="16" fill="#C9C1A8"/><path d="M0 15.5h16M15.5 0v16" stroke="#A89F86" stroke-width="1"/>
  </pattern>
  <pattern id="${p}-newtile" width="30" height="30" patternUnits="userSpaceOnUse">
    <rect width="30" height="30" fill="#EEF1F3"/><path d="M0 29.6h30M29.6 0v30" stroke="#CDD5DB" stroke-width=".8"/>
  </pattern>
  <pattern id="${p}-brick" width="24" height="12" patternUnits="userSpaceOnUse">
    <rect width="24" height="12" fill="#B5654A"/><path d="M0 5.5h24M0 11.5h24M6 0v6M18 6v6" stroke="#8E4A35" stroke-width="1"/>
  </pattern>
  <radialGradient id="${p}-glow"><stop offset="0" stop-color="#FFF4C8" stop-opacity=".95"/><stop offset="1" stop-color="#FFF4C8" stop-opacity="0"/></radialGradient>
</defs>`;
}

// Стаи: хол+кухня, спалня, баня, коридор
const R = {
  hol: [32, 32, 342, 376],
  spalnya: [386, 32, 222, 212],
  banya: [506, 256, 102, 152],
  koridor: [386, 256, 108, 152],
};

function floors(p) {
  const rooms = ['hol', 'spalnya', 'koridor'];
  const rect = (r, fill) => `<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" fill="${fill}"/>`;
  return `
  <g class="lay-nastilki-old">${rooms.map(k => rect(R[k], `url(#${p}-oldwood)`)).join('')}</g>
  <g class="lay-nastilki-new">
    <g class="fl-ribena">${rooms.map(k => rect(R[k], `url(#${p}-ribena)`)).join('')}</g>
    <g class="fl-laminat">${rooms.map(k => rect(R[k], `url(#${p}-laminat)`)).join('')}</g>
    <g class="fl-granit">${rooms.map(k => rect(R[k], `url(#${p}-granit)`)).join('')}</g>
  </g>
  <g class="lay-banya-old">${rect(R.banya, `url(#${p}-oldtile)`)}</g>
  <g class="lay-banya-new">${rect(R.banya, `url(#${p}-newtile)`)}</g>`;
}

function cracks() {
  return `<g class="lay-zamazki-old" fill="none" stroke="#4E3826" stroke-width="1.6" stroke-linecap="round" opacity=".75">
    <path d="M70 300l26 12 10 24 22 6"/><path d="M250 90l-14 22 8 18-10 16"/><path d="M430 170l20 6 8 18"/><path d="M300 360l18-8 22 4"/>
  </g>`;
}

// Ивица боя по периметъра на всяка стая
function wallPaint() {
  const band = (r) => `<rect x="${r[0] + 3}" y="${r[1] + 3}" width="${r[2] - 6}" height="${r[3] - 6}" fill="none" stroke-width="6"/>`;
  const rooms = ['hol', 'spalnya', 'koridor', 'banya'];
  return `<g class="lay-steni-old" stroke="#B9AE97">${rooms.map(k => band(R[k])).join('')}
    <g fill="#9A8C70" opacity=".55"><ellipse cx="60" cy="60" rx="18" ry="10"/><ellipse cx="580" cy="200" rx="12" ry="16"/><ellipse cx="350" cy="380" rx="16" ry="9"/></g></g>
  <g class="lay-steni-new" stroke="var(--plan-wall, #F4F2EE)">${rooms.map(k => band(R[k])).join('')}</g>`;
}

function structure(p) {
  // Външни и вътрешни стени; вратите са отвори
  const wall = 'var(--plan-struct, #2B3A5E)';
  return `<g fill="${wall}">
    <rect x="20" y="20" width="600" height="12"/>
    <rect x="20" y="408" width="390" height="12"/><rect x="460" y="408" width="160" height="12"/>
    <rect x="20" y="20" width="12" height="400"/><rect x="608" y="20" width="12" height="400"/>
    <rect x="374" y="20" width="12" height="290"/><rect x="374" y="360" width="12" height="60"/>
    <rect x="374" y="244" width="46" height="12"/><rect x="470" y="244" width="150" height="12"/>
    <rect x="494" y="244" width="12" height="86"/><rect x="494" y="375" width="12" height="45"/>
  </g>
  <g fill="none" stroke="${wall}" stroke-width="1.5" opacity=".55">
    <path d="M386 310a50 50 0 0 1 50 50"/><path d="M420 256a50 50 0 0 0 50 0"/><path d="M506 330a45 45 0 0 1 0 45"/><path d="M410 420a50 50 0 0 0 50 0"/>
  </g>`;
}

function windows() {
  const spots = [[90, 20, 100, 12], [240, 20, 90, 12], [440, 20, 120, 12], [20, 150, 12, 110]];
  const old = spots.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#7A5134"/>` +
    (w > h ? `<path d="M${x} ${y + 6}h${w}" stroke="#C9B48F" stroke-width="2"/>` : `<path d="M${x + 6} ${y}v${h}" stroke="#C9B48F" stroke-width="2"/>`)).join('');
  const nw = spots.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#FFFFFF"/>` +
    (w > h ? `<rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="4" fill="#9ED3EC"/>` : `<rect x="${x + 4}" y="${y + 4}" width="4" height="${h - 8}" fill="#9ED3EC"/>`)).join('');
  return `<g class="lay-dograma-old">${old}</g><g class="lay-dograma-new">${nw}</g>`;
}

function installations() {
  return `<g class="lay-instalatsii-old" fill="none" stroke="#D2452F" stroke-width="2" stroke-linecap="round">
    <path d="M40 120c14-10 6 14 20 6s4 16 18 8"/><path d="M300 40c-6 14 10 8 4 22s12 6 6 20"/><path d="M398 60c12 4 2 14 14 18"/>
    <path d="M520 268c-8 10 6 10 0 20" stroke="#3A7BBF"/><path d="M560 268c-8 10 6 10 0 20" stroke="#3A7BBF"/>
  </g>
  <g class="lay-instalatsii-new" fill="#2B3A5E">
    <rect x="34" y="330" width="6" height="10" rx="1.5"/><rect x="34" y="200" width="6" height="10" rx="1.5"/><rect x="200" y="34" width="10" height="6" rx="1.5"/>
    <rect x="388" y="120" width="6" height="10" rx="1.5"/><rect x="600" y="120" width="6" height="10" rx="1.5"/><rect x="496" y="290" width="6" height="10" rx="1.5"/>
    <rect x="388" y="290" width="6" height="10" rx="1.5"/>
  </g>`;
}

function bathroom() {
  return `<g class="lay-banya-old">
    <rect x="512" y="262" width="90" height="44" rx="14" fill="#F0E6CF" stroke="#B9A983" stroke-width="2"/>
    <ellipse cx="530" cy="284" rx="4" ry="4" fill="#A0937A"/>
    <rect x="512" y="350" width="26" height="34" rx="10" fill="#EFE7D4" stroke="#B9A983" stroke-width="2"/>
    <rect x="566" y="374" width="36" height="28" rx="6" fill="#EFE7D4" stroke="#B9A983" stroke-width="2"/>
  </g>
  <g class="lay-banya-new">
    <rect x="512" y="262" width="90" height="70" fill="#E3EEF4" stroke="#9FB7C6" stroke-width="1.5"/>
    <path d="M512 332h90" stroke="#7DB9D9" stroke-width="3"/><circle cx="586" cy="278" r="7" fill="none" stroke="#2B3A5E" stroke-width="2"/>
    <path d="M520 300h70" stroke="#9FB7C6" stroke-width="1.5" stroke-dasharray="3 3"/>
    <rect x="512" y="352" width="22" height="30" rx="9" fill="#FFFFFF" stroke="#2B3A5E" stroke-width="1.6"/>
    <rect x="560" y="370" width="42" height="32" rx="4" fill="#C8A47E"/><ellipse cx="581" cy="386" rx="13" ry="9" fill="#FFFFFF" stroke="#2B3A5E" stroke-width="1.4"/>
  </g>`;
}

function kitchenLayer() {
  // Кухня по долната стена на хола, гардероб в спалнята
  return `<g class="lay-darvodelski-old">
    <rect x="32" y="372" width="170" height="36" fill="#6B4A33"/><path d="M75 372v36M118 372v36M160 372v36" stroke="#4E3524" stroke-width="2"/>
    <rect x="132" y="378" width="22" height="22" rx="2" fill="#B9B4A8"/>
    <rect x="566" y="40" width="36" height="96" fill="#5E3F2B"/><path d="M584 40v96" stroke="#3F2A1D" stroke-width="2"/>
  </g>
  <g class="lay-darvodelski-new">
    <rect x="32" y="368" width="210" height="40" fill="var(--plan-kitchen, #A9B5A0)"/>
    <path d="M32 372h210" stroke="#FFFFFF" stroke-opacity=".7" stroke-width="3"/>
    <rect x="70" y="378" width="30" height="22" rx="4" fill="#E8ECEF" stroke="#2B3A5E" stroke-width="1.2"/>
    <circle cx="160" cy="386" r="7" fill="none" stroke="#2B3A5E" stroke-width="1.6"/><circle cx="182" cy="386" r="7" fill="none" stroke="#2B3A5E" stroke-width="1.6"/>
    <circle cx="160" cy="400" r="5" fill="none" stroke="#2B3A5E" stroke-width="1.4"/><circle cx="182" cy="400" r="5" fill="none" stroke="#2B3A5E" stroke-width="1.4"/>
    <rect x="560" y="40" width="42" height="120" fill="var(--plan-kitchen, #A9B5A0)"/><path d="M581 40v120" stroke="#FFFFFF" stroke-opacity=".7" stroke-width="2"/>
  </g>`;
}

function furniture() {
  const ink = '#2B3A5E';
  return `<g class="lay-izkartvane-old">
    <rect x="60" y="80" width="120" height="44" rx="6" fill="#7D5A43"/><rect x="60" y="80" width="120" height="12" rx="4" fill="#694A36"/>
    <rect x="230" y="200" width="70" height="60" fill="#8E6E52"/>
    <rect x="410" y="70" width="110" height="130" rx="6" fill="#9C8366"/><rect x="410" y="70" width="110" height="26" fill="#7D684F"/>
    <g fill="#6F6F6F"><circle cx="300" cy="320" r="5"/><circle cx="315" cy="330" r="3"/><circle cx="290" cy="336" r="4"/><rect x="250" y="320" width="28" height="18" rx="3" fill="#A65E3E"/></g>
  </g>
  <g class="lay-obzavezhdane-new">
    <rect x="70" y="250" width="150" height="60" rx="16" fill="#2F6E7A"/><rect x="70" y="250" width="150" height="16" rx="8" fill="#285D67"/>
    <rect x="96" y="268" width="26" height="18" rx="6" fill="#F2B544"/>
    <rect x="80" y="170" width="130" height="60" rx="10" fill="#E9E1D3" opacity=".9"/>
    <rect x="120" y="186" width="50" height="28" rx="6" fill="#C8A47E"/>
    <circle cx="300" cy="110" r="36" fill="#C8A47E"/>
    <g fill="${ink}"><rect x="290" y="62" width="20" height="10" rx="4"/><rect x="290" y="148" width="20" height="10" rx="4"/><rect x="252" y="100" width="10" height="20" rx="4"/><rect x="338" y="100" width="10" height="20" rx="4"/></g>
    <rect x="420" y="60" width="110" height="120" rx="8" fill="#FFFFFF" stroke="#CDD5DB"/>
    <rect x="420" y="60" width="110" height="30" rx="8" fill="#DCE6EE"/><rect x="430" y="66" width="40" height="18" rx="6" fill="#FFFFFF"/><rect x="480" y="66" width="40" height="18" rx="6" fill="#FFFFFF"/>
    <rect x="420" y="120" width="110" height="60" rx="4" fill="#24345C"/>
    <circle cx="300" cy="300" r="14" fill="#5E9E6E"/><circle cx="350" cy="60" r="10" fill="#5E9E6E"/>
  </g>`;
}

function lights() {
  const spots = [[150, 200], [300, 110], [470, 140], [440, 330], [556, 300]];
  return `<g class="lay-osvetlenie-old" fill="#FFE9A3" stroke="#6B5A2E" stroke-width="1">${spots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5"/>`).join('')}</g>
  <g class="lay-osvetlenie-new">${spots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="46" fill="url(#__P__-glow)"/><circle cx="${x}" cy="${y}" r="5" fill="#FFFFFF" stroke="#2B3A5E" stroke-width="1.2"/>`).join('')}</g>`;
}

function dust() {
  const pts = [[90, 140], [200, 330], [330, 230], [450, 210], [430, 380], [260, 60], [120, 360], [560, 220]];
  return `<g class="lay-pochistvane-old" fill="#FFFFFF" opacity=".55">${pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${10 + (i % 3) * 5}"/>`).join('')}</g>`;
}

export function plan({ id = 'p', cls = '', label = 'Схема на двустаен апартамент', state = [], floor = 'ribena', wall = '#F4F2EE', kitchen = '#A9B5A0' } = {}) {
  const classes = ['plan', `f-${floor}`, ...state.map(s => `n-${s}`), cls].filter(Boolean).join(' ');
  const body = [
    defs(id), floors(id), cracks(), wallPaint(), kitchenLayer(), bathroom(), furniture(), installations(),
    structure(id), windows(), lights().replaceAll('__P__', id), dust(),
  ].join('\n');
  return `<svg class="${classes}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}" style="--plan-wall:${wall};--plan-kitchen:${kitchen}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

// CSS правила за слоевете (вграждат се в site.css при build)
export function planCss() {
  const rules = LAYERS.map(l => `.plan .lay-${l}-new{display:none}.plan.n-${l} .lay-${l}-new{display:inline}.plan.n-${l} .lay-${l}-old{display:none}`);
  // Старите мебели изчезват при изкъртване; новото обзавеждане излиза само след изкъртване
  rules.push('.plan .fl-ribena,.plan .fl-laminat,.plan .fl-granit{display:none}.plan.f-ribena .fl-ribena,.plan.f-laminat .fl-laminat,.plan.f-granit .fl-granit{display:inline}');
  rules.push('.plan .lay-pochistvane-old{display:none}.plan.n-izkartvane:not(.n-pochistvane) .lay-pochistvane-old{display:inline}');
  rules.push('.plan g{transition:opacity .4s ease}');
  return rules.join('\n');
}
