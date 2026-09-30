/* Labkhand | template-specific behavior (needs core.js).
   1. Booking wizard (steps, time slots, summary)  2. Service price estimator */
(function () {
  'use strict';
  var $ = UI.$, $$ = UI.$$;

  /* 1. Booking wizard */
  UI.ready(function () {
    var wiz = $('[data-wizard]');
    if (!wiz) return;
    var steps = $$('[data-step]', wiz);
    var dots = $$('[data-step-dot]', wiz);
    var i = 0;
    var show = function (n) {
      i = Math.max(0, Math.min(steps.length - 1, n));
      steps.forEach(function (s, k) { s.hidden = k !== i; });
      dots.forEach(function (d, k) {
        d.classList.toggle('is-done', k < i);
        d.classList.toggle('is-current', k === i);
        d.setAttribute('aria-current', k === i ? 'step' : 'false');
      });
      var last = i === steps.length - 1;
      var next = $('[data-next]', wiz);
      next.type = last ? 'submit' : 'button';
      next.innerHTML = last ? 'ثبت نهایی نوبت <svg class="icon" aria-hidden="true"><use href="#i-check"></use></svg>' : 'بعدی <svg class="icon" aria-hidden="true"><use href="#i-arrow-left"></use></svg>';
      $('[data-prev]', wiz).style.visibility = i === 0 ? 'hidden' : 'visible';
      // Move focus to the step heading (not the first field, which would pop the date picker open)
      var legend = $('legend', steps[i]);
      if (legend && n !== undefined && document.activeElement !== document.body) {
        legend.setAttribute('tabindex', '-1');
        legend.focus({ preventScroll: true });
      }
      wiz.scrollIntoView({ behavior: UI.reducedMotion ? 'auto' : 'smooth', block: 'start' });
      summary();
    };
    var valid = function () {
      var step = steps[i];
      var need = step.getAttribute('data-need');
      if (need === 'service' && !$('input[name="service"]:checked', step)) return 'لطفاً یک خدمت را انتخاب کنید';
      if (need === 'time') {
        if (!$('[data-datepicker]', step).value) return 'لطفاً روز مراجعه را انتخاب کنید';
        if (!$('input[name="slot"]:checked', step)) return 'لطفاً ساعت مراجعه را انتخاب کنید';
      }
      return '';
    };
    var summary = function () {
      var get = function (sel) { var el = $(sel, wiz); return el ? el : null; };
      var s = get('input[name="service"]:checked');
      var d = get('input[name="doctor"]:checked');
      var date = get('[data-datepicker]');
      var slot = get('input[name="slot"]:checked');
      $$('[data-sum="service"]').forEach(function (o) { o.textContent = s ? s.value : '—'; });
      $$('[data-sum="doctor"]').forEach(function (o) { o.textContent = d ? d.value : 'اولین پزشک در دسترس'; });
      $$('[data-sum="when"]').forEach(function (o) { o.textContent = date && date.value ? date.value + (slot ? ' · ساعت ' + slot.value : '') : '—'; });
    };
    UI.on('click', '[data-next]', function (e, btn) {
      if (btn.type === 'submit') return; // last step: let the form submit
      var msg = valid();
      if (msg) return UI.toast(msg, 'error');
      show(i + 1);
    });
    UI.on('click', '[data-prev]', function () { show(i - 1); });
    wiz.addEventListener('change', summary);
    // Regenerate slots when the day changes, marking some as taken
    wiz.addEventListener('change', function (e) {
      if (!e.target.matches('[data-datepicker]')) return;
      var box = $('[data-slots]', wiz);
      var seed = Number((e.target.dataset.jalali || '1').split('-').pop());
      $$('input', box).forEach(function (inp, k) {
        inp.checked = false;
        inp.disabled = (k * 7 + seed) % 5 === 0;
      });
      box.hidden = false;
      $('[data-slots-hint]', wiz).hidden = true;
    });
    wiz.addEventListener('submit', function (e) {
      if (wiz.hasAttribute('data-validate') && !wiz.checkValidity()) return; // form.js shows errors
      e.preventDefault();
      var code = 'LB-' + String(Math.floor(1000 + Math.random() * 9000));
      $('[data-code]', wiz).textContent = code;
      steps.forEach(function (s) { s.hidden = true; });
      $('[data-step-nav]', wiz).hidden = true;
      $('[data-done]', wiz).hidden = false;
      dots.forEach(function (d) { d.classList.add('is-done'); d.classList.remove('is-current'); });
      UI.toast('نوبت شما با موفقیت ثبت شد', 'success');
    });
    show(0);
  });

  /* 2. Price estimator on pricing page */
  UI.ready(function () {
    var est = $('[data-estimator]');
    if (!est) return;
    var out = $('[data-est-total]', est);
    var calc = function () {
      var total = 0;
      $$('input:checked', est).forEach(function (c) {
        var qty = c.closest('label').querySelector('[data-est-qty]');
        total += Number(c.value) * (qty ? Number(qty.value) || 1 : 1);
      });
      var ins = $('[data-est-insurance]', est);
      var cover = ins ? Number(ins.value) : 0;
      $('[data-est-cover]', est).textContent = UI.toman(total * cover);
      out.textContent = UI.toman(total * (1 - cover));
    };
    est.addEventListener('input', calc);
    est.addEventListener('change', calc);
    calc();
  });
})();
