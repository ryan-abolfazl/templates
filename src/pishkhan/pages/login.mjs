import { html, icon } from '../../../tools/lib/html.mjs';
import { authShell } from '../partials.mjs';

export const meta = { title: 'ورود', layout: 'blank', description: 'ورود به پنل مدیریت پیشخوان' };

export default (ctx) =>
  authShell(ctx, {
    title: 'خوش برگشتی 👋',
    sub: 'برای ورود به پنل، اطلاعات حساب خود را وارد کنید.',
    body: html`
      <div class="social-row">
        <button class="btn" type="button">${icon('smartphone')} ورود با کد پیامکی</button>
        <button class="btn" type="button">${icon('key-round')} کلید عبور</button>
      </div>
      <div class="auth-divider">یا با ایمیل</div>
      <form class="stack" style="--gap:1rem" data-validate data-success="ورود موفق؛ در حال انتقال…" data-redirect="index.html">
        <div class="field">
          <label class="label" for="l-email">ایمیل یا شماره موبایل</label>
          <div class="input-icon">${icon('mail')}<input class="input" id="l-email" required autocomplete="username" placeholder="sara@pishkhan.ir" /></div>
        </div>
        <div class="field">
          <div class="row-between"><label class="label" for="l-pw">رمز عبور</label><a class="xs text-primary" href="${ctx.base}forgot-password.html">فراموشی رمز؟</a></div>
          <div class="input-icon">${icon('lock')}<input class="input" id="l-pw" type="password" required minlength="6" autocomplete="current-password" placeholder="••••••••" />
            <button class="icon-btn icon-btn--sm input-action" type="button" data-password-toggle aria-label="نمایش رمز" aria-pressed="false">${icon('eye')}</button></div>
        </div>
        <label class="check"><input type="checkbox" checked /> مرا به خاطر بسپار</label>
        <button class="btn btn--primary btn--lg btn--block" type="submit">ورود به پنل ${icon('arrow-left')}</button>
      </form>
      <p class="small muted" style="text-align:center">حساب ندارید؟ <a class="text-primary bold" href="${ctx.base}register.html">ثبت‌نام رایگان</a></p>`,
  });
