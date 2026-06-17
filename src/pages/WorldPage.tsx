import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { getWorld, getProductsByWorld } from '@/data/products';

export default function WorldPage() {
  const { slug } = useParams<{ slug: string }>();
  const world = getWorld(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!world) {
    return (
      <section className="min-h-screen bg-void flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-cinzel text-4xl text-ghost mb-4">No such world</h1>
        <p className="font-inter text-mist mb-8">That collection drifted into the fog.</p>
        <Link
          to="/shop"
          className="border border-blood/40 text-ember px-8 py-3 rounded-full text-xs font-inter uppercase tracking-[0.15em] hover:bg-blood hover:text-white hover:border-blood transition-all duration-400"
        >
          Shop all
        </Link>
      </section>
    );
  }

  const items = getProductsByWorld(world.slug);

  return (
    <div className="bg-void min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden flex items-end">
        <img src={world.image} alt={world.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-black/50 to-black/30" />
        <div className="absolute inset-0 vignette" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 pb-12"
        >
          <nav className="mb-4 font-inter text-xs uppercase tracking-[0.15em] text-white/50 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white/80">{world.name}</span>
          </nav>
          <p className="font-inter text-xs uppercase tracking-[0.3em] text-ember mb-3">{world.tagline}</p>
          <h1
            className="font-cinzel text-ghost"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', letterSpacing: '0.05em' }}
          >
            {world.name}
          </h1>
          <p className="mt-4 max-w-xl font-inter text-sm text-white/60 leading-relaxed">{world.description}</p>
        </motion.div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex items-center justify-between mb-10">
          <span className="font-inter text-xs uppercase tracking-[0.3em] text-mist">
            {items.length} {items.length === 1 ? 'piece' : 'pieces'}
          </span>
          <Link
            to="/shop"
            className="font-inter text-xs uppercase tracking-[0.15em] text-smoke hover:text-ghost transition-colors"
          >
            All collections &rarr;
          </Link>
        </div>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 font-inter text-mist">This collection is being conjured.</div>
        )}
      </section>
    </div>
  );
}
