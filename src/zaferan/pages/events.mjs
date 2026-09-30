import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';
import { dish, girih, ornament } from '../art.mjs';

export const meta = { title: 'مراسم و کترینگ', layout: 'main', active: 'events', description: 'سالن‌های خصوصی، منوی مراسم و کترینگ ایرانی' };

const packages = [
  { name: 'سفره ساده', price: 850000, items: ['یک نوع کباب یا خورش', 'سالاد و ماست', 'نوشیدنی', 'چای و شیرینی'] },
  { name: 'سفره اعیانی', price: 1450000, items: ['پیش‌غذای سنتی', 'دو نوع کباب + یک خورش', 'ته‌دیگ و سالاد', 'دسر و چای سماوری', 'موسیقی زنده'], best: true },
  { name: 'ضیافت شاهانه', price: 2400000, items: ['منوی آزاد سرآشپز', 'میز پیش‌غذا و آش', 'سه نوع کباب و دو خورش', 'میز دسر سنتی', 'دکور و گل‌آرایی'] },
];

export default (ctx) => html`
${pageHero(ctx, { title: 'مراسم و کترینگ', callig: 'جشن‌هایتان به رنگ زعفران', sub: 'از جشن تولد ۱۰ نفره تا مراسم ۳۰۰ نفره؛ در سالن‌های ما یا هر جای تهران که بخواهید.', crumbs: ['مراسم'] })}

<section class="section section--tight">
  <div class="container halls">
    ${[
      ['شاه‌نشین', '۱۰ تا ۲۰ نفر', 'اتاقی دنج با پنجره‌های ارسی و نور رنگی', 'sofa'],
      ['تالار آینه', '۳۰ تا ۶۰ نفر', 'سقف آینه‌کاری و صحنه موسیقی اختصاصی', 'sparkles'],
      ['حیاط و حوض', '۸۰ تا ۱۵۰ نفر', 'فضای باز با درختان نارنج و تخت‌های سنتی', 'trees'],
    ].map(([n, c, d, i]) => html`<article class="hall card" data-reveal><span class="exp__icon">${icon(i)}</span><h2 class="h-sm">${n}</h2><p class="gold small bold">${icon('users')} ${c}</p><p class="small muted">${d}</p></article>`)}
  </div>
</section>

<section class="section section--alt">
  <div class="pattern" style="background-image:${girih()}"></div>
  <div class="container">
    <div class="section-head"><p class="callig">منوی مراسم</p><h2>بسته‌های پذیرایی</h2>${ornament()}<p>قیمت‌ها به ازای هر نفر است؛ حداقل سفارش ۱۰ نفر.</p></div>
    <div class="packages">
      ${packages.map(
        (p) => html`<article class="package ${p.best ? 'package--best' : ''}">
          ${p.best ? html`<span class="tag package__flag">${icon('crown')} پرطرفدار</span>` : ''}
          <h3>${p.name}</h3>
          <p class="package__price">${fa(p.price / 1000)} <small>هزار تومان / نفر</small></p>
          ${ornament()}
          <ul class="list-plain">${p.items.map((i) => html`<li>${icon('check')} ${i}</li>`)}</ul>
          <a class="btn ${p.best ? 'btn--gold' : ''} btn--block" href="#event-form">درخواست این بسته</a>
        </article>`
      )}
    </div>
  </div>
</section>

<section class="section section--tight" id="event-form">
  <div class="container event-form">
    <div class="stack" style="--gap:1rem">
      <h2 class="h-lg">درخواست مراسم</h2>
      <p class="muted">فرم را پر کنید؛ مدیر مراسم ما ظرف ۲ ساعت کاری با شما تماس می‌گیرد و منوی پیشنهادی را می‌فرستد.</p>
      <div class="event-dishes" aria-hidden="true">${['koobideh', 'tahdig', 'sholeh'].map((k) => dish(k))}</div>
    </div>
    <form class="card form-grid" data-validate data-success="درخواست شما ثبت شد؛ به‌زودی تماس می‌گیریم">
      <div class="field"><label class="label" for="e-name">نام</label><input class="input" id="e-name" required /></div>
      <div class="field"><label class="label" for="e-phone">موبایل</label><input class="input" id="e-phone" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل ۱۱ رقمی و با ۰۹ شروع شود" /></div>
      <div class="field"><label class="label" for="e-type">نوع مراسم</label><select class="select" id="e-type"><option>جشن تولد</option><option>عقد و نامزدی</option><option>همایش و مهمانی شرکتی</option><option>ختم و یادبود</option><option>سایر</option></select></div>
      <div class="field"><label class="label" for="e-date">تاریخ</label><input class="input" id="e-date" data-datepicker readonly placeholder="انتخاب روز" /></div>
      <div class="field"><label class="label" for="e-count">تعداد مهمان</label><input class="input" id="e-count" type="number" min="10" value="30" required /></div>
      <div class="field"><label class="label" for="e-place">محل</label><select class="select" id="e-place"><option>سالن‌های زعفران</option><option>کترینگ در محل من</option></select></div>
      <div class="field full"><label class="label" for="e-note">توضیحات</label><textarea class="textarea" id="e-note" rows="3"></textarea></div>
      <button class="btn btn--gold btn--lg full" type="submit">ارسال درخواست</button>
    </form>
  </div>
</section>`;
