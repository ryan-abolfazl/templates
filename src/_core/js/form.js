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
