// Ремонт Студио — поведение на страниците. Сайтът работи и без JavaScript;
// скриптът само подобрява менютата, плъзгача, калкулатора и формата.
import { presmetni, evro } from './cena.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// ---------- Падащо меню „Услуги“ (само с клик, затваря се с Esc и клик извън него) ----------
const megaBtn = $('[data-mega-btn]');
const mega = $('#mega');
if (megaBtn && mega) {
  const set = (open) => { megaBtn.setAttribute('aria-expanded', String(open)); mega.hidden = !open; };
  megaBtn.addEventListener('click', () => set(mega.hidden));
  document.addEventListener('click', (e) => { if (!mega.hidden && !mega.contains(e.target) && !megaBtn.contains(e.target)) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mega.hidden) { set(false); megaBtn.focus(); } });
  mega.addEventListener('focusout', (e) => { if (!mega.contains(e.relatedTarget) && e.relatedTarget !== megaBtn) set(false); });
}

// ---------- Мобилно меню като модален диалог ----------
const mob = $('#mob-menu');
const openBtn = $('[data-menu-open]');
if (mob && openBtn) {
  const closeBtn = $('[data-menu-close]', mob);
  const focusables = () => $$('a[href],button:not([disabled])', mob).filter(el => el.offsetParent !== null);
  const open = () => {
    mob.hidden = false; document.body.classList.add('menu-open'); openBtn.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
  };
  const close = () => {
    mob.hidden = true; document.body.classList.remove('menu-open'); openBtn.setAttribute('aria-expanded', 'false');
    openBtn.focus();
  };
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  mob.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables(); const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  $$('a', mob).forEach(a => a.addEventListener('click', () => { mob.hidden = true; document.body.classList.remove('menu-open'); }));
}

// ---------- Плъзгач „Преди / След“ (работи с мишка, докосване и клавиатура) ----------
$$('[data-ps]').forEach(fig => {
  const stage = $('.ps__stage', fig);
  const range = $('input[type=range]', fig);
  const upd = () => {
    stage.style.setProperty('--poz', range.value + '%');
    range.setAttribute('aria-valuetext', `${100 - range.value}% след ремонта`);
  };
  range.addEventListener('input', upd); upd();
});

// ---------- Бърза ориентировъчна цена на началната страница ----------
$$('[data-kalk]').forEach(form => {
  const out = $('output', form);
  const link = $('[data-kalk-link]', form);
  const upd = () => {
    const vid = form.vid.value, stroezh = form.stroezh.value;
    const r = presmetni({ vid, stroezh });
    out.textContent = `от ${evro(r.min)} до ${evro(r.max)}`;
    if (link) link.href = `/konstruktor/?vid=${vid}&stroezh=${stroezh}`;
  };
  form.addEventListener('change', upd);
  form.addEventListener('submit', (e) => { e.preventDefault(); upd(); });
  upd();
});

// ---------- Процесът стъпка по стъпка ----------
const procesPlan = $('[data-proces-plan]');
if (procesPlan) {
  const steps = $$('[data-sloi]');
  const status = $('[data-proces-status]');
  const svg = $('svg.plan', procesPlan);
  const apply = (idx) => {
    const layers = new Set();
    steps.slice(0, idx + 1).forEach(li => li.dataset.sloi.split(' ').filter(Boolean).forEach(l => layers.add(l)));
    [...svg.classList].filter(c => c.startsWith('n-')).forEach(c => svg.classList.remove(c));
    layers.forEach(l => svg.classList.add('n-' + l));
    steps.forEach((li, i) => li.classList.toggle('aktivna', i === idx));
    if (status) status.textContent = `Стъпка ${idx + 1} от ${steps.length}: ${$('h2', steps[idx]).textContent}`;
  };
  const io = new IntersectionObserver((entries) => {
    const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (vis) apply(steps.indexOf(vis.target));
  }, { rootMargin: '-45% 0px -50% 0px' });
  steps.forEach(li => io.observe(li));
  apply(0);
}

// ---------- Форма за запитване ----------
const forma = $('[data-forma]');
if (forma) {
  const status = $('[data-status]', forma);
  const msgs = {
    ime: 'Моля, въведете име.',
    kontakt: 'Оставете телефон или имейл, за да можем да се свържем с вас.',
    email: 'Имейлът изглежда непълен. Пример: ime@primer.bg',
    telefon: 'Телефонът трябва да съдържа поне 9 цифри.',
    saglasie: 'Нужно е съгласие, за да обработим запитването.',
  };
  const setErr = (name, text) => {
    const el = forma.elements[name]; const box = $(`#err-${name}`, forma);
    if (el && el.setAttribute) el.setAttribute('aria-invalid', text ? 'true' : 'false');
    if (box) box.textContent = text || '';
  };
  const validate = () => {
    const f = forma.elements; const errs = {};
    if (!f.ime.value.trim()) errs.ime = msgs.ime;
    const tel = f.telefon.value.replace(/\D/g, ''); const em = f.email.value.trim();
    if (!tel && !em) errs.telefon = msgs.kontakt;
    if (tel && tel.length < 9) errs.telefon = msgs.telefon;
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) errs.email = msgs.email;
    if (!f.saglasie.checked) errs.saglasie = msgs.saglasie;
    ['ime', 'telefon', 'email', 'saglasie'].forEach(n => setErr(n, errs[n]));
    return errs;
  };
  forma.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'status'; status.textContent = '';
    const errs = validate(); const first = Object.keys(errs)[0];
    if (first) { forma.elements[first].focus(); status.className = 'status status--err'; status.textContent = 'Има непопълнени полета. Вижте отбелязаното по-долу.'; return; }
    const btn = $('button[type=submit]', forma); btn.disabled = true;
    try {
      const data = Object.fromEntries(new FormData(forma));
      data.vid = new FormData(forma).getAll('vid').join(', ');
      const res = await fetch(forma.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) throw new Error(j.greshka || 'Грешка');
      forma.reset();
      status.className = 'status status--ok';
      status.textContent = 'Благодарим! Получихме запитването и ще се свържем с вас до 1 работен ден.' + (j.demo ? ' (Демо версия: запитването не се изпраща по имейл.)' : '');
    } catch (err) {
      status.className = 'status status--err';
      status.textContent = 'Запитването не беше изпратено. Опитайте отново или ни се обадете на 088 000 0000.';
    } finally { btn.disabled = false; status.focus(); }
  });
  // Грешките се изчистват докато се пише, а не при напускане на полето,
  // за да не се размества формата точно когато потребителят кликва другаде.
  ['ime', 'telefon', 'email', 'saglasie'].forEach(n => forma.elements[n].addEventListener(n === 'saglasie' ? 'change' : 'input', () => {
    if (forma.elements[n].getAttribute('aria-invalid') !== 'true') return;
    const errs = validate();
    ['ime', 'telefon', 'email', 'saglasie'].forEach(k => { if (k !== n && !errs[k]) setErr(k, ''); });
  }));
  if (new URLSearchParams(location.search).get('greshka') === '1') { status.className = 'status status--err'; status.textContent = 'Запитването не беше изпратено. Проверете полетата или ни се обадете на 088 000 0000.'; }
  if (new URLSearchParams(location.search).get('izprateno') === '1') { status.className = 'status status--ok'; status.textContent = 'Благодарим! Получихме запитването и ще се свържем с вас до 1 работен ден.'; }
}
