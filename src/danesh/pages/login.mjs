import { html, icon } from '../../../tools/lib/html.mjs';
import { logo } from '../partials.mjs';

export const meta = { title: 'ورود', layout: 'blank', description: 'ورود به حساب کاربری آکادمی دانش' };

export const authLayout = (ctx, title, sub, form) => html`
<main id="main" class="auth">
  <div class="auth__top">${logo(ctx)}<a class="small muted" href="${ctx.base}index.html">بازگشت به صفحه اصلی ${icon('chevron-left')}</a></div>
  <section class="auth__card glass glass--lg">
    <div class="stack" style="--gap:.4rem"><h1>${title}</h1><p class="muted">${sub}</p></div>
    ${form}
  </section>
  <p class="auth__quote">«هر روز فقط ۳۰ دقیقه؛ یک سال بعد، آدم دیگری هستی.»</p>
</main>`;

export default (ctx) =>
  authLayout(
    ctx,
    'خوش برگشتی!',
    'برای ادامه یادگیری وارد حسابت شو.',
    html`<form class="stack" style="--gap:1rem" data-validate data-success="خوش آمدی! در حال انتقال…" data-redirect="dashboard.html">
      <div class="field"><label class="label" for="l-phone">شماره موبایل یا ایمیل</label><div class="input-icon">${icon('smartphone')}<input class="input" id="l-phone" required autocomplete="username" /></div></div>
      <div class="field"><div class="row-between"><label class="label" for="l-pw">رمز عبور</label><a class="xs bold" href="${ctx.base}register.html">فراموش کردی؟</a></div>
        <div class="input-icon">${icon('lock')}<input class="input" id="l-pw" type="password" required minlength="6" autocomplete="current-password" /><button class="icon-btn input-action" type="button" data-password-toggle aria-label="نمایش رمز" aria-pressed="false">${icon('eye')}</button></div></div>
      <label class="check"><input type="checkbox" checked /> مرا به خاطر بسپار</label>
      <button class="btn btn--primary btn--lg btn--block" type="submit">ورود ${icon('arrow-left')}</button>
      <button class="btn btn--block" type="button" data-toast="کد ورود پیامک شد" data-toast-type="info">${icon('message-square-text')} ورود با کد یکبارمصرف</button>
    </form>
    <p class="small center">حساب نداری؟ <a class="bold" href="${ctx.base}register.html">رایگان ثبت‌نام کن</a></p>`
  );
