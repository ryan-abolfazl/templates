/*! رستوران زعفران v1.0.0 | core UI helpers | vanilla JS, no dependencies */

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

/* ---- counter.js ---- */
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

/* ---- lightbox.js ---- */
/* Lightbox gallery: <a href="big.jpg" data-lightbox="group" data-caption="…"><img …></a>
   Keyboard: Esc closes, arrows navigate (RTL aware). */
(function () {
  'use strict';
  var box, img, cap, items = [], index = 0;

  function build() {
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'نمایش تصویر');
    box.innerHTML =
      '<button type="button" class="lightbox__btn lightbox__close" aria-label="بستن"><svg class="icon"><use href="#i-x"></use></svg></button>' +
      '<button type="button" class="lightbox__btn lightbox__prev" aria-label="قبلی"><svg class="icon"><use href="#i-chevron-right"></use></svg></button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button type="button" class="lightbox__btn lightbox__next" aria-label="بعدی"><svg class="icon"><use href="#i-chevron-left"></use></svg></button>';
    document.body.appendChild(box);
    img = box.querySelector('img');
    cap = box.querySelector('figcaption');
    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.querySelector('.lightbox__prev').addEventListener('click', function () { show(index - 1); });
    box.querySelector('.lightbox__next').addEventListener('click', function () { show(index + 1); });
    box.addEventListener('click', function (e) {
      if (e.target === box) close();
    });
  }

  function show(i) {
    index = (i + items.length) % items.length;
    var a = items[index];
    img.src = a.getAttribute('href');
    img.alt = (a.querySelector('img') && a.querySelector('img').alt) || '';
    cap.textContent = a.getAttribute('data-caption') || '';
  }

  function close() {
    box.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  }

  UI.on('click', '[data-lightbox]', function (e, a) {
    e.preventDefault();
    if (!box) build();
    var group = a.getAttribute('data-lightbox');
    items = UI.$$('[data-lightbox="' + group + '"]').filter(function (el) {
      return !el.closest('[hidden]');
    });
    show(items.indexOf(a));
    box.classList.add('is-open');
    document.body.classList.add('is-locked');
    box.querySelector('.lightbox__close').focus();
  });

  document.addEventListener('keydown', function (e) {
    if (!box || !box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index + 1);
    if (e.key === 'ArrowRight') show(index - 1);
  });
})();

/* ---- jalali.js ---- */
/* Solar Hijri (Jalali) calendar: conversion + date picker.
   Conversion algorithm after jalaali-js (MIT, Behrang Noruzi Niya).
   API:  UI.jalali.toJalali(date) -> {jy, jm, jd}
         UI.jalali.toGregorian(jy, jm, jd) -> Date
         UI.jalali.monthLength(jy, jm)
   Picker: <input data-datepicker> shows a popup calendar; value becomes "۱۴۰۵/۰۷/۰۸",
           data-gregorian gets the ISO date for your backend. */
