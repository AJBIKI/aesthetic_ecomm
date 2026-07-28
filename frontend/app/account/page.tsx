'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, ShoppingBag, LogOut, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import { customerApi, CustomerUser } from '@/lib/customer-api';
import { Watermark } from '@/components/brand/watermark';

export default function CustomerAccountPage() {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customerApi
      .getProfile()
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-20 text-center font-mono text-xs text-[oklch(0.45_0.02_145)]">Loading atelier profile...</div>;
  }

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-12">
      <Watermark text="PROFILE" className="top-12" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[oklch(0.85_0.015_145)] pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[oklch(0.55_0.12_195)] block">
            MEMBER PROFILE
          </span>
          <h1
            className="text-4xl font-display text-[oklch(0.14_0.025_145)] tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            Welcome, {user?.name || 'Guest'}.
          </h1>
          <p className="text-xs font-mono text-[oklch(0.45_0.02_145)]">{user?.email}</p>
        </div>

        <button
          onClick={() => customerApi.logout()}
          className="px-4 py-2 border border-[oklch(0.85_0.015_145)] text-[oklch(0.14_0.025_145)] hover:bg-red-500/10 hover:text-red-700 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors inline-flex items-center space-x-2 shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 Cols): Order History */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[oklch(0.94_0.02_145)] p-8 rounded-xs border border-[oklch(0.85_0.015_145)] shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-[oklch(0.85_0.015_145)] pb-4">
              <h2
                className="text-2xl font-display text-[oklch(0.14_0.025_145)]"
                style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
              >
                Order History & Courier Receipts.
              </h2>
              <span className="text-[10px] font-mono uppercase text-[oklch(0.55_0.12_195)]">
                {user?.orders?.length || 0} Orders
              </span>
            </div>

            {!user?.orders || user.orders.length === 0 ? (
              <div className="text-center py-12 space-y-3 font-mono text-xs text-[oklch(0.45_0.02_145)]">
                <p>No previous orders found for this member account.</p>
                <Link
                  href="/pieces"
                  className="inline-block px-6 py-2.5 bg-[oklch(0.14_0.025_145)] text-white uppercase tracking-widest text-[11px] rounded-xs"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {user.orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 bg-white rounded-xs border border-[oklch(0.85_0.015_145)] flex items-center justify-between font-mono text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-sm text-[oklch(0.14_0.025_145)]">{ord.orderNumber}</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-700 border border-emerald-500/30">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[oklch(0.45_0.02_145)] mt-1">
                        Placed on {new Date(ord.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm text-[oklch(0.14_0.025_145)]">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </span>
                      <p className="text-[10px] text-[oklch(0.55_0.12_195)]">Express Courier</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Right Column (4 Cols): Member Membership Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[oklch(0.94_0.02_145)] p-6 rounded-xs border border-[oklch(0.85_0.015_145)] shadow-xl space-y-4 font-mono text-xs">
            <h3
              className="text-xl font-display text-[oklch(0.14_0.025_145)] border-b border-[oklch(0.85_0.015_145)] pb-3"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              Atelier Membership.
            </h3>

            <div className="space-y-1">
              <span className="text-[10px] text-[oklch(0.55_0.12_195)] uppercase tracking-wider block">Status</span>
              <p className="font-bold text-[oklch(0.14_0.025_145)]">COMMISSIONED MEMBER</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[oklch(0.55_0.12_195)] uppercase tracking-wider block">Benefits</span>
              <ul className="list-disc list-inside space-y-1 text-[oklch(0.45_0.02_145)] text-[11px]">
                <li>Complimentary signature global express delivery</li>
                <li>Private seasonal previews before publication release</li>
                <li>Personal atelier sizing consultation</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[oklch(0.85_0.015_145)] flex items-center space-x-2 text-[10px] text-[oklch(0.45_0.02_145)] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-[oklch(0.55_0.12_195)]" />
              <span>Verified Atelier Account</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
