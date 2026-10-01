/* Danesh | template-specific behavior (needs core.js).
   1. Lesson player demo  2. Cart totals  3. Coupon  4. Checkout gateway select  5. Certificate lookup */
(function () {
  'use strict';
  var $ = UI.$, $$ = UI.$$;

  /* 1. Lesson player: fake playback with progress, speed and chapter switching */
  UI.ready(function () {
    var player = $('[data-player]');
    if (!player) return;
    var bar = $('[data-player-progress]', player);
    var time = $('[data-player-time]', player);
    var play = $('[data-player-play]', player);
    var dur = 17 * 60 + 40, pos = 676, timer = null;
    var fmt = function (s) { return UI.fa(String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0')); };
    var render = function () {
      bar.style.setProperty('--value', (pos / dur) * 100 + '%');
      time.textContent = fmt(pos) + ' / ' + fmt(dur);
    };
    var toggle = function () {
      var on = !timer;
      player.classList.toggle('is-playing', on);
      play.setAttribute('aria-label', on ? 'توقف' : 'پخش');
      $('use', play).setAttribute('href', on ? '#i-pause' : '#i-play');
      if (on) timer = setInterval(function () { pos = Math.min(dur, pos + 1); render(); }, 1000);
      else { clearInterval(timer); timer = null; }
    };
    play.addEventListener('click', toggle);
    $('[data-player-screen]', player).addEventListener('click', toggle);
    $('[data-player-track]', player).addEventListener('click', function (e) {
      var r = e.currentTarget.getBoundingClientRect();
      pos = Math.round(((r.right - e.clientX) / r.width) * dur); // RTL: progress grows from the right
      render();
    });
    UI.on('click', '[data-speed]', function (e, b) {
      var speeds = ['۱×', '۱٫۲۵×', '۱٫۵×', '۲×', '۰٫۷۵×'];
      var i = (speeds.indexOf(b.textContent.trim()) + 1) % speeds.length;
      b.textContent = speeds[i];
    });
    UI.on('click', '[data-lesson]', function (e, a) {
      e.preventDefault();
      $$('[data-lesson]').forEach(function (x) { x.classList.toggle('is-current', x === a); });
      $('[data-lesson-title]').textContent = a.getAttribute('data-lesson');
      pos = 0;
      render();
    });
    UI.on('click', '[data-complete]', function (e, b) {
      var cur = $('[data-lesson].is-current');
      if (cur) cur.classList.add('is-done');
      UI.toast('آفرین! این جلسه تکمیل شد', 'success');
    });
    render();
  });

  /* 2 + 3. Cart: quantity-less (courses), remove items, coupon */
  UI.ready(function () {
    var cart = $('[data-cart]');
    if (!cart) return;
    var discount = 0;
    var sum = function () {
      var items = $$('[data-cart-item]', cart);
      var subtotal = items.reduce(function (s, it) { return s + Number(it.getAttribute('data-price')); }, 0);
      var old = items.reduce(function (s, it) { return s + Number(it.getAttribute('data-old') || it.getAttribute('data-price')); }, 0);
      var total = Math.max(0, subtotal - discount);
      $('[data-sum-old]').textContent = UI.toman(old);
      $('[data-sum-save]').textContent = '− ' + UI.toman(old - subtotal + discount);
      $('[data-sum-total]').textContent = UI.toman(total);
      $('[data-sum-count]').textContent = UI.fa(items.length);
      $$('[data-cart-count]').forEach(function (c) { c.textContent = UI.fa(items.length); });
      $('[data-cart-empty]').hidden = items.length > 0;
    };
    UI.on('click', '[data-remove]', function (e, b) {
      var it = b.closest('[data-cart-item]');
      it.style.transition = 'opacity .25s, transform .25s';
      it.style.opacity = '0';
      it.style.transform = 'translateX(20px)';
      setTimeout(function () { it.remove(); sum(); }, 250);
      UI.toast('دوره از سبد حذف شد', 'info');
    });
    UI.on('submit', '[data-coupon]', function (e, f) {
      e.preventDefault();
      var code = $('input', f).value.trim().toUpperCase();
      if (code === 'MEHR40' || code === 'DANESH') {
        discount = 500000;
        UI.toast('کد تخفیف اعمال شد: ۵۰۰٬۰۰۰ تومان', 'success');
      } else {
        UI.toast('کد تخفیف معتبر نیست؛ MEHR40 را امتحان کنید', 'error');
      }
      sum();
    });
    sum();
  });

  /* 4. Payment gateway cards */
  UI.on('change', '[data-gateway] input', function (e, input) {
    $$('[data-gateway] label').forEach(function (l) { l.classList.toggle('is-active', l.contains(input)); });
  });

  /* 5. Certificate lookup */
  UI.on('submit', '[data-cert-form]', function (e, f) {
    e.preventDefault();
    var code = UI.en($('input', f).value.trim()).toUpperCase();
    var ok = /^DN-\d{4}-\d{4,}$/.test(code);
    $('[data-cert-ok]').hidden = !ok;
    $('[data-cert-bad]').hidden = ok;
    if (ok) $('[data-cert-code]').textContent = code;
  });
})();
