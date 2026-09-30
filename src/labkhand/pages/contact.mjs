import { html, icon } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';

export const meta = { title: 'تماس با ما', layout: 'main', active: 'contact', description: 'آدرس، تلفن، ساعات کاری و فرم تماس کلینیک لبخند' };

export default (ctx) => html`
${pageHero(ctx, { title: html`خوشحال می‌شویم <b>ببینیمتان</b>`, sub: 'برای رزرو نوبت، مشاوره یا هر سؤالی با ما در تماس باشید.', crumbs: [{ label: 'تماس' }] })}
<section class="section section--tight">
  <div class="container contact">
    <div class="stack" style="--gap:1rem">
      ${[
        ['phone', 'تلفن پذیرش', '۰۲۱-۸۸۷۷۶۶۵۵', 'tel:02188776655'],
        ['siren', 'اورژانس ۲۴ ساعته', '۰۹۱۲ ۰۰۰ ۱۸۱۸', 'tel:09120001818'],
        ['mail', 'ایمیل', 'info@labkhand.clinic', 'mailto:info@labkhand.clinic'],
        ['map-pin', 'آدرس', 'تهران، ولیعصر، بالاتر از ونک، کوچه قبادیان، پلاک ۱۸، طبقه ۲', ''],
      ].map(([i, t, v, h]) => html`<div class="card glass contact-item"><span class="icon-bubble">${icon(i)}</span><div><span class="xs muted">${t}</span>${h ? html`<a class="bold ${i === 'mail' ? 'ltr' : ''}" style="display:block" href="${h}">${v}</a>` : html`<b style="display:block">${v}</b>`}</div></div>`)}
      <div class="map-card" role="img" aria-label="نقشه موقعیت کلینیک">
        <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect class="map-bg" width="400" height="240"/><path class="map-road" d="M0 170 400 120M60 0l60 240M250 0l-40 240M0 60h400"/><path class="map-main" d="M0 170 400 120"/></svg>
        <span class="map-pin">${icon('map-pin')}</span>
        <a class="btn btn--glass btn--sm map-card__btn" href="#">${icon('navigation')} مسیریابی با نشان</a>
      </div>
    </div>
    <form class="card stack" style="--gap:1.1rem" data-validate data-success="پیام شما ارسال شد؛ همکاران ما به‌زودی تماس می‌گیرند">
      <h2 class="h-sm">ارسال پیام</h2>
      <div class="form-grid">
        <div class="field"><label class="label" for="c-n">نام</label><input class="input" id="c-n" required /></div>
        <div class="field"><label class="label" for="c-p">موبایل</label><input class="input" id="c-p" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل ۱۱ رقمی و با ۰۹ شروع شود" /></div>
        <div class="field full"><label class="label" for="c-s">موضوع</label><select class="select" id="c-s"><option>مشاوره درمان</option><option>پیگیری نوبت</option><option>پرسش درباره هزینه</option><option>انتقاد و پیشنهاد</option></select></div>
        <div class="field full"><label class="label" for="c-m">پیام</label><textarea class="textarea" id="c-m" required minlength="10"></textarea></div>
      </div>
      <button class="btn btn--primary btn--lg" type="submit" style="justify-self:start">${icon('send-horizontal', 'icon-flip')} ارسال</button>
    </form>
  </div>
</section>`;
