import { html, icon } from '../../../tools/lib/html.mjs';

export const meta = { title: 'صفحه پیدا نشد', layout: 'blank', description: 'خطای ۴۰۴' };

export default (ctx) => html`
<main id="main" class="error-page">
  <div>
    <p class="error-page__code" aria-hidden="true">۴۰۴</p>
    <h1>این صفحه در پیشخوان نیست!</h1>
    <p>ممکن است آدرس را اشتباه وارد کرده باشید یا صفحه جابه‌جا شده باشد. از جستجو یا پیوندهای زیر استفاده کنید.</p>
    <div class="row wrap">
      <a class="btn btn--primary btn--lg" href="${ctx.base}index.html">${icon('house')} بازگشت به داشبورد</a>
      <a class="btn btn--lg" href="${ctx.base}chat.html">${icon('life-buoy')} تماس با پشتیبانی</a>
    </div>
  </div>
</main>`;
