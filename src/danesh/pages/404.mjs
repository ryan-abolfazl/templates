import { html, icon } from '../../../tools/lib/html.mjs';

export const meta = { title: 'صفحه پیدا نشد', layout: 'main', description: 'خطای ۴۰۴' };

export default (ctx) => html`
<section class="section notfound">
  <div class="container center stack" style="justify-items:center;--gap:1.25rem">
    <div class="notfound__art" aria-hidden="true"><span>۴</span><span class="notfound__zero">${icon('graduation-cap')}</span><span>۴</span></div>
    <h1 style="font-size:var(--text-3xl)">این درس هنوز نوشته نشده!</h1>
    <p class="muted" style="max-inline-size:32rem">صفحه‌ای که دنبالش هستی پیدا نشد. شاید آدرس اشتباه است یا صفحه جابه‌جا شده. به جایش یک دوره تازه شروع کن!</p>
    <div class="row wrap" style="justify-content:center"><a class="btn btn--primary btn--lg" href="${ctx.base}index.html">${icon('house')} صفحه اصلی</a><a class="btn btn--lg" href="${ctx.base}courses.html">${icon('library-big')} همه دوره‌ها</a></div>
  </div>
</section>`;
