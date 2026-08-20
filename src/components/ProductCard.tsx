import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingCart, Zap } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, discountPercent, isPreOwned } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/context/CartContext';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { toast } = useToast();
  const discount = discountPercent(product.price, product.compare_at_price);
  const inStock = product.stock > 0;
  const wished = has(product.id);

  async function handleAddCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    await addItem(product, 1);
    toast('Added to cart');
  }

  async function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    await toggle(product);
    toast(wished ? 'Removed from wishlist' : 'Added to wishlist', 'info');
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card group relative overflow-hidden flex flex-col"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-navy-50">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="badge bg-rose-500 text-white shadow-soft">-{discount}%</span>
            )}
            {product.is_flash_deal && (
              <span className="badge bg-amber-500 text-white shadow-soft">
                <Zap className="h-3 w-3" /> Flash
              </span>
            )}
          </div>
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 rounded-full p-2 glass-strong shadow-soft transition hover:scale-110 active:scale-95"
            aria-label="Toggle wishlist"
          >
            <Heart className={`h-4 w-4 ${wished ? 'fill-rose-500 text-rose-500' : 'text-navy-600'}`} />
          </button>
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 p-3 transition-transform duration-300 group-hover:translate-y-0">
            <button
              onClick={handleAddCart}
              className="btn-primary flex-1 text-sm py-2"
              disabled={!inStock}
            >
              <ShoppingCart className="h-4 w-4" />
              {inStock ? 'Add to Cart' : 'Sold Out'}
            </button>
            <Link
              to={`/product/${product.slug}`}
              className="btn-secondary px-3 py-2"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-navy-500">{product.brand}</span>
        </div>
        <Link to={`/product/${product.slug}`} className="mt-1.5 block">
          <h3 className="font-display text-sm font-semibold leading-snug text-navy-900 line-clamp-2 group-hover:text-royal-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.short_description && (
          <p className="mt-1 text-xs text-navy-500 line-clamp-1">{product.short_description}</p>
        )}
        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-navy-900">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-sm text-navy-400 line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            {inStock ? (
              <span className="text-xs font-medium text-emerald-600">In Stock</span>
            ) : (
              <span className="text-xs font-medium text-rose-500">Out of Stock</span>
            )}
            {isPreOwned(product.condition) && (
              <span className="text-xs text-navy-400">· Inspected</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
