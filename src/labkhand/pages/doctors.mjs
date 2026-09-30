import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero, doctorPortrait, ctaBand } from '../partials.mjs';
import { doctors } from '../data.mjs';

export const meta = { title: 'پزشکان', layout: 'main', active: 'doctors', description: 'معرفی پزشکان متخصص کلینیک لبخند' };

const tags = ['زیبایی', 'جراحی', 'ارتودنسی', 'درمان ریشه'];

export default (ctx) => html`
${pageHero(ctx, { title: html`تیم <b>متخصص</b> ما`, sub: 'پزشکانی با سال‌ها تجربه، آموزش‌دیده در بهترین مراکز ایران و جهان، که هر روز با همدلی کنار شما هستند.', crumbs: [{ label: 'پزشکان' }] })}
<section class="section section--tight" data-filter>
  <div class="container">
    <div class="row wrap mb" role="group" aria-label="فیلتر تخصص">
      <button class="chip" type="button" data-filter-btn="*" aria-pressed="true">همه متخصصان</button>
      ${tags.map((t, i) => html`<button class="chip" type="button" data-filter-btn="t${i}" aria-pressed="false">${t}</button>`)}
    </div>
    <div class="grid-4">
      ${doctors.map(
        (d, i) => html`<article class="card card--hover doc-card" data-filter-item data-tags="t${i}">${doctorPortrait(d)}<div class="doc-card__body">
          <h3><a href="${ctx.base}doctor.html">${d.name}</a></h3><span class="small muted">${d.role}</span>
          <div class="row small mt-1 wrap"><span class="rating">${icon('star')} ${fa(d.rating).replace('.', '٫')} <span class="muted xs">(${fa(d.reviews)})</span></span><span class="badge">${fa(d.exp)} سال تجربه</span></div>
          <a class="btn btn--soft btn--sm btn--block mt-2" href="${ctx.base}booking.html" style="position:relative;z-index:2">${icon('calendar-plus')} رزرو با ${d.name.replace('دکتر ', 'دکتر ')}</a>
        </div></article>`
      )}
    </div>
  </div>
</section>
${ctaBand(ctx)}`;
