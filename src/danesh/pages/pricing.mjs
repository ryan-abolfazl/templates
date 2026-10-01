import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';

export const meta = { title: 'اشتراک دانش پلاس', layout: 'main', active: 'pricing', description: 'طرح‌های اشتراک برای دسترسی نامحدود به دوره‌ها' };

const plans = [
  { name: 'ماهانه', price: 390000, per: 'ماه', tone: '', note: 'برای امتحان کردن', features: ['دسترسی به همه دوره‌ها', 'گواهی پایان دوره', 'مشاهده آفلاین در اپ'], cta: 'شروع اشتراک' },
  { name: 'سالانه', price: 2900000, per: 'سال', note: 'معادل ماهی ۲۴۲ هزار تومان · ۳۸٪ صرفه‌جویی', features: ['همه امکانات ماهانه', 'منتور شخصی و رفع اشکال', 'کلاس‌های زنده هفتگی', 'پرداخت در ۴ قسط', 'مشاوره شغلی و بازبینی رزومه'], cta: 'انتخاب محبوب‌ترین', popular: true },
  { name: 'تیمی', price: 0, per: '', tone: '', note: 'برای شرکت‌ها و سازمان‌ها', features: ['پنل مدیریت اعضا', 'گزارش پیشرفت تیم', 'دوره‌های اختصاصی', 'فاکتور رسمی'], cta: 'تماس با فروش' },
];

const faq = [
  ['می‌توانم هر زمان اشتراک را لغو کنم؟', 'بله، تمدید خودکار را هر زمان از داشبورد خاموش کنید؛ تا پایان دوره فعلی دسترسی دارید.'],
  ['بعد از پایان اشتراک، گواهی‌هایم چه می‌شود؟', 'گواهی‌هایی که گرفته‌اید برای همیشه معتبر و قابل استعلام می‌مانند.'],
  ['پرداخت اقساطی چطور است؟', 'در طرح سالانه، مبلغ در ۴ قسط ماهانه بدون بهره از کارت شما کسر می‌شود.'],
];

export default (ctx) => html`
${pageHero(ctx, { title: 'همه دوره‌ها، یک اشتراک.', sub: 'به بیش از ۳۰۰ دوره، کلاس‌های زنده و منتورینگ دسترسی نامحدود داشته باشید.', crumbs: [{ label: 'اشتراک ویژه' }] })}

<section class="section">
  <div class="container">
    <div class="plans">
      ${plans.map(
        (p) => html`<article class="plan ${p.tone} ${p.popular ? 'plan--popular' : ''}">
          ${p.popular ? html`<span class="badge tone-accent plan__flag">محبوب‌ترین</span>` : ''}
          <h2>${p.name}</h2>
          <p class="plan__price">${p.price ? html`${fa(p.price)} <small>تومان / ${p.per}</small>` : 'تماس بگیرید'}</p>
          <p class="xs bold plan__note">${p.note}</p>
          <ul class="list-plain">${p.features.map((f) => html`<li>${icon('check')} ${f}</li>`)}</ul>
          <a class="btn ${p.popular ? 'btn--primary' : ''} btn--block btn--lg" href="${ctx.base}${p.price ? 'checkout.html' : 'contact.html'}">${p.cta}</a>
        </article>`
      )}
    </div>
    <p class="center small muted mt-3">${icon('shield-check')} ۷ روز ضمانت بازگشت کامل وجه، بدون هیچ سؤالی</p>
  </div>
</section>

<section class="section" id="faq">
  <div class="container faq-grid">
    <div><h2 style="font-size:var(--text-3xl)">سؤالات اشتراک</h2><p class="muted mt-1">سؤال دیگری دارید؟ <a class="bold" href="${ctx.base}contact.html">با ما در تماس باشید</a>.</p></div>
    <div class="accordion" data-accordion="single">${faq.map(([q, a], i) => html`<details ${i === 0 ? 'open' : ''}><summary>${q}<span class="plus">${icon('plus')}</span></summary><div class="accordion__body">${a}</div></details>`)}</div>
  </div>
</section>`;
