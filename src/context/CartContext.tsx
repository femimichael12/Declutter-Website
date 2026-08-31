import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { mockProducts } from '@/lib/mockData';
import type { CartItem, Product } from '@/types';

interface CartContextValue {
  items: CartItem[];
  count: number;
  loading: boolean;
  addItem: (product: Product, qty?: number) => Promise<void>;
  updateQty: (itemId: string, qty: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  saveForLater: (itemId: string) => Promise<void>;
  moveToCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'buyandselloutlets_cart';

function loadCart(userId?: string): CartItem[] {
  try {
    const key = userId ? `${STORAGE_KEY}_${userId}` : `${STORAGE_KEY}_guest`;
    const raw = localStorage.getItem(key) || localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[], userId?: string) {
  try {
    const key = userId ? `${STORAGE_KEY}_${userId}` : `${STORAGE_KEY}_guest`;
    localStorage.setItem(key, JSON.stringify(items));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setItems(loadCart(session?.user?.id));
    setLoading(false);
  }, [session]);

  async function addItem(product: Product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.id && !i.saved_for_later);
      let next: CartItem[];
      if (existing) {
        next = prev.map((i) => (i.id === existing.id ? { ...i, quantity: i.quantity + qty } : i));
      } else {
        next = [
          {
            id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            cart_id: session?.user?.id || 'guest',
            product_id: product.id,
            quantity: qty,
            saved_for_later: false,
            created_at: new Date().toISOString(),
            product,
          },
          ...prev,
        ];
      }
      saveCart(next, session?.user?.id);
      return next;
    });
  }

  async function updateQty(itemId: string, qty: number) {
    if (qty < 1) return;
    setItems((prev) => {
      const next = prev.map((i) => (i.id === itemId ? { ...i, quantity: qty } : i));
      saveCart(next, session?.user?.id);
      return next;
    });
  }

  async function removeItem(itemId: string) {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== itemId);
      saveCart(next, session?.user?.id);
      return next;
    });
  }

  async function saveForLater(itemId: string) {
    setItems((prev) => {
      const next = prev.map((i) => (i.id === itemId ? { ...i, saved_for_later: true } : i));
      saveCart(next, session?.user?.id);
      return next;
    });
  }

  async function moveToCart(itemId: string) {
    setItems((prev) => {
      const next = prev.map((i) => (i.id === itemId ? { ...i, saved_for_later: false } : i));
      saveCart(next, session?.user?.id);
      return next;
    });
  }

  async function clearCart() {
    setItems((prev) => {
      const next = prev.filter((i) => i.saved_for_later);
      saveCart(next, session?.user?.id);
      return next;
    });
  }

  const activeItems = items.filter((i) => !i.saved_for_later);
  const count = activeItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, loading, addItem, updateQty, removeItem, saveForLater, moveToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export { mockProducts };
