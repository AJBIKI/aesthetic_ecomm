'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlusCircle, Trash2, Layers } from 'lucide-react';
import productsData from '@/lib/data/products.json';
import { Product } from '@/lib/types';
import { adminApi } from '@/lib/admin-api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(productsData as Product[]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this garment from the publication?')) return;
    await adminApi.deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[oklch(0.25_0.03_145)] pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[oklch(0.55_0.12_195)] block">
            PUBLICATION CATALOG
          </span>
          <h1
            className="text-3xl font-display text-[oklch(0.93_0.015_145)] tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            Atelier Products & Figures.
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="mt-4 sm:mt-0 px-5 py-2.5 bg-[oklch(0.55_0.12_195)] text-white text-xs uppercase tracking-[0.18em] font-mono rounded-xs hover:bg-[oklch(0.60_0.14_145)] transition-colors inline-flex items-center space-x-2 shadow-lg"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Garment</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[oklch(0.15_0.03_145)] rounded-xs border border-[oklch(0.25_0.03_145)] shadow-xl overflow-hidden p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-[oklch(0.25_0.03_145)] text-[oklch(0.60_0.02_145)] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Preview</th>
                <th className="py-3 px-4">Garment Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Available Sizes</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[oklch(0.25_0.03_145)]">
              {products.map((product, idx) => (
                <tr key={product.id || product.slug || `prod-${idx}`} className="hover:bg-[oklch(0.18_0.02_145)] transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-14 bg-white rounded-xs overflow-hidden border border-[oklch(0.25_0.03_145)]">
                      <Image src={product.images.primary} alt="" fill className="object-cover" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="font-display text-base text-[oklch(0.93_0.015_145)] block"
                      style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
                    >
                      {product.name}
                    </span>
                    <span className="text-[10px] text-[oklch(0.55_0.12_195)]">CAT: {product.id.toUpperCase()}</span>
                  </td>
                  <td className="py-3 px-4 text-[oklch(0.70_0.02_145)]">{product.category}</td>
                  <td className="py-3 px-4 font-bold text-[oklch(0.93_0.015_145)]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-[oklch(0.70_0.02_145)]">
                    {product.sizes.join(', ')}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xs transition-colors"
                      aria-label="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
