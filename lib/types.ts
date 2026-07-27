export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  collection: string;
  category: string;
  tagline: string;
  description: string;
  details: string[];
  fabric: string;
  care: string;
  sizes: string[];
  inStock: boolean;
  isFeatured?: boolean;
  images: {
    primary: string;
    hover: string;
    gallery: string[];
  };
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  season: string;
  description: string;
  heroImage: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}
