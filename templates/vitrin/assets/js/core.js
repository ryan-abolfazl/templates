/*! ویترین v1.0.0 | core UI helpers | vanilla JS, no dependencies */

/* ---- util.js ---- */
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

/* ---- theme.js ---- */
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

/* ---- nav.js ---- */
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

/* ---- tabs.js ---- */
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

/* ---- accordion.js ---- */
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

/* ---- modal.js ---- */
/* Modals on native <dialog>: <button data-modal-open="id">, <dialog id="id" class="modal"> … <button data-modal-close>.
   Clicking the backdrop closes the dialog. */
(function () {
  'use strict';

  UI.on('click', '[data-modal-open]', function (e, btn) {
    var d = document.getElementById(btn.getAttribute('data-modal-open'));
    if (d && d.showModal) {
      e.preventDefault();
      d.showModal();
      document.body.classList.add('is-locked');
    }
  });

  UI.on('click', '[data-modal-close]', function (e, btn) {
    var d = btn.closest('dialog');
    if (d) d.close();
  });

  document.addEventListener('click', function (e) {
    var d = e.target;
    if (d instanceof HTMLDialogElement && d.open) {
      var r = d.getBoundingClientRect();
      var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) d.close();
    }
  });

  document.addEventListener(
    'close',
    function (e) {
      if (e.target instanceof HTMLDialogElement && !UI.$('dialog[open]')) document.body.classList.remove('is-locked');
    },
    true
  );
})();

/* ---- toast.js ---- */
/* Toast notifications: UI.toast('پیام', 'success' | 'error' | 'info'), or <button data-toast="پیام" data-toast-type="success">.
   Uses an aria-live region so screen readers announce it. */
(function () {
  'use strict';
  var region;
  // Sprite icons used below (listed so the build bundles them): #i-circle-check #i-circle-alert #i-info #i-x
  var ICON = { success: 'circle-check', error: 'circle-alert', info: 'info' };

  function getRegion() {
    if (!region) {
      region = document.createElement('div');
      region.className = 'toast-region';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    return region;
  }

  UI.toast = function (message, type, timeout) {
    type = type || 'info';
    var el = document.createElement('div');
    el.className = 'toast toast--' + type;
    el.innerHTML =
      '<svg class="icon" aria-hidden="true"><use href="#i-' + ICON[type] + '"></use></svg><span></span>' +
      '<button type="button" class="toast__close" aria-label="بستن"><svg class="icon" aria-hidden="true"><use href="#i-x"></use></svg></button>';
    el.querySelector('span').textContent = message;
    getRegion().appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add('is-in');
    });
    var remove = function () {
      el.classList.remove('is-in');
      setTimeout(function () {
        el.remove();
      }, 300);
    };
    el.querySelector('button').addEventListener('click', remove);
    setTimeout(remove, timeout || 3500);
  };

  UI.on('click', '[data-toast]', function (e, el) {
    UI.toast(el.getAttribute('data-toast'), el.getAttribute('data-toast-type') || 'success');
  });
})();

/* ---- reveal.js ---- */
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

/* ---- carousel.js ---- */
/* Scroll-snap carousel, RTL aware.
   <div data-carousel [data-autoplay="5000"]>
     <div data-carousel-track> …slides… </div>
     <button data-carousel-prev> <button data-carousel-next>
     <div data-carousel-dots></div>   (optional)
   </div>
   The track is a normal horizontally scrolling element, so touch/trackpad swipe works natively. */
(function () {
  'use strict';

  function init(root) {
    var track = UI.$('[data-carousel-track]', root);
    if (!track) return;
    var rtl = getComputedStyle(track).direction === 'rtl';
    var slides = Array.prototype.slice.call(track.children);
    var dots = UI.$('[data-carousel-dots]', root);

    function step() {
      var s = slides[0];
      if (!s) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return s.getBoundingClientRect().width + gap;
    }

    function go(dir) {
      // dir 1 = next (visually leftwards in RTL)
      var max = track.scrollWidth - track.clientWidth;
      var pos = Math.abs(track.scrollLeft);
      if (dir > 0 && pos >= max - 4) return track.scrollTo({ left: 0, behavior: 'smooth' });
      track.scrollBy({ left: (rtl ? -1 : 1) * dir * step(), behavior: UI.reducedMotion ? 'auto' : 'smooth' });
    }

    UI.$$('[data-carousel-next]', root).forEach(function (b) {
      b.addEventListener('click', function () { go(1); });
    });
    UI.$$('[data-carousel-prev]', root).forEach(function (b) {
      b.addEventListener('click', function () { go(-1); });
    });

    if (dots) {
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'اسلاید ' + UI.fa(i + 1));
        b.addEventListener('click', function () {
          track.scrollTo({ left: (rtl ? -1 : 1) * i * step(), behavior: 'smooth' });
        });
        dots.appendChild(b);
      });
      var update = function () {
        var i = Math.round(Math.abs(track.scrollLeft) / step());
        UI.$$('button', dots).forEach(function (b, j) {
          b.classList.toggle('is-active', j === i);
          b.setAttribute('aria-current', j === i ? 'true' : 'false');
        });
      };
      track.addEventListener('scroll', UI.debounce(update, 60), { passive: true });
      update();
    }

    var ms = parseInt(root.getAttribute('data-autoplay'), 10);
    if (ms && !UI.reducedMotion) {
      var timer = setInterval(function () { go(1); }, ms);
      var stop = function () { clearInterval(timer); };
      root.addEventListener('pointerenter', stop);
      root.addEventListener('focusin', stop);
    }
  }

  UI.ready(function () {
    UI.$$('[data-carousel]').forEach(init);
  });
})();

