import { html, icon } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';
import { hours } from '../data.mjs';
import { girih } from '../art.mjs';

export const meta = { title: 'تماس و مسیریابی', layout: 'main', active: 'contact', description: 'آدرس، تلفن، ساعات کاری و راه‌های دسترسی به رستوران زعفران' };

export default (ctx) => html`
${pageHero(ctx, { title: 'تماس و مسیریابی', callig: 'چشم به راه شماییم', crumbs: ['تماس'] })}
<section class="section section--tight">
  <div class="container contact">
    <div class="contact__map arch arch--tile" role="img" aria-label="نقشه موقعیت رستوران" style="background-image:${girih('#e9c46a', 0.2)}">
      <span class="contact__pin">${icon('map-pin')}</span>
      <p class="contact__addr">تهران، الهیه، خیابان فرشته، کوچه نیلوفر، پلاک ۹</p>
    </div>
    <div class="stack" style="--gap:1.25rem">
      <div class="card stack" style="--gap:.9rem">
        ${[
          ['phone', 'رزرو و اطلاعات', '۰۲۱-۲۲۶۶۳۳۴۴'],
          ['smartphone', 'واتس‌اپ و تلگرام', '۰۹۱۲ ۲۲۶ ۳۳۴۴'],
          ['mail', 'ایمیل', 'hello@zaferan.ir'],
          ['car', 'پارکینگ', 'پارکینگ رایگان با خدمات ولت'],
          ['train-front', 'مترو', 'ایستگاه تجریش، ۱۰ دقیقه پیاده'],
        ].map(([i, t, v]) => html`<div class="row"><span class="gold">${icon(i)}</span><div><span class="xs muted" style="display:block">${t}</span><b class="${i === 'mail' ? 'ltr' : ''}">${v}</b></div></div>`)}
      </div>
      <div class="card"><h2 class="h-sm">ساعات کاری</h2><ul class="list-plain hours">${hours.map(([d, h]) => html`<li><span>${d}</span><b class="gold">${h}</b></li>`)}</ul></div>
    </div>
    <form class="card stack contact__form" style="--gap:1rem" data-validate data-success="پیام شما رسید؛ ممنون که با ما در میان گذاشتید">
      <h2 class="h-sm">نظر یا پیشنهاد</h2>
      <div class="form-grid">
        <div class="field"><label class="label" for="c-n">نام</label><input class="input" id="c-n" required /></div>
        <div class="field"><label class="label" for="c-p">موبایل</label><input class="input" id="c-p" type="tel" pattern="09[0-9]{9}" data-msg="شماره موبایل ۱۱ رقمی و با ۰۹ شروع شود" /></div>
        <div class="field full"><label class="label" for="c-m">پیام</label><textarea class="textarea" id="c-m" required minlength="10"></textarea></div>
      </div>
      <button class="btn btn--gold" type="submit" style="justify-self:start">ارسال ${icon('send-horizontal', 'icon-flip')}</button>
    </form>
  </div>
</section>`;
