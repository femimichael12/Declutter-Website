import type { Product, Coupon } from '@/types';

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function discountPercent(price: number, compareAt: number | null): number {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function isPreOwned(condition: string): boolean {
  return condition !== 'Brand New';
}

export function applyCoupon(subtotal: number, coupon: Coupon): number {
  if (coupon.min_order > subtotal) return 0;
  let discount = 0;
  if (coupon.type === 'percent') {
    discount = (coupon.value / 100) * subtotal;
    if (coupon.max_discount && discount > coupon.max_discount) {
      discount = coupon.max_discount;
    }
  } else {
    discount = coupon.value;
  }
  return Math.min(discount, subtotal);
}

export function calculateShipping(subtotal: number, flatRate: number, freeThreshold: number): number {
  if (subtotal >= freeThreshold) return 0;
  return flatRate;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function relatedProducts(product: Product, all: Product[], limit = 4): Product[] {
  return all
    .filter((p) => p.id !== product.id && p.is_active)
    .sort((a, b) => {
      let aScore = 0;
      let bScore = 0;
      if (a.category_id === product.category_id) aScore += 3;
      if (b.category_id === product.category_id) bScore += 3;
      if (a.brand === product.brand) aScore += 2;
      if (b.brand === product.brand) bScore += 2;
      if (a.condition === product.condition) aScore += 1;
      if (b.condition === product.condition) bScore += 1;
      return bScore - aScore;
    })
    .slice(0, limit);
}
