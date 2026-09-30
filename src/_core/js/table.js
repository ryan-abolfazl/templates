/* Data tables: search, sort, filter, paginate, select rows. Progressive: the table works without JS.
   <div data-table data-page-size="8">
     <input data-table-search>  <select data-table-filter="3">…</select>
     <table> <th><button data-sort>…</button></th> … <td data-value="1250000">…</td>
     <input type="checkbox" data-select-all> / <input type="checkbox" data-select-row>
     <nav data-table-pager></nav>  <span data-table-count></span>
   </div> */
(function () {
  'use strict';

  function init(root) {
    var tbody = UI.$('tbody', root);
    if (!tbody) return;
    var rows = UI.$$('tr', tbody);
    var size = parseInt(root.getAttribute('data-page-size'), 10) || 0;
    var page = 1;
    var query = '';
    var filters = {};
    var pager = UI.$('[data-table-pager]', root);
    var count = UI.$('[data-table-count]', root);
    var empty = UI.$('[data-table-empty]', root);

    function cellValue(tr, i) {
      var td = tr.children[i];
      if (!td) return '';
      var v = td.getAttribute('data-value');
      return v !== null ? v : td.textContent.trim();
    }

    function visibleRows() {
      return rows.filter(function (tr) {
        var text = UI.en(tr.textContent).toLowerCase();
        if (query && text.indexOf(query) === -1) return false;
        for (var col in filters) {
          if (filters[col] && cellValue(tr, col).indexOf(filters[col]) === -1) return false;
        }
        return true;
      });
    }

    function render() {
      var vis = visibleRows();
      var pages = size ? Math.max(1, Math.ceil(vis.length / size)) : 1;
      page = Math.min(page, pages);
      rows.forEach(function (tr) { tr.hidden = true; });
      vis.forEach(function (tr, i) {
        tr.hidden = size ? i < (page - 1) * size || i >= page * size : false;
      });
      if (empty) empty.hidden = vis.length > 0;
      if (count) count.textContent = UI.fa(vis.length);
      if (pager && size) {
        var html = '<button type="button" data-page="' + (page - 1) + '" aria-label="صفحه قبل"' + (page === 1 ? ' disabled' : '') + '><svg class="icon"><use href="#i-chevron-right"></use></svg></button>';
        for (var p = 1; p <= pages; p++) {
          html += '<button type="button" data-page="' + p + '"' + (p === page ? ' class="is-active" aria-current="page"' : '') + '>' + UI.fa(p) + '</button>';
        }
        html += '<button type="button" data-page="' + (page + 1) + '" aria-label="صفحه بعد"' + (page === pages ? ' disabled' : '') + '><svg class="icon"><use href="#i-chevron-left"></use></svg></button>';
        pager.innerHTML = html;
      }
    }

    var search = UI.$('[data-table-search]', root);
    if (search) {
      search.addEventListener('input', UI.debounce(function () {
        query = UI.en(search.value.trim()).toLowerCase();
        page = 1;
        render();
      }, 120));
    }

    UI.$$('[data-table-filter]', root).forEach(function (sel) {
      sel.addEventListener('change', function () {
        filters[sel.getAttribute('data-table-filter')] = sel.value;
        page = 1;
        render();
      });
    });

    if (pager) {
      pager.addEventListener('click', function (e) {
        var b = e.target.closest('[data-page]');
        if (!b || b.disabled) return;
        page = parseInt(b.getAttribute('data-page'), 10);
        render();
      });
    }

    UI.$$('[data-sort]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var th = btn.closest('th');
        var idx = Array.prototype.indexOf.call(th.parentElement.children, th);
        var dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
        UI.$$('th[aria-sort]', root).forEach(function (o) { o.removeAttribute('aria-sort'); });
        th.setAttribute('aria-sort', dir);
        rows.sort(function (a, b) {
          var x = UI.en(cellValue(a, idx)), y = UI.en(cellValue(b, idx));
          var nx = parseFloat(x), ny = parseFloat(y);
          var cmp = !isNaN(nx) && !isNaN(ny) && /^-?[\d.]+$/.test(x) && /^-?[\d.]+$/.test(y) ? nx - ny : x.localeCompare(y, 'fa');
          return dir === 'ascending' ? cmp : -cmp;
        });
        rows.forEach(function (tr) { tbody.appendChild(tr); });
        render();
      });
    });

    var all = UI.$('[data-select-all]', root);
    var bulk = UI.$('[data-table-bulk]', root);
    function syncBulk() {
      var n = UI.$$('[data-select-row]:checked', root).length;
      if (bulk) {
        bulk.hidden = n === 0;
        var c = UI.$('[data-bulk-count]', bulk);
        if (c) c.textContent = UI.fa(n);
      }
      UI.$$('[data-select-row]', root).forEach(function (cb) {
        cb.closest('tr').classList.toggle('is-selected', cb.checked);
      });
    }
    if (all) {
      all.addEventListener('change', function () {
        rows.forEach(function (tr) {
          var cb = UI.$('[data-select-row]', tr);
          if (cb && !tr.hidden) cb.checked = all.checked;
        });
        syncBulk();
      });
    }
    root.addEventListener('change', function (e) {
      if (e.target.matches('[data-select-row]')) {
        if (all) {
          var boxes = UI.$$('[data-select-row]', root);
          var on = boxes.filter(function (b) { return b.checked; }).length;
          all.checked = on === boxes.length;
          all.indeterminate = on > 0 && on < boxes.length;
        }
        syncBulk();
      }
    });

    render();
  }

  UI.ready(function () {
    UI.$$('[data-table]').forEach(init);
  });
})();
