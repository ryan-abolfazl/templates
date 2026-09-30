import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';
import { courses } from '../data.mjs';

export const meta = { title: 'تکمیل خرید', layout: 'main', description: 'فرم پرداخت و انتخاب درگاه' };

const items = [courses[0], courses[2]];
const total = items.reduce((s, c) => s + c.price, 0);
const old = items.reduce((s, c) => s + (c.old || c.price), 0);

export default (ctx) => html`
${pageHero(ctx, { title: 'تکمیل خرید', crumbs: [{ label: 'سبد خرید', href: 'cart.html' }, { label: 'پرداخت' }] })}

<section class="section section--tight">
  <form class="container checkout" data-validate data-success="پرداخت با موفقیت انجام شد! در حال انتقال به داشبورد…" data-redirect="dashboard.html">
    <div class="stack" style="--gap:1.5rem">
      <ol class="steps list-plain" aria-label="مراحل خرید"><li class="is-done">${icon('check')} سبد خرید</li><li class="is-current">۲ اطلاعات و پرداخت</li><li>۳ شروع یادگیری</li></ol>
      <section class="card">
        <h2 class="card-title">اطلاعات خریدار</h2>
        <div class="form-grid">
          <div class="field"><label class="label" for="c-name">نام و نام خانوادگی</label><input class="input" id="c-name" required autocomplete="name" /></div>
          <div class="field"><label class="label" for="c-phone">شماره موبایل</label><input class="input" id="c-phone" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل را به شکل ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید" placeholder="۰۹۱۲۳۴۵۶۷۸۹" /></div>
          <div class="field full"><label class="label" for="c-email">ایمیل (برای ارسال فاکتور)</label><input class="input ltr" id="c-email" type="email" autocomplete="email" /></div>
        </div>
      </section>
      <section class="card">
        <h2 class="card-title">روش پرداخت</h2>
        <div class="gateways" data-gateway>
          ${[
            ['landmark', 'درگاه بانکی', 'همه کارت‌های عضو شتاب', true],
            ['wallet', 'کیف پول دانش', 'موجودی: ۲۴۰٬۰۰۰ تومان'],
            ['calendar-range', 'پرداخت اقساطی', '۴ قسط بدون بهره'],
          ].map(
            ([i, t, d, on]) => html`<label class="gateway ${on ? 'is-active' : ''}"><input type="radio" name="gw" ${on ? 'checked' : ''} class="sr-only" /><span class="gateway__icon">${icon(i)}</span><b>${t}</b><span class="xs muted">${d}</span></label>`
          )}
        </div>
        <label class="check mt-3"><input type="checkbox" required /> <span><a class="bold" href="${ctx.base}documentation/index.html">قوانین و شرایط خرید</a> را خوانده‌ام و می‌پذیرم.</span></label>
      </section>
    </div>
    <aside class="summary card">
      <h2 style="font-size:var(--text-lg)">سفارش شما</h2>
      <ul class="list-plain stack" style="--gap:.75rem">${items.map((c) => html`<li class="row-between small"><span>${c.title}</span><b>${fa(c.price)}</b></li>`)}</ul>
      <dl class="summary__rows">
        <div><dt>جمع کل</dt><dd>${fa(old)} تومان</dd></div>
        <div class="text-save"><dt>تخفیف</dt><dd>− ${fa(old - total)} تومان</dd></div>
        <div class="summary__total"><dt>قابل پرداخت</dt><dd>${fa(total)} تومان</dd></div>
      </dl>
      <button class="btn btn--primary btn--lg btn--block" type="submit">${icon('lock')} پرداخت ${fa(total)} تومان</button>
      <p class="xs muted center">پس از پرداخت، دسترسی به دوره‌ها فوراً فعال می‌شود.</p>
    </aside>
  </form>
</section>`;
