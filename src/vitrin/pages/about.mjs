import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { garment } from '../garments.mjs';

export const meta = { title: 'داستان ما', layout: 'main', description: 'درباره ویترین، کارگاه‌ها و ارزش‌های ما' };

export default (ctx) => html`
<section class="about-hero">
  <div class="container">
    <span class="kicker">داستان ما</span>
    <h1>لباس‌هایی که<br />داستان دارند.</h1>
  </div>
</section>
<section class="section">
  <div class="container about-grid">
    <div class="art" style="--art-bg:#d9c3a5;aspect-ratio:4/5">${garment('shirt', '#e9e1d3')}</div>
    <div class="stack" style="--gap:1.5rem">
      <p class="about-lead">ویترین در سال ۱۳۹۸ در یک کارگاه ۲۰ متری در خیابان منوچهری تهران متولد شد؛ با دو چرخ خیاطی، یک میز برش و یک باور: لباس خوب باید سال‌ها بماند.</p>
      <p class="muted">امروز با ۱۴ کارگاه خانوادگی در تهران، تبریز، مشهد و یزد همکاری می‌کنیم. هر محصول کارتی با نام خیاطش دارد، چون معتقدیم پشت هر لباس، دست‌های یک انسان است. پارچه‌هایمان را از تولیدکنندگان داخلی و تا جای ممکن از الیاف طبیعی انتخاب می‌کنیم.</p>
      <dl class="story__stats"><div><dt>سال فعالیت</dt><dd>${fa(7)}</dd></div><div><dt>کارگاه همکار</dt><dd>${fa(14)}</dd></div><div><dt>خیاط</dt><dd>${fa(63)}</dd></div></dl>
    </div>
  </div>
</section>
<section class="section section--bone">
  <div class="container">
    <div class="section-head"><div><span class="kicker">ارزش‌ها</span><h2>آنچه به آن پایبندیم</h2></div></div>
    <div class="principles">
      ${[
        ['leaf', 'پارچه طبیعی', '۹۲٪ محصولات از کتان، لینن، پشم و ابریشم ساخته می‌شوند.'],
        ['hand-heart', 'دستمزد منصفانه', 'دستمزد خیاطان ۳۰٪ بالاتر از میانگین بازار است.'],
        ['recycle', 'کمتر، بهتر', 'کالکشن‌های کوچک و تولید محدود؛ بدون انبار اضافه.'],
        ['badge-check', 'ضمانت دوخت', '۱ سال ضمانت دوخت و ترمیم رایگان برای همه محصولات.'],
      ].map(([i, t, d], n) => html`<div class="principle"><span class="xs clay">${fa('0' + (n + 1))}</span>${icon(i)}<h3>${t}</h3><p class="small muted">${d}</p></div>`)}
    </div>
  </div>
</section>`;
