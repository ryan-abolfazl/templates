import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';

export const meta = { title: 'مجله سلامت دهان', layout: 'main', active: 'blog', description: 'مقاله‌های آموزشی درباره سلامت و زیبایی دندان' };

const posts = [
  ['sparkles', 'لمینت یا کامپوزیت؟ راهنمای کامل انتخاب', 'زیبایی', '۵ مهر ۱۴۰۵', 8, '#dff5ef'],
  ['baby', 'اولین ویزیت دندانپزشکی کودک: کی و چطور؟', 'کودکان', '۱ مهر ۱۴۰۵', 5, '#fff3d6'],
  ['hammer', 'ایمپلنت چقدر دوام دارد؟ ۷ باور غلط', 'ایمپلنت', '۲۶ شهریور ۱۴۰۵', 7, '#e4f1fb'],
  ['sun', 'سفید کردن دندان در خانه: کدام روش‌ها امن‌اند؟', 'بهداشت', '۲۰ شهریور ۱۴۰۵', 6, '#fde8e1'],
  ['align-horizontal-space-around', 'ارتودنسی نامرئی برای بزرگسالان', 'ارتودنسی', '۱۴ شهریور ۱۴۰۵', 9, '#efe8f8'],
  ['heart-pulse', 'ارتباط سلامت لثه با قلب', 'سلامت', '۸ شهریور ۱۴۰۵', 4, '#dff5ef'],
];

export default (ctx) => html`
${pageHero(ctx, { title: html`مجله <b>سلامت دهان</b>`, sub: 'مقاله‌های کوتاه و قابل‌اعتماد، نوشته‌شده توسط پزشکان کلینیک لبخند.', crumbs: [{ label: 'مجله' }] })}
<section class="section section--tight">
  <div class="container">
    <div class="grid-3">
      ${posts.map(
        ([i, t, c, d, r, bg], n) => html`<article class="card card--hover post-card ${n === 0 ? 'post-card--big' : ''}">
          <div class="post-card__art" style="--pbg:${bg}"><span class="icon-bubble">${icon(i)}</span></div>
          <div class="stack" style="--gap:.6rem">
            <div class="row xs muted wrap"><span class="badge">${c}</span><span>${d}</span><span>${icon('clock')} ${fa(r)} دقیقه</span></div>
            <h2 class="post-card__title"><a href="${ctx.base}blog.html">${t}</a></h2>
            ${n === 0 ? html`<p class="small muted">مقایسه کامل دوام، هزینه، ظاهر و تعداد جلسات دو روش محبوب زیبایی دندان، به زبان ساده.</p>` : ''}
          </div>
        </article>`
      )}
    </div>
    <nav class="pager mt-4" aria-label="صفحه‌بندی"><span class="is-active" aria-current="page">۱</span><a href="${ctx.base}blog.html">۲</a><a href="${ctx.base}blog.html" aria-label="صفحه بعد">${icon('chevron-left')}</a></nav>
  </div>
</section>`;
