import { HeroSpread } from '@/components/sections/hero-spread';
import { EditorialText } from '@/components/sections/editorial-text';
import { ProductGrid } from '@/components/product/product-grid';
import { LookbookScroll } from '@/components/sections/lookbook-scroll';
import { MagazineIndex } from '@/components/sections/magazine-index';
import { Newsletter } from '@/components/sections/newsletter';
import productsData from '@/lib/data/products.json';
import { Product } from '@/lib/types';

export default function Home() {
  const products = productsData as Product[];

  return (
    <div className="space-y-12">
      {/* Digital Magazine Cover Hero */}
      <HeroSpread />

      {/* Editorial Text Manifesto */}
      <EditorialText
        overline="THE PHILOSOPHY"
        title="Designed for quiet presence in high-ceilinged rooms."
        quote="Luxury is not an accumulation of features. It is the confidence to leave room."
        paragraphs={[
          "At The Monsoon Club, we treat clothes not as seasonal inventory to be rapidly cycled, but as permanent stories. Each dress is cut with fluid weight—anchored at the hem to move deliberately with your cadence.",
          "Our Mulberry silks are sand-washed for a tactile matte finish that catches directional evening light without harsh glare. Unhurried, intentional, and unmistakably distinct."
        ]}
      />

      {/* Magazine Directory / Table of Contents Section */}
      <MagazineIndex />

      {/* Featured Editorial Lookbook Grid */}
      <ProductGrid
        products={products}
        subtitle="CURATED SELECTION"
        title="Featured Pieces"
      />

      {/* Signature Scroll-Choreographed Lookbook Story */}
      <LookbookScroll />

      {/* Newsletter Correspondence */}
      <Newsletter />
    </div>
  );
}
