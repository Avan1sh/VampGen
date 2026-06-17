import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const CATEGORIES = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A–Z' },
];

export default function ShopPage() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const visible = useMemo(() => {
    const list = category === 'All' ? [...products] : products.filter((p) => p.category === category);
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }
  }, [category, sort]);

  return (
    <section className="relative min-h-screen bg-void pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h1
            className="font-cinzel text-ghost"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.05em' }}
          >
            SHOP ALL
          </h1>
          <div className="mt-3 flex items-center gap-4">
            <div className="h-px w-16 bg-blood/50" />
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-mist">
              {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
            </span>
          </div>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10 pb-6 border-b border-white/5">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full font-inter text-xs uppercase tracking-[0.15em] border transition-all ${
                  category === c
                    ? 'bg-blood text-white border-blood'
                    : 'border-white/15 text-mist hover:border-white/40 hover:text-ghost'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <label htmlFor="sort" className="font-inter text-xs uppercase tracking-[0.15em] text-smoke">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-crypt border border-white/15 rounded-full px-4 py-2 font-inter text-xs text-ghost focus:outline-none focus:border-blood/60"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value} className="bg-crypt text-ghost">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 font-inter text-mist">No pieces match this filter.</div>
        )}
      </div>
    </section>
  );
}
