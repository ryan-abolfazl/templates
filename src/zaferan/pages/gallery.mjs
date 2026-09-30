import { html, icon } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';
import { girih } from '../art.mjs';

export const meta = { title: 'گالری', layout: 'main', active: 'gallery', description: 'گالری غذاها و فضای رستوران زعفران' };

const items = [
  ['koobideh', 'چلوکباب کوبیده', 'kebab', 'tall'],
  ['ghormeh', 'قورمه‌سبزی', 'stew', ''],
  ['chai', 'چای سماوری', 'drink', ''],
  ['tahdig', 'ته‌دیگ طلایی', 'classic', 'wide'],
  ['fesenjan', 'فسنجان', 'stew', ''],
  ['sholeh', 'شله‌زرد', 'dessert', 'tall'],
  ['joojeh', 'جوجه‌کباب', 'kebab', ''],
  ['ash', 'آش رشته', 'classic', ''],
  ['shirazi', 'سالاد شیرازی', 'classic', ''],
  ['doogh', 'دوغ محلی', 'drink', ''],
];
const tags = { kebab: 'کباب', stew: 'خورش', classic: 'سنتی', dessert: 'دسر', drink: 'نوشیدنی' };

export default (ctx) => html`
${pageHero(ctx, { title: 'گالری زعفران', callig: 'هر بشقاب، یک داستان', sub: 'روی هر تصویر بزنید تا بزرگ‌تر ببینید. با کلیدهای جهت‌نما هم می‌توانید جابه‌جا شوید.', crumbs: ['گالری'] })}
<section class="section section--tight" data-filter>
  <div class="container">
    <div class="cat-tabs" role="group" aria-label="فیلتر گالری">
      <button class="cat-tab" type="button" data-filter-btn="*" aria-pressed="true">همه</button>
      ${Object.entries(tags).map(([k, v]) => html`<button class="cat-tab" type="button" data-filter-btn="${k}" aria-pressed="false">${v}</button>`)}
    </div>
    <div class="masonry">
      ${items.map(
        ([k, t, tag, size]) => html`<a class="masonry__item ${size ? `masonry__item--${size}` : ''}" href="${ctx.base}assets/img/dishes/${k}.svg" data-lightbox="food" data-caption="${t}" data-filter-item data-tags="${tag}" style="background-image:${girih('#e9c46a', 0.14)}">
          <img src="${ctx.base}assets/img/dishes/${k}.svg" alt="${t}" loading="lazy" width="600" height="600" />
          <span class="masonry__cap">${t}${icon('zoom-in')}</span>
        </a>`
      )}
    </div>
  </div>
</section>`;
