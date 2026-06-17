import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { toast } from 'sonner';
import type { CartItem, Product } from '@/types/product';

const STORAGE_KEY = 'vampgen-cart-v2';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; key: string }
  | { type: 'SET_QTY'; key: string; quantity: number }
  | { type: 'CLEAR' };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.key === action.item.key);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.key === action.item.key ? { ...i, quantity: i.quantity + action.item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.key !== action.key) };
    case 'SET_QTY':
      return {
        items: state.items
          .map((i) => (i.key === action.key ? { ...i, quantity: action.quantity } : i))
          .filter((i) => i.quantity > 0),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

// Read persisted cart synchronously so items are present on first paint.
function init(): CartState {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return { items: raw ? (JSON.parse(raw) as CartItem[]) : [] };
  } catch {
    return { items: [] };
  }
}

export interface AddToCartOptions {
  size?: string;
  color?: string;
  quantity?: number;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (product: Product, options?: AddToCartOptions) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return {
      items: state.items,
      totalItems,
      subtotal,
      addItem: (product, options) => {
        const { size, color, quantity = 1 } = options ?? {};
        const key = `${product.id}__${size ?? ''}__${color ?? ''}`;
        dispatch({
          type: 'ADD',
          item: {
            key,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size,
            color,
            quantity,
          },
        });
        toast.success(`${product.name} added to your bag`);
      },
      removeItem: (key) => dispatch({ type: 'REMOVE', key }),
      updateQuantity: (key, quantity) => dispatch({ type: 'SET_QTY', key, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
