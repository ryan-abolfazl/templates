import { html, themeBoot } from '../../tools/lib/html.mjs';
import { sidebar, topbar, appFooter, commandPalette } from './partials.mjs';

const head = (ctx) => {
  const { site, page, base } = ctx;
  return html`<!doctype html>
<html lang="fa" dir="rtl" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${page.title} | ${site.name}</title>
    <meta name="description" content="${page.description || site.description}" />
    <meta name="theme-color" content="#4f46e5" />
    <meta property="og:title" content="${page.title} | ${site.name}" />
    <meta property="og:description" content="${page.description || site.description}" />
    <meta property="og:locale" content="fa_IR" />
    <meta property="og:type" content="website" />
    <link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml" />
    ${themeBoot('light', "if (JSON.parse(localStorage.getItem('pishkhan-sidebar'))) d.classList.add('sidebar-collapsed');")}
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
  name: 'پیشخوان',
  slug: 'pishkhan',
  version: '1.0.0',
  description: 'قالب HTML پنل مدیریت پیشخوان: داشبورد فروشگاهی راست‌چین با حالت تاریک، نمودار، تقویم شمسی و بیش از ۲۰ صفحه آماده.',
  fonts: ['vazirmatn'],
  core: ['theme', 'nav', 'tabs', 'accordion', 'modal', 'toast', 'counter', 'charts', 'jalali', 'table', 'filter', 'form', 'commerce'],
  layouts: {
    // Admin shell: sidebar + topbar + content
    app: (ctx, body) => html`${head(ctx)}
  <body class="${ctx.page.bodyClass || ''}">
    <script src="${ctx.base}assets/js/icons.js"></script>
    <a class="skip-link" href="#main">پرش به محتوای اصلی</a>
    <div class="app">
      ${sidebar(ctx)}
      <div class="app__main">
        ${topbar(ctx)}
        <main id="main" class="page">${body}</main>
        ${appFooter(ctx)}
      </div>
    </div>
    ${commandPalette(ctx)}
  </body>
</html>`,

    // Auth / error pages: no shell
    blank: (ctx, body) => html`${head(ctx)}
  <body class="${ctx.page.bodyClass || ''}">
    <script src="${ctx.base}assets/js/icons.js"></script>
    <a class="skip-link" href="#main">پرش به محتوای اصلی</a>
    ${body}
  </body>
</html>`,
  },
};
