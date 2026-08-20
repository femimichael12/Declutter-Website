import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, Heart, Tag, ArrowRight, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useSettings } from '@/context/SettingsContext';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { mockCoupons } from '@/lib/mockData';
import { formatPrice, applyCoupon, calculateShipping } from '@/lib/utils';
import type { Coupon } from '@/types';

export function CartPage() {
  const { items, updateQty, removeItem, saveForLater, moveToCart, loading } = useCart();
  const { toggle: toggleWishlist } = useWishlist();
  const { settings } = useSettings();
  const { toast } = useToast();
  const { session } = useAuth();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  const activeItems = items.filter((i) => !i.saved_for_later);
  const savedItems = items.filter((i) => i.saved_for_later);

  const subtotal = activeItems.reduce((sum, item) => {
    return sum + (item.product?.price ?? 0) * item.quantity;
  }, 0);

  const discount = appliedCoupon ? applyCoupon(subtotal, appliedCoupon) : 0;
  const shipping = calculateShipping(subtotal - discount, Number(settings.flat_shipping_rate), Number(settings.free_shipping_threshold));
  const total = subtotal - discount + shipping;

  async function applyCouponCode() {
    if (!couponCode.trim()) return;
    setCouponError('');
    if (!isSupabaseConfigured || !supabase) {
      const coupon = mockCoupons.find((c) => c.code === couponCode.trim().toUpperCase());
      if (!coupon) { setCouponError('Invalid coupon code'); setAppliedCoupon(null); return; }
      if (coupon.min_order > subtotal) { setCouponError(`Minimum order of ${formatPrice(coupon.min_order)} required`); return; }
      setAppliedCoupon(coupon);
      toast('Coupon applied');
      return;
    }
    const { data } = await supabase.from('coupons').select('*').eq('code', couponCode.trim().toUpperCase()).eq('is_active', true).maybeSingle();
    if (!data) {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
      return;
    }
    const coupon = data as Coupon;
    if (coupon.min_order > subtotal) {
      setCouponError(`Minimum order of ${formatPrice(coupon.min_order)} required`);
      return;
    }
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      setCouponError('This coupon has expired');
      return;
    }
    setAppliedCoupon(coupon);
    toast('Coupon applied');
  }

  function handleCheckout() {
    if (!session) {
      toast('Please sign in to checkout', 'info');
      navigate('/login?redirect=/checkout');
      return;
    }
    navigate('/checkout');
  }

  if (loading) {
    return (
      <div className="container-page py-8">
        <div className="skeleton h-8 w-32 mb-6" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}
          </div>
          <div className="skeleton h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (activeItems.length === 0 && savedItems.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-navy-100 flex items-center justify-center mb-4">
          <ShoppingBag className="h-10 w-10 text-navy-400" />
        </div>
        <h1 className="font-display text-2xl font-bold text-navy-900">Your cart is empty</h1>
        <p className="mt-2 text-navy-500">Browse our products and find something you love.</p>
        <Link to="/products" className="btn-primary mt-6 inline-flex">
          Start Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="font-display text-2xl font-bold text-navy-900 mb-6">Shopping Cart</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {activeItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="card p-4 flex gap-4"
              >
                <Link to={`/product/${item.product?.slug}`} className="flex-shrink-0">
                  <img src={item.product?.images[0]} alt={item.product?.name} className="h-24 w-24 rounded-xl object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product?.slug}`}>
                    <h3 className="font-display font-semibold text-navy-900 hover:text-royal-600 transition line-clamp-1">
                      {item.product?.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-navy-500">{item.product?.brand}</p>
                  <p className="mt-1 text-lg font-bold text-navy-900">
                    {formatPrice(item.product?.price ?? 0)}
                  </p>
                  <div className="mt-2 flex items-center gap-3 flex-wrap">
                    <div className="flex items-center rounded-lg border border-navy-200">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="p-2 text-navy-600 hover:text-royal-600 transition" aria-label="Decrease">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-3 text-sm font-semibold text-navy-900">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="p-2 text-navy-600 hover:text-royal-600 transition" aria-label="Increase">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        if (item.product) toggleWishlist(item.product);
                        saveForLater(item.id);
                        toast('Saved for later', 'info');
                      }}
                      className="text-sm text-navy-500 hover:text-royal-600 transition flex items-center gap-1"
                    >
                      <Heart className="h-3.5 w-3.5" /> Save
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-navy-500 hover:text-rose-500 transition flex items-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Saved for later */}
          {savedItems.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-lg font-bold text-navy-900 mb-4">Saved for Later</h2>
              <div className="space-y-3">
                {savedItems.map((item) => (
                  <div key={item.id} className="card p-4 flex gap-4 opacity-80">
                    <img src={item.product?.images[0]} alt={item.product?.name} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-medium text-navy-900">{item.product?.name}</h3>
                      <p className="text-sm font-bold text-navy-900">{formatPrice(item.product?.price ?? 0)}</p>
                      <button
                        onClick={() => moveToCart(item.id)}
                        className="mt-2 text-sm text-royal-600 hover:underline"
                      >
                        Move to Cart
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-navy-400 hover:text-rose-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div>
          <div className="card p-5 sticky top-24">
            <h2 className="font-display text-lg font-bold text-navy-900 mb-4">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-4">
              <label className="text-sm font-medium text-navy-700 mb-1.5 block">Coupon Code</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="input pl-9 py-2 text-sm"
                  />
                </div>
                <button onClick={applyCouponCode} className="btn-secondary text-sm py-2 px-4">Apply</button>
              </div>
              {couponError && <p className="mt-1 text-xs text-rose-500">{couponError}</p>}
              {appliedCoupon && (
                <p className="mt-1 text-xs text-emerald-600 flex items-center gap-1">
                  <Tag className="h-3 w-3" /> {appliedCoupon.code} applied
                </p>
              )}
            </div>

            <div className="space-y-2 text-sm border-t border-navy-100 pt-4">
              <div className="flex justify-between">
                <span className="text-navy-500">Subtotal</span>
                <span className="font-medium text-navy-900">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-navy-500">Shipping</span>
                <span className="font-medium text-navy-900">
                  {shipping === 0 ? <span className="text-emerald-600">Free</span> : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-navy-400">
                  Free shipping on orders over {formatPrice(Number(settings.free_shipping_threshold))}
                </p>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-navy-100">
              <div className="flex justify-between items-baseline">
                <span className="font-display font-bold text-navy-900">Total</span>
                <span className="font-display text-xl font-bold text-navy-900">{formatPrice(total)}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="btn-primary w-full mt-4">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/products" className="btn-ghost w-full mt-2 text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
