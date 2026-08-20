import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { isSupabaseConfigured } from '@/lib/supabase';

export function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) toast(error, 'error');
      else {
        toast('Welcome back!');
        navigate(redirect);
      }
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) toast(error, 'error');
      else {
        toast('Account created! Welcome to BuyAndSellOutlets.');
        navigate(redirect);
      }
    }
    setLoading(false);
  }

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <div className="text-center mb-6">
            <div className="mx-auto h-12 w-12 rounded-xl bg-navy-900 flex items-center justify-center mb-3">
              <ShoppingBag className="h-6 w-6 text-royal-500" />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy-900">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="mt-1 text-sm text-navy-500">
              {mode === 'login' ? 'Sign in to your BuyAndSellOutlets account' : 'Join BuyAndSellOutlets today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-sm font-medium text-navy-700 mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="input pl-10"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-navy-700 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-navy-200" />
            <span className="text-xs font-medium text-navy-400">OR</span>
            <div className="h-px flex-1 bg-navy-200" />
          </div>

          {/* Google Sign-In */}
          <button
            onClick={async () => {
              const { error } = await signInWithGoogle();
              if (error) toast(error, 'error');
            }}
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-navy-200 bg-white px-5 py-3 text-sm font-semibold text-navy-700 shadow-soft transition-all hover:bg-navy-50 hover:border-navy-300 active:scale-[0.98]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="mt-5 text-center text-sm text-navy-500">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-royal-600 hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-royal-600 hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </div>

          {!isSupabaseConfigured && (
            <div className="mt-4 p-3 rounded-xl bg-amber-50 text-sm text-amber-700 text-center">
              Demo Mode: Authentication is disabled. The app is running without a database.
            </div>
          )}

          {mode === 'login' && (
            <div className="mt-3 text-center">
              <Link to="/reset-password" className="text-sm text-navy-500 hover:text-royal-600">
                Forgot your password?
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
