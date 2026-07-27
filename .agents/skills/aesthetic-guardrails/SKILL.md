---
name: aesthetic-guardrails
description: Anti-patterns and quality checks for frontend output. Prevents convergence toward generic AI-generated aesthetics. Enforces the restraint-applied-unevenly principle. Auto-activates on any frontend task.
---

# Aesthetic Guardrails — The Monsoon Club

## The AI Slop Checklist

Before outputting any frontend code, verify NONE of these are present:

### Banned Patterns
- [ ] Warm cream/ivory background (#F4F1EA, #FAF8F5, or similar)
- [ ] Playfair Display, Inter, Roboto, Arial, Space Grotesk as primary fonts
- [ ] Purple gradient on white background
- [ ] Generic card layout with uniform grid
- [ ] Numbered markers (01 / 02 / 03) unless content is genuinely sequential
- [ ] "Hero section with gradient background" as the default opening
- [ ] Multiple different animation libraries creating inconsistent motion
- [ ] More than 3 distinct motion behaviors on a single page
- [ ] Zoom-on-hover for product images
- [ ] Generic skeleton shimmer loading states
- [ ] Aurora/mesh gradient backgrounds
- [ ] Glassmorphism panels without justification
- [ ] Magnetic buttons or cursor trails
- [ ] Terracotta/warm clay as an accent color (AI Pattern #1)

### Required Patterns
- [ ] Every color value uses `oklch()` and references a CSS custom property
- [ ] Typography uses exactly two font families: Fraunces + Satoshi
- [ ] All spacing values reference the 4px-base token scale
- [ ] Motion uses only the two locked easing curves and three durations
- [ ] Product images have explicit `width`/`height` for zero CLS
- [ ] Focus states use `--accent` (deep teal), not default browser outlines
- [ ] `prefers-reduced-motion` alternatives are defined alongside every animation
- [ ] All interactive elements have minimum 44×44px touch targets
- [ ] Image alt text is descriptive, not generic
- [ ] Logo rendered as `the monsoon club.` — lowercase, letterspaced

## Motion Restraint

The site has exactly THREE signature interactions. Everything else is quiet:

### Signatures (invest engineering time here)
1. Cursor-aware floating label on imagery
2. Spatial expand transition between listing and product detail
3. Oversized "MONSOON" watermark fade-in behind sections

### Quiet interactions (keep minimal)
- Nav links: underline draw-on, 200ms
- Product card hover: crossfade to alternate image, 400ms
- Buttons: scale-down to 0.97 on press, 100ms
- Scroll reveal: fade-up 20px + opacity, 500ms, stagger 60ms (section entry only, once)

### Forbidden motion
- Parallax scrolling on product grids
- Smooth scroll hijacking
- Magnetic button pull
- Cursor trails or ambient particles
- Spring physics on UI elements
- Auto-playing video with audio

### Allowed exception
- ONE scroll-choreographed section on the homepage (lookbook/editorial moment)
  uses controlled scroll-linked motion. This is Signature territory, not scattered parallax.

## Copy Voice — The Monsoon Club

Use considered language. The voice is quiet confidence — exclusive but welcoming.

| ❌ Don't use | ✅ Use instead |
|---|---|
| Add to Cart | Add to Bag |
| Products | Pieces |
| Category | Collection |
| Best Sellers | Most Loved |
| New Arrivals | Just In |
| Newsletter | The Letter |
| Home | The Club |
| About | Our Story |
| Shop | Browse |
| See All | Explore |

### Tone
- Lowercase preference in UI labels where possible
- No exclamation marks
- No "Shop Now!" urgency language
- Short, considered sentences — not marketing copy
- "Welcome to the club." is the brand's greeting
