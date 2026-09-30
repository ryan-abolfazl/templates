import { html, icon } from '../../../tools/lib/html.mjs';
import { logo } from '../partials.mjs';
import { garment } from '../garments.mjs';

export const meta = { title: 'ورود / عضویت', layout: 'blank', description: 'ورود یا عضویت در ویترین با شماره موبایل' };

export default (ctx) => html`
<main id="main" class="auth">
  <div class="auth__art" aria-hidden="true">${garment('coat', '#b98a56')}<p>«کمتر بخریم، بهتر بپوشیم.»</p></div>
  <section class="auth__panel">
    ${logo(ctx)}
    <div class="auth__box" data-tabs>
      <div class="tabs" role="tablist" aria-label="ورود یا عضویت">
        <button role="tab" id="lt-1" aria-controls="lp-1" aria-selected="true" type="button">ورود</button>
        <button role="tab" id="lt-2" aria-controls="lp-2" aria-selected="false" type="button">عضویت</button>
      </div>
      <form role="tabpanel" id="lp-1" aria-labelledby="lt-1" class="stack" style="--gap:1.25rem" data-validate data-success="خوش آمدید" data-redirect="account.html">
        <h1>خوش برگشتید</h1>
        <div class="field"><label class="label" for="l-p">شماره موبایل</label><input class="input" id="l-p" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل ۱۱ رقمی و با ۰۹ شروع شود" placeholder="۰۹۱۲۳۴۵۶۷۸۹" autocomplete="tel" /></div>
        <div class="field"><label class="label" for="l-w">رمز عبور</label><input class="input" id="l-w" type="password" required minlength="6" autocomplete="current-password" /></div>
        <button class="btn btn--solid btn--lg btn--block" type="submit">ورود</button>
        <button class="link xs" type="button" data-toast="کد یکبارمصرف پیامک شد" data-toast-type="info" style="justify-self:center">ورود با کد یکبارمصرف</button>
      </form>
      <form role="tabpanel" id="lp-2" aria-labelledby="lt-2" class="stack" style="--gap:1.25rem" hidden data-validate data-success="عضویت انجام شد؛ کد ۱۰٪ تخفیف پیامک شد" data-redirect="account.html">
        <h1>به ویترین بپیوندید</h1>
        <p class="small muted">با عضویت، ۱۰٪ تخفیف اولین خرید و دسترسی زودهنگام به حراج‌ها را بگیرید.</p>
        <div class="field"><label class="label" for="r-n">نام و نام خانوادگی</label><input class="input" id="r-n" required autocomplete="name" /></div>
        <div class="field"><label class="label" for="r-p">شماره موبایل</label><input class="input" id="r-p" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل ۱۱ رقمی و با ۰۹ شروع شود" autocomplete="tel" /></div>
        <label class="check"><input type="checkbox" checked /> عضویت در خبرنامه</label>
        <button class="btn btn--solid btn--lg btn--block" type="submit">ساخت حساب</button>
      </form>
    </div>
    <a class="link xs" href="${ctx.base}index.html">${icon('arrow-right')} بازگشت به فروشگاه</a>
  </section>
</main>`;
