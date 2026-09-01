/**
 * Paystack Server Service for BuyAndSellOutlets
 * Handles server-side price validation, inventory checks, transaction initialization,
 * server-side verification with Paystack API, and order creation.
 */

// In-memory idempotency cache for processed references to prevent duplicate order generation
const processedOrders = new Map<string, { order: any; orderItems: any[] }>();

// Products catalog lookup for server-side price validation & stock checks
export interface ServerProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  condition: string;
  images: string[];
}

export const serverProducts: Record<string, ServerProduct> = {
  'prod-1': {
    id: 'prod-1',
    name: 'iPhone 16 Pro Max 256GB',
    brand: 'Apple',
    price: 2050000,
    stock: 8,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-2': {
    id: 'prod-2',
    name: 'Samsung Galaxy S24 Ultra 256GB',
    brand: 'Samsung',
    price: 1750000,
    stock: 12,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-3': {
    id: 'prod-3',
    name: 'MacBook Pro 16" M3 Max 1TB',
    brand: 'Apple',
    price: 4200000,
    stock: 5,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-4': {
    id: 'prod-4',
    name: 'Sony PlayStation 5 Slim 1TB',
    brand: 'Sony',
    price: 780000,
    stock: 15,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-5': {
    id: 'prod-5',
    name: 'LG 65" OLED evo C3 4K Smart TV',
    brand: 'LG',
    price: 1950000,
    stock: 4,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-6': {
    id: 'prod-6',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    brand: 'Sony',
    price: 485000,
    stock: 20,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-7': {
    id: 'prod-7',
    name: 'Apple Watch Ultra 2 49mm Titanium',
    brand: 'Apple',
    price: 1150000,
    stock: 7,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-8': {
    id: 'prod-8',
    name: 'iPad Pro 13" M4 256GB Wi-Fi',
    brand: 'Apple',
    price: 1850000,
    stock: 6,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-9': {
    id: 'prod-9',
    name: 'Canon EOS R6 Mark II Mirrorless Camera',
    brand: 'Canon',
    price: 3100000,
    stock: 3,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-10': {
    id: 'prod-10',
    name: 'Hisense 1.5HP Inverter Split AC',
    brand: 'Hisense',
    price: 460000,
    stock: 10,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-11': {
    id: 'prod-11',
    name: 'Google Pixel 8 Pro 128GB',
    brand: 'Google',
    price: 990000,
    stock: 6,
    condition: 'Open Box',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-12': {
    id: 'prod-12',
    name: 'Dell XPS 15 9530 i7 16GB 1TB',
    brand: 'Dell',
    price: 1850000,
    stock: 4,
    condition: 'Certified Pre-Owned',
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80'],
  },
};

// Coupons for server validation
export const serverCoupons: Record<string, { code: string; type: 'percent' | 'fixed'; value: number; min_order: number }> = {
  'SAVE10': { code: 'SAVE10', type: 'percent', value: 10, min_order: 50000 },
  'WELCOME': { code: 'WELCOME', type: 'fixed', value: 5000, min_order: 30000 },
  'DECLUTTER20': { code: 'DECLUTTER20', type: 'percent', value: 20, min_order: 100000 },
};

/**
 * Gets Paystack Secret Key from environment
 */
export function getPaystackSecretKey(): string {
  const secretKey =
    process.env.PAYSTACK_SECRET_KEY ||
    process.env.PAYSTACK_TEST_SECRET_KEY ||
    process.env.VITE_PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      'Paystack Secret Key is missing. Please configure PAYSTACK_SECRET_KEY in your environment variables.'
    );
  }
  return secretKey.trim();
}

/**
 * Calculates and validates order pricing and stock on the server
 */
