'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorLabelProps {
  label?: string;
  isVisible: boolean;
}

export function CursorLabel({ label = 'view', isVisible }: CursorLabelProps) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch capability
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        >
          <div className="bg-[oklch(0.55_0.12_195)] text-[oklch(0.93_0.005_250)] text-[12px] uppercase tracking-[0.2em] font-medium px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
            {label}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
