import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { TAG_CLASS } from '../partials.mjs';
import { dish, girih, ornament } from '../art.mjs';
import { menu, hours } from '../data.mjs';

export const meta = { title: 'رستوران ایرانی', layout: 'main', active: 'home', description: 'رستوران زعفران؛ غذاهای اصیل ایرانی، کباب زغالی، خورش‌های خانگی و موسیقی زنده سنتی در تهران' };

export const menuItem = (m) => html`<article class="menu-item" data-filter-item data-tags="${m.cat}">
  <div class="menu-item__img">${dish(m.dish)}</div>
  <div>
    <div class="menu-item__top"><h3>${m.name}</h3><span class="menu-item__dots" aria-hidden="true"></span><span class="menu-item__price">${fa(m.price / 1000)} <small>هزار تومان</small></span></div>
    <p>${m.desc}</p>
    ${m.tags.length ? html`<div class="row wrap mt-1" style="gap:.35rem">${m.tags.map((t) => html`<span class="tag ${TAG_CLASS[t] || ''}">${t}</span>`)}</div>` : ''}
  </div>
</article>`;

const quotes = [
  ['ماندانا فرهمند', 'بهترین فسنجانی که بعد از دستپخت مادربزرگم خورده‌ام. فضای رستوران آدم را به خانه‌های قدیمی شیراز می‌برد.'],
  ['کامران اسدی', 'کوبیده‌ها واقعاً زغالی و آبدار بودند. موسیقی زنده پنجشنبه‌شب‌ها تجربه‌ای فراموش‌نشدنی است.'],
  ['Emma L. · گردشگر', 'An unforgettable Persian dinner. The saffron rice and the tea ceremony were magical.'],
  ['نرگس طاهری', 'جشن تولد مادرم را در سالن خصوصی گرفتیم؛ پذیرایی بی‌نقص و بسیار محترمانه بود.'],
];

