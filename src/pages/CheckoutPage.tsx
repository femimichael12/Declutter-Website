import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  CreditCard,
  Building2,
  MapPin,
  FileText,
  Download,
  ShieldCheck,
  AlertCircle,
  Lock,
  Loader2,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { mockCoupons } from '@/lib/mockData';
import { formatPrice, applyCoupon, calculateShipping } from '@/lib/utils';
import {
  initializePaystackTransaction,
  verifyPaystackPayment,
  openPaystackPopup,
} from '@/lib/paystack';
import type { Address, Coupon, OrderStatus, PaymentStatus } from '@/types';
import { ProductImage } from '@/components/ProductImage';

type Step = 'shipping' | 'billing' | 'delivery' | 'payment' | 'confirmation';
type PaymentMethod = 'paystack' | 'bank_transfer';
type PaystackState = 'idle' | 'initializing' | 'waiting_popup' | 'verifying' | 'failed' | 'cancelled';

const steps: { key: Step; label: string }[] = [
  { key: 'shipping', label: 'Shipping' },
  { key: 'billing', label: 'Billing' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'payment', label: 'Payment' },
  { key: 'confirmation', label: 'Confirmation' },
];

const paymentMethods: { key: PaymentMethod; label: string; desc: string; icon: typeof CreditCard; badge?: string }[] = [
  { key: 'paystack', label: 'Paystack (Cards / Bank / USSD)', desc: 'Instant secure checkout via Paystack', icon: Wallet, badge: 'Official Paystack' },
  { key: 'bank_transfer', label: 'Direct Bank Transfer', desc: 'Transfer to BuyAndSellOutlets bank account', icon: Building2 },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

  // Paystack transaction state
  const [paystackState, setPaystackState] = useState<PaystackState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);
  const [confirmedItems, setConfirmedItems] = useState<any[]>([]);

  // Prevent double URL verification on mount
  const verifiedRef = useRef(false);

  // Address and customer form
  const [addr, setAddr] = useState({
    full_name: profile?.full_name ?? '',
    email: session?.user?.email ?? profile?.email ?? '',
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

  // Auto-fill profile info into address form
  useEffect(() => {
    if (profile || session) {
      setAddr((prev) => ({
        ...prev,
        full_name: prev.full_name || profile?.full_name || '',
        email: prev.email || session?.user?.email || profile?.email || '',
        phone: prev.phone || profile?.phone || '',
      }));
    }
  }, [profile, session]);

  // Check URL params for returned Paystack redirect (e.g. ?reference=... or ?trxref=...)
  useEffect(() => {
    const ref = searchParams.get('reference') || searchParams.get('trxref');
    if (ref && !verifiedRef.current) {
      verifiedRef.current = true;
      handleVerifyPayment(ref);
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadAddresses() {
      if (db && session?.user?.id) {
        try {
          const q = query(collection(db, 'addresses'), where('user_id', '==', session.user.id));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const list: Address[] = [];
            snap.forEach((d) => list.push({ id: d.id, ...(d.data() as Omit<Address, 'id'>) }));
            list.sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0));
            setAddresses(list);
            if (list.length > 0) setSelectedAddressId(list[0].id);
            return;
          }
        } catch {
          // fallback
        }
      }
      if (session?.user?.id) {
        try {
          const raw = localStorage.getItem(`addresses_${session.user.id}`);
          if (raw) {
            const list: Address[] = JSON.parse(raw);
            setAddresses(list);
            if (list.length > 0) setSelectedAddressId(list[0].id);
          }
        } catch {
          // ignore
        }
      }
    }
    loadAddresses();
  }, [session]);

  async function applyCouponCode() {
    if (!couponCode.trim()) return;
    const coupon = mockCoupons.find((c) => c.code === couponCode.trim().toUpperCase());
    if (!coupon) {
      toast('Invalid coupon code', 'error');
      return;
    }
    setAppliedCoupon(coupon);
    toast('Coupon applied: ' + coupon.code);
  }

  function getEffectiveAddress(): Address | null {
    if (selectedAddressId) {
      const found = addresses.find((a) => a.id === selectedAddressId);
      if (found) return found;
    }
    if (addr.full_name && addr.address_line1 && addr.city && addr.state) {
      return {
        id: 'addr-current',
        user_id: session?.user?.id || 'guest',
        label: 'Current Address',
        full_name: addr.full_name,
        phone: addr.phone || '',
        address_line1: addr.address_line1,
        address_line2: addr.address_line2 || '',
        city: addr.city,
        state: addr.state,
        postal_code: addr.postal_code || '',
        country: 'Nigeria',
        is_default: true,
        created_at: new Date().toISOString(),
      };
    }
    return null;
  }

  async function handleProceedFromShipping() {
    if (!addr.full_name.trim()) {
      toast('Please enter your full name', 'error');
      return;
    }
    if (!addr.email.trim()) {
      toast('Please enter your email address for order confirmation', 'error');
      return;
    }
    if (!addr.phone.trim()) {
      toast('Please enter your phone number', 'error');
      return;
    }
    if (!addr.address_line1.trim() || !addr.city.trim() || !addr.state.trim()) {
      toast('Please enter your delivery street address, city, and state', 'error');
      return;
    }

    // Save address locally/Firestore if user is logged in
    if (session?.user?.id && !selectedAddressId) {
      const newAddrData = {
        user_id: session.user.id,
        label: 'Checkout',
        ...addr,
        country: 'Nigeria',
        is_default: addresses.length === 0,
        created_at: new Date().toISOString(),
      };
      let createdId = `addr-${Date.now()}`;
      if (db) {
        try {
          const docRef = await addDoc(collection(db, 'addresses'), newAddrData);
          createdId = docRef.id;
        } catch {
          // fallback
        }
      }
      const newAddr: Address = { id: createdId, ...newAddrData };
      const next = [newAddr, ...addresses];
      setAddresses(next);
      setSelectedAddressId(createdId);
      try {
        localStorage.setItem(`addresses_${session.user.id}`, JSON.stringify(next));
      } catch {
        // ignore
      }
    }

    setStep('billing');
  }

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

  /**
   * Verified Paystack transaction completion
   */
  async function handleVerifyPayment(reference: string) {
    setPaystackState('verifying');
    setErrorMessage(null);
    try {
      const verifyRes = await verifyPaystackPayment(reference);

      if (!verifyRes.status || !verifyRes.order) {
        setPaystackState('failed');
        setErrorMessage(verifyRes.message || 'Payment verification failed.');
        toast(verifyRes.message || 'Payment verification failed.', 'error');
        return;
      }

      const orderData = verifyRes.order;
      const orderItems = verifyRes.order_items || [];

      // Save order to Firestore if configured
      if (db && session?.user?.id) {
        try {
          await addDoc(collection(db, 'orders'), orderData);
          for (const item of orderItems) {
            await addDoc(collection(db, 'order_items'), item);
          }
          await addDoc(collection(db, 'notifications'), {
            user_id: session.user.id,
            title: 'Payment Confirmed & Order Placed',
            body: `Your payment for order #${orderData.id.slice(0, 8)} was successful via Paystack.`,
            type: 'order',
            is_read: false,
            link: '/account/orders',
            created_at: new Date().toISOString(),
          });
        } catch (err) {
          console.warn('Firestore sync fallback:', err);
        }
      }

      // Save locally as well for immediate rendering in orders page
      const storageUserId = session?.user?.id || 'guest';
      try {
        const existingRaw = localStorage.getItem(`orders_${storageUserId}`);
        const existingOrders = existingRaw ? JSON.parse(existingRaw) : [];
        localStorage.setItem(`orders_${storageUserId}`, JSON.stringify([orderData, ...existingOrders]));
        localStorage.setItem(`order_items_${orderData.id}`, JSON.stringify(orderItems));
      } catch {
        // ignore
      }

      setConfirmedOrder(orderData);
      setConfirmedItems(orderItems.length > 0 ? orderItems : activeItems);
      setOrderId(orderData.id);
      await clearCart();
      setPaystackState('idle');
      setStep('confirmation');
      toast('Payment successful! Order confirmed.', 'success');
    } catch (err: any) {
      setPaystackState('failed');
      setErrorMessage(err.message || 'Payment verification error.');
      toast(err.message || 'Failed to verify payment', 'error');
    }
  }

  /**
   * Initializes and triggers Paystack Test Payment flow
   */
  async function handlePaystackCheckout() {
    const effAddress = getEffectiveAddress();
    if (!effAddress) {
      toast('Please enter or select a delivery address', 'error');
      setStep('shipping');
      return;
    }

    const customerEmail = addr.email.trim() || session?.user?.email || profile?.email || 'customer@buyandselloutlets.com';
    const customerName = effAddress.full_name || addr.full_name || profile?.full_name || 'Valued Customer';
    const customerPhone = effAddress.phone || addr.phone || profile?.phone || '';

    setPaystackState('initializing');
    setErrorMessage(null);

    try {
      const initRes = await initializePaystackTransaction({
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
        },
        items: activeItems.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          product: i.product,
        })),
        shipping_address: effAddress as unknown as Record<string, unknown>,
        billing_address: billingSame ? (effAddress as unknown as Record<string, unknown>) : null,
        delivery_option: deliveryOption,
        coupon_code: appliedCoupon?.code ?? null,
        callback_url: window.location.origin + '/checkout',
        user_id: session?.user?.id || 'guest',
      });

      const { reference, amount_in_kobo, access_code, authorization_url } = initRes.data;

      setPaystackState('waiting_popup');

      // Trigger Paystack inline checkout popup
      await openPaystackPopup({
        email: customerEmail,
        amountInKobo: amount_in_kobo,
        reference,
        accessCode: access_code,
        onSuccess: (ref) => {
          handleVerifyPayment(ref);
        },
        onCancel: () => {
          setPaystackState('cancelled');
          toast('Payment was cancelled. You can retry whenever you are ready.', 'info');
        },
        onError: (errMsg) => {
          setPaystackState('failed');
          setErrorMessage(errMsg);
          if (authorization_url) {
            window.location.href = authorization_url;
          }
        },
      });
    } catch (err: any) {
      setPaystackState('failed');
      setErrorMessage(err.message || 'Failed to initialize payment.');
      toast(err.message || 'Payment initialization error', 'error');
    }
  }

  /**
   * Direct bank transfer order fallback
   */
  async function placeBankTransferOrder() {
    const effAddress = getEffectiveAddress();
    if (!effAddress) {
      toast('Please enter a delivery address', 'error');
      setStep('shipping');
      return;
    }
    setPlacingOrder(true);
    try {
      const storageUserId = session?.user?.id || 'guest';
      const orderData = {
        user_id: storageUserId,
        status: 'pending' as OrderStatus,
        subtotal,
        discount,
        shipping,
        tax: 0,
        total,
        coupon_code: appliedCoupon?.code ?? null,
        payment_method: 'bank_transfer',
        payment_status: 'unpaid' as PaymentStatus,
        shipping_address: effAddress as unknown as Record<string, unknown>,
        billing_address: billingSame ? (effAddress as unknown as Record<string, unknown>) : null,
        notes: 'Pending bank transfer confirmation',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      let createdOrderId = `ord-${Date.now()}`;
      if (db && session?.user?.id) {
        try {
          const docRef = await addDoc(collection(db, 'orders'), orderData);
          createdOrderId = docRef.id;

          for (const item of activeItems) {
            await addDoc(collection(db, 'order_items'), {
              order_id: createdOrderId,
              product_id: item.product_id,
              name: item.product?.name ?? '',
              brand: item.product?.brand ?? null,
              image_url: item.product?.images[0] ?? null,
              price: item.product?.price ?? 0,
              quantity: item.quantity,
              condition: item.product?.condition ?? null,
            });
          }

          await addDoc(collection(db, 'notifications'), {
            user_id: session.user.id,
            title: 'Order Placed (Bank Transfer)',
            body: `Your order #${createdOrderId.slice(0, 8)} has been received. Please complete transfer to confirm.`,
            type: 'order',
            is_read: false,
            link: '/account/orders',
            created_at: new Date().toISOString(),
          });
        } catch (err) {
          console.warn('Firestore order placement fallback:', err);
        }
      }

      // Save locally
      try {
        const existingRaw = localStorage.getItem(`orders_${storageUserId}`);
        const existingOrders = existingRaw ? JSON.parse(existingRaw) : [];
        const fullOrder = { id: createdOrderId, ...orderData };
        localStorage.setItem(`orders_${storageUserId}`, JSON.stringify([fullOrder, ...existingOrders]));

        const orderItems = activeItems.map((item) => ({
          id: `item-${Date.now()}-${item.product_id}`,
          order_id: createdOrderId,
          product_id: item.product_id,
          name: item.product?.name ?? '',
          brand: item.product?.brand ?? null,
          image_url: item.product?.images[0] ?? null,
          price: item.product?.price ?? 0,
          quantity: item.quantity,
          condition: item.product?.condition ?? null,
        }));
        localStorage.setItem(`order_items_${createdOrderId}`, JSON.stringify(orderItems));
      } catch {
        // ignore
      }

      setOrderId(createdOrderId);
      setConfirmedItems(activeItems);
      await clearCart();
      setStep('confirmation');
      toast('Order placed! Please make transfer to complete.');
    } catch {
      toast('Something went wrong. Please try again.', 'error');
    }
    setPlacingOrder(false);
  }

  function handleInvoiceDownload() {
    window.print();
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
    <div className="container-page py-6 sm:py-8">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-navy-900 mb-4 sm:mb-6">Checkout</h1>

      {/* Step indicator */}
      {step !== 'confirmation' && (
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-1 sm:gap-2">
            {steps.slice(0, 4).map((s, i) => (
              <div key={s.key} className="flex items-center gap-1 sm:gap-2 flex-1">
                <div className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs sm:text-sm font-semibold transition ${
                  i <= currentStepIdx ? 'bg-royal-600 text-white shadow-soft' : 'bg-navy-100 text-navy-400'
                }`}>
                  {i < currentStepIdx ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i <= currentStepIdx ? 'text-navy-900 font-semibold' : 'text-navy-400'}`}>
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
              <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card p-4 sm:p-5">
                <h2 className="font-display text-base sm:text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-royal-600" /> Customer & Delivery Details
                </h2>

                {addresses.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-semibold text-navy-600 uppercase tracking-wider mb-2">Saved Addresses:</p>
                    {addresses.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => {
                          setSelectedAddressId(a.id);
                          setAddr({
                            full_name: a.full_name,
                            email: addr.email || session?.user?.email || '',
                            phone: a.phone,
                            address_line1: a.address_line1,
                            address_line2: a.address_line2 || '',
                            city: a.city,
                            state: a.state,
                            postal_code: a.postal_code || '',
                          });
                        }}
                        className={`w-full text-left p-3 rounded-xl border-2 transition ${
                          selectedAddressId === a.id ? 'border-royal-600 bg-royal-50/50 shadow-soft' : 'border-navy-200 hover:border-navy-300'
                        }`}
                      >
                        <p className="font-semibold text-sm sm:text-base text-navy-900">{a.full_name}</p>
                        <p className="text-xs sm:text-sm text-navy-500 mt-0.5">
                          {a.address_line1}, {a.city}, {a.state}
                        </p>
                        <p className="text-xs text-navy-500 mt-0.5">{a.phone}</p>
                      </button>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <h3 className="font-semibold text-sm text-navy-900 mb-3">Delivery Information</h3>
                  <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <label className="block text-[11px] font-medium text-navy-600 mb-1">Full Name *</label>
                      <input className="input py-2 text-xs sm:text-sm w-full" placeholder="e.g. John Doe" value={addr.full_name} onChange={(e) => setAddr({ ...addr, full_name: e.target.value })} />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-[11px] font-medium text-navy-600 mb-1">Email Address (for Receipt) *</label>
                      <input className="input py-2 text-xs sm:text-sm w-full" placeholder="e.g. john@example.com" type="email" value={addr.email} onChange={(e) => setAddr({ ...addr, email: e.target.value })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-medium text-navy-600 mb-1">Phone Number (for Delivery Updates) *</label>
                      <input className="input py-2 text-xs sm:text-sm w-full" placeholder="e.g. 08012345678" value={addr.phone} onChange={(e) => setAddr({ ...addr, phone: e.target.value })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-medium text-navy-600 mb-1">Street Address *</label>
                      <input className="input py-2 text-xs sm:text-sm w-full" placeholder="e.g. 15 Victoria Island Road" value={addr.address_line1} onChange={(e) => setAddr({ ...addr, address_line1: e.target.value })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-medium text-navy-600 mb-1">Apartment, suite, unit (optional)</label>
                      <input className="input py-2 text-xs sm:text-sm w-full" placeholder="e.g. Flat 4B" value={addr.address_line2} onChange={(e) => setAddr({ ...addr, address_line2: e.target.value })} />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-[11px] font-medium text-navy-600 mb-1">City *</label>
                      <input className="input py-2 text-xs sm:text-sm w-full" placeholder="e.g. Ikeja" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-[11px] font-medium text-navy-600 mb-1">State *</label>
                      <input className="input py-2 text-xs sm:text-sm w-full" placeholder="e.g. Lagos" value={addr.state} onChange={(e) => setAddr({ ...addr, state: e.target.value })} />
                    </div>
                  </div>
                </div>

                <button onClick={handleProceedFromShipping} className="btn-primary mt-5 w-full sm:w-auto">
                  Continue to Billing <ChevronLeft className="h-4 w-4 rotate-180" />
                </button>
              </motion.div>
            )}

            {step === 'billing' && (
              <motion.div key="billing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card p-4 sm:p-5">
                <h2 className="font-display text-base sm:text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-royal-600" /> Billing Details
                </h2>
                <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-royal-600 bg-royal-50/50 cursor-pointer mb-3">
                  <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} className="h-4 w-4 accent-royal-600" />
                  <span className="text-xs sm:text-sm font-medium text-navy-900">Billing address is the same as shipping address</span>
                </label>
                {!billingSame && (
                  <p className="text-xs sm:text-sm text-navy-500 p-3 bg-navy-50 rounded-xl">Your receipt will include the customer information provided during payment.</p>
                )}
                <div className="flex gap-2 mt-4">
                  <button onClick={prevStep} className="btn-ghost text-xs sm:text-sm"><ChevronLeft className="h-4 w-4" /> Back</button>
                  <button onClick={nextStep} className="btn-primary flex-1 text-xs sm:text-sm">Continue to Delivery</button>
                </div>
              </motion.div>
            )}

            {step === 'delivery' && (
              <motion.div key="delivery" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card p-4 sm:p-5">
                <h2 className="font-display text-base sm:text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-royal-600" /> Delivery Options
                </h2>
                <div className="space-y-2.5">
                  <button
                    onClick={() => setDeliveryOption('standard')}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition ${
                      deliveryOption === 'standard' ? 'border-royal-600 bg-royal-50/50 shadow-soft' : 'border-navy-200 hover:border-navy-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm sm:text-base text-navy-900">Standard Delivery</p>
                        <p className="text-xs text-navy-500 mt-0.5">2-5 business days across Nigeria</p>
                      </div>
                      <span className="font-bold text-sm sm:text-base text-navy-900">
                        {shippingBase === 0 ? <span className="text-emerald-600">Free</span> : formatPrice(shippingBase)}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => setDeliveryOption('express')}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition ${
                      deliveryOption === 'express' ? 'border-royal-600 bg-royal-50/50 shadow-soft' : 'border-navy-200 hover:border-navy-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm sm:text-base text-navy-900">Express Delivery</p>
                        <p className="text-xs text-navy-500 mt-0.5">Priority 1-2 business days delivery</p>
                      </div>
                      <span className="font-bold text-sm sm:text-base text-navy-900">{formatPrice(shippingBase + 3000)}</span>
                    </div>
                  </button>
                </div>
                <div className="flex gap-2 mt-5">
                  <button onClick={prevStep} className="btn-ghost text-xs sm:text-sm"><ChevronLeft className="h-4 w-4" /> Back</button>
                  <button onClick={nextStep} className="btn-primary flex-1 text-xs sm:text-sm">Continue to Payment</button>
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card p-4 sm:p-5">
                <h2 className="font-display text-base sm:text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-royal-600" /> Choose Payment Method
                </h2>

                {/* Paystack Test Mode Banner */}
                <div className="mb-4 flex items-start gap-2.5 p-3 rounded-xl bg-royal-50/70 border border-royal-200 text-royal-900 text-xs sm:text-sm">
                  <Sparkles className="h-4 w-4 text-royal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Paystack Test Mode Active:</span> Real Paystack checkout in sandbox mode. You can test with official Paystack test cards.
                  </div>
                </div>

                <div className="space-y-2.5 mb-4">
                  {paymentMethods.map((pm) => {
                    const Icon = pm.icon;
                    const isSelected = paymentMethod === pm.key;
                    return (
                      <button
                        key={pm.key}
                        onClick={() => setPaymentMethod(pm.key)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition flex items-center gap-3 ${
                          isSelected ? 'border-royal-600 bg-royal-50/50 shadow-soft' : 'border-navy-200 hover:border-navy-300'
                        }`}
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${isSelected ? 'bg-royal-600 text-white' : 'bg-navy-100 text-navy-500'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm sm:text-base text-navy-900">{pm.label}</p>
                            {pm.badge && (
                              <span className="badge bg-emerald-100 text-emerald-700 text-[10px] font-bold py-0.5">
                                {pm.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-navy-500 mt-0.5">{pm.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Bank transfer info if selected */}
                {paymentMethod === 'bank_transfer' && (
                  <div className="mb-4 p-4 rounded-xl bg-navy-50 text-xs sm:text-sm text-navy-700 border border-navy-200">
                    <p className="font-semibold mb-1 text-navy-900">BuyAndSellOutlets Bank Account:</p>
                    <p>Bank: <span className="font-medium">First Bank of Nigeria</span></p>
                    <p>Account Name: <span className="font-medium">BuyAndSellOutlets Ltd</span></p>
                    <p>Account Number: <span className="font-mono font-bold text-royal-600">3000 0000 00</span></p>
                    <p className="mt-2 text-xs text-navy-500">Please use your order ID as reference. Your order will be confirmed upon verification.</p>
                  </div>
                )}

                {/* Error Banner */}
                {paystackState === 'failed' && (
                  <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">Payment Failed</p>
                      <p className="text-xs text-rose-700 mt-0.5">{errorMessage || 'Your transaction could not be completed. Please try again.'}</p>
                    </div>
                  </div>
                )}

                {/* Cancelled Notice */}
                {paystackState === 'cancelled' && (
                  <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm flex items-center justify-between">
                    <span>Payment modal was closed. You can retry whenever you are ready.</span>
                  </div>
                )}

                <div className="flex gap-2 mt-5">
                  <button onClick={prevStep} className="btn-ghost text-xs sm:text-sm" disabled={paystackState === 'initializing' || paystackState === 'verifying'}>
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>

                  {paymentMethod === 'paystack' ? (
                    <button
                      onClick={handlePaystackCheckout}
                      disabled={paystackState === 'initializing' || paystackState === 'verifying'}
                      className="btn-primary flex-1 py-3 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 shadow-soft hover:shadow-soft-lg"
                    >
                      {paystackState === 'initializing' && (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Preparing Paystack Payment...
                        </>
                      )}
                      {paystackState === 'waiting_popup' && (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Complete Payment in Popup...
                        </>
                      )}
                      {paystackState === 'verifying' && (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Verifying Transaction with Paystack...
                        </>
                      )}
                      {paystackState !== 'initializing' && paystackState !== 'waiting_popup' && paystackState !== 'verifying' && (
                        <>
                          <Lock className="h-4 w-4" /> Pay with Paystack · {formatPrice(total)}
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={placeBankTransferOrder}
                      disabled={placingOrder}
                      className="btn-primary flex-1 text-xs sm:text-sm"
                    >
                      {placingOrder ? 'Placing Order...' : `Place Order · ${formatPrice(total)}`}
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === 'confirmation' && (
              <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-5 sm:p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring' }}
                  className="mx-auto h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4"
                >
                  <Check className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-600" />
                </motion.div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900">
                  {confirmedOrder?.payment_status === 'paid' ? 'Payment Successful & Order Confirmed!' : 'Order Confirmed!'}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-navy-600 max-w-md mx-auto">
                  Thank you for your purchase from BuyAndSellOutlets.
                </p>

                {/* Order & Transaction Details Card */}
                <div className="mt-6 rounded-2xl border border-navy-200/80 bg-navy-50/50 p-4 sm:p-5 text-left max-w-lg mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-navy-200">
                    <span className="text-xs font-medium text-navy-500">Order ID:</span>
                    <span className="font-mono font-bold text-xs sm:text-sm text-royal-600">
                      #{orderId.slice(0, 14)}
                    </span>
                  </div>

                  {confirmedOrder?.payment_reference && (
                    <div className="flex items-center justify-between py-2 border-b border-navy-200 text-xs">
                      <span className="text-navy-500">Paystack Reference:</span>
                      <span className="font-mono font-semibold text-navy-800">{confirmedOrder.payment_reference}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-2 border-b border-navy-200 text-xs">
                    <span className="text-navy-500">Payment Status:</span>
                    <span className={`font-semibold uppercase tracking-wider ${confirmedOrder?.payment_status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {confirmedOrder?.payment_status === 'paid' ? 'PAID (Paystack Test)' : 'PENDING'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 text-sm">
                    <span className="font-semibold text-navy-900">Total Paid:</span>
                    <span className="font-display font-bold text-base text-navy-900">
                      {formatPrice(confirmedOrder?.total || total)}
                    </span>
                  </div>

                  {/* Order Items Preview */}
                  {confirmedItems.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-navy-200">
                      <p className="text-xs font-semibold text-navy-700 mb-2">Purchased Items:</p>
                      <div className="space-y-2">
                        {confirmedItems.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs text-navy-600">
                            <span className="truncate max-w-[200px]">{item.name || item.product?.name} × {item.quantity}</span>
                            <span className="font-medium">{formatPrice((item.price || item.product?.price || 0) * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button onClick={handleInvoiceDownload} className="btn-secondary text-xs sm:text-sm py-2.5">
                    <Download className="h-4 w-4" /> Download / Print Invoice
                  </button>
                  <Link to="/account/orders" className="btn-primary text-xs sm:text-sm py-2.5">
                    View Orders
                  </Link>
                  <Link to="/products" className="btn-ghost text-xs sm:text-sm py-2.5">
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order summary sidebar */}
        {step !== 'confirmation' && (
          <div>
            <div className="card p-4 sm:p-5 sticky top-24">
              <h2 className="font-display text-base sm:text-lg font-bold text-navy-900 mb-4">Order Summary</h2>

              <div className="space-y-3 max-h-64 overflow-y-auto mb-4 no-scrollbar">
                {activeItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-navy-50/60 p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <ProductImage src={item.product?.images[0]} alt={item.product?.name ?? 'Product'} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-navy-900 truncate">{item.product?.name}</p>
                      <p className="text-[11px] text-navy-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-navy-900">{formatPrice((item.product?.price ?? 0) * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code (e.g. SAVE10)"
                  className="input py-1.5 sm:py-2 text-xs sm:text-sm flex-1 uppercase"
                />
                <button onClick={applyCouponCode} className="btn-secondary text-xs sm:text-sm px-3">Apply</button>
              </div>

              <div className="space-y-2 text-xs sm:text-sm border-t border-navy-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-navy-500">Subtotal</span>
                  <span className="font-medium text-navy-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-navy-500">Shipping</span>
                  <span className="font-medium text-navy-900">{shipping === 0 ? <span className="text-emerald-600">Free</span> : formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-navy-100 flex justify-between items-baseline">
                <span className="font-display font-bold text-navy-900 text-sm sm:text-base">Total</span>
                <span className="font-display text-lg sm:text-xl font-bold text-navy-900">{formatPrice(total)}</span>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-100 flex items-center justify-center gap-1.5 text-[11px] text-navy-500">
                <Lock className="h-3.5 w-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted Payment</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
