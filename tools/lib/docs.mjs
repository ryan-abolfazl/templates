// Persian documentation page generator shared by all templates.
// Usage in src/<slug>/pages/docs.mjs:
//   export const meta = { title: 'مستندات', layout: 'blank', out: 'documentation/index.html' };
//   export default (ctx) => docsPage(ctx, { intro, features, colors, fonts, extra });

import { html, fa } from './html.mjs';

const MODULE_DOCS = {
  theme: ['حالت تاریک', '<code>[data-theme-toggle]</code> روی هر دکمه‌ای، حالت روشن/تاریک را عوض می‌کند و انتخاب کاربر ذخیره می‌شود.'],
  nav: ['منو و کشوها', 'کشوی موبایل: <code>data-drawer-open="id"</code> و <code>data-drawer</code>؛ منوی کشویی: <code>data-dropdown</code>؛ هدر چسبان: <code>data-sticky-header</code>.'],
  tabs: ['تب‌ها', 'ساختار استاندارد <code>role="tablist/tab/tabpanel"</code> داخل <code>[data-tabs]</code> با پشتیبانی کامل صفحه‌کلید.'],
  accordion: ['آکاردئون', 'بر پایه <code>&lt;details&gt;</code>؛ با <code>data-accordion="single"</code> فقط یک مورد باز می‌ماند.'],
  modal: ['مودال', 'عنصر <code>&lt;dialog&gt;</code> با <code>data-modal-open="id"</code> باز و با <code>data-modal-close</code> بسته می‌شود.'],
  toast: ['اعلان', '<code>UI.toast("پیام", "success")</code> یا ویژگی <code>data-toast="پیام"</code> روی دکمه.'],
  reveal: ['انیمیشن اسکرول', '<code>data-reveal</code> روی هر عنصر؛ با <code>data-reveal-stagger</code> روی والد، فرزندان پشت‌سرهم ظاهر می‌شوند.'],
  counter: ['شمارنده', '<code>data-count-to="1200"</code> عدد را با ارقام فارسی می‌شمارد.'],
  carousel: ['اسلایدر', '<code>data-carousel</code> + <code>data-carousel-track</code> و دکمه‌های <code>data-carousel-prev/next</code>؛ لمسی و راست‌چین.'],
  lightbox: ['لایت‌باکس', 'لینک تصویر با <code>data-lightbox="گروه"</code> و <code>data-caption</code>.'],
  compare: ['مقایسه قبل/بعد', '<code>data-compare</code> با یک ورودی range.'],
  charts: ['نمودار', '<code>data-chart=\'{"type":"area","labels":[...],"series":[...]}\'</code>؛ انواع: area, line, bar, donut, sparkline. بدون کتابخانه خارجی.'],
  jalali: ['تقویم شمسی', 'ورودی با <code>data-datepicker</code> انتخابگر تاریخ جلالی می‌گیرد؛ تاریخ میلادی معادل در <code>data-gregorian</code> ذخیره می‌شود. API: <code>UI.jalali</code>.'],
  table: ['جدول داده', '<code>data-table</code> با جستجو (<code>data-table-search</code>)، فیلتر، مرتب‌سازی (<code>data-sort</code>)، انتخاب گروهی و صفحه‌بندی.'],
  filter: ['فیلتر شبکه', '<code>data-filter</code> با دکمه‌های <code>data-filter-btn</code> و آیتم‌های <code>data-filter-item data-tags</code>.'],
  form: ['اعتبارسنجی فرم', '<code>form[data-validate]</code> پیام‌های خطای فارسی نشان می‌دهد؛ <code>data-success</code> پیام موفقیت. نمایش رمز و ورودی کد یکبارمصرف هم دارد.'],
  commerce: ['فروشگاهی', 'انتخاب تعداد (<code>data-qty</code>)، بازه قیمت (<code>data-range</code>)، شمارش معکوس (<code>data-countdown</code>)، افزودن به سبد (<code>data-add-to-cart</code>).'],
};

