'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function InitialLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[oklch(0.955_0.005_250)] text-[oklch(0.13_0.02_260)]"
        >
          <div className="flex flex-col items-center space-y-4">
            <span
              className="text-2xl sm:text-3xl font-display tracking-[0.2em] text-[oklch(0.55_0.12_195)]"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              The Monsoon Club.
            </span>

            {/* Accent Line Progress */}
            <div className="w-32 h-[2px] bg-[oklch(0.86_0.006_250)] overflow-hidden rounded-full relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
                className="h-full bg-[oklch(0.55_0.12_195)]"
              />
            </div>
            
            <span className="text-[11px] uppercase tracking-[0.25em] text-[oklch(0.48_0.01_255)] font-mono">
              Welcome to the Club
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
