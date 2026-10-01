import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { cover, avatar, chart } from '../partials.mjs';
import { courses, instructors } from '../data.mjs';

export const meta = { title: 'داشبورد من', layout: 'main', active: 'dashboard', description: 'داشبورد دانشجو: پیشرفت، دوره‌های فعال، گواهی‌ها و کلاس‌های زنده' };

const mine = [
  [courses[0], 34, 'Closure به زبان ساده'],
  [courses[3], 72, 'Writing Task 2: ساختار مقاله'],
  [courses[11], 100, 'پایان دوره'],
];

export default (ctx) => html`
<section class="section section--tight">
  <div class="container dash">
    <aside class="dash__side card">
      <div class="center stack" style="justify-items:center;--gap:.5rem">
        ${avatar('سارا محمدی', 'lime', 'xl')}
        <b>سارا محمدی</b>
        <span class="badge tone-accent">${icon('crown')} عضو دانش پلاس</span>
      </div>
      <nav class="dash__nav" aria-label="منوی داشبورد">
        <a class="is-active" href="${ctx.base}dashboard.html" aria-current="page">${icon('layout-dashboard')} پیشخوان</a>
        <a href="${ctx.base}lesson.html">${icon('library-big')} دوره‌های من</a>
        <a href="${ctx.base}certificate.html">${icon('award')} گواهی‌ها</a>
        <a href="${ctx.base}cart.html">${icon('receipt-text')} سفارش‌ها</a>
        <a href="${ctx.base}contact.html">${icon('messages-square')} پشتیبانی</a>
        <a href="${ctx.base}login.html">${icon('log-out', 'icon-flip')} خروج</a>
      </nav>
    </aside>

    <div class="dash__main">
      <div class="dash__hello">
        <div><h1>سلام سارا</h1><p class="muted">۵ روز پشت سر هم درس خوانده‌ای؛ رکوردت را نشکن!</p></div>
        <div class="streak">${['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((d, i) => html`<span class="${i < 5 ? 'is-on' : ''}">${i < 5 ? icon('flame') : ''}<small>${d}</small></span>`)}</div>
      </div>

      <div class="dash__stats">
        ${[['library-big', 'دوره فعال', 3, ''], ['clock', 'ساعت یادگیری', 46, ''], ['circle-check', 'جلسه تکمیل‌شده', 128, ''], ['award', 'گواهی', 2, '']].map(
          ([i, l, v, t]) => html`<div class="tile ${t}"><span class="tile__icon">${icon(i)}</span><b class="tile__num">${fa(v)}</b><span class="xs muted">${l}</span></div>`
        )}
      </div>

      <section class="card">
        <div class="row-between mb-2" style="margin-block-end:1.25rem"><h2 style="font-size:var(--text-lg)">ادامه یادگیری</h2><a class="link-arrow small" href="${ctx.base}courses.html">همه ${icon('arrow-left')}</a></div>
        <div class="stack">
          ${mine.map(
            ([c, p, next]) => html`<article class="continue">
              <div class="continue__cover">${cover(c)}</div>
              <div class="continue__info">
                <h3>${c.title}</h3>
                <p class="xs muted">${p === 100 ? 'تبریک! این دوره را به پایان رساندی.' : `بعدی: ${next}`}</p>
                <div class="row small"><div class="progress" style="flex:1"><span style="--value:${p}%"></span></div><b>${fa(p)}٪</b></div>
              </div>
              ${p === 100 ? html`<a class="btn btn--sm" href="${ctx.base}certificate.html">${icon('award')} گواهی</a>` : html`<a class="btn btn--sm btn--primary" href="${ctx.base}lesson.html">${icon('play')} ادامه</a>`}
            </article>`
          )}
        </div>
      </section>

      <div class="dash__row">
        <section class="card">
          <h2 style="font-size:var(--text-lg)">دقیقه یادگیری در هفته</h2>
          ${chart({ type: 'bar', height: 220, labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'], series: [{ name: 'دقیقه', data: [45, 60, 30, 75, 50, 0, 0] }], legend: false })}
        </section>
        <section class="card">
          <h2 style="font-size:var(--text-lg)">کلاس‌های زنده پیش رو</h2>
          <ul class="list-plain live-list">
            ${[['رفع اشکال ری‌اکت', 'امشب · ۲۰:۳۰', instructors[0]], ['Speaking Club', 'فردا · ۱۸:۰۰', instructors[3]], ['پرسش و پاسخ یادگیری ماشین', 'جمعه · ۱۱:۰۰', instructors[2]]].map(
              ([t, w, ins]) => html`<li>${avatar(ins.name, ins.tone)}<div><b>${t}</b><span class="xs muted">${w} · ${ins.name}</span></div><button class="btn btn--sm" type="button" data-toast="یادآوری تنظیم شد">${icon('bell')}</button></li>`
            )}
          </ul>
        </section>
      </div>
    </div>
  </div>
</section>`;
