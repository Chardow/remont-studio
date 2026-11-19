// Собствени SVG илюстрации и икони. Всички са декоративни (aria-hidden),
// освен ако не е подаден label.

const a11y = (label) => label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';

// ---------- Икони (линейни, 24×24) ----------
const IC = {
  phone: '<path d="M5 4h3.2l1.6 4-2 1.3a10.5 10.5 0 0 0 4.9 4.9l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  viber: '<path d="M12 3c5 0 8 2.2 8 7.6 0 5.3-3 7.4-8 7.4-.8 0-1.6 0-2.3-.2L6 20v-3.3C4.6 15.5 4 13.5 4 10.6 4 5.2 7 3 12 3Z"/><path d="M9.5 8.5c.2 2.5 2.3 4.6 4.8 4.9"/><path d="M13 7.2a3 3 0 0 1 2.6 2.6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  hammer: '<path d="M14 4l6 6-2.5 2.5-6-6z"/><path d="M11.5 6.5 4 14l3 3 7.5-7.5"/>',
  plug: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>',
  window: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>',
  level: '<rect x="2.5" y="9" width="19" height="6" rx="1.5"/><circle cx="12" cy="12" r="1.5"/><path d="M7 9v2M17 9v2"/>',
  tiles: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>',
  saw: '<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M5 10h14M12 4v6M9 14h.01M15 14h.01"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
  sofa: '<path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M3 11a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v6H3z"/><path d="M5 17v2M19 17v2"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  team: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M15 20a4.5 4.5 0 0 1 6.5-4"/>',
  euro: '<path d="M17 6.5A7 7 0 1 0 17 17.5"/><path d="M4 10h9M4 14h9"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  home: '<path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
  drop: '<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z"/>',
  building: '<rect x="5" y="3" width="14" height="18"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  roof: '<path d="M3 11 12 5l9 6"/><path d="M5 10v10h14V10"/><path d="M9 20v-5h6v5"/>',
  bath: '<path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M6 12V6a2 2 0 0 1 4 0"/><path d="M7 19l-1 2M17 19l1 2"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8Z"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
};

export function icon(name, { label = '', size = 24, cls = 'ic' } = {}) {
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ${a11y(label)}>${IC[name]}</svg>`;
}

// ---------- Илюстрации на услугите (400×300) ----------
const INK = '#24345C', BLUE = '#4CACD8', SKY = '#E8F4FA', BG = '#F4F6F9';

export function artBanya(label = '') {
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" ${a11y(label)} xmlns="http://www.w3.org/2000/svg">
  <defs><pattern id="tb" width="34" height="34" patternUnits="userSpaceOnUse"><rect width="34" height="34" fill="#EEF1F3"/><path d="M0 33.5h34M33.5 0v34" stroke="#D3DAE0"/></pattern>
  <pattern id="tf" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#D9DCDF"/><path d="M0 39.5h40M39.5 0v40" stroke="#BCC2C8"/></pattern></defs>
  <rect width="400" height="300" fill="${BG}"/>
  <rect x="30" y="20" width="340" height="220" fill="url(#tb)"/><rect x="30" y="240" width="340" height="44" fill="url(#tf)"/>
  <rect x="30" y="236" width="340" height="6" fill="#2F86B5" opacity=".35"/>
  <rect x="44" y="40" width="120" height="196" fill="#DFF0F8" opacity=".7" stroke="#9FC9DE" stroke-width="2"/>
  <path d="M90 60h40v6" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><rect x="118" y="64" width="26" height="6" rx="3" fill="${INK}"/>
  <g stroke="${BLUE}" stroke-width="2" stroke-linecap="round" opacity=".8"><path d="M122 80v18M130 80v26M138 80v14"/></g>
  <rect x="58" y="226" width="92" height="6" rx="3" fill="#7DB9D9"/>
  <rect x="200" y="60" width="74" height="90" rx="37" fill="#FFFFFF" stroke="#C9D3DA" stroke-width="3"/>
  <rect x="190" y="160" width="96" height="40" rx="4" fill="#C8A47E"/><path d="M190 180h96" stroke="#B08E68"/>
  <ellipse cx="238" cy="160" rx="34" ry="8" fill="#FFFFFF" stroke="${INK}" stroke-width="2"/><path d="M238 140v12" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  <rect x="300" y="150" width="50" height="34" rx="6" fill="#FFFFFF" stroke="#C9D3DA" stroke-width="2"/>
  <path d="M300 184h50a0 0 0 0 1 0 0 22 22 0 0 1-22 22h-6a22 22 0 0 1-22-22z" fill="#FFFFFF" stroke="#C9D3DA" stroke-width="2"/>
  <circle cx="335" cy="70" r="12" fill="#5E9E6E"/><rect x="329" y="80" width="12" height="16" rx="2" fill="#FFFFFF" stroke="#C9D3DA"/>
</svg>`;
}

