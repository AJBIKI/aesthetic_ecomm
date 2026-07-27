---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults. Adapted from Anthropic's official frontend-design plugin.
---

# Frontend Design — Dress E-Commerce

Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's. This client has already rejected proposals that felt templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take one real aesthetic risk you can justify.

## Ground it in the subject

This is a dress e-commerce site. The subject's world — fabric, drape, silhouette, stitching, the way light catches embroidery, the rustle of silk — is where distinctive choices come from. Build with the brief's real content and subject matter throughout.

## Design principles

Typography carries the personality of the page. Pair the display and body faces deliberately, not the same families you would reach for on any other project. Make the type treatment itself a memorable part of the design.

Structure is information. Structural devices — numbering, eyebrows, dividers, labels — should encode something true about the content, not decorate it.

Leverage motion deliberately. An orchestrated moment usually lands harder than scattered effects. Sometimes less is more, and extra animation contributes to the feeling that the design is AI-generated.

Match complexity to the vision. Elegance is executing the chosen vision well.

## Calibration: what to avoid

AI-generated design right now clusters around three overused looks:
1. **Warm cream background** (near #F4F1EA) with a high-contrast serif display and a terracotta accent
2. **Near-black background** with a single bright acid-green or vermilion accent
3. **Broadsheet-style layout** with hairline rules, zero border-radius, and dense newspaper-like columns

All three can be legitimate for some briefs, but defaulting to any of them signals "AI-generated." Push beyond these defaults.

Also avoid:
- Overused font families: Inter, Roboto, Arial, system fonts, Space Grotesk, Playfair Display
- Purple gradients on white backgrounds
- Predictable layouts and cookie-cutter component patterns
- Generic copy that lacks context-specific character

## The restraint principle

Being different comes from restraint applied unevenly. Pick 2-3 signature design moves and execute them obsessively well. Keep everything else deliberately quiet. A site with one unforgettable interaction beats a site with fifteen forgettable ones.

## Our three signatures

1. **Cursor-aware floating label** — a soft label ("View" / "Explore") tracks the cursor over imagery
2. **Spatial page transition** — clicking a product card expands the image to fill the viewport, the detail view assembles behind it
3. **Type as graphic element** — oversized, near-invisible display text placed behind imagery as a recurring watermark motif

Everything else — nav, buttons, scrolling, hover states — is deliberately unremarkable.

Tech stack: Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, Shadcn/ui. No GSAP, no WebGL, no smooth scroll libraries.