/* ---- filter.js ---- */
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

/* ---- form.js ---- */
/* Forms: Persian validation messages, password reveal, OTP inputs, demo submit.
   <form data-validate data-success="پیام موفقیت">  fields use native attributes (required, type=email, minlength, pattern).
   Custom message: data-msg="…" on the field. Error text goes into the field's .field__error (created if missing).
   <button type="button" data-password-toggle> next to an <input type="password"> inside the same .field
   <div data-otp> with several <input maxlength="1"> auto-advances (RTL aware). */
(function () {
  'use strict';

  function message(input) {
    var v = input.validity;
    if (input.getAttribute('data-msg') && !v.valid) return input.getAttribute('data-msg');
    if (v.valueMissing) return input.type === 'checkbox' ? 'تأیید این گزینه الزامی است' : 'این فیلد الزامی است';
    if (v.typeMismatch && input.type === 'email') return 'یک ایمیل معتبر وارد کنید';
    if (v.typeMismatch && input.type === 'url') return 'یک آدرس اینترنتی معتبر وارد کنید';
    if (v.tooShort) return 'حداقل ' + UI.fa(input.minLength) + ' کاراکتر وارد کنید';
    if (v.patternMismatch) return 'قالب واردشده صحیح نیست';
    if (v.rangeUnderflow || v.rangeOverflow) return 'مقدار خارج از محدوده مجاز است';
    return '';
  }

  function errorEl(input) {
    var field = input.closest('.field') || input.parentElement;
    var el = UI.$('.field__error', field);
    if (!el) {
      el = document.createElement('p');
      el.className = 'field__error';
      el.id = (input.id || input.name || 'f' + Math.random().toString(36).slice(2)) + '-error';
      field.appendChild(el);
    }
    return el;
  }

  function check(input) {
    // Iranian mobile numbers: accept Persian digits
    if (input.type === 'tel' && input.value) input.value = UI.en(input.value);
    var msg = message(input);
    var el = errorEl(input);
    el.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (msg) input.setAttribute('aria-describedby', el.id);
    (input.closest('.field') || input.parentElement).classList.toggle('is-invalid', !!msg);
    return !msg;
  }

  UI.on('submit', 'form[data-validate]', function (e, form) {
    var fields = UI.$$('input, select, textarea', form).filter(function (f) { return f.willValidate; });
    var ok = fields.map(check).every(Boolean);
    if (!ok) {
      e.preventDefault();
      var first = UI.$('[aria-invalid="true"]', form);
      if (first) first.focus();
      return;
    }
    if (form.hasAttribute('data-success')) {
      e.preventDefault();
      var btn = UI.$('[type="submit"]', form);
      if (btn) btn.classList.add('is-loading');
      setTimeout(function () {
        if (btn) btn.classList.remove('is-loading');
        if (UI.toast) UI.toast(form.getAttribute('data-success'), 'success');
        if (form.getAttribute('data-redirect')) location.href = form.getAttribute('data-redirect');
        else form.reset();
        var dlg = form.closest('dialog');
        if (dlg && dlg.open) dlg.close();
      }, 700);
    }
  });

  UI.ready(function () {
    UI.$$('form[data-validate]').forEach(function (f) { f.setAttribute('novalidate', ''); });
  });

  document.addEventListener('blur', function (e) {
    var t = e.target;
    if (t.form && t.form.hasAttribute('data-validate') && t.willValidate && t.value) check(t);
  }, true);

  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.getAttribute && t.getAttribute('aria-invalid') === 'true') check(t);
  });

  // Password reveal
  UI.on('click', '[data-password-toggle]', function (e, btn) {
    var input = UI.$('input', btn.closest('.field') || btn.parentElement);
    if (!input) return;
    var show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.setAttribute('aria-pressed', String(show));
    btn.setAttribute('aria-label', show ? 'پنهان کردن رمز' : 'نمایش رمز');
    var use = UI.$('use', btn);
    if (use) use.setAttribute('href', show ? '#i-eye-off' : '#i-eye');
  });

  // OTP
  UI.on('input', '[data-otp] input', function (e, input) {
    input.value = UI.en(input.value).replace(/\D/g, '').slice(-1);
    if (input.value) {
      var next = input.nextElementSibling;
      if (next && next.tagName === 'INPUT') next.focus();
    }
  });
  UI.on('keydown', '[data-otp] input', function (e, input) {
    if (e.key === 'Backspace' && !input.value) {
      var prev = input.previousElementSibling;
      if (prev && prev.tagName === 'INPUT') prev.focus();
    }
  });
  UI.on('paste', '[data-otp] input', function (e, input) {
    var text = UI.en((e.clipboardData || window.clipboardData).getData('text')).replace(/\D/g, '');
    if (!text) return;
    e.preventDefault();
    var boxes = UI.$$('input', input.closest('[data-otp]'));
    boxes.forEach(function (b, i) { b.value = text[i] || ''; });
    (boxes[Math.min(text.length, boxes.length) - 1] || input).focus();
  });
})();

/* ---- commerce.js ---- */
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
