/* Commerce helpers: quantity steppers, price range, countdown timers, demo cart badge.
   Quantity:  <div class="qty" data-qty><button data-qty-dec>−</button><input value="1" min="1" max="9"><button data-qty-inc>+</button></div>
   Range:     <div data-range data-min="0" data-max="5000000"><input type="range" data-range-min><input type="range" data-range-max>
              <output data-range-out-min></output><output data-range-out-max></output></div>
   Countdown: <div data-countdown data-hours="36"> <b data-unit="d"></b><b data-unit="h"></b><b data-unit="m"></b><b data-unit="s"></b></div>
              (data-hours = relative to page load so the demo never expires; or data-until="2026-12-31T23:59:59")
   Add to cart: <button data-add-to-cart> bumps every [data-cart-count] and shows a toast. */
(function () {
  'use strict';

  UI.on('click', '[data-qty-inc], [data-qty-dec]', function (e, btn) {
    var box = btn.closest('[data-qty]');
    var input = UI.$('input', box);
    var min = parseInt(input.min || '1', 10), max = parseInt(input.max || '99', 10);
    var v = parseInt(UI.en(input.value), 10) || min;
    v += btn.hasAttribute('data-qty-inc') ? 1 : -1;
    v = Math.max(min, Math.min(max, v));
    input.value = UI.fa(v);
    input.dataset.value = v;
    box.dispatchEvent(new CustomEvent('qtychange', { bubbles: true, detail: v }));
  });

  function initRange(root) {
    var lo = UI.$('[data-range-min]', root), hi = UI.$('[data-range-max]', root);
    var outLo = UI.$('[data-range-out-min]', root), outHi = UI.$('[data-range-out-max]', root);
    var min = +root.getAttribute('data-min'), max = +root.getAttribute('data-max');
    function sync(e) {
      if (+lo.value > +hi.value) {
        if (e && e.target === lo) lo.value = hi.value;
        else hi.value = lo.value;
      }
      root.style.setProperty('--lo', ((lo.value - min) / (max - min)) * 100 + '%');
      root.style.setProperty('--hi', ((hi.value - min) / (max - min)) * 100 + '%');
      if (outLo) outLo.textContent = UI.toman(+lo.value);
      if (outHi) outHi.textContent = UI.toman(+hi.value);
    }
    lo.addEventListener('input', sync);
    hi.addEventListener('input', sync);
    sync();
  }

  function initCountdown(el) {
    var end = el.getAttribute('data-until') ? new Date(el.getAttribute('data-until')).getTime() : Date.now() + (parseFloat(el.getAttribute('data-hours')) || 24) * 3600e3;
    var units = { d: 86400, h: 3600, m: 60, s: 1 };
    function tick() {
      var left = Math.max(0, Math.floor((end - Date.now()) / 1000));
      var hasDays = !!UI.$('[data-unit="d"]', el);
      UI.$$('[data-unit]', el).forEach(function (u) {
        var k = u.getAttribute('data-unit');
        var v = Math.floor(left / units[k]);
        if (k !== 'd' && (k !== 'h' || hasDays)) v = v % (k === 'h' ? 24 : 60);
        u.textContent = UI.fa(String(v).padStart(2, '0'));
      });
    }
    tick();
    setInterval(tick, 1000);
  }

  UI.on('click', '[data-add-to-cart]', function (e, btn) {
    e.preventDefault();
    UI.$$('[data-cart-count]').forEach(function (c) {
      var n = (parseInt(UI.en(c.textContent), 10) || 0) + 1;
      c.textContent = UI.fa(n);
      c.hidden = false;
      if (c.animate && !UI.reducedMotion) c.animate([{ transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 300 });
    });
    if (UI.toast) UI.toast(btn.getAttribute('data-add-to-cart') || 'به سبد خرید اضافه شد', 'success');
  });

  UI.on('click', '[data-wishlist]', function (e, btn) {
    e.preventDefault();
    var on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(on));
    if (UI.toast) UI.toast(on ? 'به علاقه‌مندی‌ها اضافه شد' : 'از علاقه‌مندی‌ها حذف شد', on ? 'success' : 'info');
  });

  UI.ready(function () {
    UI.$$('[data-range]').forEach(initRange);
    UI.$$('[data-countdown]').forEach(initCountdown);
  });
})();
