import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  increment,
  writeBatch,
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from './firebase';
import { mockProducts, mockCategories, mockSpecs, mockConditionReports } from './mockData';
import type { Product, ProductSpec, ConditionReport, Category, Condition } from '@/types';
import { slugify } from './utils';

export interface ProductFilters {
  categorySlug?: string;
  categoryId?: string;
  brand?: string;
  condition?: string | string[];
  isFeatured?: boolean;
  isFlashDeal?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sort?: 'newest' | 'price-low' | 'price-high' | 'best-selling' | 'highest-rated';
  limit?: number;
}

export interface UploadProgressCallback {
  (progress: number, bytesTransferred: number, totalBytes: number): void;
}

/**
 * Upload an authentic product image to Firebase Storage
 * Under path: products/{productId}/{timestamp}_{safeFilename}
 */
export async function uploadProductImage(
  productId: string,
  file: File,
  onProgress?: UploadProgressCallback
): Promise<string> {
  if (!isFirebaseConfigured || !storage) {
    // If Firebase Storage is not configured, create a local object URL (preview fallback)
    console.warn('Firebase Storage is not configured. Falling back to Object URL.');
    return URL.createObjectURL(file);
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const timestamp = Date.now();
  const storagePath = `products/${productId}/${timestamp}_${cleanName}`;
  const storageRef = ref(storage, storagePath);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
        productId,
        isAuthentic: 'true',
      },
    });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(progress, snapshot.bytesTransferred, snapshot.totalBytes);
        }
      },
      (error) => {
        console.error('Firebase Storage upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Delete a product image from Firebase Storage if it's stored in Firebase
 */
export async function deleteProductImage(imageUrl: string): Promise<void> {
  if (!isFirebaseConfigured || !storage || !imageUrl.includes('firebasestorage.googleapis.com')) {
    return;
  }
  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.warn('Could not delete image from Firebase Storage:', error);
  }
}

/**
 * Fetch products from Firestore with optional filtering, fallback to mockData if Firestore is empty
 */
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  let products: Product[] = [];

  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, 'products');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        snap.forEach((d) => {
          products.push({ id: d.id, ...(d.data() as Omit<Product, 'id'>) });
        });
      }
    } catch (err) {
      console.warn('Error querying Firestore products, falling back to mockData:', err);
    }
  }

  // If Firestore returned no products, use mockProducts
  if (products.length === 0) {
    products = [...mockProducts];
  }

  // Apply client-side filters
  if (filters) {
    if (filters.categoryId) {
      products = products.filter((p) => p.category_id === filters.categoryId);
    }
    if (filters.categorySlug) {
      products = products.filter(
        (p) => p.category_slug === filters.categorySlug || p.category_id === filters.categorySlug
      );
    }
    if (filters.brand) {
      products = products.filter((p) => p.brand.toLowerCase() === filters.brand!.toLowerCase());
    }
    if (filters.condition) {
      const conds = Array.isArray(filters.condition) ? filters.condition : [filters.condition];
      if (conds.length > 0) {
        if (conds.includes('pre-owned')) {
          products = products.filter((p) => p.condition !== 'Brand New');
        } else if (conds.includes('new')) {
          products = products.filter((p) => p.condition === 'Brand New');
        } else {
          products = products.filter((p) => conds.includes(p.condition));
        }
      }
    }
    if (filters.isFeatured !== undefined) {
      products = products.filter((p) => p.is_featured === filters.isFeatured);
    }
    if (filters.isFlashDeal !== undefined) {
      products = products.filter((p) => p.is_flash_deal === filters.isFlashDeal);
    }
    if (filters.isNewArrival !== undefined) {
      products = products.filter((p) => p.is_new_arrival === filters.isNewArrival);
    }
    if (filters.isBestSeller !== undefined) {
      products = products.filter((p) => p.is_best_seller === filters.isBestSeller);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.short_description ?? '').toLowerCase().includes(q) ||
          (p.sku ?? '').toLowerCase().includes(q)
      );
    }
    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      products = products.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      products = products.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.inStockOnly) {
      products = products.filter((p) => p.stock > 0);
    }

    // Sorting
    switch (filters.sort) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'best-selling':
        products.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
        break;
      case 'highest-rated':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        products.sort(
          (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        );
        break;
    }

    if (filters.limit && filters.limit > 0) {
      products = products.slice(0, filters.limit);
    }
  }

  return products;
}

/**
 * Fetch a single product by slug or ID with specifications and condition report
 */
