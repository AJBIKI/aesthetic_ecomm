'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Watermark } from '@/components/brand/watermark';
import collectionsData from '@/lib/data/collections.json';
import { Collection, Volume } from '@/lib/types';
import { useStore } from '@/lib/store';
import { api } from '@/lib/api';
import { volumeToCollection } from '@/lib/mappers';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>(() => {
    // Start with static data as fallback
    const staticCols = collectionsData as Collection[];
    return staticCols;
  });

  useEffect(() => {
    // Try fetching live volume data from backend
    api.getVolumes().then((volumes) => {
      if (volumes && volumes.length > 0) {
        setCollections(volumes.map(volumeToCollection));
      }
    }).catch(() => {
      // Keep static fallback
    });
  }, []);

  const handleMouseEnterCollection = (slug: string) => {
    if (slug === 'monsoon-edit') {
      useStore.getState().setActiveVolume('VOL. I // 30-MOMME SILKS');
    } else if (slug === 'resort-dusk') {
      useStore.getState().setActiveVolume('VOL. II // RESORT & HABOTAI');
    } else if (slug === 'archival') {
      useStore.getState().setActiveVolume('VOL. III // ARCHIVAL SILHOUETTES');
    }
  };

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative">
      <Watermark text="COLLECTIONS" className="top-20" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
          THE EDITS
        </span>
        <h1
          className="text-4xl sm:text-5xl font-display text-[oklch(0.14_0.025_145)] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
        >
          Seasonal & Archival Edits.
        </h1>
        <p className="text-xs sm:text-sm text-[oklch(0.45_0.02_145)] font-body">
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
              onMouseEnter={() => handleMouseEnterCollection(col.slug)}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                isReverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-7 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative aspect-[16/9] sm:aspect-[4/3] w-full rounded-xs overflow-hidden bg-[oklch(0.90_0.025_142)] group border border-[oklch(0.85_0.015_145)] shadow-xl">
                  <Image
                    src={col.heroImage}
                    alt={col.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  
                  <div className="absolute top-4 left-4 bg-[oklch(0.14_0.03_145)]/90 backdrop-blur-md text-[oklch(0.93_0.015_145)] px-3 py-1 rounded-xs font-mono text-[10px] uppercase tracking-[0.2em]">
                    VOL. 0{idx + 1}
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-5 space-y-4 ${isReverse ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'}`}>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)]">
                  {col.season}
                </span>

                <h2
                  className="text-3xl sm:text-4xl font-display text-[oklch(0.14_0.025_145)] tracking-wide"
                  style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
                >
                  {col.name}
                </h2>

                <p className="text-xs sm:text-sm text-[oklch(0.45_0.02_145)] leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/collections/${col.slug}`}
                    className="inline-block px-6 py-3 border border-[oklch(0.14_0.025_145)] text-xs uppercase tracking-[0.18em] hover:bg-[oklch(0.14_0.025_145)] hover:text-[oklch(0.93_0.015_145)] transition-colors font-medium"
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