export function validateAndCalculateOrder(params: {
  items: Array<{ product_id: string; quantity: number; product?: any }>;
  coupon_code?: string | null;
  delivery_option?: 'standard' | 'express';
}) {
  const { items, coupon_code, delivery_option = 'standard' } = params;

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error('Order items are required.');
  }

  let subtotal = 0;
  const validatedItems: Array<{
    product_id: string;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    condition: string;
    image_url: string | null;
  }> = [];

  for (const item of items) {
    const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
    const product = serverProducts[item.product_id] || (item.product ? {
      id: item.product_id,
      name: item.product.name,
      brand: item.product.brand || 'Outlet',
      price: Number(item.product.price) || 0,
      stock: Number(item.product.stock) || 10,
      condition: item.product.condition || 'Brand New',
      images: item.product.images || [],
    } : null);

    if (!product) {
      throw new Error("Product with ID \"" + item.product_id + "\" was not found.");
    }

    // Stock verification
    if (product.stock < qty) {
      throw new Error(
        "Insufficient inventory for \"" + product.name + "\". Requested: " + qty + ", Available: " + product.stock + "."
      );
    }

    const itemTotal = product.price * qty;
    subtotal += itemTotal;

    validatedItems.push({
      product_id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      quantity: qty,
      condition: product.condition,
      image_url: product.images[0] || null,
    });
  }

  // Coupon calculation
  let discount = 0;
  let validatedCoupon = null;
  if (coupon_code) {
    const cleanCode = coupon_code.trim().toUpperCase();
    const coupon = serverCoupons[cleanCode];
    if (coupon && subtotal >= coupon.min_order) {
      validatedCoupon = coupon.code;
      if (coupon.type === 'percent') {
        discount = Math.round((subtotal * coupon.value) / 100);
      } else {
        discount = Math.min(coupon.value, subtotal);
      }
    }
  }

  // Shipping calculation
  const discountedSubtotal = subtotal - discount;
  const flatShippingRate = 2500;
  const freeShippingThreshold = 100000;
  const shippingBase = discountedSubtotal >= freeShippingThreshold ? 0 : flatShippingRate;
  const shipping = delivery_option === 'express' ? shippingBase + 3000 : shippingBase;

  const total = discountedSubtotal + shipping;
  const amountInKobo = Math.round(total * 100); // Paystack subunit

  return {
    subtotal,
    discount,
    coupon_code: validatedCoupon,
    shipping,
    total,
    amount_in_kobo: amountInKobo,
    items: validatedItems,
  };
}

/**
 * Initializes a Paystack transaction with Paystack REST API
 */
export async function handlePaystackInitialize(body: any) {
  const secretKey = getPaystackSecretKey();

  const {
    customer,
    items,
    shipping_address,
    billing_address,
    delivery_option,
    coupon_code,
    callback_url,
    user_id,
  } = body;

  if (!customer?.email) {
    throw new Error('Customer email is required for payment initialization.');
  }

  // Server-side calculation & stock check
  const orderDetails = validateAndCalculateOrder({
    items,
    coupon_code,
    delivery_option,
  });

  // Unique reference for Paystack
  const reference = "BSA-TXN-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  // Call Paystack API
  const paystackPayload = {
    email: customer.email.trim(),
    amount: orderDetails.amount_in_kobo,
    reference,
    currency: 'NGN',
    callback_url: callback_url || undefined,
    metadata: {
      custom_fields: [
        { display_name: 'Customer Name', variable_name: 'customer_name', value: customer.name || '' },
        { display_name: 'Phone Number', variable_name: 'phone_number', value: customer.phone || '' },
      ],
      order_meta: {
        user_id: user_id || 'guest',
        customer_name: customer.name || '',
        customer_email: customer.email || '',
        customer_phone: customer.phone || '',
        shipping_address: shipping_address || null,
        billing_address: billing_address || null,
        delivery_option: delivery_option || 'standard',
        subtotal: orderDetails.subtotal,
        discount: orderDetails.discount,
        shipping: orderDetails.shipping,
        total: orderDetails.total,
        coupon_code: orderDetails.coupon_code,
        items: orderDetails.items,
      },
    },
  };

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: "Bearer " + secretKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paystackPayload),
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to initialize Paystack transaction.');
  }

  return {
    status: true,
    message: 'Paystack transaction initialized successfully',
    data: {
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference,
      amount: orderDetails.total,
      amount_in_kobo: orderDetails.amount_in_kobo,
      currency: 'NGN',
    },
  };
}

