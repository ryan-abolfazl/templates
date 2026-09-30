import { html, icon } from '../../../tools/lib/html.mjs';
import { toothMark } from '../art.mjs';

export const meta = { title: 'صفحه پیدا نشد', layout: 'main', description: 'خطای ۴۰۴' };

export default (ctx) => html`
<section class="section nf">
  <div class="container center stack" style="justify-items:center;--gap:1.25rem">
    <div class="nf__art" aria-hidden="true"><span>۴</span><span class="nf__tooth">${toothMark()}</span><span>۴</span></div>
    <h1 class="h-lg">این صفحه <b>کشیده شده!</b></h1>
    <p class="muted" style="max-inline-size:30rem">صفحه‌ای که دنبالش بودید پیدا نشد. نگران نباشید؛ بقیه لبخندها سر جایشان هستند.</p>
    <div class="row wrap" style="justify-content:center"><a class="btn btn--primary btn--lg" href="${ctx.base}index.html">${icon('house')} صفحه اصلی</a><a class="btn btn--lg" href="${ctx.base}booking.html">${icon('calendar-plus')} رزرو نوبت</a></div>
  </div>
</section>`;
