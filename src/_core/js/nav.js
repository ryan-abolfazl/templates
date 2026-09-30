/* Navigation: off-canvas drawers, dropdowns, sticky header state, back-to-top.
   Drawer:   <button data-drawer-open="menu">  ...  <div id="menu" class="drawer" data-drawer> ... <button data-drawer-close>
   Dropdown: <div data-dropdown><button data-dropdown-toggle aria-expanded="false"></button><div data-dropdown-menu></div></div>
   Header:   <header data-sticky-header>  gets .is-scrolled after 10px of scroll */
(function () {
  'use strict';
  var lastTrigger = null;

  function openDrawer(drawer, trigger) {
    lastTrigger = trigger || document.activeElement;
    drawer.classList.add('is-open');
    drawer.removeAttribute('inert');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    UI.$$('[data-drawer-open="' + drawer.id + '"]').forEach(function (b) {
      b.setAttribute('aria-expanded', 'true');
    });
    var first = UI.focusable(drawer)[0];
    if (first) setTimeout(function () { first.focus(); }, 50);
  }

  function closeDrawer(drawer) {
    if (!drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.setAttribute('inert', '');
    if (!UI.$('[data-drawer].is-open')) document.body.classList.remove('is-locked');
    UI.$$('[data-drawer-open="' + drawer.id + '"]').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
    });
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
  }

  // data-drawer-media="(max-width: 1024px)": only a drawer while the query matches
  // (e.g. an app sidebar that is static on desktop).
  function syncDrawer(d) {
    var media = d.getAttribute('data-drawer-media');
    var active = !media || window.matchMedia(media).matches;
    if (!active) {
      d.classList.remove('is-open');
      d.removeAttribute('inert');
      d.removeAttribute('aria-hidden');
      if (!UI.$('[data-drawer].is-open')) document.body.classList.remove('is-locked');
    } else if (!d.classList.contains('is-open')) {
      d.setAttribute('aria-hidden', 'true');
      d.setAttribute('inert', '');
    }
  }

  UI.ready(function () {
    UI.$$('[data-drawer]').forEach(function (d) {
      syncDrawer(d);
      var media = d.getAttribute('data-drawer-media');
      if (media) window.matchMedia(media).addEventListener('change', function () { syncDrawer(d); });
    });
  });

  UI.on('click', '[data-drawer-open]', function (e, btn) {
    var d = document.getElementById(btn.getAttribute('data-drawer-open'));
    if (!d) return;
    e.preventDefault();
    d.classList.contains('is-open') ? closeDrawer(d) : openDrawer(d, btn);
  });

  UI.on('click', '[data-drawer-close]', function (e, btn) {
    var d = btn.closest('[data-drawer]') || document.getElementById(btn.getAttribute('data-drawer-close'));
    if (d) closeDrawer(d);
  });

  UI.on('click', '[data-drawer]', function (e, d) {
    if (e.target === d) closeDrawer(d); // click on the backdrop area
  });

  // Dropdowns
  function closeAllDropdowns(except) {
    UI.$$('[data-dropdown].is-open').forEach(function (dd) {
      if (dd === except) return;
      dd.classList.remove('is-open');
      var t = UI.$('[data-dropdown-toggle]', dd);
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  UI.on('click', '[data-dropdown-toggle]', function (e, btn) {
    e.preventDefault();
    var dd = btn.closest('[data-dropdown]');
    var open = !dd.classList.contains('is-open');
    closeAllDropdowns(dd);
    dd.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-dropdown]')) closeAllDropdowns();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeAllDropdowns();
    UI.$$('[data-drawer].is-open').forEach(closeDrawer);
  });

  // Sticky header + back-to-top
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    UI.$$('[data-sticky-header]').forEach(function (h) {
      h.classList.toggle('is-scrolled', y > 10);
    });
    UI.$$('[data-scroll-top]').forEach(function (b) {
      b.classList.toggle('is-visible', y > 600);
    });
    ticking = false;
  }
  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  UI.ready(onScroll);

  UI.on('click', '[data-scroll-top]', function () {
    window.scrollTo({ top: 0, behavior: UI.reducedMotion ? 'auto' : 'smooth' });
  });

  UI.drawer = { open: openDrawer, close: closeDrawer };
})();
