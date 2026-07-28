'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Watermark } from '@/components/brand/watermark';

export default function BagPage() {
  const [mounted, setMounted] = useState(false);
  const { bag, removeFromBag, updateQuantity, getBagSubtotal, clearBag } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentBag = mounted ? bag : [];
  const subtotal = mounted ? getBagSubtotal() : 0;

  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative">
      <Watermark text="BAG" className="top-12" />

      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
          YOUR SELECTION
        </span>
        <h1
          className="text-4xl sm:text-5xl font-display text-[oklch(0.13_0.02_260)] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
        >
          Shopping Bag.
        </h1>
      </div>

      {currentBag.length === 0 ? (
        <div className="text-center py-20 space-y-6 bg-[oklch(0.925_0.008_245)] rounded-xs border border-[oklch(0.86_0.006_250)]">
          <ShoppingBag className="w-12 h-12 text-[oklch(0.55_0.12_195)] mx-auto opacity-80" />
          <div className="space-y-2">
            <h2
              className="text-2xl font-display text-[oklch(0.13_0.02_260)]"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              Your bag is waiting.
            </h2>
            <p className="text-xs text-[oklch(0.48_0.01_255)] uppercase tracking-wider font-mono">
              Explore the collection to add pieces.
            </p>
          </div>
          <Link
            href="/pieces"
            className="inline-block px-8 py-3 bg-[oklch(0.13_0.02_260)] text-[oklch(0.93_0.005_250)] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[oklch(0.55_0.12_195)] transition-colors rounded-xs shadow-md"
          >
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Bag Items */}
          <div className="bg-[oklch(0.925_0.008_245)] rounded-xs border border-[oklch(0.86_0.006_250)] divide-y divide-[oklch(0.86_0.006_250)]">
            {currentBag.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="flex items-center space-x-6">
                  <div className="relative w-20 h-24 bg-white rounded-xs overflow-hidden shrink-0 border border-[oklch(0.86_0.006_250)]">
                    <Image
                      src={item.product.images.primary}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3
                      className="text-lg font-display text-[oklch(0.13_0.02_260)]"
                      style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-xs font-mono text-[oklch(0.48_0.01_255)] uppercase tracking-wider">
                      Size: {item.selectedSize} · ₹{item.product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-8">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-[oklch(0.86_0.006_250)] rounded-xs bg-white">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                      className="p-2 hover:bg-[oklch(0.925_0.008_245)] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-mono font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                      className="p-2 hover:bg-[oklch(0.925_0.008_245)] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-[oklch(0.13_0.02_260)]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromBag(item.product.id, item.selectedSize)}
                    className="p-2 text-[oklch(0.48_0.01_255)] hover:text-red-700 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal & Checkout Card */}
          <div className="bg-[oklch(0.925_0.008_245)] p-8 rounded-xs border border-[oklch(0.86_0.006_250)] space-y-6">
            <div className="flex items-center justify-between border-b border-[oklch(0.86_0.006_250)] pb-4 text-sm font-mono">
              <span className="text-[oklch(0.48_0.01_255)] uppercase tracking-wider">Estimated Subtotal</span>
              <span className="text-xl font-bold text-[oklch(0.13_0.02_260)]">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <p className="text-[11px] font-mono text-[oklch(0.48_0.01_255)]">
              Taxes and global courier shipping calculated at atelier checkout.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                onClick={clearBag}
                className="text-xs uppercase font-mono tracking-widest text-[oklch(0.48_0.01_255)] hover:text-red-700 underline"
              >
                Clear Selection
              </button>

              <button className="w-full sm:w-auto bg-[oklch(0.13_0.02_260)] text-[oklch(0.93_0.005_250)] py-4 px-10 rounded-xs text-xs uppercase tracking-[0.2em] font-medium hover:bg-[oklch(0.55_0.12_195)] transition-colors flex items-center justify-center space-x-3 shadow-lg">
                <span>Proceed to Atelier Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
