import { Product } from '@/lib/types';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {(title || subtitle) && (
        <div className="mb-12 text-center md:text-left space-y-2">
          {subtitle && (
            <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0.12_195)] font-mono block">
              {subtitle}
            </span>
          )}
          {title && (
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-display text-[oklch(0.13_0.02_260)] tracking-wide"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              {title}
            </h2>
          )}
        </div>
      )}

      {/* Asymmetric Masonry-style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        {products.map((product, index) => {
          // Every 5th item gets feature sizing on desktop
          const isFeatured = index % 5 === 0 && index !== 0;
          return (
            <ProductCard
              key={product.id}
              product={product}
              isFeatured={isFeatured}
            />
          );
        })}
      </div>
    </section>
  );
}
