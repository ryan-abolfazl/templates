import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { card, art } from '../partials.mjs';
import { products, CATS, journal } from '../data.mjs';
import { garment } from '../garments.mjs';

export const meta = { title: 'پوشاک معاصر ایرانی', layout: 'main', active: 'home', description: 'فروشگاه آنلاین پوشاک ویترین؛ کالکشن پاییز ۱۴۰۵ با پارچه‌های طبیعی' };

export default (ctx) => html`
<section class="hero">
  <div class="container hero__grid">
    <div class="hero__text">
      <span class="kicker"><span class="num">۰۷</span> کالکشن پاییز ۱۴۰۵</span>
      <h1 class="hero__title"><span>پاییز،</span> <span>آرام و</span> <span class="clay">بی‌تکلف.</span></h1>
      <p class="hero__lead">لباس‌هایی از کتان، لینن و پشم طبیعی که برای سال‌ها پوشیدن ساخته شده‌اند، نه برای یک فصل. دوخته‌شده در کارگاه‌های کوچک تهران و تبریز.</p>
      <div class="row wrap"><a class="btn btn--solid btn--lg" href="${ctx.base}shop.html">خرید کالکشن ${icon('arrow-left')}</a><a class="link" href="${ctx.base}lookbook.html">تماشای لوک‌بوک ${icon('arrow-left')}</a></div>
      <ol class="hero__index list-plain">
        ${Object.entries(CATS).map(([k, v], i) => html`<li><a href="${ctx.base}shop.html"><span>${fa('0' + (i + 1))}</span>${v}<small>${fa(products.filter((p) => p.cat === k).length * 12)} محصول</small></a></li>`)}
      </ol>
    </div>
    <div class="hero__visual">
      <figure class="hero__main" style="--art-bg:#d9c3a5">
        ${art(products[0], { cls: 'hero__art' })}
        <figcaption><span>بارانی بلند کتان</span><span>${fa(products[0].price)} تومان</span></figcaption>
      </figure>
      <figure class="hero__side">${art(products[4])}<figcaption>بافت پشمی · کرم</figcaption></figure>
      <span class="hero__stamp" aria-hidden="true"><svg class="hero__ring" viewBox="0 0 120 120"><defs><path id="c" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0"/></defs><text text-anchor="middle"><textPath href="#c" startOffset="50%">ساخت ایران · پارچه طبیعی · دوخت دست · ساخت ایران ·</textPath></text></svg>${icon('leaf')}</span>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container cats">
    ${[
      ['women', 'زنانه', products[2]],
      ['men', 'مردانه', products[1]],
      ['accessories', 'اکسسوری', products[5]],
    ].map(
      ([k, label, p], i) => html`<a class="cat" href="${ctx.base}shop.html" data-reveal>
        ${art(p)}
        <span class="cat__label"><span class="xs">${fa('0' + (i + 1))}</span><b>${label}</b>${icon('arrow-up-left')}</span>
      </a>`
    )}
  </div>
</section>

<section class="section" data-filter>
  <div class="container">
    <div class="section-head">
      <div><span class="kicker">تازه رسیده‌ها</span><h2>جدیدترین‌های ویترین</h2></div>
      <div class="chips" role="group" aria-label="فیلتر">
        <button type="button" class="chip" data-filter-btn="*" aria-pressed="true">همه</button>
        ${Object.entries(CATS).map(([k, v]) => html`<button type="button" class="chip" data-filter-btn="${k}" aria-pressed="false">${v}</button>`)}
      </div>
    </div>
    <div class="product-grid">${products.slice(0, 8).map((p) => card(ctx, p))}</div>
    <div class="center mt-4"><a class="btn btn--lg" href="${ctx.base}shop.html">مشاهده همه محصولات</a></div>
  </div>
</section>

<section class="story section--bone">
  <div class="container story__grid">
    <div class="story__art" aria-hidden="true">
      <div class="story__a" style="--art-bg:#c9b394">${garment('coat', '#6b6a45')}</div>
      <div class="story__b" style="--art-bg:#e2d6c3">${garment('scarf', '#b5532f')}</div>
      <div class="story__c" style="--art-bg:#f0e9dd">${garment('bag', '#1f1d1b')}</div>
    </div>
    <div class="story__text" data-reveal>
      <span class="kicker">داستان ما</span>
      <h2>کمتر بخریم،<br />بهتر بپوشیم.</h2>
      <p>ویترین از یک کارگاه کوچک در خیابان منوچهری شروع شد، با یک ایده ساده: لباس خوب نباید گران یا یک‌بارمصرف باشد. امروز با ۱۴ کارگاه خانوادگی کار می‌کنیم و هر تکه را با نام خیاطش امضا می‌کنیم.</p>
      <dl class="story__stats">
        <div><dt>کارگاه همکار</dt><dd>${fa(14)}</dd></div>
        <div><dt>پارچه طبیعی</dt><dd>${fa(92)}٪</dd></div>
        <div><dt>مشتری راضی</dt><dd>${fa(38)}هزار</dd></div>
      </dl>
      <a class="link" href="${ctx.base}about.html">بیشتر بخوانید ${icon('arrow-left')}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div><span class="kicker">پرفروش‌ها</span><h2>محبوب‌ترین‌های این ماه</h2></div>
    </div>
    <div data-carousel class="rail">
      <div class="rail__track" data-carousel-track data-overflow-ok>${products.slice(4).concat(products.slice(0, 2)).map((p) => card(ctx, p))}</div>
      <div class="rail__nav"><button class="btn btn--sm" type="button" data-carousel-prev aria-label="قبلی">${icon('arrow-right')}</button><button class="btn btn--sm" type="button" data-carousel-next aria-label="بعدی">${icon('arrow-left')}</button></div>
    </div>
  </div>
</section>

<section class="values">
  <div class="container values__grid">
    ${[
      ['truck', 'ارسال رایگان', 'برای خریدهای بالای ۲ میلیون تومان'],
      ['repeat-2', 'تعویض ۷ روزه', 'بدون سؤال و با پیک رایگان'],
      ['shield-check', 'پرداخت امن', 'درگاه شتاب یا پرداخت در محل'],
      ['scissors', 'دوخت ایرانی', 'امضای خیاط روی هر محصول'],
    ].map(([i, t, d]) => html`<div class="value">${icon(i)}<div><b>${t}</b><span>${d}</span></div></div>`)}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><div><span class="kicker">ژورنال</span><h2>درباره پوشیدن، آگاهانه</h2></div><a class="link" href="${ctx.base}journal.html">همه مقالات ${icon('arrow-left')}</a></div>
    <div class="journal-grid">
      ${journal.map(
        (j, i) => html`<article class="jcard" data-reveal>
          <div class="art jcard__art" style="--art-bg:${j.bg}">${garment(j.kind, j.color === 'camel' ? '#b98a56' : j.color === 'bone' ? '#e9e1d3' : '#1f1d1b')}</div>
          <div class="row xs muted"><span>${j.cat}</span><span>·</span><span>${j.date}</span></div>
          <h3><a href="${ctx.base}journal.html">${j.title}</a></h3>
        </article>`
      )}
    </div>
  </div>
</section>

<section class="newsletter section--ink">
  <div class="container newsletter__grid">
    <h2>۱۰٪ تخفیف اولین خرید،<br />با عضویت در خبرنامه</h2>
    <form class="newsletter__form" data-validate data-success="کد تخفیف به ایمیل شما ارسال شد">
      <label class="sr-only" for="nl2">ایمیل</label>
      <input class="input input--line ltr" id="nl2" type="email" required placeholder="ایمیل شما" />
      <button class="btn btn--light" type="submit">دریافت کد ${icon('arrow-left')}</button>
      <p class="xs" style="grid-column:1/-1;color:#b7ada0">هر ماه فقط دو ایمیل. لغو عضویت با یک کلیک.</p>
    </form>
  </div>
</section>`;
