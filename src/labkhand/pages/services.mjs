import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero, ctaBand } from '../partials.mjs';
import { services } from '../data.mjs';

export const meta = { title: 'خدمات دندانپزشکی', layout: 'main', active: 'services', description: 'همه خدمات کلینیک لبخند با زمان و هزینه تقریبی' };

export default (ctx) => html`
${pageHero(ctx, { title: html`خدمات <b>تخصصی</b> دندانپزشکی`, sub: 'درمان‌های زیبایی، ترمیمی و جراحی با تجهیزات دیجیتال؛ هزینه‌ها تقریبی است و پس از معاینه دقیق اعلام می‌شود.', crumbs: [{ label: 'خدمات' }] })}
<section class="section section--tight">
  <div class="container services-list">
    ${services.map(
      (s, i) => html`<article class="card card--hover svc-row" data-reveal>
        <span class="icon-bubble">${icon(s.icon)}</span>
        <div class="svc-row__main"><h2>${s.name}</h2><p class="muted small">${s.short}</p></div>
        <dl class="svc-row__meta"><div><dt>مدت درمان</dt><dd>${s.time}</dd></div><div><dt>شروع قیمت از</dt><dd>${fa(s.from)} <small>تومان</small></dd></div></dl>
        <div class="row"><a class="btn btn--soft btn--sm" href="${ctx.base}service.html">جزئیات</a><a class="btn btn--primary btn--sm" href="${ctx.base}booking.html">نوبت</a></div>
      </article>`
    )}
  </div>
</section>
${ctaBand(ctx)}`;
