import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { garment } from '../garments.mjs';
import { COLORS } from '../data.mjs';

export const meta = { title: 'لوک‌بوک پاییز ۱۴۰۵', layout: 'main', active: 'lookbook', description: 'لوک‌بوک ادیتوریال کالکشن پاییز ویترین' };

const looks = [
  { n: '۰۱', t: 'صبح در تبریز', d: 'بارانی شتری روی بافت کرم؛ گرمای لایه‌ها در سرمای صبح پاییز.', pieces: [['coat', 'camel'], ['sweater', 'cream']], bg: '#d9c3a5', cls: 'look--wide' },
  { n: '۰۲', t: 'بازار', d: 'پیراهن لینن و شلوار زیتونی؛ ساده، راحت، بی‌زمان.', pieces: [['shirt', 'bone'], ['pants', 'olive']], bg: '#c9c4ad' },
  { n: '۰۳', t: 'عصر در باغ', d: 'پیراهن میدی آجری با شال نخی گلبهی.', pieces: [['dress', 'clay'], ['scarf', 'rose']], bg: '#ecdccc' },
  { n: '۰۴', t: 'سفر', d: 'کاپشن جین، تی‌شرت مشکی و کتانی چرمی؛ همراه همیشگی.', pieces: [['jacket', 'denim'], ['tee', 'ink'], ['shoe', 'bone']], bg: '#d4d9d6', cls: 'look--wide' },
];

export default (ctx) => html`
<section class="lb-hero">
  <div class="container">
    <span class="kicker"><span class="num">۰۷</span> لوک‌بوک</span>
    <h1>کالکشن پاییز<br /><span class="clay">۱۴۰۵</span></h1>
    <p class="muted">چهار روایت از پاییز ایرانی؛ از صبح‌های سرد تبریز تا عصرهای طلایی باغ ارم.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="container looks">
    ${looks.map(
      (l) => html`<article class="look ${l.cls || ''}" data-reveal>
        <div class="look__art" style="--art-bg:${l.bg}">${l.pieces.map(([k, c]) => garment(k, COLORS[c][1]))}</div>
        <div class="look__text"><span class="look__num">${l.n}</span><div><h2>${l.t}</h2><p class="small muted">${l.d}</p><a class="link mt-1" href="${ctx.base}shop.html">خرید این استایل ${icon('arrow-left')}</a></div></div>
      </article>`
    )}
  </div>
</section>`;
