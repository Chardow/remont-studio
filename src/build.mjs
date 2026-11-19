// Генерира статичния сайт в dist/. Без външни зависимости: node src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { page, md, esc, btn, more, SITE, USLUGI, ctaBand } from './layout.mjs';
import { icon, artBanya, artFasada, artPokriv, artRoom, artBlog } from './art.mjs';
import { plan, planCss, LAYERS } from './plan.mjs';
import { STATII } from './content/blog.mjs';
import { USLUGI_TEXT, STAPKI, PROCES, OBEKTI, OTZIVI } from './content/uslugi.mjs';
import { presmetni, evro, VIDOVE, PERA, STROEZH, KLAS, POD } from '../public/assets/js/cena.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, 'dist');
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(ROOT, 'public'), OUT, { recursive: true });

const files = {};
const add = (p, html) => { files[p] = html; };

// ---------- помощни ----------
const MESECI = ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември'];
const dataBg = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MESECI[m - 1]} ${y} г.`; };
const sekGlava = ({ eyebrow, h, p = '', link = '', id }) => `<div class="sek__glava"><div>${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h2 id="${id}">${h}</h2>${p ? `<p class="lead">${p}</p>` : ''}</div>${link}</div>`;

let planN = 0;
function art(kind, label = '') {
  if (kind === 'banya') return artBanya(label);
  if (kind === 'fasada') return artFasada(label);
  if (kind === 'pokriv') return artPokriv(label);
  if (kind === 'plan') return plan({ id: 'u' + (++planN), state: LAYERS, floor: 'ribena', kitchen: '#3A4A6B', label: label || 'Схема на ремонтиран двустаен апартамент' });
  return '';
}

// Markdown с два специални блока: @@blokove … @@ (карти) и @@nomera … @@ (номериран списък)
function rich(src) {
  return src.split(/^@@(\w*)\s*$/m).reduce((acc, part, i, arr) => {
    if (i % 2 === 1) return acc; // името на блока
    const kind = i > 0 ? arr[i - 1] : '';
    if (!kind) return acc + md(part);
    const items = part.split(/^### /m).filter(s => s.trim()).map(s => { const [h, ...rest] = s.split('\n'); return { h: h.trim(), body: rest.join('\n') }; });
    if (kind === 'blokove') return acc + `<div class="blokove">${items.map(it => `<div class="blok"><h3>${esc(it.h)}</h3>${md(it.body)}</div>`).join('')}</div>`;
    if (kind === 'nomera') return acc + `<ol class="nomera">${items.map(it => `<li><h3>${esc(it.h)}</h3>${md(it.body)}</li>`).join('')}</ol>`;
    return acc;
  }, '');
}

const uslugaKarta = (u, h = 'h3') => `<article class="karta">
  <div class="karta__img">${art(u.art)}</div>
  <div class="karta__body"><${h}><a href="/uslugi/${u.slug}/">${u.ime}</a></${h}><p>${u.opis}</p>
  <ul class="tagove" aria-label="Включва">${u.tagove.map(t => `<li>${t}</li>`).join('')}</ul>
  <span class="more" aria-hidden="true">Към услугата${icon('arrow')}</span></div></article>`;

const obektKarta = (o, h = 'h3') => `<article class="karta">
  <div class="karta__img">${artRoom(o.art)}</div>
  <div class="karta__body"><p class="meta"><span>${o.mesto}</span><span>${o.vid}</span></p><${h}><a href="/zavarsheni-obekti/${o.slug}/">${o.ime}</a></${h}><p>${o.kratko}</p>
  <span class="more" aria-hidden="true">Вижте обекта${icon('arrow')}</span></div></article>`;

const statiyaKarta = (s, h = 'h3') => `<article class="karta">
  <div class="karta__img">${artBlog(s.kat)}</div>
  <div class="karta__body"><p class="meta"><span>${s.kat}</span><time datetime="${s.data}">${dataBg(s.data)}</time></p><${h}><a href="/blog/${s.slug}/">${s.zaglavie}</a></${h}><p>${s.opis}</p>
  <span class="more" aria-hidden="true">Прочетете${icon('arrow')}</span></div></article>`;

const otzivi = () => `<div class="grid g3">${OTZIVI.map(o => `<figure class="otziv"><blockquote><p>${o.text}</p></blockquote><figcaption>${o.koi}</figcaption></figure>`).join('')}</div>`;

const chip = (name, value, label, checked, type = 'radio', extra = '') => `<label class="chip"><input type="${type}" name="${name}" value="${value}"${checked ? ' checked' : ''}><span>${extra}${label}</span></label>`;

// ---------- Начало ----------
{
  const primer = presmetni({ vid: 'dvustaen', stroezh: 'staro' });
  const body = `
<section class="geroi" aria-labelledby="h1"><div class="wrap geroi__grid">
  <div>
    <h1 id="h1"><span class="h1-pre">Ремонти на жилища във Варна</span>Ремонтът, за който не мислите</h1>
    <p class="lead">Поемаме пълната отговорност за всеки детайл, от първата консултация до финалното почистване. С договор, ясни срокове и 5 години гаранция.</p>
    <div class="btns">${btn('/kontakti/#forma', 'Заявете безплатен оглед')}<a class="btn btn--light" href="${SITE.telHref}">${icon('phone')} ${SITE.tel}</a></div>
    <ul class="dovod">
      <li>${icon('check')}Безплатен оглед</li><li>${icon('check')}Неустойка при забава</li><li>${icon('check')}5 години гаранция</li>
    </ul>
  </div>
  <figure class="ps" data-ps>
    <div class="ps__stage">
      ${plan({ id: 'hp', state: [], label: 'Апартаментът преди ремонта: стар паркет, напукани стени, старо обзавеждане' })}
      <div class="ps__sled">${plan({ id: 'hs', state: LAYERS, floor: 'ribena', wall: '#F4F2EE', kitchen: '#3A4A6B', label: 'Същият апартамент след ремонта: паркет рибена кост, нова баня, кухня по мярка и осветление' })}</div>
      <span class="ps__line" aria-hidden="true"></span>
      <input type="range" min="0" max="100" value="50" aria-label="Сравнение преди и след ремонта">
    </div>
    <div class="ps__etiketi" aria-hidden="true"><span>Преди</span><span>След</span></div>
    <figcaption>Плъзнете, за да сравните. Схема на двустаен апартамент, пример.</figcaption>
  </figure>
</div></section>

<section class="sek sek--bial" aria-labelledby="h-zashto"><div class="wrap">
  ${sekGlava({ id: 'h-zashto', eyebrow: 'Защо Ремонт Студио', h: 'Освобождаваме ви от тежестта на ремонта', p: 'Създадохме Ремонт Студио с една мисия: да поемем пълната отговорност за всеки детайл, за да не се налага да координирате майстори.' })}
  <div class="grid g4">
    <div class="fakt fakt--tamno"><span class="fakt__ic">${icon('level')}</span><b>5 стъпки</b><h3>От огледа до почистването</h3><p>Оглед, оферта, договор, изпълнение и финално почистване.</p></div>
    <div class="fakt"><span class="fakt__ic">${icon('search')}</span><b>Безплатно</b><h3>Оглед и консултация</h3><p>На територията на Варна и региона.</p></div>
    <div class="fakt"><span class="fakt__ic">${icon('team')}</span><b>1 екип</b><h3>За целия ремонт</h3><p>Координираме всички ремонтни и довършителни дейности.</p></div>
    <div class="fakt"><span class="fakt__ic">${icon('shield')}</span><b>5 години</b><h3>Гаранция в договора</h3><p>За извършените от нас ремонтни дейности.</p></div>
  </div>
</div></section>

<section class="sek" aria-labelledby="h-uslugi"><div class="wrap">
  ${sekGlava({ id: 'h-uslugi', eyebrow: 'Услуги', h: 'От ремонта на вашия дом до обновяването на цялата сграда', p: 'Добро планиране, ясни условия и изпълнение, на което можете да разчитате.', link: more('/uslugi/', 'Всички услуги') })}
  <div class="grid g4">${USLUGI.map(u => uslugaKarta(u)).join('')}</div>
</div></section>

<section class="sek sek--bial" aria-labelledby="h-kak"><div class="wrap">
  ${sekGlava({ id: 'h-kak', eyebrow: 'Как работим', h: 'Пет ясни стъпки', p: 'Ще посетим обекта, ще обсъдим идеите ви и ще изготвим детайлна оферта без скрити разходи.', link: more('/proces/', 'Целият процес стъпка по стъпка') })}
  <ol class="stapki">${STAPKI.map((s, i) => `<li><span class="nom" aria-hidden="true">0${i + 1}</span><h3><a href="/kak-rabotim/${s.slug}/">${s.ime}</a></h3><p>${s.kratko}</p></li>`).join('')}</ol>
</div></section>

<section class="sek sek--tamno on-dark" aria-labelledby="h-cena"><div class="wrap kalk">
  <div>
    <p class="eyebrow">Ориентировъчна цена</p>
    <h2 id="h-cena">Колко струва цялостен ремонт?</h2>
    <p class="lead">Изберете жилището и вижте пазарен ориентир за Варна: труд и материали, без мебели. Точната цена е след безплатния оглед.</p>
    <p>${more('/konstruktor/', 'Отворете конструктора с всички пера').replace('class="more"', 'class="more" style="color:#fff"')}</p>
  </div>
  <form data-kalk aria-label="Бърза ориентировъчна цена">
    <fieldset class="izbor"><legend>Жилище</legend><div class="chips">${Object.entries(VIDOVE).map(([k, v]) => chip('vid', k, `${v.ime} · ${v.plosht} м²`, k === 'dvustaen')).join('')}</div></fieldset>
    <fieldset class="izbor"><legend>Сграда</legend><div class="chips">${Object.entries(STROEZH).map(([k, v]) => chip('stroezh', k, v.ime, k === 'staro')).join('')}</div></fieldset>
    <div class="rezultat" aria-live="polite"><small>Цялостен ремонт, среден клас материали</small><output>от ${evro(primer.min)} до ${evro(primer.max)}</output><small>Не е оферта. Точната цена е след огледа.</small></div>
    <p style="margin:16px 0 0"><a class="btn btn--white" data-kalk-link href="/konstruktor/">Настройте по пера<span class="krag">${icon('arrow')}</span></a></p>
  </form>
</div></section>

<section class="sek" aria-labelledby="h-obekti"><div class="wrap">
  ${sekGlava({ id: 'h-obekti', eyebrow: 'Завършени обекти', h: 'Домове, преобразени с наша помощ', p: 'Наши проекти във Варна и региона.', link: more('/zavarsheni-obekti/', 'Всички обекти') })}
  <div class="grid g3">${OBEKTI.map(o => obektKarta(o)).join('')}</div>
</div></section>

<section class="sek sek--tamno on-dark" aria-labelledby="h-otzivi"><div class="wrap">
  ${sekGlava({ id: 'h-otzivi', eyebrow: 'Какво казват клиентите', h: 'Отзиви' })}
  ${otzivi()}
</div></section>

<section class="sek" aria-labelledby="h-blog"><div class="wrap">
  ${sekGlava({ id: 'h-blog', eyebrow: 'Блог', h: 'Полезно преди ремонта', link: more('/blog/', 'Всички статии') })}
  <div class="grid g3">${STATII.slice(0, 3).map(s => statiyaKarta(s)).join('')}</div>
</div></section>`;
  add('/', page({ path: '/', title: 'Ремонт Студио: ремонти на жилища във Варна', desc: 'Цялостни ремонти на апартаменти и къщи, бани, фасади и покриви във Варна и региона. Безплатен оглед, договор с неустойка и 5 години гаранция.', body,
    schema: [{ '@type': 'WebSite', '@id': SITE.url + '/#site', url: SITE.url + '/', name: SITE.ime, inLanguage: 'bg' }] }));
}

// ---------- Услуги ----------
add('/uslugi/', page({ path: '/uslugi/', title: 'Услуги: ремонти във Варна', desc: 'Цялостни и частични ремонти на жилища, ремонт на бани, външна топлоизолация на фасади и ремонт на покриви във Варна и региона.',
  crumbs: [['Начало', '/'], ['Услуги', '/uslugi/']],
  body: `<section class="str-glava"><div class="wrap"><p class="eyebrow">Услуги</p><h1>От ремонта на вашия дом до обновяването на цялата сграда</h1>
  <p class="lead">Работим по отделни помещения и цялостни ремонти на апартаменти и къщи, както и по фасади и покриви на жилищни сгради. За собственици и за етажната собственост.</p></div></section>
  <section class="sek" style="padding-top:0" aria-label="Списък с услуги"><div class="wrap"><div class="grid g2">${USLUGI.map(u => uslugaKarta(u, 'h2')).join('')}</div>
  <div class="grid g2 mt">
    <a class="kontakt" href="/proces/"><span class="k-ic">${icon('level')}</span><span><small>Процесът</small><b>12 етапа от огледа до ключа</b></span></a>
    <a class="kontakt" href="/konstruktor/"><span class="k-ic">${icon('euro')}</span><span><small>Конструктор</small><b>Ориентировъчна цена по пера</b></span></a>
  </div></div></section>` }));

for (const u of USLUGI) {
  const t = USLUGI_TEXT[u.slug];
  const drugi = USLUGI.filter(x => x.slug !== u.slug);
  add(`/uslugi/${u.slug}/`, page({ path: `/uslugi/${u.slug}/`, title: t.title, desc: t.desc,
    crumbs: [['Начало', '/'], ['Услуги', '/uslugi/'], [u.ime, `/uslugi/${u.slug}/`]],
    schema: [{ '@type': 'Service', name: u.ime, serviceType: u.ime, provider: { '@id': SITE.url + '/#firma' }, areaServed: 'Варна', url: SITE.url + `/uslugi/${u.slug}/` }],
    body: `<section class="str-glava"><div class="wrap str-glava__grid s-art"><div><p class="eyebrow">Услуга</p><h1>${u.ime}</h1><p class="lead">${t.uvod}</p>
      <div class="btns">${btn('/kontakti/#forma', 'Заявете безплатен оглед')}<a class="btn btn--light" href="${SITE.telHref}">${icon('phone')} ${SITE.tel}</a></div></div>
      <div class="str-glava__art">${art(u.art, '')}</div></div></section>
    <div class="wrap izkl"><div class="prose">${rich(t.text)}</div>
      <aside class="strana" aria-label="Още услуги">
        <div class="box box--tamno on-dark"><h2>Безплатен оглед</h2><p>Оглед и консултация във Варна и региона. Отговаряме до 1 работен ден.</p>${btn('/kontakti/#forma', 'Изпратете запитване', { cls: 'btn--white' })}</div>
        <div class="box"><h2>Други услуги</h2><ul class="chek">${drugi.map(d => `<li><a href="/uslugi/${d.slug}/">${d.ime}</a></li>`).join('')}</ul></div>
      </aside></div>` }));
}

// ---------- Как работим ----------
add('/kak-rabotim/', page({ path: '/kak-rabotim/', title: 'Как работим', desc: 'Пет стъпки на ремонта с Ремонт Студио: оглед, детайлна оферта, договор, професионално изпълнение и финално почистване.',
  crumbs: [['Начало', '/'], ['Как работим', '/kak-rabotim/']],
  body: `<section class="str-glava"><div class="wrap"><p class="eyebrow">Пет стъпки</p><h1>Как работим?</h1><p class="lead">Професионализмът е в системния подход. Организираме работата в логическа последователност, която гарантира здравина, функционалност и естетика.</p></div></section>
  <div class="wrap"><ol class="stapki">${STAPKI.map((s, i) => `<li><span class="nom" aria-hidden="true">0${i + 1}</span><h2 style="font-size:1.25rem"><a href="/kak-rabotim/${s.slug}/">${s.ime}</a></h2><p>${s.kratko}</p></li>`).join('')}</ol>
  <div class="grid g2 mt">
    <a class="kontakt" href="/proces/"><span class="k-ic">${icon('level')}</span><span><small>Изпълнението, стая по стая</small><b>Вижте 12-те етапа на ремонта</b></span></a>
    <a class="kontakt" href="/konstruktor/"><span class="k-ic">${icon('euro')}</span><span><small>Колко ще струва?</small><b>Ориентировъчна цена по пера</b></span></a>
  </div></div>` }));

STAPKI.forEach((s, i) => {
  const prev = STAPKI[i - 1], next = STAPKI[i + 1];
  add(`/kak-rabotim/${s.slug}/`, page({ path: `/kak-rabotim/${s.slug}/`, title: s.title, desc: s.desc,
    crumbs: [['Начало', '/'], ['Как работим', '/kak-rabotim/'], [s.ime, `/kak-rabotim/${s.slug}/`]],
    body: `<section class="str-glava"><div class="wrap"><p class="eyebrow">Стъпка ${i + 1} от ${STAPKI.length}</p><h1>${s.ime}</h1><p class="lead">${s.kratko}</p></div></section>
    <div class="wrap izkl"><div class="prose">${md(s.text)}
      <nav class="pager" aria-label="Стъпки">${prev ? `<a href="/kak-rabotim/${prev.slug}/"><small>← Предишна стъпка</small>${prev.ime}</a>` : '<span></span>'}${next ? `<a href="/kak-rabotim/${next.slug}/" style="text-align:right"><small>Следваща стъпка →</small>${next.ime}</a>` : `<a href="/proces/" style="text-align:right"><small>Вижте още →</small>Процесът стъпка по стъпка</a>`}</nav></div>
      <aside class="strana" aria-label="Всички стъпки"><div class="box"><h2>Всички стъпки</h2><ol class="chek" style="list-style:none;padding:0">${STAPKI.map(x => `<li>${x.slug === s.slug ? `<strong aria-current="page">${x.ime}</strong>` : `<a href="/kak-rabotim/${x.slug}/">${x.ime}</a>`}</li>`).join('')}</ol></div></aside></div>` }));
});

// ---------- Процесът стъпка по стъпка ----------
add('/proces/', page({ path: '/proces/', title: 'Процесът на ремонта стъпка по стъпка', desc: '12 етапа на един цялостен ремонт, показани върху схема на двустаен апартамент: от огледа и офертата до финалното почистване.',
  crumbs: [['Начало', '/'], ['Как работим', '/kak-rabotim/'], ['Процесът стъпка по стъпка', '/proces/']],
  body: `<section class="str-glava"><div class="wrap"><p class="eyebrow">От огледа до ключа</p><h1>Как минава един цялостен ремонт</h1><p class="lead">Превъртете надолу: схемата на двустаен апартамент се променя с всяка стъпка. Апартаментът е пример, не конкретен обект.</p></div></section>
  <div class="wrap proces">
    <div class="proces__viz" data-proces-plan>${plan({ id: 'pr', state: [], floor: 'ribena', kitchen: '#3A4A6B', label: 'Схема на апартамента, която се променя според етапа на ремонта' })}
      <p class="proces__status" aria-live="polite" data-proces-status>Стъпка 1 от ${PROCES.length}</p></div>
    <ol class="proces__stapki">${PROCES.map((p, i) => `<li data-sloi="${p.sloi}"><span class="nom">${icon(p.ic)} Стъпка ${i + 1}</span><h2>${p.ime}</h2><p>${p.text}</p><ul class="chek">${p.li.map(x => `<li>${x}</li>`).join('')}</ul></li>`).join('')}</ol>
  </div>` }));

// ---------- Конструктор ----------
{
  const peraHtml = Object.entries(PERA).map(([k, p]) => `<label class="pero"><input type="checkbox" name="pera" value="${k}" checked><span><b>${p.ime}</b><small>${p.opis}</small></span></label>`).join('');
  const steni = [['#F4F2EE', 'Топло бяло'], ['#E9EDF2', 'Студено бяло'], ['#D9DED3', 'Градински'], ['#E8D8C8', 'Пясъчен'], ['#C9D6E3', 'Небесен']];
  const kuhni = [['#A9B5A0', 'Градински зелен'], ['#E7E4DE', 'Светъл'], ['#3A4A6B', 'Тъмносин'], ['#C8B091', 'Дъб']];
  const r = presmetni({});
  add('/konstruktor/', page({ path: '/konstruktor/', title: 'Конструктор на ремонта: ориентировъчна цена', desc: 'Изберете жилището, какво ремонтирате и материалите и вижте ориентировъчна цена по пера за Варна. Схемата на жилището се променя пред вас.',
    crumbs: [['Начало', '/'], ['Конструктор на ремонта', '/konstruktor/']], scripts: ['site.js', 'konstruktor.js'],
    body: `<section class="str-glava"><div class="wrap"><p class="eyebrow">Конструктор на ремонта</p><h1>Вашият ремонт, с ориентировъчна цена</h1><p class="lead">Изберете жилището, какво ремонтирате и материалите. Схемата се променя, а отдолу излиза цена по пера.</p></div></section>
    <div class="wrap kn">
      <form data-kn aria-label="Параметри на ремонта">
        <fieldset><legend><span class="n">01</span>Жилището</legend>
          <div class="chips">${Object.entries(VIDOVE).map(([k, v]) => chip('vid', k, `${v.ime} <small>· около ${v.plosht} м²</small>`, k === 'dvustaen')).join('')}</div>
          <div class="razmer"><label for="plosht">Площ</label><output data-kn-plosht for="plosht">65 м²</output></div>
          <input id="plosht" type="range" name="plosht" min="25" max="200" step="1" value="65" aria-describedby="plosht-h"><p class="opis" id="plosht-h">От 25 до 200 м².</p>
          <div class="chips">${Object.entries(STROEZH).map(([k, v]) => chip('stroezh', k, v.ime, k === 'staro')).join('')}</div>
        </fieldset>
        <fieldset><legend><span class="n">02</span>Какво ремонтирате</legend>
          <p class="opis">Отметнатото перо се вижда на схемата като ново, неотметнатото остава старо.</p>
          <div class="btns" style="margin-bottom:12px"><button type="button" class="btn btn--light" style="min-height:40px;padding:6px 16px" data-kn-all="1">Всичко</button><button type="button" class="btn btn--light" style="min-height:40px;padding:6px 16px" data-kn-all="0">Нищо</button></div>
          <div class="pera">${peraHtml}</div>
        </fieldset>
        <fieldset><legend><span class="n">03</span>Материалите</legend>
          <p class="opis"><b>Подът</b></p><div class="chips">${Object.entries(POD).map(([k, v]) => chip('pod', k, v.ime, k === 'laminat')).join('')}</div>
          <p class="opis" style="margin-top:16px"><b>Стените</b></p><div class="chips cvetove">${steni.map(([c, n], i) => chip('steni', c, n, i === 0, 'radio', `<i style="background:${c}"></i>`)).join('')}</div>
          <p class="opis" style="margin-top:16px"><b>Кухнята</b></p><div class="chips cvetove">${kuhni.map(([c, n], i) => chip('kuhnya', c, n, i === 2, 'radio', `<i style="background:${c}"></i>`)).join('')}</div>
          <p class="opis" style="margin-top:16px"><b>Клас на материалите</b></p><div class="chips">${Object.entries(KLAS).map(([k, v]) => chip('klas', k, v.ime, k === 'sreden')).join('')}</div>
        </fieldset>
        <fieldset><legend><span class="n">04</span>Ориентировъчна цена</legend>
          <div class="obshto" aria-live="polite"><span>Общо</span><output data-kn-obshto>от ${evro(r.min)} до ${evro(r.max)}</output><small data-kn-nam2></small></div>
          <table class="tablica"><caption class="sr-only">Цена по пера</caption><thead><tr><th scope="col">Перо</th><th scope="col">от</th><th scope="col">до</th></tr></thead>
          <tbody data-kn-redove>${r.redove.map(x => `<tr><td>${x.ime}</td><td>${evro(x.min)}</td><td>${evro(x.max)}</td></tr>`).join('')}</tbody></table>
          <p class="belezhka">Пазарни ориентири за Варна и България за 2026 г., труд и материали, без мебели. Разпределението по пера е приблизително. Източници: Хендимен Варна, daibau.bg. Това не е оферта: точната цена е след безплатния оглед.</p>
          <div class="btns">${btn('/kontakti/#forma', 'Заявете безплатен оглед')}<button type="button" class="btn btn--light" data-kn-copy>${icon('link')} Копирайте връзката</button></div>
          <p class="belezhka" role="status" data-kn-copy-status></p>
        </fieldset>
      </form>
      <div class="kn__viz" data-kn-plan>${plan({ id: 'kn', state: [...LAYERS], floor: 'laminat', wall: '#F4F2EE', kitchen: '#3A4A6B', label: 'Схема на жилището' })}
        <p class="kn__mini" aria-hidden="true">Ориентировъчно<output data-kn-obshto-mini>от ${evro(r.min)} до ${evro(r.max)}</output></p>
        <p class="belezhka" style="margin:10px 4px 0">Схемата е условна. Площта и броят стаи не променят чертежа, а само цената.</p></div>
    </div>` }));
}

// ---------- Завършени обекти ----------
add('/zavarsheni-obekti/', page({ path: '/zavarsheni-obekti/', title: 'Завършени обекти във Варна', desc: 'Наши завършени ремонти на апартаменти във Варна: център, Бриз и кв. Възраждане.',
  crumbs: [['Начало', '/'], ['Завършени обекти', '/zavarsheni-obekti/']],
  body: `<section class="str-glava"><div class="wrap"><p class="eyebrow">Портфолио</p><h1>Завършени обекти</h1><p class="lead">Домове, преобразени с наша помощ във Варна и региона.</p></div></section>
  <section class="sek" style="padding-top:0" aria-label="Обекти"><div class="wrap"><div class="grid g3">${OBEKTI.map(o => obektKarta(o, 'h2')).join('')}</div></div></section>
  <section class="sek sek--tamno on-dark" aria-labelledby="h-otzivi"><div class="wrap">${sekGlava({ id: 'h-otzivi', eyebrow: 'Какво казват клиентите', h: 'Отзиви' })}${otzivi()}</div></section>` }));

for (const o of OBEKTI) {
  const drugi = OBEKTI.filter(x => x.slug !== o.slug);
  add(`/zavarsheni-obekti/${o.slug}/`, page({ path: `/zavarsheni-obekti/${o.slug}/`, title: o.ime, desc: `${o.vid}: ${o.ime}. ${o.kratko}`,
    crumbs: [['Начало', '/'], ['Завършени обекти', '/zavarsheni-obekti/'], [o.ime, `/zavarsheni-obekti/${o.slug}/`]],
    body: `<section class="str-glava"><div class="wrap str-glava__grid s-art"><div><p class="eyebrow">${o.mesto}</p><h1>${o.ime}</h1><p class="lead">${o.kratko}</p><p class="meta"><span>${o.vid}</span></p></div>
      <figure class="str-glava__art" style="margin:0">${artRoom(o.art, 'Илюстрация на интериора')}<figcaption class="belezhka" style="padding:8px 14px;margin:0">Илюстрация на интериора. Снимките от обекта предстоят.</figcaption></figure></div></section>
    <div class="wrap izkl"><div class="prose">${md(o.text)}</div>
      <aside class="strana" aria-label="Още обекти"><div class="box box--tamno on-dark"><h2>Искате подобен резултат?</h2><p>Започваме с безплатен оглед.</p>${btn('/kontakti/#forma', 'Заявете оглед', { cls: 'btn--white' })}</div></aside></div>
    <section class="sek" aria-labelledby="h-oshte"><div class="wrap">${sekGlava({ id: 'h-oshte', h: 'Вижте и' })}<div class="grid g2">${drugi.map(d => obektKarta(d)).join('')}</div></div></section>` }));
}

// ---------- За нас ----------
add('/za-nas/', page({ path: '/za-nas/', title: 'За нас', desc: 'Ремонт Студио: ремонти на жилища във Варна. Системен подход, договор с неустойка, 5 години гаранция и професионално почистване.',
  crumbs: [['Начало', '/'], ['За нас', '/za-nas/']],
  body: `<section class="str-glava"><div class="wrap"><p class="eyebrow">За нас</p><h1>Ремонти на жилища във Варна. Това е нашето обещание за спокойствие.</h1>
    <p class="lead">Създадохме Ремонт Студио с една мисия: да освободим клиентите си от тежестта на ремонта, като поемем пълната отговорност за всеки детайл, от първата консултация до финалното почистване.</p></div></section>
  <div class="wrap izkl"><div class="prose">
    <p>Работим с признати материали и професионални инструменти и даваме гаранция в договор с всеки клиент.</p>
    <h2>Професионализмът е в системния подход</h2>
    <p>Организираме работата в логическа последователност, която гарантира здравина, функционалност и естетика:</p>
    ${rich(`@@nomera
### Инженерни решения и основа
Започваме с най-важното: сигурността и изолацията. Подменяме или изграждаме ел. и ВиК инсталации и сменяме дограмата за дългосрочна енергийна ефективност.
### Грубо строителство и нивелация
Равни повърхности чрез прецизни замазки и конструкции от гипсокартон. Пространството получава новата си форма.
### Естетика и детайли
Боядисване, плочки и цялостен ремонт на бани, със специално внимание към хидроизолацията.
### Дърводелски услуги
Кухни по мярка, врати и рафтове, които внасят топлина и завършеност в интериора.
@@`)}
    <h2>Какво получавате</h2>
    ${rich(`@@blokove
### Оглед и консултация
Ще посетим обекта, ще обсъдим идеите ви и ще изготвим детайлна оферта без скрити разходи.
### Гаранция за качество
5 години гаранция за извършените от нас ремонтни дейности, записана в договора.
### Коректност и чистота
Спазваме сроковете и организираме обекта така, че стресът за вас и съседите да е минимален.
### Един екип
Координираме всички дейности, за да не се налага да търсите отделни майстори.
@@`)}
  </div>
  <aside class="strana" aria-label="Контакт"><div class="box box--tamno on-dark"><h2>Да поговорим за вашия ремонт</h2><p>Безплатен оглед във Варна и региона.</p>${btn('/kontakti/#forma', 'Изпратете запитване', { cls: 'btn--white' })}</div></aside></div>
  <section class="sek sek--tamno on-dark mt" aria-labelledby="h-otzivi"><div class="wrap">${sekGlava({ id: 'h-otzivi', eyebrow: 'Какво казват клиентите', h: 'Отзиви' })}${otzivi()}</div></section>` }));

// ---------- Блог ----------
add('/blog/', page({ path: '/blog/', title: 'Блог: съвети за ремонт', desc: 'Съвети за ремонт на жилища, бани, фасади и покриви във Варна: планиране, оферти, договори и избор на изпълнител.',
  crumbs: [['Начало', '/'], ['Блог', '/blog/']],
  body: `<section class="str-glava"><div class="wrap"><p class="eyebrow">Блог</p><h1>Полезно преди ремонта</h1><p class="lead">Съвети за планиране, оферти, договори и избор на изпълнител.</p></div></section>
  <section class="sek" style="padding-top:0" aria-label="Статии"><div class="wrap"><div class="grid g3">${STATII.map(s => statiyaKarta(s, 'h2')).join('')}</div></div></section>` }));

STATII.forEach((s) => {
  const drugi = STATII.filter(x => x.slug !== s.slug).slice(0, 3);
  add(`/blog/${s.slug}/`, page({ path: `/blog/${s.slug}/`, title: s.zaglavie, desc: s.opis, ogType: 'article',
    crumbs: [['Начало', '/'], ['Блог', '/blog/'], [s.zaglavie, `/blog/${s.slug}/`]],
    schema: [{ '@type': 'BlogPosting', headline: s.zaglavie, datePublished: s.data, inLanguage: 'bg', author: { '@id': SITE.url + '/#firma' }, publisher: { '@id': SITE.url + '/#firma' }, mainEntityOfPage: SITE.url + `/blog/${s.slug}/`, image: SITE.url + '/assets/img/og.png' }],
    body: `<article><header class="str-glava"><div class="wrap"><p class="meta"><span>${s.kat}</span><time datetime="${s.data}">${dataBg(s.data)}</time></p><h1 style="max-width:24ch">${s.zaglavie}</h1><p class="lead">${s.opis}</p></div></header>
    <div class="wrap izkl"><div class="prose">${md(s.text)}</div>
      <aside class="strana" aria-label="Контакт"><div class="box box--tamno on-dark"><h2>Планирате ремонт?</h2><p>Безплатен оглед и консултация във Варна и региона.</p>${btn('/kontakti/#forma', 'Заявете оглед', { cls: 'btn--white' })}</div></aside></div></article>
    <section class="sek" aria-labelledby="h-oshte"><div class="wrap">${sekGlava({ id: 'h-oshte', h: 'Прочетете и' })}<div class="grid g3">${drugi.map(d => statiyaKarta(d)).join('')}</div></div></section>` }));
});

// ---------- Контакти ----------
add('/kontakti/', page({ path: '/kontakti/', title: 'Контакти и безплатен оглед', desc: 'Свържете се с Ремонт Студио за безплатен оглед във Варна и региона: телефон, Viber, имейл или форма за запитване.', cta: false,
  crumbs: [['Начало', '/'], ['Контакти', '/kontakti/']],
  body: `<section class="str-glava"><div class="wrap"><p class="eyebrow">Свържете се с нас</p><h1>Заявете безплатен оглед</h1><p class="lead">Обадете се, пишете ни във Viber или изпратете запитване. Отговаряме до 1 работен ден.</p></div></section>
  <div class="wrap izkl" style="grid-template-columns:minmax(0,1fr)">
  <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));align-items:start">
    <div class="kontakti">
      <a class="kontakt" href="${SITE.telHref}"><span class="k-ic">${icon('phone')}</span><span><small>Телефон</small><b>${SITE.tel}</b></span></a>
      <a class="kontakt" href="${SITE.viber}"><span class="k-ic">${icon('viber')}</span><span><small>Viber</small><b>Пишете ни</b></span></a>
      <a class="kontakt" href="mailto:${SITE.email}"><span class="k-ic">${icon('mail')}</span><span><small>Имейл</small><b>${SITE.email}</b></span></a>
      <div class="kontakt"><span class="k-ic">${icon('pin')}</span><span><small>Работим в</small><b>Варна и региона</b></span></div>
      <div class="kontakt"><span class="k-ic">${icon('clock')}</span><span><small>Работно време</small><b>${SITE.rabotno}</b></span></div>
      <p class="belezhka">${SITE.firma} · ЕИК ${SITE.eik} · Варна 9000</p>
    </div>
    <form class="forma" id="forma" data-forma method="post" action="/api/zapitvane" novalidate aria-labelledby="forma-h">
      <h2 id="forma-h" style="font-size:1.5rem">Запитване за оглед</h2>
      <p class="belezhka">Полетата със звездичка (*) са задължителни. Оставете телефон или имейл.</p>
      <div class="status" role="status" tabindex="-1" data-status></div>
      <fieldset class="pole" style="border:0;padding:0;margin:0 0 18px"><legend>Какво ремонтирате?</legend>
        <div class="chips">${['Апартамент', 'Къща', 'Баня', 'Фасада', 'Покрив', 'Друго'].map(v => chip('vid', v, v, false, 'checkbox')).join('')}</div></fieldset>
      <div class="pole"><label for="ime">Име *</label><input id="ime" name="ime" type="text" autocomplete="name" required aria-describedby="err-ime"><span class="greshka" id="err-ime"></span></div>
      <div class="dva">
        <div class="pole"><label for="telefon">Телефон</label><input id="telefon" name="telefon" type="tel" inputmode="tel" autocomplete="tel" aria-describedby="err-telefon"><span class="greshka" id="err-telefon"></span></div>
        <div class="pole"><label for="email">Имейл</label><input id="email" name="email" type="email" autocomplete="email" aria-describedby="err-email"><span class="greshka" id="err-email"></span></div>
      </div>
      <div class="pole"><label for="koga">Кога планирате ремонта?</label><select id="koga" name="koga"><option value="">Изберете</option><option>До 1 месец</option><option>1–3 месеца</option><option>След 3 месеца</option><option>Още не знам</option></select></div>
      <div class="pole"><label for="saobshtenie">Съобщение <span class="hint">(по желание)</span></label><textarea id="saobshtenie" name="saobshtenie" aria-describedby="saob-h"></textarea><span class="hint" id="saob-h">Квартал, площ, какво искате да промените.</span></div>
      <div style="position:absolute;left:-9999px" aria-hidden="true"><label for="web">Не попълвайте</label><input id="web" name="web" tabindex="-1" autocomplete="off"></div>
      <div class="saglasie"><input id="saglasie" name="saglasie" type="checkbox" value="da" required aria-describedby="err-saglasie"><label for="saglasie">Съгласен/на съм личните ми данни да бъдат обработени за отговор на запитването. Вижте <a href="/deklaratsiya-za-lichni-danni/">декларацията</a> и <a href="/politika-za-poveritelnost/">политиката за поверителност</a>. *</label></div>
      <p class="greshka" id="err-saglasie" style="margin-top:-12px"></p>
      <button class="btn" type="submit">Изпратете запитването<span class="krag">${icon('arrow')}</span></button>
    </form>
  </div></div>` }));

// ---------- Правни страници ----------
add('/politika-za-poveritelnost/', page({ path: '/politika-za-poveritelnost/', title: 'Политика за поверителност', desc: 'Как Ремонт Студио обработва и защитава личните данни, изпратени чрез сайта.',
  crumbs: [['Начало', '/'], ['Политика за поверителност', '/politika-za-poveritelnost/']], cta: false,
  body: `<div class="wrap"><div class="prose"><h1>Политика за поверителност</h1>${md(`
Сайтът може да се разглежда без регистрация и без въвеждане на лични данни. Лични данни събираме само когато ни изпратите запитване през формата за контакт.
## Какви данни събираме и защо
Име, телефон и/или имейл, както и информацията, която сами напишете в съобщението. Използваме ги единствено, за да отговорим на запитването ви и да организираме оглед. Не ги предоставяме на трети страни за маркетинг.
## Колко време ги пазим
До приключване на комуникацията по запитването, а при сключен договор – в сроковете, предвидени в закона.
## Бисквитки
Сайтът не използва бисквитки за проследяване или реклама. Шрифтовете и всички ресурси се зареждат от нашия сървър, без външни услуги.
## Вашите права
Общият регламент относно защитата на данните (GDPR) ви дава право:
- на достъп до личните данни, които обработваме за вас;
- на коригиране на неточни или непълни данни;
- на изтриване („право да бъдеш забравен“);
- на ограничаване на обработването;
- на преносимост на данните;
- на възражение срещу обработването;
- да не бъдете обект на изцяло автоматизирано решение, включително профилиране.
Можете да упражните правата си с писмено заявление до нас лично, по пощата или по електронен път. Ако смятате, че правата ви са нарушени, можете да подадете жалба до Комисията за защита на личните данни, бул. „Проф. Цветан Лазаров“ № 2, София 1592, [www.cpdp.bg](https://www.cpdp.bg).
## Администратор на лични данни
${SITE.firma}, ЕИК ${SITE.eik}, Варна. Връзка: [${SITE.email}](mailto:${SITE.email}), ${SITE.tel}.
Последна актуализация: ноември 2026 г.`)}</div></div>` }));

add('/deklaratsiya-za-lichni-danni/', page({ path: '/deklaratsiya-za-lichni-danni/', title: 'Декларация за съгласие за обработка на лични данни', desc: 'Декларация за съгласие за обработка на личните данни, изпратени чрез формата за запитване.',
  crumbs: [['Начало', '/'], ['Декларация за лични данни', '/deklaratsiya-za-lichni-danni/']], cta: false,
  body: `<div class="wrap"><div class="prose"><h1>Декларация за съгласие за обработка на лични данни</h1>${md(`
С изпращането на запитване през формата давам съгласието си ${SITE.firma} да обработва посочените от мен данни (име, телефон, имейл и съдържание на съобщението) с цел отговор на запитването и организиране на оглед.
Запознат/а съм, че предоставянето на данните е доброволно и че мога да оттегля съгласието си по всяко време. Имам право на достъп, коригиране и изтриване на данните, както е описано в [политиката за поверителност](/politika-za-poveritelnost/).
Администратор на лични данни: ${SITE.firma}, ЕИК ${SITE.eik}, Варна. Връзка: [${SITE.email}](mailto:${SITE.email}), ${SITE.tel}.`)}</div></div>` }));

// ---------- 404 ----------
add('/404', page({ path: '/404/', title: 'Страницата не е намерена', desc: 'Страницата не е намерена.', cta: false,
  body: `<section class="sek"><div class="wrap center"><p class="chislo">404</p><h1>Тази страница я няма</h1><p class="lead" style="margin:0 auto 24px">Може би е преместена при обновяването на сайта. Започнете от началото или ни се обадете.</p>
  <div class="btns" style="justify-content:center">${btn('/', 'Към началото')}<a class="btn btn--light" href="${SITE.telHref}">${icon('phone')} ${SITE.tel}</a></div>
  <p class="mt"><a href="/uslugi/">Услуги</a> · <a href="/zavarsheni-obekti/">Обекти</a> · <a href="/blog/">Блог</a> · <a href="/kontakti/">Контакти</a></p></div></section>` }));

// ---------- запис ----------
const css = fs.readFileSync(path.join(ROOT, 'src/site.css'), 'utf8') + '\n/* Схема на апартамента */\n' + planCss();
fs.mkdirSync(path.join(OUT, 'assets/css'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'assets/css/site.css'), css);
const ver = crypto.createHash('sha1').update(css + fs.readFileSync(path.join(ROOT, 'public/assets/js/site.js')) + fs.readFileSync(path.join(ROOT, 'public/assets/js/konstruktor.js'))).digest('hex').slice(0, 8);

for (const [p, html] of Object.entries(files)) {
  const out = p === '/404' ? path.join(OUT, '404.html') : path.join(OUT, p, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html.replaceAll('__V__', ver));
}

const today = '2026-11-19';
const urls = Object.keys(files).filter(p => p !== '/404');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE.url}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
console.log(`Готово: ${urls.length + 1} страници в dist/ (${SITE.url})`);
