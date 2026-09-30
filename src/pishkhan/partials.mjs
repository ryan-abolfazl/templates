import { html, icon, fa, cx } from '../../tools/lib/html.mjs';

export const NAV = [
  {
    title: 'اصلی',
    items: [
      { key: 'dashboard', href: 'index.html', icon: 'layout-dashboard', label: 'داشبورد فروش' },
      { key: 'analytics', href: 'analytics.html', icon: 'chart-spline', label: 'تحلیل‌ها' },
    ],
  },
  {
    title: 'فروشگاه',
    items: [
      { key: 'orders', href: 'orders.html', icon: 'shopping-cart', label: 'سفارش‌ها', badge: 12 },
      { key: 'products', href: 'products.html', icon: 'package', label: 'محصولات' },
      { key: 'product-form', href: 'product-form.html', icon: 'package-plus', label: 'افزودن محصول' },
      { key: 'customers', href: 'customers.html', icon: 'users', label: 'مشتریان' },
      { key: 'invoice', href: 'invoice.html', icon: 'receipt-text', label: 'فاکتور' },
    ],
  },
  {
    title: 'برنامه‌ها',
    items: [
      { key: 'chat', href: 'chat.html', icon: 'messages-square', label: 'پیام‌ها', badge: 3, tone: 't-accent' },
      { key: 'calendar', href: 'calendar.html', icon: 'calendar-days', label: 'تقویم شمسی' },
      { key: 'kanban', href: 'kanban.html', icon: 'square-kanban', label: 'مدیریت پروژه' },
    ],
  },
  {
    title: 'صفحات',
    items: [
      { key: 'profile', href: 'profile.html', icon: 'circle-user-round', label: 'پروفایل' },
      { key: 'settings', href: 'settings.html', icon: 'settings', label: 'تنظیمات' },
      {
        key: 'auth',
        icon: 'lock-keyhole',
        label: 'احراز هویت',
        children: [
          { href: 'login.html', label: 'ورود' },
          { href: 'register.html', label: 'ثبت‌نام' },
          { href: 'forgot-password.html', label: 'فراموشی رمز عبور' },
          { href: 'verify.html', label: 'تأیید کد یکبارمصرف' },
        ],
      },
      { key: 'components', href: 'components.html', icon: 'blocks', label: 'کامپوننت‌ها' },
      { key: '404', href: '404.html', icon: 'file-question', label: 'صفحه ۴۰۴' },
      { key: 'docs', href: 'documentation/index.html', icon: 'book-open', label: 'مستندات' },
    ],
  },
];

// Stable hue per name so monogram avatars keep their color between pages
export const hue = (name) => [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);

export const initials = (name) => {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0][0]}‌${parts[parts.length - 1][0]}` : parts[0].slice(0, 2);
};

export const avatar = (name, size = '', extra = '') =>
  html`<span class="${cx('avatar', size && `avatar--${size}`)}" style="--h:${hue(name)}" aria-hidden="true">${initials(name)}${extra}</span>`;

export const person = (name, meta, size = 'sm') => html`<div class="person">
  ${avatar(name, size)}
  <div><span class="person__name">${name}</span>${meta ? html`<span class="person__meta">${meta}</span>` : ''}</div>
</div>`;

export const STATUS = {
  delivered: ['تحویل‌شده', 't-success'],
  shipping: ['در حال ارسال', 't-info'],
  processing: ['در حال پردازش', 't-warning'],
  cancelled: ['لغوشده', 't-danger'],
  pending: ['در انتظار پرداخت', ''],
};

export const status = (key) => html`<span class="badge badge--dot ${STATUS[key][1]}">${STATUS[key][0]}</span>`;

export const brandMark = () => html`<span class="brand-mark" aria-hidden="true">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 20V10l8-6 8 6v10" /><path d="M9 20v-5.5a3 3 0 0 1 6 0V20" />
  </svg>
</span>`;

export const sidebar = (ctx) => html`
<aside class="sidebar" id="sidebar" data-drawer data-drawer-media="(max-width: 1100px)" aria-label="منوی اصلی">
  <div class="sidebar__brand">
    <a href="${ctx.base}index.html" class="row" aria-label="پیشخوان، صفحه اصلی">
      ${brandMark()}
      <span class="brand-name">پیشخوان<small>پنل مدیریت فروشگاه</small></span>
    </a>
    <button class="icon-btn sidebar__close" type="button" data-drawer-close aria-label="بستن منو">${icon('x')}</button>
  </div>
  <nav class="sidebar__scroll">
    ${NAV.map(
      (g) => html`<div class="nav-group">
        <p class="nav-group__title">${g.title}</p>
        ${g.items.map((it) =>
          it.children
            ? html`<details class="nav-sub" ${ctx.page.active === it.key ? 'open' : ''}>
                <summary title="${it.label}">${icon(it.icon)}<span>${it.label}</span>${icon('chevron-left', 'chev')}</summary>
                <div class="nav-sub__list">
                  ${it.children.map((c) => html`<a href="${ctx.base}${c.href}">${c.label}</a>`)}
                </div>
              </details>`
            : html`<a class="nav-link${ctx.nav(it.key)}" href="${ctx.base}${it.href}" title="${it.label}">
                ${icon(it.icon)}<span>${it.label}</span>
                ${it.badge ? html`<span class="badge badge--count badge--solid ${it.tone || 't-primary'}">${fa(it.badge)}</span>` : ''}
              </a>`
        )}
      </div>`
    )}
    <div class="sidebar__promo">
      <strong>نسخه حرفه‌ای</strong>
      <p>گزارش‌های پیشرفته، چند انبار و دسترسی تیمی.</p>
      <a class="btn btn--sm" href="${ctx.base}settings.html">ارتقای حساب</a>
    </div>
  </nav>
  <div class="sidebar__user">
    ${avatar('سارا محمدی', 'sm', '<span class="status"></span>')}
    <div><strong>سارا محمدی</strong><span>مدیر فروشگاه</span></div>
    <a class="icon-btn icon-btn--sm" href="${ctx.base}login.html" aria-label="خروج">${icon('log-out', 'icon-flip')}</a>
  </div>
