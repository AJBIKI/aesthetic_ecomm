---
name: motion-design
description: Rich motion design, Framer Motion animations, page transitions, and micro-interactions for The Monsoon Club. Elevates visual delight while maintaining high performance.
---

# Motion Design & Animations — The Monsoon Club

## Animation Principles

1. **Staggered Scroll Reveals**: Every section, card, and text block enters with orchestrated staggered reveals (`whileInView`, `viewport: { once: true, amount: 0.2 }`).
2. **Page & Route Transitions**: Smooth spatial expansion and curtain fade when moving between pages and products using Framer Motion `AnimatePresence`.
3. **Cursor Micro-Interactions**: Smooth floating label with spring physics (`stiffness: 250, damping: 20`) following the cursor over images and interactive elements.
4. **Card & Image Micro-Motion**: Image zoom on hover (`scale: 1.05`, 700ms ease), overlay card lift (`translateY(-4px)`), and text reveal.
5. **Background Art Dynamics**: Subtle ambient floating animation on background artistic SVG elements (`y: [-10, 10, -10]`, 12s infinite ease-in-out).

## Framer Motion Tokens & Springs

```typescript
export const transitions = {
  spring: { type: 'spring', stiffness: 260, damping: 20 },
  smooth: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  slow: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
  stagger: { staggerChildren: 0.1, delayChildren: 0.1 }
};
```
