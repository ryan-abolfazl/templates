import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHead, avatar } from '../partials.mjs';

export const meta = { title: 'پیام‌ها', layout: 'app', active: 'chat', description: 'گفتگو با مشتریان و اعضای تیم' };

const people = [
  { name: 'مریم احمدی', last: 'سفارشم کی ارسال می‌شه؟ کد پیگیری ندارم…', time: '۱۰:۴۲', unread: 2, online: true },
  { name: 'تیم انبار', last: 'رضا: موجودی پاوربانک‌ها شارژ شد 👍', time: '۱۰:۱۵', unread: 1 },
  { name: 'علی رضایی', last: 'ممنون، هدفون عالیه', time: '۰۹:۳۰', online: true },
  { name: 'نگار صادقی', last: 'فاکتور رسمی برای شرکت می‌خواستم', time: 'دیروز' },
  { name: 'پشتیبانی درگاه', last: 'تسویه امروز ساعت ۱۴ انجام می‌شود', time: 'دیروز' },
  { name: 'زهرا حسینی', last: 'امکان تعویض رنگ هست؟', time: 'دوشنبه' },
  { name: 'پویا عباسی', last: 'ارسال به کرمان چند روز طول می‌کشه؟', time: 'یکشنبه' },
];

export default (ctx) => html`
${pageHead(ctx, { title: 'پیام‌ها', crumbs: [{ label: 'برنامه‌ها' }, { label: 'پیام‌ها' }] })}

<section class="card chat">
  <div class="chat__list">
    <div class="chat__search"><div class="input-icon">${icon('search')}<input class="input input--sm" type="search" placeholder="جستجوی گفتگو" aria-label="جستجوی گفتگو" /></div></div>
    <div class="chat__people">
      ${people.map(
        (p, i) => html`<button type="button" class="chat__person ${i === 0 ? 'is-active' : ''}" data-chat-open>
          ${avatar(p.name, '', p.online ? '<span class="status"></span>' : '')}
          <div><span class="person__name">${p.name}</span><p>${p.last}</p></div>
          <div class="stack" style="--gap:.3rem;justify-items:end"><time>${p.time}</time>${p.unread ? html`<span class="badge badge--count badge--solid t-primary">${fa(p.unread)}</span>` : ''}</div>
        </button>`
      )}
    </div>
  </div>

  <div class="chat__main">
    <div class="chat__top">
      <button class="icon-btn chat__back" type="button" data-chat-back aria-label="بازگشت به فهرست">${icon('arrow-right')}</button>
      ${avatar('مریم احمدی', 'sm', '<span class="status"></span>')}
      <div><span class="person__name">مریم احمدی</span><span class="person__meta text-success">آنلاین</span></div>
      <div class="row">
        <button class="icon-btn" type="button" aria-label="تماس صوتی">${icon('phone')}</button>
        <button class="icon-btn" type="button" aria-label="تماس تصویری">${icon('video')}</button>
        <a class="icon-btn" href="${ctx.base}profile.html" aria-label="اطلاعات مشتری">${icon('info')}</a>
      </div>
    </div>
    <div class="chat__thread" data-chat-thread aria-live="polite">
      <span class="chat__day">امروز</span>
      <div class="msg"><div class="msg__bubble">سلام وقت بخیر 🌸 من سه روز پیش هدفون نوا سفارش دادم (سفارش #۴۸۱۶). هنوز کد رهگیری برام نیومده.</div><time>۱۰:۳۸</time></div>
      <div class="msg"><div class="msg__bubble">سفارشم کی ارسال می‌شه؟ کد پیگیری ندارم…</div><time>۱۰:۴۲</time></div>
      <div class="msg msg--me"><div class="msg__bubble">سلام مریم جان، روزتون بخیر! الان بررسی کردم؛ سفارش شما امروز صبح بسته‌بندی شد و تا ساعت ۱۴ تحویل پست می‌شه.</div><time>۱۰:۴۵</time></div>
      <div class="msg msg--me"><div class="msg__bubble msg__file"><span class="thumb t-primary" style="background:rgb(255 255 255 / .18);color:#fff">${icon('file-text')}</span><span>فاکتور سفارش ۴۸۱۶ (PDF)<br /><small style="opacity:.75">۲۴۸ کیلوبایت</small></span></div><time>۱۰:۴۶</time></div>
      <div class="msg"><div class="msg__bubble">عالیه، خیلی ممنون از پیگیریتون 🙏</div><time>۱۰:۴۷</time></div>
      <div class="typing" data-typing hidden aria-label="در حال نوشتن"><i></i><i></i><i></i></div>
    </div>
    <form class="chat__compose" data-chat-form>
      <button class="icon-btn" type="button" aria-label="پیوست فایل">${icon('paperclip')}</button>
      <button class="icon-btn hide-sm" type="button" aria-label="ایموجی">${icon('smile')}</button>
      <input class="input" placeholder="پیام خود را بنویسید…" aria-label="متن پیام" />
      <button class="btn btn--primary btn--icon" type="submit" aria-label="ارسال">${icon('send-horizontal', 'icon-flip')}</button>
    </form>
  </div>
</section>`;