export function artFasada(label = '') {
  const win = (x, y, ins) => `<rect x="${x}" y="${y}" width="26" height="30" fill="${ins ? '#FFFFFF' : '#8B8F96'}"/><rect x="${x + 3}" y="${y + 3}" width="20" height="24" fill="${ins ? '#BFE2F2' : '#5A6B7D'}"/>`;
  let wins = '';
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) wins += win(70 + c * 46, 44 + r * 46, c >= 3);
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" ${a11y(label)} xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="${BG}"/><rect x="0" y="270" width="400" height="30" fill="#DCE3EC"/>
  <rect x="56" y="30" width="144" height="240" fill="#B7B2A7"/><rect x="200" y="30" width="144" height="240" fill="#F6F3EC"/>
  <g stroke="#9C978C" stroke-width="1.5" fill="none"><path d="M80 260l10-30 14-6M150 80l-8 20 6 14"/></g>
  <rect x="198" y="30" width="4" height="240" fill="#F2B544"/>
  <g stroke="#C9C3B6" stroke-width="1"><path d="M200 76h144M200 122h144M200 168h144M200 214h144"/></g>
  ${wins}
  <rect x="50" y="22" width="300" height="10" fill="${INK}"/>
  <g stroke="#C4873C" stroke-width="3"><path d="M352 40v232M372 40v232"/></g>
  <g stroke="#C4873C" stroke-width="2.5"><path d="M344 84h36M344 140h36M344 196h36M344 252h36"/><path d="M352 84l20 56M352 196l20 56" opacity=".6"/></g>
  <rect x="280" y="262" width="30" height="8" fill="${BLUE}"/>
</svg>`;
}

export function artPokriv(label = '') {
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" ${a11y(label)} xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="${SKY}"/>
  <g stroke="${BLUE}" stroke-width="2" stroke-linecap="round" opacity=".7"><path d="M60 30l-8 16M100 20l-8 16M140 34l-8 16M260 22l-8 16M300 36l-8 16M340 18l-8 16"/></g>
  <rect x="20" y="150" width="360" height="150" fill="#DDD8CE"/>
  <g fill="#BFE2F2"><rect x="50" y="200" width="40" height="44"/><rect x="130" y="200" width="40" height="44"/><rect x="230" y="200" width="40" height="44"/><rect x="310" y="200" width="40" height="44"/></g>
  <rect x="20" y="118" width="360" height="32" fill="#9EA4AA"/>
  <rect x="20" y="108" width="360" height="12" fill="#3B3F45"/>
  <path d="M20 108h360" stroke="#2A2D31" stroke-width="2"/>
  <rect x="20" y="84" width="16" height="36" fill="#B7B2A7"/><rect x="364" y="84" width="16" height="36" fill="#B7B2A7"/>
  <path d="M36 108v-24h4v24" fill="#3B3F45"/><path d="M360 108v-24h4v24" fill="#3B3F45"/>
  <rect x="250" y="70" width="30" height="40" fill="#B7B2A7"/><rect x="246" y="66" width="38" height="6" fill="${INK}"/>
  <ellipse cx="160" cy="106" rx="16" ry="4" fill="${INK}"/>
  <path d="M90 98c10-6 30-6 40 0" fill="none" stroke="${BLUE}" stroke-width="3" stroke-linecap="round"/>
  <g transform="translate(300 74)"><rect x="0" y="0" width="54" height="22" rx="11" fill="#FFFFFF"/><path d="M14 11l5 5 10-10" fill="none" stroke="#2E8B57" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>
</svg>`;
}