export function docsPage(ctx, opt) {
  const { site, pages, base } = ctx;
  const sections = [
    ['intro', 'معرفی'],
    ['start', 'شروع سریع'],
    ['structure', 'ساختار فایل‌ها'],
    ['pages', 'فهرست صفحات'],
    ['colors', 'رنگ‌ها و ظاهر'],
    ['fonts', 'فونت‌ها'],
    ['js', 'کامپوننت‌های جاوااسکریپت'],
    ['icons', 'آیکن‌ها و تصاویر'],
    ['source', 'توسعه با سورس'],
    ['browsers', 'سازگاری'],
    ['credits', 'منابع و لایسنس'],
    ['changelog', 'تغییرات نسخه‌ها'],
    ['support', 'پشتیبانی'],
  ];
  const list = pages.filter((p) => !p.out.startsWith('documentation/'));
  return html`
<link rel="stylesheet" href="${base}assets/css/docs.css" />
<div class="docs">
  <nav class="docs__nav" aria-label="فهرست مستندات">
    <a href="${base}index.html"><b>← مشاهده قالب</b></a>
    ${sections.map(([id, t]) => html`<a href="#${id}">${t}</a>`)}
  </nav>
  <main id="main" class="docs__body">
    <section id="intro">
      <p class="docs__kicker">راهنمای استفاده · نسخه ${fa(site.version)}</p>
      <h1>مستندات قالب ${site.name}</h1>
      <p>${opt.intro}</p>
      <ul>${(opt.features || []).map((f) => html`<li>${f}</li>`)}</ul>
    </section>

    <section id="start">
      <h2>شروع سریع</h2>
      <ol>
        <li>فایل فشرده را از حالت فشرده خارج کنید.</li>
        <li>پوشه <code>html</code> شامل همه صفحات است. فایل <code>html/index.html</code> را در مرورگر باز کنید؛ قالب بدون نیاز به سرور و حتی آفلاین کار می‌کند.</li>
        <li>برای انتشار، محتوای پوشه <code>html</code> را در هاست خود (پوشه <code>public_html</code>) بارگذاری کنید.</li>
        <li>متن‌ها، تصاویر و رنگ‌ها را مطابق بخش‌های زیر شخصی‌سازی کنید.</li>
      </ol>
      <p>قالب هیچ درخواستی به سرورهای خارجی (CDN، گوگل فونت و…) ارسال نمی‌کند؛ بنابراین در ایران سریع و بدون مشکل بارگذاری می‌شود.</p>
    </section>

    <section id="structure">
      <h2>ساختار فایل‌ها</h2>
<pre>html/
├── *.html                 صفحات قالب
├── assets/
│   ├── css/
│   │   ├── fonts.css      تعریف فونت‌ها (@font-face)
│   │   ├── base.css       ریست و ابزارهای دسترس‌پذیری
│   │   ├── tokens.css     ← رنگ‌ها، فونت، فاصله‌ها (اینجا را ویرایش کنید)
│   │   ├── components.css دکمه، کارت، فرم، جدول و…
│   │   └── pages.css      استایل‌های اختصاصی صفحات
│   ├── js/
│   │   ├── icons.js       اسپرایت آیکن‌ها
│   │   ├── core.js        کامپوننت‌های مشترک (بدون وابستگی)
│   │   └── main.js        رفتارهای اختصاصی قالب
│   ├── fonts/             فونت‌های woff2
│   └── img/               تصاویر و طرح‌های SVG
└── licenses/              مجوز فونت‌ها و آیکن‌ها
documentation/             همین راهنما
source/                    سورس صفحات و ابزار ساخت (برای توسعه‌دهندگان)</pre>
    </section>

    <section id="pages">
      <h2>فهرست صفحات (${fa(list.length)} صفحه)</h2>
      <div class="table-wrap" data-overflow-ok>
        <table class="table docs__table">
          <thead><tr><th scope="col">صفحه</th><th scope="col">فایل</th><th scope="col">توضیح</th></tr></thead>
          <tbody>
            ${list.map((p) => html`<tr><td><a href="${base}${p.out}">${p.title}</a></td><td><code>${p.out}</code></td><td>${p.description}</td></tr>`)}
          </tbody>
        </table>
      </div>
    </section>

    <section id="colors">
      <h2>رنگ‌ها و ظاهر</h2>
      <p>همه تصمیم‌های طراحی به‌صورت متغیرهای CSS در فایل <code>assets/css/tokens.css</code> تعریف شده‌اند. کافی است مقدار متغیر را عوض کنید تا همه صفحات به‌روز شوند. مقادیر حالت تاریک زیر انتخابگر <code>[data-theme='dark']</code> قرار دارند.</p>
      <div class="docs__swatches">
        ${(opt.colors || []).map(([name, v, hex]) => html`<div class="docs__swatch"><i style="background:${hex}"></i><span><b>${name}</b><code>${v}</code><code>${hex}</code></span></div>`)}
      </div>
<pre>:root {
  --primary: ${opt.colors && opt.colors[0] ? opt.colors[0][2] : '#000'};   /* رنگ اصلی برند */
}</pre>
      <p>حالت پیش‌فرض (روشن یا تاریک) با ویژگی <code>data-theme</code> روی تگ <code>&lt;html&gt;</code> تعیین می‌شود و انتخاب کاربر در مرورگر ذخیره می‌شود.</p>
    </section>

    <section id="fonts">
      <h2>فونت‌ها</h2>
      <p>فونت‌های قالب رایگان و دارای مجوز آزاد SIL OFL هستند و استفاده تجاری از آن‌ها مجاز است:</p>
      <ul>${(opt.fonts || []).map(([f, use]) => html`<li><b>${f}</b>: ${use}</li>`)}</ul>
      <p>برای استفاده از فونت دیگر (مثلاً فونت تجاری که لایسنس آن را خریده‌اید)، فایل woff2 را در <code>assets/fonts</code> قرار دهید، در <code>fonts.css</code> یک <code>@font-face</code> بسازید و متغیر <code>--font-body</code> را در <code>tokens.css</code> تغییر دهید.</p>
    </section>

    <section id="js">
      <h2>کامپوننت‌های جاوااسکریپت</h2>
      <p>همه تعاملات با جاوااسکریپت خالص و بدون jQuery یا Bootstrap نوشته شده‌اند و از طریق ویژگی‌های <code>data-*</code> فعال می‌شوند؛ کافی است ساختار HTML را کپی کنید.</p>
      <div class="table-wrap" data-overflow-ok>
        <table class="table docs__table">
          <thead><tr><th scope="col">کامپوننت</th><th scope="col">نحوه استفاده</th></tr></thead>
          <tbody>
            ${site.core.filter((m) => MODULE_DOCS[m]).map((m) => html`<tr><td><b>${MODULE_DOCS[m][0]}</b></td><td>${MODULE_DOCS[m][1]}</td></tr>`)}
          </tbody>
        </table>
      </div>
      <p>توابع کمکی سراسری: <code>UI.fa(1250000)</code> ارقام فارسی با جداکننده، <code>UI.toman(n)</code> قیمت، <code>UI.jdate(date)</code> تاریخ شمسی.</p>
      ${opt.extra || ''}
    </section>

    <section id="icons">
      <h2>آیکن‌ها و تصاویر</h2>
      <p>آیکن‌ها از مجموعه آزاد <b>Lucide</b> هستند و به شکل اسپرایت SVG در <code>assets/js/icons.js</code> قرار دارند. نمونه استفاده:</p>
<pre>&lt;svg class="icon"&gt;&lt;use href="#i-heart"&gt;&lt;/use&gt;&lt;/svg&gt;</pre>
      <p>برای افزودن آیکن جدید از نسخه سورس استفاده کنید (بخش بعد) یا کد SVG آیکن را مستقیماً از سایت lucide.dev کپی کنید.</p>
      <p>${opt.images || 'تصاویر نمایشی قالب طرح‌های SVG اختصاصی هستند. برای جایگزینی، تصویر خود را به‌جای عناصر دارای کلاس <code>ph</code> یا فایل‌های پوشه <code>assets/img</code> قرار دهید.'}</p>
    </section>

    <section id="source">
      <h2>توسعه با سورس (اختیاری)</h2>
      <p>صفحات از ماژول‌های جاوااسکریپت در پوشه <code>source/src</code> ساخته می‌شوند تا هدر، منو و فوتر فقط یک‌بار نوشته شوند. اگر می‌خواهید تغییرات گسترده بدهید:</p>
<pre>cd source
npm i -g prettier          # یک‌بار
node tools/build.mjs ${site.slug}   # خروجی در templates/${site.slug}</pre>
      <p>برای ویرایش‌های ساده نیازی به این مرحله نیست؛ فایل‌های HTML پوشه <code>html</code> را مستقیم ویرایش کنید.</p>
    </section>

    <section id="browsers">
      <h2>سازگاری</h2>
      <p>آخرین دو نسخه Chrome، Edge، Firefox، Safari و مرورگرهای موبایل (Chrome اندروید و Safari آی‌اواس). طراحی از ۳۶۰ تا ۱۹۲۰ پیکسل واکنش‌گراست و با صفحه‌خوان‌ها و صفحه‌کلید قابل استفاده است (WCAG 2.2 AA).</p>
    </section>

    <section id="credits">
      <h2>منابع و لایسنس</h2>
      <ul>
        ${(opt.fonts || []).map(([f]) => html`<li>فونت ${f}: SIL Open Font License 1.1</li>`)}
        <li>آیکن‌ها: Lucide، مجوز ISC</li>
        <li>تبدیل تاریخ شمسی: الگوریتم jalaali-js، مجوز MIT</li>
        <li>همه تصاویر و طرح‌ها اختصاصی همین قالب هستند؛ هیچ عکس استوکی همراه قالب نیست.</li>
      </ul>
      <p>متن کامل مجوزها در پوشه <code>licenses</code> قرار دارد.</p>
    </section>

    <section id="changelog">
      <h2>تغییرات نسخه‌ها</h2>
      <p><b>نسخه ${fa(site.version)}</b> (مهر ۱۴۰۵): انتشار اولیه.</p>
    </section>

    <section id="support">
      <h2>پشتیبانی</h2>
      <p>پرسش‌ها و گزارش مشکلات را از طریق بخش پشتیبانی صفحه محصول در راست‌چین ارسال کنید. پشتیبانی شامل رفع اشکال و راهنمایی در استفاده از قالب است؛ سفارشی‌سازی اختصاصی جداگانه انجام می‌شود.</p>
    </section>
  </main>
</div>`;
}
