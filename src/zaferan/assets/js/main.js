/* Zaferan | template-specific behavior (needs core.js).
   1. Guest stepper  2. Reservation confirmation card  3. QR menu category scroll-spy */
(function () {
  'use strict';
  var $ = UI.$, $$ = UI.$$;

  /* 1. Guest count stepper */
  UI.on('click', '[data-step-btn]', function (e, b) {
    var box = b.closest('[data-stepper]');
    var input = $('input', box);
    var v = parseInt(UI.en(input.value), 10) || 2;
    v = Math.max(1, Math.min(40, v + Number(b.getAttribute('data-step-btn'))));
    input.value = UI.fa(v);
    var out = $('[data-guests-note]');
    if (out) out.hidden = v < 10;
  });

  /* 2. Reservation: after successful validation show a confirmation card */
  UI.ready(function () {
    var form = $('[data-reserve]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) return; // form.js displays the errors
      e.preventDefault();
      // readonly inputs are skipped by native validation, so check the date picker ourselves
      if (!$('#r-date').value) {
        UI.toast('لطفاً تاریخ رزرو را انتخاب کنید', 'error');
        $('#r-date').focus();
        return;
      }
      var btn = $('[type="submit"]', form);
      btn.classList.add('is-loading');
      setTimeout(function () {
        btn.classList.remove('is-loading');
        var card = $('[data-reserve-done]');
        $('[data-r-name]', card).textContent = $('#r-name').value;
        $('[data-r-when]', card).textContent = ($('#r-date').value || '—') + ' · ساعت ' + $('#r-time').value;
        $('[data-r-guests]', card).textContent = $('#r-guests').value + ' نفر';
        $('[data-r-area]', card).textContent = ($('input[name="area"]:checked') || { value: '—' }).value;
        $('[data-r-code]', card).textContent = 'ZF-' + Math.floor(1000 + Math.random() * 9000);
        form.hidden = true;
        card.hidden = false;
        card.scrollIntoView({ behavior: UI.reducedMotion ? 'auto' : 'smooth', block: 'center' });
        UI.toast('میز شما رزرو شد؛ پیامک تأیید ارسال می‌شود', 'success');
      }, 700);
    });
  });

  /* 3. QR menu: highlight the category chip for the section in view */
  UI.ready(function () {
    var nav = $('[data-qr-nav]');
    if (!nav || !('IntersectionObserver' in window)) return;
    var links = $$('a', nav);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + en.target.id;
          a.classList.toggle('is-active', on);
          if (on) a.scrollIntoView({ inline: 'center', block: 'nearest' });
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('[data-qr-section]').forEach(function (s) { io.observe(s); });
  });
})();
