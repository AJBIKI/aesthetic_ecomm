'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';

export function BagDrawer() {
  const [mounted, setMounted] = useState(false);
  const { isBagOpen, setBagOpen, bag, removeFromBag, updateQuantity, getBagSubtotal } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
            onClick={() => setBagOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[9998]"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[oklch(0.94_0.02_145)] text-[oklch(0.14_0.025_145)] shadow-2xl z-[9999] flex flex-col justify-between border-l border-[oklch(0.85_0.015_145)]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[oklch(0.85_0.015_145)] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[oklch(0.55_0.12_195)]">
                  SELECTION BAG
                </span>
                <h3
                  className="text-2xl font-display text-[oklch(0.14_0.025_145)] block"
                  style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
                >
                  Your Atelier Pieces.
                </h3>
              </div>

              <button
                onClick={() => setBagOpen(false)}
                className="p-2 text-[oklch(0.14_0.025_145)] hover:text-[oklch(0.55_0.12_195)] transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bag Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {bag.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <ShoppingBag className="w-12 h-12 mx-auto text-[oklch(0.45_0.02_145)] stroke-[1.2]" />
                  <p
                    className="font-display text-xl text-[oklch(0.14_0.025_145)]"
                    style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
                  >
                    Your bag is currently empty.
                  </p>
                  <p className="text-xs text-[oklch(0.45_0.02_145)] font-mono">
                    Explore our collection of 30-momme silks & hand-draped silhouettes.
                  </p>
                </div>
              ) : (
                bag.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex space-x-4 pb-6 border-b border-[oklch(0.85_0.015_145)]"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 bg-[oklch(0.90_0.025_142)] rounded-xs overflow-hidden shrink-0 border border-[oklch(0.85_0.015_145)]">
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
                          <h4
                            className="font-display text-base tracking-wide text-[oklch(0.14_0.025_145)]"
                            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
                          >
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromBag(item.product.id, item.selectedSize)}
                            className="text-[oklch(0.45_0.02_145)] hover:text-red-700 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[oklch(0.45_0.02_145)] mt-1 uppercase tracking-wider font-mono">
                          Size: {item.selectedSize}
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[oklch(0.85_0.015_145)] rounded-xs bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                            className="p-1.5 hover:bg-[oklch(0.90_0.025_142)] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                            className="p-1.5 hover:bg-[oklch(0.90_0.025_142)] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold font-mono text-[oklch(0.14_0.025_145)]">
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
              <div className="p-6 border-t border-[oklch(0.85_0.015_145)] bg-[oklch(0.90_0.025_142)] space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[oklch(0.45_0.02_145)] uppercase tracking-wider text-xs font-mono">Subtotal</span>
                  <span className="font-bold text-base font-mono text-[oklch(0.14_0.025_145)]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[11px] text-[oklch(0.45_0.02_145)] font-mono">
                  Taxes & complimentary express shipping calculated at checkout.
                </p>

                <Link
                  href="/checkout"
                  onClick={() => setBagOpen(false)}
                  className="w-full bg-[oklch(0.14_0.025_145)] text-[oklch(0.93_0.015_145)] py-3.5 px-6 rounded-xs flex items-center justify-between text-xs uppercase tracking-[0.15em] font-medium hover:bg-[oklch(0.55_0.12_195)] transition-colors group shadow-lg"
                >
                  <span>Proceed to Atelier Checkout</span>
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
