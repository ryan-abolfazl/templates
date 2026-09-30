import { html, icon, fa } from '../../tools/lib/html.mjs';
import { garment } from './garments.mjs';
import { COLORS, CATS, SIZES } from './data.mjs';

export const logo = (ctx) => html`<a class="logo" href="${ctx.base}index.html" aria-label="ویترین، صفحه اصلی">ویترین<span>VITRIN</span></a>`;

export const art = (p, { color = p.color, flip = false, cls = '' } = {}) =>
  html`<div class="art ${cls}" style="--art-bg:${p.bg}">${garment(p.kind, COLORS[color][1], { flip })}</div>`;

export const price = (p) =>
  html`<span class="price ${p.old ? 'price--sale' : ''}">${p.old ? html`<del>${fa(p.old)}</del>` : ''}<b>${fa(p.price)}</b><small>تومان</small></span>`;

export const swatches = (p, max = 4) =>
  html`<span class="swatches" aria-label="رنگ‌ها: ${p.colors.map((c) => COLORS[c][0]).join('، ')}">${p.colors.slice(0, max).map((c, i) => html`<i class="swatch ${i === 0 ? 'is-active' : ''}" style="--c:${COLORS[c][1]}"></i>`)}</span>`;

export const stars = (n) => html`<span class="stars" role="img" aria-label="امتیاز ${fa(n)} از ۵">${[1, 2, 3, 4, 5].map((i) => icon('star', i <= Math.round(n) ? '' : 'off'))}</span>`;

export const card = (ctx, p) => html`<article class="card" data-filter-item data-tags="${p.cat} ${p.kind}">
  <div class="card__media">
    ${p.old ? html`<span class="card__badge card__badge--sale">${fa(Math.round((1 - p.price / p.old) * 100))}٪ تخفیف</span>` : p.badge ? html`<span class="card__badge">${p.badge}</span>` : ''}
    ${art(p)}
    <div class="card__alt">${art(p, { color: p.colors[1] || p.color, flip: true })}</div>
    <button class="card__wish" type="button" data-wishlist aria-pressed="false" aria-label="افزودن ${p.name} به علاقه‌مندی‌ها">${icon('heart')}</button>
    <div class="card__quick" aria-label="افزودن سریع">
      <span>افزودن سریع</span>
      ${(p.cat === 'accessories' ? ['ONE'] : SIZES.slice(1, 5)).map((s) => html`<button type="button" data-add-to-cart="${p.name} (سایز ${s}) به سبد اضافه شد">${s}</button>`)}
    </div>
  </div>
  <div class="card__info">
    <div class="card__row"><span class="xs muted">${CATS[p.cat]}</span>${swatches(p)}</div>
    <h3><a href="${ctx.base}product.html">${p.name}</a></h3>
    ${price(p)}
  </div>
</article>`;

const NAV = [
  ['shop', 'shop.html', 'جدیدترین‌ها'],
  ['women', 'shop.html', 'زنانه'],
  ['men', 'shop.html', 'مردانه'],
  ['acc', 'shop.html', 'اکسسوری'],
  ['lookbook', 'lookbook.html', 'لوک‌بوک'],
  ['journal', 'journal.html', 'ژورنال'],
];

export const header = (ctx) => html`
<div class="topline"><span>ارسال رایگان برای سفارش‌های بالای <b>۲ میلیون تومان</b></span><span class="hide-md">۷ روز ضمانت تعویض بی‌قیدوشرط</span></div>
<header class="header" data-sticky-header>
  <div class="container header__inner">
    <nav class="nav" aria-label="منوی اصلی">
      ${NAV.map(([k, href, label]) => html`<a class="${ctx.page.active === k ? 'is-active' : ''}" href="${ctx.base}${href}" ${ctx.page.active === k ? 'aria-current="page"' : ''}>${label}</a>`)}
      <a class="sale" href="${ctx.base}shop.html">حراج</a>
    </nav>
    <button class="icon-btn menu-btn" type="button" data-drawer-open="menu" aria-controls="menu" aria-expanded="false" aria-label="باز کردن منو">${icon('menu')}</button>
    ${logo(ctx)}
    <div class="header__actions">
      <button class="icon-btn hide-md" type="button" data-modal-open="search" aria-label="جستجو">${icon('search')}</button>
      <button class="icon-btn" type="button" data-theme-toggle aria-label="تغییر حالت روشن و تاریک" aria-pressed="false">${icon('moon', 'theme-icon-light')}${icon('sun', 'theme-icon-dark')}</button>
      <a class="icon-btn hide-md" href="${ctx.base}account.html" aria-label="حساب کاربری">${icon('user-round')}</a>
      <a class="icon-btn hide-md" href="${ctx.base}wishlist.html" aria-label="علاقه‌مندی‌ها">${icon('heart')}</a>
      <button class="icon-btn" type="button" data-drawer-open="cart" aria-controls="cart" aria-expanded="false" aria-label="سبد خرید">${icon('shopping-bag')}<span class="count" data-cart-count>۲</span></button>
    </div>
  </div>
</header>

<div class="drawer" id="menu" data-drawer>
  <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="منو">
    <div class="drawer__head">${logo(ctx)}<button class="icon-btn" type="button" data-drawer-close aria-label="بستن">${icon('x')}</button></div>
    <div class="drawer__body">
      <nav class="drawer__nav" aria-label="منوی موبایل">
        ${NAV.map(([, href, label]) => html`<a href="${ctx.base}${href}">${label}${icon('arrow-up-left')}</a>`)}
        <a href="${ctx.base}about.html">درباره ما${icon('arrow-up-left')}</a>
        <a href="${ctx.base}contact.html">تماس${icon('arrow-up-left')}</a>
      </nav>
    </div>
    <div class="drawer__foot"><a class="btn btn--solid btn--block" href="${ctx.base}account.html">${icon('user-round')} حساب کاربری</a></div>
  </div>
</div>

<div class="drawer drawer--end" id="cart" data-drawer>
  <div class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
    <div class="drawer__head"><h2 id="cart-title">سبد خرید (۲)</h2><button class="icon-btn" type="button" data-drawer-close aria-label="بستن">${icon('x')}</button></div>
    <div class="drawer__body">
      <div class="ship-meter"><span>فقط <b>${fa(210000)} تومان</b> تا ارسال رایگان</span><div class="ship-meter__bar"><span style="--value:90%"></span></div></div>
      ${ctx.cartItems.map(
        (p) => html`<div class="mini-item">${art(p)}<div><b>${p.name}</b><span>${COLORS[p.color][0]} · سایز M</span><div class="mt-1">${price(p)}</div></div><button class="icon-btn" type="button" aria-label="حذف">${icon('x')}</button></div>`
      )}
    </div>
    <div class="drawer__foot">
      <div class="row-between"><span>جمع کل</span><b>${fa(ctx.cartItems.reduce((s, p) => s + p.price, 0))} تومان</b></div>
      <a class="btn btn--solid btn--block btn--lg" href="${ctx.base}checkout.html">تسویه حساب</a>
      <a class="btn btn--block" href="${ctx.base}cart.html">مشاهده سبد خرید</a>
    </div>
  </div>
</div>

<dialog class="modal" id="search" aria-label="جستجو">
  <form class="modal__body stack" action="${ctx.base}shop.html">
    <label class="label" for="sq">جستجو در ویترین</label>
    <input class="input input--line" id="sq" type="search" placeholder="بارانی، پیراهن لینن، کیف چرم…" style="font-size:var(--text-xl)" />
    <div class="row wrap small"><span class="muted">پرجستجو:</span>${['بارانی', 'لینن', 'بافت', 'کیف'].map((t) => html`<a class="link" href="${ctx.base}shop.html">${t}</a>`)}</div>
  </form>
</dialog>`;

