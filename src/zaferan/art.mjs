// Flat top-down illustrations of Persian dishes + ornament helpers for Zaferan.
// dish(kind) -> inline SVG (viewBox 0 0 200 200). All shapes are original.

const plate = (inner = '#f6efe2') =>
  `<circle cx="100" cy="100" r="96" fill="#e9dfcc"/><circle cx="100" cy="100" r="92" fill="#fbf7ef"/><circle cx="100" cy="100" r="74" fill="${inner}"/><circle cx="100" cy="100" r="84" fill="none" stroke="#1f8a8a" stroke-width="2" stroke-dasharray="2 6" opacity=".55"/>`;

const bowl = (fill) =>
  `<circle cx="100" cy="100" r="96" fill="#1f6f78"/><circle cx="100" cy="100" r="90" fill="none" stroke="#e9c46a" stroke-width="2" stroke-dasharray="1 7"/><circle cx="100" cy="100" r="80" fill="#f4ecdc"/><circle cx="100" cy="100" r="72" fill="${fill}"/>`;

const rice = (cx, cy, r) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fffaf0"/><path d="M${cx - r * 0.7} ${cy - r * 0.2}q${r * 0.7}-${r * 0.9} ${r * 1.4} 0q-${r * 0.3} ${r * 0.5}-${r * 0.7} ${r * 0.5}t-${r * 0.7}-${r * 0.5}Z" fill="#f2b632"/>` +
  Array.from({ length: 14 }, (_, i) => {
    const a = (i * 137.5 * Math.PI) / 180;
    const d = r * 0.3 + ((i * 7) % 10) * (r * 0.06);
    return `<rect x="${(cx + Math.cos(a) * d).toFixed(1)}" y="${(cy + Math.sin(a) * d).toFixed(1)}" width="5" height="1.6" rx=".8" fill="#e8dcc0" transform="rotate(${i * 40} ${(cx + Math.cos(a) * d).toFixed(1)} ${(cy + Math.sin(a) * d).toFixed(1)})"/>`;
  }).join('');

