import { html, icon } from '../../../tools/lib/html.mjs';
import { authLayout } from './login.mjs';

export const meta = { title: 'ثبت‌نام', layout: 'blank', description: 'ساخت حساب رایگان در آکادمی دانش' };

export default (ctx) =>
  authLayout(
    ctx,
    'یادگیری را شروع کن',
    'ثبت‌نام رایگان است و اولین جلسه همه دوره‌ها را می‌توانی ببینی.',
    html`<form class="stack" style="--gap:1rem" data-validate data-success="حساب ساخته شد. خوش آمدی!" data-redirect="dashboard.html">
      <div class="field"><label class="label" for="r-name">نام و نام خانوادگی</label><input class="input" id="r-name" required autocomplete="name" /></div>
      <div class="field"><label class="label" for="r-phone">شماره موبایل</label><input class="input" id="r-phone" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل را به شکل ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید" placeholder="۰۹۱۲۳۴۵۶۷۸۹" /></div>
      <div class="field"><label class="label" for="r-pw">رمز عبور</label><div class="input-icon">${icon('lock')}<input class="input" id="r-pw" type="password" required minlength="8" autocomplete="new-password" /><button class="icon-btn input-action" type="button" data-password-toggle aria-label="نمایش رمز" aria-pressed="false">${icon('eye')}</button></div><span class="field__hint">حداقل ۸ کاراکتر</span></div>
      <div class="field"><span class="label">به چه چیزی علاقه داری؟</span><div class="row wrap">${['برنامه‌نویسی', 'طراحی', 'هوش مصنوعی', 'زبان', 'کسب‌وکار'].map((t, i) => html`<label class="check chip"><input type="checkbox" ${i === 0 ? 'checked' : ''} /> ${t}</label>`)}</div></div>
      <label class="check"><input type="checkbox" required /> <span><a class="bold" href="${ctx.base}documentation/index.html">قوانین</a> را می‌پذیرم</span></label>
      <button class="btn btn--primary btn--lg btn--block" type="submit">ساخت حساب ${icon('arrow-left')}</button>
    </form>
    <p class="small center">قبلاً ثبت‌نام کردی؟ <a class="bold" href="${ctx.base}login.html">وارد شو</a></p>`
  );
