'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Check, ShieldCheck, Layers, BookOpen } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { ProductCard } from '@/components/product/product-card';

import { useRouter } from 'next/navigation';
import { customerApi } from '@/lib/customer-api';

interface PDPClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: PDPClientProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'S');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'care'>('details');
  const [added, setAdded] = useState(false);

  const addToBag = useStore((state) => state.addToBag);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist);
  const isWished = isInWishlist(product.id);

  // Safe mount execution for activeVolume using getState() - prevents infinite re-render loops
  useEffect(() => {
    const col = product.collection || '';
    if (col === 'monsoon-edit') {
      useStore.getState().setActiveVolume('VOL. I // 30-MOMME SILKS');
    } else if (col === 'resort-dusk') {
      useStore.getState().setActiveVolume('VOL. II // RESORT & HABOTAI');
    } else if (col === 'archival') {
      useStore.getState().setActiveVolume('VOL. III // ARCHIVAL SILHOUETTES');
    }
  }, [product.id, product.collection]);

  const handleAdd = () => {
    if (!customerApi.isLoggedIn()) {
      router.push(`/login?redirect=${encodeURIComponent(`/pieces/${product.slug}`)}`);
      return;
    }
    addToBag(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Magazine Double-Page Feature Header */}
      <div className="border-b-2 border-[oklch(0.14_0.025_145)] pb-6 flex flex-col md:flex-row md:items-end justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-[10px] uppercase font-mono tracking-[0.25em] text-[oklch(0.55_0.12_195)]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>FEATURE ARTICLE · {product.collection.replace('-', ' ')}</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl font-display text-[oklch(0.14_0.025_145)] tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            {product.name}.
          </h1>
        </div>

        <div className="pt-4 md:pt-0 font-mono text-xs text-[oklch(0.45_0.02_145)] uppercase tracking-[0.2em] flex items-center space-x-4">
          <span>CAT NO. {product.id.toUpperCase()}</span>
          <span>•</span>
          <span className="text-[oklch(0.14_0.025_145)] font-bold">₹{product.price.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Magazine Editorial Spread Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Editorial Photo Collage & Figure Badges (7 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main Hero Photo Frame with Figure Tag */}
          <div className="relative">
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[4/5] w-full rounded-xs overflow-hidden bg-[oklch(0.90_0.025_142)] border border-[oklch(0.85_0.015_145)] shadow-2xl"
            >
              <Image
                src={product.images.gallery[selectedImageIndex] || product.images.primary}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />

              <div className="absolute top-6 left-6 bg-[oklch(0.14_0.03_145)]/90 backdrop-blur-md text-[oklch(0.93_0.015_145)] px-3 py-1.5 rounded-xs font-mono text-[10px] uppercase tracking-[0.2em]">
                [FIG. 0{selectedImageIndex + 1} — EDITORIAL SPREAD]
              </div>
            </motion.div>
          </div>

          {/* Thumbnail Gallery Strip */}
          <div className="grid grid-cols-4 gap-4 pt-2">
            {product.images.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-[4/5] rounded-xs overflow-hidden border-2 transition-all ${
                  selectedImageIndex === idx
                    ? 'border-[oklch(0.55_0.12_195)] scale-98 shadow-md'
                    : 'border-[oklch(0.85_0.015_145)] opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="150px" />
                <span className="absolute bottom-1 left-1 bg-black/70 text-white font-mono text-[8px] px-1 rounded-xs">
                  0{idx + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Editorial Quote Card */}
          <blockquote className="p-8 bg-[oklch(0.90_0.025_142)] rounded-xs border border-[oklch(0.85_0.015_145)] italic font-display text-xl sm:text-2xl text-[oklch(0.14_0.025_145)] leading-relaxed" style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}>
            "{product.tagline}"
          </blockquote>
        </div>

        {/* Right Column: Magazine Colophon Spec Sheet & Action Card (5 Columns) */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          
          <div className="bg-[oklch(0.94_0.02_145)] p-8 rounded-xs border border-[oklch(0.85_0.015_145)] shadow-xl space-y-8">
            
            {/* Header / Colophon Tag */}
            <div className="flex items-center justify-between border-b border-[oklch(0.85_0.015_145)] pb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5" />
                <span>SPECIFICATION COLOPHON</span>
              </span>
              <span className="text-[10px] font-mono text-[oklch(0.45_0.02_145)]">IN STOCK</span>
            </div>

            <p className="text-xs sm:text-sm text-[oklch(0.45_0.02_145)] leading-relaxed font-body">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="uppercase tracking-[0.15em] text-[oklch(0.14_0.025_145)]">
                  SELECT ATELIER SIZE
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
                        ? 'border-[oklch(0.55_0.12_195)] bg-[oklch(0.55_0.12_195)] text-[oklch(0.93_0.015_145)] font-semibold'
                        : 'border-[oklch(0.85_0.015_145)] text-[oklch(0.14_0.025_145)] hover:border-[oklch(0.55_0.12_195)]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag CTA */}
            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={handleAdd}
                className="flex-1 bg-[oklch(0.14_0.025_145)] text-[oklch(0.93_0.015_145)] py-4 px-8 rounded-xs text-xs uppercase tracking-[0.2em] font-medium hover:bg-[oklch(0.55_0.12_195)] transition-colors flex items-center justify-center space-x-2 shadow-lg"
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
                className="p-4 rounded-xs border border-[oklch(0.85_0.015_145)] text-[oklch(0.14_0.025_145)] hover:border-[oklch(0.55_0.12_195)] hover:text-[oklch(0.55_0.12_195)] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWished ? 'fill-[oklch(0.55_0.12_195)] text-[oklch(0.55_0.12_195)]' : ''}`} />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-t border-[oklch(0.85_0.015_145)] pt-6 space-y-4 text-xs">
              <div className="flex border-b border-[oklch(0.85_0.015_145)] pb-3 space-x-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`uppercase tracking-[0.15em] font-mono transition-colors ${
                    activeTab === 'details' ? 'text-[oklch(0.55_0.12_195)] font-semibold' : 'text-[oklch(0.45_0.02_145)]'
                  }`}
                >
                  Garment Details
                </button>
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`uppercase tracking-[0.15em] font-mono transition-colors ${
                    activeTab === 'fabric' ? 'text-[oklch(0.55_0.12_195)] font-semibold' : 'text-[oklch(0.45_0.02_145)]'
                  }`}
                >
                  Fabrication
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`uppercase tracking-[0.15em] font-mono transition-colors ${
                    activeTab === 'care' ? 'text-[oklch(0.55_0.12_195)] font-semibold' : 'text-[oklch(0.45_0.02_145)]'
                  }`}
                >
                  Delivery
                </button>
              </div>

              <div className="text-[oklch(0.45_0.02_145)] leading-relaxed">
                {activeTab === 'details' && (
                  <ul className="list-disc list-inside space-y-1.5 font-mono text-[11px]">
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'fabric' && <p>{product.fabric}</p>}
                {activeTab === 'care' && (
                  <div className="space-y-2 font-mono text-[11px]">
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
      </div>

      {/* "IN THIS ISSUE" Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-28 border-t-2 border-[oklch(0.14_0.025_145)] pt-16">
          <div className="mb-10 flex items-center justify-between border-b border-[oklch(0.85_0.015_145)] pb-4">
            <h3
              className="text-2xl sm:text-3xl font-display text-[oklch(0.14_0.025_145)]"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              In This Issue.
            </h3>
            <span className="text-xs uppercase tracking-[0.15em] text-[oklch(0.55_0.12_195)] font-mono">
              CURATED SELECTIONS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((rel, idx) => (
              <ProductCard key={rel.id} product={rel} index={idx + 3} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
