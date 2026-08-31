import type { Product, Category, Banner, Coupon, Settings, Review, ProductSpec, ConditionReport } from '@/types';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Phones', slug: 'phones', icon: 'Smartphone', image_url: null, description: 'Smartphones and mobile devices from top brands', sort_order: 1 },
  { id: 'cat-2', name: 'Laptops', slug: 'laptops', icon: 'Laptop', image_url: null, description: 'High-performance laptops, ultrabooks, and MacBooks', sort_order: 2 },
  { id: 'cat-3', name: 'Tablets', slug: 'tablets', icon: 'Tablet', image_url: null, description: 'iPads, Android tablets, and drawing displays', sort_order: 3 },
  { id: 'cat-4', name: 'Smart Watches', slug: 'smart-watches', icon: 'Watch', image_url: null, description: 'Smart wearables, sports watches, and fitness trackers', sort_order: 4 },
  { id: 'cat-5', name: 'TVs', slug: 'tvs', icon: 'Tv', image_url: null, description: '4K Smart TVs, QLED, OLED, and home entertainment', sort_order: 5 },
  { id: 'cat-6', name: 'Gaming', slug: 'gaming-consoles', icon: 'Gamepad2', image_url: null, description: 'PlayStation, Xbox, gaming accessories, and consoles', sort_order: 6 },
  { id: 'cat-7', name: 'Audio', slug: 'speakers', icon: 'Speaker', image_url: null, description: 'Wireless speakers, soundbars, and premium headphones', sort_order: 7 },
  { id: 'cat-8', name: 'Cameras', slug: 'cameras', icon: 'Camera', image_url: null, description: 'Professional mirrorless cameras, DSLRs, and accessories', sort_order: 8 },
  { id: 'cat-9', name: 'Appliances', slug: 'home-appliances', icon: 'Microwave', image_url: null, description: 'Inverter air conditioners, refrigerators, and blenders', sort_order: 9 },
  { id: 'cat-10', name: 'Accessories', slug: 'accessories', icon: 'Headphones', image_url: null, description: 'Earbuds, power banks, GaN chargers, and networking cables', sort_order: 10 },
];

export const mockProducts: Product[] = [
  {
    "id": "prod-1",
    "name": "iPhone 16 Pro Max 256GB",
    "slug": "iphone-16-pro-max-256gb",
    "brand": "Apple",
    "model": "iPhone 16 Pro Max",
    "storage": "256GB",
    "ram": "8GB",
    "processor": "Apple A18 Pro",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "iOS Smartphones",
    "short_description": "Grade 5 Titanium design with Camera Control and A18 Pro chip. 48MP Pro camera system with 5x Telephoto.",
    "description": "iPhone 16 Pro Max forged in premium Grade 5 Titanium with a refined microblasted texture. Features a 6.9-inch Super Retina XDR display with ProMotion 120Hz, the lightning-fast A18 Pro chip with 6-core GPU, innovative Camera Control button for instant photo adjustments, 48MP Fusion camera with 2nd-gen quad-pixel sensor, 5x optical zoom tetraprism lens, 4K 120 fps Dolby Vision recording, studio-quality 4-mic array, and all-day battery life in Desert Titanium.",
    "price": 2050000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 8,
    "sku": "IP16PM-256-DT",
    "rating": 4.9,
    "review_count": 128,
    "sales_count": 310,
    "images": [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-20T10:00:00Z",
    "updated_at": "2026-07-20T10:00:00Z"
  },
  {
    "id": "prod-2",
    "name": "Samsung Galaxy S24 Ultra 256GB",
    "slug": "samsung-galaxy-s24-ultra",
    "brand": "Samsung",
    "model": "Galaxy S24 Ultra (SM-S928B)",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "Snapdragon 8 Gen 3 for Galaxy",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "Galaxy AI with Circle to Search, 200MP quad camera, Titanium frame, and embedded S Pen.",
    "description": "Samsung Galaxy S24 Ultra featuring built-in Galaxy AI with Circle to Search, Live Translate, Note Assist, and Photo Assist. Powered by Qualcomm Snapdragon 8 Gen 3 for Galaxy, 6.8-inch QHD+ Dynamic AMOLED 2X flat display with Corning Gorilla Armor anti-reflective glass (2600 nits), 200MP main camera with 50MP 5x optical zoom periscope lens, 12GB RAM, 256GB UFS 4.0 storage, 5000mAh battery with 45W fast charge, integrated low-latency S Pen, and Titanium Gray finish.",
    "price": 1800000,
    "compare_at_price": 2000000,
    "condition": "Brand New",
    "stock": 12,
    "sku": "SAM-S24U-256-GRY",
    "rating": 4.9,
    "review_count": 94,
    "sales_count": 240,
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": true,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-15T10:00:00Z",
    "updated_at": "2026-07-15T10:00:00Z"
  },
  {
    "id": "prod-3",
    "name": "iPhone 15 Pro 256GB (Certified Pre-Owned)",
    "slug": "iphone-15-pro-256gb-preowned",
    "brand": "Apple",
    "model": "iPhone 15 Pro",
    "storage": "256GB",
    "ram": "8GB",
    "processor": "Apple A17 Pro",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "iOS Smartphones",
    "short_description": "Certified Grade A+ pre-owned iPhone 15 Pro in Natural Titanium with Action Button and 94%+ verified battery.",
    "description": "Professionally inspected Grade A+ certified pre-owned iPhone 15 Pro. Features aerospace-grade Natural Titanium band, 6.1-inch Super Retina XDR OLED display with ProMotion 120Hz, Apple A17 Pro 3nm gaming chip with hardware ray tracing, customizable Action button, 48MP main camera with 3x optical zoom, USB-C 10Gbps transfer speed, and verified 94% original battery health with complete diagnostic report.",
    "price": 1150000,
    "compare_at_price": null,
    "condition": "Certified Pre-Owned",
    "stock": 5,
    "sku": "IP15P-256-NT-CPO",
    "rating": 4.8,
    "review_count": 56,
    "sales_count": 180,
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "6 Months BuyAndSellOutlets Warranty & Diagnostic Card",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-05T10:00:00Z",
    "updated_at": "2026-07-05T10:00:00Z"
  },
  {
    "id": "prod-4",
    "name": "Google Pixel 8 Pro 128GB",
    "slug": "google-pixel-8-pro",
    "brand": "Google",
    "model": "Pixel 8 Pro (GC3VE)",
    "storage": "128GB",
    "ram": "12GB",
    "processor": "Google Tensor G3",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "Google Tensor G3 with Google AI, 50MP triple pro camera, Super Actua display, and built-in temperature sensor.",
    "description": "Google Pixel 8 Pro powered by the Google Tensor G3 custom chip and Google Titan M2 security coprocessor. Features a 6.7-inch Super Actua LTPO OLED display (1-120Hz, 2400 nits), 50MP main camera with Macro Focus, 48MP 5x telephoto with 30x Super Res Zoom, 48MP ultra-wide camera, built-in object temperature sensor, Magic Editor, Best Take, Audio Magic Eraser, and 5050mAh battery in Obsidian.",
    "price": 990000,
    "compare_at_price": 1100000,
    "condition": "Open Box",
    "stock": 6,
    "sku": "PIX-8P-128-OBS",
    "rating": 4.8,
    "review_count": 73,
    "sales_count": 160,
    "images": [
      "https://images.unsplash.com/photo-1598327105854-c8674faddf79?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": true,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Manufacturer Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-01T10:00:00Z",
    "updated_at": "2026-07-01T10:00:00Z"
  },
  {
    "id": "prod-28",
    "name": "iPhone 16 Pro 128GB",
    "slug": "iphone-16-pro-128gb",
    "brand": "Apple",
    "model": "iPhone 16 Pro",
    "storage": "128GB",
    "ram": "8GB",
    "processor": "Apple A18 Pro",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "iOS Smartphones",
    "short_description": "6.3\" Super Retina XDR display, Grade 5 Titanium, Camera Control button, and Apple A18 Pro chip.",
    "description": "iPhone 16 Pro in Black Titanium with thinner borders on a 6.3-inch Super Retina XDR OLED display. Features Apple A18 Pro chip, Camera Control button, 48MP Fusion camera with 2nd-generation sensor, 5x Telephoto tetraprism optical zoom, 4K 120 fps Dolby Vision video, and USB-C with USB 3 speeds.",
    "price": 1750000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 9,
    "sku": "IP16P-128-BT",
    "rating": 4.9,
    "review_count": 84,
    "sales_count": 195,
    "images": [
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-22T10:00:00Z",
    "updated_at": "2026-07-22T10:00:00Z"
  },
  {
    "id": "prod-29",
    "name": "iPhone 16 128GB",
    "slug": "iphone-16-128gb",
    "brand": "Apple",
    "model": "iPhone 16",
    "storage": "128GB",
    "ram": "8GB",
    "processor": "Apple A18",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "iOS Smartphones",
    "short_description": "Apple A18 silicon, Camera Control, Action button, 48MP Fusion camera with 2x Telephoto, Teal finish.",
    "description": "iPhone 16 featuring color-infused back glass with aerospace-grade aluminum enclosure in Teal. Powered by the A18 chip, Camera Control button, customizable Action button, 48MP Fusion camera with 2x optical-quality telephoto, Spatial Audio recording, Macro photography, and Ceramic Shield 50% tougher than 1st generation.",
    "price": 1350000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 14,
    "sku": "IP16-128-TEA",
    "rating": 4.8,
    "review_count": 62,
    "sales_count": 140,
    "images": [
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-21T10:00:00Z",
    "updated_at": "2026-07-21T10:00:00Z"
  },
  {
    "id": "prod-30",
    "name": "iPhone 14 128GB (Certified Pre-Owned)",
    "slug": "iphone-14-128gb-preowned",
    "brand": "Apple",
    "model": "iPhone 14",
    "storage": "128GB",
    "ram": "6GB",
    "processor": "Apple A15 Bionic",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "iOS Smartphones",
    "short_description": "Grade A pre-owned iPhone 14 in Midnight with 89%+ battery health, tested Face ID, dual 12MP cameras.",
    "description": "Certified pre-owned iPhone 14 in Midnight. Professionally tested 6.1-inch Super Retina XDR display, Apple A15 Bionic 5-core GPU chip, dual 12MP cameras with Photonic Engine and Action Mode video, Crash Detection, and verified 89%+ battery health.",
    "price": 580000,
    "compare_at_price": null,
    "condition": "Certified Pre-Owned",
    "stock": 7,
    "sku": "IP14-128-MID-CPO",
    "rating": 4.7,
    "review_count": 45,
    "sales_count": 110,
    "images": [
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "6 Months BuyAndSellOutlets Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-25T10:00:00Z",
    "updated_at": "2026-06-25T10:00:00Z"
  },
  {
    "id": "prod-31",
    "name": "Samsung Galaxy Z Fold6 256GB",
    "slug": "samsung-galaxy-z-fold6-256gb",
    "brand": "Samsung",
    "model": "Galaxy Z Fold6 (SM-F956B)",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "Snapdragon 8 Gen 3 for Galaxy",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Foldable Smartphones",
    "short_description": "7.6\" Dynamic AMOLED 2X 2600-nit folding screen, Armor Aluminum hinge, Galaxy AI dual-screen features.",
    "description": "Samsung Galaxy Z Fold6 brings cutting-edge dual-screen productivity. Features a 7.6-inch folding Dynamic AMOLED 2X display (2600 nits) and a wider 6.3-inch cover screen, Snapdragon 8 Gen 3 for Galaxy processor, 12GB RAM, 256GB storage, enhanced Armor Aluminum hinge, IP48 water resistance, dual-screen Interpreter mode, Sketch to Image AI, and 50MP triple camera in Silver Shadow.",
    "price": 2450000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 5,
    "sku": "SAM-ZFOLD6-256-SS",
    "rating": 4.8,
    "review_count": 38,
    "sales_count": 75,
    "images": [
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-24T10:00:00Z",
    "updated_at": "2026-07-24T10:00:00Z"
  },
  {
    "id": "prod-32",
    "name": "Samsung Galaxy Z Flip6 256GB",
    "slug": "samsung-galaxy-z-flip6-256gb",
    "brand": "Samsung",
    "model": "Galaxy Z Flip6 (SM-F741B)",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "Snapdragon 8 Gen 3 for Galaxy",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Foldable Smartphones",
    "short_description": "3.4\" FlexWindow outer display, 50MP ProVisual camera, 4000mAh battery, and compact folding design.",
    "description": "Samsung Galaxy Z Flip6 upgraded with a 50MP wide main camera with 2x in-sensor optical quality zoom, 12GB RAM, Snapdragon 8 Gen 3 for Galaxy with custom vapor chamber cooling, 4000mAh larger battery, 3.4-inch Super AMOLED FlexWindow with interactive widgets and Generative Wallpaper, and enhanced Armor Aluminum hinge in Mint.",
    "price": 1350000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 8,
    "sku": "SAM-ZFLIP6-256-MNT",
    "rating": 4.8,
    "review_count": 42,
    "sales_count": 90,
    "images": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-23T10:00:00Z",
    "updated_at": "2026-07-23T10:00:00Z"
  },
  {
    "id": "prod-33",
    "name": "Samsung Galaxy A55 5G 128GB",
    "slug": "samsung-galaxy-a55-5g-128gb",
    "brand": "Samsung",
    "model": "Galaxy A55 5G (SM-A556E)",
    "storage": "128GB",
    "ram": "8GB",
    "processor": "Samsung Exynos 1480 (4nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "Metal frame with Gorilla Glass Victus+, 50MP OIS camera, Exynos 1480 with AMD Xclipse 530 GPU, 5000mAh.",
    "description": "Samsung Galaxy A55 5G delivers premium materials and flagship features to the mid-range. Features a metal frame, Gorilla Glass Victus+ front and back, 6.6-inch FHD+ 120Hz Super AMOLED display (1000 nits), Exynos 1480 4nm processor with AMD RDNA2-based Xclipse 530 GPU, 50MP OIS main camera, Knox Vault security, and 5000mAh 2-day battery in Awesome Navy.",
    "price": 485000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 22,
    "sku": "SAM-A55-128-NVY",
    "rating": 4.7,
    "review_count": 89,
    "sales_count": 260,
    "images": [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-20T10:00:00Z",
    "updated_at": "2026-06-20T10:00:00Z"
  },
  {
    "id": "prod-34",
    "name": "Samsung Galaxy A15 128GB",
    "slug": "samsung-galaxy-a15-128gb",
    "brand": "Samsung",
    "model": "Galaxy A15 (SM-A155F)",
    "storage": "128GB",
    "ram": "4GB",
    "processor": "MediaTek Helio G99 (6nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "6.5\" 90Hz Super AMOLED display, MediaTek Helio G99, 50MP triple camera, and 5000mAh battery.",
    "description": "Samsung Galaxy A15 is Nigeria’s most popular budget smartphone, featuring a vivid 6.5-inch 90Hz Super AMOLED display with 800 nits Vision Booster, power-efficient MediaTek Helio G99 6nm processor, 50MP triple rear camera, 5000mAh battery with 25W fast charging, and 4 guaranteed Android OS upgrades in Blue Black.",
    "price": 195000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 35,
    "sku": "SAM-A15-128-BLK",
    "rating": 4.6,
    "review_count": 112,
    "sales_count": 420,
    "images": [
      "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-10T10:00:00Z",
    "updated_at": "2026-06-10T10:00:00Z"
  },
  {
    "id": "prod-35",
    "name": "Google Pixel 9 Pro XL 128GB",
    "slug": "google-pixel-9-pro-xl",
    "brand": "Google",
    "model": "Pixel 9 Pro XL",
    "storage": "128GB",
    "ram": "16GB",
    "processor": "Google Tensor G4",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "Google Tensor G4 with 16GB RAM, 6.8\" Super Actua 120Hz display (3000 nits peak), and Gemini Advanced AI.",
    "description": "Google Pixel 9 Pro XL represents the pinnacle of Google AI hardware engineering. Featuring a bold new camera bar design with polished metal frame and matte glass back in Porcelain, 6.8-inch Super Actua LTPO OLED (1-120Hz, 3000 nits peak), Google Tensor G4 chip with 16GB RAM for on-device multimodal Gemini Nano AI, 50MP main + 48MP ultra-wide + 48MP 5x telephoto cameras, 42MP selfie camera with autofocus, 5060mAh battery with 37W wired charging, and 7 years of OS updates.",
    "price": 1550000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 5,
    "sku": "PIX-9PXL-128-POR",
    "rating": 4.9,
    "review_count": 31,
    "sales_count": 65,
    "images": [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Manufacturer Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-28T10:00:00Z",
    "updated_at": "2026-07-28T10:00:00Z"
  },
  {
    "id": "prod-36",
    "name": "Google Pixel 8a 128GB",
    "slug": "google-pixel-8a-128gb",
    "brand": "Google",
    "model": "Pixel 8a (G8HH4)",
    "storage": "128GB",
    "ram": "8GB",
    "processor": "Google Tensor G3",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "6.1\" Actua 120Hz OLED, Tensor G3 chip, 64MP dual camera with Best Take & Audio Magic Eraser, Bay Blue.",
    "description": "Google Pixel 8a brings Google’s flagship Tensor G3 AI capabilities to an accessible form factor. Features a 6.1-inch 120Hz Actua OLED display (2000 nits), 64MP main camera + 13MP ultra-wide, Best Take group photo correction, Magic Audio Eraser, Circle to Search, 4492mAh all-day battery with wireless charging, IP67 durability, and 7 years of OS support in Bay Blue.",
    "price": 580000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 10,
    "sku": "PIX-8A-128-BAY",
    "rating": 4.7,
    "review_count": 48,
    "sales_count": 105,
    "images": [
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Manufacturer Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-08T10:00:00Z",
    "updated_at": "2026-07-08T10:00:00Z"
  },
  {
    "id": "prod-37",
    "name": "Xiaomi 14 Ultra 512GB (Leica Quad Camera)",
    "slug": "xiaomi-14-ultra-512gb",
    "brand": "Xiaomi",
    "model": "Xiaomi 14 Ultra (24030PN60G)",
    "storage": "512GB",
    "ram": "16GB",
    "processor": "Snapdragon 8 Gen 3 (4nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Flagship Photography",
    "short_description": "1-inch Sony LYT-900 sensor with stepless variable aperture, quad 50MP Leica summicron lenses, and 90W HyperCharge.",
    "description": "Xiaomi 14 Ultra is the ultimate professional photography smartphone developed with Leica. Features a 1-inch Sony LYT-900 sensor with f/1.63 to f/4.0 stepless mechanical variable aperture, quad 50MP Leica cameras covering 12mm to 120mm focal lengths, Snapdragon 8 Gen 3, 16GB LPDDR5X RAM, 512GB UFS 4.0 storage, 6.73-inch WQHD+ 120Hz LTPO AMOLED display with 3000 nits, Xiaomi Dual-Channel IceLoop liquid cooling, 5000mAh battery with 90W wired and 80W wireless HyperCharge in Black Vegan Leather.",
    "price": 1150000,
    "compare_at_price": null,
    "condition": "Open Box",
    "stock": 4,
    "sku": "XIA-14U-512-BLK",
    "rating": 4.9,
    "review_count": 27,
    "sales_count": 55,
    "images": [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Xiaomi Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-12T10:00:00Z",
    "updated_at": "2026-07-12T10:00:00Z"
  },
  {
    "id": "prod-38",
    "name": "Redmi Note 13 Pro+ 5G 256GB",
    "slug": "redmi-note-13-pro-plus-5g",
    "brand": "Redmi",
    "model": "Redmi Note 13 Pro+ 5G",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "MediaTek Dimensity 7200-Ultra (4nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "200MP OIS camera with 4x lossless zoom, curved 1.5K 120Hz AMOLED, 120W HyperCharge, IP68 water resistance.",
    "description": "Redmi Note 13 Pro+ 5G sets the gold standard for premium mid-rangers. Features a 200MP Samsung ISOCELL HP3 camera with OIS and 4x in-sensor lossless zoom, 6.67-inch curved 1.5K 120Hz AMOLED display with Gorilla Glass Victus (1800 nits), MediaTek Dimensity 7200-Ultra 4nm chip, 12GB RAM, 256GB storage, IP68 water and dust resistance, and 5000mAh battery with 120W HyperCharge (100% in 19 mins) in Midnight Black.",
    "price": 520000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 18,
    "sku": "RED-N13PP-256-BLK",
    "rating": 4.8,
    "review_count": 95,
    "sales_count": 290,
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Xiaomi Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-18T10:00:00Z",
    "updated_at": "2026-06-18T10:00:00Z"
  },
  {
    "id": "prod-39",
    "name": "Redmi 13C 128GB",
    "slug": "redmi-13c-128gb",
    "brand": "Redmi",
    "model": "Redmi 13C (23100RN82L)",
    "storage": "128GB",
    "ram": "6GB",
    "processor": "MediaTek Helio G85",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "6.74\" 90Hz display with TÜV eye certification, 50MP AI triple camera, 5000mAh battery with 18W fast charge.",
    "description": "Redmi 13C is Nigeria’s top-selling essential smartphone. Features a large 6.74-inch 90Hz smooth display with Corning Gorilla Glass and TÜV low blue light eye care, MediaTek Helio G85 octa-core processor, 6GB RAM (+6GB virtual expansion), 128GB storage, 50MP AI main camera, side fingerprint sensor, 5000mAh battery with 18W fast charging, and 3.5mm headphone jack in Clover Green.",
    "price": 145000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 45,
    "sku": "RED-13C-128-GRN",
    "rating": 4.6,
    "review_count": 140,
    "sales_count": 520,
    "images": [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Xiaomi Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-05T10:00:00Z",
    "updated_at": "2026-06-05T10:00:00Z"
  },
  {
    "id": "prod-40",
    "name": "OnePlus 12 256GB (Snapdragon 8 Gen 3)",
    "slug": "oneplus-12-256gb",
    "brand": "OnePlus",
    "model": "OnePlus 12 (CPH2581)",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "Snapdragon 8 Gen 3",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "4th Gen Hasselblad camera, 2K 120Hz ProXDR display (4500 nits), 5400mAh battery with 100W SUPERVOOC.",
    "description": "OnePlus 12 is a flagship killer powered by Qualcomm Snapdragon 8 Gen 3, Dual Cryo-velocity VC cooling, 4th Gen Hasselblad Camera system (50MP Sony LYT-808 + 64MP 3x Periscope Telephoto + 48MP Ultra-Wide), 6.82-inch 2K 120Hz LTPO ProXDR display with world-record 4500 nits peak brightness, 5400mAh battery with 100W wired & 50W AIRVOOC wireless charging in Silky Black.",
    "price": 1120000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 7,
    "sku": "1P-12-256-BLK",
    "rating": 4.9,
    "review_count": 53,
    "sales_count": 110,
    "images": [
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Manufacturer Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-10T10:00:00Z",
    "updated_at": "2026-07-10T10:00:00Z"
  },
  {
    "id": "prod-41",
    "name": "OnePlus Nord 4 5G 256GB",
    "slug": "oneplus-nord-4-5g",
    "brand": "OnePlus",
    "model": "OnePlus Nord 4 (CPH2663)",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "Snapdragon 7+ Gen 3 (4nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "All-metal unibody design, Snapdragon 7+ Gen 3, 50MP Sony LYT-600 OIS camera, 5500mAh with 100W SUPERVOOC.",
    "description": "OnePlus Nord 4 5G is the only 5G smartphone crafted with an iconic full metal unibody design in Oasis Green. Powered by Snapdragon 7+ Gen 3, 12GB RAM, 256GB storage, 6.74-inch 1.5K 120Hz AMOLED display with Aqua Touch technology, 50MP Sony LYT-600 main camera with OIS, 5500mAh massive battery with 100W fast charging (100% in 28 mins), and 6 years of guaranteed software support.",
    "price": 540000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 12,
    "sku": "1P-NORD4-256-GRN",
    "rating": 4.8,
    "review_count": 41,
    "sales_count": 85,
    "images": [
      "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Manufacturer Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-26T10:00:00Z",
    "updated_at": "2026-07-26T10:00:00Z"
  },
  {
    "id": "prod-42",
    "name": "Tecno Phantom V Fold2 512GB",
    "slug": "tecno-phantom-v-fold2-512gb",
    "brand": "Tecno",
    "model": "Phantom V Fold2 (AE10)",
    "storage": "512GB",
    "ram": "12GB",
    "processor": "MediaTek Dimensity 9000+ (4nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Foldable Smartphones",
    "short_description": "7.85\" 120Hz LTPO 2K+ folding screen, aerospace-grade titanium hinge, 5750mAh battery with 70W Ultra Charge.",
    "description": "Tecno Phantom V Fold2 delivers flagship folding elegance with a 7.85-inch 2K+ 120Hz LTPO AMOLED main screen, 6.42-inch FHD+ cover screen, MediaTek Dimensity 9000+ 4nm chip, 12GB RAM (+12GB extended), 512GB storage, 50MP triple rear cameras with 2x portrait telephoto, 5750mAh high-density battery with 70W Ultra Charge & 15W wireless charging, and Ella AI assistant in Karst Green.",
    "price": 1450000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 6,
    "sku": "TEC-PVF2-512-GRN",
    "rating": 4.7,
    "review_count": 31,
    "sales_count": 65,
    "images": [
      "https://images.unsplash.com/photo-1525598912003-663126343e1f?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "13 Months Carlcare Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-27T10:00:00Z",
    "updated_at": "2026-07-27T10:00:00Z"
  },
  {
    "id": "prod-43",
    "name": "Tecno Camon 30 Pro 5G 256GB",
    "slug": "tecno-camon-30-pro-5g",
    "brand": "Tecno",
    "model": "Camon 30 Pro 5G (CL8)",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "MediaTek Dimensity 8200 Ultimate (4nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "50MP Sony IMX890 OIS camera, 50MP Eye-tracking AF selfie, 144Hz 6.78\" AMOLED, and 70W fast charging.",
    "description": "Tecno Camon 30 Pro 5G is engineered for content creators and photography enthusiasts in Nigeria. Featuring the flagship 1/1.56\" Sony IMX890 50MP sensor with OIS, 50MP ultra-wide camera, 50MP eye-tracking autofocus selfie camera with 4K 60fps recording, MediaTek Dimensity 8200 Ultimate 4nm processor, 144Hz 6.78-inch 1.5K AMOLED display, Dolby Atmos stereo dual speakers, and 5000mAh battery with 70W fast charge.",
    "price": 430000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 20,
    "sku": "TEC-C30P-256-SLV",
    "rating": 4.8,
    "review_count": 87,
    "sales_count": 240,
    "images": [
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "13 Months Carlcare Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-28T10:00:00Z",
    "updated_at": "2026-06-28T10:00:00Z"
  },
  {
    "id": "prod-44",
    "name": "Tecno Spark 20 Pro+ 256GB",
    "slug": "tecno-spark-20-pro-plus",
    "brand": "Tecno",
    "model": "Spark 20 Pro+ (KJ7)",
    "storage": "256GB",
    "ram": "8GB",
    "processor": "MediaTek Helio G99 Ultimate (6nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "Curved 6.78\" 120Hz AMOLED display, 108MP ultra-sensing camera, Helio G99 Ultimate, and 33W fast charge.",
    "description": "Tecno Spark 20 Pro+ features a flagship-inspired 56.5-degree curved 6.78-inch 120Hz AMOLED display with Corning Gorilla Glass 5, MediaTek Helio G99 Ultimate processor, 8GB RAM (+8GB extended), 256GB storage, 108MP 3x lossless zoom main camera, 32MP glowing selfie with dual flash, DTS dual stereo speakers, and 5000mAh battery with 33W fast charge in Temporal Orbits.",
    "price": 275000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 28,
    "sku": "TEC-S20PP-256-BLK",
    "rating": 4.7,
    "review_count": 104,
    "sales_count": 360,
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "13 Months Carlcare Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-15T10:00:00Z",
    "updated_at": "2026-06-15T10:00:00Z"
  },
  {
    "id": "prod-45",
    "name": "Infinix GT 20 Pro 256GB (Gaming Smartphone)",
    "slug": "infinix-gt-20-pro-256gb",
    "brand": "Infinix",
    "model": "GT 20 Pro (X6871)",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "MediaTek Dimensity 8200 Ultimate 5G + Pixelworks X5 Turbo Gaming Display Chip",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Gaming Smartphones",
    "short_description": "Dual gaming chips, 144Hz bezel-less AMOLED, Mecha Loop LED RGB interface, and 108MP OIS camera.",
    "description": "Infinix GT 20 Pro is the official PUBG Mobile Super League tournament smartphone. Features dual gaming chipsets (MediaTek Dimensity 8200 Ultimate 4nm + dedicated Pixelworks X5 Turbo gaming display processor for 120fps MEMC upscaling), Cyber Mecha design with customizable RGB loop lighting, 6.78-inch 144Hz bezel-less AMOLED display, 108MP OIS camera, JBL-tuned dual stereo speakers, and 5000mAh battery with 45W Hyper Charge and Bypass Charging in Mecha Silver.",
    "price": 395000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 15,
    "sku": "INF-GT20P-256-SLV",
    "rating": 4.8,
    "review_count": 67,
    "sales_count": 170,
    "images": [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "13 Months Carlcare Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-06T10:00:00Z",
    "updated_at": "2026-07-06T10:00:00Z"
  },
  {
    "id": "prod-46",
    "name": "Infinix Note 40 Pro 5G 256GB",
    "slug": "infinix-note-40-pro-5g",
    "brand": "Infinix",
    "model": "Note 40 Pro 5G (X6851)",
    "storage": "256GB",
    "ram": "8GB",
    "processor": "MediaTek Dimensity 7020 5G (6nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "All-Round FastCharge 2.0 with 20W Wireless MagCharge, 108MP OIS camera, 3D-Curved 120Hz AMOLED.",
    "description": "Infinix Note 40 Pro 5G debuts All-Round FastCharge 2.0 powered by the in-house Cheetah X1 power management chip. Includes 45W Multi-Speed wired charging and 20W Wireless MagCharge with magnetic charging pad in box, 3D-curved 6.78-inch 120Hz AMOLED display with Gorilla Glass, 108MP 3x lossless zoom OIS camera, Active Halo AI lighting, and Sound by JBL stereo speakers in Vintage Green.",
    "price": 360000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 24,
    "sku": "INF-N40P5G-256-GRN",
    "rating": 4.7,
    "review_count": 78,
    "sales_count": 220,
    "images": [
      "https://images.unsplash.com/photo-1570891836654-d4961a7b6929?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "13 Months Carlcare Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-22T10:00:00Z",
    "updated_at": "2026-06-22T10:00:00Z"
  },
  {
    "id": "prod-47",
    "name": "Nothing Phone (2) 256GB",
    "slug": "nothing-phone-2-256gb",
    "brand": "Nothing",
    "model": "Nothing Phone (2)",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "Snapdragon 8+ Gen 1 (4nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "Customizable Glyph Interface with 33 addressable LED zones, dual 50MP Sony cameras, and Nothing OS 2.5.",
    "description": "Nothing Phone (2) delivers iconic minimalist industrial design with transparent glass back and interactive Glyph Interface featuring 33 LED light zones for progress tracking, notifications, and fill light. Powered by Qualcomm Snapdragon 8+ Gen 1, 12GB RAM, 256GB storage, 6.7-inch 120Hz LTPO OLED display (1600 nits), dual 50MP cameras with Sony IMX890 OIS, 4700mAh battery with 45W wired and 15W wireless charging in Dark Grey.",
    "price": 780000,
    "compare_at_price": null,
    "condition": "Certified Pre-Owned",
    "stock": 6,
    "sku": "NOTH-P2-256-GRY",
    "rating": 4.8,
    "review_count": 51,
    "sales_count": 95,
    "images": [
      "https://images.unsplash.com/photo-1509741102003-ca64bfe5f069?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Manufacturer Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-04T10:00:00Z",
    "updated_at": "2026-07-04T10:00:00Z"
  },
  {
    "id": "prod-48",
    "name": "Nothing Phone (2a) Plus 256GB",
    "slug": "nothing-phone-2a-plus",
    "brand": "Nothing",
    "model": "Nothing Phone (2a) Plus",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "MediaTek Dimensity 7350 Pro 5G (4nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "1-inch Sony LYT-900 sensor with stepless variable aperture, quad 50MP Leica lenses, Snapdragon 8 Gen 3.",
    "description": "Xiaomi 14 Ultra flagship photography phone featuring a 1-inch Sony LYT-900 main camera sensor with f/1.63-f/4.0 variable aperture, quad 50MP Leica optical lenses (12mm, 23mm, 75mm telephoto, 120mm periscope), Snapdragon 8 Gen 3 processor, 6.73\" WQHD+ 120Hz AMOLED display with 3000 nits peak, 5000mAh battery with 90W wired and 80W wireless charging.",
    "price": 480000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 10,
    "sku": "NOTH-P2AP-256-GRY",
    "rating": 4.8,
    "review_count": 36,
    "sales_count": 80,
    "images": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Manufacturer Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-29T10:00:00Z",
    "updated_at": "2026-07-29T10:00:00Z"
  },
  {
    "id": "prod-49",
    "name": "Oppo Find X7 Ultra 256GB",
    "slug": "oppo-find-x7-ultra-256gb",
    "brand": "Oppo",
    "model": "Find X7 Ultra (PHY110)",
    "storage": "256GB",
    "ram": "16GB",
    "processor": "Snapdragon 8 Gen 3",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Flagship Photography",
    "short_description": "World’s first quad main camera with dual periscope telephotos (3x & 6x), 1-inch Sony LYT-900 sensor, Hasselblad.",
    "description": "Oppo Find X7 Ultra represents a photographic masterpiece with the world’s first Dual Periscope Telephoto system (65mm 3x and 135mm 6x periscope zoom lenses) and a 1-inch Sony LYT-900 main sensor. Features Hasselblad Master Camera System with HyperTone image engine, Snapdragon 8 Gen 3, 16GB RAM, 256GB storage, 6.82-inch 2K 120Hz LTPO display with 4500 nits peak, 5000mAh battery with 100W SUPERVOOC and 50W AIRVOOC in Tailored Leather Brown.",
    "price": 1380000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 4,
    "sku": "OPPO-FX7U-256-BRN",
    "rating": 4.9,
    "review_count": 24,
    "sales_count": 45,
    "images": [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Manufacturer Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-14T10:00:00Z",
    "updated_at": "2026-07-14T10:00:00Z"
  },
  {
    "id": "prod-50",
    "name": "Oppo Reno 12 Pro 5G 256GB",
    "slug": "oppo-reno-12-pro-5g",
    "brand": "Oppo",
    "model": "Reno 12 Pro 5G (CPH2629)",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "MediaTek Dimensity 7300-Energy (4nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "Infinite View 120Hz curved screen, GenAI photo eraser, 50MP Sony LYT-600 OIS + 50MP 2x Telephoto portrait camera.",
    "description": "Oppo Reno 12 Pro 5G features futuristic Fluid Ripple design with High-Strength Alloy chassis and IP65 dust/water resistance. Powered by MediaTek Dimensity 7300-Energy 4nm chip, 12GB RAM, 256GB storage, 6.7-inch Infinite View 120Hz AMOLED display with Splash Touch, dual 50MP cameras (Sony LYT-600 OIS + 50MP 2x telephoto portrait), 50MP AF selfie camera, AI Eraser 2.0, AI Studio, and 5000mAh battery with 80W SUPERVOOC in Nebula Silver.",
    "price": 590000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 12,
    "sku": "OPPO-R12P-256-SLV",
    "rating": 4.8,
    "review_count": 47,
    "sales_count": 90,
    "images": [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Manufacturer Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-27T10:00:00Z",
    "updated_at": "2026-07-27T10:00:00Z"
  },
  {
    "id": "prod-51",
    "name": "Vivo X100 Pro 256GB (ZEISS APO Telephoto)",
    "slug": "vivo-x100-pro-256gb",
    "brand": "Vivo",
    "model": "Vivo X100 Pro (V2324A)",
    "storage": "256GB",
    "ram": "16GB",
    "processor": "MediaTek Dimensity 9300 (4nm) + Vivo V3 Imaging Chip",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Flagship Photography",
    "short_description": "1-inch Sony IMX989 sensor, ZEISS APO Floating Telephoto with 100x zoom, 4K Cinematic Portrait Video.",
    "description": "Vivo X100 Pro co-engineered with ZEISS optics is a photography marvel. Features an all-big-core MediaTek Dimensity 9300 4nm processor, custom 6nm Vivo V3 imaging chip, 1-inch Sony IMX989 50MP main sensor with ZEISS T* coating, 50MP ZEISS APO floating periscope telephoto lens with 100x digital zoom, 6.78-inch 120Hz LTPO AMOLED display (3000 nits), 5400mAh BlueVolt battery with 100W FlashCharge and 50W wireless in Asteroid Black.",
    "price": 1350000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 5,
    "sku": "VIVO-X100P-256-BLK",
    "rating": 4.9,
    "review_count": 33,
    "sales_count": 60,
    "images": [
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Manufacturer Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-16T10:00:00Z",
    "updated_at": "2026-07-16T10:00:00Z"
  },
  {
    "id": "prod-52",
    "name": "Vivo V30 Pro 256GB (ZEISS Triple Camera)",
    "slug": "vivo-v30-pro-256gb",
    "brand": "Vivo",
    "model": "Vivo V30 Pro (V2319)",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "MediaTek Dimensity 8200 (4nm)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "50MP ZEISS Triple Main Camera, Studio-Quality Aura Light Portrait, 3D Curved 1.5K 120Hz AMOLED, 5000mAh.",
    "description": "Vivo V30 Pro is the thinnest 5000mAh smartphone with professional ZEISS portrait optics. Features ZEISS Triple 50MP cameras (Sony IMX920 OIS main + 50MP 2x portrait telephoto + 50MP ultra-wide + 50MP AF selfie), upgraded Studio-Quality Aura Light with smart color temperature adjustment, 6.78-inch 3D curved 1.5K 120Hz AMOLED display (2800 nits), MediaTek Dimensity 8200, 12GB RAM, 256GB storage, and 80W FlashCharge in Bloom White.",
    "price": 850000,
    "compare_at_price": null,
    "condition": "Pre-Owned",
    "stock": 14,
    "sku": "VIVO-V30P-256-WHT",
    "rating": 4.8,
    "review_count": 52,
    "sales_count": 110,
    "images": [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Manufacturer Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-29T10:00:00Z",
    "updated_at": "2026-06-29T10:00:00Z"
  },
  {
    "id": "prod-124",
    "name": "iPhone 15 Plus 128GB (Black)",
    "slug": "iphone-15-plus-128gb-black",
    "brand": "Apple",
    "model": "iPhone 15 Plus (A3094)",
    "storage": "128GB",
    "ram": "6GB",
    "processor": "Apple A16 Bionic (6-core CPU, 5-core GPU)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "iOS Smartphones",
    "short_description": "6.7\" Super Retina XDR display, Dynamic Island, 48MP main camera with 2x Telephoto, USB-C.",
    "description": "iPhone 15 Plus features a 6.7-inch Super Retina XDR display with Dynamic Island, color-infused back glass with contoured aluminum edges, 48MP main camera with 2x optical-quality telephoto, A16 Bionic processor, USB-C universal charging, and up to 26 hours video playback battery life.",
    "price": 1250000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 9,
    "sku": "IP15P-128-BLK",
    "rating": 4.8,
    "review_count": 42,
    "sales_count": 88,
    "images": [
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-15T10:00:00Z",
    "updated_at": "2026-07-15T10:00:00Z"
  },
  {
    "id": "prod-125",
    "name": "Samsung Galaxy Z Flip5 256GB (Certified Pre-Owned)",
    "slug": "samsung-galaxy-z-flip5-preowned",
    "brand": "Samsung",
    "model": "Galaxy Z Flip5 (SM-F731B)",
    "storage": "256GB",
    "ram": "8GB",
    "processor": "Snapdragon 8 Gen 2 for Galaxy",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Foldable Smartphones",
    "short_description": "3.4\" Flex Window cover screen, zero-gap Flex Hinge, Snapdragon 8 Gen 2, 95% battery health.",
    "description": "Certified pre-owned Samsung Galaxy Z Flip5 in Cream. Features 3.4-inch Super AMOLED Flex Window cover display, 6.7-inch Dynamic AMOLED 2X 120Hz folding inner screen with zero-gap Flex Hinge, Snapdragon 8 Gen 2 for Galaxy processor, dual 12MP cameras with FlexCam hands-free shooting, IPX8 water resistance, and fully tested 95% battery health.",
    "price": 680000,
    "compare_at_price": null,
    "condition": "Certified Pre-Owned",
    "stock": 3,
    "sku": "SAM-ZFLIP5-256-CPO",
    "rating": 4.7,
    "review_count": 28,
    "sales_count": 65,
    "images": [
      "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "6 Months BuyAndSellOutlets Warranty & Diagnostic Certificate",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-20T10:00:00Z",
    "updated_at": "2026-06-20T10:00:00Z"
  },
  {
    "id": "prod-126",
    "name": "Google Pixel 7 Pro 128GB (Certified Pre-Owned)",
    "slug": "google-pixel-7-pro-preowned",
    "brand": "Google",
    "model": "Pixel 7 Pro (GP4BC)",
    "storage": "128GB",
    "ram": "12GB",
    "processor": "Google Tensor G2 with Titan M2 security",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "6.7\" QHD+ 120Hz LTPO display, 50MP triple camera with 5x optical telephoto, Google Tensor G2.",
    "description": "Certified pre-owned Google Pixel 7 Pro in Hazel finish. Features polished aluminum camera visor bar, 6.7-inch QHD+ 120Hz LTPO OLED display, Google Tensor G2 processor, 12GB RAM, 50MP main camera with 5x optical telephoto lens (up to 30x Super Res Zoom), Cinematic Blur, Macro Focus, and verified 93% battery health.",
    "price": 520000,
    "compare_at_price": null,
    "condition": "Certified Pre-Owned",
    "stock": 4,
    "sku": "PIX7P-128-HZL-CPO",
    "rating": 4.7,
    "review_count": 36,
    "sales_count": 90,
    "images": [
      "https://images.unsplash.com/photo-1583573636246-18cb2246697f?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "6 Months BuyAndSellOutlets Warranty & Diagnostic Card",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-18T10:00:00Z",
    "updated_at": "2026-06-18T10:00:00Z"
  },
  {
    "id": "prod-127",
    "name": "Xiaomi Redmi Note 13 128GB (Mint Green)",
    "slug": "xiaomi-redmi-note-13-128gb",
    "brand": "Redmi",
    "model": "Redmi Note 13 4G (23129RAA4G)",
    "storage": "128GB",
    "ram": "6GB",
    "processor": "Snapdragon 685 (6nm Octa-core)",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "108MP triple camera, 6.67\" 120Hz FHD+ AMOLED with ultra-slim bezels, 5000mAh battery with 33W fast charge.",
    "description": "Xiaomi Redmi Note 13 features an ultra-clear 108MP 3x lossless zoom main camera, 6.67-inch 120Hz FHD+ AMOLED display with 1800 nits peak brightness and in-display fingerprint sensor, Qualcomm Snapdragon 685 6nm processor, 6GB RAM, 128GB expandable storage, dual speakers with Dolby Atmos, and 5000mAh battery with 33W fast charging.",
    "price": 240000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 18,
    "sku": "REDMI-N13-128-GRN",
    "rating": 4.7,
    "review_count": 55,
    "sales_count": 160,
    "images": [
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Xiaomi Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-08T10:00:00Z",
    "updated_at": "2026-07-08T10:00:00Z"
  },
  {
    "id": "prod-128",
    "name": "Infinix Zero 30 4G 256GB (Sunset Gold)",
    "slug": "infinix-zero-30-4g-256gb",
    "brand": "Infinix",
    "model": "Zero 30 4G (X6731B)",
    "storage": "256GB",
    "ram": "8GB",
    "processor": "MediaTek Helio G99 6nm",
    "category_id": "cat-1",
    "category_slug": "phones",
    "subcategory": "Android Smartphones",
    "short_description": "50MP 2K front vlog camera, 108MP OIS triple rear camera, 6.78\" 120Hz 3D curved AMOLED display.",
    "description": "Infinix Zero 30 4G is designed for content creators and vloggers. Features a 50MP 2K front selfie camera with phase detection autofocus, 108MP OIS triple rear camera system, 6.78-inch 120Hz 3D-Curved AMOLED display with 950 nits peak brightness, MediaTek Helio G99 6nm processor, 8GB RAM + 8GB extended RAM, 256GB storage, and 5000mAh battery with 45W fast charge.",
    "price": 295000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 14,
    "sku": "INF-Z30-4G-GLD",
    "rating": 4.7,
    "review_count": 48,
    "sales_count": 125,
    "images": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Carlcare / Infinix Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-12T10:00:00Z",
    "updated_at": "2026-07-12T10:00:00Z"
  },
  {
    "id": "prod-5",
    "name": "MacBook Pro 14\" M4 Pro (24GB / 512GB)",
    "slug": "macbook-pro-14-m4-pro",
    "brand": "Apple",
    "model": "MacBook Pro 14\"",
    "storage": "512GB SSD",
    "ram": "24GB Unified Memory",
    "processor": "Apple M4 Pro (12-core CPU, 16-core GPU)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "MacBooks",
    "short_description": "Apple M4 Pro chip with 12-core CPU and 16-core GPU, 24GB Unified Memory, 14.2\" Liquid Retina XDR, Thunderbolt 5.",
    "description": "MacBook Pro 14-inch supercharged by Apple M4 Pro chip (12-core CPU, 16-core GPU, 16-core Neural Engine), 24GB high-speed unified memory with 273GB/s bandwidth, 512GB NVMe SSD, 14.2-inch Liquid Retina XDR display with up to 1600 nits HDR brightness, up to 22 hours battery life, 3x Thunderbolt 5 ports, MagSafe 3, HDMI 2.1, and SDXC slot in Space Black.",
    "price": 3250000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 6,
    "sku": "MBP14-M4P-24-512-SB",
    "rating": 4.9,
    "review_count": 87,
    "sales_count": 150,
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-12T10:00:00Z",
    "updated_at": "2026-07-12T10:00:00Z"
  },
  {
    "id": "prod-6",
    "name": "Dell XPS 15 9530 (Core i7 / RTX 4060 / 3.5K OLED)",
    "slug": "dell-xps-15",
    "brand": "Dell",
    "model": "XPS 15 9530",
    "storage": "512GB PCIe Gen4 SSD",
    "ram": "16GB DDR5 4800MHz",
    "processor": "Intel Core i7-13700H (14-Core, up to 5.0GHz)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Windows Ultrabooks",
    "short_description": "15.6\" 3.5K OLED InfinityEdge touch, 13th Gen Intel Core i7, NVIDIA GeForce RTX 4060 8GB, CNC Aluminum chassis.",
    "description": "Dell XPS 15 (9530) laptop featuring a 15.6-inch 3.5K (3456 x 2160) OLED touchscreen display with 100% DCI-P3 color gamut, 13th Gen Intel Core i7-13700H (14 cores / 20 threads), dedicated NVIDIA GeForce RTX 4060 8GB GDDR6 graphics, 16GB dual-channel DDR5 RAM, 512GB M.2 PCIe NVMe SSD, CNC-machined aluminum body with carbon fiber palm rest, quad-speaker sound, and Thunderbolt 4 connectivity.",
    "price": 2430000,
    "compare_at_price": 2700000,
    "condition": "Open Box",
    "stock": 4,
    "sku": "XPS15-9530-I7-4060",
    "rating": 4.7,
    "review_count": 65,
    "sales_count": 88,
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": true,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Dell Premier Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-28T10:00:00Z",
    "updated_at": "2026-06-28T10:00:00Z"
  },
  {
    "id": "prod-7",
    "name": "MacBook Air 13\" M3 (Certified Pre-Owned)",
    "slug": "macbook-air-m3-preowned",
    "brand": "Apple",
    "model": "MacBook Air 13\" (M3)",
    "storage": "256GB SSD",
    "ram": "8GB Unified Memory",
    "processor": "Apple M3 (8-core CPU, 8-core GPU)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "MacBooks",
    "short_description": "Certified pre-owned MacBook Air with M3 chip, 13.6\" Liquid Retina display, 97% battery health (38 cycles).",
    "description": "Professionally inspected Grade A+ MacBook Air 13-inch with Apple M3 chip. Features 13.6-inch Liquid Retina display with 500 nits brightness, 8GB Unified Memory, 256GB fast SSD, MagSafe 3 charging, dual Thunderbolt/USB 4 ports, 1080p FaceTime HD camera, and pristine keyboard and chassis with 97% verified battery capacity (only 38 cycles). Complete inspection certificate and original accessories included.",
    "price": 1150000,
    "compare_at_price": null,
    "condition": "Certified Pre-Owned",
    "stock": 3,
    "sku": "MBA13-M3-256-CPO",
    "rating": 4.8,
    "review_count": 42,
    "sales_count": 120,
    "images": [
      "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "6 Months BuyAndSellOutlets Warranty & Diagnostic Card",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-15T10:00:00Z",
    "updated_at": "2026-06-15T10:00:00Z"
  },
  {
    "id": "prod-27",
    "name": "HP Spectre x360 14\" 2-in-1 (Intel Core Ultra 7 / 1TB SSD / 2.8K OLED)",
    "slug": "hp-spectre-x360",
    "brand": "HP",
    "model": "Spectre x360 14-eu0000",
    "storage": "1TB PCIe Gen4 NVMe M.2 SSD",
    "ram": "16GB LPDDR5x 7467MHz",
    "processor": "Intel Core Ultra 7 155H (16 cores, Intel AI Boost NPU)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "2-in-1 Convertibles",
    "short_description": "14\" 2.8K 120Hz OLED touchscreen, Intel Core Ultra 7 with AI NPU, Intel Arc Graphics, 16GB RAM, 1TB SSD.",
    "description": "HP Spectre x360 14-inch 2-in-1 convertible laptop powered by the Intel Core Ultra 7 155H processor with integrated Intel AI Boost NPU and Intel Arc Graphics. Features a 14-inch 2.8K (2880 x 1800) OLED touchscreen with 120Hz variable refresh rate and 500 nits HDR, 16GB high-frequency LPDDR5x memory, 1TB PCIe Gen4 SSD, 9MP IR AI webcam with automatic framing, quad Poly Studio speakers, 360-degree gem-cut aluminum hinge, 2x Thunderbolt 4 ports, and long battery life in Nightfall Black.",
    "price": 2250000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 6,
    "sku": "HP-SPEC-X360-14-U7",
    "rating": 4.7,
    "review_count": 58,
    "sales_count": 72,
    "images": [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year HP Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-21T10:00:00Z",
    "updated_at": "2026-07-21T10:00:00Z"
  },
  {
    "id": "prod-53",
    "name": "MacBook Pro 16\" M3 Max (36GB / 1TB)",
    "slug": "macbook-pro-16-m3-max",
    "brand": "Apple",
    "model": "MacBook Pro 16\" (M3 Max)",
    "storage": "1TB SSD",
    "ram": "36GB Unified Memory",
    "processor": "Apple M3 Max (14-core CPU, 30-core GPU)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "MacBooks",
    "short_description": "Apple M3 Max chip with 30-core GPU, 36GB Unified Memory, 16.2\" Liquid Retina XDR, Space Black.",
    "description": "MacBook Pro 16-inch with Apple M3 Max chip (14-core CPU, 30-core GPU, 16-core Neural Engine), 36GB Unified Memory with 300GB/s bandwidth, 1TB high-speed NVMe SSD, 16.2-inch Liquid Retina XDR display (3456 x 2234, 120Hz ProMotion, 1600 nits peak), up to 22 hours battery life, 3x Thunderbolt 4 ports, HDMI 2.1, SDXC slot, and MagSafe 3.",
    "price": 4650000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 0,
    "sku": "MBP16-M3MAX-36-1TB",
    "rating": 5,
    "review_count": 22,
    "sales_count": 35,
    "images": [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-10T10:00:00Z",
    "updated_at": "2026-07-10T10:00:00Z"
  },
  {
    "id": "prod-54",
    "name": "MacBook Air 15\" M3 (16GB / 512GB)",
    "slug": "macbook-air-15-m3",
    "brand": "Apple",
    "model": "MacBook Air 15\" (M3)",
    "storage": "512GB SSD",
    "ram": "16GB Unified Memory",
    "processor": "Apple M3 (8-core CPU, 10-core GPU)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "MacBooks",
    "short_description": "15.3\" Liquid Retina display, Apple M3 chip, 16GB RAM, 512GB SSD, six-speaker sound, 18-hour battery.",
    "description": "MacBook Air 15-inch with Apple M3 chip delivers expansive screen real estate in an incredibly thin 11.5mm aluminum chassis. Features a 15.3-inch Liquid Retina display (500 nits), 16GB Unified Memory, 512GB SSD, immersive six-speaker sound system with Spatial Audio, 1080p FaceTime camera, MagSafe 3 charging, and dual Thunderbolt ports in Midnight finish.",
    "price": 2100000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 7,
    "sku": "MBA15-M3-16-512-MID",
    "rating": 4.9,
    "review_count": 36,
    "sales_count": 80,
    "images": [
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-18T10:00:00Z",
    "updated_at": "2026-07-18T10:00:00Z"
  },
  {
    "id": "prod-55",
    "name": "Dell Latitude 5440 (Core i5 / 16GB / 512GB)",
    "slug": "dell-latitude-5440",
    "brand": "Dell",
    "model": "Latitude 5440",
    "storage": "512GB PCIe NVMe SSD",
    "ram": "16GB DDR4 3200MHz",
    "processor": "Intel Core i5-1335U (10 Cores, up to 4.60 GHz)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Business Laptops",
    "short_description": "14\" FHD Anti-Glare display, 13th Gen Intel Core i5, 16GB RAM, Dell Optimizer AI, military-grade durability.",
    "description": "Dell Latitude 5440 is built for corporate productivity, reliability, and security. Features 14-inch Full HD (1920x1080) anti-glare display, 13th Gen Intel Core i5-1335U 10-core processor, 16GB RAM, 512GB PCIe NVMe SSD, backlit spill-resistant keyboard, FHD IR camera with privacy shutter, TPM 2.0 security, dual Thunderbolt 4 ports, RJ-45 Ethernet, and all-day 54Wh ExpressCharge battery.",
    "price": 980000,
    "compare_at_price": null,
    "condition": "Refurbished",
    "stock": 12,
    "sku": "DELL-LAT-5440-I5",
    "rating": 4.7,
    "review_count": 45,
    "sales_count": 130,
    "images": [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "3 Year Dell ProSupport Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-20T10:00:00Z",
    "updated_at": "2026-06-20T10:00:00Z"
  },
  {
    "id": "prod-56",
    "name": "HP OMEN 16 Gaming (Ryzen 7 / RTX 4070 / 16GB / 1TB)",
    "slug": "hp-omen-16-gaming",
    "brand": "HP",
    "model": "OMEN Gaming Laptop 16-xf0000",
    "storage": "1TB PCIe Gen4 NVMe SSD",
    "ram": "16GB DDR5 5600MHz",
    "processor": "AMD Ryzen 7 7840HS (8 cores / 16 threads, up to 5.1 GHz)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Gaming Laptops",
    "short_description": "16.1\" QHD 240Hz 3ms display, AMD Ryzen 7 7840HS, NVIDIA GeForce RTX 4070 8GB, OMEN Tempest Cooling.",
    "description": "HP OMEN 16 gaming laptop engineered for hardcore AAA gaming and content creation. Equipped with AMD Ryzen 7 7840HS processor with Ryzen AI, NVIDIA GeForce RTX 4070 8GB GDDR6 (140W TGP), 16GB DDR5 5600MHz RAM, 1TB Gen4 SSD, 16.1-inch QHD (2560 x 1440) 240Hz 3ms IPS display with 100% sRGB, OMEN Tempest Cooling with 3-sided venting, Bang & Olufsen sound, and RGB per-key lighting.",
    "price": 2350000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 5,
    "sku": "HP-OMEN16-R7-4070",
    "rating": 4.8,
    "review_count": 39,
    "sales_count": 65,
    "images": [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year HP Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-22T10:00:00Z",
    "updated_at": "2026-07-22T10:00:00Z"
  },
  {
    "id": "prod-57",
    "name": "Lenovo ThinkPad X1 Carbon Gen 11 (Core i7 / 16GB / 512GB)",
    "slug": "lenovo-thinkpad-x1-carbon-gen-11",
    "brand": "Lenovo",
    "model": "ThinkPad X1 Carbon Gen 11",
    "storage": "512GB PCIe Gen4 NVMe SSD",
    "ram": "16GB LPDDR5 6400MHz",
    "processor": "Intel Core i7-1365U vPro (10 cores, up to 5.20 GHz)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Business Ultrabooks",
    "short_description": "Carbon fiber chassis (1.12kg), 14\" 2.8K OLED display, 13th Gen Intel Core i7 vPro, iconic ThinkPad keyboard.",
    "description": "Lenovo ThinkPad X1 Carbon Gen 11 is the gold standard for enterprise executive laptops. Weighing just 1.12kg with a carbon fiber top cover and magnesium alloy chassis, it features a stunning 14-inch 2.8K (2880 x 1800) OLED display with DisplayHDR 500 True Black, Intel Core i7-1365U vPro, 16GB LPDDR5 RAM, 512GB PCIe Gen4 SSD, legendary spill-resistant ThinkPad keyboard with TrackPoint, quad microphones with 360-degree noise cancellation, and MIL-STD 810H durability.",
    "price": 2450000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 5,
    "sku": "LEN-X1C11-I7-OLED",
    "rating": 4.9,
    "review_count": 51,
    "sales_count": 85,
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "3 Year Lenovo Premier Support Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-08T10:00:00Z",
    "updated_at": "2026-07-08T10:00:00Z"
  },
  {
    "id": "prod-58",
    "name": "Lenovo Legion Pro 5 Gen 8 (Ryzen 7 / RTX 4070 / 16GB / 1TB)",
    "slug": "lenovo-legion-pro-5-gen-8",
    "brand": "Lenovo",
    "model": "Legion Pro 5 16ARX8",
    "storage": "1TB M.2 2280 PCIe 4.0 NVMe SSD",
    "ram": "16GB DDR5 5200MHz (2x 8GB)",
    "processor": "AMD Ryzen 7 7745HX (8 cores / 16 threads, up to 5.1 GHz)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Gaming Laptops",
    "short_description": "16\" WQXGA 240Hz 500 nits display, AMD Ryzen 7 7745HX, NVIDIA RTX 4070 8GB (140W), Legion Coldfront 5.0.",
    "description": "Lenovo Legion Pro 5 Gen 8 delivers desktop-grade computing power with an AI-tuned LA1 chip. Features a 16-inch WQXGA (2560 x 1600) 16:10 240Hz IPS display with 500 nits, DisplayHDR 400, AMD Ryzen 7 7745HX processor, NVIDIA GeForce RTX 4070 8GB GDDR6 (140W max TGP), 16GB DDR5 memory, 1TB Gen4 SSD, Legion TrueStrike 4-zone RGB keyboard, and Coldfront 5.0 vapor chamber thermal architecture.",
    "price": 2280000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 6,
    "sku": "LEN-LPRO5-R7-4070",
    "rating": 4.8,
    "review_count": 44,
    "sales_count": 70,
    "images": [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Lenovo Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-14T10:00:00Z",
    "updated_at": "2026-07-14T10:00:00Z"
  },
  {
    "id": "prod-59",
    "name": "ASUS ROG Zephyrus G14 (Ryzen 9 / RTX 4060 / 3K OLED)",
    "slug": "asus-rog-zephyrus-g14",
    "brand": "ASUS",
    "model": "ROG Zephyrus G14 (GA403UV)",
    "storage": "1TB PCIe 4.0 NVMe M.2 SSD",
    "ram": "16GB LPDDR5X 6400MHz",
    "processor": "AMD Ryzen 9 8945HS (8 Cores, Ryzen AI NPU up to 39 TOPS)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Gaming Ultrabooks",
    "short_description": "14\" 3K 120Hz ROG Nebula OLED, CNC Aluminum chassis (1.5kg), Ryzen 9 8945HS with AI, RTX 4060 8GB.",
    "description": "ASUS ROG Zephyrus G14 combines ultraportable luxury with high-end gaming capability. Featuring a precision CNC-machined aluminum body in Platinum White with Slash Lighting on the lid, 14-inch 3K (2880 x 1800) ROG Nebula OLED 120Hz 0.2ms display with G-SYNC, AMD Ryzen 9 8945HS processor with Ryzen AI, NVIDIA GeForce RTX 4060 8GB, 16GB high-speed memory, 1TB Gen4 SSD, quad speakers with dual force woofers, and 73Wh battery.",
    "price": 2650000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 4,
    "sku": "ASUS-G14-R9-4060-WHT",
    "rating": 4.9,
    "review_count": 32,
    "sales_count": 50,
    "images": [
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "2 Year ASUS Global Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-25T10:00:00Z",
    "updated_at": "2026-07-25T10:00:00Z"
  },
  {
    "id": "prod-60",
    "name": "ASUS ZenBook 14 OLED (Core Ultra 7 / 16GB / 1TB)",
    "slug": "asus-zenbook-14-oled",
    "brand": "ASUS",
    "model": "ZenBook 14 OLED (UX3405MA)",
    "storage": "1TB PCIe 4.0 NVMe M.2 SSD",
    "ram": "16GB LPDDR5X 7467MHz",
    "processor": "Intel Core Ultra 7 155H (16 Cores, Intel AI Boost NPU)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Windows Ultrabooks",
    "short_description": "14\" 3K 120Hz ASUS Lumina OLED display, Intel Core Ultra 7 with Intel Arc Graphics, 1.2kg lightweight design.",
    "description": "ASUS ZenBook 14 OLED is an Intel Evo certified ultraportable featuring a 14-inch 3K (2880 x 1800) 120Hz ASUS Lumina OLED display (600 nits HDR), Intel Core Ultra 7 155H processor with AI Boost NPU and Intel Arc Graphics, 16GB high-frequency RAM, 1TB NVMe SSD, 75Wh battery with up to 15 hours life, Harman Kardon super-linear speakers, FHD IR camera with physical shutter, and full I/O including dual Thunderbolt 4 and HDMI 2.1.",
    "price": 1750000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 8,
    "sku": "ASUS-ZEN14-U7-1TB",
    "rating": 4.8,
    "review_count": 37,
    "sales_count": 75,
    "images": [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "2 Year ASUS Global Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-19T10:00:00Z",
    "updated_at": "2026-07-19T10:00:00Z"
  },
  {
    "id": "prod-61",
    "name": "Acer Predator Helios 16 (Core i7 / RTX 4060 / 16GB / 1TB)",
    "slug": "acer-predator-helios-16",
    "brand": "Acer",
    "model": "Predator Helios 16 (PH16-71)",
    "storage": "1TB PCIe Gen4 NVMe SSD",
    "ram": "16GB DDR5 4800MHz",
    "processor": "13th Gen Intel Core i7-13700HX (16 Cores / 24 Threads, up to 5.0 GHz)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Gaming Laptops",
    "short_description": "16\" WQXGA 165Hz 3ms G-SYNC display, Intel Core i7-13700HX, NVIDIA RTX 4060 8GB (140W), Liquid Metal cooling.",
    "description": "Acer Predator Helios 16 is a full-throttle gaming laptop equipped with the 16-core Intel Core i7-13700HX processor, NVIDIA GeForce RTX 4060 8GB GDDR6 (140W MGP with MUX switch & Advanced Optimus), 16GB DDR5 RAM, 1TB NVMe SSD, 16-inch WQXGA (2560 x 1600) 165Hz IPS display with 500 nits, custom 5th Gen AeroBlade 3D fan technology with liquid metal thermal grease, and per-key RGB backlit keyboard.",
    "price": 1890000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 5,
    "sku": "ACER-PH16-I7-4060",
    "rating": 4.7,
    "review_count": 48,
    "sales_count": 82,
    "images": [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Acer Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-02T10:00:00Z",
    "updated_at": "2026-07-02T10:00:00Z"
  },
  {
    "id": "prod-62",
    "name": "Microsoft Surface Laptop 7 Copilot+ PC (Snapdragon X Elite / 16GB / 512GB)",
    "slug": "microsoft-surface-laptop-7",
    "brand": "Microsoft",
    "model": "Surface Laptop 7th Edition",
    "storage": "512GB Gen 4 SSD (Removable)",
    "ram": "16GB LPDDR5x RAM",
    "processor": "Snapdragon X Elite (12 Cores, Qualcomm Oryon CPU, 45 TOPS NPU)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Copilot+ AI Laptops",
    "short_description": "13.8\" PixelSense Flow 120Hz Touchscreen, Snapdragon X Elite 45 TOPS NPU, 20-hour battery life, Copilot+ PC.",
    "description": "Microsoft Surface Laptop 7 is a Copilot+ AI PC powered by the Snapdragon X Elite 12-core processor with a 45 TOPS NPU for Windows AI tools. Features a 13.8-inch PixelSense Flow 120Hz touchscreen (2304 x 1536), 16GB LPDDR5x RAM, 512GB SSD, up to 20 hours of battery life, dual USB-C Thunderbolt 4 ports, Surface Connect, and haptic touchpad in Platinum.",
    "price": 2350000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 5,
    "sku": "MS-SL7-ELITE-16-512",
    "rating": 4.8,
    "review_count": 26,
    "sales_count": 45,
    "images": [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Microsoft Hardware Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-28T10:00:00Z",
    "updated_at": "2026-07-28T10:00:00Z"
  },
  {
    "id": "prod-8",
    "name": "iPad Pro 12.9\" M2 128GB Wi-Fi",
    "slug": "ipad-pro-12-9-m2",
    "brand": "Apple",
    "model": "iPad Pro 12.9\" (6th Gen)",
    "storage": "128GB",
    "ram": "8GB",
    "processor": "Apple M2 (8-core CPU, 10-core GPU)",
    "category_id": "cat-3",
    "category_slug": "tablets",
    "subcategory": "iPadOS Tablets",
    "short_description": "Liquid Retina XDR mini-LED display with ProMotion 120Hz, Apple M2 chip, Apple Pencil hover, Thunderbolt.",
    "description": "Apple iPad Pro 12.9-inch (6th Generation) with Apple M2 chip, Liquid Retina XDR mini-LED display with 1600 nits peak brightness and 1,000,000:1 contrast ratio, 12MP Wide + 10MP Ultra-Wide rear cameras with LiDAR Scanner, 12MP TrueDepth front camera with Center Stage, Apple Pencil 2nd gen hover detection, and high-speed Thunderbolt / USB 4 port.",
    "price": 1350000,
    "compare_at_price": null,
    "condition": "Refurbished",
    "stock": 7,
    "sku": "IPP129-M2-128-SG",
    "rating": 4.8,
    "review_count": 76,
    "sales_count": 140,
    "images": [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-01T10:00:00Z",
    "updated_at": "2026-07-01T10:00:00Z"
  },
  {
    "id": "prod-18",
    "name": "Apple iPad Air 11\" M2 128GB Wi-Fi",
    "slug": "apple-ipad-air-11-m2",
    "brand": "Apple",
    "model": "iPad Air 11\" (M2, 2024)",
    "storage": "128GB",
    "ram": "8GB",
    "processor": "Apple M2 (8-core CPU, 9-core GPU)",
    "category_id": "cat-3",
    "category_slug": "tablets",
    "subcategory": "iPadOS Tablets",
    "short_description": "Apple M2 chip, 11\" Liquid Retina display, landscape 12MP front camera with Center Stage, Apple Pencil Pro support.",
    "description": "Apple iPad Air 11-inch (2024) powered by the Apple M2 chip with 8-core CPU and 9-core GPU. Features an 11-inch Liquid Retina display with P3 wide color and True Tone, landscape 12MP Ultra Wide front camera with Center Stage, 12MP rear wide camera with 4K video, Touch ID in top button, Wi-Fi 6E, USB-C with 6K display output, and support for Apple Pencil Pro and Magic Keyboard.",
    "price": 980000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 8,
    "sku": "IPAIR11-M2-128-BLU",
    "rating": 4.8,
    "review_count": 52,
    "sales_count": 98,
    "images": [
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-02T10:00:00Z",
    "updated_at": "2026-07-02T10:00:00Z"
  },
  {
    "id": "prod-24",
    "name": "Samsung Galaxy Tab S9 Ultra 256GB Wi-Fi",
    "slug": "samsung-galaxy-tab-s9-ultra",
    "brand": "Samsung",
    "model": "Galaxy Tab S9 Ultra (SM-X910)",
    "storage": "256GB",
    "ram": "12GB",
    "processor": "Snapdragon 8 Gen 2 for Galaxy",
    "category_id": "cat-3",
    "category_slug": "tablets",
    "subcategory": "Android Tablets",
    "short_description": "14.6\" Dynamic AMOLED 2X 120Hz display, Snapdragon 8 Gen 2, IP68 water resistance, S Pen included.",
    "description": "Samsung Galaxy Tab S9 Ultra featuring an expansive 14.6-inch Dynamic AMOLED 2X display with 120Hz refresh rate and HDR10+, Qualcomm Snapdragon 8 Gen 2 for Galaxy processor, 12GB RAM, 256GB storage (expandable up to 1TB via MicroSD), IP68 water and dust resistance for both tablet and included bidirectional-charging S Pen, quad AKG stereo speakers with Dolby Atmos, dual 12MP front cameras with ultra-wide angle, and massive 11,200mAh battery with 45W fast charging.",
    "price": 1650000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 0,
    "sku": "SAM-TABS9U-256-GRY",
    "rating": 4.8,
    "review_count": 36,
    "sales_count": 64,
    "images": [
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-07T10:00:00Z",
    "updated_at": "2026-07-07T10:00:00Z"
  },
  {
    "id": "prod-63",
    "name": "Apple iPad 10th Gen 10.9\" 64GB Wi-Fi",
    "slug": "apple-ipad-10th-gen",
    "brand": "Apple",
    "model": "iPad (10th Generation)",
    "storage": "64GB",
    "ram": "4GB",
    "processor": "Apple A14 Bionic",
    "category_id": "cat-3",
    "category_slug": "tablets",
    "subcategory": "iPadOS Tablets",
    "short_description": "10.9\" Liquid Retina all-screen design, A14 Bionic chip, landscape 12MP Ultra Wide camera, USB-C.",
    "description": "Apple iPad 10th Generation features an all-screen 10.9-inch Liquid Retina display, fast A14 Bionic chip, landscape 12MP Ultra Wide front camera with Center Stage for crystal-clear video calls, 12MP rear camera, USB-C connectivity, Touch ID in the top button, and support for Apple Pencil and Magic Keyboard Folio.",
    "price": 520000,
    "compare_at_price": null,
    "condition": "Open Box",
    "stock": 16,
    "sku": "IPAD10-64-BLU",
    "rating": 4.7,
    "review_count": 82,
    "sales_count": 210,
    "images": [
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-15T10:00:00Z",
    "updated_at": "2026-06-15T10:00:00Z"
  },
  {
    "id": "prod-64",
    "name": "Samsung Galaxy Tab S9 FE 128GB Wi-Fi",
    "slug": "samsung-galaxy-tab-s9-fe",
    "brand": "Samsung",
    "model": "Galaxy Tab S9 FE (SM-X510)",
    "storage": "128GB",
    "ram": "6GB",
    "processor": "Samsung Exynos 1380 (5nm)",
    "category_id": "cat-3",
    "category_slug": "tablets",
    "subcategory": "Android Tablets",
    "short_description": "10.9\" 90Hz display with Vision Booster, IP68 water resistance, S Pen included in box, 8000mAh battery.",
    "description": "Samsung Galaxy Tab S9 FE brings high-end creative productivity to a versatile package. Includes an IP68 water and dust resistant S Pen stylus in the box, a bright 10.9-inch 90Hz display with Vision Booster outdoor visibility, Exynos 1380 5nm octa-core processor, 6GB RAM, 128GB expandable storage (up to 1TB MicroSD), dual AKG speakers with Dolby Atmos, and an 8000mAh battery with 45W fast charging.",
    "price": 620000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 10,
    "sku": "SAM-TABS9FE-128-GRY",
    "rating": 4.7,
    "review_count": 49,
    "sales_count": 110,
    "images": [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-11T10:00:00Z",
    "updated_at": "2026-07-11T10:00:00Z"
  },
  {
    "id": "prod-65",
    "name": "Xiaomi Pad 6 128GB",
    "slug": "xiaomi-pad-6-128gb",
    "brand": "Xiaomi",
    "model": "Xiaomi Pad 6",
    "storage": "128GB",
    "ram": "8GB",
    "processor": "Qualcomm Snapdragon 870 (7nm)",
    "category_id": "cat-3",
    "category_slug": "tablets",
    "subcategory": "Android Tablets",
    "short_description": "11\" 2.8K 144Hz 7-speed variable display, Snapdragon 870, quad stereo speakers with Dolby Atmos, 8840mAh.",
    "description": "Xiaomi Pad 6 is designed for smooth multitasking, entertainment, and work. Features an 11-inch 2.8K (2880 x 1800) 144Hz 7-speed variable refresh display with Dolby Vision and HDR10, Qualcomm Snapdragon 870 flagship processor, 8GB RAM, 128GB UFS 3.1 storage, unibody aluminum design (6.51mm thin, 490g), quad speakers with Dolby Atmos, and 8840mAh battery with 33W fast charge.",
    "price": 420000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 12,
    "sku": "MI-PAD6-128-GRY",
    "rating": 4.8,
    "review_count": 57,
    "sales_count": 135,
    "images": [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Xiaomi Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-09T10:00:00Z",
    "updated_at": "2026-07-09T10:00:00Z"
  },
  {
    "id": "prod-66",
    "name": "Lenovo Tab M11 64GB with Folio Case & Pen",
    "slug": "lenovo-tab-m11-64gb",
    "brand": "Lenovo",
    "model": "Lenovo Tab M11 (TB330FU)",
    "storage": "64GB",
    "ram": "4GB",
    "processor": "MediaTek Helio G88",
    "category_id": "cat-3",
    "category_slug": "tablets",
    "subcategory": "Android Tablets",
    "short_description": "11\" 90Hz WUXGA display, quad Dolby Atmos speakers, Lenovo Tab Pen and protective folio case included.",
    "description": "Lenovo Tab M11 features an 11-inch 90Hz WUXGA (1920 x 1200) IPS display with TÜV Rheinland low blue light certification, quad stereo speakers with Dolby Atmos, MediaTek Helio G88 processor, 4GB RAM, 64GB expandable storage, 7040mAh battery, and includes both the Lenovo Tab Pen and protective folding case in the box.",
    "price": 220000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 20,
    "sku": "LEN-TABM11-64-PEN",
    "rating": 4.6,
    "review_count": 42,
    "sales_count": 160,
    "images": [
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Lenovo Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-25T10:00:00Z",
    "updated_at": "2026-06-25T10:00:00Z"
  },
  {
    "id": "prod-129",
    "name": "MacBook Pro 14\" M3 (8GB / 512GB)",
    "slug": "macbook-pro-14-m3",
    "brand": "Apple",
    "model": "MacBook Pro 14\" (M3, 2023)",
    "storage": "512GB SSD",
    "ram": "8GB Unified Memory",
    "processor": "Apple M3 (8-core CPU, 10-core GPU)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "MacBooks",
    "short_description": "14.2\" Liquid Retina XDR with 120Hz ProMotion, Apple M3 chip, HDMI, SDXC slot, MagSafe 3, Space Gray.",
    "description": "MacBook Pro 14-inch powered by the Apple M3 chip (8-core CPU, 10-core GPU, 16-core Neural Engine with Hardware Ray Tracing). Features a 14.2-inch Liquid Retina XDR display with up to 1600 nits peak HDR brightness, 512GB high-speed SSD, 8GB Unified Memory, 2x Thunderbolt / USB 4 ports, HDMI port, SDXC card slot, MagSafe 3, and up to 22 hours battery life in Space Gray.",
    "price": 2250000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 5,
    "sku": "MBP14-M3-8-512-SG",
    "rating": 4.8,
    "review_count": 34,
    "sales_count": 62,
    "images": [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-10T10:00:00Z",
    "updated_at": "2026-07-10T10:00:00Z"
  },
  {
    "id": "prod-130",
    "name": "Dell Inspiron 15 3520 (Core i5 / 8GB / 512GB SSD)",
    "slug": "dell-inspiron-15-3520",
    "brand": "Dell",
    "model": "Inspiron 15 3520",
    "storage": "512GB M.2 PCIe NVMe SSD",
    "ram": "8GB DDR4 2666MHz",
    "processor": "12th Gen Intel Core i5-1235U (10 Cores, up to 4.40 GHz)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Windows Laptops",
    "short_description": "15.6\" FHD 120Hz anti-glare display, 12th Gen Intel Core i5, lift-hinge ergonomic design, ExpressCharge.",
    "description": "Dell Inspiron 15 3520 laptop delivers dependable everyday computing for work, school, and home office. Features a 15.6-inch Full HD (1920 x 1080) 120Hz anti-glare display with narrow 3-sided bezels, 12th Gen Intel Core i5-1235U 10-core processor, 8GB DDR4 RAM, 512GB M.2 NVMe SSD, ergonomic lift-hinge for comfortable typing, ExpressCharge battery (charges up to 80% in 60 minutes), and Platinum Silver finish.",
    "price": 680000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 14,
    "sku": "DELL-INSP-3520-I5",
    "rating": 4.6,
    "review_count": 52,
    "sales_count": 140,
    "images": [
      "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Dell Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-25T10:00:00Z",
    "updated_at": "2026-06-25T10:00:00Z"
  },
  {
    "id": "prod-131",
    "name": "HP Pavilion 15 (AMD Ryzen 7 / 16GB / 512GB SSD)",
    "slug": "hp-pavilion-15-ryzen-7",
    "brand": "HP",
    "model": "Pavilion 15-eh3000",
    "storage": "512GB PCIe NVMe M.2 SSD",
    "ram": "16GB DDR4 3200MHz (2x 8GB)",
    "processor": "AMD Ryzen 7 7730U (8 cores / 16 threads, up to 4.5 GHz)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Windows Laptops",
    "short_description": "15.6\" FHD IPS micro-edge display, AMD Ryzen 7 7730U 8-core, 16GB RAM, B&O Audio, backlit keyboard.",
    "description": "HP Pavilion 15 combines performance and portability in an all-metal keyboard deck design. Powered by the AMD Ryzen 7 7730U 8-core processor with AMD Radeon Graphics, 16GB dual-channel DDR4 memory, 512GB PCIe NVMe SSD, 15.6-inch Full HD (1920 x 1080) IPS micro-edge display, Audio by Bang & Olufsen with dual speakers, HP Fast Charge, full-size backlit keyboard with numeric keypad, and USB-C port in Natural Silver.",
    "price": 890000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 9,
    "sku": "HP-PAV15-R7-16-512",
    "rating": 4.7,
    "review_count": 41,
    "sales_count": 95,
    "images": [
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year HP Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-04T10:00:00Z",
    "updated_at": "2026-07-04T10:00:00Z"
  },
  {
    "id": "prod-132",
    "name": "Lenovo IdeaPad Slim 3 15\" (Core i5 / 8GB / 512GB)",
    "slug": "lenovo-ideapad-slim-3-15",
    "brand": "Lenovo",
    "model": "IdeaPad Slim 3 15IRH8",
    "storage": "512GB M.2 2242 PCIe 4.0 NVMe SSD",
    "ram": "8GB LPDDR5 4800MHz",
    "processor": "13th Gen Intel Core i5-1335U (10 Cores, up to 4.60 GHz)",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Windows Laptops",
    "short_description": "15.6\" FHD IPS display, military-grade MIL-STD-810H durability, 13th Gen Intel Core i5, Rapid Charge Boost.",
    "description": "Lenovo IdeaPad Slim 3 is a military-grade durable laptop built to handle everyday work and travel. Featuring a 15.6-inch Full HD (1920 x 1080) IPS anti-glare display with TÜV Low Blue Light certification, 13th Gen Intel Core i5-1335U 10-core processor, 8GB LPDDR5 RAM, 512GB PCIe 4.0 SSD, Dolby Audio stereo speakers, HD webcam with physical privacy shutter, and Rapid Charge Boost (2 hours use from a 15-minute charge).",
    "price": 650000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 12,
    "sku": "LEN-IP3-I5-512-GRY",
    "rating": 4.6,
    "review_count": 45,
    "sales_count": 110,
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Lenovo Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-06T10:00:00Z",
    "updated_at": "2026-07-06T10:00:00Z"
  },
  {
    "id": "prod-133",
    "name": "Apple iPad Mini 6 64GB Wi-Fi (Space Gray)",
    "slug": "apple-ipad-mini-6-64gb",
    "brand": "Apple",
    "model": "iPad mini (6th Generation)",
    "storage": "64GB",
    "ram": "4GB",
    "processor": "Apple A15 Bionic (6-core CPU, 5-core GPU)",
    "category_id": "cat-3",
    "category_slug": "tablets",
    "subcategory": "iPadOS Tablets",
    "short_description": "8.3\" Liquid Retina all-screen design, A15 Bionic chip, 12MP Ultra Wide front camera with Center Stage, USB-C.",
    "description": "Apple iPad mini (6th Generation) packs full iPadOS capability into an ultraportable 8.3-inch Liquid Retina display with True Tone, P3 wide color, and 500 nits brightness. Powered by the A15 Bionic chip with 16-core Neural Engine, 12MP Ultra Wide front camera with Center Stage, 12MP Wide back camera with True Tone flash, USB-C connectivity, Touch ID in top button, and support for Apple Pencil (2nd generation).",
    "price": 680000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 8,
    "sku": "IPADM6-64-SG",
    "rating": 4.8,
    "review_count": 50,
    "sales_count": 115,
    "images": [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-14T10:00:00Z",
    "updated_at": "2026-07-14T10:00:00Z"
  },
  {
    "id": "prod-134",
    "name": "Samsung Galaxy Tab A9+ 11\" 64GB Wi-Fi (Graphite)",
    "slug": "samsung-galaxy-tab-a9-plus",
    "brand": "Samsung",
    "model": "Galaxy Tab A9+ (SM-X210)",
    "storage": "64GB",
    "ram": "4GB",
    "processor": "Qualcomm Snapdragon 695 5G",
    "category_id": "cat-3",
    "category_slug": "tablets",
    "subcategory": "Android Tablets",
    "short_description": "11.0\" 90Hz display, Quad stereo speakers with Dolby Atmos, Samsung DeX multitasking support.",
    "description": "Samsung Galaxy Tab A9+ brings big-screen entertainment and productivity to a slim metal body. Features an 11.0-inch 90Hz WUXGA (1920 x 1200) display, quad stereo speakers with Dolby Atmos for surround sound, Qualcomm Snapdragon 695 octa-core processor, 4GB RAM, 64GB storage (expandable up to 1TB via MicroSD), Samsung DeX for PC-like desktop multitasking, and a 7040mAh battery with 15W fast charge.",
    "price": 280000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 22,
    "sku": "SAM-TABA9P-64-GRA",
    "rating": 4.6,
    "review_count": 62,
    "sales_count": 170,
    "images": [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-02T10:00:00Z",
    "updated_at": "2026-07-02T10:00:00Z"
  },
  {
    "id": "prod-11",
    "name": "PlayStation 5 Slim 1TB Disc Edition",
    "slug": "playstation-5-slim",
    "brand": "Sony",
    "model": "CFI-2000 PS5 Slim Disc",
    "storage": "1TB Custom NVMe SSD",
    "ram": "16GB GDDR6",
    "processor": "Custom 8-core AMD Zen 2 CPU / RDNA 2 GPU (10.28 TFLOPs)",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "PlayStation Consoles",
    "short_description": "Next-gen console with 1TB high-speed SSD, Ultra HD Blu-ray disc drive, 4K 120Hz gaming, and DualSense controller.",
    "description": "PlayStation 5 Slim Disc Edition console featuring a 30% reduced footprint, 1TB of ultra-fast internal PCIe Gen 4 SSD storage, Ultra HD Blu-ray disc drive, hardware-accelerated Ray Tracing, 4K gaming up to 120fps with VRR support, Tempest 3D AudioTech, and includes the revolutionary DualSense wireless controller with adaptive triggers and haptic feedback.",
    "price": 1035000,
    "compare_at_price": 1150000,
    "condition": "Brand New",
    "stock": 15,
    "sku": "PS5-SLIM-DISC-1TB",
    "rating": 4.9,
    "review_count": 156,
    "sales_count": 320,
    "images": [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Sony Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-14T10:00:00Z",
    "updated_at": "2026-07-14T10:00:00Z"
  },
  {
    "id": "prod-12",
    "name": "Xbox Series X 1TB",
    "slug": "xbox-series-x",
    "brand": "Microsoft",
    "model": "Xbox Series X",
    "storage": "1TB Custom NVMe SSD",
    "ram": "16GB GDDR6",
    "processor": "Custom 8-core AMD Zen 2 CPU (3.8 GHz) / RDNA 2 GPU (12 TFLOPs)",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "Xbox Consoles",
    "short_description": "12 Teraflops GPU processing power, 1TB NVMe SSD, Quick Resume, true 4K gaming up to 120 FPS, 4K Blu-ray drive.",
    "description": "Xbox Series X is Microsoft’s premier gaming console, delivering 12 teraflops of raw graphical power, DirectX Hardware Raytracing, custom 1TB SSD with Xbox Velocity Architecture, seamless Quick Resume switching between games, true 4K gaming up to 120 FPS, 4K UHD Blu-ray optical drive, and complete backwards compatibility across four generations of Xbox games.",
    "price": 980000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 8,
    "sku": "XBX-1TB-BLK",
    "rating": 4.8,
    "review_count": 112,
    "sales_count": 260,
    "images": [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Microsoft Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-03T10:00:00Z",
    "updated_at": "2026-07-03T10:00:00Z"
  },
  {
    "id": "prod-21",
    "name": "PlayStation 5 Disc Edition 825GB (Certified Pre-Owned)",
    "slug": "playstation-5-preowned",
    "brand": "Sony",
    "model": "CFI-1000/1100 Standard Disc",
    "storage": "825GB Custom NVMe SSD",
    "ram": "16GB GDDR6",
    "processor": "AMD Zen 2 8-core CPU / AMD RDNA 2 GPU (10.28 TFLOPs)",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "PlayStation Consoles",
    "short_description": "Certified pre-owned PS5 disc console, bench-tested Ultra HD Blu-ray drive, SSD 100% health with DualSense.",
    "description": "Professionally tested and certified pre-owned PlayStation 5 Standard Disc Edition. Complete hardware diagnostic passed: 825GB internal SSD verified at 100% health, optical disc drive fully tested and calibrated, cooling fan cleaned, thermal performance benchmarked, HDMI 2.1 4K 120Hz output verified, and original Sony DualSense wireless controller tested with full haptic feedback.",
    "price": 680000,
    "compare_at_price": null,
    "condition": "Certified Pre-Owned",
    "stock": 4,
    "sku": "PS5-DISC-825-CPO",
    "rating": 4.7,
    "review_count": 68,
    "sales_count": 140,
    "images": [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "6 Months BuyAndSellOutlets Warranty & Diagnostic Certificate",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-22T10:00:00Z",
    "updated_at": "2026-06-22T10:00:00Z"
  },
  {
    "id": "prod-67",
    "name": "PlayStation 5 Slim 1TB Digital Edition",
    "slug": "playstation-5-slim-digital",
    "brand": "Sony",
    "model": "CFI-2000 PS5 Slim Digital",
    "storage": "1TB Custom NVMe SSD",
    "ram": "16GB GDDR6",
    "processor": "AMD Zen 2 8-core CPU / AMD RDNA 2 GPU (10.28 TFLOPs)",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "PlayStation Consoles",
    "short_description": "All-digital PS5 Slim console with 1TB SSD, Ray Tracing, 4K 120Hz gaming, and DualSense controller.",
    "description": "PlayStation 5 Slim Digital Edition offers all the next-gen gaming power of the PS5 in an all-digital, disc-free design. Features 1TB ultra-fast internal PCIe Gen 4 SSD, Ray Tracing, Tempest 3D AudioTech, 4K 120Hz gaming output, DualSense wireless controller with adaptive triggers, and compatibility with the add-on PS5 Disc Drive (sold separately).",
    "price": 920000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 12,
    "sku": "PS5-SLIM-DIG-1TB",
    "rating": 4.8,
    "review_count": 95,
    "sales_count": 210,
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Sony Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-16T10:00:00Z",
    "updated_at": "2026-07-16T10:00:00Z"
  },
  {
    "id": "prod-68",
    "name": "Xbox Series S 512GB All-Digital Console",
    "slug": "xbox-series-s-512gb",
    "brand": "Microsoft",
    "model": "Xbox Series S",
    "storage": "512GB Custom NVMe SSD",
    "ram": "10GB GDDR6",
    "processor": "Custom 8-core AMD Zen 2 CPU @ 3.6 GHz / RDNA 2 GPU (4 TFLOPs)",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "Xbox Consoles",
    "short_description": "Next-gen all-digital console, 1440p gaming up to 120 FPS, Quick Resume, 512GB NVMe SSD, Xbox Game Pass ready.",
    "description": "Xbox Series S is an all-digital gaming console delivering speed and performance with a custom 512GB NVMe SSD, Quick Resume, gameplay up to 120 FPS at 1440p resolution, DirectX Raytracing, and compatibility with Xbox Game Pass and digital backwards-compatible titles.",
    "price": 420000,
    "compare_at_price": null,
    "condition": "Refurbished",
    "stock": 14,
    "sku": "XBSS-512-WHT",
    "rating": 4.7,
    "review_count": 88,
    "sales_count": 190,
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Microsoft Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-28T10:00:00Z",
    "updated_at": "2026-06-28T10:00:00Z"
  },
  {
    "id": "prod-69",
    "name": "Nintendo Switch OLED Model (White Joy-Con)",
    "slug": "nintendo-switch-oled-white",
    "brand": "Nintendo",
    "model": "Nintendo Switch (OLED Model)",
    "storage": "64GB Internal Storage",
    "processor": "NVIDIA Custom Tegra Processor",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "Nintendo Consoles",
    "short_description": "7-inch vibrant OLED screen, wide adjustable stand, enhanced audio, wired LAN dock, 64GB storage.",
    "description": "Nintendo Switch OLED Model features a 7-inch OLED screen with deep blacks and rich colors, wide adjustable multi-angle stand for tabletop mode, dock with built-in wired LAN port, 64GB internal storage (expandable via MicroSD), enhanced onboard speakers, and detachable White Joy-Con controllers.",
    "price": 440000,
    "compare_at_price": null,
    "condition": "Open Box",
    "stock": 10,
    "sku": "NIN-SW-OLED-WHT",
    "rating": 4.9,
    "review_count": 76,
    "sales_count": 175,
    "images": [
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-04T10:00:00Z",
    "updated_at": "2026-07-04T10:00:00Z"
  },
  {
    "id": "prod-70",
    "name": "Sony DualSense Wireless Controller (Midnight Black)",
    "slug": "sony-dualsense-controller-black",
    "brand": "Sony",
    "model": "CFI-ZCT1W DualSense",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "Gaming Controllers",
    "short_description": "Haptic feedback, dynamic adaptive triggers, built-in microphone and 3.5mm jack for PS5 & PC.",
    "description": "Sony DualSense wireless controller features immersive haptic feedback, dynamic adaptive triggers with variable tension resistance, built-in microphone and 3.5mm headset jack, create button for capturing gameplay, and motion sensors compatible with PS5, PC, Mac, Android, and iOS.",
    "price": 95000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 25,
    "sku": "SONY-DS-BLK",
    "rating": 4.8,
    "review_count": 120,
    "sales_count": 310,
    "images": [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Sony Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-12T10:00:00Z",
    "updated_at": "2026-07-12T10:00:00Z"
  },
  {
    "id": "prod-71",
    "name": "PlayStation Portal Remote Player for PS5 Console",
    "slug": "playstation-portal-remote-player",
    "brand": "Sony",
    "model": "CFI-Y1001 PS Portal",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "Gaming Accessories",
    "short_description": "8\" 1080p 60fps LCD screen with DualSense controller features for streaming your PS5 over Wi-Fi.",
    "description": "Play your PS5 console games over your home Wi-Fi with console-quality controls using PlayStation Portal Remote Player. Features an 8-inch Full HD (1080p) LCD screen capable of smooth 60fps gameplay, integrated DualSense wireless controller haptic feedback and adaptive triggers, 3.5mm audio jack, and PlayStation Link wireless audio.",
    "price": 350000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 8,
    "sku": "SONY-PS-PORTAL",
    "rating": 4.7,
    "review_count": 42,
    "sales_count": 85,
    "images": [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Sony Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-22T10:00:00Z",
    "updated_at": "2026-07-22T10:00:00Z"
  },
  {
    "id": "prod-72",
    "name": "Razer BlackShark V2 Pro Wireless Gaming Headset",
    "slug": "razer-blackshark-v2-pro-wireless",
    "brand": "Razer",
    "model": "BlackShark V2 Pro (2023 Edition)",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "Gaming Headsets",
    "short_description": "HyperClear Super Wideband Mic, TriForce Titanium 50mm drivers, 70-hour battery life, 2.4GHz & Bluetooth.",
    "description": "Razer BlackShark V2 Pro (2023) is the premier esports wireless headset. Features Razer HyperClear Super Wideband Mic for studio-broadcast voice clarity, patented TriForce Titanium 50mm drivers with on-headset FPS tuning profiles, ultra-soft breathable memory foam ear cushions with passive noise isolation, ultra-fast 2.4GHz wireless plus Bluetooth 5.2, and up to 70 hours of battery life.",
    "price": 240000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 14,
    "sku": "RZR-BSV2P-BLK",
    "rating": 4.8,
    "review_count": 55,
    "sales_count": 110,
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Razer Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-08T10:00:00Z",
    "updated_at": "2026-07-08T10:00:00Z"
  },
  {
    "id": "prod-10",
    "name": "Samsung 55\" QLED 4K Smart TV (Q80C)",
    "slug": "samsung-55-qled-4k-tv",
    "brand": "Samsung",
    "model": "QA55Q80C",
    "processor": "Quantum Processor 4K",
    "category_id": "cat-5",
    "category_slug": "tvs",
    "subcategory": "4K QLED TVs",
    "short_description": "Direct Full Array 4K QLED, Quantum HDR+, 120Hz native refresh rate with Motion Xcelerator Turbo+, Tizen OS.",
    "description": "Samsung 55-inch Q80C QLED 4K Smart TV with Direct Full Array backlighting, 100% Color Volume with Quantum Dot technology, Quantum Processor 4K with AI 4K Upscaling, native 120Hz refresh rate with Motion Xcelerator Turbo+ for responsive console gaming, 4x HDMI 2.1 ports with FreeSync Premium Pro, Object Tracking Sound Lite (OTS Lite), and Tizen Smart Hub.",
    "price": 1215000,
    "compare_at_price": 1350000,
    "condition": "Brand New",
    "stock": 5,
    "sku": "SAM-55Q80C-4K",
    "rating": 4.7,
    "review_count": 63,
    "sales_count": 120,
    "images": [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": true,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery & wall mount installation in Lagos",
    "created_at": "2026-07-08T10:00:00Z",
    "updated_at": "2026-07-08T10:00:00Z"
  },
  {
    "id": "prod-73",
    "name": "LG 65\" OLED evo C3 Series 4K Smart TV",
    "slug": "lg-65-oled-evo-c3",
    "brand": "LG",
    "model": "OLED65C3PSA",
    "processor": "α9 AI Processor Gen6 4K",
    "category_id": "cat-5",
    "category_slug": "tvs",
    "subcategory": "OLED TVs",
    "short_description": "Self-lit OLED evo pixels with Brightness Booster, α9 AI Processor Gen6, 120Hz Dolby Vision, 4x HDMI 2.1.",
    "description": "LG 65-inch OLED evo C3 Series delivers infinite contrast, 100% color fidelity, and perfect black levels. Powered by LG’s α9 AI Processor Gen6 with Brightness Booster, Dolby Vision IQ and Dolby Atmos, ultra-fast 0.1ms response time, native 120Hz refresh rate, NVIDIA G-SYNC & AMD FreeSync Premium certification, 4x full-bandwidth 48Gbps HDMI 2.1 ports, webOS 23 with ThinQ AI, and Magic Remote.",
    "price": 2950000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 3,
    "sku": "LG-OLED65-C3-4K",
    "rating": 5,
    "review_count": 42,
    "sales_count": 65,
    "images": [
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "2 Year LG Nigeria Warranty + 5 Year Panel Warranty",
    "delivery_info": "Nationwide delivery & expert installation",
    "created_at": "2026-07-19T10:00:00Z",
    "updated_at": "2026-07-19T10:00:00Z"
  },
  {
    "id": "prod-74",
    "name": "Sony BRAVIA XR 65\" A80L OLED 4K Google TV",
    "slug": "sony-bravia-xr-65-a80l-oled",
    "brand": "Sony",
    "model": "XR-65A80L",
    "processor": "Cognitive Processor XR",
    "category_id": "cat-5",
    "category_slug": "tvs",
    "subcategory": "OLED TVs",
    "short_description": "Cognitive Processor XR, Acoustic Surface Audio+ where screen is the speaker, Perfect for PlayStation 5.",
    "description": "Sony BRAVIA XR 65-inch A80L 4K OLED TV powered by the revolutionary Cognitive Processor XR. Features XR OLED Contrast Pro with pure blacks and peak brightness, Acoustic Surface Audio+ turning the entire glass screen into a multi-channel speaker with built-in subwoofers, Perfect for PlayStation 5 with Auto HDR Tone Mapping, 4K 120fps gaming, Google TV with Google Assistant, and premium metal flush bezel design.",
    "price": 3400000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 0,
    "sku": "SONY-65A80L-OLED",
    "rating": 4.9,
    "review_count": 27,
    "sales_count": 38,
    "images": [
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Sony Official Warranty",
    "delivery_info": "Nationwide delivery & installation",
    "created_at": "2026-07-11T10:00:00Z",
    "updated_at": "2026-07-11T10:00:00Z"
  },
  {
    "id": "prod-75",
    "name": "TCL 55\" C745 QLED 4K 144Hz Gaming TV",
    "slug": "tcl-55-c745-qled-4k",
    "brand": "TCL",
    "model": "55C745",
    "processor": "AiPQ Processor 3.0",
    "category_id": "cat-5",
    "category_slug": "tvs",
    "subcategory": "4K QLED TVs",
    "short_description": "Full Array Local Dimming, 144Hz VRR native panel, Game Master Pro 2.0 with AMD FreeSync Premium Pro.",
    "description": "TCL 55C745 QLED 4K TV is engineered for sports lovers and competitive gamers. Features Full Array Local Dimming with 1000 nits peak brightness, 100% DCI-P3 Quantum Dot color gamut, native 144Hz variable refresh rate (up to 240Hz DLG), AMD FreeSync Premium Pro, Dolby Vision IQ & IMAX Enhanced certification, Google TV smart interface, and Onkyo stereo sound with Dolby Atmos.",
    "price": 760000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 7,
    "sku": "TCL-55C745-144HZ",
    "rating": 4.8,
    "review_count": 53,
    "sales_count": 110,
    "images": [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year TCL Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-15T10:00:00Z",
    "updated_at": "2026-07-15T10:00:00Z"
  },
  {
    "id": "prod-76",
    "name": "Hisense 55\" U7K ULED Mini-LED 4K TV",
    "slug": "hisense-55-u7k-mini-led",
    "brand": "Hisense",
    "model": "55U7K",
    "processor": "Hi-View Engine",
    "category_id": "cat-5",
    "category_slug": "tvs",
    "subcategory": "Mini-LED TVs",
    "short_description": "Mini-LED with Full Array Local Dimming, 144Hz Game Mode Pro, Quantum Dot color, 1000 nits, VIDAA U7.",
    "description": "Hisense 55U7K combines Mini-LED backlighting with Quantum Dot Color for high contrast and color precision. Features hundreds of Mini-LED dimming zones with up to 1000 nits peak brightness, 144Hz native refresh rate with AMD FreeSync Premium, Dolby Vision IQ & Dolby Atmos, 2.1 channel sound system with built-in subwoofer, and VIDAA U7 Smart TV platform.",
    "price": 820000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 6,
    "sku": "HIS-55U7K-MINILED",
    "rating": 4.7,
    "review_count": 38,
    "sales_count": 75,
    "images": [
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Hisense Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-06T10:00:00Z",
    "updated_at": "2026-07-06T10:00:00Z"
  },
  {
    "id": "prod-13",
    "name": "JBL Charge 5 Portable Waterproof Bluetooth Speaker",
    "slug": "jbl-charge-5-speaker",
    "brand": "JBL",
    "model": "JBL Charge 5",
    "category_id": "cat-7",
    "category_slug": "speakers",
    "subcategory": "Bluetooth Speakers",
    "short_description": "Original Pro Sound with long excursion driver, separate tweeter, dual bass radiators, 20-hour battery & powerbank.",
    "description": "JBL Charge 5 portable Bluetooth speaker delivers bold JBL Original Pro Sound with an optimized long excursion driver, separate tweeter, and dual pumping JBL bass radiators. Features up to 20 hours of playtime, built-in USB powerbank to charge mobile devices on the go, IP67 waterproof and dustproof design, and PartyBoost pairing for synchronized multi-speaker sound.",
    "price": 198000,
    "compare_at_price": 220000,
    "condition": "Brand New",
    "stock": 20,
    "sku": "JBL-CHG5-BLK",
    "rating": 4.8,
    "review_count": 85,
    "sales_count": 210,
    "images": [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": true,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year JBL Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-10T10:00:00Z",
    "updated_at": "2026-07-10T10:00:00Z"
  },
  {
    "id": "prod-77",
    "name": "Samsung HW-Q990C 11.1.4ch Dolby Atmos Soundbar",
    "slug": "samsung-hw-q990c-soundbar",
    "brand": "Samsung",
    "model": "HW-Q990C/ZA",
    "category_id": "cat-7",
    "category_slug": "speakers",
    "subcategory": "Home Theater Soundbars",
    "short_description": "11.1.4 Channel True Dolby Atmos Soundbar with wireless rear speakers, 8\" wireless subwoofer, and Q-Symphony.",
    "description": "Samsung HW-Q990C is the world’s leading soundbar system delivering pure 11.1.4-channel audio immersion with 22 discrete speakers. Includes main soundbar with side/up-firing drivers, wireless 8-inch acoustic lens subwoofer, and wireless up/side-firing rear surround speakers. Features Wireless Dolby Atmos via Wi-Fi, SpaceFit Sound Pro room calibration, Q-Symphony 3.0 TV sync, and 656W total power output.",
    "price": 1450000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 4,
    "sku": "SAM-HW-Q990C-BLK",
    "rating": 4.9,
    "review_count": 31,
    "sales_count": 55,
    "images": [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery & setup",
    "created_at": "2026-07-09T10:00:00Z",
    "updated_at": "2026-07-09T10:00:00Z"
  },
  {
    "id": "prod-78",
    "name": "JBL Bar 500 5.1ch 590W Soundbar with Subwoofer",
    "slug": "jbl-bar-500-soundbar",
    "brand": "JBL",
    "model": "JBL Bar 500",
    "category_id": "cat-7",
    "category_slug": "speakers",
    "subcategory": "Home Theater Soundbars",
    "short_description": "590W total power, 10\" down-firing wireless subwoofer, MultiBeam 3D surround sound with Dolby Atmos.",
    "description": "JBL Bar 500 brings movies and music to life with 590 watts of total system power and a thunderous 10-inch wireless down-firing subwoofer. Features MultiBeam technology with virtual Dolby Atmos 3D surround sound, PureVoice dialogue enhancement technology for crystal clear movie speech, HDMI eARC with 4K Dolby Vision pass-through, AirPlay 2, Alexa Multi-Room Music, and built-in Wi-Fi.",
    "price": 680000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 8,
    "sku": "JBL-BAR500-BLK",
    "rating": 4.8,
    "review_count": 46,
    "sales_count": 95,
    "images": [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year JBL Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-16T10:00:00Z",
    "updated_at": "2026-07-16T10:00:00Z"
  },
  {
    "id": "prod-79",
    "name": "JBL Boombox 3 Portable Bluetooth Speaker",
    "slug": "jbl-boombox-3-speaker",
    "brand": "JBL",
    "model": "JBL Boombox 3",
    "category_id": "cat-7",
    "category_slug": "speakers",
    "subcategory": "Bluetooth Speakers",
    "short_description": "3-way acoustic design with central racetrack subwoofer, 24 hours playtime, IP67 waterproof.",
    "description": "JBL Boombox 3 features a 3-way speaker system with a high-sensitivity racetrack subwoofer, two midrange drivers, and two tweeters delivering 180W output on AC power. Features a metal handle with silicone grip, IP67 waterproof and dustproof build, 24 hours of playtime from a 10,000mAh battery with built-in USB powerbank, and JBL PartyBoost.",
    "price": 680000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 9,
    "sku": "JBL-BOOM3-BLK",
    "rating": 4.9,
    "review_count": 62,
    "sales_count": 140,
    "images": [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year JBL Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-02T10:00:00Z",
    "updated_at": "2026-07-02T10:00:00Z"
  },
  {
    "id": "prod-80",
    "name": "Marshall Stanmore III Bluetooth Speaker",
    "slug": "marshall-stanmore-iii-speaker",
    "brand": "Marshall",
    "model": "Stanmore III",
    "category_id": "cat-7",
    "category_slug": "speakers",
    "subcategory": "Home Audio Speakers",
    "short_description": "80W Class D amplification, wider stereo soundstage with outward-angled tweeters, iconic vintage Marshall design.",
    "description": "Marshall Stanmore III occupies the middle of Marshall’s home lineup, producing heavy room-filling stereo sound. Redesigned with outward-angled tweeters and updated waveguides for an expansive audio stage, 80W Class D power (50W woofer + dual 15W tweeters), Dynamic Loudness balance, brass control knobs for volume/bass/treble, RCA and 3.5mm inputs, and Bluetooth 5.2 with LE Audio readiness.",
    "price": 490000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 6,
    "sku": "MAR-STAN3-BLK",
    "rating": 4.8,
    "review_count": 38,
    "sales_count": 70,
    "images": [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Marshall Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-17T10:00:00Z",
    "updated_at": "2026-07-17T10:00:00Z"
  },
  {
    "id": "prod-135",
    "name": "Microsoft Xbox Wireless Controller (Carbon Black)",
    "slug": "xbox-wireless-controller-black",
    "brand": "Microsoft",
    "model": "Xbox Wireless Controller (QAT-00002)",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "Gaming Controllers",
    "short_description": "Textured grip on triggers, bumpers, and back-case; hybrid D-pad; Xbox Wireless and Bluetooth technology.",
    "description": "Microsoft Xbox Wireless Controller in Carbon Black features sculpted surfaces and refined geometry for enhanced comfort during gameplay. Includes textured grip on triggers, bumpers, and back case, hybrid D-pad for precise directional input, dedicated Share button to capture and share content, 3.5mm audio headset jack, and seamless pairing across Xbox Series X|S, Xbox One, Windows PC, Android, and iOS.",
    "price": 85000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 25,
    "sku": "XB-CTRL-BLK",
    "rating": 4.8,
    "review_count": 72,
    "sales_count": 220,
    "images": [
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Microsoft Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-08T10:00:00Z",
    "updated_at": "2026-07-08T10:00:00Z"
  },
  {
    "id": "prod-136",
    "name": "Nintendo Switch Pro Controller",
    "slug": "nintendo-switch-pro-controller",
    "brand": "Nintendo",
    "model": "HAC-013 Pro Controller",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "Gaming Controllers",
    "short_description": "HD rumble, built-in amiibo NFC touchpoint, motion controls, ergonomic full-size grips, 40h battery.",
    "description": "Nintendo Switch Pro Controller delivers premium control and comfort for extended gaming sessions on TV or tabletop mode. Includes motion controls, HD rumble with realistic force feedback, built-in amiibo NFC reader, semi-transparent black housing, full-size offset analog sticks, responsive D-pad, and rechargeable lithium-ion battery with up to 40 hours playtime per charge.",
    "price": 95000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 16,
    "sku": "NIN-PRO-CTRL",
    "rating": 4.9,
    "review_count": 54,
    "sales_count": 140,
    "images": [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-11T10:00:00Z",
    "updated_at": "2026-07-11T10:00:00Z"
  },
  {
    "id": "prod-137",
    "name": "SteelSeries Arctis Nova 7 Wireless Gaming Headset",
    "slug": "steelseries-arctis-nova-7-wireless",
    "brand": "SteelSeries",
    "model": "Arctis Nova 7 Wireless",
    "category_id": "cat-6",
    "category_slug": "gaming-consoles",
    "subcategory": "Gaming Headsets",
    "short_description": "Nova Acoustic System with High Fidelity Drivers, 360° Spatial Audio, simultaneous 2.4GHz and Bluetooth.",
    "description": "SteelSeries Arctis Nova 7 Wireless gaming headset features the custom-designed Nova Acoustic System with High Fidelity Drivers and Sonar Software EQ. Supports simultaneous 2.4GHz gaming audio and Bluetooth mobile audio, ClearCast Gen 2 bidirectional AI-powered noise-canceling retractable microphone, 38-hour battery life with USB-C fast charging (15-min charge gives 6 hours), and multi-platform compatibility with PC, PlayStation 5, Switch, and mobile.",
    "price": 260000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 11,
    "sku": "SS-NOVA7-BLK",
    "rating": 4.8,
    "review_count": 38,
    "sales_count": 85,
    "images": [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year SteelSeries Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-19T10:00:00Z",
    "updated_at": "2026-07-19T10:00:00Z"
  },
  {
    "id": "prod-138",
    "name": "Samsung 65\" Crystal UHD 4K Smart TV (CU7000)",
    "slug": "samsung-65-crystal-uhd-4k-tv",
    "brand": "Samsung",
    "model": "UA65CU7000",
    "processor": "Crystal Processor 4K",
    "category_id": "cat-5",
    "category_slug": "tvs",
    "subcategory": "4K Smart TVs",
    "short_description": "PurColor vibrant color technology, Crystal Processor 4K upscaling, Motion Xcelerator, Tizen Smart TV.",
    "description": "Samsung 65-inch CU7000 Crystal UHD 4K Smart TV delivers crisp 3840 x 2160 resolution with PurColor for a wide spectrum of colors. Powered by the Crystal Processor 4K for intelligent HD-to-4K upscaling, Motion Xcelerator for smooth frame transitions, HDR support for enhanced dark/light details, Q-Symphony TV and soundbar sound integration, 3x HDMI ports, and Tizen Smart Hub.",
    "price": 980000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 7,
    "sku": "SAM-65CU7000-4K",
    "rating": 4.7,
    "review_count": 46,
    "sales_count": 98,
    "images": [
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery & wall mount installation in Lagos",
    "created_at": "2026-07-05T10:00:00Z",
    "updated_at": "2026-07-05T10:00:00Z"
  },
  {
    "id": "prod-139",
    "name": "LG 55\" 4K UHD Smart TV with AI ThinQ (UR7800)",
    "slug": "lg-55-4k-uhd-smart-tv-ur7800",
    "brand": "LG",
    "model": "55UR78006LK",
    "processor": "α5 AI Processor 4K Gen6",
    "category_id": "cat-5",
    "category_slug": "tvs",
    "subcategory": "4K Smart TVs",
    "short_description": "α5 AI Processor 4K Gen6, HDR10 Pro, Game Optimizer, webOS 23 with Magic Remote support, AI Brightness Control.",
    "description": "LG 55-inch UR7800 4K UHD Smart TV delivers sharp 4K picture quality powered by the α5 AI Processor 4K Gen6. Features HDR10 Pro for optimized brightness and vivid color, 4K AI Upscaling of non-4K content, AI Sound (Virtual 5.1 Up-mix), Game Optimizer dashboard with HGiG mode, webOS 23 with personalized user profiles, and Apple AirPlay 2 support.",
    "price": 680000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 9,
    "sku": "LG-55UR7800-4K",
    "rating": 4.7,
    "review_count": 52,
    "sales_count": 120,
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year LG Nigeria Warranty",
    "delivery_info": "Nationwide delivery & setup",
    "created_at": "2026-07-08T10:00:00Z",
    "updated_at": "2026-07-08T10:00:00Z"
  },
  {
    "id": "prod-140",
    "name": "JBL Flip 6 Portable Waterproof Bluetooth Speaker",
    "slug": "jbl-flip-6-speaker",
    "brand": "JBL",
    "model": "JBL Flip 6",
    "category_id": "cat-7",
    "category_slug": "speakers",
    "subcategory": "Bluetooth Speakers",
    "short_description": "2-way speaker system with racetrack woofer and separate tweeter, IP67 waterproof/dustproof, 12 hours playtime.",
    "description": "JBL Flip 6 delivers powerful JBL Original Pro Sound with exceptional clarity through its 2-way speaker system consisting of an optimized racetrack-shaped woofer, separate tweeter, and dual pumping passive bass radiators. Features an IP67 waterproof and dustproof design, 12 hours of continuous playtime on a single charge, USB-C charging protection, and PartyBoost pairing.",
    "price": 135000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 24,
    "sku": "JBL-FLIP6-BLK",
    "rating": 4.8,
    "review_count": 89,
    "sales_count": 240,
    "images": [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year JBL Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-15T10:00:00Z",
    "updated_at": "2026-07-15T10:00:00Z"
  },
  {
    "id": "prod-141",
    "name": "Sony SRS-XB100 Compact Wireless Bluetooth Speaker",
    "slug": "sony-srs-xb100-speaker",
    "brand": "Sony",
    "model": "SRS-XB100 (Black)",
    "category_id": "cat-7",
    "category_slug": "speakers",
    "subcategory": "Bluetooth Speakers",
    "short_description": "Sound Diffusion Processor with Extra Bass, multiway strap, IP67 waterproof, 16 hours battery life.",
    "description": "Sony SRS-XB100 is a compact, portable wireless speaker that packs impressive sound into a small body. Features a Sound Diffusion Processor with an off-center diaphragm passive radiator for clear vocal clarity and deep bass, versatile multiway carry strap, IP67 waterproof and dustproof rating, hands-free speakerphone calling with Echo Canceling technology, and up to 16 hours of battery life with USB Type-C charging.",
    "price": 48000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 30,
    "sku": "SONY-XB100-BLK",
    "rating": 4.7,
    "review_count": 65,
    "sales_count": 190,
    "images": [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Sony Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-18T10:00:00Z",
    "updated_at": "2026-07-18T10:00:00Z"
  },
  {
    "id": "prod-16",
    "name": "LG 2.0HP Dual Inverter Split Air Conditioner",
    "slug": "lg-2hp-inverter-air-conditioner",
    "brand": "LG",
    "model": "LG Gencool Dual Inverter 2.0HP",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Inverter Air Conditioners",
    "short_description": "DUAL Inverter compressor, GenCool generator-compatible mode, 70% energy savings, Gold Fin anti-corrosion.",
    "description": "LG 2.0HP Dual Inverter Split Air Conditioner (18,000 BTU/h) engineered for high cooling speed and extreme energy efficiency. Features LG DUAL Inverter Compressor with 10-year warranty, GenCool 3-step power control for seamless operation on small generators, Gold Fin anti-corrosion protective coating on outdoor copper condenser, ultra-quiet 19dB sleep mode, Dual Protection filter, and rapid Jet Cool technology.",
    "price": 882000,
    "compare_at_price": 980000,
    "condition": "Brand New",
    "stock": 7,
    "sku": "LG-AC-2HP-GENINV",
    "rating": 4.7,
    "review_count": 41,
    "sales_count": 75,
    "images": [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "2 Year LG General / 10 Year Compressor Warranty",
    "delivery_info": "Nationwide delivery & optional expert installation in Lagos",
    "created_at": "2026-07-06T10:00:00Z",
    "updated_at": "2026-07-06T10:00:00Z"
  },
  {
    "id": "prod-20",
    "name": "Hisense 350L Top Mount Double Door Refrigerator",
    "slug": "hisense-double-door-refrigerator",
    "brand": "Hisense",
    "model": "RD-45WR4SAY",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Refrigerators & Freezers",
    "short_description": "350 Liters capacity, Total No Frost, Smart Inverter Compressor, Multi Air Flow 360° cooling, Stainless Steel.",
    "description": "Hisense 350L Double Door Top-Mount Refrigerator featuring Smart Inverter Compressor technology for quiet operation and low energy consumption. Total No Frost prevents ice build-up, Multi Air Flow 360-degree cooling distributes chilled air uniformly to every shelf, moisture-adjustable crisper drawer preserves fresh produce, tempered glass adjustable spill-proof shelves, and brushed stainless steel exterior finish.",
    "price": 720000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 4,
    "sku": "HIS-REF-350L-SS",
    "rating": 4.6,
    "review_count": 34,
    "sales_count": 55,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "2 Year Hisense Nigeria Warranty",
    "delivery_info": "Nationwide delivery & setup",
    "created_at": "2026-07-04T10:00:00Z",
    "updated_at": "2026-07-04T10:00:00Z"
  },
  {
    "id": "prod-23",
    "name": "Ninja Professional Blender 1200W (BN701)",
    "slug": "ninja-blender-1200w",
    "brand": "Ninja",
    "model": "Ninja BN701 Professional Plus",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Blenders & Food Processors",
    "short_description": "1200 Peak Watts motor, Auto-iQ intelligent presets, 72oz Total Crushing pitcher, Pro Extractor blades.",
    "description": "Ninja Professional Plus 1200W Blender (BN701) equipped with 1200 peak watts of high-torque power. Features Auto-iQ technology with 3 intelligent one-touch preset programs (Smoothie, Ice Crush, Extract), massive 72 oz Total Crushing pitcher (64 oz max liquid capacity), stacked 6-blade stainless steel assembly that crushes whole ice cubes into snow in seconds, BPA-free dishwasher-safe pitcher, and locking safety lid.",
    "price": 162000,
    "compare_at_price": 180000,
    "condition": "Brand New",
    "stock": 18,
    "sku": "NINJA-BN701-1200W",
    "rating": 4.6,
    "review_count": 58,
    "sales_count": 95,
    "images": [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Ninja Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-13T10:00:00Z",
    "updated_at": "2026-07-13T10:00:00Z"
  },
  {
    "id": "prod-81",
    "name": "Panasonic 1.5HP Inverter Split Air Conditioner (nanoe-G)",
    "slug": "panasonic-1-5hp-inverter-ac",
    "brand": "Panasonic",
    "model": "CS-PU12XKD / CU-PU12XKD",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Inverter Air Conditioners",
    "short_description": "1.5HP Inverter, nanoe-G air purification technology, AEROWINGS fast cooling, Blue Fin condenser.",
    "description": "Panasonic 1.5HP Inverter Split AC (12,000 BTU/h) combines intelligent energy saving with advanced air purification. Features nanoe-G technology that removes 99% of airborne PM2.5 particles, bacteria, and viruses. AEROWINGS dual flaps concentrate cool air for rapid chill, ECO Mode with A.I. monitors room conditions to maximize electricity savings, Blue Fin anti-rust coating on condenser coils, and quiet 21dB operation.",
    "price": 680000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 8,
    "sku": "PAN-AC-15HP-INV",
    "rating": 4.8,
    "review_count": 36,
    "sales_count": 65,
    "images": [
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year General / 5 Year Compressor Panasonic Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-20T10:00:00Z",
    "updated_at": "2026-07-20T10:00:00Z"
  },
  {
    "id": "prod-82",
    "name": "Samsung 410L Twin Cooling Plus Double Door Refrigerator",
    "slug": "samsung-410l-twin-cooling-refrigerator",
    "brand": "Samsung",
    "model": "RT41K5052SL",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Refrigerators & Freezers",
    "short_description": "410L capacity, Twin Cooling Plus (70% moisture retention), 5 conversion modes, Digital Inverter compressor.",
    "description": "Samsung 410L Top Mount Refrigerator powered by Twin Cooling Plus technology with independent cooling systems for fridge and freezer compartments to prevent odor mixing and maintain 70% humidity for long-lasting food freshness. Features 5 Smart Conversion modes (Normal, Extra Fridge, Vacation, Seasonal, Home Alone), Digital Inverter Compressor with 20-year warranty, Power Freeze/Cool, and Easy Slide shelf.",
    "price": 1180000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 5,
    "sku": "SAM-REF-410L-TWIN",
    "rating": 4.8,
    "review_count": 29,
    "sales_count": 50,
    "images": [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Samsung Warranty / 20 Year Digital Inverter Compressor Warranty",
    "delivery_info": "Nationwide delivery & setup",
    "created_at": "2026-07-11T10:00:00Z",
    "updated_at": "2026-07-11T10:00:00Z"
  },
  {
    "id": "prod-83",
    "name": "Haier Thermocool 200L Inverter Chest Freezer (Turbo Freezing)",
    "slug": "haier-thermocool-200l-freezer",
    "brand": "Haier Thermocool",
    "model": "HTF-200IS Inverter",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Refrigerators & Freezers",
    "short_description": "200L Inverter chest freezer, 100 hours stay-cool power-cut holdover, super freezing function, low voltage start.",
    "description": "Haier Thermocool 200L Inverter Chest Freezer is specially engineered for Nigerian power conditions. Features high-efficiency Inverter compressor with up to 50% energy savings, 100-hour cooling retention during prolonged power outages, Super Fast Freeze function to lock in meat and seafood nutrients, stabilizer-free operation down to 135V, rust-free zinc-coated galvanized steel body, and bright interior lighting with safety lock.",
    "price": 490000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 9,
    "sku": "HT-FRZ-200L-INV",
    "rating": 4.8,
    "review_count": 54,
    "sales_count": 120,
    "images": [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "3 Year Haier Thermocool General / 5 Year Cabinet Warranty",
    "delivery_info": "Nationwide delivery & setup",
    "created_at": "2026-06-25T10:00:00Z",
    "updated_at": "2026-06-25T10:00:00Z"
  },
  {
    "id": "prod-84",
    "name": "LG 8kg Front Load AI DD Washing Machine with Steam",
    "slug": "lg-8kg-front-load-washing-machine",
    "brand": "LG",
    "model": "F4J3TM5WE (AI Direct Drive)",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Washing Machines",
    "short_description": "8kg AI DD direct drive intelligent fabric care, Steam allergy care 99.9% elimination, 6 Motion DD.",
    "description": "LG 8kg Front Load AI Direct Drive Washing Machine uses deep learning to detect both load weight and fabric softness, automatically tailoring optimal wash motions to protect delicate clothes. Equipped with Steam technology removing 99.9% of dust mites and allergens, 6 Motion Direct Drive with inverter motor, full stainless steel lifter drum, Smart Diagnosis, and 10-year motor warranty.",
    "price": 820000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 6,
    "sku": "LG-WM-8KG-AIDD",
    "rating": 4.8,
    "review_count": 35,
    "sales_count": 70,
    "images": [
      "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year LG Warranty / 10 Year Inverter Direct Drive Motor Warranty",
    "delivery_info": "Nationwide delivery & installation",
    "created_at": "2026-07-05T10:00:00Z",
    "updated_at": "2026-07-05T10:00:00Z"
  },
  {
    "id": "prod-85",
    "name": "Ninja Foodi DualZone 2-Basket 8-Quart Air Fryer (DZ201)",
    "slug": "ninja-foodi-dualzone-air-fryer",
    "brand": "Ninja",
    "model": "Ninja DZ201 Foodi 6-in-1 DualZone",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Air Fryers & Cookers",
    "short_description": "2 independent 4-quart baskets with DualZone Smart Finish, 6-in-1 functions: Air Fry, Broil, Roast, Bake, Reheat, Dehydrate.",
    "description": "Ninja Foodi DualZone 8-Quart Air Fryer allows you to cook 2 different foods, 2 different ways, and finish at the exact same time using Smart Finish technology. Features Match Cook button to duplicate settings across both 4-quart nonstick ceramic baskets, 6 customizable cooking functions, wide temperature range (105°F to 450°F), and easy-to-clean dishwasher-safe crisper plates.",
    "price": 260000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 14,
    "sku": "NINJA-DZ201-8QT",
    "rating": 4.9,
    "review_count": 64,
    "sales_count": 145,
    "images": [
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Ninja Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-21T10:00:00Z",
    "updated_at": "2026-07-21T10:00:00Z"
  },
  {
    "id": "prod-86",
    "name": "Panasonic 27L Inverter Convection Microwave Oven",
    "slug": "panasonic-27l-inverter-microwave",
    "brand": "Panasonic",
    "model": "NN-CT645M Inverter Convection",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Microwaves & Ovens",
    "short_description": "27L Stainless cavity, Inverter continuous power cooking, Convection baking + Grill combination, 101 auto menus.",
    "description": "Panasonic 27L Inverter Convection Microwave Oven delivers precise, uniform cooking with continuous Inverter power control rather than pulsing, preventing scorched edges and frozen centers. Offers 3-in-1 combination cooking (Microwave 900W, Quartz Grill 1400W, Convection Oven 100°C–240°C), 101 auto cooking menus, turbo defrost, and full stainless steel interior for effortless wipe-down cleaning.",
    "price": 280000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 11,
    "sku": "PAN-MW-27L-INV",
    "rating": 4.7,
    "review_count": 38,
    "sales_count": 85,
    "images": [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Panasonic Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-14T10:00:00Z",
    "updated_at": "2026-07-14T10:00:00Z"
  },
  {
    "id": "prod-87",
    "name": "Instant Pot Duo Plus 9-in-1 6-Quart Multi-Cooker",
    "slug": "instant-pot-duo-plus-6qt",
    "brand": "Instant Pot",
    "model": "Duo Plus 9-in-1 (6 Quart)",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Air Fryers & Cookers",
    "short_description": "9-in-1 multi-cooker: Pressure Cooker, Slow Cooker, Rice Cooker, Yogurt Maker, Steamer, Sauté Pan, Sous Vide.",
    "description": "Instant Pot Duo Plus 6-Quart replaces 9 kitchen appliances in one compact countertop unit. Features an upgraded easy-release steam switch that automatically seals when closing lid, large blue LCD display with cooking progress bar, 15 customizable smart programs (including Jollof rice, beans, meat stew, soup, sous vide, and yogurt), tri-ply stainless steel inner cooking pot, and 10+ proven safety mechanisms.",
    "price": 190000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 16,
    "sku": "INST-DP-6QT-9IN1",
    "rating": 4.8,
    "review_count": 52,
    "sales_count": 110,
    "images": [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-09T10:00:00Z",
    "updated_at": "2026-07-09T10:00:00Z"
  },
  {
    "id": "prod-9",
    "name": "Apple Watch Ultra 2 49mm Titanium",
    "slug": "apple-watch-ultra-2",
    "brand": "Apple",
    "model": "Apple Watch Ultra 2",
    "storage": "64GB",
    "ram": "1GB",
    "processor": "Apple S9 SiP",
    "category_id": "cat-4",
    "category_slug": "smart-watches",
    "subcategory": "Apple Watch",
    "short_description": "49mm aerospace-grade titanium case, 3000-nit sapphire display, S9 SiP with Double Tap, precision dual GPS.",
    "description": "Apple Watch Ultra 2 crafted from lightweight aerospace-grade titanium with raised sapphire crystal bezels. Features 3000-nit Always-On Retina display, S9 SiP with intuitive Double Tap gesture, customizable Action Button, 100m water resistance, EN13319 recreational dive computer certification to 40m, precision dual-frequency GPS (L1 and L5), and up to 72 hours battery life in Low Power Mode.",
    "price": 1180000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 9,
    "sku": "AWU2-49-TI-GPS",
    "rating": 4.8,
    "review_count": 92,
    "sales_count": 200,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-05T10:00:00Z",
    "updated_at": "2026-07-05T10:00:00Z"
  },
  {
    "id": "prod-88",
    "name": "Apple Watch Series 9 45mm GPS (Midnight Aluminum)",
    "slug": "apple-watch-series-9-45mm",
    "brand": "Apple",
    "model": "Apple Watch Series 9",
    "storage": "64GB",
    "ram": "1GB",
    "processor": "Apple S9 SiP",
    "category_id": "cat-4",
    "category_slug": "smart-watches",
    "subcategory": "Apple Watch",
    "short_description": "S9 SiP chip with Double Tap magic gesture, 2000-nit Always-On display, on-device Siri, and blood oxygen sensor.",
    "description": "Apple Watch Series 9 is more powerful and intuitive than ever. Featuring the custom Apple S9 SiP with 4-core Neural Engine, magic Double Tap gesture for easy one-handed control, 2000-nit edge-to-edge Always-On Retina display, on-device Siri with health data logging, ECG app, blood oxygen tracking, temperature sensing for cycle tracking, crash detection, and all-day 18-hour battery with fast charging.",
    "price": 640000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 14,
    "sku": "AWS9-45-MID-GPS",
    "rating": 4.8,
    "review_count": 67,
    "sales_count": 155,
    "images": [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-16T10:00:00Z",
    "updated_at": "2026-07-16T10:00:00Z"
  },
  {
    "id": "prod-89",
    "name": "Samsung Galaxy Watch6 Classic 47mm (Rotating Bezel)",
    "slug": "samsung-galaxy-watch6-classic-47mm",
    "brand": "Samsung",
    "model": "Galaxy Watch6 Classic (SM-R960)",
    "storage": "16GB",
    "ram": "2GB",
    "processor": "Exynos W930 (5nm Dual-Core 1.4GHz)",
    "category_id": "cat-4",
    "category_slug": "smart-watches",
    "subcategory": "Samsung Wearables",
    "short_description": "Stainless steel case with physical rotating bezel, 1.5\" Sapphire Crystal Super AMOLED, body composition BIA.",
    "description": "Samsung Galaxy Watch6 Classic blends timeless watchmaking elegance with cutting-edge health tracking. Features a 15% thinner physical rotating bezel, premium stainless steel chassis with Sapphire Crystal glass, 1.47-inch Super AMOLED Always-On display (2000 nits peak), BioActive 3-in-1 health sensor with ECG and BIA body composition analysis, personalized heart rate zones, sleep coaching, and Wear OS powered by Samsung.",
    "price": 420000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 11,
    "sku": "SAM-GW6C-47-BLK",
    "rating": 4.7,
    "review_count": 53,
    "sales_count": 115,
    "images": [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-08T10:00:00Z",
    "updated_at": "2026-07-08T10:00:00Z"
  },
  {
    "id": "prod-90",
    "name": "Garmin Fenix 7 Pro Solar Multisport GPS Watch",
    "slug": "garmin-fenix-7-pro-solar",
    "brand": "Garmin",
    "model": "Fenix 7 Pro Solar (47mm)",
    "storage": "32GB Flash Storage",
    "category_id": "cat-4",
    "category_slug": "smart-watches",
    "subcategory": "Fitness & GPS Watches",
    "short_description": "Power Glass solar charging lens, built-in LED flashlight, multi-band GPS with SatIQ, 22-day solar battery life.",
    "description": "Garmin Fenix 7 Pro Solar is a multisport GPS smartwatch with Power Glass solar charging lens providing up to 22 days of battery life in smartwatch mode. Features a built-in multi-LED flashlight with variable intensities, multi-band GNSS with SatIQ navigation technology, Hill Score, Endurance Score, wrist-based heart rate and SpO2 tracking, and preloaded TopoActive topographic maps.",
    "price": 1150000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 4,
    "sku": "GAR-FEN7P-SOL-SLT",
    "rating": 4.9,
    "review_count": 28,
    "sales_count": 42,
    "images": [
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Garmin Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-01T10:00:00Z",
    "updated_at": "2026-07-01T10:00:00Z"
  },
  {
    "id": "prod-91",
    "name": "oraimo Watch 4 Plus (1.96\" HD Display & Bluetooth Calling)",
    "slug": "oraimo-watch-4-plus",
    "brand": "oraimo",
    "model": "OSW-801 Watch 4 Plus",
    "category_id": "cat-4",
    "category_slug": "smart-watches",
    "subcategory": "Smart Wearables",
    "short_description": "1.96\" HD color screen, wireless Bluetooth calling with noise reduction, 100+ sports modes, 7-day battery.",
    "description": "oraimo Watch 4 Plus features a vibrant 1.96-inch HD large color display with 500 nits brightness and 2.5D curved glass. Features clear single-chip Bluetooth calling with single-button pairing, 24/7 heart rate & blood oxygen tracking, sleep monitoring, 100+ sports modes with real-time stats, IP68 water resistance, remote camera shutter, and long 7-day battery life.",
    "price": 42000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 35,
    "sku": "ORA-W4P-BLK",
    "rating": 4.6,
    "review_count": 98,
    "sales_count": 380,
    "images": [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year oraimo Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-20T10:00:00Z",
    "updated_at": "2026-06-20T10:00:00Z"
  },
  {
    "id": "prod-142",
    "name": "LG 1.5HP Dual Inverter Split Air Conditioner (GenCool)",
    "slug": "lg-1-5hp-dual-inverter-ac",
    "brand": "LG",
    "model": "LG GenCool Dual Inverter 1.5HP (BS-Q126JAA0)",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Inverter Air Conditioners",
    "short_description": "1.5HP Dual Inverter compressor, GenCool generator-compatible mode, Gold Fin anti-corrosion, Jet Cool.",
    "description": "LG 1.5HP Dual Inverter Split Air Conditioner (12,000 BTU/h) provides rapid cooling and exceptional energy efficiency. Features LG DUAL Inverter Compressor backed by a 10-year warranty, GenCool 3-step power control for seamless operation on small household generators, 100% pure copper condenser with Gold Fin anti-corrosion coating, ultra-quiet 21dB sleep mode, and Jet Cool rapid temperature reduction.",
    "price": 720000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 10,
    "sku": "LG-AC-15HP-GENINV",
    "rating": 4.8,
    "review_count": 48,
    "sales_count": 95,
    "images": [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year General / 10 Year Compressor LG Warranty",
    "delivery_info": "Nationwide delivery & optional expert installation in Lagos",
    "created_at": "2026-07-16T10:00:00Z",
    "updated_at": "2026-07-16T10:00:00Z"
  },
  {
    "id": "prod-143",
    "name": "Binatone 18\" Standing Fan with Remote Control (A-1890 R)",
    "slug": "binatone-18-inch-standing-fan",
    "brand": "Binatone",
    "model": "A-1890 R (18\" Multi-Function)",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Cooling Fans",
    "short_description": "18-inch 5-fin high-efficiency blade, 3-speed selector with remote control, 8-hour timer, heavy base.",
    "description": "Binatone A-1890 R 18-inch standing fan is built for maximum air circulation and quiet operation in Nigerian homes and offices. Features a 5-fin high-efficiency aerodynamic blade design, long-life high-torque motor with overheat protection, 3 selectable speed settings, 8-hour timer, full-function infrared remote control, adjustable height and tilt angle, and sturdy heavy-duty round base for stability.",
    "price": 62000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 35,
    "sku": "BIN-FAN-1890R",
    "rating": 4.7,
    "review_count": 84,
    "sales_count": 310,
    "images": [
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Binatone Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-28T10:00:00Z",
    "updated_at": "2026-06-28T10:00:00Z"
  },
  {
    "id": "prod-144",
    "name": "Philips PerfectCare Compact Steam Generator Iron (GC6815)",
    "slug": "philips-perfectcare-steam-generator-iron",
    "brand": "Philips",
    "model": "GC6815/20 PerfectCare Compact",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Irons & Garment Care",
    "short_description": "OptimalTEMP zero burn technology, 6 bar pump pressure, 360g steam boost, 1.3L water tank.",
    "description": "Philips PerfectCare Compact Steam Generator Iron features OptimalTEMP technology guaranteeing zero burns on all ironable fabrics (from silk and linen to jeans) with no temperature dials to adjust. Delivers powerful continuous steam up to 120g/min and a 360g steam boost with 6 bar pump pressure for deep crease removal, compact design for easy storage, SteamGlide soleplate for smooth gliding, and 1.3L transparent detachable water tank.",
    "price": 145000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 12,
    "sku": "PHI-GC6815-STEAM",
    "rating": 4.8,
    "review_count": 36,
    "sales_count": 75,
    "images": [
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Philips Worldwide Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-09T10:00:00Z",
    "updated_at": "2026-07-09T10:00:00Z"
  },
  {
    "id": "prod-145",
    "name": "Nexus 3-Gas + 1-Electric Top Cooker with Gas Oven",
    "slug": "nexus-3-gas-1-electric-cooker",
    "brand": "Nexus",
    "model": "GCCR-NX-5055B (50x55cm)",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Cookers & Ovens",
    "short_description": "3 gas Euro burners + 1 rapid electric hotplate, gas oven with grill and auto-ignition, glass lid.",
    "description": "Nexus 3-Gas + 1-Electric Standing Cooker (50x55cm) is designed for versatile Nigerian cooking. Features 3 high-efficiency Euro-type gas pool burners and 1 rapid-heating electric hotplate, push-button auto-ignition for hob and oven, double glass oven door for thermal insulation, gas oven with built-in grill burner, removable tempered glass top lid, and easy-to-clean enamel black finish.",
    "price": 280000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 6,
    "sku": "NEX-CK-5055-3G1E",
    "rating": 4.7,
    "review_count": 42,
    "sales_count": 80,
    "images": [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Nexus Official Warranty",
    "delivery_info": "Nationwide delivery & setup",
    "created_at": "2026-07-04T10:00:00Z",
    "updated_at": "2026-07-04T10:00:00Z"
  },
  {
    "id": "prod-146",
    "name": "Dyson V11 Cordless Stick Vacuum Cleaner",
    "slug": "dyson-v11-cordless-vacuum",
    "brand": "Dyson",
    "model": "Dyson V11 Absolute",
    "category_id": "cat-9",
    "category_slug": "home-appliances",
    "subcategory": "Vacuum Cleaners",
    "short_description": "Dyson Hyperdymium motor, Dynamic Load Sensor (DLS), LCD real-time report screen, 60 minutes runtime.",
    "description": "Dyson V11 Cordless Stick Vacuum Cleaner features the powerful Dyson Hyperdymium motor spinning at 125,000 RPM. Equipped with Dynamic Load Sensor (DLS) technology that automatically adjusts suction power between carpets and hard floors, LCD screen reporting real-time runtime countdown and maintenance alerts, whole-machine advanced filtration capturing 99.99% of microscopic particles down to 0.3 microns, point-and-shoot hygienic bin emptying, and up to 60 minutes of fade-free floor cleaning.",
    "price": 680000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 5,
    "sku": "DYS-V11-ABS",
    "rating": 4.9,
    "review_count": 27,
    "sales_count": 45,
    "images": [
      "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "2 Year Dyson Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-20T10:00:00Z",
    "updated_at": "2026-07-20T10:00:00Z"
  },
  {
    "id": "prod-15",
    "name": "Canon EOS R6 Mark II Mirrorless Camera (Body Only)",
    "slug": "canon-eos-r6-mark-ii",
    "brand": "Canon",
    "model": "EOS R6 Mark II",
    "processor": "DIGIC X Image Processor",
    "category_id": "cat-8",
    "category_slug": "cameras",
    "subcategory": "Mirrorless Cameras",
    "short_description": "24.2MP full-frame CMOS sensor, 40 fps electronic shutter, 6K oversampled 4K 60p video, 8-stop IBIS.",
    "description": "Canon EOS R6 Mark II full-frame mirrorless camera body delivering hybrid performance for professional photographers and filmmakers. Equipped with a 24.2MP full-frame CMOS sensor, DIGIC X processor, up to 40 fps electronic burst shooting with AF/AE tracking, 6K oversampled uncropped 4K 60p 10-bit 4:2:2 internal video recording with Canon Log 3, Dual Pixel CMOS AF II with deep learning subject recognition, 5-axis IBIS with up to 8 stops of shake correction, and dual UHS-II SD card slots.",
    "price": 3600000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 2,
    "sku": "CANON-R6M2-BODY",
    "rating": 4.9,
    "review_count": 38,
    "sales_count": 52,
    "images": [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Canon Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-09T10:00:00Z",
    "updated_at": "2026-07-09T10:00:00Z"
  },
  {
    "id": "prod-22",
    "name": "Sony Alpha A7 IV Full-Frame Mirrorless Body (Certified Pre-Owned)",
    "slug": "sony-alpha-a7-iv-preowned",
    "brand": "Sony",
    "model": "Alpha A7 IV (ILCE-7M4)",
    "processor": "BIONZ XR Image Processor",
    "category_id": "cat-8",
    "category_slug": "cameras",
    "subcategory": "Mirrorless Cameras",
    "short_description": "Certified pre-owned 33MP full-frame mirrorless body, verified 8,400 shutter count, pristine sensor, 5.5-stop IBIS.",
    "description": "Professionally inspected Grade A+ Sony Alpha A7 IV full-frame mirrorless camera body. Features 33MP Exmor R back-illuminated CMOS sensor with zero dust or micro-blemishes, verified low shutter count of 8,400 actuations (rated for 500,000 cycles), 4K 60p 10-bit 4:2:2 video with S-Cinetone, 759-point AF with Real-time Eye AF, 5.5-stop in-body image stabilization, dual card slots (CFexpress Type A / SD UHS-II), original Sony NP-FZ100 battery and charger.",
    "price": 2350000,
    "compare_at_price": null,
    "condition": "Certified Pre-Owned",
    "stock": 2,
    "sku": "SONY-A7IV-BODY-CPO",
    "rating": 4.8,
    "review_count": 25,
    "sales_count": 38,
    "images": [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "6 Months BuyAndSellOutlets Warranty & Inspection Certificate",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-18T10:00:00Z",
    "updated_at": "2026-06-18T10:00:00Z"
  },
  {
    "id": "prod-92",
    "name": "DJI Osmo Pocket 3 Creator Combo 4K Camera",
    "slug": "dji-osmo-pocket-3-creator-combo",
    "brand": "DJI",
    "model": "Osmo Pocket 3 Creator Combo",
    "category_id": "cat-8",
    "category_slug": "cameras",
    "subcategory": "Vlogging & Action Cameras",
    "short_description": "1-inch CMOS sensor, 4K 120fps video, 3-axis mechanical stabilization, 2\" rotatable OLED screen, DJI Mic 2 included.",
    "description": "DJI Osmo Pocket 3 Creator Combo puts high-end cinematic filming in your palm. Features a powerful 1-inch CMOS sensor capturing 4K 120fps slow-motion and 10-bit D-Log M color, 3-axis mechanical gimbal stabilization, 2-inch rotatable OLED touchscreen with smart horizontal/vertical shooting, ActiveTrack 6.0 subject tracking, and includes DJI Mic 2 transmitter with windscreen, battery handle, and wide-angle lens.",
    "price": 890000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 7,
    "sku": "DJI-OP3-COMBO",
    "rating": 4.9,
    "review_count": 46,
    "sales_count": 90,
    "images": [
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year DJI Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-25T10:00:00Z",
    "updated_at": "2026-07-25T10:00:00Z"
  },
  {
    "id": "prod-14",
    "name": "Apple AirPods Pro (2nd Gen) USB-C",
    "slug": "apple-airpods-pro-2",
    "brand": "Apple",
    "model": "AirPods Pro 2 (USB-C / MagSafe Case)",
    "processor": "Apple H2 chip (earbuds) / Apple U1 chip (case)",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "True Wireless Earbuds",
    "short_description": "Apple H2 silicon, 2x Active Noise Cancellation, Adaptive Audio, USB-C MagSafe Case with Precision Finding.",
    "description": "Apple AirPods Pro (2nd Generation) with USB-C MagSafe Charging Case. Powered by Apple H2 chip for up to 2x more Active Noise Cancellation, Adaptive Audio that tailors noise control to your environment, Transparency mode, Conversation Awareness, Personalized Spatial Audio with dynamic head tracking, IP54 dust and water resistance, and up to 30 hours total listening time with the case.",
    "price": 360000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 25,
    "sku": "APP2-USBC-MTJV3",
    "rating": 4.8,
    "review_count": 134,
    "sales_count": 280,
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-11T10:00:00Z",
    "updated_at": "2026-07-11T10:00:00Z"
  },
  {
    "id": "prod-17",
    "name": "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
    "slug": "sony-wh-1000xm5",
    "brand": "Sony",
    "model": "WH-1000XM5",
    "processor": "Integrated Processor V1 + HD Noise Canceling Processor QN1",
    "category_id": "cat-7",
    "category_slug": "speakers",
    "subcategory": "Wireless Headphones",
    "short_description": "Industry-leading active noise cancellation with 8 microphones, 30-hour battery, Hi-Res LDAC audio, and crystal-clear calls.",
    "description": "Sony WH-1000XM5 wireless over-ear noise-canceling headphones equipped with dual processors (QN1 and V1) and 8 dedicated microphones for unmatched noise attenuation. Features 30mm precision carbon fiber composite drivers, Hi-Res Audio wireless streaming via LDAC, DSEE Extreme AI audio upscaling, 4 beamforming microphones with AI voice pickup, multipoint Bluetooth connection, Speak-to-Chat, and 30-hour battery life with USB-PD quick charging.",
    "price": 486000,
    "compare_at_price": 540000,
    "condition": "Brand New",
    "stock": 11,
    "sku": "SONY-XM5-BLK",
    "rating": 4.9,
    "review_count": 84,
    "sales_count": 165,
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": true,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Sony Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-25T10:00:00Z",
    "updated_at": "2026-06-25T10:00:00Z"
  },
  {
    "id": "prod-19",
    "name": "Anker 20,000mAh Power Bank (30W USB-C PD)",
    "slug": "anker-power-bank-20000mah",
    "brand": "Anker",
    "model": "Anker 535 PowerCore 20K (A1366)",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Power Banks",
    "short_description": "30W bidirectional USB-C Power Delivery, 20,000mAh capacity, multi-device charging across 3 ports.",
    "description": "Anker 20,000mAh portable power bank (74Wh) equipped with 30W PowerIQ 3.0 USB-C bidirectional fast charging, capable of powering phones, tablets, and lightweight USB-C laptops such as MacBook Air. Features dual USB-A ports + single USB-C port, MultiProtect safety temperature control system, LED power level indicator, and trickle-charging mode for earbuds.",
    "price": 58500,
    "compare_at_price": 65000,
    "condition": "Brand New",
    "stock": 35,
    "sku": "ANK-PB-20K-30W-BLK",
    "rating": 4.7,
    "review_count": 76,
    "sales_count": 130,
    "images": [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": true,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "18 Months Anker Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-17T10:00:00Z",
    "updated_at": "2026-07-17T10:00:00Z"
  },
  {
    "id": "prod-25",
    "name": "Apple Magic Keyboard for iPad Pro 12.9\"",
    "slug": "apple-magic-keyboard-ipad-pro",
    "brand": "Apple",
    "model": "Magic Keyboard 12.9\"",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Keyboards & Cases",
    "short_description": "Floating cantilever magnetic design, full-size backlit scissor keyboard, glass multi-touch trackpad, USB-C port.",
    "description": "Apple Magic Keyboard for iPad Pro 12.9-inch (3rd through 6th generations). Features a floating cantilever magnetic design allowing smooth viewing angle adjustment, full-size backlit scissor mechanism keys with 1mm travel for comfortable typing, integrated multi-touch glass trackpad for iPadOS cursor navigation, USB-C pass-through charging port, and front/back protective folio coverage.",
    "price": 440000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 10,
    "sku": "APL-MK-129-BLK-MJQK3",
    "rating": 4.7,
    "review_count": 29,
    "sales_count": 70,
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-19T10:00:00Z",
    "updated_at": "2026-07-19T10:00:00Z"
  },
  {
    "id": "prod-26",
    "name": "Anker 65W GaN II 3-Port Fast Wall Charger",
    "slug": "usb-c-fast-charger-65w",
    "brand": "Anker",
    "model": "Anker 735 Charger (GaNPrime 65W / A2668)",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Fast Wall Chargers",
    "short_description": "GaN II compact fast charger, 65W max output, 2x USB-C + 1x USB-A ports, powers laptops, phones, and tablets.",
    "description": "Anker 65W GaN II 3-port fast wall charger with PowerIQ 3.0 and ActiveShield 2.0 safety temperature monitoring. Delivers up to 65W high-speed charging via a single USB-C port to fast-charge MacBooks, Dell XPS, HP laptops, iPhones, and Galaxy devices. Intelligent dynamic power distribution across 2x USB-C and 1x USB-A ports allows charging 3 devices simultaneously from an ultra-compact adapter.",
    "price": 42000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 40,
    "sku": "ANK-CHG-65W-GAN-BLK",
    "rating": 4.6,
    "review_count": 54,
    "sales_count": 92,
    "images": [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "18 Months Anker Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-20T10:00:00Z",
    "updated_at": "2026-07-20T10:00:00Z"
  },
  {
    "id": "prod-93",
    "name": "Apple AirPods Max Wireless ANC Headphones (USB-C)",
    "slug": "apple-airpods-max-usb-c",
    "brand": "Apple",
    "model": "AirPods Max (USB-C Edition)",
    "processor": "Apple H1 chip in each ear cup",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Over-Ear Headphones",
    "short_description": "Custom acoustic design, Active Noise Cancellation with Transparency mode, Personalized Spatial Audio, USB-C.",
    "description": "Apple AirPods Max features custom 40mm dynamic drivers, computational audio powered by Apple H1 chips in each ear cup, industry-leading Active Noise Cancellation with Transparency Mode, breathable knit mesh canopy, memory foam acoustically engineered ear cushions, precision Digital Crown volume/track control, and USB-C audio and charging with up to 20 hours battery life.",
    "price": 820000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 6,
    "sku": "APL-APMAX-USBC-SLV",
    "rating": 4.8,
    "review_count": 36,
    "sales_count": 55,
    "images": [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-28T10:00:00Z",
    "updated_at": "2026-07-28T10:00:00Z"
  },
  {
    "id": "prod-94",
    "name": "Samsung Galaxy Buds2 Pro (24-bit Hi-Fi Audio)",
    "slug": "samsung-galaxy-buds2-pro",
    "brand": "Samsung",
    "model": "Galaxy Buds2 Pro (SM-R510)",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "True Wireless Earbuds",
    "short_description": "24-bit Hi-Fi studio sound, intelligent ANC with 3 high SNR mics, 360 Audio with Direct Multi-channel, IPX7.",
    "description": "Samsung Galaxy Buds2 Pro provides premium studio-grade sound with 24-bit Hi-Fi processing over the Samsung Seamless Codec. Features Intelligent Active Noise Cancellation that tracks and eliminates outside noise using 3 high SNR microphones, Voice Detect that automatically switches to Ambient sound when speaking, ergonomic 15% smaller aerodynamically vented fit, 360 Audio with head tracking, and IPX7 water resistance.",
    "price": 210000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 18,
    "sku": "SAM-BUDS2P-GRA",
    "rating": 4.7,
    "review_count": 62,
    "sales_count": 140,
    "images": [
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Samsung Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-10T10:00:00Z",
    "updated_at": "2026-07-10T10:00:00Z"
  },
  {
    "id": "prod-95",
    "name": "Sony WF-1000XM5 True Wireless Noise-Canceling Earbuds",
    "slug": "sony-wf-1000xm5-earbuds",
    "brand": "Sony",
    "model": "WF-1000XM5",
    "processor": "Integrated Processor V2 + HD Noise Canceling Processor QN2e",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "True Wireless Earbuds",
    "short_description": "Dynamic Driver X for rich vocals, dual processor ANC, bone conduction sensors for crystal-clear calling.",
    "description": "Sony WF-1000XM5 earbuds set the industry standard for noise cancelation and sound precision. Engineered with newly developed Dynamic Driver X, dual processors (QN2e and V2) with 6 microphones, Hi-Res Audio wireless via LDAC, AI-based noise reduction algorithm with bone conduction voice pickup, multipoint connection, touch controls, IPX4 splash resistance, and up to 24 hours total battery with wireless charging.",
    "price": 340000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 12,
    "sku": "SONY-WFXM5-BLK",
    "rating": 4.8,
    "review_count": 53,
    "sales_count": 110,
    "images": [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Sony Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-13T10:00:00Z",
    "updated_at": "2026-07-13T10:00:00Z"
  },
  {
    "id": "prod-96",
    "name": "Bose QuietComfort 45 Wireless Noise Cancelling Headphones",
    "slug": "bose-quietcomfort-45",
    "brand": "Bose",
    "model": "QuietComfort 45 (QC45)",
    "category_id": "cat-7",
    "category_slug": "speakers",
    "subcategory": "Wireless Headphones",
    "short_description": "Iconic Bose Quiet and Aware modes, TriPort acoustic architecture, 22 hours battery, plush synthetic leather.",
    "description": "Bose QuietComfort 45 headphones combine legendary noise cancellation with world-class acoustic architecture and lightweight comfort. Features Quiet Mode for total silencing of external noise, Aware Mode to hear surroundings, TriPort acoustic headphone structure, volume-optimized active EQ for consistent bass and treble balance, 22 hours of battery life, and USB-C fast charging (15-min charge gives 3 hours).",
    "price": 420000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 9,
    "sku": "BOSE-QC45-BLK",
    "rating": 4.8,
    "review_count": 48,
    "sales_count": 95,
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Bose Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-06T10:00:00Z",
    "updated_at": "2026-07-06T10:00:00Z"
  },
  {
    "id": "prod-97",
    "name": "oraimo 27,000mAh Massive Power Multi-Device Power Bank",
    "slug": "oraimo-27000mah-power-bank",
    "brand": "oraimo",
    "model": "OPB-P271D Traveler 3 Byte",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Power Banks",
    "short_description": "27,000mAh mega capacity, Anifast intelligent charging, dual USB outputs, LED digital battery percentage display.",
    "description": "oraimo 27,000mAh Traveler 3 Byte heavy-duty power bank is built for uninterrupted multi-day power on the go. Equipped with AniFast fast-charging intelligence that detects and matches connected device protocols, accurate LED numerical battery percentage display, high-intensity LED torch emergency flashlight, dual high-speed USB output ports, Type-C + Micro-USB dual inputs, and multi-protection safety IC.",
    "price": 34000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 50,
    "sku": "ORA-PB-27K-BLK",
    "rating": 4.7,
    "review_count": 145,
    "sales_count": 480,
    "images": [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year oraimo Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-15T10:00:00Z",
    "updated_at": "2026-06-15T10:00:00Z"
  },
  {
    "id": "prod-98",
    "name": "TP-Link Archer AX73 Dual-Band Gigabit Wi-Fi 6 Router",
    "slug": "tp-link-archer-ax73-router",
    "brand": "TP-Link",
    "model": "Archer AX73 (AX5400)",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Networking & Routers",
    "short_description": "AX5400 Dual-Band Wi-Fi 6 (4804 Mbps on 5GHz + 574 Mbps on 2.4GHz), 6 high-gain antennas with Beamforming.",
    "description": "TP-Link Archer AX73 delivers blazing Gigabit Wi-Fi 6 speeds up to 5400 Mbps. Equipped with 6 external high-gain antennas with beamforming and 4T4R structure for maximum whole-home coverage, 1.5GHz Triple-Core CPU, OFDMA and 4x4 MU-MIMO supporting 200+ connected devices, USB 3.0 port for private media cloud storage, and TP-Link HomeShield comprehensive network security.",
    "price": 145000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 15,
    "sku": "TPL-AX73-AX5400",
    "rating": 4.8,
    "review_count": 52,
    "sales_count": 110,
    "images": [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year TP-Link Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-04T10:00:00Z",
    "updated_at": "2026-07-04T10:00:00Z"
  },
  {
    "id": "prod-99",
    "name": "Huawei 4G LTE Mobile Wi-Fi MiFi Router (E5577)",
    "slug": "huawei-4g-mifi-router-e5577",
    "brand": "Huawei",
    "model": "E5577-320 (Unlocked 4G LTE)",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Networking & Routers",
    "short_description": "Unlocked for MTN, Airtel, Glo, 9mobile; 150 Mbps download speed, connects up to 16 devices, LCD screen.",
    "description": "Huawei E5577 is a universal unlocked pocket 4G LTE mobile Wi-Fi hotspot router compatible with all Nigerian networks (MTN, Airtel, Glo, 9mobile). Features LTE Cat4 up to 150 Mbps download speeds, TFT-LCD status screen showing battery and data usage, connects up to 16 Wi-Fi devices simultaneously, and 1500mAh removable rechargeable battery providing 6 hours continuous working time.",
    "price": 52000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 28,
    "sku": "HUW-MIFI-E5577",
    "rating": 4.7,
    "review_count": 88,
    "sales_count": 260,
    "images": [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Huawei Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-22T10:00:00Z",
    "updated_at": "2026-06-22T10:00:00Z"
  },
  {
    "id": "prod-100",
    "name": "TP-Link Deco X50 AX3000 Whole Home Mesh Wi-Fi 6 (3-Pack)",
    "slug": "tp-link-deco-x50-mesh-3pack",
    "brand": "TP-Link",
    "model": "Deco X50 (3-Pack AX3000)",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Networking & Routers",
    "short_description": "Covers up to 6,500 sq ft, AX3000 Wi-Fi 6 speeds, 3x Gigabit ports per unit, seamless AI-driven roaming.",
    "description": "Eliminate Wi-Fi dead zones across large duplexes and compounds with TP-Link Deco X50 (3-Pack). Delivers AX3000 Wi-Fi 6 speeds (2402 Mbps on 5GHz + 574 Mbps on 2.4GHz) covering up to 6,500 sq ft with seamless single-network roaming. Features AI-Driven Mesh algorithms that learn your network environment, 3x Gigabit auto-sensing ports per Deco unit with wired backhaul support, and connects up to 150 devices.",
    "price": 320000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 7,
    "sku": "TPL-DECO-X50-3PK",
    "rating": 4.9,
    "review_count": 34,
    "sales_count": 65,
    "images": [
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "2 Year TP-Link Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-20T10:00:00Z",
    "updated_at": "2026-07-20T10:00:00Z"
  },
  {
    "id": "prod-101",
    "name": "Samsung T7 Shield 1TB Rugged Portable SSD (USB 3.2 Gen 2)",
    "slug": "samsung-t7-shield-1tb-ssd",
    "brand": "Samsung",
    "model": "T7 Shield 1TB (MU-PE1T0S)",
    "storage": "1TB NVMe PCIe SSD",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "External Storage",
    "short_description": "1,050 MB/s transfer speed, IP65 water/dust resistance, 3-meter drop durability, hardware AES 256-bit encryption.",
    "description": "Samsung T7 Shield 1TB portable SSD delivers high-speed performance in a ruggedized elastomeric outer shell. Features read/write speeds up to 1,050 / 1,000 MB/s over USB 3.2 Gen 2 (9.5x faster than external HDDs), IP65 rated water and dust resistance, 3-meter drop resistance, Dynamic Thermal Guard temperature control, and cross-platform compatibility with PC, Mac, Android, iPad, and gaming consoles.",
    "price": 165000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 22,
    "sku": "SAM-T7S-1TB-BLK",
    "rating": 4.9,
    "review_count": 78,
    "sales_count": 180,
    "images": [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "3 Year Samsung Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-08T10:00:00Z",
    "updated_at": "2026-07-08T10:00:00Z"
  },
  {
    "id": "prod-102",
    "name": "SanDisk 2TB Extreme Portable NVMe SSD (1050MB/s)",
    "slug": "sandisk-2tb-extreme-portable-ssd",
    "brand": "SanDisk",
    "model": "Extreme Portable SSD V2 (SDSSDE61-2T00)",
    "storage": "2TB NVMe PCIe SSD",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "External Storage",
    "short_description": "2TB NVMe performance (1050MB/s read, 1000MB/s write), IP65 water/dust resistance, carabiner loop.",
    "description": "SanDisk 2TB Extreme Portable SSD is engineered for content creators, photographers, and professionals demanding high-capacity rugged storage. Delivering NVMe solid-state speeds up to 1050MB/s read and 1000MB/s write in a portable drive featuring up to 3-meter drop protection, IP65 water and dust resistance, a durable silicone shell with handy carabiner loop, and 256‐bit AES hardware encryption.",
    "price": 260000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 14,
    "sku": "SD-EXT-2TB-NVME",
    "rating": 4.8,
    "review_count": 65,
    "sales_count": 140,
    "images": [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "5 Year SanDisk Limited Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-03T10:00:00Z",
    "updated_at": "2026-07-03T10:00:00Z"
  },
  {
    "id": "prod-103",
    "name": "Western Digital WD My Passport 2TB External Hard Drive",
    "slug": "wd-my-passport-2tb-external-hdd",
    "brand": "Western Digital",
    "model": "WD My Passport 2TB (WDBYFT0020BBK)",
    "storage": "2TB HDD",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "External Storage",
    "short_description": "2TB portable backup drive, SuperSpeed USB 3.2 Gen 1, WD Backup software, 256-bit AES password protection.",
    "description": "Western Digital WD My Passport 2TB portable external hard drive offers high-capacity backup storage for photos, videos, music, and documents. Features SuperSpeed USB 3.2 Gen 1 (USB 3.0) connectivity, included WD Discovery software for automated backup scheduling, 256-bit AES hardware encryption with password protection, and shock-tolerant casing.",
    "price": 95000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 25,
    "sku": "WD-MYPASS-2TB-BLK",
    "rating": 4.7,
    "review_count": 92,
    "sales_count": 240,
    "images": [
      "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "3 Year Western Digital Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-18T10:00:00Z",
    "updated_at": "2026-06-18T10:00:00Z"
  },
  {
    "id": "prod-104",
    "name": "SanDisk Ultra Dual Drive Luxe 128GB USB Type-C Flash Drive",
    "slug": "sandisk-ultra-dual-drive-luxe-128gb",
    "brand": "SanDisk",
    "model": "SDDDC4-128G-G46",
    "storage": "128GB Flash",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Flash Drives",
    "short_description": "2-in-1 all-metal swivel flash drive with USB Type-C and Type-A connectors, 400MB/s high-speed read.",
    "description": "SanDisk Ultra Dual Drive Luxe 128GB is an all-metal 2-in-1 flash drive featuring reversible USB Type-C and traditional USB Type-A connectors. Effortlessly move files between USB Type-C smartphones (iPhone 15/16, Samsung Galaxy, Pixel), tablets, MacBooks, and traditional USB-A laptops at read speeds up to 400MB/s with stylish swivel design.",
    "price": 24000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 60,
    "sku": "SD-LUXE-128G-OTG",
    "rating": 4.8,
    "review_count": 160,
    "sales_count": 510,
    "images": [
      "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "5 Year SanDisk Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-06-25T10:00:00Z",
    "updated_at": "2026-06-25T10:00:00Z"
  },
  {
    "id": "prod-105",
    "name": "LG UltraGear 27\" QHD 165Hz IPS Gaming Monitor (27GP850)",
    "slug": "lg-ultragear-27-qhd-gaming-monitor",
    "brand": "LG",
    "model": "27GP850-B UltraGear",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Monitors & Displays",
    "short_description": "27\" QHD (2560x1440) Nano IPS 1ms (GtG), 165Hz (O/C 180Hz), NVIDIA G-SYNC & AMD FreeSync Premium.",
    "description": "LG UltraGear 27GP850-B is the definitive esports gaming monitor. Featuring a 27-inch QHD (2560 x 1440) Nano IPS panel with 1ms GtG response time, DCI-P3 98% color gamut with VESA DisplayHDR 400, 165Hz refresh rate (overclockable to 180Hz), official NVIDIA G-SYNC Compatible and AMD FreeSync Premium certifications, 3-side virtually borderless design, and height/tilt/pivot adjustable ergonomic stand.",
    "price": 420000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 8,
    "sku": "LG-UG-27GP850",
    "rating": 4.9,
    "review_count": 44,
    "sales_count": 85,
    "images": [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year LG Nigeria Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-05T10:00:00Z",
    "updated_at": "2026-07-05T10:00:00Z"
  },
  {
    "id": "prod-106",
    "name": "Dell UltraSharp 27\" 4K USB-C Hub Monitor (U2723QE)",
    "slug": "dell-ultrasharp-27-4k-monitor-u2723qe",
    "brand": "Dell",
    "model": "UltraSharp U2723QE",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Monitors & Displays",
    "short_description": "27\" 4K UHD IPS Black technology (2000:1 contrast), 90W USB-C PD hub, RJ45 Ethernet, 100% sRGB & 98% DCI-P3.",
    "description": "Dell UltraSharp 27 4K USB-C Hub Monitor (U2723QE) is the world’s first monitor with IPS Black technology, delivering phenomenal 2000:1 contrast ratio with deeper blacks and exceptional color accuracy across 100% sRGB and 98% DCI-P3. Functions as a full docking hub with single-cable 90W USB-C laptop power delivery, RJ-45 Ethernet, KVM switch, Picture-by-Picture, and Daisy Chain DisplayPort MST support.",
    "price": 780000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 5,
    "sku": "DELL-U2723QE-4K",
    "rating": 4.9,
    "review_count": 32,
    "sales_count": 60,
    "images": [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": true,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "3 Year Dell Advanced Exchange Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-08T10:00:00Z",
    "updated_at": "2026-07-08T10:00:00Z"
  },
  {
    "id": "prod-107",
    "name": "Logitech MX Master 3S Wireless Performance Mouse",
    "slug": "logitech-mx-master-3s-mouse",
    "brand": "Logitech",
    "model": "MX Master 3S",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Mice & Keyboards",
    "short_description": "8,000 DPI Darkfield track-on-glass sensor, Quiet Clicks (90% noise reduction), MagSpeed electromagnetic scroll.",
    "description": "Logitech MX Master 3S is an iconic performance mouse redesigned for precision and tactile silence. Features Quiet Clicks delivering 90% less click noise, 8,000 DPI Darkfield sensor that tracks seamlessly on any surface including glass, MagSpeed electromagnetic scroll wheel (scrolls 1,000 lines per second), ergonomic thumb rest with thumb wheel, Flow cross-computer control, and USB-C 70-day battery life.",
    "price": 135000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 20,
    "sku": "LOGI-MXM3S-GRF",
    "rating": 4.9,
    "review_count": 85,
    "sales_count": 220,
    "images": [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Logitech Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-12T10:00:00Z",
    "updated_at": "2026-07-12T10:00:00Z"
  },
  {
    "id": "prod-108",
    "name": "Logitech MX Keys S Advanced Wireless Illuminated Keyboard",
    "slug": "logitech-mx-keys-s-keyboard",
    "brand": "Logitech",
    "model": "MX Keys S (Graphite)",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Mice & Keyboards",
    "short_description": "Perfect Stroke spherically-dished keys, smart proximity backlighting, Smart Actions automation macros.",
    "description": "Logitech MX Keys S is a full-size low-profile wireless keyboard crafted for fluid, fast, and quiet typing. Features spherically-dished Perfect Stroke keys that match your fingertips, smart proximity sensor backlighting that illuminates when your hands approach, Smart Actions macros via Logi Options+, multi-device Easy-Switch pairing across Windows, macOS, Linux, and iOS, and USB-C rechargeable battery.",
    "price": 155000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 16,
    "sku": "LOGI-MXKEYS-S-GRF",
    "rating": 4.8,
    "review_count": 67,
    "sales_count": 180,
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Logitech Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-12T10:00:00Z",
    "updated_at": "2026-07-12T10:00:00Z"
  },
  {
    "id": "prod-109",
    "name": "Logitech Brio 4K Ultra HD Pro Webcam with HDR & Windows Hello",
    "slug": "logitech-brio-4k-webcam",
    "brand": "Logitech",
    "model": "Brio 4K Pro Webcam (V-U0040)",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Webcams & Peripherals",
    "short_description": "Ultra 4K 30fps / 1080p 60fps video, RightLight 3 with HDR, adjustable 90° FOV, Windows Hello facial recognition.",
    "description": "Logitech Brio 4K is the premier business webcam for streaming, video conferencing, and broadcasting. Features Ultra 4K resolution at 30 fps (or Full HD 1080p at 60 fps), RightLight 3 with HDR technology for perfect exposure in low light and direct sunlight, dual omnidirectional noise-canceling microphones, customizable field of view (65°, 78°, 90°), and optical infrared facial recognition for instant Windows Hello login.",
    "price": 220000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 12,
    "sku": "LOGI-BRIO-4K-PRO",
    "rating": 4.8,
    "review_count": 56,
    "sales_count": 140,
    "images": [
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "2 Year Logitech Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-06T10:00:00Z",
    "updated_at": "2026-07-06T10:00:00Z"
  },
  {
    "id": "prod-147",
    "name": "Fujifilm X-T5 Mirrorless Digital Camera Body (Black)",
    "slug": "fujifilm-x-t5-mirrorless-camera",
    "brand": "Fujifilm",
    "model": "X-T5 (Body Only)",
    "processor": "X-Processor 5 with Deep Learning AI",
    "category_id": "cat-8",
    "category_slug": "cameras",
    "subcategory": "Mirrorless Cameras",
    "short_description": "40.2MP X-Trans CMOS 5 HR sensor, 5-axis 7.0-stop IBIS, 6.2K 30p internal video, classic analog dial operation.",
    "description": "Fujifilm X-T5 features a high-resolution 40.2MP back-illuminated X-Trans CMOS 5 HR sensor paired with the high-speed X-Processor 5. Offers 5-axis in-body image stabilization (IBIS) providing up to 7.0 stops of compensation, 6.2K 30p 4:2:2 10-bit internal video recording, Pixel Shift Multi-Shot producing 160MP composite images, 1/180,000 sec electronic shutter, 19 Film Simulation modes, and dual UHS-II SD card slots.",
    "price": 2450000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 3,
    "sku": "FUJI-XT5-BODY-BLK",
    "rating": 4.9,
    "review_count": 31,
    "sales_count": 48,
    "images": [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Fujifilm Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-22T10:00:00Z",
    "updated_at": "2026-07-22T10:00:00Z"
  },
  {
    "id": "prod-148",
    "name": "GoPro HERO12 Black Action Camera",
    "slug": "gopro-hero12-black",
    "brand": "GoPro",
    "model": "HERO12 Black (CHDHX-121-RW)",
    "processor": "GP2 Processor",
    "category_id": "cat-8",
    "category_slug": "cameras",
    "subcategory": "Action Cameras",
    "short_description": "5.3K 60fps / 4K 120fps video, HyperSmooth 6.0 stabilization with 360° Horizon Lock, waterproof to 33ft (10m).",
    "description": "GoPro HERO12 Black delivers high image quality with HDR 5.3K and 4K video recording, upgraded HyperSmooth 6.0 video stabilization with 360-degree Horizon Lock, Bluetooth audio support for wireless microphones and AirPods, dual LCD screens (front and rear), 2x longer continuous recording time via improved power management, and rugged waterproof construction down to 33ft (10m) without a housing.",
    "price": 520000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 15,
    "sku": "GOPRO-H12-BLK",
    "rating": 4.8,
    "review_count": 58,
    "sales_count": 130,
    "images": [
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year GoPro Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-16T10:00:00Z",
    "updated_at": "2026-07-16T10:00:00Z"
  },
  {
    "id": "prod-149",
    "name": "Apple Studio Display 27\" 5K Retina (Tilt-Adjustable Stand)",
    "slug": "apple-studio-display-27-5k",
    "brand": "Apple",
    "model": "Studio Display (MK0U3)",
    "processor": "Apple A13 Bionic chip",
    "category_id": "cat-2",
    "category_slug": "laptops",
    "subcategory": "Monitors & Displays",
    "short_description": "27\" 5K Retina display (5120 x 2880), 12MP Ultra Wide camera with Center Stage, studio-quality 6-speaker array.",
    "description": "Apple Studio Display features an expansive 27-inch 5K Retina screen with 5120 x 2880 resolution, 600 nits brightness, P3 wide color, and True Tone technology. Powered by an internal Apple A13 Bionic chip powering the 12MP Ultra Wide camera with Center Stage, studio-quality 3-mic array, and six-speaker sound system with Spatial Audio. Includes 1x Thunderbolt 3 upstream port (delivers 96W host charging) and 3x USB-C downstream ports.",
    "price": 2650000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 4,
    "sku": "APL-STUDIO-DISP-27",
    "rating": 4.9,
    "review_count": 24,
    "sales_count": 38,
    "images": [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "1 Year Apple Official Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-08T10:00:00Z",
    "updated_at": "2026-07-08T10:00:00Z"
  },
  {
    "id": "prod-150",
    "name": "Keychron K2 Wireless Mechanical Keyboard (RGB Aluminum)",
    "slug": "keychron-k2-wireless-keyboard",
    "brand": "Keychron",
    "model": "K2 Version 2 (Hot-Swappable)",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "Mice & Keyboards",
    "short_description": "75% compact layout (84 keys), Gateron G Pro Brown switches, Bluetooth 5.1 & Type-C wired, 4000mAh battery.",
    "description": "Keychron K2 is a 75% compact (84-key) wireless mechanical keyboard engineered for Mac and Windows productivity. Features pre-lubed Gateron G Pro Brown tactile mechanical switches, hot-swappable switch sockets, aluminum frame with double-shot keycaps, RGB backlighting with 18 lighting modes, Bluetooth 5.1 connection for up to 3 devices, Type-C wired mode, and a large 4000mAh rechargeable battery (up to 240 hours typing without backlight).",
    "price": 125000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 20,
    "sku": "KEY-K2V2-BRN-ALU",
    "rating": 4.8,
    "review_count": 62,
    "sales_count": 165,
    "images": [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_active": true,
    "warranty": "1 Year Keychron Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-20T10:00:00Z",
    "updated_at": "2026-07-20T10:00:00Z"
  },
  {
    "id": "prod-151",
    "name": "Kingston XS2000 1TB Pocket Portable SSD (2000MB/s)",
    "slug": "kingston-xs2000-1tb-portable-ssd",
    "brand": "Kingston",
    "model": "XS2000 1TB (SXS2000/1000G)",
    "storage": "1TB Portable SSD",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "External Storage",
    "short_description": "USB 3.2 Gen 2x2 speeds up to 2000MB/s read/write, ultra-compact pocket size with removable rubber sleeve, IP55.",
    "description": "Kingston XS2000 1TB portable SSD utilizes USB 3.2 Gen 2x2 speeds to deliver performance up to 2000MB/s read and 2000MB/s write. Weighing just 29g and fitting in the palm of your hand, it features an IP55 water and dust resistance rating with its included removable rubber protective sleeve, shock resistance, and plug-and-play operation across PC, Mac, Linux, Android, and gaming consoles.",
    "price": 145000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 25,
    "sku": "KNG-XS2000-1TB",
    "rating": 4.8,
    "review_count": 49,
    "sales_count": 110,
    "images": [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "5 Year Kingston Limited Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-14T10:00:00Z",
    "updated_at": "2026-07-14T10:00:00Z"
  },
  {
    "id": "prod-152",
    "name": "Western Digital WD My Passport 4TB External Hard Drive",
    "slug": "wd-my-passport-4tb-external-hdd",
    "brand": "Western Digital",
    "model": "WD My Passport 4TB (WDBPKJ0040BBK)",
    "storage": "4TB HDD",
    "category_id": "cat-10",
    "category_slug": "accessories",
    "subcategory": "External Storage",
    "short_description": "4TB high-capacity backup drive, SuperSpeed USB 3.2 Gen 1, WD Backup software, 256-bit AES encryption.",
    "description": "Western Digital WD My Passport 4TB portable hard drive provides storage capacity for massive video libraries, photo collections, work files, and system backups. Features SuperSpeed USB 3.2 Gen 1 connectivity, WD Backup automated backup utilities, 256-bit AES hardware encryption with password protection, and shock-resistant compact build.",
    "price": 165000,
    "compare_at_price": null,
    "condition": "Brand New",
    "stock": 18,
    "sku": "WD-MYPASS-4TB-BLK",
    "rating": 4.8,
    "review_count": 67,
    "sales_count": 175,
    "images": [
      "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=1000&q=80"
    ],
    "is_featured": false,
    "is_flash_deal": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_active": true,
    "warranty": "3 Year Western Digital Warranty",
    "delivery_info": "Nationwide delivery in 1-3 business days",
    "created_at": "2026-07-06T10:00:00Z",
    "updated_at": "2026-07-06T10:00:00Z"
  }
];

export const mockBanners: Banner[] = [
  {
    id: 'ban-1',
    title: 'Certified Pre-Owned. Professionally Inspected.',
    subtitle: 'Every pre-owned product is bench-tested, graded, and backed by a 6-month warranty with full diagnostic certificate.',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80',
    cta_text: 'Shop Pre-Owned',
    cta_link: '/products?condition=pre-owned',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'ban-2',
    title: 'Flagship New Arrivals Are Here.',
    subtitle: 'The latest phones, laptops, and smart gadgets from Apple, Samsung, Dell, and top brands — 100% authentic with manufacturer warranty.',
    image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1600&q=80',
    cta_text: 'Explore New Arrivals',
    cta_link: '/products?sort=newest',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'ban-3',
    title: 'Limited Flash Deals — Verified Savings.',
    subtitle: 'Promotional discounts on premium electronics and home appliances. While limited promotional stocks last.',
    image_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1600&q=80',
    cta_text: 'Shop Flash Deals',
    cta_link: '/products?filter=flash-deals',
    sort_order: 3,
    is_active: true,
  },
];

export const mockCoupons: Coupon[] = [
  { id: 'cou-1', code: 'WELCOME10', type: 'percent', value: 10, min_order: 100000, max_discount: 50000, usage_limit: 1000, used_count: 0, is_active: true, expires_at: '2026-12-31T23:59:59Z' },
  { id: 'cou-2', code: 'FLASH20', type: 'percent', value: 5, min_order: 500000, max_discount: 100000, usage_limit: 500, used_count: 0, is_active: true, expires_at: '2026-12-31T23:59:59Z' },
  { id: 'cou-3', code: 'SAVE50K', type: 'fixed', value: 50000, min_order: 1000000, max_discount: null, usage_limit: 100, used_count: 0, is_active: true, expires_at: '2026-12-31T23:59:59Z' },
];

export const mockSettings: Settings = {
  site_name: 'BuyAndSellOutlets',
  whatsapp_number: '+2348000000000',
  free_shipping_threshold: '100000',
  flat_shipping_rate: '3500',
  currency: 'NGN',
  currency_symbol: '₦',
  contact_email: 'support@buyandselloutlets.com',
  contact_phone: '+234 800 000 0000',
  address: '12 Adeola Odeku Street, Victoria Island, Lagos, Nigeria',
};

export const mockReviews: Review[] = [
  { id: 'rev-1', product_id: 'prod-1', user_id: 'demo', author_name: 'Adaeze O.', rating: 5, title: 'Outstanding iPhone 16 Pro Max!', comment: 'Camera Control and battery life on this iPhone 16 Pro Max are incredible. Delivered next day to Ikeja in sealed original box with Apple warranty valid.', is_approved: true, created_at: '2026-07-20T10:00:00Z' },
  { id: 'rev-2', product_id: 'prod-2', user_id: 'demo', author_name: 'Ibrahim K.', rating: 5, title: 'Galaxy AI is a game changer', comment: 'The S24 Ultra display is completely reflection-free with Gorilla Armor. S Pen and camera zoom are best in class. Genuine Nigerian warranty registered smoothly.', is_approved: true, created_at: '2026-07-18T10:00:00Z' },
  { id: 'rev-3', product_id: 'prod-3', user_id: 'demo', author_name: 'Chioma N.', rating: 5, title: 'Immaculate pre-owned condition', comment: 'Battery health was exactly 94% as described and the titanium frame looks untouched. The 48-point inspection certificate provided total peace of mind.', is_approved: true, created_at: '2026-07-15T10:00:00Z' },
  { id: 'rev-4', product_id: 'prod-4', user_id: 'demo', author_name: 'Emeka O.', rating: 5, title: 'Best camera phone on Android', comment: 'Pixel 8 Pro photos in low light beat everything else. The temperature sensor and Magic Editor work flawlessly on 5G here in Lagos.', is_approved: true, created_at: '2026-07-19T10:00:00Z' },
  { id: 'rev-5', product_id: 'prod-5', user_id: 'demo', author_name: 'Tunde A.', rating: 5, title: 'M4 Pro powerhouse', comment: 'Video editing in 4K ProRes on this 24GB M4 Pro is buttery smooth. The Space Black finish does not show fingerprints. Incredible machine for software developers.', is_approved: true, created_at: '2026-07-16T10:00:00Z' },
  { id: 'rev-6', product_id: 'prod-10', user_id: 'demo', author_name: 'Funke B.', rating: 5, title: 'Stunning 4K QLED picture', comment: 'Colors pop and the 120Hz refresh rate makes PlayStation 5 gaming ultra responsive. Setup and Lagos delivery took less than 24 hours.', is_approved: true, created_at: '2026-07-14T10:00:00Z' },
  { id: 'rev-7', product_id: 'prod-11', user_id: 'demo', author_name: 'Kunle D.', rating: 5, title: 'PS5 Slim Disc is top notch', comment: 'The extra internal SSD capacity is great. Smaller footprint fits nicely on my media console. Came brand new in sealed box.', is_approved: true, created_at: '2026-07-15T10:00:00Z' },
  { id: 'rev-8', product_id: 'prod-13', user_id: 'demo', author_name: 'Blessing M.', rating: 5, title: 'Massive sound from Charge 5', comment: 'Deep bass and crystal clear vocals. Lasts the entire weekend on one charge and charges my phone too during beach trips.', is_approved: true, created_at: '2026-07-17T10:00:00Z' },
  { id: 'rev-9', product_id: 'prod-16', user_id: 'demo', author_name: 'Nnamdi U.', rating: 5, title: 'Super quiet and low energy', comment: 'Cools a large living room within 10 minutes and runs effortlessly on my generator with GenCool mode.', is_approved: true, created_at: '2026-07-10T10:00:00Z' },
  { id: 'rev-10', product_id: 'prod-17', user_id: 'demo', author_name: 'David K.', rating: 5, title: 'Best noise cancellation ever', comment: 'The Sony WH-1000XM5 headphones completely block out airplane and generator noise. Extremely comfortable for long work sessions.', is_approved: true, created_at: '2026-07-06T10:00:00Z' },
];

export const mockSpecs: Record<string, ProductSpec[]> = {
  "iphone-16-pro-max-256gb": [
    {
      "id": "s-prod-1-1",
      "product_id": "prod-1",
      "spec_key": "Display",
      "spec_value": "6.9\" Super Retina XDR OLED, 2868 x 1320, 120Hz ProMotion, 2000 nits peak",
      "sort_order": 1
    },
    {
      "id": "s-prod-1-2",
      "product_id": "prod-1",
      "spec_key": "Chip",
      "spec_value": "Apple A18 Pro (6-core CPU, 6-core GPU, 16-core Neural Engine)",
      "sort_order": 2
    },
    {
      "id": "s-prod-1-3",
      "product_id": "prod-1",
      "spec_key": "Storage & RAM",
      "spec_value": "256GB NVMe, 8GB Unified RAM",
      "sort_order": 3
    },
    {
      "id": "s-prod-1-4",
      "product_id": "prod-1",
      "spec_key": "Camera System",
      "spec_value": "48MP Fusion (24mm, f/1.78, OIS) + 48MP Ultra Wide + 12MP 5x Telephoto",
      "sort_order": 4
    },
    {
      "id": "s-prod-1-5",
      "product_id": "prod-1",
      "spec_key": "Video Recording",
      "spec_value": "4K 120 fps Dolby Vision, ProRes log, spatial video",
      "sort_order": 5
    },
    {
      "id": "s-prod-1-6",
      "product_id": "prod-1",
      "spec_key": "Chassis & Durability",
      "spec_value": "Grade 5 Titanium with Ceramic Shield front, IP68 water resistance",
      "sort_order": 6
    },
    {
      "id": "s-prod-1-7",
      "product_id": "prod-1",
      "spec_key": "Battery & Charging",
      "spec_value": "Up to 33 hours video playback, MagSafe 25W fast wireless charging",
      "sort_order": 7
    }
  ],
  "samsung-galaxy-s24-ultra": [
    {
      "id": "s-prod-2-1",
      "product_id": "prod-2",
      "spec_key": "Display",
      "spec_value": "6.8\" QHD+ Dynamic AMOLED 2X, 3120 x 1440, 1-120Hz LTPO, Gorilla Armor (2600 nits)",
      "sort_order": 1
    },
    {
      "id": "s-prod-2-2",
      "product_id": "prod-2",
      "spec_key": "Processor",
      "spec_value": "Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm Octa-core)",
      "sort_order": 2
    },
    {
      "id": "s-prod-2-3",
      "product_id": "prod-2",
      "spec_key": "Memory & Storage",
      "spec_value": "12GB LPDDR5X RAM, 256GB UFS 4.0 Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-2-4",
      "product_id": "prod-2",
      "spec_key": "Rear Cameras",
      "spec_value": "200MP Wide OIS + 50MP 5x Telephoto OIS + 10MP 3x Telephoto + 12MP Ultra-Wide",
      "sort_order": 4
    },
    {
      "id": "s-prod-2-5",
      "product_id": "prod-2",
      "spec_key": "AI Features",
      "spec_value": "Galaxy AI: Circle to Search, Live Translate, Interpreter, Note Assist, Generative Edit",
      "sort_order": 5
    },
    {
      "id": "s-prod-2-6",
      "product_id": "prod-2",
      "spec_key": "Battery & S Pen",
      "spec_value": "5000 mAh, 45W wired, 15W wireless fast charge, integrated Bluetooth S Pen",
      "sort_order": 6
    },
    {
      "id": "s-prod-2-7",
      "product_id": "prod-2",
      "spec_key": "Materials",
      "spec_value": "Titanium frame with IP68 dust/water resistance",
      "sort_order": 7
    }
  ],
  "iphone-15-pro-256gb-preowned": [
    {
      "id": "s-prod-3-1",
      "product_id": "prod-3",
      "spec_key": "Display",
      "spec_value": "6.1\" Super Retina XDR OLED, 2556 x 1179, 120Hz ProMotion, 2000 nits",
      "sort_order": 1
    },
    {
      "id": "s-prod-3-2",
      "product_id": "prod-3",
      "spec_key": "Processor",
      "spec_value": "Apple A17 Pro (6-core CPU, 6-core GPU with Hardware Ray Tracing)",
      "sort_order": 2
    },
    {
      "id": "s-prod-3-3",
      "product_id": "prod-3",
      "spec_key": "Memory & Storage",
      "spec_value": "8GB RAM, 256GB NVMe Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-3-4",
      "product_id": "prod-3",
      "spec_key": "Battery Health",
      "spec_value": "94% original battery health capacity verified",
      "sort_order": 4
    },
    {
      "id": "s-prod-3-5",
      "product_id": "prod-3",
      "spec_key": "Port",
      "spec_value": "USB-C supporting USB 3 (up to 10Gbps data transfer) and DisplayPort",
      "sort_order": 5
    },
    {
      "id": "s-prod-3-6",
      "product_id": "prod-3",
      "spec_key": "Camera",
      "spec_value": "48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto OIS",
      "sort_order": 6
    }
  ],
  "google-pixel-8-pro": [
    {
      "id": "s-prod-4-1",
      "product_id": "prod-4",
      "spec_key": "Display",
      "spec_value": "6.7\" Super Actua LTPO OLED, 2992 x 1344, 1-120Hz, 2400 nits peak, Gorilla Glass Victus 2",
      "sort_order": 1
    },
    {
      "id": "s-prod-4-2",
      "product_id": "prod-4",
      "spec_key": "Processor",
      "spec_value": "Google Tensor G3 with Titan M2 security coprocessor",
      "sort_order": 2
    },
    {
      "id": "s-prod-4-3",
      "product_id": "prod-4",
      "spec_key": "Memory & Storage",
      "spec_value": "12GB LPDDR5X RAM, 128GB UFS 3.1 Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-4-4",
      "product_id": "prod-4",
      "spec_key": "Triple Rear Camera",
      "spec_value": "50MP Octa PD Wide + 48MP Quad PD Ultra-Wide with Macro + 48MP 5x Telephoto",
      "sort_order": 4
    },
    {
      "id": "s-prod-4-5",
      "product_id": "prod-4",
      "spec_key": "AI Photography",
      "spec_value": "Best Take, Magic Editor, Audio Magic Eraser, Ultra HDR, Night Sight Video",
      "sort_order": 5
    },
    {
      "id": "s-prod-4-6",
      "product_id": "prod-4",
      "spec_key": "Sensor & Battery",
      "spec_value": "Infrared Object Temperature Sensor, 5050 mAh battery, 30W fast charge",
      "sort_order": 6
    }
  ],
  "iphone-16-pro-128gb": [
    {
      "id": "s-prod-28-1",
      "product_id": "prod-28",
      "spec_key": "Display",
      "spec_value": "6.3\" Super Retina XDR OLED, 2622 x 1206, 120Hz ProMotion, 2000 nits",
      "sort_order": 1
    },
    {
      "id": "s-prod-28-2",
      "product_id": "prod-28",
      "spec_key": "Processor",
      "spec_value": "Apple A18 Pro (6-core CPU, 6-core GPU, 16-core Neural Engine)",
      "sort_order": 2
    },
    {
      "id": "s-prod-28-3",
      "product_id": "prod-28",
      "spec_key": "Storage & RAM",
      "spec_value": "128GB Storage, 8GB Unified RAM",
      "sort_order": 3
    },
    {
      "id": "s-prod-28-4",
      "product_id": "prod-28",
      "spec_key": "Cameras",
      "spec_value": "48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto",
      "sort_order": 4
    },
    {
      "id": "s-prod-28-5",
      "product_id": "prod-28",
      "spec_key": "Port",
      "spec_value": "USB-C supporting USB 3 (up to 10Gbps)",
      "sort_order": 5
    }
  ],
  "iphone-16-128gb": [
    {
      "id": "s-prod-29-1",
      "product_id": "prod-29",
      "spec_key": "Display",
      "spec_value": "6.1\" Super Retina XDR OLED, 2556 x 1179, 2000 nits peak",
      "sort_order": 1
    },
    {
      "id": "s-prod-29-2",
      "product_id": "prod-29",
      "spec_key": "Processor",
      "spec_value": "Apple A18 (6-core CPU, 5-core GPU, 16-core NPU)",
      "sort_order": 2
    },
    {
      "id": "s-prod-29-3",
      "product_id": "prod-29",
      "spec_key": "Storage & RAM",
      "spec_value": "128GB Storage, 8GB RAM",
      "sort_order": 3
    },
    {
      "id": "s-prod-29-4",
      "product_id": "prod-29",
      "spec_key": "Cameras",
      "spec_value": "48MP Fusion + 12MP Ultra Wide (with Macro & Spatial Photo)",
      "sort_order": 4
    }
  ],
  "iphone-14-128gb-preowned": [
    {
      "id": "s-prod-30-1",
      "product_id": "prod-30",
      "spec_key": "Display",
      "spec_value": "6.1\" Super Retina XDR OLED, 2532 x 1170, True Tone",
      "sort_order": 1
    },
    {
      "id": "s-prod-30-2",
      "product_id": "prod-30",
      "spec_key": "Processor",
      "spec_value": "Apple A15 Bionic (6-core CPU, 5-core GPU)",
      "sort_order": 2
    },
    {
      "id": "s-prod-30-3",
      "product_id": "prod-30",
      "spec_key": "Storage & RAM",
      "spec_value": "128GB Storage, 6GB RAM",
      "sort_order": 3
    },
    {
      "id": "s-prod-30-4",
      "product_id": "prod-30",
      "spec_key": "Battery Health",
      "spec_value": "89% original battery capacity verified",
      "sort_order": 4
    }
  ],
  "samsung-galaxy-z-fold6-256gb": [
    {
      "id": "s-prod-31-1",
      "product_id": "prod-31",
      "spec_key": "Main Display",
      "spec_value": "7.6\" Dynamic AMOLED 2X Folding Screen, 2160 x 1856, 120Hz LTPO, 2600 nits",
      "sort_order": 1
    },
    {
      "id": "s-prod-31-2",
      "product_id": "prod-31",
      "spec_key": "Cover Display",
      "spec_value": "6.3\" Dynamic AMOLED 2X, 2376 x 968, 120Hz, Gorilla Glass Victus 2",
      "sort_order": 2
    },
    {
      "id": "s-prod-31-3",
      "product_id": "prod-31",
      "spec_key": "Processor",
      "spec_value": "Qualcomm Snapdragon 8 Gen 3 for Galaxy",
      "sort_order": 3
    },
    {
      "id": "s-prod-31-4",
      "product_id": "prod-31",
      "spec_key": "RAM & Storage",
      "spec_value": "12GB RAM, 256GB UFS 4.0",
      "sort_order": 4
    },
    {
      "id": "s-prod-31-5",
      "product_id": "prod-31",
      "spec_key": "Cameras",
      "spec_value": "50MP Wide OIS + 10MP 3x Telephoto OIS + 12MP Ultra Wide",
      "sort_order": 5
    }
  ],
  "samsung-galaxy-z-flip6-256gb": [
    {
      "id": "s-prod-32-1",
      "product_id": "prod-32",
      "spec_key": "Main Screen",
      "spec_value": "6.7\" FHD+ Dynamic AMOLED 2X, 2640 x 1080, 1-120Hz LTPO (2600 nits)",
      "sort_order": 1
    },
    {
      "id": "s-prod-32-2",
      "product_id": "prod-32",
      "spec_key": "Cover Screen",
      "spec_value": "3.4\" Super AMOLED 60Hz FlexWindow (720 x 748)",
      "sort_order": 2
    },
    {
      "id": "s-prod-32-3",
      "product_id": "prod-32",
      "spec_key": "Processor & RAM",
      "spec_value": "Snapdragon 8 Gen 3 for Galaxy, 12GB RAM, 256GB Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-32-4",
      "product_id": "prod-32",
      "spec_key": "Cameras",
      "spec_value": "50MP Wide OIS (2x in-sensor zoom) + 12MP Ultra-Wide",
      "sort_order": 4
    },
    {
      "id": "s-prod-32-5",
      "product_id": "prod-32",
      "spec_key": "Battery",
      "spec_value": "4000 mAh with 25W fast wired and 15W wireless charging",
      "sort_order": 5
    }
  ],
  "samsung-galaxy-a55-5g-128gb": [
    {
      "id": "s-prod-33-1",
      "product_id": "prod-33",
      "spec_key": "Display",
      "spec_value": "6.6\" Super AMOLED FHD+, 120Hz, 1000 nits HBM, Gorilla Glass Victus+",
      "sort_order": 1
    },
    {
      "id": "s-prod-33-2",
      "product_id": "prod-33",
      "spec_key": "Processor",
      "spec_value": "Samsung Exynos 1480 (4nm Octa-core) with AMD Xclipse 530 GPU",
      "sort_order": 2
    },
    {
      "id": "s-prod-33-3",
      "product_id": "prod-33",
      "spec_key": "Memory",
      "spec_value": "8GB RAM, 128GB Storage (MicroSD up to 1TB)",
      "sort_order": 3
    },
    {
      "id": "s-prod-33-4",
      "product_id": "prod-33",
      "spec_key": "Cameras",
      "spec_value": "50MP OIS Main + 12MP Ultra-Wide + 5MP Macro, 32MP Selfie",
      "sort_order": 4
    },
    {
      "id": "s-prod-33-5",
      "product_id": "prod-33",
      "spec_key": "Build & Battery",
      "spec_value": "Metal Frame, IP67 dust/water resistance, 5000 mAh battery (25W charge)",
      "sort_order": 5
    }
  ],
  "samsung-galaxy-a15-128gb": [
    {
      "id": "s-prod-34-1",
      "product_id": "prod-34",
      "spec_key": "Display",
      "spec_value": "6.5\" Super AMOLED FHD+, 90Hz, 800 nits, Eye Comfort Shield",
      "sort_order": 1
    },
    {
      "id": "s-prod-34-2",
      "product_id": "prod-34",
      "spec_key": "Processor",
      "spec_value": "MediaTek Helio G99 (6nm Octa-core)",
      "sort_order": 2
    },
    {
      "id": "s-prod-34-3",
      "product_id": "prod-34",
      "spec_key": "RAM & Storage",
      "spec_value": "4GB RAM, 128GB Storage (MicroSD expandable up to 1TB)",
      "sort_order": 3
    },
    {
      "id": "s-prod-34-4",
      "product_id": "prod-34",
      "spec_key": "Rear Cameras",
      "spec_value": "50MP Main + 5MP Ultra-Wide + 2MP Macro, 13MP Front",
      "sort_order": 4
    },
    {
      "id": "s-prod-34-5",
      "product_id": "prod-34",
      "spec_key": "Battery",
      "spec_value": "5000 mAh battery with 25W Super Fast Charging",
      "sort_order": 5
    }
  ],
  "google-pixel-9-pro-xl": [
    {
      "id": "s-prod-35-1",
      "product_id": "prod-35",
      "spec_key": "Display",
      "spec_value": "6.8\" Super Actua LTPO OLED (1344 x 2992), 1-120Hz, 3000 nits peak, Gorilla Glass Victus 2",
      "sort_order": 1
    },
    {
      "id": "s-prod-35-2",
      "product_id": "prod-35",
      "spec_key": "Processor",
      "spec_value": "Google Tensor G4 with Titan M2 security chip",
      "sort_order": 2
    },
    {
      "id": "s-prod-35-3",
      "product_id": "prod-35",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB LPDDR5X RAM, 128GB UFS 3.1 Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-35-4",
      "product_id": "prod-35",
      "spec_key": "Cameras",
      "spec_value": "50MP Wide OIS + 48MP Ultra-Wide Macro + 48MP 5x Telephoto OIS (30x Super Res Zoom)",
      "sort_order": 4
    },
    {
      "id": "s-prod-35-5",
      "product_id": "prod-35",
      "spec_key": "Front Camera",
      "spec_value": "42MP Dual PD Selfie with Autofocus & 103° ultrawide FOV",
      "sort_order": 5
    },
    {
      "id": "s-prod-35-6",
      "product_id": "prod-35",
      "spec_key": "AI & Updates",
      "spec_value": "Gemini Live, Add Me, Pixel Studio, 7 years OS & security feature drops",
      "sort_order": 6
    }
  ],
  "google-pixel-8a-128gb": [
    {
      "id": "s-prod-36-1",
      "product_id": "prod-36",
      "spec_key": "Display",
      "spec_value": "6.1\" Actua OLED FHD+ (1080 x 2400), 120Hz, 2000 nits peak, Gorilla Glass 3",
      "sort_order": 1
    },
    {
      "id": "s-prod-36-2",
      "product_id": "prod-36",
      "spec_key": "Processor",
      "spec_value": "Google Tensor G3 with Titan M2 security",
      "sort_order": 2
    },
    {
      "id": "s-prod-36-3",
      "product_id": "prod-36",
      "spec_key": "Memory & Storage",
      "spec_value": "8GB LPDDR5x RAM, 128GB UFS 3.1",
      "sort_order": 3
    },
    {
      "id": "s-prod-36-4",
      "product_id": "prod-36",
      "spec_key": "Cameras",
      "spec_value": "64MP Quad PD Wide OIS + 13MP Ultra-Wide, 13MP Selfie",
      "sort_order": 4
    },
    {
      "id": "s-prod-36-5",
      "product_id": "prod-36",
      "spec_key": "Battery",
      "spec_value": "4492 mAh battery with 18W wired and Qi wireless charging",
      "sort_order": 5
    }
  ],
  "xiaomi-14-ultra-512gb": [
    {
      "id": "s-prod-37-1",
      "product_id": "prod-37",
      "spec_key": "Display",
      "spec_value": "6.73\" WQHD+ (3200 x 1440) LTPO AMOLED, 1-120Hz, 3000 nits, Dolby Vision, HDR10+",
      "sort_order": 1
    },
    {
      "id": "s-prod-37-2",
      "product_id": "prod-37",
      "spec_key": "Processor",
      "spec_value": "Qualcomm Snapdragon 8 Gen 3 (4nm) with IceLoop liquid cooling",
      "sort_order": 2
    },
    {
      "id": "s-prod-37-3",
      "product_id": "prod-37",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB LPDDR5X RAM, 512GB UFS 4.0 Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-37-4",
      "product_id": "prod-37",
      "spec_key": "Quad Leica Cameras",
      "spec_value": "50MP 1-inch LYT-900 (f/1.63-f/4.0 OIS) + 50MP 3.2x Tele + 50MP 5x Periscope + 50MP Ultra-Wide",
      "sort_order": 4
    },
    {
      "id": "s-prod-37-5",
      "product_id": "prod-37",
      "spec_key": "Video Capabilities",
      "spec_value": "8K @ 30fps on all 4 rear cameras, 4K 120fps slow motion, 10-bit Log recording",
      "sort_order": 5
    },
    {
      "id": "s-prod-37-6",
      "product_id": "prod-37",
      "spec_key": "Battery & Charging",
      "spec_value": "5000 mAh, 90W wired HyperCharge (100% in 33m), 80W wireless HyperCharge",
      "sort_order": 6
    }
  ],
  "redmi-note-13-pro-plus-5g": [
    {
      "id": "s-prod-38-1",
      "product_id": "prod-38",
      "spec_key": "Display",
      "spec_value": "6.67\" Curved 1.5K (2712 x 1220) AMOLED, 120Hz, 1800 nits, Dolby Vision, Victus glass",
      "sort_order": 1
    },
    {
      "id": "s-prod-38-2",
      "product_id": "prod-38",
      "spec_key": "Processor",
      "spec_value": "MediaTek Dimensity 7200-Ultra (4nm Octa-core up to 2.8GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-38-3",
      "product_id": "prod-38",
      "spec_key": "Memory & Storage",
      "spec_value": "12GB RAM, 256GB UFS 3.1",
      "sort_order": 3
    },
    {
      "id": "s-prod-38-4",
      "product_id": "prod-38",
      "spec_key": "Camera",
      "spec_value": "200MP Main (1/1.4\" OIS, 4x lossless zoom) + 8MP Ultra-Wide + 2MP Macro",
      "sort_order": 4
    },
    {
      "id": "s-prod-38-5",
      "product_id": "prod-38",
      "spec_key": "Charging & IP",
      "spec_value": "120W HyperCharge (100% in 19 mins), IP68 water & dust resistance",
      "sort_order": 5
    }
  ],
  "redmi-13c-128gb": [
    {
      "id": "s-prod-39-1",
      "product_id": "prod-39",
      "spec_key": "Display",
      "spec_value": "6.74\" HD+ (1600 x 720) IPS, 90Hz, 600 nits HBM, Corning Gorilla Glass",
      "sort_order": 1
    },
    {
      "id": "s-prod-39-2",
      "product_id": "prod-39",
      "spec_key": "Processor",
      "spec_value": "MediaTek Helio G85 12nm Octa-core",
      "sort_order": 2
    },
    {
      "id": "s-prod-39-3",
      "product_id": "prod-39",
      "spec_key": "Memory & Storage",
      "spec_value": "6GB RAM (+6GB Extended RAM), 128GB Storage (MicroSD up to 1TB)",
      "sort_order": 3
    },
    {
      "id": "s-prod-39-4",
      "product_id": "prod-39",
      "spec_key": "Cameras",
      "spec_value": "50MP AI Main (f/1.8) + 2MP Macro + Auxiliary lens, 8MP Selfie",
      "sort_order": 4
    },
    {
      "id": "s-prod-39-5",
      "product_id": "prod-39",
      "spec_key": "Battery",
      "spec_value": "5000 mAh with 18W Type-C fast charging",
      "sort_order": 5
    }
  ],
  "oneplus-12-256gb": [
    {
      "id": "s-prod-40-1",
      "product_id": "prod-40",
      "spec_key": "Display",
      "spec_value": "6.82\" 2K (3168 x 1440) ProXDR LTPO AMOLED, 1-120Hz, 4500 nits, Dolby Vision, Victus 2",
      "sort_order": 1
    },
    {
      "id": "s-prod-40-2",
      "product_id": "prod-40",
      "spec_key": "Processor",
      "spec_value": "Qualcomm Snapdragon 8 Gen 3 (4nm) with Dual Cryo-velocity VC",
      "sort_order": 2
    },
    {
      "id": "s-prod-40-3",
      "product_id": "prod-40",
      "spec_key": "Memory & Storage",
      "spec_value": "12GB LPDDR5X RAM, 256GB UFS 4.0 Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-40-4",
      "product_id": "prod-40",
      "spec_key": "Hasselblad Cameras",
      "spec_value": "50MP LYT-808 OIS + 64MP 3x Periscope OIS (120x zoom) + 48MP Ultra-Wide",
      "sort_order": 4
    },
    {
      "id": "s-prod-40-5",
      "product_id": "prod-40",
      "spec_key": "Battery & Charging",
      "spec_value": "5400 mAh, 100W SUPERVOOC (1-100% in 26m), 50W AIRVOOC wireless",
      "sort_order": 5
    }
  ],
  "oneplus-nord-4-5g": [
    {
      "id": "s-prod-41-1",
      "product_id": "prod-41",
      "spec_key": "Display",
      "spec_value": "6.74\" 1.5K (2772 x 1240) AMOLED, 120Hz Ultra, 2150 nits, Aqua Touch",
      "sort_order": 1
    },
    {
      "id": "s-prod-41-2",
      "product_id": "prod-41",
      "spec_key": "Processor",
      "spec_value": "Snapdragon 7+ Gen 3 (4nm Octa-core with generative AI capabilities)",
      "sort_order": 2
    },
    {
      "id": "s-prod-41-3",
      "product_id": "prod-41",
      "spec_key": "RAM & Storage",
      "spec_value": "12GB LPDDR5X RAM, 256GB UFS 4.0 Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-41-4",
      "product_id": "prod-41",
      "spec_key": "Cameras",
      "spec_value": "50MP Sony LYT-600 OIS (f/1.8) + 8MP Ultra-Wide, 16MP Selfie",
      "sort_order": 4
    },
    {
      "id": "s-prod-41-5",
      "product_id": "prod-41",
      "spec_key": "Build & Battery",
      "spec_value": "Full Metal unibody (7.99mm thin), 5500 mAh battery, 100W SUPERVOOC",
      "sort_order": 5
    }
  ],
  "tecno-phantom-v-fold2-512gb": [
    {
      "id": "s-prod-42-1",
      "product_id": "prod-42",
      "spec_key": "Main Display",
      "spec_value": "7.85\" 2K+ (2296 x 2000) 120Hz LTPO AMOLED Folding Screen, 1600 nits",
      "sort_order": 1
    },
    {
      "id": "s-prod-42-2",
      "product_id": "prod-42",
      "spec_key": "Cover Display",
      "spec_value": "6.42\" FHD+ (2550 x 1080) 120Hz AMOLED, Gorilla Glass Victus",
      "sort_order": 2
    },
    {
      "id": "s-prod-42-3",
      "product_id": "prod-42",
      "spec_key": "Processor",
      "spec_value": "MediaTek Dimensity 9000+ (4nm Octa-core up to 3.2GHz)",
      "sort_order": 3
    },
    {
      "id": "s-prod-42-4",
      "product_id": "prod-42",
      "spec_key": "Memory & Storage",
      "spec_value": "12GB RAM (+12GB Extended RAM), 512GB UFS 3.1 Storage",
      "sort_order": 4
    },
    {
      "id": "s-prod-42-5",
      "product_id": "prod-42",
      "spec_key": "Cameras",
      "spec_value": "50MP Main OIS + 50MP 2x Portrait Telephoto + 50MP Ultra-Wide",
      "sort_order": 5
    },
    {
      "id": "s-prod-42-6",
      "product_id": "prod-42",
      "spec_key": "Battery & Charging",
      "spec_value": "5750 mAh Aircell battery, 70W Ultra Charge (100% in 45m), 15W wireless",
      "sort_order": 6
    }
  ],
  "tecno-camon-30-pro-5g": [
    {
      "id": "s-prod-43-1",
      "product_id": "prod-43",
      "spec_key": "Display",
      "spec_value": "6.78\" 1.5K (2780 x 1264) AMOLED, 144Hz, 1300 nits peak, Wet Hand Touch",
      "sort_order": 1
    },
    {
      "id": "s-prod-43-2",
      "product_id": "prod-43",
      "spec_key": "Processor",
      "spec_value": "MediaTek Dimensity 8200 Ultimate (4nm Octa-core)",
      "sort_order": 2
    },
    {
      "id": "s-prod-43-3",
      "product_id": "prod-43",
      "spec_key": "RAM & Storage",
      "spec_value": "12GB RAM (+12GB Extended RAM), 256GB Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-43-4",
      "product_id": "prod-43",
      "spec_key": "Cameras",
      "spec_value": "50MP Sony IMX890 OIS + 50MP Ultra-Wide/Macro + 2MP Depth, 50MP AF Selfie",
      "sort_order": 4
    },
    {
      "id": "s-prod-43-5",
      "product_id": "prod-43",
      "spec_key": "Battery",
      "spec_value": "5000 mAh battery with 70W Ultra Charge (0-100% in 48 mins)",
      "sort_order": 5
    }
  ],
  "tecno-spark-20-pro-plus": [
    {
      "id": "s-prod-44-1",
      "product_id": "prod-44",
      "spec_key": "Display",
      "spec_value": "6.78\" Curved AMOLED FHD+, 120Hz, 1000 nits, Gorilla Glass 5",
      "sort_order": 1
    },
    {
      "id": "s-prod-44-2",
      "product_id": "prod-44",
      "spec_key": "Processor",
      "spec_value": "MediaTek Helio G99 Ultimate (6nm Octa-core)",
      "sort_order": 2
    },
    {
      "id": "s-prod-44-3",
      "product_id": "prod-44",
      "spec_key": "RAM & Storage",
      "spec_value": "8GB RAM (+8GB Extended RAM), 256GB Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-44-4",
      "product_id": "prod-44",
      "spec_key": "Cameras",
      "spec_value": "108MP Ultra-Sensing Main (f/1.75, 3x in-sensor zoom) + Macro, 32MP Selfie",
      "sort_order": 4
    },
    {
      "id": "s-prod-44-5",
      "product_id": "prod-44",
      "spec_key": "Audio & Battery",
      "spec_value": "Stereo Dual Speakers with DTS sound, 5000 mAh with 33W fast charge",
      "sort_order": 5
    }
  ],
  "infinix-gt-20-pro-256gb": [
    {
      "id": "s-prod-45-1",
      "product_id": "prod-45",
      "spec_key": "Display",
      "spec_value": "6.78\" FHD+ AMOLED, 144Hz refresh, 360Hz touch sampling, 1300 nits peak",
      "sort_order": 1
    },
    {
      "id": "s-prod-45-2",
      "product_id": "prod-45",
      "spec_key": "Dual Gaming Chips",
      "spec_value": "MediaTek Dimensity 8200 Ultimate 4nm + Pixelworks X5 Turbo display chip",
      "sort_order": 2
    },
    {
      "id": "s-prod-45-3",
      "product_id": "prod-45",
      "spec_key": "RAM & Storage",
      "spec_value": "12GB LPDDR5X RAM (+12GB Virtual), 256GB UFS 3.1 Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-45-4",
      "product_id": "prod-45",
      "spec_key": "Cooling & Audio",
      "spec_value": "PCM phase change liquid cooling, Sound by JBL dual stereo speakers",
      "sort_order": 4
    },
    {
      "id": "s-prod-45-5",
      "product_id": "prod-45",
      "spec_key": "Battery & Charging",
      "spec_value": "5000 mAh battery, 45W Hyper Charge, Bypass Charging for cool gaming",
      "sort_order": 5
    }
  ],
  "infinix-note-40-pro-5g": [
    {
      "id": "s-prod-46-1",
      "product_id": "prod-46",
      "spec_key": "Display",
      "spec_value": "6.78\" 3D-Curved AMOLED FHD+, 120Hz, 1300 nits peak, Corning Gorilla Glass",
      "sort_order": 1
    },
    {
      "id": "s-prod-46-2",
      "product_id": "prod-46",
      "spec_key": "Processor",
      "spec_value": "MediaTek Dimensity 7020 5G 6nm Octa-core",
      "sort_order": 2
    },
    {
      "id": "s-prod-46-3",
      "product_id": "prod-46",
      "spec_key": "Charging Tech",
      "spec_value": "Cheetah X1 Chip, 45W FastCharge + 20W Wireless MagCharge (MagPad included)",
      "sort_order": 3
    },
    {
      "id": "s-prod-46-4",
      "product_id": "prod-46",
      "spec_key": "Cameras",
      "spec_value": "108MP OIS Super-Zoom (f/1.75, 3x lossless zoom) + 2MP + 2MP, 32MP Selfie",
      "sort_order": 4
    },
    {
      "id": "s-prod-46-5",
      "product_id": "prod-46",
      "spec_key": "Memory & Audio",
      "spec_value": "8GB RAM (+8GB Extended), 256GB Storage, JBL stereo dual speakers",
      "sort_order": 5
    }
  ],
  "nothing-phone-2-256gb": [
    {
      "id": "s-prod-47-1",
      "product_id": "prod-47",
      "spec_key": "Display",
      "spec_value": "6.7\" LTPO OLED (2412 x 1080), 1-120Hz, 1600 nits peak, HDR10+",
      "sort_order": 1
    },
    {
      "id": "s-prod-47-2",
      "product_id": "prod-47",
      "spec_key": "Processor",
      "spec_value": "Qualcomm Snapdragon 8+ Gen 1 (4nm Octa-core)",
      "sort_order": 2
    },
    {
      "id": "s-prod-47-3",
      "product_id": "prod-47",
      "spec_key": "Glyph Interface",
      "spec_value": "33 individually addressable LED zones with Glyph Timer & Essential Notifications",
      "sort_order": 3
    },
    {
      "id": "s-prod-47-4",
      "product_id": "prod-47",
      "spec_key": "Dual 50MP Cameras",
      "spec_value": "50MP Sony IMX890 OIS Main + 50MP Samsung JN1 Ultra-Wide (114° FOV)",
      "sort_order": 4
    },
    {
      "id": "s-prod-47-5",
      "product_id": "prod-47",
      "spec_key": "Battery & Charging",
      "spec_value": "4700 mAh, 45W PPS fast charge (100% in 55m), 15W Qi wireless, 5W reverse",
      "sort_order": 5
    }
  ],
  "nothing-phone-2a-plus": [
    {
      "id": "s-prod-48-1",
      "product_id": "prod-48",
      "spec_key": "Display",
      "spec_value": "6.7\" Flexible AMOLED (1080 x 2412), 120Hz adaptive, 1300 nits peak",
      "sort_order": 1
    },
    {
      "id": "s-prod-48-2",
      "product_id": "prod-48",
      "spec_key": "Processor",
      "spec_value": "MediaTek Dimensity 7350 Pro 5G (4nm Octa-core up to 3.0 GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-48-3",
      "product_id": "prod-48",
      "spec_key": "RAM & Storage",
      "spec_value": "12GB RAM (+8GB RAM Booster), 256GB Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-48-4",
      "product_id": "prod-48",
      "spec_key": "Triple 50MP Cameras",
      "spec_value": "50MP Main OIS + 50MP Ultra-Wide (114°), upgraded 50MP 4K Selfie camera",
      "sort_order": 4
    },
    {
      "id": "s-prod-48-5",
      "product_id": "prod-48",
      "spec_key": "Battery & Speed",
      "spec_value": "5000 mAh battery with 50W fast charging (100% in 56 mins)",
      "sort_order": 5
    }
  ],
  "oppo-find-x7-ultra-256gb": [
    {
      "id": "s-prod-49-1",
      "product_id": "prod-49",
      "spec_key": "Display",
      "spec_value": "6.82\" 2K (3168 x 1440) LTPO AMOLED, 1-120Hz, 4500 nits peak, Dolby Vision",
      "sort_order": 1
    },
    {
      "id": "s-prod-49-2",
      "product_id": "prod-49",
      "spec_key": "Processor",
      "spec_value": "Qualcomm Snapdragon 8 Gen 3 (4nm)",
      "sort_order": 2
    },
    {
      "id": "s-prod-49-3",
      "product_id": "prod-49",
      "spec_key": "RAM & Storage",
      "spec_value": "16GB LPDDR5X, 256GB UFS 4.0",
      "sort_order": 3
    },
    {
      "id": "s-prod-49-4",
      "product_id": "prod-49",
      "spec_key": "Quad 50MP Cameras",
      "spec_value": "50MP 1\" LYT-900 OIS + 50MP 3x Periscope (65mm OIS) + 50MP 6x Periscope (135mm OIS) + 50MP Ultra-Wide",
      "sort_order": 4
    },
    {
      "id": "s-prod-49-5",
      "product_id": "prod-49",
      "spec_key": "Charging",
      "spec_value": "100W SUPERVOOC (100% in 26m), 50W wireless AIRVOOC, IP68 water resistance",
      "sort_order": 5
    }
  ],
  "oppo-reno-12-pro-5g": [
    {
      "id": "s-prod-50-1",
      "product_id": "prod-50",
      "spec_key": "Display",
      "spec_value": "6.7\" Quad-Curved AMOLED (2412 x 1080), 120Hz, 1200 nits, Gorilla Glass 7i",
      "sort_order": 1
    },
    {
      "id": "s-prod-50-2",
      "product_id": "prod-50",
      "spec_key": "Processor",
      "spec_value": "MediaTek Dimensity 7300-Energy (4nm Octa-core)",
      "sort_order": 2
    },
    {
      "id": "s-prod-50-3",
      "product_id": "prod-50",
      "spec_key": "RAM & Storage",
      "spec_value": "12GB LPDDR4X RAM, 256GB UFS 3.1",
      "sort_order": 3
    },
    {
      "id": "s-prod-50-4",
      "product_id": "prod-50",
      "spec_key": "Cameras",
      "spec_value": "50MP Sony LYT-600 OIS + 50MP 2x Telephoto Portrait + 8MP Ultra-Wide, 50MP AF Selfie",
      "sort_order": 4
    },
    {
      "id": "s-prod-50-5",
      "product_id": "prod-50",
      "spec_key": "AI Features",
      "spec_value": "AI Eraser 2.0, AI Best Face, AI Clear Voice, AI Studio",
      "sort_order": 5
    },
    {
      "id": "s-prod-50-6",
      "product_id": "prod-50",
      "spec_key": "Battery",
      "spec_value": "5000 mAh with 80W SUPERVOOC fast charging (1-100% in 46 mins)",
      "sort_order": 6
    }
  ],
  "vivo-x100-pro-256gb": [
    {
      "id": "s-prod-51-1",
      "product_id": "prod-51",
      "spec_key": "Display",
      "spec_value": "6.78\" 1.5K (2800 x 1260) LTPO AMOLED, 1-120Hz, 3000 nits peak, 2160Hz PWM",
      "sort_order": 1
    },
    {
      "id": "s-prod-51-2",
      "product_id": "prod-51",
      "spec_key": "Dual Chips",
      "spec_value": "MediaTek Dimensity 9300 (4nm All-Big-Core) + Vivo V3 6nm Imaging Chip",
      "sort_order": 2
    },
    {
      "id": "s-prod-51-3",
      "product_id": "prod-51",
      "spec_key": "RAM & Storage",
      "spec_value": "16GB LPDDR5X RAM, 256GB UFS 4.0 Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-51-4",
      "product_id": "prod-51",
      "spec_key": "ZEISS Optics",
      "spec_value": "50MP 1\" IMX989 OIS + 50MP ZEISS APO Telephoto OIS (4.3x opt / 100x zoom) + 50MP Ultra-Wide",
      "sort_order": 4
    },
    {
      "id": "s-prod-51-5",
      "product_id": "prod-51",
      "spec_key": "Battery",
      "spec_value": "5400 mAh BlueVolt battery, 100W FlashCharge, 50W wireless, IP68 rating",
      "sort_order": 5
    }
  ],
  "vivo-v30-pro-256gb": [
    {
      "id": "s-prod-52-1",
      "product_id": "prod-52",
      "spec_key": "Display",
      "spec_value": "6.78\" 3D Curved AMOLED 1.5K (2800 x 1260), 120Hz, 2800 nits peak",
      "sort_order": 1
    },
    {
      "id": "s-prod-52-2",
      "product_id": "prod-52",
      "spec_key": "Processor",
      "spec_value": "MediaTek Dimensity 8200 4nm Octa-core",
      "sort_order": 2
    },
    {
      "id": "s-prod-52-3",
      "product_id": "prod-52",
      "spec_key": "RAM & Storage",
      "spec_value": "12GB RAM (+12GB Extended RAM), 256GB Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-52-4",
      "product_id": "prod-52",
      "spec_key": "ZEISS Triple 50MP",
      "spec_value": "50MP Sony IMX920 OIS + 50MP Sony IMX816 2x Portrait + 50MP Ultra-Wide, 50MP AF Selfie",
      "sort_order": 4
    },
    {
      "id": "s-prod-52-5",
      "product_id": "prod-52",
      "spec_key": "Form & Battery",
      "spec_value": "7.45mm ultra-slim body, 5000 mAh battery, 80W FlashCharge (100% in 48 mins)",
      "sort_order": 5
    }
  ],
  "iphone-15-plus-128gb-black": [
    {
      "id": "s-prod-124-1",
      "product_id": "prod-124",
      "spec_key": "Display",
      "spec_value": "6.7\" Super Retina XDR OLED, 2796 x 1290, 2000 nits peak outdoor brightness",
      "sort_order": 1
    },
    {
      "id": "s-prod-124-2",
      "product_id": "prod-124",
      "spec_key": "Processor",
      "spec_value": "Apple A16 Bionic (6-core CPU with 2 performance and 4 efficiency cores, 5-core GPU)",
      "sort_order": 2
    },
    {
      "id": "s-prod-124-3",
      "product_id": "prod-124",
      "spec_key": "Camera System",
      "spec_value": "48MP Main (26mm, f/1.6, sensor-shift OIS) + 12MP Ultra Wide (13mm, f/2.4)",
      "sort_order": 3
    },
    {
      "id": "s-prod-124-4",
      "product_id": "prod-124",
      "spec_key": "Port",
      "spec_value": "USB-C charging and data transfer (USB 2 up to 480Mbps)",
      "sort_order": 4
    },
    {
      "id": "s-prod-124-5",
      "product_id": "prod-124",
      "spec_key": "Battery",
      "spec_value": "Up to 26 hours video playback, MagSafe wireless charging up to 15W",
      "sort_order": 5
    }
  ],
  "samsung-galaxy-z-flip5-preowned": [
    {
      "id": "s-prod-125-1",
      "product_id": "prod-125",
      "spec_key": "Main Display",
      "spec_value": "6.7\" Dynamic AMOLED 2X, 2640 x 1080, 120Hz adaptive, 1750 nits peak",
      "sort_order": 1
    },
    {
      "id": "s-prod-125-2",
      "product_id": "prod-125",
      "spec_key": "Cover Display",
      "spec_value": "3.4\" Super AMOLED Flex Window (720 x 748, 60Hz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-125-3",
      "product_id": "prod-125",
      "spec_key": "Processor",
      "spec_value": "Qualcomm Snapdragon 8 Gen 2 for Galaxy (4nm Octa-core)",
      "sort_order": 3
    },
    {
      "id": "s-prod-125-4",
      "product_id": "prod-125",
      "spec_key": "Hinge & Durability",
      "spec_value": "Armor Aluminum frame, Flex Hinge (zero-gap), IPX8 water resistance",
      "sort_order": 4
    }
  ],
  "google-pixel-7-pro-preowned": [
    {
      "id": "s-prod-126-1",
      "product_id": "prod-126",
      "spec_key": "Display",
      "spec_value": "6.7\" QHD+ (3120 x 1440) LTPO OLED, 120Hz adaptive, 1500 nits",
      "sort_order": 1
    },
    {
      "id": "s-prod-126-2",
      "product_id": "prod-126",
      "spec_key": "Cameras",
      "spec_value": "50MP Octa PD Wide (OIS) + 12MP Ultra Wide with autofocus + 48MP 5x Telephoto",
      "sort_order": 2
    },
    {
      "id": "s-prod-126-3",
      "product_id": "prod-126",
      "spec_key": "Processor & Security",
      "spec_value": "Google Tensor G2 with Titan M2 security coprocessor",
      "sort_order": 3
    },
    {
      "id": "s-prod-126-4",
      "product_id": "prod-126",
      "spec_key": "Battery & Health",
      "spec_value": "5000 mAh battery (93% verified health), fast wireless charging",
      "sort_order": 4
    }
  ],
  "xiaomi-redmi-note-13-128gb": [
    {
      "id": "s-prod-127-1",
      "product_id": "prod-127",
      "spec_key": "Display",
      "spec_value": "6.67\" FHD+ AMOLED (2400 x 1080), 120Hz, 1800 nits peak, Corning Gorilla Glass 3",
      "sort_order": 1
    },
    {
      "id": "s-prod-127-2",
      "product_id": "prod-127",
      "spec_key": "Processor",
      "spec_value": "Qualcomm Snapdragon 685 (6nm Octa-core up to 2.8GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-127-3",
      "product_id": "prod-127",
      "spec_key": "Camera",
      "spec_value": "108MP Main (f/1.75, 3x in-sensor zoom) + 8MP Ultra-Wide + 2MP Macro",
      "sort_order": 3
    },
    {
      "id": "s-prod-127-4",
      "product_id": "prod-127",
      "spec_key": "Battery",
      "spec_value": "5000 mAh with 33W Fast Charging (charger included in box)",
      "sort_order": 4
    }
  ],
  "infinix-zero-30-4g-256gb": [
    {
      "id": "s-prod-128-1",
      "product_id": "prod-128",
      "spec_key": "Display",
      "spec_value": "6.78\" 3D Curved AMOLED (2400 x 1080), 120Hz, 950 nits, Gorilla Glass 5",
      "sort_order": 1
    },
    {
      "id": "s-prod-128-2",
      "product_id": "prod-128",
      "spec_key": "Front Vlog Camera",
      "spec_value": "50MP Auto Focus 2K 30fps Video Recording front camera with flash",
      "sort_order": 2
    },
    {
      "id": "s-prod-128-3",
      "product_id": "prod-128",
      "spec_key": "Rear Cameras",
      "spec_value": "108MP (1/1.67\", OIS) + 2MP + 2MP AI camera",
      "sort_order": 3
    },
    {
      "id": "s-prod-128-4",
      "product_id": "prod-128",
      "spec_key": "Charging",
      "spec_value": "5000 mAh battery with 45W Super Charge (0 to 75% in 30 mins)",
      "sort_order": 4
    }
  ],
  "macbook-pro-14-m4-pro": [
    {
      "id": "s-prod-5-1",
      "product_id": "prod-5",
      "spec_key": "Display",
      "spec_value": "14.2\" Liquid Retina XDR, 3024 x 1964, 1600 nits peak HDR, 120Hz ProMotion",
      "sort_order": 1
    },
    {
      "id": "s-prod-5-2",
      "product_id": "prod-5",
      "spec_key": "Chip",
      "spec_value": "Apple M4 Pro (12-core CPU with 8 performance and 4 efficiency cores, 16-core GPU)",
      "sort_order": 2
    },
    {
      "id": "s-prod-5-3",
      "product_id": "prod-5",
      "spec_key": "Unified Memory",
      "spec_value": "24GB Unified Memory (273GB/s high-speed memory bandwidth)",
      "sort_order": 3
    },
    {
      "id": "s-prod-5-4",
      "product_id": "prod-5",
      "spec_key": "Storage",
      "spec_value": "512GB PCIe Gen 4 NVMe SSD",
      "sort_order": 4
    },
    {
      "id": "s-prod-5-5",
      "product_id": "prod-5",
      "spec_key": "Connectivity Ports",
      "spec_value": "3x Thunderbolt 5 (up to 120Gb/s), HDMI 2.1 port, SDXC card slot, MagSafe 3",
      "sort_order": 5
    },
    {
      "id": "s-prod-5-6",
      "product_id": "prod-5",
      "spec_key": "Battery & Power",
      "spec_value": "Up to 22 hours video playback, 72.4Wh lithium-polymer battery, 70W USB-C adapter",
      "sort_order": 6
    },
    {
      "id": "s-prod-5-7",
      "product_id": "prod-5",
      "spec_key": "Audio & Webcam",
      "spec_value": "Six-speaker sound system with force-cancelling woofers, 12MP Center Stage camera",
      "sort_order": 7
    }
  ],
  "dell-xps-15": [
    {
      "id": "s-prod-6-1",
      "product_id": "prod-6",
      "spec_key": "Display",
      "spec_value": "15.6\" 3.5K (3456 x 2160) OLED InfinityEdge Touch, 400 nits, 100% DCI-P3, DisplayHDR 500",
      "sort_order": 1
    },
    {
      "id": "s-prod-6-2",
      "product_id": "prod-6",
      "spec_key": "Processor",
      "spec_value": "13th Gen Intel Core i7-13700H (14 cores / 20 threads, 24MB cache, up to 5.0 GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-6-3",
      "product_id": "prod-6",
      "spec_key": "Graphics Card",
      "spec_value": "NVIDIA GeForce RTX 4060 8GB GDDR6 (40W TGP)",
      "sort_order": 3
    },
    {
      "id": "s-prod-6-4",
      "product_id": "prod-6",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB DDR5 4800MHz Dual-Channel RAM, 512GB M.2 PCIe Gen 4 NVMe SSD",
      "sort_order": 4
    },
    {
      "id": "s-prod-6-5",
      "product_id": "prod-6",
      "spec_key": "Chassis Materials",
      "spec_value": "CNC machined aluminum in Platinum Silver with black carbon fiber palm rest",
      "sort_order": 5
    },
    {
      "id": "s-prod-6-6",
      "product_id": "prod-6",
      "spec_key": "Ports & Slots",
      "spec_value": "2x Thunderbolt 4 with Power Delivery & DisplayPort, 1x USB-C 3.2 Gen 2, Full-size SD v6.0",
      "sort_order": 6
    },
    {
      "id": "s-prod-6-7",
      "product_id": "prod-6",
      "spec_key": "Battery & Audio",
      "spec_value": "86Wh battery, Waves MaxxAudio Pro quad-speaker design with 8W total output",
      "sort_order": 7
    }
  ],
  "macbook-air-m3-preowned": [
    {
      "id": "s-prod-7-1",
      "product_id": "prod-7",
      "spec_key": "Display",
      "spec_value": "13.6\" Liquid Retina LED-backlit display, 2560 x 1664, 500 nits, True Tone",
      "sort_order": 1
    },
    {
      "id": "s-prod-7-2",
      "product_id": "prod-7",
      "spec_key": "Processor",
      "spec_value": "Apple M3 chip (8-core CPU, 8-core GPU with Hardware Ray Tracing, 16-core NPU)",
      "sort_order": 2
    },
    {
      "id": "s-prod-7-3",
      "product_id": "prod-7",
      "spec_key": "Memory & Storage",
      "spec_value": "8GB Unified Memory (100GB/s bandwidth), 256GB SSD",
      "sort_order": 3
    },
    {
      "id": "s-prod-7-4",
      "product_id": "prod-7",
      "spec_key": "Battery Health",
      "spec_value": "97% verified health (Cycle count: 38 out of 1000 standard lifespan)",
      "sort_order": 4
    },
    {
      "id": "s-prod-7-5",
      "product_id": "prod-7",
      "spec_key": "Form Factor",
      "spec_value": "Fanless silent design, 11.3mm ultra-thin, 1.24 kg lightweight aluminum body",
      "sort_order": 5
    },
    {
      "id": "s-prod-7-6",
      "product_id": "prod-7",
      "spec_key": "Ports & Wireless",
      "spec_value": "MagSafe 3 charging port, 2x Thunderbolt / USB 4 ports, Wi-Fi 6E, Bluetooth 5.3",
      "sort_order": 6
    }
  ],
  "hp-spectre-x360": [
    {
      "id": "s-prod-27-1",
      "product_id": "prod-27",
      "spec_key": "Display",
      "spec_value": "14\" 2.8K (2880 x 1800) OLED Touchscreen, 120Hz VRR, 500 nits HDR, edge-to-edge glass",
      "sort_order": 1
    },
    {
      "id": "s-prod-27-2",
      "product_id": "prod-27",
      "spec_key": "Processor",
      "spec_value": "Intel Core Ultra 7 155H (16 cores, 22 threads, up to 4.8 GHz, Intel AI Boost NPU)",
      "sort_order": 2
    },
    {
      "id": "s-prod-27-3",
      "product_id": "prod-27",
      "spec_key": "Graphics",
      "spec_value": "Intel Arc Graphics with ray tracing and hardware AV1 decoding",
      "sort_order": 3
    },
    {
      "id": "s-prod-27-4",
      "product_id": "prod-27",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB LPDDR5x 7467 MHz onboard, 1TB PCIe Gen4 NVMe M.2 SSD",
      "sort_order": 4
    },
    {
      "id": "s-prod-27-5",
      "product_id": "prod-27",
      "spec_key": "360° Hinge",
      "spec_value": "360-degree gem-cut aluminum hinge: Laptop, Tablet, Tent, and Stand modes",
      "sort_order": 5
    },
    {
      "id": "s-prod-27-6",
      "product_id": "prod-27",
      "spec_key": "Camera & Audio",
      "spec_value": "9MP IR AI camera with auto-framing & privacy shutter, Poly Studio quad speakers with DTS:X",
      "sort_order": 6
    },
    {
      "id": "s-prod-27-7",
      "product_id": "prod-27",
      "spec_key": "Ports & Wireless",
      "spec_value": "2x Thunderbolt 4 (USB-C 40Gbps), 1x USB-A 10Gbps (HP Sleep and Charge), Wi-Fi 7",
      "sort_order": 7
    }
  ],
  "macbook-pro-16-m3-max": [
    {
      "id": "s-prod-53-1",
      "product_id": "prod-53",
      "spec_key": "Display",
      "spec_value": "16.2\" Liquid Retina XDR (3456 x 2234), 120Hz ProMotion, 1600 nits peak",
      "sort_order": 1
    },
    {
      "id": "s-prod-53-2",
      "product_id": "prod-53",
      "spec_key": "Processor",
      "spec_value": "Apple M3 Max (14-core CPU, 30-core GPU, 16-core Neural Engine)",
      "sort_order": 2
    },
    {
      "id": "s-prod-53-3",
      "product_id": "prod-53",
      "spec_key": "Unified Memory",
      "spec_value": "36GB Unified RAM (300GB/s bandwidth)",
      "sort_order": 3
    },
    {
      "id": "s-prod-53-4",
      "product_id": "prod-53",
      "spec_key": "Storage",
      "spec_value": "1TB PCIe Gen 4 SSD",
      "sort_order": 4
    },
    {
      "id": "s-prod-53-5",
      "product_id": "prod-53",
      "spec_key": "Battery",
      "spec_value": "100Wh lithium-polymer battery, 140W USB-C Power Adapter",
      "sort_order": 5
    }
  ],
  "macbook-air-15-m3": [
    {
      "id": "s-prod-54-1",
      "product_id": "prod-54",
      "spec_key": "Display",
      "spec_value": "15.3\" Liquid Retina (2880 x 1864), 500 nits, P3 wide color, True Tone",
      "sort_order": 1
    },
    {
      "id": "s-prod-54-2",
      "product_id": "prod-54",
      "spec_key": "Processor",
      "spec_value": "Apple M3 (8-core CPU, 10-core GPU, 16-core NPU)",
      "sort_order": 2
    },
    {
      "id": "s-prod-54-3",
      "product_id": "prod-54",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB Unified Memory, 512GB SSD",
      "sort_order": 3
    },
    {
      "id": "s-prod-54-4",
      "product_id": "prod-54",
      "spec_key": "Audio",
      "spec_value": "Six-speaker sound system with force-cancelling woofers",
      "sort_order": 4
    },
    {
      "id": "s-prod-54-5",
      "product_id": "prod-54",
      "spec_key": "Chassis",
      "spec_value": "Fanless silent design, 11.5mm thin, 1.51 kg, Midnight finish",
      "sort_order": 5
    }
  ],
  "dell-latitude-5440": [
    {
      "id": "s-prod-55-1",
      "product_id": "prod-55",
      "spec_key": "Display",
      "spec_value": "14.0\" FHD (1920 x 1080) Anti-Glare, Non-Touch, 250 nits",
      "sort_order": 1
    },
    {
      "id": "s-prod-55-2",
      "product_id": "prod-55",
      "spec_key": "Processor",
      "spec_value": "13th Gen Intel Core i5-1335U (10 cores / 12 threads, up to 4.60 GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-55-3",
      "product_id": "prod-55",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB DDR4 3200MHz RAM, 512GB M.2 PCIe NVMe SSD",
      "sort_order": 3
    },
    {
      "id": "s-prod-55-4",
      "product_id": "prod-55",
      "spec_key": "Ports",
      "spec_value": "2x Thunderbolt 4, 2x USB 3.2 Gen 1, HDMI 2.0, RJ-45 Ethernet, Headphone jack",
      "sort_order": 4
    },
    {
      "id": "s-prod-55-5",
      "product_id": "prod-55",
      "spec_key": "Security",
      "spec_value": "Fingerprint Reader in power button, TPM 2.0, Wedge lock slot",
      "sort_order": 5
    }
  ],
  "hp-omen-16-gaming": [
    {
      "id": "s-prod-56-1",
      "product_id": "prod-56",
      "spec_key": "Display",
      "spec_value": "16.1\" QHD (2560 x 1440) IPS, 240Hz, 3ms response, 300 nits, 100% sRGB",
      "sort_order": 1
    },
    {
      "id": "s-prod-56-2",
      "product_id": "prod-56",
      "spec_key": "Processor",
      "spec_value": "AMD Ryzen 7 7840HS (8 cores, 16 threads, 16MB L3 cache, up to 5.1 GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-56-3",
      "product_id": "prod-56",
      "spec_key": "GPU",
      "spec_value": "NVIDIA GeForce RTX 4070 8GB GDDR6 (140W max TGP)",
      "sort_order": 3
    },
    {
      "id": "s-prod-56-4",
      "product_id": "prod-56",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB DDR5 5600MHz RAM, 1TB PCIe Gen4 NVMe TLC M.2 SSD",
      "sort_order": 4
    },
    {
      "id": "s-prod-56-5",
      "product_id": "prod-56",
      "spec_key": "Cooling & Audio",
      "spec_value": "OMEN Tempest Cooling, Dual B&O Speakers with DTS:X Ultra",
      "sort_order": 5
    }
  ],
  "lenovo-thinkpad-x1-carbon-gen-11": [
    {
      "id": "s-prod-57-1",
      "product_id": "prod-57",
      "spec_key": "Display",
      "spec_value": "14.0\" 2.8K (2880 x 1800) OLED, 400 nits, 100% DCI-P3, HDR 500",
      "sort_order": 1
    },
    {
      "id": "s-prod-57-2",
      "product_id": "prod-57",
      "spec_key": "Processor",
      "spec_value": "13th Gen Intel Core i7-1365U vPro (10 cores, up to 5.20 GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-57-3",
      "product_id": "prod-57",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB LPDDR5 6400MHz, 512GB PCIe Gen4 NVMe SSD",
      "sort_order": 3
    },
    {
      "id": "s-prod-57-4",
      "product_id": "prod-57",
      "spec_key": "Build & Weight",
      "spec_value": "Carbon fiber & magnesium body, 1.12 kg ultralight, MIL-STD 810H",
      "sort_order": 4
    },
    {
      "id": "s-prod-57-5",
      "product_id": "prod-57",
      "spec_key": "Ports",
      "spec_value": "2x Thunderbolt 4, 2x USB-A 3.2 Gen 1, HDMI 2.0b, Audio combo",
      "sort_order": 5
    }
  ],
  "lenovo-legion-pro-5-gen-8": [
    {
      "id": "s-prod-58-1",
      "product_id": "prod-58",
      "spec_key": "Display",
      "spec_value": "16\" WQXGA (2560 x 1600) IPS, 240Hz, 500 nits, 100% sRGB, G-SYNC",
      "sort_order": 1
    },
    {
      "id": "s-prod-58-2",
      "product_id": "prod-58",
      "spec_key": "Processor",
      "spec_value": "AMD Ryzen 7 7745HX (8 Cores, 16 Threads, up to 5.1 GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-58-3",
      "product_id": "prod-58",
      "spec_key": "GPU",
      "spec_value": "NVIDIA GeForce RTX 4070 8GB GDDR6 (140W TGP, Boost Clock 2175MHz)",
      "sort_order": 3
    },
    {
      "id": "s-prod-58-4",
      "product_id": "prod-58",
      "spec_key": "RAM & Storage",
      "spec_value": "16GB DDR5 5200MHz, 1TB M.2 PCIe 4.0 SSD",
      "sort_order": 4
    },
    {
      "id": "s-prod-58-5",
      "product_id": "prod-58",
      "spec_key": "Thermals",
      "spec_value": "Legion Coldfront 5.0 with dual 3D blade fans & phase change thermal pads",
      "sort_order": 5
    }
  ],
  "asus-rog-zephyrus-g14": [
    {
      "id": "s-prod-59-1",
      "product_id": "prod-59",
      "spec_key": "Display",
      "spec_value": "14.0\" 3K (2880 x 1800) ROG Nebula OLED, 120Hz, 0.2ms, 500 nits HDR, 100% DCI-P3",
      "sort_order": 1
    },
    {
      "id": "s-prod-59-2",
      "product_id": "prod-59",
      "spec_key": "Processor",
      "spec_value": "AMD Ryzen 9 8945HS (8 cores / 16 threads, 24MB cache, up to 5.2 GHz, Ryzen AI)",
      "sort_order": 2
    },
    {
      "id": "s-prod-59-3",
      "product_id": "prod-59",
      "spec_key": "Graphics",
      "spec_value": "NVIDIA GeForce RTX 4060 8GB GDDR6 (90W TGP with Dynamic Boost)",
      "sort_order": 3
    },
    {
      "id": "s-prod-59-4",
      "product_id": "prod-59",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB LPDDR5X 6400MHz, 1TB PCIe 4.0 NVMe SSD",
      "sort_order": 4
    },
    {
      "id": "s-prod-59-5",
      "product_id": "prod-59",
      "spec_key": "Build & Weight",
      "spec_value": "CNC Machined Aluminum unibody, 1.50 kg, 15.9mm thin",
      "sort_order": 5
    }
  ],
  "asus-zenbook-14-oled": [
    {
      "id": "s-prod-60-1",
      "product_id": "prod-60",
      "spec_key": "Display",
      "spec_value": "14\" 3K (2880 x 1800) OLED, 120Hz, 0.2ms, 600 nits HDR, 100% DCI-P3",
      "sort_order": 1
    },
    {
      "id": "s-prod-60-2",
      "product_id": "prod-60",
      "spec_key": "Processor",
      "spec_value": "Intel Core Ultra 7 155H (16 cores, 22 threads, up to 4.8 GHz, Intel Arc)",
      "sort_order": 2
    },
    {
      "id": "s-prod-60-3",
      "product_id": "prod-60",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB LPDDR5X 7467MHz, 1TB PCIe 4.0 NVMe SSD",
      "sort_order": 3
    },
    {
      "id": "s-prod-60-4",
      "product_id": "prod-60",
      "spec_key": "Weight & Battery",
      "spec_value": "1.20 kg all-metal chassis, 75Wh battery with USB-C Easy Charge",
      "sort_order": 4
    }
  ],
  "acer-predator-helios-16": [
    {
      "id": "s-prod-61-1",
      "product_id": "prod-61",
      "spec_key": "Display",
      "spec_value": "16.0\" WQXGA (2560 x 1600) IPS, 165Hz, 3ms, 500 nits, 100% sRGB, NVIDIA G-SYNC",
      "sort_order": 1
    },
    {
      "id": "s-prod-61-2",
      "product_id": "prod-61",
      "spec_key": "Processor",
      "spec_value": "13th Gen Intel Core i7-13700HX (16 cores, 24 threads, 30MB cache, up to 5.0 GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-61-3",
      "product_id": "prod-61",
      "spec_key": "Graphics",
      "spec_value": "NVIDIA GeForce RTX 4060 8GB GDDR6 (140W max power, MUX Switch)",
      "sort_order": 3
    },
    {
      "id": "s-prod-61-4",
      "product_id": "prod-61",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB DDR5 4800MHz (up to 32GB), 1TB PCIe Gen4 SSD",
      "sort_order": 4
    },
    {
      "id": "s-prod-61-5",
      "product_id": "prod-61",
      "spec_key": "Thermals",
      "spec_value": "5th Gen AeroBlade 3D dual fans with liquid metal thermal compound on CPU",
      "sort_order": 5
    }
  ],
  "microsoft-surface-laptop-7": [
    {
      "id": "s-prod-62-1",
      "product_id": "prod-62",
      "spec_key": "Display",
      "spec_value": "13.8\" PixelSense Flow Touch (2304 x 1536), 120Hz dynamic, 600 nits, Dolby Vision IQ",
      "sort_order": 1
    },
    {
      "id": "s-prod-62-2",
      "product_id": "prod-62",
      "spec_key": "Processor",
      "spec_value": "Snapdragon X Elite (12 cores, 4.0GHz Dual-Core Boost, 45 TOPS NPU)",
      "sort_order": 2
    },
    {
      "id": "s-prod-62-3",
      "product_id": "prod-62",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB LPDDR5x RAM, 512GB Gen 4 Removable SSD",
      "sort_order": 3
    },
    {
      "id": "s-prod-62-4",
      "product_id": "prod-62",
      "spec_key": "Battery",
      "spec_value": "Up to 20 hours of local video playback",
      "sort_order": 4
    },
    {
      "id": "s-prod-62-5",
      "product_id": "prod-62",
      "spec_key": "Ports & Wireless",
      "spec_value": "2x USB-C (USB 4 / DP / Charging), 1x USB-A 3.1, Surface Connect, Wi-Fi 7",
      "sort_order": 5
    }
  ],
  "ipad-pro-12-9-m2": [
    {
      "id": "s-prod-8-1",
      "product_id": "prod-8",
      "spec_key": "Display",
      "spec_value": "12.9\" Liquid Retina XDR mini-LED, 2732 x 2048, 120Hz ProMotion, 1600 nits peak",
      "sort_order": 1
    },
    {
      "id": "s-prod-8-2",
      "product_id": "prod-8",
      "spec_key": "Processor",
      "spec_value": "Apple M2 (8-core CPU, 10-core GPU, 16-core Neural Engine)",
      "sort_order": 2
    },
    {
      "id": "s-prod-8-3",
      "product_id": "prod-8",
      "spec_key": "Memory & Storage",
      "spec_value": "8GB RAM, 128GB High-Speed Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-8-4",
      "product_id": "prod-8",
      "spec_key": "Cameras & Sensors",
      "spec_value": "12MP Wide + 10MP Ultra-Wide, LiDAR Scanner, 12MP TrueDepth front with Face ID",
      "sort_order": 4
    },
    {
      "id": "s-prod-8-5",
      "product_id": "prod-8",
      "spec_key": "Pencil & Keyboard",
      "spec_value": "Apple Pencil 2nd Gen with Hover feature, Magic Keyboard support",
      "sort_order": 5
    },
    {
      "id": "s-prod-8-6",
      "product_id": "prod-8",
      "spec_key": "Port & Expansion",
      "spec_value": "Thunderbolt / USB 4 (up to 40Gb/s) with 6K external monitor output",
      "sort_order": 6
    }
  ],
  "apple-ipad-air-11-m2": [
    {
      "id": "s-prod-18-1",
      "product_id": "prod-18",
      "spec_key": "Display",
      "spec_value": "11\" Liquid Retina LED-backlit, 2360 x 1640, 500 nits, P3 wide color, True Tone, anti-reflective",
      "sort_order": 1
    },
    {
      "id": "s-prod-18-2",
      "product_id": "prod-18",
      "spec_key": "Processor",
      "spec_value": "Apple M2 (8-core CPU with 4 performance and 4 efficiency cores, 9-core GPU, 16-core NPU)",
      "sort_order": 2
    },
    {
      "id": "s-prod-18-3",
      "product_id": "prod-18",
      "spec_key": "Memory & Storage",
      "spec_value": "8GB Unified RAM, 128GB High-Speed Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-18-4",
      "product_id": "prod-18",
      "spec_key": "Cameras",
      "spec_value": "Landscape 12MP Ultra Wide front camera with Center Stage, 12MP Wide rear camera (4K 60fps)",
      "sort_order": 4
    },
    {
      "id": "s-prod-18-5",
      "product_id": "prod-18",
      "spec_key": "Accessories",
      "spec_value": "Compatible with Apple Pencil Pro, Apple Pencil (USB-C), and Magic Keyboard",
      "sort_order": 5
    },
    {
      "id": "s-prod-18-6",
      "product_id": "prod-18",
      "spec_key": "Ports & Wireless",
      "spec_value": "USB-C port with support for DisplayPort 6K @ 60Hz, Wi-Fi 6E, Bluetooth 5.3, Touch ID",
      "sort_order": 6
    }
  ],
  "samsung-galaxy-tab-s9-ultra": [
    {
      "id": "s-prod-24-1",
      "product_id": "prod-24",
      "spec_key": "Display",
      "spec_value": "14.6\" Dynamic AMOLED 2X, 2960 x 1848, 120Hz, HDR10+, Vision Booster, 16:10 aspect",
      "sort_order": 1
    },
    {
      "id": "s-prod-24-2",
      "product_id": "prod-24",
      "spec_key": "Processor",
      "spec_value": "Qualcomm Snapdragon 8 Gen 2 for Galaxy (4nm Octa-core)",
      "sort_order": 2
    },
    {
      "id": "s-prod-24-3",
      "product_id": "prod-24",
      "spec_key": "RAM & Storage",
      "spec_value": "12GB RAM, 256GB Storage (MicroSD expandable up to 1TB)",
      "sort_order": 3
    },
    {
      "id": "s-prod-24-4",
      "product_id": "prod-24",
      "spec_key": "S Pen Included",
      "spec_value": "Included IP68 water/dust resistant S Pen with bidirectional magnetic charging",
      "sort_order": 4
    },
    {
      "id": "s-prod-24-5",
      "product_id": "prod-24",
      "spec_key": "Water & Dust Rating",
      "spec_value": "IP68 certified water and dust resistance (both tablet body & S Pen)",
      "sort_order": 5
    },
    {
      "id": "s-prod-24-6",
      "product_id": "prod-24",
      "spec_key": "Battery & Sound",
      "spec_value": "11,200 mAh battery with 45W Fast Charging, Quad AKG stereo speakers with Dolby Atmos",
      "sort_order": 6
    }
  ],
  "apple-ipad-10th-gen": [
    {
      "id": "s-prod-63-1",
      "product_id": "prod-63",
      "spec_key": "Display",
      "spec_value": "10.9\" Liquid Retina (2360 x 1640), 500 nits, True Tone",
      "sort_order": 1
    },
    {
      "id": "s-prod-63-2",
      "product_id": "prod-63",
      "spec_key": "Processor",
      "spec_value": "Apple A14 Bionic (6-core CPU, 4-core GPU, 16-core NPU)",
      "sort_order": 2
    },
    {
      "id": "s-prod-63-3",
      "product_id": "prod-63",
      "spec_key": "Storage",
      "spec_value": "64GB Flash Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-63-4",
      "product_id": "prod-63",
      "spec_key": "Cameras",
      "spec_value": "Landscape 12MP Ultra Wide front (Center Stage) + 12MP Wide rear (4K 60fps)",
      "sort_order": 4
    },
    {
      "id": "s-prod-63-5",
      "product_id": "prod-63",
      "spec_key": "Port",
      "spec_value": "USB-C for fast charging and accessories",
      "sort_order": 5
    }
  ],
  "samsung-galaxy-tab-s9-fe": [
    {
      "id": "s-prod-64-1",
      "product_id": "prod-64",
      "spec_key": "Display",
      "spec_value": "10.9\" WUXGA+ (2304 x 1440), 90Hz adaptive, Vision Booster",
      "sort_order": 1
    },
    {
      "id": "s-prod-64-2",
      "product_id": "prod-64",
      "spec_key": "Processor",
      "spec_value": "Samsung Exynos 1380 5nm Octa-core",
      "sort_order": 2
    },
    {
      "id": "s-prod-64-3",
      "product_id": "prod-64",
      "spec_key": "Stylus",
      "spec_value": "Included IP68 water/dust resistant S Pen",
      "sort_order": 3
    },
    {
      "id": "s-prod-64-4",
      "product_id": "prod-64",
      "spec_key": "Storage & RAM",
      "spec_value": "6GB RAM, 128GB Storage (MicroSD up to 1TB)",
      "sort_order": 4
    },
    {
      "id": "s-prod-64-5",
      "product_id": "prod-64",
      "spec_key": "Battery",
      "spec_value": "8000 mAh with 45W fast charging support",
      "sort_order": 5
    }
  ],
  "xiaomi-pad-6-128gb": [
    {
      "id": "s-prod-65-1",
      "product_id": "prod-65",
      "spec_key": "Display",
      "spec_value": "11.0\" 2.8K (2880 x 1800) IPS, 144Hz, 550 nits, 309 PPI, Dolby Vision",
      "sort_order": 1
    },
    {
      "id": "s-prod-65-2",
      "product_id": "prod-65",
      "spec_key": "Processor",
      "spec_value": "Qualcomm Snapdragon 870 7nm Octa-core up to 3.2GHz",
      "sort_order": 2
    },
    {
      "id": "s-prod-65-3",
      "product_id": "prod-65",
      "spec_key": "Memory & Storage",
      "spec_value": "8GB LPDDR5 RAM, 128GB UFS 3.1 Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-65-4",
      "product_id": "prod-65",
      "spec_key": "Audio",
      "spec_value": "Quad stereo speakers with Dolby Atmos & Hi-Res Audio",
      "sort_order": 4
    },
    {
      "id": "s-prod-65-5",
      "product_id": "prod-65",
      "spec_key": "Battery",
      "spec_value": "8840 mAh battery with 33W fast charging",
      "sort_order": 5
    }
  ],
  "lenovo-tab-m11-64gb": [
    {
      "id": "s-prod-66-1",
      "product_id": "prod-66",
      "spec_key": "Display",
      "spec_value": "11.0\" WUXGA (1920 x 1200) IPS, 90Hz, 400 nits, 72% NTSC",
      "sort_order": 1
    },
    {
      "id": "s-prod-66-2",
      "product_id": "prod-66",
      "spec_key": "Processor",
      "spec_value": "MediaTek Helio G88 Octa-core",
      "sort_order": 2
    },
    {
      "id": "s-prod-66-3",
      "product_id": "prod-66",
      "spec_key": "Included Accessories",
      "spec_value": "Lenovo Tab Pen + Folio Protective Case",
      "sort_order": 3
    },
    {
      "id": "s-prod-66-4",
      "product_id": "prod-66",
      "spec_key": "Storage & RAM",
      "spec_value": "4GB RAM, 64GB Storage (MicroSD up to 1TB)",
      "sort_order": 4
    },
    {
      "id": "s-prod-66-5",
      "product_id": "prod-66",
      "spec_key": "Audio & Battery",
      "spec_value": "Quad Speakers with Dolby Atmos, 7040 mAh battery (10 hours video)",
      "sort_order": 5
    }
  ],
  "macbook-pro-14-m3": [
    {
      "id": "s-prod-129-1",
      "product_id": "prod-129",
      "spec_key": "Display",
      "spec_value": "14.2\" Liquid Retina XDR (3024 x 1964), 120Hz ProMotion, 1600 nits peak HDR",
      "sort_order": 1
    },
    {
      "id": "s-prod-129-2",
      "product_id": "prod-129",
      "spec_key": "Processor",
      "spec_value": "Apple M3 chip (8-core CPU, 10-core GPU with hardware ray tracing)",
      "sort_order": 2
    },
    {
      "id": "s-prod-129-3",
      "product_id": "prod-129",
      "spec_key": "Memory & Storage",
      "spec_value": "8GB Unified Memory (100GB/s bandwidth), 512GB SSD",
      "sort_order": 3
    },
    {
      "id": "s-prod-129-4",
      "product_id": "prod-129",
      "spec_key": "Ports",
      "spec_value": "2x Thunderbolt / USB 4, HDMI port, SDXC card slot, MagSafe 3, 3.5mm jack",
      "sort_order": 4
    }
  ],
  "dell-inspiron-15-3520": [
    {
      "id": "s-prod-130-1",
      "product_id": "prod-130",
      "spec_key": "Display",
      "spec_value": "15.6\" FHD (1920 x 1080) 120Hz WVA Anti-Glare, 250 nits",
      "sort_order": 1
    },
    {
      "id": "s-prod-130-2",
      "product_id": "prod-130",
      "spec_key": "Processor",
      "spec_value": "12th Gen Intel Core i5-1235U (10 cores, 12 threads, up to 4.40 GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-130-3",
      "product_id": "prod-130",
      "spec_key": "Memory & Storage",
      "spec_value": "8GB DDR4 RAM, 512GB M.2 PCIe NVMe SSD",
      "sort_order": 3
    },
    {
      "id": "s-prod-130-4",
      "product_id": "prod-130",
      "spec_key": "Ports",
      "spec_value": "2x USB 3.2 Gen 1, 1x USB 2.0, HDMI 1.4, SD Card Reader, Audio Combo",
      "sort_order": 4
    }
  ],
  "hp-pavilion-15-ryzen-7": [
    {
      "id": "s-prod-131-1",
      "product_id": "prod-131",
      "spec_key": "Display",
      "spec_value": "15.6\" FHD (1920 x 1080) IPS, Micro-edge, Anti-glare, 250 nits",
      "sort_order": 1
    },
    {
      "id": "s-prod-131-2",
      "product_id": "prod-131",
      "spec_key": "Processor",
      "spec_value": "AMD Ryzen 7 7730U (8 cores, 16 threads, 16MB L3 cache, up to 4.5 GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-131-3",
      "product_id": "prod-131",
      "spec_key": "Memory & Storage",
      "spec_value": "16GB DDR4 3200MHz RAM, 512GB PCIe NVMe M.2 SSD",
      "sort_order": 3
    },
    {
      "id": "s-prod-131-4",
      "product_id": "prod-131",
      "spec_key": "Audio & Keyboard",
      "spec_value": "Audio by B&O Dual Speakers, Full-size backlit keyboard with numpad",
      "sort_order": 4
    }
  ],
  "lenovo-ideapad-slim-3-15": [
    {
      "id": "s-prod-132-1",
      "product_id": "prod-132",
      "spec_key": "Display",
      "spec_value": "15.6\" FHD (1920 x 1080) IPS Anti-glare, 300 nits, TÜV Low Blue Light",
      "sort_order": 1
    },
    {
      "id": "s-prod-132-2",
      "product_id": "prod-132",
      "spec_key": "Processor",
      "spec_value": "13th Gen Intel Core i5-1335U (10 cores, 12 threads, up to 4.60 GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-132-3",
      "product_id": "prod-132",
      "spec_key": "Durability",
      "spec_value": "MIL-STD-810H military-grade tested against drops, vibration, and temperature",
      "sort_order": 3
    },
    {
      "id": "s-prod-132-4",
      "product_id": "prod-132",
      "spec_key": "Battery",
      "spec_value": "47Wh battery with Rapid Charge Boost",
      "sort_order": 4
    }
  ],
  "apple-ipad-mini-6-64gb": [
    {
      "id": "s-prod-133-1",
      "product_id": "prod-133",
      "spec_key": "Display",
      "spec_value": "8.3\" Liquid Retina (2266 x 1488), 500 nits, True Tone, P3 color gamut",
      "sort_order": 1
    },
    {
      "id": "s-prod-133-2",
      "product_id": "prod-133",
      "spec_key": "Processor",
      "spec_value": "Apple A15 Bionic chip with 64-bit architecture and 16-core Neural Engine",
      "sort_order": 2
    },
    {
      "id": "s-prod-133-3",
      "product_id": "prod-133",
      "spec_key": "Cameras",
      "spec_value": "12MP Ultra Wide front (Center Stage) + 12MP Wide rear (4K 60fps)",
      "sort_order": 3
    },
    {
      "id": "s-prod-133-4",
      "product_id": "prod-133",
      "spec_key": "Pencil Support",
      "spec_value": "Attaches magnetically and charges Apple Pencil (2nd generation)",
      "sort_order": 4
    }
  ],
  "samsung-galaxy-tab-a9-plus": [
    {
      "id": "s-prod-134-1",
      "product_id": "prod-134",
      "spec_key": "Display",
      "spec_value": "11.0\" WUXGA (1920 x 1200) LCD, 90Hz adaptive refresh rate, 16:10 aspect ratio",
      "sort_order": 1
    },
    {
      "id": "s-prod-134-2",
      "product_id": "prod-134",
      "spec_key": "Processor",
      "spec_value": "Qualcomm Snapdragon 695 (6nm Octa-core up to 2.2GHz)",
      "sort_order": 2
    },
    {
      "id": "s-prod-134-3",
      "product_id": "prod-134",
      "spec_key": "Audio",
      "spec_value": "Quad Stereo Speakers with Dolby Atmos",
      "sort_order": 3
    },
    {
      "id": "s-prod-134-4",
      "product_id": "prod-134",
      "spec_key": "Multitasking",
      "spec_value": "Samsung DeX mode + Split screen (up to 3 apps simultaneously)",
      "sort_order": 4
    }
  ],
  "playstation-5-slim": [
    {
      "id": "s-prod-11-1",
      "product_id": "prod-11",
      "spec_key": "CPU & GPU",
      "spec_value": "x86-64 AMD Zen 2 (8 cores / 16 threads up to 3.5 GHz), AMD RDNA 2 GPU (10.28 TFLOPs)",
      "sort_order": 1
    },
    {
      "id": "s-prod-11-2",
      "product_id": "prod-11",
      "spec_key": "System Memory",
      "spec_value": "16GB GDDR6 with 448 GB/s bandwidth",
      "sort_order": 2
    },
    {
      "id": "s-prod-11-3",
      "product_id": "prod-11",
      "spec_key": "Internal Storage",
      "spec_value": "1TB Custom Ultra-High-Speed PCIe Gen 4 NVMe SSD (5.5 GB/s raw)",
      "sort_order": 3
    },
    {
      "id": "s-prod-11-4",
      "product_id": "prod-11",
      "spec_key": "Optical Drive",
      "spec_value": "Ultra HD Blu-ray Disc Drive (removable side design)",
      "sort_order": 4
    },
    {
      "id": "s-prod-11-5",
      "product_id": "prod-11",
      "spec_key": "Video Output",
      "spec_value": "Support of 4K 120Hz TVs, 8K TVs, VRR (specified by HDMI ver. 2.1)",
      "sort_order": 5
    },
    {
      "id": "s-prod-11-6",
      "product_id": "prod-11",
      "spec_key": "Audio & Controller",
      "spec_value": "Tempest 3D AudioTech, DualSense controller with dynamic haptics & adaptive triggers",
      "sort_order": 6
    }
  ],
  "xbox-series-x": [
    {
      "id": "s-prod-12-1",
      "product_id": "prod-12",
      "spec_key": "CPU & GPU",
      "spec_value": "Custom 8-core AMD Zen 2 @ 3.8 GHz, Custom RDNA 2 GPU (12.15 TFLOPs, 52 CUs @ 1.825 GHz)",
      "sort_order": 1
    },
    {
      "id": "s-prod-12-2",
      "product_id": "prod-12",
      "spec_key": "Memory",
      "spec_value": "16GB GDDR6 with 10GB @ 560 GB/s and 6GB @ 336 GB/s",
      "sort_order": 2
    },
    {
      "id": "s-prod-12-3",
      "product_id": "prod-12",
      "spec_key": "Internal Storage",
      "spec_value": "1TB Custom NVMe SSD (2.4 GB/s raw, 4.8 GB/s compressed)",
      "sort_order": 3
    },
    {
      "id": "s-prod-12-4",
      "product_id": "prod-12",
      "spec_key": "Gaming Target",
      "spec_value": "True 4K Gaming up to 120 FPS, 8K HDR high dynamic range",
      "sort_order": 4
    },
    {
      "id": "s-prod-12-5",
      "product_id": "prod-12",
      "spec_key": "Key Features",
      "spec_value": "Xbox Velocity Architecture, Quick Resume across games, Smart Delivery, Hardware Raytracing",
      "sort_order": 5
    },
    {
      "id": "s-prod-12-6",
      "product_id": "prod-12",
      "spec_key": "Ports & Optical Drive",
      "spec_value": "4K UHD Blu-ray drive, HDMI 2.1 port, 3x USB 3.1 Gen 1, Storage Expansion Card slot",
      "sort_order": 6
    }
  ],
  "playstation-5-preowned": [
    {
      "id": "s-prod-21-1",
      "product_id": "prod-21",
      "spec_key": "Processor & Graphics",
      "spec_value": "AMD Zen 2 8-core CPU @ 3.5 GHz, AMD RDNA 2 GPU (10.28 TFLOPs, 36 CUs @ 2.23 GHz)",
      "sort_order": 1
    },
    {
      "id": "s-prod-21-2",
      "product_id": "prod-21",
      "spec_key": "Internal Storage",
      "spec_value": "825GB Custom PCIe Gen 4 NVMe SSD (fully verified 100% health & write speeds)",
      "sort_order": 2
    },
    {
      "id": "s-prod-21-3",
      "product_id": "prod-21",
      "spec_key": "Optical Disc Drive",
      "spec_value": "Ultra HD Blu-ray disc drive (tested, calibrated, and plays 4K discs flawlessly)",
      "sort_order": 3
    },
    {
      "id": "s-prod-21-4",
      "product_id": "prod-21",
      "spec_key": "Included Hardware",
      "spec_value": "Original DualSense Wireless Controller, HDMI 2.1 cable, AC power cord, console base stand",
      "sort_order": 4
    },
    {
      "id": "s-prod-21-5",
      "product_id": "prod-21",
      "spec_key": "Diagnostic Status",
      "spec_value": "Full diagnostic passed: HDMI 2.1 4K 120Hz output, cooling fan benchmark, Bluetooth/Wi-Fi verified",
      "sort_order": 5
    }
  ],
  "playstation-5-slim-digital": [
    {
      "id": "s-prod-67-1",
      "product_id": "prod-67",
      "spec_key": "Design",
      "spec_value": "All-Digital slim console (modular disc drive compatible)",
      "sort_order": 1
    },
    {
      "id": "s-prod-67-2",
      "product_id": "prod-67",
      "spec_key": "Storage & RAM",
      "spec_value": "1TB PCIe Gen 4 NVMe SSD, 16GB GDDR6",
      "sort_order": 2
    },
    {
      "id": "s-prod-67-3",
      "product_id": "prod-67",
      "spec_key": "GPU / CPU",
      "spec_value": "AMD Zen 2 8-core CPU / AMD RDNA 2 GPU (10.28 TFLOPs)",
      "sort_order": 3
    },
    {
      "id": "s-prod-67-4",
      "product_id": "prod-67",
      "spec_key": "Video Output",
      "spec_value": "HDMI 2.1 (4K 120Hz, VRR, ALLM, 8K ready)",
      "sort_order": 4
    },
    {
      "id": "s-prod-67-5",
      "product_id": "prod-67",
      "spec_key": "Controller",
      "spec_value": "Includes Sony DualSense Wireless Controller",
      "sort_order": 5
    }
  ],
  "xbox-series-s-512gb": [
    {
      "id": "s-prod-68-1",
      "product_id": "prod-68",
      "spec_key": "Target Resolution",
      "spec_value": "1440p (QHD) gaming up to 120 FPS, 4K streaming & upscaling",
      "sort_order": 1
    },
    {
      "id": "s-prod-68-2",
      "product_id": "prod-68",
      "spec_key": "Processor",
      "spec_value": "Custom 8-core AMD Zen 2 CPU @ 3.6 GHz",
      "sort_order": 2
    },
    {
      "id": "s-prod-68-3",
      "product_id": "prod-68",
      "spec_key": "GPU",
      "spec_value": "Custom RDNA 2 GPU (4 TFLOPs, 20 CUs @ 1.565 GHz)",
      "sort_order": 3
    },
    {
      "id": "s-prod-68-4",
      "product_id": "prod-68",
      "spec_key": "Storage & RAM",
      "spec_value": "512GB Custom NVMe SSD, 10GB GDDR6",
      "sort_order": 4
    },
    {
      "id": "s-prod-68-5",
      "product_id": "prod-68",
      "spec_key": "Included",
      "spec_value": "Xbox Wireless Controller (Robot White), High Speed HDMI cable",
      "sort_order": 5
    }
  ],
  "nintendo-switch-oled-white": [
    {
      "id": "s-prod-69-1",
      "product_id": "prod-69",
      "spec_key": "Screen",
      "spec_value": "7.0\" OLED Multi-touch Capacitive Screen (1280 x 720)",
      "sort_order": 1
    },
    {
      "id": "s-prod-69-2",
      "product_id": "prod-69",
      "spec_key": "TV Output",
      "spec_value": "Up to 1080p via HDMI in TV mode",
      "sort_order": 2
    },
    {
      "id": "s-prod-69-3",
      "product_id": "prod-69",
      "spec_key": "Storage",
      "spec_value": "64GB Internal Storage (expandable up to 2TB via MicroSDXC)",
      "sort_order": 3
    },
    {
      "id": "s-prod-69-4",
      "product_id": "prod-69",
      "spec_key": "Battery Life",
      "spec_value": "Approx. 4.5 to 9 hours depending on the game",
      "sort_order": 4
    },
    {
      "id": "s-prod-69-5",
      "product_id": "prod-69",
      "spec_key": "Dock Ports",
      "spec_value": "2x USB 2.0, HDMI port, Wired LAN port, AC adapter port",
      "sort_order": 5
    }
  ],
  "sony-dualsense-controller-black": [
    {
      "id": "s-prod-70-1",
      "product_id": "prod-70",
      "spec_key": "Feedback",
      "spec_value": "Dual actuators for realistic haptic vibrations",
      "sort_order": 1
    },
    {
      "id": "s-prod-70-2",
      "product_id": "prod-70",
      "spec_key": "Triggers",
      "spec_value": "Adaptive triggers with simulated tension & resistance",
      "sort_order": 2
    },
    {
      "id": "s-prod-70-3",
      "product_id": "prod-70",
      "spec_key": "Connectivity",
      "spec_value": "Bluetooth 5.1 & USB Type-C wired mode",
      "sort_order": 3
    },
    {
      "id": "s-prod-70-4",
      "product_id": "prod-70",
      "spec_key": "Battery",
      "spec_value": "Built-in 1560 mAh rechargeable Li-ion battery",
      "sort_order": 4
    }
  ],
  "playstation-portal-remote-player": [
    {
      "id": "s-prod-71-1",
      "product_id": "prod-71",
      "spec_key": "Display",
      "spec_value": "8.0\" LCD Touchscreen, Full HD 1080p @ 60 FPS",
      "sort_order": 1
    },
    {
      "id": "s-prod-71-2",
      "product_id": "prod-71",
      "spec_key": "Controls",
      "spec_value": "Integrated DualSense haptics, adaptive triggers, and touchpad zones",
      "sort_order": 2
    },
    {
      "id": "s-prod-71-3",
      "product_id": "prod-71",
      "spec_key": "Wireless",
      "spec_value": "Wi-Fi (5GHz / 2.4GHz) & PlayStation Link ultra-low latency audio",
      "sort_order": 3
    },
    {
      "id": "s-prod-71-4",
      "product_id": "prod-71",
      "spec_key": "Audio Jack",
      "spec_value": "3.5mm headphone audio output",
      "sort_order": 4
    }
  ],
  "razer-blackshark-v2-pro-wireless": [
    {
      "id": "s-prod-72-1",
      "product_id": "prod-72",
      "spec_key": "Drivers",
      "spec_value": "Razer TriForce Titanium 50mm with custom port tuning",
      "sort_order": 1
    },
    {
      "id": "s-prod-72-2",
      "product_id": "prod-72",
      "spec_key": "Microphone",
      "spec_value": "Razer HyperClear Super Wideband Detachable 9.9mm Mic (32kHz sampling)",
      "sort_order": 2
    },
    {
      "id": "s-prod-72-3",
      "product_id": "prod-72",
      "spec_key": "Battery",
      "spec_value": "Up to 70 hours (Type-C fast charging gives 6 hours in 15 mins)",
      "sort_order": 3
    },
    {
      "id": "s-prod-72-4",
      "product_id": "prod-72",
      "spec_key": "Connectivity",
      "spec_value": "Razer HyperSpeed 2.4GHz Wireless + Bluetooth 5.2",
      "sort_order": 4
    },
    {
      "id": "s-prod-72-5",
      "product_id": "prod-72",
      "spec_key": "Weight",
      "spec_value": "320g ultra-lightweight with flowknit memory foam ear cushions",
      "sort_order": 5
    }
  ],
  "samsung-55-qled-4k-tv": [
    {
      "id": "s-prod-10-1",
      "product_id": "prod-10",
      "spec_key": "Panel & Resolution",
      "spec_value": "55\" QLED 4K Ultra HD (3840 x 2160) with Direct Full Array backlighting",
      "sort_order": 1
    },
    {
      "id": "s-prod-10-2",
      "product_id": "prod-10",
      "spec_key": "Color & Contrast",
      "spec_value": "100% Color Volume with Quantum Dot, Quantum HDR+, Real Depth Enhancer",
      "sort_order": 2
    },
    {
      "id": "s-prod-10-3",
      "product_id": "prod-10",
      "spec_key": "Refresh Rate & Gaming",
      "spec_value": "120Hz Native, Motion Xcelerator Turbo+, FreeSync Premium Pro, 4x HDMI 2.1 (4K 120Hz)",
      "sort_order": 3
    },
    {
      "id": "s-prod-10-4",
      "product_id": "prod-10",
      "spec_key": "Video Processor",
      "spec_value": "Quantum Processor 4K with deep learning 4K AI Upscaling",
      "sort_order": 4
    },
    {
      "id": "s-prod-10-5",
      "product_id": "prod-10",
      "spec_key": "Smart OS",
      "spec_value": "Tizen OS with Samsung Gaming Hub, SmartThings, Apple AirPlay 2",
      "sort_order": 5
    },
    {
      "id": "s-prod-10-6",
      "product_id": "prod-10",
      "spec_key": "Audio System",
      "spec_value": "40W 2.2CH, Object Tracking Sound (OTS Lite), Q-Symphony 3.0, Active Voice Amplifier",
      "sort_order": 6
    }
  ],
  "lg-65-oled-evo-c3": [
    {
      "id": "s-prod-73-1",
      "product_id": "prod-73",
      "spec_key": "Display Technology",
      "spec_value": "65\" Self-lit OLED evo (3840 x 2160) with Brightness Booster",
      "sort_order": 1
    },
    {
      "id": "s-prod-73-2",
      "product_id": "prod-73",
      "spec_key": "Processor",
      "spec_value": "α9 AI Processor Gen6 4K with AI Picture Pro & AI Sound Pro",
      "sort_order": 2
    },
    {
      "id": "s-prod-73-3",
      "product_id": "prod-73",
      "spec_key": "Gaming Features",
      "spec_value": "0.1ms response, 120Hz native, 4x HDMI 2.1 (4K 120Hz, VRR, ALLM), G-SYNC & FreeSync",
      "sort_order": 3
    },
    {
      "id": "s-prod-73-4",
      "product_id": "prod-73",
      "spec_key": "HDR & Audio",
      "spec_value": "Dolby Vision IQ, HDR10, HLG, Dolby Atmos 40W 2.2CH sound with WOW Orchestra",
      "sort_order": 4
    },
    {
      "id": "s-prod-73-5",
      "product_id": "prod-73",
      "spec_key": "Smart TV",
      "spec_value": "webOS 23 with Hands-free Voice Control, Apple AirPlay 2, HomeKit",
      "sort_order": 5
    }
  ],
  "sony-bravia-xr-65-a80l-oled": [
    {
      "id": "s-prod-74-1",
      "product_id": "prod-74",
      "spec_key": "Screen & Panel",
      "spec_value": "65\" 4K OLED (3840 x 2160) with XR OLED Contrast Pro & XR Triluminos Pro",
      "sort_order": 1
    },
    {
      "id": "s-prod-74-2",
      "product_id": "prod-74",
      "spec_key": "Processor",
      "spec_value": "Cognitive Processor XR (mimics how humans see and hear)",
      "sort_order": 2
    },
    {
      "id": "s-prod-74-3",
      "product_id": "prod-74",
      "spec_key": "Audio Technology",
      "spec_value": "Acoustic Surface Audio+ (50W 3.2CH with 3 actuators and dual subwoofers)",
      "sort_order": 3
    },
    {
      "id": "s-prod-74-4",
      "product_id": "prod-74",
      "spec_key": "Gaming Specifics",
      "spec_value": "4K/120fps, VRR, ALLM, Auto HDR Tone Mapping, Auto Genre Picture Mode for PS5",
      "sort_order": 4
    },
    {
      "id": "s-prod-74-5",
      "product_id": "prod-74",
      "spec_key": "Smart Platform",
      "spec_value": "Google TV with 10,000+ apps, Apple AirPlay 2, Chromecast built-in",
      "sort_order": 5
    }
  ],
  "tcl-55-c745-qled-4k": [
    {
      "id": "s-prod-75-1",
      "product_id": "prod-75",
      "spec_key": "Panel & Dimming",
      "spec_value": "55\" QLED 4K (3840 x 2160) with Full Array Local Dimming (1000 nits peak)",
      "sort_order": 1
    },
    {
      "id": "s-prod-75-2",
      "product_id": "prod-75",
      "spec_key": "Refresh Rate",
      "spec_value": "144Hz Native VRR panel (up to 240Hz Game Accelerator DLG)",
      "sort_order": 2
    },
    {
      "id": "s-prod-75-3",
      "product_id": "prod-75",
      "spec_key": "HDR Formats",
      "spec_value": "Dolby Vision IQ, HDR10+, HLG, IMAX Enhanced",
      "sort_order": 3
    },
    {
      "id": "s-prod-75-4",
      "product_id": "prod-75",
      "spec_key": "Gaming Interface",
      "spec_value": "Game Master 2.0, Aiming Aid, Shadow Enhancement, FreeSync Premium Pro",
      "sort_order": 4
    },
    {
      "id": "s-prod-75-5",
      "product_id": "prod-75",
      "spec_key": "Audio & OS",
      "spec_value": "Onkyo 2.0CH 30W Sound System, Google TV with voice remote",
      "sort_order": 5
    }
  ],
  "hisense-55-u7k-mini-led": [
    {
      "id": "s-prod-76-1",
      "product_id": "prod-76",
      "spec_key": "Display Technology",
      "spec_value": "55\" Mini-LED ULED 4K (3840 x 2160) with Quantum Dot Color (1000 nits)",
      "sort_order": 1
    },
    {
      "id": "s-prod-76-2",
      "product_id": "prod-76",
      "spec_key": "Refresh Rate",
      "spec_value": "144Hz Native Refresh Rate with Game Mode Pro & FreeSync Premium",
      "sort_order": 2
    },
    {
      "id": "s-prod-76-3",
      "product_id": "prod-76",
      "spec_key": "HDR Support",
      "spec_value": "Total HDR Solution: Dolby Vision IQ, HDR10+ Adaptive, HDR10, HLG",
      "sort_order": 3
    },
    {
      "id": "s-prod-76-4",
      "product_id": "prod-76",
      "spec_key": "Sound System",
      "spec_value": "2.1 Channel with 40W built-in subwoofer & Dolby Atmos",
      "sort_order": 4
    },
    {
      "id": "s-prod-76-5",
      "product_id": "prod-76",
      "spec_key": "Operating System",
      "spec_value": "VIDAA U7 Smart OS with Netflix, YouTube, Prime Video, DStv Stream",
      "sort_order": 5
    }
  ],
  "jbl-charge-5-speaker": [
    {
      "id": "s-prod-13-1",
      "product_id": "prod-13",
      "spec_key": "Transducers",
      "spec_value": "52mm x 90mm woofer + 20mm tweeter with dual passive bass radiators",
      "sort_order": 1
    },
    {
      "id": "s-prod-13-2",
      "product_id": "prod-13",
      "spec_key": "Output Power",
      "spec_value": "30W RMS woofer + 10W RMS tweeter (40W total output)",
      "sort_order": 2
    },
    {
      "id": "s-prod-13-3",
      "product_id": "prod-13",
      "spec_key": "Battery & Powerbank",
      "spec_value": "7500 mAh battery (up to 20 hours playtime), USB-A powerbank out",
      "sort_order": 3
    },
    {
      "id": "s-prod-13-4",
      "product_id": "prod-13",
      "spec_key": "Water & Dust",
      "spec_value": "IP67 waterproof and dustproof",
      "sort_order": 4
    },
    {
      "id": "s-prod-13-5",
      "product_id": "prod-13",
      "spec_key": "Bluetooth",
      "spec_value": "Bluetooth 5.1 with PartyBoost multi-speaker connection",
      "sort_order": 5
    }
  ],
  "samsung-hw-q990c-soundbar": [
    {
      "id": "s-prod-77-1",
      "product_id": "prod-77",
      "spec_key": "Channel Configuration",
      "spec_value": "11.1.4 Channels (22 discrete drivers + wireless sub + wireless rears)",
      "sort_order": 1
    },
    {
      "id": "s-prod-77-2",
      "product_id": "prod-77",
      "spec_key": "Total Power Output",
      "spec_value": "656W total RMS output",
      "sort_order": 2
    },
    {
      "id": "s-prod-77-3",
      "product_id": "prod-77",
      "spec_key": "Audio Decoding",
      "spec_value": "Wireless Dolby Atmos, DTS:X, Dolby TrueHD, Hi-Res Audio 24-bit/192kHz",
      "sort_order": 3
    },
    {
      "id": "s-prod-77-4",
      "product_id": "prod-77",
      "spec_key": "Room Calibration",
      "spec_value": "SpaceFit Sound Pro with Auto EQ & Active Voice Amplifier",
      "sort_order": 4
    },
    {
      "id": "s-prod-77-5",
      "product_id": "prod-77",
      "spec_key": "Connectivity",
      "spec_value": "2x HDMI In (4K 120Hz pass-through), 1x HDMI eARC Out, Optical In, Wi-Fi, Bluetooth",
      "sort_order": 5
    }
  ],
  "jbl-bar-500-soundbar": [
    {
      "id": "s-prod-78-1",
      "product_id": "prod-78",
      "spec_key": "Total Speaker Output",
      "spec_value": "590W Max (290W Soundbar + 300W Subwoofer)",
      "sort_order": 1
    },
    {
      "id": "s-prod-78-2",
      "product_id": "prod-78",
      "spec_key": "Subwoofer Driver",
      "spec_value": "10\" (260mm) down-firing wireless active subwoofer",
      "sort_order": 2
    },
    {
      "id": "s-prod-78-3",
      "product_id": "prod-78",
      "spec_key": "Surround Tech",
      "spec_value": "MultiBeam surround sound with Dolby Atmos decoding",
      "sort_order": 3
    },
    {
      "id": "s-prod-78-4",
      "product_id": "prod-78",
      "spec_key": "Speech Clarity",
      "spec_value": "PureVoice Dialogue Enhancement technology",
      "sort_order": 4
    },
    {
      "id": "s-prod-78-5",
      "product_id": "prod-78",
      "spec_key": "Connectivity",
      "spec_value": "HDMI In, HDMI eARC Out (4K Dolby Vision), Optical, Wi-Fi 6, Bluetooth 5.0",
      "sort_order": 5
    }
  ],
  "jbl-boombox-3-speaker": [
    {
      "id": "s-prod-79-1",
      "product_id": "prod-79",
      "spec_key": "Acoustic Design",
      "spec_value": "3-way system: 1x 189x114mm Subwoofer + 2x 81mm Midrange + 2x 20mm Tweeters",
      "sort_order": 1
    },
    {
      "id": "s-prod-79-2",
      "product_id": "prod-79",
      "spec_key": "Output Power",
      "spec_value": "180W RMS (AC mode) / 136W RMS (Battery mode)",
      "sort_order": 2
    },
    {
      "id": "s-prod-79-3",
      "product_id": "prod-79",
      "spec_key": "Playtime & Battery",
      "spec_value": "Up to 24 hours (10,000 mAh Li-ion battery with powerbank output)",
      "sort_order": 3
    },
    {
      "id": "s-prod-79-4",
      "product_id": "prod-79",
      "spec_key": "Waterproofing",
      "spec_value": "IP67 waterproof and dustproof",
      "sort_order": 4
    },
    {
      "id": "s-prod-79-5",
      "product_id": "prod-79",
      "spec_key": "Bluetooth",
      "spec_value": "Bluetooth 5.3 with multi-point connection and JBL PartyBoost",
      "sort_order": 5
    }
  ],
  "marshall-stanmore-iii-speaker": [
    {
      "id": "s-prod-80-1",
      "product_id": "prod-80",
      "spec_key": "Amplification",
      "spec_value": "1x 50W Class D amp for woofer + 2x 15W Class D amps for tweeters (80W total)",
      "sort_order": 1
    },
    {
      "id": "s-prod-80-2",
      "product_id": "prod-80",
      "spec_key": "Frequency Range",
      "spec_value": "45 Hz – 20,000 Hz with Bass-reflex cabinet",
      "sort_order": 2
    },
    {
      "id": "s-prod-80-3",
      "product_id": "prod-80",
      "spec_key": "Analog Controls",
      "spec_value": "Source button, volume knob, bass knob, treble knob, play/pause, power lever",
      "sort_order": 3
    },
    {
      "id": "s-prod-80-4",
      "product_id": "prod-80",
      "spec_key": "Inputs",
      "spec_value": "Bluetooth 5.2, 3.5mm Aux input, RCA stereo inputs",
      "sort_order": 4
    }
  ],
  "xbox-wireless-controller-black": [
    {
      "id": "s-prod-135-1",
      "product_id": "prod-135",
      "spec_key": "Connectivity",
      "spec_value": "Xbox Wireless + Bluetooth Low Energy + USB-C wired connection",
      "sort_order": 1
    },
    {
      "id": "s-prod-135-2",
      "product_id": "prod-135",
      "spec_key": "D-Pad",
      "spec_value": "Faceted Hybrid D-pad for tactile, responsive input",
      "sort_order": 2
    },
    {
      "id": "s-prod-135-3",
      "product_id": "prod-135",
      "spec_key": "Audio Jack",
      "spec_value": "3.5mm stereo headset jack",
      "sort_order": 3
    },
    {
      "id": "s-prod-135-4",
      "product_id": "prod-135",
      "spec_key": "Battery",
      "spec_value": "Up to 40 hours of battery life with standard AA batteries",
      "sort_order": 4
    }
  ],
  "nintendo-switch-pro-controller": [
    {
      "id": "s-prod-136-1",
      "product_id": "prod-136",
      "spec_key": "Motion & Feedback",
      "spec_value": "Accelerometer, Gyro sensor, and HD rumble system",
      "sort_order": 1
    },
    {
      "id": "s-prod-136-2",
      "product_id": "prod-136",
      "spec_key": "NFC Touchpoint",
      "spec_value": "Built-in amiibo reader / writer",
      "sort_order": 2
    },
    {
      "id": "s-prod-136-3",
      "product_id": "prod-136",
      "spec_key": "Charging & Battery",
      "spec_value": "1300 mAh rechargeable battery (approx. 40 hours life), USB-C port",
      "sort_order": 3
    }
  ],
  "steelseries-arctis-nova-7-wireless": [
    {
      "id": "s-prod-137-1",
      "product_id": "prod-137",
      "spec_key": "Drivers",
      "spec_value": "40mm High Fidelity Neodymium Drivers (20–22,000 Hz)",
      "sort_order": 1
    },
    {
      "id": "s-prod-137-2",
      "product_id": "prod-137",
      "spec_key": "Microphone",
      "spec_value": "ClearCast Gen 2 fully retractable bidirectional noise-canceling mic",
      "sort_order": 2
    },
    {
      "id": "s-prod-137-3",
      "product_id": "prod-137",
      "spec_key": "Simultaneous Audio",
      "spec_value": "2.4GHz Ultra-low latency wireless + Bluetooth 5.0 simultaneously",
      "sort_order": 3
    },
    {
      "id": "s-prod-137-4",
      "product_id": "prod-137",
      "spec_key": "Battery",
      "spec_value": "Up to 38 hours playback, USB-C Fast Charge (15 mins = 6 hours)",
      "sort_order": 4
    }
  ],
  "samsung-65-crystal-uhd-4k-tv": [
    {
      "id": "s-prod-138-1",
      "product_id": "prod-138",
      "spec_key": "Display & Resolution",
      "spec_value": "65\" Crystal UHD 4K (3840 x 2160), 50Hz native, PurColor, HDR10+",
      "sort_order": 1
    },
    {
      "id": "s-prod-138-2",
      "product_id": "prod-138",
      "spec_key": "Processor",
      "spec_value": "Crystal Processor 4K with 4K Upscaling",
      "sort_order": 2
    },
    {
      "id": "s-prod-138-3",
      "product_id": "prod-138",
      "spec_key": "Audio",
      "spec_value": "20W 2CH audio, Object Tracking Sound Lite (OTS Lite), Q-Symphony",
      "sort_order": 3
    },
    {
      "id": "s-prod-138-4",
      "product_id": "prod-138",
      "spec_key": "Smart Platform",
      "spec_value": "Tizen OS with Web Browser, SmartThings, Apple AirPlay",
      "sort_order": 4
    }
  ],
  "lg-55-4k-uhd-smart-tv-ur7800": [
    {
      "id": "s-prod-139-1",
      "product_id": "prod-139",
      "spec_key": "Screen Size & Panel",
      "spec_value": "55\" Real 4K UHD (3840 x 2160) Direct LED",
      "sort_order": 1
    },
    {
      "id": "s-prod-139-2",
      "product_id": "prod-139",
      "spec_key": "Image Processor",
      "spec_value": "α5 AI Processor 4K Gen6 with 4K AI Upscaling & AI Brightness",
      "sort_order": 2
    },
    {
      "id": "s-prod-139-3",
      "product_id": "prod-139",
      "spec_key": "HDR & Sound",
      "spec_value": "HDR10 Pro / HLG, 20W 2.0CH with AI Sound Pro (Virtual 5.1 Up-mix)",
      "sort_order": 3
    },
    {
      "id": "s-prod-139-4",
      "product_id": "prod-139",
      "spec_key": "Smart System",
      "spec_value": "webOS 23 with ThinQ AI, Apple AirPlay 2 & HomeKit",
      "sort_order": 4
    }
  ],
  "jbl-flip-6-speaker": [
    {
      "id": "s-prod-140-1",
      "product_id": "prod-140",
      "spec_key": "Transducers",
      "spec_value": "45 x 80 mm woofer (20W RMS) + 16 mm tweeter (10W RMS) — 30W total",
      "sort_order": 1
    },
    {
      "id": "s-prod-140-2",
      "product_id": "prod-140",
      "spec_key": "Frequency Response",
      "spec_value": "63 Hz – 20,000 Hz",
      "sort_order": 2
    },
    {
      "id": "s-prod-140-3",
      "product_id": "prod-140",
      "spec_key": "Battery Life",
      "spec_value": "4800 mAh Li-ion battery (up to 12 hours playtime, 2.5h charge time)",
      "sort_order": 3
    },
    {
      "id": "s-prod-140-4",
      "product_id": "prod-140",
      "spec_key": "Durability",
      "spec_value": "IP67 waterproof and dustproof",
      "sort_order": 4
    }
  ],
  "sony-srs-xb100-speaker": [
    {
      "id": "s-prod-141-1",
      "product_id": "prod-141",
      "spec_key": "Sound Technology",
      "spec_value": "Sound Diffusion Processor + Passive Radiator with Extra Bass",
      "sort_order": 1
    },
    {
      "id": "s-prod-141-2",
      "product_id": "prod-141",
      "spec_key": "Battery Life",
      "spec_value": "Up to 16 hours with battery level indicator",
      "sort_order": 2
    },
    {
      "id": "s-prod-141-3",
      "product_id": "prod-141",
      "spec_key": "Ingress Protection",
      "spec_value": "IP67 waterproof and dustproof",
      "sort_order": 3
    },
    {
      "id": "s-prod-141-4",
      "product_id": "prod-141",
      "spec_key": "Microphone",
      "spec_value": "Built-in hands-free microphone with Echo Canceling",
      "sort_order": 4
    }
  ],
  "lg-2hp-inverter-air-conditioner": [
    {
      "id": "s-prod-16-1",
      "product_id": "prod-16",
      "spec_key": "Cooling Capacity",
      "spec_value": "2.0 HP (Horsepower) / 18,000 BTU/h cooling output",
      "sort_order": 1
    },
    {
      "id": "s-prod-16-2",
      "product_id": "prod-16",
      "spec_key": "Compressor Technology",
      "spec_value": "LG DUAL Inverter Compressor backed by 10-Year Manufacturer Warranty",
      "sort_order": 2
    },
    {
      "id": "s-prod-16-3",
      "product_id": "prod-16",
      "spec_key": "Energy Efficiency",
      "spec_value": "Up to 70% energy savings with up to 40% faster cooling compared to standard models",
      "sort_order": 3
    },
    {
      "id": "s-prod-16-4",
      "product_id": "prod-16",
      "spec_key": "GenCool Mode",
      "spec_value": "Generator Mode with 3 selectable wattage levels (allows cooling on small generator capacity)",
      "sort_order": 4
    },
    {
      "id": "s-prod-16-5",
      "product_id": "prod-16",
      "spec_key": "Coil & Protection",
      "spec_value": "100% Pure Copper coils with Gold Fin anti-corrosive coating for coastal durability",
      "sort_order": 5
    },
    {
      "id": "s-prod-16-6",
      "product_id": "prod-16",
      "spec_key": "Noise & Air Quality",
      "spec_value": "Ultra-quiet 19dB in Sleep Mode, Dual Protection anti-bacterial dust filter",
      "sort_order": 6
    }
  ],
  "hisense-double-door-refrigerator": [
    {
      "id": "s-prod-20-1",
      "product_id": "prod-20",
      "spec_key": "Gross Capacity",
      "spec_value": "350 Liters Total Top-Mount Double Door Refrigerator (Freezer + Fridge)",
      "sort_order": 1
    },
    {
      "id": "s-prod-20-2",
      "product_id": "prod-20",
      "spec_key": "Cooling Technology",
      "spec_value": "Total No Frost with Multi Air Flow 360-degree surround cooling",
      "sort_order": 2
    },
    {
      "id": "s-prod-20-3",
      "product_id": "prod-20",
      "spec_key": "Compressor",
      "spec_value": "Smart Inverter Compressor for quiet low-vibration operation and energy savings",
      "sort_order": 3
    },
    {
      "id": "s-prod-20-4",
      "product_id": "prod-20",
      "spec_key": "Shelves & Drawers",
      "spec_value": "Heavy-duty tempered glass adjustable spill-proof shelves + humidity crisper drawer",
      "sort_order": 4
    },
    {
      "id": "s-prod-20-5",
      "product_id": "prod-20",
      "spec_key": "Exterior & Lighting",
      "spec_value": "Brushed anti-fingerprint stainless steel exterior with bright energy-efficient interior LED",
      "sort_order": 5
    },
    {
      "id": "s-prod-20-6",
      "product_id": "prod-20",
      "spec_key": "Gas & Rating",
      "spec_value": "Eco-friendly R600a refrigerant, A+ Energy Efficiency rating",
      "sort_order": 6
    }
  ],
  "ninja-blender-1200w": [
    {
      "id": "s-prod-23-1",
      "product_id": "prod-23",
      "spec_key": "Motor Power",
      "spec_value": "1200 Peak Watts High-Torque Motor Base with Pulse Technology",
      "sort_order": 1
    },
    {
      "id": "s-prod-23-2",
      "product_id": "prod-23",
      "spec_key": "Pitcher Capacity",
      "spec_value": "72 oz Total Crushing Pitcher (64 oz maximum liquid capacity)",
      "sort_order": 2
    },
    {
      "id": "s-prod-23-3",
      "product_id": "prod-23",
      "spec_key": "Blade Assembly",
      "spec_value": "Stacked 6-blade Pro Extractor stainless steel blade assembly",
      "sort_order": 3
    },
    {
      "id": "s-prod-23-4",
      "product_id": "prod-23",
      "spec_key": "Preset Programs",
      "spec_value": "Auto-iQ intelligent technology: Smoothie, Ice Crush, Extract, Low, Med, High speeds",
      "sort_order": 4
    },
    {
      "id": "s-prod-23-5",
      "product_id": "prod-23",
      "spec_key": "Safety & Materials",
      "spec_value": "BPA-free dishwasher-safe pitcher with safety locking handle and spout lid",
      "sort_order": 5
    }
  ],
  "panasonic-1-5hp-inverter-ac": [
    {
      "id": "s-prod-81-1",
      "product_id": "prod-81",
      "spec_key": "Cooling Capacity",
      "spec_value": "1.5 HP / 12,000 BTU/h",
      "sort_order": 1
    },
    {
      "id": "s-prod-81-2",
      "product_id": "prod-81",
      "spec_key": "Air Purification",
      "spec_value": "nanoe-G technology (removes 99% of PM2.5, dust, bacteria)",
      "sort_order": 2
    },
    {
      "id": "s-prod-81-3",
      "product_id": "prod-81",
      "spec_key": "Energy Tech",
      "spec_value": "Panasonic Inverter with ECO Mode A.I. energy control",
      "sort_order": 3
    },
    {
      "id": "s-prod-81-4",
      "product_id": "prod-81",
      "spec_key": "Coil Durability",
      "spec_value": "Blue Fin Condenser for enhanced anti-rust protection",
      "sort_order": 4
    },
    {
      "id": "s-prod-81-5",
      "product_id": "prod-81",
      "spec_key": "Refrigerant",
      "spec_value": "Eco-friendly R32 refrigerant with zero ozone depletion",
      "sort_order": 5
    }
  ],
  "samsung-410l-twin-cooling-refrigerator": [
    {
      "id": "s-prod-82-1",
      "product_id": "prod-82",
      "spec_key": "Total Capacity",
      "spec_value": "410 Liters (Fridge: 312L, Freezer: 98L)",
      "sort_order": 1
    },
    {
      "id": "s-prod-82-2",
      "product_id": "prod-82",
      "spec_key": "Cooling System",
      "spec_value": "Twin Cooling Plus with separate evaporators for fridge & freezer",
      "sort_order": 2
    },
    {
      "id": "s-prod-82-3",
      "product_id": "prod-82",
      "spec_key": "Conversion Modes",
      "spec_value": "5 Conversion Modes for flexible storage optimization",
      "sort_order": 3
    },
    {
      "id": "s-prod-82-4",
      "product_id": "prod-82",
      "spec_key": "Compressor",
      "spec_value": "Digital Inverter Compressor (7 adjustable speeds, 20-year warranty)",
      "sort_order": 4
    },
    {
      "id": "s-prod-82-5",
      "product_id": "prod-82",
      "spec_key": "Odor Control",
      "spec_value": "Anti-Bacterial Protector with activated carbon filter",
      "sort_order": 5
    }
  ],
  "haier-thermocool-200l-freezer": [
    {
      "id": "s-prod-83-1",
      "product_id": "prod-83",
      "spec_key": "Net Capacity",
      "spec_value": "200 Liters Heavy-Duty Storage Volume",
      "sort_order": 1
    },
    {
      "id": "s-prod-83-2",
      "product_id": "prod-83",
      "spec_key": "Power Holdover",
      "spec_value": "100 Hours Cool Retention after blackout",
      "sort_order": 2
    },
    {
      "id": "s-prod-83-3",
      "product_id": "prod-83",
      "spec_key": "Voltage Tolerance",
      "spec_value": "Low Voltage Start capability (operates between 135V – 260V)",
      "sort_order": 3
    },
    {
      "id": "s-prod-83-4",
      "product_id": "prod-83",
      "spec_key": "Freezing Speed",
      "spec_value": "Turbo Freezing 30-minute quick-freeze function",
      "sort_order": 4
    },
    {
      "id": "s-prod-83-5",
      "product_id": "prod-83",
      "spec_key": "Lining & Body",
      "spec_value": "Embossed Aluminum anti-bacterial interior, Zinc-coated exterior with lock",
      "sort_order": 5
    }
  ],
  "lg-8kg-front-load-washing-machine": [
    {
      "id": "s-prod-84-1",
      "product_id": "prod-84",
      "spec_key": "Wash Capacity",
      "spec_value": "8.0 kg Front Load",
      "sort_order": 1
    },
    {
      "id": "s-prod-84-2",
      "product_id": "prod-84",
      "spec_key": "Motor Technology",
      "spec_value": "Inverter AI Direct Drive with 10-Year Warranty (1400 RPM max spin)",
      "sort_order": 2
    },
    {
      "id": "s-prod-84-3",
      "product_id": "prod-84",
      "spec_key": "Fabric Care",
      "spec_value": "AI DD automatic fabric hardness detection + 6 Motion wash cycles",
      "sort_order": 3
    },
    {
      "id": "s-prod-84-4",
      "product_id": "prod-84",
      "spec_key": "Health & Steam",
      "spec_value": "LG Steam Allergy Care program (certified by BAF)",
      "sort_order": 4
    },
    {
      "id": "s-prod-84-5",
      "product_id": "prod-84",
      "spec_key": "Drum Material",
      "spec_value": "100% Stainless Steel hygienic lifters & drum",
      "sort_order": 5
    }
  ],
  "ninja-foodi-dualzone-air-fryer": [
    {
      "id": "s-prod-85-1",
      "product_id": "prod-85",
      "spec_key": "Total Capacity",
      "spec_value": "8 Quarts (2x independent 4-quart cooking baskets)",
      "sort_order": 1
    },
    {
      "id": "s-prod-85-2",
      "product_id": "prod-85",
      "spec_key": "DualZone Tech",
      "spec_value": "Smart Finish (finishes together) & Match Cook (copies settings)",
      "sort_order": 2
    },
    {
      "id": "s-prod-85-3",
      "product_id": "prod-85",
      "spec_key": "6-in-1 Cooking",
      "spec_value": "Air Fry, Air Broil, Roast, Bake, Reheat, Dehydrate",
      "sort_order": 3
    },
    {
      "id": "s-prod-85-4",
      "product_id": "prod-85",
      "spec_key": "Power Output",
      "spec_value": "1690 Watts high-speed convection airflow",
      "sort_order": 4
    },
    {
      "id": "s-prod-85-5",
      "product_id": "prod-85",
      "spec_key": "Coating & Cleaning",
      "spec_value": "Nonstick ceramic dishwasher-safe baskets & crisper plates",
      "sort_order": 5
    }
  ],
  "panasonic-27l-inverter-microwave": [
    {
      "id": "s-prod-86-1",
      "product_id": "prod-86",
      "spec_key": "Cavity Capacity",
      "spec_value": "27 Liters full stainless steel interior",
      "sort_order": 1
    },
    {
      "id": "s-prod-86-2",
      "product_id": "prod-86",
      "spec_key": "Cooking Modes",
      "spec_value": "Convection Oven (100°C–240°C), Grill (1400W), Microwave (900W)",
      "sort_order": 2
    },
    {
      "id": "s-prod-86-3",
      "product_id": "prod-86",
      "spec_key": "Inverter Advantage",
      "spec_value": "True continuous linear power delivery for even thawing and simmering",
      "sort_order": 3
    },
    {
      "id": "s-prod-86-4",
      "product_id": "prod-86",
      "spec_key": "Auto Programs",
      "spec_value": "101 Pre-programmed Auto Menus + Inverter Turbo Defrost",
      "sort_order": 4
    }
  ],
  "instant-pot-duo-plus-6qt": [
    {
      "id": "s-prod-87-1",
      "product_id": "prod-87",
      "spec_key": "Capacity",
      "spec_value": "6 Quarts (feeds up to 6 people)",
      "sort_order": 1
    },
    {
      "id": "s-prod-87-2",
      "product_id": "prod-87",
      "spec_key": "9-in-1 Functions",
      "spec_value": "Pressure cook, slow cook, rice, steamer, sauté, yogurt, sous vide, sterilize, keep warm",
      "sort_order": 2
    },
    {
      "id": "s-prod-87-3",
      "product_id": "prod-87",
      "spec_key": "Inner Pot",
      "spec_value": "Food-grade 304 (18/8) stainless steel with tri-ply base for even heating",
      "sort_order": 3
    },
    {
      "id": "s-prod-87-4",
      "product_id": "prod-87",
      "spec_key": "Safety Mechanisms",
      "spec_value": "10+ built-in safety features including overheat protection and safe locking lid",
      "sort_order": 4
    }
  ],
  "apple-watch-ultra-2": [
    {
      "id": "s-prod-9-1",
      "product_id": "prod-9",
      "spec_key": "Case Construction",
      "spec_value": "49mm Aerospace-grade titanium with raised sapphire crystal front edge",
      "sort_order": 1
    },
    {
      "id": "s-prod-9-2",
      "product_id": "prod-9",
      "spec_key": "Display",
      "spec_value": "Always-On Retina LTPO OLED, up to 3000 nits brightness (1 nit minimum)",
      "sort_order": 2
    },
    {
      "id": "s-prod-9-3",
      "product_id": "prod-9",
      "spec_key": "Processor & Gestures",
      "spec_value": "Apple S9 SiP with 4-core Neural Engine & Double Tap gesture recognition",
      "sort_order": 3
    },
    {
      "id": "s-prod-9-4",
      "product_id": "prod-9",
      "spec_key": "Battery Life",
      "spec_value": "Up to 36 hours normal use (up to 72 hours in Low Power Mode)",
      "sort_order": 4
    },
    {
      "id": "s-prod-9-5",
      "product_id": "prod-9",
      "spec_key": "Water & Dive Rating",
      "spec_value": "100m water resistant, EN13319 certified dive computer to 40m depth with Oceanic+",
      "sort_order": 5
    },
    {
      "id": "s-prod-9-6",
      "product_id": "prod-9",
      "spec_key": "GPS & Siren",
      "spec_value": "Precision dual-frequency GPS (L1 + L5), built-in 86dB emergency siren",
      "sort_order": 6
    }
  ],
  "apple-watch-series-9-45mm": [
    {
      "id": "s-prod-88-1",
      "product_id": "prod-88",
      "spec_key": "Case Size & Material",
      "spec_value": "45mm Midnight Aluminum case with Ion-X strengthened front glass",
      "sort_order": 1
    },
    {
      "id": "s-prod-88-2",
      "product_id": "prod-88",
      "spec_key": "Display",
      "spec_value": "Always-On Retina LTPO OLED, up to 2000 nits brightness",
      "sort_order": 2
    },
    {
      "id": "s-prod-88-3",
      "product_id": "prod-88",
      "spec_key": "Processor",
      "spec_value": "Apple S9 SiP with 64-bit dual-core processor and 4-core NPU",
      "sort_order": 3
    },
    {
      "id": "s-prod-88-4",
      "product_id": "prod-88",
      "spec_key": "Health Sensors",
      "spec_value": "Electrical heart sensor (ECG), optical heart rate, blood oxygen (SpO2), temperature sensor",
      "sort_order": 4
    },
    {
      "id": "s-prod-88-5",
      "product_id": "prod-88",
      "spec_key": "Water Resistance",
      "spec_value": "50 meters water resistant (swimproof)",
      "sort_order": 5
    }
  ],
  "samsung-galaxy-watch6-classic-47mm": [
    {
      "id": "s-prod-89-1",
      "product_id": "prod-89",
      "spec_key": "Case & Bezel",
      "spec_value": "47mm Stainless Steel case with tactile physical rotating bezel",
      "sort_order": 1
    },
    {
      "id": "s-prod-89-2",
      "product_id": "prod-89",
      "spec_key": "Display",
      "spec_value": "1.47\" Super AMOLED (480 x 480), Sapphire Crystal glass, 2000 nits",
      "sort_order": 2
    },
    {
      "id": "s-prod-89-3",
      "product_id": "prod-89",
      "spec_key": "Processor & Memory",
      "spec_value": "Exynos W930 (5nm 1.4GHz Dual-Core), 2GB RAM + 16GB Storage",
      "sort_order": 3
    },
    {
      "id": "s-prod-89-4",
      "product_id": "prod-89",
      "spec_key": "Health Monitoring",
      "spec_value": "BioActive Sensor: Optical Heart Rate, Electrical Heart (ECG), Bioelectrical Impedance (BIA)",
      "sort_order": 4
    },
    {
      "id": "s-prod-89-5",
      "product_id": "prod-89",
      "spec_key": "Durability",
      "spec_value": "5ATM + IP68 water/dust resistance, MIL-STD-810H military certified",
      "sort_order": 5
    }
  ],
  "garmin-fenix-7-pro-solar": [
    {
      "id": "s-prod-90-1",
      "product_id": "prod-90",
      "spec_key": "Case & Lens",
      "spec_value": "47mm Fiber-reinforced polymer with steel bezel & Power Glass solar lens",
      "sort_order": 1
    },
    {
      "id": "s-prod-90-2",
      "product_id": "prod-90",
      "spec_key": "Display",
      "spec_value": "1.3\" Sunlight-visible transflective memory-in-pixel (MIP), 260 x 260",
      "sort_order": 2
    },
    {
      "id": "s-prod-90-3",
      "product_id": "prod-90",
      "spec_key": "Battery Life",
      "spec_value": "Smartwatch: Up to 18 days (22 days with solar) / GPS: Up to 57 hours (73 hours with solar)",
      "sort_order": 3
    },
    {
      "id": "s-prod-90-4",
      "product_id": "prod-90",
      "spec_key": "LED Flashlight",
      "spec_value": "Built-in multi-LED flashlight with variable brightness & red safety light",
      "sort_order": 4
    },
    {
      "id": "s-prod-90-5",
      "product_id": "prod-90",
      "spec_key": "Mapping & GPS",
      "spec_value": "Preloaded TopoActive maps, Multi-band GNSS with SatIQ technology",
      "sort_order": 5
    }
  ],
  "oraimo-watch-4-plus": [
    {
      "id": "s-prod-91-1",
      "product_id": "prod-91",
      "spec_key": "Screen Size",
      "spec_value": "1.96\" TFT HD Color Touchscreen (240 x 282), 500 nits",
      "sort_order": 1
    },
    {
      "id": "s-prod-91-2",
      "product_id": "prod-91",
      "spec_key": "Calling Feature",
      "spec_value": "Bluetooth 5.2 calling with built-in mic and speaker",
      "sort_order": 2
    },
    {
      "id": "s-prod-91-3",
      "product_id": "prod-91",
      "spec_key": "Health Tracking",
      "spec_value": "24/7 Heart rate, SpO2 Blood Oxygen, Sleep stage tracking, Stress",
      "sort_order": 3
    },
    {
      "id": "s-prod-91-4",
      "product_id": "prod-91",
      "spec_key": "Sports Modes",
      "spec_value": "100+ Sports & workout modes via oraimo Health App",
      "sort_order": 4
    },
    {
      "id": "s-prod-91-5",
      "product_id": "prod-91",
      "spec_key": "Battery & Water",
      "spec_value": "Up to 7 days normal use, IP68 dust and water resistant",
      "sort_order": 5
    }
  ],
  "lg-1-5hp-dual-inverter-ac": [
    {
      "id": "s-prod-142-1",
      "product_id": "prod-142",
      "spec_key": "Cooling Capacity",
      "spec_value": "1.5 HP / 12,000 BTU/h",
      "sort_order": 1
    },
    {
      "id": "s-prod-142-2",
      "product_id": "prod-142",
      "spec_key": "Compressor",
      "spec_value": "LG DUAL Inverter Compressor with 10-Year Warranty",
      "sort_order": 2
    },
    {
      "id": "s-prod-142-3",
      "product_id": "prod-142",
      "spec_key": "GenCool Control",
      "spec_value": "3-Step wattage selector for small generators (Generators down to 1.5kVA)",
      "sort_order": 3
    },
    {
      "id": "s-prod-142-4",
      "product_id": "prod-142",
      "spec_key": "Coil Protection",
      "spec_value": "100% Copper with Gold Fin anti-corrosive protective layer",
      "sort_order": 4
    }
  ],
  "binatone-18-inch-standing-fan": [
    {
      "id": "s-prod-143-1",
      "product_id": "prod-143",
      "spec_key": "Blade Size & Type",
      "spec_value": "18\" (45cm) 5-Fin aerodynamic high-velocity blade",
      "sort_order": 1
    },
    {
      "id": "s-prod-143-2",
      "product_id": "prod-143",
      "spec_key": "Motor",
      "spec_value": "100% Copper winding motor with thermal fuse protection",
      "sort_order": 2
    },
    {
      "id": "s-prod-143-3",
      "product_id": "prod-143",
      "spec_key": "Control Options",
      "spec_value": "Infrared Remote Control + onboard touch buttons",
      "sort_order": 3
    },
    {
      "id": "s-prod-143-4",
      "product_id": "prod-143",
      "spec_key": "Timer & Speed",
      "spec_value": "8-Hour programmable timer with 3-speed airflow modes",
      "sort_order": 4
    }
  ],
  "philips-perfectcare-steam-generator-iron": [
    {
      "id": "s-prod-144-1",
      "product_id": "prod-144",
      "spec_key": "Pressure & Steam",
      "spec_value": "Max 6 bar pump pressure, up to 360g steam boost, 120g/min continuous steam",
      "sort_order": 1
    },
    {
      "id": "s-prod-144-2",
      "product_id": "prod-144",
      "spec_key": "OptimalTEMP Tech",
      "spec_value": "Guaranteed no burns on all ironable fabrics without temperature settings",
      "sort_order": 2
    },
    {
      "id": "s-prod-144-3",
      "product_id": "prod-144",
      "spec_key": "Water Tank",
      "spec_value": "1.3 Liter water capacity (over 1 hour continuous ironing)",
      "sort_order": 3
    },
    {
      "id": "s-prod-144-4",
      "product_id": "prod-144",
      "spec_key": "Soleplate",
      "spec_value": "SteamGlide scratch-resistant smooth glide soleplate",
      "sort_order": 4
    }
  ],
  "nexus-3-gas-1-electric-cooker": [
    {
      "id": "s-prod-145-1",
      "product_id": "prod-145",
      "spec_key": "Hob Configuration",
      "spec_value": "3 Gas Burners (1 Rapid, 1 Semi-rapid, 1 Auxiliary) + 1 Electric Hotplate",
      "sort_order": 1
    },
    {
      "id": "s-prod-145-2",
      "product_id": "prod-145",
      "spec_key": "Oven & Grill",
      "spec_value": "Spacious gas oven with separate lower oven burner and upper grill burner",
      "sort_order": 2
    },
    {
      "id": "s-prod-145-3",
      "product_id": "prod-145",
      "spec_key": "Ignition",
      "spec_value": "Electronic push-button ignition for hob and oven",
      "sort_order": 3
    },
    {
      "id": "s-prod-145-4",
      "product_id": "prod-145",
      "spec_key": "Dimensions",
      "spec_value": "50cm x 55cm compact footprint with adjustable leveling legs",
      "sort_order": 4
    }
  ],
  "dyson-v11-cordless-vacuum": [
    {
      "id": "s-prod-146-1",
      "product_id": "prod-146",
      "spec_key": "Suction Power",
      "spec_value": "185 Air Watts in Boost mode (Hyperdymium 125,000 RPM motor)",
      "sort_order": 1
    },
    {
      "id": "s-prod-146-2",
      "product_id": "prod-146",
      "spec_key": "Runtime",
      "spec_value": "Up to 60 minutes in Eco mode (7-cell click-in battery)",
      "sort_order": 2
    },
    {
      "id": "s-prod-146-3",
      "product_id": "prod-146",
      "spec_key": "Filtration",
      "spec_value": "Fully-sealed filtration system trapping 99.99% of dust & allergens",
      "sort_order": 3
    },
    {
      "id": "s-prod-146-4",
      "product_id": "prod-146",
      "spec_key": "LCD Display",
      "spec_value": "Reports cleaning mode, runtime down to the second, and filter cleaning reminders",
      "sort_order": 4
    }
  ],
  "canon-eos-r6-mark-ii": [
    {
      "id": "s-prod-15-1",
      "product_id": "prod-15",
      "spec_key": "Image Sensor",
      "spec_value": "24.2MP Full-Frame CMOS Sensor (35.9 x 23.9 mm)",
      "sort_order": 1
    },
    {
      "id": "s-prod-15-2",
      "product_id": "prod-15",
      "spec_key": "Image Processor",
      "spec_value": "DIGIC X with deep learning AI subject tracking (Humans, Animals, Vehicles, Aircraft)",
      "sort_order": 2
    },
    {
      "id": "s-prod-15-3",
      "product_id": "prod-15",
      "spec_key": "Burst Shooting",
      "spec_value": "Up to 40 fps electronic shutter with full AF/AE, up to 12 fps mechanical shutter",
      "sort_order": 3
    },
    {
      "id": "s-prod-15-4",
      "product_id": "prod-15",
      "spec_key": "Video Recording",
      "spec_value": "6K oversampled uncropped 4K 60p 10-bit 4:2:2 internal, Full HD up to 180 fps, Canon Log 3",
      "sort_order": 4
    },
    {
      "id": "s-prod-15-5",
      "product_id": "prod-15",
      "spec_key": "Image Stabilization",
      "spec_value": "5-axis in-body image stabilization (IBIS) providing up to 8 stops of shake correction",
      "sort_order": 5
    },
    {
      "id": "s-prod-15-6",
      "product_id": "prod-15",
      "spec_key": "Storage & Connectivity",
      "spec_value": "Dual SD/SDHC/SDXC UHS-II card slots, USB-C 3.2 Gen 2, micro-HDMI, Wi-Fi, Bluetooth 5.0",
      "sort_order": 6
    }
  ],
  "sony-alpha-a7-iv-preowned": [
    {
      "id": "s-prod-22-1",
      "product_id": "prod-22",
      "spec_key": "Image Sensor",
      "spec_value": "33MP Full-Frame Exmor R CMOS Sensor (pristine condition, zero dust, scratches or dead pixels)",
      "sort_order": 1
    },
    {
      "id": "s-prod-22-2",
      "product_id": "prod-22",
      "spec_key": "Verified Shutter Count",
      "spec_value": "8,400 verified actuations (shutter rated for 500,000 actuations — only 1.7% used)",
      "sort_order": 2
    },
    {
      "id": "s-prod-22-3",
      "product_id": "prod-22",
      "spec_key": "Autofocus Performance",
      "spec_value": "759-point phase detection AF with Real-time Eye AF for Humans, Animals, and Birds",
      "sort_order": 3
    },
    {
      "id": "s-prod-22-4",
      "product_id": "prod-22",
      "spec_key": "Video Capabilities",
      "spec_value": "4K 60p 10-bit 4:2:2 in Super 35, 7K oversampled 4K 30p full-frame, S-Cinetone & S-Log3",
      "sort_order": 4
    },
    {
      "id": "s-prod-22-5",
      "product_id": "prod-22",
      "spec_key": "Image Stabilization",
      "spec_value": "5-axis 5.5-stop in-body optical image stabilization (IBIS) calibrated",
      "sort_order": 5
    },
    {
      "id": "s-prod-22-6",
      "product_id": "prod-22",
      "spec_key": "Included Accessories",
      "spec_value": "Original Sony NP-FZ100 battery, body cap, shoulder strap, USB-C charging cable",
      "sort_order": 6
    }
  ],
  "dji-osmo-pocket-3-creator-combo": [
    {
      "id": "s-prod-92-1",
      "product_id": "prod-92",
      "spec_key": "Camera Sensor",
      "spec_value": "1-inch CMOS sensor with f/2.0 aperture and 20mm equivalent focal length",
      "sort_order": 1
    },
    {
      "id": "s-prod-92-2",
      "product_id": "prod-92",
      "spec_key": "Video Resolution",
      "spec_value": "4K up to 120 fps, 3K (1:1 / 9:16 vertical), 10-bit D-Log M & HLG",
      "sort_order": 2
    },
    {
      "id": "s-prod-92-3",
      "product_id": "prod-92",
      "spec_key": "Stabilization",
      "spec_value": "3-axis mechanical motorized gimbal",
      "sort_order": 3
    },
    {
      "id": "s-prod-92-4",
      "product_id": "prod-92",
      "spec_key": "Display Screen",
      "spec_value": "2.0\" Rotatable OLED Touchscreen (314 x 556, 700 nits)",
      "sort_order": 4
    },
    {
      "id": "s-prod-92-5",
      "product_id": "prod-92",
      "spec_key": "Combo Inclusions",
      "spec_value": "DJI Mic 2 Transmitter, Battery Handle, Mini Tripod, Carrying Bag, Wide-Angle Lens",
      "sort_order": 5
    }
  ],
  "apple-airpods-pro-2": [
    {
      "id": "s-prod-14-1",
      "product_id": "prod-14",
      "spec_key": "Audio Processing",
      "spec_value": "Apple H2 headphone chip in earbuds, Apple U1 chip in MagSafe charging case",
      "sort_order": 1
    },
    {
      "id": "s-prod-14-2",
      "product_id": "prod-14",
      "spec_key": "Noise Control",
      "spec_value": "Up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, Conversation Awareness",
      "sort_order": 2
    },
    {
      "id": "s-prod-14-3",
      "product_id": "prod-14",
      "spec_key": "Spatial Audio",
      "spec_value": "Personalized Spatial Audio with dynamic head tracking",
      "sort_order": 3
    },
    {
      "id": "s-prod-14-4",
      "product_id": "prod-14",
      "spec_key": "Battery Life",
      "spec_value": "Up to 6 hours listening with ANC enabled (up to 30 hours total with USB-C MagSafe case)",
      "sort_order": 4
    },
    {
      "id": "s-prod-14-5",
      "product_id": "prod-14",
      "spec_key": "Water & Dust Resistance",
      "spec_value": "IP54 dust, sweat, and water resistant (earbuds and charging case)",
      "sort_order": 5
    },
    {
      "id": "s-prod-14-6",
      "product_id": "prod-14",
      "spec_key": "Case Features",
      "spec_value": "USB-C charging, Apple Watch charger support, MagSafe, built-in speaker chime, lanyard loop",
      "sort_order": 6
    }
  ],
  "sony-wh-1000xm5": [
    {
      "id": "s-prod-17-1",
      "product_id": "prod-17",
      "spec_key": "Noise Cancellation",
      "spec_value": "Dual processors: HD QN1 + Integrated V1 controlling 8 microphones with Auto NC Optimizer",
      "sort_order": 1
    },
    {
      "id": "s-prod-17-2",
      "product_id": "prod-17",
      "spec_key": "Drivers & Sound",
      "spec_value": "30mm carbon fiber composite dome drivers, Hi-Res Audio Wireless with LDAC, DSEE Extreme",
      "sort_order": 2
    },
    {
      "id": "s-prod-17-3",
      "product_id": "prod-17",
      "spec_key": "Call Clarity",
      "spec_value": "4 beamforming microphones with AI noise reduction algorithm & wind noise reduction structure",
      "sort_order": 3
    },
    {
      "id": "s-prod-17-4",
      "product_id": "prod-17",
      "spec_key": "Battery Life",
      "spec_value": "Up to 30 hours with ANC enabled (up to 40 hours with ANC turned off)",
      "sort_order": 4
    },
    {
      "id": "s-prod-17-5",
      "product_id": "prod-17",
      "spec_key": "Fast Charging",
      "spec_value": "3-minute charge delivers 3 hours of playback with USB-PD compatible AC charger",
      "sort_order": 5
    },
    {
      "id": "s-prod-17-6",
      "product_id": "prod-17",
      "spec_key": "Smart Features",
      "spec_value": "Multipoint Bluetooth connection (2 devices), Speak-to-Chat, Quick Attention mode",
      "sort_order": 6
    }
  ],
  "anker-power-bank-20000mah": [
    {
      "id": "s-prod-19-1",
      "product_id": "prod-19",
      "spec_key": "Battery Capacity",
      "spec_value": "20,000 mAh / 74Wh Lithium-Polymer cell capacity (airline carry-on approved)",
      "sort_order": 1
    },
    {
      "id": "s-prod-19-2",
      "product_id": "prod-19",
      "spec_key": "Max Output Power",
      "spec_value": "30W High-Speed USB-C Power Delivery 3.0",
      "sort_order": 2
    },
    {
      "id": "s-prod-19-3",
      "product_id": "prod-19",
      "spec_key": "Ports Configuration",
      "spec_value": "1x USB-C (30W max Input/Output), 2x USB-A (18W max Output) — 3 devices total",
      "sort_order": 3
    },
    {
      "id": "s-prod-19-4",
      "product_id": "prod-19",
      "spec_key": "Device Recharges",
      "spec_value": "iPhone 15 / 16 (~4.2x), Galaxy S24 (~3.8x), MacBook Air 13\" (~1.2x)",
      "sort_order": 4
    },
    {
      "id": "s-prod-19-5",
      "product_id": "prod-19",
      "spec_key": "Safety Protection",
      "spec_value": "Anker MultiProtect temperature sensor system, surge protection, and short-circuit prevention",
      "sort_order": 5
    },
    {
      "id": "s-prod-19-6",
      "product_id": "prod-19",
      "spec_key": "Recharge Time",
      "spec_value": "Approx 4.5 hours with a 30W USB-C PD wall charger",
      "sort_order": 6
    }
  ],
  "apple-magic-keyboard-ipad-pro": [
    {
      "id": "s-prod-25-1",
      "product_id": "prod-25",
      "spec_key": "Design",
      "spec_value": "Floating cantilever design with smooth magnetic angle adjustability",
      "sort_order": 1
    },
    {
      "id": "s-prod-25-2",
      "product_id": "prod-25",
      "spec_key": "Keyboard Type",
      "spec_value": "Full-size backlit keys with 1mm scissor key travel for silent, responsive typing",
      "sort_order": 2
    },
    {
      "id": "s-prod-25-3",
      "product_id": "prod-25",
      "spec_key": "Trackpad",
      "spec_value": "Built-in multi-touch glass trackpad for iPadOS precision cursor and gestures",
      "sort_order": 3
    },
    {
      "id": "s-prod-25-4",
      "product_id": "prod-25",
      "spec_key": "Charging Port",
      "spec_value": "USB-C pass-through charging port (frees up the iPad Pro USB-C port for accessories)",
      "sort_order": 4
    },
    {
      "id": "s-prod-25-5",
      "product_id": "prod-25",
      "spec_key": "Compatibility",
      "spec_value": "iPad Pro 12.9-inch (3rd, 4th, 5th, and 6th generation)",
      "sort_order": 5
    }
  ],
  "usb-c-fast-charger-65w": [
    {
      "id": "s-prod-26-1",
      "product_id": "prod-26",
      "spec_key": "Max Output",
      "spec_value": "65W Max Power Delivery 3.0",
      "sort_order": 1
    },
    {
      "id": "s-prod-26-2",
      "product_id": "prod-26",
      "spec_key": "Technology",
      "spec_value": "GaN II (Gallium Nitride) architecture for compact size, low heat, and high energy efficiency",
      "sort_order": 2
    },
    {
      "id": "s-prod-26-3",
      "product_id": "prod-26",
      "spec_key": "Output Ports",
      "spec_value": "2x USB-C (PowerIQ 3.0), 1x USB-A (PowerIQ 2.0)",
      "sort_order": 3
    },
    {
      "id": "s-prod-26-4",
      "product_id": "prod-26",
      "spec_key": "Single Port Mode",
      "spec_value": "Up to 65W on USB-C1 or USB-C2 (powers MacBooks, Dell XPS, & HP Spectre laptops)",
      "sort_order": 4
    },
    {
      "id": "s-prod-26-5",
      "product_id": "prod-26",
      "spec_key": "Multi-Port Mode",
      "spec_value": "Intelligent power distribution (45W + 20W dual charging for laptop + phone simultaneously)",
      "sort_order": 5
    },
    {
      "id": "s-prod-26-6",
      "product_id": "prod-26",
      "spec_key": "Safety System",
      "spec_value": "ActiveShield 2.0 dynamic temperature monitoring and voltage regulator",
      "sort_order": 6
    }
  ],
  "apple-airpods-max-usb-c": [
    {
      "id": "s-prod-93-1",
      "product_id": "prod-93",
      "spec_key": "Audio Driver",
      "spec_value": "Apple-designed 40mm dynamic driver with dual neodymium ring magnet motor",
      "sort_order": 1
    },
    {
      "id": "s-prod-93-2",
      "product_id": "prod-93",
      "spec_key": "Chips & ANC",
      "spec_value": "Apple H1 headphone chip in each ear cup (10 audio cores each), Pro ANC",
      "sort_order": 2
    },
    {
      "id": "s-prod-93-3",
      "product_id": "prod-93",
      "spec_key": "Spatial Audio",
      "spec_value": "Personalized Spatial Audio with dynamic head tracking",
      "sort_order": 3
    },
    {
      "id": "s-prod-93-4",
      "product_id": "prod-93",
      "spec_key": "Battery & Port",
      "spec_value": "Up to 20 hours listening with ANC/Spatial Audio on single charge, USB-C port",
      "sort_order": 4
    },
    {
      "id": "s-prod-93-5",
      "product_id": "prod-93",
      "spec_key": "Smart Case",
      "spec_value": "Storage in Smart Case puts headphones into ultra-low-power state",
      "sort_order": 5
    }
  ],
  "samsung-galaxy-buds2-pro": [
    {
      "id": "s-prod-94-1",
      "product_id": "prod-94",
      "spec_key": "Speakers",
      "spec_value": "Custom Coaxial 2-way speaker (10mm woofer + 5.3mm tweeter)",
      "sort_order": 1
    },
    {
      "id": "s-prod-94-2",
      "product_id": "prod-94",
      "spec_key": "Hi-Fi Codec",
      "spec_value": "24-bit Hi-Fi audio via Samsung Seamless Codec (SSC)",
      "sort_order": 2
    },
    {
      "id": "s-prod-94-3",
      "product_id": "prod-94",
      "spec_key": "Noise Cancellation",
      "spec_value": "Intelligent Active Noise Canceling (ANC) with Voice Detect",
      "sort_order": 3
    },
    {
      "id": "s-prod-94-4",
      "product_id": "prod-94",
      "spec_key": "Battery Life",
      "spec_value": "Up to 5 hours with ANC on (up to 18 hours with Qi charging case)",
      "sort_order": 4
    },
    {
      "id": "s-prod-94-5",
      "product_id": "prod-94",
      "spec_key": "Water Resistance",
      "spec_value": "IPX7 water resistance (submersible in 1 meter of fresh water for 30 mins)",
      "sort_order": 5
    }
  ],
  "sony-wf-1000xm5-earbuds": [
    {
      "id": "s-prod-95-1",
      "product_id": "prod-95",
      "spec_key": "Drivers",
      "spec_value": "8.4mm Dynamic Driver X with domed diaphragm architecture",
      "sort_order": 1
    },
    {
      "id": "s-prod-95-2",
      "product_id": "prod-95",
      "spec_key": "Processors",
      "spec_value": "Dual processing: HD QN2e + Integrated V2 with 3 mics per earbud",
      "sort_order": 2
    },
    {
      "id": "s-prod-95-3",
      "product_id": "prod-95",
      "spec_key": "Hi-Res Audio",
      "spec_value": "Hi-Res Audio Wireless via LDAC, DSEE Extreme AI upscaling",
      "sort_order": 3
    },
    {
      "id": "s-prod-95-4",
      "product_id": "prod-95",
      "spec_key": "Call Tech",
      "spec_value": "Bone conduction sensors + AI Deep Neural Network noise reduction",
      "sort_order": 4
    },
    {
      "id": "s-prod-95-5",
      "product_id": "prod-95",
      "spec_key": "Battery",
      "spec_value": "8 hours playback with ANC on (24 hours total with Qi wireless case)",
      "sort_order": 5
    }
  ],
  "bose-quietcomfort-45": [
    {
      "id": "s-prod-96-1",
      "product_id": "prod-96",
      "spec_key": "Noise Cancellation",
      "spec_value": "Acoustic Noise Cancelling with Quiet Mode and Aware Mode",
      "sort_order": 1
    },
    {
      "id": "s-prod-96-2",
      "product_id": "prod-96",
      "spec_key": "Sound Architecture",
      "spec_value": "TriPort acoustic architecture with Volume-optimized Active EQ",
      "sort_order": 2
    },
    {
      "id": "s-prod-96-3",
      "product_id": "prod-96",
      "spec_key": "Battery Life",
      "spec_value": "Up to 22 hours on a single charge via USB-C",
      "sort_order": 3
    },
    {
      "id": "s-prod-96-4",
      "product_id": "prod-96",
      "spec_key": "Cushions & Fit",
      "spec_value": "Smooth, pleatless synthetic leather cushions with minimal clamping force",
      "sort_order": 4
    },
    {
      "id": "s-prod-96-5",
      "product_id": "prod-96",
      "spec_key": "Connectivity",
      "spec_value": "Bluetooth 5.1 with multi-point pairing (up to 9 meters range)",
      "sort_order": 5
    }
  ],
  "oraimo-27000mah-power-bank": [
    {
      "id": "s-prod-97-1",
      "product_id": "prod-97",
      "spec_key": "Battery Capacity",
      "spec_value": "27,000 mAh / 99.9Wh High-Density Lithium-Polymer",
      "sort_order": 1
    },
    {
      "id": "s-prod-97-2",
      "product_id": "prod-97",
      "spec_key": "Charging Technology",
      "spec_value": "oraimo AniFast Smart Protocol Detection",
      "sort_order": 2
    },
    {
      "id": "s-prod-97-3",
      "product_id": "prod-97",
      "spec_key": "Outputs",
      "spec_value": "2x USB-A 5V/2.4A Max High-Speed Outputs",
      "sort_order": 3
    },
    {
      "id": "s-prod-97-4",
      "product_id": "prod-97",
      "spec_key": "Inputs",
      "spec_value": "1x Type-C (5V/2A) + 1x Micro-USB (5V/2A)",
      "sort_order": 4
    },
    {
      "id": "s-prod-97-5",
      "product_id": "prod-97",
      "spec_key": "Display & Torch",
      "spec_value": "LED Digital battery level indicator + built-in emergency LED flashlight",
      "sort_order": 5
    }
  ],
  "tp-link-archer-ax73-router": [
    {
      "id": "s-prod-98-1",
      "product_id": "prod-98",
      "spec_key": "Wi-Fi Speeds",
      "spec_value": "AX5400: 4804 Mbps on 5GHz (802.11ax, HE160) + 574 Mbps on 2.4GHz",
      "sort_order": 1
    },
    {
      "id": "s-prod-98-2",
      "product_id": "prod-98",
      "spec_key": "Processor",
      "spec_value": "1.5 GHz Triple-Core CPU",
      "sort_order": 2
    },
    {
      "id": "s-prod-98-3",
      "product_id": "prod-98",
      "spec_key": "Antennas & Tech",
      "spec_value": "6x High-Gain External Antennas, Beamforming, 4T4R, High-Power FEM",
      "sort_order": 3
    },
    {
      "id": "s-prod-98-4",
      "product_id": "prod-98",
      "spec_key": "Ethernet Ports",
      "spec_value": "1x Gigabit WAN port + 4x Gigabit LAN ports + 1x USB 3.0 sharing port",
      "sort_order": 4
    },
    {
      "id": "s-prod-98-5",
      "product_id": "prod-98",
      "spec_key": "Security",
      "spec_value": "WPA3, TP-Link HomeShield, SPI Firewall, Access Control",
      "sort_order": 5
    }
  ],
  "huawei-4g-mifi-router-e5577": [
    {
      "id": "s-prod-99-1",
      "product_id": "prod-99",
      "spec_key": "Network Support",
      "spec_value": "4G LTE Cat4 (150 Mbps DL / 50 Mbps UL), 3G DC-HSPA+",
      "sort_order": 1
    },
    {
      "id": "s-prod-99-2",
      "product_id": "prod-99",
      "spec_key": "SIM Compatibility",
      "spec_value": "Universal Unlocked (MTN, Airtel, Glo, 9mobile)",
      "sort_order": 2
    },
    {
      "id": "s-prod-99-3",
      "product_id": "prod-99",
      "spec_key": "Device Connections",
      "spec_value": "Connects up to 16 Wi-Fi enabled gadgets simultaneously",
      "sort_order": 3
    },
    {
      "id": "s-prod-99-4",
      "product_id": "prod-99",
      "spec_key": "Display Screen",
      "spec_value": "1.45\" TFT-LCD menu and network status display",
      "sort_order": 4
    },
    {
      "id": "s-prod-99-5",
      "product_id": "prod-99",
      "spec_key": "Battery",
      "spec_value": "1500 mAh replaceable rechargeable battery (up to 6h work / 300h standby)",
      "sort_order": 5
    }
  ],
  "tp-link-deco-x50-mesh-3pack": [
    {
      "id": "s-prod-100-1",
      "product_id": "prod-100",
      "spec_key": "Wi-Fi Speeds",
      "spec_value": "AX3000: 2402 Mbps on 5GHz + 574 Mbps on 2.4GHz",
      "sort_order": 1
    },
    {
      "id": "s-prod-100-2",
      "product_id": "prod-100",
      "spec_key": "Coverage Area",
      "spec_value": "Up to 6,500 sq ft / 600 m² (3-pack system)",
      "sort_order": 2
    },
    {
      "id": "s-prod-100-3",
      "product_id": "prod-100",
      "spec_key": "Deco Ports",
      "spec_value": "3x Gigabit Ports per unit (WAN/LAN auto-sensing)",
      "sort_order": 3
    },
    {
      "id": "s-prod-100-4",
      "product_id": "prod-100",
      "spec_key": "Mesh Roaming",
      "spec_value": "AI-Driven Mesh with 802.11k/v/r seamless roaming protocols",
      "sort_order": 4
    },
    {
      "id": "s-prod-100-5",
      "product_id": "prod-100",
      "spec_key": "Device Capacity",
      "spec_value": "Connects over 150 devices simultaneously without lag",
      "sort_order": 5
    }
  ],
  "samsung-t7-shield-1tb-ssd": [
    {
      "id": "s-prod-101-1",
      "product_id": "prod-101",
      "spec_key": "Capacity & Interface",
      "spec_value": "1TB NVMe Storage, USB 3.2 Gen 2 (10Gbps)",
      "sort_order": 1
    },
    {
      "id": "s-prod-101-2",
      "product_id": "prod-101",
      "spec_key": "Read/Write Speeds",
      "spec_value": "Up to 1,050 MB/s sequential read, up to 1,000 MB/s sequential write",
      "sort_order": 2
    },
    {
      "id": "s-prod-101-3",
      "product_id": "prod-101",
      "spec_key": "Durability Rating",
      "spec_value": "IP65 water/dust resistant, drop resistant up to 3 meters (9.8 ft)",
      "sort_order": 3
    },
    {
      "id": "s-prod-101-4",
      "product_id": "prod-101",
      "spec_key": "Security",
      "spec_value": "Optional password protection with AES 256-bit hardware encryption",
      "sort_order": 4
    },
    {
      "id": "s-prod-101-5",
      "product_id": "prod-101",
      "spec_key": "Included Cables",
      "spec_value": "USB Type-C to C cable + USB Type-C to A cable",
      "sort_order": 5
    }
  ],
  "sandisk-2tb-extreme-portable-ssd": [
    {
      "id": "s-prod-102-1",
      "product_id": "prod-102",
      "spec_key": "Capacity",
      "spec_value": "2TB (2,000GB) High-Speed NVMe Storage",
      "sort_order": 1
    },
    {
      "id": "s-prod-102-2",
      "product_id": "prod-102",
      "spec_key": "Transfer Speeds",
      "spec_value": "Up to 1050 MB/s Read, Up to 1000 MB/s Write (USB 3.2 Gen 2)",
      "sort_order": 2
    },
    {
      "id": "s-prod-102-3",
      "product_id": "prod-102",
      "spec_key": "Drop & Ingress",
      "spec_value": "IP65 water & dust resistance, 3-meter drop resistance",
      "sort_order": 3
    },
    {
      "id": "s-prod-102-4",
      "product_id": "prod-102",
      "spec_key": "Encryption",
      "spec_value": "Password protection with 256-bit AES hardware encryption",
      "sort_order": 4
    },
    {
      "id": "s-prod-102-5",
      "product_id": "prod-102",
      "spec_key": "Form Factor",
      "spec_value": "Compact pocketable design with integrated carabiner loop",
      "sort_order": 5
    }
  ],
  "wd-my-passport-2tb-external-hdd": [
    {
      "id": "s-prod-103-1",
      "product_id": "prod-103",
      "spec_key": "Storage Capacity",
      "spec_value": "2TB (2,000GB) 2.5\" Portable HDD",
      "sort_order": 1
    },
    {
      "id": "s-prod-103-2",
      "product_id": "prod-103",
      "spec_key": "Interface",
      "spec_value": "USB 3.2 Gen 1 (USB 3.0 / USB 2.0 compatible)",
      "sort_order": 2
    },
    {
      "id": "s-prod-103-3",
      "product_id": "prod-103",
      "spec_key": "Backup Software",
      "spec_value": "WD Backup with auto-schedule & cloud storage sync",
      "sort_order": 3
    },
    {
      "id": "s-prod-103-4",
      "product_id": "prod-103",
      "spec_key": "Security",
      "spec_value": "256-bit AES Hardware Encryption with WD Security password",
      "sort_order": 4
    },
    {
      "id": "s-prod-103-5",
      "product_id": "prod-103",
      "spec_key": "Compatibility",
      "spec_value": "Windows 11 / 10 / 8.1, macOS (requires reformatting)",
      "sort_order": 5
    }
  ],
  "sandisk-ultra-dual-drive-luxe-128gb": [
    {
      "id": "s-prod-104-1",
      "product_id": "prod-104",
      "spec_key": "Capacity",
      "spec_value": "128GB Solid State Flash Memory",
      "sort_order": 1
    },
    {
      "id": "s-prod-104-2",
      "product_id": "prod-104",
      "spec_key": "Dual Connectors",
      "spec_value": "USB 3.2 Gen 1 Type-C + USB 3.2 Gen 1 Type-A",
      "sort_order": 2
    },
    {
      "id": "s-prod-104-3",
      "product_id": "prod-104",
      "spec_key": "Read Speed",
      "spec_value": "High-speed read performance up to 400 MB/s",
      "sort_order": 3
    },
    {
      "id": "s-prod-104-4",
      "product_id": "prod-104",
      "spec_key": "Housing",
      "spec_value": "Full cast metal swivel housing with keyring hole",
      "sort_order": 4
    },
    {
      "id": "s-prod-104-5",
      "product_id": "prod-104",
      "spec_key": "App Support",
      "spec_value": "SanDisk Memory Zone app for automatic backup on Android",
      "sort_order": 5
    }
  ],
  "lg-ultragear-27-qhd-gaming-monitor": [
    {
      "id": "s-prod-105-1",
      "product_id": "prod-105",
      "spec_key": "Display & Panel",
      "spec_value": "27.0\" QHD (2560 x 1440) Nano IPS, 16:9, DCI-P3 98%, VESA DisplayHDR 400",
      "sort_order": 1
    },
    {
      "id": "s-prod-105-2",
      "product_id": "prod-105",
      "spec_key": "Refresh & Response",
      "spec_value": "165Hz (180Hz Overclock), 1ms (GtG at Faster)",
      "sort_order": 2
    },
    {
      "id": "s-prod-105-3",
      "product_id": "prod-105",
      "spec_key": "Sync Technologies",
      "spec_value": "NVIDIA G-SYNC Compatible, AMD FreeSync Premium",
      "sort_order": 3
    },
    {
      "id": "s-prod-105-4",
      "product_id": "prod-105",
      "spec_key": "Ports",
      "spec_value": "2x HDMI 2.0, 1x DisplayPort 1.4, USB 3.0 Hub (1 up / 2 down), Headphone Out",
      "sort_order": 4
    },
    {
      "id": "s-prod-105-5",
      "product_id": "prod-105",
      "spec_key": "Ergonomics",
      "spec_value": "Tilt, Height adjustment (110mm), Pivot (90° clockwise), VESA 100x100 wall mount",
      "sort_order": 5
    }
  ],
  "dell-ultrasharp-27-4k-monitor-u2723qe": [
    {
      "id": "s-prod-106-1",
      "product_id": "prod-106",
      "spec_key": "Resolution & Panel",
      "spec_value": "27\" 4K UHD (3840 x 2160) @ 60Hz, IPS Black Technology, 2000:1 contrast",
      "sort_order": 1
    },
    {
      "id": "s-prod-106-2",
      "product_id": "prod-106",
      "spec_key": "Color Accuracy",
      "spec_value": "100% sRGB, 100% Rec.709, 98% DCI-P3, Delta E < 2 factory calibration",
      "sort_order": 2
    },
    {
      "id": "s-prod-106-3",
      "product_id": "prod-106",
      "spec_key": "USB-C Hub Ports",
      "spec_value": "1x USB-C (90W PD / DP 1.4), 1x USB-C Upstream (data), 5x USB-A 10Gbps, 1x USB-C 15W",
      "sort_order": 3
    },
    {
      "id": "s-prod-106-4",
      "product_id": "prod-106",
      "spec_key": "Network & Video",
      "spec_value": "RJ-45 Ethernet (1Gbps), HDMI 2.0, DisplayPort 1.4 In, DisplayPort Out (MST Daisy Chain)",
      "sort_order": 4
    },
    {
      "id": "s-prod-106-5",
      "product_id": "prod-106",
      "spec_key": "Productivity",
      "spec_value": "Built-in Auto KVM, Picture-in-Picture (PiP), Picture-by-Picture (PbP)",
      "sort_order": 5
    }
  ],
  "logitech-mx-master-3s-mouse": [
    {
      "id": "s-prod-107-1",
      "product_id": "prod-107",
      "spec_key": "Sensor Technology",
      "spec_value": "Darkfield high precision, 200–8000 DPI (tracks on glass min. 4mm)",
      "sort_order": 1
    },
    {
      "id": "s-prod-107-2",
      "product_id": "prod-107",
      "spec_key": "Scroll Wheel",
      "spec_value": "MagSpeed Electromagnetic wheel with SmartShift auto-ratchet",
      "sort_order": 2
    },
    {
      "id": "s-prod-107-3",
      "product_id": "prod-107",
      "spec_key": "Quiet Clicks",
      "spec_value": "90% click noise reduction compared to MX Master 3",
      "sort_order": 3
    },
    {
      "id": "s-prod-107-4",
      "product_id": "prod-107",
      "spec_key": "Connectivity",
      "spec_value": "Bluetooth Low Energy + Logi Bolt USB Receiver (pairs with 3 devices)",
      "sort_order": 4
    },
    {
      "id": "s-prod-107-5",
      "product_id": "prod-107",
      "spec_key": "Battery Life",
      "spec_value": "500 mAh rechargeable Li-Po battery (up to 70 days, 1-min quick charge gives 3h)",
      "sort_order": 5
    }
  ],
  "logitech-mx-keys-s-keyboard": [
    {
      "id": "s-prod-108-1",
      "product_id": "prod-108",
      "spec_key": "Key Mechanism",
      "spec_value": "Spherically-dished Perfect Stroke scissor key switches",
      "sort_order": 1
    },
    {
      "id": "s-prod-108-2",
      "product_id": "prod-108",
      "spec_key": "Illumination",
      "spec_value": "Smart backlighting with hand proximity sensors & ambient light sensor",
      "sort_order": 2
    },
    {
      "id": "s-prod-108-3",
      "product_id": "prod-108",
      "spec_key": "Connectivity",
      "spec_value": "Bluetooth Low Energy & Logi Bolt USB Receiver (Easy-Switch for 3 devices)",
      "sort_order": 3
    },
    {
      "id": "s-prod-108-4",
      "product_id": "prod-108",
      "spec_key": "Battery",
      "spec_value": "Rechargeable Li-Po (1500 mAh) — up to 10 days with backlight, 5 months without",
      "sort_order": 4
    },
    {
      "id": "s-prod-108-5",
      "product_id": "prod-108",
      "spec_key": "Multi-OS Layout",
      "spec_value": "Dual key layout for Windows and macOS",
      "sort_order": 5
    }
  ],
  "logitech-brio-4k-webcam": [
    {
      "id": "s-prod-109-1",
      "product_id": "prod-109",
      "spec_key": "Resolution & Frame Rate",
      "spec_value": "4K Ultra HD @ 30 fps, 1080p Full HD @ 60/30 fps, 720p HD @ 90/60/30 fps",
      "sort_order": 1
    },
    {
      "id": "s-prod-109-2",
      "product_id": "prod-109",
      "spec_key": "Lighting & Sensor",
      "spec_value": "RightLight 3 with HDR auto-exposure adjustment",
      "sort_order": 2
    },
    {
      "id": "s-prod-109-3",
      "product_id": "prod-109",
      "spec_key": "Field of View",
      "spec_value": "Adjustable diagonal FOV: 65°, 78°, and 90° with 5x digital HD zoom",
      "sort_order": 3
    },
    {
      "id": "s-prod-109-4",
      "product_id": "prod-109",
      "spec_key": "Security & Mic",
      "spec_value": "Infrared sensor for Windows Hello facial recognition, Dual omnidirectional mics",
      "sort_order": 4
    },
    {
      "id": "s-prod-109-5",
      "product_id": "prod-109",
      "spec_key": "Privacy",
      "spec_value": "External detachable privacy shutter lens cover included",
      "sort_order": 5
    }
  ],
  "fujifilm-x-t5-mirrorless-camera": [
    {
      "id": "s-prod-147-1",
      "product_id": "prod-147",
      "spec_key": "Sensor",
      "spec_value": "40.2MP APS-C X-Trans CMOS 5 HR Sensor",
      "sort_order": 1
    },
    {
      "id": "s-prod-147-2",
      "product_id": "prod-147",
      "spec_key": "Image Stabilization",
      "spec_value": "5-Axis In-Body Image Stabilization (up to 7.0 stops)",
      "sort_order": 2
    },
    {
      "id": "s-prod-147-3",
      "product_id": "prod-147",
      "spec_key": "Video Specs",
      "spec_value": "6.2K at 30 fps, 4K HQ at 60 fps, Full HD at 240 fps (10-bit 4:2:2 F-Log2)",
      "sort_order": 3
    },
    {
      "id": "s-prod-147-4",
      "product_id": "prod-147",
      "spec_key": "Shutter Speed",
      "spec_value": "Up to 1/180,000 sec electronic shutter speed",
      "sort_order": 4
    }
  ],
  "gopro-hero12-black": [
    {
      "id": "s-prod-148-1",
      "product_id": "prod-148",
      "spec_key": "Video Resolution",
      "spec_value": "5.3K60, 4K120, 2.7K240, 1080p240 slow motion",
      "sort_order": 1
    },
    {
      "id": "s-prod-148-2",
      "product_id": "prod-148",
      "spec_key": "Stabilization",
      "spec_value": "HyperSmooth 6.0 with AutoBoost + 360° Horizon Lock",
      "sort_order": 2
    },
    {
      "id": "s-prod-148-3",
      "product_id": "prod-148",
      "spec_key": "Waterproof Rating",
      "spec_value": "Waterproof to 33 ft (10 m) without external housing",
      "sort_order": 3
    },
    {
      "id": "s-prod-148-4",
      "product_id": "prod-148",
      "spec_key": "Audio & Bluetooth",
      "spec_value": "Wireless audio support for AirPods and Bluetooth microphones, 8x slo-mo",
      "sort_order": 4
    }
  ],
  "apple-studio-display-27-5k": [
    {
      "id": "s-prod-149-1",
      "product_id": "prod-149",
      "spec_key": "Display & Resolution",
      "spec_value": "27.0\" 5K Retina (5120 x 2880) @ 60Hz, 218 PPI, 600 nits, P3 wide color",
      "sort_order": 1
    },
    {
      "id": "s-prod-149-2",
      "product_id": "prod-149",
      "spec_key": "Camera & Silicon",
      "spec_value": "12MP Ultra Wide camera with Center Stage, powered by Apple A13 Bionic",
      "sort_order": 2
    },
    {
      "id": "s-prod-149-3",
      "product_id": "prod-149",
      "spec_key": "Audio Architecture",
      "spec_value": "High-fidelity six-speaker system with force-cancelling woofers & Spatial Audio",
      "sort_order": 3
    },
    {
      "id": "s-prod-149-4",
      "product_id": "prod-149",
      "spec_key": "Thunderbolt Hub",
      "spec_value": "1x Thunderbolt 3 (96W host laptop charge) + 3x USB-C (up to 10Gbps)",
      "sort_order": 4
    }
  ],
  "keychron-k2-wireless-keyboard": [
    {
      "id": "s-prod-150-1",
      "product_id": "prod-150",
      "spec_key": "Layout & Switches",
      "spec_value": "75% 84-Key layout, Hot-swappable Gateron G Pro Brown tactile switches",
      "sort_order": 1
    },
    {
      "id": "s-prod-150-2",
      "product_id": "prod-150",
      "spec_key": "Frame & Materials",
      "spec_value": "CNC Aluminum bezels with ABS body and double-shot keycaps",
      "sort_order": 2
    },
    {
      "id": "s-prod-150-3",
      "product_id": "prod-150",
      "spec_key": "Connectivity",
      "spec_value": "Bluetooth 5.1 (3 devices) + USB Type-C wired mode (1000Hz polling)",
      "sort_order": 3
    },
    {
      "id": "s-prod-150-4",
      "product_id": "prod-150",
      "spec_key": "Battery",
      "spec_value": "4000 mAh rechargeable Li-polymer battery",
      "sort_order": 4
    }
  ],
  "kingston-xs2000-1tb-portable-ssd": [
    {
      "id": "s-prod-151-1",
      "product_id": "prod-151",
      "spec_key": "Interface & Speeds",
      "spec_value": "USB 3.2 Gen 2x2 (20Gbps), up to 2,000 MB/s Read, 2,000 MB/s Write",
      "sort_order": 1
    },
    {
      "id": "s-prod-151-2",
      "product_id": "prod-151",
      "spec_key": "Dimensions & Weight",
      "spec_value": "69.54 x 32.58 x 13.5 mm, ultralight 28.9 grams",
      "sort_order": 2
    },
    {
      "id": "s-prod-151-3",
      "product_id": "prod-151",
      "spec_key": "Durability",
      "spec_value": "IP55 water and dust resistant with rubber protective sleeve",
      "sort_order": 3
    },
    {
      "id": "s-prod-151-4",
      "product_id": "prod-151",
      "spec_key": "Compatibility",
      "spec_value": "Windows 11/10, macOS, Linux, Chrome OS, Android, iPadOS",
      "sort_order": 4
    }
  ],
  "wd-my-passport-4tb-external-hdd": [
    {
      "id": "s-prod-152-1",
      "product_id": "prod-152",
      "spec_key": "Storage Capacity",
      "spec_value": "4TB (4,000GB) 2.5\" High-Capacity Portable HDD",
      "sort_order": 1
    },
    {
      "id": "s-prod-152-2",
      "product_id": "prod-152",
      "spec_key": "Interface",
      "spec_value": "USB 3.2 Gen 1 (USB 3.0 / USB 2.0 compatible)",
      "sort_order": 2
    },
    {
      "id": "s-prod-152-3",
      "product_id": "prod-152",
      "spec_key": "Security",
      "spec_value": "256-bit AES Hardware Encryption with password protection",
      "sort_order": 3
    },
    {
      "id": "s-prod-152-4",
      "product_id": "prod-152",
      "spec_key": "Dimensions",
      "spec_value": "107.2 x 75 x 19.15 mm, 210 grams",
      "sort_order": 4
    }
  ]
};

export const mockConditionReports: Record<string, ConditionReport> = {
  "iphone-15-pro-256gb-preowned": {
    "id": "cr-prod-3",
    "product_id": "prod-3",
    "battery_health": "94% original battery health capacity (tested & certified)",
    "cosmetic_condition": "Grade A+ condition: Flawless Super Retina screen (zero scratches), clean titanium edges with minimal normal hand wear",
    "inspection_report": "Comprehensive 48-point diagnostic passed: Face ID, OLED touch response, 120Hz ProMotion, A17 Pro processor, 48MP triple camera array, 3x Telephoto lens, USB-C 10Gbps port, speakers, and wireless charging verified 100% operational.",
    "accessories_included": [
      "Original Apple braided USB-C charging cable",
      "Protective silicone case",
      "Tempered glass screen protector applied",
      "BuyAndSellOutlets 48-Point Diagnostic Card"
    ],
    "warranty_period": "6 Months BuyAndSellOutlets Warranty"
  },
  "iphone-14-128gb-preowned": {
    "id": "cr-prod-30",
    "product_id": "prod-30",
    "battery_health": "89% original battery capacity (verified & tested)",
    "cosmetic_condition": "Grade A condition: Clean screen with zero deep scratches, minor micro-wear on aluminum frame edges",
    "inspection_report": "32-point hardware checklist completed: Face ID, OLED digitizer, dual cameras, Lightning port, Wi-Fi, and speakers functioning properly.",
    "accessories_included": [
      "Lightning to USB-C charging cable",
      "BuyAndSellOutlets Warranty Card"
    ],
    "warranty_period": "6 Months BuyAndSellOutlets Warranty"
  },
  "macbook-air-m3-preowned": {
    "id": "cr-prod-7",
    "product_id": "prod-7",
    "battery_health": "97% original battery health (only 38 charge cycles)",
    "cosmetic_condition": "Grade A+ condition: Pristine Liquid Retina screen, zero chassis dents, clean trackpad with no key shine",
    "inspection_report": "Full hardware diagnostic passed: Apple M3 processor, Liquid Retina display (zero dead pixels), Magic Keyboard, Force Touch trackpad, MagSafe 3 port, dual Thunderbolt ports, Wi-Fi 6E, and Bluetooth 5.3 all 100% verified.",
    "accessories_included": [
      "Original Apple 35W Dual USB-C Power Adapter",
      "Braided MagSafe 3 cable",
      "Original box packaging",
      "BuyAndSellOutlets Inspection Card"
    ],
    "warranty_period": "6 Months BuyAndSellOutlets Warranty"
  },
  "playstation-5-preowned": {
    "id": "cr-prod-21",
    "product_id": "prod-21",
    "battery_health": "N/A (Console hardware)",
    "cosmetic_condition": "Grade A condition: Console faceplates clean with minor normal cosmetic wear on base stand; fan thoroughly cleaned",
    "inspection_report": "Full benchmark testing passed: Ultra HD Blu-ray disc drive reads and ejects flawlessly, 825GB SSD health is 100%, HDMI 2.1 4K 120Hz output verified, thermal performance optimal under full load. DualSense controller haptics and analog sticks calibrated with zero stick drift.",
    "accessories_included": [
      "One original DualSense Wireless Controller",
      "HDMI 2.1 High-Speed Cable",
      "AC Power Cord",
      "Console Base Stand",
      "BuyAndSellOutlets Warranty Card"
    ],
    "warranty_period": "6 Months BuyAndSellOutlets Warranty"
  },
  "sony-alpha-a7-iv-preowned": {
    "id": "cr-prod-22",
    "product_id": "prod-22",
    "battery_health": "100% original battery capacity (Sony NP-FZ100)",
    "cosmetic_condition": "Grade A+ condition: Magnesium alloy body in like-new condition, LCD screen has tempered protector, sensor pristine with zero dust or micro-scratches",
    "inspection_report": "Full professional camera diagnostic passed: 33MP Exmor R sensor pristine, mechanical shutter tested (8,400 verified actuations out of 500,000 lifespan), 5-axis IBIS calibrated, 759-point AF verified, dual SD / CFexpress card slots operational.",
    "accessories_included": [
      "Original Sony NP-FZ100 Rechargeable Battery",
      "Sony Body Cap",
      "Sony Alpha Shoulder Strap",
      "USB-C Charging Cable",
      "BuyAndSellOutlets Diagnostic Certificate"
    ],
    "warranty_period": "6 Months BuyAndSellOutlets Warranty"
  }
};
