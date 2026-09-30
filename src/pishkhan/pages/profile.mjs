import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { avatar, chart } from '../partials.mjs';
import { activity } from '../data.mjs';

export const meta = { title: 'پروفایل', layout: 'app', active: 'profile', description: 'پروفایل کاربر با فعالیت‌ها و اطلاعات تماس' };

export default (ctx) => html`
<section class="card card--flush mb-2">
  <div class="profile-cover" role="img" aria-label="تصویر کاور"></div>
  <div class="profile-head">
    ${avatar('سارا محمدی', 'xl', '<span class="status"></span>')}
    <div>
      <h1>سارا محمدی <span class="badge t-primary" style="vertical-align:middle">${icon('badge-check')} تأییدشده</span></h1>
      <p class="muted small">مدیر فروشگاه · تهران · عضو از فروردین ۱۴۰۲</p>
    </div>
    <div class="profile-head__actions">
      <a class="btn" href="${ctx.base}chat.html">${icon('message-circle')} پیام</a>
      <a class="btn btn--primary" href="${ctx.base}settings.html">${icon('pencil')} ویرایش پروفایل</a>
    </div>
  </div>
  <div data-tabs>
    <div class="tabs" role="tablist" aria-label="بخش‌های پروفایل" style="padding-inline:1.25rem">
      <button role="tab" id="pt-1" aria-controls="pp-1" aria-selected="true" type="button">${icon('activity')} فعالیت</button>
      <button role="tab" id="pt-2" aria-controls="pp-2" aria-selected="false" type="button">${icon('chart-column')} عملکرد</button>
      <button role="tab" id="pt-3" aria-controls="pp-3" aria-selected="false" type="button">${icon('folder')} پروژه‌ها</button>
    </div>
  </div>
</section>

<div class="grid">
  <aside class="stack lg-4">
    <section class="card">
      <div class="profile-stats"><div><b>${fa(1284)}</b><span>سفارش پردازش‌شده</span></div><div><b>۴٫۹</b><span>امتیاز رضایت</span></div><div><b>${fa(38)}</b><span>کمپین</span></div></div>
    </section>
    <section class="card">
      <div class="card__head"><h2 class="card__title">درباره</h2></div>
      <p class="small muted" style="line-height:2">بیش از ۸ سال تجربه در مدیریت فروشگاه‌های آنلاین و بازاریابی دیجیتال. عاشق داده، قهوه و طراحی تجربه خرید بی‌نقص.</p>
      <ul class="list-plain info-list mt-2">
        <li>${icon('mail')}<span class="ltr">sara@pishkhan.ir</span></li>
        <li>${icon('phone')}<span>۰۹۱۲ ۳۴۵ ۶۷۸۹</span></li>
        <li>${icon('map-pin')}<span>تهران، ایران</span></li>
        <li>${icon('globe')}<span class="ltr">pishkhan.ir</span></li>
      </ul>
    </section>
    <section class="card">
      <div class="card__head"><h2 class="card__title">مهارت‌ها</h2></div>
      <div class="skill-tags">${['مدیریت محصول', 'سئو', 'تحلیل داده', 'تبلیغات اینستاگرام', 'CRM', 'مذاکره'].map((s) => html`<span class="badge">${s}</span>`)}</div>
    </section>
  </aside>

  <div class="lg-8">
    <div role="tabpanel" id="pp-1" aria-labelledby="pt-1" class="card">
      <article class="post">
        <div class="person">${avatar('سارا محمدی', 'sm')}<div><span class="person__name">سارا محمدی</span><span class="person__meta">۲ ساعت پیش · در کانال تیم</span></div></div>
        <p class="small" style="line-height:2">کالکشن جدید محصولات صوتی امروز منتشر شد 🎧 از همه بچه‌های تیم محتوا و عکاسی ممنونم. در ۳ ساعت اول ${fa(84)} سفارش ثبت شده!</p>
        <div class="post__media">
          ${[['headphones', 't-primary'], ['speaker', 't-success'], ['mic', 't-accent']].map(([i, t]) => html`<div class="thumb thumb--lg ${t}" role="img" aria-label="تصویر محصول">${icon(i)}</div>`)}
        </div>
        <div class="post__actions"><button type="button">${icon('heart')} ${fa(24)}</button><button type="button">${icon('message-circle')} ${fa(6)}</button><button type="button">${icon('share-2')} اشتراک</button></div>
      </article>
      <article class="post">
        <div class="person">${avatar('سارا محمدی', 'sm')}<div><span class="person__name">سارا محمدی</span><span class="person__meta">دیروز</span></div></div>
        <p class="small" style="line-height:2">گزارش فروش شهریور آماده است. رشد ${fa(23)}٪ نسبت به ماه قبل؛ بیشترین سهم مربوط به دسته پوشیدنی بود.</p>
        <div class="post__actions"><button type="button">${icon('heart')} ${fa(41)}</button><button type="button">${icon('message-circle')} ${fa(12)}</button><button type="button">${icon('share-2')} اشتراک</button></div>
      </article>
    </div>
    <div role="tabpanel" id="pp-2" aria-labelledby="pt-2" class="card" hidden>
      <div class="card__head"><h2 class="card__title">سفارش‌های پردازش‌شده در هفته</h2></div>
      ${chart({ type: 'bar', height: 280, labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'], series: [{ name: 'این هفته', data: [42, 51, 38, 64, 58, 71, 22] }, { name: 'هفته قبل', data: [35, 40, 36, 48, 50, 60, 18] }] })}
    </div>
    <div role="tabpanel" id="pp-3" aria-labelledby="pt-3" class="card" hidden>
      <ol class="list-plain timeline">
        ${activity.map((a) => html`<li class="timeline__item"><span class="timeline__icon ${a.tone}">${icon(a.icon)}</span><div><p>${a.text}</p><time>${a.time}</time></div></li>`)}
      </ol>
    </div>
  </div>
</div>`;
