/* PAKSTAR SARL — products.js
   Product cards, catalogue filtering/sorting, comparison (stored locally), product detail page, gallery.
   Every product card carries data-open="product:<id>" which opens the shared product modal. */
(function () {
  'use strict';
  var PK = (window.PK = window.PK || {});
  var $ = PK.$, $$ = PK.$$, L = PK.L, I = PK.icon, esc = PK.esc;
  PK.R2 = PK.R2 || {};

  PK.productCard = function (p, i, opt) {
    opt = opt || {};
    var cat = PK.find(PK.CATS, p.cat), key = 'product:' + p.id, on = (PK.store.get('compare', []) || []).indexOf(p.id) > -1;
    return '<article class="card product reveal tilt" style="--i:' + (i % 6) + '" data-open="' + key + '" data-id="' + p.id + '">' +
      '<div class="media"><span class="tag">' + esc(L(p.tag)) + '</span>' + PK.modelImg(p, 0, p.name + ' — ' + L(cat.name)) +
      (opt.compare ? '<label class="compare-chk"><input type="checkbox" data-cmp="' + p.id + '"' + (on ? ' checked' : '') + '><span>' + esc(PK.t('btn.compare', 'Compare')) + '</span></label>' : '') + '</div>' +
      '<div class="body"><h3>' + esc(p.name) + '</h3><p>' + esc(L(p.desc)) + '</p>' +
      '<div class="specline"><span class="pill">' + esc(p.eng) + '</span><span class="pill">' + esc(L(PK.TRANS[p.trans])) + '</span><span class="pill">' + esc(L(PK.FUEL[p.fuel])) + '</span></div>' +
      '<div class="foot"><button type="button" class="btn sm" data-open="' + key + '"><span>' + esc(PK.t('btn.quick', 'Quick view')) + '</span>' + I('arrow') + '</button><a class="link-arrow" href="inquiry.html?model=' + p.id + '">' + esc(PK.t('btn.inquire.short', 'Inquire')) + I('arrow') + '</a></div></div></article>';
  };

  /* featured (home) */
  PK.R2.featured = function (el) {
    var ids = ['falcon-s', 'nomad-125', 'ray-zr', 'dune-adventure', 'atlas-300', 'volt-e1'];
    el.innerHTML = ids.map(function (id, i) { return PK.productCard(PK.find(PK.PRODUCTS, id), i); }).join('');
  };

  /* gallery */
  PK.GALLERY = [
    { m: 'dune-adventure', i: 0, cap: 'Dune Adventure', alt: 'Dune Adventure adventure motorcycle, side view' },
    { m: 'falcon-s', i: 0, cap: 'Falcon S', alt: 'Falcon S sport motorcycle, side view' },
    { m: 'nomad-125', i: 0, cap: 'Nomad 125', alt: 'Nomad 125 commuter motorcycle, side view' },
    { m: 'volt-e1', i: 0, cap: 'Volt E1', alt: 'Volt E1 electric motorcycle, side view' },
    { m: 'ray-zr', i: 0, cap: 'Ray ZR', alt: 'Ray ZR scooter, side view' },
    { m: 'hauler-t33', i: 0, cap: 'Hauler T33', alt: 'Hauler T33 three-wheeler, side view' }
  ];
  PK.galleryItem = function (g) { var d = PK.MEDIA.models[g.m]; return { src: d.imgs[g.i], bg: d.bg[g.i], cap: g.cap, alt: g.alt }; };
  PK.R2.gallery = function (el) {
    el.innerHTML = PK.GALLERY.slice(0, 6).map(function (g, i) {
      return '<figure class="g-item reveal zoom" style="--i:' + (i % 4) + '" tabindex="0" role="button" data-open="gallery:' + i + '" aria-label="' + esc(g.alt) + '">' + PK.photo.img(PK.galleryItem(g).src, g.alt, PK.galleryItem(g).bg, 'contain') + '<figcaption>' + esc(g.cap) + '</figcaption></figure>';
    }).join('');
  };

  /* ------------------------------------------------------------ catalogue */
  var F = { cat: 'all', trans: 'all', q: '', sort: 'name' };
  function cmpList() { return PK.store.get('compare', []) || []; }
  function saveCmp(l) { PK.store.set('compare', l); updateBar(); }
  function updateBar() {
    var bar = $('#cmpBar'); if (!bar) return; var l = cmpList().filter(function (id) { return PK.find(PK.PRODUCTS, id); });
    bar.classList.toggle('show', l.length > 0);
    $('.cmp-count', bar).textContent = l.length + ' / 3 ' + PK.t('cmp.selected', 'selected');
    $('.cmp-go', bar).disabled = l.length < 2;
    $$('[data-cmp]').forEach(function (c) { c.checked = l.indexOf(c.getAttribute('data-cmp')) > -1; });
  }
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function filtered() {
    var r = PK.PRODUCTS.filter(function (p) {
      if (F.cat !== 'all' && p.cat !== F.cat) return false;
      if (F.trans !== 'all' && p.trans !== F.trans) return false;
      if (F.q) { var hay = norm(p.name + ' ' + L(p.desc) + ' ' + L(p.tag) + ' ' + L(PK.find(PK.CATS, p.cat).name)); if (hay.indexOf(norm(F.q)) < 0) return false; }
      return true;
    });
    r.sort(function (a, b) {
      if (F.sort === 'cat') { var ia = PK.CATS.findIndex(function (c) { return c.id === a.cat; }), ib = PK.CATS.findIndex(function (c) { return c.id === b.cat; }); return ia - ib || a.name.localeCompare(b.name); }
      return a.name.localeCompare(b.name);
    });
    return r;
  }
  function renderCatalog() {
    var grid = $('#catalogGrid'); if (!grid) return;
    var list = filtered();
    $('#catChips').innerHTML = '<button type="button" class="fchip" data-cat="all" aria-pressed="' + (F.cat === 'all') + '">' + esc(PK.t('f.all', 'All')) + '</button>' + PK.CATS.map(function (c) { return '<button type="button" class="fchip" data-cat="' + c.id + '" aria-pressed="' + (F.cat === c.id) + '">' + esc(L(c.name)) + '</button>'; }).join('');
    grid.innerHTML = list.length ? list.map(function (p, i) { return PK.productCard(p, i, { compare: true }); }).join('') : '<div class="empty"><h3>' + esc(PK.t('f.empty.t', 'No models match your filters')) + '</h3><p>' + esc(PK.t('f.empty.p', 'Try another category or reset the filters.')) + '</p><button type="button" class="btn" id="emptyReset"><span>' + esc(PK.t('f.reset', 'Reset filters')) + '</span></button></div>';
    $('#count').textContent = list.length + ' ' + PK.t(list.length === 1 ? 'f.model' : 'f.models', list.length === 1 ? 'model' : 'models');
    PK.observe(grid); updateBar();
  }
  function initCatalog() {
    var grid = $('#catalogGrid'); if (!grid) return;
    var q = new URLSearchParams(location.search), c = q.get('cat'); if (c && PK.find(PK.CATS, c)) F.cat = c;
    var bar = document.createElement('div'); bar.className = 'compare-bar'; bar.id = 'cmpBar';
    bar.innerHTML = I('compare') + '<span class="cmp-count"></span><button type="button" class="btn sm cmp-go" disabled><span>' + esc(PK.t('btn.comparenow', 'Compare now')) + '</span></button><button type="button" class="btn sm light cmp-clear"><span>' + esc(PK.t('btn.clear', 'Clear')) + '</span></button>';
    document.body.appendChild(bar);
    var s = $('#fq'), t = $('#ft'), o = $('#fs'); t.value = F.trans;
    function reset() { F = { cat: 'all', trans: 'all', q: '', sort: 'name' }; s.value = ''; t.value = 'all'; o.value = 'name'; renderCatalog(); }
    $('#filters').addEventListener('click', function (e) { var b = e.target.closest('[data-cat]'); if (b) { F.cat = b.getAttribute('data-cat'); renderCatalog(); } if (e.target.closest('#fReset')) reset(); });
    s.addEventListener('input', function () { F.q = s.value.trim(); renderCatalog(); });
    t.addEventListener('change', function () { F.trans = t.value; renderCatalog(); });
    o.addEventListener('change', function () { F.sort = o.value; renderCatalog(); });
    grid.addEventListener('click', function (e) { if (e.target.closest('#emptyReset')) reset(); });
    grid.addEventListener('change', function (e) {
      var c2 = e.target.closest('[data-cmp]'); if (!c2) return; var id = c2.getAttribute('data-cmp'), l = cmpList();
      if (c2.checked) { if (l.length >= 3) { c2.checked = false; PK.toast(PK.t('cmp.max', 'You can compare up to 3 motorcycles.'), 'info'); return; } l.push(id); } else l = l.filter(function (x) { return x !== id; });
      saveCmp(l);
    });
    bar.addEventListener('click', function (e) {
      if (e.target.closest('.cmp-clear')) saveCmp([]);
      if (e.target.closest('.cmp-go')) openCompare(e.target.closest('.cmp-go'));
    });
    PK.on('lang', renderCatalog);
    renderCatalog();
  }
  function openCompare(trigger) {
    var items = cmpList().map(function (id) { return PK.find(PK.PRODUCTS, id); }).filter(Boolean); if (items.length < 2) return;
    var rows = [
      [PK.t('pd.spec.cat', 'Category'), function (p) { return L(PK.find(PK.CATS, p.cat).name); }], [PK.t('pd.spec.eng', 'Engine / motor class'), function (p) { return p.eng; }],
      [PK.t('pd.spec.trans', 'Transmission'), function (p) { return L(PK.TRANS[p.trans]); }], [PK.t('pd.spec.fuel', 'Power'), function (p) { return L(PK.FUEL[p.fuel]); }], [PK.t('pd.spec.use', 'Best for'), function (p) { return L(p.use); }]
    ];
    var head = '<tr><th></th>' + items.map(function (p) { return '<td><b style="font:700 1.4rem var(--font-d);text-transform:uppercase">' + esc(p.name) + '</b><br><button type="button" class="cmp-rm" data-rm="' + p.id + '">' + esc(PK.t('btn.remove', 'Remove')) + '</button></td>'; }).join('') + '</tr>';
    var body = rows.map(function (r) { var vals = items.map(r[1]), diff = vals.some(function (v) { return v !== vals[0]; }); return '<tr><th>' + esc(r[0]) + '</th>' + vals.map(function (v) { return '<td class="' + (diff ? 'diff' : '') + '">' + esc(v) + '</td>'; }).join('') + '</tr>'; }).join('');
    PK.modal.open({ width: 'min(900px,100%)', body: '<span class="kicker">' + esc(PK.t('btn.compare', 'Compare')) + '</span><h2 id="mTitle">' + esc(PK.t('cmp.title', 'Side-by-side comparison')) + '</h2><p class="sample-note">' + I('info') + '<span>' + esc(PK.t('sample.note', 'Sample catalogue entry. Illustration and class-level specifications are indicative only; final details to be confirmed by PAKSTAR SARL.')) + '</span></p><div class="cmp-scroll"><table class="cmp-table"><tbody>' + head + body + '</tbody></table></div>',
      after: function (ov) { if (ov._cmpH) ov.removeEventListener('click', ov._cmpH); ov._cmpH = function (e) { var rm = e.target.closest('[data-rm]'); if (!rm) return; saveCmp(cmpList().filter(function (x) { return x !== rm.getAttribute('data-rm'); })); PK.modal.close(); if (cmpList().length > 1) setTimeout(function () { openCompare(trigger); }, 120); }; ov.addEventListener('click', ov._cmpH); } }, trigger);
  }

  /* ------------------------------------------------------------ product detail page */
  PK.R2.pdetail = function (el) {
    var id = new URLSearchParams(location.search).get('id'), p = PK.find(PK.PRODUCTS, id) || null;
    if (!p) { el.innerHTML = '<div class="empty"><h3>' + esc(PK.t('pd.notfound', 'Model not found')) + '</h3><p>' + esc(PK.t('pd.notfound.p', 'Choose a model from the catalogue.')) + '</p><a class="btn" href="motorcycles.html"><span>' + esc(PK.t('nav.motorcycles', 'Motorcycles')) + '</span></a></div>'; return; }
    var cat = PK.find(PK.CATS, p.cat), views = []; for (var vi = 0; vi < PK.modelCount(p); vi++) views.push(String(vi)); var cur = el.getAttribute('data-view') || '0';
    var h1 = $('#pdTitle'); if (h1) h1.textContent = p.name; var cr = $('#pdCrumb'); if (cr) cr.textContent = p.name; document.title = p.name + ' — PAKSTAR SARL'; var tt = $('title'); if (tt) tt.removeAttribute('data-i18n');
    var rows = PK.specRows(p).map(function (r) { return '<tr><th>' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('');
    var related = PK.PRODUCTS.filter(function (x) { return x.id !== p.id; }).sort(function (a, b) { return (b.cat === p.cat) - (a.cat === p.cat); }).slice(0, 3);
    el.innerHTML = '<div class="pd"><div><div class="pd-main reveal zoom" id="pdMain" role="button" tabindex="0" aria-label="' + esc(PK.t('pd.zoom', 'Open gallery')) + '">' + PK.modelImg(p, cur, p.name) + '</div><div class="thumbs" id="pdThumbs">' +
      views.map(function (v) { return '<button type="button" class="thumb" data-view="' + v + '" aria-pressed="' + (v === cur) + '" aria-label="' + esc(p.name + ' ' + (+v + 1)) + '">' + PK.modelImg(p, v, '') + '</button>'; }).join('') + '</div></div>' +
      '<div class="reveal from-right"><span class="eyebrow">' + esc(L(cat.name)) + '</span><h2>' + esc(p.name) + '</h2><p class="sample-note">' + I('info') + '<span>' + esc(PK.t('sample.note', 'Sample catalogue entry. Illustration and class-level specifications are indicative only; final details to be confirmed by PAKSTAR SARL.')) + '</span></p><p class="lead" style="font-size:1.05rem">' + esc(L(p.desc)) + '</p>' +
      '<table class="spec-table"><tbody>' + rows + '</tbody></table><h3 style="font-size:1.3rem">' + esc(PK.t('pd.features', 'Key features')) + '</h3><ul class="feat-list">' + p.feats.map(function (f) { return '<li>' + I('check') + '<span>' + esc(L(f)) + '</span></li>'; }).join('') + '</ul>' +
      '<div class="btn-row"><a class="btn" href="inquiry.html?model=' + p.id + '"><span>' + esc(PK.t('btn.inquire', 'Request information')) + '</span>' + I('arrow') + '</a><a class="btn ghost" href="motorcycles.html?cat=' + p.cat + '"><span>' + esc(PK.t('btn.back', 'Back to catalogue')) + '</span></a></div></div></div>' +
      '<div style="margin-top:5rem"><div class="sec-head"><span class="eyebrow">' + esc(PK.t('pd.related', 'Related models')) + '</span><h2>' + esc(PK.t('pd.related.t', 'You may also like')) + '</h2></div><div class="grid g3">' + related.map(function (r, i) { return PK.productCard(r, i); }).join('') + '</div></div>';
    function setView(v) { el.setAttribute('data-view', v); cur = v; $('#pdMain').innerHTML = PK.modelImg(p, v, p.name); $$('#pdThumbs .thumb').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-view') === v); }); }
    $('#pdThumbs').addEventListener('click', function (e) { var b = e.target.closest('.thumb'); if (b) setView(b.getAttribute('data-view')); });
    function lb(trig) { PK.lightbox(views.map(function (v) { var d = PK.MEDIA.models[p.id]; return { src: d.imgs[+v], bg: d.bg[+v], cap: p.name + ' — ' + (+v + 1) + '/' + views.length, alt: p.name + ', photo ' + (+v + 1) }; }), views.indexOf(cur), trig); }
    var main = $('#pdMain'); main.addEventListener('click', function () { lb(main); }); main.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lb(main); } });
  };

  document.addEventListener('DOMContentLoaded', initCatalog);
})();