</aside>
<div class="sidebar-backdrop" data-drawer-open="sidebar" aria-hidden="true"></div>`;

const notifications = [
  { icon: 'shopping-bag', tone: 't-primary', text: 'سفارش جدید <b>#۴۸۲۱</b> از علی رضایی ثبت شد.', time: '۲ دقیقه پیش', unread: true },
  { icon: 'triangle-alert', tone: 't-warning', text: 'موجودی «هدفون بی‌سیم نوا» به ۳ عدد رسید.', time: '۱ ساعت پیش', unread: true },
  { icon: 'message-circle', tone: 't-info', text: 'مریم احمدی به تیکت پشتیبانی پاسخ داد.', time: '۳ ساعت پیش' },
  { icon: 'circle-check', tone: 't-success', text: 'تسویه‌حساب هفتگی با موفقیت واریز شد.', time: 'دیروز' },
];

export const topbar = (ctx) => html`
<header class="topbar" data-sticky-header>
  <button class="icon-btn topbar__menu" type="button" data-drawer-open="sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="باز کردن منو">${icon('menu')}</button>
  <button class="icon-btn topbar__collapse" type="button" data-sidebar-collapse aria-label="جمع کردن منوی کناری">${icon('panel-right')}</button>
  <button class="search-trigger" type="button" data-modal-open="cmdk" aria-label="جستجو در پنل">
    ${icon('search')}<span>جستجو در پنل…</span><kbd>Ctrl K</kbd>
  </button>
  <div class="topbar__actions">
    <button class="icon-btn" type="button" data-theme-toggle aria-label="تغییر حالت روشن و تاریک" aria-pressed="false">
      ${icon('moon', 'theme-icon-light')}${icon('sun', 'theme-icon-dark')}
    </button>
    <div data-dropdown class="hide-sm">
      <button class="icon-btn" type="button" data-dropdown-toggle aria-expanded="false" aria-label="زبان">${icon('languages')}</button>
      <div class="dropdown-menu" data-dropdown-menu>
        <button type="button">${icon('check')} فارسی</button>
        <button type="button"><span class="icon"></span> English</button>
        <button type="button"><span class="icon"></span> العربية</button>
      </div>
    </div>
    <div data-dropdown>
      <button class="icon-btn" type="button" data-dropdown-toggle aria-expanded="false" aria-label="اعلان‌ها، ۲ مورد خوانده‌نشده">${icon('bell')}<span class="dot"></span></button>
      <div class="dropdown-menu notif-menu" data-dropdown-menu>
        <div class="notif-menu__head"><strong>اعلان‌ها</strong><span class="badge t-primary">${fa(2)} جدید</span></div>
        <div class="notif-list">
          ${notifications.map(
            (n) => html`<a href="${ctx.base}orders.html" class="notif ${n.unread ? 'is-unread' : ''}">
              <span class="thumb ${n.tone}" style="inline-size:2.25rem;block-size:2.25rem">${icon(n.icon)}</span>
              <span><p>${n.text}</p><time>${n.time}</time></span>
            </a>`
          )}
        </div>
        <a class="notif-menu__foot" href="${ctx.base}settings.html">مشاهده همه اعلان‌ها</a>
      </div>
    </div>
    <div data-dropdown>
      <button class="topbar__profile" type="button" data-dropdown-toggle aria-expanded="false">
        ${avatar('سارا محمدی', 'sm')}<span>سارا محمدی</span>${icon('chevron-down')}
      </button>
      <div class="dropdown-menu" data-dropdown-menu>
        <div class="dropdown-head"><strong>سارا محمدی</strong><span class="ltr">sara@pishkhan.ir</span></div>
        <hr />
        <a href="${ctx.base}profile.html">${icon('circle-user-round')} پروفایل من</a>
        <a href="${ctx.base}settings.html">${icon('settings')} تنظیمات حساب</a>
        <a href="${ctx.base}invoice.html">${icon('credit-card')} صورتحساب‌ها</a>
        <a href="${ctx.base}documentation/index.html">${icon('life-buoy')} راهنما و پشتیبانی</a>
        <hr />
        <a href="${ctx.base}login.html" class="danger">${icon('log-out', 'icon-flip')} خروج از حساب</a>
      </div>
    </div>
  </div>
