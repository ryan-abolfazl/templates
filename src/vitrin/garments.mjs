// Flat editorial garment illustrations used in place of product photos.
// garment(kind, color, { flip }) returns an inline SVG. `color` tints the piece;
// darker details come from CSS (.g-d uses color-mix on currentColor).

const P = {
  tee: `<path d="M60 44 85 32q15 14 30 0l25 12 30 30-20 22-12-10v124H62V86l-12 10-20-22Z"/><path class="g-d" d="M85 32q15 14 30 0l3 2q-18 20-36 0Z"/><path class="g-l" d="M62 190h76"/>`,
  shirt: `<path d="m62 44 24-10 14 12 14-12 24 10 24 22 10 88-18 4-12-64v114H58V94l-12 64-18-4 10-88Z"/><path class="g-d" d="M86 34 100 58l14-24 8 4-14 22h-16L78 38Z"/><path class="g-l" d="M100 58v150"/><circle class="g-d" cx="100" cy="80" r="3"/><circle class="g-d" cx="100" cy="110" r="3"/><circle class="g-d" cx="100" cy="140" r="3"/><circle class="g-d" cx="100" cy="170" r="3"/><path class="g-d" d="M112 96h18v14h-18Z"/>`,
  dress: `<path d="M84 30h32l2 30q24 10 14 38l34 112q-66 18-132 0L68 98q-10-28 14-38Z"/><path class="g-d" d="M68 98h64l-3 12H71Z"/><path class="g-l" d="M84 30v28M116 30v28M84 118l-18 90M100 118v96M116 118l18 90"/>`,
  coat: `<path d="m64 38 24-10 12 22 12-22 24 10 24 24 10 110-18 2-8-72 4 122H52l4-122-8 72-18-2 10-110Z"/><path class="g-d" d="m88 28 12 22 12-22 10 6-18 50h-8L78 34Z"/><path class="g-d" d="M56 122h88v12H56Z"/><rect class="g-l2" x="92" y="120" width="16" height="16" rx="2"/><circle class="g-d" cx="88" cy="150" r="3.5"/><circle class="g-d" cx="112" cy="150" r="3.5"/><circle class="g-d" cx="88" cy="176" r="3.5"/><circle class="g-d" cx="112" cy="176" r="3.5"/><path class="g-l" d="M100 84v140"/>`,
  pants: `<path d="M62 30h76l8 188h-36l-10-126-10 126H54Z"/><path class="g-d" d="M62 30h76l1 14H61Z"/><path class="g-l" d="M80 44l-6 170M120 44l6 170M100 44v44"/><path class="g-l" d="M68 44q4 18 18 22M132 44q-4 18-18 22"/>`,
  skirt: `<path d="M70 52h60l38 150q-68 16-136 0Z"/><path class="g-d" d="M70 52h60l2 12H68Z"/><path class="g-l" d="M84 64 70 206M100 64v146M116 64l14 142"/>`,
  bag: `<path class="g-s" d="M74 96q0-54 26-54t26 54" fill="none"/><path d="M48 92h104l10 118H38Z"/><path class="g-d" d="M48 92h104l1 12H47Z"/><rect class="g-l2" x="88" y="118" width="24" height="10" rx="2"/>`,
  shoe: `<path d="M28 150q0-28 30-30l42-10q20-12 32 8 30 10 44 32 6 18-6 26H36q-10-4-8-26Z"/><path class="g-l2" d="M30 160h148l-4 18H34Z"/><path class="g-l" d="m96 118 10 18M108 114l10 18M120 114l8 16"/><path class="g-d" d="M140 124q20 8 32 26h-24Z"/>`,
  hat: `<path d="M60 124q0-64 40-64t40 64Z"/><path class="g-d" d="M60 110h80v14H60Z"/><path d="M34 132q66-26 132 0l-8 16q-58-18-116 0Z"/>`,
  sweater: `<path d="M64 42q36 18 72 0l26 22 14 104-20 4-14-74v110H58V98l-14 74-20-4 14-104Z"/><path class="g-d" d="M58 194h84v14H58ZM24 160l20 4-2 10-20-4ZM176 160l-20 4 2 10 20-4Z"/><path class="g-s" d="M76 40q24 20 48 0" fill="none"/><path class="g-l" d="M72 110h56M72 130h56M72 150h56M72 170h56"/>`,
  scarf: `<path d="M72 30h56v70l-12 110h-28l6-90-16 92H50l18-112Z"/><path class="g-l" d="M72 60h56M72 80h56"/><path class="g-d" d="M50 200h28l-2 10H48ZM88 200h28v10H88Z"/>`,
  jacket: `<path d="m66 40 22-8 12 16 12-16 22 8 26 26 8 90-18 4-10-60v84H58v-84l-10 60-18-4 8-90Z"/><path class="g-d" d="m88 32 12 16 12-16 8 6-16 26h-8L80 38Z"/><path class="g-d" d="M58 176h84v14H58Z"/><path class="g-l" d="M100 64v126M66 100h24v18H66ZM110 100h24v18h-24Z"/>`,
};

export const KINDS = Object.keys(P);

export const garment = (kind, color, { flip = false, cls = '' } = {}) =>
  `<svg class="garment ${cls}" viewBox="0 0 200 240" aria-hidden="true" style="color:${color}${flip ? ';transform:scaleX(-1)' : ''}"><g fill="currentColor">${P[kind]}</g></svg>`;
