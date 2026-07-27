# Project Rules — Dress E-Commerce

## Aesthetic Direction
- This project follows the "restraint applied unevenly" principle
- THREE signature interactions, everything else quiet
- Never converge toward warm-cream-serif-terracotta (AI pattern #1), dark-with-acid-accent (AI pattern #2), or broadsheet-with-hairlines (AI pattern #3)
- Motion must use the locked vocabulary: 2 easing curves, 3 durations
- Copy uses considered language ("Add to Bag" not "Add to Cart")

## Code Standards
- All colors in `oklch()`, referenced via CSS custom properties
- All spacing references the 4px-base token scale
- `prefers-reduced-motion` alternatives alongside every animation
- Product images have explicit width/height for zero CLS
- Minimum 44×44px touch targets on all interactive elements
