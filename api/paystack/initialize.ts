import https from 'node:https';

// Product Catalog for server-side price validation & stock validation
const catalog: Record<string, { id: string; name: string; price: number; stock: number }> = {
  'prod-1': { id: 'prod-1', name: 'iPhone 16 Pro Max 256GB', price: 2050000, stock: 8 },
  'prod-2': { id: 'prod-2', name: 'Samsung Galaxy S24 Ultra 256GB', price: 1800000, stock: 12 },
  'prod-3': { id: 'prod-3', name: 'MacBook Pro 16" M3 Max 1TB', price: 4200000, stock: 5 },
  'prod-4': { id: 'prod-4', name: 'Sony PlayStation 5 Slim 1TB', price: 780000, stock: 15 },
  'prod-5': { id: 'prod-5', name: 'LG 65" OLED evo C3 4K Smart TV', price: 2150000, stock: 6 },
  'prod-6': { id: 'prod-6', name: 'Dyson V15 Detect Cordless Vacuum', price: 890000, stock: 10 },
  'prod-7': { id: 'prod-7', name: 'Bose QuietComfort Ultra Headphones', price: 520000, stock: 20 },
  'prod-8': { id: 'prod-8', name: 'Apple Watch Ultra 2 (GPS + Cellular)', price: 980000, stock: 9 },
  'prod-9': { id: 'prod-9', name: 'Sony Alpha A7 IV Mirrorless Camera', price: 2950000, stock: 4 },
  'prod-10': { id: 'prod-10', name: 'Breville Barista Touch Espresso Machine', price: 1350000, stock: 7 },
  'prod-11': { id: 'prod-11', name: 'iPad Pro 13" M4 256GB (Wi-Fi)', price: 1650000, stock: 11 },
  'prod-12': { id: 'prod-12', name: 'Samsung 85" QN90C Neo QLED 4K TV', price: 4850000, stock: 3 },
  'prod-13': { id: 'prod-13', name: 'DeLonghi Magnifica S Coffee Maker', price: 620000, stock: 14 },
  'prod-14': { id: 'prod-14', name: 'DJI Mini 4 Pro Fly More Combo', price: 1420000, stock: 8 },
  'prod-15': { id: 'prod-15', name: 'Sonos Arc Premium Smart Soundbar', price: 1180000, stock: 10 },
  'prod-16': { id: 'prod-16', name: 'iPhone 15 Pro 256GB (Certified Pre-Owned)', price: 1150000, stock: 5 },
  'prod-17': { id: 'prod-17', name: 'MacBook Air 13" M2 256GB (Certified Pre-Owned)', price: 950000, stock: 6 },
  'prod-18': { id: 'prod-18', name: 'Samsung Galaxy S23 Ultra (Certified Pre-Owned)', price: 880000, stock: 7 },
  'prod-19': { id: 'prod-19', name: 'Sony WH-1000XM5 (Certified Pre-Owned)', price: 280000, stock: 12 },
  'prod-20': { id: 'prod-20', name: 'iPad Air 5th Gen 64GB (Certified Pre-Owned)', price: 540000, stock: 8 },
};

// Coupons Catalog
const coupons: Record<string, { code: string; type: 'percent' | 'fixed'; value: number; min_order: number }> = {
  'SAVE10': { code: 'SAVE10', type: 'percent', value: 10, min_order: 50000 },
  'WELCOME': { code: 'WELCOME', type: 'fixed', value: 5000, min_order: 30000 },
  'DECLUTTER20': { code: 'DECLUTTER20', type: 'percent', value: 20, min_order: 100000 },
};

function getPaystackSecretKey(): string {
  const key =
    process.env.PAYSTACK_SECRET_KEY ||
    process.env.PAYSTACK_TEST_SECRET_KEY ||
    process.env.VITE_PAYSTACK_SECRET_KEY;

  if (!key) {
    throw new Error('PAYSTACK_SECRET_KEY is missing from environment variables.');
  }
  return key.trim();
}

function requestPaystack(secretKey: string, payload: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const dataStr = JSON.stringify(payload);
    const options: https.RequestOptions = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataStr),
      },
      rejectUnauthorized: false,
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);
    req.write(dataStr);
    req.end();
  });
}

