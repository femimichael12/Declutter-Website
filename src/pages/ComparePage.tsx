import { Link } from 'react-router-dom';
import { GitCompare, X, Check } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { formatPrice, isPreOwned } from '@/lib/utils';

export function ComparePage() {
  const { products, toggle, clear } = useCompare();

  if (products.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-navy-100 flex items-center justify-center mb-4">
          <GitCompare className="h-10 w-10 text-navy-400" />
        </div>
        <h1 className="font-display text-2xl font-bold text-navy-900">No products to compare</h1>
        <p className="mt-2 text-navy-500">Add products to compare their features side by side.</p>
        <Link to="/products" className="btn-primary mt-6 inline-flex">Browse Products</Link>
      </div>
    );
  }

  const rows = [
    { label: 'Price', getValue: (p: typeof products[0]) => formatPrice(p.price) },
    { label: 'Brand', getValue: (p: typeof products[0]) => p.brand },
    { label: 'Rating', getValue: (p: typeof products[0]) => `${p.rating.toFixed(1)} (${p.review_count})` },
    { label: 'Stock', getValue: (p: typeof products[0]) => p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock' },
    { label: 'Warranty', getValue: (p: typeof products[0]) => p.warranty ?? 'N/A' },
    { label: 'Delivery', getValue: (p: typeof products[0]) => p.delivery_info ?? 'Standard' },
  ];

  return (
    <div className="container-page py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-navy-900">Compare Products</h1>
        <button onClick={clear} className="btn-ghost text-sm">Clear All</button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Product headers */}
          <div className="flex gap-4 mb-4">
            <div className="w-40 flex-shrink-0" />
            {products.map((p) => (
              <div key={p.id} className="w-56 flex-shrink-0 card p-3 relative">
                <button onClick={() => toggle(p)} className="absolute top-2 right-2 p-1 text-navy-400 hover:text-rose-500 transition">
                  <X className="h-4 w-4" />
                </button>
                <Link to={`/product/${p.slug}`}>
                  <img src={p.images[0]} alt={p.name} className="h-32 w-full rounded-lg object-cover mb-2" />
                  <h3 className="text-sm font-semibold text-navy-900 line-clamp-2 hover:text-royal-600 transition">{p.name}</h3>
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison rows */}
          {rows.map((row, i) => (
            <div key={row.label} className={`flex gap-4 py-3 ${i % 2 === 0 ? 'bg-navy-50/50' : ''} rounded-lg`}>
              <div className="w-40 flex-shrink-0 px-3 text-sm font-semibold text-navy-700 flex items-center">
                {row.label}
              </div>
              {products.map((p) => (
                <div key={p.id} className="w-56 flex-shrink-0 px-3 text-sm text-navy-600 flex items-center">
                  {row.getValue(p)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
