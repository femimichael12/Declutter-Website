import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  GitCompare,
  Battery,
  Eye,
  FileCheck,
  Package,
  Clock,
  Maximize2,
  X,
  AlertCircle,
  Camera,
} from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/products';
import { mockReviews } from '@/lib/mockData';
import type { Product, ProductSpec, ConditionReport, Review } from '@/types';
import { formatPrice, discountPercent, isPreOwned, relatedProducts } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { useCompare } from '@/context/CompareContext';
import { useToast } from '@/context/ToastContext';
import { ConditionBadge } from '@/components/ConditionBadge';
import { ProductCard } from '@/components/ProductCard';
import { ProductImage } from '@/components/ProductImage';

export function ProductDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggle: toggleWishlist, has: hasWishlist } = useWishlist();
  const { add: addRecent } = useRecentlyViewed();
  const { toggle: toggleCompare, has: hasCompare } = useCompare();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [specs, setSpecs] = useState<ProductSpec[]>([]);
  const [conditionReport, setConditionReport] = useState<ConditionReport | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    setActiveImage(0);
    setQty(1);
    setActiveTab('description');

    async function load() {
      if (!slug) return;
      setLoading(true);
      try {
        const [detailRes, allProducts] = await Promise.all([
          getProductBySlug(slug),
          getProducts(),
        ]);

        if (detailRes.product) {
          setProduct(detailRes.product);
          addRecent(detailRes.product);
          setSpecs(detailRes.specs);
          setConditionReport(detailRes.conditionReport);
          setReviews(mockReviews.filter((r) => r.product_id === detailRes.product!.id));
          setRelated(relatedProducts(detailRes.product, allProducts));
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Error loading product details:', err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  function nextImage(e?: React.MouseEvent) {
    e?.stopPropagation();
    if (!product || !product.images || product.images.length <= 1) return;
    setActiveImage((prev) => (prev + 1) % product.images.length);
  }

  function prevImage(e?: React.MouseEvent) {
    e?.stopPropagation();
    if (!product || !product.images || product.images.length <= 1) return;
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  }

  async function handleAddCart() {
    if (!product || product.stock <= 0) return;
    await addItem(product, qty);
    toast('Added to cart', 'success');
  }

  async function handleBuyNow() {
    if (!product || product.stock <= 0) return;
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
        <Package className="h-16 w-16 text-navy-300 mx-auto mb-3" />
        <h2 className="font-display text-2xl font-bold text-navy-900">Product Not Found</h2>
        <p className="text-sm text-navy-500 mt-1">The requested product could not be located or has been unpublished.</p>
        <Link to="/products" className="btn-primary mt-5 inline-flex">
          Browse Products
        </Link>
      </div>
    );
  }

  const discount = discountPercent(product.price, product.compare_at_price);
  const inStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;
  const isOnlyOne = product.stock === 1;
  const wished = hasWishlist(product.id);
  const compared = hasCompare(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [];
  const currentImage = images[activeImage] || images[0] || '';

  return (
    <div className="container-page py-3 sm:py-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-navy-500 mb-4 sm:mb-6 overflow-hidden">
        <Link to="/" className="hover:text-royal-600 flex-shrink-0 transition">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
        <Link to="/products" className="hover:text-royal-600 flex-shrink-0 transition">
          Products
        </Link>
        <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
        <span className="text-navy-800 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 items-start">
        {/* Authentic Multi-Image Gallery */}
        <div className="flex flex-col w-full">
          <div
            className="group relative w-full h-[280px] xs:h-[340px] sm:h-[420px] md:h-[480px] lg:h-[500px] overflow-hidden rounded-2xl sm:rounded-3xl card border border-navy-200/90 shadow-soft flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 select-none cursor-zoom-in"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Ambient Background Glow */}
            {currentImage && (
              <div
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 scale-125 pointer-events-none transition-all duration-500"
                style={{ backgroundImage: `url(${currentImage})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/5 via-transparent to-white/40 pointer-events-none" />

            {/* Authentic Product Image Display */}
            <ProductImage
              src={currentImage}
              alt={product.name}
              categorySlug={product.category_slug}
              className="max-h-[92%] max-w-[92%] w-auto h-auto object-contain transition-transform duration-300 relative z-10"
              style={
                zoom
                  ? {
                      transform: `scale(1.9)`,
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }
                  : undefined
              }
            />

            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
              {discount > 0 && (
                <span className="badge bg-rose-500 text-white shadow-soft-md font-bold text-[11px] sm:text-xs">
                  -{discount}%
                </span>
              )}
              {product.is_flash_deal && (
                <span className="badge bg-amber-500 text-white shadow-soft-md font-semibold text-[11px] sm:text-xs flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Flash Deal
                </span>
              )}
            </div>

            {/* Fullscreen Lightbox trigger */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(true);
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-xl glass-strong text-navy-700 hover:text-royal-600 hover:scale-105 transition shadow-soft opacity-90 hover:opacity-100"
              title="View full-resolution authentic photo"
              aria-label="View full-resolution authentic photo"
            >
              <Maximize2 className="h-4 w-4" />
            </button>

            {/* Floating Prev/Next Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full glass-strong text-navy-800 hover:bg-white hover:text-royal-600 shadow-soft-md transition-all opacity-90 sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Previous authentic photo"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full glass-strong text-navy-800 hover:bg-white hover:text-royal-600 shadow-soft-md transition-all opacity-90 sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Next authentic photo"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full glass-strong text-[11px] sm:text-xs font-semibold text-navy-700 shadow-soft">
                  {activeImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Authentic Gallery Thumbnails Strip */}
          {images.length > 1 && (
            <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative h-14 w-14 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border-2 transition p-1 bg-navy-50/90 shadow-soft hover:shadow-soft-md ${
                    activeImage === i
                      ? 'border-royal-600 ring-2 ring-royal-200 shadow-soft-md scale-[1.02]'
                      : 'border-transparent opacity-75 hover:opacity-100 hover:border-navy-200'
                  }`}
                  aria-label={`View authentic photo ${i + 1}`}
                >
                  <ProductImage
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    className="h-full w-full object-contain rounded-lg sm:rounded-xl"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information & Purchase Panel */}
        <div className="flex flex-col">
          {/* Brand & Condition Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-royal-600">
              {product.brand}
            </span>
            <ConditionBadge condition={product.condition} />
          </div>

          {/* Title */}
          <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-2.5 flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                    i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-navy-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-navy-500 font-medium">
              {product.rating.toFixed(1)}{' '}
              <span className="text-navy-400">({product.review_count} reviews)</span>
            </span>
          </div>

          {/* Price & Savings */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-baseline gap-2 sm:gap-3">
            <span className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-base sm:text-lg text-navy-400 line-through font-normal">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
            {discount > 0 && (
              <span className="badge bg-rose-100 text-rose-700 font-bold text-xs">Save {discount}%</span>
            )}
          </div>

          {/* Short Description */}
          {product.short_description && (
            <p className="mt-3 text-xs sm:text-sm text-navy-600 leading-relaxed">
              {product.short_description}
            </p>
          )}

          {/* Real Stock Quantity Status Badge */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            {inStock ? (
              <span
                className={`inline-flex items-center gap-1.5 font-bold px-3 py-1 rounded-full border ${
                  isOnlyOne
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : isLowStock
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                <Check className="h-3.5 w-3.5" />
                {isOnlyOne
                  ? 'Only 1 left in stock!'
                  : isLowStock
                  ? `Low Stock (Only ${product.stock} available)`
                  : `In Stock (${product.stock} available)`}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                <AlertCircle className="h-3.5 w-3.5" />
                Out of Stock
              </span>
            )}

            {product.sku && <span className="text-navy-400 text-xs font-mono">SKU: {product.sku}</span>}
          </div>

          {/* Quantity Selector + Add to Cart / Buy Now CTA */}
          <div className="mt-5 sm:mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            {inStock && (
              <div className="flex items-center rounded-xl border border-navy-200 bg-white shadow-soft">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2.5 sm:p-3 text-navy-600 hover:text-royal-600 transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-3 font-semibold text-navy-900 min-w-8 text-center text-sm sm:text-base">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="p-2.5 sm:p-3 text-navy-600 hover:text-royal-600 transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleAddCart}
              disabled={!inStock}
              className={`btn-secondary flex-1 py-3 text-sm sm:text-base font-semibold ${
                !inStock ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {inStock ? 'Add to Cart' : 'Sold Out'}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!inStock}
              className={`btn-primary w-full sm:flex-1 py-3 text-sm sm:text-base font-bold shadow-soft hover:shadow-soft-lg ${
                !inStock ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {inStock ? 'Buy Now' : 'Out of Stock'}
            </button>
          </div>

          {/* Secondary Actions (Wishlist, Compare, Share) */}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleWishlist}
              className="btn-ghost text-xs sm:text-sm py-2 px-3 flex-1 justify-center rounded-xl border border-navy-200 hover:border-navy-300"
            >
              <Heart className={`h-4 w-4 ${wished ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{wished ? 'Wishlisted' : 'Wishlist'}</span>
            </button>
            <button
              type="button"
              onClick={handleCompare}
              className="btn-ghost text-xs sm:text-sm py-2 px-3 flex-1 justify-center rounded-xl border border-navy-200 hover:border-navy-300"
            >
              <GitCompare className={`h-4 w-4 ${compared ? 'text-royal-600' : ''}`} />
              <span>{compared ? 'Comparing' : 'Compare'}</span>
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="btn-ghost text-xs sm:text-sm py-2 px-3 flex-1 justify-center rounded-xl border border-navy-200 hover:border-navy-300"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Value Highlights */}
          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            <div className="card p-3 text-center bg-slate-50/60 border border-navy-100 rounded-xl">
              <ShieldCheck className="mx-auto h-5 w-5 text-emerald-600 mb-1" />
              <p className="text-[11px] sm:text-xs font-semibold text-navy-900 truncate">
                {product.warranty || 'Warranty Included'}
              </p>
            </div>
            <div className="card p-3 text-center bg-slate-50/60 border border-navy-100 rounded-xl">
              <Truck className="mx-auto h-5 w-5 text-royal-600 mb-1" />
              <p className="text-[11px] sm:text-xs font-semibold text-navy-900 truncate">
                {product.delivery_info || 'Fast Delivery'}
              </p>
            </div>
            <div className="card p-3 text-center bg-slate-50/60 border border-navy-100 rounded-xl">
              <RotateCcw className="mx-auto h-5 w-5 text-amber-600 mb-1" />
              <p className="text-[11px] sm:text-xs font-semibold text-navy-900 truncate">7-Day Return Guarantee</p>
            </div>
          </div>

          {/* Condition Inspection Report for Pre-Owned Products */}
          {isPreOwned(product.condition) && conditionReport && (
            <div className="mt-5 rounded-2xl border border-royal-200 bg-royal-50/50 p-4 sm:p-5">
              <h3 className="font-display font-bold text-sm sm:text-base text-navy-900 mb-3 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-royal-600" />
                Physical Inspection & Quality Report
              </h3>
              <div className="grid gap-2.5 sm:grid-cols-2 text-xs sm:text-sm">
                {conditionReport.battery_health && (
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-emerald-600" />
                    <span className="text-navy-500">Battery Health:</span>
                    <span className="font-bold text-navy-900">{conditionReport.battery_health}</span>
                  </div>
                )}
                {conditionReport.cosmetic_condition && (
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-royal-600" />
                    <span className="text-navy-500">Cosmetic Grade:</span>
                    <span className="font-bold text-navy-900">{conditionReport.cosmetic_condition}</span>
                  </div>
                )}
                {conditionReport.warranty_period && (
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span className="text-navy-500">Warranty:</span>
                    <span className="font-bold text-navy-900">{conditionReport.warranty_period}</span>
                  </div>
                )}
              </div>

              {conditionReport.inspection_report && (
                <p className="mt-2.5 text-xs text-navy-700 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-royal-100">
                  {conditionReport.inspection_report}
                </p>
              )}

              {conditionReport.accessories_included && conditionReport.accessories_included.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-bold text-navy-800 mb-1.5 flex items-center gap-1.5">
                    <Package className="h-4 w-4 text-royal-600" /> Included Physical Accessories:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {conditionReport.accessories_included.map((acc, i) => (
                      <span
                        key={i}
                        className="badge bg-white text-navy-700 border border-royal-200 text-[11px]"
                      >
                        <Check className="h-3 w-3 text-emerald-600" /> {acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs: Description / Specifications / Reviews */}
      <div className="mt-10 sm:mt-12">
        <div className="flex gap-2 border-b border-navy-200 overflow-x-auto no-scrollbar">
          {(['description', 'specs', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-xs sm:text-sm font-bold capitalize whitespace-nowrap transition border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-royal-600 text-royal-600'
                  : 'border-transparent text-navy-500 hover:text-navy-800'
              }`}
            >
              {tab === 'specs' ? 'Specifications' : tab}
              {tab === 'reviews' && ` (${reviews.length})`}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none text-navy-700 leading-relaxed text-xs sm:text-sm bg-white p-5 rounded-2xl border border-navy-100">
              <p className="whitespace-pre-line">{product.description || product.short_description || 'No detailed description provided.'}</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-3xl bg-white rounded-2xl border border-navy-100 overflow-hidden">
              {specs.length > 0 ? (
                <table className="w-full text-xs sm:text-sm">
                  <tbody className="divide-y divide-navy-100">
                    {specs.map((spec) => (
                      <tr key={spec.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-semibold text-navy-500 w-1/3 bg-slate-50/60">
                          {spec.spec_key}
                        </td>
                        <td className="py-3 px-4 text-navy-900 font-medium">{spec.spec_value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-6 text-center text-navy-500 text-xs sm:text-sm">
                  No technical specifications listed for this item.
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-2xl space-y-3">
              {reviews.length === 0 ? (
                <div className="card p-6 text-center text-navy-500 text-xs sm:text-sm">
                  No customer reviews yet.
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="card p-4 bg-white border border-navy-100 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-royal-600 text-white text-xs font-bold">
                          {review.author_name?.[0]?.toUpperCase() ?? 'U'}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-navy-900">
                            {review.author_name ?? 'Verified Buyer'}
                          </p>
                          <p className="text-[10px] text-navy-400">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-navy-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.title && (
                      <p className="font-bold text-xs sm:text-sm text-navy-900">{review.title}</p>
                    )}
                    {review.comment && (
                      <p className="text-xs sm:text-sm text-navy-600 mt-1">{review.comment}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <div className="mt-10 sm:mt-14">
          <h2 className="font-display text-lg sm:text-xl font-bold text-navy-900 mb-4">
            Related Authentic Products
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition shadow-soft-lg"
              aria-label="Close fullscreen view"
            >
              <X className="h-6 w-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition shadow-soft-lg"
                  aria-label="Previous authentic photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition shadow-soft-lg"
                  aria-label="Next authentic photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm font-semibold text-white">
                  {activeImage + 1} / {images.length}
                </div>
              </>
            )}

            <div
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentImage}
                alt={product.name}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl drop-shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
