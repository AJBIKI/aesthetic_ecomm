import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import productsData from '@/lib/data/products.json';
import { Product } from '@/lib/types';
import { ProductDetailClient } from './pdp-client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = productsData as Product[];
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const products = productsData as Product[];
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) return {};

  return {
    title: `${product.name} | The Monsoon Club.`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images.primary],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const products = productsData as Product[];
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => p.id !== product.id && p.collection === product.collection).slice(0, 3);

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.gallery,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'the monsoon club.',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
