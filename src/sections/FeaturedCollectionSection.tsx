import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { featuredProducts } from '@/data/products';
import { formatPrice, type Product } from '@/types/product';

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
    transition: { staggerChildren: 0.12 },
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

  // Asymmetric layout: large, [standard, standard], [standard, standard], large
  const [a, b, c, d, e, f] = featuredProducts.slice(0, 6);

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
            <ProductCard product={a} large />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProductCard product={b} />
              <ProductCard product={c} />
            </div>
          </div>

          {/* Row 2: 2 standard left + Large right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
              <ProductCard product={d} />
              <ProductCard product={e} />
            </div>
            <div className="order-1 lg:order-2">
              <ProductCard product={f} large />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product, large = false }: { product: Product; large?: boolean }) {
  const { addItem } = useCart();
  const defaultSize = product.sizes.includes('M') ? 'M' : product.sizes[0];

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative bg-crypt border border-white/5 rounded-lg overflow-hidden ${
        large ? 'row-span-2' : ''
      }`}
    >
      {/* Stretched link for navigation */}
      <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`} className="absolute inset-0 z-10" />

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
            large ? 'h-[24rem] lg:h-[32rem]' : 'h-64 lg:h-80'
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-crypt via-transparent to-transparent" />
      </div>

      {/* Product Info */}
      <div className="relative p-6">
        <span className="font-inter text-xs uppercase tracking-[0.2em] text-ember">{product.category}</span>

        <h3 className={`font-inter font-semibold text-ghost mt-2 ${large ? 'text-2xl' : 'text-xl'}`}>
          {product.name}
        </h3>

        <div className="mt-2 w-8 h-px bg-blood group-hover:w-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

        <div className="mt-3 flex items-center gap-3">
          <span className="font-inter text-lg text-white/90 font-bold">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="font-inter text-lg text-white/30 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Bag button - appears on hover */}
        <div className="mt-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <button
            onClick={() => addItem(product, { size: defaultSize, color: product.colors[0]?.name })}
            className="relative z-20 bg-blood text-white rounded-full px-6 py-2 text-sm font-inter hover:bg-dark-blood transition-colors duration-300"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
}
