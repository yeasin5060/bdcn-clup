import { TIER } from '../data/constants';
import { MENU_ITEMS } from '../data/initialData';
import { esc, makeRandom } from './formatters';

export const mStatus = (m) => (m.over === 0 ? 'Active' : m.over >= 3 ? 'Suspended' : 'Overdue');

export const mDue = (m) => m.over * (TIER[m.tier]?.m || 0);

export const calcBill = (table) => {
  let subtotal = 0;
  if (table && table.lines) {
    table.lines.forEach((l) => {
      const item = MENU_ITEMS[l.k];
      if (item) subtotal += item.p * l.q;
    });
  }
  const sc = Math.round(subtotal * 0.1);
  const vat = Math.round((subtotal + sc) * 0.15);
  const total = subtotal + sc + vat;
  return { s: subtotal, sc, v: vat, g: total };
};

export const fitText = (s, maxW, base, min) => {
  let w = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    w += /[\u4e00-\u9fff]/.test(c) ? 1 : /[\u0980-\u09FF]/.test(c) ? 0.72 : /\s/.test(c) ? 0.3 : 0.58;
  }
  return Math.max(min, Math.min(base, maxW / (w || 1)));
};

export const makeLanternSvg = (x, y, s) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-14 -18C-22 -6 -22 10 -13 20L13 20C22 10 22 -6 14 -18Z" fill="#d8362a"/>
    <path d="M0 -18V20M-8 -17C-12 -4 -11 10 -7 20M8 -17C12 -4 11 10 7 20" stroke="rgba(255,205,130,.4)" fill="none"/>
    <rect x="-10" y="-23" width="20" height="5" fill="#e8b04a"/>
    <rect x="-10" y="20" width="20" height="4" fill="#e8b04a"/>
    <path d="M0 24V46" stroke="#e8b04a" stroke-width="2"/>
  </g>
`;

export const getPosterSvgString = (f) => {
  const F = "'Noto Serif Display','Noto Serif Bengali','Noto Serif SC',serif";
  let g = '';

  if (f.theme === 'lantern') {
    g += '<path d="M80 80H520" stroke="#e8b04a" stroke-width="2"/>';
    [[110, 1], [205, 1.15], [300, 1.3], [395, 1.15], [490, 1]].forEach((p, j) => {
      g += `<path d="M${p[0]} 80V${100 + (j % 2) * 14}" stroke="#e8b04a"/>` + makeLanternSvg(p[0], 130 + (j % 2) * 14 + (p[1] - 1) * 40, p[1]);
    });
  } else if (f.theme === 'bridge') {
    g += '<circle cx="300" cy="212" r="64" fill="#e0412f"/><rect x="60" y="268" width="480" height="70" fill="#08241c"/><path d="M90 268Q300 118 510 268" fill="none" stroke="#e8b04a" stroke-width="7"/><path d="M70 268H530" stroke="#e8b04a" stroke-width="6"/>';
    for (let i = 1; i < 8; i++) {
      const t = i / 8;
      const y = (1 - t) * (1 - t) * 268 + 2 * (1 - t) * t * 118 + t * t * 268;
      g += `<path d="M${90 + t * 420} ${y}V268" stroke="#e8b04a" stroke-width="2"/>`;
    }
    [284, 298, 312].forEach((y, j) => {
      g += `<path d="M80 ${y} q20 -7 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#37c597" stroke-opacity="${0.55 - j * 0.12}" stroke-width="2"/>`;
    });
  } else if (f.theme === 'tea') {
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * 6.283;
      g += `<circle cx="${(300 + Math.cos(a) * 118).toFixed(1)}" cy="${(228 + Math.sin(a) * 118).toFixed(1)}" r="${i % 2 ? 3 : 4.5}" fill="#e8b04a" opacity=".7"/>`;
    }
    g += '<path d="M232 206h136c0 50-26 80-68 80s-68-30-68-80z" fill="#f4efe2"/><path d="M370 220c34 0 34 42 0 42" fill="none" stroke="#f4efe2" stroke-width="8"/><path d="M236 226h128" stroke="#e0412f" stroke-width="6"/><ellipse cx="300" cy="292" rx="92" ry="9" fill="#e8b04a"/><path d="M270 190c-10-14 10-22 0-38M300 190c-10-14 10-22 0-38M330 190c-10-14 10-22 0-38" fill="none" stroke="#e8b04a" stroke-width="3" stroke-linecap="round" opacity=".8"/>';
  }

  const z = fitText(f.zh, 470, 54, 22);
  const b = fitText(f.bn, 470, 40, 18);
  const e = fitText(f.en, 470, 30, 14);

  return `
    <svg viewBox="0 0 600 820" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Invitation preview" class="w-full h-auto rounded-lg shadow-lg">
      <defs>
        <linearGradient id="pbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#08241c"/>
          <stop offset="1" stop-color="#0d3a2d"/>
        </linearGradient>
        <pattern id="lat" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M2 2h16v16H2zM6 6h8v8H6z" fill="none" stroke="#e8b04a" stroke-opacity=".5"/>
        </pattern>
      </defs>
      <rect width="600" height="820" fill="url(#pbg)"/>
      <rect x="20" y="20" width="560" height="780" fill="url(#lat)"/>
      <rect x="46" y="46" width="508" height="728" fill="url(#pbg)" stroke="#e8b04a" stroke-width="1.5"/>
      ${g}
      <text x="300" y="420" text-anchor="middle" font-family="${F}" font-weight="700" font-size="${z}" fill="#f1f3ec">${esc(f.zh)}</text>
      <text x="300" y="486" text-anchor="middle" font-family="${F}" font-weight="700" font-size="${b}" fill="#e8b04a">${esc(f.bn)}</text>
      <text x="300" y="540" text-anchor="middle" font-family="${F}" font-size="${e}" fill="#d4dfd7">${esc(f.en)}</text>
      <path d="M200 574H400" stroke="#e0412f" stroke-width="2"/>
      <circle cx="300" cy="574" r="5" fill="#e0412f"/>
      <text x="300" y="620" text-anchor="middle" font-family="${F}" font-size="${fitText(f.date + '  ' + f.time, 440, 26, 15)}" fill="#f1f3ec">${esc(f.date)}   ${esc(f.time)}</text>
      <text x="300" y="660" text-anchor="middle" font-family="${F}" font-size="${fitText(f.venue, 440, 22, 13)}" fill="#d4dfd7">${esc(f.venue)}</text>
      <text x="300" y="700" text-anchor="middle" font-family="sans-serif" font-size="${fitText(f.rsvp, 440, 16, 11)}" fill="#98b0a5">${esc(f.rsvp)}</text>
      <text x="300" y="750" text-anchor="middle" font-family="${F}" font-size="18" fill="#e8b04a">বাংলাদেশ–চীন মৈত্রী   孟中友好</text>
    </svg>
  `;
};

export const getMemberLedger = (m) => {
  const seed = m.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 7);
  const r = makeRandom(seed);
  return [
    ['Monthly subscription', -(TIER[m.tier]?.m || 0)],
    ['Silk Route dinner', -Math.round((1500 + r() * 4000) / 10) * 10],
    ['Tea Garden Café', -Math.round((200 + r() * 600) / 10) * 10],
    ['Payment received (bKash)', TIER[m.tier]?.m || 0],
    ['Gym day pass', -500]
  ];
};

