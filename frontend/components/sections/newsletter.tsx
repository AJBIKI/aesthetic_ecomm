'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 4000);
    }
  };

  return (
    <section className="py-10 md:py-24 bg-[oklch(0.925_0.008_245)] border-y border-[oklch(0.86_0.006_250)]">
      <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
          CORRESPONDENCE
        </span>

        <h3
          className="text-3xl sm:text-4xl font-display text-[oklch(0.13_0.02_260)] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
        >
          The Letter.
        </h3>

        <p className="text-xs sm:text-sm text-[oklch(0.48_0.01_255)] max-w-md mx-auto leading-relaxed">
          Occasional notes on unreleased pieces, seasonal lookbooks, and private studio viewings. No noise.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-4 flex items-center border-b border-[oklch(0.13_0.02_260)]/30 pb-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="bg-transparent text-sm py-2 px-1 w-full focus:outline-none placeholder-[oklch(0.48_0.01_255)] text-[oklch(0.13_0.02_260)]"
          />
          <button
            type="submit"
            className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] hover:text-[oklch(0.13_0.02_260)] transition-colors flex items-center space-x-2 shrink-0 ml-2 font-medium"
          >
            {submitted ? (
              <span className="flex items-center text-emerald-700">
                <Check className="w-4 h-4 mr-1" /> Added
              </span>
            ) : (
              <>
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {submitted && (
          <p className="text-xs italic text-[oklch(0.55_0.12_195)] pt-2" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
            Welcome to the Club.
          </p>
        )}
      </div>
    </section>
  );
}
