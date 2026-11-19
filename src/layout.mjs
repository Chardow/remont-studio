import { icon, logo } from './art.mjs';

export const SITE = {
  ime: 'Ремонт Студио',
  firma: '„РЕМОНТ СТУДИО“ ЕООД',
  eik: '000000000',
  url: (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://remont-studio-ten.vercel.app')).replace(/\/$/, ''),
  tel: '088 000 0000',
  telHref: 'tel:+359880000000',
  viber: 'viber://chat?number=%2B359880000000',
  email: 'kontakt@remont-studio.test',
  rabotno: 'Пн–Пт 8:30–18:00, Сб 9:00–13:00',
  grad: 'Варна',
};

export const USLUGI = [
  { slug: 'tsyalosten-remont-na-zhilishte', ime: 'Цялостен ремонт на жилище', kratko: 'От първия оглед до готовия дом, с един екип и ясен план.', icon: 'home', art: 'plan',
    opis: 'Цялостният ремонт на жилище е сериозна инвестиция, която изисква добра организация, правилна последователност на дейностите и координация между различните специалисти.', tagove: ['Къртене', 'ВиК и ел.', 'Замазки', 'Настилки', 'Почистване'] },
  { slug: 'remont-na-banya', ime: 'Ремонт на баня', kratko: 'Функционална баня, правилно изпълнена от основата до последния детайл.', icon: 'bath', art: 'banya',
    opis: 'Зад красивите плочки и модерния облик на една баня стоят редица строителни и монтажни дейности, които трябва да бъдат планирани и изпълнени в правилната последователност.', tagove: ['ВиК', 'Хидроизолация', 'Наклони', 'Плочки', 'Санитария'] },
  { slug: 'vanshna-toploizolatsiya-i-obnovyavane-na-fasadi', ime: 'Външна топлоизолация и обновяване на фасади', kratko: 'За жилищни кооперации и други сгради във Варна и региона.', icon: 'building', art: 'fasada',
    opis: 'Навременното обновяване на фасадата подобрява енергийната ефективност на сградата, ограничава проникването на влага и предотвратява по-сериозни повреди.', tagove: ['EPS', 'XPS', 'Каменна вата', 'Скеле', 'Мазилки'] },
  { slug: 'remont-na-pokrivi-i-hidroizolatsiya', ime: 'Ремонт на покриви и хидроизолация', kratko: 'С фокус върху плоски покриви на жилищни кооперации и други сгради.', icon: 'roof', art: 'pokriv',
    opis: 'Течове, влажни петна по таваните или задържане на вода върху покрива са сигнал, че е нужен оглед и преценка на състоянието му.', tagove: ['Течна гума', 'Битумни мембрани', 'Бордове', 'Отводнители'] },
];

export const NAV = [
  { href: '/kak-rabotim/', ime: 'Как работим' },
  { href: '/zavarsheni-obekti/', ime: 'Обекти' },
  { href: '/konstruktor/', ime: 'Цени' },
  { href: '/za-nas/', ime: 'За нас' },
  { href: '/blog/', ime: 'Блог' },
  { href: '/kontakti/', ime: 'Контакти' },
];

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const arrow = () => `<span class="krag">${icon('arrow')}</span>`;

export function btn(href, text, { cls = '', ic = true } = {}) {
  return `<a class="btn ${cls}" href="${href}">${text}${ic ? arrow() : ''}</a>`;
}
export const more = (href, text) => `<a class="more" href="${href}">${text}${icon('arrow')}</a>`;

function header(path) {
  const cur = (href) => (path === href || (href !== '/' && path.startsWith(href))) ? ' aria-current="page"' : '';
  const uslugiActive = path.startsWith('/uslugi/');
  return `<header class="glava">
  <div class="glava__in">
    <a class="marka" href="/"${path === '/' ? ' aria-current="page"' : ''}>${logo()}<span>РЕМОНТ СТУДИО</span><span class="sr-only">, към началната страница</span></a>
    <nav aria-label="Основна навигация">
      <ul class="nav">
        <li><button type="button" data-mega-btn aria-expanded="false" aria-controls="mega"${uslugiActive ? ' aria-current="page"' : ''}>Услуги${icon('chevron')}</button>
          <div class="mega" id="mega" hidden>
            ${USLUGI.map(u => `<a href="/uslugi/${u.slug}/"><span class="mi">${icon(u.icon)}</span><span><b>${u.ime}</b><small>${u.kratko}</small></span></a>`).join('')}
            <a href="/proces/"><span class="mi">${icon('level')}</span><span><b>Процесът стъпка по стъпка</b><small>12 етапа от огледа до ключа</small></span></a>
            <a href="/konstruktor/"><span class="mi">${icon('euro')}</span><span><b>Конструктор на ремонта</b><small>Ориентировъчна цена по пера</small></span></a>
            <a class="mega__all" href="/uslugi/">Всички услуги${icon('arrow')}</a>
          </div>
        </li>
        ${NAV.map(n => `<li><a href="${n.href}"${cur(n.href)}>${n.ime}</a></li>`).join('')}
      </ul>
    </nav>
    <div class="glava__desno">
      <a class="tel-link" href="${SITE.telHref}"><span class="krag">${icon('phone')}</span><span class="num">${SITE.tel}</span><span class="sr-only">Обадете се на ${SITE.tel}</span></a>
      ${btn('/kontakti/#forma', 'Безплатен оглед')}
      <button class="menu-btn" type="button" data-menu-open aria-expanded="false" aria-controls="mob-menu">${icon('menu')}<span class="sr-only">Меню</span></button>
    </div>
  </div>
</header>
<div class="mob" id="mob-menu" role="dialog" aria-modal="true" aria-label="Меню" hidden>
  <div class="mob__top"><a class="marka" href="/">${logo()}<span>РЕМОНТ СТУДИО</span></a>
    <button class="menu-btn" type="button" data-menu-close>${icon('close')}<span class="sr-only">Затвори менюто</span></button></div>
  <nav aria-label="Мобилна навигация">
    <h2>Услуги</h2>
    <ul>${USLUGI.map(u => `<li><a href="/uslugi/${u.slug}/">${u.ime}${icon('arrow')}</a></li>`).join('')}</ul>
    <h2>Ремонт Студио</h2>
    <ul>
      <li><a href="/">Начало${icon('arrow')}</a></li>
      ${NAV.map(n => `<li><a href="${n.href}">${n.ime === 'Цени' ? 'Цени и конструктор' : n.ime}${icon('arrow')}</a></li>`).join('')}
      <li><a href="/proces/">Процесът стъпка по стъпка${icon('arrow')}</a></li>
    </ul>
  </nav>
  <div class="mob__cta">
    ${btn('/kontakti/#forma', 'Заявете безплатен оглед')}
    <a class="btn btn--light" href="${SITE.telHref}">${icon('phone')} Обадете се: ${SITE.tel}</a>
    <a class="btn btn--light" href="${SITE.viber}">${icon('viber')} Пишете ни във Viber</a>
  </div>
</div>`;
}

export function ctaBand({ h = 'Заявете безплатен оглед за вашия ремонт във Варна', p = 'Обадете се, пишете ни във Viber или изпратете запитване. Отговаряме до 1 работен ден.' } = {}) {
  return `<section class="sek-cta" aria-labelledby="cta-h"><div class="wrap"><div class="cta on-dark">
    <div><h2 id="cta-h">${h}</h2><p>${p}</p></div>
    <div class="btns">
      <a class="btn btn--white" href="${SITE.telHref}">${icon('phone')} ${SITE.tel}</a>
      <a class="btn btn--ghost-dark" href="${SITE.viber}">${icon('viber')} Viber</a>
      ${btn('/kontakti/#forma', 'Изпратете запитване', { cls: 'btn--white' })}
    </div>
  </div></div></section>`;
}

function footer() {
  const year = 2026;
  return `<footer class="podval on-dark">
  <div class="wrap">
    <div class="podval__grid">
      <div>
        <a class="marka" href="/">${logo()}<span>РЕМОНТ СТУДИО</span></a>
        <p>Ремонти на жилища във Варна и региона. Поемаме целия процес, от огледа до финалното почистване.</p>
      </div>
      <div><h2>Услуги</h2><ul>${USLUGI.map(u => `<li><a href="/uslugi/${u.slug}/">${u.ime}</a></li>`).join('')}<li><a href="/konstruktor/">Конструктор на ремонта</a></li></ul></div>
      <div><h2>Ремонт Студио</h2><ul>
        <li><a href="/za-nas/">За нас</a></li><li><a href="/kak-rabotim/">Как работим</a></li><li><a href="/proces/">Процесът стъпка по стъпка</a></li>
        <li><a href="/zavarsheni-obekti/">Завършени обекти</a></li><li><a href="/blog/">Блог</a></li><li><a href="/kontakti/">Контакти</a></li></ul></div>
      <div><h2>Контакти</h2>
        <address>
          <a href="${SITE.telHref}">${icon('phone')}${SITE.tel}</a>
          <a href="${SITE.viber}">${icon('viber')}Viber</a>
          <a href="mailto:${SITE.email}">${icon('mail')}${SITE.email}</a>
          <span>${icon('pin')}Варна и региона</span>
          <span>${icon('clock')}${SITE.rabotno}</span>
        </address>
      </div>
    </div>
    <div class="podval__dolu">
      <p>© ${year} ${SITE.firma} · ЕИК ${SITE.eik} · Варна. Илюстрациите са създадени за сайта. Конкурсна задача, код NS-WYC5.</p>
      <ul><li><a href="/politika-za-poveritelnost/">Политика за поверителност</a></li><li><a href="/deklaratsiya-za-lichni-danni/">Декларация за лични данни</a></li></ul>
    </div>
  </div>
</footer>
<div class="lenta-mob" aria-label="Бърз контакт" role="region">
  <a class="btn btn--light" href="${SITE.telHref}">${icon('phone')} Обадете се</a>
  <a class="btn btn--plain" href="/kontakti/#forma">Безплатен оглед</a>
</div>`;
}

const ORG = () => ({
  '@type': 'HomeAndConstructionBusiness', '@id': SITE.url + '/#firma', name: SITE.ime, legalName: 'РЕМОНТ СТУДИО ЕООД', url: SITE.url + '/',
  telephone: '+359880000000', email: SITE.email, image: SITE.url + '/assets/img/og.png', logo: SITE.url + '/assets/img/logo.svg',
  address: { '@type': 'PostalAddress', addressLocality: 'Варна', postalCode: '9000', addressCountry: 'BG' },
  areaServed: [{ '@type': 'City', name: 'Варна' }, { '@type': 'AdministrativeArea', name: 'Област Варна' }],
  openingHours: ['Mo-Fr 08:30-18:00', 'Sa 09:00-13:00'], priceRange: '€€',
});

export function page({ path, title, desc, body, crumbs = null, schema = [], cta = true, scripts = ['site.js'], ogType = 'website' }) {
  const url = SITE.url + path;
  const fullTitle = path === '/' ? title : `${title} – ${SITE.ime}`;
  const ld = [{ '@context': 'https://schema.org', '@graph': [ORG(), ...schema,
    ...(crumbs ? [{ '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: SITE.url + c[1] })) }] : [])] }];
  const crumbsHtml = crumbs ? `<nav aria-label="Път до страницата"><ol class="troh">${crumbs.map((c, i) => i === crumbs.length - 1 ? `<li><span aria-current="page">${c[0]}</span></li>` : `<li><a href="${c[1]}">${c[0]}</a></li>`).join('')}</ol></nav>` : '';
  return `<!doctype html>
<html lang="bg">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#24345C">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${SITE.ime}">
<meta property="og:locale" content="bg_BG">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}/assets/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Ремонт Студио – ремонти на жилища във Варна">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/inter-400.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="/assets/fonts/inter-display-700.woff" as="font" type="font/woff" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=__V__">
<script type="application/ld+json">${JSON.stringify(ld[0])}</script>
${scripts.map(s => `<script type="module" src="/assets/js/${s}?v=__V__"></script>`).join('\n')}
</head>
<body>
<a class="skip" href="#sadarzhanie">Към съдържанието</a>
<p class="demo">Демо версия: телефонът, имейлът и ЕИК на сайта са примерни.</p>
${header(path)}
<main id="sadarzhanie" tabindex="-1">
${crumbs ? `<div class="wrap" style="padding-top:28px">${crumbsHtml}</div>` : ''}
${body}
${cta ? ctaBand() : ''}
</main>
${footer()}
</body>
</html>`;
}

// Минимален Markdown → HTML (заглавия, списъци, абзаци, връзки, удебелен текст)
export function md(src, { shift = 0 } = {}) {
  const inline = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  const out = []; let list = null;
  const close = () => { if (list) { out.push(`</${list}>`); list = null; } };
  for (const raw of src.trim().split('\n')) {
    const line = raw.trim();
    if (!line) { close(); continue; }
    let m;
    if ((m = line.match(/^(#{2,4}) (.*)$/))) { close(); const l = Math.min(6, m[1].length + shift); out.push(`<h${l}>${inline(m[2])}</h${l}>`); continue; }
    if ((m = line.match(/^- (.*)$/))) { if (list !== 'ul') { close(); out.push('<ul class="chek">'); list = 'ul'; } out.push(`<li>${inline(m[1])}</li>`); continue; }
    if ((m = line.match(/^\d+\. (.*)$/))) { if (list !== 'ol') { close(); out.push('<ol>'); list = 'ol'; } out.push(`<li>${inline(m[1])}</li>`); continue; }
    if ((m = line.match(/^> (.*)$/))) { close(); out.push(`<blockquote><p>${inline(m[1])}</p></blockquote>`); continue; }
    close(); out.push(`<p>${inline(line)}</p>`);
  }
  close();
  return out.join('\n');
}
