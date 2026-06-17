export interface Product {
  id: string;
  name: string;
  category: string;
  /** Numeric price in USD, e.g. 129.99 */
  price: number;
  /** Optional original (pre-discount) price in USD */
  originalPrice?: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

/** Parse a display price like "$129.99" into a number (129.99). */
export function parsePrice(value: string | number | undefined): number {
  if (value == null) return 0;
  if (typeof value === 'number') return value;
  const n = Number(value.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

/** Format a number as a USD price string like "$129.99". */
export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}
