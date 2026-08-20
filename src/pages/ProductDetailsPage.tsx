import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Heart, Share2, ShoppingCart, Zap, ShieldCheck, Truck,
  RotateCcw, Check, ChevronRight, Minus, Plus, GitCompare,
  Battery, Eye, FileCheck, Package, Clock,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { mockProducts, mockSpecs, mockConditionReports, mockReviews } from '@/lib/mockData';
import type { Product, ProductSpec, ConditionReport, Review } from '@/types';
import { formatPrice, discountPercent, isPreOwned, relatedProducts } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { useCompare } from '@/context/CompareContext';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { ConditionBadge } from '@/components/ConditionBadge';
import { ProductCard } from '@/components/ProductCard';

export function ProductDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggle: toggleWishlist, has: hasWishlist } = useWishlist();
  const { add: addRecent } = useRecentlyViewed();
  const { toggle: toggleCompare, has: hasCompare } = useCompare();
  const { toast } = useToast();
  const { session } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [specs, setSpecs] = useState<ProductSpec[]>([]);
  const [conditionReport, setConditionReport] = useState<ConditionReport | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (!isSupabaseConfigured || !supabase) {
        const prod = mockProducts.find((p) => p.slug === slug) ?? null;
        if (!prod) { setLoading(false); return; }
        setProduct(prod);
        addRecent(prod);
        setSpecs(mockSpecs[prod.slug] ?? []);
        setConditionReport(mockConditionReports[prod.slug] ?? null);
        setReviews(mockReviews.filter((r) => r.product_id === prod.id));
        setAllProducts(mockProducts);
        setRelated(relatedProducts(prod, mockProducts));
        setLoading(false);
        return;
      }
      const { data: prod } = await supabase.from('products').select('*').eq('slug', slug).maybeSingle();
      if (!prod) {
        setLoading(false);
        return;
      }
      setProduct(prod as Product);
      addRecent(prod as Product);

      const [specRes, condRes, revRes, allRes] = await Promise.all([
        supabase.from('product_specs').select('*').eq('product_id', (prod as Product).id).order('sort_order'),
        supabase.from('condition_reports').select('*').eq('product_id', (prod as Product).id).maybeSingle(),
        supabase.from('reviews').select('*').eq('product_id', (prod as Product).id).eq('is_approved', true).order('created_at', { ascending: false }),
        supabase.from('products').select('*').eq('is_active', true),
      ]);
      setSpecs(specRes.data as ProductSpec[] ?? []);
      setConditionReport(condRes.data as ConditionReport | null);
      setReviews(revRes.data as Review[] ?? []);
      const all = allRes.data as Product[] ?? [];
      setAllProducts(all);
      setRelated(relatedProducts(prod as Product, all));
      setLoading(false);
    }
    if (slug) load();
  }, [slug]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  async function handleAddCart() {
    if (!product) return;
    await addItem(product, qty);
    toast('Added to cart');
  }

  async function handleBuyNow() {
    if (!product) return;
    await addItem(product, qty);
    navigate('/checkout');
  }

  async function handleWishlist() {
    if (!product) return;
    await toggleWishlist(product);
    toast(hasWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist', 'info');
  }

  async function handleCompare() {
    if (!product) return;
    await toggleCompare(product);
    toast(hasCompare(product.id) ? 'Removed from comparison' : 'Added to comparison', 'info');
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: product?.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast('Link copied to clipboard', 'info');
    }
  }

  if (loading) {
    return (
      <div className="container-page py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="skeleton aspect-square rounded-3xl" />
          <div className="space-y-4">
            <div className="skeleton h-6 w-24" />
            <div className="skeleton h-8 w-full" />
            <div className="skeleton h-6 w-32" />
            <div className="skeleton h-24 w-full" />
            <div className="skeleton h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-navy-500">Product not found.</p>
        <Link to="/products" className="btn-primary mt-4 inline-flex">Browse Products</Link>
      </div>
    );
  }

  const discount = discountPercent(product.price, product.compare_at_price);
  const inStock = product.stock > 0;
  const wished = hasWishlist(product.id);
  const compared = hasCompare(product.id);

  return (
    <div className="container-page py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-navy-500 mb-6">
        <Link to="/" className="hover:text-royal-600">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/products" className="hover:text-royal-600">Products</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-navy-700 truncate">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image gallery */}
        <div>
          <div
            className="relative aspect-square overflow-hidden rounded-3xl card cursor-zoom-in"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300"
              style={zoom ? { transform: `scale(2)`, transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 badge bg-rose-500 text-white shadow-soft-lg">-{discount}%</span>
            )}
            {product.is_flash_deal && (
              <span className="absolute top-4 right-4 badge bg-amber-500 text-white shadow-soft-lg">
                <Zap className="h-3 w-3" /> Flash Deal
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    activeImage === i ? 'border-royal-600' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-navy-500">{product.brand}</span>
            {isPreOwned(product.condition) && <ConditionBadge condition={product.condition} />}
          </div>
          <h1 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">{product.name}</h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-navy-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-navy-500">
              {product.rating.toFixed(1)} ({product.review_count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-navy-900">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-lg text-navy-400 line-through">{formatPrice(product.compare_at_price)}</span>
            )}
            {discount > 0 && (
              <span className="badge bg-rose-100 text-rose-700">Save {discount}%</span>
            )}
          </div>

          {/* Short description */}
          {product.short_description && (
            <p className="mt-4 text-navy-600">{product.short_description}</p>
          )}

          {/* Stock + delivery */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className={`flex items-center gap-1.5 font-medium ${inStock ? 'text-emerald-600' : 'text-rose-500'}`}>
              {inStock ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              {inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity + actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center rounded-xl border border-navy-200">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 text-navy-600 hover:text-royal-600 transition"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 font-semibold text-navy-900 min-w-8 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="p-3 text-navy-600 hover:text-royal-600 transition"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAddCart}
              disabled={!inStock}
              className="btn-secondary flex-1"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!inStock}
              className="btn-primary flex-1"
            >
              Buy Now
            </button>
          </div>

          {/* Secondary actions */}
          <div className="mt-3 flex gap-2">
            <button onClick={handleWishlist} className="btn-ghost text-sm flex-1">
              <Heart className={`h-4 w-4 ${wished ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wished ? 'Wishlisted' : 'Wishlist'}
            </button>
            <button onClick={handleCompare} className="btn-ghost text-sm flex-1">
              <GitCompare className={`h-4 w-4 ${compared ? 'text-royal-600' : ''}`} />
              {compared ? 'Comparing' : 'Compare'}
            </button>
            <button onClick={handleShare} className="btn-ghost text-sm flex-1">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="card p-3 text-center">
              <ShieldCheck className="mx-auto h-5 w-5 text-emerald-500 mb-1" />
              <p className="text-xs font-medium text-navy-700">{product.warranty ?? 'Warranty'}</p>
            </div>
            <div className="card p-3 text-center">
              <Truck className="mx-auto h-5 w-5 text-royal-500 mb-1" />
              <p className="text-xs font-medium text-navy-700">{product.delivery_info ?? 'Fast Delivery'}</p>
            </div>
            <div className="card p-3 text-center">
              <RotateCcw className="mx-auto h-5 w-5 text-amber-500 mb-1" />
              <p className="text-xs font-medium text-navy-700">7-Day Returns</p>
            </div>
          </div>

          {/* Condition report for pre-owned */}
          {isPreOwned(product.condition) && conditionReport && (
            <div className="mt-6 rounded-2xl border border-royal-200 bg-royal-50/50 p-5">
              <h3 className="font-display font-bold text-navy-900 mb-3 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-royal-600" />
                Inspection Report
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {conditionReport.battery_health && (
                  <div className="flex items-center gap-2 text-sm">
                    <Battery className="h-4 w-4 text-emerald-500" />
                    <span className="text-navy-500">Battery:</span>
                    <span className="font-medium text-navy-900">{conditionReport.battery_health}</span>
                  </div>
                )}
                {conditionReport.cosmetic_condition && (
                  <div className="flex items-center gap-2 text-sm">
                    <Eye className="h-4 w-4 text-royal-500" />
                    <span className="text-navy-500">Cosmetic:</span>
                    <span className="font-medium text-navy-900">{conditionReport.cosmetic_condition}</span>
                  </div>
                )}
                {conditionReport.warranty_period && (
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span className="text-navy-500">Warranty:</span>
                    <span className="font-medium text-navy-900">{conditionReport.warranty_period}</span>
                  </div>
                )}
              </div>
              {conditionReport.inspection_report && (
                <p className="mt-3 text-sm text-navy-600">{conditionReport.inspection_report}</p>
              )}
              {conditionReport.accessories_included && conditionReport.accessories_included.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-navy-700 mb-1.5 flex items-center gap-1.5">
                    <Package className="h-4 w-4" /> Accessories Included
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {conditionReport.accessories_included.map((acc, i) => (
                      <span key={i} className="badge bg-white text-navy-600 border border-navy-200">
                        <Check className="h-3 w-3 text-emerald-500" /> {acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-1 border-b border-navy-200">
          {(['description', 'specs', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-semibold capitalize transition border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-royal-600 text-royal-600'
                  : 'border-transparent text-navy-500 hover:text-navy-700'
              }`}
            >
              {tab === 'specs' ? 'Specifications' : tab}
              {tab === 'reviews' && ` (${reviews.length})`}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none">
              <p className="text-navy-600 leading-relaxed">{product.description}</p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              {specs.length > 0 ? (
                <table className="w-full">
                  <tbody>
                    {specs.map((spec) => (
                      <tr key={spec.id} className="border-b border-navy-100">
                        <td className="py-3 pr-4 text-sm font-medium text-navy-500 w-1/3">{spec.spec_key}</td>
                        <td className="py-3 text-sm text-navy-900">{spec.spec_value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-navy-500">No specifications available.</p>
              )}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="max-w-2xl space-y-4">
              {reviews.length === 0 ? (
                <p className="text-sm text-navy-500">No reviews yet. Be the first to review this product!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-royal-600 text-white text-xs font-bold">
                          {review.author_name?.[0]?.toUpperCase() ?? 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-900">{review.author_name ?? 'Anonymous'}</p>
                          <p className="text-xs text-navy-400">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-navy-300'}`} />
                        ))}
                      </div>
                    </div>
                    {review.title && <p className="font-medium text-sm text-navy-900">{review.title}</p>}
                    {review.comment && <p className="text-sm text-navy-600 mt-1">{review.comment}</p>}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-navy-900 mb-4">Related Products</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
