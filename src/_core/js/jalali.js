/* Solar Hijri (Jalali) calendar: conversion + date picker.
   Conversion algorithm after jalaali-js (MIT, Behrang Noruzi Niya).
   API:  UI.jalali.toJalali(date) -> {jy, jm, jd}
         UI.jalali.toGregorian(jy, jm, jd) -> Date
         UI.jalali.monthLength(jy, jm)
   Picker: <input data-datepicker> shows a popup calendar; value becomes "۱۴۰۵/۰۷/۰۸",
           data-gregorian gets the ISO date for your backend. */
(function () {
  'use strict';

  function div(a, b) { return ~~(a / b); }
  function mod(a, b) { return a - ~~(a / b) * b; }

  var BREAKS = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];

  function jalCal(jy) {
    var bl = BREAKS.length, gy = jy + 621, leapJ = -14, jp = BREAKS[0], jm, jump, leap, leapG, march, n, i;
    for (i = 1; i < bl; i += 1) {
      jm = BREAKS[i];
      jump = jm - jp;
      if (jy < jm) break;
      leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
      jp = jm;
    }
    n = jy - jp;
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
    leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
    march = 20 + leapJ - leapG;
    if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) leap = 4;
    return { leap: leap, gy: gy, march: march };
  }

  function g2d(gy, gm, gd) {
    var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
    return d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  }

  function d2g(jdn) {
    var j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    var i = div(mod(j, 1461), 4) * 5 + 308;
    var gd = div(mod(i, 153), 5) + 1;
    var gm = mod(div(i, 153), 12) + 1;
    var gy = div(j, 1461) - 100100 + div(8 - gm, 6);
    return { gy: gy, gm: gm, gd: gd };
  }

  function j2d(jy, jm, jd) {
    var r = jalCal(jy);
    return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
  }

  function d2j(jdn) {
    var gy = d2g(jdn).gy, jy = gy - 621, r = jalCal(jy), k = jdn - g2d(gy, 3, r.march);
    if (k >= 0) {
      if (k <= 185) return { jy: jy, jm: 1 + div(k, 31), jd: mod(k, 31) + 1 };
      k -= 186;
    } else {
      jy -= 1;
      k += 179;
      if (r.leap === 1) k += 1;
    }
    return { jy: jy, jm: 7 + div(k, 30), jd: mod(k, 30) + 1 };
  }

  var J = {
    MONTHS: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
    WEEKDAYS: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    toJalali: function (date) {
      date = date || new Date();
      return d2j(g2d(date.getFullYear(), date.getMonth() + 1, date.getDate()));
    },
    toGregorian: function (jy, jm, jd) {
      var g = d2g(j2d(jy, jm, jd));
      return new Date(g.gy, g.gm - 1, g.gd);
    },
    isLeap: function (jy) {
      return jalCal(jy).leap === 0;
    },
    monthLength: function (jy, jm) {
      if (jm <= 6) return 31;
      if (jm <= 11) return 30;
      return J.isLeap(jy) ? 30 : 29;
    },
    // Column of the 1st of the month in a Saturday-first week (0 = شنبه)
    firstWeekday: function (jy, jm) {
      return (J.toGregorian(jy, jm, 1).getDay() + 1) % 7;
    },
    format: function (jy, jm, jd) {
      var p = function (n) { return (n < 10 ? '0' : '') + n; };
      return UI.fa(jy + '/' + p(jm) + '/' + p(jd));
    },
  };
  UI.jalali = J;

  /* ---------- Date picker ---------- */
  var pop, input, view;

  function render() {
    var today = J.toJalali();
    var sel = input && input.dataset.jalali ? input.dataset.jalali.split('-').map(Number) : null;
    var len = J.monthLength(view.jy, view.jm);
    var start = J.firstWeekday(view.jy, view.jm);
    var html =
      '<div class="dp__head">' +
      '<button type="button" class="dp__nav" data-dp="-1" aria-label="ماه قبل"><svg class="icon"><use href="#i-chevron-right"></use></svg></button>' +
      '<strong>' + J.MONTHS[view.jm - 1] + ' ' + UI.fa(view.jy) + '</strong>' +
      '<button type="button" class="dp__nav" data-dp="1" aria-label="ماه بعد"><svg class="icon"><use href="#i-chevron-left"></use></svg></button>' +
      '</div><div class="dp__grid" role="grid">';
    J.WEEKDAYS.forEach(function (w, i) {
      html += '<span class="dp__wd' + (i === 6 ? ' is-holiday' : '') + '">' + w + '</span>';
    });
    for (var i = 0; i < start; i++) html += '<span></span>';
    for (var d = 1; d <= len; d++) {
      var cls = 'dp__day';
      if (today.jy === view.jy && today.jm === view.jm && today.jd === d) cls += ' is-today';
      if (sel && sel[0] === view.jy && sel[1] === view.jm && sel[2] === d) cls += ' is-selected';
      if ((start + d - 1) % 7 === 6) cls += ' is-holiday';
      html += '<button type="button" class="' + cls + '" data-day="' + d + '">' + UI.fa(d) + '</button>';
    }
    html += '</div><div class="dp__foot"><button type="button" data-dp-today>امروز</button></div>';
    pop.innerHTML = html;
  }

  function place() {
    var r = input.getBoundingClientRect();
    var w = pop.offsetWidth;
    var right = Math.min(window.innerWidth - r.right, window.innerWidth - w - 8);
    pop.style.top = r.bottom + window.scrollY + 6 + 'px';
    pop.style.right = Math.max(8, right) + 'px';
  }

  function open(el) {
    input = el;
    if (!pop) {
      pop = document.createElement('div');
      pop.className = 'dp';
      document.body.appendChild(pop);
      pop.addEventListener('mousedown', function (e) { e.preventDefault(); });
      pop.addEventListener('click', function (e) {
        var nav = e.target.closest('[data-dp]');
        var day = e.target.closest('[data-day]');
        if (nav) {
          view.jm += Number(nav.getAttribute('data-dp'));
          if (view.jm < 1) { view.jm = 12; view.jy--; }
          if (view.jm > 12) { view.jm = 1; view.jy++; }
          render();
        } else if (day) {
          pick(view.jy, view.jm, Number(day.getAttribute('data-day')));
        } else if (e.target.closest('[data-dp-today]')) {
          var t = J.toJalali();
          pick(t.jy, t.jm, t.jd);
        }
      });
    }
    var cur = input.dataset.jalali ? input.dataset.jalali.split('-').map(Number) : null;
    var t = J.toJalali();
    view = cur ? { jy: cur[0], jm: cur[1] } : { jy: t.jy, jm: t.jm };
    render();
    pop.classList.add('is-open');
    place();
  }

  function pick(jy, jm, jd) {
    input.value = J.format(jy, jm, jd);
    input.dataset.jalali = jy + '-' + jm + '-' + jd;
    var g = J.toGregorian(jy, jm, jd);
    input.dataset.gregorian = g.getFullYear() + '-' + String(g.getMonth() + 1).padStart(2, '0') + '-' + String(g.getDate()).padStart(2, '0');
    input.dispatchEvent(new Event('change', { bubbles: true }));
    close();
  }

  function close() {
    if (pop) pop.classList.remove('is-open');
  }

  UI.on('focusin', '[data-datepicker]', function (e, el) { open(el); });
  UI.on('click', '[data-datepicker]', function (e, el) { if (!pop || !pop.classList.contains('is-open')) open(el); });
  document.addEventListener('focusout', function (e) {
    if (e.target.matches && e.target.matches('[data-datepicker]')) setTimeout(close, 120);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', function () { if (pop && pop.classList.contains('is-open')) place(); });
})();
