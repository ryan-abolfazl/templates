/* Scroll reveal: [data-reveal] fades up when it enters the viewport.
   [data-reveal-stagger] on a parent delays each [data-reveal] child by 80ms. */
(function () {
  'use strict';
  UI.ready(function () {
    UI.$$('[data-reveal-stagger]').forEach(function (parent) {
      var step = parseFloat(parent.getAttribute('data-reveal-stagger')) || 0.08;
      UI.$$('[data-reveal]', parent).forEach(function (el, i) {
        el.style.setProperty('--reveal-delay', (i * step).toFixed(2) + 's');
      });
    });
    var items = UI.$$('[data-reveal]');
    if (!('IntersectionObserver' in window) || UI.reducedMotion) {
      items.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  });
})();
