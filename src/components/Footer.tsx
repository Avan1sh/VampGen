import { motion } from 'framer-motion';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l6.5 7.5L4 20h2l5.5-6.5L16 20h4l-7-8.5L19 4h-2l-5 6L8 4H4z" />
  </svg>
);

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const ArrowLink = ({ children, href = '#' }: { children: React.ReactNode; href?: string }) => (
  <a
    href={href}
    className="group flex items-center gap-1 font-inter text-sm text-white/40 hover:text-white transition-colors duration-300"
  >
    <span>{children}</span>
    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-crypt border-t border-white/5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={footerVariants}
        className="max-w-7xl mx-auto px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column */}
          <div>
            <h3 className="font-cinzel text-2xl text-ghost mb-3">VAMPGEN</h3>
            <p className="font-inter text-sm text-white/30 mb-6">
              Gothic fashion for the modern soul.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/30 hover:text-blood transition-colors duration-300">
                <InstagramIcon />
              </a>
              <a href="#" className="text-white/30 hover:text-blood transition-colors duration-300">
                <TikTokIcon />
              </a>
              <a href="#" className="text-white/30 hover:text-blood transition-colors duration-300">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Center Column */}
          <div>
            <h4 className="font-inter text-xs uppercase text-white/20 tracking-[0.2em] mb-4">
              Navigate
            </h4>
            <div className="flex flex-col gap-3">
              <ArrowLink href="#hero">Home</ArrowLink>
              <ArrowLink href="#lookbook">Lookbook</ArrowLink>
              <ArrowLink href="#featured">Shop</ArrowLink>
              <ArrowLink href="#worlds">Collections</ArrowLink>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h4 className="font-inter text-xs uppercase text-white/20 tracking-[0.2em] mb-4">
              Info
            </h4>
            <div className="flex flex-col gap-3">
              <ArrowLink>Shipping &amp; Returns</ArrowLink>
              <ArrowLink>Size Guide</ArrowLink>
              <ArrowLink>Contact</ArrowLink>
              <ArrowLink>FAQ</ArrowLink>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-inter text-xs text-white/15">
            &copy; 2025 VAMPGEN. All rights reserved.
          </span>
          <span className="font-inter text-xs text-white/15">
            Designed with &hearts; in the dark
          </span>
        </div>
      </motion.div>
    </footer>
  );
}
