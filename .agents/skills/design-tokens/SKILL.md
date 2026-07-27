---
name: design-tokens
description: Locked token system for colors, typography, spacing, motion, and borders. All visual decisions must reference these tokens — no magic numbers, no one-off values. Uses OKLCH color space for perceptual uniformity.
---

# Design Token System — The Monsoon Club

Every visual decision maps to a token. No magic numbers. No one-off values. If a value isn't in this system, it doesn't belong in the codebase.

## Color Tokens (OKLCH)

Never use raw hex values. Never use pure black (#000) or pure white (#fff).

```css
:root {
  /* Surface — "Petrichor" family: cool concrete grays */
  --surface:       oklch(0.955 0.005 250);   /* cool off-white, hint of blue-gray */
  --surface-alt:   oklch(0.925 0.008 245);   /* alternating sections — wet concrete */
  --surface-dark:  oklch(0.135 0.02 260);    /* midnight indigo — deep blue-black */

  /* Ink — "Midnight Indigo" family */
  --ink:           oklch(0.13 0.02 260);     /* near-black, deep indigo cast */
  --ink-muted:     oklch(0.48 0.01 255);     /* cool muted gray for captions */
  --ink-inverse:   oklch(0.93 0.005 250);    /* light text on dark backgrounds */

  /* Accent — "Deep Teal": monsoon water, rain-soaked depth */
  --accent:        oklch(0.55 0.12 195);     /* deep saturated teal */
  --accent-soft:   oklch(0.80 0.06 195);     /* softened for hover tints */

  /* Border */
  --border:        oklch(0.86 0.006 250);    /* cool subtle border */
  --border-strong: oklch(0.55 0.12 195);     /* accent-colored for focus states */
}
```

### Rules
- All colors defined in `oklch()` — NOT hex, NOT hsl
- Brand neutrals are cool-tinted (blue-gray), never pure gray, never warm cream
- The accent (deep teal) appears in: cursor label, scroll progress, overline labels, focus rings, CTAs
- The accent does NOT appear in: backgrounds, body text, borders (except focus)

## Typography

Two font families. No more, no less.

```css
:root {
  --font-display: 'Fraunces', Georgia, serif;
  --font-body:    'Satoshi', system-ui, sans-serif;
}
```

### Scale — fluid via clamp()

```css
:root {
  --text-display:  clamp(3rem, 8vw, 6rem);
  --text-h1:       clamp(2rem, 4vw, 3.5rem);
  --text-h2:       clamp(1.5rem, 3vw, 2rem);
  --text-h3:       clamp(1.125rem, 1.5vw, 1.333rem);
  --text-body:     1rem;
  --text-caption:  0.8125rem;
  --text-overline: 0.6875rem;

  --leading-tight:   1.05;   /* display headlines */
  --leading-normal:  1.5;    /* UI text */
  --leading-relaxed: 1.75;   /* body paragraphs */

  --tracking-tight:  -0.02em;  /* display headlines */
  --tracking-wide:   0.15em;   /* overline labels */
  --tracking-logo:   0.25em;   /* the monsoon club. wordmark (Fraunces uses variable font with optical-size axis) */
}
```

## Spacing Scale (base: 4px)

```css
:root {
  --space-1:  4px;    --space-2:  8px;    --space-3:  12px;
  --space-4:  16px;   --space-6:  24px;   --space-8:  32px;
  --space-12: 48px;   --space-16: 64px;   --space-24: 96px;
  --space-32: 128px;
}
```

## Motion Tokens

Two easing curves. Three durations. Every animation uses exactly one combination.

```css
:root {
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  --duration-fast:   200ms;
  --duration-normal: 500ms;
  --duration-slow:   1200ms;
}
```

## Borders & Radius

```css
:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 3px oklch(0.20 0.01 260 / 0.06);
  --shadow-md: 0 4px 16px oklch(0.20 0.01 260 / 0.08);
}
```

## Enforcement

- Never animate `width`, `height`, `top`, `left`, `margin`, `padding`
- Only animate `transform` and `opacity`
- Use `will-change: transform` on continuously animated elements
- Respect `prefers-reduced-motion`
- Product images: explicit width/height attributes, zero CLS
