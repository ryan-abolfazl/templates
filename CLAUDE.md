# Persian HTML Templates: project guide

Premium **Persian (fa-IR), RTL, static HTML templates** built to be sold on
[rtl-theme.com](https://www.rtl-theme.com/category/template-html/) (and similar marketplaces).
The quality bar is ThemeForest "site templates" best-sellers: distinct art direction, many pages,
polished states, clean code, and full documentation.

## Repo layout

```
src/_core/          shared base.css + vanilla JS modules (util, theme, nav, tabs, charts, jalali, table, form, …)
src/<slug>/         SOURCE of one template
  site.mjs          name, version, fonts, core JS modules, layouts (functions returning HTML)
  partials.mjs      header/footer/sidebar/card helpers (JS template literals)
  data.mjs          demo content (Persian)
  pages/*.mjs       one module per page: export const meta = {…}; export default (ctx) => html`…`
  assets/           css/ (tokens.css, components.css, pages.css), js/main.js, img/ (SVG art)
  static/           README.md, CHANGELOG.md copied to the template root
templates/<slug>/   BUILT output. This is what gets sold. Generated, never edit by hand.
vendor/             OFL fonts (woff2) + Lucide icons (icons.json). Offline source of truth.
tools/              build.mjs, qa.mjs, package.sh, serve.sh, lib/
dist/               release zips (git-ignored)
.qa/                QA screenshots (git-ignored)
```

## Commands

```bash
node tools/build.mjs <slug>          # build src/<slug> -> templates/<slug> (runs prettier on output)
node tools/build.mjs --all
node tools/qa.mjs <slug>             # headless Chromium: overflow, console errors, 404s, external requests, broken links
node tools/qa.mjs <slug> --pages=index,login --widths=1440,390 --dark --full
tools/serve.sh <slug> [port]         # python http.server on templates/<slug>
tools/package.sh <slug>              # dist/<slug>-v<version>.zip (html/ + documentation/ + source/)
```

Always rebuild after editing `src/`, then run QA and **look at the screenshots** (Read tool on `.qa/<slug>/*.png`).

## Non-negotiable rules

1. **Persian first.** `<html lang="fa" dir="rtl">`. All UI copy is natural, fluent Persian (not machine-translated),
   Persian digits (`fa()` in build, `UI.fa()` at runtime), prices in تومان, dates in the Jalali calendar
   (`UI.jalali`, `Intl` with `fa-IR-u-ca-persian`). Use ZWNJ (نیم‌فاصله) correctly: می‌شود، کتاب‌ها.
2. **Zero external requests.** No CDNs, no Google Fonts, no analytics. Fonts are self-hosted from `vendor/fonts`.
   Everything must work offline and from `file://` (hence classic `<script defer>`, not ES modules, and the icon sprite injected by `icons.js`).
3. **Only free-licensed assets.** Fonts: SIL OFL only (Vazirmatn, Estedad, Lalezar, Reem Kufi, Noto Nastaliq, Markazi, Noto Kufi).
   Never IRANSans/IRANYekan/Yekan Bakh (commercial). Icons: Lucide (ISC). Images: our own SVG art or clearly marked placeholders; no stock photos.
4. **RTL done right.** Use logical properties (`margin-inline-start`, `inset-inline-end`, `padding-block`), never left/right for layout.
   Directional icons (arrows, chevrons) get `.icon-flip` or use the mirrored glyph. Latin snippets get `.ltr`.
5. **Vanilla stack.** Hand-written CSS with custom properties (tokens) + vanilla JS. No frameworks, no build step for buyers.
6. **Accessible (WCAG 2.2 AA).** Semantic landmarks, skip link, labels on every input, visible focus, 4.5:1 text contrast,
   keyboard support for every widget, `prefers-reduced-motion` respected.
7. **Every template ships:** light + dark theme, responsive 360→1920px, 404 page, Persian documentation page
   (`documentation/index.html`), README, CHANGELOG, `licenses/` folder.
8. **Distinct design per template.** Follow `.claude/skills/design-direction`. No two templates may share a palette, type pairing or hero layout.

## Definition of done (per template)

- `node tools/build.mjs <slug>` and `node tools/qa.mjs <slug>` pass with zero problems at 1440 and 390px, light and `--dark`.
- Screenshots reviewed by eye: no clipped text, no LTR leaks, no broken icons, consistent spacing.
- `tools/package.sh <slug>` zip opens offline from `file://`.
- Documentation covers: file structure, colors/fonts customization, JS components, credits/licenses, changelog.

## Skills in this repo

- `persian-rtl-template`: house conventions for markup, CSS, JS and content. Load before writing any template code.
- `design-direction`: art direction process + per-niche palettes/type (distilled from frontend-design, apple-design, ui-ux-pro-max).
- `template-qa`: QA checklist and how to read the QA output.
- `marketplace-package`: packaging, product description and screenshots for rtl-theme.
- `caveman`: terse chat replies (chat only, never in code or docs).

## Templates

| slug | niche | status |
|------|-------|--------|
| `pishkhan` | admin dashboard (پیشخوان) | v1.0.0, 18 pages + docs |
| `danesh` | online course / LMS academy | v1.0.0, 16 pages + docs |
| `vitrin` | fashion e-shop | v1.0.0, 14 pages + docs |
| `labkhand` | dental clinic | v1.0.0, 11 pages + docs |
| `zaferan` | Persian restaurant | planned |

## Git

Work on the assigned feature branch; one commit per template or tooling change. Commit `templates/` output together with `src/` changes so the built files always match the source.
