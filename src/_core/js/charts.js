/* Lightweight SVG charts, zero dependencies.
   <div class="chart" data-chart='{"type":"area","labels":["فروردین",…],"series":[{"name":"فروش","data":[12,19,…]}]}'></div>
   type:   "line" | "area" | "bar" | "donut" | "sparkline"
   options: height (px), colors ([css colors]), unit ("تومان"), compact (true: ۱٫۲ میلیون), stacked (bar),
            legend (bool), rtl (default: follows <html dir>; time axis runs right-to-left)
   Colors default to CSS custom properties --chart-1 … --chart-6 and re-render on "themechange".
   JS: UI.chart(el, config) returns { update(config) }. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var uid = 0;

  function svg(tag, attrs, parent) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) {
      // SVG presentation attributes can't resolve var(); set those as CSS instead
      if ((k === 'fill' || k === 'stroke' || k === 'stop-color') && String(attrs[k]).indexOf('var(') !== -1) el.style.setProperty(k, attrs[k]);
      else el.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(el);
    return el;
  }

  function fmt(v, cfg) {
    var n = Math.abs(v), s;
    if (cfg.compact && n >= 1e9) s = +(v / 1e9).toFixed(1) + ' میلیارد';
    else if (cfg.compact && n >= 1e6) s = +(v / 1e6).toFixed(1) + ' میلیون';
    else if (cfg.compact && n >= 1e3) s = +(v / 1e3).toFixed(1) + ' هزار';
    else s = Number.isInteger(v) ? v.toLocaleString('en-US') : v.toFixed(1);
    return UI.fa(String(s).replace(/,/g, '٬').replace('.', '٫'));
  }

  function niceScale(min, max, ticks) {
    if (max === min) max = min + 1;
    var range = max - min;
    var rough = range / ticks;
    var pow = Math.pow(10, Math.floor(Math.log10(rough)));
    var step = [1, 2, 2.5, 5, 10].map(function (m) { return m * pow; }).find(function (s) { return s >= rough; });
    var lo = Math.floor(min / step) * step;
    var hi = Math.ceil(max / step) * step;
    var out = [];
    for (var v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
    return out;
  }

  // Smooth path through points (monotone-ish Catmull-Rom with clamped tension)
  function smooth(pts) {
    if (pts.length < 2) return '';
    var d = 'M' + pts[0][0] + ',' + pts[0][1];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      var t = 0.18;
      var c1x = p1[0] + (p2[0] - p0[0]) * t, c1y = p1[1] + (p2[1] - p0[1]) * t;
      var c2x = p2[0] - (p3[0] - p1[0]) * t, c2y = p2[1] - (p3[1] - p1[1]) * t;
      var lo = Math.min(p1[1], p2[1]), hi = Math.max(p1[1], p2[1]);
      c1y = Math.max(lo, Math.min(hi, c1y));
      c2y = Math.max(lo, Math.min(hi, c2y));
      d += ' C' + c1x.toFixed(1) + ',' + c1y.toFixed(1) + ' ' + c2x.toFixed(1) + ',' + c2y.toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
    }
    return d;
  }

  function colors(el, cfg) {
    if (cfg.colors) return cfg.colors;
    var cs = getComputedStyle(el);
    var out = [];
    for (var i = 1; i <= 6; i++) out.push(cs.getPropertyValue('--chart-' + i).trim() || ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7'][i - 1]);
    return out;
  }

  function legend(el, items) {
    var ul = document.createElement('ul');
    ul.className = 'chart__legend';
    ul.setAttribute('role', 'list');
    items.forEach(function (it) {
      var li = document.createElement('li');
      li.innerHTML = '<i style="background:' + it.color + '"></i><span></span>' + (it.value ? '<b></b>' : '');
      li.querySelector('span').textContent = it.name;
      if (it.value) li.querySelector('b').textContent = it.value;
      ul.appendChild(li);
    });
    el.appendChild(ul);
  }

  function tooltip(el) {
    var tip = document.createElement('div');
    tip.className = 'chart__tip';
    tip.hidden = true;
    el.appendChild(tip);
    return tip;
  }

  function xyChart(el, cfg, W, H, pal) {
    var rtl = cfg.rtl !== undefined ? cfg.rtl : document.documentElement.dir === 'rtl';
    var spark = cfg.type === 'sparkline';
    var pad = spark ? { t: 4, r: 2, b: 4, l: 2 } : { t: 12, r: 12, b: 30, l: 12 };
    var series = cfg.series;
    var n = cfg.labels ? cfg.labels.length : series[0].data.length;
    var all = [];
    series.forEach(function (s, si) {
      s.data.forEach(function (v, i) {
        all.push(cfg.stacked ? series.slice(0, si + 1).reduce(function (a, x) { return a + (x.data[i] || 0); }, 0) : v);
      });
    });
    var ticks = niceScale(Math.min(0, Math.min.apply(null, all)), Math.max.apply(null, all), spark ? 2 : 4);
    var lo = ticks[0], hi = ticks[ticks.length - 1];

    // measure y-axis label width
    var yw = 0;
    if (!spark) {
      yw = Math.max.apply(null, ticks.map(function (t) { return fmt(t, cfg).length; })) * 7 + 10;
      if (rtl) pad.r += yw; else pad.l += yw;
    }
    var iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    var bar = cfg.type === 'bar';
    var slot = iw / (bar ? n : Math.max(n - 1, 1));
    var X = function (i) {
      var x = bar ? slot * (i + 0.5) : slot * i;
      return rtl ? pad.l + iw - x : pad.l + x;
    };
    var Y = function (v) { return pad.t + ih - ((v - lo) / (hi - lo)) * ih; };

    var root = svg('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img', 'aria-label': cfg.title || 'نمودار', class: 'chart__svg', direction: rtl ? 'rtl' : 'ltr' });
    var defs = svg('defs', {}, root);

    if (!spark) {
      var grid = svg('g', { class: 'chart__grid' }, root);
      ticks.forEach(function (t) {
        var y = Y(t);
        svg('line', { x1: pad.l, x2: pad.l + iw, y1: y, y2: y }, grid);
        // text-anchor "start" = the inline-start side in both directions (right edge in RTL)
        var tx = svg('text', { x: rtl ? W - 4 : 4, y: y + 4, 'text-anchor': 'start', class: 'chart__axis' }, grid);
        tx.textContent = fmt(t, cfg);
      });
      if (cfg.labels) {
        var every = Math.ceil(n / Math.max(2, Math.floor(iw / 64)));
        cfg.labels.forEach(function (l, i) {
          if (i % every) return;
          var t = svg('text', { x: X(i), y: H - 8, 'text-anchor': 'middle', class: 'chart__axis' }, grid);
          t.textContent = typeof l === 'number' ? UI.fa(l) : l;
        });
      }
    }

    var layers = svg('g', {}, root);
    if (bar) {
      var groups = cfg.stacked ? 1 : series.length;
      var bw = Math.min(28, (slot * 0.64) / groups);
      series.forEach(function (s, si) {
        s.data.forEach(function (v, i) {
          var base = cfg.stacked ? series.slice(0, si).reduce(function (a, x) { return a + (x.data[i] || 0); }, 0) : 0;
          var off = cfg.stacked ? -bw / 2 : (si - groups / 2) * bw + (rtl ? 0 : 0);
          var x = X(i) + (rtl ? -off - bw : off);
          var y1 = Y(base + v), y0 = Y(base);
          var r = svg('rect', { x: x.toFixed(1), y: y1.toFixed(1), width: Math.max(bw - 3, 2).toFixed(1), height: Math.max(y0 - y1, 0).toFixed(1), rx: Math.min(6, bw / 3), fill: pal[si % pal.length], class: 'chart__bar' }, layers);
          r.style.animationDelay = i * 30 + 'ms';
        });
      });
    } else {
      series.forEach(function (s, si) {
        var c = s.color || pal[si % pal.length];
        var pts = s.data.map(function (v, i) { return [X(i), Y(v)]; });
        var d = smooth(pts);
        if (cfg.type === 'area' || (spark && cfg.fill !== false)) {
          var id = 'g' + ++uid;
          var lg = svg('linearGradient', { id: id, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
          svg('stop', { offset: '0%', 'stop-color': c, 'stop-opacity': spark ? 0.25 : 0.28 }, lg);
          svg('stop', { offset: '100%', 'stop-color': c, 'stop-opacity': 0 }, lg);
          svg('path', { d: d + ' L' + pts[pts.length - 1][0] + ',' + Y(lo) + ' L' + pts[0][0] + ',' + Y(lo) + ' Z', fill: 'url(#' + id + ')', class: 'chart__area' }, layers);
        }
        var line = svg('path', { d: d, fill: 'none', stroke: c, 'stroke-width': spark ? 2 : 2.5, 'stroke-linecap': 'round', class: 'chart__line' }, layers);
        if (s.dashed) line.setAttribute('stroke-dasharray', '5 5');
      });
    }

    el.appendChild(root);
    if (spark) return;

    // Hover tooltip
    var tip = tooltip(el);
    var cursor = svg('line', { y1: pad.t, y2: pad.t + ih, class: 'chart__cursor', opacity: 0 }, root);
    var dots = series.map(function (s, si) {
      return bar ? null : svg('circle', { r: 4.5, fill: 'var(--chart-dot, #fff)', stroke: s.color || pal[si % pal.length], 'stroke-width': 2.5, opacity: 0 }, root);
    });
    var hit = svg('rect', { x: pad.l, y: pad.t, width: iw, height: ih, fill: 'transparent' }, root);
    function move(e) {
      var r = root.getBoundingClientRect();
      var px = ((e.clientX - r.left) / r.width) * W;
      var rel = rtl ? pad.l + iw - px : px - pad.l;
      var i = Math.max(0, Math.min(n - 1, Math.round(bar ? rel / slot - 0.5 : rel / slot)));
      var x = X(i);
      cursor.setAttribute('x1', x);
      cursor.setAttribute('x2', x);
      cursor.setAttribute('opacity', 1);
      var rows = series.map(function (s, si) {
        if (dots[si]) {
          dots[si].setAttribute('cx', x);
          dots[si].setAttribute('cy', Y(s.data[i]));
          dots[si].setAttribute('opacity', 1);
        }
        return '<div><i style="background:' + (s.color || pal[si % pal.length]) + '"></i>' + s.name + ': <b>' + fmt(s.data[i], cfg) + (cfg.unit ? ' ' + cfg.unit : '') + '</b></div>';
      });
      tip.innerHTML = (cfg.labels ? '<strong>' + (typeof cfg.labels[i] === 'number' ? UI.fa(cfg.labels[i]) : cfg.labels[i]) + '</strong>' : '') + rows.join('');
      tip.hidden = false;
      var tx = (x / W) * r.width;
      var tw = tip.offsetWidth;
      tip.style.left = Math.max(0, Math.min(r.width - tw, tx - tw / 2)) + 'px';
      tip.style.top = '0px';
    }
    function leave() {
      tip.hidden = true;
      cursor.setAttribute('opacity', 0);
      dots.forEach(function (d) { if (d) d.setAttribute('opacity', 0); });
    }
    hit.addEventListener('pointermove', move);
    hit.addEventListener('pointerleave', leave);

    if (cfg.legend !== false && series.length > 1) {
      legend(el, series.map(function (s, si) { return { name: s.name, color: s.color || pal[si % pal.length] }; }));
    }
  }

  function donut(el, cfg, W, H, pal) {
    var size = Math.min(cfg.height || 220, W);
    var data = cfg.series[0].data;
    var total = data.reduce(function (a, b) { return a + b; }, 0);
    var sw = cfg.thickness || size * 0.13;
    var r = size / 2 - sw / 2 - 2;
    var C = 2 * Math.PI * r;
    var wrap = document.createElement('div');
    wrap.className = 'chart__donut';
    var root = svg('svg', { viewBox: '0 0 ' + size + ' ' + size, width: size, height: size, role: 'img', 'aria-label': cfg.title || 'نمودار دایره‌ای' });
    svg('circle', { cx: size / 2, cy: size / 2, r: r, fill: 'none', stroke: 'var(--chart-track, rgba(127,127,127,.12))', 'stroke-width': sw }, root);
    var acc = 0;
    var gap = data.length > 1 ? 3 : 0;
    data.forEach(function (v, i) {
      var len = (v / total) * C;
      var c = svg('circle', {
        cx: size / 2, cy: size / 2, r: r, fill: 'none', stroke: pal[i % pal.length], 'stroke-width': sw,
        'stroke-dasharray': Math.max(len - gap, 0.1) + ' ' + (C - Math.max(len - gap, 0.1)),
        'stroke-dashoffset': -acc, 'stroke-linecap': data.length > 1 ? 'butt' : 'round',
        transform: 'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')', class: 'chart__arc',
      }, root);
      c.style.animationDelay = i * 80 + 'ms';
      acc += len;
    });
    wrap.appendChild(root);
    var center = document.createElement('div');
    center.className = 'chart__center';
    center.innerHTML = '<b></b><span></span>';
    center.querySelector('b').textContent = cfg.centerValue || fmt(total, cfg);
    center.querySelector('span').textContent = cfg.centerLabel || 'مجموع';
    wrap.appendChild(center);
    el.appendChild(wrap);
    if (cfg.legend !== false) {
      legend(el, (cfg.labels || []).map(function (l, i) {
        return { name: l, color: pal[i % pal.length], value: UI.fa(Math.round((data[i] / total) * 100)) + '٪' };
      }));
    }
  }

  function draw(el, cfg) {
    el.innerHTML = '';
    el.classList.add('chart', 'chart--' + cfg.type);
    var W = Math.max(el.clientWidth, 120);
    var H = cfg.height || (cfg.type === 'sparkline' ? 48 : 260);
    var pal = colors(el, cfg);
    if (cfg.type === 'donut') donut(el, cfg, W, H, pal);
    else xyChart(el, cfg, W, H, pal);
  }

  UI.chart = function (el, cfg) {
    draw(el, cfg);
    var w = el.clientWidth;
    if ('ResizeObserver' in window) {
      new ResizeObserver(UI.debounce(function () {
        if (Math.abs(el.clientWidth - w) > 4) {
          w = el.clientWidth;
          draw(el, cfg);
        }
      }, 120)).observe(el);
    }
    document.addEventListener('themechange', function () { draw(el, cfg); });
    return { update: function (next) { cfg = next; draw(el, cfg); } };
  };

  UI.ready(function () {
    UI.$$('[data-chart]').forEach(function (el) {
      var raw = el.getAttribute('data-chart');
      var script = UI.$('script[type="application/json"]', el);
      try {
        UI.chart(el, JSON.parse(raw || (script && script.textContent)));
      } catch (e) {
        console.warn('chart config error', el, e);
      }
    });
  });
})();
