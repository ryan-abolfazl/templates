import { html, icon, fa, toman } from '../../tools/lib/html.mjs';
import { categories, instructors, catOf } from './data.mjs';

// One letter reads better than two in small round avatars. tone is kept for API compatibility; monograms are neutral.
export const initials = (name) => name.trim()[0];

export const avatar = (name, tone = 'lime', size = '') => html`<span class="avatar ${size ? `avatar--${size}` : ''}" aria-hidden="true">${initials(name)}</span>`;

const logoMark = html`<span class="logo__mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 2 9l10 5 10-5-10-5Z"/><path d="M6 11.5V16c3 2.5 9 2.5 12 0v-4.5"/><path d="M22 9v6"/></svg></span>`;

export const logo = (ctx, light = false) => html`<a class="logo" href="${ctx.base}index.html" aria-label="آکادمی دانش، صفحه اصلی">${logoMark}<span>دانش<small>آکادمی آنلاین</small></span></a>`;

const NAV = [
  ['courses', 'courses.html', 'دوره‌ها'],
  ['paths', 'index.html#paths', 'مسیرهای یادگیری'],
  ['pricing', 'pricing.html', 'اشتراک ویژه'],
  ['blog', 'blog.html', 'مجله'],
  ['contact', 'contact.html', 'تماس با ما'],
];

export const header = (ctx) => html`
<div class="announce">جشنواره مهر: <b>۴۰٪ تخفیف</b> همه دوره‌ها تا <b data-countdown data-hours="70"><span data-unit="d">۰۲</span> روز و <span data-unit="h">۲۲</span>:<span data-unit="m">۰۰</span>:<span data-unit="s">۰۰</span></b> دیگر · <a href="${ctx.base}courses.html">مشاهده دوره‌ها</a></div>
<header class="header" data-sticky-header>
  <div class="container header__inner">
    <button class="icon-btn menu-btn" type="button" data-drawer-open="menu" aria-controls="menu" aria-expanded="false" aria-label="باز کردن منو">${icon('menu')}</button>
    ${logo(ctx)}
    <nav class="nav" aria-label="منوی اصلی">
      <div data-dropdown>
        <button class="nav__link" type="button" data-dropdown-toggle aria-expanded="false">دسته‌بندی‌ها ${icon('chevron-down')}</button>
        <div class="mega" data-dropdown-menu>
          <div class="mega__cats">
            ${categories.map(
              (c) => html`<a class="mega__cat" href="${ctx.base}courses.html"><span class="mega__icon">${icon(c.icon)}</span><span><b>${c.name}</b><span>${fa(c.count)} دوره</span></span></a>`
            )}
          </div>
          <div class="mega__promo">
            <span class="badge tone-accent" style="align-self:flex-start">${icon('crown')} اشتراک دانش پلاس</span>
            <h3>دسترسی نامحدود به بیش از ۳۰۰ دوره با یک اشتراک</h3>
            <a class="btn btn--primary btn--sm" href="${ctx.base}pricing.html">مشاهده طرح‌ها ${icon('arrow-left')}</a>
          </div>
        </div>
      </div>
      ${NAV.map(([k, href, label]) => html`<a class="nav__link${ctx.nav(k)}" href="${ctx.base}${href}">${label}</a>`)}
    </nav>
    <div class="header__actions">
      <button class="icon-btn hide-md" type="button" data-modal-open="search" aria-label="جستجو">${icon('search')}</button>
      <button class="icon-btn" type="button" data-theme-toggle aria-label="تغییر حالت روشن و تاریک" aria-pressed="false">${icon('moon', 'theme-icon-light')}${icon('sun', 'theme-icon-dark')}</button>
      <a class="icon-btn" href="${ctx.base}cart.html" aria-label="سبد خرید">${icon('shopping-bag')}<span class="count" data-cart-count>۲</span></a>
      <a class="btn btn--primary btn--sm hide-md" href="${ctx.base}login.html">ورود | ثبت‌نام</a>
    </div>
  </div>
</header>

<div class="drawer" id="menu" data-drawer>
  <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="منوی موبایل">
    <div class="row-between">${logo(ctx)}<button class="icon-btn" type="button" data-drawer-close aria-label="بستن منو">${icon('x')}</button></div>
    <form class="input-icon" action="${ctx.base}courses.html">${icon('search')}<input class="input" type="search" placeholder="جستجوی دوره…" aria-label="جستجوی دوره" /></form>
    <nav class="drawer__nav" aria-label="منوی موبایل">
      <a href="${ctx.base}index.html" class="${ctx.nav('home').trim() ? 'is-active' : ''}">${icon('house')} خانه</a>
      <a href="${ctx.base}courses.html">${icon('library-big')} همه دوره‌ها</a>
      <a href="${ctx.base}dashboard.html">${icon('layout-dashboard')} داشبورد من</a>
      <a href="${ctx.base}pricing.html">${icon('crown')} اشتراک ویژه</a>
      <a href="${ctx.base}blog.html">${icon('newspaper')} مجله</a>
      <a href="${ctx.base}contact.html">${icon('phone')} تماس با ما</a>
    </nav>
    <a class="btn btn--primary btn--block" href="${ctx.base}login.html">ورود یا ثبت‌نام</a>
  </div>
</div>

<dialog class="modal" id="search" aria-label="جستجو">
  <form class="modal__body stack" action="${ctx.base}courses.html">
    <div class="input-icon">${icon('search')}<input class="input" type="search" name="q" placeholder="چه چیزی می‌خواهید یاد بگیرید؟" aria-label="جستجوی دوره" autofocus /></div>
    <div class="row wrap">${['جاوااسکریپت', 'فیگما', 'آیلتس', 'پایتون', 'سئو'].map((t) => html`<a class="chip" href="${ctx.base}courses.html">${t}</a>`)}</div>
  </form>
</dialog>`;

