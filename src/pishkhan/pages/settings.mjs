import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHead, avatar } from '../partials.mjs';

export const meta = { title: 'تنظیمات', layout: 'app', active: 'settings', description: 'تنظیمات حساب، امنیت، اعلان‌ها و اشتراک' };

const row = (title, desc, checked = true) => html`<div class="setting-row"><div><strong>${title}</strong><span>${desc}</span></div><label class="switch"><input type="checkbox" ${checked ? 'checked' : ''} aria-label="${title}" /></label></div>`;

export default (ctx) => html`
${pageHead(ctx, { title: 'تنظیمات', sub: 'حساب کاربری و ترجیحات پنل را مدیریت کنید', crumbs: [{ label: 'تنظیمات' }] })}

<div class="card" data-tabs>
  <div class="tabs" role="tablist" aria-label="بخش‌های تنظیمات">
    <button role="tab" id="st-1" aria-controls="sp-1" aria-selected="true" type="button">${icon('user-round')} حساب کاربری</button>
    <button role="tab" id="st-2" aria-controls="sp-2" aria-selected="false" type="button">${icon('shield-check')} امنیت</button>
    <button role="tab" id="st-3" aria-controls="sp-3" aria-selected="false" type="button">${icon('bell')} اعلان‌ها</button>
    <button role="tab" id="st-4" aria-controls="sp-4" aria-selected="false" type="button">${icon('credit-card')} اشتراک و پرداخت</button>
  </div>

  <div role="tabpanel" id="sp-1" aria-labelledby="st-1">
    <form data-validate data-success="تغییرات ذخیره شد">
      <div class="settings-section">
        <div><h2>تصویر پروفایل</h2><p>تصویر مربعی با حداقل ابعاد ۴۰۰ پیکسل.</p></div>
        <div class="row wrap">${avatar('سارا محمدی', 'xl')}<div class="row"><button class="btn" type="button">${icon('upload')} بارگذاری تصویر</button><button class="btn btn--ghost" type="button">حذف</button></div></div>
      </div>
      <div class="settings-section">
        <div><h2>اطلاعات شخصی</h2><p>این اطلاعات در فاکتورها و ایمیل‌ها استفاده می‌شود.</p></div>
        <div class="form-grid">
          <div class="field"><label class="label" for="s-first">نام</label><input class="input" id="s-first" value="سارا" required /></div>
          <div class="field"><label class="label" for="s-last">نام خانوادگی</label><input class="input" id="s-last" value="محمدی" required /></div>
          <div class="field"><label class="label" for="s-email">ایمیل</label><input class="input ltr" id="s-email" type="email" value="sara@pishkhan.ir" required /></div>
          <div class="field"><label class="label" for="s-phone">موبایل</label><input class="input" id="s-phone" type="tel" value="09123456789" /></div>
          <div class="field"><label class="label" for="s-birth">تاریخ تولد</label><div class="input-icon">${icon('cake')}<input class="input" id="s-birth" data-datepicker readonly value="۱۳۷۰/۰۵/۱۲" /></div></div>
          <div class="field"><label class="label" for="s-city">شهر</label><select class="select" id="s-city"><option>تهران</option><option>اصفهان</option><option>شیراز</option><option>مشهد</option><option>تبریز</option></select></div>
          <div class="field full"><label class="label" for="s-bio">درباره من</label><textarea class="textarea" id="s-bio" rows="3">بیش از ۸ سال تجربه در مدیریت فروشگاه‌های آنلاین و بازاریابی دیجیتال.</textarea></div>
        </div>
      </div>
      <div class="settings-section">
        <div><h2>ترجیحات</h2><p>زبان، تقویم و واحد پول پنل.</p></div>
        <div class="form-grid">
          <div class="field"><label class="label" for="s-lang">زبان</label><select class="select" id="s-lang"><option>فارسی</option><option>English</option></select></div>
          <div class="field"><label class="label" for="s-cal">تقویم</label><select class="select" id="s-cal"><option>شمسی (جلالی)</option><option>میلادی</option></select></div>
          <div class="field"><label class="label" for="s-cur">واحد پول</label><select class="select" id="s-cur"><option>تومان</option><option>ریال</option></select></div>
          <div class="field"><label class="label" for="s-tz">منطقه زمانی</label><select class="select" id="s-tz"><option>تهران (UTC+03:30)</option></select></div>
        </div>
      </div>
      <div class="row" style="justify-content:flex-end;padding-block-start:1rem;border-block-start:1px solid var(--border)"><button class="btn" type="reset">انصراف</button><button class="btn btn--primary" type="submit">ذخیره تغییرات</button></div>
    </form>
  </div>

  <div role="tabpanel" id="sp-2" aria-labelledby="st-2" hidden>
    <div class="settings-section">
      <div><h2>تغییر رمز عبور</h2><p>از رمزی با حداقل ۸ کاراکتر شامل عدد و حرف استفاده کنید.</p></div>
      <form class="form-grid" data-validate data-success="رمز عبور تغییر کرد">
        <div class="field full"><label class="label" for="s-pw0">رمز فعلی</label><input class="input" id="s-pw0" type="password" required /></div>
        <div class="field"><label class="label" for="s-pw1">رمز جدید</label><input class="input" id="s-pw1" type="password" required minlength="8" /></div>
        <div class="field"><label class="label" for="s-pw2">تکرار رمز جدید</label><input class="input" id="s-pw2" type="password" required minlength="8" /></div>
        <div class="full"><button class="btn btn--primary" type="submit">به‌روزرسانی رمز</button></div>
      </form>
    </div>
    <div class="settings-section">
      <div><h2>ورود دومرحله‌ای</h2><p>با کد پیامکی یا اپلیکیشن احراز هویت، امنیت حساب را بالا ببرید.</p></div>
      <div>${row('کد پیامکی', 'ارسال کد به ۰۹۱۲ ۳۴۵ ****', true)}${row('اپلیکیشن احراز هویت', 'Google Authenticator یا Microsoft Authenticator', false)}</div>
    </div>
    <div class="settings-section">
      <div><h2>نشست‌های فعال</h2><p>دستگاه‌هایی که اکنون به حساب شما متصل هستند.</p></div>
      <div>
        ${[
          ['monitor', 'کروم روی ویندوز', 'تهران · همین حالا', true],
          ['smartphone', 'اپلیکیشن پیشخوان روی اندروید', 'تهران · ۲ ساعت پیش'],
          ['laptop', 'سافاری روی مک‌بوک', 'اصفهان · ۳ روز پیش'],
        ].map(
          ([ic, n, m, cur]) => html`<div class="session"><span class="thumb">${icon(ic)}</span><div><strong>${n} ${cur ? html`<span class="badge t-success">دستگاه فعلی</span>` : ''}</strong><span>${m}</span></div>${cur ? '' : html`<button class="btn btn--sm" type="button" data-toast="نشست خاتمه یافت">خروج</button>`}</div>`
        )}
      </div>
    </div>
    <div class="settings-section">
      <div><h2 class="text-danger">حذف حساب</h2><p>با حذف حساب، همه داده‌ها برای همیشه پاک می‌شوند.</p></div>
      <div><button class="btn btn--danger" type="button" data-modal-open="delete-account">${icon('trash-2')} حذف حساب کاربری</button></div>
    </div>
  </div>

  <div role="tabpanel" id="sp-3" aria-labelledby="st-3" hidden>
    <div class="settings-section">
      <div><h2>ایمیل</h2><p>چه ایمیل‌هایی برای شما ارسال شود؟</p></div>
      <div>${row('سفارش جدید', 'هر بار که سفارشی ثبت می‌شود')}${row('گزارش هفتگی', 'خلاصه فروش هر شنبه صبح')}${row('خبرنامه محصول', 'امکانات جدید پیشخوان', false)}</div>
    </div>
    <div class="settings-section">
      <div><h2>پیامک و پوش</h2><p>اعلان‌های فوری روی موبایل.</p></div>
      <div>${row('کمبود موجودی', 'وقتی موجودی کالا کمتر از ۵ عدد شود')}${row('پیام مشتری', 'پیام‌های جدید در گفتگوها')}${row('تسویه‌حساب', 'واریز وجه از درگاه', false)}</div>
    </div>
  </div>

  <div role="tabpanel" id="sp-4" aria-labelledby="st-4" hidden>
    <div class="settings-section">
      <div><h2>طرح اشتراک</h2><p>هر زمان می‌توانید طرح خود را تغییر دهید.</p></div>
      <div class="plan-cards">
        ${[
          ['پایه', 0, ['۱ کاربر', '۱۰۰ محصول', 'گزارش ماهانه']],
          ['حرفه‌ای', 490000, ['۵ کاربر', 'محصول نامحدود', 'گزارش پیشرفته', 'چند انبار'], true],
          ['سازمانی', 1290000, ['کاربر نامحدود', 'API اختصاصی', 'پشتیبانی ۲۴ ساعته']],
        ].map(
          ([n, p, f, on]) => html`<label class="plan"><input type="radio" name="plan" ${on ? 'checked' : ''} class="check" /><strong>${n}</strong><p class="plan__price">${p ? fa(p) : 'رایگان'} ${p ? html`<small>تومان / ماه</small>` : ''}</p><ul class="list-plain">${f.map((x) => html`<li>${icon('check')}${x}</li>`)}</ul></label>`
        )}
      </div>
    </div>
    <div class="settings-section">
      <div><h2>روش پرداخت</h2><p>کارت بانکی برای تمدید خودکار.</p></div>
      <div class="session"><span class="thumb t-primary">${icon('credit-card')}</span><div><strong class="ltr" style="text-align:end">6037 **** **** 4821</strong><span>بانک ملی · انقضا ۰۸/۱۴۰۷</span></div><button class="btn btn--sm" type="button">تغییر</button></div>
    </div>
  </div>
</div>

<dialog class="modal" id="delete-account" aria-labelledby="da-title">
  <div class="modal__head"><h2 id="da-title">حذف حساب کاربری</h2><button class="icon-btn" type="button" data-modal-close aria-label="بستن">${icon('x')}</button></div>
  <div class="modal__body stack" style="--gap:1rem">
    <div class="alert t-danger">${icon('triangle-alert')}<div><strong>این عمل برگشت‌پذیر نیست</strong>همه سفارش‌ها، محصولات و گزارش‌ها حذف خواهند شد.</div></div>
    <div class="field"><label class="label" for="da-confirm">برای تأیید عبارت «حذف» را بنویسید</label><input class="input" id="da-confirm" /></div>
  </div>
  <div class="modal__foot"><button class="btn" type="button" data-modal-close>انصراف</button><button class="btn btn--danger" type="button" data-modal-close data-toast="درخواست حذف ثبت شد" data-toast-type="error">حذف دائمی</button></div>
</dialog>`;
