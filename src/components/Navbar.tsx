import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search, ShoppingCart, Heart, User, Menu, X, ShoppingBag,
  ChevronRight, Package, LogOut, LayoutDashboard, Bell,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { mockProducts } from '@/lib/mockData';
import type { Product } from '@/types';
import { Logo } from './Logo';
import { ProductImage } from './ProductImage';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop All', path: '/products' },
  { label: 'Flash Deals', path: '/products?filter=flash-deals' },
  { label: 'Pre-Owned', path: '/products?condition=pre-owned' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const { count } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { profile, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      if (!isSupabaseConfigured || !supabase) {
        const ql = searchQuery.toLowerCase();
        setSearchResults(mockProducts.filter((p) => p.name.toLowerCase().includes(ql)).slice(0, 6));
        return;
      }
      const { data } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${searchQuery}%`)
        .eq('is_active', true)
        .limit(6);
      setSearchResults((data as Product[]) ?? []);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-soft' : 'bg-white'
        }`}
      >
        <div className="container-page">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <Logo />

            {/* Search - desktop */}
            <div ref={searchRef} className="relative hidden flex-1 max-w-xl md:block">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchOpen(true);
                    }}
                    onFocus={() => setSearchOpen(true)}
                    placeholder="Search for phones, laptops, TVs..."
                    className="w-full rounded-xl border border-navy-200 bg-navy-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-royal-500 focus:bg-white"
                  />
                </div>
              </form>
              <AnimatePresence>
                {searchOpen && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 w-full overflow-hidden rounded-xl glass-strong shadow-soft-lg"
                  >
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        className="flex items-center gap-3 p-3 hover:bg-navy-50 transition"
                      >
                        <div className="h-12 w-12 rounded-lg bg-navy-50/80 p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                          <ProductImage src={p.images[0]} alt={p.name} className="h-full w-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy-900 truncate">{p.name}</p>
                          <p className="text-xs text-navy-500">{p.brand}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-navy-400" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1 ml-auto">
              <Link
                to="/compare"
                className="hidden sm:block rounded-lg p-2.5 text-navy-600 hover:bg-navy-100 transition"
                aria-label="Compare"
              >
                <Package className="h-5 w-5" />
              </Link>

              <Link
                to="/wishlist"
                className="relative rounded-lg p-2.5 text-navy-600 hover:bg-navy-100 transition"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative rounded-lg p-2.5 text-navy-600 hover:bg-navy-100 transition"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-royal-600 px-1 text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </Link>

              {/* User menu */}
              {profile ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-lg p-2.5 text-navy-600 hover:bg-navy-100 transition"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-royal-600 text-white text-xs font-bold">
                      {profile.full_name?.[0]?.toUpperCase() ?? profile.email[0]?.toUpperCase()}
                    </div>
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl glass-strong shadow-soft-lg py-1"
                      >
                        <div className="px-4 py-2 border-b border-navy-100">
                          <p className="text-sm font-semibold text-navy-900 truncate">
                            {profile.full_name ?? 'Account'}
                          </p>
                          <p className="text-xs text-navy-500 truncate">{profile.email}</p>
                        </div>
                        <Link to="/account" className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-700 hover:bg-navy-50 transition">
                          <User className="h-4 w-4" /> My Account
                        </Link>
                        <Link to="/account/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-700 hover:bg-navy-50 transition">
                          <Package className="h-4 w-4" /> Orders
                        </Link>
                        <Link to="/wishlist" className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-700 hover:bg-navy-50 transition">
                          <Heart className="h-4 w-4" /> Wishlist
                        </Link>
                        {isAdmin && (
                          <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-royal-600 hover:bg-navy-50 transition font-medium">
                            <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => signOut()}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-navy-50 transition"
                        >
                          <LogOut className="h-4 w-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex btn-primary text-sm py-2 ml-1"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden rounded-lg p-2.5 text-navy-600 hover:bg-navy-100 transition"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Nav links - desktop */}
          <nav className="hidden md:flex items-center gap-1 h-11 -mt-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path.split('?')[0]))
                    ? 'text-royal-600 bg-royal-50'
                    : 'text-navy-600 hover:bg-navy-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-navy-100"
            >
              <div className="container-page py-4 space-y-3">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="input pl-10"
                    />
                  </div>
                </form>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-navy-700 hover:bg-navy-50 transition"
                  >
                    {link.label}
                  </Link>
                ))}
                {!profile && (
                  <Link to="/login" className="btn-primary w-full">Sign In</Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
