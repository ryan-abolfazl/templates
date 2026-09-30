import { html, icon } from '../../../tools/lib/html.mjs';
import { authShell } from '../partials.mjs';

export const meta = { title: 'فراموشی رمز عبور', layout: 'blank', description: 'بازیابی رمز عبور حساب پیشخوان' };

export default (ctx) =>
  authShell(ctx, {
    title: 'رمز عبور را فراموش کرده‌اید؟',
    sub: 'نگران نباشید! ایمیل یا موبایل خود را وارد کنید تا کد بازیابی برایتان ارسال شود.',
    body: html`
      <form class="stack" style="--gap:1rem" data-validate data-success="کد بازیابی ارسال شد" data-redirect="verify.html">
        <div class="field"><label class="label" for="f-id">ایمیل یا شماره موبایل</label><div class="input-icon">${icon('mail')}<input class="input" id="f-id" required /></div></div>
        <button class="btn btn--primary btn--lg btn--block" type="submit">ارسال کد بازیابی</button>
      </form>
      <a class="btn btn--ghost btn--block" href="${ctx.base}login.html">${icon('arrow-right')} بازگشت به صفحه ورود</a>`,
  });
