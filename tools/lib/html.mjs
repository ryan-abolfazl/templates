// Tiny templating helpers used by src/<slug>/**/*.mjs page modules.

// Tagged template: arrays are joined, null/false/undefined render as nothing.
export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((v, i) => {
    out += render(v) + strings[i + 1];
  });
  return out;
}

function render(v) {
  if (v === null || v === undefined || v === false) return '';
  if (Array.isArray(v)) return v.map(render).join('');
  return String(v);
}

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

// Latin digits -> Persian digits. Numbers get thousands separators (٬).
export function fa(value) {
  if (typeof value === 'number') value = value.toLocaleString('en-US').replace(/,/g, '٬');
  return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[d]);
}

// 1250000 -> "۱٬۲۵۰٬۰۰۰ تومان"
export const toman = (n, unit = 'تومان') => `${fa(n)} ${unit}`.trim();

// Attribute-safe escaping for text we inject from data.
export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const cx = (...parts) => parts.filter(Boolean).join(' ');

// Lucide icon from the generated sprite (assets/js/icons.js). The build scans output for
// "#i-<name>" and bundles only used icons. Pass label for icons that carry meaning alone.
export function icon(name, cls = '', label = '') {
  const a11y = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"';
  return `<svg class="${cx('icon', cls)}" ${a11y}><use href="#i-${name}"></use></svg>`;
}

// Repeat helper: times(3, i => ...)
export const times = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));

// Deterministic pseudo-random so demo data is stable between builds.
export function seeded(seed = 1) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Inline <head> script: adds .js, then applies the saved theme, else the OS preference.
// `extra` is raw JS run inside the same try block (e.g. restoring a collapsed sidebar).
export const themeBoot = (defaultTheme = 'light', extra = '') => `<script>
      (function (d) {
        d.classList.add('js');
        try {
          var t = JSON.parse(localStorage.getItem('theme'));
          if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '${defaultTheme}';
          d.setAttribute('data-theme', t);
          ${extra}
        } catch (e) {}
      })(document.documentElement);
    </script>`;
