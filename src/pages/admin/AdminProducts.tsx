import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Search, Star, Zap, Package } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { mockProducts, mockCategories } from '@/lib/mockData';
import { useToast } from '@/context/ToastContext';
import { formatPrice, slugify } from '@/lib/utils';
import type { Product, Category, Condition } from '@/types';

const conditions: Condition[] = ['Brand New', 'Like New', 'Excellent', 'Very Good', 'Good', 'Fair'];

interface FormState {
  name: string;
  brand: string;
  category_id: string;
  short_description: string;
  description: string;
  price: string;
  compare_at_price: string;
  condition: Condition;
  stock: string;
  images: string;
  warranty: string;
  delivery_info: string;
  is_featured: boolean;
  is_flash_deal: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
}

const emptyForm: FormState = {
  name: '', brand: '', category_id: '', short_description: '', description: '',
  price: '', compare_at_price: '', condition: 'Brand New', stock: '0',
  images: '', warranty: '', delivery_info: '',
  is_featured: false, is_flash_deal: false, is_new_arrival: true, is_best_seller: false,
};

export function AdminProducts() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    if (!isSupabaseConfigured || !supabase) {
      setProducts(mockProducts);
      setCategories(mockCategories);
      setLoading(false);
      return;
    }
    const [prodRes, catRes] = await Promise.all([
      supabase!.from('products').select('*').order('created_at', { ascending: false }),
      supabase!.from('categories').select('*').order('name'),
    ]);
    setProducts(prodRes.data as Product[] ?? []);
    setCategories(catRes.data as Category[] ?? []);
    setLoading(false);
  }

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({
      name: p.name,
      brand: p.brand,
      category_id: p.category_id ?? '',
      short_description: p.short_description ?? '',
      description: p.description ?? '',
      price: String(p.price),
      compare_at_price: p.compare_at_price ? String(p.compare_at_price) : '',
      condition: p.condition,
      stock: String(p.stock),
      images: p.images.join('\n'),
      warranty: p.warranty ?? '',
      delivery_info: p.delivery_info ?? '',
      is_featured: p.is_featured,
      is_flash_deal: p.is_flash_deal,
      is_new_arrival: p.is_new_arrival,
      is_best_seller: p.is_best_seller,
    });
    setShowForm(true);
  }

  async function save() {
    const images = form.images.split('\n').map((s) => s.trim()).filter(Boolean);
    if (!form.name || !form.brand || !form.price || images.length === 0) {
      toast('Please fill in name, brand, price, and at least one image URL', 'error');
      return;
    }

    const data = {
      name: form.name,
      slug: slugify(form.name) + '-' + Math.random().toString(36).slice(2, 6),
      brand: form.brand,
      category_id: form.category_id || null,
      short_description: form.short_description || null,
      description: form.description || null,
      price: Number(form.price),
      compare_at_price: form.compare_at_price ? Number(form.compare_at_price) : null,
      condition: form.condition,
      stock: Number(form.stock),
      images,
      warranty: form.warranty || null,
      delivery_info: form.delivery_info || null,
      is_featured: form.is_featured,
      is_flash_deal: form.is_flash_deal,
      is_new_arrival: form.is_new_arrival,
      is_best_seller: form.is_best_seller,
      is_active: true,
    };

    if (editing) {
      const { error } = await supabase!.from('products').update({ ...data, slug: editing.slug }).eq('id', editing.id);
      if (error) toast('Failed to update product', 'error');
      else toast('Product updated');
    } else {
      const { error } = await supabase!.from('products').insert(data);
      if (error) toast('Failed to create product', 'error');
      else toast('Product created');
    }
    setShowForm(false);
    load();
  }

  async function remove(p: Product) {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const { error } = await supabase!.from('products').delete().eq('id', p.id);
    if (error) toast('Failed to delete product', 'error');
    else {
      toast('Product deleted', 'info');
      load();
    }
  }

  async function toggleFlag(p: Product, flag: 'is_featured' | 'is_flash_deal' | 'is_best_seller') {
    await supabase!.from('products').update({ [flag]: !p[flag] }).eq('id', p.id);
    load();
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-navy-900">Products ({products.length})</h1>
        <button onClick={openAdd} className="btn-primary">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="input pl-10"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="skeleton h-96 rounded-2xl" />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navy-50">
                <tr>
                  <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3">Product</th>
                  <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3 hidden sm:table-cell">Brand</th>
                  <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3">Price</th>
                  <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3 hidden md:table-cell">Stock</th>
                  <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3">Flags</th>
                  <th className="text-right text-xs font-semibold text-navy-500 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-navy-50/50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="h-10 w-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-navy-900 truncate max-w-[200px]">{p.name}</p>
                          <p className="text-xs text-navy-500">{p.condition}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-navy-600 hidden sm:table-cell">{p.brand}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-navy-900">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-sm font-medium ${p.stock <= 5 ? 'text-rose-500' : 'text-emerald-600'}`}>{p.stock}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => toggleFlag(p, 'is_featured')} className={`p-1.5 rounded-lg transition ${p.is_featured ? 'bg-royal-100 text-royal-600' : 'text-navy-300 hover:bg-navy-100'}`}>
                          <Star className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => toggleFlag(p, 'is_flash_deal')} className={`p-1.5 rounded-lg transition ${p.is_flash_deal ? 'bg-amber-100 text-amber-600' : 'text-navy-300 hover:bg-navy-100'}`}>
                          <Zap className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => toggleFlag(p, 'is_best_seller')} className={`p-1.5 rounded-lg transition ${p.is_best_seller ? 'bg-emerald-100 text-emerald-600' : 'text-navy-300 hover:bg-navy-100'}`}>
                          <Package className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-navy-400 hover:text-royal-600 transition">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => remove(p)} className="p-1.5 text-navy-400 hover:text-rose-500 transition">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="fixed inset-x-4 top-4 bottom-4 z-50 mx-auto max-w-2xl overflow-y-auto glass-strong rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-navy-900">{editing ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={() => setShowForm(false)} className="text-navy-400 hover:text-navy-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Name</label>
                  <input className="input py-2 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Brand</label>
                  <input className="input py-2 text-sm" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Category</label>
                  <select className="input py-2 text-sm" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Price (₦)</label>
                  <input type="number" className="input py-2 text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Compare-at Price (₦)</label>
                  <input type="number" className="input py-2 text-sm" value={form.compare_at_price} onChange={(e) => setForm({ ...form, compare_at_price: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Condition</label>
                  <select className="input py-2 text-sm" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value as Condition })}>
                    {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Stock</label>
                  <input type="number" className="input py-2 text-sm" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Short Description</label>
                  <input className="input py-2 text-sm" value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Description</label>
                  <textarea className="input py-2 text-sm min-h-20" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Image URLs (one per line)</label>
                  <textarea className="input py-2 text-sm min-h-20" placeholder="https://..." value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Warranty</label>
                  <input className="input py-2 text-sm" value={form.warranty} onChange={(e) => setForm({ ...form, warranty: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1 block">Delivery Info</label>
                  <input className="input py-2 text-sm" value={form.delivery_info} onChange={(e) => setForm({ ...form, delivery_info: e.target.value })} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {([
                  { key: 'is_featured', label: 'Featured' },
                  { key: 'is_flash_deal', label: 'Flash Deal' },
                  { key: 'is_new_arrival', label: 'New Arrival' },
                  { key: 'is_best_seller', label: 'Best Seller' },
                ] as const).map((flag) => (
                  <label key={flag.key} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form[flag.key]}
                      onChange={(e) => setForm({ ...form, [flag.key]: e.target.checked })}
                      className="h-4 w-4 accent-royal-600"
                    />
                    {flag.label}
                  </label>
                ))}
              </div>

              <button onClick={save} className="btn-primary w-full mt-5">
                {editing ? 'Update Product' : 'Create Product'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
