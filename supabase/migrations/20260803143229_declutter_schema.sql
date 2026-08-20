/*
# Declutter — Core e-commerce schema

## Overview
Full data model for a single-owner premium electronics & appliance retailer.
Customers browse, cart, wishlist, order, and review. Only the owner manages products,
categories, coupons, banners, orders, and settings.

## Tables
1. profiles — extends auth.users with full_name, role, phone, avatar.
2. addresses — shipping/billing addresses per customer.
3. categories — product categories with slug, icon, image.
4. products — catalog with price, discount, condition, stock, images, flags.
5. product_specs — flexible key/value technical specs per product.
6. condition_reports — inspection details for pre-owned products.
7. carts + cart_items — one cart per user.
8. wishlists — saved products per user.
9. orders + order_items — order header and line items.
10. reviews — product reviews with moderation.
11. coupons — discount codes.
12. notifications — per-user notifications.
13. banners — homepage hero carousel.
14. settings — site-wide key/value settings.
15. recently_viewed — per-user recently viewed.
16. comparisons — per-user comparison list.

## Security
- RLS on every table.
- Catalog tables publicly readable (anon + authenticated).
- Owner-scoped tables restricted to the owning authenticated user.
- Admin-only writes enforced via is_admin() checking JWT app_metadata role.
*/

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin';
$$;

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  phone text,
  avatar_url text,
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer','admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_select_self_or_admin" ON public.profiles;
CREATE POLICY "profiles_select_self_or_admin" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.is_admin());
DROP POLICY IF EXISTS "profiles_insert_self" ON public.profiles;
CREATE POLICY "profiles_insert_self" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "profiles_update_self" ON public.profiles;
CREATE POLICY "profiles_update_self" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;
CREATE POLICY "profiles_update_admin" ON public.profiles FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE IF NOT EXISTS public.addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  label text NOT NULL DEFAULT 'Home',
  full_name text NOT NULL,
  phone text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text,
  country text NOT NULL DEFAULT 'Nigeria',
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "addresses_select_own" ON public.addresses;
CREATE POLICY "addresses_select_own" ON public.addresses FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "addresses_insert_own" ON public.addresses;
CREATE POLICY "addresses_insert_own" ON public.addresses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "addresses_update_own" ON public.addresses;
CREATE POLICY "addresses_update_own" ON public.addresses FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "addresses_delete_own" ON public.addresses;
CREATE POLICY "addresses_delete_own" ON public.addresses FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text,
  image_url text,
  description text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "categories_read_public" ON public.categories;
CREATE POLICY "categories_read_public" ON public.categories FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "categories_write_admin" ON public.categories;
CREATE POLICY "categories_write_admin" ON public.categories FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  brand text NOT NULL,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  short_description text,
  description text,
  price numeric(12,2) NOT NULL,
  compare_at_price numeric(12,2),
  condition text NOT NULL DEFAULT 'Brand New' CHECK (condition IN ('Brand New','Like New','Excellent','Very Good','Good','Fair')),
  stock int NOT NULL DEFAULT 0,
  sku text,
  rating numeric(3,2) DEFAULT 0,
  review_count int DEFAULT 0,
  sales_count int DEFAULT 0,
  images text[] NOT NULL DEFAULT '{}',
  is_featured boolean NOT NULL DEFAULT false,
  is_flash_deal boolean NOT NULL DEFAULT false,
  is_new_arrival boolean NOT NULL DEFAULT true,
  is_best_seller boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  warranty text,
  delivery_info text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "products_read_public" ON public.products;
CREATE POLICY "products_read_public" ON public.products FOR SELECT TO anon, authenticated USING (is_active = true OR public.is_admin());
DROP POLICY IF EXISTS "products_write_admin" ON public.products;
CREATE POLICY "products_write_admin" ON public.products FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand);
CREATE INDEX IF NOT EXISTS idx_products_condition ON public.products(condition);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_flash ON public.products(is_flash_deal) WHERE is_flash_deal = true;

