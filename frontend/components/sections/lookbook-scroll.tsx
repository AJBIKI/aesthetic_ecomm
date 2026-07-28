'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function LookbookScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0, 1, 0.8]);
  const textY = useTransform(scrollYProgress, [0.1, 0.4], [50, 0]);

  return (
    <section ref={containerRef} data-dark="true" className="relative h-[200vh] bg-[oklch(0.14_0.03_145)] text-[oklch(0.93_0.015_145)]">
      {/* Sticky Full Bleed Image Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Lookbook Image */}
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 w-full h-full">
          <Image
            src="/images/dress-3-a.png"
            alt="The Monsoon Lookbook Editorial"
            fill
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.135_0.02_260)]/90 via-[oklch(0.135_0.02_260)]/50 to-transparent" />
        </motion.div>

        {/* Story Text Overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="max-w-xl space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[oklch(0.55_0.12_195)] font-mono block">
              EDITORIAL STORY · CHAPTER II
            </span>

            <h2
              className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-display leading-[1.1] tracking-[0.08em] uppercase text-[oklch(0.93_0.015_145)] font-light font-[300]"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              AS RAIN DESCENDS, SILHOUETTE IS ALL THAT REMAINS.
            </h2>

            <p className="text-sm sm:text-base text-[oklch(0.93_0.005_250)]/80 leading-relaxed font-body">
              Each garment is cut with fluid weight—designed not for theatrical display, but for the quiet moment when you step out into the evening air.
            </p>

            <div className="pt-4">
              <Link
                href="/our-story"
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] hover:text-white transition-colors group"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
