'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Layers } from 'lucide-react';
import { Watermark } from '../brand/watermark';

export function HeroSpread() {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Liquid Smooth Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

    tl.fromTo(
      '.hero-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4 }
    )
      .fromTo(
        '.hero-image-frame',
        { scale: 0.94, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.5 },
        '-=1.0'
      )
      .fromTo(
        '.hero-card',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2 },
        '-=1.0'
      );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[95vh] pt-4 md:pt-8 pb-8 md:pb-20 overflow-hidden">
      {/* Signature #3: MONSOON Watermark */}
      <Watermark text="MONSOON" className="top-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Magazine Cover Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[oklch(0.14_0.025_145)] pb-4 mb-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[oklch(0.55_0.12_195)] block">
              EDITORIAL COVER · ISSUE 01
            </span>
            <h1
              className="hero-title text-4xl sm:text-6xl md:text-7xl font-display text-[oklch(0.14_0.025_145)] tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              The Rain Issue.
            </h1>
          </div>

          <div className="flex items-center space-x-8 pt-4 md:pt-0 font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.45_0.02_145)]">
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
          <div className="hero-image-frame lg:col-span-7 relative z-10">
            <div className="relative aspect-[3/4] w-full rounded-xs overflow-hidden bg-[oklch(0.90_0.025_142)] shadow-2xl border border-[oklch(0.85_0.015_145)]">
              <Image
                src="/images/hero-1.png"
                alt="The Monsoon Club Hero Gown"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />

              {/* Inset Editorial Tag */}
              <div className="absolute top-6 left-6 bg-[oklch(0.14_0.03_145)]/90 backdrop-blur-md text-[oklch(0.93_0.015_145)] px-3 py-1.5 rounded-xs font-mono text-[10px] uppercase tracking-[0.2em] border border-[oklch(0.55_0.12_195)]/40">
                [FIG. 01.1] — THE MIDNIGHT SILK GOWN
              </div>

              {/* Sub-caption Bottom Right */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md text-[oklch(0.14_0.025_145)] px-4 py-2 rounded-xs font-mono text-[10px] uppercase tracking-[0.15em] shadow-lg">
                30-MOMME MULBERRY SILK
              </div>
            </div>
          </div>

          {/* Overlapping Editorial Magazine Text Card (5 Columns, Overlapping Image) */}
          <div className="hero-card lg:col-span-5 lg:-ml-16 z-20 relative pt-6 lg:pt-0">
            <div className="bg-[oklch(0.94_0.02_145)]/95 backdrop-blur-xl p-8 sm:p-10 rounded-xs border border-[oklch(0.85_0.015_145)] shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[oklch(0.85_0.015_145)] pb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono flex items-center space-x-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>EDITORIAL MANIFESTO</span>
                </span>
                <span className="text-[10px] font-mono text-[oklch(0.45_0.02_145)]">VOL. I</span>
              </div>

              <h2
                className="text-3xl sm:text-4xl font-display text-[oklch(0.14_0.025_145)] leading-tight tracking-wide"
                style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
              >
                Dresses That Move With The Season.
              </h2>

              <p className="text-xs sm:text-sm text-[oklch(0.45_0.02_145)] leading-relaxed font-body">
                Heavy 30-momme mulberry silks and sand-washed crepes crafted for quiet stillness, wet pavement reflections, and late evenings.
              </p>

              {/* Magazine Table of Contents Summary */}
              <div className="pt-2 border-t border-[oklch(0.85_0.015_145)] space-y-2 font-mono text-xs">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-bold">IN THIS ISSUE</div>
                <div className="flex justify-between text-[oklch(0.14_0.025_145)]">
                  <span>01. The Midnight Bias Gown</span>
                  <span className="text-[oklch(0.45_0.02_145)]">PG. 04</span>
                </div>
                <div className="flex justify-between text-[oklch(0.14_0.025_145)]">
                  <span>02. Sculpted Ivory Crepe Midi</span>
                  <span className="text-[oklch(0.45_0.02_145)]">PG. 08</span>
                </div>
                <div className="flex justify-between text-[oklch(0.14_0.025_145)]">
                  <span>03. Deep Ocean Cowl Gown</span>
                  <span className="text-[oklch(0.45_0.02_145)]">PG. 12</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/collections/monsoon-edit"
                  className="w-full bg-[oklch(0.14_0.025_145)] text-[oklch(0.93_0.015_145)] py-4 px-6 rounded-xs flex items-center justify-between text-xs uppercase tracking-[0.2em] hover:bg-[oklch(0.55_0.12_195)] transition-colors group"
                >
                  <span>Explore The Issue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