CREATE TABLE IF NOT EXISTS public.product_specs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  spec_key text NOT NULL,
  spec_value text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);
ALTER TABLE public.product_specs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "specs_read_public" ON public.product_specs;
CREATE POLICY "specs_read_public" ON public.product_specs FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "specs_write_admin" ON public.product_specs;
CREATE POLICY "specs_write_admin" ON public.product_specs FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE IF NOT EXISTS public.condition_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
  battery_health text,
  cosmetic_condition text,
  inspection_report text,
  accessories_included text[],
  warranty_period text
);
ALTER TABLE public.condition_reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "condition_read_public" ON public.condition_reports;
CREATE POLICY "condition_read_public" ON public.condition_reports FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "condition_write_admin" ON public.condition_reports;
CREATE POLICY "condition_write_admin" ON public.condition_reports FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE IF NOT EXISTS public.carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "carts_select_own" ON public.carts;
CREATE POLICY "carts_select_own" ON public.carts FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "carts_insert_own" ON public.carts;
CREATE POLICY "carts_insert_own" ON public.carts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "carts_update_own" ON public.carts;
CREATE POLICY "carts_update_own" ON public.carts FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "carts_delete_own" ON public.carts;
CREATE POLICY "carts_delete_own" ON public.carts FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id uuid NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity int NOT NULL DEFAULT 1 CHECK (quantity > 0),
  saved_for_later boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE (cart_id, product_id)
);
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "cart_items_own" ON public.cart_items;
CREATE POLICY "cart_items_own" ON public.cart_items FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));
DROP POLICY IF EXISTS "cart_items_insert_own" ON public.cart_items;
CREATE POLICY "cart_items_insert_own" ON public.cart_items FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));
DROP POLICY IF EXISTS "cart_items_update_own" ON public.cart_items;
CREATE POLICY "cart_items_update_own" ON public.cart_items FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));
DROP POLICY IF EXISTS "cart_items_delete_own" ON public.cart_items;
CREATE POLICY "cart_items_delete_own" ON public.cart_items FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM public.carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS public.wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, product_id)
);
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "wishlist_select_own" ON public.wishlists;
CREATE POLICY "wishlist_select_own" ON public.wishlists FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "wishlist_insert_own" ON public.wishlists;
CREATE POLICY "wishlist_insert_own" ON public.wishlists FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "wishlist_delete_own" ON public.wishlists;
CREATE POLICY "wishlist_delete_own" ON public.wishlists FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled','refunded')),
  total numeric(12,2) NOT NULL DEFAULT 0,
  subtotal numeric(12,2) NOT NULL DEFAULT 0,
  discount numeric(12,2) NOT NULL DEFAULT 0,
  shipping numeric(12,2) NOT NULL DEFAULT 0,
  tax numeric(12,2) NOT NULL DEFAULT 0,
  coupon_code text,
  payment_method text,
  payment_status text NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid','paid','refunded','failed')),
  shipping_address jsonb,
  billing_address jsonb,
  tracking_number text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "orders_select_own_or_admin" ON public.orders;