</header>`;

export const appFooter = (ctx) => html`
<footer class="app-footer">
  <p>© ${fa('1405')} پیشخوان. طراحی‌شده با دقت برای فروشگاه‌های ایرانی.</p>
  <nav aria-label="پیوندهای پانویس">
    <a href="${ctx.base}documentation/index.html">مستندات</a>
    <a href="${ctx.base}settings.html">حریم خصوصی</a>
    <a href="${ctx.base}chat.html">پشتیبانی</a>
  </nav>
</footer>`;

export const commandPalette = (ctx) => {
  const items = NAV.flatMap((g) => g.items.filter((i) => i.href).map((i) => ({ ...i, group: g.title })));
  return html`
<dialog class="modal cmdk" id="cmdk" aria-label="جستجوی سریع">
  <div class="cmdk__search">
    ${icon('search')}
    <input type="search" placeholder="نام صفحه یا دستور را بنویسید…" aria-label="جستجو" data-cmdk-input autocomplete="off" />
    <kbd>Esc</kbd>
  </div>
  <div class="cmdk__list" data-cmdk-list role="listbox">
    ${[...new Set(items.map((i) => i.group))].map(
      (g) => html`<p class="cmdk__group">${g}</p>
        ${items
          .filter((i) => i.group === g)
          .map((i) => html`<a class="cmdk__item" role="option" href="${ctx.base}${i.href}" data-cmdk-item>${icon(i.icon)}<span>${i.label}</span></a>`)}`
    )}
    <p class="cmdk__group">دستورها</p>
    <button type="button" class="cmdk__item" role="option" data-cmdk-item data-theme-toggle>${icon('sun-moon')}<span>تغییر حالت روشن/تاریک</span></button>
    <a class="cmdk__item" role="option" href="${ctx.base}product-form.html" data-cmdk-item>${icon('plus')}<span>افزودن محصول جدید</span><kbd>N</kbd></a>
  </div>
  <div class="cmdk__foot"><span><kbd>↑</kbd> <kbd>↓</kbd> جابه‌جایی</span><span><kbd>Enter</kbd> انتخاب</span><span><kbd>Esc</kbd> بستن</span></div>
</dialog>`;
};

export const pageHead = (ctx, { title, sub, crumbs = [], actions = '' }) => html`
<div class="page-head">
  <div>
    <nav class="breadcrumb" aria-label="مسیر صفحه">
      <a href="${ctx.base}index.html">پیشخوان</a>
      ${crumbs.map((c) => html`${icon('chevron-left')}${c.href ? html`<a href="${ctx.base}${c.href}">${c.label}</a>` : html`<span aria-current="page">${c.label}</span>`}`)}
    </nav>
    <h1>${title}</h1>
    ${sub ? html`<p>${sub}</p>` : ''}
  </div>
  ${actions ? html`<div class="page-head__actions">${actions}</div>` : ''}
</div>`;

// Chart helper: JSON config in a data attribute
export const chart = (cfg, cls = '') => html`<div class="chart ${cls}" data-chart='${JSON.stringify(cfg).replace(/'/g, '&#39;')}'></div>`;

// Auth split layout
export const authShell = (ctx, { title, sub, body, aside = true }) => html`
<main id="main" class="auth">
  <section class="auth__panel">
    <a href="${ctx.base}index.html" class="auth__brand row">${brandMark()}<span class="brand-name">پیشخوان</span></a>
    <div class="auth__form">
      <h1>${title}</h1>
      <p class="muted">${sub}</p>
      ${body}
    </div>
    <p class="auth__foot xs faint">© ${fa('1405')} پیشخوان · <a href="${ctx.base}documentation/index.html">راهنما</a></p>
  </section>
  ${aside
    ? html`<aside class="auth__art" aria-hidden="true">
        <div class="auth__art-inner">
          <div class="auth__quote">
            <p>«از روزی که فروشگاهمان را با پیشخوان مدیریت می‌کنیم، گزارش‌های فروش را به‌جای یک روز، در یک نگاه می‌بینیم.»</p>
            <div class="person">${avatar('نیما کاظمی', 'sm')}<div><span class="person__name">نیما کاظمی</span><span class="person__meta">مدیر فروشگاه آنلاین آوا</span></div></div>
          </div>
          <div class="auth__cards">
            <div class="auth__mini card"><span class="kpi__label">فروش امروز</span><strong class="kpi__value">${fa(48.2).replace('.', '٫')} <small>میلیون</small></strong><span class="delta delta--up">${icon('trending-up')} ${fa(12)}٪</span></div>
            <div class="auth__mini card"><span class="kpi__label">سفارش جدید</span><strong class="kpi__value">${fa(126)}</strong><div class="progress progress--sm"><span style="--value:72%"></span></div></div>
          </div>
        </div>
      </aside>`
    : ''}
</main>`;
