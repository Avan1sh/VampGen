import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { worlds, type World } from '@/data/products';

const titleLetters = 'SHOP BY WORLD'.split('');

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
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

export default function ShopByWorldSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="worlds" className="bg-void py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Ghostly Section Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-4 overflow-hidden"
        >
          <h2 className="font-cinzel text-white/15 text-7xl lg:text-8xl select-none">
            {titleLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {letter === ' ' ? ' ' : letter}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center font-inter text-sm uppercase tracking-[0.2em] text-white/50 mb-12"
        >
          Enter your aesthetic
        </motion.p>

        {/* Category Cards Grid */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {worlds.map((world) => (
            <CategoryCard key={world.slug} world={world} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({ world }: { world: World }) {
  return (
    <motion.div variants={cardVariants}>
      <Link
        to={`/world/${world.slug}`}
        className="group relative block aspect-[3/4] min-h-[400px] overflow-hidden rounded-lg"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={world.image}
            alt={world.name}
            className="w-full h-full object-cover grayscale-[60%] brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-[0.7] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Red left border on hover */}
        <div className="absolute bottom-0 left-0 w-0.5 bg-blood h-0 group-hover:h-full transition-all duration-400 ease-out" />

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h3 className="font-cinzel text-xl text-ghost mb-1">{world.name}</h3>
          <p className="font-inter text-xs text-white/40 uppercase tracking-wider flex items-center gap-2">
            {world.tagline}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
