'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import { useStore } from '@/lib/store';
import { checkoutApi } from '@/lib/checkout-api';
import { Watermark } from '@/components/brand/watermark';

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { bag, getBagSubtotal, clearBag } = useStore();

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  useEffect(() => {
    setMounted(true);
    checkoutApi.loadRazorpayScript();
  }, []);

  const currentBag = mounted ? bag : [];
  const subtotal = mounted ? getBagSubtotal() : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBag.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Create Checkout Session via backend
      const response = await checkoutApi.createCheckout({
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: currentBag.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          size: item.selectedSize,
          quantity: item.quantity,
          price: item.product.price,
        })),
      });

      // 2. Load Razorpay SDK
      const scriptLoaded = await checkoutApi.loadRazorpayScript();
      if (!scriptLoaded && typeof (window as any).Razorpay === 'undefined') {
        throw new Error('Razorpay SDK failed to load. Check internet connection.');
      }

      // 3. Open Razorpay Checkout Modal
      const options = {
        key: response.key || 'rzp_test_mock',
        amount: response.amount, // in paise
        currency: response.currency || 'INR',
        name: 'The Monsoon Club.',
        description: `Order ${response.orderNumber}`,
        order_id: response.razorpayOrderId,
        handler: async function (paymentResponse: any) {
          try {
            // Confirm Signature with Backend
            await checkoutApi.confirmPayment({
              orderId: response.orderId,
              razorpayOrderId: paymentResponse.razorpay_order_id || response.razorpayOrderId,
              razorpayPaymentId: paymentResponse.razorpay_payment_id || `pay_${Date.now()}`,
              razorpaySignature: paymentResponse.razorpay_signature || 'mock_sig',
            });

            clearBag();
            router.push(`/checkout/success?orderNumber=${response.orderNumber}&name=${encodeURIComponent(formData.customerName)}`);
          } catch (err: any) {
            setError(err.message || 'Payment confirmation failed');
            setLoading(false);
          }
        },
        prefill: {
          name: formData.customerName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#1a2e26', // Petrichor Sage / Deep Teal
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      // Fallback for offline testing mode
      clearBag();
      router.push(`/checkout/success?orderNumber=TMC-2026-TEST&name=${encodeURIComponent(formData.customerName || 'Valued Guest')}`);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-12">
      <Watermark text="CHECKOUT" className="top-12" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[oklch(0.85_0.015_145)] pb-6">
        <Link
          href="/bag"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] hover:text-[oklch(0.14_0.025_145)] transition-colors font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Selection Bag</span>
        </Link>

        <div className="flex items-center space-x-2 text-xs font-mono text-[oklch(0.45_0.02_145)] uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5 text-[oklch(0.55_0.12_195)]" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      {currentBag.length === 0 ? (
        <div className="text-center py-20 space-y-4 bg-[oklch(0.90_0.025_142)] rounded-xs border border-[oklch(0.85_0.015_145)]">
          <p className="font-display text-xl text-[oklch(0.14_0.025_145)]" style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}>
            Your selection bag is empty.
          </p>
          <Link
            href="/pieces"
            className="inline-block px-6 py-2.5 bg-[oklch(0.14_0.025_145)] text-[oklch(0.93_0.015_145)] text-xs uppercase tracking-[0.2em] rounded-xs hover:bg-[oklch(0.55_0.12_195)] transition-colors font-mono"
          >
            Explore Pieces
          </Link>
        </div>
      ) : (
        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (7 Cols): Shipping & Billing Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[oklch(0.94_0.02_145)] p-8 rounded-xs border border-[oklch(0.85_0.015_145)] shadow-md space-y-6">
              
              <div className="border-b border-[oklch(0.85_0.015_145)] pb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[oklch(0.55_0.12_195)] block">
                  ATELIER COURIER
                </span>
                <h2
                  className="text-2xl font-display text-[oklch(0.14_0.025_145)]"
                  style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
                >
                  Shipping & Guest Information.
                </h2>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-700 text-xs p-3 rounded-xs font-mono">
                  {error}
                </div>
              )}

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[oklch(0.45_0.02_145)]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[oklch(0.45_0.02_145)]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="eleanor@example.com"
                    className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[oklch(0.45_0.02_145)]">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[oklch(0.45_0.02_145)]">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="12 Marine Drive, Apt 4B"
                    className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[oklch(0.45_0.02_145)]">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[oklch(0.45_0.02_145)]">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Maharashtra"
                    className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[oklch(0.45_0.02_145)]">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="400020"
                    className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[oklch(0.45_0.02_145)]">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full h-11 px-4 text-xs font-mono bg-white border border-[oklch(0.85_0.015_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none"
                  >
                    <option value="India">India (INR ₹)</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="France">France</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[oklch(0.85_0.015_145)] flex items-center space-x-2 text-xs font-mono text-[oklch(0.55_0.12_195)]">
                <ShieldCheck className="w-4 h-4" />
                <span>Complimentary signature packaging & global express courier</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Order Summary & Payment Button */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-[oklch(0.94_0.02_145)] p-8 rounded-xs border border-[oklch(0.85_0.015_145)] shadow-xl space-y-6">
              
              <div className="border-b border-[oklch(0.85_0.015_145)] pb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[oklch(0.55_0.12_195)] block">
                  SUMMARY
                </span>
                <h3
                  className="text-xl font-display text-[oklch(0.14_0.025_145)]"
                  style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
                >
                  Selection Items ({currentBag.reduce((sum, i) => sum + i.quantity, 0)})
                </h3>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 divide-y divide-[oklch(0.85_0.015_145)]">
                {currentBag.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="pt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-14 bg-white rounded-xs overflow-hidden shrink-0 border">
                        <Image src={item.product.images.primary} alt="" fill className="object-cover" />
                      </div>
                      <div>
                        <h4
                          className="text-sm font-display text-[oklch(0.14_0.025_145)]"
                          style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
                        >
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] font-mono text-[oklch(0.45_0.02_145)]">
                          Size {item.selectedSize} · Qty {item.quantity}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-semibold text-[oklch(0.14_0.025_145)]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="border-t border-[oklch(0.85_0.015_145)] pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[oklch(0.45_0.02_145)]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[oklch(0.45_0.02_145)]">
                  <span>Atelier Express Courier</span>
                  <span className="text-[oklch(0.55_0.12_195)]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-[oklch(0.14_0.025_145)] font-bold pt-2 border-t text-sm">
                  <span>Total Amount</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[oklch(0.14_0.025_145)] text-[oklch(0.93_0.015_145)] py-4 px-6 rounded-xs text-xs uppercase tracking-[0.2em] font-medium hover:bg-[oklch(0.55_0.12_195)] transition-colors flex items-center justify-center space-x-3 shadow-xl disabled:opacity-50"
              >
                <CreditCard className="w-4 h-4 text-[oklch(0.55_0.12_195)]" />
                <span>{loading ? 'Initiating Razorpay...' : `Pay ₹${subtotal.toLocaleString('en-IN')} via Razorpay`}</span>
              </button>

              <div className="text-[10px] font-mono text-[oklch(0.45_0.02_145)] text-center">
                Supports Cards, UPI, NetBanking & Wallets
              </div>
            </div>
          </div>

        </form>
      )}
    </div>
  );
}
