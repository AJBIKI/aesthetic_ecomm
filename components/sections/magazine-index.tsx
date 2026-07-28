'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import productsData from '@/lib/data/products.json';
import { Product } from '@/lib/types';

export function MagazineIndex() {
  const products = productsData as Product[];
  const [activeProduct, setActiveProduct] = useState<Product>(products[0]);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="py-24 bg-[oklch(0.135_0.02_260)] text-[oklch(0.93_0.005_250)] border-y border-[oklch(0.48_0.01_255)]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[oklch(0.48_0.01_255)]/30 pb-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[oklch(0.55_0.12_195)] font-mono flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>MAGAZINE INDEX</span>
            </span>
            <h2
              className="text-3xl sm:text-5xl font-display text-[oklch(0.93_0.005_250)] tracking-wide"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              The Editorial Directory.
            </h2>
          </div>

          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[oklch(0.48_0.01_255)] pt-4 md:pt-0">
            HOVER ITEM TO PREVIEW FEATURED PIECE
          </p>
        </div>

        {/* Directory List + Image Preview Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Index Items List (7 Columns) */}
          <div className="lg:col-span-7 space-y-2">
            {products.map((item, idx) => (
              <Link
                key={item.id}
                href={`/pieces/${item.slug}`}
                onMouseEnter={() => {
                  setActiveProduct(item);
                  setIsHovering(true);
                }}
                onMouseLeave={() => setIsHovering(false)}
                className="group flex items-center justify-between p-4 border-b border-[oklch(0.48_0.01_255)]/20 hover:border-[oklch(0.55_0.12_195)] hover:bg-[oklch(0.55_0.12_195)]/10 transition-all rounded-xs"
              >
                <div className="flex items-center space-x-6">
                  <span className="font-mono text-xs text-[oklch(0.55_0.12_195)] group-hover:translate-x-1 transition-transform">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl font-display text-[oklch(0.93_0.005_250)] group-hover:text-[oklch(0.55_0.12_195)] transition-colors"
                      style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-[11px] font-mono text-[oklch(0.48_0.01_255)] uppercase tracking-wider">
                      {item.category} · {item.fabric}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="font-mono text-xs text-[oklch(0.80_0.06_195)]">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[oklch(0.55_0.12_195)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Dynamic Floating Preview Frame (5 Columns) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative aspect-[3/4] w-full rounded-xs overflow-hidden border border-[oklch(0.55_0.12_195)]/40 shadow-2xl bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeProduct.images.primary}
                    alt={activeProduct.name}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  
                  {/* Overlay Magazine Tag */}
                  <div className="absolute bottom-6 left-6 right-6 bg-[oklch(0.135_0.02_260)]/90 backdrop-blur-md p-4 rounded-xs border border-[oklch(0.55_0.12_195)]/40 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)]">
                      PREVIEW · {activeProduct.collection}
                    </span>
                    <h4
                      className="text-lg font-display text-[oklch(0.93_0.005_250)]"
                      style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                    >
                      {activeProduct.name}
                    </h4>
                    <p className="text-[11px] font-mono text-[oklch(0.48_0.01_255)]">
                      {activeProduct.tagline}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
