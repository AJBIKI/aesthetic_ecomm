'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { CursorLabel } from './cursor-label';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  isFeatured?: boolean;
  aspectRatio?: '4/5' | '3/4' | '1/1';
}

export function ProductCard({
  product,
  isFeatured = false,
  aspectRatio = '4/5',
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useStore();
  const isWished = isInWishlist(product.id);

  const aspectClass =
    aspectRatio === '3/4'
      ? 'aspect-[3/4]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
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

      {/* Image Frame */}
      <div
        className={`relative w-full ${aspectClass} bg-[oklch(0.925_0.008_245)] rounded-xs overflow-hidden`}
      >
        <Link href={`/pieces/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <Image
            src={product.images.primary}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-500 ease-out ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
            priority={isFeatured}
          />

          {/* Hover Alternate Image (Crossfade) */}
          <Image
            src={product.images.hover}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-500 ease-out ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-[oklch(0.955_0.005_250)]/80 backdrop-blur-xs text-[oklch(0.13_0.02_260)] hover:text-[oklch(0.55_0.12_195)] transition-all z-10"
          aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWished ? 'fill-[oklch(0.55_0.12_195)] text-[oklch(0.55_0.12_195)]' : ''
            }`}
          />
        </button>

        {/* Collection Tag */}
        {product.isFeatured && (
          <span className="absolute bottom-4 left-4 bg-[oklch(0.135_0.02_260)] text-[oklch(0.93_0.005_250)] text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-mono">
            feature piece
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="pt-4 flex flex-col space-y-1">
        <span className="text-[11px] uppercase tracking-[0.15em] text-[oklch(0.48_0.01_255)] font-mono">
          {product.category}
        </span>

        <div className="flex items-baseline justify-between pt-0.5">
          <Link
            href={`/pieces/${product.slug}`}
            className="font-display text-base sm:text-lg text-[oklch(0.13_0.02_260)] hover:text-[oklch(0.55_0.12_195)] transition-colors tracking-wide"
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            {product.name}
          </Link>

          <span className="text-xs sm:text-sm text-[oklch(0.48_0.01_255)] font-mono ml-4 shrink-0">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
}