export const footer = (ctx) => html`
<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        ${logo(ctx)}
        <p class="footer__about">دانش، آکادمی آنلاین مهارت‌های آینده است. با دوره‌های پروژه‌محور، مدرسان باتجربه و پشتیبانی واقعی، مسیر یادگیری تا استخدام را کوتاه‌تر می‌کنیم.</p>
        <div class="footer__social">
          <a href="#" aria-label="اینستاگرام">${icon('camera')}</a>
          <a href="#" aria-label="تلگرام">${icon('send')}</a>
          <a href="#" aria-label="یوتیوب">${icon('tv-minimal-play')}</a>
          <a href="#" aria-label="لینکدین">${icon('briefcase-business')}</a>
        </div>
      </div>
      <div><h3>دوره‌ها</h3><ul class="list-plain">${categories.slice(0, 5).map((c) => html`<li><a href="${ctx.base}courses.html">${c.name}</a></li>`)}</ul></div>
      <div><h3>دانش</h3><ul class="list-plain"><li><a href="${ctx.base}instructor.html">مدرسان</a></li><li><a href="${ctx.base}pricing.html">اشتراک ویژه</a></li><li><a href="${ctx.base}blog.html">مجله دانش</a></li><li><a href="${ctx.base}certificate.html">استعلام گواهی</a></li><li><a href="${ctx.base}contact.html">همکاری با ما</a></li></ul></div>
      <div><h3>پشتیبانی</h3><ul class="list-plain"><li><a href="${ctx.base}contact.html">تماس با ما</a></li><li><a href="${ctx.base}pricing.html#faq">پرسش‌های متداول</a></li><li><a href="${ctx.base}documentation/index.html">قوانین و مقررات</a></li><li>۰۲۱-۹۱۰۰۲۰۳۰</li></ul></div>
      <div class="footer__news">
        <h3>خبرنامه</h3>
        <p class="small">هر هفته یک نکته یادگیری و تخفیف‌های اختصاصی.</p>
        <form class="newsletter" data-validate data-success="عضویت شما در خبرنامه ثبت شد"><label class="sr-only" for="nl">ایمیل</label><input class="input ltr" id="nl" type="email" required placeholder="email@example.com" /><button class="btn btn--primary btn--icon" type="submit" aria-label="عضویت">${icon('arrow-left')}</button></form>
        <div class="trust mt-2">
          <div class="trust__badge">${icon('badge-check')}جای نماد اعتماد الکترونیکی</div>
          <div class="trust__badge">${icon('shield-check')}جای نشان ساماندهی</div>
        </div>
      </div>
    </div>
    <div class="footer__bottom"><p>© ${fa('1405')} آکادمی دانش. تمامی حقوق محفوظ است.</p><p>طراحی‌شده در تهران</p></div>
  </div>
</footer>
<button class="btn btn--icon scroll-top" type="button" data-scroll-top aria-label="بازگشت به بالا">${icon('arrow-up')}</button>`;

