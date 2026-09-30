import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHead, chart } from '../partials.mjs';
import { months } from '../data.mjs';

export const meta = { title: 'تحلیل‌ها', layout: 'app', active: 'analytics', description: 'تحلیل ترافیک، منابع ورودی و رفتار کاربران' };

const days30 = Array.from({ length: 30 }, (_, i) => i + 1);
const wave = (base, amp, seed) => days30.map((d) => Math.round(base + amp * Math.sin((d + seed) / 3.2) + d * (base / 60) + ((d * seed) % 7) * (amp / 9)));
const hours = ['۰', '۲', '۴', '۶', '۸', '۱۰', '۱۲', '۱۴', '۱۶', '۱۸', '۲۰', '۲۲'];
const weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

const pages = [
  ['/', 'صفحه اصلی', 48210, '۰۰:۵۲', 32.4],
  ['/products/nova-headphone', 'هدفون بی‌سیم نوا', 21430, '۰۲:۱۸', 18.9],
  ['/category/audio', 'دسته صوتی', 17840, '۰۱:۴۰', 24.1],
  ['/blog/best-smartwatch-1405', 'بهترین ساعت‌های هوشمند ۱۴۰۵', 12960, '۰۴:۰۵', 41.7],
  ['/cart', 'سبد خرید', 9820, '۰۱:۱۲', 12.3],
  ['/offers/mehr', 'جشنواره مهر', 8710, '۰۱:۵۵', 28.6],
];

