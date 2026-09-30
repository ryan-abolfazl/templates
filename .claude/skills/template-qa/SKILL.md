---
name: template-qa
description: Verify a built template before committing or shipping. Runs tools/qa.mjs (headless Chromium via Playwright) for overflow, console errors, 404s, external requests and broken links, then a visual review checklist for RTL, Persian typography, dark mode and responsiveness. Use after every build of a template.
---

# Template QA

## 1. Automated

```bash
node tools/build.mjs <slug>
node tools/qa.mjs <slug>                         # all pages at 1440 + 390
node tools/qa.mjs <slug> --dark                  # dark theme pass
node tools/qa.mjs <slug> --pages=index --full    # full-page desktop screenshot of one page
```

Fails on: console errors, JS exceptions, failed/4xx requests, any request outside the local server
(CDN/fonts leak), horizontal overflow (names the offending elements), `lang/dir` not `fa/rtl`,
missing `<title>`, `<img>` without `alt`, internal links to files that don't exist.
Mark intentionally scrollable regions (tables, carousels) with `data-overflow-ok` if they trip the overflow check.

The checks read the built HTML, and playwright is resolved from the global npm root, so nothing needs installing.
Chromium lives at `/opt/pw-browsers` in cloud sessions.

## 2. Visual review (Read the PNGs in `.qa/<slug>/`)

Check every page at desktop and mobile:

- [ ] Text flows right-to-left; punctuation sits at the correct end; no mirrored Latin text
- [ ] Arrows/chevrons point the right way for RTL (next = left)
- [ ] Persian digits everywhere visible (prices, dates, counters, pagination, charts)
- [ ] Fonts loaded (not a fallback serif/sans): Persian letter shapes match the chosen family
- [ ] No clipped or overlapping text, no orphan single words in headings where avoidable
- [ ] Spacing rhythm consistent; cards align; grids collapse sensibly on mobile
- [ ] Mobile nav drawer opens; header not crowded at 360–390px
- [ ] Dark mode: every surface themed (no white flashes), contrast OK, charts recolored
- [ ] Empty/placeholder images look intentional, not broken
- [ ] Hero passes the "3-second" test: clear message and one obvious action

## 3. Interaction spot-checks (optional, via a quick Playwright script)

Toggle theme, open drawer/dropdown/modal, switch tabs, submit a form empty (Persian errors appear),
use the date picker, sort a table, filter a grid, add to cart (badge updates, toast shows).

## 4. Before shipping

- `tools/package.sh <slug>` then unzip into a temp dir and open `html/index.html` via `file://`
  (the icon sprite and scripts must work without a server).
- Update the template's `CHANGELOG.md` and version in `site.mjs`.
