import { html, themeBoot } from '../../tools/lib/html.mjs';
import { header, footer } from './partials.mjs';
import { dish, DISHES } from './art.mjs';

const head = (ctx) => {
  const { site, page, base } = ctx;
  return html`<!doctype html>
<html lang="fa" dir="rtl" data-theme="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${page.title} | ${site.name}</title>
    <meta name="description" content="${page.description || site.description}" />
    <meta name="theme-color" content="#150d11" />
    <meta property="og:title" content="${page.title} | ${site.name}" />
    <meta property="og:description" content="${page.description || site.description}" />
    <meta property="og:locale" content="fa_IR" />
    <meta property="og:type" content="restaurant" />
    <link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml" />
    ${themeBoot('dark')}
    <link rel="preload" href="${base}assets/fonts/vazirmatn/Vazirmatn-wght.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="${base}assets/css/fonts.css" />
    <link rel="stylesheet" href="${base}assets/css/base.css" />
    <link rel="stylesheet" href="${base}assets/css/tokens.css" />
    <link rel="stylesheet" href="${base}assets/css/components.css" />
    <link rel="stylesheet" href="${base}assets/css/pages.css" />
    <script src="${base}assets/js/core.js" defer></script>
    <script src="${base}assets/js/main.js" defer></script>
  </head>`;
};

export default {
  name: 'رستوران زعفران',
  slug: 'zaferan',
  version: '1.0.0',
  description: 'قالب HTML رستوران ایرانی زعفران: منوی تعاملی، منوی QR، رزرو میز با تقویم شمسی و طراحی شبانه طلایی.',
  fonts: ['vazirmatn', 'lalezar', 'noto-nastaliq'],
  core: ['theme', 'nav', 'tabs', 'accordion', 'modal', 'toast', 'reveal', 'counter', 'carousel', 'lightbox', 'jalali', 'filter', 'form'],
  // Dish illustrations as standalone SVG files (used by <img> in the gallery + lightbox)
  generate(out, { fs, path }) {
    const dir = path.join(out, 'assets/img/dishes');
    fs.mkdirSync(dir, { recursive: true });
    for (const k of DISHES) {
      fs.writeFileSync(path.join(dir, `${k}.svg`), dish(k).replace('<svg class="dish " ', '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" ').replace(' aria-hidden="true"', ''));
    }
  },
  layouts: {
    main: (ctx, body) => html`${head(ctx)}
  <body class="${ctx.page.bodyClass || ''}">
    <script src="${ctx.base}assets/js/icons.js"></script>
    <a class="skip-link" href="#main">پرش به محتوای اصلی</a>
    ${header(ctx)}
    <main id="main">${body}</main>
    ${footer(ctx)}
  </body>
</html>`,
    blank: (ctx, body) => html`${head(ctx)}
  <body class="${ctx.page.bodyClass || ''}">
    <script src="${ctx.base}assets/js/icons.js"></script>
    <a class="skip-link" href="#main">پرش به محتوای اصلی</a>
    ${body}
  </body>
</html>`,
  },
};