export const price = (p, old) =>
  p === 0
    ? html`<div class="price price--free"><b>رایگان</b></div>`
    : html`<div class="price">${old ? html`<del>${fa(old)}</del>` : ''}<b>${fa(p)} <small>تومان</small></b></div>`;

export const cover = (c, cls = '') => html`<div class="cover c-${c.tone} ${cls}">
  ${c.badge ? html`<span class="badge tone-dark cover__tag">${c.badge}</span>` : ''}
  <span class="cover__icon">${icon(c.icon)}</span>
  <span class="cover__code">${c.code}</span>
</div>`;

export const courseCard = (ctx, c) => {
  const t = instructors[c.teacher];
  return html`<article class="course-card" data-filter-item data-tags="${c.cat} ${c.price === 0 ? 'free' : 'paid'}">
  <div class="cover-wrap" style="position:relative">
    ${cover(c)}
    <button class="course-card__wish" type="button" data-wishlist aria-pressed="false" aria-label="افزودن ${c.title} به علاقه‌مندی‌ها">${icon('heart')}</button>
  </div>
  <div class="course-card__body">
    <div class="row-between"><span class="badge">${catOf(c.cat).name}</span><span class="rating">${icon('star')} ${fa(c.rating).replace('.', '٫')} <small>(${fa(c.reviews)})</small></span></div>
    <h3><a href="${ctx.base}course.html">${c.title}</a></h3>
    <div class="course-card__meta"><span>${icon('play-circle')} ${fa(c.lessons)} جلسه</span><span>${icon('clock')} ${fa(c.hours)} ساعت</span><span>${icon('signal')} ${c.level}</span></div>
    <div class="course-card__foot">
      <div class="person">${avatar(t.name, t.tone, 'sm')}<span>${t.name}</span></div>
      ${price(c.price, c.old)}
    </div>
  </div>
</article>`;
};

export const pageHero = (ctx, { title, sub, crumbs = [], extra = '' }) => html`
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="مسیر صفحه"><a href="${ctx.base}index.html">خانه</a>${crumbs.map((c) => html`${icon('chevron-left')}${c.href ? html`<a href="${ctx.base}${c.href}">${c.label}</a>` : html`<span aria-current="page">${c.label}</span>`}`)}</nav>
    <h1>${title}</h1>
    ${sub ? html`<p>${sub}</p>` : ''}
    ${extra}
  </div>
</section>`;

export const stars = (n) => html`<span class="stars" role="img" aria-label="${fa(n)} از ۵ ستاره">${[1, 2, 3, 4, 5].map((i) => icon('star', i <= Math.round(n) ? '' : 'off'))}</span>`;

export const chart = (cfg) => html`<div class="chart" data-chart='${JSON.stringify(cfg).replace(/'/g, '&#39;')}'></div>`;

export { toman };
