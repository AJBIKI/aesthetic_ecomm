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
        <div className="mb-12 border-b border-[oklch(0.86_0.006_250)] pb-6 flex flex-col md:flex-row md:items-end justify-between">
          <div className="space-y-1">
            {subtitle && (
              <span className="text-xs uppercase tracking-[0.25em] text-[oklch(0.55_0.12_195)] font-mono block">
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

          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[oklch(0.48_0.01_255)] pt-2 md:pt-0">
            [EDITORIAL LOOKBOOK · CATALOGUE]
          </div>
        </div>
      )}

      {/* Asymmetric Editorial Magazine Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        {products.map((product, index) => {
          const isFeatured = index % 5 === 0 && index !== 0;
          return (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isFeatured={isFeatured}
            />
          );
        })}
      </div>
    </section>
  );
}