export default (ctx) => html`
${pageHead(ctx, {
  title: 'تحلیل‌ها',
  sub: 'رفتار بازدیدکنندگان و منابع ترافیک در ۳۰ روز گذشته',
  crumbs: [{ label: 'تحلیل‌ها' }],
  actions: html`
    <div class="input-icon" style="inline-size:13rem">${icon('calendar')}<input class="input" data-datepicker placeholder="انتخاب تاریخ" aria-label="از تاریخ" readonly /></div>
    <button class="btn" type="button" data-toast="گزارش PDF ساخته شد">${icon('file-down')} دانلود PDF</button>`,
})}

<section class="grid">
  <article class="card card--flush" style="grid-column:1/-1">
    <dl class="stat-strip">
      <div><dt>بازدیدکنندگان یکتا</dt><dd>${fa(128430)} <span class="delta delta--up">${icon('trending-up')} ۱۸٪</span></dd></div>
      <div><dt>بازدید صفحه</dt><dd>${fa(492110)} <span class="delta delta--up">${icon('trending-up')} ۹٪</span></dd></div>
      <div><dt>میانگین مدت بازدید</dt><dd>۰۳:۲۴ <span class="delta delta--down">${icon('trending-down')} ۲٪</span></dd></div>
      <div><dt>نرخ پرش</dt><dd>۳۴٫۲٪ <span class="delta delta--up">${icon('trending-down')} ۴٪</span></dd></div>
    </dl>
  </article>

  <article class="card lg-8">
    <div class="card__head">
      <div><h2 class="card__title">ترافیک روزانه</h2><p class="card__sub">بازدیدکنندگان و بازدید صفحه</p></div>
      <div class="tabs tabs--pill" role="tablist" aria-label="نوع نمودار">
        <button role="tab" aria-selected="true" type="button">بازدید</button>
        <button role="tab" aria-selected="false" type="button">فروش</button>
      </div>
    </div>
    ${chart({ type: 'line', height: 300, compact: true, labels: days30, series: [{ name: 'بازدید صفحه', data: wave(14000, 3000, 2) }, { name: 'بازدیدکننده یکتا', data: wave(4200, 900, 5) }] })}
  </article>

  <article class="card lg-4">
    <div class="card__head"><div><h2 class="card__title">دستگاه‌ها</h2><p class="card__sub">سهم بازدید از هر دستگاه</p></div></div>
    ${chart({ type: 'donut', height: 200, labels: ['موبایل', 'دسکتاپ', 'تبلت'], series: [{ name: 'دستگاه', data: [71, 23, 6] }], centerValue: '۷۱٪', centerLabel: 'موبایل' })}
    <div class="alert t-info mt-2">${icon('smartphone')}<div><strong>بیشتر مشتریان با موبایل می‌خرند</strong>بهینه‌سازی صفحه پرداخت موبایل را در اولویت قرار دهید.</div></div>
  </article>

  <article class="card lg-5">
    <div class="card__head"><h2 class="card__title">منابع ورودی</h2></div>
    <ul class="list-plain sources">
      ${[
        ['search', 't-primary', 'جستجوی گوگل', 42, 53900],
        ['camera', 't-accent', 'اینستاگرام', 24, 30820],
        ['send', 't-info', 'تلگرام', 13, 16700],
        ['link', 't-success', 'ورود مستقیم', 12, 15410],
        ['mail', 't-warning', 'خبرنامه ایمیلی', 9, 11600],
      ].map(
        ([ic, t, name, pct, n]) => html`<li class="${t}">
          <span class="thumb" style="inline-size:2.25rem;block-size:2.25rem">${icon(ic)}</span>
          <span class="small bold">${name}</span>
          <span class="small muted num">${fa(n)} · <b style="color:var(--text)">${fa(pct)}٪</b></span>
          <div class="progress progress--sm"><span style="--value:${pct * 2}%"></span></div>
        </li>`
      )}
    </ul>
  </article>

  <article class="card lg-7">
    <div class="card__head"><div><h2 class="card__title">فروش ماهانه بر اساس کانال</h2><p class="card__sub">میلیون تومان</p></div></div>
    ${chart({
      type: 'bar',
      height: 280,
      stacked: true,
      labels: months.slice(0, 7),
      series: [
        { name: 'وب‌سایت', data: [52, 58, 61, 70, 76, 88, 104] },
        { name: 'اپلیکیشن', data: [28, 30, 26, 34, 40, 43, 55] },
        { name: 'فروشگاه حضوری', data: [12, 16, 11, 17, 18, 19, 25] },
      ],
    })}
  </article>

  <article class="card lg-7">
    <div class="card__head"><div><h2 class="card__title">ساعات اوج خرید</h2><p class="card__sub">پررنگ‌تر یعنی سفارش بیشتر</p></div></div>
    <div class="heatmap" role="img" aria-label="نقشه حرارتی سفارش‌ها بر اساس روز و ساعت">
      <span></span>${hours.map((h) => html`<span class="hm-hour">${h}</span>`)}
      ${weekDays.map(
        (d, r) => html`<span class="hm-label">${d}</span>${hours.map((_, c) => {
          const v = Math.max(4, Math.round(Math.pow(Math.sin(((c + 2) / 12) * Math.PI), 2) * 80 + ((r * 7 + c * 3) % 11) * 2 + (r >= 5 ? 10 : 0) - (c < 3 ? 30 : 0)));
          return html`<span class="cell" style="--v:${Math.min(v, 100)}" title="${d}، ساعت ${hours[c]}"></span>`;
        })}`
      )}
    </div>
  </article>

  <article class="card lg-5">
    <div class="card__head"><h2 class="card__title">اهداف فصل پاییز</h2></div>
    <div class="grid" style="--gap:1rem">
      ${[
        ['فروش', 78, 't-primary', '۱۸۴ از ۲۳۶ میلیون'],
        ['مشتری جدید', 64, 't-success', '۶۴۰ از ۱۰۰۰'],
        ['رضایت', 92, 't-warning', '۴٫۶ از ۵'],
        ['مرجوعی', 18, 't-danger', 'زیر ۲۰٪ هدف'],
      ].map(
        ([l, v, t, s]) => html`<div class="sm-6 row">
          <div class="ring ${t}" style="--value:${v}">${fa(v)}٪</div>
          <div><b class="small">${l}</b><p class="xs muted">${s}</p></div>
        </div>`
      )}
    </div>
  </article>

  <article class="card card--flush" style="grid-column:1/-1">
    <div class="card__head"><div><h2 class="card__title">پربازدیدترین صفحات</h2><p class="card__sub">مرتب‌سازی با کلیک روی عنوان ستون</p></div></div>
    <div data-table>
      <div class="table-wrap mt-2" data-overflow-ok>
        <table class="table">
          <thead><tr>
            <th scope="col"><button class="th-sort" type="button" data-sort>صفحه ${icon('arrow-up')}</button></th>
            <th scope="col"><button class="th-sort" type="button" data-sort>بازدید ${icon('arrow-up')}</button></th>
            <th scope="col">میانگین زمان</th>
            <th scope="col"><button class="th-sort" type="button" data-sort>نرخ خروج ${icon('arrow-up')}</button></th>
            <th scope="col">روند</th>
          </tr></thead>
          <tbody>
            ${pages.map(
              ([url, t, v, time, exit], i) => html`<tr>
                <td><span class="person__name">${t}</span><span class="person__meta ltr">${url}</span></td>
                <td class="num" data-value="${v}">${fa(v)}</td>
                <td class="muted">${time}</td>
                <td data-value="${exit}"><div class="row"><div class="progress progress--sm" style="inline-size:5rem"><span style="--value:${exit * 2}%"></span></div><span class="xs">${fa(exit).replace('.', '٫')}٪</span></div></td>
                <td style="inline-size:8rem">${chart({ type: 'sparkline', height: 32, series: [{ name: t, data: wave(50, 12, i + 1).slice(0, 12) }] })}</td>
              </tr>`
            )}
          </tbody>
        </table>
      </div>
    </div>
  </article>
</section>`;