// ---------- Интериорни сцени за завършените обекти (400×300) ----------
const SCENES = {
  tsentar: { wall: '#EFE7DD', accentWall: '#C46A3A', floor: '#C9A273', sofa: '#2F6E7A', pillow: '#F2B544', extra: 'shelf' },
  briz: { wall: '#F2F0EB', accentWall: '#E4E0D6', floor: '#E3C9A0', sofa: '#556B3E', pillow: '#7A8C5C', extra: 'table' },
  vazrazhdane: { wall: '#EEF1F3', accentWall: '#C9D6E3', floor: '#D9C4A3', sofa: '#3A4A6B', pillow: '#F2B544', extra: 'bed' },
};

export function artRoom(key, label = '') {
  const s = SCENES[key];
  const shelf = `<rect x="250" y="70" width="110" height="150" fill="#C79B6D"/><g fill="#EFE7DD"><rect x="258" y="78" width="44" height="40"/><rect x="308" y="78" width="44" height="40"/><rect x="258" y="124" width="44" height="40"/><rect x="308" y="124" width="44" height="40"/><rect x="258" y="170" width="94" height="42"/></g><circle cx="280" cy="108" r="9" fill="#5E9E6E"/><rect x="316" y="96" width="24" height="22" fill="#24345C"/><rect x="268" y="150" width="20" height="14" fill="#F2B544"/>`;
  const table = `<ellipse cx="300" cy="226" rx="54" ry="12" fill="#C8A47E"/><rect x="296" y="226" width="8" height="40" fill="#8E6E52"/><g fill="#5A5F66"><rect x="236" y="206" width="20" height="56" rx="6"/><rect x="344" y="206" width="20" height="56" rx="6"/></g><path d="M290 70v40" stroke="#24345C" stroke-width="2"/><ellipse cx="290" cy="116" rx="22" ry="10" fill="#F2F0EB" stroke="#24345C" stroke-width="2"/>`;
  const bed = `<rect x="240" y="176" width="130" height="70" rx="8" fill="#FFFFFF" stroke="#C9D3DA" stroke-width="2"/><rect x="240" y="150" width="130" height="34" rx="8" fill="${s.accentWall}"/><rect x="252" y="166" width="40" height="18" rx="6" fill="#FFFFFF"/><rect x="300" y="166" width="40" height="18" rx="6" fill="#FFFFFF"/><rect x="240" y="210" width="130" height="36" rx="4" fill="#24345C" opacity=".9"/><path d="M226 70v120" stroke="#C8A47E" stroke-width="6"/>`;
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" ${a11y(label)} xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="${s.wall}"/>
  <rect x="0" y="0" width="150" height="240" fill="${s.accentWall}"/>
  <rect x="30" y="40" width="80" height="110" rx="4" fill="#FFFFFF"/><rect x="36" y="46" width="68" height="98" fill="#CFE7F3"/><path d="M70 46v98" stroke="#FFFFFF" stroke-width="4"/>
  <rect x="0" y="240" width="400" height="60" fill="${s.floor}"/>
  <g stroke="#000" stroke-opacity=".08"><path d="M0 255h400M0 272h400M0 288h400M60 240v15M180 255v17M300 240v15M120 272v16M260 272v16"/></g>
  <ellipse cx="130" cy="276" rx="110" ry="14" fill="#F3EEE6" opacity=".9"/>
  <rect x="30" y="196" width="190" height="56" rx="14" fill="${s.sofa}"/><rect x="40" y="168" width="170" height="40" rx="12" fill="${s.sofa}"/>
  <rect x="24" y="190" width="24" height="56" rx="10" fill="${s.sofa}"/><rect x="202" y="190" width="24" height="56" rx="10" fill="${s.sofa}"/>
  <rect x="60" y="176" width="40" height="26" rx="8" fill="${s.pillow}"/><rect x="150" y="176" width="40" height="26" rx="8" fill="#F3EEE6"/>
  <path d="M40 252v8M210 252v8" stroke="#24345C" stroke-width="4"/>
  ${s.extra === 'shelf' ? shelf : s.extra === 'table' ? table : bed}
  <path d="M190 0v40" stroke="#24345C" stroke-width="2"/><path d="M174 56a16 16 0 0 1 32 0z" fill="#24345C"/>
</svg>`;
}

// ---------- Миниатюри за блога (по категория) ----------
export function artBlog(cat, label = '') {
  if (cat === 'Покриви') return artPokriv(label);
  if (cat === 'Фасади') return artFasada(label);
  const glyph = {
    'Планиране': `<rect x="130" y="50" width="140" height="190" rx="10" fill="#FFFFFF" stroke="#C9D3DA" stroke-width="3"/><rect x="170" y="38" width="60" height="24" rx="8" fill="${INK}"/>
      <g stroke="${INK}" stroke-width="5" stroke-linecap="round" fill="none"><path d="M156 100l10 10 18-18"/><path d="M156 150l10 10 18-18"/></g>
      <g stroke="#C9D3DA" stroke-width="8" stroke-linecap="round"><path d="M200 104h46M200 154h46M160 202h86"/></g>`,
    'Процес': `<rect x="80" y="70" width="170" height="80" rx="20" fill="#FFFFFF" stroke="#C9D3DA" stroke-width="3"/><path d="M110 150l-6 26 30-26" fill="#FFFFFF" stroke="#C9D3DA" stroke-width="3" stroke-linejoin="round"/>
      <rect x="160" y="140" width="170" height="80" rx="20" fill="${INK}"/><path d="M300 220l6 26-30-26" fill="${INK}"/>
      <g stroke="#C9D3DA" stroke-width="8" stroke-linecap="round"><path d="M104 102h110M104 122h70"/></g><g stroke="#8FA3C2" stroke-width="8" stroke-linecap="round"><path d="M186 172h120M186 192h80"/></g>`,
    'Цялостен ремонт': `<g fill="#FFFFFF" stroke="#C9D3DA" stroke-width="3"><circle cx="110" cy="110" r="26"/><circle cx="110" cy="200" r="26"/><circle cx="200" cy="155" r="26"/></g>
      <g stroke="#C9D3DA" stroke-width="3"><path d="M134 120l42 25M134 190l42-25"/></g>
      <rect x="250" y="95" width="100" height="120" rx="12" fill="${INK}"/><g stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" fill="none"><path d="M276 155l16 16 32-32"/></g>
      <path d="M226 155h18" stroke="${BLUE}" stroke-width="5" stroke-linecap="round"/>`,
  }[cat] || '';
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" ${a11y(label)} xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="${SKY}"/><circle cx="330" cy="60" r="70" fill="#FFFFFF" opacity=".6"/>${glyph}</svg>`;
}

// ---------- Лого ----------
export function logo(cls = 'logo') {
  return `<svg class="${cls}" viewBox="0 0 34 34" aria-hidden="true" focusable="false"><rect width="34" height="34" rx="9" fill="#24345C"/><path d="M8 17 17 9l9 8v9H8z" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linejoin="round"/><rect x="14" y="19" width="6" height="7" fill="#4CACD8"/></svg>`;
}
