# PAKSTAR SARL — Premium Motorcycle Website (Djibouti)

A bilingual (English / Français), dark-mode-ready, animated multi-page website for PAKSTAR SARL.
Pure HTML5 + CSS3 + vanilla JavaScript. No build step, no backend, no dependencies to install.

## Run it

Open `index.html` in a modern browser (double-click), or serve the folder:

```bash
cd PAKSTAR-SARL
python3 -m http.server 8080     # then open http://localhost:8080
```

An internet connection is optional. It is only used for: Google Fonts (falls back to system fonts) and the
"Live map" tab (OpenStreetMap embed). Everything else works offline.

## What is included

| Requirement | Where |
|---|---|
| Premium animated UI, cinematic hero | `index.html`, `css/animations.css`, `js/main.js` |
| Language dropdown (EN / FR) that really switches content | `js/i18n.js` (UI strings) + `js/content.js` (data) |
| Dark / light mode toggle (remembers choice, follows OS by default) | header button, `css/style.css` tokens |
| Dropdown mega-menu (mouse, touch, keyboard, Esc, click-outside) | header → Motorcycles |
| Djibouti map: stylised SVG map with clickable pins + OpenStreetMap live tab | `data-render="map"`, `js/main.js` |
| Modal on **every** card (models, categories, features, values, places, news, steps, tips, map pins) | `js/modals.js` |
| Gallery with lightbox (arrows, keyboard, swipe) | `js/products.js`, `js/modals.js` |
| Catalogue filters, search, sort, compare (up to 3) | `motorcycles.html`, `js/products.js` |
| Product detail template | `product-details.html?id=falcon-s` |
| Forms with validation + success/error states | `contact.html`, `inquiry.html`, `become-a-dealer.html`, `js/forms.js` |
| Preloader (never blocks: 2.6 s JS cap + CSS failsafe), reveals, parallax, 3D tilt, micro-interactions | `css/animations.css`, `js/main.js` |
| Reduced-motion support | `@media (prefers-reduced-motion)` + JS checks |

Pages: Home, About, Motorcycles, Model details, Dealer Network, News, Contact, Product Inquiry, Become a Dealer.

## Important: what is demo content

* **Model names and photos** come from the media supplied by the owner (Falcon S, Nomad 125, Urban 150, Ray ZR,
  Dune Adventure, Volt E1, Hauler T33; Atlas 300 uses a front photo and a placeholder name). **Specifications (cc, kW,
  features) are class-level placeholders, not confirmed.** Edit them in `js/content.js` (`PK.PRODUCTS`).
* **News articles are demonstration content** (`PK.NEWS`) and are labelled as such.
* **No company facts are invented.** Address, phone, email, opening hours, founding year, dealers and social links are
  explicit placeholders such as `[Official Company Address]`. Search the files for `[Official` and `[Verified` to fill them in.
* No prices are shown. A `[Verified price in DJF]` placeholder is displayed in specs.
* Djibouti facts (regions, coastline, Lake Assal depth, official languages, currency) are general public knowledge.
  The stylised map outline is simplified and **not survey-accurate or for navigation**; city pins are approximate.

## Media (photos, videos, logo)

* Logo: `assets/images/brand/` (transparent PNG, wordmark for the header, favicon + app icons). Favicon is wired in every page `<head>`.
* Videos: `assets/video/` (MP4 + WebM + poster for each). Header video on every inner page; **Home and Motorcycles** keep the
  video fixed behind the whole page down to the footer. Videos are muted, looped and paused when off-screen; with
  reduced-motion or data-saver the poster image is shown instead.
* Photos: `assets/images/models|places|news|about`. To add more photos to a model, add files named `<model>-3.jpg` and
  extend the list in `js/media.js` (`M.models`); the gallery and thumbnails pick them up automatically.
* **Check rights:** several supplied images show third-party brand names (Honda, Yamaha, Suzuki, Ducati). Confirm you have
  the right to use them, or replace those images, before going live.

## Music

A small round button (bottom-left) plays/pauses an ambient loop (`assets/audio/ambient.mp3`). It is off by default because
browsers block sound before the visitor interacts; if the visitor turns it on, it resumes on later pages. The track is a
simple placeholder generated for this site: replace the file with your own licensed music (same file name) when ready.

## Forms — frontend only

Forms are validated in the browser and then show a confirmation that says plainly **nothing was sent**.
To make them deliver real messages, add an endpoint to each `<form>`:

```html
<form data-form="contact" data-endpoint="https://your-form-service.example/submit" ...>
```

The form is then POSTed (`FormData`) to that URL and the "demonstration only" notice is hidden on success.
Use any email/form service or your own backend. Never trust client-side validation alone.

Preferences (language, theme, music on/off, comparison list) are saved in `localStorage`, with automatic fallbacks to
`window.name` and a cookie when a browser blocks storage. It is local to the visitor's browser and is **not** a database. No form data is stored.

## Editing content

* **UI text:** `js/i18n.js` — each key is `["English", "Français"]`. HTML uses `data-i18n="key"`.
* **Models / categories / places / news / FAQ / tips:** `js/content.js` — every text is `b("English", "Français")`.
* **Colours, type, spacing:** CSS variables at the top of `css/style.css` (light and `[data-theme="dark"]`).
* **Add a language:** add a third value to each dictionary entry and a button in the language menu (`buildHeader` in `js/main.js`).

## Structure

```
PAKSTAR-SARL/
├── index.html  about.html  motorcycles.html  product-details.html
├── dealers.html  news.html  contact.html  inquiry.html  become-a-dealer.html
├── css/   style.css  animations.css  responsive.css
├── css/   + premium.css (brand colours, video, photos, preloader)
├── js/    storage.js  art.js  content.js  media.js  i18n.js  main.js  products.js  modals.js  forms.js
├── assets/ images/ (brand, models, places, news, about), video/
└── README.md
```

## Technology note (deviation from the brief)

The brief asks for Bootstrap 5 + Bootstrap Icons. The build environment could not download them (package registry and
CDNs were blocked), so this version uses a **self-contained custom CSS design system** (grid, buttons, cards, modals,
dropdowns) and **inline SVG icons** instead. There are zero third-party runtime dependencies. If Bootstrap is mandatory,
it can be added as a CDN `<link>`; the custom CSS does not conflict with it, but the layout does not rely on it.

## Testing performed

Automated in headless Chromium (Playwright): all 9 pages load with 0 JavaScript errors and no horizontal overflow
(desktop 1366 px and mobile 390 px); dropdown opens by click / hover / ArrowDown and closes on Esc / outside click;
EN ⇄ FR switching and persistence; dark-mode toggle and persistence; every card type opens its modal (models 6/6,
categories 7/7, features 6/6, steps 4/4, tips 5/5, news 3/3, map list 7/7, map pins, gallery); modal focus management,
Esc / backdrop close and focus return; catalogue filters, search, sort, reset, compare (max 3); lightbox navigation;
form validation and success state; video playback on 4 pages (desktop + mobile); mobile menu; French + dark + reduced-motion on all pages.
**Not tested:** Safari/Firefox, real touch devices, screen readers, Lighthouse scores, the live OpenStreetMap tab
(no internet in the test environment), Google Fonts rendering.
