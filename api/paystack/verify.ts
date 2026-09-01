import { handlePaystackVerify } from '../_lib/paystackService';

export default async function handler(req: any, res: any) {
  // Always respond with JSON
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

    const secretKeyPresent = Boolean(
      process.env.PAYSTACK_SECRET_KEY ||
      process.env.PAYSTACK_TEST_SECRET_KEY ||
      process.env.VITE_PAYSTACK_SECRET_KEY
    );

    console.log('[Paystack Verify] Endpoint called', {
      method: req.method,
      reference,
      secretKeyPresent,
    });

    const result = await handlePaystackVerify(String(reference));
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('[Paystack Verify Error]:', error.message || error);
    return res.status(400).json({
      status: false,
      message: error?.message || 'Failed to verify Paystack payment',
    });
  }
}
