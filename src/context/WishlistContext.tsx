import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { mockProducts } from '@/lib/mockData';
import type { WishlistItem, Product } from '@/types';

interface WishlistContextValue {
  items: WishlistItem[];
  ids: Set<string>;
  loading: boolean;
  toggle: (product: Product) => Promise<void>;
  has: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = 'buyandselloutlets_wishlist';

function loadWishlist(userId?: string): WishlistItem[] {
  try {
    const key = userId ? `${STORAGE_KEY}_${userId}` : `${STORAGE_KEY}_guest`;
    const raw = localStorage.getItem(key) || localStorage.getItem(STORAGE_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    return ids
      .map((id) => {
        const product = mockProducts.find((p) => p.id === id);
        return {
          id: `wl-${id}`,
          user_id: userId || 'guest',
          product_id: id,
          created_at: new Date().toISOString(),
          product,
        };
      })
      .filter((i) => i.product) as WishlistItem[];
  } catch {
    return [];
  }
}

function saveWishlist(items: WishlistItem[], userId?: string) {
  try {
    const key = userId ? `${STORAGE_KEY}_${userId}` : `${STORAGE_KEY}_guest`;
    const ids = items.map((i) => i.product_id);
    localStorage.setItem(key, JSON.stringify(ids));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setItems(loadWishlist(session?.user?.id));
    setLoading(false);
  }, [session]);

  async function toggle(product: Product) {
    setItems((prev) => {
      const exists = prev.some((i) => i.product_id === product.id);
      let next: WishlistItem[];
      if (exists) {
        next = prev.filter((i) => i.product_id !== product.id);
      } else {
        next = [
          {
            id: `wl-${product.id}`,
            user_id: session?.user?.id || 'guest',
            product_id: product.id,
            created_at: new Date().toISOString(),
            product,
          },
          ...prev,
        ];
      }
      saveWishlist(next, session?.user?.id);
      return next;
    });
  }

  const ids = new Set(items.map((i) => i.product_id));
  const has = (productId: string) => ids.has(productId);

  return (
    <WishlistContext.Provider value={{ items, ids, loading, toggle, has }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