export async function getProductBySlug(slug: string): Promise<{
  product: Product | null;
  specs: ProductSpec[];
  conditionReport: ConditionReport | null;
}> {
  let product: Product | null = null;
  let specs: ProductSpec[] = [];
  let conditionReport: ConditionReport | null = null;

  if (isFirebaseConfigured && db) {
    try {
      // Query product by slug
      const q = query(collection(db, 'products'), where('slug', '==', slug), firestoreLimit(1));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const docSnap = snap.docs[0];
        product = { id: docSnap.id, ...(docSnap.data() as Omit<Product, 'id'>) };

        // Fetch specs
        const specsQ = query(
          collection(db, 'product_specs'),
          where('product_id', '==', product.id),
          orderBy('sort_order', 'asc')
        );
        const specsSnap = await getDocs(specsQ);
        specsSnap.forEach((d) => specs.push({ id: d.id, ...(d.data() as Omit<ProductSpec, 'id'>) }));

        // Fetch condition report
        const condQ = query(
          collection(db, 'condition_reports'),
          where('product_id', '==', product.id),
          firestoreLimit(1)
        );
        const condSnap = await getDocs(condQ);
        if (!condSnap.empty) {
          conditionReport = {
            id: condSnap.docs[0].id,
            ...(condSnap.docs[0].data() as Omit<ConditionReport, 'id'>),
          };
        }

        return { product, specs, conditionReport };
      }
    } catch (err) {
      console.warn('Error querying Firestore product by slug:', err);
    }
  }

  // Fallback to mockData
  const mockProd = mockProducts.find((p) => p.slug === slug || p.id === slug) ?? null;
  if (mockProd) {
    return {
      product: mockProd,
      specs: mockSpecs[mockProd.slug] || [],
      conditionReport: mockConditionReports[mockProd.slug] || null,
    };
  }

  return { product: null, specs: [], conditionReport: null };
}

/**
 * Fetch categories from Firestore, fallback to mockCategories
 */
export async function getCategories(): Promise<Category[]> {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, 'categories');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const categories: Category[] = [];
        snap.forEach((d) => categories.push({ id: d.id, ...(d.data() as Omit<Category, 'id'>) }));
        categories.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        return categories;
      }
    } catch (err) {
      console.warn('Error fetching Firestore categories:', err);
    }
  }
  return [...mockCategories];
}

export interface SaveProductInput {
  name: string;
  brand: string;
  category_id: string | null;
  category_slug?: string;
  subcategory?: string | null;
  model?: string;
  storage?: string | null;
  ram?: string | null;
  processor?: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  condition: Condition;
  stock: number;
  sku: string | null;
  images: string[];
  is_featured: boolean;
  is_flash_deal: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_active: boolean;
  warranty: string | null;
  delivery_info: string | null;
  specs?: { spec_key: string; spec_value: string }[];
  condition_report?: {
    battery_health?: string | null;
    cosmetic_condition?: string | null;
    inspection_report?: string | null;
    accessories_included?: string[] | null;
    warranty_period?: string | null;
  } | null;
}

/**
 * Create a new product in Firestore
 */
