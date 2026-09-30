import { html, icon } from '../../../tools/lib/html.mjs';
import { pageHead } from '../partials.mjs';
import { garment } from '../garments.mjs';
import { journal, COLORS } from '../data.mjs';

export const meta = { title: 'ژورنال', layout: 'main', active: 'journal', description: 'مقاله‌های استایل، پارچه و مد پایدار' };

const more = [
  { title: 'پشم مرینو یا کشمیر؟ راهنمای خرید بافت', cat: 'پارچه', date: '۱۰ شهریور ۱۴۰۵', kind: 'sweater', color: 'cream', bg: '#c9bda8' },
  { title: 'نگهداری از کیف چرم: ۵ اشتباه رایج', cat: 'راهنما', date: '۲ شهریور ۱۴۰۵', kind: 'bag', color: 'clay', bg: '#ebe3d6' },
  { title: 'گفتگو با خانم رحیمی، خیاط بارانی‌های ویترین', cat: 'روایت', date: '۲۵ مرداد ۱۴۰۵', kind: 'coat', color: 'olive', bg: '#ddd4c4' },
];

export default (ctx) => html`
${pageHead(ctx, { title: 'ژورنال ویترین', kicker: 'نوشته‌ها', sub: 'درباره پوشیدن آگاهانه، پارچه‌ها و آدم‌هایی که لباس‌های ما را می‌دوزند.', crumbs: [{ label: 'ژورنال' }] })}
<section class="section section--tight">
  <div class="container">
    <article class="jfeature">
      <div class="art" style="--art-bg:${journal[0].bg}">${garment(journal[0].kind, COLORS[journal[0].color][1])}</div>
      <div class="stack" style="--gap:1.25rem">
        <span class="kicker">${journal[0].cat} · ${journal[0].date}</span>
        <h2>${journal[0].title}</h2>
        <p class="muted">سه لایه، سه نقش: لایه پایه برای تنفس پوست، لایه میانی برای گرما و لایه بیرونی برای محافظت. در این راهنما یاد می‌گیرید چطور با کمترین تعداد لباس، بیشترین ترکیب را بسازید.</p>
        <a class="link" href="${ctx.base}journal.html">ادامه مطلب ${icon('arrow-left')}</a>
      </div>
    </article>
    <div class="journal-grid mt-4">
      ${journal.slice(1).concat(more).map(
        (j) => html`<article class="jcard"><div class="art jcard__art" style="--art-bg:${j.bg}">${garment(j.kind, COLORS[j.color][1])}</div><div class="row xs muted"><span>${j.cat}</span><span>·</span><span>${j.date}</span></div><h3><a href="${ctx.base}journal.html">${j.title}</a></h3></article>`
      )}
    </div>
  </div>
</section>`;
