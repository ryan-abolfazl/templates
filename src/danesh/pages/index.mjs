import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { courseCard, avatar, cover } from '../partials.mjs';
import { categories, courses, instructors, testimonials } from '../data.mjs';

export const meta = { title: 'آموزش آنلاین مهارت‌های آینده', layout: 'main', active: 'home', description: 'آکادمی آنلاین دانش؛ دوره‌های پروژه‌محور برنامه‌نویسی، طراحی، هوش مصنوعی، زبان و کسب‌وکار' };

const paths = [
  { title: 'فرانت‌اند دولوپر', months: 6, tone: 'lime', icon: 'monitor-smartphone', steps: ['HTML و CSS', 'جاوااسکریپت', 'ری‌اکت', 'نکست‌جی‌اس', 'پروژه و رزومه'], jobs: '۱۲۰+ آگهی استخدام این هفته' },
  { title: 'تحلیلگر داده', months: 7, tone: 'violet', icon: 'chart-scatter', steps: ['پایتون', 'آمار کاربردی', 'پانداس و SQL', 'یادگیری ماشین', 'پروژه واقعی'], jobs: '۸۵+ آگهی استخدام این هفته' },
  { title: 'طراح محصول', months: 5, tone: 'pink', icon: 'pen-tool', steps: ['اصول طراحی', 'فیگما', 'تحقیق کاربر', 'دیزاین سیستم', 'نمونه‌کار'], jobs: '۶۰+ آگهی استخدام این هفته' },
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
  <div class="container hero__grid">
    <div class="hero__copy" data-reveal-stagger>
      <span class="eyebrow" data-reveal><i>${icon('sparkles')}</i> بیش از ۸۵ هزار دانشجو به ما اعتماد کرده‌اند</span>
      <h1 data-reveal>مهارتی یاد بگیر که <span class="mark">آینده‌ات</span> را می‌سازد</h1>
      <p data-reveal>دوره‌های پروژه‌محور برنامه‌نویسی، طراحی، هوش مصنوعی و زبان، با مدرسانی که هر روز در صنعت کار می‌کنند. از اولین جلسه تا اولین شغل کنارت هستیم.</p>
      <form class="hero__search" action="${ctx.base}courses.html" role="search" data-reveal>
        ${icon('search')}
        <label class="sr-only" for="hero-q">جستجوی دوره</label>
        <input id="hero-q" name="q" placeholder="مثلاً جاوااسکریپت، آیلتس یا فیگما…" />
        <button class="btn btn--primary" type="submit">جستجو</button>
      </form>
      <div class="hero__tags" data-reveal><span class="small muted">محبوب:</span>${['پایتون', 'ری‌اکت', 'هوش مصنوعی', 'آیلتس', 'UI/UX'].map((t) => html`<a class="chip" href="${ctx.base}courses.html">${t}</a>`)}</div>
      <div class="hero__proof" data-reveal>
        <div class="avatar-stack">${instructors.slice(0, 4).map((t) => avatar(t.name, t.tone))}</div>
        <div><b class="rating">${icon('star')}${icon('star')}${icon('star')}${icon('star')}${icon('star')} ۴٫۹</b><span class="xs muted">میانگین رضایت از ${fa(24000)} نظر</span></div>
      </div>
    </div>

    <div class="bento hero__bento" aria-label="نمونه تجربه یادگیری">
      <article class="tile tile--player" data-reveal>
        <div class="tile__top"><span class="badge tone-ink">${icon('play')} در حال یادگیری</span><span class="xs bold">جلسه ۱۲ از ۱۴۲</span></div>
        ${cover(courses[0], 'tile__cover')}
        <div class="stack" style="--gap:.5rem">
          <b>Closure به زبان ساده</b>
          <div class="progress"><span style="--value:64%"></span></div>
          <div class="row-between xs"><span>۱۱:۱۶</span><span>۱۷:۴۰</span></div>
        </div>
      </article>
      <article class="tile tile--stat" data-reveal>
        <span class="tile__big"><span data-count-to="96">۹۶</span>٪</span>
        <p>دانشجویان دوره‌ها را تا پایان ادامه می‌دهند</p>
      </article>
      <article class="tile tile--live" data-reveal>
        <span class="live-dot">کلاس زنده</span>
        <b>رفع اشکال ری‌اکت</b>
        <span class="xs">امشب · ساعت ۲۰:۳۰</span>
        <div class="avatar-stack">${['سارا', 'رضا', 'نگار'].map((n, i) => avatar(n, ['coral', 'sky', 'amber'][i], 'sm'))}<span class="avatar avatar--sm tone-ink">+۳۸</span></div>
      </article>
      <article class="tile tile--cert" data-reveal>
        <span class="tile__seal">${icon('award')}</span>
        <div><b>گواهی پایان دوره</b><span class="xs">قابل استعلام برای کارفرما</span></div>
      </article>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  ${[0, 1].map(() => html`<div class="marquee__track">${['جاوااسکریپت', 'پایتون', 'فیگما', 'آیلتس', 'ری‌اکت', 'سئو', 'هوش مصنوعی', 'اکسل', 'تست نفوذ', 'مدیریت محصول', 'تدوین ویدیو', 'SQL'].map((s) => html`<span>${s}</span>`)}</div>`)}
</div>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div><span class="eyebrow"><i>${icon('compass')}</i> دسته‌بندی‌ها</span><h2>از کجا <span class="squiggle">شروع</span> کنیم؟</h2></div>
      <a class="link-arrow" href="${ctx.base}courses.html">همه ${fa(300)}+ دوره ${icon('arrow-left')}</a>
    </div>
    <div class="cat-grid" data-reveal-stagger>
      ${categories.map(
        (c) => html`<a class="cat card--hover tone-${c.tone}" href="${ctx.base}courses.html" data-reveal>
          <span class="cat__icon">${icon(c.icon)}</span>
          <b>${c.name}</b>
          <span class="xs muted">${fa(c.count)} دوره</span>
          ${icon('arrow-up-left', 'cat__arrow')}
        </a>`
      )}
    </div>
  </div>
</section>

<section class="section section--cream" data-filter>
  <div class="container">
    <div class="section-head">
      <div><span class="eyebrow"><i>${icon('flame')}</i> محبوب‌ترین‌ها</span><h2>دوره‌هایی که این ماه همه درباره‌شان حرف می‌زنند</h2></div>
      <div class="tabs" role="group" aria-label="فیلتر دسته">
        <button class="chip" type="button" data-filter-btn="*" aria-pressed="true">همه</button>
        ${['web', 'ai', 'design', 'english'].map((k) => html`<button class="chip" type="button" data-filter-btn="${k}" aria-pressed="false">${categories.find((c) => c.key === k).name}</button>`)}
        <button class="chip" type="button" data-filter-btn="free" aria-pressed="false">${icon('gift')} رایگان</button>
      </div>
    </div>
    <div class="course-grid">${courses.slice(0, 8).map((c) => courseCard(ctx, c))}</div>
    <p class="empty" data-filter-empty hidden>دوره‌ای در این دسته پیدا نشد.</p>
    <div class="center mt-4"><a class="btn btn--ink btn--lg" href="${ctx.base}courses.html">مشاهده همه دوره‌ها ${icon('arrow-left')}</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--center">
      <span class="eyebrow"><i>${icon('heart-handshake')}</i> چرا دانش؟</span>
      <h2>یادگیری‌ای که واقعاً <span class="mark">به نتیجه</span> می‌رسد</h2>
    </div>
    <div class="why" data-reveal-stagger>
      <article class="tile why__a tone-lime" data-reveal>
        <span class="tile__icon">${icon('hammer')}</span>
        <h3>پروژه‌محور، نه تئوری‌محور</h3>
        <p>در هر دوره حداقل ۳ پروژه واقعی می‌سازید که مستقیم به نمونه‌کارتان اضافه می‌شود.</p>
        <div class="why__projects">${['اپ آب‌وهوا', 'فروشگاه آنلاین', 'داشبورد داده', 'لندینگ پیج'].map((p) => html`<span class="chip">${p}</span>`)}</div>
      </article>
      <article class="tile why__b" data-reveal>
        <span class="tile__icon tone-violet">${icon('messages-square')}</span>
        <h3>منتور شخصی</h3>
        <p>سؤال‌هایتان در کمتر از ۴ ساعت توسط منتور پاسخ داده می‌شود.</p>
        <div class="chat-mini"><span class="bubble">چرا این useEffect دو بار اجرا می‌شه؟ 🤔</span><span class="bubble bubble--me">به‌خاطر StrictMode در حالت توسعه‌ست؛ نگران نباش 😉</span></div>
      </article>
      <article class="tile why__c tone-ink" data-reveal>
        <span class="tile__big"><span data-count-to="2400" data-count-suffix="+">۲٬۴۰۰+</span></span>
        <p>دانشجوی دانش در سال گذشته استخدام شدند</p>
      </article>
      <article class="tile why__d" data-reveal>
        <span class="tile__icon tone-amber">${icon('infinity')}</span>
        <h3>دسترسی همیشگی</h3>
        <p>یک بار بخرید، برای همیشه ببینید؛ با همه به‌روزرسانی‌ها.</p>
      </article>
      <article class="tile why__e tone-sky" data-reveal>
        <span class="tile__icon">${icon('users-round')}</span>
        <h3>جامعه ۸۵ هزار نفری</h3>
        <p>چالش‌های هفتگی، رویدادهای آنلاین و گروه‌های مطالعه.</p>
      </article>
    </div>
  </div>
</section>

<section class="section section--ink" id="paths">
  <div class="container">
    <div class="section-head">
      <div><span class="eyebrow" style="color:var(--ink)"><i>${icon('route')}</i> مسیرهای یادگیری</span><h2>نمی‌دانی از کدام دوره شروع کنی؟ یک مسیر انتخاب کن.</h2><p class="muted">مسیرها ترکیبی از چند دوره با ترتیب درست، پروژه پایانی و کمک برای ورود به بازار کار هستند.</p></div>
    </div>
    <div class="paths">
      ${paths.map(
        (p) => html`<article class="path tone-${p.tone}" data-reveal>
          <div class="row-between"><span class="path__icon">${icon(p.icon)}</span><span class="badge tone-ink">${fa(p.months)} ماه</span></div>
          <h3>${p.title}</h3>
          <ol class="path__steps">${p.steps.map((s) => html`<li>${s}</li>`)}</ol>
          <p class="xs bold">${icon('briefcase-business')} ${p.jobs}</p>
          <a class="btn btn--ink btn--block" href="${ctx.base}courses.html">شروع مسیر ${icon('arrow-left')}</a>
        </article>`
      )}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div><span class="eyebrow"><i>${icon('graduation-cap')}</i> مدرسان</span><h2>از کسانی یاد بگیر که هر روز همین کار را می‌کنند</h2></div>
      <a class="link-arrow" href="${ctx.base}instructor.html">همه مدرسان ${icon('arrow-left')}</a>
    </div>
    <div class="teachers" data-reveal-stagger>
      ${instructors.slice(0, 4).map(
        (t) => html`<a class="teacher card--hover" href="${ctx.base}instructor.html" data-reveal>
          <div class="teacher__art tone-${t.tone}">${avatar(t.name, t.tone, 'xl')}</div>
          <b>${t.name}</b><span class="xs muted">${t.role}</span>
          <div class="row xs"><span class="rating">${icon('star')} ${fa(t.rating).replace('.', '٫')}</span><span class="muted">${fa(t.students)} دانشجو</span></div>
        </a>`
      )}
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head" data-carousel-head>
      <div><span class="eyebrow"><i>${icon('quote')}</i> داستان دانشجوها</span><h2>آن‌ها شروع کردند؛ حالا نوبت توست</h2></div>
    </div>
    <div data-carousel>
      <div class="carousel__track" data-carousel-track data-overflow-ok>
        ${testimonials.concat(testimonials.slice(0, 2)).map(
          (t) => html`<figure class="quote tone-${t.tone}">
            <span class="quote__mark" aria-hidden="true">«</span>
            <blockquote>${t.text}</blockquote>
            <figcaption class="person">${avatar(t.name, t.tone)}<span><b>${t.name}</b><span>${t.role}</span></span></figcaption>
          </figure>`
        )}
      </div>
      <div class="row-between mt-2">
        <div class="carousel__dots" data-carousel-dots></div>
        <div class="carousel__nav"><button class="btn btn--icon" type="button" data-carousel-prev aria-label="قبلی">${icon('arrow-right')}</button><button class="btn btn--icon btn--primary" type="button" data-carousel-next aria-label="بعدی">${icon('arrow-left')}</button></div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container faq-grid">
    <div>
      <span class="eyebrow"><i>${icon('circle-help')}</i> سؤالات پرتکرار</span>
      <h2 class="mt-2" style="font-size:var(--text-3xl)">هنوز سؤالی داری؟</h2>
      <p class="muted mt-1">اگر جوابت را اینجا پیدا نکردی، تیم پشتیبانی هر روز از ۹ صبح تا ۱۲ شب آنلاین است.</p>
      <a class="btn btn--ink mt-3" href="${ctx.base}contact.html">${icon('headset')} گفتگو با پشتیبانی</a>
    </div>
    <div class="accordion" data-accordion="single">
      ${faq.map(([q, a], i) => html`<details ${i === 0 ? 'open' : ''}><summary>${q}<span class="plus">${icon('plus')}</span></summary><div class="accordion__body">${a}</div></details>`)}
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="cta">
      <div>
        <h2>اولین جلسه همه دوره‌ها <span class="mark">رایگان</span> است</h2>
        <p>ثبت‌نام کن، هر دوره‌ای را امتحان کن و فقط وقتی مطمئن شدی بخر.</p>
      </div>
      <div class="row wrap"><a class="btn btn--ink btn--lg" href="${ctx.base}register.html">ثبت‌نام رایگان ${icon('arrow-left')}</a><a class="btn btn--lg" href="${ctx.base}courses.html">دیدن دوره‌ها</a></div>
      <svg class="cta__doodle" viewBox="0 0 200 200" aria-hidden="true"><path d="M20 120 Q60 20 100 100 T180 80" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><circle cx="160" cy="150" r="18" fill="none" stroke="currentColor" stroke-width="6"/></svg>
    </div>
  </div>
</section>`;
