---
name: fixing-motion-performance
description: Performance & motion optimization pipeline for 60fps animations, GPU acceleration, and reduced motion.
---

# Fixing Motion Performance Skill

## Guidelines
- Animate only GPU-accelerated properties: `transform` and `opacity`.
- Use `will-change: transform` on continuously animated elements.
- Wrap all animations with `prefers-reduced-motion` fallbacks.
- Use GSAP `useGSAP` hook for memory leak-free cleanup in React components.
