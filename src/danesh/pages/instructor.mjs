import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { courseCard, avatar } from '../partials.mjs';
import { courses, instructors } from '../data.mjs';

export const meta = { title: 'آرش کاظمی، مدرس', layout: 'main', active: 'courses', description: 'پروفایل مدرس با دوره‌ها، آمار و بیوگرافی' };

const t = instructors[0];

export default (ctx) => html`
<section class="teacher-hero">
  <div class="container teacher-hero__grid">
    <div class="teacher-hero__art tone-${t.tone}">${avatar(t.name, t.tone, 'xl')}<span class="badge tone-ink teacher-hero__tag">${icon('badge-check')} مدرس برتر ۱۴۰۴</span></div>
    <div class="stack" style="--gap:1.25rem">
      <nav class="breadcrumb" aria-label="مسیر صفحه"><a href="${ctx.base}index.html">خانه</a>${icon('chevron-left')}<span>مدرسان</span>${icon('chevron-left')}<span aria-current="page">${t.name}</span></nav>
      <h1 style="font-size:var(--text-4xl)">${t.name}</h1>
      <p class="lead">${t.role} با ۱۲ سال تجربه در تیم‌های فنی دیجی‌کالا، کافه‌بازار و یک استارتاپ اروپایی. آرش باور دارد هر کسی می‌تواند برنامه‌نویسی را یاد بگیرد، اگر کسی آن را درست توضیح دهد.</p>
      <dl class="teacher-stats">
        <div><dt>دانشجو</dt><dd>${fa(t.students)}</dd></div>
        <div><dt>دوره</dt><dd>${fa(t.courses)}</dd></div>
        <div><dt>امتیاز</dt><dd>${fa(t.rating).replace('.', '٫')}</dd></div>
        <div><dt>نظر</dt><dd>${fa(3240)}</dd></div>
      </dl>
      <div class="row wrap">
        <a class="btn btn--ink" href="#teacher-courses">${icon('library-big')} دوره‌های آرش</a>
        <a class="btn" href="${ctx.base}contact.html">${icon('calendar-clock')} رزرو جلسه منتورینگ</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight" id="teacher-courses">
  <div class="container">
    <div class="section-head"><div><h2>دوره‌های ${t.name}</h2></div></div>
    <div class="course-grid">${courses.filter((c) => c.teacher === 0).concat(courses.slice(11)).map((c) => courseCard(ctx, c))}</div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head"><div><span class="eyebrow"><i>${icon('users')}</i> تیم مدرسان</span><h2>دیگر مدرسان دانش</h2></div></div>
    <div class="teachers">
      ${instructors.slice(1, 5).map(
        (x) => html`<a class="teacher card--hover" href="${ctx.base}instructor.html"><div class="teacher__art tone-${x.tone}">${avatar(x.name, x.tone, 'xl')}</div><b>${x.name}</b><span class="xs muted">${x.role}</span><div class="row xs"><span class="rating">${icon('star')} ${fa(x.rating).replace('.', '٫')}</span><span class="muted">${fa(x.courses)} دوره</span></div></a>`
      )}
    </div>
  </div>
</section>`;
