import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatPrice, discountPercent, type Product } from '@/types/product';

/**
 * Reusable product grid card. Uses a stretched-link overlay so the whole card
 * navigates to the PDP while the "Add to Bag" button stays independently clickable.
 */
export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const discount = discountPercent(product.price, product.originalPrice);
  const defaultSize = product.sizes.includes('M') ? 'M' : product.sizes[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-crypt border border-white/5 rounded-lg overflow-hidden"
    >
      {/* Stretched link covers the card for navigation */}
      <Link
        to={`/product/${product.id}`}
        aria-label={`View ${product.name}`}
        className="absolute inset-0 z-10"
      />

      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-72 lg:h-80 object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-crypt via-transparent to-transparent" />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-blood/90 text-white text-[10px] font-inter uppercase tracking-[0.15em] px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-black/70 text-ember text-[10px] font-inter uppercase tracking-[0.15em] px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      <div className="relative p-5">
        <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-ember">
          {product.category}
        </span>
        <h3 className="font-inter font-semibold text-ghost mt-1 text-lg">{product.name}</h3>
        <div className="mt-2 w-8 h-px bg-blood group-hover:w-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

        <div className="mt-3 flex items-center gap-3">
          <span className="font-inter text-lg text-white/90 font-bold">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="font-inter text-sm text-white/30 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          onClick={() => addItem(product, { size: defaultSize, color: product.colors[0]?.name })}
          className="relative z-20 mt-4 w-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-blood text-white rounded-full py-2.5 text-sm font-inter hover:bg-dark-blood"
        >
          Add to Bag
        </button>
      </div>
    </motion.div>
  );
}
