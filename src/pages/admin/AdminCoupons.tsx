import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/context/ToastContext';
import { mockProducts, mockCategories, mockCoupons, mockBanners, mockReviews, mockSettings } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import type { Coupon } from '@/types';

export function AdminCoupons() {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [form, setForm] = useState({ code: '', type: 'percent' as 'percent' | 'fixed', value: '', min_order: '', max_discount: '', usage_limit: '', expires_at: '' });

  useEffect(() => { load(); }, []);

  async function load() {
    if (!isSupabaseConfigured || !supabase) { setCoupons(mockCoupons); return; }
    const { data } = await supabase!.from('coupons').select('*').order('created_at', { ascending: false });
    setCoupons(data as Coupon[] ?? []);
  }

  function openAdd() { setEditing(null); setForm({ code: '', type: 'percent', value: '', min_order: '', max_discount: '', usage_limit: '', expires_at: '' }); setShowForm(true); }
  function openEdit(c: Coupon) {
    setEditing(c);
    setForm({ code: c.code, type: c.type, value: String(c.value), min_order: String(c.min_order), max_discount: c.max_discount ? String(c.max_discount) : '', usage_limit: c.usage_limit ? String(c.usage_limit) : '', expires_at: c.expires_at ? c.expires_at.split('T')[0] : '' });
    setShowForm(true);
  }

  async function save() {
    if (!form.code || !form.value) { toast('Code and value are required', 'error'); return; }
    const data = {
      code: form.code.toUpperCase(),
      type: form.type,
      value: Number(form.value),
      min_order: Number(form.min_order) || 0,
      max_discount: form.max_discount ? Number(form.max_discount) : null,
      usage_limit: form.usage_limit ? Number(form.usage_limit) : null,
      expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
      is_active: true,
    };
    if (editing) {
      const { error } = await supabase!.from('coupons').update(data).eq('id', editing.id);
      if (error) toast('Failed to update', 'error'); else toast('Coupon updated');
    } else {
      const { error } = await supabase!.from('coupons').insert(data);
      if (error) toast('Failed to create', 'error'); else toast('Coupon created');
    }
    setShowForm(false); load();
  }

  async function remove(c: Coupon) {
    if (!confirm(`Delete coupon "${c.code}"?`)) return;
    await supabase!.from('coupons').delete().eq('id', c.id);
    toast('Coupon deleted', 'info'); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-navy-900">Coupons ({coupons.length})</h1>
        <button onClick={openAdd} className="btn-primary"><Plus className="h-4 w-4" /> Add Coupon</button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-navy-50">
            <tr>
              <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3">Code</th>
              <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3">Type</th>
              <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3">Value</th>
              <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3 hidden sm:table-cell">Used</th>
              <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3 hidden sm:table-cell">Expires</th>
              <th className="text-right text-xs font-semibold text-navy-500 px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-navy-50/50">
                <td className="px-4 py-3"><span className="font-mono font-semibold text-navy-900">{c.code}</span></td>
                <td className="px-4 py-3 text-sm text-navy-600">{c.type}</td>
                <td className="px-4 py-3 text-sm font-semibold text-navy-900">{c.type === 'percent' ? `${c.value}%` : formatPrice(c.value)}</td>
                <td className="px-4 py-3 text-sm text-navy-500 hidden sm:table-cell">{c.used_count}/{c.usage_limit ?? '∞'}</td>
                <td className="px-4 py-3 text-sm text-navy-500 hidden sm:table-cell">{c.expires_at ? new Date(c.expires_at).toLocaleDateString() : 'Never'}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(c)} className="p-1.5 text-navy-400 hover:text-royal-600 transition"><Edit className="h-4 w-4" /></button>
                  <button onClick={() => remove(c)} className="p-1.5 text-navy-400 hover:text-rose-500 transition"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowForm(false)} className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} className="fixed inset-x-4 top-20 z-50 mx-auto max-w-md glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-navy-900">{editing ? 'Edit' : 'Add'} Coupon</h2>
                <button onClick={() => setShowForm(false)} className="text-navy-400"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-3">
                <div><label className="text-sm font-medium mb-1 block">Code</label><input className="input py-2 text-sm" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-sm font-medium mb-1 block">Type</label><select className="input py-2 text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as 'percent' | 'fixed' })}><option value="percent">Percent</option><option value="fixed">Fixed</option></select></div>
                  <div><label className="text-sm font-medium mb-1 block">Value</label><input type="number" className="input py-2 text-sm" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} /></div>
                </div>
                <div><label className="text-sm font-medium mb-1 block">Min Order (₦)</label><input type="number" className="input py-2 text-sm" value={form.min_order} onChange={(e) => setForm({ ...form, min_order: e.target.value })} /></div>
                <div><label className="text-sm font-medium mb-1 block">Max Discount (₦)</label><input type="number" className="input py-2 text-sm" value={form.max_discount} onChange={(e) => setForm({ ...form, max_discount: e.target.value })} /></div>
                <div><label className="text-sm font-medium mb-1 block">Usage Limit</label><input type="number" className="input py-2 text-sm" value={form.usage_limit} onChange={(e) => setForm({ ...form, usage_limit: e.target.value })} /></div>
                <div><label className="text-sm font-medium mb-1 block">Expires At</label><input type="date" className="input py-2 text-sm" value={form.expires_at} onChange={(e) => setForm({ ...form, expires_at: e.target.value })} /></div>
              </div>
              <button onClick={save} className="btn-primary w-full mt-4">{editing ? 'Update' : 'Create'} Coupon</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
