'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[oklch(0.135_0.02_260)] text-[oklch(0.93_0.005_250)] border-t border-[oklch(0.48_0.01_255)]/20 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[oklch(0.48_0.01_255)]/20">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <span
              className="text-2xl sm:text-3xl font-display tracking-[0.2em] text-[oklch(0.55_0.12_195)] block"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              The Monsoon Club.
            </span>
            <p className="text-xs text-[oklch(0.48_0.01_255)] max-w-sm leading-relaxed">
              An editorial dress studio for rain-soaked evenings, slow silhouettes, and quiet luxury. Crafted with 30-momme mulberry silks and organic draped crepes.
            </p>
            <p className="text-xs italic text-[oklch(0.80_0.06_195)] pt-2" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
              Welcome to the Club.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/collections" className="hover:text-[oklch(0.55_0.12_195)] transition-colors">
                  The Monsoon Edit
                </Link>
              </li>
              <li>
                <Link href="/collections/resort-dusk" className="hover:text-[oklch(0.55_0.12_195)] transition-colors">
                  Resort & Dusk
                </Link>
              </li>
              <li>
                <Link href="/collections/archival" className="hover:text-[oklch(0.55_0.12_195)] transition-colors">
                  Archival Silhouettes
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-[oklch(0.55_0.12_195)] transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / The Letter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono">The Letter</h4>
            <p className="text-xs text-[oklch(0.48_0.01_255)]">
              Occasional correspondence on new pieces, quiet releases, and editorial stories.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border-b border-[oklch(0.48_0.01_255)]/50 pb-1">
              <input
                type="email"
                placeholder="your email address"
                className="bg-transparent text-xs py-2 w-full focus:outline-none placeholder-[oklch(0.48_0.01_255)]/60 text-[oklch(0.93_0.005_250)]"
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] hover:text-white transition-colors"
              >
                join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[oklch(0.48_0.01_255)] space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} The Monsoon Club. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Atelier</span>
            <span className="hover:text-white transition-colors cursor-pointer">Care Guide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
