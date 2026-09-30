import { html, icon } from '../../../tools/lib/html.mjs';
import { authShell } from '../partials.mjs';

export const meta = { title: 'ثبت‌نام', layout: 'blank', description: 'ساخت حساب جدید در پیشخوان' };

export default (ctx) =>
  authShell(ctx, {
    title: 'ساخت حساب جدید',
    sub: '۱۴ روز استفاده رایگان از همه امکانات؛ بدون نیاز به کارت بانکی.',
    body: html`
      <form class="stack" style="--gap:1rem" data-validate data-success="حساب شما ساخته شد" data-redirect="verify.html">
        <div class="form-grid">
          <div class="field"><label class="label" for="r-first">نام</label><input class="input" id="r-first" required autocomplete="given-name" /></div>
          <div class="field"><label class="label" for="r-last">نام خانوادگی</label><input class="input" id="r-last" required autocomplete="family-name" /></div>
        </div>
        <div class="field"><label class="label" for="r-shop">نام فروشگاه</label><div class="input-icon">${icon('store')}<input class="input" id="r-shop" required /></div></div>
        <div class="field"><label class="label" for="r-phone">شماره موبایل</label><div class="input-icon">${icon('smartphone')}<input class="input" id="r-phone" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل را به شکل ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید" placeholder="۰۹۱۲۳۴۵۶۷۸۹" /></div></div>
        <div class="field">
          <label class="label" for="r-pw">رمز عبور</label>
          <div class="input-icon">${icon('lock')}<input class="input" id="r-pw" type="password" required minlength="8" autocomplete="new-password" data-pw-meter />
            <button class="icon-btn icon-btn--sm input-action" type="button" data-password-toggle aria-label="نمایش رمز" aria-pressed="false">${icon('eye')}</button></div>
          <div class="pw-meter" data-score="0" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
          <span class="field__hint">حداقل ۸ کاراکتر، ترکیبی از حروف، عدد و نماد</span>
        </div>
        <label class="check"><input type="checkbox" required /> <span><a class="text-primary" href="${ctx.base}documentation/index.html">قوانین و حریم خصوصی</a> را می‌پذیرم</span></label>
        <button class="btn btn--primary btn--lg btn--block" type="submit">ساخت حساب ${icon('arrow-left')}</button>
      </form>
      <p class="small muted" style="text-align:center">قبلاً ثبت‌نام کرده‌اید؟ <a class="text-primary bold" href="${ctx.base}login.html">وارد شوید</a></p>
      <script>
        document.addEventListener('input', function (e) {
          if (!e.target.matches('[data-pw-meter]')) return;
          var v = e.target.value, s = 0;
          if (v.length >= 8) s++;
          if (/[0-9]/.test(v)) s++;
          if (/[A-Za-z؀-ۿ]/.test(v) && v.length >= 10) s++;
          if (/[^A-Za-z0-9؀-ۿ]/.test(v)) s++;
          e.target.closest('.field').querySelector('.pw-meter').setAttribute('data-score', v ? Math.max(1, s) : 0);
        });
      </script>`,
  });
