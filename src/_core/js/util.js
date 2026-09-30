/* Shared helpers exposed as window.UI. Every other core module builds on these. */
(function () {
  'use strict';

  var UI = (window.UI = window.UI || {});
  var FA = '۰۱۲۳۴۵۶۷۸۹';

  UI.$ = function (sel, root) {
    return (root || document).querySelector(sel);
  };
  UI.$$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  // 1234567 -> "۱٬۲۳۴٬۵۶۷", "12:30" -> "۱۲:۳۰"
  UI.fa = function (value) {
    if (typeof value === 'number') value = value.toLocaleString('en-US').replace(/,/g, '٬');
    return String(value).replace(/[0-9]/g, function (d) {
      return FA[d];
    });
  };

  // Persian/Arabic digits -> Latin (for parsing user input)
  UI.en = function (value) {
    return String(value)
      .replace(/[۰-۹]/g, function (d) {
        return FA.indexOf(d);
      })
      .replace(/[٠-٩]/g, function (d) {
        return d.charCodeAt(0) - 1632;
      })
      .replace(/[٬,]/g, '');
  };

  UI.toman = function (n) {
    return UI.fa(Math.round(n)) + ' تومان';
  };

  // Solar Hijri (Jalali) date formatting through the built-in Intl API
  UI.jdate = function (date, options) {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', options || { year: 'numeric', month: 'long', day: 'numeric' }).format(date || new Date());
  };

  // localStorage that never throws (private mode, blocked storage, file://)
  UI.store = {
    get: function (key, fallback) {
      try {
        var v = localStorage.getItem(key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        /* ignore */
      }
    },
  };

  UI.debounce = function (fn, wait) {
    var t;
    return function () {
      var args = arguments,
        self = this;
      clearTimeout(t);
      t = setTimeout(function () {
        fn.apply(self, args);
      }, wait || 150);
    };
  };

  UI.ready = function (fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };

  // Delegated events: UI.on('click', '[data-x]', function (e, el) {})
  UI.on = function (type, selector, handler, options) {
    document.addEventListener(
      type,
      function (e) {
        var el = e.target.closest && e.target.closest(selector);
        if (el) handler(e, el);
      },
      options
    );
  };

  UI.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  UI.focusable = function (root) {
    return UI.$$('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])', root);
  };

  // Copy to clipboard: <button data-copy="text">
  UI.on('click', '[data-copy]', function (e, el) {
    var text = el.getAttribute('data-copy');
    var done = function () {
      if (UI.toast) UI.toast('کپی شد', 'success');
    };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
  });
})();
