'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, ArrowRight, Package } from 'lucide-react';
import { Watermark } from '@/components/brand/watermark';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'TMC-2026-001';
  const customerName = searchParams.get('name') || 'Valued Guest';

  return (
    <div className="py-16 md:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-8 text-center">
      <Watermark text="CONFIRMED" className="top-12" />

      {/* Success Badge */}
      <div className="w-16 h-16 bg-[oklch(0.55_0.12_195)]/15 border border-[oklch(0.55_0.12_195)]/40 text-[oklch(0.55_0.12_195)] rounded-full flex items-center justify-center mx-auto shadow-xl">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[oklch(0.55_0.12_195)] font-mono block">
          PAYMENT CONFIRMED · ATELIER RECEIPT
        </span>

        <h1
          className="text-4xl sm:text-5xl font-display text-[oklch(0.14_0.025_145)] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
        >
          Thank You, {customerName}.
        </h1>

        <p className="text-xs sm:text-sm text-[oklch(0.45_0.02_145)] max-w-md mx-auto leading-relaxed">
          Your order has been received and confirmed by our master atelier. A signature receipt and courier tracking link have been dispatched to your email.
        </p>
      </div>

      {/* Order Details Plate */}
      <div className="bg-[oklch(0.94_0.02_145)] p-8 rounded-xs border border-[oklch(0.85_0.015_145)] shadow-xl text-left max-w-lg mx-auto space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[oklch(0.85_0.015_145)] pb-3">
          <span className="text-[oklch(0.45_0.02_145)] uppercase tracking-wider">ORDER REF</span>
          <span className="font-bold text-[oklch(0.14_0.025_145)] text-sm">{orderNumber}</span>
        </div>

        <div className="flex items-center justify-between border-b border-[oklch(0.85_0.015_145)] pb-3">
          <span className="text-[oklch(0.45_0.02_145)] uppercase tracking-wider">PAYMENT STATUS</span>
          <span className="text-emerald-700 font-semibold uppercase tracking-wider">PAID & VERIFIED</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[oklch(0.45_0.02_145)] uppercase tracking-wider">ESTIMATED COURIER</span>
          <span className="text-[oklch(0.14_0.025_145)]">3 – 5 Business Days</span>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/pieces"
          className="w-full sm:w-auto px-8 py-3.5 bg-[oklch(0.14_0.025_145)] text-[oklch(0.93_0.015_145)] text-xs uppercase tracking-[0.2em] font-medium rounded-xs hover:bg-[oklch(0.55_0.12_195)] transition-colors flex items-center justify-center space-x-2 shadow-lg"
        >
          <span>Continue Browsing</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="pt-8 border-t border-[oklch(0.85_0.015_145)] max-w-lg mx-auto flex items-center justify-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[oklch(0.45_0.02_145)]">
        <ShieldCheck className="w-4 h-4 text-[oklch(0.55_0.12_195)]" />
        <span>The Monsoon Club Atelier · Mumbai · London · Paris</span>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-mono text-xs">Loading receipt...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
