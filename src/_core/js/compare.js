/* Before/after slider: <div class="compare" data-compare> <div class="compare__before">…</div> <div class="compare__after">…</div>
   <input type="range" min="0" max="100" value="50" aria-label="…"> </div>
   The range value is written to --pos (0–100) on the container; CSS clips the "after" layer with it. */
(function () {
  'use strict';
  UI.ready(function () {
    UI.$$('[data-compare]').forEach(function (root) {
      var input = UI.$('input[type="range"]', root);
      if (!input) return;
      var set = function () {
        root.style.setProperty('--pos', input.value);
      };
      input.addEventListener('input', set);
      set();
    });
  });
})();
