import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const titleLetters = 'VAMPGEN'.split('');

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Fog-drenched gothic cathedral landscape at twilight"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 vignette z-10" />

      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
        {/* VAMPGEN Title */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex"
        >
          {titleLetters.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="font-cinzel text-stroke select-none"
              style={{
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                fontWeight: 400,
                letterSpacing: '0.05em',
                animationDelay: `${titleLetters.length * 0.06 + 0.5}s`,
              }}
            >
              <span className="animate-breathe inline-block">{letter}</span>
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: titleLetters.length * 0.06 + 0.6,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-6 font-inter text-sm uppercase tracking-[0.3em] text-white/40"
        >
          Embrace the Darkness
        </motion.p>

        {/* Hairline Rule */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{
            delay: titleLetters.length * 0.06 + 0.8,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-4 h-px bg-blood/50"
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            className="w-1 h-1 bg-white/50 rounded-full"
          />
        </div>
        <span className="font-inter text-[10px] uppercase tracking-[0.3em] text-white/20">
          Scroll
        </span>
      </motion.div>

      {/* Bottom gradient dissolve */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent z-10" />
    </section>
  );
}
