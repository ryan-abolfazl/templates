import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHead, avatar, chart } from '../partials.mjs';
import { team } from '../data.mjs';

export const meta = { title: 'کامپوننت‌ها', layout: 'app', active: 'components', description: 'کیت رابط کاربری پیشخوان: رنگ‌ها، تایپوگرافی و اجزا' };

const box = (title, body, cls = 'lg-6') => html`<section class="card ${cls}"><div class="card__head"><h2 class="card__title">${title}</h2></div><div class="showcase">${body}</div></section>`;

export default (ctx) => html`
${pageHead(ctx, { title: 'کیت رابط کاربری', sub: 'همه اجزای پیشخوان در یک صفحه؛ برای ساخت صفحات جدید کپی کنید', crumbs: [{ label: 'صفحات' }, { label: 'کامپوننت‌ها' }] })}

<div class="grid">
  ${box(
    'رنگ‌ها',
    html`<div class="swatches">
      ${[['اصلی', '--primary'], ['تأکیدی', '--accent'], ['موفق', '--success'], ['هشدار', '--warning'], ['خطا', '--danger'], ['اطلاعات', '--info'], ['متن', '--text'], ['سطح', '--surface-3']].map(
        ([n, v]) => html`<div class="swatch" style="--c:var(${v})"><i></i><span>${n}<br /><code>${v}</code></span></div>`
      )}
    </div>`,
    ''
  )}
  ${box(
    'تایپوگرافی (وزیرمتن)',
    html`<div class="type-scale">
      <div><code>4xl / 900</code><span style="font-size:var(--text-4xl);font-weight:900">پیشخوان</span></div>
      <div><code>2xl / 800</code><span style="font-size:var(--text-2xl);font-weight:800">عنوان صفحه</span></div>
      <div><code>lg / 700</code><span style="font-size:var(--text-lg);font-weight:700">عنوان کارت و بخش</span></div>
      <div><code>base / 400</code><span>متن پایه برای توضیحات و پاراگراف‌ها با خوانایی بالا.</span></div>
      <div><code>xs / 500</code><span class="xs muted">متن کمکی، برچسب‌ها و توضیح فیلدها</span></div>
    </div>`
  )}
  ${box(
    'دکمه‌ها',
    html`<div class="showcase__row"><button class="btn btn--primary" type="button">اصلی</button><button class="btn" type="button">ثانویه</button><button class="btn btn--soft" type="button">ملایم</button><button class="btn btn--ghost" type="button">شبح</button><button class="btn btn--danger" type="button">حذف</button></div>
    <div class="showcase__row"><button class="btn btn--primary btn--sm" type="button">کوچک</button><button class="btn btn--primary" type="button">${icon('plus')} با آیکن</button><button class="btn btn--primary btn--lg" type="button">بزرگ</button><button class="btn btn--primary btn--icon" type="button" aria-label="تنظیمات">${icon('settings')}</button></div>
    <div class="showcase__row"><button class="btn btn--primary is-loading" type="button">در حال ارسال</button><button class="btn" type="button" disabled style="opacity:.5">غیرفعال</button>
      <div class="btn-group" role="group" aria-label="نمونه"><button type="button" aria-pressed="true">روز</button><button type="button" aria-pressed="false">هفته</button><button type="button" aria-pressed="false">ماه</button></div></div>`
  )}
  ${box(
    'نشان‌ها و آواتارها',
    html`<div class="showcase__row"><span class="badge t-primary">اصلی</span><span class="badge t-success">موفق</span><span class="badge t-warning">هشدار</span><span class="badge t-danger">خطا</span><span class="badge t-info">اطلاعات</span><span class="badge">خنثی</span></div>
    <div class="showcase__row"><span class="badge badge--dot t-success">فعال</span><span class="badge badge--dot t-danger">متوقف</span><span class="badge badge--solid t-primary">جدید</span><span class="badge badge--solid t-accent">${fa(24)}</span></div>
    <div class="showcase__row">${avatar('سارا محمدی', 'xs')}${avatar('علی رضایی', 'sm')}${avatar('مریم احمدی')}${avatar('رضا کریمی', 'lg', '<span class="status"></span>')}
      <div class="avatar-stack">${team.slice(0, 4).map((n) => avatar(n, 'sm'))}<span class="avatar avatar--sm avatar--more">+${fa(9)}</span></div></div>`
  )}
  ${box(
    'فرم‌ها',
    html`<div class="form-grid">
      <div class="field"><label class="label" for="c-1">ورودی متن</label><input class="input" id="c-1" placeholder="متن را وارد کنید" /></div>
      <div class="field"><label class="label" for="c-2">با آیکن</label><div class="input-icon">${icon('search')}<input class="input" id="c-2" placeholder="جستجو" /></div></div>
      <div class="field is-invalid"><label class="label" for="c-3">حالت خطا</label><input class="input" id="c-3" value="abc" aria-invalid="true" /><p class="field__error">ایمیل معتبر نیست</p></div>
      <div class="field"><label class="label" for="c-4">تاریخ شمسی</label><div class="input-icon">${icon('calendar')}<input class="input" id="c-4" data-datepicker readonly placeholder="انتخاب تاریخ" /></div></div>
      <div class="field"><label class="label" for="c-5">انتخابی</label><select class="select" id="c-5"><option>گزینه اول</option><option>گزینه دوم</option></select></div>
      <div class="field"><label class="label" for="c-6">با پسوند</label><div class="input-group"><input class="input" id="c-6" value="۲۵۰٬۰۰۰" /><span class="input-group__addon">تومان</span></div></div>
    </div>
    <div class="showcase__row"><label class="check"><input type="checkbox" checked /> چک‌باکس</label><label class="check"><input type="radio" name="r" checked /> رادیو ۱</label><label class="check"><input type="radio" name="r" /> رادیو ۲</label><label class="switch"><input type="checkbox" checked /> سوییچ</label></div>`
  )}
  ${box(
    'هشدارها',
    html`<div class="alert t-info">${icon('info')}<div><strong>اطلاعات</strong>نسخه جدید پیشخوان در دسترس است.</div></div>
    <div class="alert t-success">${icon('circle-check')}<div><strong>موفق</strong>تغییرات با موفقیت ذخیره شد.</div></div>
    <div class="alert t-warning">${icon('triangle-alert')}<div><strong>هشدار</strong>موجودی ۳ محصول رو به اتمام است.</div></div>
    <div class="alert t-danger">${icon('circle-x')}<div><strong>خطا</strong>اتصال به درگاه برقرار نشد.</div></div>`
  )}
  ${box(
    'پیشرفت و نمودار کوچک',
    html`<div class="progress"><span style="--value:72%"></span></div><div class="progress t-success"><span style="--value:45%"></span></div><div class="progress t-accent progress--sm"><span style="--value:88%"></span></div>
    <div class="showcase__row"><div class="ring" style="--value:72">۷۲٪</div><div class="ring t-success" style="--value:45">۴۵٪</div><div class="ring t-accent" style="--value:88">۸۸٪</div>
      <div style="flex:1;min-inline-size:10rem">${chart({ type: 'sparkline', height: 60, series: [{ name: 'روند', data: [5, 8, 6, 11, 9, 14, 12, 17] }] })}</div></div>`
  )}
  ${box(
    'تب‌ها و آکاردئون',
    html`<div data-tabs>
      <div class="tabs tabs--pill" role="tablist" aria-label="نمونه تب"><button role="tab" id="ct1" aria-controls="cp1" aria-selected="true" type="button">نمای کلی</button><button role="tab" id="ct2" aria-controls="cp2" aria-selected="false" type="button">جزئیات</button><button role="tab" id="ct3" aria-controls="cp3" aria-selected="false" type="button">تاریخچه</button></div>
      <div role="tabpanel" id="cp1" aria-labelledby="ct1" class="tab-panel small muted">محتوای تب نمای کلی. با کلیدهای جهت‌نما هم می‌توانید بین تب‌ها جابه‌جا شوید.</div>
      <div role="tabpanel" id="cp2" aria-labelledby="ct2" class="tab-panel small muted" hidden>محتوای تب جزئیات.</div>
      <div role="tabpanel" id="cp3" aria-labelledby="ct3" class="tab-panel small muted" hidden>محتوای تب تاریخچه.</div>
    </div>
    <div class="accordion" data-accordion="single">
      <details open><summary>ارسال سفارش‌ها چقدر طول می‌کشد؟ ${icon('chevron-down')}</summary><div class="accordion__body">سفارش‌های تهران ۱ تا ۲ روز کاری و شهرستان‌ها ۲ تا ۴ روز کاری تحویل می‌شوند.</div></details>
      <details><summary>چطور کد تخفیف بسازم؟ ${icon('chevron-down')}</summary><div class="accordion__body">از منوی بازاریابی، گزینه کدهای تخفیف را انتخاب کنید.</div></details>
    </div>`
  )}
  ${box(
    'مودال، اعلان و منوی کشویی',
    html`<div class="showcase__row">
      <button class="btn btn--primary" type="button" data-modal-open="demo-modal">باز کردن مودال</button>
      <button class="btn" type="button" data-toast="عملیات با موفقیت انجام شد">اعلان موفق</button>
      <button class="btn" type="button" data-toast="خطایی رخ داد؛ دوباره تلاش کنید" data-toast-type="error">اعلان خطا</button>
      <div data-dropdown><button class="btn" type="button" data-dropdown-toggle aria-expanded="false">منوی کشویی ${icon('chevron-down')}</button>
        <div class="dropdown-menu dropdown-menu--start" data-dropdown-menu><button type="button">${icon('pencil')} ویرایش</button><button type="button">${icon('copy')} کپی</button><hr /><button type="button" class="danger">${icon('trash-2')} حذف</button></div></div>
    </div>
    <div class="empty" style="padding:1.5rem;border:1px dashed var(--border-strong);border-radius:var(--radius)">${icon('inbox')}<strong>حالت خالی</strong><span class="small">هنوز موردی اضافه نشده است.</span></div>`
  )}
</div>

<dialog class="modal" id="demo-modal" aria-labelledby="dm-title">
  <div class="modal__head"><h2 id="dm-title">نمونه مودال</h2><button class="icon-btn" type="button" data-modal-close aria-label="بستن">${icon('x')}</button></div>
  <div class="modal__body"><p class="muted small">مودال‌ها بر پایه عنصر بومی dialog ساخته شده‌اند؛ با Esc یا کلیک بیرون بسته می‌شوند و فوکوس را مدیریت می‌کنند.</p></div>
  <div class="modal__foot"><button class="btn" type="button" data-modal-close>بستن</button><button class="btn btn--primary" type="button" data-modal-close>تأیید</button></div>
</dialog>`;
