import { html, icon } from '../../../tools/lib/html.mjs';
import { pageHero, logo } from '../partials.mjs';

export const meta = { title: 'استعلام گواهی', layout: 'main', description: 'بررسی اعتبار گواهی پایان دوره با کد رهگیری' };

export default (ctx) => html`
${pageHero(ctx, { title: 'استعلام گواهی', sub: 'کارفرمایان محترم: کد رهگیری درج‌شده روی گواهی را وارد کنید تا اعتبار آن را بررسی کنید.', crumbs: [{ label: 'استعلام گواهی' }] })}

<section class="section section--tight">
  <div class="container stack" style="--gap:2rem;max-inline-size:60rem">
    <form class="cert-form" data-cert-form>
      <label class="sr-only" for="cert-code">کد رهگیری گواهی</label>
      <div class="input-icon" style="flex:1">${icon('scan-search')}<input class="input ltr" id="cert-code" value="DN-1405-08214" placeholder="DN-1405-00000" /></div>
      <button class="btn btn--primary btn--lg" type="submit">استعلام</button>
    </form>
    <p class="alert-bad card small" data-cert-bad hidden>${icon('circle-x')} گواهی با این کد پیدا نشد. قالب کد باید مانند DN-1405-08214 باشد.</p>

    <div data-cert-ok>
      <p class="alert-ok small bold">${icon('badge-check')} این گواهی معتبر است و توسط آکادمی دانش صادر شده است.</p>
      <article class="certificate" aria-label="گواهی پایان دوره">
        <div class="certificate__border">
          <div class="row-between">${logo(ctx)}<span class="xs muted ltr" data-cert-code>DN-1405-08214</span></div>
          <p class="certificate__kicker">گواهی پایان دوره</p>
          <p class="small muted">بدین‌وسیله گواهی می‌شود</p>
          <h2 class="certificate__name">سارا محمدی</h2>
          <p class="small muted">دوره</p>
          <h3 class="certificate__course">هوش مصنوعی مولد برای همه</h3>
          <p class="small muted">را به مدت ۸ ساعت با موفقیت و با نمره ۹۶ از ۱۰۰ به پایان رسانده است.</p>
          <div class="certificate__foot">
            <div><span class="certificate__sign">کاوه صدری</span><span class="xs muted">مدرس دوره</span></div>
            <span class="certificate__seal">${icon('award')}</span>
            <div><b>۲۲ شهریور ۱۴۰۵</b><span class="xs muted">تاریخ صدور</span></div>
          </div>
        </div>
      </article>
      <div class="row mt-3" style="justify-content:center"><button class="btn" type="button" onclick="window.print()">${icon('printer')} چاپ گواهی</button><button class="btn" type="button" data-copy="https://danesh.academy/cert/DN-1405-08214">${icon('link')} کپی لینک</button></div>
    </div>
  </div>
</section>`;
