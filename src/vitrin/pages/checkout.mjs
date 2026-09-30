import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { art, logo } from '../partials.mjs';
import { products, COLORS } from '../data.mjs';

export const meta = { title: 'تسویه حساب', layout: 'blank', description: 'فرم آدرس، روش ارسال و پرداخت' };

const items = [[products[0], 'M', 1], [products[10], 'L', 2]];
const sub = items.reduce((s, [p, , q]) => s + p.price * q, 0);
const provinces = ['تهران', 'البرز', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی', 'گیلان', 'مازندران', 'خوزستان', 'کرمان', 'یزد', 'قم'];

export default (ctx) => html`
<header class="co-head"><div class="container row-between">${logo(ctx)}<a class="link xs" href="${ctx.base}cart.html">${icon('arrow-right')} بازگشت به سبد</a></div></header>
<main id="main" class="container checkout">
  <form class="checkout__form" data-validate data-success="سفارش شما ثبت شد! کد پیگیری: VT-48213" data-redirect="account.html">
    <ol class="co-steps list-plain" aria-label="مراحل"><li class="is-done">سبد خرید</li><li class="is-current">اطلاعات و ارسال</li><li>پرداخت</li></ol>
    <section>
      <h2>اطلاعات تماس</h2>
      <div class="form-grid">
        <div class="field"><label class="label" for="co-name">نام و نام خانوادگی</label><input class="input" id="co-name" required autocomplete="name" /></div>
        <div class="field"><label class="label" for="co-phone">موبایل</label><input class="input" id="co-phone" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل ۱۱ رقمی و با ۰۹ شروع شود" autocomplete="tel" /></div>
      </div>
    </section>
    <section>
      <h2>آدرس تحویل</h2>
      <div class="form-grid">
        <div class="field"><label class="label" for="co-prov">استان</label><select class="select" id="co-prov" required><option value="">انتخاب کنید</option>${provinces.map((p) => html`<option>${p}</option>`)}</select></div>
        <div class="field"><label class="label" for="co-city">شهر</label><input class="input" id="co-city" required /></div>
        <div class="field full"><label class="label" for="co-addr">آدرس کامل</label><textarea class="textarea" id="co-addr" required rows="2" placeholder="خیابان، کوچه، پلاک، واحد"></textarea></div>
        <div class="field"><label class="label" for="co-zip">کد پستی</label><input class="input ltr" id="co-zip" inputmode="numeric" pattern="[0-9]{10}" data-msg="کد پستی ۱۰ رقمی است" /></div>
        <div class="field"><label class="label" for="co-unit">پلاک و واحد</label><input class="input" id="co-unit" /></div>
      </div>
    </section>
    <section>
      <h2>روش ارسال</h2>
      <div class="options">
        ${[
          ['پیک ویترین (تهران)', 'تحویل فردا، ۹ تا ۲۱', 'رایگان', true],
          ['پست پیشتاز', '۲ تا ۴ روز کاری', 'رایگان'],
          ['تیپاکس', '۱ تا ۲ روز کاری', `${fa(120000)} تومان`],
        ].map(([t, d, pr, on]) => html`<label class="option"><span class="check"><input type="radio" name="ship" ${on ? 'checked' : ''} /></span><span><b>${t}</b><span class="xs muted">${d}</span></span><span class="small bold">${pr}</span></label>`)}
      </div>
    </section>
    <section>
      <h2>روش پرداخت</h2>
      <div class="options">
        ${[
          ['درگاه بانکی', 'همه کارت‌های عضو شتاب', 'credit-card', true],
          ['پرداخت اقساطی', '۴ قسط بدون کارمزد', 'calendar-range'],
          ['پرداخت در محل', 'فقط تهران، با کارتخوان', 'hand-coins'],
        ].map(([t, d, i, on]) => html`<label class="option"><span class="check"><input type="radio" name="pay" ${on ? 'checked' : ''} /></span><span><b>${t}</b><span class="xs muted">${d}</span></span>${icon(i)}</label>`)}
      </div>
    </section>
    <label class="check"><input type="checkbox" required /> <span><a class="link" href="${ctx.base}documentation/index.html">قوانین فروشگاه</a> را می‌پذیرم</span></label>
    <button class="btn btn--solid btn--lg btn--block" type="submit">${icon('lock')} ثبت سفارش و پرداخت</button>
  </form>

  <aside class="checkout__sum">
    <h2>سفارش شما</h2>
    <ul class="list-plain">
      ${items.map(([p, size, q]) => html`<li class="mini-item"><div style="position:relative">${art(p)}<span class="qty-dot">${fa(q)}</span></div><div><b>${p.name}</b><span>${COLORS[p.color][0]} · <span class="ltr">${size}</span></span></div><b class="small">${fa(p.price * q)}</b></li>`)}
    </ul>
    <dl class="order-sum">
      <div><dt>جمع محصولات</dt><dd>${fa(sub)} تومان</dd></div>
      <div><dt>ارسال</dt><dd>رایگان</dd></div>
      <div class="order-sum__total"><dt>مبلغ نهایی</dt><dd>${fa(sub)} تومان</dd></div>
    </dl>
  </aside>
</main>`;
