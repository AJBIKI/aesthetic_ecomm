'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '@/lib/store';

export function Header() {
  const pathname = usePathname();
  const { setBagOpen, getBagCount } = useStore();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const bagCount = getBagCount();

  const navLinks = [
    { href: '/', label: 'The Club' },
    { href: '/collections', label: 'Collections' },
    { href: '/pieces', label: 'Pieces' },
    { href: '/our-story', label: 'Our Story' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[oklch(0.955_0.005_250)]/90 backdrop-blur-md border-b border-[oklch(0.86_0.006_250)] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Wordmark */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 text-[oklch(0.13_0.02_260)] hover:text-[oklch(0.55_0.12_195)] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" className="group flex items-center">
              {/* Desktop Logo */}
              <span
                className="hidden sm:inline-block text-xl md:text-2xl font-display tracking-[0.2em] text-[oklch(0.13_0.02_260)] group-hover:text-[oklch(0.55_0.12_195)] transition-colors"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                The Monsoon Club.
              </span>
              {/* Mobile Compact Logo */}
              <span
                className="inline-block sm:hidden text-lg font-display tracking-[0.2em] text-[oklch(0.13_0.02_260)] group-hover:text-[oklch(0.55_0.12_195)] transition-colors"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                Monsoon.
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs uppercase tracking-[0.18em] transition-colors py-1 ${
                    isActive
                      ? 'text-[oklch(0.55_0.12_195)] font-medium'
                      : 'text-[oklch(0.13_0.02_260)] hover:text-[oklch(0.55_0.12_195)]'
                  }`}
                >
                  {link.label}
                  {/* Underline draw-on */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-[oklch(0.55_0.12_195)] transition-all duration-200 ease-out ${
                      isActive ? 'w-full' : 'w-0 hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: Bag Trigger */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setBagOpen(true)}
              className="relative p-2 text-[oklch(0.13_0.02_260)] hover:text-[oklch(0.55_0.12_195)] transition-colors flex items-center space-x-2 group"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline-block text-xs uppercase tracking-[0.15em]">Bag</span>
              {bagCount > 0 && (
                <span className="bg-[oklch(0.55_0.12_195)] text-[oklch(0.93_0.005_250)] text-[10px] font-mono px-1.5 py-0.5 rounded-full">
                  {bagCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sheet */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[9990] bg-[oklch(0.135_0.02_260)] text-[oklch(0.93_0.005_250)] flex flex-col justify-between p-8">
          <div className="flex items-center justify-between">
            <span
              className="text-xl font-display tracking-[0.2em] text-[oklch(0.55_0.12_195)]"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              The Monsoon Club.
            </span>
            <button
              onClick={() => setMobileNavOpen(false)}
              className="p-2 text-[oklch(0.93_0.005_250)] hover:text-[oklch(0.55_0.12_195)]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-8 my-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="font-display text-3xl tracking-[0.15em] hover:text-[oklch(0.55_0.12_195)] transition-colors"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-[oklch(0.48_0.01_255)]/30 pt-6 text-xs text-[oklch(0.48_0.01_255)] space-y-2">
            <p className="italic font-display text-sm text-[oklch(0.93_0.005_250)]" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
              Welcome to the Club.
            </p>
            <p className="uppercase tracking-widest text-[10px]">Mumbai · London · Paris</p>
          </div>
        </div>
      )}
    </>
  );
}
