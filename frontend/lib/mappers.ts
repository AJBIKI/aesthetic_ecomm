import { ProductDTO, IssueDTO } from './api-types';
import { Product, Issue, Volume, Collection, StockStatus } from './types';

function normalizeImageUrl(url: string | undefined, fallback: string): string {
  if (!url) return fallback;

  // Handle fake/placeholder CDN domain or unresolvable URLs
  if (url.includes('cdn.themonsoonclub.com') || url.includes('localhost:4000')) {
    const filenameMatch = url.match(/([^\/]+\.(png|jpg|jpeg|webp))$/i);
    if (filenameMatch) {
      const fn = filenameMatch[1].toLowerCase();
      if (fn.includes('dress-1-a') || fn.includes('monsoon-1-a') || fn.includes('hero-1')) return '/images/hero-1.png';
      if (fn.includes('dress-1-b') || fn.includes('monsoon-1-b')) return '/images/dress-1-b.png';
      if (fn.includes('dress-2-a') || fn.includes('monsoon-2-a')) return '/images/dress-2-a.png';
      if (fn.includes('dress-2-b') || fn.includes('monsoon-2-b')) return '/images/dress-2-b.png';
      if (fn.includes('dress-3-a') || fn.includes('monsoon-3-a')) return '/images/dress-3-a.png';
      if (fn.includes('dress-3-b') || fn.includes('monsoon-3-b')) return '/images/dress-3-b.png';
      if (fn.includes('dress-4-a') || fn.includes('monsoon-4-a')) return '/images/dress-4-a.png';
      if (fn.includes('dress-4-b') || fn.includes('monsoon-4-b')) return '/images/dress-4-b.png';
      return `/images/${filenameMatch[1]}`;
    }
    return fallback;
  }

  return url;
}

export function dtoToProduct(dto: ProductDTO): Product {
  const primary = normalizeImageUrl(dto.primaryImage, '/images/hero-1.png');
  const hover = normalizeImageUrl(dto.hoverImage, '/images/dress-1-b.png');
  const gallery = Array.isArray(dto.gallery) && dto.gallery.length > 0
    ? dto.gallery.map((g) => normalizeImageUrl(g, primary))
    : [primary, hover];

  return {
    id: dto.id,
    slug: dto.slug,
    issueId: dto.issueId,
    volumeId: dto.volumeId,
    figureTag: dto.figureTag,
    name: dto.name,
    price: dto.price,
    currency: dto.currency,
    collection: dto.category?.toLowerCase().replace(/\s+/g, '-') || 'monsoon-edit',
    category: dto.category,
    tagline: dto.tagline,
    description: dto.description,
    details: dto.details || [],
    fabric: dto.fabric,
    care: dto.care,
    sizes: dto.sizes || ['S', 'M', 'L'],
    inStock: dto.stockStatus !== 'SOLD_OUT',
    stockStatus: (dto.stockStatus?.toLowerCase() as StockStatus) || 'in_stock',
    isFeatured: dto.isFeatured,
    images: {
      primary,
      hover,
      gallery,
    },
  };
}

export function dtoToIssue(dto: IssueDTO): Issue {
  return {
    id: dto.id,
    code: dto.code,
    title: dto.title,
    subtitle: dto.subtitle,
    season: dto.season,
    status: (dto.status?.toLowerCase() as Issue['status']) || 'active',
    coverImage: normalizeImageUrl(dto.coverImage, '/images/hero-1.png'),
    manifesto: dto.manifesto,
    priceRange: { min: dto.minPrice || 12500, max: dto.maxPrice || 24500 },
    cities: dto.cities || ['MUMBAI', 'LONDON', 'PARIS'],
    publishedAt: dto.publishedAt,
  };
}

export function dtoToVolume(dto: any): Volume {
  return {
    id: dto.id,
    issueId: dto.issueId,
    volumeNumber: dto.volumeNumber,
    name: dto.name,
    fabricCategory: dto.fabricCategory,
    description: dto.description,
    heroImage: normalizeImageUrl(dto.heroImage, '/images/hero-1.png'),
    order: dto.order || 1,
  };
}

export function volumeToCollection(vol: any): Collection {
  return {
    id: vol.id,
    name: vol.name,
    slug: vol.name?.toLowerCase().replace(/\s+/g, '-') || 'monsoon-edit',
    season: vol.fabricCategory || 'Spring / Summer 2026',
    description: vol.description,
    heroImage: normalizeImageUrl(vol.heroImage, '/images/hero-1.png'),
    volumeNumber: vol.volumeNumber,
  };
}
