import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero, doctorPortrait, ctaBand } from '../partials.mjs';
import { doctors, faq } from '../data.mjs';
import { compare } from './index.mjs';

export const meta = { title: 'لمینت و کامپوزیت', layout: 'main', active: 'services', description: 'جزئیات خدمت لمینت: مراحل، مزایا، هزینه و سؤالات متداول' };

export default (ctx) => html`
${pageHero(ctx, { title: html`لمینت و <b>کامپوزیت</b> ونیر`, sub: 'پوسته‌های نازک سرامیکی یا کامپوزیتی که رنگ، فرم و اندازه دندان‌ها را اصلاح می‌کنند؛ طبیعی، ماندگار و با کمترین تراش.', crumbs: [{ label: 'خدمات', href: 'services.html' }, { label: 'لمینت' }], eyebrow: html`${icon('sparkles')} زیبایی` })}

<section class="section section--tight">
  <div class="container svc-layout">
    <div class="stack" style="--gap:2.5rem">
      <div class="svc-hero glass">${compare('مقایسه قبل و بعد لمینت')}</div>

      <div class="stack">
        <h2 class="h-md">لمینت برای چه کسانی مناسب است؟</h2>
        <p class="muted">اگر از رنگ، فاصله، شکستگی یا نامرتبی جزئی دندان‌ها ناراضی هستید، لمینت سریع‌ترین راه برای داشتن لبخندی یکدست است. پیش از هر کاری، با طراحی دیجیتال لبخند (DSD) نتیجه را روی تصویر خودتان می‌بینید.</p>
        <ul class="list-plain check-list grid-2">
          ${['دندان‌های تغییر رنگ داده که با بلیچینگ سفید نمی‌شوند', 'فاصله‌های کوچک بین دندان‌ها', 'لب‌پریدگی و شکستگی‌های جزئی', 'دندان‌های کوچک یا نامتناسب', 'نامرتبی خفیف بدون نیاز به ارتودنسی', 'ساییدگی لبه دندان‌ها'].map((t) => html`<li>${icon('check')}<span>${t}</span></li>`)}
        </ul>
      </div>

      <div class="stack">
        <h2 class="h-md">مراحل درمان</h2>
        <ol class="timeline list-plain">
          ${[
            ['مشاوره و اسکن', 'معاینه، عکس دیجیتال و اسکن سه‌بعدی دهان', '۴۵ دقیقه'],
            ['طراحی دیجیتال لبخند', 'پیش‌نمایش نتیجه و ماک‌آپ موقت روی دندان‌ها', '۳ روز'],
            ['آماده‌سازی و قالب‌گیری', 'تراش بسیار جزئی مینا و نصب لمینت موقت', '۹۰ دقیقه'],
            ['نصب لمینت نهایی', 'چسباندن لمینت‌ها و تنظیم نهایی بایت', '۲ ساعت'],
          ].map(([t, d, time], i) => html`<li><span class="timeline__dot">${fa(i + 1)}</span><div><b>${t}</b><p class="small muted">${d}</p></div><span class="badge">${time}</span></li>`)}
        </ol>
      </div>

      <div class="stack">
        <h2 class="h-md">سرامیکی یا کامپوزیتی؟</h2>
        <div class="table-wrap" data-overflow-ok>
          <table class="ctable">
            <thead><tr><th scope="col">ویژگی</th><th scope="col">لمینت سرامیکی (EMAX)</th><th scope="col">کامپوزیت ونیر</th></tr></thead>
            <tbody>
              <tr><th scope="row">ماندگاری</th><td>۱۰ تا ۱۵ سال</td><td>۵ تا ۷ سال</td></tr>
              <tr><th scope="row">تعداد جلسات</th><td>۲ جلسه</td><td>۱ جلسه</td></tr>
              <tr><th scope="row">طبیعی بودن</th><td>بسیار بالا، شفافیت مشابه مینا</td><td>بالا</td></tr>
              <tr><th scope="row">هزینه هر واحد</th><td>${fa(12000000)} تومان</td><td>${fa(3500000)} تومان</td></tr>
              <tr><th scope="row">ضمانت</th><td>۵ سال کتبی</td><td>۲ سال کتبی</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="stack">
        <h2 class="h-md">سؤالات متداول لمینت</h2>
        <div class="accordion" data-accordion="single">
          ${[['لمینت به دندان آسیب می‌زند؟', 'در روش‌های امروزی تنها ۰٫۳ تا ۰٫۵ میلی‌متر از مینا تراش داده می‌شود و در بسیاری موارد بدون تراش (نو-پرپ) انجام می‌شود.'], ['بعد از لمینت چه چیزهایی را نباید بخورم؟', 'محدودیت خاصی نیست؛ فقط از جویدن اجسام بسیار سخت مثل هسته و یخ با دندان‌های جلو پرهیز کنید.'], ...faq.slice(1, 3)].map(
            ([q, a], i) => html`<details ${i === 0 ? 'open' : ''}><summary>${q}${icon('chevron-down')}</summary><div class="accordion__body">${a}</div></details>`
          )}
        </div>
      </div>
    </div>

    <aside class="svc-side">
      <div class="card glass stack" style="--gap:1rem">
        <span class="xs muted">شروع قیمت از</span>
        <p class="price-xl">${fa(3500000)} <small>تومان / هر دندان</small></p>
        <ul class="list-plain svc-facts">
          <li>${icon('clock')}<span>مدت درمان: ۲ جلسه در ۷ روز</span></li>
          <li>${icon('shield-check')}<span>ضمانت کتبی ۵ ساله</span></li>
          <li>${icon('credit-card')}<span>پرداخت اقساطی تا ۱۲ ماه</span></li>
          <li>${icon('smile')}<span>بدون درد، با بی‌حسی موضعی</span></li>
        </ul>
        <a class="btn btn--primary btn--lg btn--block" href="${ctx.base}booking.html">${icon('calendar-plus')} رزرو مشاوره رایگان</a>
        <a class="btn btn--block" href="tel:02188776655">${icon('phone')} مشاوره تلفنی</a>
      </div>
      <a class="card card--hover doc-mini" href="${ctx.base}doctor.html"><span class="mini-portrait" style="inline-size:4rem;block-size:4rem">${doctorPortrait(doctors[0])}</span><div><span class="xs muted">پزشک این درمان</span><b style="display:block">${doctors[0].name}</b><span class="rating xs">${icon('star')} ${fa(doctors[0].rating).replace('.', '٫')}</span></div></a>
    </aside>
  </div>
</section>
${ctaBand(ctx)}`;
