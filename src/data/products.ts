import type { ColorOption, Product } from '@/types/product';

export interface World {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
}

/** The four collections shown in "Shop by World". */
export const worlds: World[] = [
  {
    slug: 'dark-academia',
    name: 'Dark Academia',
    tagline: 'Intellect meets shadow',
    image: '/images/world-dark-academia.jpg',
    description: 'Tailored wool, ink-stained cuffs and candlelit libraries. For the quietly rebellious scholar.',
  },
  {
    slug: 'vampire-chic',
    name: 'Vampire Chic',
    tagline: 'Eternal elegance',
    image: '/images/world-vampire-chic.jpg',
    description: 'Velvet, silk and cold metal. Pieces cut for those who look best by moonlight.',
  },
  {
    slug: 'gothic-street',
    name: 'Gothic Street',
    tagline: 'Urban darkness',
    image: '/images/world-gothic-street.jpg',
    description: 'Leather, hardware and dramatic silhouettes built for the city after dark.',
  },
  {
    slug: 'victorian-romance',
    name: 'Victorian Romance',
    tagline: 'Love in the ruins',
    image: '/images/world-victorian-romance.jpg',
    description: 'Lace, thorned roses and trailing hems. Romance with a little rot at the edges.',
  },
];

// Shared swatches in the VAMPGEN palette.
const C: Record<string, ColorOption> = {
  obsidian: { name: 'Obsidian', hex: '#0a0a0a' },
  oxblood: { name: 'Oxblood', hex: '#4a0e0e' },
  blood: { name: 'Blood', hex: '#7f1d1d' },
  crimson: { name: 'Crimson', hex: '#991b1b' },
  charcoal: { name: 'Charcoal', hex: '#1f2937' },
  ash: { name: 'Ash', hex: '#3f3f46' },
  silver: { name: 'Antique Silver', hex: '#9ca3af' },
  gold: { name: 'Antique Gold', hex: '#b08d57' },
};

