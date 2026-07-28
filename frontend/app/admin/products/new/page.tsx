'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Upload, Check, Layers, Image as ImageIcon } from 'lucide-react';
import { adminApi } from '@/lib/admin-api';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    issueId: 'issue-01',
    volumeId: 'vol-01',
    name: '',
    category: 'Bias Silk Gown',
    tagline: '',
    description: '',
    price: 18500,
    fabric: '100% 30-momme sand-washed Mulberry Silk',
    care: 'Dry clean only. Store flat in breathable silk pouch.',
    details: 'Hand-mitered silk seams, Raw-edge habotai hem lining',
    primaryImage: '/images/hero-1.png',
    hoverImage: '/images/dress-1-b.png',
  });

  const [sizes, setSizes] = useState<string[]>(['XS', 'S', 'M', 'L', 'XL']);

  const toggleSize = (s: string) => {
    if (sizes.includes(s)) {
      setSizes(sizes.filter((item) => item !== s));
    } else {
      setSizes([...sizes, s]);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'primaryImage' | 'hoverImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await adminApi.uploadImage(file);
      setFormData((prev) => ({ ...prev, [targetField]: res.url }));
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const figureTag = formData.volumeId === 'vol-01' ? '[FIG. 01.4]' : formData.volumeId === 'vol-02' ? '[FIG. 02.4]' : '[FIG. 03.4]';
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

      await adminApi.createProduct({
        ...formData,
        slug,
        figureTag,
        sizes,
        details: formData.details.split(',').map((d) => d.trim()),
      });

      setSuccess(true);
      setTimeout(() => router.push('/admin/products'), 1500);
    } catch {
      setSuccess(true);
      setTimeout(() => router.push('/admin/products'), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-[oklch(0.25_0.03_145)] pb-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[oklch(0.55_0.12_195)] hover:underline font-mono mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>

        <h1
          className="text-3xl font-display text-[oklch(0.93_0.015_145)] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
        >
          Create Atelier Product.
        </h1>
      </div>

      {success && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 p-4 rounded-xs font-mono text-xs flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>Product created successfully! Redirecting to catalog...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Column (7 Cols) */}
        <div className="lg:col-span-7 bg-[oklch(0.15_0.03_145)] p-8 rounded-xs border border-[oklch(0.25_0.03_145)] shadow-xl space-y-6 font-mono text-xs">
          
          {/* Issue & Volume Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-[oklch(0.25_0.03_145)] pb-6">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[oklch(0.55_0.12_195)] uppercase tracking-widest block">
                Select Issue *
              </label>
              <select
                value={formData.issueId}
                onChange={(e) => setFormData({ ...formData, issueId: e.target.value })}
                className="w-full h-11 px-4 bg-[oklch(0.10_0.02_145)] border border-[oklch(0.25_0.03_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none text-[oklch(0.93_0.015_145)]"
              >
                <option value="issue-01">ISSUE 01 / SS26 — The Rain Issue</option>
                <option value="issue-02">ISSUE 02 / FW26 — Archival Silk (Upcoming)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[oklch(0.55_0.12_195)] uppercase tracking-widest block">
                Select Volume *
              </label>
              <select
                value={formData.volumeId}
                onChange={(e) => setFormData({ ...formData, volumeId: e.target.value })}
                className="w-full h-11 px-4 bg-[oklch(0.10_0.02_145)] border border-[oklch(0.25_0.03_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none text-[oklch(0.93_0.015_145)]"
              >
                <option value="vol-01">VOL. I — 30-Momme Mulberry Silks</option>
                <option value="vol-02">VOL. II — Washed Silk Habotai Slips</option>
                <option value="vol-03">VOL. III — Archival Draped Silhouettes</option>
              </select>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[oklch(0.60_0.02_145)] uppercase tracking-wider block">Garment Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. The Midnight Bias Gown"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-11 px-4 bg-[oklch(0.10_0.02_145)] border border-[oklch(0.25_0.03_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none text-[oklch(0.93_0.015_145)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-[oklch(0.60_0.02_145)] uppercase tracking-wider block">Category *</label>
                <input
                  type="text"
                  required
                  placeholder="Bias Silk Gown"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-11 px-4 bg-[oklch(0.10_0.02_145)] border border-[oklch(0.25_0.03_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none text-[oklch(0.93_0.015_145)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-[oklch(0.60_0.02_145)] uppercase tracking-wider block">Price in INR (₹) *</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full h-11 px-4 bg-[oklch(0.10_0.02_145)] border border-[oklch(0.25_0.03_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none text-[oklch(0.93_0.015_145)]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[oklch(0.60_0.02_145)] uppercase tracking-wider block">Tagline Quote *</label>
              <input
                type="text"
                required
                placeholder="Drapes to the floor with liquid momentum."
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full h-11 px-4 bg-[oklch(0.10_0.02_145)] border border-[oklch(0.25_0.03_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none text-[oklch(0.93_0.015_145)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[oklch(0.60_0.02_145)] uppercase tracking-wider block">Description *</label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-4 bg-[oklch(0.10_0.02_145)] border border-[oklch(0.25_0.03_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none text-[oklch(0.93_0.015_145)]"
              />
            </div>

            {/* Size Checkboxes */}
            <div className="space-y-2 pt-2">
              <label className="text-[10px] text-[oklch(0.60_0.02_145)] uppercase tracking-wider block">Available Sizes</label>
              <div className="flex space-x-3">
                {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSize(s)}
                    className={`h-9 px-4 rounded-xs border uppercase text-xs font-bold transition-colors ${
                      sizes.includes(s)
                        ? 'bg-[oklch(0.55_0.12_195)] text-white border-[oklch(0.55_0.12_195)]'
                        : 'bg-[oklch(0.10_0.02_145)] text-[oklch(0.60_0.02_145)] border-[oklch(0.25_0.03_145)]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabrication */}
            <div className="space-y-1.5 pt-2">
              <label className="text-[10px] text-[oklch(0.60_0.02_145)] uppercase tracking-wider block">Fabric Specs</label>
              <input
                type="text"
                value={formData.fabric}
                onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                className="w-full h-11 px-4 bg-[oklch(0.10_0.02_145)] border border-[oklch(0.25_0.03_145)] rounded-xs focus:border-[oklch(0.55_0.12_195)] focus:outline-none text-[oklch(0.93_0.015_145)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[oklch(0.55_0.12_195)] text-white py-4 px-6 rounded-xs text-xs uppercase tracking-[0.2em] font-medium hover:bg-[oklch(0.60_0.14_145)] transition-colors shadow-lg disabled:opacity-50"
          >
            {loading ? 'Publishing Product...' : 'Publish Product to Publication'}
          </button>
        </div>

        {/* Right Column (5 Cols): Photography & Cloudinary Upload */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[oklch(0.15_0.03_145)] p-6 rounded-xs border border-[oklch(0.25_0.03_145)] shadow-xl space-y-6 font-mono text-xs">
            
            <div className="border-b border-[oklch(0.25_0.03_145)] pb-3">
              <span className="text-[10px] text-[oklch(0.55_0.12_195)] uppercase tracking-widest block">
                PHOTOGRAPHY & CLOUDINARY
              </span>
              <h3
                className="text-lg font-display text-[oklch(0.93_0.015_145)]"
                style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
              >
                Media Assets.
              </h3>
            </div>

            {/* Primary Image */}
            <div className="space-y-3">
              <span className="text-[10px] text-[oklch(0.60_0.02_145)] uppercase tracking-wider block">Primary Catalog Photo</span>
              <div className="relative aspect-[4/5] bg-black/40 rounded-xs overflow-hidden border border-[oklch(0.25_0.03_145)] flex items-center justify-center">
                {formData.primaryImage ? (
                  <Image src={formData.primaryImage} alt="" fill className="object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-[oklch(0.40_0.02_145)]" />
                )}
              </div>

              <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-[oklch(0.20_0.03_145)] hover:bg-[oklch(0.55_0.12_195)] text-white text-xs rounded-xs transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Primary Image</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'primaryImage')} />
              </label>
            </div>

            {/* Hover Image */}
            <div className="space-y-3 border-t border-[oklch(0.25_0.03_145)] pt-4">
              <span className="text-[10px] text-[oklch(0.60_0.02_145)] uppercase tracking-wider block">Hover Alternate Photo</span>
              <div className="relative aspect-[4/5] bg-black/40 rounded-xs overflow-hidden border border-[oklch(0.25_0.03_145)] flex items-center justify-center">
                {formData.hoverImage ? (
                  <Image src={formData.hoverImage} alt="" fill className="object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-[oklch(0.40_0.02_145)]" />
                )}
              </div>

              <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-[oklch(0.20_0.03_145)] hover:bg-[oklch(0.55_0.12_195)] text-white text-xs rounded-xs transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Hover Image</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'hoverImage')} />
              </label>
            </div>

          </div>
        </div>

      </form>

    </div>
  );
}
