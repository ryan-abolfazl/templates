import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { courseCard, avatar, cover, stars } from '../partials.mjs';
import { courses, instructors, syllabus } from '../data.mjs';

export const meta = { title: 'جاوااسکریپت از صفر تا حرفه‌ای', layout: 'main', active: 'courses', description: 'صفحه جزئیات دوره با سرفصل‌ها، مدرس و نظرات' };

const c = courses[0];
const t = instructors[c.teacher];

const reviews = [
  ['پریسا نادری', 5, '۳ هفته پیش', 'بهترین دوره فارسی جاوااسکریپت که دیده‌ام. پروژه‌ها عالی و کاربردی هستند.', 'coral'],
  ['محمد رضوانی', 5, '۱ ماه پیش', 'توضیح Closure و async بی‌نظیر بود. پشتیبانی هم خیلی سریع جواب می‌داد.', 'sky'],
  ['الهام شاکری', 4, '۲ ماه پیش', 'محتوا خیلی خوب است؛ فقط کاش تمرین‌های بیشتری برای بخش DOM داشت.', 'mint'],
];

export default (ctx) => html`
<section class="course-hero">
  <div class="container course-hero__grid">
    <div class="course-hero__info">
      <nav class="breadcrumb" aria-label="مسیر صفحه"><a href="${ctx.base}index.html">خانه</a>${icon('chevron-left')}<a href="${ctx.base}courses.html">دوره‌ها</a>${icon('chevron-left')}<span aria-current="page">برنامه‌نویسی وب</span></nav>
      <div class="row wrap"><span class="badge tone-accent">پرفروش</span><span class="badge">به‌روزرسانی مهر ۱۴۰۵</span></div>
      <h1>${c.title}</h1>
      <p class="lead">جامع‌ترین دوره فارسی جاوااسکریپت؛ از مفاهیم پایه تا برنامه‌نویسی ناهمگام، همراه با ۸ پروژه واقعی که مستقیم به رزومه‌تان اضافه می‌شوند.</p>
      <div class="course-hero__meta">
        <span class="rating">${icon('star')} ${fa(c.rating).replace('.', '٫')} <small>(${fa(c.reviews)} نظر)</small></span>
        <span>${icon('users')} ${fa(c.students)} دانشجو</span>
        <span>${icon('play-circle')} ${fa(c.lessons)} جلسه</span>
        <span>${icon('clock')} ${fa(c.hours)} ساعت</span>
        <span>${icon('signal')} ${c.level}</span>
      </div>
      <a class="person" href="${ctx.base}instructor.html">${avatar(t.name, t.tone, 'lg')}<span><b>مدرس: ${t.name}</b><span>${t.role}</span></span></a>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container course-layout">
    <div class="course-main">
      <div class="card learn">
        <h2>در این دوره یاد می‌گیرید</h2>
        <ul class="list-plain learn__list">
          ${['مبانی و سینتکس مدرن ES2024', 'کار با DOM و رویدادها', 'Promise، async/await و Fetch', 'ماژول‌ها و ساختاردهی کد', 'دیباگ حرفه‌ای در مرورگر', 'ساخت ۸ پروژه واقعی برای رزومه', 'الگوهای رایج مصاحبه‌های فنی', 'آمادگی برای یادگیری ری‌اکت'].map(
            (x) => html`<li>${icon('check')} ${x}</li>`
          )}
        </ul>
      </div>

      <div data-tabs class="mt-4">
        <div class="tabs tabs--line" role="tablist" aria-label="اطلاعات دوره">
          <button role="tab" id="ct-1" aria-controls="cp-1" aria-selected="true" type="button">سرفصل‌ها</button>
          <button role="tab" id="ct-2" aria-controls="cp-2" aria-selected="false" type="button">توضیحات</button>
          <button role="tab" id="ct-3" aria-controls="cp-3" aria-selected="false" type="button">مدرس</button>
          <button role="tab" id="ct-4" aria-controls="cp-4" aria-selected="false" type="button">نظرات (${fa(c.reviews)})</button>
        </div>

        <div role="tabpanel" id="cp-1" aria-labelledby="ct-1" class="tab-body">
          <div class="row-between small mb-2"><span>${fa(syllabus.length)} فصل · ${fa(syllabus.reduce((s, x) => s + x.lessons.length, 0))} درس نمونه · ${fa(c.hours)} ساعت</span></div>
          <div class="accordion syllabus">
            ${syllabus.map(
              (s, i) => html`<details ${i === 0 ? 'open' : ''}>
                <summary><span class="syllabus__num">${fa(i + 1)}</span><span>${s.title}<small class="xs muted" style="display:block;font-weight:500">${fa(s.lessons.length)} درس</small></span><span class="plus">${icon('plus')}</span></summary>
                <ul class="list-plain syllabus__lessons">
                  ${s.lessons.map(
                    ([name, time, free]) => html`<li>${icon(free ? 'circle-play' : 'lock')}<a href="${ctx.base}lesson.html">${name}</a>${free ? html`<span class="badge tone-accent">پیش‌نمایش</span>` : ''}<span class="xs muted">${time}</span></li>`
                  )}
                </ul>
              </details>`
            )}
          </div>
        </div>

        <div role="tabpanel" id="cp-2" aria-labelledby="ct-2" class="tab-body prose" hidden>
          <p>جاوااسکریپت زبان وب است؛ تقریباً هر سایت و اپلیکیشن مدرنی که می‌بینید با آن ساخته شده. در این دوره، به‌جای حفظ کردن سینتکس، یاد می‌گیرید مثل یک برنامه‌نویس فکر کنید.</p>
          <h3>این دوره برای چه کسانی است؟</h3>
          <ul><li>کسانی که می‌خواهند برنامه‌نویسی را از صفر شروع کنند</li><li>طراحانی که می‌خواهند ایده‌هایشان را خودشان پیاده کنند</li><li>برنامه‌نویسان زبان‌های دیگر که می‌خواهند وارد وب شوند</li></ul>
          <h3>پیش‌نیازها</h3>
          <p>فقط یک کامپیوتر و علاقه به یادگیری! آشنایی اولیه با HTML و CSS مفید است؛ دوره رایگان آن را هم در سایت داریم.</p>
        </div>

        <div role="tabpanel" id="cp-3" aria-labelledby="ct-3" class="tab-body" hidden>
          <div class="card row wrap" style="align-items:flex-start;gap:1.5rem">
            ${avatar(t.name, t.tone, 'xl')}
            <div class="stack" style="flex:1;min-inline-size:14rem">
              <h3 style="font-size:var(--text-xl)">${t.name}</h3>
              <p class="muted small">${t.role} · ۱۲ سال تجربه در شرکت‌های بزرگ فناوری ایران و اروپا</p>
              <div class="row wrap small"><span class="rating">${icon('star')} ${fa(t.rating).replace('.', '٫')}</span><span>${fa(t.students)} دانشجو</span><span>${fa(t.courses)} دوره</span></div>
              <p class="small">آرش عاشق ساده کردن مفاهیم پیچیده است. قبل از تدریس، تیم فرانت‌اند چند استارتاپ موفق را رهبری کرده و هنوز هم هر روز کد می‌نویسد.</p>
              <a class="link-arrow" href="${ctx.base}instructor.html">مشاهده پروفایل ${icon('arrow-left')}</a>
            </div>
          </div>
        </div>

        <div role="tabpanel" id="cp-4" aria-labelledby="ct-4" class="tab-body" hidden>
          <div class="reviews-summary card">
            <div class="center"><b class="tile__big">۴٫۹</b>${stars(5)}<p class="xs muted">${fa(c.reviews)} نظر</p></div>
            <div class="stack" style="--gap:.4rem;flex:1">
              ${[[5, 86], [4, 10], [3, 3], [2, 1], [1, 0]].map(([s, p]) => html`<div class="row xs"><span style="inline-size:3rem">${fa(s)} ستاره</span><div class="progress" style="flex:1"><span style="--value:${p}%"></span></div><span style="inline-size:2.5rem">${fa(p)}٪</span></div>`)}
            </div>
          </div>
          <div class="stack mt-3">
            ${reviews.map(
              ([n, s, d, txt, tone]) => html`<article class="review"><div class="row-between"><div class="person">${avatar(n, tone)}<span><b>${n}</b><span>${d}</span></span></div>${stars(s)}</div><p>${txt}</p></article>`
            )}
          </div>
        </div>
      </div>
    </div>

    <aside class="buy">
      <div class="buy__card">
        <a class="buy__preview" href="${ctx.base}lesson.html" aria-label="پخش ویدیوی معرفی">${cover(c)}<span class="buy__play">${icon('play')}</span></a>
        <div class="buy__price">
          <b>${fa(c.price)} <small>تومان</small></b>
          <del>${fa(c.old)}</del>
          <span class="badge tone-orange">${fa(35)}٪ تخفیف</span>
        </div>
        <p class="xs bold buy__timer" data-countdown data-hours="46">${icon('alarm-clock')} فقط <span data-unit="h">۴۶</span>:<span data-unit="m">۰۰</span>:<span data-unit="s">۰۰</span> تا پایان تخفیف</p>
        <button class="btn btn--primary btn--lg btn--block" type="button" data-add-to-cart="دوره به سبد خرید اضافه شد">${icon('shopping-bag')} افزودن به سبد خرید</button>
        <a class="btn btn--block" href="${ctx.base}checkout.html">خرید سریع</a>
        <p class="xs muted center">${icon('shield-check')} ۷ روز ضمانت بازگشت وجه</p>
        <ul class="list-plain buy__includes">
          ${[['monitor-play', `${fa(c.hours)} ساعت ویدیو با کیفیت ۱۰۸۰`], ['file-code', 'سورس کامل پروژه‌ها'], ['infinity', 'دسترسی مادام‌العمر'], ['smartphone', 'مشاهده آفلاین در اپلیکیشن'], ['award', 'گواهی پایان دوره'], ['messages-square', 'پشتیبانی منتور']].map(([i, x]) => html`<li>${icon(i)} ${x}</li>`)}
        </ul>
        <div class="row" style="justify-content:center;gap:.25rem">
          <button class="btn btn--ghost btn--sm" type="button" data-wishlist aria-pressed="false">${icon('heart')} علاقه‌مندی</button>
          <button class="btn btn--ghost btn--sm" type="button" data-copy="https://danesh.academy/course/js-101">${icon('share-2')} اشتراک</button>
        </div>
      </div>
    </aside>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="section-head"><div><span class="eyebrow">ادامه مسیر</span><h2>دانشجوهای این دوره این‌ها را هم خریدند</h2></div></div>
    <div class="course-grid">${[courses[4], courses[7], courses[11], courses[1]].map((x) => courseCard(ctx, x))}</div>
  </div>
</section>`;
