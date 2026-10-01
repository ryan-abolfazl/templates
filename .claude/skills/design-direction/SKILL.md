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
  - Reem Kufi (decorative Kufi, Latin/Arabic brand marks only: it renders Persian final ی and ک in Arabic forms, so avoid it for Persian words)
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

## Materials & glass (from apple-design)

Distilled from Emil Kowalski's apple-design skill (github.com/emilkowalski/skills, `skills/apple-design`). Use when a template is glass-based (danesh, labkhand):

- Glass is a functional layer, not decoration: header, sheets, modals, menus, floating cards. Content scrolls underneath.
- Material weight encodes hierarchy: bigger surfaces get stronger blur and deeper shadow (`.glass` vs `.glass--lg`).
- Never stack a light translucent surface on another. Inside a glass panel use flat tints (`--fill`), not more glass.
- A bright 1px inset top edge reads as light catching the material. Prefer a scroll-edge fade under sticky bars over a hard divider.
- Glass needs something behind it: a few large, soft, fixed light fields. Animate them once on load, never loop.
- Materialize, don't just fade: animate blur + scale together for modals, menus and toasts; exit along the entry path.
- Press feedback on pointer-down (`:active { transform: scale(.97) }`, ~100ms). Critically damped easing `cubic-bezier(.32,.72,0,1)`.
- Always ship `prefers-reduced-transparency` (solid surfaces, no blur), `prefers-contrast: more` (solid + borders) and `prefers-reduced-motion` (cross-fades).
- Check text contrast against the worst case: glass alpha over the brightest glow. Use a darker accent for text (#0066cc) than for button fills (#0071e3).
- **Persian override:** the skill's negative tracking on large type applies to Latin/digits only. Never letter-space Persian; it breaks the joins.

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
| LMS / courses | minimal Apple-style glass, calm and confident (danesh v2) | Apple grays #f5f5f7/#1d1d1f + one blue #0066cc/#0071e3, soft sky/peach/lilac glows | Estedad 700–800 display + Vazirmatn body |
| fashion e-shop | editorial, high contrast, big type | near-black + bone/ecru + one clay/terracotta accent | Noto Kufi Arabic display + Vazirmatn |
| dental / medical | soft clinical calm, glass & air | white + mint/teal + deep teal text, soft sky tint | Vazirmatn light/regular, generous size |
| Persian restaurant | Qajar/Safavid warmth, night & gold | charcoal-plum + saffron gold + pomegranate red, tile patterns | Lalezar display, Nastaliq accents, Vazirmatn body |
| real estate | architectural, confident | stone + forest/olive + brass | Noto Kufi Arabic + Vazirmatn |
| agency / portfolio | bold experimental | black + acid accent | Estedad 900 huge + Vazirmatn |

## Quality bar for buyers (rtl-theme / ThemeForest)

- 10+ pages per template, including auth, 404, contact, blog listing + single, pricing/FAQ where relevant.
- Real UI states: hover, focus, active, disabled, loading, empty, error, success.
- Components are consistent across pages (same button, card, form styles everywhere).
- Documentation that a beginner can follow in Persian.
