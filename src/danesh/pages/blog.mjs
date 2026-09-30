import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';
import { posts } from '../data.mjs';

export const meta = { title: 'مجله دانش', layout: 'main', active: 'blog', description: 'مقاله‌های آموزشی، نقشه راه و نکات بازار کار' };

export const postCard = (ctx, p, big = false) => html`<article class="post-card ${big ? 'post-card--big' : ''} card--hover">
  <div class="post-card__art cover c-${p.tone}"><span class="cover__icon">${icon(p.icon)}</span></div>
  <div class="post-card__body">
    <div class="row xs muted"><span class="badge">${p.cat}</span><span>${p.date}</span><span>${icon('clock')} ${fa(p.read)} دقیقه</span></div>
    <h3><a href="${ctx.base}post.html">${p.title}</a></h3>
    ${big ? html`<p class="muted">اگر امسال می‌خواهید وارد دنیای فرانت‌اند شوید، این نقشه راه قدم‌به‌قدم مسیر را از HTML تا اولین مصاحبه شغلی نشانتان می‌دهد.</p>` : ''}
  </div>
</article>`;

export default (ctx) => html`
${pageHero(ctx, {
  title: 'مجله دانش',
  sub: 'نقشه راه، راهنمای شغلی و نکته‌های یادگیری؛ هر هفته دو مقاله تازه.',
  crumbs: [{ label: 'مجله' }],
  extra: html`<div class="row wrap mt-3">${['همه', 'برنامه‌نویسی', 'هوش مصنوعی', 'طراحی', 'زبان', 'بازار کار'].map((t, i) => html`<a class="chip ${i === 0 ? 'is-active' : ''}" href="${ctx.base}blog.html">${t}</a>`)}</div>`,
})}

<section class="section section--tight">
  <div class="container">
    <div class="blog-grid">
      ${postCard(ctx, posts[0], true)}
      ${posts.slice(1).map((p) => postCard(ctx, p))}
      ${posts.slice(1, 4).map((p) => postCard(ctx, { ...p, tone: ['mint', 'ink', 'lime'][posts.indexOf(p) % 3] }))}
    </div>
    <nav class="pager mt-4" aria-label="صفحه‌بندی"><span class="is-active" aria-current="page">۱</span><a href="${ctx.base}blog.html">۲</a><a href="${ctx.base}blog.html">۳</a><a href="${ctx.base}blog.html" aria-label="صفحه بعد">${icon('chevron-left')}</a></nav>
  </div>
</section>`;
