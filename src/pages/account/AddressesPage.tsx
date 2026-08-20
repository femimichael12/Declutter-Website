import { useEffect, useState } from 'react';
import { Plus, Trash2, MapPin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import type { Address } from '@/types';

export function AddressesPage() {
  const { session } = useAuth();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    full_name: '', phone: '', address_line1: '', address_line2: '', city: '', state: '', postal_code: '',
  });

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured || !supabase) return;
    if (!session) return;
      const { data } = await supabase!.from('addresses').select('*').eq('user_id', session.user.id).order('is_default', { ascending: false });
      setAddresses(data as Address[] ?? []);
    }
    load();
  }, [session]);

  async function addAddress() {
    if (!session) return;
    const { data } = await supabase!.from('addresses').insert({
      user_id: session.user.id,
      label: 'Address',
      ...form,
      is_default: addresses.length === 0,
    }).select().maybeSingle();
    if (data) {
      setAddresses((prev) => [...prev, data as Address]);
      setForm({ full_name: '', phone: '', address_line1: '', address_line2: '', city: '', state: '', postal_code: '' });
      setShowForm(false);
      toast('Address added');
    }
  }

  async function deleteAddress(id: string) {
    await supabase!.from('addresses').delete().eq('id', id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast('Address removed', 'info');
  }

  async function setDefault(id: string) {
    if (!session) return;
    await supabase!.from('addresses').update({ is_default: false }).eq('user_id', session.user.id).neq('id', id);
    await supabase!.from('addresses').update({ is_default: true }).eq('id', id);
    setAddresses((prev) => prev.map((a) => ({ ...a, is_default: a.id === id })));
    toast('Default address updated');
  }

  return (
    <div className="space-y-3">
      <button onClick={() => setShowForm((v) => !v)} className="btn-primary w-full">
        <Plus className="h-4 w-4" /> Add New Address
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-4 overflow-hidden"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="input py-2 text-sm" placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
              <input className="input py-2 text-sm" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className="input py-2 text-sm sm:col-span-2" placeholder="Address line 1" value={form.address_line1} onChange={(e) => setForm({ ...form, address_line1: e.target.value })} />
              <input className="input py-2 text-sm sm:col-span-2" placeholder="Address line 2 (optional)" value={form.address_line2} onChange={(e) => setForm({ ...form, address_line2: e.target.value })} />
              <input className="input py-2 text-sm" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <input className="input py-2 text-sm" placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
              <input className="input py-2 text-sm" placeholder="Postal code" value={form.postal_code} onChange={(e) => setForm({ ...form, postal_code: e.target.value })} />
            </div>
            <button onClick={addAddress} className="btn-primary mt-3 text-sm">Save Address</button>
          </motion.div>
        )}
      </AnimatePresence>

      {addresses.length === 0 && !showForm ? (
        <div className="card p-12 text-center">
          <MapPin className="mx-auto h-12 w-12 text-navy-300 mb-3" />
          <p className="text-navy-500">No saved addresses yet.</p>
        </div>
      ) : (
        addresses.map((addr) => (
          <div key={addr.id} className="card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-royal-600 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-navy-900">{addr.full_name}</p>
                    {addr.is_default && <span className="badge bg-emerald-100 text-emerald-700">Default</span>}
                  </div>
                  <p className="text-sm text-navy-500 mt-0.5">
                    {addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ''}, {addr.city}, {addr.state}
                  </p>
                  <p className="text-sm text-navy-500">{addr.phone}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {!addr.is_default && (
                  <button onClick={() => setDefault(addr.id)} className="p-2 text-navy-400 hover:text-emerald-600 transition" title="Set as default">
                    <Check className="h-4 w-4" />
                  </button>
                )}
                <button onClick={() => deleteAddress(addr.id)} className="p-2 text-navy-400 hover:text-rose-500 transition">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
