import { html, themeBoot } from '../../tools/lib/html.mjs';
import { header, footer } from './partials.mjs';
import { products } from './data.mjs';

const head = (ctx) => {
  const { site, page, base } = ctx;
  return html`<!doctype html>
<html lang="fa" dir="rtl" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${page.title} | ${site.name}</title>
    <meta name="description" content="${page.description || site.description}" />
    <meta name="theme-color" content="#faf8f4" />
    <meta property="og:title" content="${page.title} | ${site.name}" />
    <meta property="og:description" content="${page.description || site.description}" />
    <meta property="og:locale" content="fa_IR" />
    <meta property="og:type" content="website" />
    <link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml" />
    ${themeBoot('light')}
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

const withCart = (ctx) => ({ ...ctx, cartItems: [products[0], products[10]] });

export default {
  name: 'ویترین',
  slug: 'vitrin',
  version: '1.0.0',
  description: 'قالب HTML فروشگاه پوشاک ویترین: طراحی ادیتوریال مینیمال، فیلتر محصولات، صفحه محصول کامل، سبد و پرداخت.',
  fonts: ['vazirmatn', 'noto-kufi'],
  core: ['theme', 'nav', 'tabs', 'accordion', 'modal', 'toast', 'reveal', 'carousel', 'filter', 'form', 'commerce'],
  layouts: {
    main: (ctx, body) => html`${head(ctx)}
  <body class="${ctx.page.bodyClass || ''}">
    <script src="${ctx.base}assets/js/icons.js"></script>
    <a class="skip-link" href="#main">پرش به محتوای اصلی</a>
    ${header(withCart(ctx))}
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
