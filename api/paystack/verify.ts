import https from 'node:https';

// In-memory idempotency cache
const processedOrders = new Map<string, any>();

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

function verifyWithPaystack(secretKey: string, reference: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options: https.RequestOptions = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/transaction/verify/${encodeURIComponent(reference)}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
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

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({
      status: false,
      message: `Method ${req.method} Not Allowed. Expected GET or POST.`,
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const reference =
      req.query?.reference ||
      req.query?.trxref ||
      body?.reference ||
      body?.trxref;

    if (!reference || typeof reference !== 'string') {
      return res.status(400).json({
        status: false,
        message: 'Transaction reference is required for payment verification',
      });
    }

    const cleanRef = reference.trim();

    // Idempotency check
    if (processedOrders.has(cleanRef)) {
      const cached = processedOrders.get(cleanRef);
      return res.status(200).json({
        status: true,
        message: 'Transaction already verified (idempotent)',
        order: cached.order,
        order_items: cached.order_items,
        already_processed: true,
      });
    }

    const secretKey = getPaystackSecretKey();
    const result = await verifyWithPaystack(secretKey, cleanRef);

    if (!result.data || !result.data.status) {
      return res.status(400).json({
        status: false,
        message: result.data?.message || 'Payment verification failed with Paystack',
      });
    }

    const txn = result.data.data;

    if (txn.status !== 'success') {
      return res.status(400).json({
        status: false,
        message: txn.gateway_response || `Payment status is ${txn.status}`,
        gateway_response: txn.gateway_response,
      });
    }

    const orderMeta = txn.metadata?.order_meta || {};
    const orderId = "ord-" + Date.now();
    const now = new Date().toISOString();

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
      notes: '',
      created_at: now,
      updated_at: now,
    };

    const orderItems = (orderMeta.items || []).map((item: any, idx: number) => ({
      id: `item-${Date.now()}-${idx}`,
      order_id: orderId,
      product_id: item.product_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    processedOrders.set(cleanRef, { order, order_items: orderItems });

    return res.status(200).json({
      status: true,
      message: 'Payment verified successfully',
      order,
      order_items: orderItems,
      paystack_transaction: {
        id: txn.id,
        reference: txn.reference,
        amount: txn.amount,
        currency: txn.currency,
        paid_at: txn.paid_at,
        channel: txn.channel,
      },
    });
  } catch (error: any) {
    console.error('[Paystack Verify Exception]', error.message || error);
    return res.status(400).json({
      status: false,
      message: error.message || 'Payment verification error',
    });
  }
}
