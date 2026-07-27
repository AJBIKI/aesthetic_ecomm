'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WatermarkProps {
  text?: string;
  className?: string;
}

export function Watermark({ text = 'MONSOON', className = '' }: WatermarkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden absolute inset-x-0 flex items-center justify-center -z-10 ${className}`}
    >
      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 0.035, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-[18vw] leading-none font-display uppercase tracking-[0.3em] text-[oklch(0.13_0.02_260)] whitespace-nowrap"
        style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
      >
        {text}
      </motion.span>
    </div>
  );
}
