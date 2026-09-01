import { handlePaystackInitialize } from '../_lib/paystackService';

export default async function handler(req: any, res: any) {
  // Always respond with JSON
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
      } catch (parseErr: any) {
        return res.status(400).json({
          status: false,
          message: 'Invalid JSON payload in request body: ' + parseErr.message,
        });
      }
    }

    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        status: false,
        message: 'Request body is empty or not an object',
      });
    }

    const secretKeyPresent = Boolean(
      process.env.PAYSTACK_SECRET_KEY ||
      process.env.PAYSTACK_TEST_SECRET_KEY ||
      process.env.VITE_PAYSTACK_SECRET_KEY
    );

    // Safe debugging log without exposing secrets
    console.log('[Paystack Init] Endpoint called', {
      method: req.method,
      customerEmail: body.customer?.email ? `${body.customer.email.slice(0, 3)}***` : 'missing',
      itemCount: Array.isArray(body.items) ? body.items.length : 0,
      secretKeyPresent,
    });

    const result = await handlePaystackInitialize(body);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('[Paystack Init Error]:', error.message || error);
    return res.status(400).json({
      status: false,
      message: error?.message || 'Failed to initialize Paystack payment',
    });
  }
}
