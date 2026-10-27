// Shared by the English page (/) and the Japanese page (/ja/).

// Language switch: each option's value (and each a[hreflang]) is the other page's URL, relative to this one
(function () {
  // Opened straight from disk there is no server to turn "ja/" into "ja/index.html"
  function resolve(href) {
    return location.protocol === 'file:' && /\/$/.test(href) ? href + 'index.html' : href;
  }
  document.querySelectorAll('a[hreflang]').forEach(function (a) {
    a.setAttribute('href', resolve(a.getAttribute('href')));
  });
  var select = document.getElementById('lang-select');
  if (!select) return;
  var current = select.querySelector('option[selected]');
  select.addEventListener('change', function () {
    location.href = resolve(select.value) + location.hash;
  });
  // Coming back via the browser's Back button can restore the other choice; reset it
  window.addEventListener('pageshow', function () {
    if (current) select.value = current.value;
  });
})();

function handleSubmit(e) {
  e.preventDefault();
  var f = e.target;
  var ja = document.documentElement.lang === 'ja';
  var name    = f.elements.name.value.trim();
  var email   = f.elements.email.value.trim();
  var type    = f.elements.type.options[f.elements.type.selectedIndex].text;
  var message = f.elements.message.value.trim();
  var subjectLine = ja
    ? '【' + type + '】Webサイトより（' + name + ' 様）'
    : '[' + type + '] Website inquiry from ' + name;
  var body =
    (ja ? 'お名前：' : 'Name: ') + name + '\n' +
    (ja ? 'メールアドレス：' : 'Email: ') + email + '\n' +
    (ja ? '種類：' : 'Type: ') + type + '\n' +
    '----------------------------------------\n' +
    message + '\n';
  window.location.href =
    'mailto:yumeunlimited@gmail.com?subject=' +
    encodeURIComponent(subjectLine) +
    '&body=' + encodeURIComponent(body);
}

// Mobile navigation toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();

// Fade sections in as they scroll into view
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();

// Gameplay loops: don't autoplay for reduced-motion users
(function () {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('video[autoplay]').forEach(function (v) {
    v.removeAttribute('autoplay');
    v.pause();
    v.controls = true;
  });
})();

// Screenshot lightbox
(function () {
  var box = document.querySelector('.lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  var img = box.querySelector('img');
  document.querySelectorAll('.shot[data-full]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var thumb = btn.querySelector('img');
      img.src = btn.getAttribute('data-full');
      img.alt = thumb ? thumb.alt : '';
      box.showModal();
    });
  });
  box.querySelector('button').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
})();
