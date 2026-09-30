import { html, icon, fa, toman } from '../../../tools/lib/html.mjs';
import { pageHead, chart, person, status } from '../partials.mjs';
import { orders, products, activity, months } from '../data.mjs';

export const meta = { title: 'داشبورد فروش', layout: 'app', active: 'dashboard', description: 'نمای کلی فروش، سفارش‌ها و عملکرد فروشگاه' };

const kpis = [
  { label: 'درآمد این ماه', value: '۱۸۴٫۶', unit: 'میلیون تومان', delta: 23.4, up: true, icon: 'wallet', tone: 't-primary', spark: [12, 18, 14, 22, 19, 27, 24, 31, 29, 36] },
  { label: 'سفارش‌ها', value: fa(1284), unit: 'سفارش', delta: 12.1, up: true, icon: 'shopping-bag', tone: 't-success', spark: [30, 28, 34, 31, 38, 36, 42, 40, 45, 48] },
  { label: 'میانگین سبد خرید', value: '۱٫۴۳', unit: 'میلیون تومان', delta: 3.2, up: false, icon: 'shopping-basket', tone: 't-warning', spark: [22, 24, 21, 23, 20, 22, 19, 21, 18, 19] },
  { label: 'نرخ تبدیل', value: '۳٫۸', unit: 'درصد', delta: 0.6, up: true, icon: 'target', tone: 't-accent', spark: [2.9, 3.1, 3.0, 3.3, 3.2, 3.5, 3.4, 3.6, 3.7, 3.8] },
];

const kpiCard = (k) => html`
<article class="card kpi">
  <div class="kpi__top">
    <span class="kpi__icon ${k.tone}">${icon(k.icon)}</span>
    <span class="kpi__label">${k.label}</span>
  </div>
  <div class="kpi__row">
    <div>
      <p class="kpi__value">${k.value}</p>
      <p class="kpi__meta">
        <span class="delta ${k.up ? 'delta--up' : 'delta--down'}">${icon(k.up ? 'trending-up' : 'trending-down')} ${fa(k.delta).replace('.', '٫')}٪</span>
        <span>${k.unit}</span>
      </p>
    </div>
    <div class="kpi__spark ${k.tone}">${chart({ type: 'sparkline', series: [{ name: k.label, data: k.spark }], height: 52, colors: [`var(--tint)`] })}</div>
  </div>
</article>`;

const revenue = {
  type: 'area',
  height: 300,
  compact: true,
  unit: 'تومان',
  labels: months,
  series: [
    { name: 'درآمد ۱۴۰۵', data: [92e6, 104e6, 98e6, 121e6, 134e6, 150e6, 184e6, 171e6, 188e6, 205e6, 219e6, 246e6] },
    { name: 'درآمد ۱۴۰۴', data: [71e6, 80e6, 86e6, 90e6, 97e6, 112e6, 126e6, 131e6, 128e6, 142e6, 151e6, 176e6], dashed: true },
  ],
};