export async function createProduct(input: SaveProductInput): Promise<Product> {
  const productId = `prod-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const baseSlug = slugify(input.name);
  const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
  const now = new Date().toISOString();

  const productData: Product = {
    id: productId,
    name: input.name,
    slug,
    brand: input.brand,
    model: input.model || undefined,
    storage: input.storage || null,
    ram: input.ram || null,
    processor: input.processor || null,
    category_id: input.category_id || null,
    category_slug: input.category_slug,
    subcategory: input.subcategory || null,
    short_description: input.short_description || null,
    description: input.description || null,
    price: Number(input.price),
    compare_at_price: input.compare_at_price ? Number(input.compare_at_price) : null,
    condition: input.condition,
    stock: Number(input.stock),
    sku: input.sku || `SKU-${Date.now().toString().slice(-6)}`,
    rating: 5.0,
    review_count: 0,
    sales_count: 0,
    images: input.images.length > 0 ? input.images : [],
    is_featured: Boolean(input.is_featured),
    is_flash_deal: Boolean(input.is_flash_deal),
    is_new_arrival: Boolean(input.is_new_arrival),
    is_best_seller: Boolean(input.is_best_seller),
    is_active: input.is_active !== undefined ? input.is_active : true,
    warranty: input.warranty || null,
    delivery_info: input.delivery_info || null,
    created_at: now,
    updated_at: now,
  };

  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'products', productId);
    await setDoc(docRef, productData);

    // Save specs if provided
    if (input.specs && input.specs.length > 0) {
      for (let i = 0; i < input.specs.length; i++) {
        const spec = input.specs[i];
        if (spec.spec_key.trim() && spec.spec_value.trim()) {
          const specId = `spec-${productId}-${i}`;
          await setDoc(doc(db, 'product_specs', specId), {
            id: specId,
            product_id: productId,
            spec_key: spec.spec_key.trim(),
            spec_value: spec.spec_value.trim(),
            sort_order: i + 1,
          });
        }
      }
    }

    // Save condition report if provided
    if (input.condition_report) {
      const condId = `cond-${productId}`;
      await setDoc(doc(db, 'condition_reports', condId), {
        id: condId,
        product_id: productId,
        battery_health: input.condition_report.battery_health || null,
        cosmetic_condition: input.condition_report.cosmetic_condition || null,
        inspection_report: input.condition_report.inspection_report || null,
        accessories_included: input.condition_report.accessories_included || null,
        warranty_period: input.condition_report.warranty_period || null,
      });
    }
  }

  return productData;
}

/**
 * Update an existing product in Firestore
 */
export async function updateProduct(
  productId: string,
  input: Partial<SaveProductInput>,
  existingSlug?: string
): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    return;
  }

  const updatePayload: Record<string, any> = {
    ...input,
    updated_at: new Date().toISOString(),
  };

  delete updatePayload.specs;
  delete updatePayload.condition_report;
  if (existingSlug) {
    updatePayload.slug = existingSlug;
  }

  const docRef = doc(db, 'products', productId);
  await updateDoc(docRef, updatePayload);

  // Update specs if passed
  if (input.specs !== undefined) {
    // Delete old specs
    const specsQ = query(collection(db, 'product_specs'), where('product_id', '==', productId));
    const snap = await getDocs(specsQ);
    for (const d of snap.docs) {
      await deleteDoc(d.ref);
    }
    // Insert new specs
    for (let i = 0; i < input.specs.length; i++) {
      const spec = input.specs[i];
      if (spec.spec_key.trim() && spec.spec_value.trim()) {
        const specId = `spec-${productId}-${i}-${Date.now()}`;
        await setDoc(doc(db, 'product_specs', specId), {
          id: specId,
          product_id: productId,
          spec_key: spec.spec_key.trim(),
          spec_value: spec.spec_value.trim(),
          sort_order: i + 1,
        });
      }
    }
  }

  // Update condition report if passed
  if (input.condition_report !== undefined) {
    const condRef = doc(db, 'condition_reports', `cond-${productId}`);
    if (input.condition_report === null) {
      try {
        await deleteDoc(condRef);
      } catch {}
    } else {
      await setDoc(
        condRef,
        {
          id: `cond-${productId}`,
          product_id: productId,
          battery_health: input.condition_report.battery_health || null,
          cosmetic_condition: input.condition_report.cosmetic_condition || null,
          inspection_report: input.condition_report.inspection_report || null,
          accessories_included: input.condition_report.accessories_included || null,
          warranty_period: input.condition_report.warranty_period || null,
        },
        { merge: true }
      );
    }
  }
}

/**
 * Delete product from Firestore and delete associated Storage images
 */
export async function deleteProduct(productId: string, imageUrls?: string[]): Promise<void> {
  if (isFirebaseConfigured && db) {
    // Delete Firestore document
    await deleteDoc(doc(db, 'products', productId));

    // Delete specs
    try {
      const specsQ = query(collection(db, 'product_specs'), where('product_id', '==', productId));
      const snap = await getDocs(specsQ);
      for (const d of snap.docs) {
        await deleteDoc(d.ref);
      }
    } catch {}

    // Delete condition report
    try {
      await deleteDoc(doc(db, 'condition_reports', `cond-${productId}`));
    } catch {}
  }

  // Clean up Storage images
  if (imageUrls && imageUrls.length > 0) {
    for (const url of imageUrls) {
      await deleteProductImage(url);
    }
  }
}

/**
 * Update stock level directly
 */
export async function updateProductStock(productId: string, newStock: number): Promise<void> {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, {
      stock: Math.max(0, newStock),
      updated_at: new Date().toISOString(),
    });
  }
}

/**
 * Decrement stock in Firestore upon completed purchase
 */
export async function decrementProductStock(
  items: { productId: string; quantity: number }[]
): Promise<void> {
  if (!isFirebaseConfigured || !db) return;

  for (const item of items) {
    try {
      const docRef = doc(db, 'products', item.productId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const currentStock = snap.data()?.stock ?? 0;
        const newStock = Math.max(0, currentStock - item.quantity);
        await updateDoc(docRef, {
          stock: newStock,
          sales_count: increment(item.quantity),
          updated_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn(`Failed to decrement stock for product ${item.productId}:`, err);
    }
  }
}

/**
 * One-click helper to seed baseline categories and products into Firestore if starting fresh
 */
export async function seedInitialProducts(): Promise<{ productsCount: number; categoriesCount: number }> {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured. Cannot seed database.');
  }

  const batch = writeBatch(db);

  // 1. Seed Categories
  for (const cat of mockCategories) {
    const catRef = doc(db, 'categories', cat.id);
    batch.set(catRef, cat, { merge: true });
  }

  // 2. Seed Products
  for (const prod of mockProducts) {
    const prodRef = doc(db, 'products', prod.id);
    batch.set(prodRef, prod, { merge: true });

    // Seed Specs
    const specs = mockSpecs[prod.slug];
    if (specs && specs.length > 0) {
      for (const sp of specs) {
        const specRef = doc(db, 'product_specs', sp.id);
        batch.set(specRef, sp, { merge: true });
      }
    }

    // Seed Condition Report
    const cond = mockConditionReports[prod.slug];
    if (cond) {
      const condRef = doc(db, 'condition_reports', cond.id);
      batch.set(condRef, cond, { merge: true });
    }
  }

  await batch.commit();

  return {
    productsCount: mockProducts.length,
    categoriesCount: mockCategories.length,
  };
}
