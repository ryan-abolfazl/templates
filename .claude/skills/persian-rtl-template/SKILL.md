---
name: persian-rtl-template
description: House conventions for building a Persian RTL HTML template in this repo, covering the src/ page-module format, head boilerplate, CSS architecture, core JS data-attribute API, Persian content and typography rules. Load before creating or editing anything under src/ or templates/.
---

# Persian RTL template conventions

## 1. Source format

Each template is `src/<slug>/`. Pages are JS modules rendered by `tools/build.mjs`:

```js
// src/<slug>/pages/courses.mjs
import { html, fa, toman, icon } from '../../../tools/lib/html.mjs';
import { header, footer, courseCard } from '../partials.mjs';
import { courses } from '../data.mjs';

export const meta = { title: 'دوره‌ها', description: '…', active: 'courses', layout: 'main' /* out: 'shop/index.html' */ };

export default (ctx) => html`
  ${header(ctx)}
  <main id="main">
    ${courses.map((c) => courseCard(ctx, c))}
  </main>
  ${footer(ctx)}
`;
```

- `ctx.base` is the relative prefix to the template root ('' or '../'). Always write asset and page URLs as `${ctx.base}assets/...`.
- `ctx.nav('key')` returns ` is-active" aria-current="page` when `meta.active === 'key'`. Use it as `class="nav__link${ctx.nav('courses')}"`.
- `icon('name', 'extra-class', 'optional label')` emits `<svg class="icon"><use href="#i-name">`. Names are Lucide names (see `vendor/lucide/icons.json`). The build bundles only used icons and fails on unknown names.
- In runtime JS strings, write icon refs literally (`'#i-check'`) so the build's scan finds them.
- `fa(1250000)` gives `۱٬۲۵۰٬۰۰۰`; `toman(n)` gives `… تومان`. Never type Latin digits in visible Persian copy.

## 2. Layout / head boilerplate (inside `site.mjs` layouts)

```html
<!doctype html>
<html lang="fa" dir="rtl" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title} | ${site.name}</title>
  <meta name="description" content="…">
  <meta name="theme-color" content="…">
  <meta property="og:title" …> <meta property="og:locale" content="fa_IR">
  <link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml">
  <script>/* before paint: .js class + saved theme */
    (function(d){d.classList.add('js');try{var t=JSON.parse(localStorage.getItem('theme'));if(t)d.setAttribute('data-theme',t)}catch(e){}})(document.documentElement)
  </script>
  <link rel="preload" href="${base}assets/fonts/…woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${base}assets/css/fonts.css">
  <link rel="stylesheet" href="${base}assets/css/base.css">
  <link rel="stylesheet" href="${base}assets/css/tokens.css">
  <link rel="stylesheet" href="${base}assets/css/components.css">
  <link rel="stylesheet" href="${base}assets/css/pages.css">
  <script src="${base}assets/js/core.js" defer></script>
  <script src="${base}assets/js/main.js" defer></script>
</head>
<body>
  <script src="${base}assets/js/icons.js"></script>   <!-- first thing in body, sync -->
  <a class="skip-link" href="#main">پرش به محتوای اصلی</a>
  …
```

## 3. CSS architecture

- `base.css` (shared, from `src/_core`): reset, `.sr-only`, `.skip-link`, `.icon`, `.icon-flip`, `.ltr`, `[data-reveal]`, reduced motion.
- `tokens.css`: all design decisions as custom properties on `:root` + `[data-theme='dark']` overrides:
  `--bg --surface --surface-2 --text --text-muted --border --primary --primary-contrast --accent --success --warning --danger`,
  `--font-body --font-display`, type scale `--text-xs … --text-5xl` (use `clamp()` for display sizes), `--radius-*`, `--shadow-*`,
  `--space-*` (4/8pt), `--ease-out`, `--container`. Charts read `--chart-1 … --chart-6`.
