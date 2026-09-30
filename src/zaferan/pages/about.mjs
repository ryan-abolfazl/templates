import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHero } from '../partials.mjs';
import { dish, girih, ornament } from '../art.mjs';

export const meta = { title: 'داستان ما', layout: 'main', active: 'about', description: 'تاریخچه رستوران زعفران، سرآشپز و ارزش‌های ما' };

const timeline = [
  ['۱۳۶۸', 'اولین چلوکبابی', 'حاج رضا رستگار با یک منقل در بازار تجریش شروع کرد.'],
  ['۱۳۸۲', 'خانه‌ای در الهیه', 'انتقال به یک خانه قدیمی با حوض و شاه‌نشین.'],
  ['۱۳۹۵', 'شب‌های موسیقی', 'آغاز اجراهای زنده موسیقی سنتی آخر هفته‌ها.'],
  ['۱۴۰۳', 'نسل سوم', 'سارا رستگار سرآشپز شد و منو را با احترام به سنت نو کرد.'],
];

export default (ctx) => html`
${pageHero(ctx, { title: 'داستان زعفران', callig: 'سه نسل، یک سفره', crumbs: ['داستان ما'] })}

<section class="section section--tight">
  <div class="container about">
    <div class="arch arch--tile about__arch" style="background-image:${girih('#e9c46a', 0.22)}"><div class="dish-stage">${dish('tahdig')}</div></div>
    <div class="stack" style="--gap:1.25rem">
      <h2 class="h-lg">آشپزی ما از <span class="gold">دیگ مسی</span> مادربزرگ شروع شد</h2>
      <p class="muted">در زعفران، برنج را هنوز آبکش می‌کنیم، خورش‌ها را روی شعله ملایم ساعت‌ها می‌پزیم و زعفران را با سنگ می‌ساییم. ما باور داریم غذای ایرانی عجله برنمی‌دارد.</p>
      <p class="muted">مواد اولیه‌مان را مستقیم از کشاورزان می‌خریم: برنج طارم از آمل، زعفران از قائنات، انار از ساوه و گردو از گیلان.</p>
      <dl class="stats">
        <div><dt>سال تجربه</dt><dd>${fa(36)}</dd></div>
        <div><dt>دستور اصیل</dt><dd>${fa(48)}</dd></div>
        <div><dt>مهمان در سال</dt><dd>${fa(90)}هزار</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="pattern" style="background-image:${girih()}"></div>
  <div class="container">
    <div class="section-head"><p class="callig">مسیر ما</p><h2>از تجریش تا الهیه</h2>${ornament()}</div>
    <ol class="timeline list-plain">
      ${timeline.map(([y, t, d]) => html`<li class="timeline__item" data-reveal><span class="timeline__year">${y}</span><div><h3>${t}</h3><p class="small muted">${d}</p></div></li>`)}
    </ol>
  </div>
</section>

<section class="section">
  <div class="container chef">
    <div class="stack" style="--gap:1.25rem">
      <p class="callig" style="font-size:var(--text-xl)">سرآشپز</p>
      <h2 class="h-lg">سارا رستگار</h2>
      <blockquote class="chef__quote">«هر غذا را طوری می‌پزم که پدربزرگم اگر بود، به آن افتخار کند؛ و طوری سرو می‌کنم که نسل امروز هم عاشقش شود.»</blockquote>
      <p class="muted small">دانش‌آموخته آشپزی از مدرسه لوکوردن‌بلو پاریس و برنده جایزه بهترین آشپز ایرانی ۱۴۰۴.</p>
    </div>
    <div class="chef__plates" aria-hidden="true">
      ${['fesenjan', 'sholeh', 'ghormeh'].map((k) => html`<div class="chef__plate">${dish(k)}</div>`)}
    </div>
  </div>
</section>`;
