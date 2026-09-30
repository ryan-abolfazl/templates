import { html, icon } from '../../../tools/lib/html.mjs';
import { pageHead } from '../partials.mjs';

export const meta = { title: 'تماس و فروشگاه‌ها', layout: 'main', description: 'راه‌های تماس، پیگیری سفارش و آدرس فروشگاه‌های حضوری' };

export default (ctx) => html`
${pageHead(ctx, { title: 'در تماس باشیم', kicker: 'تماس', sub: 'تیم خدمات مشتریان شنبه تا پنجشنبه، ۹ صبح تا ۹ شب پاسخگوی شماست.', crumbs: [{ label: 'تماس' }] })}
<section class="section section--tight">
  <div class="container contact">
    <div class="stack" style="--gap:2rem">
      <div class="contact__block"><h2>خدمات مشتریان</h2><p>۰۲۱-۲۲۰۴۴۰۱۰</p><p class="ltr" style="text-align:start">hello@vitrin.shop</p></div>
      <div class="contact__block"><h2>فروشگاه تهران</h2><p class="muted small">خیابان منوچهری، پاساژ ارغوان، طبقه همکف، پلاک ۱۴<br />همه روزه ۱۰ تا ۲۱</p></div>
      <div class="contact__block"><h2>فروشگاه تبریز</h2><p class="muted small">خیابان ولیعصر، مجتمع لاله، واحد ۲۲<br />شنبه تا پنجشنبه ۱۰ تا ۲۰</p></div>
      <div class="map-ph" role="img" aria-label="نقشه محل فروشگاه تهران">${icon('map-pin')}<span class="xs">جای نقشه (نشان یا گوگل‌مپ)</span></div>
    </div>
    <form class="stack" style="--gap:1.25rem" data-validate data-success="پیام شما دریافت شد؛ ظرف ۲۴ ساعت پاسخ می‌دهیم">
      <h2 style="font-size:var(--text-xl)">ارسال پیام</h2>
      <div class="form-grid">
        <div class="field"><label class="label" for="c-n">نام</label><input class="input" id="c-n" required /></div>
        <div class="field"><label class="label" for="c-o">شماره سفارش (اختیاری)</label><input class="input ltr" id="c-o" placeholder="VT-00000" /></div>
        <div class="field full"><label class="label" for="c-t">موضوع</label><select class="select" id="c-t"><option>پیگیری سفارش</option><option>تعویض و مرجوعی</option><option>مشاوره سایز</option><option>همکاری</option></select></div>
        <div class="field full"><label class="label" for="c-m">پیام</label><textarea class="textarea" id="c-m" required minlength="10"></textarea></div>
      </div>
      <button class="btn btn--solid btn--lg" type="submit" style="justify-self:start">ارسال پیام ${icon('arrow-left')}</button>
    </form>
  </div>
</section>`;
