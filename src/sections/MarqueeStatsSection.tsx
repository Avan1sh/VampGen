import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const marqueeItems = [
  '200+ GOTHIC PIECES',
  '8 CURATED COLLECTIONS',
  '25% AVG SAVINGS',
  '1.2K+ DARK SOULS',
  'FREE SHIPPING OVER $99',
  'LIMITED DROPS WEEKLY',
];

export default function MarqueeStatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full py-6 bg-crimson-abyss/80 border-y border-blood/20 overflow-hidden"
    >
      <div className="group">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {/* Duplicate the items for seamless loop */}
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 flex items-center gap-6 px-6 font-inter text-sm uppercase tracking-[0.15em] text-red-200/80 group-hover:text-white transition-colors duration-300"
            >
              {item}
              <span className="text-blood/40">&#9670;</span>
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
