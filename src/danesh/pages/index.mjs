import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { courseCard, avatar } from '../partials.mjs';
import { categories, courses, instructors, testimonials } from '../data.mjs';

export const meta = { title: 'آموزش آنلاین مهارت‌های آینده', layout: 'main', active: 'home', description: 'آکادمی آنلاین دانش؛ دوره‌های پروژه‌محور برنامه‌نویسی، طراحی، هوش مصنوعی، زبان و کسب‌وکار' };

const paths = [
  { title: 'فرانت‌اند دولوپر', months: 6, icon: 'monitor-smartphone', steps: ['HTML و CSS', 'جاوااسکریپت', 'ری‌اکت', 'نکست‌جی‌اس', 'پروژه و رزومه'], jobs: '۱۲۰+ آگهی استخدام این هفته' },
  { title: 'تحلیلگر داده', months: 7, icon: 'chart-scatter', steps: ['پایتون', 'آمار کاربردی', 'پانداس و SQL', 'یادگیری ماشین', 'پروژه واقعی'], jobs: '۸۵+ آگهی استخدام این هفته' },
  { title: 'طراح محصول', months: 5, icon: 'pen-tool', steps: ['اصول طراحی', 'فیگما', 'تحقیق کاربر', 'دیزاین سیستم', 'نمونه‌کار'], jobs: '۶۰+ آگهی استخدام این هفته' },
];

const faq = [
  ['بعد از خرید، تا کی به دوره دسترسی دارم؟', 'دسترسی به دوره‌ها مادام‌العمر است و همه به‌روزرسانی‌های بعدی هم رایگان در اختیار شما قرار می‌گیرد.'],
  ['آیا گواهی پایان دوره معتبر است؟', 'بله. هر گواهی کد رهگیری یکتا دارد که کارفرما می‌تواند در صفحه استعلام گواهی آن را بررسی کند.'],
  ['اگر دوره را دوست نداشتم چه؟', 'تا ۷ روز پس از خرید، بدون هیچ سؤالی کل مبلغ را بازمی‌گردانیم.'],
  ['امکان پرداخت اقساطی وجود دارد؟', 'برای دوره‌های بالای ۲ میلیون تومان و اشتراک سالانه، پرداخت در ۴ قسط بدون بهره فعال است.'],
  ['ویدیوها را آفلاین هم می‌توانم ببینم؟', 'با اپلیکیشن اندروید و iOS دانش می‌توانید جلسات را دانلود و بدون اینترنت تماشا کنید.'],
];

