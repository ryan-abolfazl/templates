import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero, ctaBand } from '../partials.mjs';
import { services, faq } from '../data.mjs';

export const meta = { title: 'تعرفه و بیمه', layout: 'main', active: 'pricing', description: 'تعرفه تقریبی خدمات، ماشین‌حساب هزینه و بیمه‌های طرف قرارداد' };

const insurers = ['بیمه دی', 'بیمه ایران', 'بیمه آسیا', 'بیمه البرز', 'بیمه دانا', 'بیمه پارسیان', 'بیمه معلم', 'بیمه سامان'];

export default (ctx) => html`
${pageHero(ctx, { title: html`تعرفه <b>شفاف</b>، بدون هزینه پنهان`, sub: 'قیمت‌ها تقریبی و بر اساس تعرفه ۱۴۰۵ هستند. هزینه دقیق پس از معاینه و به‌صورت مکتوب اعلام می‌شود.', crumbs: [{ label: 'تعرفه و بیمه' }] })}

<section class="section section--tight">
  <div class="container price-layout">
    <div class="card">
      <h2 class="h-sm mb" style="margin-block-end:1rem">تعرفه خدمات</h2>
      <div class="table-wrap" data-overflow-ok>
        <table class="ctable">
          <thead><tr><th scope="col">خدمت</th><th scope="col">مدت</th><th scope="col">شروع قیمت (تومان)</th></tr></thead>
          <tbody>${services.map((s) => html`<tr><th scope="row"><span class="row small">${icon(s.icon)} ${s.name}</span></th><td class="muted">${s.time}</td><td class="bold">${fa(s.from)}</td></tr>`)}</tbody>
        </table>
      </div>
    </div>

    <form class="card glass estimator stack" data-estimator aria-label="ماشین‌حساب هزینه" onsubmit="return false">
      <h2 class="h-sm">${icon('calculator')} تخمین هزینه درمان</h2>
      <p class="small muted">خدمات مورد نیاز را انتخاب کنید.</p>
      ${[
        ['لمینت سرامیکی', 12000000, true],
        ['ایمپلنت', 18000000],
        ['بلیچینگ', 4200000],
        ['جرم‌گیری', 850000, false, false],
      ].map(([n, p, qty = false, on = false]) => html`<label class="est-row"><span class="check"><input type="checkbox" value="${p}" ${on || qty ? 'checked' : ''} /></span><span>${n}<small class="xs muted" style="display:block">${fa(p)} تومان</small></span>${qty !== false ? html`<input class="input est-qty" type="number" min="1" max="20" value="6" data-est-qty aria-label="تعداد واحد ${n}" />` : ''}</label>`)}
      <div class="field"><label class="label" for="est-ins">بیمه تکمیلی</label><select class="select" id="est-ins" data-est-insurance><option value="0">ندارم</option><option value="0.3">پوشش ۳۰٪</option><option value="0.5">پوشش ۵۰٪</option><option value="0.7">پوشش ۷۰٪</option></select></div>
      <dl class="est-out">
        <div><dt>سهم بیمه</dt><dd data-est-cover>۰ تومان</dd></div>
        <div class="est-total"><dt>سهم شما (تقریبی)</dt><dd data-est-total>۰ تومان</dd></div>
      </dl>
      <p class="xs muted">${icon('credit-card')} امکان پرداخت در ۱۲ قسط بدون ضامن</p>
      <a class="btn btn--primary btn--block" href="${ctx.base}booking.html">دریافت برآورد دقیق در مشاوره رایگان</a>
    </form>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="section-head"><span class="eyebrow">${icon('shield-check')} بیمه‌ها</span><h2>بیمه‌های <b>طرف قرارداد</b></h2><p>مدارک بیمه را همراه داشته باشید؛ باقی کارها با ماست.</p></div>
    <div class="insurers">${insurers.map((n) => html`<div class="insurer glass">${icon('shield')}<span>${n}</span></div>`)}</div>
  </div>
</section>

<section class="section section--tight">
  <div class="container" style="max-inline-size:48rem">
    <h2 class="h-md center mb">سؤالات مالی</h2>
    <div class="accordion" data-accordion="single">${faq.slice(1, 4).map(([q, a], i) => html`<details ${i === 0 ? 'open' : ''}><summary>${q}${icon('chevron-down')}</summary><div class="accordion__body">${a}</div></details>`)}</div>
  </div>
</section>
${ctaBand(ctx)}`;
