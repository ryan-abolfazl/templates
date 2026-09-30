import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { TAG_CLASS } from '../partials.mjs';
import { CATS, menu } from '../data.mjs';
import { dish, girih } from '../art.mjs';

export const meta = { title: 'منوی دیجیتال', layout: 'blank', description: 'منوی موبایلی رستوران برای اسکن QR روی میز', bodyClass: 'qr-page' };

export default (ctx) => html`
<main id="main" class="qr">
  <header class="qr__head" style="background-image:${girih('#e9c46a', 0.16)}">
    <a class="logo" href="${ctx.base}index.html"><b>زعفران</b><span>منوی دیجیتال · میز ۱۲</span></a>
    <div class="row" style="justify-content:center;gap:.5rem">
      <span class="tag">${icon('wifi')} Zaferan-Guest</span>
      <button class="tag" type="button" data-theme-toggle aria-pressed="false">${icon('sun-moon')} تغییر پوسته</button>
    </div>
  </header>
  <nav class="qr__nav" data-qr-nav aria-label="دسته‌ها">
    ${CATS.map(([k, n, i]) => html`<a href="#q-${k}">${icon(i)} ${n}</a>`)}
  </nav>
  ${CATS.map(
    ([k, n]) => html`<section class="qr__section" id="q-${k}" data-qr-section aria-label="${n}">
      <h2>${n}</h2>
      ${menu
        .filter((m) => m.cat === k)
        .map(
          (m) => html`<article class="qr__item">
            <div class="qr__img">${dish(m.dish)}</div>
            <div class="qr__body">
              <div class="row-between" style="align-items:flex-start"><h3>${m.name}</h3><b class="gold qr__price">${fa(m.price / 1000)}</b></div>
              <p>${m.desc}</p>
              ${m.tags.length ? html`<div class="row wrap" style="gap:.3rem">${m.tags.map((t) => html`<span class="tag ${TAG_CLASS[t] || ''}">${t}</span>`)}</div>` : ''}
            </div>
          </article>`
        )}
    </section>`
  )}
  <footer class="qr__foot">
    <p class="callig">نوش جان</p>
    <p class="xs muted">قیمت‌ها به هزار تومان · برای سفارش، پیشخدمت را صدا بزنید</p>
    <button class="btn btn--gold btn--block" type="button" data-toast="پیشخدمت به‌زودی سر میز شما می‌آید">${icon('bell-ring')} صدا زدن پیشخدمت</button>
  </footer>
</main>`;
