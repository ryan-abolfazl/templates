import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero, cover, courseCard } from '../partials.mjs';
import { courses, instructors } from '../data.mjs';

export const meta = { title: 'سبد خرید', layout: 'main', description: 'سبد خرید دوره‌ها با کد تخفیف' };

const items = [courses[0], courses[2]];

export const summary = (ctx, { cta = 'ادامه و پرداخت', href = 'checkout.html', coupon = true } = {}) => html`
<aside class="summary card">
  <h2 style="font-size:var(--text-lg)">خلاصه سفارش</h2>
  <dl class="summary__rows">
    <div><dt>قیمت دوره‌ها (<span data-sum-count>۲</span>)</dt><dd data-sum-old>—</dd></div>
    <div class="text-save"><dt>سود شما از خرید</dt><dd data-sum-save>—</dd></div>
    <div class="summary__total"><dt>مبلغ قابل پرداخت</dt><dd data-sum-total>—</dd></div>
  </dl>
  ${coupon
    ? html`<form class="coupon" data-coupon><label class="sr-only" for="coupon">کد تخفیف</label><input class="input ltr" id="coupon" placeholder="کد تخفیف" /><button class="btn btn--ink" type="submit">اعمال</button></form>`
    : ''}
  <a class="btn btn--primary btn--lg btn--block" href="${ctx.base}${href}">${cta} ${icon('arrow-left')}</a>
  <p class="xs muted center">${icon('lock')} پرداخت امن از طریق درگاه‌های بانکی عضو شتاب</p>
</aside>`;

export default (ctx) => html`
${pageHero(ctx, { title: 'سبد خرید', crumbs: [{ label: 'سبد خرید' }] })}

<section class="section section--tight">
  <div class="container checkout" data-cart>
    <div class="stack">
      ${items.map(
        (c) => html`<article class="cart-item" data-cart-item data-price="${c.price}" data-old="${c.old || c.price}">
          <a href="${ctx.base}course.html" class="cart-item__cover">${cover(c)}</a>
          <div class="cart-item__info">
            <h3><a href="${ctx.base}course.html">${c.title}</a></h3>
            <p class="xs muted">${instructors[c.teacher].name} · ${fa(c.lessons)} جلسه · ${fa(c.hours)} ساعت</p>
            <button class="btn btn--ghost btn--sm" type="button" data-remove>${icon('trash-2')} حذف</button>
          </div>
          <div class="price">${c.old ? html`<del>${fa(c.old)}</del>` : ''}<b>${fa(c.price)} <small>تومان</small></b></div>
        </article>`
      )}
      <div class="empty card" data-cart-empty hidden>${icon('shopping-bag')}<b>سبد خرید شما خالی است</b><a class="btn btn--primary" href="${ctx.base}courses.html">مشاهده دوره‌ها</a></div>
      <div class="note card small">${icon('gift')} کد <b class="ltr">MEHR40</b> را برای ۵۰۰ هزار تومان تخفیف بیشتر امتحان کنید.</div>
    </div>
    ${summary(ctx)}
  </div>
</section>

<section class="section section--cream section--tight">
  <div class="container">
    <h2 class="mb-2" style="font-size:var(--text-2xl);margin-block-end:1.5rem">پیشنهاد برای شما</h2>
    <div class="course-grid">${[courses[4], courses[11], courses[6], courses[9]].map((c) => courseCard(ctx, c))}</div>
  </div>
</section>`;
