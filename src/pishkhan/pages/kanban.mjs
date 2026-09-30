import { html, icon, fa } from '../../../tools/lib/html.mjs';
import { pageHead, avatar } from '../partials.mjs';
import { team } from '../data.mjs';

export const meta = { title: 'مدیریت پروژه', layout: 'app', active: 'kanban', description: 'بُرد کانبان با کشیدن و رها کردن کارها' };

const L = { design: ['طراحی', 't-accent'], dev: ['توسعه', 't-primary'], mkt: ['بازاریابی', 't-warning'], ops: ['عملیات', 't-success'], bug: ['باگ', 't-danger'] };

const cols = [
  { title: 'برای انجام', tone: 't-info', tasks: [
    { t: 'طراحی بنر جشنواره پاییزه برای صفحه اصلی', l: ['design', 'mkt'], due: '۱۲ مهر', c: 3, a: [0, 4] },
    { t: 'افزودن درگاه پرداخت اقساطی', l: ['dev'], due: '۲۰ مهر', c: 1, a: [1] },
    { t: 'نوشتن توضیحات سئو برای ۲۰ محصول جدید', l: ['mkt'], due: '۱۵ مهر', c: 0, a: [2] },
  ] },
  { title: 'در حال انجام', tone: 't-warning', tasks: [
    { t: 'بهینه‌سازی سرعت صفحه محصول در موبایل', l: ['dev'], due: '۱۰ مهر', c: 5, a: [1, 3], p: 60 },
    { t: 'عکاسی از کالکشن ساعت‌های هوشمند', l: ['design'], due: '۹ مهر', c: 2, a: [4], p: 30 },
  ] },
  { title: 'بازبینی', tone: 't-primary', tasks: [
    { t: 'رفع خطای محاسبه هزینه ارسال برای شهرستان‌ها', l: ['bug', 'dev'], due: '۸ مهر', c: 7, a: [3] },
    { t: 'کمپین پیامکی مشتریان وفادار', l: ['mkt'], due: '۱۱ مهر', c: 1, a: [0, 2, 5] },
  ] },
  { title: 'انجام‌شده', tone: 't-success', tasks: [
    { t: 'انبارگردانی شهریور', l: ['ops'], due: '۳۱ شهریور', c: 4, a: [5] },
    { t: 'قرارداد با شرکت پست پیشتاز', l: ['ops'], due: '۲۸ شهریور', c: 2, a: [0] },
  ] },
];

const task = (k) => html`<article class="task" draggable="true">
  <div class="task__labels">${k.l.map((x) => html`<span class="badge ${L[x][1]}">${L[x][0]}</span>`)}</div>
  <h3 class="task__title">${k.t}</h3>
  ${k.p ? html`<div class="progress progress--sm"><span style="--value:${k.p}%"></span></div>` : ''}
  <div class="task__foot">
    <span class="row">${icon('calendar')} ${k.due}</span>
    <span class="row">${icon('message-square')} ${fa(k.c)}</span>
    <div class="avatar-stack">${k.a.map((i) => avatar(team[i], 'xs'))}</div>
  </div>
  <div class="task__move">
    <button class="btn btn--sm btn--ghost" type="button" data-move="-1" aria-label="انتقال به ستون قبل">${icon('arrow-right')}</button>
    <button class="btn btn--sm btn--ghost" type="button" data-move="1" aria-label="انتقال به ستون بعد">${icon('arrow-left')}</button>
  </div>
</article>`;

export default (ctx) => html`
${pageHead(ctx, {
  title: 'پروژه: جشنواره پاییزه ۱۴۰۵',
  sub: 'کارها را بکشید و در ستون مناسب رها کنید',
  crumbs: [{ label: 'برنامه‌ها' }, { label: 'مدیریت پروژه' }],
  actions: html`
    <div class="avatar-stack">${team.slice(0, 4).map((n) => avatar(n, 'sm'))}<span class="avatar avatar--sm avatar--more">+${fa(2)}</span></div>
    <button class="btn" type="button" data-toast="لینک دعوت کپی شد">${icon('user-plus')} دعوت</button>`,
})}

<div class="kanban" data-kanban data-overflow-ok>
  ${cols.map(
    (c) => html`<section class="kanban__col" data-kanban-col data-title="${c.title}">
      <header class="kanban__head ${c.tone}"><h2>${c.title}</h2><span class="badge badge--count" data-kanban-count>${fa(c.tasks.length)}</span>
        <button class="icon-btn icon-btn--sm" type="button" aria-label="گزینه‌های ستون">${icon('ellipsis')}</button></header>
      <div class="kanban__list" data-kanban-list>${c.tasks.map(task)}</div>
      <form class="kanban__add" data-kanban-add><input class="input input--sm" placeholder="+ افزودن کار جدید" aria-label="افزودن کار به ${c.title}" /></form>
    </section>`
  )}
</div>
<template id="task-template">${task({ t: '', l: ['dev'], due: 'بدون موعد', c: 0, a: [0] })}</template>`;