const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export const products: Product[] = [
  {
    id: 'midnight-velvet-coat',
    name: 'Midnight Velvet Coat',
    category: 'Outerwear',
    world: 'vampire-chic',
    price: 129.99,
    originalPrice: 179.99,
    images: ['/images/lookbook-midnight-velvet.jpg', '/images/editorial-midnight-coat.jpg'],
    description:
      'A heavyweight velvet coat cut for those who move between worlds. Liquid drape, satin lining, and a silhouette that swallows the light.',
    details: [
      'Crushed cotton velvet, fully satin-lined',
      'Oversized tailored fit',
      'Concealed hook-and-eye closure',
      'Hand-finished in small batches',
      'Dry clean only',
    ],
    sizes: APPAREL_SIZES,
    colors: [C.obsidian, C.oxblood],
    badge: 'Bestseller',
    featured: true,
  },
  {
    id: 'gothic-rose-dress',
    name: 'Gothic Rose Dress',
    category: 'Dresses',
    world: 'victorian-romance',
    price: 89.99,
    originalPrice: 119.99,
    images: ['/images/lookbook-gothic-rose.jpg'],
    description:
      'A floor-skimming dress embroidered with thorned roses. Romance, but with teeth.',
    details: [
      'Embroidered chiffon over a satin slip',
      'Sweetheart neckline, boned bodice',
      'Concealed back zip',
      'Fully lined',
      'Hand wash cold',
    ],
    sizes: APPAREL_SIZES,
    colors: [C.obsidian, C.blood],
    featured: true,
  },
  {
    id: 'vampire-crown-necklace',
    name: 'Vampire Crown Necklace',
    category: 'Accessories',
    world: 'vampire-chic',
    price: 39.99,
    originalPrice: 59.99,
    images: ['/images/featured-vampire-necklace.jpg'],
    description:
      'A choker-length pendant cast like a fallen crown. Cold to the touch, warm in intent.',
    details: [
      'Antique-finish brass',
      'Garnet-glass centre stone',
      'Adjustable 14–18" chain',
      'Lobster clasp',
      'Nickel-free',
    ],
    sizes: ['One Size'],
    colors: [C.silver, C.gold],
    badge: 'New',
    featured: true,
  },
  {
    id: 'dark-academia-blazer',
    name: 'Dark Academia Blazer',
    category: 'Formal',
    world: 'dark-academia',
    price: 149.99,
    originalPrice: 199.99,
    images: ['/images/lookbook-dark-academia.jpg'],
    description:
      'A structured wool blazer for candlelit libraries and quiet rebellion.',
    details: [
      'Italian wool blend',
      'Structured shoulder, nipped waist',
      'Horn-effect buttons',
      'Twin interior pockets',
      'Dry clean only',
    ],
    sizes: APPAREL_SIZES,
    colors: [C.charcoal, C.obsidian],
    badge: 'New',
    featured: true,
  },
  {
    id: 'shadow-silk-corset',
    name: 'Shadow Silk Corset',
    category: 'Lingerie',
    world: 'vampire-chic',
    price: 79.99,
    originalPrice: 109.99,
    images: ['/images/featured-shadow-corset.jpg'],
    description:
      'A structured silk corset with whisper-thin boning. Architecture for the body.',
    details: [
      'Silk-blend shell, power-mesh lining',
      'Spiral steel boning',
      'Lace-up back, busk front',
      'Adjustable fit',
      'Spot clean only',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [C.obsidian, C.oxblood],
    featured: true,
  },
  {
    id: 'blackthorn-leather-jacket',
    name: 'Blackthorn Leather Jacket',
    category: 'Outerwear',
    world: 'gothic-street',
    price: 189.99,
    originalPrice: 249.99,
    images: ['/images/featured-leather-jacket.jpg'],
    description:
      'A moto jacket in supple blackened leather, hardware like armour.',
    details: [
      'Full-grain lambskin',
      'Asymmetric zip front',
      'Quilted shoulder panels',
      'Zip cuffs and pockets',
      'Wipe clean',
    ],
    sizes: APPAREL_SIZES,
    colors: [C.obsidian],
    badge: 'Bestseller',
    featured: true,
  },
  {
    id: 'raven-wing-cape',
    name: 'Raven Wing Cape',
    category: 'Outerwear',
    world: 'gothic-street',
    price: 159.99,
    originalPrice: 209.99,
    images: ['/images/lookbook-raven-wing.jpg'],
    description:
      'A dramatic caped silhouette with a feather-cut hem. Arrive like an omen.',
    details: [
      'Wool-blend melton',
      'Feathered asymmetric hem',
      'Clasp at the throat',
      'Arm slits for movement',
      'Dry clean only',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [C.obsidian],
    badge: 'Limited',
  },
  {
    id: 'crimson-moonlight-gown',
    name: 'Crimson Moonlight Gown',
    category: 'Dresses',
    world: 'victorian-romance',
    price: 199.99,
    originalPrice: 259.99,
    images: ['/images/lookbook-crimson-gown.jpg'],
    description:
      'A bias-cut gown the colour of a harvest-moon eclipse. Pure occasion.',
    details: [
      'Bias-cut silk-satin',
      'Cowl back',
      'Floor-length with a slight train',
      'Adjustable straps',
      'Dry clean only',
    ],
    sizes: APPAREL_SIZES,
    colors: [C.crimson, C.obsidian],
    badge: 'Bestseller',
  },
  {
    id: 'necromancer-cloak',
    name: "Necromancer's Hooded Cloak",
    category: 'Outerwear',
    world: 'gothic-street',
    price: 179.99,
    originalPrice: 229.99,
    images: ['/images/lookbook-necromancer-cloak.jpg'],
    description:
      'A floor-length hooded cloak with a cavernous hood. For rituals, mundane or otherwise.',
    details: [
      'Heavyweight brushed cotton',
      'Oversized hood',
      'Interior tie and front clasp',
      'Deep side pockets',
      'Machine wash cold',
    ],
    sizes: ['One Size'],
    colors: [C.obsidian, C.ash],
  },
];

/** Products flagged for the "Featured Collection" grid. */
export const featuredProducts = products.filter((p) => p.featured);

/** Ordered set shown in the horizontal Lookbook strip. */
export const lookbookProducts = [
  'midnight-velvet-coat',
  'gothic-rose-dress',
  'dark-academia-blazer',
  'raven-wing-cape',
  'crimson-moonlight-gown',
  'necromancer-cloak',
]
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is Product => Boolean(p));

export function getProduct(slug: string | undefined): Product | undefined {
  return products.find((p) => p.id === slug);
}

export function getWorld(slug: string | undefined): World | undefined {
  return worlds.find((w) => w.slug === slug);
}

export function getProductsByWorld(slug: string): Product[] {
  return products.filter((p) => p.world === slug);
}

/** Other products from the same world, for "You may also like". */
export function getRelatedProducts(product: Product, count = 4): Product[] {
  const sameWorld = products.filter((p) => p.world === product.world && p.id !== product.id);
  const fill = products.filter((p) => p.world !== product.world && p.id !== product.id);
  return [...sameWorld, ...fill].slice(0, count);
}
