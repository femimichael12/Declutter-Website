import { handlePaystackVerify } from '../paystackService';

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ status: false, message: 'Method Not Allowed' });
  }

  try {
    const reference =
      req.query?.reference ||
      (typeof req.body === 'string' ? JSON.parse(req.body || '{}').reference : req.body?.reference);

    if (!reference) {
      return res.status(400).json({ status: false, message: 'Transaction reference is required' });
    }

    const result = await handlePaystackVerify(String(reference));
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Paystack verification error:', error);
    return res.status(400).json({
      status: false,
      message: error.message || 'Failed to verify payment',
    });
  }
}
