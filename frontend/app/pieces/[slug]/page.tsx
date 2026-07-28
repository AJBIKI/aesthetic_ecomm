import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import productsData from '@/lib/data/products.json';
import { Product } from '@/lib/types';
import { ProductDetailClient } from './pdp-client';
import { dtoToProduct } from '@/lib/mappers';
import { api } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = productsData as Product[];
  return products.map((p) => ({
    slug: p.slug,
  }));
}

async function getProduct(slug: string): Promise<Product | null> {
  const dto = await api.getProduct(slug);
  if (dto) return dtoToProduct(dto);
  const fallback = productsData as Product[];
  return fallback.find((p) => p.slug === slug) || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);
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
  const product = await getProduct(resolvedParams.slug);

  if (!product) notFound();

  const allProducts = productsData as Product[];
  const relatedProducts = allProducts.filter((p) => p.id !== product.id && p.collection === product.collection).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.gallery,
    description: product.description,
    brand: { '@type': 'Brand', name: 'the monsoon club.' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
