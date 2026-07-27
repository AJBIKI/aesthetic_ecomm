import Image from 'next/image';
import Link from 'next/link';
import { Watermark } from '@/components/brand/watermark';
import collectionsData from '@/lib/data/collections.json';
import { Collection } from '@/lib/types';

export const metadata = {
  title: 'Collections | The Monsoon Club.',
  description: 'Curated seasonal collections and archival silhouettes.',
};

export default function CollectionsPage() {
  const collections = collectionsData as Collection[];

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative">
      <Watermark text="COLLECTIONS" className="top-20" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
          THE EDITS
        </span>
        <h1
          className="text-4xl sm:text-5xl font-display text-[oklch(0.13_0.02_260)] tracking-wide"
          style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
        >
          Seasonal & Archival Edits.
        </h1>
        <p className="text-xs sm:text-sm text-[oklch(0.48_0.01_255)] font-body">
          Explore pieces organized by mood, movement, and fabric weight.
        </p>
      </div>

      {/* Collections Spreads */}
      <div className="space-y-20">
        {collections.map((col, idx) => {
          const isReverse = idx % 2 !== 0;

          return (
            <div
              key={col.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                isReverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-7 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative aspect-[16/9] sm:aspect-[4/3] w-full rounded-xs overflow-hidden bg-[oklch(0.925_0.008_245)] group">
                  <Image
                    src={col.heroImage}
                    alt={col.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>

              <div className={`lg:col-span-5 space-y-4 ${isReverse ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'}`}>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)]">
                  {col.season}
                </span>

                <h2
                  className="text-3xl sm:text-4xl font-display text-[oklch(0.13_0.02_260)] tracking-wide"
                  style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                >
                  {col.name}
                </h2>

                <p className="text-xs sm:text-sm text-[oklch(0.48_0.01_255)] leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/collections/${col.slug}`}
                    className="inline-block px-6 py-3 border border-[oklch(0.13_0.02_260)] text-xs uppercase tracking-[0.18em] hover:bg-[oklch(0.13_0.02_260)] hover:text-[oklch(0.93_0.005_250)] transition-colors font-medium"
                  >
                    Explore Collection →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
