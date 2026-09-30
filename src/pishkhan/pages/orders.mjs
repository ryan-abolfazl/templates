import { html, icon, fa, toman } from '../../../tools/lib/html.mjs';
import { pageHead, person, status, STATUS } from '../partials.mjs';
import { orders } from '../data.mjs';

export const meta = { title: 'سفارش‌ها', layout: 'app', active: 'orders', description: 'مدیریت سفارش‌ها با جستجو، فیلتر و مرتب‌سازی' };

const counts = Object.keys(STATUS).map((k) => [k, orders.filter((o) => o.status === k).length]);

export default (ctx) => html`
${pageHead(ctx, {
  title: 'سفارش‌ها',
  sub: `${fa(orders.length)} سفارش در ۳۰ روز گذشته`,
  crumbs: [{ label: 'فروشگاه' }, { label: 'سفارش‌ها' }],
  actions: html`
    <button class="btn" type="button" data-toast="فایل اکسل سفارش‌ها دانلود شد">${icon('sheet')} خروجی اکسل</button>
    <button class="btn btn--primary" type="button" data-modal-open="new-order">${icon('plus')} ثبت سفارش دستی</button>`,
})}

<div class="grid mb-2">
  ${[
    ['همه سفارش‌ها', orders.length, 'shopping-bag', 't-primary'],
    ['در حال پردازش', counts.find((c) => c[0] === 'processing')[1], 'loader', 't-warning'],
    ['در حال ارسال', counts.find((c) => c[0] === 'shipping')[1], 'truck', 't-info'],
    ['تحویل‌شده', counts.find((c) => c[0] === 'delivered')[1], 'package-check', 't-success'],
  ].map(
    ([l, n, ic, t]) => html`<div class="sm-6 xl-3"><div class="card row"><span class="kpi__icon ${t}">${icon(ic)}</span><div><p class="kpi__label">${l}</p><p class="bold" style="font-size:var(--text-xl)">${fa(n)}</p></div></div></div>`
  )}
</div>

<section class="card card--flush" data-table data-page-size="10" aria-label="جدول سفارش‌ها">
  <div class="table-toolbar">
    <div class="input-icon">${icon('search')}<input class="input" type="search" placeholder="جستجوی شماره سفارش، مشتری یا محصول…" data-table-search aria-label="جستجو در سفارش‌ها" /></div>
    <div class="table-toolbar__end">
      <select class="select" data-table-filter="6" aria-label="فیلتر وضعیت" style="inline-size:auto">
        <option value="">همه وضعیت‌ها</option>
        ${Object.values(STATUS).map(([l]) => html`<option value="${l}">${l}</option>`)}
      </select>
      <select class="select" data-table-filter="5" aria-label="فیلتر روش پرداخت" style="inline-size:auto">
        <option value="">همه روش‌های پرداخت</option>
        ${[...new Set(orders.map((o) => o.pay))].map((p) => html`<option>${p}</option>`)}
      </select>
    </div>
  </div>
  <div class="bulk-bar" data-table-bulk hidden>
    <span><span data-bulk-count>۰</span> سفارش انتخاب شد</span>
    <button class="btn btn--sm" type="button" data-toast="وضعیت سفارش‌های انتخابی به «در حال ارسال» تغییر کرد">${icon('truck')} تغییر به در حال ارسال</button>
    <button class="btn btn--sm btn--danger" type="button" data-toast="سفارش‌ها حذف شدند" data-toast-type="error">${icon('trash-2')} حذف</button>
  </div>
  <div class="table-wrap" data-overflow-ok>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" style="inline-size:1%"><label class="check"><input type="checkbox" data-select-all aria-label="انتخاب همه" /></label></th>
          <th scope="col"><button class="th-sort" type="button" data-sort>سفارش ${icon('arrow-up')}</button></th>
          <th scope="col"><button class="th-sort" type="button" data-sort>مشتری ${icon('arrow-up')}</button></th>
          <th scope="col">محصول</th>
          <th scope="col"><button class="th-sort" type="button" data-sort>مبلغ ${icon('arrow-up')}</button></th>
          <th scope="col">پرداخت</th>
          <th scope="col">وضعیت</th>
          <th scope="col"><span class="sr-only">عملیات</span></th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(
          (o) => html`<tr>
            <td><label class="check"><input type="checkbox" data-select-row aria-label="انتخاب سفارش ${fa(o.id)}" /></label></td>
            <td data-value="${o.id}"><a class="bold text-primary" href="${ctx.base}invoice.html">#${fa(o.id)}</a><span class="person__meta">${o.date}</span></td>
            <td data-value="${o.customer}">${person(o.customer, o.city, 'xs')}</td>
            <td><div class="row"><span class="thumb ${o.tone}" style="inline-size:2.25rem;block-size:2.25rem">${icon(o.icon)}</span><span class="muted">${o.product}${o.qty > 1 ? html` × ${fa(o.qty)}` : ''}</span></div></td>
            <td class="num" data-value="${o.total}">${toman(o.total)}</td>
            <td class="muted" data-value="${o.pay}">${o.pay}</td>
            <td data-value="${STATUS[o.status][0]}">${status(o.status)}</td>
            <td>
              <div data-dropdown>
                <button class="icon-btn icon-btn--sm" type="button" data-dropdown-toggle aria-expanded="false" aria-label="عملیات سفارش ${fa(o.id)}">${icon('ellipsis-vertical')}</button>
                <div class="dropdown-menu" data-dropdown-menu>
                  <a href="${ctx.base}invoice.html">${icon('eye')} مشاهده فاکتور</a>
                  <button type="button" data-toast="کد رهگیری برای مشتری پیامک شد">${icon('message-square-text')} ارسال کد رهگیری</button>
                  <button type="button" onclick="window.print()">${icon('printer')} چاپ برچسب پستی</button>
                  <hr />
                  <button type="button" class="danger" data-modal-open="cancel-order">${icon('circle-x')} لغو سفارش</button>
                </div>
              </div>
            </td>
          </tr>`
        )}
      </tbody>
    </table>
    <div class="empty" data-table-empty hidden>${icon('search-x')}<strong>سفارشی پیدا نشد</strong><span class="small">عبارت جستجو یا فیلترها را تغییر دهید.</span></div>
  </div>
  <div class="card__foot">
    <span>نمایش <b data-table-count>${fa(orders.length)}</b> سفارش</span>
    <nav class="pager" data-table-pager aria-label="صفحه‌بندی"></nav>
  </div>
</section>

<dialog class="modal" id="cancel-order" aria-labelledby="cancel-title">
  <div class="modal__body" style="text-align:center;display:grid;gap:.75rem;justify-items:center;padding-block:2rem">
    <span class="kpi__icon t-danger" style="inline-size:3.5rem;block-size:3.5rem">${icon('triangle-alert')}</span>
    <h2 id="cancel-title" style="font-size:var(--text-lg)">سفارش لغو شود؟</h2>
    <p class="muted small">مبلغ پرداختی ظرف ۷۲ ساعت به حساب مشتری بازگردانده می‌شود. این کار قابل بازگشت نیست.</p>
  </div>
  <div class="modal__foot">
    <button class="btn" type="button" data-modal-close>انصراف</button>
    <button class="btn btn--danger" type="button" data-modal-close data-toast="سفارش لغو شد" data-toast-type="error">بله، لغو شود</button>
  </div>
</dialog>

<dialog class="modal" id="new-order" aria-labelledby="new-order-title">
  <form data-validate data-success="سفارش با موفقیت ثبت شد">
    <div class="modal__head"><h2 id="new-order-title">ثبت سفارش دستی</h2><button class="icon-btn" type="button" data-modal-close aria-label="بستن">${icon('x')}</button></div>
    <div class="modal__body form-grid">
      <div class="field full"><label class="label" for="no-customer">نام مشتری <span class="req">*</span></label><input class="input" id="no-customer" required /></div>
      <div class="field"><label class="label" for="no-phone">موبایل <span class="req">*</span></label><input class="input" id="no-phone" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل را به شکل ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید" placeholder="۰۹۱۲۳۴۵۶۷۸۹" /></div>
      <div class="field"><label class="label" for="no-date">تاریخ تحویل</label><input class="input" id="no-date" data-datepicker readonly placeholder="انتخاب تاریخ" /></div>
      <div class="field full"><label class="label" for="no-address">آدرس</label><textarea class="textarea" id="no-address" rows="2"></textarea></div>
    </div>
    <div class="modal__foot"><button class="btn" type="button" data-modal-close>انصراف</button><button class="btn btn--primary" type="submit">ثبت سفارش</button></div>
  </form>
</dialog>`;
