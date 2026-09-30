/* Pishkhan | template-specific behavior (needs core.js).
   1. Sidebar collapse   2. Command palette (Ctrl/⌘ K)   3. Segmented buttons   4. Today's Jalali date
   5. Kanban drag & drop 6. Calendar                     7. Chat                8. Dropzone preview
   9. Grid/list view toggle */
(function () {
  'use strict';
  var $ = UI.$, $$ = UI.$$;

  /* 1. Sidebar collapse (desktop), remembered between pages */
  UI.on('click', '[data-sidebar-collapse]', function () {
    var on = document.documentElement.classList.toggle('sidebar-collapsed');
    UI.store.set('pishkhan-sidebar', on);
    setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 320);
  });

  /* 2. Command palette */
  var cmdk = $('#cmdk');
  if (cmdk) {
    var input = $('[data-cmdk-input]', cmdk);
    var items = $$('[data-cmdk-item]', cmdk);
    var active = 0;
    var visible = function () { return items.filter(function (i) { return !i.hidden; }); };
    var highlight = function (i) {
      var v = visible();
      active = (i + v.length) % Math.max(v.length, 1);
      v.forEach(function (el, j) {
        el.classList.toggle('is-active', j === active);
        el.setAttribute('aria-selected', String(j === active));
      });
      if (v[active]) v[active].scrollIntoView({ block: 'nearest' });
    };
    var open = function () {
      if (!cmdk.open) {
        cmdk.showModal();
        input.value = '';
        items.forEach(function (i) { i.hidden = false; });
        highlight(0);
        setTimeout(function () { input.focus(); }, 20);
      }
    };
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K' || e.key === 'ن')) {
        e.preventDefault();
        open();
      }
    });
    cmdk.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); highlight(active + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); highlight(active - 1); }
      if (e.key === 'Enter') {
        var v = visible()[active];
        if (v) { e.preventDefault(); v.click(); cmdk.close(); }
      }
    });
    input.addEventListener('input', function () {
      var q = input.value.trim();
      items.forEach(function (i) { i.hidden = q && i.textContent.indexOf(q) === -1; });
      $$('.cmdk__group', cmdk).forEach(function (g) {
        var n = g.nextElementSibling, any = false;
        while (n && !n.classList.contains('cmdk__group')) { if (!n.hidden) any = true; n = n.nextElementSibling; }
        g.hidden = !any;
      });
      highlight(0);
    });
    $$('[data-modal-open="cmdk"]').forEach(function (b) {
      b.addEventListener('click', function () { setTimeout(function () { input.focus(); highlight(0); }, 20); });
    });
  }

  /* 3. Segmented buttons (.btn-group): single selection */
  UI.on('click', '.btn-group button', function (e, btn) {
    $$('button', btn.parentElement).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
  });

  /* 4. Today's date in Jalali */
  UI.ready(function () {
    $$('[data-today]').forEach(function (el) {
      el.textContent = 'امروز ' + UI.jdate(new Date(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    });
  });

  /* 5. Kanban: native HTML5 drag & drop + keyboard move buttons */
  UI.ready(function () {
    var board = $('[data-kanban]');
    if (!board) return;
    var dragged = null;
    var sync = function () {
      $$('[data-kanban-col]', board).forEach(function (col) {
        var c = $('[data-kanban-count]', col);
        if (c) c.textContent = UI.fa($$('.task', col).length);
      });
    };
    board.addEventListener('dragstart', function (e) {
      var t = e.target.closest('.task');
      if (!t) return;
      dragged = t;
      t.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', '');
    });
    board.addEventListener('dragend', function () {
      if (dragged) dragged.classList.remove('is-dragging');
      $$('.is-over', board).forEach(function (c) { c.classList.remove('is-over'); });
      dragged = null;
      sync();
    });
    board.addEventListener('dragover', function (e) {
      var list = e.target.closest('[data-kanban-list]');
      if (!list || !dragged) return;
      e.preventDefault();
      list.classList.add('is-over');
      var after = $$('.task:not(.is-dragging)', list).find(function (t) {
        var r = t.getBoundingClientRect();
        return e.clientY < r.top + r.height / 2;
      });
      if (after) list.insertBefore(dragged, after);
      else list.appendChild(dragged);
    });
    board.addEventListener('dragleave', function (e) {
      var list = e.target.closest('[data-kanban-list]');
      if (list && !list.contains(e.relatedTarget)) list.classList.remove('is-over');
    });
    board.addEventListener('drop', function (e) { e.preventDefault(); });
    // keyboard alternative
    UI.on('click', '[data-move]', function (e, btn) {
      var task = btn.closest('.task');
      var cols = $$('[data-kanban-list]', board);
      var i = cols.indexOf(task.closest('[data-kanban-list]'));
      var next = cols[i + Number(btn.getAttribute('data-move'))];
      if (next) {
        next.appendChild(task);
        btn.focus();
        sync();
        UI.toast('کار به ستون «' + next.closest('[data-kanban-col]').getAttribute('data-title') + '» منتقل شد', 'info');
      }
    });
    UI.on('submit', '[data-kanban-add]', function (e, form) {
      e.preventDefault();
      var input = $('input', form);
      if (!input.value.trim()) return;
      var list = $('[data-kanban-list]', form.closest('[data-kanban-col]'));
      var tpl = $('#task-template');
      var node = tpl.content.firstElementChild.cloneNode(true);
      $('.task__title', node).textContent = input.value.trim();
      list.appendChild(node);
      input.value = '';
      sync();
    });
  });

  /* 6. Calendar: Jalali month grid with demo events around "today" */
  UI.ready(function () {
    var cal = $('[data-calendar]');
    if (!cal) return;
    var J = UI.jalali;
    var grid = $('[data-cal-grid]', cal);
    var title = $('[data-cal-title]', cal);
    var t = J.toJalali();
    var view = { jy: t.jy, jm: t.jm };
    var EVENTS = JSON.parse($('#calendar-events').textContent);
    // Demo events are stored as day offsets from today so the calendar always looks populated
    var dated = EVENTS.map(function (ev) {
      var d = new Date();
      d.setDate(d.getDate() + ev.offset);
      var j = J.toJalali(d);
      return { jy: j.jy, jm: j.jm, jd: j.jd, title: ev.title, tone: ev.tone, time: ev.time };
    });
    function render() {
      title.textContent = J.MONTHS[view.jm - 1] + ' ' + UI.fa(String(view.jy));
      var len = J.monthLength(view.jy, view.jm);
      var start = J.firstWeekday(view.jy, view.jm);
      var prevLen = J.monthLength(view.jm === 1 ? view.jy - 1 : view.jy, view.jm === 1 ? 12 : view.jm - 1);
      var cells = '';
      var total = Math.ceil((start + len) / 7) * 7;
      for (var i = 0; i < total; i++) {
        var d = i - start + 1;
        var out = d < 1 || d > len;
        var num = d < 1 ? prevLen + d : d > len ? d - len : d;
        var cls = 'cal__day' + (out ? ' is-out' : '') + (i % 7 === 6 ? ' is-holiday' : '');
        if (!out && t.jy === view.jy && t.jm === view.jm && t.jd === d) cls += ' is-today';
        var evs = out ? [] : dated.filter(function (ev) { return ev.jy === view.jy && ev.jm === view.jm && ev.jd === d; });
        cells +=
          '<div class="' + cls + '"><span class="cal__num">' + UI.fa(num) + '</span>' +
          evs.map(function (ev) {
            return '<button type="button" class="cal__event ' + ev.tone + '" data-modal-open="event-modal" data-event-title="' + ev.title + '" data-event-time="' + ev.time + '"><b>' + UI.fa(ev.time) + '</b> ' + ev.title + '</button>';
          }).join('') + '</div>';
      }
      grid.innerHTML = cells;
    }
    UI.on('click', '[data-cal-nav]', function (e, b) {
      var step = Number(b.getAttribute('data-cal-nav'));
      if (step === 0) { view = { jy: t.jy, jm: t.jm }; }
      else {
        view.jm += step;
        if (view.jm < 1) { view.jm = 12; view.jy--; }
        if (view.jm > 12) { view.jm = 1; view.jy++; }
      }
      render();
    });
    UI.on('click', '[data-event-title]', function (e, b) {
      var m = $('#event-modal');
      $('[data-event-name]', m).textContent = b.getAttribute('data-event-title');
      $('[data-event-when]', m).textContent = 'ساعت ' + UI.fa(b.getAttribute('data-event-time'));
    });
    render();
  });

  /* 7. Chat: send a message, fake reply */
  UI.ready(function () {
    var form = $('[data-chat-form]');
    if (!form) return;
    var thread = $('[data-chat-thread]');
    var input = $('input', form);
    var bubble = function (text, mine) {
      var now = new Date();
      var el = document.createElement('div');
      el.className = 'msg' + (mine ? ' msg--me' : '');
      el.innerHTML = '<div class="msg__bubble"></div><time>' + UI.fa(String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0')) + '</time>';
      el.querySelector('.msg__bubble').textContent = text;
      thread.appendChild(el);
      thread.scrollTop = thread.scrollHeight;
    };
    thread.scrollTop = thread.scrollHeight;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      bubble(v, true);
      input.value = '';
      var typing = $('[data-typing]');
      if (typing) typing.hidden = false;
      setTimeout(function () {
        if (typing) typing.hidden = true;
        bubble('ممنون از پیامت! بررسی می‌کنم و تا چند دقیقه دیگر خبر می‌دهم.', false);
      }, 1400);
    });
    UI.on('click', '[data-chat-open]', function () {
      document.documentElement.classList.add('chat-open');
    });
    UI.on('click', '[data-chat-back]', function () {
      document.documentElement.classList.remove('chat-open');
    });
  });

  /* 8. Dropzone: preview chosen images */
  UI.ready(function () {
    $$('[data-dropzone]').forEach(function (zone) {
      var input = $('input[type="file"]', zone);
      var list = $(zone.getAttribute('data-dropzone'));
      var add = function (files) {
        Array.prototype.forEach.call(files, function (f) {
          if (!/^image\//.test(f.type)) return;
          var li = document.createElement('li');
          var img = document.createElement('img');
          img.alt = f.name;
          img.src = URL.createObjectURL(f);
          li.appendChild(img);
          list.appendChild(li);
        });
      };
      zone.addEventListener('click', function () { input.click(); });
      zone.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
      input.addEventListener('change', function () { add(input.files); });
      ['dragenter', 'dragover'].forEach(function (t) {
        zone.addEventListener(t, function (e) { e.preventDefault(); zone.classList.add('is-over'); });
      });
      ['dragleave', 'drop'].forEach(function (t) {
        zone.addEventListener(t, function (e) { e.preventDefault(); zone.classList.remove('is-over'); });
      });
      zone.addEventListener('drop', function (e) { add(e.dataTransfer.files); });
    });
  });

  /* 9. Grid/list view toggle */
  UI.on('click', '[data-view]', function (e, btn) {
    var target = $(btn.getAttribute('data-view-target'));
    if (target) target.setAttribute('data-layout', btn.getAttribute('data-view'));
  });
})();
