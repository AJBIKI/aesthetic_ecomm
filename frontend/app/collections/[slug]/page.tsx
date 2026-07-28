import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/product/product-grid';
import { Watermark } from '@/components/brand/watermark';
import collectionsData from '@/lib/data/collections.json';
import productsData from '@/lib/data/products.json';
import { Collection, Product } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = collectionsData as Collection[];
  return collections.map((col) => ({
    slug: col.slug,
  }));
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const collections = collectionsData as Collection[];
  const collection = collections.find((c) => c.slug === resolvedParams.slug);

  if (!collection) {
    notFound();
  }

  const allProducts = productsData as Product[];
  const collectionProducts = allProducts.filter(
    (p) => p.collection === collection.slug
  );

  return (
    <div className="py-16 md:py-24 space-y-12 relative">
      <Watermark text={collection.name.toUpperCase()} className="top-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
          {collection.season}
        </span>
        <h1
          className="text-4xl sm:text-5xl font-display text-[oklch(0.13_0.02_260)] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
        >
          {collection.name}
        </h1>
        <p className="text-xs sm:text-sm text-[oklch(0.48_0.01_255)] max-w-xl leading-relaxed">
          {collection.description}
        </p>
      </div>

      <ProductGrid products={collectionProducts.length > 0 ? collectionProducts : allProducts} />
    </div>
  );
}
