/* PAKSTAR SARL — storage.js
   Safe preference store for NON-sensitive UI settings only (language, theme, music, comparison list).
   Order: localStorage -> window.name (survives page changes in the same tab, even when storage is blocked) -> cookie
   -> memory. Not a database and never used for personal data. */
(function () {
  'use strict';
  var PK = (window.PK = window.PK || {});
  var mem = {}, NP = 'PKS:';
  function nameRead() { try { if (String(window.name).indexOf(NP) === 0) return JSON.parse(window.name.slice(NP.length)) || {}; } catch (e) {} return {}; }
  function nameWrite(o) { try { window.name = NP + JSON.stringify(o); } catch (e) {} }
  function ckGet(k) { try { var m = document.cookie.match(new RegExp('(?:^|; )pk_' + k + '=([^;]*)')); return m ? JSON.parse(decodeURIComponent(m[1])) : null; } catch (e) { return null; } }
  function ckSet(k, v) { try { document.cookie = 'pk_' + k + '=' + encodeURIComponent(JSON.stringify(v)) + ';path=/;max-age=31536000;SameSite=Lax'; } catch (e) {} }
  PK.store = {
    get: function (k, d) {
      try { var v = localStorage.getItem('pk.' + k); if (v !== null) return JSON.parse(v); } catch (e) {}
      var n = nameRead(); if (k in n) return n[k];
      var c = ckGet(k); if (c !== null) return c;
      return k in mem ? mem[k] : d;
    },
    set: function (k, v) {
      mem[k] = v; var n = nameRead(); n[k] = v; nameWrite(n); ckSet(k, v);
      try { localStorage.setItem('pk.' + k, JSON.stringify(v)); } catch (e) {}
    },
    remove: function (k) { delete mem[k]; var n = nameRead(); delete n[k]; nameWrite(n); try { document.cookie = 'pk_' + k + '=;path=/;max-age=0'; } catch (e) {} try { localStorage.removeItem('pk.' + k); } catch (e) {} }
  };
  PK.session = {
    get: function (k) { try { return sessionStorage.getItem('pk.' + k); } catch (e) { return mem['s_' + k] || null; } },
    set: function (k, v) { mem['s_' + k] = v; try { sessionStorage.setItem('pk.' + k, v); } catch (e) {} }
  };
})();
