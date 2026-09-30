import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero, doctorPortrait } from '../partials.mjs';
import { services, doctors } from '../data.mjs';

export const meta = { title: 'رزرو آنلاین نوبت', layout: 'main', description: 'رزرو نوبت در ۴ مرحله: خدمت، پزشک، زمان و مشخصات' };

const slots = ['۰۹:۰۰', '۰۹:۳۰', '۱۰:۰۰', '۱۰:۳۰', '۱۱:۰۰', '۱۱:۳۰', '۱۴:۰۰', '۱۴:۳۰', '۱۵:۰۰', '۱۶:۳۰', '۱۷:۰۰', '۱۸:۳۰'];

export default (ctx) => html`
${pageHero(ctx, { title: html`رزرو <b>آنلاین</b> نوبت`, sub: 'در کمتر از یک دقیقه نوبت بگیرید. تأیید نوبت و یادآوری، پیامک می‌شود.', crumbs: [{ label: 'رزرو نوبت' }] })}

<section class="section section--tight">
  <div class="container booking">
    <form class="card glass wizard" data-wizard data-validate novalidate>
      <ol class="wizard__steps list-plain" aria-label="مراحل رزرو">
        ${['خدمت', 'پزشک', 'زمان', 'مشخصات'].map((s, i) => html`<li data-step-dot><span>${fa(i + 1)}</span>${s}</li>`)}
      </ol>

      <fieldset data-step data-need="service">
        <legend class="h-sm">چه خدمتی نیاز دارید؟</legend>
        <div class="opt-grid">
          ${services.map((s, i) => html`<label class="opt"><input type="radio" name="service" value="${s.name}" ${i === 0 ? 'checked' : ''} /><span class="icon-bubble">${icon(s.icon)}</span><b>${s.name}</b><span class="xs muted">${s.time}</span></label>`)}
        </div>
      </fieldset>

      <fieldset data-step hidden>
        <legend class="h-sm">پزشک مورد نظر</legend>
        <div class="opt-grid opt-grid--docs">
          <label class="opt"><input type="radio" name="doctor" value="اولین پزشک در دسترس" checked /><span class="icon-bubble">${icon('zap')}</span><b>اولین پزشک در دسترس</b><span class="xs muted">سریع‌ترین نوبت</span></label>
          ${doctors.map((d) => html`<label class="opt"><input type="radio" name="doctor" value="${d.name}" /><span class="mini-portrait" style="inline-size:3.5rem;block-size:3.5rem">${doctorPortrait(d)}</span><b>${d.name}</b><span class="xs muted">${d.role}</span></label>`)}
        </div>
      </fieldset>

      <fieldset data-step data-need="time" hidden>
        <legend class="h-sm">روز و ساعت مراجعه</legend>
        <div class="field"><label class="label" for="b-date">روز مراجعه</label><div class="input-icon">${icon('calendar')}<input class="input" id="b-date" data-datepicker readonly placeholder="روی این قسمت بزنید تا تقویم باز شود" /></div></div>
        <p class="small muted" data-slots-hint>${icon('info')} ابتدا روز را انتخاب کنید تا ساعت‌های خالی نمایش داده شوند.</p>
        <div class="slots" data-slots hidden role="radiogroup" aria-label="ساعت مراجعه">
          ${slots.map((t) => html`<label class="slot"><input type="radio" name="slot" value="${t}" /><span>${t}</span></label>`)}
        </div>
      </fieldset>

      <fieldset data-step hidden>
        <legend class="h-sm">مشخصات بیمار</legend>
        <div class="form-grid">
          <div class="field"><label class="label" for="b-name">نام و نام خانوادگی</label><input class="input" id="b-name" required autocomplete="name" /></div>
          <div class="field"><label class="label" for="b-phone">شماره موبایل</label><input class="input" id="b-phone" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل را به شکل ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید" autocomplete="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" /></div>
          <div class="field"><label class="label" for="b-nid">کد ملی</label><input class="input ltr" id="b-nid" inputmode="numeric" pattern="[0-9]{10}" data-msg="کد ملی ۱۰ رقمی است" /></div>
          <div class="field"><label class="label" for="b-ins">بیمه تکمیلی</label><select class="select" id="b-ins"><option>ندارم</option><option>بیمه دی</option><option>بیمه ایران</option><option>بیمه آسیا</option><option>بیمه البرز</option><option>سایر</option></select></div>
          <div class="field full"><label class="label" for="b-note">توضیحات (اختیاری)</label><textarea class="textarea" id="b-note" rows="3" placeholder="مثلاً: حساسیت دارویی، ترس از دندانپزشکی…"></textarea></div>
          <label class="check full"><input type="checkbox" required /> <span>با <a class="link" href="${ctx.base}documentation/index.html">شرایط لغو نوبت</a> موافقم (لغو رایگان تا ۲۴ ساعت قبل)</span></label>
        </div>
      </fieldset>

      <div class="wizard__nav" data-step-nav>
        <button class="btn" type="button" data-prev>${icon('arrow-right')} قبلی</button>
        <button class="btn btn--primary" type="button" data-next>بعدی ${icon('arrow-left')}</button>
      </div>

      <div class="wizard__done" data-done hidden>
        <span class="done-mark">${icon('check')}</span>
        <h2 class="h-md">نوبت شما ثبت شد!</h2>
        <p class="muted">کد پیگیری: <b class="ltr" data-code>LB-0000</b></p>
        <p class="small muted">پیامک تأیید و یادآوری ۲۴ ساعت قبل از نوبت برایتان ارسال می‌شود.</p>
        <a class="btn btn--primary" href="${ctx.base}index.html">بازگشت به صفحه اصلی</a>
      </div>
    </form>

    <aside class="card booking__sum stack" aria-live="polite">
      <h2 class="h-sm">خلاصه نوبت</h2>
      <dl class="sum-list">
        <div><dt>${icon('stethoscope')} خدمت</dt><dd data-sum="service">—</dd></div>
        <div><dt>${icon('user-round')} پزشک</dt><dd data-sum="doctor">—</dd></div>
        <div><dt>${icon('calendar')} زمان</dt><dd data-sum="when">—</dd></div>
        <div><dt>${icon('map-pin')} مکان</dt><dd>تهران، ونک، کوچه قبادیان، پلاک ۱۸</dd></div>
      </dl>
      <p class="xs muted">${icon('shield-check')} مشاوره اول رایگان است و هزینه‌ای برای رزرو دریافت نمی‌شود.</p>
    </aside>
  </div>
</section>`;