/**
 * Verifies a Paystack transaction with Paystack REST API
 */
export async function handlePaystackVerify(reference: string) {
  if (!reference) {
    throw new Error('Transaction reference is required for verification.');
  }

  const cleanRef = reference.trim();

  // 1. Idempotency Check: if already verified, return cached order directly
  if (processedOrders.has(cleanRef)) {
    const existing = processedOrders.get(cleanRef);
    return {
      status: true,
      message: 'Transaction already verified (idempotent)',
      order: existing.order,
      order_items: existing.orderItems,
      already_processed: true,
    };
  }

  const secretKey = getPaystackSecretKey();

  // 2. Call Paystack Verification API
  const response = await fetch("https://api.paystack.co/transaction/verify/" + encodeURIComponent(cleanRef), {
    method: 'GET',
    headers: {
      Authorization: "Bearer " + secretKey,
    },
  });

  const paystackRes = await response.json();

  if (!response.ok || !paystackRes.status) {
    throw new Error(paystackRes.message || 'Paystack verification failed.');
  }

  const txn = paystackRes.data;

  // 3. Confirm status is SUCCESS
  if (txn.status !== 'success') {
    return {
      status: false,
      message: txn.gateway_response || ("Payment was not successful (status: " + txn.status + ")"),
      gateway_response: txn.gateway_response,
      status_code: txn.status,
    };
  }

  const orderMeta = txn.metadata?.order_meta || {};
  const orderId = "ord-" + Date.now();
  const now = new Date().toISOString();

  // 4. Reduce Inventory
  const items = orderMeta.items || [];
  for (const item of items) {
    if (serverProducts[item.product_id]) {
      serverProducts[item.product_id].stock = Math.max(
        0,
        serverProducts[item.product_id].stock - item.quantity
      );
    }
  }

  // 5. Create Confirmed Order Object
  const order = {
    id: orderId,
    user_id: orderMeta.user_id || 'guest',
    status: 'processing',
    payment_status: 'paid',
    payment_method: 'paystack',
    payment_reference: cleanRef,
    transaction_reference: cleanRef,
    payment_channel: txn.channel || 'card',
    paid_at: txn.paid_at || now,
    subtotal: orderMeta.subtotal || Math.round(txn.amount / 100),
    discount: orderMeta.discount || 0,
    shipping: orderMeta.shipping || 0,
    tax: 0,
    total: orderMeta.total || Math.round(txn.amount / 100),
    currency: txn.currency || 'NGN',
    coupon_code: orderMeta.coupon_code || null,
    shipping_address: orderMeta.shipping_address || null,
    billing_address: orderMeta.billing_address || null,
    tracking_number: null,
    notes: '',
    created_at: now,
    updated_at: now,
  };

  const orderItems = items.map((item: any, index: number) => ({
    id: "item-" + Date.now() + "-" + index,
    order_id: orderId,
    product_id: item.product_id,
    name: item.name,
    brand: item.brand,
    image_url: item.image_url,
    price: item.price,
    quantity: item.quantity,
    condition: item.condition,
  }));

  // Store in idempotency map
  processedOrders.set(cleanRef, { order, orderItems });

  return {
    status: true,
    message: 'Payment verified and order confirmed successfully',
    order,
    order_items: orderItems,
    paystack_transaction: {
      id: txn.id,
      reference: txn.reference,
      amount: txn.amount,
      currency: txn.currency,
      paid_at: txn.paid_at,
      channel: txn.channel,
      card_type: txn.authorization?.card_type,
      last4: txn.authorization?.last4,
      bank: txn.authorization?.bank,
    },
  };
}
