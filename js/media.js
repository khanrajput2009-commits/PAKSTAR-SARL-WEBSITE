/* PAKSTAR SARL — media.js : real photography + video registry.
   Photos live in assets/images, videos in assets/video. To add a photo to a model, append it to its list. */
(function () {
  'use strict';
  var PK = (window.PK = window.PK || {});
  var M = (PK.MEDIA = {});
  var I = 'assets/images/';
  function m(id, n, bgs) { var a = [], i; for (i = 1; i <= n; i++) a.push(I + 'models/' + id + '-' + i + '.jpg'); return { imgs: a, bg: bgs }; }
  M.models = {
    'falcon-s': m('falcon-s', 2, ['#f3f3f3', '#d8d9dc']),
    'nomad-125': m('nomad-125', 2, ['#eceff1', '#ecf0f1']),
    'urban-150': m('urban-150', 2, ['#f5f5f5', '#f3f3f3']),
    'ray-zr': m('ray-zr', 2, ['#010101', '#090909']),
    'dune-adventure': m('dune-adventure', 2, ['#000', '#000']),
    'atlas-300': { imgs: [I + 'models/atlas-1.jpg'], bg: ['#000'] },
    'volt-e1': m('volt-e1', 2, ['#000', '#000']),
    'hauler-t33': m('hauler-t33', 2, ['#949596', '#7e7f80'])
  };
  /* category cover = a model photo */
  M.cats = { commuter: ['urban-150', 0], sport: ['falcon-s', 0], adventure: ['dune-adventure', 0], cruiser: ['atlas-300', 0], scooter: ['ray-zr', 0], electric: ['volt-e1', 0], cargo: ['hauler-t33', 0] };
  M.places = {}; ['djibouti-city', 'ali-sabieh', 'dikhil', 'tadjoura', 'obock', 'arta', 'lake-assal'].forEach(function (k) { M.places[k] = I + 'places/' + k + '.jpg'; });
  M.placeKey = { djibouti: 'djibouti-city', assal: 'lake-assal' };
  M.scenes = { showroom: I + 'about/showroom.jpg', adventure: I + 'news/news-2.jpg', coast: I + 'news/news-3.jpg', factory: I + 'news/news-4.jpg', race: I + 'news/news-6.jpg', reveal: I + 'news/news-1.jpg' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function img(src, alt, bg, cls) { return '<img class="ph ' + (cls || '') + '" src="' + src + '" alt="' + esc(alt || '') + '" loading="lazy" decoding="async"' + (bg ? ' style="--pbg:' + bg + '"' : '') + '>'; }
  PK.photo = { img: img };
  PK.modelImg = function (p, i, alt, cls) { var d = M.models[p.id]; if (!d) return PK.art.bike(p.type, { color: p.color, label: alt }); i = Math.max(0, Math.min(+i || 0, d.imgs.length - 1)); return img(d.imgs[i], alt || p.name, d.bg[i], 'contain ' + (cls || '')); };
  PK.modelCount = function (p) { var d = M.models[p.id]; return d ? d.imgs.length : 1; };
  PK.catImg = function (c, alt) { var r = M.cats[c.id]; var d = r && M.models[r[0]]; if (!d) return ''; return img(d.imgs[r[1]], alt, d.bg[r[1]], 'contain'); };
  PK.placeImg = function (p, alt) { var k = M.placeKey[p.id] || p.id; return img(M.places[k], alt); };
  PK.newsImg = function (n, alt) { return img(I + 'news/news-' + String(n.id).slice(1) + '.jpg', alt); };
  PK.sceneImg = function (k, alt) { return img(M.scenes[k], alt); };

  /* ---------- video controller ---------- */
  PK.video = {
    init: function () {
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      var save = navigator.connection && navigator.connection.saveData;
      Array.prototype.forEach.call(document.querySelectorAll('video[data-src]'), function (v) {
        if (reduce || save) { v.removeAttribute('autoplay'); return; }
        var u = v.getAttribute('data-src'); if (!v.canPlayType('video/mp4; codecs="avc1.42E01E"') && v.canPlayType('video/webm')) u = u.replace(/\.mp4$/, '.webm'); v.src = u; v.muted = true; v.setAttribute('playsinline', '');
        var go = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
        v.addEventListener('canplay', function () { v.classList.add('is-on'); go(); }, { once: true });
        if ('IntersectionObserver' in window && !v.hasAttribute('data-fixed')) {
          new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) go(); else v.pause(); }); }, { threshold: .05 }).observe(v);
        }
        document.addEventListener('visibilitychange', function () { if (document.hidden) v.pause(); else go(); });
      });
    }
  };
  document.addEventListener('DOMContentLoaded', PK.video.init);
  /* ---------- background music (opt-in; browsers block autoplay with sound) ---------- */
  PK.music = {
    init: function () {
      var a = new Audio('assets/audio/ambient.mp3'); a.loop = true; a.preload = 'none'; a.volume = 0;
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'music-btn';
      btn.innerHTML = '<svg viewBox="0 0 24 24" class="mi-ico" aria-hidden="true"><path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.2"/><circle cx="17" cy="16" r="2.2"/></svg><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';
      document.body.appendChild(btn);
      var on = false, fade;
      function label() { var k = on ? 'music.off' : 'music.on'; btn.setAttribute('aria-label', PK.t ? PK.t(k, on ? 'Turn music off' : 'Turn music on') : k); btn.title = btn.getAttribute('aria-label'); btn.setAttribute('aria-pressed', on); btn.classList.toggle('is-on', on); }
      function ramp(to, done) { clearInterval(fade); fade = setInterval(function () { var d = to - a.volume; if (Math.abs(d) < .03) { a.volume = to; clearInterval(fade); done && done(); } else a.volume = Math.max(0, Math.min(1, a.volume + Math.sign(d) * .03)); }, 60); }
      function play() { var p = a.play(); if (p && p.then) p.then(function () { on = true; PK.store.set('music', true); label(); ramp(.35); }).catch(function () { on = false; label(); }); else { on = true; label(); ramp(.35); } }
      function stop(save) { on = false; if (save !== false) PK.store.set('music', false); label(); ramp(0, function () { a.pause(); }); }
      btn.addEventListener('click', function () { if (on) stop(); else play(); });
      document.addEventListener('visibilitychange', function () { if (document.hidden && on) a.pause(); else if (!document.hidden && on) a.play().catch(function () {}); });
      if (PK.on) PK.on('lang', label);
      label();
      if (PK.store.get('music', false)) { var go = function () { document.removeEventListener('pointerdown', go); document.removeEventListener('keydown', go); if (!on) play(); }; document.addEventListener('pointerdown', go, { once: true }); document.addEventListener('keydown', go, { once: true }); }
    }
  };
  document.addEventListener('DOMContentLoaded', function () { setTimeout(PK.music.init, 0); });
})();
