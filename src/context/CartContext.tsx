import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { toast } from 'sonner';
import type { CartItem, Product } from '@/types/product';

const STORAGE_KEY = 'vampgen-cart';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: string }
  | { type: 'SET_QTY'; id: string; quantity: number }
  | { type: 'CLEAR' };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.product, quantity: 1 }] };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.id) };
    case 'SET_QTY':
      return {
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, quantity: action.quantity } : i))
          .filter((i) => i.quantity > 0),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

// Read persisted cart synchronously so items are present on first paint
// (avoids the empty-then-hydrate flash and the storage-overwrite race).
function init(): CartState {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return { items: raw ? (JSON.parse(raw) as CartItem[]) : [] };
  } catch {
    return { items: [] };
  }
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
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
      addItem: (product) => {
        dispatch({ type: 'ADD', product });
        toast.success(`${product.name} added to your bag`);
      },
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      updateQuantity: (id, quantity) => dispatch({ type: 'SET_QTY', id, quantity }),
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
