'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, BookOpen, User, Lock } from 'lucide-react';
import { useStore } from '@/lib/store';
import { customerApi } from '@/lib/customer-api';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { setBagOpen, getBagCount, activeVolume } = useStore();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(customerApi.isLoggedIn());
  }, [pathname]);

  const bagCount = mounted ? getBagCount() : 0;

  useEffect(() => {
    const handleScroll = () => {
      const darkSections = document.querySelectorAll('[data-dark="true"]');
      const middleY = window.innerHeight / 2;

      let overDark = false;
      darkSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= middleY && rect.bottom >= middleY) {
          overDark = true;
        }
      });
      setIsOverDark(overDark);

      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        const currentScroll = window.scrollY;
        const progress = Math.min(Math.max(currentScroll / totalScrollHeight, 0), 1);
        const calculatedPage = Math.min(Math.floor(progress * 11) + 1, 12);
        setPageNum(calculatedPage);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Cover' },
    { href: '/collections', label: 'The Edits' },
    { href: '/pieces', label: 'Pieces' },
    { href: '/our-story', label: 'Manifesto' },
  ];

  const handleBagClick = () => {
    if (!customerApi.isLoggedIn()) {
      router.push('/login?redirect=/bag');
      return;
    }
    setBagOpen(true);
  };

  const formattedPage = pageNum < 10 ? `0${pageNum}` : `${pageNum}`;

  return (
    <>
      {/* Rotated Vertical Dynamic Margin Metadata (Desktop Left Edge) */}
      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none -rotate-90 origin-left text-[10px] uppercase font-mono tracking-[0.3em] space-x-6 items-center transition-colors duration-300">
        <AnimatePresence mode="wait">
          <motion.span
            key={`${activeVolume}-${isOverDark}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`font-bold transition-colors duration-300 ${
              isOverDark
                ? 'text-[oklch(0.82_0.05_145)]'
                : 'text-[oklch(0.14_0.025_145)]'
            }`}
          >
            {activeVolume}
          </motion.span>
        </AnimatePresence>
        <span className="text-[oklch(0.55_0.12_195)]">•</span>
        <span className={`transition-colors duration-300 ${
          isOverDark ? 'text-[oklch(0.82_0.05_145)]/80' : 'text-[oklch(0.45_0.02_145)]'
        }`}>
          ISSUE 01 · SS26
        </span>
      </div>

      {/* Rotated Vertical Margin Metadata (Desktop Right Edge: Dynamic Page Tracker) */}
      <div className={`hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none rotate-90 origin-right text-[10px] uppercase font-mono tracking-[0.3em] space-x-6 transition-colors duration-300 ${
        isOverDark ? 'text-[oklch(0.82_0.05_145)]/80' : 'text-[oklch(0.45_0.02_145)]'
      }`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={formattedPage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="font-bold"
          >
            PG. {formattedPage} / 12
          </motion.span>
        </AnimatePresence>
        <span>•</span>
        <span>ATELIER EDITION</span>
      </div>

      {/* Top Publication Issue Header Bar */}
      <div className="bg-[oklch(0.14_0.03_145)] text-[oklch(0.93_0.015_145)] text-[10px] font-mono uppercase tracking-[0.2em] py-2 px-4 sm:px-8 flex items-center justify-between border-b border-[oklch(0.45_0.02_145)]/20 z-40 relative">
        <div className="flex items-center space-x-4">
          <span className="text-[oklch(0.55_0.12_195)]">ISSUE 01 / SS26</span>
          <span className="hidden md:inline text-[oklch(0.45_0.02_145)]">•</span>
          <span className="hidden md:inline">THE RAIN EDIT</span>
        </div>

        <div className="text-center font-display text-xs tracking-[0.25em] lowercase text-[oklch(0.82_0.05_145)] hidden sm:block" style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}>
          the monsoon club publication
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden md:inline">MUMBAI · LONDON · PARIS</span>
          <span className="hidden md:inline text-[oklch(0.45_0.02_145)]">•</span>
          <Link href="/admin/login" className="text-[oklch(0.55_0.12_195)] hover:text-white transition-colors flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>Admin CMS</span>
          </Link>
        </div>
      </div>

      {/* Main Magazine Header Masthead (Single Sleek Flat Row) */}
      <header className="sticky top-0 z-40 bg-[oklch(0.94_0.02_145)]/95 backdrop-blur-md border-b border-[oklch(0.85_0.015_145)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between flex-nowrap">
          
          {/* Left: Mobile Menu & Desktop Nav Links */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 text-[oklch(0.14_0.025_145)] hover:text-[oklch(0.55_0.12_195)] transition-colors"
              aria-label="Open index menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-[0.18em] font-mono transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-[oklch(0.55_0.12_195)] font-semibold'
                        : 'text-[oklch(0.14_0.025_145)] hover:text-[oklch(0.55_0.12_195)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Masthead Wordmark */}
          <Link href="/" className="group text-center shrink-0">
            <span
              className="text-2xl sm:text-3xl md:text-3xl font-display tracking-[0.2em] text-[oklch(0.14_0.025_145)] group-hover:text-[oklch(0.55_0.12_195)] transition-colors block whitespace-nowrap"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              The Monsoon Club.
            </span>
          </Link>

          {/* Right: Customer Auth & Protected Bag Trigger */}
          <div className="flex items-center space-x-3 shrink-0">
            
            {/* Customer Sign In / Account Link (Desktop only, mobile uses sidebar) */}
            {mounted && isLoggedIn ? (
              <Link
                href="/account"
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-mono uppercase tracking-[0.15em] text-[oklch(0.55_0.12_195)] hover:text-[oklch(0.14_0.025_145)] border border-[oklch(0.55_0.12_195)]/40 rounded-xs items-center space-x-1.5 transition-colors whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Account</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-mono uppercase tracking-[0.18em] bg-[oklch(0.14_0.025_145)] text-[oklch(0.93_0.015_145)] hover:bg-[oklch(0.55_0.12_195)] rounded-xs transition-colors whitespace-nowrap shadow-sm"
              >
                Sign In
              </Link>
            )}

            {/* Shopping Bag Trigger (Desktop only, mobile uses sidebar floating button) */}
            <button
              onClick={handleBagClick}
              className="hidden sm:inline-flex relative text-[oklch(0.14_0.025_145)] hover:text-[oklch(0.55_0.12_195)] transition-colors items-center space-x-2 border border-[oklch(0.85_0.015_145)] px-3 py-1.5 rounded-xs whitespace-nowrap"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden md:inline-block text-[11px] font-mono uppercase tracking-[0.15em]">Bag</span>
              {mounted && bagCount > 0 && (
                <span className="bg-[oklch(0.55_0.12_195)] text-white text-[10px] font-mono px-1.5 py-0.5 rounded-full">
                  {bagCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Floating Editorial Index Bar (Bottom Right Desktop Trigger) */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-30">
        <button
          onClick={handleBagClick}
          className="bg-[oklch(0.14_0.03_145)] text-[oklch(0.93_0.015_145)] px-5 py-3 rounded-full text-xs font-mono uppercase tracking-[0.2em] shadow-2xl border border-[oklch(0.55_0.12_195)]/50 hover:bg-[oklch(0.55_0.12_195)] transition-all flex items-center space-x-3 group"
        >
          <BookOpen className="w-4 h-4 text-[oklch(0.55_0.12_195)] group-hover:text-white" />
          <span>[ Bag ({bagCount}) ]</span>
        </button>
      </div>

      {/* Mobile Navigation Sheet */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[9990] bg-[oklch(0.14_0.03_145)] text-[oklch(0.93_0.015_145)] flex flex-col justify-between p-8">
          <div className="flex items-center justify-between border-b border-[oklch(0.45_0.02_145)]/30 pb-6">
            <div>
              <span
                className="text-2xl font-display tracking-[0.2em] text-[oklch(0.55_0.12_195)] block"
                style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
              >
                The Monsoon Club.
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[oklch(0.45_0.02_145)]">
                ISSUE 01 // MAGAZINE INDEX
              </span>
            </div>

            <button
              onClick={() => setMobileNavOpen(false)}
              className="p-2 text-[oklch(0.93_0.015_145)] hover:text-[oklch(0.55_0.12_195)]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 my-auto">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="group flex items-baseline justify-between border-b border-[oklch(0.45_0.02_145)]/20 pb-4"
              >
                <span
                  className="font-display text-3xl tracking-[0.1em] text-[oklch(0.93_0.015_145)] group-hover:text-[oklch(0.55_0.12_195)] transition-colors"
                  style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
                >
                  {link.label}
                </span>
                <span className="text-xs font-mono text-[oklch(0.55_0.12_195)]">
                  0{idx + 1}
                </span>
              </Link>
            ))}

            {isLoggedIn ? (
              <Link
                href="/account"
                onClick={() => setMobileNavOpen(false)}
                className="group flex items-baseline justify-between border-b border-[oklch(0.45_0.02_145)]/20 pb-4 text-[oklch(0.55_0.12_195)]"
              >
                <span className="font-display text-2xl tracking-[0.1em]" style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}>
                  Member Profile
                </span>
                <span className="text-xs font-mono">ACCOUNT →</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileNavOpen(false)}
                className="group flex items-baseline justify-between border-b border-[oklch(0.45_0.02_145)]/20 pb-4 text-[oklch(0.55_0.12_195)]"
              >
                <span className="font-display text-2xl tracking-[0.1em]" style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}>
                  Member Sign In
                </span>
                <span className="text-xs font-mono">SIGN IN →</span>
              </Link>
            )}

            {/* Bag / Cart (Mobile sidebar) */}
            <button
              onClick={() => { setMobileNavOpen(false); setBagOpen(true); }}
              className="group flex items-baseline justify-between border-b border-[oklch(0.45_0.02_145)]/20 pb-4 w-full text-left"
            >
              <span className="font-display text-2xl tracking-[0.1em] text-[oklch(0.93_0.015_145)]" style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}>
                Shopping Bag
                {bagCount > 0 && <span className="ml-2 text-xs font-mono text-[oklch(0.55_0.12_195)]">({bagCount})</span>}
              </span>
              <span className="text-xs font-mono text-[oklch(0.55_0.12_195)]">BAG →</span>
            </button>
          </nav>

          <div className="border-t border-[oklch(0.45_0.02_145)]/30 pt-6 text-xs text-[oklch(0.45_0.02_145)] space-y-2">
            <p className="italic font-display text-base text-[oklch(0.93_0.015_145)]" style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}>
              Welcome to the Club.
            </p>
            <p className="uppercase tracking-widest text-[10px] font-mono">Mumbai · London · Paris</p>
          </div>
        </div>
      )}
    </>
  );
}
