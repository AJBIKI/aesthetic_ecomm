'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Watermark } from '../brand/watermark';

export function HeroSpread() {
  return (
    <section className="relative min-h-[90vh] flex items-center py-16 md:py-24 overflow-hidden">
      {/* Signature #3: MONSOON Watermark */}
      <Watermark text="MONSOON" className="top-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* 60/40 Asymmetric Offset Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: 60% Width Image Spread */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] w-full rounded-xs overflow-hidden bg-[oklch(0.925_0.008_245)] shadow-xl"
            >
              <Image
                src="/images/hero-1.png"
                alt="The Monsoon Club Hero Gown"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              
              {/* Subtle Overlay Shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.135_0.02_260)]/30 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 text-[oklch(0.93_0.005_250)] font-mono text-[10px] uppercase tracking-[0.2em]">
                EDITION NO. 01 · SS26
              </div>
            </motion.div>
          </div>

          {/* Right Column: 30% Width Offset Text Block */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
                JUST IN · MONSOON COLLECTION
              </span>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-display text-[oklch(0.13_0.02_260)] leading-[1.05] tracking-wide"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                Dresses That Move With The Season.
              </h1>

              <p className="text-sm sm:text-base text-[oklch(0.48_0.01_255)] leading-relaxed max-w-md font-body">
                Heavy 30-momme mulberry silks and sand-washed crepes crafted for quiet stillness, wet pavement reflections, and late evenings.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4"
            >
              <Link
                href="/collections/monsoon-edit"
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-[oklch(0.13_0.02_260)] hover:text-[oklch(0.55_0.12_195)] font-medium group transition-colors"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 text-[oklch(0.55_0.12_195)] group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
