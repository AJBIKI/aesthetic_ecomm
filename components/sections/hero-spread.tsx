'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';
import { Watermark } from '../brand/watermark';

export function HeroSpread() {
  return (
    <section className="relative min-h-[95vh] pt-8 pb-20 overflow-hidden bg-[oklch(0.955_0.005_250)]">
      {/* Signature #3: MONSOON Watermark */}
      <Watermark text="MONSOON" className="top-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Magazine Cover Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[oklch(0.13_0.02_260)] pb-4 mb-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[oklch(0.55_0.12_195)] block">
              EDITORIAL COVER · ISSUE 01
            </span>
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-display text-[oklch(0.13_0.02_260)] tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              The Rain Issue.
            </h1>
          </div>

          <div className="flex items-center space-x-8 pt-4 md:pt-0 font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.48_0.01_255)]">
            <div>[FIG. 01.0 — SILK DRAMA]</div>
            {/* Barcode Graphic */}
            <div className="hidden sm:flex items-center space-x-1 opacity-70">
              <span className="inline-block w-0.5 h-6 bg-black" />
              <span className="inline-block w-1 h-6 bg-black" />
              <span className="inline-block w-0.5 h-6 bg-black" />
              <span className="inline-block w-1.5 h-6 bg-black" />
              <span className="inline-block w-0.5 h-6 bg-black" />
              <span className="inline-block w-1 h-6 bg-black" />
            </div>
          </div>
        </div>

        {/* Magazine Cover Editorial Spread (Overlapping Layout) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Full-Bleed Fashion Imagery (7 Columns) */}
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] w-full rounded-xs overflow-hidden bg-[oklch(0.925_0.008_245)] shadow-2xl border border-[oklch(0.86_0.006_250)]"
            >
              <Image
                src="/images/hero-1.png"
                alt="The Monsoon Club Hero Gown"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />

              {/* Inset Editorial Tag */}
              <div className="absolute top-6 left-6 bg-[oklch(0.135_0.02_260)]/90 backdrop-blur-md text-[oklch(0.93_0.005_250)] px-3 py-1.5 rounded-xs font-mono text-[10px] uppercase tracking-[0.2em] border border-[oklch(0.55_0.12_195)]/40">
                [FIG. 01.1] — THE MIDNIGHT SILK GOWN
              </div>

              {/* Sub-caption Bottom Right */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md text-[oklch(0.13_0.02_260)] px-4 py-2 rounded-xs font-mono text-[10px] uppercase tracking-[0.15em] shadow-lg">
                30-MOMME MULBERRY SILK
              </div>
            </motion.div>
          </div>

          {/* Overlapping Editorial Magazine Text Card (5 Columns, Overlapping Image) */}
          <div className="lg:col-span-5 lg:-ml-16 z-20 relative pt-6 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[oklch(0.955_0.005_250)]/95 backdrop-blur-xl p-8 sm:p-10 rounded-xs border border-[oklch(0.86_0.006_250)] shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[oklch(0.86_0.006_250)] pb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono flex items-center space-x-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>EDITORIAL MANIFESTO</span>
                </span>
                <span className="text-[10px] font-mono text-[oklch(0.48_0.01_255)]">VOL. I</span>
              </div>

              <h2
                className="text-3xl sm:text-4xl font-display text-[oklch(0.13_0.02_260)] leading-tight tracking-wide"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                Dresses That Move With The Season.
              </h2>

              <p className="text-xs sm:text-sm text-[oklch(0.48_0.01_255)] leading-relaxed font-body">
                Heavy 30-momme mulberry silks and sand-washed crepes crafted for quiet stillness, wet pavement reflections, and late evenings.
              </p>

              {/* Magazine Table of Contents Summary */}
              <div className="pt-2 border-t border-[oklch(0.86_0.006_250)] space-y-2 font-mono text-xs">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-bold">IN THIS ISSUE</div>
                <div className="flex justify-between text-[oklch(0.13_0.02_260)]">
                  <span>01. The Midnight Bias Gown</span>
                  <span className="text-[oklch(0.48_0.01_255)]">PG. 04</span>
                </div>
                <div className="flex justify-between text-[oklch(0.13_0.02_260)]">
                  <span>02. Sculpted Ivory Crepe Midi</span>
                  <span className="text-[oklch(0.48_0.01_255)]">PG. 08</span>
                </div>
                <div className="flex justify-between text-[oklch(0.13_0.02_260)]">
                  <span>03. Deep Ocean Cowl Gown</span>
                  <span className="text-[oklch(0.48_0.01_255)]">PG. 12</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/collections/monsoon-edit"
                  className="w-full bg-[oklch(0.13_0.02_260)] text-[oklch(0.93_0.005_250)] py-4 px-6 rounded-xs flex items-center justify-between text-xs uppercase tracking-[0.2em] hover:bg-[oklch(0.55_0.12_195)] transition-colors group"
                >
                  <span>Explore The Issue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
