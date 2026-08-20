import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import type { Product } from '@/types';

interface CompareContextValue {
  productIds: string[];
  products: Product[];
  toggle: (product: Product) => Promise<void>;
  has: (productId: string) => boolean;
  clear: () => Promise<void>;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);
const STORAGE_KEY = 'demo-compare';

export function CompareProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [productIds, setProductIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const ids: string[] = raw ? JSON.parse(raw) : [];
        setProductIds(ids);
      } catch { /* ignore */ }
      return;
    }
    if (!session?.user?.id) { setProducts([]); setProductIds([]); return; }
    (async () => {
      const { data } = await supabase!.from('comparisons').select('product:products(*)').eq('user_id', session.user.id).order('created_at', { ascending: false });
      const prods = (data?.map((r) => r.product).filter(Boolean) as unknown as Product[]) ?? [];
      setProducts(prods);
      setProductIds(prods.map((p) => p.id));
    })();
  }, [session]);

  async function toggle(product: Product) {
    if (!isSupabaseConfigured || !supabase) {
      if (productIds.includes(product.id)) {
        const next = productIds.filter((id) => id !== product.id);
        setProductIds(next);
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } else {
        if (productIds.length >= 4) return;
        const next = [product.id, ...productIds];
        setProductIds(next);
        setProducts((prev) => [product, ...prev]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return;
    }
    if (!session?.user?.id) return;
    if (productIds.includes(product.id)) {
      await supabase.from('comparisons').delete().eq('user_id', session.user.id).eq('product_id', product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      setProductIds((prev) => prev.filter((id) => id !== product.id));
    } else {
      if (productIds.length >= 4) return;
      await supabase.from('comparisons').insert({ user_id: session.user.id, product_id: product.id });
      setProducts((prev) => [product, ...prev]);
      setProductIds((prev) => [product.id, ...prev]);
    }
  }

  const has = (productId: string) => productIds.includes(productId);

  async function clear() {
    if (isSupabaseConfigured && supabase && session?.user?.id) {
      await supabase.from('comparisons').delete().eq('user_id', session.user.id);
    }
    setProducts([]);
    setProductIds([]);
    if (!isSupabaseConfigured) localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <CompareContext.Provider value={{ productIds, products, toggle, has, clear }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
