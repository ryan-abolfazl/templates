import { html, icon, fa, toman } from '../../../tools/lib/html.mjs';
import { pageHead, person } from '../partials.mjs';
import { customers, TIERS } from '../data.mjs';

export const meta = { title: 'مشتریان', layout: 'app', active: 'customers', description: 'فهرست مشتریان با سطح وفاداری و میزان خرید' };

export default (ctx) => html`
${pageHead(ctx, {
  title: 'مشتریان',
  sub: `${fa(2847)} مشتری ثبت‌نام‌شده · ${fa(126)} مشتری جدید این ماه`,
  crumbs: [{ label: 'فروشگاه' }, { label: 'مشتریان' }],
  actions: html`
    <button class="btn" type="button" data-toast="فایل CSV دانلود شد">${icon('download')} خروجی CSV</button>
    <button class="btn btn--primary" type="button" data-modal-open="add-customer">${icon('user-plus')} مشتری جدید</button>`,
})}

<section class="card card--flush" data-table data-page-size="8" aria-label="جدول مشتریان">
  <div class="table-toolbar">
    <div class="input-icon">${icon('search')}<input class="input" type="search" placeholder="جستجوی نام، ایمیل یا شهر…" data-table-search aria-label="جستجو در مشتریان" /></div>
    <div class="table-toolbar__end">
      <select class="select" data-table-filter="4" aria-label="فیلتر سطح" style="inline-size:auto">
        <option value="">همه سطح‌ها</option>
        ${Object.values(TIERS).map(([l]) => html`<option>${l}</option>`)}
      </select>
    </div>
  </div>
  <div class="table-wrap" data-overflow-ok>
    <table class="table">
      <thead><tr>
        <th scope="col"><button class="th-sort" type="button" data-sort>مشتری ${icon('arrow-up')}</button></th>
        <th scope="col">تماس</th>
        <th scope="col"><button class="th-sort" type="button" data-sort>شهر ${icon('arrow-up')}</button></th>
        <th scope="col"><button class="th-sort" type="button" data-sort>سفارش‌ها ${icon('arrow-up')}</button></th>
        <th scope="col">سطح</th>
        <th scope="col"><button class="th-sort" type="button" data-sort>مجموع خرید ${icon('arrow-up')}</button></th>
        <th scope="col">عضویت</th>
        <th scope="col"><span class="sr-only">عملیات</span></th>
      </tr></thead>
      <tbody>
        ${customers.map(
          (c) => html`<tr>
            <td data-value="${c.name}">${person(c.name, html`<span class="ltr">${c.email}</span>`)}</td>
            <td class="muted">${c.phone}</td>
            <td data-value="${c.city}">${c.city}</td>
            <td class="num" data-value="${c.orders}">${fa(c.orders)}</td>
            <td data-value="${TIERS[c.tier][0]}"><span class="badge ${TIERS[c.tier][1]}">${TIERS[c.tier][0]}</span></td>
            <td class="num" data-value="${c.spent}">${toman(c.spent)}</td>
            <td class="muted">${c.joined}</td>
            <td>
              <div class="row" style="gap:.25rem">
                <a class="icon-btn icon-btn--sm" href="${ctx.base}profile.html" aria-label="پروفایل ${c.name}">${icon('eye')}</a>
                <a class="icon-btn icon-btn--sm" href="${ctx.base}chat.html" aria-label="پیام به ${c.name}">${icon('message-circle')}</a>
              </div>
            </td>
          </tr>`
        )}
      </tbody>
    </table>
    <div class="empty" data-table-empty hidden>${icon('user-x')}<strong>مشتری‌ای پیدا نشد</strong></div>
  </div>
  <div class="card__foot"><span>${fa(customers.length)} از ${fa(2847)} مشتری</span><nav class="pager" data-table-pager aria-label="صفحه‌بندی"></nav></div>
</section>

<dialog class="modal" id="add-customer" aria-labelledby="ac-title">
  <form data-validate data-success="مشتری جدید اضافه شد">
    <div class="modal__head"><h2 id="ac-title">افزودن مشتری</h2><button class="icon-btn" type="button" data-modal-close aria-label="بستن">${icon('x')}</button></div>
    <div class="modal__body form-grid">
      <div class="field"><label class="label" for="ac-first">نام <span class="req">*</span></label><input class="input" id="ac-first" required /></div>
      <div class="field"><label class="label" for="ac-last">نام خانوادگی <span class="req">*</span></label><input class="input" id="ac-last" required /></div>
      <div class="field full"><label class="label" for="ac-email">ایمیل</label><input class="input ltr" id="ac-email" type="email" /></div>
      <div class="field"><label class="label" for="ac-phone">موبایل <span class="req">*</span></label><input class="input" id="ac-phone" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل ۱۱ رقمی و با ۰۹ شروع شود" /></div>
      <div class="field"><label class="label" for="ac-city">شهر</label><input class="input" id="ac-city" /></div>
    </div>
    <div class="modal__foot"><button class="btn" type="button" data-modal-close>انصراف</button><button class="btn btn--primary" type="submit">ذخیره</button></div>
  </form>
</dialog>`;
