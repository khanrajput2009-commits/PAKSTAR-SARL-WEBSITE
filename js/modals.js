/* PAKSTAR SARL — modals.js
   One reusable, accessible modal + one lightbox. Single overlay instance (no duplicates).
   Features: Esc / backdrop / button close, focus trap, inert background, scroll lock,
   focus returns to the trigger, scrollable body on small screens. */
(function () {
  'use strict';
  var PK = (window.PK = window.PK || {});
  var $ = PK.$, $$ = PK.$$, L = PK.L, I = PK.icon, esc = PK.esc;
  var BG = '#siteHeader, #mNav, main, #siteFooter, .to-top, .compare-bar';
  var state = { ov: null, trigger: null, kind: null, lbItems: null, lbI: 0 };

  function setBg(on) { $$(BG).forEach(function (e) { if (on) e.setAttribute('inert', ''); else e.removeAttribute('inert'); }); document.body.classList.toggle('is-locked', on); }

  function ensure() {
    if (state.ov) return;
    var ov = document.createElement('div'); ov.className = 'overlay'; ov.id = 'overlay';
    ov.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle" tabindex="-1"><button type="button" class="modal-close" data-close aria-label="Close">' + I('close') + '</button><div class="m-media"></div><div class="m-body"></div></div>';
    document.body.appendChild(ov); state.ov = ov;
    var lb = document.createElement('div'); lb.className = 'overlay lightbox'; lb.id = 'lightbox';
    lb.innerHTML = '<button type="button" class="modal-close lb-x" data-close aria-label="Close">' + I('close') + '</button><div class="lb-stage" role="dialog" aria-modal="true" aria-label="Gallery" tabindex="-1"><button type="button" class="lb-nav prev" aria-label="Previous">' + I('arrow') + '</button><div class="lb-img"></div><button type="button" class="lb-nav next" aria-label="Next">' + I('arrow') + '</button><div class="lb-cap"><span></span><span></span></div></div>';
    lb.querySelector('.prev svg').style.transform = 'rotate(180deg)';
    document.body.appendChild(lb); state.lb = lb;
    [ov, lb].forEach(function (o) { o.addEventListener('click', function (e) { if (e.target === o || e.target.closest('[data-close]')) close(); }); });
    document.addEventListener('keydown', function (e) {
      var o = state.ov.classList.contains('is-open') ? state.ov : state.lb.classList.contains('is-open') ? state.lb : null; if (!o) return;
      if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
      if (o === state.lb) { if (e.key === 'ArrowRight') lbGo(1); if (e.key === 'ArrowLeft') lbGo(-1); }
      if (e.key === 'Tab') {
        var f = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]', o).filter(function (x) { return x.offsetParent !== null; });
        if (!f.length) { e.preventDefault(); return; }
        var first = f[0], last = f[f.length - 1], a = document.activeElement;
        if (e.shiftKey && (a === first || !o.contains(a))) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && (a === last || !o.contains(a))) { e.preventDefault(); first.focus(); }
      }
    });
    lb.querySelector('.prev').addEventListener('click', function () { lbGo(-1); });
    lb.querySelector('.next').addEventListener('click', function () { lbGo(1); });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) lbGo(dx < 0 ? 1 : -1); sx = null; });
    PK.on && PK.on('lang', function () { var c = state.ov.querySelector('[data-close]'); c && c.setAttribute('aria-label', PK.t('btn.close', 'Close')); });
  }

  function show(o, focusEl) {
    o.classList.add('is-open'); o.setAttribute('aria-hidden', 'false'); setBg(true);
    var f = focusEl || o.querySelector('.modal, .lb-stage'); setTimeout(function () { f && f.focus({ preventScroll: true }); }, 30);
  }
  function close() {
    if (!state.ov) return;
    var was = state.ov.classList.contains('is-open') || state.lb.classList.contains('is-open');
    state.ov.classList.remove('is-open'); state.lb.classList.remove('is-open');
    state.ov.setAttribute('aria-hidden', 'true'); state.lb.setAttribute('aria-hidden', 'true'); setBg(false);
    if (was && state.trigger && document.contains(state.trigger)) { try { state.trigger.focus({ preventScroll: true }); } catch (e) {} }
  }

  /* generic open */
  function open(spec, trigger) {
    ensure(); if (state.lb.classList.contains('is-open')) { state.lb.classList.remove('is-open'); }
    state.trigger = trigger || document.activeElement;
    var m = $('.modal', state.ov), media = $('.m-media', state.ov), body = $('.m-body', state.ov);
    m.classList.toggle('narrow', !spec.media); m.style.width = spec.width || '';
    media.style.display = spec.media ? '' : 'none'; media.innerHTML = spec.media || ''; body.innerHTML = spec.body;
    $('[data-close]', state.ov).setAttribute('aria-label', PK.t('btn.close', 'Close'));
    body.scrollTop = 0; PK.i18n.apply(state.ov);
    show(state.ov, m);
    if (spec.after) spec.after(state.ov);
  }

  function btnRow(inquiryModel, extra) {
    return '<div class="btn-row">' + '<a class="btn" href="inquiry.html' + (inquiryModel ? '?model=' + encodeURIComponent(inquiryModel) : '') + '"><span>' + esc(PK.t('btn.inquire', 'Request information')) + '</span>' + I('arrow') + '</a>' + (extra || '') + '</div>';
  }
  

  /* builders */
  var B = {};
  B.product = function (id) {
    var p = PK.find(PK.PRODUCTS, id); if (!p) return null;
    var cat = PK.find(PK.CATS, p.cat);
    var VIEWS = []; for (var vi = 0; vi < PK.modelCount(p); vi++) VIEWS.push(String(vi));
    var thumbs = VIEWS.length < 2 ? '' : VIEWS.map(function (v, i) { return '<button type="button" data-view="' + v + '" aria-pressed="' + (i === 0) + '" aria-label="View ' + (i + 1) + '">' + PK.modelImg(p, v, '') + '</button>'; }).join('');
    var rows = specRows(p).map(function (r) { return '<tr><th>' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('');
    return {
      media: '<div class="m-view" id="mView">' + PK.modelImg(p, 0, p.name) + '</div><div class="m-thumbs">' + thumbs + '</div>',
      body: '<span class="kicker">' + esc(L(cat.name)) + '</span><h2 id="mTitle">' + esc(p.name) + '</h2>' +
        '<p class="sample-note">' + I('info') + '<span>' + esc(PK.t('sample.note', 'Sample catalogue entry. Illustration and class-level specifications are indicative only; final details to be confirmed by PAKSTAR SARL.')) + '</span></p>' +
        '<p>' + esc(L(p.desc)) + '</p><table class="spec-table"><tbody>' + rows + '</tbody></table>' +
        '<h3 style="font-size:1.2rem">' + esc(PK.t('pd.features', 'Key features')) + '</h3><ul class="feat-list">' + p.feats.map(function (f) { return '<li>' + I('check') + '<span>' + esc(L(f)) + '</span></li>'; }).join('') + '</ul>' +
        btnRow(p.id, '<a class="btn ghost" href="product-details.html?id=' + p.id + '"><span>' + esc(PK.t('btn.fulldetails', 'Full details')) + '</span></a>'),
      after: function (ov) {
        $$('.m-thumbs button', ov).forEach(function (b) {
          b.addEventListener('click', function () { $('#mView', ov).innerHTML = PK.modelImg(p, b.getAttribute('data-view'), p.name); $$('.m-thumbs button', ov).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); });
        });
      }
    };
  };
  function specRows(p) {
    return [[PK.t('pd.spec.cat', 'Category'), L(PK.find(PK.CATS, p.cat).name)], [PK.t('pd.spec.eng', 'Engine / motor class'), p.eng + ' ' + PK.t('pd.indic', '(indicative)')], [PK.t('pd.spec.trans', 'Transmission'), L(PK.TRANS[p.trans])], [PK.t('pd.spec.fuel', 'Power'), L(PK.FUEL[p.fuel])], [PK.t('pd.spec.use', 'Best for'), L(p.use)], [PK.t('pd.spec.price', 'Price'), PK.t('pd.price.ph', '[Verified price in DJF]')]];
  }
  PK.specRows = specRows;

  B.cat = function (id) {
    var c = PK.find(PK.CATS, id); if (!c) return null;
    var models = PK.PRODUCTS.filter(function (p) { return p.cat === id; });
    return { media: '<div class="m-view">' + PK.catImg(c, L(c.name)) + '</div>',
      body: '<span class="kicker">' + esc(PK.t('kicker.cat', 'Category')) + '</span><h2 id="mTitle">' + esc(L(c.name)) + '</h2><p>' + esc(L(c.long)) + '</p>' +
        '<h3 style="font-size:1.2rem">' + esc(PK.t('modal.models', 'Sample models')) + '</h3><div class="specline" style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.4rem">' + models.map(function (p) { return '<a class="pill" href="product-details.html?id=' + p.id + '">' + esc(p.name) + '</a>'; }).join('') + '</div>' +
        '<div class="btn-row"><a class="btn" href="motorcycles.html?cat=' + c.id + '"><span>' + esc(PK.t('btn.models', 'View models')) + '</span>' + I('arrow') + '</a><a class="btn ghost" href="inquiry.html"><span>' + esc(PK.t('btn.inquire', 'Request information')) + '</span></a></div>' };
  };
  function iconModal(list, kicker) {
    return function (id) {
      var c = PK.find(list, id) || list[+id]; if (!c) return null;
      return { media: '<div class="m-view"><div class="big-ico">' + I(c.icon || 'sparkle') + '</div></div>',
        body: '<span class="kicker">' + esc(PK.t(kicker[0], kicker[1])) + '</span><h2 id="mTitle">' + esc(L(c.t)) + '</h2><p>' + esc(L(c.m)) + '</p>' + btnRow('', '<a class="btn ghost" href="contact.html"><span>' + esc(PK.t('nav.contact', 'Contact')) + '</span></a>') };
    };
  }
  B.feat = iconModal(PK.FEATURES, ['kicker.feat', 'Why PAKSTAR']);
  B.value = iconModal(PK.VALUES, ['kicker.value', 'Our values']);
  B.tip = iconModal(PK.TIPS, ['kicker.tip', 'Riding tip']);
  B.step = function (id) {
    var s = PK.STEPS[+id]; if (!s) return null;
    return { media: '<div class="m-view"><div class="big-ico" style="font:800 9rem/1 var(--font-d)">0' + (+id + 1) + '</div></div>', body: '<span class="kicker">' + esc(PK.t('kicker.step', 'Step')) + ' ' + (+id + 1) + '</span><h2 id="mTitle">' + esc(L(s.t)) + '</h2><p>' + esc(L(s.m)) + '</p>' + btnRow('') };
  };
  B.place = function (id) {
    var p = PK.find(PK.PLACES, id); if (!p) return null;
    var url = 'https://www.openstreetmap.org/?mlat=' + p.lat + '&mlon=' + p.lon + '#map=12/' + p.lat + '/' + p.lon;
    return { media: '<div class="m-view">' + PK.placeImg(p, L(p.name)) + '</div>',
      body: '<span class="kicker">' + esc(L(p.tag)) + '</span><h2 id="mTitle">' + esc(L(p.name)) + '</h2><p>' + esc(L(p.m)) + '</p>' +
        '<p class="sample-note">' + I('pin') + '<span>' + p.lat.toFixed(3) + '° N, ' + p.lon.toFixed(3) + '° E · ' + esc(PK.t('place.approx', 'approximate position')) + '</span></p>' +
        '<div class="btn-row"><a class="btn" target="_blank" rel="noopener" href="' + url + '"><span>' + esc(PK.t('btn.openmap', 'Open in OpenStreetMap')) + '</span>' + I('arrow') + '</a><a class="btn ghost" href="inquiry.html"><span>' + esc(PK.t('btn.inquire', 'Request information')) + '</span></a></div>' };
  };
  B.news = function (id) {
    var n = PK.find(PK.NEWS, id); if (!n) return null;
    return { media: '<div class="m-view">' + PK.newsImg(n, L(n.t)) + '</div>',
      body: '<span class="kicker">' + esc(L(n.cat)) + ' · ' + esc(L(n.date)) + '</span><h2 id="mTitle" style="font-size:clamp(1.8rem,3.4vw,2.4rem)">' + esc(L(n.t)) + '</h2><p class="sample-note">' + I('info') + '<span>' + esc(PK.t('demo.note', 'Demonstration content: replace with genuine company news before publishing.')) + '</span></p><p>' + esc(L(n.m)) + '</p>' + btnRow('') };
  };

  PK.modal = {
    close: close, open: open, builders: B,
    openKey: function (key, trigger) {
      var i = key.indexOf(':'), kind = key.slice(0, i), id = key.slice(i + 1);
      if (kind === 'gallery') { PK.lightbox(PK.GALLERY.map(PK.galleryItem), +id, trigger); return; }
      var f = B[kind]; var spec = f && f(id); if (spec) open(spec, trigger);
    }
  };

  /* lightbox */
  function lbRender() {
    var it = state.lbItems[state.lbI], img = $('.lb-img', state.lb);
    img.innerHTML = PK.photo.img(it.src, it.alt, it.bg, 'contain');
    $('.lb-cap span', state.lb).textContent = it.cap; $('.lb-cap span:last-child', state.lb).textContent = (state.lbI + 1) + ' / ' + state.lbItems.length;
    $('.lb-stage', state.lb).setAttribute('aria-label', it.alt);
  }
  function lbGo(d) { var n = state.lbItems.length; state.lbI = (state.lbI + d + n) % n; lbRender(); }
  PK.lightbox = function (items, i, trigger) {
    ensure(); state.ov.classList.remove('is-open'); state.lbItems = items; state.lbI = i || 0; state.trigger = trigger || document.activeElement;
    $$('.lb-nav', state.lb)[0].setAttribute('aria-label', PK.t('btn.prev', 'Previous')); $$('.lb-nav', state.lb)[1].setAttribute('aria-label', PK.t('btn.next', 'Next'));
    $('[data-close]', state.lb).setAttribute('aria-label', PK.t('btn.close', 'Close'));
    lbRender(); show(state.lb, $('.lb-stage', state.lb));
  };
  PK.lbOpenWith = PK.lightbox;

  document.addEventListener('DOMContentLoaded', ensure);
})();