(function () {
  'use strict';

  function div(a, b) { return ~~(a / b); }
  function mod(a, b) { return a - ~~(a / b) * b; }

  var BREAKS = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];

  function jalCal(jy) {
    var bl = BREAKS.length, gy = jy + 621, leapJ = -14, jp = BREAKS[0], jm, jump, leap, leapG, march, n, i;
    for (i = 1; i < bl; i += 1) {
      jm = BREAKS[i];
      jump = jm - jp;
      if (jy < jm) break;
      leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
      jp = jm;
    }
    n = jy - jp;
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
    leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
    march = 20 + leapJ - leapG;
    if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) leap = 4;
    return { leap: leap, gy: gy, march: march };
  }

  function g2d(gy, gm, gd) {
    var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
    return d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  }

  function d2g(jdn) {
    var j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    var i = div(mod(j, 1461), 4) * 5 + 308;
    var gd = div(mod(i, 153), 5) + 1;
    var gm = mod(div(i, 153), 12) + 1;
    var gy = div(j, 1461) - 100100 + div(8 - gm, 6);
    return { gy: gy, gm: gm, gd: gd };
  }

  function j2d(jy, jm, jd) {
    var r = jalCal(jy);
    return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
  }

  function d2j(jdn) {
    var gy = d2g(jdn).gy, jy = gy - 621, r = jalCal(jy), k = jdn - g2d(gy, 3, r.march);
    if (k >= 0) {
      if (k <= 185) return { jy: jy, jm: 1 + div(k, 31), jd: mod(k, 31) + 1 };
      k -= 186;
    } else {
      jy -= 1;
      k += 179;
      if (r.leap === 1) k += 1;
    }
    return { jy: jy, jm: 7 + div(k, 30), jd: mod(k, 30) + 1 };
  }

  var J = {
    MONTHS: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
    WEEKDAYS: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    toJalali: function (date) {
      date = date || new Date();
      return d2j(g2d(date.getFullYear(), date.getMonth() + 1, date.getDate()));
    },
    toGregorian: function (jy, jm, jd) {
      var g = d2g(j2d(jy, jm, jd));
      return new Date(g.gy, g.gm - 1, g.gd);
    },
    isLeap: function (jy) {
      return jalCal(jy).leap === 0;
    },
    monthLength: function (jy, jm) {
      if (jm <= 6) return 31;
      if (jm <= 11) return 30;
      return J.isLeap(jy) ? 30 : 29;
    },
    // Column of the 1st of the month in a Saturday-first week (0 = شنبه)
    firstWeekday: function (jy, jm) {
      return (J.toGregorian(jy, jm, 1).getDay() + 1) % 7;
    },
    format: function (jy, jm, jd) {
      var p = function (n) { return (n < 10 ? '0' : '') + n; };
      return UI.fa(jy + '/' + p(jm) + '/' + p(jd));
    },
  };
  UI.jalali = J;

  /* ---------- Date picker ---------- */
  var pop, input, view;

  function render() {
    var today = J.toJalali();
    var sel = input && input.dataset.jalali ? input.dataset.jalali.split('-').map(Number) : null;
    var len = J.monthLength(view.jy, view.jm);
    var start = J.firstWeekday(view.jy, view.jm);
    var html =
      '<div class="dp__head">' +
      '<button type="button" class="dp__nav" data-dp="-1" aria-label="ماه قبل"><svg class="icon"><use href="#i-chevron-right"></use></svg></button>' +
      '<strong>' + J.MONTHS[view.jm - 1] + ' ' + UI.fa(String(view.jy)) + '</strong>' +
      '<button type="button" class="dp__nav" data-dp="1" aria-label="ماه بعد"><svg class="icon"><use href="#i-chevron-left"></use></svg></button>' +
      '</div><div class="dp__grid" role="grid">';
    J.WEEKDAYS.forEach(function (w, i) {
      html += '<span class="dp__wd' + (i === 6 ? ' is-holiday' : '') + '">' + w + '</span>';
    });
    for (var i = 0; i < start; i++) html += '<span></span>';
    for (var d = 1; d <= len; d++) {
      var cls = 'dp__day';
      if (today.jy === view.jy && today.jm === view.jm && today.jd === d) cls += ' is-today';
      if (sel && sel[0] === view.jy && sel[1] === view.jm && sel[2] === d) cls += ' is-selected';
      if ((start + d - 1) % 7 === 6) cls += ' is-holiday';
      html += '<button type="button" class="' + cls + '" data-day="' + d + '">' + UI.fa(d) + '</button>';
    }
    html += '</div><div class="dp__foot"><button type="button" data-dp-today>امروز</button></div>';
    pop.innerHTML = html;
  }

  function place() {
    var r = input.getBoundingClientRect();
    var w = pop.offsetWidth;
    var right = Math.min(window.innerWidth - r.right, window.innerWidth - w - 8);
    pop.style.top = r.bottom + window.scrollY + 6 + 'px';
    pop.style.right = Math.max(8, right) + 'px';
  }

  function open(el) {
    input = el;
    if (!pop) {
      pop = document.createElement('div');
      pop.className = 'dp';
      document.body.appendChild(pop);
      pop.addEventListener('mousedown', function (e) { e.preventDefault(); });
      pop.addEventListener('click', function (e) {
        var nav = e.target.closest('[data-dp]');
        var day = e.target.closest('[data-day]');
        if (nav) {
          view.jm += Number(nav.getAttribute('data-dp'));
          if (view.jm < 1) { view.jm = 12; view.jy--; }
          if (view.jm > 12) { view.jm = 1; view.jy++; }
          render();
        } else if (day) {
          pick(view.jy, view.jm, Number(day.getAttribute('data-day')));
        } else if (e.target.closest('[data-dp-today]')) {
          var t = J.toJalali();
          pick(t.jy, t.jm, t.jd);
        }
      });
    }
    var cur = input.dataset.jalali ? input.dataset.jalali.split('-').map(Number) : null;
    var t = J.toJalali();
    view = cur ? { jy: cur[0], jm: cur[1] } : { jy: t.jy, jm: t.jm };
    render();
    pop.classList.add('is-open');
    place();
  }

  function pick(jy, jm, jd) {
    input.value = J.format(jy, jm, jd);
    input.dataset.jalali = jy + '-' + jm + '-' + jd;
    var g = J.toGregorian(jy, jm, jd);
    input.dataset.gregorian = g.getFullYear() + '-' + String(g.getMonth() + 1).padStart(2, '0') + '-' + String(g.getDate()).padStart(2, '0');
    input.dispatchEvent(new Event('change', { bubbles: true }));
    close();
  }

  function close() {
    if (pop) pop.classList.remove('is-open');
  }

  UI.on('focusin', '[data-datepicker]', function (e, el) { open(el); });
  UI.on('click', '[data-datepicker]', function (e, el) { if (!pop || !pop.classList.contains('is-open')) open(el); });
  document.addEventListener('focusout', function (e) {
    if (e.target.matches && e.target.matches('[data-datepicker]')) setTimeout(close, 120);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', function () { if (pop && pop.classList.contains('is-open')) place(); });
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
