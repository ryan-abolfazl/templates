/* Light/dark theme. The inline script in <head> applies the saved theme before first paint;
   this wires up every [data-theme-toggle] button and fires a "themechange" event. */
(function () {
  'use strict';
  var root = document.documentElement;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    UI.$$('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  }

  UI.ready(function () {
    apply(root.getAttribute('data-theme') || 'light');
  });

  UI.on('click', '[data-theme-toggle]', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    UI.store.set('theme', next);
    document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
  });
})();
