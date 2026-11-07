/* PAKSTAR SARL — original vector motorcycle illustrations.
   Generic, brand-neutral artwork generated in code (no manufacturer logos, no external images).
   These are ILLUSTRATIVE PLACEHOLDERS — replace with verified product photography when available. */
(function () {
  'use strict';
  var PK = (window.PK = window.PK || {});
  var uid = 0;

  function shade(hex, amt) {
    var c = String(hex).replace('#', '');
    if (c.length === 3) c = c.split('').map(function (x) { return x + x; }).join('');
    var n = parseInt(c, 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function f(v) { return Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt))); }
    return '#' + [f(r), f(g), f(b)].map(function (v) { return v.toString(16).padStart(2, '0'); }).join('');
  }

  function defs(u, c) {
    var l = shade(c, 0.4), d = shade(c, -0.45);
    return '<defs>' +
      '<linearGradient id="b' + u + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + l + '"/><stop offset=".5" stop-color="' + c + '"/><stop offset="1" stop-color="' + d + '"/></linearGradient>' +
      '<linearGradient id="s' + u + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f6fa"/><stop offset=".5" stop-color="#a7b0bc"/><stop offset="1" stop-color="#5b6470"/></linearGradient>' +
      '<linearGradient id="e' + u + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3d4450"/><stop offset="1" stop-color="#14171c"/></linearGradient>' +
      '<radialGradient id="g' + u + '" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="' + c + '" stop-opacity=".38"/><stop offset="1" stop-color="' + c + '" stop-opacity="0"/></radialGradient>' +
      '</defs>';
  }

  function wheel(cx, cy, r, o) {
    o = o || {};
    var t = o.tire || 11, ri = r - t, n = o.spokes || 10, rim = o.rim || '#c4ccd6';
    var s = '<g transform="translate(' + cx + ' ' + cy + ')"><g class="wspin"><circle r="' + r + '" fill="#0b0d10"/>';
    if (o.knobby) s += '<circle r="' + (r - 2.5) + '" fill="none" stroke="#2d323b" stroke-width="5" stroke-dasharray="7 5"/>';
    s += '<circle r="' + ri + '" fill="#171a20"/>';
    s += '<circle r="' + ri + '" fill="none" stroke="' + rim + '" stroke-width="3.6"/>';
    s += '<circle r="' + (ri * 0.46).toFixed(1) + '" fill="none" stroke="#818b98" stroke-width="3"/>';
    s += '<circle r="' + (ri * 0.46 - 6).toFixed(1) + '" fill="none" stroke="#4c535d" stroke-width="1.5" stroke-dasharray="3 4"/>';
    for (var i = 0; i < n; i++) {
      var a = i * Math.PI * 2 / n;
      s += '<line x1="' + (9 * Math.cos(a)).toFixed(1) + '" y1="' + (9 * Math.sin(a)).toFixed(1) + '" x2="' + ((ri - 2) * Math.cos(a)).toFixed(1) + '" y2="' + ((ri - 2) * Math.sin(a)).toFixed(1) + '" stroke="' + rim + '" stroke-width="' + (o.thick ? 4.6 : 2) + '" stroke-linecap="round"/>';
    }
    return s + '<circle r="9" fill="#d6dce4" stroke="#5a626d" stroke-width="2"/><circle r="3.5" fill="#5a626d"/></g></g>';
  }

  function arc(cx, cy, r, a1, a2) {
    var p1 = [cx + r * Math.cos(a1 * Math.PI / 180), cy + r * Math.sin(a1 * Math.PI / 180)];
    var p2 = [cx + r * Math.cos(a2 * Math.PI / 180), cy + r * Math.sin(a2 * Math.PI / 180)];
    return 'M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + ' A' + r + ' ' + r + ' 0 0 1 ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
  }

  function fins(x1, x2, y0, n, gap) {
    var s = '';
    for (var i = 0; i < n; i++) s += '<line x1="' + x1 + '" x2="' + x2 + '" y1="' + (y0 + i * gap) + '" y2="' + (y0 + i * gap) + '" stroke="#69717d" stroke-width="2"/>';
    return s;
  }

  /* ---------------------------------------------------------------- bikes */
  var T = {};

  T.sport = function (u) {
    var B = 'url(#b' + u + ')', S = 'url(#s' + u + ')', E = 'url(#e' + u + ')';
    return [
      wheel(118, 244, 58, { rim: '#aeb7c3', spokes: 5, thick: true }),
      wheel(484, 244, 58, { rim: '#aeb7c3', spokes: 5, thick: true }),
      '<path d="M334 212C304 246 252 258 196 252L104 234L102 220L200 234C252 238 294 226 324 200Z" fill="' + S + '" stroke="#4d5560" stroke-width="1.5"/><ellipse cx="103" cy="227" rx="4.5" ry="8" fill="#14171c"/>',
      '<path d="M216 226L118 238L118 252L224 250Z" fill="#242830"/>',
      '<line x1="254" y1="150" x2="208" y2="228" stroke="#14171c" stroke-width="9" stroke-linecap="round"/><line x1="254" y1="150" x2="208" y2="228" stroke="#ffb020" stroke-width="5" stroke-dasharray="3 3"/>',
      '<path d="M226 178H338V232Q338 246 324 246H240Q226 246 226 232Z" fill="' + E + '" stroke="#0e1014" stroke-width="2"/>',
      '<rect x="250" y="148" width="76" height="38" rx="7" fill="' + E + '" stroke="#0e1014" stroke-width="2"/>' + fins(254, 322, 156, 5, 6.5),
      '<circle cx="268" cy="220" r="22" fill="#3b424d" stroke="#6d7682" stroke-width="3"/><circle cx="268" cy="220" r="8" fill="#aab3be"/>',
      '<path d="M410 138L300 170L236 214M410 146L338 204" stroke="#1d2127" stroke-width="7" fill="none" stroke-linecap="round"/>',
      '<path d="M222 232L338 232C330 250 300 258 268 256L232 250Z" fill="' + B + '" opacity=".95"/>',
      '<path d="M296 124L206 118C188 117 176 122 166 131L176 144L298 148Z" fill="#14161b"/>',
      '<path d="M176 144L166 131C148 118 124 118 98 132C96 139 100 145 110 147C130 149 156 147 176 144Z" fill="' + B + '"/><rect x="95" y="133" width="8" height="6" rx="2" fill="#ff3b30"/>',
      '<path d="M292 122C322 100 386 104 412 126L400 154C366 156 322 156 292 152Z" fill="' + B + '"/><path d="M306 116C338 106 374 108 396 122" stroke="#fff" stroke-opacity=".38" stroke-width="4" fill="none" stroke-linecap="round"/>',
      '<path d="M396 114C420 104 452 112 466 138L446 178C426 186 404 178 384 166L394 122Z" fill="' + B + '"/>',
      '<path d="M410 112C424 90 440 82 454 84L450 114Z" fill="#cfe6ff" fill-opacity=".3" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>',
      '<path d="M448 134L470 139L458 152L440 147Z" fill="#fff0c0"/>',
      '<line x1="420" y1="118" x2="462" y2="200" stroke="' + S + '" stroke-width="10" stroke-linecap="round"/><line x1="462" y1="200" x2="484" y2="244" stroke="#d6a23a" stroke-width="8" stroke-linecap="round"/>',
      '<rect x="460" y="208" width="16" height="9" rx="3" fill="#ff3b30" transform="rotate(25 468 212)"/>',
      '<path d="' + arc(484, 244, 67, -152, -28) + '" stroke="' + B + '" stroke-width="7" fill="none" stroke-linecap="round"/>',
      '<path d="M406 112L384 106" stroke="#20242b" stroke-width="6" stroke-linecap="round"/>'
    ].join('');
  };

  function naked(u, electric) {
    var B = 'url(#b' + u + ')', S = 'url(#s' + u + ')', E = 'url(#e' + u + ')';
    var rim = electric ? '#8ff0e3' : '#c0c8d2';
    var out = [
      wheel(124, 250, 52, { rim: rim, spokes: electric ? 6 : 12, thick: !!electric, tire: 10 }),
      wheel(474, 250, 52, { rim: rim, spokes: electric ? 6 : 12, thick: !!electric, tire: 10 }),
      '<path d="M220 240L124 248L124 258L226 256Z" fill="#242830"/>'
    ];
    if (!electric) {
      out.push('<path d="M252 244C222 260 180 264 140 258L110 246L112 234L150 244C190 248 224 244 246 232Z" fill="' + S + '" stroke="#4d5560" stroke-width="1.4"/><ellipse cx="111" cy="240" rx="4" ry="7" fill="#14171c"/>');
      out.push('<g transform="rotate(-12 290 182)"><rect x="268" y="150" width="44" height="52" rx="7" fill="' + E + '" stroke="#0e1014" stroke-width="2"/>' + fins(272, 308, 158, 5, 8) + '</g>');
      out.push('<path d="M236 206H326V240Q326 252 314 252H248Q236 252 236 240Z" fill="' + E + '" stroke="#0e1014" stroke-width="2"/><circle cx="268" cy="232" r="15" fill="#3b424d" stroke="#6d7682" stroke-width="3"/><circle cx="268" cy="232" r="5" fill="#aab3be"/>');
    } else {
      out.push('<rect x="232" y="172" width="116" height="68" rx="13" fill="#161a21" stroke="#2f3641" stroke-width="3"/><rect x="246" y="196" width="88" height="7" rx="3.5" fill="#19e3c8"/><rect x="246" y="212" width="58" height="5" rx="2.5" fill="#19e3c8" opacity=".5"/><path d="M296 178l-14 18h12l-6 16 18-22h-12z" fill="#19e3c8"/>');
      out.push('<circle cx="124" cy="250" r="17" fill="#1b2027" stroke="#19e3c8" stroke-width="3"/>');
    }
    out.push(
      '<line x1="254" y1="168" x2="212" y2="244" stroke="#14171c" stroke-width="8" stroke-linecap="round"/><line x1="254" y1="168" x2="212" y2="244" stroke="' + (electric ? '#19e3c8' : '#ffb020') + '" stroke-width="4.5" stroke-dasharray="3 3"/>',
      '<path d="M408 152L330 172L250 238M408 156L340 238" stroke="#1d2127" stroke-width="7" fill="none" stroke-linecap="round"/>',
      '<path d="M214 160L300 162L296 198C270 202 240 198 222 188Z" fill="' + B + '"/>',
      '<path d="M306 136L212 134C192 134 178 140 172 150L180 160L306 160Z" fill="#17191e"/><path d="M214 137L300 139" stroke="#fff" stroke-opacity=".16" stroke-width="3" stroke-linecap="round"/>',
      '<path d="M178 152C152 144 132 148 112 162L122 170C144 162 160 160 182 162Z" fill="' + B + '"/><rect x="108" y="160" width="8" height="6" rx="2" fill="#ff3b30"/>',
      '<path d="M298 136C328 116 380 118 406 138L398 166C366 170 326 168 302 164Z" fill="' + B + '"/><path d="M312 128C340 120 372 122 392 134" stroke="#fff" stroke-opacity=".34" stroke-width="4" fill="none" stroke-linecap="round"/>',
      '<line x1="418" y1="136" x2="474" y2="250" stroke="' + S + '" stroke-width="9" stroke-linecap="round"/><line x1="440" y1="182" x2="474" y2="250" stroke="#2a2f37" stroke-width="7" stroke-linecap="round"/>',
      '<path d="' + arc(474, 250, 60, -152, -28) + '" stroke="' + B + '" stroke-width="7" fill="none" stroke-linecap="round"/>',
      '<line x1="426" y1="150" x2="436" y2="142" stroke="#20242b" stroke-width="6"/><circle cx="440" cy="150" r="18" fill="#f6f1df" stroke="' + S + '" stroke-width="5"/><circle cx="440" cy="150" r="9" fill="#fff9e4"/>',
      '<path d="M412 130L392 112L370 110" stroke="#20242b" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="392" y1="112" x2="386" y2="90" stroke="#20242b" stroke-width="3"/><ellipse cx="384" cy="86" rx="8" ry="5" fill="#cdd5de" stroke="#4d5560" stroke-width="1.5"/>',
      '<circle cx="418" cy="126" r="8" fill="#10131a" stroke="#6d7682" stroke-width="2"/>'
    );
    return out.join('');
  }
  T.commuter = function (u) { return naked(u, false); };
  T.electric = function (u) { return naked(u, true); };

  T.cruiser = function (u) {
    var B = 'url(#b' + u + ')', S = 'url(#s' + u + ')', E = 'url(#e' + u + ')';
    var out = [
      wheel(112, 246, 56, { rim: '#d5dce5', spokes: 18, tire: 15 }),
      wheel(504, 246, 56, { rim: '#d5dce5', spokes: 18, tire: 13 }),
      '<path d="M326 226C296 264 220 270 130 254" stroke="' + S + '" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M336 218C308 252 232 256 136 242" stroke="' + S + '" stroke-width="12" fill="none" stroke-linecap="round"/>',
      '<path d="M200 232L112 240L112 254L206 252Z" fill="#242830"/>',
      '<g transform="rotate(-24 270 196)"><rect x="248" y="150" width="38" height="64" rx="8" fill="' + E + '" stroke="#0e1014" stroke-width="2"/>' + fins(251, 283, 158, 6, 8) + '</g>',
      '<g transform="rotate(22 322 196)"><rect x="304" y="150" width="38" height="64" rx="8" fill="' + E + '" stroke="#0e1014" stroke-width="2"/>' + fins(307, 339, 158, 6, 8) + '</g>',
      '<circle cx="298" cy="236" r="36" fill="' + E + '" stroke="#0e1014" stroke-width="2"/><circle cx="298" cy="236" r="22" fill="url(#s' + u + ')" stroke="#4d5560" stroke-width="2"/><circle cx="298" cy="236" r="7" fill="#7a838f"/>',
      '<path d="M436 124L330 176L250 232" stroke="#1d2127" stroke-width="8" fill="none" stroke-linecap="round"/>',
      '<path d="M178 172C206 158 244 154 282 154L282 176C246 176 210 182 188 194Z" fill="#15171c"/><path d="M186 176C206 164 240 160 276 160" stroke="#fff" stroke-opacity=".14" stroke-width="3" fill="none" stroke-linecap="round"/>',
      '<path d="M50 238A62 62 0 0 1 174 238" stroke="' + B + '" stroke-width="14" fill="none" stroke-linecap="round"/>',
      '<path d="M296 128C326 98 396 100 436 132C426 154 382 164 340 164C318 164 304 148 296 128Z" fill="' + B + '"/><path d="M314 120C346 106 392 110 418 128" stroke="#fff" stroke-opacity=".38" stroke-width="4" fill="none" stroke-linecap="round"/>',
      '<line x1="442" y1="122" x2="504" y2="246" stroke="' + S + '" stroke-width="10" stroke-linecap="round"/><line x1="452" y1="140" x2="514" y2="262" stroke="#2a2f37" stroke-width="3" opacity=".7"/>',
      '<path d="' + arc(504, 246, 66, -150, -30) + '" stroke="' + B + '" stroke-width="9" fill="none" stroke-linecap="round"/>',
      '<circle cx="468" cy="150" r="20" fill="#fff6dc" stroke="' + S + '" stroke-width="6"/><circle cx="468" cy="150" r="10" fill="#fffbee"/>',
      '<path d="M442 118L426 98C412 78 386 76 372 90" stroke="' + S + '" stroke-width="6" fill="none" stroke-linecap="round"/><line x1="372" y1="90" x2="366" y2="96" stroke="#20242b" stroke-width="9" stroke-linecap="round"/>',
      '<rect x="228" y="232" width="62" height="9" rx="4" fill="#20242b" opacity=".85"/><rect x="48" y="156" width="14" height="7" rx="3" fill="#ff3b30" transform="rotate(30 55 160)"/>'
    ];
    return out.join('');
  };

  T.adventure = function (u) {
    var B = 'url(#b' + u + ')', S = 'url(#s' + u + ')', E = 'url(#e' + u + ')';
    return [
      wheel(120, 238, 64, { rim: '#d6a23a', spokes: 14, tire: 14, knobby: true }),
      wheel(486, 238, 64, { rim: '#d6a23a', spokes: 14, tire: 14, knobby: true }),
      '<rect x="80" y="92" width="76" height="50" rx="9" fill="#1c1f25" stroke="#3a404a" stroke-width="2"/><rect x="86" y="112" width="64" height="5" rx="2.5" fill="' + shade('#ff5a1f', 0) + '"/><path d="M158 134L92 130" stroke="' + S + '" stroke-width="6" stroke-linecap="round"/>',
      '<path d="M330 204C282 218 218 204 150 172" stroke="' + S + '" stroke-width="13" fill="none" stroke-linecap="round"/><ellipse cx="148" cy="171" rx="5" ry="9" fill="#14171c" transform="rotate(-30 148 171)"/>',
      '<path d="M218 224L120 232L120 246L226 244Z" fill="#242830"/>',
      '<line x1="250" y1="136" x2="206" y2="222" stroke="#14171c" stroke-width="9" stroke-linecap="round"/><line x1="250" y1="136" x2="206" y2="222" stroke="#d6a23a" stroke-width="5" stroke-dasharray="3 3"/>',
      '<path d="M230 170H344V226Q344 238 332 238H242Q230 238 230 226Z" fill="' + E + '" stroke="#0e1014" stroke-width="2"/><rect x="258" y="140" width="62" height="38" rx="7" fill="' + E + '" stroke="#0e1014" stroke-width="2"/>' + fins(262, 316, 148, 4, 7.5),
      '<circle cx="272" cy="208" r="20" fill="#3b424d" stroke="#6d7682" stroke-width="3"/><circle cx="272" cy="208" r="7" fill="#aab3be"/>',
      '<path d="M226 238L346 238L330 260L240 260Z" fill="#7a838f" stroke="#4d5560" stroke-width="2"/>',
      '<path d="M416 124L300 158L240 220M414 130L338 190" stroke="#1d2127" stroke-width="7" fill="none" stroke-linecap="round"/>',
      '<path d="M300 104L194 108C178 110 166 118 162 130L170 140L300 136Z" fill="#14161b"/>',
      '<path d="M296 148L412 150L402 184L300 190Z" fill="' + shade('#000000', 0) + '" opacity=".0"/><path d="M296 144L412 146L400 180L298 186Z" fill="' + B + '" opacity=".92"/>',
      '<path d="M290 100C330 82 398 90 428 114L412 150L296 148Z" fill="' + B + '"/><path d="M306 96C340 86 384 92 410 108" stroke="#fff" stroke-opacity=".36" stroke-width="4" fill="none" stroke-linecap="round"/>',
      '<line x1="430" y1="104" x2="486" y2="238" stroke="' + S + '" stroke-width="10" stroke-linecap="round"/><line x1="458" y1="170" x2="486" y2="238" stroke="#d6a23a" stroke-width="8" stroke-linecap="round"/>',
      '<path d="M444 174C470 162 510 166 542 180L536 192C506 182 472 180 450 188Z" fill="' + B + '"/>',
      '<path d="M432 104C452 96 474 104 478 128L458 144L432 140Z" fill="' + B + '"/><path d="M448 112L468 118L462 130L446 126Z" fill="#fff0c0"/>',
      '<path d="M414 102L440 52L460 54L454 104Z" fill="#cfe6ff" fill-opacity=".28" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>',
      '<path d="M422 100L396 90L376 92" stroke="#20242b" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M382 84L402 96L396 106L378 96Z" fill="#20242b"/>'
    ].join('');
  };

  T.scooter = function (u) {
    var B = 'url(#b' + u + ')', S = 'url(#s' + u + ')';
    return [
      wheel(150, 266, 36, { rim: '#c4ccd6', spokes: 5, thick: true, tire: 10 }),
      wheel(472, 266, 36, { rim: '#c4ccd6', spokes: 5, thick: true, tire: 10 }),
      '<path d="M296 236C252 254 212 256 176 252" stroke="' + S + '" stroke-width="11" fill="none" stroke-linecap="round"/>',
      '<line x1="432" y1="124" x2="472" y2="266" stroke="' + S + '" stroke-width="8" stroke-linecap="round"/>',
      '<path d="' + arc(472, 266, 44, -150, -30) + '" stroke="' + B + '" stroke-width="7" fill="none" stroke-linecap="round"/>',
      '<path d="M296 232L402 232L410 246L292 248Z" fill="#22262d"/><path d="M300 236L402 236" stroke="#fff" stroke-opacity=".12" stroke-width="3"/>',
      '<path d="M68 192C86 156 190 144 292 154L310 216L302 238L198 240C182 224 122 224 106 240L80 226Z" fill="' + B + '"/><path d="M96 190C124 168 190 160 262 164" stroke="#fff" stroke-opacity=".3" stroke-width="4" fill="none" stroke-linecap="round"/>',
      '<path d="M108 164C150 144 240 140 296 150L300 162C240 158 160 162 112 178Z" fill="#16181d"/>',
      '<path d="M386 238C392 190 402 142 414 106L442 112C438 152 440 202 450 238Z" fill="' + B + '"/><path d="M400 150C404 132 410 118 416 108" stroke="#fff" stroke-opacity=".3" stroke-width="3" fill="none" stroke-linecap="round"/>',
      '<path d="M392 104C402 88 438 84 454 96L452 120L402 120Z" fill="' + B + '"/><path d="M436 98C446 98 452 102 452 110L440 114Z" fill="#fff0c0"/>',
      '<path d="M414 92L404 64M436 90L446 64" stroke="#20242b" stroke-width="4" stroke-linecap="round"/><ellipse cx="404" cy="60" rx="9" ry="5" fill="#cdd5de" stroke="#4d5560" stroke-width="1.5"/><ellipse cx="447" cy="60" rx="9" ry="5" fill="#cdd5de" stroke="#4d5560" stroke-width="1.5"/>',
      '<rect x="64" y="184" width="8" height="7" rx="2" fill="#ff3b30"/>'
    ].join('');
  };

  T.cargo = function (u) {
    var B = 'url(#b' + u + ')', S = 'url(#s' + u + ')';
    var ribs = '';
    for (var x = 78; x < 292; x += 34) ribs += '<line x1="' + x + '" y1="140" x2="' + x + '" y2="228" stroke="#000" stroke-opacity=".2" stroke-width="3"/>';
    return [
      '<g opacity=".55">' + wheel(200, 258, 44, { rim: '#9aa3af', spokes: 8, tire: 10 }) + '</g>',
      wheel(176, 258, 44, { rim: '#c4ccd6', spokes: 8, tire: 10 }),
      wheel(466, 258, 44, { rim: '#c4ccd6', spokes: 8, tire: 10 }),
      '<rect x="36" y="228" width="310" height="14" rx="4" fill="#20242b"/>',
      '<rect x="44" y="128" width="252" height="102" rx="8" fill="' + B + '"/>' + ribs,
      '<rect x="40" y="122" width="260" height="12" rx="5" fill="#1d2026"/><path d="M52 132H288" stroke="#fff" stroke-opacity=".28" stroke-width="3"/>',
      '<path d="M300 232L300 124C300 100 318 86 344 86L396 86C416 86 430 100 438 122L452 170L470 198L472 232Z" fill="' + B + '"/>',
      '<path d="M316 104L392 104C404 104 412 112 416 124L424 152L316 152Z" fill="#cfe6ff" fill-opacity=".32" stroke="' + S + '" stroke-width="3"/>',
      '<rect x="294" y="78" width="116" height="11" rx="5" fill="#1d2026"/>',
      '<path d="M446 188C458 190 470 200 472 214L452 214Z" fill="#fff0c0"/><ellipse cx="462" cy="204" rx="9" ry="7" fill="#fff6d8"/>',
      '<rect x="436" y="228" width="58" height="9" rx="4" fill="' + S + '"/>',
      '<path d="' + arc(466, 258, 52, -150, -30) + '" stroke="' + B + '" stroke-width="8" fill="none" stroke-linecap="round"/>',
      '<path d="' + arc(176, 258, 52, -160, -20) + '" stroke="#20242b" stroke-width="7" fill="none" stroke-linecap="round"/>',
      '<line x1="420" y1="104" x2="438" y2="78" stroke="#20242b" stroke-width="4"/><ellipse cx="440" cy="74" rx="6" ry="9" fill="#cdd5de" stroke="#4d5560" stroke-width="1.5"/>'
    ].join('');
  };

  /* ------------------------------------------------------------ backdrops */
  var X = 'x="-300" y="-200" width="1200" height="800"';
  function backdrop(view, u, c) {
    switch (view) {
      case 'studio': case 'detail':
        return '<defs><radialGradient id="st' + u + '" cx=".5" cy=".4" r=".62"><stop offset="0" stop-color="#454d5c"/><stop offset=".55" stop-color="#1a1f28"/><stop offset="1" stop-color="#0a0c10"/></radialGradient></defs>' +
          '<rect ' + X + ' fill="url(#st' + u + ')"/><path d="M-300 303H900V600H-300Z" fill="#090b0e" opacity=".6"/>' +
          '<ellipse cx="300" cy="304" rx="260" ry="12" fill="' + c + '" opacity=".22"/><ellipse cx="300" cy="304" rx="230" ry="8" fill="#000" opacity=".55"/>';
      case 'dune':
        return '<defs><linearGradient id="sk' + u + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f08a4b"/><stop offset=".55" stop-color="#f9c784"/><stop offset="1" stop-color="#ffe8c4"/></linearGradient>' +
          '<linearGradient id="se' + u + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1fb5a8"/><stop offset="1" stop-color="#0d6f7a"/></linearGradient></defs>' +
          '<rect ' + X + ' fill="url(#sk' + u + ')"/><circle cx="440" cy="132" r="62" fill="#fff3d2" opacity=".35"/><circle cx="440" cy="132" r="38" fill="#fff6dc"/>' +
          '<rect x="-300" y="206" width="1200" height="30" fill="url(#se' + u + ')" opacity=".9"/>' +
          '<path d="M-300 250C-120 212 60 238 230 224C380 210 520 234 900 212V330H-300Z" fill="#dba662"/>' +
          '<path d="M-300 276C-100 250 120 270 300 258C470 246 640 270 900 256V330H-300Z" fill="#c98f4c"/>' +
          '<path d="M-300 296H900V600H-300Z" fill="#bd8240"/><path d="M-300 318C0 308 300 324 900 312" stroke="#a46f35" stroke-width="3" fill="none" opacity=".6"/>' +
          '<ellipse cx="300" cy="304" rx="250" ry="9" fill="#5a3410" opacity=".5"/>';
      case 'night':
        return '<defs><linearGradient id="nt' + u + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1020"/><stop offset="1" stop-color="#1c2438"/></linearGradient></defs>' +
          '<rect ' + X + ' fill="url(#nt' + u + ')"/>' +
          '<g opacity=".7"><circle cx="70" cy="120" r="16" fill="#ffb020" opacity=".5"/><circle cx="130" cy="160" r="9" fill="#19e3c8" opacity=".5"/><circle cx="520" cy="110" r="20" fill="#ff5a1f" opacity=".45"/><circle cx="470" cy="170" r="10" fill="#ffb020" opacity=".5"/><circle cx="300" cy="90" r="12" fill="#6aa8ff" opacity=".4"/><circle cx="560" cy="190" r="8" fill="#19e3c8" opacity=".45"/></g>' +
          '<path d="M-300 303H900V600H-300Z" fill="#0b0f19"/><path d="M-300 306H900" stroke="' + c + '" stroke-opacity=".45" stroke-width="2"/>' +
          '<ellipse cx="300" cy="304" rx="250" ry="9" fill="#000" opacity=".6"/>';
      default: // card
        return '<circle cx="300" cy="188" r="170" fill="url(#g' + u + ')"/><ellipse cx="300" cy="304" rx="240" ry="9" fill="#000" opacity=".28"/>';
    }
  }

  var DETAIL_BOX = { sport: '200 70 300 170', commuter: '190 80 300 170', electric: '190 80 300 170', cruiser: '220 70 300 170', adventure: '200 50 300 170', scooter: '300 60 260 148', cargo: '290 60 260 148' };

  /* ---------------------------------------------------------------- API */
  PK.art = {
    shade: shade,
    types: Object.keys(T),
    bike: function (type, opt) {
      opt = opt || {};
      type = T[type] ? type : 'commuter';
      var view = opt.view || 'card', color = opt.color || '#ff5a1f', u = 'a' + (++uid);
      var photo = view !== 'card';
      var vb = view === 'detail' ? DETAIL_BOX[type] : '0 0 600 340';
      var label = (opt.label || 'Motorcycle illustration').replace(/"/g, '&quot;');
      return '<svg class="bike-art" xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" role="img" aria-label="' + label + '" preserveAspectRatio="xMidYMid meet" focusable="false">' +
        defs(u, color) + backdrop(view, u, color) + '<g class="bike-body">' + T[type](u) + '</g></svg>';
    }
  };
})();