export default (ctx) => html`
${pageHead(ctx, {
  title: 'سلام سارا، روز خوبی داشته باشی',
  sub: html`<span data-today>چهارشنبه ۸ مهر ۱۴۰۵</span> · خلاصه عملکرد فروشگاه در یک نگاه`,
  crumbs: [{ label: 'داشبورد فروش' }],
  actions: html`
    <div class="btn-group" role="group" aria-label="بازه زمانی">
      <button type="button" aria-pressed="false">امروز</button>
      <button type="button" aria-pressed="false">هفته</button>
      <button type="button" aria-pressed="true">ماه</button>
      <button type="button" aria-pressed="false">سال</button>
    </div>
    <button class="btn" type="button" data-toast="گزارش در حال آماده‌سازی است؛ به‌زودی دانلود می‌شود.">${icon('download')} خروجی گزارش</button>
    <a class="btn btn--primary" href="${ctx.base}product-form.html">${icon('plus')} محصول جدید</a>`,
})}

<section class="grid" aria-label="شاخص‌های کلیدی">
  ${kpis.map((k) => html`<div class="sm-6 xl-3">${kpiCard(k)}</div>`)}

  <article class="card lg-8">
    <div class="card__head">
      <div>
        <h2 class="card__title">روند درآمد</h2>
        <p class="card__sub">مقایسه درآمد ماهانه امسال با سال گذشته</p>
      </div>
      <div class="row">
        <div class="hide-sm row small"><span class="bold">۲٫۰۱ میلیارد</span><span class="delta delta--up">${icon('trending-up')} ۲۸٪</span></div>
        <div data-dropdown>
          <button class="icon-btn icon-btn--sm" type="button" data-dropdown-toggle aria-expanded="false" aria-label="گزینه‌های نمودار">${icon('ellipsis')}</button>
          <div class="dropdown-menu" data-dropdown-menu>
            <button type="button">${icon('download')} دانلود تصویر</button>
            <button type="button">${icon('sheet')} خروجی اکسل</button>
            <button type="button">${icon('refresh-cw')} بارگذاری دوباره</button>
          </div>
        </div>
      </div>
    </div>
    ${chart(revenue)}
  </article>

  <article class="card goal lg-4">
    <div class="goal__bg" aria-hidden="true"></div>
    <div class="goal__content">
      <span class="badge goal__badge">${icon('sparkles')} هدف ماهانه مهر</span>
      <h2>۷۸٪ از هدف فروش<br />محقق شد</h2>
      <p>تا پایان ماه ${fa(23)} روز باقی مانده و برای رسیدن به هدف ${toman(52000000)} دیگر لازم است.</p>
      <div class="goal__ring ring" style="--value:78"><span>${fa(78)}٪</span></div>
      <dl class="goal__stats">
        <div><dt>فروش فعلی</dt><dd>۱۸۴٫۶ م</dd></div>
        <div><dt>هدف</dt><dd>۲۳۶ م</dd></div>
        <div><dt>روز مانده</dt><dd>${fa(23)}</dd></div>
      </dl>
      <a class="btn btn--block goal__btn" href="${ctx.base}analytics.html">مشاهده تحلیل کامل ${icon('arrow-left')}</a>
    </div>
  </article>

  <article class="card card--flush lg-8">
    <div class="card__head">
      <div>
        <h2 class="card__title">آخرین سفارش‌ها</h2>
        <p class="card__sub">${fa(12)} سفارش در انتظار پردازش</p>
      </div>
      <a class="card-link" href="${ctx.base}orders.html">همه سفارش‌ها ${icon('arrow-left')}</a>
    </div>
    <div class="table-wrap mt-2" data-overflow-ok>
      <table class="table">
        <thead>
          <tr><th scope="col">سفارش</th><th scope="col">مشتری</th><th scope="col">محصول</th><th scope="col">مبلغ</th><th scope="col">وضعیت</th></tr>
        </thead>
        <tbody>
          ${orders.slice(0, 6).map(
            (o) => html`<tr>
              <td><a class="bold text-primary" href="${ctx.base}invoice.html">#${fa(o.id)}</a><span class="person__meta">${o.date}</span></td>
              <td>${person(o.customer, o.city, 'xs')}</td>
              <td class="muted">${o.product}${o.qty > 1 ? html` <span class="faint">× ${fa(o.qty)}</span>` : ''}</td>
              <td class="num">${toman(o.total)}</td>
              <td>${status(o.status)}</td>
            </tr>`
          )}
        </tbody>
      </table>
    </div>
  </article>

  <article class="card lg-4">
    <div class="card__head">
      <div>
        <h2 class="card__title">فروش بر اساس دسته</h2>
        <p class="card__sub">سهم هر دسته از درآمد ماه</p>
      </div>
    </div>
    ${chart({ type: 'donut', height: 210, labels: ['صوتی', 'پوشیدنی', 'کامپیوتر', 'موبایل', 'سایر'], series: [{ name: 'سهم', data: [34, 22, 18, 16, 10] }], centerValue: '۱۸۴٫۶ م', centerLabel: 'درآمد مهر' })}
  </article>

  <article class="card lg-6 xl-4">
    <div class="card__head">
      <h2 class="card__title">پرفروش‌ترین محصولات</h2>
      <a class="card-link" href="${ctx.base}products.html">همه ${icon('arrow-left')}</a>
    </div>
    <ul class="list-plain top-products">
      ${[...products]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5)
        .map(
          (p, i) => html`<li>
            <span class="thumb ${p.tone}">${icon(p.icon)}</span>
            <div class="top-products__info">
              <span class="person__name">${p.name}</span>
              <div class="progress progress--sm ${p.tone}"><span style="--value:${Math.round((p.sold / 620) * 100)}%"></span></div>
            </div>
            <span class="top-products__num"><b>${fa(p.sold)}</b><small>فروش</small></span>
          </li>`
        )}
    </ul>
  </article>

  <article class="card lg-6 xl-4">
    <div class="card__head">
      <h2 class="card__title">فعالیت‌های اخیر</h2>
      <span class="badge badge--dot t-success">زنده</span>
    </div>
    <ol class="list-plain timeline">
      ${activity.map(
        (a) => html`<li class="timeline__item">
          <span class="timeline__icon ${a.tone}">${icon(a.icon)}</span>
          <div><p>${a.text}</p><time>${a.time}</time></div>
        </li>`
      )}
    </ol>
  </article>

  <article class="card xl-4">
    <div class="card__head">
      <div>
        <h2 class="card__title">فروش به تفکیک شهر</h2>
        <p class="card__sub">${fa(31)} استان · ${fa(214)} شهر</p>
      </div>
    </div>
    <ul class="list-plain cities">
      ${[
        ['تهران', 38, 70.2],
        ['اصفهان', 14, 25.8],
        ['مشهد', 11, 20.3],
        ['شیراز', 9, 16.6],
        ['تبریز', 7, 12.9],
        ['سایر شهرها', 21, 38.8],
      ].map(
        ([city, pct, m]) => html`<li>
          <div class="row-between small"><span>${city}</span><span class="muted num">${fa(m).replace('.', '٫')} م · <b class="bold" style="color:var(--text)">${fa(pct)}٪</b></span></div>
          <div class="progress"><span style="--value:${pct * 2.4}%"></span></div>
        </li>`
      )}
    </ul>
  </article>
</section>`;
