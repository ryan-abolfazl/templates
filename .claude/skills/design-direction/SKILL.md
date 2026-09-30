---
name: design-direction
description: Art direction process for a new template. Pick a bold, niche-appropriate aesthetic, then define type, color, spacing, motion and signature details. Includes a per-niche palette/typography table for Persian templates and an anti-generic checklist. Distilled from the frontend-design, apple-design and ui-ux-pro-max skill principles. Load before designing a new template or a major section.
---

# Design direction

Marketplace buyers scroll past generic templates. Every template needs **one clear aesthetic idea**,
executed with precision. Bold maximalism and refined minimalism both work; lukewarm doesn't.

## Process (do this before writing CSS)

1. **Context.** Who buys this template (agency, clinic owner, developer)? Who visits the final site? What must they feel in 3 seconds?
2. **Pick a direction** and name it in one line, e.g. "Swiss editorial monochrome with one saffron accent",
   "soft clinical calm, glass and air", "neon-on-ink developer console", "Qajar tile warmth, dark and gold".
3. **Signature element**: one memorable thing (oversized Persian display type, girih pattern, bento grid,
   a hero chart, split-screen scroll, marquee of categories). Repeat it with restraint.
4. **Write tokens first** (`tokens.css`): palette (light + dark), type pairing and scale, radius, shadow, motion.
5. Build the home page hero at desktop **and** mobile, screenshot, critique, iterate, and only then build inner pages.

## Typography

- Persian type is the design. Choose a display face with character and a highly legible body face:
  - Vazirmatn (neutral, excellent UI body; variable 100–900)
  - Estedad (geometric, modern and friendly, great for headings and UI)
  - Noto Kufi Arabic (geometric Kufi, architectural, fashion/luxury)
  - Reem Kufi (decorative Kufi, brand/display only)
  - Lalezar (heavy poster display, playful/food/retail)
  - Noto Nastaliq Urdu (calligraphic Nastaliq, accents only: short phrases, never body text)
  - Markazi Text (Naskh serif, literary/editorial body or pull quotes)
- Scale: fluid `clamp()`, ratio ~1.25 (UI) to ~1.333 (marketing). Display headings 44–88px desktop.
- Weight contrast beats size contrast: pair 800–900 headings with 400 body.
- Persian needs more line-height (body 1.85) and slightly larger sizes (16–17px body) than Latin.
- Never letter-space Persian. Never set Persian in all-caps styles or italic.

## Color

- One dominant neutral family + one sharp accent beats an even rainbow. Define semantic tokens, not raw hex, in components.
- Dark theme is designed, not inverted: raise surfaces with lightness (not shadows), desaturate accents slightly, keep text ~ #E8E8EA not pure white.
- Contrast ≥ 4.5:1 for text, ≥ 3:1 for UI borders/icons. Check accent-on-surface combos.

## Space, layout, depth (the "Apple" discipline)

- 8pt grid. Generous whitespace: section padding 96–160px desktop, 64–88px mobile.
- Clear hierarchy per screen: one primary action, one focal point.
- Depth with restraint: layered surfaces, subtle 1px borders, soft large-radius shadows, backdrop blur on sticky bars.
- Consistent radii family (e.g. 10 / 16 / 28). Consistent icon stroke (1.75).
- Break the grid deliberately in heroes (overlap, asymmetry, oversized numerals), keep inner pages calm and systematic.

## Motion

- Purposeful and quick: 150–250ms UI, 500–800ms reveals, `cubic-bezier(.22,1,.36,1)`.
- One orchestrated page-load moment (staggered hero reveal) > many scattered effects.
- Hover states on everything interactive; `:active` press feedback (scale .98).
- Always honor `prefers-reduced-motion`.

## Anti-generic checklist (reject if any is true)

- [ ] Purple-to-blue gradient on white with centered hero + 3 feature cards (the "AI template" look)
- [ ] Default system font or only one weight used
- [ ] Every section has identical padding/structure
- [ ] Icons in colored circles as the only visual device
- [ ] Placeholder lorem or English text anywhere
- [ ] Dark mode is just inverted colors
- [ ] Same hero layout as another template in this repo

## Per-niche starting points (Persian market)

| niche | direction | palette idea | type |
|---|---|---|---|
| admin dashboard | calm precision, data-dense but airy | slate neutrals + electric indigo, semantic green/amber/red | Vazirmatn only, tabular nums |
| LMS / courses | energetic, optimistic, bento | deep ink navy + lime/chartreuse accent + warm white | Estedad 800 display + Vazirmatn body |
| fashion e-shop | editorial, high contrast, big type | near-black + bone/ecru + one clay/terracotta accent | Noto Kufi Arabic display + Vazirmatn |
| dental / medical | soft clinical calm, glass & air | white + mint/teal + deep teal text, soft sky tint | Vazirmatn light/regular, generous size |
| Persian restaurant | Qajar/Safavid warmth, night & gold | charcoal-plum + saffron gold + pomegranate red, tile patterns | Lalezar or Reem Kufi display, Nastaliq accents, Vazirmatn body |
| real estate | architectural, confident | stone + forest/olive + brass | Noto Kufi Arabic + Vazirmatn |
| agency / portfolio | bold experimental | black + acid accent | Estedad 900 huge + Vazirmatn |

## Quality bar for buyers (rtl-theme / ThemeForest)

- 10+ pages per template, including auth, 404, contact, blog listing + single, pricing/FAQ where relevant.
- Real UI states: hover, focus, active, disabled, loading, empty, error, success.
- Components are consistent across pages (same button, card, form styles everywhere).
- Documentation that a beginner can follow in Persian.
