import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';
import { hours } from '../data.mjs';
import { dish } from '../art.mjs';

export const meta = { title: 'رزرو میز', layout: 'main', active: 'reserve', description: 'رزرو آنلاین میز با انتخاب تاریخ شمسی، ساعت، تعداد نفرات و فضای دلخواه' };

const times = ['۱۲:۳۰', '۱۳:۰۰', '۱۳:۳۰', '۱۴:۰۰', '۱۴:۳۰', '۱۹:۳۰', '۲۰:۰۰', '۲۰:۳۰', '۲۱:۰۰', '۲۱:۳۰', '۲۲:۰۰'];

export default (ctx) => html`
${pageHero(ctx, { title: 'رزرو میز', callig: 'قدمتان روی چشم', sub: 'رزرو تا ۳۰ روز آینده امکان‌پذیر است. برای بیش از ۱۰ نفر، سالن خصوصی پیشنهاد می‌شود.', crumbs: ['رزرو میز'] })}

<section class="section section--tight">
  <div class="container reserve">
    <form class="card reserve__form" data-reserve data-validate novalidate>
      <div class="form-grid">
        <div class="field"><label class="label" for="r-date">تاریخ</label><div class="input-icon">${icon('calendar')}<input class="input" id="r-date" data-datepicker readonly required placeholder="انتخاب روز" data-msg="لطفاً تاریخ را انتخاب کنید" /></div></div>
        <div class="field"><label class="label" for="r-time">ساعت</label><select class="select" id="r-time" required>${times.map((t, i) => html`<option ${i === 6 ? 'selected' : ''}>${t}</option>`)}</select></div>
        <div class="field">
          <label class="label" for="r-guests">تعداد نفرات</label>
          <div class="stepper" data-stepper><button type="button" data-step-btn="1" aria-label="افزایش">${icon('plus')}</button><input id="r-guests" value="۴" inputmode="numeric" aria-live="polite" /><button type="button" data-step-btn="-1" aria-label="کاهش">${icon('minus')}</button></div>
          <p class="xs gold" data-guests-note hidden>${icon('info')} برای ۱۰ نفر و بیشتر، <a class="link" href="${ctx.base}events.html">سالن خصوصی</a> را ببینید.</p>
        </div>
        <div class="field"><label class="label" for="r-occasion">مناسبت (اختیاری)</label><select class="select" id="r-occasion"><option>بدون مناسبت</option><option>تولد</option><option>سالگرد ازدواج</option><option>قرار کاری</option><option>خواستگاری</option></select></div>
        <fieldset class="full areas">
          <legend class="label">فضای دلخواه</legend>
          ${[
            ['تالار اصلی', 'زیر گنبد، نزدیک صحنه موسیقی', 'music'],
            ['حیاط و حوض', 'فضای باز با تخت‌های سنتی', 'trees'],
            ['شاه‌نشین', 'دنج و آرام، مناسب قرارهای دونفره', 'sofa'],
          ].map(([n, d, i], k) => html`<label class="area"><input type="radio" name="area" value="${n}" ${k === 0 ? 'checked' : ''} /><span>${icon(i)}<b>${n}</b><small>${d}</small></span></label>`)}
        </fieldset>
        <div class="field"><label class="label" for="r-name">نام و نام خانوادگی</label><input class="input" id="r-name" required autocomplete="name" /></div>
        <div class="field"><label class="label" for="r-phone">شماره موبایل</label><input class="input" id="r-phone" type="tel" required pattern="09[0-9]{9}" data-msg="شماره موبایل را به شکل ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید" autocomplete="tel" /></div>
        <div class="field full"><label class="label" for="r-note">درخواست ویژه</label><textarea class="textarea" id="r-note" rows="3" placeholder="صندلی کودک، کیک تولد، رژیم غذایی خاص…"></textarea></div>
      </div>
      <button class="btn btn--gold btn--lg btn--block mt-3" type="submit"><span>${icon('calendar-heart')} تأیید رزرو</span></button>
    </form>

    <div class="card reserve__done" data-reserve-done hidden>
      <div class="center stack" style="justify-items:center;--gap:.5rem">
        <div class="reserve__plate">${dish('chai')}</div>
        <p class="callig" style="font-size:var(--text-xl)">منتظر دیدارتان هستیم</p>
        <h2 class="h-md">رزرو شما ثبت شد</h2>
      </div>
      <dl class="ticket">
        <div><dt>کد رزرو</dt><dd class="ltr" data-r-code>ZF-0000</dd></div>
        <div><dt>به نام</dt><dd data-r-name>—</dd></div>
        <div><dt>زمان</dt><dd data-r-when>—</dd></div>
        <div><dt>نفرات</dt><dd data-r-guests>—</dd></div>
        <div><dt>فضا</dt><dd data-r-area>—</dd></div>
      </dl>
      <p class="xs muted center">میز تا ۲۰ دقیقه پس از زمان رزرو نگه داشته می‌شود. برای لغو، کد رزرو را به ۳۰۰۰۱۴۵ پیامک کنید.</p>
    </div>

    <aside class="stack reserve__side">
      <div class="card">
        <h2 class="h-sm">ساعات کاری</h2>
        <ul class="list-plain hours">${hours.map(([d, h]) => html`<li><span>${d}</span><b class="gold">${h}</b></li>`)}</ul>
      </div>
      <div class="card">
        <h2 class="h-sm">رزرو تلفنی</h2>
        <p class="small muted">برای رزرو فوری یا گروهی تماس بگیرید.</p>
        <a class="btn btn--block mt-2" href="tel:02122663344">${icon('phone')} ۰۲۱-۲۲۶۶۳۳۴۴</a>
      </div>
    </aside>
  </div>
</section>`;
