import { html, icon } from '../../../tools/lib/html.mjs';
import { garment } from '../garments.mjs';

export const meta = { title: 'صفحه پیدا نشد', layout: 'main', description: 'خطای ۴۰۴' };

export default (ctx) => html`
<section class="section nf">
  <div class="container nf__grid">
    <div class="nf__art" aria-hidden="true"><span>۴</span>${garment('hat', '#b5532f')}<span>۴</span></div>
    <div class="stack" style="--gap:1.25rem;justify-items:start">
      <span class="kicker">خطای ۴۰۴</span>
      <h1>این صفحه از ویترین<br />برداشته شده.</h1>
      <p class="muted">شاید محصول فروش رفته یا آدرس تغییر کرده است. نگران نباشید؛ کالکشن تازه منتظر شماست.</p>
      <div class="row wrap"><a class="btn btn--solid btn--lg" href="${ctx.base}shop.html">رفتن به فروشگاه ${icon('arrow-left')}</a><a class="link" href="${ctx.base}index.html">صفحه اصلی</a></div>
    </div>
  </div>
</section>`;
