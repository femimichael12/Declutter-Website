import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
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
  ShoppingBag,
  Tag,
  ArrowRight,
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

const steps: { key: Step; label: string; shortLabel: string }[] = [
  { key: 'shipping', label: 'Shipping', shortLabel: 'Ship' },
  { key: 'billing', label: 'Billing', shortLabel: 'Bill' },
  { key: 'delivery', label: 'Delivery', shortLabel: 'Deliver' },
  { key: 'payment', label: 'Payment', shortLabel: 'Pay' },
  { key: 'confirmation', label: 'Confirmation', shortLabel: 'Done' },
];

const paymentMethods: {
  key: PaymentMethod;
  label: string;
  desc: string;
  icon: typeof CreditCard;
  badge?: string;
}[] = [
  {
    key: 'paystack',
    label: 'Paystack (Cards / Bank / USSD)',
    desc: 'Instant secure checkout via Paystack',
    icon: Wallet,
    badge: 'Official Paystack',
  },
  {
    key: 'bank_transfer',
    label: 'Direct Bank Transfer',
    desc: 'Transfer directly to BuyAndSellOutlets bank account',
    icon: Building2,
  },
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
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

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
  const totalItemCount = activeItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = activeItems.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);
  const discount = appliedCoupon ? applyCoupon(subtotal, appliedCoupon) : 0;
  const shippingBase = calculateShipping(
    subtotal - discount,
    Number(settings.flat_shipping_rate),
    Number(settings.free_shipping_threshold)
  );
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

  const currentStepIdx = steps.findIndex((s) => s.key === step);

  function nextStep() {
    const next = steps[currentStepIdx + 1];
    if (next) {
      setStep(next.key);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function prevStep() {
    const prev = steps[currentStepIdx - 1];
    if (prev) {
      setStep(prev.key);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleProceedFromShipping() {
    if (!addr.full_name.trim()) {
      toast('Please enter your full name', 'error');
      return;
    }
    if (!addr.email.trim() || !addr.email.includes('@')) {
      toast('Please enter a valid email address for your receipt', 'error');
      return;
    }
    if (!addr.phone.trim()) {
      toast('Please enter a delivery phone number', 'error');
      return;
    }
    if (!addr.address_line1.trim()) {
      toast('Please enter your delivery street address', 'error');
      return;
    }
    if (!addr.city.trim()) {
      toast('Please enter your city', 'error');
      return;
    }
    if (!addr.state.trim()) {
      toast('Please enter your state', 'error');
      return;
    }
    nextStep();
  }

  function applyCouponCode() {
    if (!couponCode.trim()) {
      toast('Please enter a coupon code', 'error');
      return;
    }
    const clean = couponCode.trim().toUpperCase();
    const found = mockCoupons.find((c) => c.code.toUpperCase() === clean && c.is_active);
    if (!found) {
      toast('Invalid coupon code', 'error');
      return;
    }
    if (subtotal < found.min_order_amount) {
      toast(`Minimum order amount for this coupon is ${formatPrice(found.min_order_amount)}`, 'error');
      return;
    }
    setAppliedCoupon(found);
    toast(`Coupon "${found.code}" applied successfully!`, 'success');
  }

  function getEffectiveAddress() {
    if (selectedAddressId) {
      const found = addresses.find((a) => a.id === selectedAddressId);
      if (found) return found;
    }
    return {
      full_name: addr.full_name,
      phone: addr.phone,
      address_line1: addr.address_line1,
      address_line2: addr.address_line2 || null,
      city: addr.city,
      state: addr.state,
      postal_code: addr.postal_code || null,
      country: 'Nigeria',
    };
  }

  /**
   * Verified Payment Handler
   */
  async function handleVerifyPayment(reference: string) {
    setPaystackState('verifying');
    try {
      const verifyRes = await verifyPaystackPayment(reference);
      if (verifyRes.status && verifyRes.order) {
        setConfirmedOrder(verifyRes.order);
        setConfirmedItems(verifyRes.order_items || activeItems);
        setOrderId(verifyRes.order.id);
        setPaystackState('idle');
        clearCart();
        setStep('confirmation');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Record in Firestore if authenticated
        if (db && session?.user?.id) {
          try {
            await addDoc(collection(db, 'orders'), verifyRes.order);
            await addDoc(collection(db, 'notifications'), {
              user_id: session.user.id,
              title: 'Payment Successful',
              body: `Your payment for order #${verifyRes.order.id.slice(0, 8)} was successful via Paystack.`,
              type: 'order',
              is_read: false,
              link: '/account/orders',
              created_at: new Date().toISOString(),
            });
          } catch (err) {
            console.warn('Firestore order sync fallback:', err);
          }
        }
        toast('Payment confirmed! Your order has been placed.', 'success');
      } else {
        throw new Error(verifyRes.message || 'Payment verification failed.');
      }
    } catch (err: any) {
      setPaystackState('failed');
      setErrorMessage(err.message || 'Transaction verification error.');
      toast(err.message || 'Payment verification error', 'error');
    }
  }

  /**
   * Initializes and triggers real Paystack popup
   */
  async function handlePaystackCheckout() {
    const effAddress = getEffectiveAddress();
    if (!effAddress || !effAddress.address_line1) {
      toast('Please complete your delivery address', 'error');
      setStep('shipping');
      return;
    }

    const customerEmail = (addr.email || session?.user?.email || profile?.email || '').trim();
    if (!customerEmail || !customerEmail.includes('@')) {
      toast('A valid email address is required for payment confirmation', 'error');
      setStep('shipping');
      return;
    }

    setPaystackState('initializing');
    setErrorMessage(null);

    try {
      const payloadItems = activeItems.map((i) => ({
        product_id: i.product_id,
        quantity: i.quantity,
        product: {
          id: i.product?.id || i.product_id,
          name: i.product?.name,
          brand: i.product?.brand,
          price: i.product?.price,
          stock: i.product?.stock,
          condition: i.product?.condition,
          images: i.product?.images,
        },
      }));

      const initRes = await initializePaystackTransaction({
        customer: {
          email: customerEmail,
          name: addr.full_name || profile?.full_name || 'Customer',
          phone: addr.phone || profile?.phone || '',
        },
        items: payloadItems,
        shipping_address: effAddress,
        billing_address: billingSame ? effAddress : null,
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

      setOrderId(createdOrderId);
      setConfirmedOrder({
        id: createdOrderId,
        payment_status: 'unpaid',
        payment_method: 'bank_transfer',
        total,
      });
      setConfirmedItems(activeItems);
      clearCart();
      setStep('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast('Order placed successfully! Please complete bank transfer.', 'success');
    } catch (err: any) {
      toast(err.message || 'Failed to place order', 'error');
    } finally {
      setPlacingOrder(false);
    }
  }

  function handleInvoiceDownload() {
    window.print();
  }

  if (activeItems.length === 0 && step !== 'confirmation') {
    return (
      <div className="container-page py-12 sm:py-16 text-center max-w-lg mx-auto px-4">
        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-navy-100/80 flex items-center justify-center mx-auto mb-4 text-navy-400">
          <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10" />
        </div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-navy-900 mb-2">Your cart is empty</h1>
        <p className="text-xs sm:text-sm text-navy-600 mb-6">Add items to your cart to proceed with secure checkout.</p>
        <button onClick={() => navigate('/products')} className="btn-primary w-full sm:w-auto px-6 py-3">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pb-28 sm:pb-16">
      <div className="container-page py-4 sm:py-8 max-w-6xl mx-auto px-3.5 sm:px-6">
        
        {/* Page Title & Secure Badge */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="font-display text-lg sm:text-2xl font-bold text-navy-900 tracking-tight">Checkout</h1>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-full font-medium">
            <Lock className="h-3 w-3 text-emerald-600" />
            <span className="hidden xs:inline text-[11px] sm:text-xs">256-Bit SSL Secure</span>
            <span className="xs:hidden text-[11px]">Secure</span>
          </div>
        </div>

        {/* Step Indicator */}
        {step !== 'confirmation' && (
          <div className="mb-4 sm:mb-7 bg-white rounded-2xl p-2.5 sm:p-4 border border-navy-100 shadow-xs">
            <div className="flex items-center justify-between gap-1 sm:gap-2">
              {steps.slice(0, 4).map((s, i) => {
                const isActive = i === currentStepIdx;
                const isPassed = i < currentStepIdx;
                return (
                  <div key={s.key} className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <div
                      className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-[11px] sm:text-xs font-semibold flex-shrink-0 transition-all ${
                        isPassed
                          ? 'bg-emerald-600 text-white'
                          : isActive
                          ? 'bg-royal-600 text-white shadow-soft ring-2 ring-royal-200'
                          : 'bg-navy-100 text-navy-400'
                      }`}
                    >
                      {isPassed ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : i + 1}
                    </div>
                    <span
                      className={`text-xs font-medium truncate ${
                        isActive ? 'text-navy-900 font-bold' : isPassed ? 'text-navy-700' : 'text-navy-400 hidden xs:inline'
                      }`}
                    >
                      <span className="sm:hidden">{s.shortLabel}</span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </span>
                    {i < 3 && (
                      <div
                        className={`flex-1 h-0.5 rounded-full mx-1 transition-colors ${
                          isPassed ? 'bg-emerald-500' : 'bg-navy-100'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile Collapsible Order Summary Banner (Visible on mobile screens) */}
        {step !== 'confirmation' && (
          <div className="lg:hidden mb-4 bg-white rounded-2xl border border-navy-100 shadow-xs overflow-hidden">
            <button
              onClick={() => setIsMobileSummaryOpen(!isMobileSummaryOpen)}
              className="w-full flex items-center justify-between p-3.5 text-left bg-slate-50/70 hover:bg-slate-100/70 transition"
            >
              <div className="flex items-center gap-2 min-w-0">
                <ShoppingBag className="h-4 w-4 text-royal-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-navy-900 truncate">
                  {isMobileSummaryOpen ? 'Hide' : 'Show'} Order Summary ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
                </span>
                {isMobileSummaryOpen ? (
                  <ChevronUp className="h-3.5 w-3.5 text-navy-500" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-navy-500" />
                )}
              </div>
              <span className="font-display font-bold text-sm text-navy-900 ml-2">
                {formatPrice(total)}
              </span>
            </button>

            <AnimatePresence>
              {isMobileSummaryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-3.5 border-t border-navy-100 space-y-3"
                >
                  <div className="space-y-2.5 max-h-52 overflow-y-auto no-scrollbar">
                    {activeItems.map((item) => (
                      <div key={item.id} className="flex gap-2.5 items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div className="h-11 w-11 rounded-lg bg-navy-50 p-1 flex items-center justify-center flex-shrink-0 border border-navy-100">
                            <ProductImage
                              src={item.product?.images[0]}
                              alt={item.product?.name ?? 'Product'}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-navy-900 truncate">{item.product?.name}</p>
                            <p className="text-[11px] text-navy-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-navy-900 ml-2">
                          {formatPrice((item.product?.price ?? 0) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Form */}
                  <div className="flex gap-1.5 pt-2 border-t border-navy-100">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon Code"
                      className="input py-1.5 text-xs flex-1 uppercase rounded-xl"
                    />
                    <button onClick={applyCouponCode} className="btn-secondary text-xs px-3 py-1.5 rounded-xl">
                      Apply
                    </button>
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="space-y-1.5 text-xs text-navy-600 pt-2 border-t border-navy-100">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-navy-900">{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discount ({appliedCoupon?.code})</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium text-navy-900">
                        {shipping === 0 ? <span className="text-emerald-600">Free</span> : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-navy-100 font-bold text-sm text-navy-900">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Main Checkout Layout Grid */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 items-start">
          
          {/* Left Column: Checkout Steps Forms */}
          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: SHIPPING & DELIVERY INFORMATION */}
              {step === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="card p-4 sm:p-6 bg-white border border-navy-100/90 rounded-2xl shadow-xs"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-100">
                    <h2 className="font-display text-base sm:text-lg font-bold text-navy-900 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-royal-600" />
                      Delivery Information
                    </h2>
                    <span className="text-xs font-semibold text-navy-400">Step 1 of 4</span>
                  </div>

                  {addresses.length > 0 && (
                    <div className="space-y-2 mb-5">
                      <p className="text-xs font-bold text-navy-600 uppercase tracking-wider">Saved Addresses</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {addresses.map((a) => (
                          <button
                            key={a.id}
                            type="button"
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
                            className={`text-left p-3 rounded-xl border-2 transition ${
                              selectedAddressId === a.id
                                ? 'border-royal-600 bg-royal-50/50 shadow-xs ring-1 ring-royal-600/30'
                                : 'border-navy-200 hover:border-navy-300 bg-white'
                            }`}
                          >
                            <p className="font-bold text-xs sm:text-sm text-navy-900 truncate">{a.full_name}</p>
                            <p className="text-xs text-navy-600 mt-0.5 line-clamp-2">
                              {a.address_line1}, {a.city}, {a.state}
                            </p>
                            <p className="text-[11px] font-medium text-navy-500 mt-1">{a.phone}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">Full Name *</label>
                        <input
                          className="input h-11 text-xs sm:text-sm w-full rounded-xl bg-slate-50/50 focus:bg-white"
                          placeholder="e.g. John Doe"
                          value={addr.full_name}
                          onChange={(e) => setAddr({ ...addr, full_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">Email (for receipt) *</label>
                        <input
                          className="input h-11 text-xs sm:text-sm w-full rounded-xl bg-slate-50/50 focus:bg-white"
                          placeholder="e.g. john@example.com"
                          type="email"
                          value={addr.email}
                          onChange={(e) => setAddr({ ...addr, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-700 mb-1">Phone Number (for courier updates) *</label>
                      <input
                        className="input h-11 text-xs sm:text-sm w-full rounded-xl bg-slate-50/50 focus:bg-white"
                        placeholder="e.g. 08012345678"
                        type="tel"
                        value={addr.phone}
                        onChange={(e) => setAddr({ ...addr, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-700 mb-1">Street Address *</label>
                      <input
                        className="input h-11 text-xs sm:text-sm w-full rounded-xl bg-slate-50/50 focus:bg-white"
                        placeholder="e.g. 15 Victoria Island Road"
                        value={addr.address_line1}
                        onChange={(e) => setAddr({ ...addr, address_line1: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-700 mb-1">Apartment, suite, unit (optional)</label>
                      <input
                        className="input h-11 text-xs sm:text-sm w-full rounded-xl bg-slate-50/50 focus:bg-white"
                        placeholder="e.g. Flat 4B"
                        value={addr.address_line2}
                        onChange={(e) => setAddr({ ...addr, address_line2: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-3 grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">City *</label>
                        <input
                          className="input h-11 text-xs sm:text-sm w-full rounded-xl bg-slate-50/50 focus:bg-white"
                          placeholder="e.g. Ikeja"
                          value={addr.city}
                          onChange={(e) => setAddr({ ...addr, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">State *</label>
                        <input
                          className="input h-11 text-xs sm:text-sm w-full rounded-xl bg-slate-50/50 focus:bg-white"
                          placeholder="e.g. Lagos"
                          value={addr.state}
                          onChange={(e) => setAddr({ ...addr, state: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons for Desktop / In-page */}
                  <div className="mt-6 pt-4 border-t border-navy-100 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={handleProceedFromShipping}
                      className="btn-primary w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-soft hover:shadow-soft-lg"
                    >
                      <span>Continue to Billing</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: BILLING DETAILS */}
              {step === 'billing' && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="card p-4 sm:p-6 bg-white border border-navy-100/90 rounded-2xl shadow-xs"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-100">
                    <h2 className="font-display text-base sm:text-lg font-bold text-navy-900 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-royal-600" />
                      Billing Address
                    </h2>
                    <span className="text-xs font-semibold text-navy-400">Step 2 of 4</span>
                  </div>

                  <label className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border-2 border-royal-600 bg-royal-50/40 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={billingSame}
                      onChange={(e) => setBillingSame(e.target.checked)}
                      className="h-4 w-4 mt-0.5 accent-royal-600 rounded"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-navy-900 block">
                        Billing address matches shipping address
                      </span>
                      <span className="text-[11px] sm:text-xs text-navy-500 mt-0.5 block">
                        {addr.address_line1 ? `${addr.address_line1}, ${addr.city}, ${addr.state}` : 'Use the delivery information provided in step 1'}
                      </span>
                    </div>
                  </label>

                  {!billingSame && (
                    <div className="p-3.5 rounded-xl bg-navy-50 border border-navy-200/70 text-xs text-navy-600">
                      Your official receipt and invoice will be issued using the customer details provided during payment.
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-navy-100">
                    <button type="button" onClick={prevStep} className="btn-ghost text-xs sm:text-sm flex items-center gap-1.5 px-3 py-2.5">
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <button type="button" onClick={nextStep} className="btn-primary px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                      <span>Continue to Delivery</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: DELIVERY OPTIONS */}
              {step === 'delivery' && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="card p-4 sm:p-6 bg-white border border-navy-100/90 rounded-2xl shadow-xs"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-100">
                    <h2 className="font-display text-base sm:text-lg font-bold text-navy-900 flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-royal-600" />
                      Delivery Speed
                    </h2>
                    <span className="text-xs font-semibold text-navy-400">Step 3 of 4</span>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryOption('standard')}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition flex items-center justify-between ${
                        deliveryOption === 'standard'
                          ? 'border-royal-600 bg-royal-50/40 shadow-xs ring-1 ring-royal-600/30'
                          : 'border-navy-200 hover:border-navy-300 bg-white'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-navy-900">Standard Delivery</p>
                        <p className="text-[11px] sm:text-xs text-navy-500 mt-0.5">2-5 business days nationwide delivery</p>
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-navy-900 ml-2">
                        {shippingBase === 0 ? <span className="text-emerald-600 font-bold">Free</span> : formatPrice(shippingBase)}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryOption('express')}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition flex items-center justify-between ${
                        deliveryOption === 'express'
                          ? 'border-royal-600 bg-royal-50/40 shadow-xs ring-1 ring-royal-600/30'
                          : 'border-navy-200 hover:border-navy-300 bg-white'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-navy-900">Express Priority Delivery</p>
                        <p className="text-[11px] sm:text-xs text-navy-500 mt-0.5">1-2 business days priority dispatch</p>
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-navy-900 ml-2">
                        {formatPrice(shippingBase + 3000)}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-navy-100">
                    <button type="button" onClick={prevStep} className="btn-ghost text-xs sm:text-sm flex items-center gap-1.5 px-3 py-2.5">
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <button type="button" onClick={nextStep} className="btn-primary px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                      <span>Continue to Payment</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: PAYMENT METHOD & CTA */}
              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="card p-4 sm:p-6 bg-white border border-navy-100/90 rounded-2xl shadow-xs"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-100">
                    <h2 className="font-display text-base sm:text-lg font-bold text-navy-900 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-royal-600" />
                      Payment Method
                    </h2>
                    <span className="text-xs font-semibold text-navy-400">Step 4 of 4</span>
                  </div>

                  {/* Clean Selectable Payment Option Cards */}
                  <div className="space-y-3 mb-5">
                    {paymentMethods.map((pm) => {
                      const Icon = pm.icon;
                      const isSelected = paymentMethod === pm.key;
                      return (
                        <button
                          key={pm.key}
                          type="button"
                          onClick={() => setPaymentMethod(pm.key)}
                          className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition flex items-center gap-3.5 ${
                            isSelected
                              ? 'border-royal-600 bg-royal-50/40 shadow-xs ring-1 ring-royal-600/30'
                              : 'border-navy-200 hover:border-navy-300 bg-white'
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 transition-colors ${
                              isSelected ? 'bg-royal-600 text-white' : 'bg-navy-100 text-navy-500'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-bold text-xs sm:text-sm text-navy-900">{pm.label}</p>
                              {pm.badge && (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                                  {pm.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] sm:text-xs text-navy-500 mt-0.5">{pm.desc}</p>
                          </div>

                          <div
                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'border-royal-600 bg-royal-600' : 'border-navy-300'
                            }`}
                          >
                            {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Direct Bank Transfer Bank Details */}
                  {paymentMethod === 'bank_transfer' && (
                    <div className="mb-5 p-4 rounded-xl bg-slate-50 border border-navy-200/80 text-xs text-navy-700">
                      <p className="font-bold text-navy-900 mb-2">BuyAndSellOutlets Bank Account:</p>
                      <div className="space-y-1 bg-white p-3 rounded-lg border border-navy-100 font-medium">
                        <p><span className="text-navy-500">Bank:</span> First Bank of Nigeria</p>
                        <p><span className="text-navy-500">Account Name:</span> BuyAndSellOutlets Ltd</p>
                        <p><span className="text-navy-500">Account Number:</span> <span className="font-mono font-bold text-royal-600">3000 0000 00</span></p>
                      </div>
                      <p className="mt-2 text-[11px] text-navy-500">
                        Please use your order ID or full name as transfer reference.
                      </p>
                    </div>
                  )}

                  {/* Failure Error Alert */}
                  {paystackState === 'failed' && (
                    <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                      <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-bold">Payment Failed</p>
                        <p className="text-xs text-rose-700 mt-0.5">
                          {errorMessage || 'Your transaction could not be initialized. Please try again.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Cancelled Notice */}
                  {paystackState === 'cancelled' && (
                    <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
                      <span>Payment popup closed. You can tap the button below to retry.</span>
                    </div>
                  )}

                  {/* In-page Action Buttons */}
                  <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-navy-100">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-ghost text-xs sm:text-sm flex items-center gap-1.5 px-3 py-2.5"
                      disabled={paystackState === 'initializing' || paystackState === 'verifying'}
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>

                    {paymentMethod === 'paystack' ? (
                      <button
                        type="button"
                        onClick={handlePaystackCheckout}
                        disabled={paystackState === 'initializing' || paystackState === 'verifying'}
                        className="btn-primary flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-xl shadow-soft hover:shadow-soft-lg transition"
                      >
                        {paystackState === 'initializing' && (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Preparing Payment...
                          </>
                        )}
                        {paystackState === 'waiting_popup' && (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Complete in Popup...
                          </>
                        )}
                        {paystackState === 'verifying' && (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Verifying Payment...
                          </>
                        )}
                        {paystackState !== 'initializing' &&
                          paystackState !== 'waiting_popup' &&
                          paystackState !== 'verifying' && (
                            <>
                              <Lock className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">Pay with Paystack · {formatPrice(total)}</span>
                            </>
                          )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={placeBankTransferOrder}
                        disabled={placingOrder}
                        className="btn-primary flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-xl shadow-soft hover:shadow-soft-lg transition"
                      >
                        {placingOrder ? 'Placing Order...' : `Place Order · ${formatPrice(total)}`}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 5: ORDER CONFIRMATION */}
              {step === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-5 sm:p-8 text-center bg-white border border-navy-100 rounded-2xl shadow-xs"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring' }}
                    className="mx-auto h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4"
                  >
                    <Check className="h-7 w-7 sm:h-10 sm:w-10 text-emerald-600" />
                  </motion.div>

                  <h2 className="font-display text-lg sm:text-2xl font-bold text-navy-900">
                    {confirmedOrder?.payment_status === 'paid'
                      ? 'Payment Successful & Order Confirmed!'
                      : 'Order Received!'}
                  </h2>

                  <p className="mt-1.5 text-xs sm:text-sm text-navy-600 max-w-md mx-auto">
                    Thank you for shopping with BuyAndSellOutlets. A receipt has been generated.
                  </p>

                  <div className="mt-5 rounded-2xl border border-navy-200/80 bg-slate-50/70 p-4 sm:p-5 text-left max-w-lg mx-auto space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pb-2.5 border-b border-navy-200">
                      <span className="text-navy-500 font-medium">Order ID:</span>
                      <span className="font-mono font-bold text-royal-600">#{orderId.slice(0, 14)}</span>
                    </div>

                    {confirmedOrder?.payment_reference && (
                      <div className="flex items-center justify-between py-1.5 border-b border-navy-200 text-xs">
                        <span className="text-navy-500">Paystack Ref:</span>
                        <span className="font-mono font-semibold text-navy-800">{confirmedOrder.payment_reference}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between py-1.5 border-b border-navy-200 text-xs">
                      <span className="text-navy-500">Payment Status:</span>
                      <span
                        className={`font-bold uppercase tracking-wider ${
                          confirmedOrder?.payment_status === 'paid' ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {confirmedOrder?.payment_status === 'paid' ? 'PAID (Paystack)' : 'PENDING'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-sm font-bold text-navy-900">
                      <span>Total Amount:</span>
                      <span>{formatPrice(confirmedOrder?.total || total)}</span>
                    </div>

                    {confirmedItems.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-navy-200">
                        <p className="text-xs font-bold text-navy-700 mb-2">Order Items:</p>
                        <div className="space-y-1.5">
                          {confirmedItems.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs text-navy-600">
                              <span className="truncate max-w-[200px]">
                                {item.name || item.product?.name} × {item.quantity}
                              </span>
                              <span className="font-semibold text-navy-900">
                                {formatPrice((item.price || item.product?.price || 0) * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-2.5 justify-center">
                    <button
                      type="button"
                      onClick={handleInvoiceDownload}
                      className="btn-secondary text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <Download className="h-4 w-4" /> Download / Print Receipt
                    </button>
                    <Link to="/account/orders" className="btn-primary text-xs sm:text-sm py-2.5 px-4 rounded-xl">
                      View Orders
                    </Link>
                    <Link to="/products" className="btn-ghost text-xs sm:text-sm py-2.5 px-4 rounded-xl">
                      Continue Shopping
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Desktop Order Summary Sidebar */}
          {step !== 'confirmation' && (
            <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
              <div className="card p-5 bg-white border border-navy-100 rounded-2xl shadow-xs sticky top-24">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-navy-100">
                  <h2 className="font-display text-base font-bold text-navy-900">Order Summary</h2>
                  <span className="text-xs font-semibold text-navy-500">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto mb-4 pr-1 no-scrollbar">
                  {activeItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="h-12 w-12 rounded-xl bg-navy-50 p-1 flex items-center justify-center overflow-hidden flex-shrink-0 border border-navy-100">
                        <ProductImage
                          src={item.product?.images[0]}
                          alt={item.product?.name ?? 'Product'}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-navy-900 truncate">{item.product?.name}</p>
                        <p className="text-[11px] text-navy-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-navy-900 ml-2">
                        {formatPrice((item.product?.price ?? 0) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Input */}
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-navy-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="COUPON (E.G. SAVE10)"
                      className="input pl-8 py-2 text-xs w-full uppercase rounded-xl"
                    />
                  </div>
                  <button type="button" onClick={applyCouponCode} className="btn-secondary text-xs px-3.5 rounded-xl">
                    Apply
                  </button>
                </div>

                {/* Pricing Summary */}
                <div className="space-y-2 text-xs border-t border-navy-100 pt-3.5 text-navy-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-navy-900">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-navy-900">
                      {shipping === 0 ? <span className="text-emerald-600">Free</span> : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-navy-100 flex justify-between items-baseline">
                    <span className="font-display font-bold text-navy-900 text-sm">Total</span>
                    <span className="font-display text-lg font-bold text-navy-900">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-navy-100 flex items-center justify-center gap-1.5 text-[11px] text-navy-500">
                  <Lock className="h-3 w-3 text-emerald-600" />
                  <span>256-Bit SSL Encrypted Payment</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sticky Bottom Payment Bar (Fixed on mobile viewport) */}
      {step !== 'confirmation' && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-navy-200/80 px-4 py-3 sm:hidden shadow-lg pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="min-w-0">
              <span className="text-[10px] font-medium text-navy-500 uppercase tracking-wider block">Total</span>
              <span className="font-display font-bold text-base text-navy-900 leading-tight block">
                {formatPrice(total)}
              </span>
            </div>

            {step === 'shipping' && (
              <button
                type="button"
                onClick={handleProceedFromShipping}
                className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5 rounded-xl flex-1 justify-center shadow-soft"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {step === 'billing' && (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5 rounded-xl flex-1 justify-center shadow-soft"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {step === 'delivery' && (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5 rounded-xl flex-1 justify-center shadow-soft"
              >
                <span>Payment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {step === 'payment' && (
              paymentMethod === 'paystack' ? (
                <button
                  type="button"
                  onClick={handlePaystackCheckout}
                  disabled={paystackState === 'initializing' || paystackState === 'verifying'}
                  className="btn-primary py-2.5 px-3.5 text-xs font-bold flex items-center gap-1.5 rounded-xl flex-1 justify-center shadow-soft"
                >
                  {paystackState === 'initializing' && (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Preparing...
                    </>
                  )}
                  {paystackState === 'waiting_popup' && (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> In Popup...
                    </>
                  )}
                  {paystackState === 'verifying' && (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Verifying...
                    </>
                  )}
                  {paystackState !== 'initializing' &&
                    paystackState !== 'waiting_popup' &&
                    paystackState !== 'verifying' && (
                      <>
                        <Lock className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">Pay with Paystack</span>
                      </>
                    )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={placeBankTransferOrder}
                  disabled={placingOrder}
                  className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5 rounded-xl flex-1 justify-center shadow-soft"
                >
                  {placingOrder ? 'Placing...' : 'Place Order'}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
