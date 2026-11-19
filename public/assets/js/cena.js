// Ориентировъчна цена на ремонта. Използва се от конструктора, от формата на
// началната страница и при генериране на сайта.
// Ориентири: пазарни цени за Варна, 2026 г., труд и материали, без мебели.

export const VIDOVE = {
  ednostaen: { ime: 'Едностаен', plosht: 45, kuhnyaM: 2.4 },
  dvustaen: { ime: 'Двустаен', plosht: 65, kuhnyaM: 3 },
  tristaen: { ime: 'Тристаен', plosht: 90, kuhnyaM: 3.6 },
  kashta: { ime: 'Къща', plosht: 130, kuhnyaM: 4.2 },
};

export const PERA = {
  izkartvane: { ime: 'Изкъртване и извозване', opis: 'Демонтаж на стари настилки, облицовки и санитария', dyal: 0.05 },
  instalatsii: { ime: 'Ел. и ВиК инсталации', opis: 'Нови кабели, табло, тръби и изводи', dyal: 0.17 },
  dograma: { ime: 'Смяна на дограма', opis: 'Нови прозорци и балконска врата', dyal: 0.11 },
  zamazki: { ime: 'Замазки и гипсокартон', opis: 'Равен под, окачен таван, прегради', dyal: 0.12 },
  steni: { ime: 'Шпакловка и боядисване', opis: 'Стени и тавани', dyal: 0.17 },
  nastilki: { ime: 'Настилки', opis: 'Паркет, ламинат или гранитогрес', dyal: 0.13 },
  banya: { ime: 'Баня', opis: 'Хидроизолация, плочки и санитария', dyal: 0.17 },
  darvodelski: { ime: 'Кухня и дърводелски услуги', opis: 'Кухня по мярка, врати, рафтове', dyal: 0.05 },
  osvetlenie: { ime: 'Осветление и детайли', opis: 'Тела, ключове, контакти, подсветка', dyal: 0.03 },
  pochistvane: { ime: 'Финално почистване', opis: 'Професионално почистване след ремонта', dyal: 0 },
};

export const STROEZH = { staro: { ime: 'Старо строителство', m2: [250, 357] }, novo: { ime: 'Ново строителство', m2: [208, 346] } };
export const KLAS = { ikon: { ime: 'Икономичен', k: 0.85 }, sreden: { ime: 'Среден', k: 1 }, visok: { ime: 'Висок', k: 1.3 } };
export const POD = { ribena: { ime: 'Паркет рибена кост', k: 1.25 }, laminat: { ime: 'Ламинат', k: 0.75 }, granit: { ime: 'Гранитогрес', k: 1.1 } };
const KUHNYA_M = [350, 1100]; // € на линеен метър
const POCHISTVANE_M2 = [1.5, 3.5];

const r50 = (x) => Math.round(x / 50) * 50;

export function presmetni({ vid = 'dvustaen', plosht, stroezh = 'staro', pera = Object.keys(PERA), pod = 'laminat', klas = 'sreden' } = {}) {
  const m2 = plosht || VIDOVE[vid].plosht;
  const [lo, hi] = STROEZH[stroezh].m2;
  const k = KLAS[klas].k;
  const redove = [];
  for (const key of pera) {
    const p = PERA[key];
    if (!p) continue;
    let min, max, ime = p.ime;
    if (key === 'darvodelski') {
      const m = VIDOVE[vid].kuhnyaM;
      min = m * KUHNYA_M[0] + m2 * lo * p.dyal * k;
      max = m * KUHNYA_M[1] + m2 * hi * p.dyal * k;
      ime += ` (≈ ${String(m).replace('.', ',')} л.м кухня)`;
    } else if (key === 'pochistvane') {
      min = m2 * POCHISTVANE_M2[0];
      max = m2 * POCHISTVANE_M2[1];
    } else {
      const d = key === 'nastilki' ? p.dyal * POD[pod].k : p.dyal;
      min = m2 * lo * d * k;
      max = m2 * hi * d * k;
    }
    redove.push({ key, ime, min: r50(min), max: r50(max) });
  }
  const min = redove.reduce((s, r) => s + r.min, 0);
  const max = redove.reduce((s, r) => s + r.max, 0);
  return { redove, min, max, naM2: m2 ? [Math.round(min / m2), Math.round(max / m2)] : [0, 0], plosht: m2 };
}

export const evro = (x) => Math.round(x).toLocaleString('bg-BG').replace(/[  ]/g, ' ') + ' €';