const herbs = (pts) => pts.map(([x, y, r = 5]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.55}" fill="#4f8a3a" transform="rotate(${x * 3} ${x} ${y})"/>`).join('');

const dots = (pts, fill, r = 3) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join('');

const D = {
  koobideh: () =>
    plate() +
    rice(82, 92, 44) +
    `<g transform="rotate(-18 130 110)"><rect x="96" y="112" width="92" height="17" rx="8.5" fill="#8a4a24"/><rect x="96" y="134" width="92" height="17" rx="8.5" fill="#9a5528"/>${[104, 118, 132, 146, 160, 174].map((x) => `<path d="M${x} 114v13M${x + 3} 136v13" stroke="#5e2f14" stroke-width="2.4" stroke-linecap="round"/>`).join('')}</g>` +
    `<circle cx="146" cy="72" r="15" fill="#c8362e"/><path d="M140 66q6 6 12 0" stroke="#7f1d17" stroke-width="2" fill="none"/><circle cx="146" cy="72" r="5" fill="#e0574b"/>` +
    `<circle cx="60" cy="150" r="12" fill="none" stroke="#caa6d8" stroke-width="3"/><circle cx="74" cy="158" r="9" fill="none" stroke="#caa6d8" stroke-width="3"/>` +
    herbs([[112, 58], [120, 50, 4], [104, 50, 4], [48, 128]]) +
    dots([[92, 164], [98, 170], [86, 170]], '#8b1c2c', 2.2),
  joojeh: () =>
    plate() +
    rice(118, 90, 44) +
    [[52, 110], [70, 128], [58, 142], [80, 146], [66, 96], [88, 114], [48, 126]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="20" height="17" rx="5" fill="${['#e2842c', '#d97420', '#ea9433'][i % 3]}" transform="rotate(${i * 23} ${x + 10} ${y + 8})"/><path d="M${x + 4} ${y + 4}l10 9" stroke="#a24f10" stroke-width="2" opacity=".6"/>`).join('') +
    `<path d="M128 146q14-10 28 0" fill="#f6d34a"/><circle cx="142" cy="150" r="10" fill="#f8e27a"/>` +
    herbs([[100, 150], [110, 158], [96, 160, 4]]),
  ghormeh: () =>
    bowl('#3f5a26') +
    Array.from({ length: 18 }, (_, i) => {
      const a = i * 2.4;
      const d = 12 + ((i * 11) % 50);
      return `<circle cx="${(100 + Math.cos(a) * d).toFixed(1)}" cy="${(100 + Math.sin(a) * d).toFixed(1)}" r="${2 + (i % 3)}" fill="#2c4418"/>`;
    }).join('') +
    [[80, 86], [112, 80], [98, 118], [128, 112], [72, 120]].map(([x, y]) => `<rect x="${x}" y="${y}" width="16" height="13" rx="4" fill="#7a3f22"/>`).join('') +
    [[92, 70], [120, 132], [66, 104], [136, 92], [104, 98], [84, 138]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3.4" fill="#9c2f25"/>`).join('') +
    `<circle cx="140" cy="70" r="7" fill="#e7cf7a"/><path d="M137 70h6" stroke="#b08a2a" stroke-width="1.5"/>`,
  fesenjan: () =>
    bowl('#4a2419') +
    `<path d="M50 96q50-30 100 0" stroke="#6a3526" stroke-width="10" fill="none" opacity=".6"/>` +
    [[84, 90], [110, 104], [92, 122], [124, 84]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="#6f3a22"/>`).join('') +
    dots(Array.from({ length: 22 }, (_, i) => [100 + Math.cos(i * 2.2) * (14 + ((i * 7) % 46)), 100 + Math.sin(i * 2.2) * (14 + ((i * 7) % 46))]), '#d6243f', 3.2) +
    [[70, 70], [132, 128], [66, 128]].map(([x, y]) => `<path d="M${x} ${y}q6-8 12 0q-6 8-12 0Z" fill="#c9a36a"/>`).join(''),
  tahdig: () =>
    plate('#fbf7ef') +
    `<circle cx="100" cy="100" r="66" fill="#d98a22"/><circle cx="100" cy="100" r="66" fill="none" stroke="#9e5a0e" stroke-width="3"/>` +
    [[100, 34, 100, 166], [34, 100, 166, 100], [54, 54, 146, 146], [146, 54, 54, 146]].map(([a, b, c, d]) => `<path d="M${a} ${b}L${c} ${d}" stroke="#b86e14" stroke-width="2.4" opacity=".7"/>`).join('') +
    `<circle cx="100" cy="100" r="44" fill="#e9a33a"/>` +
    Array.from({ length: 30 }, (_, i) => `<circle cx="${(100 + Math.cos(i * 1.7) * ((i * 13) % 58)).toFixed(1)}" cy="${(100 + Math.sin(i * 1.7) * ((i * 13) % 58)).toFixed(1)}" r="1.8" fill="#8f4f0a" opacity=".5"/>`).join(''),
  ash: () =>
    bowl('#b48a4f') +
    Array.from({ length: 10 }, (_, i) => `<path d="M${40 + i * 12} ${60 + (i % 3) * 30}q10 12 0 28" stroke="#e8d3a2" stroke-width="3" fill="none" opacity=".7"/>`).join('') +
    `<path d="M62 100q38-34 76 0q-38 34-76 0Z" fill="none" stroke="#fff6e3" stroke-width="9" stroke-linecap="round"/>` +
    `<path d="M86 100q14-12 28 0q-14 12-28 0Z" fill="#fff6e3"/>` +
    dots([[100, 100], [92, 96], [108, 104]], '#2f4f1f', 3.5) +
    `<path d="M70 70q10 6 20 0M112 132q10 6 20 0M60 120q8 4 16 0" stroke="#6b3a17" stroke-width="5" stroke-linecap="round" fill="none"/>`,
  sholeh: () =>
    bowl('#f2c230') +
    `<g stroke="#8a4b1c" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"><path d="M100 50q20 20 0 40q-20-20 0-40Z"/><path d="M100 110q20 20 0 40q-20-20 0-40Z"/><path d="M50 100q20-20 40 0q-20 20-40 0Z"/><path d="M110 100q20-20 40 0q-20 20-40 0Z"/><circle cx="100" cy="100" r="6"/></g>` +
    dots([[80, 70], [122, 74], [76, 128], [126, 128]], '#6a9f3a', 3.2) +
    dots([[86, 64], [116, 136]], '#c43a52', 2.4),
  chai: () =>
    `<circle cx="100" cy="100" r="92" fill="#1f6f78"/><circle cx="100" cy="100" r="86" fill="none" stroke="#e9c46a" stroke-width="2.5" stroke-dasharray="3 5"/>` +
    `<circle cx="100" cy="100" r="54" fill="#f4ecdc" opacity=".25"/><circle cx="100" cy="100" r="42" fill="#fbf7ef"/><circle cx="100" cy="100" r="36" fill="#a33b12"/><circle cx="100" cy="100" r="36" fill="url(#chaiShine)"/>` +
    `<defs><radialGradient id="chaiShine" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#e06a2c"/><stop offset="1" stop-color="#7a1f08" stop-opacity="0"/></radialGradient></defs>` +
    `<rect x="148" y="64" width="12" height="54" rx="4" fill="#f2c94c" transform="rotate(24 154 91)"/>` +
    [[46, 62], [40, 136], [150, 146]].map(([x, y]) => `<rect x="${x}" y="${y}" width="14" height="12" rx="3" fill="#fffaf0" transform="rotate(12 ${x + 7} ${y + 6})"/>`).join(''),
  shirazi: () =>
    bowl('#f6f0e2') +
    Array.from({ length: 34 }, (_, i) => {
      const a = i * 2.39;
      const d = 6 + ((i * 17) % 60);
      const x = (100 + Math.cos(a) * d).toFixed(1);
      const y = (100 + Math.sin(a) * d).toFixed(1);
      return `<rect x="${x}" y="${y}" width="10" height="10" rx="2" fill="${['#d8352f', '#7cab3c', '#f2eee4', '#b9d77a'][i % 4]}" transform="rotate(${i * 21} ${x} ${y})"/>`;
    }).join('') +
    herbs([[80, 80], [124, 118], [96, 134], [118, 70]]),
  doogh: () =>
    `<circle cx="100" cy="100" r="92" fill="#e6ddcc"/><circle cx="100" cy="100" r="60" fill="#dfe9e6"/><circle cx="100" cy="100" r="52" fill="#fbfbf7"/>` +
    `<path d="M92 88q14-18 28-4q-6 20-28 4Z" fill="#4f8a3a"/><path d="M96 88l18 0" stroke="#2e5a20" stroke-width="1.5"/>` +
    dots([[80, 112], [118, 118], [104, 126], [86, 96]], '#d6e4c8', 2.4),
};

export const DISHES = Object.keys(D);
let uid = 0;
export const dish = (kind, cls = '') =>
  `<svg class="dish ${cls}" viewBox="0 0 200 200" aria-hidden="true">${D[kind]().replaceAll('chaiShine', `cs${++uid}`)}</svg>`;

// 8-point girih star tile as a CSS background data URI (color-agnostic via opacity)
// Returned as url('…') with apostrophes escaped so it can sit inside style="…" attributes.
export const girih = (stroke = '#e3a33b', op = 0.18) =>
  `url('data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><g fill='none' stroke='${stroke}' stroke-opacity='${op}' stroke-width='1.2'><path d='M40 8l9 23 23 9-23 9-9 23-9-23-23-9 23-9z'/><path d='M17.4 17.4 40 26.8l22.6-9.4L53.2 40l9.4 22.6L40 53.2l-22.6 9.4L26.8 40z'/><circle cx='40' cy='40' r='7'/><path d='M0 0l8 8M80 0l-8 8M0 80l8-8M80 80l-8-8'/></g></svg>`
  ).replace(/'/g, '%27')}')`;

// Decorative divider: ✦ with gold lines
export const ornament = () =>
  `<svg class="ornament" viewBox="0 0 160 20" aria-hidden="true"><path d="M0 10h60M100 10h60" stroke="currentColor" stroke-width="1"/><path d="M80 2l4 8-4 8-4-8z" fill="currentColor"/><circle cx="68" cy="10" r="2" fill="currentColor"/><circle cx="92" cy="10" r="2" fill="currentColor"/></svg>`;
