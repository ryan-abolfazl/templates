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
