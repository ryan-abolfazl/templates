import { html, icon } from '../../../tools/lib/html.mjs';
import { dish } from '../art.mjs';

export const meta = { title: 'صفحه پیدا نشد', layout: 'main', description: 'خطای ۴۰۴' };

export default (ctx) => html`
<section class="section nf">
  <div class="container center stack" style="justify-items:center;--gap:1.25rem">
    <div class="nf__art" aria-hidden="true"><span>۴</span><span class="nf__plate">${dish('tahdig')}</span><span>۴</span></div>
    <p class="callig" style="font-size:var(--text-xl)">ای وای!</p>
    <h1 class="h-lg">این بشقاب خالی است</h1>
    <p class="muted" style="max-inline-size:30rem">صفحه‌ای که دنبالش بودید در منوی ما نیست. شاید بهتر است سری به منوی کامل بزنید.</p>
    <div class="row wrap" style="justify-content:center"><a class="btn btn--gold btn--lg" href="${ctx.base}menu.html">${icon('book-open')} منوی رستوران</a><a class="btn btn--lg" href="${ctx.base}index.html">صفحه اصلی</a></div>
  </div>
</section>`;
