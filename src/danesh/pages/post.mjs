import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { avatar, courseCard } from '../partials.mjs';
import { posts, courses } from '../data.mjs';
import { postCard } from './blog.mjs';

export const meta = { title: 'نقشه راه فرانت‌اند در ۱۴۰۵', layout: 'main', active: 'blog', description: 'مقاله: از کجا فرانت‌اند را شروع کنیم؟' };

const toc = ['چرا فرانت‌اند؟', 'مرحله ۱: HTML و CSS', 'مرحله ۲: جاوااسکریپت', 'مرحله ۳: یک فریم‌ورک', 'مرحله ۴: نمونه‌کار و رزومه', 'جمع‌بندی'];

export default (ctx) => html`
<article>
  <header class="post-hero">
    <div class="container post-hero__inner">
      <nav class="breadcrumb" aria-label="مسیر صفحه"><a href="${ctx.base}index.html">خانه</a>${icon('chevron-left')}<a href="${ctx.base}blog.html">مجله</a>${icon('chevron-left')}<span aria-current="page">برنامه‌نویسی</span></nav>
      <span class="badge tone-lime">برنامه‌نویسی</span>
      <h1>${posts[0].title}</h1>
      <div class="row wrap small muted"><div class="person">${avatar('آرش کاظمی', 'lime')}<span><b style="color:var(--text)">آرش کاظمی</b><span>${posts[0].date}</span></span></div><span>${icon('clock')} ${fa(9)} دقیقه مطالعه</span><span>${icon('eye')} ${fa(12480)} بازدید</span></div>
    </div>
    <div class="container"><div class="post-hero__art cover c-lime"><span class="cover__icon">${icon('map')}</span></div></div>
  </header>

  <div class="container post-layout section--tight">
    <aside class="toc" aria-label="فهرست مطالب">
      <b>فهرست مطالب</b>
      <ol>${toc.map((t, i) => html`<li><a href="#s${i}">${t}</a></li>`)}</ol>
      <div class="row mt-2"><button class="btn btn--sm" type="button" data-copy="https://danesh.academy/blog/frontend-roadmap">${icon('link')} کپی لینک</button><button class="btn btn--sm" type="button" data-toast="مقاله ذخیره شد">${icon('bookmark')}</button></div>
    </aside>

    <div class="prose">
      <p class="lead">هر سال هزاران نفر تصمیم می‌گیرند برنامه‌نویس شوند و بیشترشان در همان قدم اول گم می‌شوند: «از کجا شروع کنم؟». این نقشه راه جواب کوتاه و عملی این سؤال است.</p>
      <h2 id="s0">چرا فرانت‌اند؟</h2>
      <p>فرانت‌اند سریع‌ترین مسیر برای دیدن نتیجه کار است. کدی که می‌نویسید را همان لحظه در مرورگر می‌بینید و همین بازخورد سریع، انگیزه ادامه دادن را زنده نگه می‌دارد. بازار کار ایران هم هنوز تشنه فرانت‌اند دولوپرهای خوب است.</p>
      <h2 id="s1">مرحله ۱: HTML و CSS</h2>
      <p>با ساختار صفحه و استایل‌دهی شروع کنید. هدف این مرحله ساختن یک صفحه شخصی کامل و واکنش‌گراست؛ نه حفظ کردن همه ویژگی‌ها.</p>
      <blockquote>«لازم نیست همه‌چیز را بدانید؛ باید بدانید کجا دنبالش بگردید.»</blockquote>
      <h2 id="s2">مرحله ۲: جاوااسکریپت</h2>
      <p>اینجا قلب ماجراست. متغیرها، توابع، آرایه‌ها، DOM و در نهایت کار با API. برای هر مفهوم یک پروژه کوچک بسازید:</p>
      <ul><li>ماشین‌حساب برای شرط‌ها و رویدادها</li><li>لیست کارها برای آرایه‌ها و localStorage</li><li>اپ آب‌وهوا برای Fetch و async/await</li></ul>
<pre class="ltr"><code>const res = await fetch('/api/weather?city=tehran');
const data = await res.json();
console.log(data.temp); // 24</code></pre>
      <h2 id="s3">مرحله ۳: یک فریم‌ورک</h2>
      <p>ری‌اکت همچنان پرتقاضاترین گزینه در آگهی‌های استخدام است. بعد از تسلط نسبی بر جاوااسکریپت، سراغ کامپوننت‌ها، state و مسیریابی بروید.</p>
      <div class="callout">${icon('lightbulb')}<p><b>نکته:</b> قبل از فریم‌ورک، حداقل یک پروژه متوسط را با جاوااسکریپت خالص تمام کنید. این کار درک شما از ری‌اکت را چند برابر می‌کند.</p></div>
      <h2 id="s4">مرحله ۴: نمونه‌کار و رزومه</h2>
      <p>سه پروژه خوب با کد تمیز در گیت‌هاب، از ده پروژه نیمه‌کاره بهتر است. برای هر پروژه یک README با تصویر و توضیح مسئله بنویسید.</p>
      <h2 id="s5">جمع‌بندی</h2>
      <p>مسیر ۶ ماهه است اگر هر روز حداقل یک ساعت وقت بگذارید. مهم‌تر از سرعت، استمرار است. موفق باشید!</p>
      <div class="row wrap mt-3">${['فرانت‌اند', 'جاوااسکریپت', 'نقشه راه', 'استخدام'].map((t) => html`<a class="chip" href="${ctx.base}blog.html">#${t}</a>`)}</div>
      <div class="author card mt-4">${avatar('آرش کاظمی', 'lime', 'lg')}<div><b>آرش کاظمی</b><p class="small muted">توسعه‌دهنده ارشد فرانت‌اند و مدرس دوره جاوااسکریپت دانش.</p></div><a class="btn btn--sm" href="${ctx.base}instructor.html">پروفایل</a></div>

      <section class="comments mt-4" aria-label="نظرات">
        <h2>نظرات (${fa(2)})</h2>
        ${[['مهسا کرمی', 'coral', 'خیلی کاربردی بود، ممنون! برای بک‌اند هم چنین مقاله‌ای می‌نویسید؟'], ['علی توکلی', 'sky', 'بخش نمونه‌کار دقیقاً همون چیزی بود که لازم داشتم.']].map(
          ([n, t, c]) => html`<article class="review"><div class="person">${avatar(n, t)}<span><b>${n}</b><span>۲ روز پیش</span></span></div><p>${c}</p></article>`
        )}
        <form class="card stack" data-validate data-success="نظر شما پس از تأیید منتشر می‌شود">
          <div class="field"><label class="label" for="cm">دیدگاه شما</label><textarea class="textarea" id="cm" required minlength="10"></textarea></div>
          <button class="btn btn--ink" type="submit" style="justify-self:start">ارسال دیدگاه</button>
        </form>
      </section>
    </div>
  </div>
</article>

<section class="section section--cream section--tight">
  <div class="container">
    <h2 style="font-size:var(--text-2xl);margin-block-end:1.5rem">دوره پیشنهادی برای شروع</h2>
    <div class="course-grid">${[courses[7], courses[0], courses[4]].map((c) => courseCard(ctx, c))}${postCard(ctx, posts[2])}</div>
  </div>
</section>`;
