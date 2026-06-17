export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  /** URL slug and unique id, e.g. "midnight-velvet-coat" */
  id: string;
  name: string;
  /** Garment type: Outerwear, Dresses, Formal, Accessories, Lingerie */
  category: string;
  /** Collection slug, links to a World — e.g. "vampire-chic" */
  world: string;
  price: number;
  originalPrice?: number;
  /** Gallery images; images[0] is the primary */
  images: string[];
  description: string;
  /** Bulleted spec / material / care notes */
  details: string[];
  sizes: string[];
  colors: ColorOption[];
  badge?: string;
  featured?: boolean;
}

export interface CartItem {
  /** Unique per product + chosen variant, e.g. "midnight-velvet-coat__M__Obsidian" */
  key: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
}

/** Format a number as a USD price string like "$129.99". */
export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

/** Percentage off, rounded — or null when there's no genuine discount. */
export function discountPercent(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
