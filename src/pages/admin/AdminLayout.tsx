import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard, Package, Tag, ShoppingCart, Users, Ticket, Image,
  Settings, Star, Menu, X, ShoppingBag, ArrowLeft,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Tag },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { to: '/admin/banners', label: 'Banners', icon: Image },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminLayout() {
  const { profile, loading, isAdmin, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isDemoMode && (!profile || !isAdmin)) navigate('/');
  }, [profile, loading, isAdmin, isDemoMode, navigate]);

  useEffect(() => setSidebarOpen(false), [location.pathname]);

  if (!isDemoMode && (!profile || !isAdmin)) return null;

  return (
    <div className="min-h-screen bg-navy-50 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-navy-950/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 z-50 h-screen w-64 flex-shrink-0 bg-navy-900 border-r border-navy-800 transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex h-16 items-center justify-between px-5 border-b border-navy-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <ShoppingBag className="h-5 w-5 text-royal-600" />
            </div>
            <span className="font-display font-bold text-white">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-navy-400">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-royal-600 text-white'
                      : 'text-navy-300 hover:bg-navy-800 hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4" /> {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-navy-800">
          <Link to="/" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-navy-300 hover:bg-navy-800 transition">
            <ArrowLeft className="h-4 w-4" /> Back to Store
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 glass-strong border-b border-navy-200">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-navy-600">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm text-navy-500">
              Welcome, <span className="font-semibold text-navy-900">{isDemoMode ? 'Demo Admin' : (profile?.full_name ?? 'Admin')}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isDemoMode && (
              <span className="badge bg-amber-100 text-amber-700">Demo Mode</span>
            )}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-royal-600 text-white text-xs font-bold">
              {isDemoMode ? 'D' : (profile?.full_name?.[0]?.toUpperCase() ?? 'A')}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