- `components.css`: buttons, inputs, cards, badges, nav, drawer, dropdown, modal, toast, tabs, accordion, tables, pagination, date picker (`.dp`), chart (`.chart__*`), lightbox.
- `pages.css`: page-specific sections.
- Class naming: BEM-ish (`.card`, `.card__title`, `.card--featured`), state classes `.is-active .is-open .is-visible .is-loading .is-invalid`.
- Logical properties only. `inset-inline-start`, `margin-inline-end`, `border-start-start-radius`, `text-align: start`.
- Container: `.container { width: min(100% - 2rem, var(--container)); margin-inline: auto; }`
- Numbers in tables/prices: `font-variant-numeric: tabular-nums;`
- Body line-height for Persian: 1.8–2.0. Headings 1.3–1.45. Persian has no uppercase, and `letter-spacing` breaks joined letters, so never use it on Persian text.

## 4. Core JS API (`src/_core/js`, list modules in `site.core`)

| module | markup |
|---|---|
| util (always) | `UI.fa/en/toman/jdate/store/on/ready/debounce`, `[data-copy]` |
| theme | `[data-theme-toggle]`, event `themechange` |
| nav | `[data-drawer-open=id]` + `#id[data-drawer]` + `[data-drawer-close]`; `[data-dropdown]>[data-dropdown-toggle]+[data-dropdown-menu]`; `[data-sticky-header]`; `[data-scroll-top]` |
| tabs | `[data-tabs]` with `role=tablist/tab/tabpanel`, `aria-controls` |
| accordion | `<details>` inside `[data-accordion="single"]` |
| modal | `<dialog id class="modal">` + `[data-modal-open=id]` + `[data-modal-close]` |
| toast | `UI.toast(msg, 'success'|'error'|'info')`, `[data-toast="…"]` |
| reveal | `[data-reveal]`, parent `[data-reveal-stagger]` |
| counter | `[data-count-to="1200"][data-count-suffix="+"]` |
| carousel | `[data-carousel]>[data-carousel-track]` + `[data-carousel-prev/next]` + `[data-carousel-dots]`, `data-autoplay` |
| lightbox | `a[data-lightbox="group"][data-caption]` |
| compare | `[data-compare]` + range input → `--pos` |
| charts | `[data-chart='{"type":"area|line|bar|donut|sparkline",…}']` |
| jalali | `UI.jalali.*`, `input[data-datepicker]` |
| table | `[data-table]` + `[data-table-search]`, `[data-table-filter=col]`, `th [data-sort]`, `[data-select-all]`, `[data-select-row]`, `[data-table-pager]` |
| filter | `[data-filter]` + `[data-filter-btn]`, `[data-filter-item][data-tags]`, `[data-filter-search]`, `[data-filter-empty]` |
| form | `form[data-validate][data-success="…"]`, `[data-password-toggle]`, `[data-otp]` |
| commerce | `[data-qty]`, `[data-range]`, `[data-countdown]`, `[data-add-to-cart]`, `[data-cart-count]`, `[data-wishlist]` |

Template-specific behavior goes in `src/<slug>/assets/js/main.js` as a classic IIFE using `UI`.

## 5. Persian content rules

- Write like a native Iranian copywriter. Short, warm, confident. Avoid literal English calques.
- Use ZWNJ: `می‌خواهم`, `دوره‌ها`, `طراحی‌شده`. Use Persian punctuation: `،` `؛` `؟` `«»`.
- Use ی/ک (Persian), never ي/ك (Arabic).
- Realistic Iranian demo data: names (سارا محمدی، علی رضایی), cities (تهران، شیراز، اصفهان، مشهد، تبریز),
  phone `۰۲۱-۸۸۶۶۴۴۲۲`, mobile `۰۹۱۲ ۳۴۵ ۶۷۸۹`, postal code, addresses (خیابان ولیعصر، کوچه …).
- Dates: Jalali (e.g. `۸ مهر ۱۴۰۵`). Currency: تومان. Week starts Saturday (شنبه); Friday (جمعه) is the weekend.
- Emails, URLs and code are Latin inside `.ltr` spans.

## 6. Images

No stock photos (licensing). Use: bespoke inline/external SVG illustrations, CSS gradient/mesh art, pattern
backgrounds (girih/Persian geometry for traditional niches), abstract product silhouettes, and avatar monograms
(initials on colored circles). Where a real photo is expected, use a styled placeholder `<div class="ph" role="img" aria-label="…">`
with a subtle icon, and document "replace with your own images" in the docs.
