import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { Minus, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { getProduct, getRelatedProducts, getWorld } from '@/data/products';
import { formatPrice, discountPercent, type Product } from '@/types/product';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!product) {
    return (
      <section className="min-h-screen bg-void flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-cinzel text-4xl text-ghost mb-4">Lost to the dark</h1>
        <p className="font-inter text-mist mb-8">We couldn't find that piece.</p>
        <Link
          to="/#featured"
          className="border border-blood/40 text-ember px-8 py-3 rounded-full text-xs font-inter uppercase tracking-[0.15em] hover:bg-blood hover:text-white hover:border-blood transition-all duration-400"
        >
          Back to the collection
        </Link>
      </section>
    );
  }

  // key resets variant state when navigating between products
  return <ProductView key={product.id} product={product} />;
}

function ProductView({ product }: { product: Product }) {
  const { addItem } = useCart();
  const world = getWorld(product.world);
  const related = getRelatedProducts(product, 4);
  const discount = discountPercent(product.price, product.originalPrice);
  const isOneSize = product.sizes.length === 1;

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | undefined>(isOneSize ? product.sizes[0] : undefined);
  const [color, setColor] = useState(product.colors[0]?.name);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (!size) {
      toast.error('Please select a size');
      return;
    }
    addItem(product, { size, color, quantity });
  };

  return (
    <section className="relative min-h-screen bg-void pt-28 pb-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 font-inter text-xs uppercase tracking-[0.15em] text-smoke flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-ghost transition-colors">Home</Link>
          <span>/</span>
          {world && (
            <>
              <Link to={`/world/${world.slug}`} className="hover:text-ghost transition-colors">{world.name}</Link>
              <span>/</span>
            </>
          )}
          <span className="text-mist">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="relative overflow-hidden rounded-lg bg-crypt border border-white/5">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-[60vh] lg:h-[75vh] object-cover"
              />
              {discount && (
                <span className="absolute top-4 left-4 bg-blood text-white text-xs font-inter uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`w-20 h-24 rounded-md overflow-hidden border transition-colors ${
                      i === activeImage ? 'border-blood' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="font-inter text-xs uppercase tracking-[0.25em] text-ember">{product.category}</span>
            <h1 className="font-cinzel text-4xl lg:text-5xl text-ghost mt-3 leading-tight">{product.name}</h1>

            <div className="mt-5 flex items-center gap-4 flex-wrap">
              <span className="font-inter text-3xl text-ghost font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="font-inter text-xl text-white/30 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {discount && (
                <span className="font-inter text-xs uppercase tracking-[0.15em] text-ember border border-blood/40 rounded-full px-3 py-1">
                  Save {discount}%
                </span>
              )}
            </div>

            <div className="mt-6 h-px w-16 bg-blood/50" />
            <p className="mt-6 font-inter text-base text-white/60 leading-relaxed">{product.description}</p>

            {/* Colour */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-inter text-xs uppercase tracking-[0.2em] text-mist">Colour</span>
                <span className="font-inter text-xs text-white/40">{color}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    title={c.name}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      color === c.name ? 'border-blood scale-110' : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-inter text-xs uppercase tracking-[0.2em] text-mist">Size</span>
                <button
                  onClick={() => toast('Size guide coming soon')}
                  className="font-inter text-xs text-white/40 hover:text-ghost underline underline-offset-4"
                >
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-[3rem] px-4 h-11 rounded-md border font-inter text-sm transition-all ${
                      size === s
                        ? 'border-blood bg-blood/10 text-ghost'
                        : 'border-white/15 text-mist hover:border-white/40 hover:text-ghost'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-white/15 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-mist hover:text-ghost transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-inter text-ghost tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-mist hover:text-ghost transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 bg-blood text-white rounded-full py-3.5 font-inter text-sm uppercase tracking-[0.15em] hover:bg-dark-blood hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300"
              >
                Add to Bag
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 font-inter text-xs text-smoke">
              <Check className="w-3.5 h-3.5 text-ember" /> Free shipping over $150 · 30-day returns
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible className="mt-8 border-t border-white/10">
              <AccordionItem value="details" className="border-white/10">
                <AccordionTrigger className="font-inter text-sm text-ghost hover:no-underline">
                  Details &amp; Care
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 font-inter text-sm text-white/50">
                    {product.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="text-blood">—</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-white/10">
                <AccordionTrigger className="font-inter text-sm text-ghost hover:no-underline">
                  Shipping &amp; Returns
                </AccordionTrigger>
                <AccordionContent>
                  <p className="font-inter text-sm text-white/50 leading-relaxed">
                    Free standard shipping on orders over $150, with express options at checkout. Returns
                    accepted within 30 days in original, unworn condition.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-cinzel text-3xl text-ghost mb-8">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
