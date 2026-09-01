export type Condition = 'Brand New' | 'Open Box' | 'Certified Pre-Owned' | 'Pre-Owned' | 'Refurbished' | 'Like New' | 'Excellent' | 'Very Good' | 'Good' | 'Fair';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'failed';
export type PaymentMethod = 'paystack' | 'flutterwave' | 'card' | 'bank_transfer';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: 'customer' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string | null;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  image_url: string | null;
  description: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model?: string;
  storage?: string | null;
  ram?: string | null;
  processor?: string | null;
  category_id: string | null;
  category_slug?: string;
  subcategory?: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  condition: Condition;
  stock: number;
  sku: string | null;
  rating: number;
  review_count: number;
  sales_count: number;
  images: string[];
  is_featured: boolean;
  is_flash_deal: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_active: boolean;
  warranty: string | null;
  delivery_info: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductSpec {
  id: string;
  product_id: string;
  spec_key: string;
  spec_value: string;
  sort_order: number;
}

export interface ConditionReport {
  id: string;
  product_id: string;
  battery_health: string | null;
  cosmetic_condition: string | null;
  inspection_report: string | null;
  accessories_included: string[] | null;
  warranty_period: string | null;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  saved_for_later: boolean;
  created_at: string;
  product?: Product;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: Product;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  coupon_code: string | null;
  payment_method: string | null;
  payment_status: PaymentStatus;
  payment_reference?: string | null;
  transaction_reference?: string | null;
  payment_channel?: string | null;
  currency?: string;
  paid_at?: string | null;
  shipping_address: Record<string, unknown> | null;
  billing_address: Record<string, unknown> | null;
  tracking_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  name: string;
  brand: string | null;
  image_url: string | null;
  price: number;
  quantity: number;
  condition: string | null;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  author_name: string | null;
  rating: number;
  title: string | null;
  comment: string | null;
  is_approved: boolean;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  min_order: number;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  is_active: boolean;
  expires_at: string | null;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string | null;
  type: string;
  is_read: boolean;
  link: string | null;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Settings {
  [key: string]: string;
}
