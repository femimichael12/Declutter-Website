import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
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
const STORAGE_KEY = 'demo-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const ids: string[] = raw ? JSON.parse(raw) : [];
        setItems(ids.map((id) => {
          const product = mockProducts.find((p) => p.id === id);
          return { id: `wl-${id}`, user_id: 'demo', product_id: id, created_at: new Date().toISOString(), product };
        }).filter((i) => i.product) as WishlistItem[]);
      } catch { /* ignore */ }
      setLoading(false);
      return;
    }
    if (!session?.user?.id) { setItems([]); setLoading(false); return; }
    (async () => {
      const { data } = await supabase!.from('wishlists').select('*, product:products(*)').eq('user_id', session.user.id).order('created_at', { ascending: false });
      setItems((data as WishlistItem[]) ?? []);
      setLoading(false);
    })();
  }, [session]);

  async function toggle(product: Product) {
    if (!isSupabaseConfigured || !supabase) {
      setItems((prev) => {
        const exists = prev.some((i) => i.product_id === product.id);
        let next: WishlistItem[];
        if (exists) next = prev.filter((i) => i.product_id !== product.id);
        else next = [{ id: `wl-${product.id}`, user_id: 'demo', product_id: product.id, created_at: new Date().toISOString(), product }, ...prev];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next.map((i) => i.product_id)));
        return next;
      });
      return;
    }
    if (!session?.user?.id) return;
    const existing = items.find((i) => i.product_id === product.id);
    if (existing) {
      await supabase.from('wishlists').delete().eq('id', existing.id);
      setItems((prev) => prev.filter((i) => i.id !== existing.id));
    } else {
      const { data } = await supabase.from('wishlists').insert({ user_id: session.user.id, product_id: product.id }).select('*, product:products(*)').maybeSingle();
      if (data) setItems((prev) => [data as WishlistItem, ...prev]);
    }
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