export default (ctx) => html`
<section class="hero">
  <div class="pattern" style="background-image:${girih()}"></div>
  <div class="container hero__grid">
    <div class="hero__copy" data-reveal-stagger>
      <p class="callig" data-reveal>به سفره ما خوش آمدید</p>
      <h1 data-reveal>طعم اصیل ایران<br /><span class="gold">زیر آسمان تهران</span></h1>
      <p class="hero__lead" data-reveal>کباب زغالی، خورش‌هایی که شش ساعت آرام پخته می‌شوند و چای سماوری؛ با همان دستورهایی که از سال ۱۳۶۸ در آشپزخانه ما دست‌به‌دست شده است.</p>
      <div class="row wrap" data-reveal><a class="btn btn--gold btn--lg" href="${ctx.base}reservation.html">${icon('calendar-heart')} رزرو میز</a><a class="btn btn--lg" href="${ctx.base}menu.html">${icon('book-open')} مشاهده منو</a></div>
      <ul class="hero__info list-plain" data-reveal>
        <li>${icon('clock')}<span>هر روز ${hours[0][1]}</span></li>
        <li>${icon('music')}<span>موسیقی زنده، پنجشنبه و جمعه شب</span></li>
      </ul>
    </div>
    <div class="hero__visual" aria-hidden="true">
      <div class="arch arch--tile hero__arch" style="background-image:${girih('#e9c46a', 0.22)}"><div class="hero__plate">${dish('koobideh')}</div></div>
      <div class="arch hero__mini hero__mini--a"><div class="dish-stage">${dish('ghormeh')}</div></div>
      <div class="arch hero__mini hero__mini--b"><div class="dish-stage">${dish('chai')}</div></div>
      <div class="medallion hero__medal"><span><b>${fa(36)}</b>سال طعم<br />اصیل</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container story">
    <div class="story__art" aria-hidden="true">
      <div class="arch story__arch"><div class="dish-stage">${dish('fesenjan')}</div></div>
      <div class="arch arch--tile story__tile" style="background-image:${girih('#e9c46a', 0.25)}"></div>
    </div>
    <div class="stack" style="--gap:1.25rem" data-reveal>
      <p class="callig" style="font-size:var(--text-xl)">داستان زعفران</p>
      <h2 class="h-lg">از یک آشپزخانه کوچک<br />در بازار تجریش</h2>
      ${ornament()}
      <p class="muted">حاج رضا رستگار در سال ۱۳۶۸ با یک منقل و یک دیگ مسی، اولین چلوکبابی زعفران را در بازار تجریش باز کرد. امروز نوه‌اش، سرآشپز سارا رستگار، همان دستورها را با مواد اولیه تازه از مزارع ایران و احترام به سنت‌ها ادامه می‌دهد.</p>
      <div class="story__sign"><span class="callig">سارا رستگار</span><span class="xs muted">سرآشپز و مدیر رستوران</span></div>
      <a class="link" href="${ctx.base}about.html" style="justify-self:start">داستان کامل ${icon('arrow-left')}</a>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="pattern" style="background-image:${girih()}"></div>
  <div class="container">
    <div class="section-head"><p class="callig">پیشنهاد سرآشپز</p><h2>غذاهای امضای زعفران</h2>${ornament()}</div>
    <div class="signature" data-reveal-stagger>
      ${[menu[0], menu[4], menu[6]].map(
        (m) => html`<article class="sig" data-reveal>
          <div class="arch"><div class="dish-stage">${dish(m.dish)}</div></div>
          <h3>${m.name}</h3>
          <p class="small muted">${m.desc}</p>
          <p class="menu-item__price">${fa(m.price / 1000)} <small>هزار تومان</small></p>
        </article>`
      )}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><p class="callig">از منوی ما</p><h2>سفره امروز</h2>${ornament()}</div>
    <div class="menu-cols">${menu.slice(0, 8).map(menuItem)}</div>
    <div class="center mt-4"><a class="btn btn--lg" href="${ctx.base}menu.html">${icon('book-open')} منوی کامل</a></div>
  </div>
</section>

<section class="experience">
  <div class="pattern" style="background-image:${girih('#e9c46a', 0.14)}"></div>
  <div class="container experience__grid">
    ${[
      ['music', 'شب‌های موسیقی سنتی', 'سه‌تار و تنبک زنده، پنجشنبه‌ها و جمعه‌ها از ساعت ۲۰'],
      ['door-open', 'سالن‌های خصوصی', 'اتاق‌های شاه‌نشین برای ۱۰ تا ۶۰ مهمان، با منوی اختصاصی'],
      ['truck', 'کترینگ مراسم', 'پذیرایی ایرانی برای عقد، تولد و همایش‌ها در سراسر تهران'],
    ].map(([i, t, d]) => html`<div class="exp" data-reveal><span class="exp__icon">${icon(i)}</span><h3>${t}</h3><p>${d}</p></div>`)}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><p class="callig">مهمانان ما</p><h2>از زبان مهمان‌ها</h2>${ornament()}</div>
    <div data-carousel data-autoplay="6000">
      <div class="quotes" data-carousel-track data-overflow-ok>
        ${quotes.map(([n, t]) => html`<figure class="quote card"><span class="quote__mark" aria-hidden="true">❝</span><blockquote>${t}</blockquote><figcaption class="gold bold small">${n}</figcaption></figure>`)}
      </div>
      <div class="row mt-3" style="justify-content:center"><button class="icon-btn" type="button" data-carousel-prev aria-label="قبلی">${icon('chevron-right')}</button><div class="carousel__dots" data-carousel-dots></div><button class="icon-btn" type="button" data-carousel-next aria-label="بعدی">${icon('chevron-left')}</button></div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="reserve-band">
      <div class="pattern" style="background-image:${girih('#e9c46a', 0.12)}"></div>
      <div class="stack" style="--gap:.75rem">
        <p class="callig" style="font-size:var(--text-lg)">میز شما آماده است</p>
        <h2 class="h-md">رزرو آنلاین میز</h2>
        <p class="small" style="color:#c2ad98">برای شب‌های موسیقی، رزرو از چند روز قبل توصیه می‌شود.</p>
      </div>
      <form class="reserve-quick" action="${ctx.base}reservation.html">
        <div class="field"><label class="label" for="rq-d">تاریخ</label><div class="input-icon">${icon('calendar')}<input class="input" id="rq-d" data-datepicker readonly placeholder="انتخاب روز" /></div></div>
        <div class="field"><label class="label" for="rq-t">ساعت</label><select class="select" id="rq-t">${['۱۳:۰۰', '۱۴:۰۰', '۲۰:۰۰', '۲۱:۰۰', '۲۲:۰۰'].map((t) => html`<option>${t}</option>`)}</select></div>
        <div class="field"><label class="label" for="rq-g">نفرات</label><select class="select" id="rq-g">${[2, 3, 4, 5, 6, 8, 10].map((n) => html`<option>${fa(n)} نفر</option>`)}</select></div>
        <button class="btn btn--gold btn--lg" type="submit">ادامه ${icon('arrow-left')}</button>
      </form>
    </div>
  </div>
</section>`;
