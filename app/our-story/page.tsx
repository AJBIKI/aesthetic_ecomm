import Image from 'next/image';
import { Watermark } from '@/components/brand/watermark';

export const metadata = {
  title: 'Our Story | The Monsoon Club.',
  description: 'The editorial story behind The Monsoon Club.',
};

export default function OurStoryPage() {
  return (
    <div className="py-16 md:py-24 space-y-20 relative">
      <Watermark text="ATELIER" className="top-20" />

      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
          THE MANIFESTO
        </span>
        <h1
          className="text-4xl sm:text-5xl font-display text-[oklch(0.13_0.02_260)] tracking-wide"
          style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
        >
          Our Story.
        </h1>
        <p className="text-sm text-[oklch(0.48_0.01_255)] italic font-display" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
          "Restraint applied unevenly."
        </p>
      </div>

      {/* Hero Spread Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] w-full rounded-xs overflow-hidden bg-[oklch(0.925_0.008_245)] shadow-xl">
          <Image
            src="/images/hero-1.png"
            alt="The Monsoon Club Atelier"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Long-form Editorial Article */}
      <article className="max-w-3xl mx-auto px-4 space-y-8 font-body text-sm sm:text-base text-[oklch(0.48_0.01_255)] leading-relaxed">
        <p className="editorial-text">
          The Monsoon Club was born out of a resistance to noise. In an era of high-density product grids, relentless discount countdowns, and hyper-kinetic web templates, we chose silence. We treat dresses not as inventory to be rapidly cycled, but as kinetic sculptures meant to move with the human cadence.
        </p>

        <p>
          Every silhouette begins with a fabric choice: 30-momme mulberry silks sand-washed for an elusive matte luster, heavy double crepes that hold structured folds, and raw-edged habotai that floats in coastal air. We anchor hems with subtle inner silk weight so that when you walk, the drape lags behind just enough to create presence.
        </p>

        <blockquote className="my-10 border-l-2 border-[oklch(0.55_0.12_195)] pl-6 italic font-display text-2xl text-[oklch(0.13_0.02_260)]">
          "Luxury is not an accumulation of features. It is the confidence to leave room."
        </blockquote>

        <p>
          Our pieces are produced in limited seasonal runs in our partner ateliers across Mumbai, London, and Kyoto. Each garment arrives wrapped in unbleached kora cotton inside a minimal matte box, with a card welcoming you to the club.
        </p>
      </article>
    </div>
  );
}
