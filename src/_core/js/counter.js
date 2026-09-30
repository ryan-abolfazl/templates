/* Animated counters: <span data-count-to="12500" data-count-suffix="+">۰</span>
   Counts up once when visible and renders Persian digits. */
(function () {
  'use strict';
  function run(el) {
    var to = parseFloat(el.getAttribute('data-count-to'));
    var dec = (el.getAttribute('data-count-to').split('.')[1] || '').length;
    var suffix = el.getAttribute('data-count-suffix') || '';
    var start = null;
    var dur = 1400;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var v = to * eased;
      el.textContent = UI.fa(dec ? Number(v.toFixed(dec)) : Math.round(v)) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    if (UI.reducedMotion) el.textContent = UI.fa(to) + suffix;
    else requestAnimationFrame(frame);
  }
  UI.ready(function () {
    var els = UI.$$('[data-count-to]');
    if (!('IntersectionObserver' in window)) return els.forEach(run);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          run(e.target);
          io.unobserve(e.target);
        }
      });
    });
    els.forEach(function (el) {
      io.observe(el);
    });
  });
})();
