'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Check, ShieldCheck } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { ProductCard } from '@/components/product/product-card';

interface PDPClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: PDPClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'S');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'care'>('details');
  const [added, setAdded] = useState(false);

  const { addToBag, toggleWishlist, isInWishlist } = useStore();
  const isWished = isInWishlist(product.id);

  const handleAdd = () => {
    addToBag(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 55% / 40% Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Image Gallery (55%) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Hero Image */}
          <motion.div
            key={selectedImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[4/5] w-full rounded-xs overflow-hidden bg-[oklch(0.925_0.008_245)] shadow-md"
          >
            <Image
              src={product.images.gallery[selectedImageIndex] || product.images.primary}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>

          {/* Thumbnail Gallery Strip */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-[4/5] rounded-xs overflow-hidden border-2 transition-all ${
                  selectedImageIndex === idx
                    ? 'border-[oklch(0.55_0.12_195)] scale-98'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="150px" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Info Panel (40%) */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          
          {/* Tagline & Title */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
              {product.collection.replace('-', ' ')} · {product.category}
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-display text-[oklch(0.13_0.02_260)] tracking-wide"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              {product.name}
            </h1>
            <p className="text-xl text-[oklch(0.13_0.02_260)] font-mono pt-1">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[oklch(0.48_0.01_255)] leading-relaxed font-body">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-[0.15em] text-[oklch(0.13_0.02_260)] font-mono">
                Select Size
              </span>
              <button className="text-[oklch(0.55_0.12_195)] underline tracking-wider">
                Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-11 px-5 text-xs font-mono rounded-xs border transition-colors ${
                    selectedSize === size
                      ? 'border-[oklch(0.55_0.12_195)] bg-[oklch(0.55_0.12_195)] text-[oklch(0.93_0.005_250)] font-semibold'
                      : 'border-[oklch(0.86_0.006_250)] text-[oklch(0.13_0.02_260)] hover:border-[oklch(0.55_0.12_195)]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions: Add to Bag + Wishlist */}
          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={handleAdd}
              className="flex-1 bg-[oklch(0.13_0.02_260)] text-[oklch(0.93_0.005_250)] py-4 px-8 rounded-xs text-xs uppercase tracking-[0.2em] font-medium hover:bg-[oklch(0.55_0.12_195)] transition-colors flex items-center justify-center space-x-2"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <span>Add to Bag · ₹{product.price.toLocaleString('en-IN')}</span>
              )}
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-4 rounded-xs border border-[oklch(0.86_0.006_250)] text-[oklch(0.13_0.02_260)] hover:border-[oklch(0.55_0.12_195)] hover:text-[oklch(0.55_0.12_195)] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWished ? 'fill-[oklch(0.55_0.12_195)] text-[oklch(0.55_0.12_195)]' : ''}`} />
            </button>
          </div>

          {/* Collapsible Details Tabs */}
          <div className="border-t border-[oklch(0.86_0.006_250)] pt-6 space-y-4 text-xs">
            <div className="flex border-b border-[oklch(0.86_0.006_250)] pb-3 space-x-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`uppercase tracking-[0.15em] font-mono transition-colors ${
                  activeTab === 'details' ? 'text-[oklch(0.55_0.12_195)] font-semibold' : 'text-[oklch(0.48_0.01_255)]'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('fabric')}
                className={`uppercase tracking-[0.15em] font-mono transition-colors ${
                  activeTab === 'fabric' ? 'text-[oklch(0.55_0.12_195)] font-semibold' : 'text-[oklch(0.48_0.01_255)]'
                }`}
              >
                Fabric
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`uppercase tracking-[0.15em] font-mono transition-colors ${
                  activeTab === 'care' ? 'text-[oklch(0.55_0.12_195)] font-semibold' : 'text-[oklch(0.48_0.01_255)]'
                }`}
              >
                Care & Shipping
              </button>
            </div>

            <div className="text-[oklch(0.48_0.01_255)] leading-relaxed">
              {activeTab === 'details' && (
                <ul className="list-disc list-inside space-y-1.5">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'fabric' && <p>{product.fabric}</p>}
              {activeTab === 'care' && (
                <div className="space-y-2">
                  <p>{product.care}</p>
                  <p className="flex items-center text-[oklch(0.55_0.12_195)] pt-1">
                    <ShieldCheck className="w-4 h-4 mr-1.5" /> Complimentary global courier & signature packaging
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Strip */}
      {relatedProducts.length > 0 && (
        <section className="mt-28 border-t border-[oklch(0.86_0.006_250)] pt-16">
          <div className="mb-10 flex items-center justify-between">
            <h3
              className="text-2xl sm:text-3xl font-display text-[oklch(0.13_0.02_260)]"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              You Might Also Love.
            </h3>
            <span className="text-xs uppercase tracking-[0.15em] text-[oklch(0.55_0.12_195)] font-mono">
              Monsoon Atelier
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
