// Response wrapper from backend
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
  statusCode: number;
}

// Backend DTO types (mirrors Prisma models)
export interface IssueDTO {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  season: string;
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  coverImage: string;
  manifesto: { quote: string; paragraphs: string[] };
  minPrice: number;
  maxPrice: number;
  cities: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  volumes?: VolumeDTO[];
  products?: ProductDTO[];
}

export interface VolumeDTO {
  id: string;
  issueId: string;
  volumeNumber: string;
  name: string;
  fabricCategory: string;
  description: string;
  heroImage: string;
  order: number;
  products?: ProductDTO[];
}

export interface ProductDTO {
  id: string;
  slug: string;
  issueId: string;
  volumeId: string;
  figureTag: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  tagline: string;
  description: string;
  fabric: string;
  care: string;
  details: string[];
  sizes: string[];
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'SOLD_OUT';
  isFeatured: boolean;
  primaryImage: string;
  hoverImage: string;
  gallery: string[];
  createdAt: string;
  updatedAt: string;
}
