export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type StockStatus = 'in_stock' | 'low_stock' | 'sold_out';

export type IssueStatus = 'active' | 'archived' | 'draft';

export interface Issue {
  id: string;                  // e.g. "issue-01"
  code: string;                // e.g. "ISSUE 01 / SS26"
  title: string;               // e.g. "The Rain Issue."
  subtitle: string;            // e.g. "Dresses That Move With The Season."
  season: string;              // e.g. "Spring / Summer 2026"
  status: IssueStatus;
  coverImage: string;          // Photography URL
  manifesto: {
    quote: string;
    paragraphs: string[];
  };
  priceRange: {
    min: number;               // e.g. 12500
    max: number;               // e.g. 24500
  };
  cities: string[];            // e.g. ["MUMBAI", "LONDON", "PARIS"]
  publishedAt: string;
}

export interface Volume {
  id: string;                  // e.g. "vol-01"
  issueId: string;             // References Issue.id
  volumeNumber: string;        // e.g. "VOL. I"
  name: string;                // e.g. "30-Momme Mulberry Silks"
  fabricCategory: string;      // e.g. "Mulberry Silk"
  description: string;         // Chapter editorial description
  heroImage: string;           // Photography URL
  order: number;               // Chapter index (1, 2, 3)
}

export interface Product {
  id: string;                  // e.g. "p-01"
  slug: string;                // e.g. "midnight-bias-gown"
  issueId?: string;            // References Issue.id
  volumeId?: string;           // References Volume.id
  figureTag?: string;          // Auto-generated e.g. "[FIG. 01.1]"
  name: string;                // e.g. "The Midnight Bias Gown"
  price: number;               // INR price (e.g. 18500)
  currency: string;            // e.g. "INR"
  collection: string;          // Collection slug (e.g. "monsoon-edit")
  category: string;            // e.g. "Bias Silk Gown"
  tagline: string;             // e.g. "Drapes to the floor with liquid momentum."
  description: string;         // Detailed editorial text
  details: string[];           // Technical garment bullets
  fabric: string;              // e.g. "100% 30-momme sand-washed Mulberry Silk"
  care: string;                // e.g. "Dry clean only."
  sizes: (Size | string)[];    // e.g. ["XS", "S", "M", "L"]
  inStock: boolean;
  stockStatus?: StockStatus;
  isFeatured?: boolean;
  images: {
    primary: string;           // Main photo
    hover: string;             // Hover alternate photo
    gallery: string[];         // Full gallery photos
  };
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  season: string;
  description: string;
  heroImage: string;
  volumeNumber?: string;       // e.g. "VOL. I"
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}
