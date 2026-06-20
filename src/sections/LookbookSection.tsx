import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { lookbookProducts } from '@/data/products';
import { formatPrice, type Product } from '@/types/product';

export default function LookbookSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Translate the track exactly far enough to reveal its final card.
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // Measure the real overflow so the scroll-driven effect is correct at any
  // screen width (phone, laptop or ultra-wide) — no breakpoint fallback.
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

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

      {/* Tall container drives the scroll; the track is pinned and slides sideways */}
      <div ref={containerRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 px-6 lg:px-24 will-change-transform"
          >
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
