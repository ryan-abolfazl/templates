import { html, icon } from '../../../tools/lib/html.mjs';
import { pageHead } from '../partials.mjs';

export const meta = { title: 'تقویم شمسی', layout: 'app', active: 'calendar', description: 'تقویم جلالی با رویدادها و جلسات' };

// offset = days from today, so the demo calendar is always populated
const events = [
  { offset: 0, title: 'جلسه هفتگی تیم فروش', tone: 't-primary', time: '10:00' },
  { offset: 0, title: 'تماس با تأمین‌کننده', tone: 't-warning', time: '15:30' },
  { offset: 1, title: 'شروع جشنواره پاییزه', tone: 't-accent', time: '09:00' },
  { offset: 3, title: 'بررسی کمپین اینستاگرام', tone: 't-info', time: '11:00' },
  { offset: 5, title: 'انبارگردانی ماهانه', tone: 't-success', time: '08:00' },
  { offset: -2, title: 'تسویه با درگاه', tone: 't-success', time: '14:00' },
  { offset: -5, title: 'مصاحبه پشتیبان جدید', tone: 't-primary', time: '12:00' },
  { offset: 8, title: 'عکاسی محصولات جدید', tone: 't-warning', time: '10:30' },
  { offset: 12, title: 'ارائه گزارش فصلی', tone: 't-danger', time: '16:00' },
  { offset: 15, title: 'وبینار سئو فروشگاهی', tone: 't-info', time: '18:00' },
  { offset: -9, title: 'به‌روزرسانی قیمت‌ها', tone: 't-accent', time: '09:30' },
];

export default (ctx) => html`
${pageHead(ctx, {
  title: 'تقویم',
  sub: 'برنامه‌ریزی جلسات، کمپین‌ها و کارهای فروشگاه بر پایه تقویم شمسی',
  crumbs: [{ label: 'برنامه‌ها' }, { label: 'تقویم شمسی' }],
  actions: html`<button class="btn btn--primary" type="button" data-modal-open="new-event">${icon('plus')} رویداد جدید</button>`,
})}

<div class="cal" data-calendar>
  <aside class="stack">
    <section class="card">
      <div class="card__head"><h2 class="card__title">رویدادهای پیش‌رو</h2></div>
      <ul class="list-plain upcoming">
        ${events
          .filter((e) => e.offset >= 0)
          .sort((a, b) => a.offset - b.offset)
          .slice(0, 5)
          .map(
            (e) => html`<li class="${e.tone}"><div><b>${e.title}</b><span>${e.offset === 0 ? 'امروز' : e.offset === 1 ? 'فردا' : `${e.offset.toLocaleString('fa-IR')} روز دیگر`} · ساعت ${e.time.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])}</span></div></li>`
          )}
      </ul>
    </section>
    <section class="card">
      <div class="card__head"><h2 class="card__title">دسته‌ها</h2></div>
      <div class="stack" style="--gap:.6rem">
        ${[['جلسات', 't-primary'], ['کمپین‌ها', 't-accent'], ['مالی', 't-success'], ['محتوا', 't-warning'], ['آموزش', 't-info']].map(
          ([l, t]) => html`<label class="check"><input type="checkbox" checked /><span class="badge badge--dot ${t}">${l}</span></label>`
        )}
      </div>
    </section>
  </aside>

  <section class="card card--flush">
    <div class="cal__head">
      <h2 data-cal-title>مهر ۱۴۰۵</h2>
      <div class="row" style="gap:.25rem">
        <button class="icon-btn icon-btn--sm" type="button" data-cal-nav="-1" aria-label="ماه قبل">${icon('chevron-right')}</button>
        <button class="icon-btn icon-btn--sm" type="button" data-cal-nav="1" aria-label="ماه بعد">${icon('chevron-left')}</button>
      </div>
      <button class="btn btn--sm" type="button" data-cal-nav="0">امروز</button>
      <div class="btn-group hide-sm" role="group" aria-label="نما"><button type="button" aria-pressed="true">ماه</button><button type="button" aria-pressed="false">هفته</button><button type="button" aria-pressed="false">روز</button></div>
    </div>
    <div class="cal__week" aria-hidden="true">${['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'].map((d) => html`<span>${d}</span>`)}</div>
    <div class="cal__grid" data-cal-grid></div>
  </section>
</div>
<script type="application/json" id="calendar-events">${JSON.stringify(events)}</script>

<dialog class="modal" id="event-modal" aria-labelledby="ev-title">
  <div class="modal__head"><h2 id="ev-title" data-event-name>رویداد</h2><button class="icon-btn" type="button" data-modal-close aria-label="بستن">${icon('x')}</button></div>
  <div class="modal__body stack" style="--gap:.75rem">
    <p class="row small">${icon('clock')}<span data-event-when></span></p>
    <p class="row small">${icon('map-pin')}<span>دفتر مرکزی، اتاق جلسات ۲</span></p>
    <p class="row small">${icon('users')}<span>سارا محمدی، علی رضایی، مریم احمدی</span></p>
  </div>
  <div class="modal__foot"><button class="btn" type="button" data-modal-close>بستن</button><button class="btn btn--primary" type="button" data-modal-close data-toast="یادآوری تنظیم شد">${icon('bell')} یادآوری</button></div>
</dialog>

<dialog class="modal" id="new-event" aria-labelledby="ne-title">
  <form data-validate data-success="رویداد به تقویم اضافه شد">
    <div class="modal__head"><h2 id="ne-title">رویداد جدید</h2><button class="icon-btn" type="button" data-modal-close aria-label="بستن">${icon('x')}</button></div>
    <div class="modal__body form-grid">
      <div class="field full"><label class="label" for="ne-name">عنوان <span class="req">*</span></label><input class="input" id="ne-name" required /></div>
      <div class="field"><label class="label" for="ne-date">تاریخ <span class="req">*</span></label><input class="input" id="ne-date" data-datepicker readonly required placeholder="انتخاب تاریخ" /></div>
      <div class="field"><label class="label" for="ne-time">ساعت</label><input class="input" id="ne-time" type="time" value="10:00" /></div>
      <div class="field full"><label class="label" for="ne-cat">دسته</label><select class="select" id="ne-cat"><option>جلسات</option><option>کمپین‌ها</option><option>مالی</option><option>محتوا</option></select></div>
    </div>
    <div class="modal__foot"><button class="btn" type="button" data-modal-close>انصراف</button><button class="btn btn--primary" type="submit">افزودن</button></div>
  </form>
</dialog>`;
