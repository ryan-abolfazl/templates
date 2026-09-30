import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { card, art, stars } from '../partials.mjs';
import { products, COLORS, SIZES } from '../data.mjs';
import { garment } from '../garments.mjs';

export const meta = { title: 'بارانی بلند کتان', layout: 'main', active: 'shop', description: 'صفحه محصول با گالری، انتخاب رنگ و سایز، راهنمای سایز و نظرات' };

const p = products[0];
const hex = COLORS[p.color][1];

const views = [
  ['نمای جلو', garment(p.kind, hex)],
  ['نمای پشت', garment(p.kind, hex, { flip: true })],
  ['جزئیات', `<div class="zoom">${garment(p.kind, hex)}</div>`],
  ['در رنگ دیگر', garment(p.kind, COLORS.ink[1])],
];

export default (ctx) => html`
<section class="container product">
  <nav class="breadcrumb product__crumbs" aria-label="مسیر صفحه"><a href="${ctx.base}index.html">خانه</a>${icon('chevron-left')}<a href="${ctx.base}shop.html">زنانه</a>${icon('chevron-left')}<a href="${ctx.base}shop.html">بارانی و پالتو</a>${icon('chevron-left')}<span aria-current="page">${p.name}</span></nav>

  <div class="gallery" data-gallery>
    <div class="gallery__thumbs" role="group" aria-label="تصاویر محصول">
      ${views.map(
        ([label, svg], i) => html`<button type="button" class="gallery__thumb" data-thumb aria-current="${i === 0}" aria-label="${label}"><div class="art" style="--art-bg:${p.bg}">${svg}</div><template>${svg}</template></button>`
      )}
    </div>
    <div class="gallery__main art" style="--art-bg:${p.bg}" data-gallery-main>${views[0][1]}</div>
  </div>

  <div class="buybox">
    <div class="row-between wrap"><span class="badge badge--clay">${fa(20)}٪ تخفیف ویژه پاییز</span><a class="row xs" href="#reviews">${stars(p.rating)} <span class="muted">(${fa(p.reviews)} نظر)</span></a></div>
    <h1>${p.name}</h1>
    <p class="buybox__price"><del>${fa(p.old)}</del> <b>${fa(p.price)}</b> <small>تومان</small></p>
    <p class="muted small">یا ۴ قسط ${fa(Math.round(p.price / 4))} تومانی بدون کارمزد</p>

    <div class="buybox__opt">
      <div class="row-between small"><span>رنگ: <b data-color-name>${COLORS[p.color][0]}</b></span></div>
      <div class="swatch-pick" data-color-pick role="radiogroup" aria-label="رنگ">
        ${p.colors.map((c, i) => html`<label><input type="radio" name="color" value="${COLORS[c][0]}" data-hex="${COLORS[c][1]}" ${i === 0 ? 'checked' : ''} aria-label="${COLORS[c][0]}" /><span class="swatch" style="--c:${COLORS[c][1]}"></span></label>`)}
      </div>
    </div>

    <div class="buybox__opt">
      <div class="row-between small"><span>سایز: <b data-size-name>انتخاب کنید</b></span><button class="link xs" type="button" data-modal-open="size-guide">${icon('ruler')} راهنمای سایز</button></div>
      <div class="size-pick" data-size-pick role="radiogroup" aria-label="سایز">
        ${SIZES.map((s, i) => html`<label><input type="radio" name="size" value="${s}" ${i === 4 ? 'disabled' : ''} /><span>${s}</span></label>`)}
      </div>
      <p class="xs clay row" style="gap:.35rem">${icon('flame')} سایز M: فقط ۲ عدد باقی مانده</p>
    </div>

    <div class="buybox__actions">
      <div class="qty" data-qty><button type="button" data-qty-inc aria-label="افزایش">${icon('plus')}</button><input value="۱" min="1" max="5" aria-label="تعداد" inputmode="numeric" /><button type="button" data-qty-dec aria-label="کاهش">${icon('minus')}</button></div>
      <button class="btn btn--solid btn--lg" type="button" data-require-size data-add-to-cart="بارانی به سبد خرید اضافه شد" style="flex:1">${icon('shopping-bag')} افزودن به سبد</button>
      <button class="btn btn--lg" type="button" data-wishlist aria-pressed="false" aria-label="افزودن به علاقه‌مندی‌ها" style="padding-inline:1rem">${icon('heart')}</button>
    </div>

    <ul class="list-plain perks">
      <li>${icon('truck')} ارسال رایگان · تحویل تهران ۱ روز کاری، شهرستان ۲ تا ۴ روز</li>
      <li>${icon('repeat-2')} ۷ روز مهلت تعویض و مرجوعی رایگان</li>
      <li>${icon('scissors')} دوخته‌شده در کارگاه خانم رحیمی، تبریز</li>
    </ul>

    <div class="accordion">
      <details open><summary>توضیحات${icon('plus')}</summary><div class="accordion__body">بارانی بلند با برش کلاسیک دوبل، از کتان ضخیم ضدآب با آستر نخی. کمربند جداشدنی، سردست قابل تنظیم و جیب‌های عمیق. قد بلند تا زیر زانو، مناسب پاییز و بهار.</div></details>
      <details><summary>جنس و نگهداری${icon('plus')}</summary><div class="accordion__body">رویه: ۱۰۰٪ کتان ارگانیک · آستر: ۱۰۰٪ نخ<br />شستشو با آب سرد و دست، بدون سفیدکننده. در سایه خشک شود. اتو با دمای متوسط.</div></details>
      <details><summary>سایز و فرم${icon('plus')}</summary><div class="accordion__body">فرم آزاد (Relaxed). مدل ۱۷۵ سانتی‌متر است و سایز S پوشیده. اگر بین دو سایز هستید، سایز کوچک‌تر را انتخاب کنید.</div></details>
      <details><summary>ارسال و مرجوعی${icon('plus')}</summary><div class="accordion__body">ارسال با پیک در تهران و پست پیشتاز در سایر شهرها. تا ۷ روز پس از تحویل، بدون پرداخت هزینه تعویض یا مرجوع کنید.</div></details>
    </div>
  </div>
</section>

<section class="section section--bone" id="reviews">
  <div class="container reviews">
    <div class="reviews__summary">
      <span class="kicker">نظرات خریداران</span>
      <p class="reviews__score">${fa(p.rating).replace('.', '٫')}</p>
      ${stars(p.rating)}
      <p class="small muted">بر اساس ${fa(p.reviews)} نظر · ${fa(94)}٪ خریداران این محصول را پیشنهاد می‌کنند</p>
      <dl class="fit"><dt>فرم لباس</dt><dd><span class="fit__bar"><i style="inset-inline-start:58%"></i></span><span class="row-between xs muted"><span>کوچک</span><span>دقیق</span><span>بزرگ</span></span></dd></dl>
      <button class="btn mt-2" type="button" data-toast="برای ثبت نظر ابتدا وارد حساب شوید" data-toast-type="info">نوشتن نظر</button>
    </div>
    <div class="reviews__list">
      ${[
        ['نسترن ا.', 5, 'تهران', 'M', 'کیفیت پارچه فوق‌العاده است؛ ضخیم و خوش‌دوخت. رنگ شتری دقیقاً مثل عکس بود. برای قد ۱۶۸ اندازه عالی است.'],
        ['مهتاب ر.', 5, 'اصفهان', 'S', 'بسته‌بندی خیلی شیک بود و یک کارت دست‌نویس از خیاط داخلش بود! بارانی گرم و سبک است.'],
        ['لیلا ک.', 4, 'شیراز', 'L', 'فرمش کمی آزادتر از انتظارم بود، ولی با کمربند خیلی قشنگ می‌ایستد. ارسال سریع بود.'],
      ].map(
        ([n, s, city, size, t]) => html`<article class="review"><div class="row-between">${stars(s)}<span class="xs muted">۳ روز پیش</span></div><p>${t}</p><p class="xs muted"><b style="color:var(--text)">${n}</b> · ${city} · خرید سایز <span class="ltr">${size}</span> · ${icon('badge-check')} خریدار</p></article>`
      )}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><div><span class="kicker">تکمیل استایل</span><h2>با این‌ها بپوشید</h2></div></div>
    <div class="product-grid">${[products[4], products[5], products[7], products[11]].map((x) => card(ctx, x))}</div>
  </div>
</section>

<dialog class="modal" id="size-guide" aria-labelledby="sg-title">
  <div class="modal__head"><h2 id="sg-title" style="font-size:var(--text-lg)">راهنمای سایز</h2><button class="icon-btn" type="button" data-modal-close aria-label="بستن">${icon('x')}</button></div>
  <div class="modal__body">
    <p class="small muted mb-2">اندازه‌ها بر حسب سانتی‌متر هستند.</p>
    <div style="overflow-x:auto" data-overflow-ok>
      <table class="size-table">
        <thead><tr><th scope="col">سایز</th><th scope="col">دور سینه</th><th scope="col">دور کمر</th><th scope="col">قد لباس</th><th scope="col">طول آستین</th></tr></thead>
        <tbody>${SIZES.map((s, i) => html`<tr><th scope="row" class="ltr">${s}</th><td>${fa(84 + i * 6)}</td><td>${fa(66 + i * 6)}</td><td>${fa(108 + i * 2)}</td><td>${fa(58 + i)}</td></tr>`)}</tbody>
      </table>
    </div>
  </div>
</dialog>`;
