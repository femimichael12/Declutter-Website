import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
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

const STORAGE_KEY = 'demo-cart';

function loadDemoCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveDemoCart(items: CartItem[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* ignore */ }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setItems(loadDemoCart());
      setLoading(false);
      return;
    }
    if (!session?.user?.id) {
      setItems([]);
      setLoading(false);
      return;
    }
    (async () => {
      let cartId: string;
      const { data: existing } = await supabase!.from('carts').select('id').eq('user_id', session.user.id).maybeSingle();
      if (existing) cartId = existing.id;
      else {
        const { data: created } = await supabase!.from('carts').insert({ user_id: session.user.id }).select().maybeSingle();
        cartId = created?.id ?? '';
      }
      if (!cartId) { setLoading(false); return; }
      const { data } = await supabase!.from('cart_items').select('*, product:products(*)').eq('cart_id', cartId).order('created_at', { ascending: false });
      setItems((data as CartItem[]) ?? []);
      setLoading(false);
    })();
  }, [session]);

  async function addItem(product: Product, qty = 1) {
    if (!isSupabaseConfigured || !supabase) {
      setItems((prev) => {
        const existing = prev.find((i) => i.product_id === product.id && !i.saved_for_later);
        let next: CartItem[];
        if (existing) {
          next = prev.map((i) => i.id === existing.id ? { ...i, quantity: i.quantity + qty } : i);
        } else {
          next = [{ id: `demo-${Date.now()}`, cart_id: 'demo', product_id: product.id, quantity: qty, saved_for_later: false, created_at: new Date().toISOString(), product }, ...prev];
        }
        saveDemoCart(next);
        return next;
      });
      return;
    }
    if (!session?.user?.id) return;
    let cartId: string;
    const { data: existingCart } = await supabase.from('carts').select('id').eq('user_id', session.user.id).maybeSingle();
    if (existingCart) cartId = existingCart.id;
    else {
      const { data: created } = await supabase.from('carts').insert({ user_id: session.user.id }).select().maybeSingle();
      cartId = created?.id ?? '';
    }
    const { data: existing } = await supabase.from('cart_items').select('*').eq('cart_id', cartId).eq('product_id', product.id).maybeSingle();
    if (existing) {
      await supabase.from('cart_items').update({ quantity: existing.quantity + qty }).eq('id', existing.id);
    } else {
      await supabase.from('cart_items').insert({ cart_id: cartId, product_id: product.id, quantity: qty });
    }
    const { data } = await supabase.from('cart_items').select('*, product:products(*)').eq('cart_id', cartId).order('created_at', { ascending: false });
    setItems((data as CartItem[]) ?? []);
  }

  async function updateQty(itemId: string, qty: number) {
    if (qty < 1) return;
    if (supabase) await supabase.from('cart_items').update({ quantity: qty }).eq('id', itemId);
    setItems((prev) => {
      const next = prev.map((i) => (i.id === itemId ? { ...i, quantity: qty } : i));
      if (!isSupabaseConfigured) saveDemoCart(next);
      return next;
    });
  }

  async function removeItem(itemId: string) {
    if (supabase) await supabase.from('cart_items').delete().eq('id', itemId);
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== itemId);
      if (!isSupabaseConfigured) saveDemoCart(next);
      return next;
    });
  }

  async function saveForLater(itemId: string) {
    if (supabase) await supabase.from('cart_items').update({ saved_for_later: true }).eq('id', itemId);
    setItems((prev) => {
      const next = prev.map((i) => (i.id === itemId ? { ...i, saved_for_later: true } : i));
      if (!isSupabaseConfigured) saveDemoCart(next);
      return next;
    });
  }

  async function moveToCart(itemId: string) {
    if (supabase) await supabase.from('cart_items').update({ saved_for_later: false }).eq('id', itemId);
    setItems((prev) => {
      const next = prev.map((i) => (i.id === itemId ? { ...i, saved_for_later: false } : i));
      if (!isSupabaseConfigured) saveDemoCart(next);
      return next;
    });
  }

  async function clearCart() {
    if (isSupabaseConfigured && supabase && session?.user?.id) {
      const { data: cart } = await supabase.from('carts').select('id').eq('user_id', session.user.id).maybeSingle();
      if (cart) await supabase.from('cart_items').delete().eq('cart_id', cart.id).eq('saved_for_later', false);
    }
    setItems((prev) => {
      const next = prev.filter((i) => i.saved_for_later);
      if (!isSupabaseConfigured) saveDemoCart(next);
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
