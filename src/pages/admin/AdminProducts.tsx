import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Search,
  Star,
  Zap,
  Package,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  SlidersHorizontal,
  RefreshCw,
  Database,
  ArrowUp,
  ArrowDown,
  ShieldCheck,
  Battery,
} from 'lucide-react';
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
  uploadProductImage,
  seedInitialProducts,
  type SaveProductInput,
} from '@/lib/products';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/lib/utils';
import type { Product, Category, Condition } from '@/types';
import { ProductImage } from '@/components/ProductImage';

const conditions: Condition[] = [
  'Brand New',
  'Open Box',
  'Certified Pre-Owned',
  'Pre-Owned',
  'Refurbished',
  'Like New',
  'Excellent',
  'Very Good',
  'Good',
  'Fair',
];

interface SpecItem {
  key: string;
  value: string;
}

interface ProductFormState {
  name: string;
  brand: string;
  category_id: string;
  model: string;
  storage: string;
  ram: string;
  processor: string;
  short_description: string;
  description: string;
  price: string;
  compare_at_price: string;
  condition: Condition;
  stock: string;
  sku: string;
  warranty: string;
  delivery_info: string;
  is_featured: boolean;
  is_flash_deal: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_active: boolean;
  // Specifications
  specs: SpecItem[];
  // Condition report
  battery_health: string;
  cosmetic_condition: string;
  inspection_report: string;
  accessories_included: string;
  warranty_period: string;
}

const emptyForm: ProductFormState = {
  name: '',
  brand: '',
  category_id: '',
  model: '',
  storage: '',
  ram: '',
  processor: '',
  short_description: '',
  description: '',
  price: '',
  compare_at_price: '',
  condition: 'Brand New',
  stock: '5',
  sku: '',
  warranty: '1 Year Warranty',
  delivery_info: 'Nationwide delivery in 1-3 business days',
  is_featured: false,
  is_flash_deal: false,
  is_new_arrival: true,
  is_best_seller: false,
  is_active: true,
  specs: [
    { key: 'Storage', value: '' },
    { key: 'RAM', value: '' },
    { key: 'Processor', value: '' },
  ],
  battery_health: '100%',
  cosmetic_condition: 'Flawless 10/10',
  inspection_report: '30-point hardware and software check passed.',
  accessories_included: 'Charger, USB-C Cable, Original Box',
  warranty_period: '6 Months Warranty',
};

interface ImageItem {
  id: string;
  url?: string;
  file?: File;
  previewUrl: string;
  isCover: boolean;
  uploading?: boolean;
  progress?: number;
}

