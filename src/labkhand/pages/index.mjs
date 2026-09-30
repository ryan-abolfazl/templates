import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { doctorPortrait, ctaBand } from '../partials.mjs';
import { smile } from '../art.mjs';
import { services, doctors, reviews, faq } from '../data.mjs';

export const meta = { title: 'کلینیک تخصصی دندانپزشکی', layout: 'main', active: 'home', description: 'کلینیک دندانپزشکی لبخند؛ لمینت، ایمپلنت، ارتودنسی نامرئی و رزرو آنلاین نوبت' };

export const compare = (label = 'مقایسه قبل و بعد درمان') => html`<div class="compare" data-compare>
  <div class="compare__before">${smile()}<span class="compare__label">قبل</span></div>
  <div class="compare__after">${smile({ after: true })}<span class="compare__label">بعد</span></div>
  <span class="compare__handle" aria-hidden="true"></span>
  <input type="range" min="0" max="100" value="50" aria-label="${label}" />
</div>`;

export default (ctx) => html`
<section class="hero">
  <div class="container hero__grid">
    <div class="hero__copy" data-reveal-stagger>
      <span class="eyebrow" data-reveal>${icon('sparkles')} طراحی دیجیتال لبخند، پیش از شروع درمان</span>
      <h1 data-reveal>لبخندی که <b>دوست دارید</b><br />نشانش دهید.</h1>
      <p data-reveal>درمان‌های زیبایی و تخصصی دندان با تیمی از بهترین متخصصان، تجهیزات دیجیتال و فضایی آرام؛ بدون درد، بدون نگرانی.</p>
      <div class="row wrap" data-reveal><a class="btn btn--primary btn--lg" href="${ctx.base}booking.html">${icon('calendar-plus')} رزرو نوبت آنلاین</a><a class="btn btn--glass btn--lg" href="${ctx.base}gallery.html">${icon('images')} نمونه کارها</a></div>
      <dl class="hero__trust" data-reveal>
        <div><dt>رضایت بیماران</dt><dd><span class="rating">${icon('star')} ۴٫۹</span></dd></div>
        <div><dt>لبخند ساخته‌شده</dt><dd>+<span data-count-to="12000">${fa(12000)}</span></dd></div>
        <div><dt>سال تجربه</dt><dd><span data-count-to="15">${fa(15)}</span></dd></div>
      </dl>
    </div>
    <div class="hero__visual">
      <div class="hero__orb" aria-hidden="true"></div>
      <div class="hero__frame glass">${compare('مقایسه قبل و بعد لمینت')}</div>
      <div class="float float--a glass"><span class="icon-bubble">${icon('calendar-check')}</span><div><b>نوبت بعدی خالی</b><span class="xs muted">امروز، ساعت ۱۶:۳۰</span></div></div>
      <div class="float float--b glass"><span class="icon-bubble">${icon('shield-check')}</span><div><b>ضمانت ۱۰ ساله</b><span class="xs muted">برای همه ایمپلنت‌ها</span></div></div>
      <div class="float float--c glass"><span class="mini-portrait">${doctorPortrait(doctors[0])}</span><div><b class="small">دکتر مهسا رضوانی</b><span class="xs muted">متخصص زیبایی · آنلاین</span></div></div>
    </div>
  </div>
</section>

<section class="container">
  <form class="quick glass" action="${ctx.base}booking.html" aria-label="رزرو سریع">
    <div class="field"><label class="label" for="q-s">${icon('stethoscope')} خدمت</label><select class="select" id="q-s">${services.map((s) => html`<option>${s.name}</option>`)}</select></div>
    <div class="field"><label class="label" for="q-d">${icon('user-round')} پزشک</label><select class="select" id="q-d"><option>فرقی ندارد</option>${doctors.map((d) => html`<option>${d.name}</option>`)}</select></div>
    <div class="field"><label class="label" for="q-t">${icon('calendar')} تاریخ</label><input class="input" id="q-t" data-datepicker readonly placeholder="انتخاب روز" /></div>
    <button class="btn btn--primary btn--lg" type="submit">جستجوی نوبت ${icon('arrow-left')}</button>
  </form>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><span class="eyebrow">${icon('heart-pulse')} خدمات ما</span><h2>هر آنچه برای یک <b>لبخند سالم</b> لازم دارید</h2><p>از چکاپ ساده تا بازسازی کامل لبخند؛ همه در یک کلینیک، با یک پرونده دیجیتال.</p></div>
    <div class="grid-4" data-reveal-stagger>
      ${services.map(
        (s) => html`<article class="card card--hover service-card" data-reveal>
          <span class="icon-bubble">${icon(s.icon)}</span>
          <h3>${s.name}</h3>
          <p>${s.short}</p>
          <a class="link stretch" href="${ctx.base}service.html">اطلاعات بیشتر ${icon('arrow-left')}</a>
        </article>`
      )}
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container why">
    <div class="why__art" data-reveal>
      <div class="why__frame">${doctorPortrait(doctors[1])}</div>
      <div class="float float--d glass"><span class="big-num"><span data-count-to="98">${fa(98)}</span>٪</span><span class="xs muted">درمان‌ها بدون درد<br />گزارش شده‌اند</span></div>
    </div>
    <div class="stack" style="--gap:1.5rem">
      <span class="eyebrow">${icon('badge-check')} چرا لبخند؟</span>
      <h2 class="h-lg">فناوری دقیق،<br /><b>دستانی مطمئن</b></h2>
      <p class="muted">در لبخند، هر درمان با اسکن سه‌بعدی دهان و طراحی دیجیتال شروع می‌شود تا نتیجه را پیش از شروع ببینید. متخصصان ما عضو انجمن‌های بین‌المللی هستند و سالانه دوره‌های تخصصی می‌گذرانند.</p>
      <ul class="list-plain check-list">
        ${['اسکنر داخل دهانی و طراحی لبخند سه‌بعدی (DSD)', 'استریلیزاسیون استاندارد اروپا با ثبت چرخه‌ها', 'بی‌حسی کامپیوتری بدون سوزن‌های دردناک', 'پرونده دیجیتال و پیگیری از طریق پیامک'].map((t) => html`<li>${icon('check')}<span>${t}</span></li>`)}
      </ul>
      <a class="btn btn--primary" href="${ctx.base}doctors.html" style="justify-self:start">آشنایی با پزشکان ${icon('arrow-left')}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><span class="eyebrow">${icon('route')} مسیر درمان</span><h2>از اولین مشاوره تا <b>لبخند نهایی</b></h2></div>
    <ol class="steps list-plain" data-reveal-stagger>
      ${[
        ['message-circle-heart', 'مشاوره رایگان', 'گفتگو درباره خواسته‌های شما و معاینه اولیه'],
        ['scan-line', 'اسکن و طراحی', 'اسکن سه‌بعدی و پیش‌نمایش لبخند جدید'],
        ['sparkles', 'درمان', 'اجرای دقیق طرح در کمترین جلسات ممکن'],
        ['heart-handshake', 'پیگیری', 'چکاپ‌های دوره‌ای و ضمانت کتبی درمان'],
      ].map(([i, t, d], n) => html`<li class="step card" data-reveal><span class="step__n">${fa('0' + (n + 1))}</span><span class="icon-bubble">${icon(i)}</span><h3>${t}</h3><p class="small muted">${d}</p></li>`)}
    </ol>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="row-between wrap mb">
      <div class="section-head section-head--start"><span class="eyebrow">${icon('users-round')} تیم پزشکی</span><h2>متخصصانی که به آن‌ها <b>اعتماد</b> می‌کنید</h2></div>
      <a class="link" href="${ctx.base}doctors.html">همه پزشکان ${icon('arrow-left')}</a>
    </div>
    <div class="grid-4">
      ${doctors.map(
        (d) => html`<article class="card card--hover doc-card">${doctorPortrait(d)}<div class="doc-card__body"><h3><a href="${ctx.base}doctor.html">${d.name}</a></h3><span class="small muted">${d.role}</span><div class="row small mt-1"><span class="rating">${icon('star')} ${fa(d.rating).replace('.', '٫')}</span><span class="muted">${fa(d.exp)} سال تجربه</span></div></div></article>`
      )}
    </div>
  </div>
</section>

<section class="section">
  <div class="container gallery-teaser">
    <div class="stack" style="--gap:1.5rem">
      <span class="eyebrow">${icon('images')} قبل و بعد</span>
      <h2 class="h-lg">تفاوت را <b>ببینید</b></h2>
      <p class="muted">دستگیره وسط تصویر را بکشید تا نتیجه درمان را مقایسه کنید. همه تصاویر با رضایت کتبی بیماران منتشر شده‌اند.</p>
      <a class="btn btn--primary" href="${ctx.base}gallery.html" style="justify-self:start">گالری کامل نمونه‌کارها ${icon('arrow-left')}</a>
    </div>
    <div class="gallery-teaser__pair">
      <figure>${compare('مقایسه قبل و بعد لمینت')}<figcaption class="small"><b>لمینت سرامیکی</b> · ۲ جلسه</figcaption></figure>
      <figure>${compare('مقایسه قبل و بعد بلیچینگ')}<figcaption class="small"><b>بلیچینگ</b> · ۱ جلسه</figcaption></figure>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="section-head"><span class="eyebrow">${icon('quote')} تجربه بیماران</span><h2>لبخندهایی که <b>روایت می‌کنند</b></h2></div>
    <div class="grid-3">
      ${reviews.map(([n, s, t]) => html`<figure class="card quote glass"><span class="rating">${icon('star')}${icon('star')}${icon('star')}${icon('star')}${icon('star')}</span><blockquote>${t}</blockquote><figcaption><b>${n}</b><span class="badge">${s}</span></figcaption></figure>`)}
    </div>
  </div>
</section>

<section class="section">
  <div class="container faq-wrap">
    <div class="stack" style="--gap:1.25rem">
      <span class="eyebrow">${icon('circle-help')} پرسش‌های متداول</span>
      <h2 class="h-lg">پاسخ سؤال‌های <b>شما</b></h2>
      <div class="card glass contact-mini">
        <span class="icon-bubble">${icon('headset')}</span>
        <div><b>سؤال دیگری دارید؟</b><p class="small muted">کارشناسان ما از ۹ صبح تا ۹ شب پاسخگو هستند.</p><a class="link mt-1" href="tel:02188776655">۰۲۱-۸۸۷۷۶۶۵۵ ${icon('arrow-left')}</a></div>
      </div>
    </div>
    <div class="accordion" data-accordion="single">${faq.map(([q, a], i) => html`<details ${i === 0 ? 'open' : ''}><summary>${q}${icon('chevron-down')}</summary><div class="accordion__body">${a}</div></details>`)}</div>
  </div>
</section>

${ctaBand(ctx)}`;
