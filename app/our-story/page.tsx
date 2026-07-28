import Image from 'next/image';
import { Watermark } from '@/components/brand/watermark';
import { BookOpen, Layers } from 'lucide-react';

export const metadata = {
  title: 'Our Story | The Monsoon Club.',
  description: 'The editorial manifesto behind The Monsoon Club.',
};

export default function OurStoryPage() {
  return (
    <div className="py-16 md:py-24 space-y-16 relative">
      <Watermark text="MANIFESTO" className="top-20" />

      {/* Magazine Issue Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b-2 border-[oklch(0.13_0.02_260)] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
            FEATURE ARTICLE · PG. 12 / 13
          </span>
          <h1
            className="text-4xl sm:text-6xl font-display text-[oklch(0.13_0.02_260)] tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            The Atelier Manifesto.
          </h1>
        </div>

        <div className="hidden sm:block text-right font-mono text-xs text-[oklch(0.48_0.01_255)] uppercase tracking-[0.2em]">
          <div>ISSUE 01 // ESSAY</div>
          <div className="text-[oklch(0.55_0.12_195)]">RESTRAINED LUXURY</div>
        </div>
      </div>

      {/* Two-Page Magazine Double Spread Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[oklch(0.925_0.008_245)] p-8 sm:p-12 rounded-xs border border-[oklch(0.86_0.006_250)] shadow-2xl relative">
          
          {/* Left Page (6 Columns): Editorial Hero Image */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] w-full rounded-xs overflow-hidden border border-[oklch(0.86_0.006_250)]">
              <Image
                src="/images/hero-1.png"
                alt="The Monsoon Club Atelier"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 bg-black/80 text-white font-mono text-[9px] px-2.5 py-1 uppercase tracking-widest">
                [PLATE 01 — THE MONSOON SILK]
              </div>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[oklch(0.48_0.01_255)] text-center">
              FIG 1.1 — PHOTOGRAPHED IN NATURAL EVENING LIGHT, MUMBAI.
            </p>
          </div>

          {/* Right Page (6 Columns): Article Text & Drop Cap */}
          <div className="lg:col-span-6 space-y-6 font-body text-sm sm:text-base text-[oklch(0.48_0.01_255)] leading-relaxed lg:pl-6">
            <div className="flex items-center space-x-2 text-xs font-mono text-[oklch(0.55_0.12_195)] uppercase tracking-[0.2em] border-b border-[oklch(0.86_0.006_250)] pb-2">
              <BookOpen className="w-4 h-4" />
              <span>ON RESTRAINT & SILENCE</span>
            </div>

            <p className="editorial-text">
              The Monsoon Club was born out of a resistance to noise. In an era of high-density product grids, relentless discount countdowns, and hyper-kinetic web templates, we chose silence. We treat dresses not as inventory to be rapidly cycled, but as kinetic sculptures meant to move with the human cadence.
            </p>

            <p>
              Every silhouette begins with a fabric choice: 30-momme mulberry silks sand-washed for an elusive matte luster, heavy double crepes that hold structured folds, and raw-edged habotai that floats in coastal air. We anchor hems with subtle inner silk weight so that when you walk, the drape lags behind just enough to create presence.
            </p>

            <blockquote className="my-8 border-l-2 border-[oklch(0.55_0.12_195)] pl-6 italic font-display text-xl sm:text-2xl text-[oklch(0.13_0.02_260)]">
              "Luxury is not an accumulation of features. It is the confidence to leave room."
            </blockquote>

            <p>
              Our pieces are produced in limited seasonal runs in our partner ateliers across Mumbai, London, and Kyoto. Each garment arrives wrapped in unbleached kora cotton inside a minimal matte box, with a card welcoming you to the club.
            </p>

            <div className="pt-4 border-t border-[oklch(0.86_0.006_250)] flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[oklch(0.48_0.01_255)]">
              <span>THE MONSOON CLUB PUBLICATION</span>
              <span>PG. 13</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
