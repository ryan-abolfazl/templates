import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { art, pageHead, price, stars, swatches } from '../partials.mjs';
import { products, CATS } from '../data.mjs';

export const meta = { title: 'مقایسه محصولات', layout: 'main', description: 'مقایسه ویژگی‌های محصولات کنار هم' };

const items = [products[0], products[4], products[8]];
const rows = [
  ['قیمت', (p) => price(p)],
  ['امتیاز', (p) => html`${stars(p.rating)} <span class="xs muted">(${fa(p.reviews)})</span>`],
  ['دسته', (p) => CATS[p.cat]],
  ['رنگ‌ها', (p) => swatches(p)],
  ['جنس', (_, i) => ['۱۰۰٪ کتان ارگانیک', '۸۰٪ پشم، ۲۰٪ نخ', '۱۰۰٪ جین نخی'][i]],
  ['فرم', (_, i) => ['آزاد', 'معمولی', 'جذب'][i]],
  ['فصل', (_, i) => ['پاییز و بهار', 'پاییز و زمستان', 'چهار فصل'][i]],
  ['محل تولید', (_, i) => ['تبریز', 'تهران', 'مشهد'][i]],
];

export default (ctx) => html`
${pageHead(ctx, { title: 'مقایسه محصولات', crumbs: [{ label: 'مقایسه' }] })}
<section class="section section--tight">
  <div class="container" style="overflow-x:auto" data-overflow-ok>
    <table class="compare" data-compare-table>
      <thead>
        <tr><th scope="col"><span class="sr-only">ویژگی</span></th>${items.map(
          (p, i) => html`<th scope="col"><div class="compare__head"><button class="icon-btn" type="button" data-compare-remove="${i + 1}" aria-label="حذف ${p.name} از مقایسه">${icon('x')}</button>${art(p)}<a class="bold" href="${ctx.base}product.html">${p.name}</a></div></th>`
        )}</tr>
      </thead>
      <tbody>
        ${rows.map(([label, fn]) => html`<tr><th scope="row">${label}</th>${items.map((p, i) => html`<td>${fn(p, i)}</td>`)}</tr>`)}
        <tr><th scope="row"><span class="sr-only">خرید</span></th>${items.map((p) => html`<td><a class="btn btn--solid btn--sm btn--block" href="${ctx.base}product.html">مشاهده و خرید</a></td>`)}</tr>
      </tbody>
    </table>
  </div>
</section>`;
