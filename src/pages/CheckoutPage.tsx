import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, CreditCard, Banknote, Wallet, Building2, MapPin, FileText, Download } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { mockCoupons } from '@/lib/mockData';
import { formatPrice, applyCoupon, calculateShipping } from '@/lib/utils';
import type { Address, Coupon, OrderStatus, PaymentStatus } from '@/types';

type Step = 'shipping' | 'billing' | 'delivery' | 'payment' | 'confirmation';
type PaymentMethod = 'paystack' | 'flutterwave' | 'card' | 'bank_transfer';

const steps: { key: Step; label: string }[] = [
  { key: 'shipping', label: 'Shipping' },
  { key: 'billing', label: 'Billing' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'payment', label: 'Payment' },
  { key: 'confirmation', label: 'Confirmation' },
];

const paymentMethods: { key: PaymentMethod; label: string; desc: string; icon: typeof CreditCard }[] = [
  { key: 'paystack', label: 'Paystack', desc: 'Pay with card via Paystack', icon: Wallet },
  { key: 'flutterwave', label: 'Flutterwave', desc: 'Pay with Flutterwave', icon: CreditCard },
  { key: 'card', label: 'Card Payment', desc: 'Direct card payment', icon: CreditCard },
  { key: 'bank_transfer', label: 'Bank Transfer', desc: 'Transfer to our bank account', icon: Building2 },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { settings } = useSettings();
  const { session, profile } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>('shipping');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [billingSame, setBillingSame] = useState(true);
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paystack');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // New address form
  const [addr, setAddr] = useState({
    full_name: profile?.full_name ?? '',
    phone: profile?.phone ?? '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
  });

  const activeItems = items.filter((i) => !i.saved_for_later);
  const subtotal = activeItems.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);
  const discount = appliedCoupon ? applyCoupon(subtotal, appliedCoupon) : 0;
  const shippingBase = calculateShipping(subtotal - discount, Number(settings.flat_shipping_rate), Number(settings.free_shipping_threshold));
  const shipping = deliveryOption === 'express' ? shippingBase + 3000 : shippingBase;
  const total = subtotal - discount + shipping;

  useEffect(() => {
    if (isSupabaseConfigured && !session) {
      navigate('/login?redirect=/checkout');
      return;
    }
    if (!isSupabaseConfigured || !supabase || !session) return;
    async function loadAddresses() {
      const { data } = await supabase!.from('addresses').select('*').eq('user_id', session!.user.id).order('is_default', { ascending: false });
      setAddresses(data as Address[] ?? []);
      if (data && data.length > 0) setSelectedAddressId(data[0].id);
    }
    loadAddresses();
  }, [session, navigate]);

  async function applyCouponCode() {
    if (!couponCode.trim()) return;
    if (!isSupabaseConfigured || !supabase) {
      const coupon = mockCoupons.find((c) => c.code === couponCode.trim().toUpperCase());
      if (!coupon) { toast('Invalid coupon code', 'error'); return; }
      setAppliedCoupon(coupon);
      toast('Coupon applied');
      return;
    }
    const { data } = await supabase.from('coupons').select('*').eq('code', couponCode.trim().toUpperCase()).eq('is_active', true).maybeSingle();
    if (!data) {
      toast('Invalid coupon code', 'error');
      return;
    }
    setAppliedCoupon(data as Coupon);
    toast('Coupon applied');
  }

  async function saveAddress() {
    if (!isSupabaseConfigured || !supabase || !session) {
      const demoAddr: Address = {
        id: `addr-${Date.now()}`, user_id: 'demo', label: 'Checkout',
        ...addr, country: 'Nigeria', is_default: addresses.length === 0, created_at: new Date().toISOString(),
      } as unknown as Address;
      setAddresses((prev) => [demoAddr, ...prev]);
      setSelectedAddressId(demoAddr.id);
      return;
    }
    const { data } = await supabase.from('addresses').insert({
      user_id: session.user.id,
      label: 'Checkout',
      ...addr,
      is_default: addresses.length === 0,
    }).select().maybeSingle();
    if (data) {
      setAddresses((prev) => [data as Address, ...prev]);
      setSelectedAddressId(data.id);
    }
  }

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  function nextStep() {
    const order: Step[] = ['shipping', 'billing', 'delivery', 'payment', 'confirmation'];
    const idx = order.indexOf(step);
    if (idx < order.length - 1) setStep(order[idx + 1]);
  }

  function prevStep() {
    const order: Step[] = ['shipping', 'billing', 'delivery', 'payment', 'confirmation'];
    const idx = order.indexOf(step);
    if (idx > 0) setStep(order[idx - 1]);
  }

  async function placeOrder() {
    if (!selectedAddress) {
      toast('Please select a shipping address', 'error');
      return;
    }
    setPlacingOrder(true);
    try {
      if (!isSupabaseConfigured || !supabase || !session) {
        setOrderId(`demo-${Date.now()}`);
        await clearCart();
        setStep('confirmation');
        toast('Order placed successfully! (Demo Mode)');
        setPlacingOrder(false);
        return;
      }
      const { data: order, error } = await supabase.from('orders').insert({
        user_id: session.user.id,
        status: 'pending' as OrderStatus,
        subtotal,
        discount,
        shipping,
        tax: 0,
        total,
        coupon_code: appliedCoupon?.code ?? null,
        payment_method: paymentMethod,
        payment_status: 'unpaid' as PaymentStatus,
        shipping_address: selectedAddress as unknown as Record<string, unknown>,
        billing_address: billingSame ? selectedAddress as unknown as Record<string, unknown> : null,
        notes: '',
      }).select().maybeSingle();

      if (error || !order) {
        toast('Failed to place order. Please try again.', 'error');
        setPlacingOrder(false);
        return;
      }

      const orderItems = activeItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        name: item.product?.name ?? '',
        brand: item.product?.brand ?? null,
        image_url: item.product?.images[0] ?? null,
        price: item.product?.price ?? 0,
        quantity: item.quantity,
        condition: item.product?.condition ?? null,
      }));

      await supabase.from('order_items').insert(orderItems);

      await supabase.from('notifications').insert({
        user_id: session.user.id,
        title: 'Order Placed Successfully',
        body: `Your order ${order.id.slice(0, 8)} has been received and is being processed.`,
        type: 'order',
        link: '/account/orders',
      });

      setOrderId(order.id);
      await clearCart();
      setStep('confirmation');
      toast('Order placed successfully!');
    } catch {
      toast('Something went wrong. Please try again.', 'error');
    }
    setPlacingOrder(false);
  }

  if (activeItems.length === 0 && step !== 'confirmation') {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-navy-500">Your cart is empty.</p>
        <Link to="/products" className="btn-primary mt-4 inline-flex">Browse Products</Link>
      </div>
    );
  }

  const currentStepIdx = steps.findIndex((s) => s.key === step);

  return (
    <div className="container-page py-8">
      <h1 className="font-display text-2xl font-bold text-navy-900 mb-6">Checkout</h1>

      {/* Step indicator */}
      {step !== 'confirmation' && (
        <div className="mb-8">
          <div className="flex items-center gap-1 sm:gap-2">
            {steps.slice(0, 4).map((s, i) => (
              <div key={s.key} className="flex items-center gap-1 sm:gap-2 flex-1">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition ${
                  i <= currentStepIdx ? 'bg-royal-600 text-white' : 'bg-navy-100 text-navy-400'
                }`}>
                  {i < currentStepIdx ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i <= currentStepIdx ? 'text-navy-900' : 'text-navy-400'}`}>
                  {s.label}
                </span>
                {i < 3 && <div className={`flex-1 h-0.5 rounded ${i < currentStepIdx ? 'bg-royal-600' : 'bg-navy-100'}`} />}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 'shipping' && (
              <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card p-5">
                <h2 className="font-display text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-royal-600" /> Shipping Address
                </h2>

                {addresses.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {addresses.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setSelectedAddressId(a.id)}
                        className={`w-full text-left p-3 rounded-xl border-2 transition ${
                          selectedAddressId === a.id ? 'border-royal-600 bg-royal-50/50' : 'border-navy-200 hover:border-navy-300'
                        }`}
                      >
                        <p className="font-medium text-navy-900">{a.full_name}</p>
                        <p className="text-sm text-navy-500">
                          {a.address_line1}, {a.city}, {a.state}
                        </p>
                        <p className="text-sm text-navy-500">{a.phone}</p>
                      </button>
                    ))}
                  </div>
                )}

                <div className="border-t border-navy-100 pt-4">
                  <h3 className="font-medium text-navy-900 mb-3">Add new address</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input className="input py-2 text-sm" placeholder="Full name" value={addr.full_name} onChange={(e) => setAddr({ ...addr, full_name: e.target.value })} />
                    <input className="input py-2 text-sm" placeholder="Phone" value={addr.phone} onChange={(e) => setAddr({ ...addr, phone: e.target.value })} />
                    <input className="input py-2 text-sm sm:col-span-2" placeholder="Address line 1" value={addr.address_line1} onChange={(e) => setAddr({ ...addr, address_line1: e.target.value })} />
                    <input className="input py-2 text-sm sm:col-span-2" placeholder="Address line 2 (optional)" value={addr.address_line2} onChange={(e) => setAddr({ ...addr, address_line2: e.target.value })} />
                    <input className="input py-2 text-sm" placeholder="City" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} />
                    <input className="input py-2 text-sm" placeholder="State" value={addr.state} onChange={(e) => setAddr({ ...addr, state: e.target.value })} />
                    <input className="input py-2 text-sm" placeholder="Postal code" value={addr.postal_code} onChange={(e) => setAddr({ ...addr, postal_code: e.target.value })} />
                  </div>
                  <button onClick={saveAddress} className="btn-secondary text-sm mt-3">Save Address</button>
                </div>

                <button onClick={nextStep} disabled={!selectedAddressId} className="btn-primary mt-5">
                  Continue to Billing <ChevronLeft className="h-4 w-4 rotate-180" />
                </button>
              </motion.div>
            )}

            {step === 'billing' && (
              <motion.div key="billing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card p-5">
                <h2 className="font-display text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-royal-600" /> Billing Details
                </h2>
                <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-royal-600 bg-royal-50/50 cursor-pointer mb-3">
                  <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} className="h-4 w-4 accent-royal-600" />
                  <span className="text-sm font-medium text-navy-900">Billing address same as shipping</span>
                </label>
                {!billingSame && (
                  <p className="text-sm text-navy-500 p-3">Please enter your billing address manually after placing the order.</p>
                )}
                <div className="flex gap-2 mt-4">
                  <button onClick={prevStep} className="btn-ghost"><ChevronLeft className="h-4 w-4" /> Back</button>
                  <button onClick={nextStep} className="btn-primary flex-1">Continue to Delivery</button>
                </div>
              </motion.div>
            )}

            {step === 'delivery' && (
              <motion.div key="delivery" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card p-5">
                <h2 className="font-display text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <ChevronLeft className="h-5 w-5 text-royal-600" /> Delivery Options
                </h2>
                <div className="space-y-2">
                  <button
                    onClick={() => setDeliveryOption('standard')}
                    className={`w-full text-left p-4 rounded-xl border-2 transition ${
                      deliveryOption === 'standard' ? 'border-royal-600 bg-royal-50/50' : 'border-navy-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-navy-900">Standard Delivery</p>
                        <p className="text-sm text-navy-500">2-5 business days</p>
                      </div>
                      <span className="font-bold text-navy-900">
                        {shippingBase === 0 ? 'Free' : formatPrice(shippingBase)}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => setDeliveryOption('express')}
                    className={`w-full text-left p-4 rounded-xl border-2 transition ${
                      deliveryOption === 'express' ? 'border-royal-600 bg-royal-50/50' : 'border-navy-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-navy-900">Express Delivery</p>
                        <p className="text-sm text-navy-500">1-2 business days</p>
                      </div>
                      <span className="font-bold text-navy-900">{formatPrice(shippingBase + 3000)}</span>
                    </div>
                  </button>
                </div>
                <div className="flex gap-2 mt-5">
                  <button onClick={prevStep} className="btn-ghost"><ChevronLeft className="h-4 w-4" /> Back</button>
                  <button onClick={nextStep} className="btn-primary flex-1">Continue to Payment</button>
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card p-5">
                <h2 className="font-display text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-royal-600" /> Payment Method
                </h2>
                <div className="space-y-2">
                  {paymentMethods.map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <button
                        key={pm.key}
                        onClick={() => setPaymentMethod(pm.key)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition flex items-center gap-3 ${
                          paymentMethod === pm.key ? 'border-royal-600 bg-royal-50/50' : 'border-navy-200'
                        }`}
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${paymentMethod === pm.key ? 'bg-royal-600 text-white' : 'bg-navy-100 text-navy-500'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-navy-900">{pm.label}</p>
                          <p className="text-sm text-navy-500">{pm.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {paymentMethod === 'bank_transfer' && (
                  <div className="mt-4 p-4 rounded-xl bg-navy-50 text-sm text-navy-600">
                    <p className="font-medium mb-1">Bank Transfer Details:</p>
                    <p>Bank: First Bank of Nigeria</p>
                    <p>Account Name: BuyAndSellOutlets Ltd</p>
                    <p>Account Number: 3000 0000 00</p>
                    <p className="mt-2 text-xs">Please use your order ID as reference. Your order will be confirmed once payment is verified.</p>
                  </div>
                )}
                <div className="flex gap-2 mt-5">
                  <button onClick={prevStep} className="btn-ghost"><ChevronLeft className="h-4 w-4" /> Back</button>
                  <button onClick={placeOrder} disabled={placingOrder} className="btn-primary flex-1">
                    {placingOrder ? 'Placing Order...' : `Place Order · ${formatPrice(total)}`}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'confirmation' && (
              <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="mx-auto h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4"
                >
                  <Check className="h-10 w-10 text-emerald-600" />
                </motion.div>
                <h2 className="font-display text-2xl font-bold text-navy-900">Order Confirmed!</h2>
                <p className="mt-2 text-navy-500">
                  Thank you for your purchase. Your order ID is <span className="font-mono font-semibold text-royal-600">#{orderId.slice(0, 8)}</span>
                </p>
                <p className="mt-1 text-sm text-navy-500">
                  We've sent a confirmation to your email. You'll receive tracking updates soon.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
                  <button className="btn-secondary">
                    <Download className="h-4 w-4" /> Download Invoice
                  </button>
                  <Link to="/account/orders" className="btn-primary">Track Order</Link>
                  <Link to="/products" className="btn-ghost">Continue Shopping</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order summary sidebar */}
        {step !== 'confirmation' && (
          <div>
            <div className="card p-5 sticky top-24">
              <h2 className="font-display text-lg font-bold text-navy-900 mb-4">Order Summary</h2>

              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {activeItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.product?.images[0]} alt={item.product?.name} className="h-14 w-14 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900 truncate">{item.product?.name}</p>
                      <p className="text-xs text-navy-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-navy-900">{formatPrice((item.product?.price ?? 0) * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="input py-2 text-sm"
                />
                <button onClick={applyCouponCode} className="btn-secondary text-sm px-3">Apply</button>
              </div>

              <div className="space-y-2 text-sm border-t border-navy-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-navy-500">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-navy-500">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? <span className="text-emerald-600">Free</span> : formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-navy-100 flex justify-between items-baseline">
                <span className="font-display font-bold text-navy-900">Total</span>
                <span className="font-display text-xl font-bold text-navy-900">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
