import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { lookbookProducts } from '@/data/products';
import { formatPrice, type Product } from '@/types/product';

export default function LookbookSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Desktop: map scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  return (
    <section id="lookbook" className="relative bg-void">
      {/* Section Header - Vertical on left edge */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2">
        <span className="font-inter text-xs text-white/30 tracking-[0.2em] uppercase">01</span>
        <span
          className="font-cinzel text-white/20 tracking-[0.15em] uppercase text-lg"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Lookbook
        </span>
      </div>

      {/* Sticky Scroll Container */}
      <div ref={containerRef} className="relative h-[300vh] lg:h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          {/* Mobile: horizontal overflow scroll */}
          <div className="lg:hidden w-full overflow-x-auto scrollbar-hide px-6 py-16">
            <div className="flex gap-6" style={{ width: 'max-content' }}>
              {lookbookProducts.map((product) => (
                <LookbookCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Desktop: scroll-driven horizontal strip */}
          <motion.div ref={stripRef} style={{ x }} className="hidden lg:flex gap-6 px-24">
            {lookbookProducts.map((product) => (
              <LookbookCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LookbookCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative block flex-shrink-0 w-[280px] lg:w-[320px] h-[65vh] lg:h-[70vh] border border-white/[0.08] overflow-hidden"
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Red tint overlay on hover */}
        <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Product Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <p className="font-inter text-xs text-white/50 group-hover:text-white transition-colors duration-300 uppercase tracking-wider">
          {product.name}
        </p>
        <p className="font-inter text-sm text-white/80 mt-1 font-medium">{formatPrice(product.price)}</p>
      </div>

      {/* Red bottom line on hover */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-blood w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
    </Link>
  );
}