export default (ctx) => html`
<section class="hero">
  <div class="container hero__inner" data-reveal-stagger>
    <p class="hero__kicker" data-reveal><span class="badge tone-accent">جدید</span> مسیر تحلیلگر داده با پروژه واقعی از بانک‌ها <a class="link-arrow" href="${ctx.base}courses.html">ببین ${icon('chevron-left')}</a></p>
    <h1 data-reveal>مهارتی یاد بگیر<br />که آینده‌ات را می‌سازد.</h1>
    <p class="hero__lead" data-reveal>دوره‌های پروژه‌محور برنامه‌نویسی، طراحی، هوش مصنوعی و زبان، با مدرسانی که هر روز در صنعت کار می‌کنند.</p>
    <form class="hero__search glass glass--lg" action="${ctx.base}courses.html" role="search" data-reveal>
      ${icon('search')}
      <label class="sr-only" for="hero-q">جستجوی دوره</label>
      <input id="hero-q" name="q" placeholder="جستجوی دوره، مهارت یا مدرس" />
      <button class="btn btn--primary" type="submit">جستجو</button>
    </form>
    <div class="hero__tags" data-reveal>${['پایتون', 'ری‌اکت', 'هوش مصنوعی', 'آیلتس'].map((t) => html`<a class="chip" href="${ctx.base}courses.html">${t}</a>`)}</div>
  </div>

  <div class="container hero__stage" data-reveal>
    <article class="hero-card glass glass--lg" aria-label="نمونه تجربه یادگیری">
      <div class="hero-card__screen" aria-hidden="true">
<pre class="ltr"><span class="k">function</span> <span class="f">makeCounter</span>() {
  <span class="k">let</span> count = <span class="n">0</span>;
  <span class="k">return</span> () => ++count;
}</pre>
        <span class="hero-card__play">${icon('play')}</span>
      </div>
      <div class="hero-card__info">
        <div class="person">${avatar(instructors[0].name, '', 'lg')}<span><b>Closure به زبان ساده</b><span>جاوااسکریپت از صفر تا حرفه‌ای · جلسه ۱۲</span></span></div>
        <div class="hero-card__progress"><div class="progress"><span style="--value:64%"></span></div><span class="xs muted">۱۱:۱۶ از ۱۷:۴۰</span></div>
      </div>
    </article>
    <div class="hero-pill hero-pill--a glass" aria-hidden="true"><b>۹۶٪</b><span>دوره‌ها را تا پایان ادامه می‌دهند</span></div>
    <div class="hero-pill hero-pill--b glass" aria-hidden="true"><span class="live-dot"></span><span><b>کلاس زنده رفع اشکال</b><span>امشب · ساعت ۲۰:۳۰</span></span></div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <dl class="stats-band" data-reveal-stagger>
      ${[
        [html`<span data-count-to="85">۸۵</span> هزار`, 'دانشجوی فعال'],
        [html`<span data-count-to="300" data-count-suffix="+">۳۰۰+</span>`, 'دوره پروژه‌محور'],
        ['۴٫۹', `میانگین رضایت از ${fa(24000)} نظر`],
        [html`<span data-count-to="2400" data-count-suffix="+">۲٬۴۰۰+</span>`, 'استخدام در سال گذشته'],
      ].map(([v, l]) => html`<div data-reveal><dt>${l}</dt><dd>${v}</dd></div>`)}
    </dl>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="section-head">
      <div><span class="eyebrow">دسته‌بندی‌ها</span><h2>از کجا شروع کنیم؟</h2></div>
      <a class="link-arrow" href="${ctx.base}courses.html">همه ${fa(300)}+ دوره ${icon('chevron-left')}</a>
    </div>
    <div class="cat-grid" data-reveal-stagger>
      ${categories.map(
        (c) => html`<a class="cat card--hover" href="${ctx.base}courses.html" data-reveal>
          <span class="tile__icon">${icon(c.icon)}</span>
          <span><b>${c.name}</b><span class="xs muted">${fa(c.count)} دوره</span></span>
        </a>`
      )}
    </div>
  </div>
</section>

<section class="section" data-filter>
  <div class="container">
    <div class="section-head">
      <div><span class="eyebrow">محبوب‌ترین‌ها</span><h2>دوره‌هایی که این ماه همه درباره‌شان حرف می‌زنند</h2></div>
      <div class="tabs" role="group" aria-label="فیلتر دسته">
        <button class="chip" type="button" data-filter-btn="*" aria-pressed="true">همه</button>
        ${['web', 'ai', 'design', 'english'].map((k) => html`<button class="chip" type="button" data-filter-btn="${k}" aria-pressed="false">${categories.find((c) => c.key === k).name}</button>`)}
        <button class="chip" type="button" data-filter-btn="free" aria-pressed="false">رایگان</button>
      </div>
    </div>
    <div class="course-grid">${courses.slice(0, 8).map((c) => courseCard(ctx, c))}</div>
    <p class="empty" data-filter-empty hidden>دوره‌ای در این دسته پیدا نشد.</p>
    <div class="center mt-4"><a class="btn btn--lg" href="${ctx.base}courses.html">مشاهده همه دوره‌ها ${icon('chevron-left')}</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--center">
      <span class="eyebrow">چرا دانش؟</span>
      <h2>یادگیری‌ای که واقعاً به نتیجه می‌رسد.</h2>
    </div>
    <div class="why" data-reveal-stagger>
      ${[
        ['hammer', 'پروژه‌محور، نه تئوری‌محور', 'در هر دوره دست‌کم ۳ پروژه واقعی می‌سازید که مستقیم به نمونه‌کارتان اضافه می‌شود.'],
        ['messages-square', 'منتور شخصی', 'سؤال‌هایتان در کمتر از ۴ ساعت توسط منتور همان دوره پاسخ داده می‌شود.'],
        ['infinity', 'دسترسی همیشگی', 'یک بار بخرید و برای همیشه ببینید؛ همراه با همه به‌روزرسانی‌های بعدی.'],
      ].map(([i, t, d]) => html`<article class="why__item" data-reveal><span class="tile__icon">${icon(i)}</span><h3>${t}</h3><p>${d}</p></article>`)}
    </div>
  </div>
</section>

<section class="section section--tight" id="paths">
  <div class="container">
    <div class="section-head">
      <div><span class="eyebrow">مسیرهای یادگیری</span><h2>نمی‌دانی از کدام دوره شروع کنی؟ یک مسیر انتخاب کن.</h2><p>هر مسیر چند دوره را با ترتیب درست، یک پروژه پایانی و کمک برای ورود به بازار کار کنار هم می‌گذارد.</p></div>
    </div>
    <div class="paths" data-reveal-stagger>
      ${paths.map(
        (p) => html`<article class="path" data-reveal>
          <div class="row-between"><span class="tile__icon">${icon(p.icon)}</span><span class="badge">${fa(p.months)} ماه</span></div>
          <h3>${p.title}</h3>
          <ol class="path__steps">${p.steps.map((s) => html`<li>${s}</li>`)}</ol>
          <p class="xs muted">${icon('briefcase-business')} ${p.jobs}</p>
          <a class="btn btn--block" href="${ctx.base}courses.html">شروع مسیر</a>
        </article>`
      )}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div><span class="eyebrow">مدرسان</span><h2>از کسانی یاد بگیر که هر روز همین کار را می‌کنند.</h2></div>
      <a class="link-arrow" href="${ctx.base}instructor.html">همه مدرسان ${icon('chevron-left')}</a>
    </div>
    <div class="teachers" data-reveal-stagger>
      ${instructors.slice(0, 4).map(
        (t) => html`<a class="teacher card--hover" href="${ctx.base}instructor.html" data-reveal>
          ${avatar(t.name, t.tone, 'xl')}
          <b>${t.name}</b><span class="xs muted">${t.role}</span>
          <div class="row xs"><span class="rating">${icon('star')} ${fa(t.rating).replace('.', '٫')}</span><span class="muted">${fa(t.students)} دانشجو</span></div>
        </a>`
      )}
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="section-head" data-carousel-head>
      <div><span class="eyebrow">داستان دانشجوها</span><h2>آن‌ها شروع کردند؛ حالا نوبت توست.</h2></div>
    </div>
    <div data-carousel>
      <div class="carousel__track" data-carousel-track data-overflow-ok>
        ${testimonials.concat(testimonials.slice(0, 2)).map(
          (t) => html`<figure class="quote">
            <blockquote>${t.text}</blockquote>
            <figcaption class="person">${avatar(t.name, t.tone)}<span><b>${t.name}</b><span>${t.role}</span></span></figcaption>
          </figure>`
        )}
      </div>
      <div class="row-between">
        <div class="carousel__dots" data-carousel-dots></div>
        <div class="carousel__nav"><button class="btn btn--icon" type="button" data-carousel-prev aria-label="قبلی">${icon('chevron-right')}</button><button class="btn btn--icon" type="button" data-carousel-next aria-label="بعدی">${icon('chevron-left')}</button></div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container faq-grid">
    <div>
      <span class="eyebrow">سؤالات پرتکرار</span>
      <h2 class="mt-1" style="font-size:var(--text-3xl)">هنوز سؤالی داری؟</h2>
      <p class="muted mt-1">اگر جوابت را اینجا پیدا نکردی، تیم پشتیبانی هر روز از ۹ صبح تا ۱۲ شب آنلاین است.</p>
      <a class="link-arrow mt-2" href="${ctx.base}contact.html">گفتگو با پشتیبانی ${icon('chevron-left')}</a>
    </div>
    <div class="accordion" data-accordion="single">
      ${faq.map(([q, a], i) => html`<details ${i === 0 ? 'open' : ''}><summary>${q}<span class="plus">${icon('plus')}</span></summary><div class="accordion__body">${a}</div></details>`)}
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="cta glass glass--lg" data-reveal>
      <h2>اولین جلسه همه دوره‌ها رایگان است.</h2>
      <p>ثبت‌نام کن، هر دوره‌ای را امتحان کن و فقط وقتی مطمئن شدی بخر.</p>
      <div class="row wrap" style="justify-content:center"><a class="btn btn--primary btn--lg" href="${ctx.base}register.html">ثبت‌نام رایگان</a><a class="btn btn--lg" href="${ctx.base}courses.html">دیدن دوره‌ها</a></div>
    </div>
  </div>
</section>`;
