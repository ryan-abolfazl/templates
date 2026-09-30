import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { card, pageHead } from '../partials.mjs';
import { products, CATS, COLORS, SIZES } from '../data.mjs';

export const meta = { title: 'فروشگاه', layout: 'main', active: 'shop', description: 'همه محصولات ویترین با فیلتر دسته، سایز، رنگ و قیمت' };

const kinds = { coat: 'بارانی و پالتو', shirt: 'پیراهن', dress: 'پیراهن زنانه', pants: 'شلوار', sweater: 'بافت', bag: 'کیف', shoe: 'کفش', skirt: 'دامن', jacket: 'کاپشن', hat: 'کلاه', tee: 'تی‌شرت', scarf: 'شال' };

const filters = html`
  <div class="fbox">
    <h3>دسته</h3>
    <div class="flist" role="group" aria-label="دسته">
      <button type="button" data-filter-btn="*" aria-pressed="true">همه محصولات <small>${fa(products.length)}</small></button>
      ${Object.entries(CATS).map(([k, v]) => html`<button type="button" data-filter-btn="${k}" aria-pressed="false">${v} <small>${fa(products.filter((p) => p.cat === k).length)}</small></button>`)}
    </div>
  </div>
  <div class="fbox">
    <h3>نوع</h3>
    <div class="stack" style="--gap:.6rem">${Object.entries(kinds).slice(0, 7).map(([k, v]) => html`<label class="check"><input type="checkbox" /> ${v} <small>${fa(products.filter((p) => p.kind === k).length)}</small></label>`)}</div>
  </div>
  <div class="fbox">
    <h3>سایز</h3>
    <div class="size-pick size-pick--sm">${SIZES.map((s) => html`<label><input type="checkbox" name="fs" value="${s}" /><span>${s}</span></label>`)}</div>
  </div>
  <div class="fbox">
    <h3>رنگ</h3>
    <div class="swatch-pick">${Object.entries(COLORS).map(([k, [n, hex]]) => html`<label title="${n}"><input type="checkbox" aria-label="${n}" /><span class="swatch" style="--c:${hex}"></span></label>`)}</div>
  </div>
  <div class="fbox">
    <h3>محدوده قیمت</h3>
    <div data-range data-min="0" data-max="10000000">
      <div class="range"><input type="range" min="0" max="10000000" step="100000" value="500000" data-range-min aria-label="حداقل قیمت" /><input type="range" min="0" max="10000000" step="100000" value="8000000" data-range-max aria-label="حداکثر قیمت" /></div>
      <div class="row-between xs mt-2"><output data-range-out-min></output><output data-range-out-max></output></div>
    </div>
  </div>
  <label class="check"><input type="checkbox" /> فقط کالاهای تخفیف‌دار</label>`;

export default (ctx) => html`
${pageHead(ctx, { title: 'همه محصولات', sub: 'کالکشن پاییز ۱۴۰۵؛ پارچه‌های طبیعی، دوخت ایرانی و قیمت منصفانه.', crumbs: [{ label: 'فروشگاه' }], kicker: `${fa(products.length)} محصول` })}

<section class="section section--tight" data-filter>
  <div class="container shop">
    <aside class="shop__filters" aria-label="فیلترها">${filters}</aside>
    <div>
      <div class="shop__bar">
        <button class="btn btn--sm shop__filter-btn" type="button" data-drawer-open="filters" aria-controls="filters" aria-expanded="false">${icon('sliders-horizontal')} فیلترها</button>
        <p class="small muted"><b data-filter-count>${fa(products.length)}</b> محصول</p>
        <label class="row small">مرتب‌سازی <select class="select" style="inline-size:auto;min-height:2.6rem" aria-label="مرتب‌سازی"><option>جدیدترین</option><option>پرفروش‌ترین</option><option>ارزان‌ترین</option><option>گران‌ترین</option></select></label>
      </div>
      <div class="product-grid product-grid--3">${products.map((p) => card(ctx, p))}</div>
      <div class="empty" data-filter-empty hidden>${icon('shirt')}<b>محصولی پیدا نشد</b></div>
      <nav class="pager mt-4" aria-label="صفحه‌بندی"><span class="is-active" aria-current="page">۱</span><a href="${ctx.base}shop.html">۲</a><a href="${ctx.base}shop.html">۳</a><a href="${ctx.base}shop.html" aria-label="صفحه بعد">${icon('chevron-left')}</a></nav>
    </div>
  </div>
  <div class="drawer" id="filters" data-drawer>
    <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="فیلترها">
      <div class="drawer__head"><h2>فیلترها</h2><button class="icon-btn" type="button" data-drawer-close aria-label="بستن">${icon('x')}</button></div>
      <div class="drawer__body shop__filters shop__filters--drawer">${filters}</div>
      <div class="drawer__foot"><button class="btn btn--solid btn--block" type="button" data-drawer-close>نمایش نتایج</button></div>
    </div>
  </div>
</section>`;