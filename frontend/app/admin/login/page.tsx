'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { adminApi } from '@/lib/admin-api';

export default function AdminLoginPage() {
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
      await adminApi.login({ email, password });
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.025_145)] text-[oklch(0.93_0.015_145)] flex items-center justify-center p-4 font-body">
      <div className="w-full max-w-md bg-[oklch(0.15_0.03_145)] p-8 sm:p-10 rounded-xs border border-[oklch(0.25_0.03_145)] shadow-2xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 border-b border-[oklch(0.25_0.03_145)] pb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[oklch(0.55_0.12_195)] flex items-center justify-center space-x-2">
            <Lock className="w-3.5 h-3.5" />
            <span>ATELIER CMS LOCK</span>
          </span>

          <h1
            className="text-3xl font-display text-[oklch(0.93_0.015_145)] tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            The Monsoon Club.
          </h1>

          <p className="text-xs font-mono text-[oklch(0.60_0.02_145)]">
            Publication Management Portal
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xs font-mono">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[oklch(0.70_0.02_145)]">
              Admin Email
            </label>
            <input
              type="email"
              required
              placeholder="admin@themonsoonclub.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 text-xs font-mono bg-[oklch(0.10_0.02_145)] border border-[oklch(0.25_0.03_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none text-[oklch(0.93_0.015_145)]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[oklch(0.70_0.02_145)]">
              Secret Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-4 text-xs font-mono bg-[oklch(0.10_0.02_145)] border border-[oklch(0.25_0.03_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none text-[oklch(0.93_0.015_145)]"
            />
          </div>

          <div className="bg-[oklch(0.10_0.02_145)] p-3 rounded-xs border border-[oklch(0.25_0.03_145)] text-[10px] font-mono text-[oklch(0.60_0.02_145)]">
            Seeded Credentials: <span className="text-[oklch(0.55_0.12_195)]">admin@themonsoonclub.com</span> / <span className="text-[oklch(0.55_0.12_195)]">admin123</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[oklch(0.55_0.12_195)] text-white py-3.5 px-6 rounded-xs text-xs uppercase tracking-[0.2em] font-medium hover:bg-[oklch(0.60_0.14_145)] transition-colors flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In To Atelier CMS'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[oklch(0.25_0.03_145)] flex items-center justify-center space-x-2 text-[10px] font-mono uppercase text-[oklch(0.50_0.02_145)]">
          <ShieldCheck className="w-3.5 h-3.5 text-[oklch(0.55_0.12_195)]" />
          <span>Bearer JWT Authentication Security</span>
        </div>
      </div>
    </div>
  );
}
