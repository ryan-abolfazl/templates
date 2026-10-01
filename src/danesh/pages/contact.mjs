import { html, icon } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';

export const meta = { title: 'تماس با ما', layout: 'main', active: 'contact', description: 'راه‌های ارتباط با پشتیبانی آکادمی دانش' };

export default (ctx) => html`
${pageHero(ctx, { title: 'بیا حرف بزنیم', sub: 'سؤال درباره دوره‌ها، همکاری یا پشتیبانی؟ هر روز از ۹ صبح تا ۱۲ شب پاسخگو هستیم.', crumbs: [{ label: 'تماس با ما' }] })}

<section class="section section--tight">
  <div class="container contact">
    <div class="stack" style="--gap:1rem">
      ${[
        ['phone', '', 'تلفن پشتیبانی', '۰۲۱-۹۱۰۰۲۰۳۰', 'شنبه تا پنجشنبه، ۹ تا ۲۴'],
        ['mail', '', 'ایمیل', 'support@danesh.academy', 'پاسخ در کمتر از ۴ ساعت'],
        ['messages-square', '', 'چت آنلاین', 'گفتگو با پشتیبان', 'میانگین پاسخ ۲ دقیقه'],
        ['map-pin', '', 'دفتر مرکزی', 'تهران، خیابان آزادی، نبش خیابان شادمان، پلاک ۴۲', 'مراجعه با هماهنگی قبلی'],
      ].map(([i, t, h, v, d]) => html`<div class="contact-item card"><span class="tile__icon ${t}">${icon(i)}</span><div><span class="xs muted">${h}</span><b class="${i === 'mail' ? 'ltr' : ''}" style="display:block">${v}</b><span class="xs muted">${d}</span></div></div>`)}
    </div>
    <form class="card stack" style="--gap:1.1rem" data-validate data-success="پیام شما ارسال شد؛ به‌زودی با شما تماس می‌گیریم">
      <h2 style="font-size:var(--text-xl)">فرم تماس</h2>
      <div class="form-grid">
        <div class="field"><label class="label" for="ct-name">نام</label><input class="input" id="ct-name" required /></div>
        <div class="field"><label class="label" for="ct-phone">موبایل</label><input class="input" id="ct-phone" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل ۱۱ رقمی و با ۰۹ شروع شود" /></div>
        <div class="field full"><label class="label" for="ct-topic">موضوع</label><select class="select" id="ct-topic"><option>مشاوره انتخاب دوره</option><option>پشتیبانی فنی</option><option>مالی و پرداخت</option><option>همکاری و تدریس</option><option>خرید سازمانی</option></select></div>
        <div class="field full"><label class="label" for="ct-msg">پیام</label><textarea class="textarea" id="ct-msg" required minlength="10"></textarea></div>
      </div>
      <button class="btn btn--primary btn--lg" type="submit" style="justify-self:start">${icon('send-horizontal', 'icon-flip')} ارسال پیام</button>
    </form>
  </div>
</section>`;
