import { html, icon } from '../../../tools/lib/html.mjs';
import { pageHero, ctaBand } from '../partials.mjs';
import { compare } from './index.mjs';

export const meta = { title: 'نمونه کارها', layout: 'main', active: 'gallery', description: 'گالری قبل و بعد درمان‌های کلینیک لبخند' };

const cases = [
  ['laminate', 'لمینت سرامیکی ۱۰ واحد', 'دکتر رضوانی · ۲ جلسه'],
  ['whitening', 'بلیچینگ لیزری', 'دکتر رضوانی · ۱ جلسه'],
  ['ortho', 'ارتودنسی نامرئی', 'دکتر امیری · ۹ ماه'],
  ['laminate', 'کامپوزیت ونیر', 'دکتر رضوانی · ۱ جلسه'],
  ['implant', 'ایمپلنت دو دندان جلو', 'دکتر صدری · ۴ ماه'],
  ['whitening', 'جرم‌گیری و بلیچینگ', 'دکتر مقدم · ۲ جلسه'],
];
const labels = { laminate: 'لمینت', whitening: 'بلیچینگ', ortho: 'ارتودنسی', implant: 'ایمپلنت' };

export default (ctx) => html`
${pageHero(ctx, { title: html`قبل و <b>بعد</b>`, sub: 'دستگیره هر تصویر را بکشید تا نتیجه درمان را ببینید. همه تصاویر با رضایت کتبی بیماران منتشر شده‌اند.', crumbs: [{ label: 'نمونه کارها' }] })}
<section class="section section--tight" data-filter>
  <div class="container">
    <div class="row wrap mb" role="group" aria-label="فیلتر نوع درمان">
      <button class="chip" type="button" data-filter-btn="*" aria-pressed="true">همه</button>
      ${Object.entries(labels).map(([k, v]) => html`<button class="chip" type="button" data-filter-btn="${k}" aria-pressed="false">${v}</button>`)}
    </div>
    <div class="grid-3 gallery-grid">
      ${cases.map(([k, t, d]) => html`<figure class="card glass" data-filter-item data-tags="${k}" style="padding:.75rem">${compare(`مقایسه قبل و بعد ${t}`)}<figcaption class="row-between" style="padding:.5rem .5rem .25rem"><div><b class="small">${t}</b><span class="xs muted" style="display:block">${d}</span></div><span class="badge">${labels[k]}</span></figcaption></figure>`)}
    </div>
    <p class="center small muted mt-4">${icon('info')} این تصاویر نمایشی هستند؛ عکس‌های واقعی بیماران خود را جایگزین کنید.</p>
  </div>
</section>
${ctaBand(ctx)}`;
