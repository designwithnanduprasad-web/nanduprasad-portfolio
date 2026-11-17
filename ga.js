/* Google Analytics 4 for nanduprasad.in */
(function () {
  var ID = 'G-PPG5XFTCHZ';
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', ID);

  // Contact and project clicks
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a, button');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    if (el.matches('[data-copy]')) {
      gtag('event', 'contact_copy', { method: /@/.test(el.getAttribute('data-copy')) ? 'email' : 'phone' });
      return;
    }
    var method = href.indexOf('mailto:') === 0 ? 'email'
      : href.indexOf('tel:') === 0 ? 'call'
      : /behance\.net/.test(href) ? 'behance'
      : /\.pdf$/i.test(href) ? 'resume'
      : /wa\.me|whatsapp/.test(href) ? 'whatsapp' : '';
    if (method) {
      gtag('event', 'contact_click', { method: method, location: el.classList.contains('env') ? 'floating_envelope' : 'page' });
      return;
    }
    if (el.closest('.card') || el.classList.contains('next')) {
      gtag('event', 'project_click', { project: href });
    }
  }, true);

  // Video plays on case-study pages
  document.addEventListener('play', function (e) {
    var v = e.target;
    if (v.tagName !== 'VIDEO' || v.dataset.gaPlayed || v.muted) return;
    v.dataset.gaPlayed = '1';
    gtag('event', 'video_play', { video: (v.getAttribute('src') || '').split('/').pop() });
  }, true);
})();
