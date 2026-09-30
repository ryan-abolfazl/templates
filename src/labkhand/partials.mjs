import { html, icon, fa } from '../../tools/lib/html.mjs';
import { toothMark, portrait } from './art.mjs';
import { services } from './data.mjs';

export const logo = (ctx) => html`<a class="logo" href="${ctx.base}index.html" aria-label="کلینیک لبخند، صفحه اصلی"><span class="logo__mark">${toothMark()}</span><span>لبخند<small>کلینیک تخصصی دندانپزشکی</small></span></a>`;

const NAV = [
  ['home', 'index.html', 'خانه'],
  ['services', 'services.html', 'خدمات'],
  ['doctors', 'doctors.html', 'پزشکان'],
  ['gallery', 'gallery.html', 'نمونه کارها'],
  ['pricing', 'pricing.html', 'تعرفه و بیمه'],
  ['blog', 'blog.html', 'مجله سلامت'],
  ['contact', 'contact.html', 'تماس'],
];

export const header = (ctx) => html`
<header class="header" data-sticky-header>
  <div class="header__bar">
    <button class="icon-btn menu-btn" type="button" data-drawer-open="menu" aria-controls="menu" aria-expanded="false" aria-label="باز کردن منو">${icon('menu')}</button>
    ${logo(ctx)}
    <nav class="nav" aria-label="منوی اصلی">${NAV.map(([k, h, l]) => html`<a class="${ctx.page.active === k ? 'is-active' : ''}" href="${ctx.base}${h}" ${ctx.page.active === k ? 'aria-current="page"' : ''}>${l}</a>`)}</nav>
    <div class="header__actions">
      <a class="header__phone" href="tel:02188776655">${icon('phone')}<span>۰۲۱-۸۸۷۷۶۶۵۵</span></a>
      <button class="icon-btn" type="button" data-theme-toggle aria-label="تغییر حالت روشن و تاریک" aria-pressed="false">${icon('moon', 'theme-icon-light')}${icon('sun', 'theme-icon-dark')}</button>
      <a class="btn btn--primary btn--sm" href="${ctx.base}booking.html">${icon('calendar-plus')} رزرو نوبت</a>
    </div>
  </div>
</header>

<div class="drawer" id="menu" data-drawer>
  <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="منو">
    <div class="row-between">${logo(ctx)}<button class="icon-btn" type="button" data-drawer-close aria-label="بستن">${icon('x')}</button></div>
    <nav class="drawer__nav" aria-label="منوی موبایل">${NAV.map(([k, h, l]) => html`<a class="${ctx.page.active === k ? 'is-active' : ''}" href="${ctx.base}${h}">${l}</a>`)}</nav>
    <a class="btn btn--primary btn--block" href="${ctx.base}booking.html">${icon('calendar-plus')} رزرو آنلاین نوبت</a>
    <a class="btn btn--block" href="tel:02188776655">${icon('phone')} ۰۲۱-۸۸۷۷۶۶۵۵</a>
  </div>
</div>`;

export const footer = (ctx) => html`
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        ${logo(ctx)}
        <p class="footer__about">کلینیک لبخند با ۱۵ سال سابقه و تیمی از متخصصان، خدمات دندانپزشکی زیبایی، ایمپلنت، ارتودنسی و درمان‌های تخصصی را با جدیدترین تجهیزات دیجیتال ارائه می‌دهد.</p>
        <div class="footer__social"><a href="#" aria-label="اینستاگرام">${icon('camera')}</a><a href="#" aria-label="تلگرام">${icon('send')}</a><a href="#" aria-label="واتس‌اپ">${icon('message-circle')}</a></div>
      </div>
      <div><h3>خدمات</h3><ul class="list-plain">${services.slice(0, 5).map((s) => html`<li><a href="${ctx.base}service.html">${s.name}</a></li>`)}</ul></div>
      <div><h3>کلینیک</h3><ul class="list-plain"><li><a href="${ctx.base}doctors.html">پزشکان</a></li><li><a href="${ctx.base}gallery.html">نمونه کارها</a></li><li><a href="${ctx.base}pricing.html">تعرفه و بیمه</a></li><li><a href="${ctx.base}blog.html">مجله سلامت دهان</a></li><li><a href="${ctx.base}contact.html">تماس با ما</a></li></ul></div>
      <div>
        <h3>ساعات کاری</h3>
        <div class="footer__hours"><div><span>شنبه تا چهارشنبه</span><span>۹ تا ۲۱</span></div><div><span>پنجشنبه</span><span>۹ تا ۱۵</span></div><div><span>جمعه</span><span>اورژانس</span></div></div>
        <p class="small mt-2">تهران، خیابان ولیعصر، بالاتر از میدان ونک، کوچه شهید قبادیان، پلاک ۱۸</p>
      </div>
    </div>
    <div class="footer__bottom"><span>© ${fa('1405')} کلینیک دندانپزشکی لبخند · پروانه بهره‌برداری ۱۴۰۲/۴۵۸۲</span><a href="${ctx.base}documentation/index.html">حریم خصوصی بیماران</a></div>
  </div>
</footer>
<a class="scroll-top" href="#main" data-scroll-top aria-label="بازگشت به بالا">${icon('arrow-up')}</a>`;

export const doctorPortrait = (d) => portrait(d.kind, { skin: d.skin, hair: d.hair, scrub: d.scrub, bg: d.bg });

export const pageHero = (ctx, { title, sub, crumbs = [], eyebrow = '' }) => html`
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="مسیر صفحه"><a href="${ctx.base}index.html">خانه</a>${crumbs.map((c) => html`${icon('chevron-left')}${c.href ? html`<a href="${ctx.base}${c.href}">${c.label}</a>` : html`<span aria-current="page">${c.label}</span>`}`)}</nav>
    ${eyebrow ? html`<span class="eyebrow mt-2">${eyebrow}</span>` : ''}
    <h1>${title}</h1>
    ${sub ? html`<p>${sub}</p>` : ''}
  </div>
</section>`;

export const ctaBand = (ctx) => html`
<section class="section section--tight">
  <div class="container">
    <div class="cta glass">
      <div><h2>اولین مشاوره <b>رایگان</b> است</h2><p class="muted">نوبت آنلاین بگیرید؛ کمتر از یک دقیقه طول می‌کشد.</p></div>
      <div class="row wrap"><a class="btn btn--primary btn--lg" href="${ctx.base}booking.html">${icon('calendar-plus')} رزرو نوبت</a><a class="btn btn--lg" href="tel:02188776655">${icon('phone')} تماس تلفنی</a></div>
    </div>
  </div>
</section>`;