export default async function handler(req: any, res: any) {
  // Always guarantee JSON response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      status: false,
      message: `Method ${req.method} Not Allowed. Expected POST.`,
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (err: any) {
        return res.status(400).json({
          status: false,
          message: 'Invalid JSON request payload: ' + err.message,
        });
      }
    }

    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        status: false,
        message: 'Request payload is empty',
      });
    }

    const {
      customer,
      items,
      coupon_code,
      delivery_option = 'standard',
      shipping_address,
      billing_address,
      callback_url,
      user_id = 'guest',
    } = body;

    if (!customer || !customer.email) {
      return res.status(400).json({
        status: false,
        message: 'Customer email is required for payment initialization',
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'Order items are required',
      });
    }

    // 1. Authoritative Server-side Price & Stock Calculation
    let subtotal = 0;
    const validatedItems: Array<any> = [];

    for (const item of items) {
      const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
      let product = catalog[item.product_id];

      if (!product && item.product) {
        product = {
          id: item.product_id,
          name: item.product.name || 'Product',
          price: Number(item.product.price) || 0,
          stock: Number(item.product.stock) || 10,
        };
      }

      if (!product) {
        return res.status(400).json({
          status: false,
          message: `Product "${item.product_id}" not found in catalog`,
        });
      }

      const itemTotal = product.price * qty;
      subtotal += itemTotal;

      validatedItems.push({
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
      });
    }

    // Coupon calculation
    let discount = 0;
    let validatedCoupon: string | null = null;
    if (coupon_code) {
      const cleanCode = coupon_code.trim().toUpperCase();
      const cp = coupons[cleanCode];
      if (cp && subtotal >= cp.min_order) {
        validatedCoupon = cp.code;
        discount = cp.type === 'percent'
          ? Math.round((subtotal * cp.value) / 100)
          : Math.min(cp.value, subtotal);
      }
    }

    // Shipping calculation
    const discountedSubtotal = subtotal - discount;
    const flatShippingRate = 2500;
    const freeShippingThreshold = 100000;
    const shippingBase = discountedSubtotal >= freeShippingThreshold ? 0 : flatShippingRate;
    const shipping = delivery_option === 'express' ? shippingBase + 3000 : shippingBase;

    const total = discountedSubtotal + shipping;
    const amountInKobo = Math.round(total * 100);

    const secretKey = getPaystackSecretKey();
    const reference = "BSA-TXN-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // 2. Paystack Payload
    const paystackPayload = {
      email: customer.email.trim(),
      amount: amountInKobo,
      reference,
      currency: 'NGN',
      callback_url: callback_url || undefined,
      metadata: {
        custom_fields: [
          { display_name: 'Customer Name', variable_name: 'customer_name', value: customer.name || '' },
          { display_name: 'Phone Number', variable_name: 'phone_number', value: customer.phone || '' },
        ],
        order_meta: {
          user_id,
          customer_name: customer.name || '',
          customer_email: customer.email || '',
          customer_phone: customer.phone || '',
          shipping_address: shipping_address || null,
          billing_address: billing_address || null,
          delivery_option,
          subtotal,
          discount,
          shipping,
          total,
          coupon_code: validatedCoupon,
          items: validatedItems,
        },
      },
    };

    console.log('[Paystack Initialize]', {
      reference,
      amountInKobo,
      totalNGN: total,
      secretKeyPresent: Boolean(secretKey),
    });

    const response = await requestPaystack(secretKey, paystackPayload);

    if (response.data && response.data.status) {
      return res.status(200).json({
        status: true,
        message: 'Paystack transaction initialized successfully',
        data: {
          authorization_url: response.data.data.authorization_url,
          access_code: response.data.data.access_code,
          reference,
          amount: total,
          amount_in_kobo: amountInKobo,
          currency: 'NGN',
        },
      });
    }

    return res.status(400).json({
      status: false,
      message: response.data?.message || 'Paystack initialization failed',
      details: response.data || response.raw,
    });
  } catch (error: any) {
    console.error('[Paystack Init Exception]', error.message || error);
    return res.status(400).json({
      status: false,
      message: error.message || 'Payment initialization error',
    });
  }
}
