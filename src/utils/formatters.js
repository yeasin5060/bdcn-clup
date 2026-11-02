export function makeRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const pad2 = (n) => (n < 10 ? '0' : '') + n;

export const money = (n) => '৳' + new Intl.NumberFormat('en-IN').format(Math.round(n || 0));

export const hhmm = (d) => {
  const date = d instanceof Date ? d : new Date(d);
  return pad2(date.getHours()) + ':' + pad2(date.getMinutes());
};

export const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

export const sum = (arr, fn) => arr.reduce((s, x) => s + (fn ? fn(x) : x), 0);

export function qrSVG(seed, sz = 160) {
  const r = makeRandom(seed);
  const z = 21;
  const f = (x, y) =>
    `<rect x="${x}" y="${y}" width="7" height="7" fill="#111"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#111"/>`;

  let o = `<svg viewBox="0 0 21 21" width="${sz}" height="${sz}" shape-rendering="crispEdges">`;
  o += f(0, 0) + f(14, 0) + f(0, 14);

  for (let y = 0; y < z; y++) {
    for (let x = 0; x < z; x++) {
      if ((x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)) continue;
      if (r() < 0.45) {
        o += `<rect x="${x}" y="${y}" width="1" height="1" fill="#111"/>`;
      }
    }
  }
  o += '</svg>';
  return o;
}

