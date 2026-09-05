import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, BadgeCheck,
  Truck, Headphones, Star, Quote,
} from 'lucide-react';
import { getProducts, getCategories } from '@/lib/products';
import type { Product, Category } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { ProductRow } from '@/components/ProductRow';
import { SectionHeader } from '@/components/SectionHeader';
import { ProductGridSkeleton, HeroSkeleton } from '@/components/Skeleton';
import { HeroCarousel } from '@/components/HeroCarousel';
import { SocialCarousel } from '@/components/SocialCarousel';
import * as LucideIcons from 'lucide-react';

const reviews = [
  { name: 'Adaeze O.', text: 'The pre-owned iPhone I bought was in perfect condition. The inspection report was spot on. Highly recommend BuyAndSellOutlets!', rating: 5, role: 'Verified Buyer' },
  { name: 'Tunde A.', text: 'Bought a MacBook Air and it arrived in 2 days. Battery health was exactly as described. Great service and fair prices.', rating: 5, role: 'Verified Buyer' },
  { name: 'Chioma N.', text: 'The flash deals are incredible. Got my PS5 for 20% off and it works perfectly. Will definitely shop here again.', rating: 5, role: 'Verified Buyer' },
  { name: 'Emeka O.', text: 'Excellent customer support. They answered all my questions on WhatsApp before I bought my TV. Very professional.', rating: 5, role: 'Verified Buyer' },
];

const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Canon', 'JBL', 'Anker', 'Google', 'Microsoft', 'Marshall'];

export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [preOwned, setPreOwned] = useState<Product[]>([]);
  const [brandNew, setBrandNew] = useState<Product[]>([]);
  const [flashDeals, setFlashDeals] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [cats, allProds] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        const activeProds = allProds.filter((p) => p.is_active !== false);

        setCategories(cats);
        setFeatured(activeProds.filter((p) => p.is_featured));
        setPreOwned(activeProds.filter((p) => p.condition !== 'Brand New'));
        setBrandNew(activeProds.filter((p) => p.condition === 'Brand New'));
        setFlashDeals(activeProds.filter((p) => p.is_flash_deal));
        setNewArrivals(
          activeProds
            .filter((p) => p.is_new_arrival)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        );
        setBestSellers(activeProds.filter((p) => p.is_best_seller));
      } catch (err) {
        console.error('Error loading home page products:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);


  if (loading) {
    return (
      <div className="container-page py-8 space-y-12">
        <HeroSkeleton />
        <ProductGridSkeleton count={4} />
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Hero carousel */}
      <HeroCarousel />

            {/* Shop by Category */}
      <section className="container-page mt-8 sm:mt-12">
        <SectionHeader title="Shop by Category" subtitle="Find exactly what you're looking for" />
        <div className="grid grid-cols-5 gap-2 sm:gap-3 lg:grid-cols-10">
          {categories.map((cat, i) => {
            const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[cat.icon ?? 'Package'] ?? LucideIcons.Package;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
              >
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="card flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3.5 hover:shadow-soft-lg hover:border-royal-300 transition-all group"
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-royal-50 text-royal-600 group-hover:bg-royal-600 group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-center text-navy-700 leading-tight truncate w-full">{cat.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Flash Deals */}
      {flashDeals.length > 0 && (
        <section className="container-page mt-12">
          <SectionHeader title="Flash Deals" subtitle="Limited-time savings — while stocks last" link="/products?filter=flash-deals" />
          <ProductRow products={flashDeals} />
        </section>
      )}

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="container-page mt-12">
          <SectionHeader title="Featured Products" subtitle="Hand-picked favorites from our catalog" link="/products?filter=featured" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="container-page mt-16">
        <div className="rounded-3xl bg-navy-900 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Why Choose BuyAndSellOutlets?</h2>
            <p className="mt-2 text-sm text-navy-300 max-w-xl mx-auto">
              We're committed to quality, transparency, and trust on every single purchase.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BadgeCheck, title: 'Professionally Inspected', desc: 'Every pre-owned product is tested and graded by our experts.' },
              { icon: ShieldCheck, title: 'Warranty Backed', desc: 'All purchases include warranty — up to 2 years on new products.' },
              { icon: Truck, title: 'Fast Nationwide Delivery', desc: 'Free shipping on orders over ₦50,000. Delivered in 2-5 days.' },
              { icon: Headphones, title: 'Expert Support', desc: 'WhatsApp, email, and phone support from real humans.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-600">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-navy-300">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certified Pre-Owned */}
      {preOwned.length > 0 && (
        <section className="container-page mt-12">
          <SectionHeader title="Certified Pre-Owned" subtitle="Professionally inspected, graded, and warrantied" link="/products?condition=pre-owned" />
          <ProductRow products={preOwned} />
        </section>
      )}

      {/* Trending Catalog */}
      {brandNew.length > 0 && (
        <section className="container-page mt-12">
          <SectionHeader title="Trending Electronics" subtitle="Latest flagship models, sealed and warrantied" link="/products" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {brandNew.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container-page mt-12">
          <SectionHeader title="New Arrivals" subtitle="Fresh additions to our catalog" link="/products?sort=newest" />
          <ProductRow products={newArrivals} />
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="container-page mt-12">
          <SectionHeader title="Best Sellers" subtitle="What our customers love most" link="/products?sort=best-selling" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {bestSellers.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Popular Brands */}
      <section className="container-page mt-16">
        <SectionHeader title="Popular Brands" subtitle="Shop your favorite brands" />
        <div className="flex flex-wrap gap-3">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`/products?brand=${encodeURIComponent(brand)}`}
                className="card px-6 py-3 font-display text-sm font-semibold text-navy-700 hover:border-royal-300 hover:shadow-soft transition-all"
              >
                {brand}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="container-page mt-16">
        <SectionHeader title="Customer Reviews" subtitle="Real reviews from real customers" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-5"
            >
              <Quote className="h-8 w-8 text-royal-200 mb-3" />
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-navy-600 mb-4">{review.text}</p>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-600 text-white text-sm font-bold">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{review.name}</p>
                  <p className="text-xs text-emerald-600">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Media & Instagram Feed */}
      <SocialCarousel />

      {/* Newsletter */}
      <section className="container-page mt-16">
        <div className="rounded-3xl bg-gradient-to-br from-royal-600 to-royal-800 p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Stay in the Loop</h2>
          <p className="mt-2 text-sm text-royal-100 max-w-md mx-auto">
            Get notified about flash deals, new arrivals, and exclusive offers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border-0 bg-white/95 px-4 py-3 text-sm text-navy-900 outline-none placeholder:text-navy-400 focus:ring-4 focus:ring-white/30"
            />
            <button type="submit" className="btn bg-navy-900 text-white px-6 py-3 hover:bg-navy-800 active:scale-[0.98] transition">
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-royal-200">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
