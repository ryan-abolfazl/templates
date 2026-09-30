/* Accessible tabs.
   <div data-tabs>
     <div role="tablist"><button role="tab" aria-selected="true" aria-controls="p1" id="t1">…</button>…</div>
     <div role="tabpanel" id="p1" aria-labelledby="t1">…</div>
   </div>
   Arrow keys follow RTL: ArrowLeft = next, ArrowRight = previous. */
(function () {
  'use strict';

  function select(tab) {
    var root = tab.closest('[data-tabs]');
    var tabs = UI.$$('[role="tab"]', root).filter(function (t) {
      return t.closest('[data-tabs]') === root;
    });
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.setAttribute('tabindex', on ? '0' : '-1');
      t.classList.toggle('is-active', on);
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    root.dispatchEvent(new CustomEvent('tabchange', { detail: tab }));
  }

  UI.ready(function () {
    UI.$$('[data-tabs]').forEach(function (root) {
      var active = UI.$('[role="tab"][aria-selected="true"]', root) || UI.$('[role="tab"]', root);
      if (active) select(active);
    });
  });

  UI.on('click', '[data-tabs] [role="tab"]', function (e, tab) {
    select(tab);
  });

  UI.on('keydown', '[data-tabs] [role="tab"]', function (e, tab) {
    var rtl = document.documentElement.dir === 'rtl';
    var list = UI.$$('[role="tab"]', tab.closest('[role="tablist"]'));
    var i = list.indexOf(tab);
    var next = { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1 }[e.key];
    if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = list.length - 1;
    else if (next) i = (i + next + list.length) % list.length;
    else return;
    e.preventDefault();
    list[i].focus();
    select(list[i]);
  });
})();
