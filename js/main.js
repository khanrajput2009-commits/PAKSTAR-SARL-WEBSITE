/* PAKSTAR SARL — main.js
   Core UI: icons, header/footer, dropdowns, theme, preloader, scroll reveal, parallax, tilt,
   renderers for shared sections, map, toast. Vanilla JS only. */
(function () {
  'use strict';
  var PK = (window.PK = window.PK || {});
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  PK.$ = $; PK.$$ = $$;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  PK.reduce = reduce;

  /* ------------------------------------------------------------ icons */
  var IC = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', close: '<path d="M6 6l12 12M18 6L6 18"/>', chevron: '<path d="M6 9l6 6 6-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>', pin: '<path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L21 13 13 21a2.1 2.1 0 0 1-3-3l8-8"/><path d="M14.5 6.5a4 4 0 0 1 5-3l-3 3 .5 2 2 .5 3-3"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>', route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>', gauge: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/><circle cx="12" cy="17" r="1"/>',
    wind: '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>', plug: '<path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0z"/><path d="M12 16v5"/>',
    truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1"/>', users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14a5 5 0 0 1 4 5"/>',
    anchor: '<circle cx="12" cy="5" r="2"/><path d="M12 7v14M5 13a7 7 0 0 0 14 0M8 11H5l-1 2M16 11h3l1 2"/>', eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>', helmet: '<path d="M3 16a9 9 0 0 1 18 0v2H3z"/><path d="M11 10h10"/>',
    sparkle: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>', drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>', send: '<path d="M21 3L3 11l7 3 3 7z"/><path d="M10 14l11-11"/>',
    compare: '<path d="M7 4v16M17 4v16M3 8l4-4 4 4M13 16l4 4 4-4"/>', search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>', handshake: '<path d="M3 11l4-4 4 2 4-2 6 5-8 7-6-4z"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>', box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>'
  };
  PK.icon = function (n, cls) { return '<svg class="icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (IC[n] || IC.info) + '</svg>'; };
  var I = PK.icon;
  PK.L = function (o) { return o && typeof o === 'object' ? (o[PK.i18n.lang] || o.en) : o; };
  var L = PK.L;
  PK.t = function (k, fb) { return PK.i18n.t(k, fb); };
  var esc = PK.esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  var MARK = '<img class="logo-img" src="assets/images/brand/logo-wordmark.png" width="1344" height="253" alt="PAKSTAR SARL">';

  /* ------------------------------------------------------------ theme */
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    PK.store.set('theme', t);
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', '#070a10');
    $$('.theme-btn').forEach(function (b) { b.setAttribute('aria-pressed', t === 'dark'); });
  }
  PK.theme = function () { return document.documentElement.getAttribute('data-theme') || 'light'; };

  /* ------------------------------------------------------------ header / footer */
  var NAV = [['home', 'index.html', 'Home'], ['about', 'about.html', 'About'], ['motorcycles', 'motorcycles.html', 'Motorcycles'], ['dealers', 'dealers.html', 'Dealer Network'], ['news', 'news.html', 'News'], ['contact', 'contact.html', 'Contact']];

  function buildHeader() {
    var page = document.body.getAttribute('data-page');
    var megaAll = '<a class="mi mi-first" style="--i:0" href="motorcycles.html"><span class="th">' + PK.sceneImg('showroom', '') + '</span><span><b data-i18n="nav.allbikes">All motorcycles</b><span data-i18n="nav.allbikes.d">Browse the full catalogue, every category</span></span></a>';
    var mega = megaAll + PK.CATS.map(function (c, i) {
      return '<a class="mi" style="--i:' + (i + 1) + '" href="motorcycles.html?cat=' + c.id + '"><span class="th">' + PK.catImg(c, '') + '</span><span><b>' + esc(L(c.name)) + '</b><span>' + esc(L(c.desc)) + '</span></span></a>';
    }).join('');
    var links = NAV.map(function (n) {
      var a = page === n[0] ? ' is-active" aria-current="page' : '';
      if (n[0] === 'motorcycles') {
        return '<div class="dd" data-dd><button type="button" class="dd-btn nav-link' + (page === 'motorcycles' || page === 'product' ? ' is-active' : '') + '" aria-expanded="false" aria-controls="megaMenu"><span data-i18n="nav.motorcycles">Motorcycles</span>' + I('chevron', 'chev') + '</button><div class="dd-panel mega" id="megaMenu">' + mega + '</div></div>';
      }
      return '<a href="' + n[1] + '" class="' + a.replace(/^ /, '') + '" data-i18n="nav.' + n[0] + '">' + n[2] + '</a>';
    }).join('');
    var mlinks = NAV.map(function (n) {
      if (n[0] === 'motorcycles') {
        return '<div class="m-acc"><button type="button" aria-expanded="false"><span data-i18n="nav.motorcycles">Motorcycles</span>' + I('chevron', 'chev') + '</button><div class="m-sub"><div>' + PK.CATS.map(function (c) { return '<a href="motorcycles.html?cat=' + c.id + '">' + esc(L(c.name)) + '</a>'; }).join('') + '</div></div></div>';
      }
      return '<a href="' + n[1] + '" data-i18n="nav.' + n[0] + '">' + n[2] + '</a>';
    }).join('');
    var lang = PK.i18n.lang;
    var h = '<a class="skip" href="#main" data-i18n="skip">Skip to content</a>' +
      '<div class="container nav-wrap"><a class="logo" href="index.html" aria-label="PAKSTAR SARL">' + MARK + '</a>' +
      '<nav class="nav" aria-label="Main">' + links + '</nav>' +
      '<div class="nav-tools">' +
      '<div class="dd lang-dd" data-dd><button type="button" class="tool-btn dd-btn" aria-expanded="false" aria-controls="langMenu" data-i18n-attr="aria-label:lang.label" aria-label="Language">' + I('globe') + '<span class="dd-label" id="langCode">' + lang.toUpperCase() + '</span>' + I('chevron', 'chev') + '</button>' +
      '<div class="dd-panel right" id="langMenu" role="menu"><button type="button" role="menuitemradio" class="dd-item" data-lang="en" aria-checked="' + (lang === 'en') + '">English</button><button type="button" role="menuitemradio" class="dd-item" data-lang="fr" aria-checked="' + (lang === 'fr') + '">Français</button></div></div>' +
      '<button type="button" class="tool-btn theme-btn" data-theme-toggle aria-pressed="false" data-i18n-attr="aria-label:theme.toggle" aria-label="Toggle dark mode">' + I('sun', 'i-sun') + I('moon', 'i-moon') + '</button>' +
      '<a class="btn cta" href="inquiry.html"><span data-i18n="nav.inquire">Inquire</span>' + I('arrow') + '</a>' +
      '<button type="button" class="burger" id="burger" aria-expanded="false" aria-controls="mNav" data-i18n-attr="aria-label:menu.toggle" aria-label="Menu"><span></span><span></span><span></span></button>' +
      '</div></div>';
    var hd = $('#siteHeader'); if (!hd) { hd = document.createElement('header'); hd.id = 'siteHeader'; document.body.insertBefore(hd, document.body.firstChild); }
    hd.className = 'site-header'; hd.innerHTML = h;
    var mn = $('#mNav'); if (!mn) { mn = document.createElement('div'); mn.id = 'mNav'; mn.className = 'm-nav'; hd.insertAdjacentElement('afterend', mn); }
    mn.innerHTML = '<nav aria-label="Mobile">' + mlinks + '</nav><div class="m-tools"><a class="btn" href="inquiry.html"><span data-i18n="nav.inquire">Inquire</span>' + I('arrow') + '</a></div>';
  }

  function buildFooter() {
    var f = $('#siteFooter'); if (!f) return;
    f.className = 'site-footer';
    f.innerHTML = '<div class="container"><div class="foot-grid">' +
      '<div><a class="logo" href="index.html" style="color:#fff">' + MARK + '</a><p style="margin-top:1.2rem;max-width:36ch" data-i18n="foot.desc">A motorcycle showroom concept for Djibouti: engineered for the road ahead.</p>' +
      '<div class="foot-lang" role="group" aria-label="Language"><button type="button" data-lang="en" aria-pressed="false">EN</button><button type="button" data-lang="fr" aria-pressed="false">FR</button></div></div>' +
      '<div><h4 data-i18n="foot.explore">Explore</h4><ul><li><a href="index.html" data-i18n="nav.home">Home</a></li><li><a href="about.html" data-i18n="nav.about">About</a></li><li><a href="dealers.html" data-i18n="nav.dealers">Dealer Network</a></li><li><a href="news.html" data-i18n="nav.news">News</a></li><li><a href="contact.html" data-i18n="nav.contact">Contact</a></li></ul></div>' +
      '<div><h4 data-i18n="foot.catalog">Motorcycles</h4><ul>' + PK.CATS.slice(0, 6).map(function (c) { return '<li><a href="motorcycles.html?cat=' + c.id + '">' + esc(L(c.name)) + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h4 data-i18n="foot.business">Business</h4><ul><li><a href="inquiry.html" data-i18n="foot.inq">Product inquiry</a></li><li><a href="become-a-dealer.html" data-i18n="foot.dealer">Become a dealer</a></li><li><a href="motorcycles.html?cat=cargo" data-i18n="foot.fleet">Commercial vehicles</a></li></ul>' +
      '<h4 style="margin-top:1.6rem" data-i18n="foot.contact">Contact</h4><ul><li><i class="ph">[Official Company Address]</i></li><li><i class="ph">[Official Contact Number]</i></li><li><i class="ph">[Official Business Email]</i></li></ul></div>' +
      '</div><div class="foot-bottom"><span>© <span id="yr"></span> PAKSTAR SARL — <span data-i18n="foot.rights">All rights reserved.</span></span><span data-i18n="foot.demo">Demonstration website: sample catalogue, no live inquiries.</span></div></div>';
    $('#yr', f).textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------ dropdowns (mouse, touch, keyboard) */
  var openDD = null, hoverT, ddDocBound = false, mnDocBound = false;
  function ddClose(dd, ret) {
    if (!dd) return; dd.classList.remove('is-open'); dd._hov = false; dd._pinned = false;
    var b = $('.dd-btn', dd); if (b) { b.setAttribute('aria-expanded', 'false'); if (ret) b.focus(); }
    if (openDD === dd) openDD = null;
  }
  function ddOpen(dd) {
    if (openDD && openDD !== dd) ddClose(openDD);
    dd.classList.add('is-open'); $('.dd-btn', dd).setAttribute('aria-expanded', 'true'); openDD = dd;
  }
  function initDropdowns() {
    openDD = null;
    var header = $('#siteHeader');
    // per-render bindings (new elements each time the header is rebuilt)
    $$('#siteHeader .dd').forEach(function (dd) {
      if (!finePointer || dd.classList.contains('lang-dd')) return;
      dd.addEventListener('mouseenter', function () { clearTimeout(hoverT); if (!dd.classList.contains('is-open')) { ddOpen(dd); dd._hov = true; } });
      dd.addEventListener('mouseleave', function () { hoverT = setTimeout(function () { if (!dd._pinned) ddClose(dd); }, 260); });
    });
    if (header._bound) return; header._bound = true;
    // header-level delegation: bound ONCE (the header element persists across language rebuilds)
    header.addEventListener('click', function (e) {
      var btn = e.target.closest('.dd-btn'); if (!btn) return;
      var dd = btn.closest('.dd');
      if (dd.classList.contains('is-open')) {
        if (dd._hov) { dd._hov = false; dd._pinned = true; return; } // opened by hover: a click keeps it open
        dd._pinned = false; ddClose(dd);
      } else { dd._hov = false; dd._pinned = true; ddOpen(dd); }
    });
    header.addEventListener('focusout', function (e) {
      if (openDD && e.relatedTarget && !openDD.contains(e.relatedTarget)) ddClose(openDD);
    });
    header.addEventListener('keydown', function (e) {
      var btn = e.target.closest && e.target.closest('.dd-btn');
      if (btn && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && e.key === 'ArrowDown') { e.preventDefault(); var dd = btn.closest('.dd'); dd._pinned = true; ddOpen(dd); var f = $('a, button:not(.dd-btn)', dd); f && f.focus(); }
    });
    if (ddDocBound) return; ddDocBound = true;
    document.addEventListener('click', function (e) { if (openDD && !openDD.contains(e.target)) ddClose(openDD); });
    document.addEventListener('keydown', function (e) {
      if (!openDD) return;
      var items = $$('a, button:not(.dd-btn)', openDD).filter(function (x) { return x.offsetParent !== null; });
      var i = items.indexOf(document.activeElement), t;
      if (e.key === 'Escape') { ddClose(openDD, true); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); t = items[i + 1] || items[0]; t && t.focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); t = i <= 0 ? items[items.length - 1] : items[i - 1]; t && t.focus(); }
    });
  }

  function mnSet(o) {
    var burger = $('#burger'), nav = $('#mNav'); if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', o); nav.classList.toggle('is-open', o); document.body.classList.toggle('is-locked', o);
    $('#siteHeader').classList.toggle('is-solid', o || window.scrollY > 40);
    if (o) { var f = $('a, button', nav); f && f.focus(); }
  }
  function initMobileNav() {
    var burger = $('#burger'), nav = $('#mNav');
    burger.addEventListener('click', function () { mnSet(burger.getAttribute('aria-expanded') !== 'true'); });
    if (!nav._bound) {
      nav._bound = true;
      nav.addEventListener('click', function (e) {
        var acc = e.target.closest('.m-acc > button');
        if (acc) { var p = acc.parentNode, o = !p.classList.contains('is-open'); p.classList.toggle('is-open', o); acc.setAttribute('aria-expanded', o); return; }
        if (e.target.closest('a')) mnSet(false);
      });
    }
    if (mnDocBound) return; mnDocBound = true;
    document.addEventListener('keydown', function (e) {
      var bg = $('#burger'), nv = $('#mNav'); if (!nv || !nv.classList.contains('is-open')) return;
      if (e.key === 'Escape') { mnSet(false); bg.focus(); }
      if (e.key === 'Tab') {
        var f = $$('a, button', nv).filter(function (x) { return x.offsetParent !== null; });
        var last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === bg) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); bg.focus(); }
      }
    });
    window.addEventListener('resize', function () { var nv = $('#mNav'); if (window.innerWidth > 980 && nv && nv.classList.contains('is-open')) mnSet(false); });
  }

  /* ------------------------------------------------------------ toast */
  PK.toast = function (msg, icon) {
    var wrap = $('.toasts'); if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toasts'; wrap.setAttribute('role', 'status'); wrap.setAttribute('aria-live', 'polite'); document.body.appendChild(wrap); }
    var t = document.createElement('div'); t.className = 'toast'; t.innerHTML = I(icon || 'check') + '<span>' + esc(msg) + '</span>'; wrap.appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 3200);
  };

  /* ------------------------------------------------------------ reveal / counters */
  var io;
  PK.observe = function (root) {
    var els = $$('.reveal:not(.in), [data-count]:not([data-counted])', root);
    if (!('IntersectionObserver' in window) || reduce) { els.forEach(function (e) { e.classList.add('in'); if (e.hasAttribute('data-count')) countUp(e, true); }); return; }
    if (!io) io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return; var e = x.target;
        e.classList.add('in'); if (e.hasAttribute('data-count')) countUp(e); io.unobserve(e);
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
    // safety net: never leave content hidden
    setTimeout(function () { $$('.reveal:not(.in)', root).forEach(function (e) { var r = e.getBoundingClientRect(); if (r.top < window.innerHeight) e.classList.add('in'); }); }, 1800);
  };
  function countUp(el, instant) {
    if (el.getAttribute('data-counted')) return; el.setAttribute('data-counted', '1');
    var to = parseFloat(el.getAttribute('data-count')), pre = el.getAttribute('data-prefix') || '', suf = el.getAttribute('data-suffix') || '';
    function fmt(v) { return pre + Math.round(v).toLocaleString(PK.i18n.lang === 'fr' ? 'fr-FR' : 'en-US') + suf; }
    if (instant || reduce) { el.textContent = fmt(to); return; }
    var t0 = performance.now(), d = 1500;
    (function step(t) { var p = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(to * e); if (p < 1) requestAnimationFrame(step); })(t0);
  }

  /* ------------------------------------------------------------ renderers */
  function infoCard(kind, it, i) {
    var key = kind + ':' + (it.id != null ? it.id : i), d = ' style="--i:' + (i % 6) + '"';
    var learn = '<button type="button" class="btn sm ghost" data-open="' + key + '"><span>' + esc(PK.t('btn.learn', 'Learn more')) + '</span>' + I('arrow') + '</button>';
    if (kind === 'cat') return '<article class="card cat reveal tilt" data-open="' + key + '"' + d + '><div class="media"><span class="tag">' + String(i + 1).padStart(2, '0') + '</span>' + PK.catImg(it, L(it.name)) + '</div><div class="body"><h3>' + esc(L(it.name)) + '</h3><p>' + esc(L(it.desc)) + '</p><div class="foot">' + learn + '<a class="link-arrow" href="motorcycles.html?cat=' + it.id + '">' + esc(PK.t('btn.models', 'View models')) + I('arrow') + '</a></div></div></article>';
    if (kind === 'feat' || kind === 'value' || kind === 'tip') return '<article class="card feat reveal tilt" data-open="' + key + '"' + d + '><div class="ico">' + I(it.icon) + '</div><h3>' + esc(L(it.t)) + '</h3><p>' + esc(L(it.d)) + '</p><div class="foot">' + learn + '</div></article>';
    if (kind === 'place') return '<article class="card city reveal tilt" data-open="' + key + '"' + d + '><div class="media"><span class="tag">' + esc(L(it.tag)) + '</span>' + PK.placeImg(it, L(it.name)) + '</div><div class="body"><h3>' + esc(L(it.name)) + '</h3><p>' + esc(L(it.d)) + '</p><div class="foot">' + learn + '</div></div></article>';
    if (kind === 'news') return '<article class="card news reveal tilt" data-open="' + key + '"' + d + '><div class="media"><span class="tag sample">' + esc(PK.t('demo.tag', 'Demo')) + '</span>' + PK.newsImg(it, L(it.t)) + '</div><div class="body"><span class="meta">' + esc(L(it.cat)) + ' · ' + esc(L(it.date)) + '</span><h3>' + esc(L(it.t)) + '</h3><p>' + esc(L(it.d)) + '</p><div class="foot">' + learn + '</div></div></article>';
    if (kind === 'step') return '<article class="step reveal" data-open="' + key + '"' + d + '><h3>' + esc(L(it.t)) + '</h3><p>' + esc(L(it.d)) + '</p><div style="margin-top:1rem"><button type="button" class="link-arrow" data-open="' + key + '">' + esc(PK.t('btn.learn', 'Learn more')) + I('arrow') + '</button></div></article>';
    return '';
  }
  PK.infoCard = infoCard;

  var R = {
    cats: function (el) { el.innerHTML = PK.CATS.map(function (c, i) { return infoCard('cat', c, i); }).join(''); },
    features: function (el) { el.innerHTML = PK.FEATURES.map(function (c, i) { return infoCard('feat', c, i); }).join(''); },
    values: function (el) { el.innerHTML = PK.VALUES.map(function (c, i) { return infoCard('value', c, i); }).join(''); },
    tips: function (el) { el.innerHTML = PK.TIPS.map(function (c, i) { c.id = i; return infoCard('tip', c, i); }).join(''); },
    steps: function (el) { el.innerHTML = PK.STEPS.map(function (c, i) { c.id = i; return infoCard('step', c, i); }).join(''); },
    places: function (el) { var n = +el.getAttribute('data-limit') || 99; el.innerHTML = PK.PLACES.filter(function (p) { return !p.poi && p.id !== 'djibouti' || el.hasAttribute('data-all'); }).slice(0, n).map(function (c, i) { return infoCard('place', c, i); }).join(''); },
    news: function (el) { var n = +el.getAttribute('data-limit') || 99; el.innerHTML = PK.NEWS.slice(0, n).map(function (c, i) { return infoCard('news', c, i); }).join(''); },
    faq: function (el) {
      el.innerHTML = PK.FAQ.map(function (f, i) { return '<div class="acc-item reveal" style="--i:' + (i % 4) + '"><h3 style="margin:0;font-size:1rem"><button type="button" class="acc-q" aria-expanded="false" aria-controls="fa' + i + '" id="fq' + i + '"><span>' + esc(L(f.q)) + '</span><span class="plus" aria-hidden="true">' + I('check').replace(/<path[^>]*>/, '<path d="M12 5v14M5 12h14"/>') + '</span></button></h3><div class="acc-a" id="fa' + i + '" role="region" aria-labelledby="fq' + i + '"><div><p>' + esc(L(f.a)) + '</p></div></div></div>'; }).join('');
    },
    marquee: function (el) {
      var w = [PK.t('mq.1', 'Engineered for the road ahead'), PK.t('mq.2', 'Commuters'), PK.t('mq.3', 'Adventure'), PK.t('mq.4', 'Electric'), PK.t('mq.5', 'Three-wheelers'), PK.t('mq.6', 'Djibouti')];
      var row = w.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join(''); el.innerHTML = '<div class="track" aria-hidden="true">' + row + row + row + row + '</div>';
    },
    map: function (el) { buildMap(el); },
    poi: function (el) {
      el.innerHTML = PK.PLACES.map(function (p) { return '<button type="button" class="poi" data-open="place:' + p.id + '" data-pin="' + p.id + '"><span class="n">' + p.n + '</span><span><b>' + esc(L(p.name)) + '</b><span>' + esc(L(p.tag)) + '</span></span></button>'; }).join('');
      $$('.poi', el).forEach(function (b) {
        function on(v) { var pin = $('.pin[data-id="' + b.getAttribute('data-pin') + '"]'); if (pin) pin.classList.toggle('is-active', v); b.classList.toggle('is-active', v); }
        b.addEventListener('mouseenter', function () { on(true); }); b.addEventListener('mouseleave', function () { on(false); });
        b.addEventListener('focus', function () { on(true); }); b.addEventListener('blur', function () { on(false); });
      });
    }
  };
  PK.R = R;

  PK.renderAll = function (root) {
    $$('[data-render]', root || document).forEach(function (el) { var f = R[el.getAttribute('data-render')] || (PK.R2 && PK.R2[el.getAttribute('data-render')]); if (f) f(el); });
    $$('[data-art],[data-photo]', root || document).forEach(function (el) {
      if (el.firstChild) return;
      if (el.hasAttribute('data-photo')) { el.innerHTML = PK.sceneImg(el.getAttribute('data-photo'), el.getAttribute('data-alt') || ''); return; }
      el.innerHTML = PK.art.bike(el.getAttribute('data-art'), { view: el.getAttribute('data-view') || 'card', color: el.getAttribute('data-color') || '#ff5a1f', label: '' });
    });
    PK.i18n.apply(root); PK.observe(root);
  };

  /* ------------------------------------------------------------ Djibouti map */
  // Simplified, stylised outline (lon, lat). Illustrative only: not survey-accurate, not for navigation.
  var OUTLINE = [[43.13, 12.71], [42.8, 12.55], [42.45, 12.44], [42.1, 12.1], [41.8, 11.9], [41.78, 11.72], [42.15, 11.45], [42.4, 11.02], [42.9, 10.98], [43.05, 11.15], [43.25, 11.46], [43.17, 11.6], [43.0, 11.57], [42.75, 11.5], [42.52, 11.52], [42.6, 11.66], [42.75, 11.76], [42.88, 11.83], [43.1, 11.9], [43.29, 11.98], [43.4, 12.3], [43.37, 12.55]];
  function buildMap(el) {
    var k = 330, X = function (lo) { return ((lo - 41.7) * k + 3).toFixed(1); }, Y = function (la) { return ((12.8 - la) * k + 6).toFixed(1); };
    var d = 'M' + OUTLINE.map(function (p) { return X(p[0]) + ' ' + Y(p[1]); }).join('L') + 'Z';
    var grid = ''; for (var g = 0; g < 7; g++) { grid += '<line class="grid-l" x1="0" x2="600" y1="' + (g * 100 + 20) + '" y2="' + (g * 100 + 20) + '"/><line class="grid-l" y1="0" y2="640" x1="' + (g * 100 + 20) + '" x2="' + (g * 100 + 20) + '"/>'; }
    var pins = PK.PLACES.map(function (p) {
      var x = X(p.lon), y = Y(p.lat), lx = p.id === 'tadjoura' || p.id === 'obock' || p.id === 'assal' ? -14 : 14, an = lx < 0 ? 'end' : 'start';
      if (p.id === 'djibouti') { lx = 16; an = 'start'; }
      return '<g class="pin' + (p.hq ? ' hq' : '') + '" data-id="' + p.id + '" data-open="place:' + p.id + '" tabindex="0" role="button" aria-label="' + esc(L(p.name)) + '"><circle class="halo" cx="' + x + '" cy="' + y + '" r="8"/><circle class="dot" cx="' + x + '" cy="' + y + '" r="' + (p.hq ? 9 : 7) + '"/><text class="lbl-city" x="' + (+x + lx) + '" y="' + (+y + 4) + '" text-anchor="' + an + '">' + esc(L(p.name)) + '</text></g>';
    }).join('');
    var hq = PK.PLACES[0];
    el.innerHTML = '<div class="map-tabs" role="group" aria-label="Map type"><button type="button" aria-pressed="true" data-map="svg" data-i18n="map.tab.styl">Stylised</button><button type="button" aria-pressed="false" data-map="live" data-i18n="map.tab.live">Live map</button></div>' +
      '<svg class="map-svg" viewBox="0 0 600 640" role="img" aria-label="Stylised map of Djibouti with key locations" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="seaG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0e3a4f"/><stop offset="1" stop-color="#0a1b29"/></linearGradient></defs><rect width="600" height="640" fill="url(#seaG)"/>' + grid +
      '<text class="lbl-c" x="110" y="150">ERITREA</text><text class="lbl-c" x="14" y="520">ETHIOPIA</text><text class="lbl-c" x="430" y="628">SOMALILAND</text>' +
      '<path class="land" d="' + d + '"/>' +
      '<text class="lbl-sea" x="594" y="22" text-anchor="end">Red Sea</text><text class="lbl-sea" x="596" y="548" text-anchor="end">Gulf of Aden</text><text class="lbl-sea" x="372" y="398" text-anchor="middle" transform="rotate(-7 372 398)" font-size="8" style="fill:rgba(255,255,255,.7)">Gulf of Tadjoura</text>' + pins +
      '<g transform="translate(62 590)" fill="none" stroke="#fff" stroke-opacity=".6"><circle r="20"/><path d="M0 -26V-8M0 -26l-5 8M0 -26l5 8"/><text y="38" text-anchor="middle" fill="#fff" stroke="none" font-size="11" font-weight="700">N</text></g></svg>' +
      '<iframe class="map-live" title="OpenStreetMap — Djibouti" loading="lazy" referrerpolicy="no-referrer" data-src="https://www.openstreetmap.org/export/embed.html?bbox=42.35%2C11.3%2C43.55%2C12.0&layer=mapnik&marker=' + hq.lat + '%2C' + hq.lon + '"></iframe>' +
      '<div class="map-fallback"><span data-i18n="map.fallback">If the live map does not load, open it directly:</span><a class="link-arrow" style="color:#ffb457" target="_blank" rel="noopener" href="https://www.openstreetmap.org/?mlat=' + hq.lat + '&mlon=' + hq.lon + '#map=11/' + hq.lat + '/' + hq.lon + '">OpenStreetMap' + I('arrow') + '</a></div>';
    $$('.map-tabs button', el).forEach(function (b) {
      b.addEventListener('click', function () {
        var live = b.getAttribute('data-map') === 'live'; el.classList.toggle('is-live', live);
        $$('.map-tabs button', el).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        var fr = $('iframe', el); if (live && !fr.getAttribute('src')) fr.setAttribute('src', fr.getAttribute('data-src'));
      });
    });
    $$('.pin', el).forEach(function (p) { p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); p.dispatchEvent(new MouseEvent('click', { bubbles: true })); } }); });
  }

  /* ------------------------------------------------------------ click delegation, ripple, tilt, accordion */
  function initGlobal() {
    document.addEventListener('click', function (e) {
      var rb = e.target.closest('.btn');
      if (rb && !reduce) { var r = rb.getBoundingClientRect(), s = Math.max(r.width, r.height), sp = document.createElement('span'); sp.className = 'ripple'; sp.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (e.clientX - r.left - s / 2) + 'px;top:' + (e.clientY - r.top - s / 2) + 'px'; rb.appendChild(sp); setTimeout(function () { sp.remove(); }, 700); }
      var lang = e.target.closest('[data-lang]'); if (lang) { PK.i18n.set(lang.getAttribute('data-lang')); var dd = lang.closest('.dd'); if (dd) { dd.classList.remove('is-open'); $('.dd-btn', dd).setAttribute('aria-expanded', 'false'); } return; }
      if (e.target.closest('[data-theme-toggle]')) { setTheme(PK.theme() === 'dark' ? 'light' : 'dark'); return; }
      var q = e.target.closest('.acc-q'); if (q) { var it = q.closest('.acc-item'), o = !it.classList.contains('is-open'); it.classList.toggle('is-open', o); q.setAttribute('aria-expanded', o); return; }
      var op = e.target.closest('[data-open]');
      if (op) {
        if (op.tagName !== 'BUTTON' && !op.hasAttribute('role') && e.target.closest('a, button, input, label, select')) return;
        e.preventDefault();
        var trig = op.tagName === 'BUTTON' ? op : ($('button[data-open]', op) || op);
        PK.modal.openKey(op.getAttribute('data-open'), trig);
      }
    });
    document.addEventListener('keydown', function (e) {
      var op = e.target.closest && e.target.closest('.card[data-open], .step[data-open], .g-item[data-open]');
      if (op && e.target === op && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); PK.modal.openKey(op.getAttribute('data-open'), op); }
    });
    if (finePointer && !reduce) {
      document.addEventListener('pointermove', function (e) {
        var c = e.target.closest && e.target.closest('.card.tilt');
        $$('.card.tilt.is-tilt').forEach(function (x) { if (x !== c) { x.classList.remove('is-tilt'); x.style.transform = ''; } });
        if (!c) return; var r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.classList.add('is-tilt'); c.style.setProperty('--mx', (px * 100) + '%'); c.style.setProperty('--my', (py * 100) + '%');
        c.style.transform = 'perspective(900px) rotateX(' + ((.5 - py) * 5).toFixed(2) + 'deg) rotateY(' + ((px - .5) * 6).toFixed(2) + 'deg) translateY(-6px)';
      });
      document.addEventListener('pointerleave', function () { $$('.card.is-tilt').forEach(function (x) { x.style.transform = ''; }); }, true);
    }
  }

  /* ------------------------------------------------------------ scroll effects */
  function initScroll() {
    var hd = $('#siteHeader'), bar = document.createElement('div'), top = document.createElement('button'), last = 0, tick = false;
    bar.className = 'progress'; document.body.appendChild(bar);
    top.className = 'to-top'; top.type = 'button'; top.setAttribute('aria-label', 'Back to top'); top.innerHTML = I('arrow'); document.body.appendChild(top);
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
    var par = $$('[data-parallax]');
    function upd() {
      var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      hd.classList.toggle('is-solid', y > 40 || $('#mNav').classList.contains('is-open'));
      hd.classList.toggle('is-hidden', y > last + 6 && y > 500 && !$('.dd.is-open') && !$('#mNav.is-open')); if (y < last - 6) hd.classList.remove('is-hidden');
      last = y; bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')'; top.classList.toggle('show', y > 700);
      if (!reduce) par.forEach(function (el) { var sp = parseFloat(el.getAttribute('data-parallax')) || .2; if (y < window.innerHeight * 1.5 || el.hasAttribute('data-parallax-all')) el.style.transform = 'translate3d(0,' + (y * sp).toFixed(1) + 'px,0)'; });
      tick = false;
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]'); if (!a || a.getAttribute('href') === '#') return;
      var t = $(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); try { history.replaceState(null, '', a.getAttribute('href')); } catch (x) {} }
    });
  }

  /* ------------------------------------------------------------ hero */
  var HERO = [{ k: 'adventure', id: 'dune-adventure' }, { k: 'sport', id: 'falcon-s' }, { k: 'electric', id: 'volt-e1' }];
  function heroImg(h) { var p = PK.find(PK.PRODUCTS, h.id); return PK.modelImg(p, 0, p.name); }
  function initHero() {
    var stage = $('#heroStage'); if (!stage) return;
    var host = $('#heroBike'), sw = $('#heroSwitch'), cur = 0, timer;
    function show(i, user) {
      cur = i; host.classList.add('swap');
      setTimeout(function () { host.innerHTML = heroImg(HERO[i]); host.classList.remove('swap'); }, 260);
      $$('button', sw).forEach(function (b, j) { b.setAttribute('aria-pressed', j === i); });
      if (user) { clearInterval(timer); }
    }
    sw.innerHTML = HERO.map(function (h, i) { return '<button type="button" aria-pressed="' + (i === 0) + '" data-i18n="hero.sw.' + h.k + '">' + h.k + '</button>'; }).join('');
    host.innerHTML = heroImg(HERO[0]);
    sw.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) show($$('button', sw).indexOf(b), true); });
    if (!reduce) timer = setInterval(function () { if (!document.hidden) show((cur + 1) % HERO.length); }, 7000);
    var inner = $('.stage-inner', stage);
    if (finePointer && !reduce) {
      stage.addEventListener('pointermove', function (e) { var r = stage.getBoundingClientRect(); inner.style.setProperty('--ry', (((e.clientX - r.left) / r.width - .5) * 12).toFixed(2) + 'deg'); inner.style.setProperty('--rx', ((.5 - (e.clientY - r.top) / r.height) * 8).toFixed(2) + 'deg'); });
      stage.addEventListener('pointerleave', function () { inner.style.setProperty('--ry', '0deg'); inner.style.setProperty('--rx', '0deg'); });
    }
  }

  /* ------------------------------------------------------------ preloader */
  function initPreloader(done) {
    var pre = $('#preloader'); document.body.classList.add('is-loading');
    function finish() {
      if (finish.d) return; finish.d = 1;
      if (pre) { pre.classList.add('done'); setTimeout(function () { pre.style.display = 'none'; }, 1100); }
      document.body.classList.remove('is-loading'); document.body.classList.add('is-ready'); document.documentElement.classList.add('is-ready'); done && done();
    }
    if (!pre || reduce || PK.session.get('seen')) { finish(); return; }
    PK.session.set('seen', '1');
    var bar = $('.pre-bar i', pre), p = 0, loaded = document.readyState === 'complete';
    window.addEventListener('load', function () { loaded = true; });
    var iv = setInterval(function () { p += loaded ? 18 : 6; if (p > 100) p = 100; bar.style.width = (loaded ? p : Math.min(p, 88)) + '%'; if (p >= 100) { clearInterval(iv); setTimeout(finish, 180); } }, 60);
    setTimeout(finish, 2600); // never get stuck
  }

  /* ------------------------------------------------------------ nav active + language hook */
  PK.onLang = function () {
    buildHeader(); buildFooter(); initDropdownsRebind(); PK.renderAll(); setLangUI();
    PK.fire && PK.fire('lang');
  };
  function setLangUI() {
    var l = PK.i18n.lang; $$('[data-lang]').forEach(function (b) { if (b.hasAttribute('aria-checked')) b.setAttribute('aria-checked', b.getAttribute('data-lang') === l); else b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l); });
    var c = $('#langCode'); if (c) c.textContent = l.toUpperCase();
    setTheme(PK.theme());
  }
  var ddBound = false;
  function initDropdownsRebind() { initDropdowns(); initMobileNav(); }

  /* ------------------------------------------------------------ boot */
  PK.listeners = {};
  PK.on = function (n, f) { (PK.listeners[n] = PK.listeners[n] || []).push(f); };
  PK.fire = function (n) { (PK.listeners[n] || []).forEach(function (f) { f(); }); };

  document.addEventListener('DOMContentLoaded', function () {
    PK.i18n.init();
    setTheme(document.documentElement.getAttribute('data-theme') || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    buildHeader(); buildFooter(); initDropdowns(); initMobileNav();
    initGlobal(); initHero(); initScroll();
    PK.renderAll(); setLangUI();
    PK.fire('ready');
    initPreloader(function () { PK.observe(); });
    // keep header sticky style in sync if language rebuilds header
    window.addEventListener('pageshow', function (e) { if (e.persisted) { var p = $('#preloader'); if (p) p.style.display = 'none'; document.body.classList.add('is-ready'); } });
  });
})();
