import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { logo, avatar } from '../partials.mjs';
import { syllabus } from '../data.mjs';

export const meta = { title: 'پخش درس: Closure به زبان ساده', layout: 'blank', description: 'پلیر درس با فهرست جلسات، یادداشت و پرسش و پاسخ', bodyClass: 'lesson-page' };

let n = 0;

export default (ctx) => html`
<header class="lesson-top">
  <a class="icon-btn" href="${ctx.base}course.html" aria-label="بازگشت به صفحه دوره">${icon('arrow-right')}</a>
  ${logo(ctx)}
  <div class="lesson-top__title"><b>جاوااسکریپت از صفر تا حرفه‌ای</b><div class="row xs"><div class="progress" style="inline-size:8rem"><span style="--value:34%"></span></div>۳۴٪ تکمیل</div></div>
  <div class="row" style="margin-inline-start:auto">
    <button class="icon-btn" type="button" data-theme-toggle aria-label="تغییر حالت روشن و تاریک" aria-pressed="false">${icon('moon', 'theme-icon-light')}${icon('sun', 'theme-icon-dark')}</button>
    <a class="btn btn--sm hide-sm" href="${ctx.base}dashboard.html">${icon('layout-dashboard')} داشبورد</a>
  </div>
</header>

<main id="main" class="lesson">
  <section class="lesson__main">
    <div class="player" data-player>
      <button class="player__screen" type="button" data-player-screen aria-label="پخش یا توقف">
        <div class="player__code" aria-hidden="true">
<pre class="ltr"><span class="k">function</span> <span class="f">makeCounter</span>() {
  <span class="k">let</span> count = <span class="n">0</span>;
  <span class="k">return</span> () => ++count;
}

<span class="k">const</span> next = <span class="f">makeCounter</span>();
next(); <span class="c">// 1</span>
next(); <span class="c">// 2  ← <bdi dir="rtl">count هنوز زنده است!</bdi></span></pre>
        </div>
        <span class="player__big">${icon('play')}</span>
      </button>
      <div class="player__bar">
        <button class="icon-btn" type="button" data-player-play aria-label="پخش">${icon('play')}</button>
        <button class="icon-btn" type="button" aria-label="۱۰ ثانیه جلو">${icon('rotate-ccw')}</button>
        <div class="player__track" data-player-track role="slider" aria-label="پیشرفت ویدیو" aria-valuemin="0" aria-valuemax="100" tabindex="0"><span data-player-progress></span></div>
        <span class="player__time" data-player-time>۱۱:۱۶ / ۱۷:۴۰</span>
        <button class="btn btn--sm btn--ghost" type="button" data-speed>۱×</button>
        <button class="icon-btn" type="button" aria-label="زیرنویس">${icon('captions')}</button>
        <button class="icon-btn" type="button" aria-label="تمام‌صفحه">${icon('maximize')}</button>
      </div>
    </div>

    <div class="lesson__head">
      <div>
        <span class="xs muted">فصل ۳ · درس ۱۱</span>
        <h1 data-lesson-title>Closure به زبان ساده</h1>
      </div>
      <div class="row wrap">
        <a class="btn btn--sm" href="${ctx.base}lesson.html">${icon('chevron-right')} درس قبل</a>
        <button class="btn btn--sm btn--primary" type="button" data-complete>${icon('check')} تکمیل و درس بعد</button>
      </div>
    </div>

    <div data-tabs>
      <div class="tabs tabs--line" role="tablist" aria-label="بخش‌های درس">
        <button role="tab" id="lt-1" aria-controls="lp-1" aria-selected="true" type="button">${icon('message-circle-question')} پرسش و پاسخ</button>
        <button role="tab" id="lt-2" aria-controls="lp-2" aria-selected="false" type="button">${icon('notebook-pen')} یادداشت‌های من</button>
        <button role="tab" id="lt-3" aria-controls="lp-3" aria-selected="false" type="button">${icon('paperclip')} فایل‌ها</button>
      </div>
      <div role="tabpanel" id="lp-1" aria-labelledby="lt-1" class="tab-body stack">
        <form class="row" data-validate data-success="سؤال شما ثبت شد؛ منتور به‌زودی پاسخ می‌دهد"><label class="sr-only" for="q">سؤال</label><input class="input" id="q" required placeholder="سؤالت درباره این درس را بپرس…" /><button class="btn btn--primary" type="submit">ارسال</button></form>
        ${[
          ['نگار صادقی', 'coral', 'چرا count بعد از اجرای makeCounter از بین نمی‌رود؟', 'آرش کاظمی', 'چون تابع برگشتی هنوز به آن ارجاع دارد؛ تا وقتی next وجود دارد، محیط لغوی (Lexical Environment) هم زنده می‌ماند.'],
          ['رضا امینی', 'sky', 'Closure در ری‌اکت کجا به کار می‌آید؟', 'منتور دانش', 'تقریباً همه‌جا! هر هندلر رویدادی که به state دسترسی دارد یک closure است. در فصل «Stale Closure» مفصل بررسی می‌کنیم.'],
        ].map(
          ([a, t, q, r, ans]) => html`<article class="qa"><div class="person">${avatar(a, t, 'sm')}<span><b>${a}</b><span>۲ روز پیش</span></span></div><p>${q}</p>
            <div class="qa__answer"><div class="person">${avatar(r, 'lime', 'sm')}<span><b>${r} <span class="badge tone-accent">مدرس</span></b></span></div><p>${ans}</p></div></article>`
        )}
      </div>
      <div role="tabpanel" id="lp-2" aria-labelledby="lt-2" class="tab-body" hidden>
        <div class="field"><label class="label" for="note">یادداشت در زمان ۱۱:۱۶</label><textarea class="textarea" id="note" placeholder="نکته مهم این بخش را بنویس…"></textarea></div>
        <button class="btn btn--primary mt-2" type="button" data-toast="یادداشت ذخیره شد">ذخیره یادداشت</button>
      </div>
      <div role="tabpanel" id="lp-3" aria-labelledby="lt-3" class="tab-body" hidden>
        <ul class="list-plain stack">${[['file-code', 'closure-examples.zip', '۱۲ کیلوبایت'], ['file-text', 'خلاصه درس.pdf', '۳۴۰ کیلوبایت']].map(([i, f, s]) => html`<li class="file">${icon(i)}<span>${f}<small class="xs muted" style="display:block">${s}</small></span><button class="btn btn--sm" type="button" data-toast="دانلود شروع شد">${icon('download')} دانلود</button></li>`)}</ul>
      </div>
    </div>
  </section>

  <aside class="lesson__side" aria-label="فهرست جلسات">
    <div class="lesson__side-head"><b>محتوای دوره</b><span class="xs muted">${fa(48)} از ${fa(142)} جلسه</span></div>
    <div class="accordion">
      ${syllabus.map(
        (s, i) => html`<details ${i === 2 ? 'open' : ''}>
          <summary><span>${fa(i + 1)}. ${s.title}</span><span class="plus">${icon('plus')}</span></summary>
          <ul class="list-plain chapter">
            ${s.lessons.map(([name, time]) => {
              n++;
              const done = n < 10, cur = n === 10;
              return html`<li><a href="${ctx.base}lesson.html" data-lesson="${name}" class="${done ? 'is-done' : ''} ${cur ? 'is-current' : ''}"><span class="chapter__state">${icon(done ? 'check' : 'play')}</span><span>${name}</span><small>${time}</small></a></li>`;
            })}
          </ul>
        </details>`
      )}
    </div>
  </aside>
</main>`;
