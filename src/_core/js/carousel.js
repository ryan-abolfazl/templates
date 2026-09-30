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
