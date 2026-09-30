/* Accordion on native <details>. Inside [data-accordion="single"], opening one closes the others. */
(function () {
  'use strict';
  document.addEventListener(
    'toggle',
    function (e) {
      var d = e.target;
      if (!(d instanceof HTMLDetailsElement) || !d.open) return;
      var group = d.parentElement && d.parentElement.closest('[data-accordion="single"]');
      if (!group) return;
      UI.$$('details[open]', group).forEach(function (other) {
        if (other !== d && other.parentElement.closest('[data-accordion="single"]') === group) other.open = false;
      });
    },
    true
  );
})();
