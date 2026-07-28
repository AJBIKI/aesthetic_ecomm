'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, UserPlus } from 'lucide-react';
import { customerApi } from '@/lib/customer-api';
import { Watermark } from '@/components/brand/watermark';

export default function CustomerSignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await customerApi.signup({ name, email, password });
      router.push('/account');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 max-w-md mx-auto px-4 relative space-y-8">
      <Watermark text="REGISTER" className="top-12" />

      {/* Header */}
      <div className="text-center space-y-2 border-b border-[oklch(0.85_0.015_145)] pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[oklch(0.55_0.12_195)] block">
          ATELIER REGISTRATION
        </span>
        <h1
          className="text-3xl font-display text-[oklch(0.14_0.025_145)] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
        >
          Create Member Profile.
        </h1>
        <p className="text-xs font-mono text-[oklch(0.45_0.02_145)]">
          Join The Monsoon Club for private editorial updates & express checkout.
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
          <label className="text-[10px] uppercase tracking-wider text-[oklch(0.45_0.02_145)]">Full Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Eleanor Vance"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5 font-mono text-xs">
          <label className="text-[10px] uppercase tracking-wider text-[oklch(0.45_0.02_145)]">Email Address *</label>
          <input
            type="email"
            required
            placeholder="eleanor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5 font-mono text-xs">
          <label className="text-[10px] uppercase tracking-wider text-[oklch(0.45_0.02_145)]">Choose Password *</label>
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
          <span>{loading ? 'Creating Profile...' : 'Register Account'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="pt-4 border-t border-[oklch(0.85_0.015_145)] text-center text-xs font-mono text-[oklch(0.45_0.02_145)]">
          Already have an account?{' '}
          <Link href="/login" className="text-[oklch(0.55_0.12_195)] font-semibold underline">
            Sign In Here
          </Link>
        </div>
      </form>
    </div>
  );
}
