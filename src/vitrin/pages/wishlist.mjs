import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { card, pageHead } from '../partials.mjs';
import { products } from '../data.mjs';

export const meta = { title: 'علاقه‌مندی‌ها', layout: 'main', description: 'فهرست محصولات ذخیره‌شده' };

const items = [products[2], products[5], products[8], products[11]];

export default (ctx) => html`
${pageHead(ctx, { title: 'علاقه‌مندی‌ها', kicker: `${fa(items.length)} محصول ذخیره‌شده`, crumbs: [{ label: 'حساب من', href: 'account.html' }, { label: 'علاقه‌مندی‌ها' }] })}
<section class="section section--tight">
  <div class="container">
    <div class="row-between mb-2 wrap" style="margin-block-end:2rem">
      <p class="small muted">${icon('bell')} وقتی قیمت محصولات این فهرست کاهش پیدا کند، به شما خبر می‌دهیم.</p>
      <div class="row"><button class="btn btn--sm" type="button" data-copy="https://vitrin.shop/wishlist/sara">${icon('share-2')} اشتراک فهرست</button><a class="btn btn--sm" href="${ctx.base}compare.html">${icon('columns-3')} مقایسه</a></div>
    </div>
    <div class="product-grid">${items.map((p) => card(ctx, p))}</div>
  </div>
</section>`;
