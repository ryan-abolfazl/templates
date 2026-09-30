import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { art, pageHead, card } from '../partials.mjs';
import { products, COLORS } from '../data.mjs';

export const meta = { title: 'سبد خرید', layout: 'main', description: 'سبد خرید با تغییر تعداد و محاسبه هزینه ارسال' };

const lines = [
  [products[0], 'M', 1],
  [products[10], 'L', 2],
];

export default (ctx) => html`
${pageHead(ctx, { title: 'سبد خرید', crumbs: [{ label: 'سبد خرید' }] })}

<section class="section section--tight">
  <div class="container cart" data-cart-page>
    <div>
      <div class="ship-meter ship-meter--lg"><span data-meter-text>—</span><div class="ship-meter__bar"><span data-meter></span></div></div>
      <table class="cart-table">
        <thead><tr><th scope="col">محصول</th><th scope="col">تعداد</th><th scope="col">جمع</th><th scope="col"><span class="sr-only">حذف</span></th></tr></thead>
        <tbody>
          ${lines.map(
            ([p, size, q]) => html`<tr data-line data-price="${p.price}">
              <td><div class="cart-prod"><a href="${ctx.base}product.html">${art(p)}</a><div><a class="bold" href="${ctx.base}product.html">${p.name}</a><span class="xs muted">${COLORS[p.color][0]} · سایز <span class="ltr">${size}</span></span><span class="small">${fa(p.price)} تومان</span></div></div></td>
              <td><div class="qty qty--sm" data-qty><button type="button" data-qty-inc aria-label="افزایش">${icon('plus')}</button><input value="${fa(q)}" data-value="${q}" min="1" max="9" aria-label="تعداد" /><button type="button" data-qty-dec aria-label="کاهش">${icon('minus')}</button></div></td>
              <td class="bold"><span data-line-total>${fa(p.price * q)}</span> <small class="muted">تومان</small></td>
              <td><button class="icon-btn" type="button" data-line-remove aria-label="حذف ${p.name}">${icon('trash-2')}</button></td>
            </tr>`
          )}
        </tbody>
      </table>
      <div class="empty" data-cart-empty hidden>${icon('shopping-bag')}<b>سبد خرید شما خالی است</b><a class="btn btn--solid" href="${ctx.base}shop.html">بازگشت به فروشگاه</a></div>
      <div class="row-between mt-3 wrap"><a class="link" href="${ctx.base}shop.html">${icon('arrow-right')} ادامه خرید</a><form class="row" data-validate data-success="کد هدیه ثبت شد"><label class="sr-only" for="gift">کد تخفیف</label><input class="input input--line ltr" id="gift" required placeholder="کد تخفیف" style="inline-size:12rem" /><button class="btn btn--sm" type="submit">اعمال</button></form></div>
    </div>
    <aside class="order-sum">
      <h2>خلاصه سفارش</h2>
      <dl>
        <div><dt>جمع محصولات</dt><dd data-subtotal>—</dd></div>
        <div><dt>هزینه ارسال</dt><dd data-shipping>—</dd></div>
        <div class="order-sum__total"><dt>مبلغ نهایی</dt><dd data-total>—</dd></div>
      </dl>
      <a class="btn btn--solid btn--lg btn--block" href="${ctx.base}checkout.html">ادامه و تسویه حساب</a>
      <p class="xs muted">${icon('lock')} پرداخت امن · امکان پرداخت اقساطی و در محل</p>
      <label class="check small"><input type="checkbox" /> بسته‌بندی هدیه (رایگان)</label>
    </aside>
  </div>
</section>

<section class="section section--bone section--tight">
  <div class="container">
    <div class="section-head"><div><h2>شاید دوست داشته باشید</h2></div></div>
    <div class="product-grid">${[products[4], products[2], products[6], products[9]].map((p) => card(ctx, p))}</div>
  </div>
</section>`;
