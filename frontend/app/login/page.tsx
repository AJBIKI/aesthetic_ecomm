'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, UserCheck } from 'lucide-react';
import { customerApi } from '@/lib/customer-api';
import { Watermark } from '@/components/brand/watermark';

export default function CustomerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await customerApi.login({ email, password });
      router.push('/account');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 max-w-md mx-auto px-4 relative space-y-8">
      <Watermark text="ACCOUNT" className="top-12" />

      {/* Header */}
      <div className="text-center space-y-2 border-b border-[oklch(0.85_0.015_145)] pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[oklch(0.55_0.12_195)] block">
          ATELIER MEMBER PORTAL
        </span>
        <h1
          className="text-3xl font-display text-[oklch(0.14_0.025_145)] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
        >
          Sign In to Your Account.
        </h1>
        <p className="text-xs font-mono text-[oklch(0.45_0.02_145)]">
          Access your past orders, courier receipts & saved pieces.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-700 text-xs p-3 rounded-xs font-mono text-center">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[oklch(0.94_0.02_145)] p-8 rounded-xs border border-[oklch(0.85_0.015_145)] shadow-xl space-y-5">
        <div className="space-y-1.5 font-mono text-xs">
          <label className="text-[10px] uppercase tracking-wider text-[oklch(0.45_0.02_145)]">Email Address *</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5 font-mono text-xs">
          <label className="text-[10px] uppercase tracking-wider text-[oklch(0.45_0.02_145)]">Password *</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[oklch(0.14_0.025_145)] text-[oklch(0.93_0.015_145)] py-4 px-6 rounded-xs text-xs uppercase tracking-[0.2em] font-medium hover:bg-[oklch(0.55_0.12_195)] transition-colors flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
        >
          <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="pt-4 border-t border-[oklch(0.85_0.015_145)] text-center text-xs font-mono text-[oklch(0.45_0.02_145)]">
          Don't have an atelier account?{' '}
          <Link href="/signup" className="text-[oklch(0.55_0.12_195)] font-semibold underline">
            Register Account
          </Link>
        </div>
      </form>
    </div>
  );
}
