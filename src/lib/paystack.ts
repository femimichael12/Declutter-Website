// Paystack Client Library for BuyAndSellOutlets

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key?: string;
        email?: string;
        amount?: number;
        ref?: string;
        access_code?: string;
        currency?: string;
        callback: (response: { reference: string; status?: string; trans?: string; transaction?: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

export interface InitializePaystackParams {
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  items: Array<{
    product_id: string;
    quantity: number;
    product?: any;
  }>;
  shipping_address?: Record<string, unknown> | null;
  billing_address?: Record<string, unknown> | null;
  delivery_option?: 'standard' | 'express';
  coupon_code?: string | null;
  callback_url?: string;
  user_id?: string;
}

export interface InitializePaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
    amount: number;
    amount_in_kobo: number;
    currency: string;
  };
}

export interface VerifyPaystackResponse {
  status: boolean;
  message: string;
  order?: any;
  order_items?: any[];
  already_processed?: boolean;
  gateway_response?: string;
  paystack_transaction?: {
    id: number;
    reference: string;
    amount: number;
    currency: string;
    paid_at: string;
    channel: string;
    card_type?: string;
    last4?: string;
    bank?: string;
  };
}

/**
 * Dynamically loads Paystack inline script
 */
export function loadPaystackScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.PaystackPop) {
      resolve(true);
      return;
    }

    const existing = document.getElementById('paystack-inline-js');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'paystack-inline-js';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

/**
 * Initializes a transaction on the server
 */
export async function initializePaystackTransaction(
  params: InitializePaystackParams
): Promise<InitializePaystackResponse> {
  const response = await fetch('/api/paystack/initialize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to initialize payment.');
  }

  return data;
}

/**
 * Verifies a transaction on the server
 */
export async function verifyPaystackPayment(
  reference: string
): Promise<VerifyPaystackResponse> {
  const response = await fetch('/api/paystack/verify?reference=' + encodeURIComponent(reference), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Payment verification failed.');
  }

  return data;
}

/**
 * Opens Paystack checkout popup
 */
export async function openPaystackPopup(options: {
  publicKey?: string;
  email: string;
  amountInKobo: number;
  reference: string;
  accessCode?: string;
  onSuccess: (reference: string) => void;
  onCancel: () => void;
  onError: (error: string) => void;
}) {
  const loaded = await loadPaystackScript();

  if (!loaded || !window.PaystackPop) {
    options.onError('Could not load Paystack payment modal. Please check your network connection.');
    return;
  }

  const publicKey =
    options.publicKey ||
    import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ||
    import.meta.env.VITE_PAYSTACK_TEST_PUBLIC_KEY ||
    'pk_test_cef00ad657495055d2a7a3300bede797700cfac3';

  try {
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: options.email,
      amount: options.amountInKobo,
      ref: options.reference,
      access_code: options.accessCode,
      currency: 'NGN',
      callback: function (response) {
        const ref = response.reference || response.trans || options.reference;
        options.onSuccess(ref);
      },
      onClose: function () {
        options.onCancel();
      },
    });

    handler.openIframe();
  } catch (err: any) {
    options.onError(err.message || 'Failed to open payment modal');
  }
}
