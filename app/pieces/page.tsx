import { ProductGrid } from '@/components/product/product-grid';
import { Watermark } from '@/components/brand/watermark';
import productsData from '@/lib/data/products.json';
import { Product } from '@/lib/types';

export const metadata = {
  title: 'All Pieces | The Monsoon Club.',
  description: 'The complete catalog of luxury silk gowns and draped dresses.',
};

export default function AllPiecesPage() {
  const products = productsData as Product[];

  return (
    <div className="py-16 md:py-24 space-y-12 relative">
      <Watermark text="PIECES" className="top-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
          THE CATALOG
        </span>
        <h1
          className="text-4xl sm:text-5xl font-display text-[oklch(0.13_0.02_260)] tracking-wide"
          style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
        >
          All Pieces.
        </h1>
        <p className="text-xs sm:text-sm text-[oklch(0.48_0.01_255)] max-w-md mx-auto">
          Crafted with 30-momme mulberry silk, hand-draped crepes, and raw-edged habotai.
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
