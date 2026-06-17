import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { parsePrice } from '@/types/product';

const products = [
  {
    id: 'midnight-velvet-coat',
    name: 'Midnight Velvet Coat',
    category: 'Outerwear',
    price: '$129.99',
    originalPrice: '$179.99',
    image: '/images/lookbook-midnight-velvet.jpg',
    large: true,
  },
  {
    id: 'gothic-rose-dress',
    name: 'Gothic Rose Dress',
    category: 'Dresses',
    price: '$89.99',
    originalPrice: '$119.99',
    image: '/images/lookbook-gothic-rose.jpg',
    large: false,
  },
  {
    id: 'vampire-crown-necklace',
    name: 'Vampire Crown Necklace',
    category: 'Accessories',
    price: '$39.99',
    originalPrice: '$59.99',
    image: '/images/featured-vampire-necklace.jpg',
    large: false,
  },
  {
    id: 'dark-academia-blazer',
    name: 'Dark Academia Blazer',
    category: 'Formal',
    price: '$149.99',
    originalPrice: '$199.99',
    image: '/images/lookbook-dark-academia.jpg',
    large: false,
  },
  {
    id: 'shadow-silk-corset',
    name: 'Shadow Silk Corset',
    category: 'Lingerie',
    price: '$79.99',
    originalPrice: '$109.99',
    image: '/images/featured-shadow-corset.jpg',
    large: false,
  },
  {
    id: 'blackthorn-leather-jacket',
    name: 'Blackthorn Leather Jacket',
    category: 'Outerwear',
    price: '$189.99',
    originalPrice: '$249.99',
    image: '/images/featured-leather-jacket.jpg',
    large: true,
  },
];

const headingVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function FeaturedCollectionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Split products for asymmetric layout
  const row1Left = products[0]; // Large
  const row1Right = [products[1], products[2]]; // Standard x2
  const row2Left = [products[3], products[4]]; // Standard x2
  const row2Right = products[5]; // Large

  return (
    <section id="featured" className="bg-void py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 overflow-hidden"
        >
          <motion.h2
            variants={headingVariants}
            className="font-cinzel text-ghost"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 400, letterSpacing: '0.05em' }}
          >
            FEATURED
          </motion.h2>
          <div className="flex items-center gap-0">
            <motion.h2
              variants={slideFromRight}
              className="font-cinzel text-ghost"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 400, letterSpacing: '0.05em' }}
            >
              COLLECTION
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-blood/30 flex-1 ml-6 origin-left"
            />
          </div>
        </motion.div>

        {/* Asymmetric Grid */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-6"
        >
          {/* Row 1: Large left + 2 standard right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductCard product={row1Left} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {row1Right.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          </div>

          {/* Row 2: 2 standard left + Large right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
              {row2Left.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <ProductCard product={row2Right} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
}: {
  product: (typeof products)[0];
}) {
  const { addItem } = useCart();

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative bg-crypt border border-white/5 rounded-lg overflow-hidden ${
        product.large ? 'row-span-2' : ''
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
            product.large ? 'h-[24rem] lg:h-[32rem]' : 'h-64 lg:h-80'
          }`}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-crypt via-transparent to-transparent" />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <span className="font-inter text-xs uppercase tracking-[0.2em] text-ember">
          {product.category}
        </span>

        <h3
          className={`font-inter font-semibold text-ghost mt-2 ${
            product.large ? 'text-2xl' : 'text-xl'
          }`}
        >
          {product.name}
        </h3>

        {/* Red underline */}
        <div className="mt-2 w-8 h-px bg-blood group-hover:w-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

        <div className="mt-3 flex items-center gap-3">
          <span className="font-inter text-lg text-white/90 font-bold">
            {product.price}
          </span>
          <span className="font-inter text-lg text-white/30 line-through">
            {product.originalPrice}
          </span>
        </div>

        {/* Add to Bag button - appears on hover */}
        <div className="mt-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                category: product.category,
                image: product.image,
                price: parsePrice(product.price),
                originalPrice: parsePrice(product.originalPrice),
              })
            }
            className="bg-blood text-white rounded-full px-6 py-2 text-sm font-inter hover:bg-dark-blood transition-colors duration-300"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
}
