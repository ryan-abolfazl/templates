import { html, icon } from '../../../tools/lib/html.mjs';
import { authShell } from '../partials.mjs';

export const meta = { title: 'تأیید کد', layout: 'blank', description: 'وارد کردن کد یکبارمصرف پیامکی' };

export default (ctx) =>
  authShell(ctx, {
    title: 'کد تأیید را وارد کنید',
    sub: 'کد ۵ رقمی به شماره ۰۹۱۲ ۳۴۵ ****۸۹ پیامک شد.',
    body: html`
      <form class="stack" style="--gap:1.25rem" data-success="شماره موبایل تأیید شد" data-validate data-redirect="index.html">
        <div class="otp" data-otp role="group" aria-label="کد یکبارمصرف">
          ${[1, 2, 3, 4, 5].map((i) => html`<input inputmode="numeric" maxlength="1" required aria-label="رقم ${i}" autocomplete="${i === 1 ? 'one-time-code' : 'off'}" />`)}
        </div>
        <button class="btn btn--primary btn--lg btn--block" type="submit">تأیید و ادامه</button>
      </form>
      <p class="small muted" style="text-align:center" data-countdown data-hours="0.0333">ارسال دوباره کد تا <b data-unit="m">۰۲</b>:<b data-unit="s">۰۰</b> دیگر</p>
      <a class="btn btn--ghost btn--block" href="${ctx.base}login.html">${icon('pencil')} ویرایش شماره موبایل</a>`,
  });
