/* Filterable grids (menus, portfolios, course lists).
   <div data-filter>
     <button data-filter-btn="*" aria-pressed="true">همه</button> <button data-filter-btn="kebab">…</button>
     <input data-filter-search>
     <div data-filter-item data-tags="kebab grill">…</div>
     <p data-filter-empty hidden>موردی یافت نشد</p>
   </div> */
(function () {
  'use strict';

  function init(root) {
    var items = UI.$$('[data-filter-item]', root);
    var empty = UI.$('[data-filter-empty]', root);
    var count = UI.$('[data-filter-count]', root);
    var tag = '*';
    var q = '';

    function apply() {
      var shown = 0;
      items.forEach(function (it) {
        var tags = (it.getAttribute('data-tags') || '').split(/\s+/);
        var ok = (tag === '*' || tags.indexOf(tag) !== -1) && (!q || UI.en(it.textContent).toLowerCase().indexOf(q) !== -1);
        it.hidden = !ok;
        if (ok) {
          shown++;
          if (!UI.reducedMotion && it.animate) it.animate([{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 280, easing: 'ease-out' });
        }
      });
      if (empty) empty.hidden = shown > 0;
      if (count) count.textContent = UI.fa(shown);
    }

    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter-btn]');
      if (!b || b.closest('[data-filter]') !== root) return;
      tag = b.getAttribute('data-filter-btn');
      UI.$$('[data-filter-btn]', root).forEach(function (x) {
        x.setAttribute('aria-pressed', String(x === b));
        x.classList.toggle('is-active', x === b);
      });
      apply();
    });

    var s = UI.$('[data-filter-search]', root);
    if (s) s.addEventListener('input', UI.debounce(function () {
      q = UI.en(s.value.trim()).toLowerCase();
      apply();
    }, 120));
  }

  UI.ready(function () {
    UI.$$('[data-filter]').forEach(init);
  });
})();
