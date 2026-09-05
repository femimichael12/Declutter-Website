import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import { getProducts, getCategories } from '@/lib/products';
import type { Product, Category, Condition } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/Skeleton';
import { isPreOwned } from '@/lib/utils';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Lowest Price' },
  { value: 'price-high', label: 'Highest Price' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'highest-rated', label: 'Highest Rated' },
];

const conditions: Condition[] = ['Brand New', 'Open Box', 'Certified Pre-Owned', 'Pre-Owned', 'Refurbished', 'Like New', 'Excellent', 'Very Good', 'Good', 'Fair'];

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const q = searchParams.get('q') ?? '';
  const categorySlug = searchParams.get('category') ?? '';
  const brandFilter = searchParams.get('brand') ?? '';
  const conditionParam = searchParams.get('condition') ?? '';
  const filterParam = searchParams.get('filter') ?? '';
  const sort = searchParams.get('sort') ?? 'newest';
  const minPrice = Number(searchParams.get('minPrice') ?? 0);
  const maxPrice = Number(searchParams.get('maxPrice') ?? 0);
  const inStockOnly = searchParams.get('inStock') === '1';

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [prodList, catList] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(prodList.filter((p) => p.is_active !== false));
        setCategories(catList);
      } catch (err) {
        console.error('Failed to load products page data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const allBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, [products]);

  const selectedConditions = useMemo(() => {
    if (conditionParam === 'pre-owned') return conditions.filter((c) => c !== 'Brand New');
    if (conditionParam === 'new') return ['Brand New'];
    return [];
  }, [conditionParam]);

  const filtered = useMemo(() => {
    let result = [...products];
    const catId = categories.find((c) => c.slug === categorySlug)?.id;
    if (catId) result = result.filter((p) => p.category_id === catId);
    if (q) {
      const ql = q.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(ql) ||
        p.brand.toLowerCase().includes(ql) ||
        (p.short_description ?? '').toLowerCase().includes(ql)
      );
    }
    if (brandFilter) result = result.filter((p) => p.brand === brandFilter);
    if (selectedConditions.length > 0) result = result.filter((p) => selectedConditions.includes(p.condition));
    if (filterParam === 'flash-deals') result = result.filter((p) => p.is_flash_deal);
    if (filterParam === 'featured') result = result.filter((p) => p.is_featured);
    if (minPrice > 0) result = result.filter((p) => p.price >= minPrice);
    if (maxPrice > 0) result = result.filter((p) => p.price <= maxPrice);
    if (inStockOnly) result = result.filter((p) => p.stock > 0);

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'best-selling': result.sort((a, b) => b.sales_count - a.sales_count); break;
      case 'highest-rated': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return result;
  }, [products, categories, categorySlug, q, brandFilter, selectedConditions, filterParam, minPrice, maxPrice, inStockOnly, sort]);

  const updateParam = useCallback((key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value === null || value === '') next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  function toggleCondition(cond: string) {
    const current = conditionParam === 'pre-owned'
      ? conditions.filter((c) => c !== 'Brand New')
      : conditionParam === 'new'
      ? ['Brand New']
      : [];
    let next: string[];
    if (current.includes(cond)) {
      next = current.filter((c) => c !== cond);
    } else {
      next = [...current, cond];
    }
    if (next.length === 0) updateParam('condition', null);
    else if (next.length === conditions.filter((c) => c !== 'Brand New').length && !next.includes('Brand New')) {
      updateParam('condition', 'pre-owned');
    } else if (next.length === 1 && next[0] === 'Brand New') {
      updateParam('condition', 'new');
    } else {
      updateParam('condition', next.join(','));
    }
  }

  const activeConditionList = conditionParam && conditionParam !== 'pre-owned' && conditionParam !== 'new'
    ? conditionParam.split(',')
    : [];

  const heading = categorySlug
    ? categories.find((c) => c.slug === categorySlug)?.name ?? 'Products'
    : filterParam === 'flash-deals'
    ? 'Flash Deals'
    : conditionParam === 'pre-owned'
    ? 'Certified Pre-Owned'
    : conditionParam === 'new'
    ? 'Brand New Products'
    : q
    ? `Search: "${q}"`
    : 'All Products';

  return (
    <div className="container-page py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">{heading}</h1>
        <p className="mt-1 text-sm text-navy-500">
          {loading ? 'Loading...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      <div className="flex gap-6">
        {/* Filters sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <FilterPanel
            categories={categories}
            categorySlug={categorySlug}
            allBrands={allBrands}
            brandFilter={brandFilter}
            conditions={conditions}
            selectedConditions={selectedConditions.length > 0 ? selectedConditions : activeConditionList}
            conditionParam={conditionParam}
            toggleCondition={toggleCondition}
            minPrice={minPrice}
            maxPrice={maxPrice}
            inStockOnly={inStockOnly}
            updateParam={updateParam}
          />
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {/* Sort + mobile filter toggle */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <button
              onClick={() => setShowFilters(true)}
              className="btn-secondary lg:hidden text-sm py-2"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <div className="relative ml-auto">
              <select
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="input appearance-none pr-9 py-2 text-sm w-auto cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400 pointer-events-none" />
            </div>
          </div>

          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : filtered.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-navy-500">No products match your filters.</p>
              <button
                onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}
                className="btn-secondary mt-4 text-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] overflow-y-auto glass-strong p-5 lg:hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-navy-900">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="text-navy-400 hover:text-navy-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterPanel
                categories={categories}
                categorySlug={categorySlug}
                allBrands={allBrands}
                brandFilter={brandFilter}
                conditions={conditions}
                selectedConditions={selectedConditions.length > 0 ? selectedConditions : activeConditionList}
                conditionParam={conditionParam}
                toggleCondition={toggleCondition}
                minPrice={minPrice}
                maxPrice={maxPrice}
                inStockOnly={inStockOnly}
                updateParam={updateParam}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FilterPanelProps {
  categories: Category[];
  categorySlug: string;
  allBrands: string[];
  brandFilter: string;
  conditions: string[];
  selectedConditions: string[];
  conditionParam: string;
  toggleCondition: (cond: string) => void;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  updateParam: (key: string, value: string | null) => void;
}

function FilterPanel(props: FilterPanelProps) {
  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-display text-sm font-bold text-navy-900 mb-3">Category</h3>
        <div className="space-y-1.5">
          <button
            onClick={() => props.updateParam('category', null)}
            className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${
              !props.categorySlug ? 'bg-royal-50 text-royal-700 font-medium' : 'text-navy-600 hover:bg-navy-50'
            }`}
          >
            All Categories
          </button>
          {props.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => props.updateParam('category', cat.slug)}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${
                props.categorySlug === cat.slug ? 'bg-royal-50 text-royal-700 font-medium' : 'text-navy-600 hover:bg-navy-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="font-display text-sm font-bold text-navy-900 mb-3">Condition</h3>
        <div className="space-y-1.5">
          {conditions.map((cond) => {
            const checked = props.selectedConditions.includes(cond);
            return (
              <button
                key={cond}
                onClick={() => props.toggleCondition(cond)}
                className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg text-sm text-navy-600 hover:bg-navy-50 transition"
              >
                <span className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                  checked ? 'bg-royal-600 border-royal-600' : 'border-navy-300'
                }`}>
                  {checked && <Check className="h-3 w-3 text-white" />}
                </span>
                {cond}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h3 className="font-display text-sm font-bold text-navy-900 mb-3">Brand</h3>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          <button
            onClick={() => props.updateParam('brand', null)}
            className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${
              !props.brandFilter ? 'bg-royal-50 text-royal-700 font-medium' : 'text-navy-600 hover:bg-navy-50'
            }`}
          >
            All Brands
          </button>
          {props.allBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => props.updateParam('brand', brand)}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${
                props.brandFilter === brand ? 'bg-royal-50 text-royal-700 font-medium' : 'text-navy-600 hover:bg-navy-50'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="font-display text-sm font-bold text-navy-900 mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={props.minPrice || ''}
            onChange={(e) => props.updateParam('minPrice', e.target.value || null)}
            className="input py-2 text-sm"
          />
          <span className="text-navy-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={props.maxPrice || ''}
            onChange={(e) => props.updateParam('maxPrice', e.target.value || null)}
            className="input py-2 text-sm"
          />
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-display text-sm font-bold text-navy-900 mb-3">Availability</h3>
        <button
          onClick={() => props.updateParam('inStock', props.inStockOnly ? null : '1')}
          className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg text-sm text-navy-600 hover:bg-navy-50 transition"
        >
          <span className={`flex h-4 w-4 items-center justify-center rounded border transition ${
            props.inStockOnly ? 'bg-royal-600 border-royal-600' : 'border-navy-300'
          }`}>
            {props.inStockOnly && <Check className="h-3 w-3 text-white" />}
          </span>
          In Stock Only
        </button>
      </div>
    </div>
  );
}