export function AdminProducts() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [activeTab, setActiveTab] = useState<'basic' | 'images' | 'specs' | 'condition'>('basic');
  const [imagesList, setImagesList] = useState<ImageItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const [prodList, catList] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prodList);
      setCategories(catList);
    } catch (err: any) {
      toast(err.message || 'Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditingProduct(null);
    setForm(emptyForm);
    setImagesList([]);
    setActiveTab('basic');
    setShowModal(true);
  }

  function openEdit(p: Product) {
    setEditingProduct(p);
    const existingImages: ImageItem[] = (p.images || []).map((url, idx) => ({
      id: `img-${idx}-${Date.now()}`,
      url,
      previewUrl: url,
      isCover: idx === 0,
    }));

    setImagesList(existingImages);
    setForm({
      name: p.name,
      brand: p.brand,
      category_id: p.category_id || '',
      model: p.model || '',
      storage: p.storage || '',
      ram: p.ram || '',
      processor: p.processor || '',
      short_description: p.short_description || '',
      description: p.description || '',
      price: String(p.price),
      compare_at_price: p.compare_at_price ? String(p.compare_at_price) : '',
      condition: p.condition,
      stock: String(p.stock),
      sku: p.sku || '',
      warranty: p.warranty || '',
      delivery_info: p.delivery_info || '',
      is_featured: Boolean(p.is_featured),
      is_flash_deal: Boolean(p.is_flash_deal),
      is_new_arrival: Boolean(p.is_new_arrival),
      is_best_seller: Boolean(p.is_best_seller),
      is_active: p.is_active !== undefined ? p.is_active : true,
      specs: [
        { key: 'Storage', value: p.storage || '' },
        { key: 'RAM', value: p.ram || '' },
        { key: 'Processor', value: p.processor || '' },
      ].filter((s) => Boolean(s.value)),
      battery_health: '95%',
      cosmetic_condition: 'Excellent Grade A',
      inspection_report: 'All hardware modules tested and certified functional.',
      accessories_included: 'Charger, Cable',
      warranty_period: p.warranty || '6 Months Warranty',
    });
    setActiveTab('basic');
    setShowModal(true);
  }

  // Handle authentic image files selected via file input or drag-and-drop
  function handleFilesSelected(files: FileList | File[]) {
    const newItems: ImageItem[] = [];
    const fileArr = Array.from(files);

    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i];
      if (!file.type.startsWith('image/')) {
        toast(`File "${file.name}" is not a valid image`, 'error');
        continue;
      }
      if (file.size > 15 * 1024 * 1024) {
        toast(`Image "${file.name}" exceeds 15MB limit`, 'error');
        continue;
      }

      const previewUrl = URL.createObjectURL(file);
      newItems.push({
        id: `upload-${Date.now()}-${i}`,
        file,
        previewUrl,
        isCover: imagesList.length === 0 && i === 0,
        uploading: false,
        progress: 0,
      });
    }

    setImagesList((prev) => {
      const combined = [...prev, ...newItems];
      // Ensure at least one cover image is designated
      if (!combined.some((item) => item.isCover) && combined.length > 0) {
        combined[0].isCover = true;
      }
      return combined;
    });
  }

  function handleSetCover(index: number) {
    setImagesList((prev) =>
      prev.map((item, i) => ({
        ...item,
        isCover: i === index,
      }))
    );
  }

  function handleRemoveImage(index: number) {
    setImagesList((prev) => {
      const target = prev[index];
      if (target.file && target.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(target.previewUrl);
      }
      const next = prev.filter((_, i) => i !== index);
      if (next.length > 0 && !next.some((item) => item.isCover)) {
        next[0].isCover = true;
      }
      return next;
    });
  }

  function handleMoveImage(index: number, direction: 'up' | 'down') {
    setImagesList((prev) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  }

  // Specifications management
  function addSpecRow() {
    setForm((prev) => ({
      ...prev,
      specs: [...prev.specs, { key: '', value: '' }],
    }));
  }

  function updateSpecRow(index: number, field: 'key' | 'value', value: string) {
    setForm((prev) => {
      const nextSpecs = [...prev.specs];
      nextSpecs[index][field] = value;
      return { ...prev, specs: nextSpecs };
    });
  }

  function removeSpecRow(index: number) {
    setForm((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  }

  // Save product (Upload authentic photos to Storage -> Save Firestore record)
  async function handleSave() {
    if (!form.name.trim()) {
      toast('Product name is required', 'error');
      setActiveTab('basic');
      return;
    }
    if (!form.brand.trim()) {
      toast('Product brand is required', 'error');
      setActiveTab('basic');
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      toast('Please enter a valid regular price', 'error');
      setActiveTab('basic');
      return;
    }
    if (imagesList.length === 0) {
      toast('Please upload at least one authentic product image', 'error');
      setActiveTab('images');
      return;
    }

    setSaving(true);

    try {
      const productId = editingProduct?.id || `prod-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const finalImageUrls: string[] = [];

      // Sort images so that the cover photo is always the first image
      const sortedImages = [...imagesList].sort((a, b) => (b.isCover ? 1 : 0) - (a.isCover ? 1 : 0));

      // Upload newly attached authentic image files to Firebase Storage
      for (let i = 0; i < sortedImages.length; i++) {
        const item = sortedImages[i];
        if (item.file) {
          // Update progress status in UI
          setImagesList((prev) =>
            prev.map((img) => (img.id === item.id ? { ...img, uploading: true, progress: 10 } : img))
          );

          const uploadedUrl = await uploadProductImage(productId, item.file, (prog) => {
            setImagesList((prev) =>
              prev.map((img) => (img.id === item.id ? { ...img, progress: Math.round(prog) } : img))
            );
          });

          finalImageUrls.push(uploadedUrl);
          setImagesList((prev) =>
            prev.map((img) =>
              img.id === item.id ? { ...img, uploading: false, progress: 100, url: uploadedUrl } : img
            )
          );
        } else if (item.url) {
          finalImageUrls.push(item.url);
        }
      }

      const selectedCat = categories.find((c) => c.id === form.category_id);

      const payload: SaveProductInput = {
        name: form.name.trim(),
        brand: form.brand.trim(),
        category_id: form.category_id || null,
        category_slug: selectedCat?.slug,
        model: form.model.trim() || undefined,
        storage: form.storage.trim() || null,
        ram: form.ram.trim() || null,
        processor: form.processor.trim() || null,
        short_description: form.short_description.trim() || null,
        description: form.description.trim() || null,
        price: Number(form.price),
        compare_at_price: form.compare_at_price ? Number(form.compare_at_price) : null,
        condition: form.condition,
        stock: Math.max(0, Number(form.stock) || 0),
        sku: form.sku.trim() || null,
        images: finalImageUrls,
        is_featured: form.is_featured,
        is_flash_deal: form.is_flash_deal,
        is_new_arrival: form.is_new_arrival,
        is_best_seller: form.is_best_seller,
        is_active: form.is_active,
        warranty: form.warranty.trim() || null,
        delivery_info: form.delivery_info.trim() || null,
        specs: form.specs
          .filter((s) => s.key.trim() && s.value.trim())
          .map((s) => ({ spec_key: s.key.trim(), spec_value: s.value.trim() })),
        condition_report:
          form.condition !== 'Brand New'
            ? {
                battery_health: form.battery_health.trim() || null,
                cosmetic_condition: form.cosmetic_condition.trim() || null,
                inspection_report: form.inspection_report.trim() || null,
                accessories_included: form.accessories_included
                  ? form.accessories_included.split(',').map((s) => s.trim()).filter(Boolean)
                  : null,
                warranty_period: form.warranty_period.trim() || null,
              }
            : null,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload, editingProduct.slug);
        toast(`Product "${form.name}" updated successfully!`, 'success');
      } else {
        await createProduct(payload);
        toast(`Product "${form.name}" created with authentic photos!`, 'success');
      }

      setShowModal(false);
      await load();
    } catch (err: any) {
      console.error('Failed to save product:', err);
      toast(err.message || 'Failed to save product to Firebase', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(p: Product) {
    if (!confirm(`Are you sure you want to delete "${p.name}"? This will permanently remove its photos and data.`)) {
      return;
    }
    try {
      await deleteProduct(p.id, p.images);
      toast(`Deleted "${p.name}"`, 'info');
      await load();
    } catch (err: any) {
      toast(err.message || 'Failed to delete product', 'error');
    }
  }

  async function handleQuickStockChange(p: Product, newStock: number) {
    try {
      await updateProductStock(p.id, Math.max(0, newStock));
      setProducts((prev) => prev.map((item) => (item.id === p.id ? { ...item, stock: Math.max(0, newStock) } : item)));
      toast(`Stock updated for ${p.name}`);
    } catch {
      toast('Failed to update stock', 'error');
    }
  }

  async function handleTogglePublish(p: Product) {
    const nextState = !p.is_active;
    try {
      await updateProduct(p.id, { is_active: nextState }, p.slug);
      setProducts((prev) => prev.map((item) => (item.id === p.id ? { ...item, is_active: nextState } : item)));
      toast(nextState ? `"${p.name}" published` : `"${p.name}" unpublished / hidden`, 'info');
    } catch {
      toast('Failed to update product visibility', 'error');
    }
  }

  async function handleToggleFlag(p: Product, flag: 'is_featured' | 'is_flash_deal' | 'is_best_seller' | 'is_new_arrival') {
    const nextVal = !p[flag];
    try {
      await updateProduct(p.id, { [flag]: nextVal }, p.slug);
      setProducts((prev) => prev.map((item) => (item.id === p.id ? { ...item, [flag]: nextVal } : item)));
      toast(`${flag.replace('is_', '').replace('_', ' ')} status updated`);
    } catch {
      toast('Failed to update flag', 'error');
    }
  }

  async function handleSeedCatalog() {
    if (!confirm('This will seed baseline products into your Firestore database. Continue?')) {
      return;
    }
    setSeeding(true);
    try {
      const res = await seedInitialProducts();
      toast(`Successfully seeded ${res.productsCount} products and ${res.categoriesCount} categories!`, 'success');
      await load();
    } catch (err: any) {
      toast(err.message || 'Failed to seed database', 'error');
    } finally {
      setSeeding(false);
    }
  }

  // Filtered products calculation
  const filtered = products.filter((p) => {
    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      const matches =
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.sku ?? '').toLowerCase().includes(q) ||
        (p.short_description ?? '').toLowerCase().includes(q);
      if (!matches) return false;
    }

    // Category
    if (selectedCategory !== 'all') {
      if (p.category_id !== selectedCategory && p.category_slug !== selectedCategory) {
        return false;
      }
    }

    // Condition
    if (selectedCondition !== 'all') {
      if (p.condition !== selectedCondition) return false;
    }

    // Stock
    if (stockFilter === 'in_stock' && p.stock <= 0) return false;
    if (stockFilter === 'low_stock' && (p.stock <= 0 || p.stock > 5)) return false;
    if (stockFilter === 'out_of_stock' && p.stock > 0) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header with Title and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
            Product Management ({products.length})
          </h1>
          <p className="text-xs sm:text-sm text-navy-500 mt-1">
            Upload authentic photos, manage physical stock, specifications, and pricing.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleSeedCatalog}
            disabled={seeding}
            className="btn-secondary text-xs sm:text-sm py-2 px-3 flex items-center gap-1.5 rounded-xl border border-navy-200"
            title="Seed initial catalog into Firestore"
          >
            <Database className="h-4 w-4 text-royal-600" />
            <span>{seeding ? 'Seeding...' : 'Sync Baseline Catalog'}</span>
          </button>

          <button
            type="button"
            onClick={load}
            className="p-2.5 rounded-xl border border-navy-200 bg-white hover:bg-navy-50 text-navy-600 transition"
            title="Refresh list"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-royal-600' : ''}`} />
          </button>

          <button
            type="button"
            onClick={openAdd}
            className="btn-primary text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-soft hover:shadow-soft-lg"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 bg-white border border-navy-100 rounded-2xl shadow-xs space-y-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Live Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, brand, SKU..."
              className="input pl-9 text-xs sm:text-sm py-2 rounded-xl"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input text-xs sm:text-sm py-2 rounded-xl"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Condition Filter */}
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="input text-xs sm:text-sm py-2 rounded-xl"
          >
            <option value="all">All Conditions</option>
            {conditions.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>

          {/* Stock Availability Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="input text-xs sm:text-sm py-2 rounded-xl"
          >
            <option value="all">All Stock Statuses</option>
            <option value="in_stock">In Stock (&gt; 0)</option>
            <option value="low_stock">Low Stock (1-5)</option>
            <option value="out_of_stock">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="card p-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-royal-600 mb-3" />
          <p className="text-sm font-medium text-navy-600">Loading catalog from Firestore...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center bg-white rounded-2xl border border-navy-100">
          <Package className="h-12 w-12 text-navy-300 mx-auto mb-3" />
          <h3 className="font-display font-bold text-navy-900 text-lg">No products found</h3>
          <p className="text-sm text-navy-500 mt-1 max-w-md mx-auto">
            Try adjusting your filters or click "Add New Product" to upload real authentic inventory.
          </p>
          <div className="mt-4 flex gap-2 justify-center">
            <button onClick={openAdd} className="btn-primary text-xs sm:text-sm px-4 py-2 rounded-xl">
              <Plus className="h-4 w-4" /> Add Product
            </button>
            <button onClick={handleSeedCatalog} className="btn-secondary text-xs sm:text-sm px-4 py-2 rounded-xl">
              Seed Baseline Catalog
            </button>
          </div>
        </div>
      ) : (
        <div className="card overflow-hidden bg-white border border-navy-100 rounded-2xl shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-navy-50/80 border-b border-navy-100 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-navy-600">
                <tr>
                  <th className="px-4 py-3.5">Product & Authentic Photos</th>
                  <th className="px-3 py-3.5 hidden sm:table-cell">Brand</th>
                  <th className="px-3 py-3.5">Price</th>
                  <th className="px-3 py-3.5">Stock & Availability</th>
                  <th className="px-3 py-3.5 hidden md:table-cell">Flags</th>
                  <th className="px-3 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100 text-xs sm:text-sm">
                {filtered.map((p) => {
                  const hasMultiplePhotos = (p.images || []).length > 1;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition">
                      {/* Product Thumbnail & Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-xl bg-navy-50 p-1 flex items-center justify-center flex-shrink-0 border border-navy-200/80 overflow-hidden shadow-2xs">
                            <ProductImage
                              src={p.images?.[0]}
                              alt={p.name}
                              className="h-full w-full object-contain"
                            />
                            {hasMultiplePhotos && (
                              <span className="absolute bottom-0.5 right-0.5 bg-navy-900/80 text-white text-[9px] font-bold px-1 rounded">
                                {p.images.length}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 max-w-[220px] lg:max-w-xs">
                            <p className="font-bold text-navy-900 truncate leading-snug">{p.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] font-medium text-navy-500">{p.condition}</span>
                              {p.sku && <span className="text-[10px] text-navy-400 font-mono">#{p.sku}</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Brand */}
                      <td className="px-3 py-3.5 font-medium text-navy-700 hidden sm:table-cell">{p.brand}</td>

                      {/* Price */}
                      <td className="px-3 py-3.5">
                        <div className="font-bold text-navy-900">{formatPrice(p.price)}</div>
                        {p.compare_at_price && p.compare_at_price > p.price && (
                          <div className="text-[11px] text-navy-400 line-through">
                            {formatPrice(p.compare_at_price)}
                          </div>
                        )}
                      </td>

                      {/* Stock Adjuster */}
                      <td className="px-3 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleQuickStockChange(p, p.stock - 1)}
                            className="h-6 w-6 rounded bg-navy-100 hover:bg-navy-200 text-navy-700 flex items-center justify-center font-bold text-xs"
                            title="Decrease stock by 1"
                          >
                            -
                          </button>
                          <span
                            className={`min-w-8 text-center font-bold text-xs px-1.5 py-0.5 rounded ${
                              p.stock === 0
                                ? 'bg-rose-100 text-rose-700'
                                : p.stock <= 5
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {p.stock === 0 ? '0 (Sold)' : p.stock}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuickStockChange(p, p.stock + 1)}
                            className="h-6 w-6 rounded bg-navy-100 hover:bg-navy-200 text-navy-700 flex items-center justify-center font-bold text-xs"
                            title="Increase stock by 1"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Flag toggles */}
                      <td className="px-3 py-3.5 hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleToggleFlag(p, 'is_featured')}
                            title={p.is_featured ? 'Featured (Click to unset)' : 'Not featured (Click to feature)'}
                            className={`p-1.5 rounded-lg transition ${
                              p.is_featured ? 'bg-royal-100 text-royal-700' : 'text-navy-300 hover:bg-navy-100'
                            }`}
                          >
                            <Star className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleFlag(p, 'is_flash_deal')}
                            title={p.is_flash_deal ? 'Flash Deal active' : 'Not flash deal'}
                            className={`p-1.5 rounded-lg transition ${
                              p.is_flash_deal ? 'bg-amber-100 text-amber-700' : 'text-navy-300 hover:bg-navy-100'
                            }`}
                          >
                            <Zap className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleFlag(p, 'is_best_seller')}
                            title={p.is_best_seller ? 'Best Seller active' : 'Not best seller'}
                            className={`p-1.5 rounded-lg transition ${
                              p.is_best_seller ? 'bg-emerald-100 text-emerald-700' : 'text-navy-300 hover:bg-navy-100'
                            }`}
                          >
                            <Package className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Published Status */}
                      <td className="px-3 py-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(p)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition ${
                            p.is_active
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-navy-100 text-navy-600 border border-navy-200'
                          }`}
                        >
                          {p.is_active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          <span>{p.is_active ? 'Live' : 'Draft'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => openEdit(p)}
                            className="p-2 rounded-lg text-navy-500 hover:text-royal-600 hover:bg-royal-50 transition"
                            title="Edit product"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(p)}
                            className="p-2 rounded-lg text-navy-500 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Delete product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !saving && setShowModal(false)}
              className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="fixed inset-x-3 sm:inset-x-6 top-4 bottom-4 z-50 mx-auto max-w-4xl overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col border border-navy-100"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-navy-100 bg-slate-50/70">
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-navy-900">
                    {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add Authentic Product'}
                  </h2>
                  <p className="text-xs text-navy-500">
                    Upload authentic high-resolution photos and configure physical inventory details.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => !saving && setShowModal(false)}
                  disabled={saving}
                  className="p-2 rounded-xl text-navy-400 hover:text-navy-700 hover:bg-navy-100 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-navy-100 bg-white px-6 gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
                {[
                  { key: 'basic', label: '1. Basic Info & Pricing' },
                  { key: 'images', label: `2. Authentic Photos (${imagesList.length})` },
                  { key: 'specs', label: '3. Specs & Details' },
                  { key: 'condition', label: '4. Condition & Warranty' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
                      activeTab === tab.key
                        ? 'border-royal-600 text-royal-600'
                        : 'border-transparent text-navy-500 hover:text-navy-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                {/* TAB 1: BASIC INFORMATION */}
                {activeTab === 'basic' && (
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-navy-700 mb-1">Product Title *</label>
                        <input
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          placeholder="e.g. Samsung Galaxy S24 Ultra 256GB Titanium Black"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">Brand *</label>
                        <input
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          placeholder="e.g. Samsung, Apple, Sony, Dell"
                          value={form.brand}
                          onChange={(e) => setForm({ ...form, brand: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">Category *</label>
                        <select
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          value={form.category_id}
                          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                        >
                          <option value="">Select a category</option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">Condition Grade *</label>
                        <select
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          value={form.condition}
                          onChange={(e) => setForm({ ...form, condition: e.target.value as Condition })}
                        >
                          {conditions.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">Physical Stock Available *</label>
                        <input
                          type="number"
                          min="0"
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          value={form.stock}
                          onChange={(e) => setForm({ ...form, stock: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">Regular Selling Price (₦) *</label>
                        <input
                          type="number"
                          min="0"
                          className="input text-xs sm:text-sm py-2 rounded-xl font-bold"
                          placeholder="e.g. 1800000"
                          value={form.price}
                          onChange={(e) => setForm({ ...form, price: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">Compare-at / Original Price (₦)</label>
                        <input
                          type="number"
                          min="0"
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          placeholder="e.g. 2000000"
                          value={form.compare_at_price}
                          onChange={(e) => setForm({ ...form, compare_at_price: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">SKU / Model Number</label>
                        <input
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          placeholder="e.g. SAM-S24U-256-BLK"
                          value={form.sku}
                          onChange={(e) => setForm({ ...form, sku: e.target.value })}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-navy-700 mb-1">Short Description</label>
                        <input
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          placeholder="Brief key highlight sentence shown on cards"
                          value={form.short_description}
                          onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-navy-700 mb-1">Full Product Description</label>
                        <textarea
                          rows={4}
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          placeholder="Detailed description of physical condition, features, ports, accessories..."
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Flags */}
                    <div className="pt-3 border-t border-navy-100">
                      <p className="text-xs font-bold text-navy-700 mb-2">Display & Merchandising Badges</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { key: 'is_featured', label: 'Featured Product' },
                          { key: 'is_flash_deal', label: 'Flash Deal' },
                          { key: 'is_new_arrival', label: 'New Arrival' },
                          { key: 'is_best_seller', label: 'Best Seller' },
                        ].map((flag) => (
                          <label
                            key={flag.key}
                            className="flex items-center gap-2 p-2.5 rounded-xl border border-navy-200 bg-slate-50/50 hover:bg-slate-100/60 cursor-pointer text-xs font-medium"
                          >
                            <input
                              type="checkbox"
                              checked={(form as any)[flag.key]}
                              onChange={(e) => setForm({ ...form, [flag.key]: e.target.checked })}
                              className="h-4 w-4 accent-royal-600 rounded"
                            />
                            <span>{flag.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: AUTHENTIC PRODUCT PHOTOS */}
                {activeTab === 'images' && (
                  <div className="space-y-4">
                    <div className="bg-royal-50/70 border border-royal-200 p-4 rounded-2xl flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-royal-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-royal-900 leading-relaxed">
                        <p className="font-bold">Authentic Photography Commitment</p>
                        <p className="mt-0.5 text-royal-700">
                          Upload clear real photos of the actual physical unit (front, back, sides, accessories, box).
                          These exact photos will be stored in Firebase Storage and rendered directly on the storefront.
                        </p>
                      </div>
                    </div>

                    {/* Drag-and-Drop Zone */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragOver(false);
                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                          handleFilesSelected(e.dataTransfer.files);
                        }
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                        isDragOver
                          ? 'border-royal-600 bg-royal-50/60 scale-[1.01]'
                          : 'border-navy-200 hover:border-royal-400 bg-slate-50/50 hover:bg-royal-50/20'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => e.target.files && handleFilesSelected(e.target.files)}
                        className="hidden"
                      />
                      <div className="h-12 w-12 rounded-2xl bg-royal-100 flex items-center justify-center mx-auto mb-3 text-royal-600">
                        <Upload className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-bold text-navy-900">
                        Click or drag authentic product photos here
                      </p>
                      <p className="text-xs text-navy-500 mt-1">
                        Supports JPEG, PNG, WebP up to 15MB each. You can select multiple images at once.
                      </p>
                    </div>

                    {/* Uploaded / Selected Photos Gallery Grid */}
                    {imagesList.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-navy-700">
                            Attached Authentic Photos ({imagesList.length})
                          </span>
                          <span className="text-[11px] text-navy-500">
                            The marked "Cover Photo" is shown as the primary thumbnail across the store.
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {imagesList.map((item, index) => (
                            <div
                              key={item.id}
                              className={`relative group rounded-2xl border-2 overflow-hidden bg-navy-50/80 p-1.5 transition ${
                                item.isCover ? 'border-royal-600 shadow-soft ring-2 ring-royal-200' : 'border-navy-200'
                              }`}
                            >
                              <div className="relative aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center">
                                <img
                                  src={item.previewUrl}
                                  alt={`Product image ${index + 1}`}
                                  className="h-full w-full object-contain"
                                />

                                {item.uploading && (
                                  <div className="absolute inset-0 bg-navy-950/70 flex flex-col items-center justify-center text-white p-2">
                                    <Loader2 className="h-5 w-5 animate-spin mb-1" />
                                    <span className="text-[10px] font-bold">
                                      Uploading {item.progress ? `${item.progress}%` : ''}
                                    </span>
                                  </div>
                                )}

                                {item.isCover && (
                                  <span className="absolute top-2 left-2 bg-royal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-soft flex items-center gap-1">
                                    <Check className="h-3 w-3" /> Cover
                                  </span>
                                )}
                              </div>

                              {/* Controls */}
                              <div className="mt-2 flex items-center justify-between gap-1 px-1">
                                <button
                                  type="button"
                                  onClick={() => handleSetCover(index)}
                                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md transition ${
                                    item.isCover
                                      ? 'text-royal-600 font-bold'
                                      : 'text-navy-500 hover:text-royal-600 hover:bg-navy-100'
                                  }`}
                                >
                                  {item.isCover ? 'Main Cover' : 'Set as Cover'}
                                </button>

                                <div className="flex items-center gap-0.5">
                                  {index > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => handleMoveImage(index, 'up')}
                                      className="p-1 text-navy-400 hover:text-navy-800 rounded"
                                      title="Move earlier"
                                    >
                                      <ArrowUp className="h-3 w-3" />
                                    </button>
                                  )}
                                  {index < imagesList.length - 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleMoveImage(index, 'down')}
                                      className="p-1 text-navy-400 hover:text-navy-800 rounded"
                                      title="Move later"
                                    >
                                      <ArrowDown className="h-3 w-3" />
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="p-1 text-navy-400 hover:text-rose-600 rounded"
                                    title="Remove photo"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: SPECIFICATIONS */}
                {activeTab === 'specs' && (
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">Storage Capacity</label>
                        <input
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          placeholder="e.g. 256GB, 512GB, 1TB"
                          value={form.storage}
                          onChange={(e) => setForm({ ...form, storage: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">RAM Memory</label>
                        <input
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          placeholder="e.g. 8GB, 12GB, 16GB Unified"
                          value={form.ram}
                          onChange={(e) => setForm({ ...form, ram: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">Processor / Chipset</label>
                        <input
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          placeholder="e.g. Apple A18 Pro, Snapdragon 8 Gen 3"
                          value={form.processor}
                          onChange={(e) => setForm({ ...form, processor: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-navy-100">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-navy-700">Custom Technical Specifications</label>
                        <button
                          type="button"
                          onClick={addSpecRow}
                          className="text-xs text-royal-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add Row
                        </button>
                      </div>

                      <div className="space-y-2">
                        {form.specs.map((spec, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <input
                              className="input text-xs py-2 w-1/3 rounded-xl"
                              placeholder="Spec Name (e.g. Display)"
                              value={spec.key}
                              onChange={(e) => updateSpecRow(i, 'key', e.target.value)}
                            />
                            <input
                              className="input text-xs py-2 flex-1 rounded-xl"
                              placeholder="Spec Value (e.g. 6.8 inch Dynamic AMOLED 2X 120Hz)"
                              value={spec.value}
                              onChange={(e) => updateSpecRow(i, 'value', e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => removeSpecRow(i)}
                              className="p-2 text-navy-400 hover:text-rose-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: CONDITION REPORT & WARRANTY */}
                {activeTab === 'condition' && (
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">Warranty Details</label>
                        <input
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          placeholder="e.g. 1 Year Official Brand Warranty or 6 Months Store Warranty"
                          value={form.warranty}
                          onChange={(e) => setForm({ ...form, warranty: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-700 mb-1">Delivery Information</label>
                        <input
                          className="input text-xs sm:text-sm py-2 rounded-xl"
                          placeholder="e.g. Fast nationwide dispatch in 24-48 hours"
                          value={form.delivery_info}
                          onChange={(e) => setForm({ ...form, delivery_info: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-navy-200/80 space-y-3">
                      <p className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
                        <Battery className="h-4 w-4 text-emerald-600" />
                        Pre-Owned Inspection Report (for Pre-Owned / Refurbished units)
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-medium text-navy-700 mb-1">Battery Health %</label>
                          <input
                            className="input text-xs py-2 rounded-xl bg-white"
                            placeholder="e.g. 98% Maximum Capacity"
                            value={form.battery_health}
                            onChange={(e) => setForm({ ...form, battery_health: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-navy-700 mb-1">Cosmetic Grading</label>
                          <input
                            className="input text-xs py-2 rounded-xl bg-white"
                            placeholder="e.g. Flawless 10/10 or Minor hairline scratches"
                            value={form.cosmetic_condition}
                            onChange={(e) => setForm({ ...form, cosmetic_condition: e.target.value })}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-navy-700 mb-1">
                            Included Accessories (comma-separated)
                          </label>
                          <input
                            className="input text-xs py-2 rounded-xl bg-white"
                            placeholder="e.g. Fast Charger, USB-C Cable, Original Box, SIM Ejector"
                            value={form.accessories_included}
                            onChange={(e) => setForm({ ...form, accessories_included: e.target.value })}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-navy-700 mb-1">
                            Technician Inspection Summary Notes
                          </label>
                          <textarea
                            rows={2}
                            className="input text-xs py-2 rounded-xl bg-white"
                            placeholder="e.g. Passed 35-point hardware diagnostic test: Face ID, cameras, speakers, charging port verified functional."
                            value={form.inspection_report}
                            onChange={(e) => setForm({ ...form, inspection_report: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-navy-100 bg-slate-50/70">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                  className="btn-ghost text-xs sm:text-sm py-2.5 px-4 rounded-xl"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  {activeTab !== 'basic' && (
                    <button
                      type="button"
                      onClick={() => {
                        const tabs = ['basic', 'images', 'specs', 'condition'];
                        const idx = tabs.indexOf(activeTab);
                        if (idx > 0) setActiveTab(tabs[idx - 1] as any);
                      }}
                      className="btn-secondary text-xs sm:text-sm py-2.5 px-4 rounded-xl"
                    >
                      Previous
                    </button>
                  )}

                  {activeTab !== 'condition' ? (
                    <button
                      type="button"
                      onClick={() => {
                        const tabs = ['basic', 'images', 'specs', 'condition'];
                        const idx = tabs.indexOf(activeTab);
                        if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1] as any);
                      }}
                      className="btn-primary text-xs sm:text-sm py-2.5 px-5 rounded-xl"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="btn-primary text-xs sm:text-sm py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-soft hover:shadow-soft-lg"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Saving to Firebase...</span>
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          <span>{editingProduct ? 'Save Changes' : 'Publish Product'}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
