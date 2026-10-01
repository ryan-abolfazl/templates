import { html, themeBoot } from '../../tools/lib/html.mjs';
import { header, footer } from './partials.mjs';

const head = (ctx) => {
  const { site, page, base } = ctx;
  return html`<!doctype html>
<html lang="fa" dir="rtl" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${page.title} | ${site.name}</title>
    <meta name="description" content="${page.description || site.description}" />
    <meta name="theme-color" content="#f5f5f7" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0b0b0f" media="(prefers-color-scheme: dark)" />
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

export default {
  name: 'آکادمی دانش',
  slug: 'danesh',
  version: '2.0.0',
  description: 'قالب HTML آموزش آنلاین دانش: فروش دوره، پلیر درس، داشبورد دانشجو و بلاگ با طراحی مینیمال شیشه‌ای و حالت تاریک.',
  fonts: ['vazirmatn', 'estedad'],
  core: ['theme', 'nav', 'tabs', 'accordion', 'modal', 'toast', 'reveal', 'counter', 'carousel', 'charts', 'filter', 'form', 'commerce'],
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
