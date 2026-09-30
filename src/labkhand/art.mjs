// Flat illustrations for Labkhand: smiles (before/after), faceless doctor portraits, tooth mark.

// A smile: lips + two rows of teeth. `after` = white, even; before = stained, uneven.
let uid = 0;
export function smile({ after = false, tone = '#f3b7a6' } = {}) {
  const id = `m${++uid}`;
  const upper = [];
  const lower = [];
  const n = 8;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = 58 + i * 23;
    const lift = Math.sin(t * Math.PI) * 10; // arch
    const w = i === 3 || i === 4 ? 24 : i === 2 || i === 5 ? 21 : 19;
    const h = i === 3 || i === 4 ? 34 : i === 2 || i === 5 ? 30 : 26;
    const jitter = after ? 0 : [3, -2, 4, -1, 2, -4, 1, 3][i];
    const rot = after ? 0 : [4, -3, 6, -2, 3, -5, 2, 5][i];
    const fill = after ? '#ffffff' : ['#efe3bf', '#e8d69f', '#f1e6c6', '#e4cf92', '#ecdcae', '#e6d49c', '#f0e4c0', '#e2cb8a'][i];
    const y = 88 - lift + jitter;
    upper.push(`<rect x="${x - w / 2}" y="${y}" width="${w - (after ? 1.5 : 3)}" height="${h}" rx="7" fill="${fill}" transform="rotate(${rot} ${x} ${y + h / 2})"/>`);
    const ly = 124 - lift * 0.6 - (after ? 0 : jitter / 2);
    lower.push(`<rect x="${x - w / 2 + 1}" y="${ly}" width="${w - (after ? 3 : 5)}" height="${h * 0.62}" rx="6" fill="${fill}" transform="rotate(${-rot / 2} ${x} ${ly})"/>`);
  }
  return `<svg class="smile" viewBox="0 0 240 200" aria-hidden="true">
    <defs><clipPath id="${id}"><path d="M40 92q80-40 160 0q-10 70-80 74q-70-4-80-74Z"/></clipPath></defs>
    <path d="M22 96q98-66 196 0q-18 96-98 100q-80-4-98-100Z" fill="${tone}"/>
    <path d="M40 92q80-40 160 0q-10 70-80 74q-70-4-80-74Z" fill="#7a2f35"/>
    <g clip-path="url(#${id})">
      <rect x="40" y="60" width="160" height="40" fill="#e8a3a3"/>
      ${upper.join('')}
      <rect x="40" y="150" width="160" height="30" fill="#e8a3a3"/>
      ${lower.join('')}
    </g>
    <path d="M40 92q80-26 160 0" fill="none" stroke="${tone}" stroke-width="7" stroke-linecap="round"/>
    ${after ? '<g fill="#fff"><path d="m190 52 3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/><path d="m44 40 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" opacity=".8"/></g>' : ''}
  </svg>`;
}

// Faceless flat portrait. kind: 'man' | 'woman' | 'beard'
export function portrait(kind = 'man', { skin = '#e9b99b', hair = '#2f2622', scrub = '#1c8a86', bg = '#dff3ef' } = {}) {
  const hairShape = {
    man: `<path d="M78 70q2-34 42-36 40 2 42 36-8-14-42-16-34 2-42 16Z" fill="${hair}"/>`,
    beard: `<path d="M78 70q2-34 42-36 40 2 42 36-8-14-42-16-34 2-42 16Z" fill="${hair}"/><path d="M88 106q4 28 32 30 28-2 32-30-8 10-32 11-24-1-32-11Z" fill="${hair}"/><path d="M106 112q14-6 28 0-14 5-28 0Z" fill="${hair}"/>`,
    // maghnae (hood-style headscarf): frames the face, covers forehead, neck and shoulders
    woman: `<path d="M62 158q-8-118 58-122 66 4 58 122-12-4-22-26 0-66-36-68-36 2-36 68-8 22-22 26Z" fill="${hair}"/><path d="M86 118q34 34 68 0l10 50H76Z" fill="${hair}"/><path d="M84 66q36-20 72 0" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="3"/>`,
  }[kind];
  const behind = kind === 'woman' ? `<path d="M48 206q4-74 72-76 68 2 72 76Z" fill="${hair}"/>` : '';
  return `<svg class="portrait" viewBox="0 0 240 240" aria-hidden="true">
    <rect width="240" height="240" fill="${bg}"/>
    <circle cx="190" cy="54" r="30" fill="#fff" opacity=".55"/>
    ${behind}
    <path d="M40 240q4-78 80-80 76 2 80 80Z" fill="${scrub}"/>
    <path d="M96 164l24 34 24-34" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round" opacity=".7"/>
    <path d="M150 176q16 10 12 34" fill="none" stroke="#dfe7ea" stroke-width="4" stroke-linecap="round"/>
    <circle cx="162" cy="214" r="6" fill="#dfe7ea"/>
    <rect x="108" y="126" width="24" height="30" rx="10" fill="${skin}"/>
    <ellipse cx="120" cy="92" rx="36" ry="42" fill="${skin}"/>
    ${hairShape}
  </svg>`;
}

// Brand mark: a soft tooth
export const toothMark = (cls = '') =>
  `<svg class="${cls}" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.5 4C6 4 4 7 4 10.5c0 3 1.2 5 2 7.5.9 2.8 1 9 3.6 9 2.2 0 2.1-5.6 3.6-7.6.7-.9 2.9-.9 3.6 0 1.5 2 1.4 7.6 3.6 7.6 2.6 0 2.7-6.2 3.6-9 .8-2.5 2-4.5 2-7.5C28 7 26 4 22.5 4c-2.6 0-4.3 1.6-6.5 1.6S12.1 4 9.5 4Z" fill="currentColor"/></svg>`;
