import { html, icon, fa, toman } from '../../../tools/lib/html.mjs';
import { pageHead } from '../partials.mjs';
import { products } from '../data.mjs';

export const meta = { title: 'محصولات', layout: 'app', active: 'products', description: 'فهرست محصولات با فیلتر دسته و نمای شبکه/فهرست' };

const cats = [...new Set(products.map((p) => p.cat))];
const slug = (s) => s.replace(/\s+/g, '-');

const stockBadge = (n) =>
  n === 0 ? html`<span class="badge t-danger">ناموجود</span>` : n < 10 ? html`<span class="badge t-warning">${fa(n)} عدد باقی‌مانده</span>` : html`<span class="badge t-success">موجود</span>`;

export default (ctx) => html`
${pageHead(ctx, {
  title: 'محصولات',
  sub: `${fa(products.length)} محصول در ${fa(cats.length)} دسته`,
  crumbs: [{ label: 'فروشگاه' }, { label: 'محصولات' }],
  actions: html`<a class="btn btn--primary" href="${ctx.base}product-form.html">${icon('plus')} افزودن محصول</a>`,
})}

<section data-filter>
  <div class="row-between wrap mb-2">
    <div class="filter-chips" role="group" aria-label="فیلتر دسته">
      <button class="chip" type="button" data-filter-btn="*" aria-pressed="true">همه</button>
      ${cats.map((c) => html`<button class="chip" type="button" data-filter-btn="${slug(c)}" aria-pressed="false">${c}</button>`)}
    </div>
    <div class="row">
      <div class="input-icon" style="inline-size:15rem">${icon('search')}<input class="input input--sm" type="search" placeholder="جستجوی محصول" data-filter-search aria-label="جستجوی محصول" /></div>
      <div class="btn-group" role="group" aria-label="نوع نمایش">
        <button type="button" aria-pressed="true" data-view="grid" data-view-target="#product-grid" aria-label="نمای شبکه">${icon('layout-grid')}</button>
        <button type="button" aria-pressed="false" data-view="list" data-view-target="#product-grid" aria-label="نمای فهرست">${icon('list')}</button>
      </div>
    </div>
  </div>

  <div class="product-grid" id="product-grid" data-layout="grid">
    ${products.map(
      (p) => html`<article class="card product-card" data-filter-item data-tags="${slug(p.cat)}">
        <div class="product-card__media">
          <div class="thumb thumb--lg ${p.tone}">${icon(p.icon)}</div>
          ${p.sold > 400 ? html`<span class="badge badge--solid t-accent">پرفروش</span>` : ''}
          <div data-dropdown class="product-card__menu">
            <button class="icon-btn icon-btn--sm" type="button" data-dropdown-toggle aria-expanded="false" aria-label="عملیات ${p.name}">${icon('ellipsis')}</button>
            <div class="dropdown-menu" data-dropdown-menu>
              <a href="${ctx.base}product-form.html">${icon('pencil')} ویرایش</a>
              <button type="button" data-toast="محصول کپی شد">${icon('copy')} تکثیر</button>
              <button type="button" class="danger" data-toast="محصول به سطل زباله منتقل شد" data-toast-type="error">${icon('trash-2')} حذف</button>
            </div>
          </div>
        </div>
        <div class="product-card__body">
          <div class="product-card__meta"><span>${p.cat} · <span class="ltr">${p.sku}</span></span><span class="stars">${icon('star')} ${fa(p.rating).replace('.', '٫')}</span></div>
          <h3 class="mt-1">${p.name}</h3>
          <p class="product-card__price mt-1">${toman(p.price)}</p>
        </div>
        <div class="product-card__foot">${stockBadge(p.stock)}<span class="muted">${fa(p.sold)} فروش</span></div>
      </article>`
    )}
  </div>
  <div class="empty card" data-filter-empty hidden>${icon('package-search')}<strong>محصولی پیدا نشد</strong><span class="small">فیلتر دیگری را امتحان کنید.</span></div>
</section>`;
