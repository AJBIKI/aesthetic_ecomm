---
name: design-tokens
description: Locked token system for colors, typography, spacing, motion, and borders. All visual decisions must reference these tokens — no magic numbers, no one-off values. Uses OKLCH color space with Petrichor Sage tones and background art layer.
---

# Design Token System — The Monsoon Club (Sage & Motion Edition)

Every visual decision maps to a token. No magic numbers. No one-off values.

## Color Tokens (OKLCH — Petrichor Sage Vibe)

```css
:root {
  /* Surface — Petrichor Sage: soft muted greenish off-white */
  --surface:       oklch(0.94 0.02 145);    /* soft sage tint, organic & calming */
  --surface-alt:   oklch(0.90 0.025 142);   /* deeper sage green for cards & alternating sections */
  --surface-dark:  oklch(0.14 0.03 145);    /* deep forest-black for contrast sections */

  /* Ink — Deep Pine Black */
  --ink:           oklch(0.14 0.025 145);   /* deep pine black for soft readable text */
  --ink-muted:     oklch(0.45 0.02 145);    /* muted sage-gray for captions & overlines */
  --ink-inverse:   oklch(0.93 0.015 145);   /* light text on dark surfaces */

  /* Accent — Monsoon Emerald / Deep Teal */
  --accent:        oklch(0.55 0.12 195);    /* deep teal accent */
  --accent-green:  oklch(0.58 0.14 145);    /* monsoon emerald highlight */
  --accent-soft:   oklch(0.82 0.05 145);    /* soft sage highlight for tints */

  /* Border */
  --border:        oklch(0.85 0.015 145);   /* sage border */
  --border-strong: oklch(0.55 0.12 195);    /* accent focus border */
}
```

## Typography

- Display: **Fraunces** (Google Fonts variable with optical-size axis)
- Body/UI: **Satoshi** (Fontshare modern grotesk)

## Background Art Layer

- Artistic organic SVG line art (botanical silhouette + monsoon rain lines) rendered at low opacity in background overlay.
