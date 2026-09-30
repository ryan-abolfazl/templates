import { html, icon } from '../../../tools/lib/html.mjs';
import { pageHead } from '../partials.mjs';

export const meta = { title: 'افزودن محصول', layout: 'app', active: 'product-form', description: 'فرم کامل افزودن محصول با تصاویر، قیمت و موجودی' };

export default (ctx) => html`
${pageHead(ctx, {
  title: 'افزودن محصول جدید',
  sub: 'اطلاعات محصول را کامل کنید تا در فروشگاه نمایش داده شود',
  crumbs: [{ label: 'محصولات', href: 'products.html' }, { label: 'افزودن محصول' }],
})}

<form class="grid" data-validate data-success="محصول با موفقیت ذخیره شد" data-redirect="products.html">
  <div class="stack lg-8">
    <section class="card">
      <div class="card__head"><h2 class="card__title">اطلاعات پایه</h2></div>
      <div class="form-grid">
        <div class="field full"><label class="label" for="p-name">نام محصول <span class="req">*</span></label><input class="input" id="p-name" required minlength="3" placeholder="مثلاً هدفون بی‌سیم نوا" /></div>
        <div class="field"><label class="label" for="p-sku">کد محصول (SKU)</label><input class="input ltr" id="p-sku" placeholder="NV-210" /></div>
        <div class="field">
          <label class="label" for="p-cat">دسته‌بندی <span class="req">*</span></label>
          <select class="select" id="p-cat" required><option value="">انتخاب کنید</option><option>صوتی</option><option>پوشیدنی</option><option>کامپیوتر</option><option>موبایل</option><option>لوازم جانبی</option></select>
        </div>
        <div class="field full">
          <label class="label" for="p-desc">توضیحات</label>
          <textarea class="textarea" id="p-desc" rows="5" placeholder="ویژگی‌ها، مشخصات فنی و مزایای محصول را بنویسید…"></textarea>
          <span class="field__hint">حداقل ۱۵۰ کلمه برای سئوی بهتر پیشنهاد می‌شود.</span>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card__head"><div><h2 class="card__title">تصاویر محصول</h2><p class="card__sub">حداکثر ۸ تصویر، فرمت JPG یا PNG یا WebP</p></div></div>
      <div class="dropzone" data-dropzone="#p-thumbs" tabindex="0" role="button" aria-label="انتخاب یا رها کردن تصاویر">
        ${icon('image-up')}
        <strong>تصاویر را اینجا رها کنید</strong>
        <span>یا برای انتخاب از رایانه کلیک کنید</span>
        <input type="file" accept="image/*" multiple />
      </div>
      <ul class="list-plain thumbs mt-2" id="p-thumbs"></ul>
    </section>

    <section class="card">
      <div class="card__head"><h2 class="card__title">قیمت و موجودی</h2></div>
      <div class="form-grid">
        <div class="field"><label class="label" for="p-price">قیمت <span class="req">*</span></label><div class="input-group"><input class="input" id="p-price" inputmode="numeric" required placeholder="۰" /><span class="input-group__addon">تومان</span></div></div>
        <div class="field"><label class="label" for="p-sale">قیمت با تخفیف</label><div class="input-group"><input class="input" id="p-sale" inputmode="numeric" placeholder="۰" /><span class="input-group__addon">تومان</span></div></div>
        <div class="field"><label class="label" for="p-stock">موجودی انبار</label><input class="input" id="p-stock" type="number" min="0" value="10" /></div>
        <div class="field"><label class="label" for="p-sale-end">پایان تخفیف</label><div class="input-icon">${icon('calendar')}<input class="input" id="p-sale-end" data-datepicker readonly placeholder="انتخاب تاریخ" /></div></div>
        <div class="full"><label class="switch"><input type="checkbox" checked /> مدیریت خودکار موجودی و اطلاع‌رسانی هنگام کمبود</label></div>
      </div>
    </section>

    <section class="card">
      <div class="card__head"><h2 class="card__title">ویژگی‌ها و تنوع</h2></div>
      <div class="field">
        <span class="label">رنگ‌ها</span>
        <div class="row wrap">
          ${[['مشکی', '#111827'], ['سفید', '#f3f4f6'], ['سرمه‌ای', '#1e3a8a'], ['رزگلد', '#e8b4a0']].map(
            ([n, c], i) => html`<label class="check"><input type="checkbox" ${i < 2 ? 'checked' : ''} /><span class="row" style="gap:.4rem"><i style="inline-size:1rem;block-size:1rem;border-radius:50%;background:${c};box-shadow:inset 0 0 0 1px rgb(0 0 0 / .15)"></i>${n}</span></label>`
          )}
        </div>
      </div>
      <div class="field mt-2">
        <label class="label" for="p-tags">برچسب‌ها</label>
        <div class="tag-input">
          ${['بلوتوث ۵٫۳', 'نویزگیر', 'گارانتی ۱۸ ماهه'].map((t) => html`<span class="badge t-primary">${t}<button type="button" aria-label="حذف ${t}">${icon('x')}</button></span>`)}
          <input id="p-tags" placeholder="برچسب جدید + Enter" />
        </div>
      </div>
    </section>
  </div>

  <aside class="stack lg-4">
    <div class="stack sticky-side">
      <section class="card">
        <div class="card__head"><h2 class="card__title">انتشار</h2></div>
        <div class="field"><label class="label" for="p-status">وضعیت</label><select class="select" id="p-status"><option>منتشرشده</option><option>پیش‌نویس</option><option>زمان‌بندی‌شده</option></select></div>
        <div class="field mt-2"><label class="label" for="p-vis">نمایش</label><select class="select" id="p-vis"><option>عمومی</option><option>فقط با لینک</option><option>خصوصی</option></select></div>
        <hr class="divider" />
        <div class="stack" style="--gap:.6rem">
          <label class="switch"><input type="checkbox" checked /> نمایش در صفحه اصلی</label>
          <label class="switch"><input type="checkbox" /> محصول ویژه</label>
          <label class="switch"><input type="checkbox" checked /> امکان ثبت نظر</label>
        </div>
        <div class="row mt-3">
          <button class="btn" type="button" data-toast="پیش‌نویس ذخیره شد" data-toast-type="info">ذخیره پیش‌نویس</button>
          <button class="btn btn--primary" type="submit" style="flex:1">${icon('check')} انتشار محصول</button>
        </div>
      </section>
      <section class="card">
        <div class="card__head"><h2 class="card__title">ارسال</h2></div>
        <div class="form-grid">
          <div class="field"><label class="label" for="p-w">وزن (گرم)</label><input class="input" id="p-w" type="number" min="0" value="250" /></div>
          <div class="field"><label class="label" for="p-days">زمان آماده‌سازی</label><select class="select" id="p-days"><option>۱ روز کاری</option><option>۲ روز کاری</option><option>۳ روز کاری</option></select></div>
        </div>
      </section>
      <div class="alert t-warning">${icon('lightbulb')}<div><strong>نکته</strong>محصولات دارای ۴ تصویر یا بیشتر تا ۳۰٪ فروش بیشتری دارند.</div></div>
    </div>
  </aside>
</form>`;
