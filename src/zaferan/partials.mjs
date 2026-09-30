import { html, icon, fa } from '../../tools/lib/html.mjs';
import { girih, ornament } from './art.mjs';
import { hours } from './data.mjs';

export const logo = (ctx) => html`<a class="logo" href="${ctx.base}index.html" aria-label="رستوران زعفران، صفحه اصلی"><b>زعفران</b><span>رستوران ایرانی · از ۱۳۶۸</span></a>`;

const NAV_R = [
  ['home', 'index.html', 'خانه'],
  ['menu', 'menu.html', 'منو'],
  ['about', 'about.html', 'داستان ما'],
  ['gallery', 'gallery.html', 'گالری'],
];
const NAV_L = [
  ['events', 'events.html', 'مراسم و کترینگ'],
  ['contact', 'contact.html', 'تماس'],
];

const link = (ctx, [k, h, l]) => html`<a class="${ctx.page.active === k ? 'is-active' : ''}" href="${ctx.base}${h}" ${ctx.page.active === k ? 'aria-current="page"' : ''}>${l}</a>`;

export const header = (ctx) => html`
<header class="header" data-sticky-header>
  <div class="container header__inner">
    <nav class="nav" aria-label="منوی اصلی">${NAV_R.map((n) => link(ctx, n))}</nav>
    <button class="icon-btn menu-btn" type="button" data-drawer-open="menu" aria-controls="menu" aria-expanded="false" aria-label="باز کردن منو">${icon('menu')}</button>
    ${logo(ctx)}
    <div class="header__tools">
      <nav class="nav nav--end" aria-label="منوی دوم">${NAV_L.map((n) => link(ctx, n))}</nav>
      <button class="icon-btn" type="button" data-theme-toggle aria-label="تغییر حالت روشن و تاریک" aria-pressed="false">${icon('sun', 'theme-icon-dark')}${icon('moon', 'theme-icon-light')}</button>
      <a class="btn btn--gold btn--sm" href="${ctx.base}reservation.html">رزرو میز</a>
    </div>
  </div>
</header>

<div class="drawer" id="menu" data-drawer>
  <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="منو">
    <div class="row-between">${logo(ctx)}<button class="icon-btn" type="button" data-drawer-close aria-label="بستن">${icon('x')}</button></div>
    <nav class="drawer__nav" aria-label="منوی موبایل">${[...NAV_R, ...NAV_L, ['qr', 'qr-menu.html', 'منوی دیجیتال (QR)']].map(([k, h, l]) => html`<a class="${ctx.page.active === k ? 'is-active' : ''}" href="${ctx.base}${h}">${l}</a>`)}</nav>
    <a class="btn btn--gold btn--block" href="${ctx.base}reservation.html">${icon('calendar-heart')} رزرو میز</a>
    <p class="small muted">${icon('phone')} ۰۲۱-۲۲۶۶۳۳۴۴</p>
  </div>
</div>`;

export const footer = (ctx) => html`
<footer class="footer">
  <div class="pattern" style="background-image:${girih('#e3a33b', 0.08)}"></div>
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand stack">
        ${logo(ctx)}
        <p>از سال ۱۳۶۸، طعم آشپزخانه‌های قدیمی ایران را با همان دستورهای مادربزرگ‌ها و زعفران قائنات سر میز شما می‌آوریم.</p>
        <p class="callig" style="font-size:var(--text-lg)">سفره‌ای به رنگ زعفران</p>
      </div>
      <div><h3>ساعات کاری</h3><ul class="list-plain">${hours.slice(0, 2).map(([d, h]) => html`<li>${d}<br /><span class="gold">${h}</span></li>`)}</ul></div>
      <div><h3>دسترسی سریع</h3><ul class="list-plain"><li><a href="${ctx.base}menu.html">منوی کامل</a></li><li><a href="${ctx.base}qr-menu.html">منوی دیجیتال QR</a></li><li><a href="${ctx.base}reservation.html">رزرو میز</a></li><li><a href="${ctx.base}events.html">مراسم و کترینگ</a></li><li><a href="${ctx.base}gallery.html">گالری</a></li></ul></div>
      <div><h3>تماس</h3><ul class="list-plain"><li>تهران، الهیه، خیابان فرشته، کوچه نیلوفر، پلاک ۹</li><li><a href="tel:02122663344">۰۲۱-۲۲۶۶۳۳۴۴</a></li><li><a href="${ctx.base}contact.html">مسیریابی و پارکینگ</a></li></ul></div>
    </div>
    <div class="footer__bottom"><span>© ${fa('1405')} رستوران زعفران · همه حقوق محفوظ است.</span><a href="${ctx.base}documentation/index.html">قوانین و حریم خصوصی</a></div>
  </div>
</footer>
<a class="scroll-top" href="#main" data-scroll-top aria-label="بازگشت به بالا">${icon('arrow-up')}</a>`;

export const pageHero = (ctx, { title, callig = '', sub = '', crumbs = [] }) => html`
<section class="page-hero">
  <div class="pattern" style="background-image:${girih()}"></div>
  <div class="container center stack" style="justify-items:center;--gap:.75rem">
    <nav class="breadcrumb" aria-label="مسیر صفحه"><a href="${ctx.base}index.html">خانه</a>${crumbs.map((c) => html`${icon('chevron-left')}<span aria-current="page">${c}</span>`)}</nav>
    ${callig ? html`<p class="callig" style="font-size:var(--text-xl)">${callig}</p>` : ''}
    <h1>${title}</h1>
    ${ornament()}
    ${sub ? html`<p class="muted" style="max-inline-size:36rem">${sub}</p>` : ''}
  </div>
</section>`;

export const TAG_CLASS = { 'گیاهی': 'tag--veg', 'گیاهی موجود': 'tag--veg', 'امضای سرآشپز': 'tag--red' };
