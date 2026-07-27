'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/store';

export function BagDrawer() {
  const {
    bag,
    isBagOpen,
    setBagOpen,
    removeFromBag,
    updateQuantity,
    getBagSubtotal,
  } = useStore();

  const subtotal = getBagSubtotal();

  return (
    <AnimatePresence>
      {isBagOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setBagOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[9998]"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[oklch(0.955_0.005_250)] border-l border-[oklch(0.86_0.006_250)] text-[oklch(0.13_0.02_260)] z-[9999] flex flex-col justify-between shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-[oklch(0.86_0.006_250)] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-5 h-5 text-[oklch(0.55_0.12_195)]" />
                <span className="font-display text-lg tracking-[0.1em]" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
                  Your Bag
                </span>
                <span className="text-xs text-[oklch(0.48_0.01_255)] font-mono">
                  ({bag.reduce((acc, item) => acc + item.quantity, 0)})
                </span>
              </div>

              <button
                onClick={() => setBagOpen(false)}
                className="p-2 hover:text-[oklch(0.55_0.12_195)] transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {bag.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-[oklch(0.48_0.01_255)]">
                  <p className="font-display text-lg italic text-[oklch(0.13_0.02_260)]" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
                    Your bag is waiting.
                  </p>
                  <p className="text-xs tracking-wider uppercase">Explore the collection to begin.</p>
                  <button
                    onClick={() => setBagOpen(false)}
                    className="mt-4 px-6 py-2 border border-[oklch(0.86_0.006_250)] text-xs uppercase tracking-[0.15em] hover:border-[oklch(0.55_0.12_195)] hover:text-[oklch(0.55_0.12_195)] transition-colors"
                  >
                    Browse Pieces
                  </button>
                </div>
              ) : (
                bag.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex space-x-4 pb-6 border-b border-[oklch(0.86_0.006_250)] last:border-b-0"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 bg-[oklch(0.925_0.008_245)] rounded-xs overflow-hidden shrink-0">
                      <Image
                        src={item.product.images.primary}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-display text-base tracking-wide" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromBag(item.product.id, item.selectedSize)}
                            className="text-[oklch(0.48_0.01_255)] hover:text-red-700 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[oklch(0.48_0.01_255)] mt-1 uppercase tracking-wider font-mono">
                          Size: {item.selectedSize}
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[oklch(0.86_0.006_250)] rounded-xs">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                            className="p-1.5 hover:bg-[oklch(0.925_0.008_245)] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                            className="p-1.5 hover:bg-[oklch(0.925_0.008_245)] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-medium font-mono">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {bag.length > 0 && (
              <div className="p-6 border-t border-[oklch(0.86_0.006_250)] bg-[oklch(0.925_0.008_245)] space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[oklch(0.48_0.01_255)] uppercase tracking-wider text-xs font-mono">Subtotal</span>
                  <span className="font-semibold text-base font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[11px] text-[oklch(0.48_0.01_255)]">Taxes & complimentary shipping calculated at checkout.</p>

                <Link
                  href="/bag"
                  onClick={() => setBagOpen(false)}
                  className="w-full bg-[oklch(0.13_0.02_260)] text-[oklch(0.93_0.005_250)] py-3.5 px-6 rounded-xs flex items-center justify-between text-xs uppercase tracking-[0.15em] hover:bg-[oklch(0.55_0.12_195)] transition-colors group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
