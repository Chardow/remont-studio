// Конструктор на ремонта: истинска форма, схема на жилището и цена по пера.
import { presmetni, evro, VIDOVE } from './cena.js';

const form = document.querySelector('[data-kn]');
if (form) {
  const svg = document.querySelector('[data-kn-plan] svg.plan');
  const tbody = document.querySelector('[data-kn-redove]');
  const total = document.querySelector('[data-kn-obshto]');
  const naM2 = document.querySelector('[data-kn-nam2]');
  const ploshtOut = document.querySelector('[data-kn-plosht]');
  const copyBtn = document.querySelector('[data-kn-copy]');
  const copyStatus = document.querySelector('[data-kn-copy-status]');
  const range = form.elements.plosht;

  // Начално състояние от адреса (за да може връзката да се споделя)
  const q = new URLSearchParams(location.search);
  for (const name of ['vid', 'stroezh', 'pod', 'klas', 'steni', 'kuhnya']) {
    const v = q.get(name); if (!v) continue;
    const el = [...form.querySelectorAll(`input[name="${name}"]`)].find(i => i.value === v);
    if (el) el.checked = true;
  }
  if (q.get('vid') && !q.get('plosht')) range.value = VIDOVE[q.get('vid')]?.plosht || range.value;
  if (q.get('plosht')) range.value = q.get('plosht');
  if (q.get('pera') !== null && q.get('pera') !== undefined && q.has('pera')) {
    const set = new Set(q.get('pera').split(',').filter(Boolean));
    form.querySelectorAll('input[name="pera"]').forEach(i => { i.checked = set.has(i.value); });
  }

  const state = () => {
    const fd = new FormData(form);
    return { vid: fd.get('vid'), plosht: +fd.get('plosht'), stroezh: fd.get('stroezh'), pera: fd.getAll('pera'), pod: fd.get('pod'), klas: fd.get('klas'), steni: fd.get('steni'), kuhnya: fd.get('kuhnya') };
  };

  const render = () => {
    const s = state();
    const r = presmetni(s);
    tbody.innerHTML = r.redove.length
      ? r.redove.map(x => `<tr><td>${x.ime}</td><td>${evro(x.min)}</td><td>${evro(x.max)}</td></tr>`).join('')
      : '<tr><td colspan="3">Изберете поне едно перо.</td></tr>';
    total.textContent = r.min ? `от ${evro(r.min)} до ${evro(r.max)}` : '—';
    naM2.textContent = r.min ? `≈ ${r.naM2[0]}–${r.naM2[1]} € на м²` : '';
    ploshtOut.textContent = `${s.plosht} м²`;
    // Схемата
    [...svg.classList].filter(c => c.startsWith('n-') || c.startsWith('f-')).forEach(c => svg.classList.remove(c));
    s.pera.forEach(p => svg.classList.add('n-' + p));
    if (s.pera.includes('izkartvane')) svg.classList.add('n-obzavezhdane');
    svg.classList.add('f-' + s.pod);
    svg.style.setProperty('--plan-wall', s.steni);
    svg.style.setProperty('--plan-kitchen', s.kuhnya);
    svg.setAttribute('aria-label', `Схема на жилището. Ново: ${s.pera.length ? r.redove.map(x => x.ime.replace(/ \(.*\)/, '')).join(', ') : 'нищо'}.`);
    // Адрес за споделяне
    const p = new URLSearchParams({ vid: s.vid, plosht: s.plosht, stroezh: s.stroezh, pera: s.pera.join(','), pod: s.pod, klas: s.klas, steni: s.steni, kuhnya: s.kuhnya });
    history.replaceState(null, '', `${location.pathname}?${p}`);
  };

  form.addEventListener('change', (e) => {
    if (e.target.name === 'vid') range.value = VIDOVE[e.target.value].plosht;
    render();
  });
  range.addEventListener('input', render);
  form.addEventListener('submit', (e) => e.preventDefault());
  document.querySelectorAll('[data-kn-all]').forEach(b => b.addEventListener('click', () => {
    const on = b.dataset.knAll === '1';
    form.querySelectorAll('input[name="pera"]').forEach(i => { i.checked = on; });
    render();
  }));
  copyBtn?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.href); copyStatus.textContent = 'Връзката е копирана.'; }
    catch { copyStatus.textContent = 'Копирайте адреса от адресната лента на браузъра.'; }
  });
  render();
}
