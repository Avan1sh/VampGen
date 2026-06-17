import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useCart } from '@/context/CartContext';

interface NavLinkDef {
  name: string;
  /** In-page hash target on the home route */
  href?: string;
  /** Dedicated route */
  to?: string;
}

const navLinks: NavLinkDef[] = [
  { name: 'Home', href: '#hero' },
  { name: 'Lookbook', href: '#lookbook' },
  { name: 'Shop', to: '/shop' },
  { name: 'Collections', href: '#worlds' },
];

const BatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60">
    <path d="M12 4C8 4 4 7 2 12c2-1 4-1 5.5.5C9 11 10.5 11 12 13c1.5-2 3-2 4.5-.5C18 11 20 11 22 12c-2-5-6-8-10-8z" />
    <path d="M8 14c-1 2-1 4 .5 6M16 14c1 2 1 4-.5 6" />
  </svg>
);

export default function Navbar() {
  const isScrolled = useScrollPosition(50);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  const isHome = location.pathname === '/';

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleHashClick = (e: React.MouseEvent, href: string, name: string) => {
    e.preventDefault();
    setActiveSection(name);
    setMobileOpen(false);
    // If we're on another route, go home first — HomePage scrolls to the hash on mount.
    if (!isHome) {
      navigate('/' + href);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isActive = (link: NavLinkDef) =>
    link.to ? location.pathname.startsWith(link.to) : isHome && activeSection === link.name;

  const linkClass = (active: boolean) =>
    `nav-link-underline font-inter text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
      active ? 'text-white' : 'text-white/60 hover:text-white'
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-blood/15'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => { setActiveSection('Home'); setMobileOpen(false); }}
            className="flex items-center gap-2 group"
          >
            <BatIcon />
            <span className="font-cinzel text-ghost text-lg tracking-[0.15em] uppercase transition-all duration-300 group-hover:[text-shadow:0_0_20px_rgba(220,38,38,0.4)]">
              VAMPGEN
            </span>
          </Link>

          {/* Center Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass(isActive(link))}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleHashClick(e, link.href!, link.name)}
                  className={linkClass(isActive(link))}
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 lg:gap-3">
            {/* Cart */}
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              aria-label={`Cart, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
              className="relative p-2 text-white/70 hover:text-white transition-colors duration-300"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-blood text-white text-[10px] font-inter font-semibold rounded-full"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Shop CTA - Desktop */}
            <Link
              to="/shop"
              onClick={() => setMobileOpen(false)}
              className="hidden lg:inline-flex items-center border border-blood/40 text-ember px-6 py-2 rounded-full text-xs font-inter uppercase tracking-[0.15em] transition-all duration-400 hover:bg-blood hover:text-white hover:border-blood hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
            >
              Shop Now
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Open menu"
            >
              <span className="w-6 h-px bg-white/80" />
              <span className="w-6 h-px bg-white/80" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl"
              aria-label="Close menu"
            >
              &#10005;
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => {
                const cls = 'font-cinzel text-4xl text-white/80 hover:text-blood transition-colors duration-300';
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {link.to ? (
                      <Link to={link.to} onClick={() => setMobileOpen(false)} className={cls}>
                        {link.name}
                      </Link>
                    ) : (
                      <a href={link.href} onClick={(e) => handleHashClick(e, link.href!, link.name)} className={cls}>
                        {link.name}
                      </a>
                    )}
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 font-cinzel text-4xl text-white/80 hover:text-blood transition-colors duration-300"
                >
                  Bag{totalItems > 0 ? ` (${totalItems})` : ''}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
