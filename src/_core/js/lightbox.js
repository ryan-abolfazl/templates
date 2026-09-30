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
