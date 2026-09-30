import { html, icon, fa, toman } from '../../../tools/lib/html.mjs';
import { pageHead, brandMark } from '../partials.mjs';
import { products } from '../data.mjs';

export const meta = { title: 'فاکتور #۴۸۲۱', layout: 'app', active: 'invoice', description: 'فاکتور فروش قابل چاپ' };

const items = [
  [products[0], 1],
  [products[2], 2],
  [products[7], 1],
  [products[5], 1],
];
const subtotal = items.reduce((s, [p, q]) => s + p.price * q, 0);
const discount = 450000;
const shipping = 85000;
const tax = Math.round((subtotal - discount) * 0.1);

export default (ctx) => html`
${pageHead(ctx, {
  title: 'فاکتور فروش',
  crumbs: [{ label: 'سفارش‌ها', href: 'orders.html' }, { label: 'فاکتور #۴۸۲۱' }],
  actions: html`
    <button class="btn" type="button" data-toast="فاکتور به ایمیل مشتری ارسال شد">${icon('send')} ارسال برای مشتری</button>
    <button class="btn btn--primary" type="button" onclick="window.print()">${icon('printer')} چاپ فاکتور</button>`,
})}

<article class="card invoice">
  <header class="invoice__top">
    <div class="stack" style="--gap:.75rem">
      <div class="row">${brandMark()}<span class="brand-name">فروشگاه پیشخوان</span></div>
      <p class="small muted" style="line-height:2">تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۲۱۴<br />تلفن: ۰۲۱-۸۸۶۶۴۴۲۲ · شناسه ملی: ۱۴۰۰۸۷۶۵۴۳۲</p>
    </div>
    <div class="stack" style="--gap:.75rem;justify-items:end">
      <h2 class="invoice__title">فاکتور</h2>
      <dl class="invoice__meta">
        <dt>شماره</dt><dd>#${fa(4821)}</dd>
        <dt>تاریخ صدور</dt><dd>۸ مهر ۱۴۰۵</dd>
        <dt>سررسید</dt><dd>۱۵ مهر ۱۴۰۵</dd>
      </dl>
    </div>
  </header>

  <section class="invoice__parties">
    <div>
      <h3>صورتحساب برای</h3>
      <p><b>علی رضایی</b><br />تهران، سعادت‌آباد، خیابان سرو غربی، کوچه ۱۲، پلاک ۸، واحد ۳<br />کد پستی: ۱۹۹۸۷۶۵۴۳۲ · ۰۹۱۲ ۴۵۶ ۷۸۹۰</p>
    </div>
    <div>
      <h3>روش پرداخت و ارسال</h3>
      <p>درگاه پرداخت زرین‌پال (پرداخت‌شده)<br />ارسال با پست پیشتاز · کد رهگیری <span class="ltr">IR-458213-TH</span></p>
    </div>
  </section>

  <div class="table-wrap" data-overflow-ok>
    <table class="table">
      <thead><tr><th scope="col">#</th><th scope="col">شرح کالا</th><th scope="col">تعداد</th><th scope="col">قیمت واحد</th><th scope="col">جمع</th></tr></thead>
      <tbody>
        ${items.map(
          ([p, q], i) => html`<tr>
            <td class="muted">${fa(i + 1)}</td>
            <td><div class="row"><span class="thumb ${p.tone}" style="inline-size:2.25rem;block-size:2.25rem">${icon(p.icon)}</span><div><b class="small">${p.name}</b><span class="person__meta">کد <span class="ltr">${p.sku}</span></span></div></div></td>
            <td class="num">${fa(q)}</td>
            <td class="num">${toman(p.price)}</td>
            <td class="num bold">${toman(p.price * q)}</td>
          </tr>`
        )}
      </tbody>
    </table>
  </div>

  <div class="invoice__totals">
    <div class="row" style="align-items:flex-start;gap:3rem;flex-wrap:wrap">
      <div class="invoice__stamp">پرداخت<br />شد</div>
      <dl>
        <dt class="muted">جمع کالاها</dt><dd>${toman(subtotal)}</dd>
        <dt class="muted">تخفیف (کد MEHR1405)</dt><dd class="text-danger">− ${toman(discount)}</dd>
        <dt class="muted">هزینه ارسال</dt><dd>${toman(shipping)}</dd>
        <dt class="muted">مالیات بر ارزش افزوده (۱۰٪)</dt><dd>${toman(tax)}</dd>
        <dt class="grand">مبلغ قابل پرداخت</dt><dd class="grand">${toman(subtotal - discount + shipping + tax)}</dd>
      </dl>
    </div>
  </div>

  <p class="invoice__note">${icon('info')} از خرید شما سپاسگزاریم. در صورت هرگونه سؤال درباره این فاکتور با شماره ۰۲۱-۸۸۶۶۴۴۲۲ یا ایمیل <span class="ltr">support@pishkhan.ir</span> تماس بگیرید. امکان مرجوعی کالا تا ۷ روز پس از تحویل وجود دارد.</p>
</article>`;
