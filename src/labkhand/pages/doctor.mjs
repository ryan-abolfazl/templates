import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { doctorPortrait, ctaBand } from '../partials.mjs';
import { doctors, reviews } from '../data.mjs';

export const meta = { title: 'دکتر مهسا رضوانی', layout: 'main', active: 'doctors', description: 'پروفایل پزشک: سوابق، تخصص‌ها، ساعات حضور و نظرات بیماران' };

const d = doctors[0];
const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه'];
const hours = ['۹ تا ۱۴', '—', '۱۴ تا ۲۱', '۹ تا ۱۴', '۱۴ تا ۲۱', '۹ تا ۱۳'];

export default (ctx) => html`
<section class="section section--tight">
  <div class="container doc-profile">
    <div class="doc-profile__art">${doctorPortrait(d)}<span class="badge badge--sun doc-profile__badge">${icon('award')} پزشک برتر ۱۴۰۴</span></div>
    <div class="stack" style="--gap:1.25rem">
      <nav class="breadcrumb" aria-label="مسیر صفحه"><a href="${ctx.base}index.html">خانه</a>${icon('chevron-left')}<a href="${ctx.base}doctors.html">پزشکان</a>${icon('chevron-left')}<span aria-current="page">${d.name}</span></nav>
      <h1 class="h-lg">${d.name}</h1>
      <p class="primary bold">${d.role}</p>
      <p class="muted">فارغ‌التحصیل دکترای تخصصی پروتزهای دندانی از دانشگاه علوم پزشکی تهران و فلوشیپ دندانپزشکی زیبایی از دانشگاه نیویورک. دکتر رضوانی بیش از ${fa(d.exp)} سال است که با رویکرد «کمترین تراش، طبیعی‌ترین نتیجه» لبخند بیماران را طراحی می‌کند.</p>
      <dl class="doc-stats">
        <div><dt>سال تجربه</dt><dd>${fa(d.exp)}</dd></div>
        <div><dt>امتیاز</dt><dd>${fa(d.rating).replace('.', '٫')}</dd></div>
        <div><dt>نظر بیماران</dt><dd>${fa(d.reviews)}</dd></div>
        <div><dt>زبان</dt><dd class="small">${d.lang}</dd></div>
      </dl>
      <div class="row wrap"><a class="btn btn--primary btn--lg" href="${ctx.base}booking.html">${icon('calendar-plus')} رزرو نوبت</a><span class="small muted">نظام پزشکی: <b class="ltr">۱۸۴۵۲</b></span></div>
    </div>
  </div>
</section>

<section class="section section--tight section--soft">
  <div class="container doc-details">
    <div class="card stack">
      <h2 class="h-sm">تخصص‌ها</h2>
      <div class="row wrap">${['لمینت سرامیکی', 'طراحی دیجیتال لبخند', 'روکش زیرکونیا', 'بازسازی کامل دهان', 'پروتز روی ایمپلنت'].map((t) => html`<span class="badge">${t}</span>`)}</div>
      <h2 class="h-sm mt-2">سوابق</h2>
      <ul class="list-plain check-list">${['عضو انجمن دندانپزشکی زیبایی آمریکا (AACD)', 'مدرس دوره‌های لمینت برای دندانپزشکان', 'ارائه مقاله در کنگره بین‌المللی دندانپزشکی ۲۰۲۴ دبی'].map((t) => html`<li>${icon('check')}<span>${t}</span></li>`)}</ul>
    </div>
    <div class="card stack">
      <h2 class="h-sm">ساعات حضور</h2>
      <ul class="list-plain hours">${days.map((dd, i) => html`<li class="${hours[i] === '—' ? 'is-off' : ''}"><span>${dd}</span><b>${hours[i] === '—' ? 'حضور ندارد' : hours[i]}</b></li>`)}</ul>
      <p class="xs muted">${icon('info')} نوبت‌های فوری را تلفنی هماهنگ کنید.</p>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <h2 class="h-md mb">نظرات بیماران</h2>
    <div class="grid-3">${reviews.map(([n, s, t]) => html`<figure class="card quote"><span class="rating">${icon('star')}${icon('star')}${icon('star')}${icon('star')}${icon('star')}</span><blockquote>${t}</blockquote><figcaption><b>${n}</b><span class="badge">${s}</span></figcaption></figure>`)}</div>
  </div>
</section>
${ctaBand(ctx)}`;
