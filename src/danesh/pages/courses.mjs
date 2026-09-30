import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { courseCard, pageHero } from '../partials.mjs';
import { categories, courses } from '../data.mjs';

export const meta = { title: 'همه دوره‌ها', layout: 'main', active: 'courses', description: 'فهرست دوره‌های آنلاین با فیلتر دسته، سطح و قیمت' };

export default (ctx) => html`
${pageHero(ctx, {
  title: 'همه دوره‌ها',
  sub: `${fa(300)}+ دوره پروژه‌محور در ${fa(categories.length)} دسته؛ اولین جلسه همه دوره‌ها رایگان است.`,
  crumbs: [{ label: 'دوره‌ها' }],
})}

<section class="section section--tight" data-filter>
  <div class="container listing">
    <aside class="filters" aria-label="فیلترها">
      <div class="filters__box">
        <div class="input-icon">${icon('search')}<input class="input" type="search" placeholder="جستجو در دوره‌ها" data-filter-search aria-label="جستجو در دوره‌ها" /></div>
      </div>
      <div class="filters__box">
        <h2 class="filters__title">دسته‌بندی</h2>
        <div class="filters__list" role="group" aria-label="دسته‌بندی">
          <button class="filters__item" type="button" data-filter-btn="*" aria-pressed="true">${icon('layout-grid')} همه دوره‌ها <span>${fa(courses.length)}</span></button>
          ${categories.map(
            (c) => html`<button class="filters__item" type="button" data-filter-btn="${c.key}" aria-pressed="false">${icon(c.icon)} ${c.name} <span>${fa(courses.filter((x) => x.cat === c.key).length)}</span></button>`
          )}
          <button class="filters__item" type="button" data-filter-btn="free" aria-pressed="false">${icon('gift')} دوره‌های رایگان <span>${fa(courses.filter((x) => !x.price).length)}</span></button>
        </div>
      </div>
      <div class="filters__box">
        <h2 class="filters__title">سطح</h2>
        <div class="stack" style="--gap:.6rem">${['مقدماتی', 'متوسط', 'پیشرفته'].map((l) => html`<label class="check"><input type="checkbox" /> ${l}</label>`)}</div>
      </div>
      <div class="filters__box">
        <h2 class="filters__title">مدت دوره</h2>
        <div class="stack" style="--gap:.6rem">${['کمتر از ۱۰ ساعت', '۱۰ تا ۲۵ ساعت', 'بیشتر از ۲۵ ساعت'].map((l) => html`<label class="check"><input type="radio" name="dur" /> ${l}</label>`)}</div>
      </div>
      <div class="filters__promo">
        <b>دانش پلاس</b>
        <p class="small">همه دوره‌ها با یک اشتراک، از ماهی ۳۹۰ هزار تومان.</p>
        <a class="btn btn--primary btn--sm" href="${ctx.base}pricing.html">مشاهده طرح‌ها</a>
      </div>
    </aside>

    <div>
      <div class="listing__bar">
        <p class="small"><b data-filter-count>${fa(courses.length)}</b> دوره پیدا شد</p>
        <label class="row small">مرتب‌سازی:
          <select class="select" style="inline-size:auto;min-height:2.6rem" aria-label="مرتب‌سازی">
            <option>محبوب‌ترین</option><option>جدیدترین</option><option>ارزان‌ترین</option><option>بیشترین امتیاز</option>
          </select>
        </label>
      </div>
      <div class="course-grid">${courses.map((c) => courseCard(ctx, c))}</div>
      <div class="empty" data-filter-empty hidden>${icon('search-x')}<b>دوره‌ای با این مشخصات پیدا نشد</b><span class="small">فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید.</span></div>
      <nav class="pager mt-4" aria-label="صفحه‌بندی"><span class="is-active" aria-current="page">۱</span><a href="${ctx.base}courses.html">۲</a><a href="${ctx.base}courses.html">۳</a><a href="${ctx.base}courses.html" aria-label="صفحه بعد">${icon('chevron-left')}</a></nav>
    </div>
  </div>
</section>`;
