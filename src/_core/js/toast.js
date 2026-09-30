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
