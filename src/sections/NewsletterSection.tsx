import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const titleLetters = 'JOIN THE COVEN'.split('');

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 2000);
    }
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/newsletter-bg.jpg"
          alt="Foggy graveyard at dawn with distant red neon glow"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Grain */}
        <div className="absolute inset-0 grain-overlay opacity-[0.05]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Heading with letter stagger */}
        <motion.h2
          className="font-cinzel text-4xl md:text-5xl text-ghost"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {titleLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                delay: i * 0.04,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-inter text-base text-white/50 mt-4"
        >
          First access to limited drops, exclusive collections, and members-only pricing. No spam. Just darkness.
        </motion.p>

        {/* Email Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="mt-10 flex items-stretch max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-transparent border-b border-white/20 text-white placeholder:text-white/30 px-0 py-3 font-inter text-sm focus:outline-none focus:border-blood transition-colors duration-300"
            required
          />
          <button
            type="submit"
            className="bg-blood text-white font-inter uppercase tracking-[0.2em] text-sm px-8 py-3 hover:bg-dark-blood transition-colors duration-300"
          >
            {submitted ? 'Joined' : 'Join'}
          </button>
        </motion.form>

        {/* Member count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-inter text-xs text-white/20 mt-6"
        >
          1,200+ members already in the dark
        </motion.p>
      </div>
    </section>
  );
}
