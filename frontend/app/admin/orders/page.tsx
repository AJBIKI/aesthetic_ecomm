'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminApi, AdminOrder } from '@/lib/admin-api';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    adminApi
      .getOrders(filter)
      .then((data) => setOrders(data))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="space-y-8">
      
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[oklch(0.25_0.03_145)] pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[oklch(0.55_0.12_195)] block">
            ORDERS MANAGEMENT
          </span>
          <h1
            className="text-3xl font-display text-[oklch(0.93_0.015_145)] tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            Customer Orders.
          </h1>
        </div>

        {/* Status Filter Tabs */}
        <div className="mt-4 sm:mt-0 flex items-center space-x-2 font-mono text-xs">
          {['ALL', 'PENDING', 'PAID', 'SHIPPED', 'DELIVERED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-xs uppercase tracking-wider transition-colors ${
                filter === status
                  ? 'bg-[oklch(0.55_0.12_195)] text-white font-semibold'
                  : 'bg-[oklch(0.15_0.03_145)] text-[oklch(0.60_0.02_145)] hover:text-white border border-[oklch(0.25_0.03_145)]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-[oklch(0.60_0.02_145)]">Fetching orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-[oklch(0.15_0.03_145)] p-12 text-center rounded-xs border border-[oklch(0.25_0.03_145)] font-mono text-xs text-[oklch(0.60_0.02_145)]">
          No orders found matching filter "{filter}".
        </div>
      ) : (
        <div className="bg-[oklch(0.15_0.03_145)] rounded-xs border border-[oklch(0.25_0.03_145)] shadow-xl overflow-hidden p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-[oklch(0.25_0.03_145)] text-[oklch(0.60_0.02_145)] uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Order Ref</th>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[oklch(0.25_0.03_145)]">
                {orders.map((order, idx) => (
                  <tr key={order.id || order.orderNumber || `order-${idx}`} className="hover:bg-[oklch(0.18_0.02_145)] transition-colors">
                    <td className="py-4 px-4 font-bold text-[oklch(0.93_0.015_145)]">{order.orderNumber}</td>
                    <td className="py-4 px-4 text-[oklch(0.85_0.02_145)]">{order.customerName}</td>
                    <td className="py-4 px-4 text-[oklch(0.60_0.02_145)]">{order.email}</td>
                    <td className="py-4 px-4 text-[oklch(0.60_0.02_145)]">{order.items?.length || 1} item(s)</td>
                    <td className="py-4 px-4 font-semibold text-[oklch(0.93_0.015_145)]">
                      ₹{order.total.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                          order.status === 'PAID'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : order.status === 'SHIPPED'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                            : order.status === 'DELIVERED'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="px-3 py-1.5 bg-[oklch(0.20_0.03_145)] hover:bg-[oklch(0.55_0.12_195)] text-white text-[11px] rounded-xs transition-colors"
                      >
                        View & Edit →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
