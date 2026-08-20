import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    if (error) toast(error, 'error');
    else {
      setSent(true);
      toast('Password reset link sent to your email');
    }
    setLoading(false);
  }

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <h1 className="font-display text-2xl font-bold text-navy-900">Check Your Email</h1>
              <p className="mt-2 text-sm text-navy-500">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>
              <Link to="/login" className="btn-primary mt-6 inline-flex">
                <ArrowLeft className="h-4 w-4" /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-navy-900 text-center mb-2">Reset Password</h1>
              <p className="text-sm text-navy-500 text-center mb-6">
                Enter your email and we'll send you a reset link.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
              <Link to="/login" className="mt-5 flex items-center justify-center gap-1 text-sm text-navy-500 hover:text-royal-600">
                <ArrowLeft className="h-4 w-4" /> Back to Sign In
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