CREATE POLICY "orders_select_own_or_admin" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_admin());
DROP POLICY IF EXISTS "orders_insert_own" ON public.orders;
CREATE POLICY "orders_insert_own" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "orders_update_admin" ON public.orders;
CREATE POLICY "orders_update_admin" ON public.orders FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  name text NOT NULL,
  brand text,
  image_url text,
  price numeric(12,2) NOT NULL,
  quantity int NOT NULL DEFAULT 1,
  condition text
);
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "order_items_select_own_or_admin" ON public.order_items;
CREATE POLICY "order_items_select_own_or_admin" ON public.order_items FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_admin())));
DROP POLICY IF EXISTS "order_items_insert_own" ON public.order_items;
CREATE POLICY "order_items_insert_own" ON public.order_items FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name text,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "reviews_read_public" ON public.reviews;
CREATE POLICY "reviews_read_public" ON public.reviews FOR SELECT TO anon, authenticated USING (is_approved = true OR auth.uid() = user_id OR public.is_admin());
DROP POLICY IF EXISTS "reviews_insert_own" ON public.reviews;
CREATE POLICY "reviews_insert_own" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "reviews_update_own" ON public.reviews;
CREATE POLICY "reviews_update_own" ON public.reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "reviews_delete_own" ON public.reviews;
CREATE POLICY "reviews_delete_own" ON public.reviews FOR DELETE TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "reviews_update_admin" ON public.reviews;
CREATE POLICY "reviews_update_admin" ON public.reviews FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE IF NOT EXISTS public.coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('percent','fixed')),
  value numeric(12,2) NOT NULL,
  min_order numeric(12,2) NOT NULL DEFAULT 0,
  max_discount numeric(12,2),
  usage_limit int,
  used_count int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "coupons_read_public" ON public.coupons;
CREATE POLICY "coupons_read_public" ON public.coupons FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "coupons_write_admin" ON public.coupons;
CREATE POLICY "coupons_write_admin" ON public.coupons FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text,
  type text NOT NULL DEFAULT 'info',
  is_read boolean NOT NULL DEFAULT false,
  link text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "notif_select_own" ON public.notifications;
CREATE POLICY "notif_select_own" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "notif_insert_own_or_admin" ON public.notifications;
CREATE POLICY "notif_insert_own_or_admin" ON public.notifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id OR public.is_admin());
DROP POLICY IF EXISTS "notif_update_own" ON public.notifications;
CREATE POLICY "notif_update_own" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "notif_delete_own" ON public.notifications;
CREATE POLICY "notif_delete_own" ON public.notifications FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  image_url text,
  cta_text text,
  cta_link text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "banners_read_public" ON public.banners;
CREATE POLICY "banners_read_public" ON public.banners FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "banners_write_admin" ON public.banners;
CREATE POLICY "banners_write_admin" ON public.banners FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE IF NOT EXISTS public.settings (
  key text PRIMARY KEY,
  value text,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "settings_read_public" ON public.settings;
CREATE POLICY "settings_read_public" ON public.settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "settings_write_admin" ON public.settings;
CREATE POLICY "settings_write_admin" ON public.settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE IF NOT EXISTS public.recently_viewed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  viewed_at timestamptz DEFAULT now(),
  UNIQUE (user_id, product_id)
);
ALTER TABLE public.recently_viewed ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "recent_select_own" ON public.recently_viewed;
CREATE POLICY "recent_select_own" ON public.recently_viewed FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "recent_insert_own" ON public.recently_viewed;
CREATE POLICY "recent_insert_own" ON public.recently_viewed FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "recent_update_own" ON public.recently_viewed;
CREATE POLICY "recent_update_own" ON public.recently_viewed FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "recent_delete_own" ON public.recently_viewed;
CREATE POLICY "recent_delete_own" ON public.recently_viewed FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, product_id)
);
ALTER TABLE public.comparisons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "compare_select_own" ON public.comparisons;
CREATE POLICY "compare_select_own" ON public.comparisons FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "compare_insert_own" ON public.comparisons;
CREATE POLICY "compare_insert_own" ON public.comparisons FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "compare_delete_own" ON public.comparisons;
CREATE POLICY "compare_delete_own" ON public.comparisons FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
DROP TRIGGER IF EXISTS profiles_touch ON public.profiles;
CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
DROP TRIGGER IF EXISTS products_touch ON public.products;
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
DROP TRIGGER IF EXISTS orders_touch ON public.orders;
CREATE TRIGGER orders_touch BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
DROP TRIGGER IF EXISTS settings_touch ON public.settings;
CREATE TRIGGER settings_touch BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
