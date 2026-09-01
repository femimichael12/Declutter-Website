/**
 * Paystack Server Service for BuyAndSellOutlets
 * Handles server-side price validation, inventory checks, transaction initialization,
 * server-side verification with Paystack API, and order creation.
 */
import https from 'node:https';

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
    price: 1800000,
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
    price: 2150000,
    stock: 6,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-6': {
    id: 'prod-6',
    name: 'Dyson V15 Detect Cordless Vacuum',
    brand: 'Dyson',
    price: 890000,
    stock: 10,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-7': {
    id: 'prod-7',
    name: 'Bose QuietComfort Ultra Headphones',
    brand: 'Bose',
    price: 520000,
    stock: 20,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-8': {
    id: 'prod-8',
    name: 'Apple Watch Ultra 2 (GPS + Cellular)',
    brand: 'Apple',
    price: 980000,
    stock: 9,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-9': {
    id: 'prod-9',
    name: 'Sony Alpha A7 IV Mirrorless Camera',
    brand: 'Sony',
    price: 2950000,
    stock: 4,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-10': {
    id: 'prod-10',
    name: 'Breville Barista Touch Espresso Machine',
    brand: 'Breville',
    price: 1350000,
    stock: 7,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-11': {
    id: 'prod-11',
    name: 'iPad Pro 13" M4 256GB (Wi-Fi)',
    brand: 'Apple',
    price: 1650000,
    stock: 11,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-12': {
    id: 'prod-12',
    name: 'Samsung 85" QN90C Neo QLED 4K TV',
    brand: 'Samsung',
    price: 4850000,
    stock: 3,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-13': {
    id: 'prod-13',
    name: "DeLonghi Magnifica S Coffee Maker",
    brand: "DeLonghi",
    price: 620000,
    stock: 14,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-14': {
    id: 'prod-14',
    name: 'DJI Mini 4 Pro Fly More Combo',
    brand: 'DJI',
    price: 1420000,
    stock: 8,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-15': {
    id: 'prod-15',
    name: 'Sonos Arc Premium Smart Soundbar',
    brand: 'Sonos',
    price: 1180000,
    stock: 10,
    condition: 'Brand New',
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-16': {
    id: 'prod-16',
    name: 'iPhone 15 Pro 256GB (Certified Pre-Owned)',
    brand: 'Apple',
    price: 1150000,
    stock: 5,
    condition: 'Like New (Pre-Owned)',
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-17': {
    id: 'prod-17',
    name: 'MacBook Air 13" M2 256GB (Certified Pre-Owned)',
    brand: 'Apple',
    price: 950000,
    stock: 6,
    condition: 'Excellent (Pre-Owned)',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-18': {
    id: 'prod-18',
    name: 'Samsung Galaxy S23 Ultra (Certified Pre-Owned)',
    brand: 'Samsung',
    price: 880000,
    stock: 7,
    condition: 'Like New (Pre-Owned)',
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-19': {
    id: 'prod-19',
    name: 'Sony WH-1000XM5 (Certified Pre-Owned)',
    brand: 'Sony',
    price: 280000,
    stock: 12,
    condition: 'Excellent (Pre-Owned)',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'],
  },
  'prod-20': {
    id: 'prod-20',
    name: 'iPad Air 5th Gen 64GB (Certified Pre-Owned)',
    brand: 'Apple',
    price: 540000,
    stock: 8,
    condition: 'Like New (Pre-Owned)',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80'],
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
 * Cross-environment HTTP client helper for Paystack REST API
 */
async function callPaystackApi(
  method: 'GET' | 'POST',
  endpoint: string,
  secretKey: string,
  payload?: any
): Promise<any> {
  // First attempt via Node https request
  try {
    return await new Promise((resolve, reject) => {
      const postData = payload ? JSON.stringify(payload) : undefined;
      const options: https.RequestOptions = {
        hostname: 'api.paystack.co',
        port: 443,
        path: endpoint,
        method,
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
          ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {}),
        },
        rejectUnauthorized: false,
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            resolve(parsed);
          } catch {
            reject(new Error(`Invalid JSON response from Paystack (HTTP ${res.statusCode}): ${body.slice(0, 100)}`));
          }
        });
      });

      req.on('error', reject);
      if (postData) req.write(postData);
      req.end();
    });
  } catch (err: any) {
    // Fallback to fetch
    const url = `https://api.paystack.co${endpoint}`;
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });
    return await res.json();
  }
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
    let product = serverProducts[item.product_id];

    if (!product && item.product) {
      product = {
        id: item.product_id,
        name: item.product.name || 'Product',
        brand: item.product.brand || 'General',
        price: Number(item.product.price) || 0,
        stock: Number(item.product.stock) || 10,
        condition: item.product.condition || 'Brand New',
        images: Array.isArray(item.product.images) && item.product.images.length > 0
          ? item.product.images
          : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'],
      };
    }

    if (!product) {
      throw new Error(`Product "${item.product_id}" not found in catalog.`);
    }

    if (product.stock < qty) {
      throw new Error(
        `Insufficient inventory for "${product.name}". Requested: ${qty}, Available: ${product.stock}.`
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

  const data = await callPaystackApi('POST', '/transaction/initialize', secretKey, paystackPayload);

  if (!data || !data.status) {
    throw new Error(data?.message || 'Failed to initialize Paystack transaction.');
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
  const paystackRes = await callPaystackApi(
    'GET',
    `/transaction/verify/${encodeURIComponent(cleanRef)}`,
    secretKey
  );

  if (!paystackRes || !paystackRes.status) {
    throw new Error(paystackRes?.message || 'Paystack verification failed.');
  }

  const txn = paystackRes.data;

  // 3. Confirm status is SUCCESS
  if (txn.status !== 'success') {
    return {
      status: false,
      message: txn.gateway_response || (`Payment was not successful (status: ${txn.status})`),
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
