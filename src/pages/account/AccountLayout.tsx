import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, MapPin, Heart, Bell, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const navItems = [
  { to: '/account', label: 'Profile', icon: User, end: true },
  { to: '/account/orders', label: 'Orders', icon: Package },
  { to: '/account/addresses', label: 'Addresses', icon: MapPin },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/account/notifications', label: 'Notifications', icon: Bell },
];

export function AccountLayout() {
  const { profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isSupabaseConfigured) return; if (!loading && !profile) navigate('/login?redirect=/account');
  }, [profile, loading, navigate]);

  if (!isSupabaseConfigured) return null;

  return (
    <div className="container-page py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-navy-900">My Account</h1>
        <p className="text-sm text-navy-500">Welcome back, {profile!.full_name ?? profile!.email}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="card p-4">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-navy-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-royal-600 text-white font-bold">
                {profile!.full_name?.[0]?.toUpperCase() ?? profile!.email[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-navy-900 truncate">{profile!.full_name ?? 'Account'}</p>
                <p className="text-xs text-navy-500 truncate">{profile!.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? 'bg-royal-50 text-royal-700'
                          : 'text-navy-600 hover:bg-navy-50'
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" /> {item.label}
                  </NavLink>
                );
              })}
              <button
                onClick={() => signOut().then(() => navigate('/'))}
                className="flex w-full items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ProfilePage() {
  const { profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    const { error } = await supabase!.from('profiles').update({ full_name: fullName, phone }).eq('id', profile!.id);
    if (error) toast('Failed to update profile', 'error');
    else {
      await refreshProfile();
      toast('Profile updated');
    }
    setSaving(false);
  }

  return (
    <div className="card p-6">
      <h2 className="font-display text-lg font-bold text-navy-900 mb-4">Profile Information</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-navy-700 mb-1.5 block">Full Name</label>
          <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-700 mb-1.5 block">Email</label>
          <input className="input opacity-60" value={profile?.email ?? ''} disabled />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-700 mb-1.5 block">Phone</label>
          <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234..." />
        </div>
      </div>
      <button onClick={handleSave} disabled={saving} className="btn-primary mt-5">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
