'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, DollarSign, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { adminApi, AdminStats } from '@/lib/admin-api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .getStats()
      .then((data) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-20 text-center font-mono text-xs text-[oklch(0.60_0.02_145)]">Loading publication dashboard...</div>;
  }

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[oklch(0.25_0.03_145)] pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[oklch(0.55_0.12_195)] block">
            DASHBOARD OVERVIEW
          </span>
          <h1
            className="text-3xl sm:text-4xl font-display text-[oklch(0.93_0.015_145)] tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            Atelier Stats & Revenue.
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="mt-4 sm:mt-0 px-5 py-2.5 bg-[oklch(0.55_0.12_195)] text-white text-xs uppercase tracking-[0.18em] font-mono rounded-xs hover:bg-[oklch(0.60_0.14_145)] transition-colors inline-flex items-center space-x-2"
        >
          <span>+ Create New Product</span>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[oklch(0.15_0.03_145)] p-6 rounded-xs border border-[oklch(0.25_0.03_145)] shadow-xl space-y-2">
          <div className="flex items-center justify-between text-[oklch(0.55_0.12_195)]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[oklch(0.60_0.02_145)]">Total Orders</span>
            <ShoppingBag className="w-4 h-4" />
          </div>
          <p className="text-3xl font-mono font-bold text-[oklch(0.93_0.015_145)]">{stats?.totalOrders || 0}</p>
        </div>

        <div className="bg-[oklch(0.15_0.03_145)] p-6 rounded-xs border border-[oklch(0.25_0.03_145)] shadow-xl space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[oklch(0.60_0.02_145)]">Total Revenue</span>
            <DollarSign className="w-4 h-4" />
          </div>
          <p className="text-3xl font-mono font-bold text-[oklch(0.93_0.015_145)]">
            ₹{(stats?.totalRevenue || 0).toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-[oklch(0.15_0.03_145)] p-6 rounded-xs border border-[oklch(0.25_0.03_145)] shadow-xl space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[oklch(0.60_0.02_145)]">Paid Orders</span>
            <CheckCircle className="w-4 h-4" />
          </div>
          <p className="text-3xl font-mono font-bold text-[oklch(0.93_0.015_145)]">{stats?.paidOrders || 0}</p>
        </div>

        <div className="bg-[oklch(0.15_0.03_145)] p-6 rounded-xs border border-[oklch(0.25_0.03_145)] shadow-xl space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[oklch(0.60_0.02_145)]">Pending Orders</span>
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-3xl font-mono font-bold text-[oklch(0.93_0.015_145)]">{stats?.pendingOrders || 0}</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-[oklch(0.15_0.03_145)] rounded-xs border border-[oklch(0.25_0.03_145)] shadow-xl overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-[oklch(0.25_0.03_145)] pb-4">
          <h2
            className="text-xl font-display text-[oklch(0.93_0.015_145)]"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            Recent Orders Activity.
          </h2>

          <Link
            href="/admin/orders"
            className="text-xs uppercase font-mono tracking-widest text-[oklch(0.55_0.12_195)] hover:text-white flex items-center space-x-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-[oklch(0.25_0.03_145)] text-[oklch(0.60_0.02_145)] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[oklch(0.25_0.03_145)]">
              {stats?.recentOrders?.map((order, idx) => (
                <tr key={order.id || order.orderNumber || `order-${idx}`} className="hover:bg-[oklch(0.18_0.02_145)] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[oklch(0.93_0.015_145)]">{order.orderNumber}</td>
                  <td className="py-3.5 px-4 text-[oklch(0.80_0.02_145)]">{order.customerName}</td>
                  <td className="py-3.5 px-4 text-[oklch(0.93_0.015_145)]">₹{order.total.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                        order.status === 'PAID'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-[oklch(0.55_0.12_195)] hover:underline"
                    >
                      Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
