'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowUpRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { CursorLabel } from './cursor-label';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  index?: number;
  isFeatured?: boolean;
  aspectRatio?: '4/5' | '3/4' | '16/9';
}

export function ProductCard({
  product,
  index = 0,
  isFeatured = false,
  aspectRatio = '4/5',
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useStore();
  const isWished = isInWishlist(product.id);

  const aspectClass =
    aspectRatio === '3/4'
      ? 'aspect-[3/4]'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : 'aspect-[4/5]';

  return (
    <div
      className={`group relative flex flex-col ${
        isFeatured ? 'md:col-span-2 md:row-span-2' : 'col-span-1'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cursor Label Signature */}
      <CursorLabel label="view" isVisible={isHovered} />

      {/* Editorial Magazine Image Frame */}
      <div
        className={`relative w-full ${aspectClass} bg-[oklch(0.925_0.008_245)] rounded-xs overflow-hidden border border-[oklch(0.86_0.006_250)] shadow-md`}
      >
        <Link href={`/pieces/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <Image
            src={product.images.primary}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            priority={isFeatured}
          />

          {/* Hover Alternate Image */}
          <Image
            src={product.images.hover}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        </Link>

        {/* Magazine Figure Plate Tag */}
        <div className="absolute top-4 left-4 bg-[oklch(0.135_0.02_260)]/90 backdrop-blur-md text-[oklch(0.93_0.005_250)] px-2.5 py-1 rounded-xs font-mono text-[9px] uppercase tracking-[0.2em]">
          [FIG. 0{index + 1}]
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-xs text-[oklch(0.13_0.02_260)] hover:text-[oklch(0.55_0.12_195)] transition-all z-10"
          aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWished ? 'fill-[oklch(0.55_0.12_195)] text-[oklch(0.55_0.12_195)]' : ''
            }`}
          />
        </button>

        {/* Floating Overlapping Magazine Caption Card (Appears on Hover) */}
        <div className="absolute bottom-4 left-4 right-4 bg-[oklch(0.955_0.005_250)]/95 backdrop-blur-md p-4 rounded-xs border border-[oklch(0.86_0.006_250)] transition-all duration-300 transform translate-y-2 opacity-95 group-hover:translate-y-0 group-hover:opacity-100 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
                {product.category}
              </span>
              <h4
                className="text-base sm:text-lg font-display text-[oklch(0.13_0.02_260)] tracking-wide"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                {product.name}
              </h4>
            </div>
            
            <span className="text-xs font-mono text-[oklch(0.13_0.02_260)] font-semibold shrink-0 ml-2">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <p className="text-[11px] text-[oklch(0.48_0.01_255)] font-body line-clamp-1 mt-1">
            {product.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
