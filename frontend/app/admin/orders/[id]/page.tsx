'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, Truck, Package } from 'lucide-react';
import { adminApi, AdminOrder } from '@/lib/admin-api';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'ord_1';

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    adminApi
      .getOrders()
      .then((orders) => {
        const found = orders.find((o) => o.id === orderId) || orders[0];
        setOrder(found);
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;
    setUpdating(true);
    try {
      const updated = await adminApi.updateOrderStatus(order.id, newStatus);
      setOrder({ ...order, status: newStatus as any });
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center font-mono text-xs text-[oklch(0.60_0.02_145)]">Loading order details...</div>;
  }

  if (!order) {
    return <div className="py-20 text-center font-mono text-xs text-[oklch(0.60_0.02_145)]">Order not found.</div>;
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[oklch(0.25_0.03_145)] pb-6 gap-4">
        <div>
          <Link
            href="/admin/orders"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[oklch(0.55_0.12_195)] hover:underline font-mono mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Orders List</span>
          </Link>

          <h1
            className="text-3xl font-display text-[oklch(0.93_0.015_145)] tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            Order {order.orderNumber}
          </h1>
        </div>

        {/* Status Updater */}
        <div className="flex items-center space-x-3 font-mono text-xs">
          <span className="text-[oklch(0.60_0.02_145)] uppercase tracking-wider">Update Status:</span>
          <select
            value={order.status}
            disabled={updating}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="h-10 px-4 bg-[oklch(0.18_0.02_145)] border border-[oklch(0.25_0.03_145)] rounded-xs text-[oklch(0.93_0.015_145)] focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
          >
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>

          {successMsg && (
            <span className="text-emerald-400 font-semibold flex items-center space-x-1">
              <Check className="w-4 h-4" />
              <span>Saved</span>
            </span>
          )}
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (7 Cols): Items List & Pricing */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-[oklch(0.15_0.03_145)] p-6 rounded-xs border border-[oklch(0.25_0.03_145)] shadow-xl space-y-4">
            <h2
              className="text-xl font-display text-[oklch(0.93_0.015_145)] border-b border-[oklch(0.25_0.03_145)] pb-3"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              Purchased Garments
            </h2>

            <div className="divide-y divide-[oklch(0.25_0.03_145)]">
              {order.items?.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between font-mono text-xs">
                  <div>
                    <h3 className="font-semibold text-[oklch(0.93_0.015_145)] text-sm">{item.name}</h3>
                    <p className="text-[oklch(0.60_0.02_145)] text-[11px]">
                      Size: <span className="text-[oklch(0.55_0.12_195)] font-bold">{item.size}</span> · Quantity: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-[oklch(0.93_0.015_145)]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[oklch(0.25_0.03_145)] pt-4 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-[oklch(0.60_0.02_145)]">
                <span>Subtotal</span>
                <span>₹{order.subtotal?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[oklch(0.60_0.02_145)]">
                <span>Express Shipping</span>
                <span className="text-emerald-400">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[oklch(0.93_0.015_145)] pt-2 border-t border-[oklch(0.25_0.03_145)]">
                <span>Total Amount Paid</span>
                <span>₹{order.total?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right (5 Cols): Customer Details & Address */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[oklch(0.15_0.03_145)] p-6 rounded-xs border border-[oklch(0.25_0.03_145)] shadow-xl space-y-4 font-mono text-xs">
            <h3
              className="text-xl font-display text-[oklch(0.93_0.015_145)] border-b border-[oklch(0.25_0.03_145)] pb-3"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              Customer & Delivery Address
            </h3>

            <div className="space-y-2">
              <span className="text-[10px] text-[oklch(0.55_0.12_195)] uppercase tracking-widest block">Customer</span>
              <p className="font-bold text-[oklch(0.93_0.015_145)] text-sm">{order.customerName}</p>
              <p className="text-[oklch(0.70_0.02_145)]">{order.email}</p>
              <p className="text-[oklch(0.70_0.02_145)]">{order.phone}</p>
            </div>

            <div className="pt-4 border-t border-[oklch(0.25_0.03_145)] space-y-1 text-[oklch(0.70_0.02_145)]">
              <span className="text-[10px] text-[oklch(0.55_0.12_195)] uppercase tracking-widest block">Shipping Destination</span>
              <p>{order.address?.street}</p>
              <p>{order.address?.city}, {order.address?.state} {order.address?.postalCode}</p>
              <p className="font-bold text-[oklch(0.93_0.015_145)]">{order.address?.country}</p>
            </div>

            {order.paymentId && (
              <div className="pt-4 border-t border-[oklch(0.25_0.03_145)] space-y-1">
                <span className="text-[10px] text-[oklch(0.55_0.12_195)] uppercase tracking-widest block">Razorpay Transaction ID</span>
                <p className="font-bold text-emerald-400">{order.paymentId}</p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
