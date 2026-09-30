/* Vitrin | template-specific behavior (needs core.js).
   1. Product gallery  2. Color & size selection  3. Cart page totals
   4. Shop filter drawer (mobile)  5. Compare remove */
(function () {
  'use strict';
  var $ = UI.$, $$ = UI.$$;

  /* 1. Gallery: thumbnails swap the main view */
  UI.on('click', '[data-thumb]', function (e, btn) {
    var gallery = btn.closest('[data-gallery]');
    var main = $('[data-gallery-main]', gallery);
    main.innerHTML = $('template', btn).innerHTML;
    $$('[data-thumb]', gallery).forEach(function (b) { b.setAttribute('aria-current', String(b === btn)); });
  });

  /* 2. Color picker: tint the gallery; show selected names */
  UI.on('change', '[data-color-pick] input', function (e, input) {
    var hex = input.getAttribute('data-hex');
    $$('[data-gallery] .garment').forEach(function (g) { g.style.color = hex; });
    var out = $('[data-color-name]');
    if (out) out.textContent = input.value;
  });
  UI.on('change', '[data-size-pick] input', function (e, input) {
    var out = $('[data-size-name]');
    if (out) out.textContent = input.value;
  });
  UI.on('click', '[data-require-size]', function (e, btn) {
    if (!$('[data-size-pick] input:checked')) {
      e.stopImmediatePropagation();
      e.preventDefault();
      UI.toast('لطفاً ابتدا سایز را انتخاب کنید', 'error');
      $('[data-size-pick]').scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, true);

  /* 3. Cart page: line totals, subtotal, free-shipping meter */
  UI.ready(function () {
    var cart = $('[data-cart-page]');
    if (!cart) return;
    var FREE = 2000000;
    var update = function () {
      var sum = 0, count = 0;
      $$('[data-line]', cart).forEach(function (line) {
        var q = parseInt(UI.en($('input', line).value), 10) || 1;
        var p = Number(line.getAttribute('data-price'));
        $('[data-line-total]', line).textContent = UI.fa(p * q);
        sum += p * q;
        count += q;
      });
      var ship = sum >= FREE || sum === 0 ? 0 : 95000;
      $('[data-subtotal]').textContent = UI.toman(sum);
      $('[data-shipping]').textContent = ship ? UI.toman(ship) : 'رایگان';
      $('[data-total]').textContent = UI.toman(sum + ship);
      $$('[data-cart-count]').forEach(function (c) { c.textContent = UI.fa(count); });
      var meter = $('[data-meter]');
      if (meter) {
        meter.style.setProperty('--value', Math.min(100, (sum / FREE) * 100) + '%');
        $('[data-meter-text]').innerHTML = sum >= FREE ? 'ارسال سفارش شما <b>رایگان</b> است 🎉' : 'فقط <b>' + UI.toman(FREE - sum) + '</b> تا ارسال رایگان';
      }
      $('[data-cart-empty]').hidden = $$('[data-line]', cart).length > 0;
    };
    cart.addEventListener('qtychange', update);
    UI.on('click', '[data-line-remove]', function (e, b) {
      var line = b.closest('[data-line]');
      line.style.transition = 'opacity .3s';
      line.style.opacity = '0';
      setTimeout(function () { line.remove(); update(); }, 300);
    });
    update();
  });

  /* 5. Compare: remove a column */
  UI.on('click', '[data-compare-remove]', function (e, b) {
    var i = Number(b.getAttribute('data-compare-remove'));
    $$('[data-compare-table] tr').forEach(function (tr) {
      var cell = tr.children[i];
      if (cell) cell.remove();
    });
    UI.toast('محصول از مقایسه حذف شد', 'info');
  });
})();