export const footer = (ctx) => html`
<footer class="footer">
  <div class="container">
    <p class="footer__big" aria-hidden="true">ویترین<small>پوشاک معاصر، دوخته‌شده در کارگاه‌های کوچک ایرانی با پارچه‌های طبیعی و قیمت منصفانه.</small></p>
    <div class="footer__grid">
      <div><h3>فروشگاه</h3><ul class="list-plain"><li><a href="${ctx.base}shop.html">زنانه</a></li><li><a href="${ctx.base}shop.html">مردانه</a></li><li><a href="${ctx.base}shop.html">اکسسوری</a></li><li><a href="${ctx.base}shop.html">حراج</a></li></ul></div>
      <div><h3>ویترین</h3><ul class="list-plain"><li><a href="${ctx.base}about.html">داستان ما</a></li><li><a href="${ctx.base}lookbook.html">لوک‌بوک</a></li><li><a href="${ctx.base}journal.html">ژورنال</a></li><li><a href="${ctx.base}contact.html">فروشگاه‌های حضوری</a></li></ul></div>
      <div><h3>راهنما</h3><ul class="list-plain"><li><a href="${ctx.base}contact.html">پیگیری سفارش</a></li><li><a href="${ctx.base}product.html">راهنمای سایز</a></li><li><a href="${ctx.base}contact.html">تعویض و مرجوعی</a></li><li><a href="${ctx.base}documentation/index.html">قوانین</a></li></ul></div>
      <div><h3>ما را دنبال کنید</h3><ul class="list-plain"><li><a href="#">اینستاگرام</a></li><li><a href="#">پینترست</a></li><li><a href="#">تلگرام</a></li></ul></div>
      <div class="footer__news">
        <h3>خبرنامه ویترین</h3>
        <p class="small">اولین نفری باشید که از کالکشن‌های تازه و حراج‌ها باخبر می‌شود.</p>
        <form class="row mt-2" data-validate data-success="به خبرنامه ویترین خوش آمدید"><label class="sr-only" for="nl">ایمیل</label><input class="input input--line ltr" id="nl" type="email" required placeholder="email@example.com" /><button class="btn btn--light btn--sm" type="submit">عضویت</button></form>
      </div>
    </div>
    <div class="footer__bottom"><span>© ${fa('1405')} ویترین. همه حقوق محفوظ است.</span><div class="pay-icons" aria-label="روش‌های پرداخت"><span>شتاب</span><span>اقساط</span><span>کیف پول</span><span>پرداخت در محل</span></div></div>
  </div>
</footer>
<button class="scroll-top" type="button" data-scroll-top aria-label="بازگشت به بالا">${icon('arrow-up')}</button>`;

export const pageHead = (ctx, { title, sub, crumbs = [], kicker = '' }) => html`
<section class="page-head">
  <div class="container">
    <nav class="breadcrumb" aria-label="مسیر صفحه"><a href="${ctx.base}index.html">خانه</a>${crumbs.map((c) => html`${icon('chevron-left')}${c.href ? html`<a href="${ctx.base}${c.href}">${c.label}</a>` : html`<span aria-current="page">${c.label}</span>`}`)}</nav>
    <div class="page-head__row">
      <div>${kicker ? html`<span class="kicker">${kicker}</span>` : ''}<h1>${title}</h1></div>
      ${sub ? html`<p>${sub}</p>` : ''}
    </div>
  </div>
</section>`;
