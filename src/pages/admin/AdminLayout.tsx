import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Users,
  Ticket,
  Image,
  Settings,
  Star,
  Menu,
  X,
  ShoppingBag,
  ArrowLeft,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  KeyRound,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products & Authentic Photos', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Tag },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { to: '/admin/banners', label: 'Banners', icon: Image },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminLayout() {
  const { profile, loading, isAdmin, signIn, signUp, signInWithGoogle, promoteToAdmin } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center">
        <div className="skeleton h-32 w-32 rounded-2xl" />
      </div>
    );
  }

  // If user is not an administrator, render the Admin Portal Authentication Screen
  if (!profile || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-600 text-white shadow-soft-lg mb-4">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Store Administrator Portal
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Sign in to manage authentic inventory, upload real product photos, and handle orders.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-navy-900/90 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-3xl border border-navy-800 shadow-2xl space-y-6"
          >
            {/* If user is signed in as a customer, allow one-click elevation */}
            {profile && !isAdmin ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  <p className="font-bold">Signed in as: {profile.email}</p>
                  <p className="mt-1 text-slate-400">
                    Your current account role is <span className="font-semibold text-white">"{profile.role}"</span>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    setSubmitting(true);
                    const res = await promoteToAdmin();
                    if (res.error) {
                      toast(res.error, 'error');
                    } else {
                      toast('Administrator access granted!', 'success');
                    }
                    setSubmitting(false);
                  }}
                  disabled={submitting}
                  className="btn-primary w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                  <span>Unlock Administrator Access</span>
                </button>
              </div>
            ) : (
              /* If not signed in at all, render Admin Sign-in Form */
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  if (authMode === 'signin') {
                    const res = await signIn(email, password);
                    if (res.error) {
                      toast(res.error, 'error');
                    } else {
                      toast('Welcome to the Admin Dashboard!', 'success');
                    }
                  } else {
                    const res = await signUp(email, password, fullName || 'Administrator');
                    if (res.error) {
                      toast(res.error, 'error');
                    } else {
                      toast('Admin account created!', 'success');
                    }
                  }
                  setSubmitting(false);
                }}
                className="space-y-4"
              >
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Administrator Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Store Manager"
                      className="input h-11 text-xs sm:text-sm w-full rounded-xl bg-navy-800 border-navy-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@buyandselloutlets.com"
                      className="input pl-10 h-11 text-xs sm:text-sm w-full rounded-xl bg-navy-800 border-navy-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input pl-10 pr-10 h-11 text-xs sm:text-sm w-full rounded-xl bg-navy-800 border-navy-700 text-white placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-soft hover:shadow-soft-lg mt-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>{authMode === 'signin' ? 'Sign In to Admin Portal' : 'Create Admin Account'}</span>
                    </>
                  )}
                </button>

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={async () => {
                    setSubmitting(true);
                    const res = await signInWithGoogle();
                    if (res.error) {
                      toast(res.error, 'error');
                    } else {
                      toast('Signed in via Google', 'success');
                    }
                    setSubmitting(false);
                  }}
                  disabled={submitting}
                  className="w-full py-2.5 px-4 rounded-xl border border-navy-700 bg-navy-800 hover:bg-navy-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <span>Sign In with Google</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                    className="text-xs text-royal-400 hover:text-royal-300 font-medium"
                  >
                    {authMode === 'signin'
                      ? 'Need an admin account? Create one here'
                      : 'Already have an account? Sign in'}
                  </button>
                </div>
              </form>
            )}

            <div className="pt-4 border-t border-navy-800 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition font-medium"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Storefront</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-navy-50 flex">
      {/* Sidebar Mobile Overlay */}
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

      {/* Main Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-50 h-screen w-64 flex-shrink-0 bg-navy-900 border-r border-navy-800 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 border-b border-navy-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-600 text-white shadow-soft">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display font-bold text-white block text-sm">BuyAndSellOutlets</span>
              <span className="text-[10px] text-royal-400 font-semibold uppercase tracking-wider">Admin Suite</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-navy-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)] no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition ${
                    isActive
                      ? 'bg-royal-600 text-white shadow-soft'
                      : 'text-navy-300 hover:bg-navy-800 hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-navy-800 bg-navy-900">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-navy-300 hover:bg-navy-800 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 sm:px-6 glass-strong border-b border-navy-200">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-navy-600 p-2 rounded-lg">
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden lg:block">
            <p className="text-xs sm:text-sm text-navy-500">
              Welcome back, <span className="font-bold text-navy-900">{profile?.full_name ?? profile?.email ?? 'Admin'}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-royal-50 border border-royal-200/80 px-3 py-1.5 rounded-full">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-royal-600 text-white text-[11px] font-bold">
                {profile?.full_name?.[0]?.toUpperCase() ?? profile?.email?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <span className="text-xs font-bold text-royal-700 hidden sm:inline">Administrator</span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
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
