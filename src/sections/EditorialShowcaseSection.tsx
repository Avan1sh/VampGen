import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function EditorialShowcaseSection() {
  const { addItem } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      id="editorial"
      ref={sectionRef}
      className="relative bg-void min-h-screen"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-screen">
        {/* Left - Hero Image */}
        <div className="relative h-[50vh] lg:h-auto overflow-hidden">
          <motion.div style={{ y: imageY }} className="absolute inset-0 lg:h-[120%]">
            <img
              src="/images/editorial-midnight-coat.jpg"
              alt="Model wearing Midnight Velvet Coat in dramatic chiaroscuro lighting"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
          {/* Grain overlay */}
          <div className="absolute inset-0 grain-overlay opacity-[0.03]" />
        </div>

        {/* Right - Product Details */}
        <div className="relative flex flex-col justify-center p-8 lg:p-16">
          {/* Index Number */}
          <span className="absolute top-8 right-8 font-cinzel text-6xl text-blood/30 select-none">
            04
          </span>

          <div className="space-y-6">
            {/* Category */}
            <motion.p
              custom={0}
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-inter text-xs uppercase tracking-[0.2em] text-ember"
            >
              Outerwear
            </motion.p>

            {/* Product Name */}
            <motion.h2
              custom={1}
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-cinzel text-4xl text-ghost leading-tight"
            >
              Midnight Velvet Coat
            </motion.h2>

            {/* Red Line */}
            <motion.div
              custom={2}
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: 48 } : { width: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-px bg-blood"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              custom={3}
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-4"
            >
              <p className="font-inter text-base text-white/60 leading-relaxed">
                Luxurious velvet coat crafted for those who walk between worlds. Heavy drape,
                satin lining, hand-finished in midnight black.
              </p>
              <p className="font-inter text-base text-white/60 leading-relaxed">
                Designed for the ones who make the darkness look elegant.
              </p>
            </motion.div>

            {/* Price */}
            <motion.div
              custom={4}
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex items-center gap-4"
            >
              <span className="font-inter text-3xl font-bold text-white">
                $129.99
              </span>
              <span className="font-inter text-xl text-white/30 line-through">
                $179.99
              </span>
            </motion.div>

            {/* Buttons */}
            <motion.div
              custom={5}
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() =>
                  addItem({
                    id: 'midnight-velvet-coat',
                    name: 'Midnight Velvet Coat',
                    category: 'Outerwear',
                    image: '/images/lookbook-midnight-velvet.jpg',
                    price: 129.99,
                    originalPrice: 179.99,
                  })
                }
                className="bg-blood text-white rounded-full px-8 py-3 font-inter text-sm hover:bg-dark-blood hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all duration-300"
              >
                Add to Bag
              </button>
              <button className="border border-white/20 text-white/70 rounded-full px-8 py-3 font-inter text-sm hover:border-white/50 hover:text-white transition-all duration-300">
                View Details
              </button>
            </motion.div>

            {/* Shipping info */}
            <motion.p
              custom={6}
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-inter text-xs text-white/30 pt-2"
            >
              Free shipping &middot; 30-day returns
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
