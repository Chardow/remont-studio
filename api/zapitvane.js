// Vercel Serverless Function: приема запитванията от формата в /kontakti/.
// Работи и без JavaScript в браузъра (обикновен POST с пренасочване).
// Изпращане по имейл: задайте RESEND_API_KEY и ZAPITVANE_TO в настройките на Vercel.
// Без тях функцията проверява данните и връща demo: true (нищо не се изпраща).

const MAX = { ime: 120, telefon: 40, email: 200, saobshtenie: 4000, koga: 40, vid: 200 };

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const raw = await new Promise((resolve, reject) => {
    let data = ''; req.on('data', (c) => { data += c; if (data.length > 20000) reject(new Error('too large')); });
    req.on('end', () => resolve(data)); req.on('error', reject);
  });
  const type = req.headers['content-type'] || '';
  if (type.includes('application/json')) return JSON.parse(raw || '{}');
  const p = new URLSearchParams(raw); const o = {};
  for (const [k, v] of p) o[k] = o[k] ? `${o[k]}, ${v}` : v;
  return o;
}

function validate(d) {
  const errs = {};
  const clean = {};
  for (const k of Object.keys(MAX)) clean[k] = String(d[k] ?? '').trim().slice(0, MAX[k]);
  const digits = clean.telefon.replace(/\D/g, '');
  if (!clean.ime) errs.ime = 'Липсва име';
  if (!digits && !clean.email) errs.kontakt = 'Липсва телефон или имейл';
  if (digits && digits.length < 9) errs.telefon = 'Невалиден телефон';
  if (clean.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean.email)) errs.email = 'Невалиден имейл';
  if (!d.saglasie) errs.saglasie = 'Липсва съгласие';
  return { errs, clean };
}

const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export default async function handler(req, res) {
  const wantsJson = (req.headers.accept || '').includes('application/json');
  const reply = (status, body, redirect) => {
    if (!wantsJson && redirect) { res.statusCode = 303; res.setHeader('Location', redirect); return res.end(); }
    res.statusCode = status; res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.end(JSON.stringify(body));
  };
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return reply(405, { ok: false, greshka: 'Само POST' }); }

  let data;
  try { data = await readBody(req); } catch { return reply(400, { ok: false, greshka: 'Невалидни данни' }, '/kontakti/?greshka=1#forma'); }
  if (data.web) return reply(200, { ok: true }, '/kontakti/?izprateno=1#forma'); // капан за ботове

  const { errs, clean } = validate(data);
  if (Object.keys(errs).length) return reply(422, { ok: false, greshka: 'Непълни данни', poleta: errs }, '/kontakti/?greshka=1#forma');

  const key = process.env.RESEND_API_KEY, to = process.env.ZAPITVANE_TO;
  if (!key || !to) {
    console.log('Получено запитване (демо режим, не е изпратено по имейл).');
    return reply(200, { ok: true, demo: true }, '/kontakti/?izprateno=1#forma');
  }
  const rows = [['Име', clean.ime], ['Телефон', clean.telefon], ['Имейл', clean.email], ['Какво', clean.vid], ['Кога', clean.koga], ['Съобщение', clean.saobshtenie]];
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.ZAPITVANE_FROM || 'Ремонт Студио <onboarding@resend.dev>', to: [to], reply_to: clean.email || undefined,
      subject: `Ново запитване: ${clean.ime}`,
      html: `<table>${rows.map(([k, v]) => `<tr><th align="left">${k}</th><td>${escapeHtml(v || '—').replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>`,
    }),
  }).catch(() => null);
  if (!r || !r.ok) return reply(502, { ok: false, greshka: 'Неуспешно изпращане' }, '/kontakti/?greshka=1#forma');
  return reply(200, { ok: true }, '/kontakti/?izprateno=1#forma');
}
