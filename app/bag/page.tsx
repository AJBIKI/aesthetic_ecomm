'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Watermark } from '@/components/brand/watermark';

export default function BagPage() {
  const { bag, removeFromBag, updateQuantity, getBagSubtotal, clearBag } = useStore();
  const subtotal = getBagSubtotal();

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
          style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
        >
          Shopping Bag.
        </h1>
      </div>

      {bag.length === 0 ? (
        <div className="text-center py-20 space-y-6 bg-[oklch(0.925_0.008_245)] rounded-xs border border-[oklch(0.86_0.006_250)]">
          <ShoppingBag className="w-12 h-12 text-[oklch(0.55_0.12_195)] mx-auto opacity-80" />
          <div className="space-y-2">
            <h2
              className="text-2xl font-display text-[oklch(0.13_0.02_260)]"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              Your bag is waiting.
            </h2>
            <p className="text-xs text-[oklch(0.48_0.01_255)] uppercase tracking-wider font-mono">
              Explore the collection to begin adding pieces.
            </p>
          </div>

          <Link
            href="/pieces"
            className="inline-block px-8 py-3.5 bg-[oklch(0.13_0.02_260)] text-[oklch(0.93_0.005_250)] text-xs uppercase tracking-[0.2em] hover:bg-[oklch(0.55_0.12_195)] transition-colors font-medium"
          >
            Browse Catalog →
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {/* List of Items */}
          <div className="space-y-6">
            {bag.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-[oklch(0.925_0.008_245)] rounded-xs border border-[oklch(0.86_0.006_250)] items-center justify-between"
              >
                <div className="flex items-center space-x-6 w-full sm:w-auto">
                  <div className="relative w-24 h-32 bg-white rounded-xs overflow-hidden shrink-0">
                    <Image src={item.product.images.primary} alt={item.product.name} fill className="object-cover" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[oklch(0.55_0.12_195)]">
                      {item.product.category}
                    </span>
                    <h3
                      className="text-xl font-display text-[oklch(0.13_0.02_260)]"
                      style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[oklch(0.48_0.01_255)] font-mono">
                      Size: {item.selectedSize} · ₹{item.product.price.toLocaleString('en-IN')} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto sm:space-x-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-[oklch(0.86_0.006_250)]">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-[oklch(0.86_0.006_250)] bg-white rounded-xs">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                      className="p-2 hover:bg-[oklch(0.925_0.008_245)] transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-mono">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                      className="p-2 hover:bg-[oklch(0.925_0.008_245)] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="font-mono text-base font-semibold">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>

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
          <div className="p-8 bg-[oklch(0.925_0.008_245)] rounded-xs border border-[oklch(0.86_0.006_250)] space-y-6">
            <div className="space-y-3 border-b border-[oklch(0.86_0.006_250)] pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[oklch(0.48_0.01_255)] uppercase tracking-wider text-xs font-mono">Subtotal</span>
                <span className="font-mono text-base font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-[oklch(0.48_0.01_255)]">
                <span>Shipping & Duties</span>
                <span className="text-[oklch(0.55_0.12_195)]">Complimentary</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={clearBag}
                className="text-xs uppercase tracking-[0.15em] text-[oklch(0.48_0.01_255)] hover:text-red-700 transition-colors"
              >
                Clear Bag
              </button>

              <button
                onClick={() => alert('Razorpay / Backend checkout integration coming soon!')}
                className="w-full sm:w-auto px-10 py-4 bg-[oklch(0.13_0.02_260)] text-[oklch(0.93_0.005_250)] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[oklch(0.55_0.12_195)] transition-colors flex items-center justify-center space-x-3 group"
              >
                <span>Proceed to Checkout · ₹{subtotal.toLocaleString('en-IN')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
