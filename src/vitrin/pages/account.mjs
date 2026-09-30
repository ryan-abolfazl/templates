import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHead, art } from '../partials.mjs';
import { products } from '../data.mjs';

export const meta = { title: 'حساب من', layout: 'main', description: 'سفارش‌ها، آدرس‌ها و اطلاعات حساب' };

const orders = [
  ['VT-48213', '۸ مهر ۱۴۰۵', 'در حال آماده‌سازی', '', [products[0], products[10]], 9670000],
  ['VT-47102', '۲۱ شهریور ۱۴۰۵', 'تحویل شد', 'badge--ok', [products[4]], 2690000],
  ['VT-45877', '۳ مرداد ۱۴۰۵', 'تحویل شد', 'badge--ok', [products[5], products[9]], 4880000],
];

export default (ctx) => html`
${pageHead(ctx, { title: 'سلام، سارا', kicker: 'حساب من', sub: 'عضو باشگاه ویترین از ۱۴۰۳ · سطح نقره‌ای', crumbs: [{ label: 'حساب من' }] })}
<section class="section section--tight">
  <div class="container account" data-tabs>
    <nav class="account__nav" role="tablist" aria-label="بخش‌های حساب" aria-orientation="vertical">
      <button role="tab" id="at-1" aria-controls="ap-1" aria-selected="true" type="button">${icon('package')} سفارش‌ها</button>
      <button role="tab" id="at-2" aria-controls="ap-2" aria-selected="false" type="button">${icon('map-pin')} آدرس‌ها</button>
      <button role="tab" id="at-3" aria-controls="ap-3" aria-selected="false" type="button">${icon('user-round')} اطلاعات حساب</button>
      <a href="${ctx.base}wishlist.html">${icon('heart')} علاقه‌مندی‌ها</a>
      <a href="${ctx.base}login.html">${icon('log-out', 'icon-flip')} خروج</a>
    </nav>
    <div>
      <div role="tabpanel" id="ap-1" aria-labelledby="at-1" class="stack" style="--gap:1rem">
        ${orders.map(
          ([id, date, st, cls, items, total]) => html`<article class="order">
            <div class="order__head"><div><b class="ltr">${id}</b><span class="xs muted">${date}</span></div><span class="badge ${cls}">${st}</span></div>
            <div class="order__items">${items.map((p) => html`<a href="${ctx.base}product.html" title="${p.name}">${art(p)}</a>`)}</div>
            <div class="order__foot"><span class="small">${fa(items.length)} کالا · <b>${fa(total)} تومان</b></span><div class="row"><button class="btn btn--sm" type="button" data-toast="کد رهگیری: 2210834455 · پست پیشتاز" data-toast-type="info">${icon('truck')} پیگیری</button><a class="btn btn--sm" href="${ctx.base}product.html">خرید دوباره</a></div></div>
          </article>`
        )}
      </div>
      <div role="tabpanel" id="ap-2" aria-labelledby="at-2" hidden>
        <div class="addr-grid">
          <article class="addr"><span class="badge">پیش‌فرض</span><b>خانه</b><p class="small muted">تهران، سعادت‌آباد، خیابان سرو غربی، کوچه ۱۲، پلاک ۸، واحد ۳ · کد پستی ۱۹۹۸۷۶۵۴۳۲</p><div class="row"><button class="link xs" type="button">ویرایش</button><button class="link xs" type="button">حذف</button></div></article>
          <article class="addr"><b>محل کار</b><p class="small muted">تهران، خیابان ولیعصر، بالاتر از پارک ساعی، برج نگار، طبقه ۹ · کد پستی ۱۵۱۱۷۴۴۳۱۱</p><div class="row"><button class="link xs" type="button">ویرایش</button><button class="link xs" type="button">حذف</button></div></article>
          <button class="addr addr--new" type="button" data-toast="فرم آدرس جدید (نمونه)" data-toast-type="info">${icon('plus')} افزودن آدرس جدید</button>
        </div>
      </div>
      <div role="tabpanel" id="ap-3" aria-labelledby="at-3" hidden>
        <form class="form-grid" data-validate data-success="اطلاعات حساب ذخیره شد">
          <div class="field"><label class="label" for="ac-n">نام</label><input class="input" id="ac-n" value="سارا محمدی" required /></div>
          <div class="field"><label class="label" for="ac-p">موبایل</label><input class="input" id="ac-p" type="tel" value="09123456789" required /></div>
          <div class="field"><label class="label" for="ac-e">ایمیل</label><input class="input ltr" id="ac-e" type="email" value="sara@example.com" /></div>
          <div class="field"><label class="label" for="ac-b">تاریخ تولد</label><input class="input" id="ac-b" value="۱۳۷۰/۰۵/۱۲" /></div>
          <div class="full stack" style="--gap:.6rem"><span class="label">سایزهای معمول شما</span><div class="row wrap small"><span class="badge">بالاتنه: M</span><span class="badge">پایین‌تنه: ۳۸</span><span class="badge">کفش: ۳۹</span></div></div>
          <div class="full"><button class="btn btn--solid" type="submit">ذخیره تغییرات</button></div>
        </form>
      </div>
    </div>
  </div>
</section>`;
