import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/types/product';

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartPage() {
  const { items, subtotal, totalItems, updateQuantity, removeItem, clearCart } = useCart();

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <section className="relative min-h-screen bg-void pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h1
            className="font-cinzel text-ghost"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.05em' }}
          >
            YOUR BAG
          </h1>
          <div className="mt-3 flex items-center gap-4">
            <div className="h-px w-16 bg-blood/50" />
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-mist">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
        </motion.div>

        {items.length === 0 ? (
          <EmptyBag />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-5 py-6 border-b border-white/5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-ember">
                          {item.category}
                        </span>
                        <h3 className="font-inter font-semibold text-ghost text-lg mt-1">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-smoke hover:text-blood transition-colors duration-300 p-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-4">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-white/10 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-mist hover:text-ghost transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-inter text-sm text-ghost tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-mist hover:text-ghost transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-inter text-lg text-ghost font-bold tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="font-inter text-xs text-smoke mt-0.5">
                            {formatPrice(item.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Continue shopping / clear */}
              <div className="flex items-center justify-between mt-8">
                <Link
                  to="/#featured"
                  className="group inline-flex items-center gap-2 font-inter text-sm text-mist hover:text-ghost transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="font-inter text-xs uppercase tracking-[0.15em] text-smoke hover:text-blood transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Order summary */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-28 h-fit bg-crypt border border-white/5 rounded-lg p-8"
            >
              <h2 className="font-cinzel text-2xl text-ghost mb-6">Summary</h2>

              <div className="flex flex-col gap-4 font-inter text-sm">
                <div className="flex justify-between text-mist">
                  <span>Subtotal</span>
                  <span className="text-ghost tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-mist">
                  <span>Shipping</span>
                  <span className="text-ghost tabular-nums">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-smoke">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
                  </p>
                )}
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between items-baseline">
                  <span className="font-inter text-base text-ghost">Total</span>
                  <span className="font-inter text-2xl text-ghost font-bold tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => toast.success('Checkout is coming soon — thanks for trying VAMPGEN.')}
                className="mt-8 w-full bg-blood text-white rounded-full py-3.5 font-inter text-sm uppercase tracking-[0.15em] hover:bg-dark-blood hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300"
              >
                Proceed to Checkout
              </button>

              <p className="mt-4 text-center font-inter text-[11px] text-smoke">
                Secure checkout &middot; Free returns within 30 days
              </p>
            </motion.aside>
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyBag() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center py-24"
    >
      <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-8">
        <ShoppingBag className="w-8 h-8 text-smoke" />
      </div>
      <h2 className="font-cinzel text-3xl text-ghost mb-3">Your bag is empty</h2>
      <p className="font-inter text-sm text-mist max-w-sm mb-8">
        Nothing dwells here yet. Venture into the collection and find something worthy of the dark.
      </p>
      <Link
        to="/#featured"
        className="inline-flex items-center gap-2 border border-blood/40 text-ember px-8 py-3 rounded-full text-xs font-inter uppercase tracking-[0.15em] hover:bg-blood hover:text-white hover:border-blood hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-400"
      >
        Explore the Collection
      </Link>
    </motion.div>
  );
}
