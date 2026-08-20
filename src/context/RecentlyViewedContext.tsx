import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import type { Product } from '@/types';

interface RecentlyViewedContextValue {
  products: Product[];
  add: (product: Product) => Promise<void>;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | undefined>(undefined);
const STORAGE_KEY = 'demo-recently-viewed';

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const ids: string[] = raw ? JSON.parse(raw) : [];
        // Can't resolve to full products without the catalog, so just leave empty for demo
        setProducts([]);
      } catch { /* ignore */ }
      return;
    }
    if (!session?.user?.id) { setProducts([]); return; }
    (async () => {
      const { data } = await supabase!.from('recently_viewed').select('product:products(*)').eq('user_id', session.user.id).order('viewed_at', { ascending: false }).limit(8);
      setProducts((data?.map((r) => r.product).filter(Boolean) as unknown as Product[]) ?? []);
    })();
  }, [session]);

  async function add(product: Product) {
    if (!isSupabaseConfigured || !supabase) {
      setProducts((prev) => {
        const filtered = prev.filter((p) => p.id !== product.id);
        return [product, ...filtered].slice(0, 8);
      });
      return;
    }
    if (!session?.user?.id) return;
    await supabase.from('recently_viewed').upsert({ user_id: session.user.id, product_id: product.id, viewed_at: new Date().toISOString() }).eq('user_id', session.user.id).eq('product_id', product.id);
    setProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  }

  return (
    <RecentlyViewedContext.Provider value={{ products, add }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  return ctx;
}
