import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/context/ToastContext';
import { mockProducts, mockCategories, mockCoupons, mockBanners, mockReviews, mockSettings } from '@/lib/mockData';
import { slugify } from '@/lib/utils';
import type { Category } from '@/types';

export function AdminCategories() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', icon: '', description: '' });

  useEffect(() => { load(); }, []);

  async function load() {
    if (!isSupabaseConfigured || !supabase) { setCategories(mockCategories); return; }
    const { data } = await supabase!.from('categories').select('*').order('sort_order');
    setCategories(data as Category[] ?? []);
  }

  function openAdd() { setEditing(null); setForm({ name: '', slug: '', icon: '', description: '' }); setShowForm(true); }
  function openEdit(c: Category) { setEditing(c); setForm({ name: c.name, slug: c.slug, icon: c.icon ?? '', description: c.description ?? '' }); setShowForm(true); }

  async function save() {
    if (!form.name) { toast('Name is required', 'error'); return; }
    const data = { name: form.name, slug: form.slug || slugify(form.name), icon: form.icon || null, description: form.description || null };
    if (editing) {
      const { error } = await supabase!.from('categories').update(data).eq('id', editing.id);
      if (error) toast('Failed to update', 'error'); else toast('Category updated');
    } else {
      const { error } = await supabase!.from('categories').insert({ ...data, sort_order: categories.length + 1 });
      if (error) toast('Failed to create', 'error'); else toast('Category created');
    }
    setShowForm(false); load();
  }

  async function remove(c: Category) {
    if (!confirm(`Delete "${c.name}"?`)) return;
    const { error } = await supabase!.from('categories').delete().eq('id', c.id);
    if (error) toast('Cannot delete — products are using this category', 'error');
    else { toast('Category deleted', 'info'); load(); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-navy-900">Categories ({categories.length})</h1>
        <button onClick={openAdd} className="btn-primary"><Plus className="h-4 w-4" /> Add Category</button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="card p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-navy-900">{c.name}</p>
              <p className="text-xs text-navy-500">/{c.slug}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEdit(c)} className="p-2 text-navy-400 hover:text-royal-600 transition"><Edit className="h-4 w-4" /></button>
              <button onClick={() => remove(c)} className="p-2 text-navy-400 hover:text-rose-500 transition"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowForm(false)} className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} className="fixed inset-x-4 top-20 z-50 mx-auto max-w-md glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-navy-900">{editing ? 'Edit' : 'Add'} Category</h2>
                <button onClick={() => setShowForm(false)} className="text-navy-400"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-3">
                <div><label className="text-sm font-medium mb-1 block">Name</label><input className="input py-2 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })} /></div>
                <div><label className="text-sm font-medium mb-1 block">Slug</label><input className="input py-2 text-sm" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
                <div><label className="text-sm font-medium mb-1 block">Icon (lucide icon name)</label><input className="input py-2 text-sm" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Smartphone" /></div>
                <div><label className="text-sm font-medium mb-1 block">Description</label><input className="input py-2 text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              </div>
              <button onClick={save} className="btn-primary w-full mt-4">{editing ? 'Update' : 'Create'} Category</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
