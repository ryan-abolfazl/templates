import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';
import { CATS, menu } from '../data.mjs';
import { menuItem } from './index.mjs';

export const meta = { title: 'منوی رستوران', layout: 'main', active: 'menu', description: 'منوی کامل رستوران زعفران با قیمت و توضیحات' };

export default (ctx) => html`
${pageHero(ctx, { title: 'منوی زعفران', callig: 'سفره‌ای به رنگ زعفران', sub: 'همه غذاها با برنج ایرانی درجه یک، زعفران قائنات و گوشت تازه روز تهیه می‌شوند. قیمت‌ها به هزار تومان است.', crumbs: ['منو'] })}

<section class="section section--tight" data-filter>
  <div class="container">
    <div class="cat-tabs" role="group" aria-label="دسته‌بندی منو">
      <button class="cat-tab" type="button" data-filter-btn="*" aria-pressed="true">${icon('utensils')} همه</button>
      ${CATS.map(([k, n, i]) => html`<button class="cat-tab" type="button" data-filter-btn="${k}" aria-pressed="false">${icon(i)} ${n}</button>`)}
    </div>
    <div class="menu-search"><div class="input-icon">${icon('search')}<input class="input" type="search" placeholder="جستجوی غذا، مثلاً فسنجان" data-filter-search aria-label="جستجو در منو" /></div></div>
    <div class="menu-cols mt-3">${menu.map(menuItem)}</div>
    <p class="center muted" data-filter-empty hidden>غذایی با این نام پیدا نشد.</p>
    <div class="menu-note card mt-4">
      ${icon('leaf')}
      <p class="small">غذاهای دارای برچسب <span class="tag tag--veg">گیاهی</span> بدون گوشت تهیه می‌شوند. در صورت حساسیت غذایی، پیش از سفارش با کارکنان ما هماهنگ کنید. ۹٪ مالیات بر ارزش افزوده به صورتحساب اضافه می‌شود.</p>
      <a class="btn btn--sm" href="${ctx.base}qr-menu.html">${icon('qr-code')} منوی دیجیتال</a>
    </div>
  </div>
</section>`;
