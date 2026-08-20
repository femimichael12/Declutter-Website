import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/context/ToastContext';
import { mockProducts, mockCategories, mockCoupons, mockBanners, mockReviews, mockSettings } from '@/lib/mockData';
import type { Banner } from '@/types';

export function AdminBanners() {
  const { toast } = useToast();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState({ title: '', subtitle: '', image_url: '', cta_text: '', cta_link: '' });

  useEffect(() => { load(); }, []);

  async function load() {
    if (!isSupabaseConfigured || !supabase) { setBanners(mockBanners); return; }
    const { data } = await supabase!.from('banners').select('*').order('sort_order');
    setBanners(data as Banner[] ?? []);
  }

  function openAdd() { setEditing(null); setForm({ title: '', subtitle: '', image_url: '', cta_text: '', cta_link: '' }); setShowForm(true); }
  function openEdit(b: Banner) { setEditing(b); setForm({ title: b.title, subtitle: b.subtitle ?? '', image_url: b.image_url ?? '', cta_text: b.cta_text ?? '', cta_link: b.cta_link ?? '' }); setShowForm(true); }

  async function save() {
    if (!form.title || !form.image_url) { toast('Title and image URL are required', 'error'); return; }
    const data = { title: form.title, subtitle: form.subtitle || null, image_url: form.image_url, cta_text: form.cta_text || null, cta_link: form.cta_link || null, is_active: true };
    if (editing) {
      const { error } = await supabase!.from('banners').update(data).eq('id', editing.id);
      if (error) toast('Failed to update', 'error'); else toast('Banner updated');
    } else {
      const { error } = await supabase!.from('banners').insert({ ...data, sort_order: banners.length + 1 });
      if (error) toast('Failed to create', 'error'); else toast('Banner created');
    }
    setShowForm(false); load();
  }

  async function remove(b: Banner) {
    if (!confirm('Delete this banner?')) return;
    await supabase!.from('banners').delete().eq('id', b.id);
    toast('Banner deleted', 'info'); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-navy-900">Banners ({banners.length})</h1>
        <button onClick={openAdd} className="btn-primary"><Plus className="h-4 w-4" /> Add Banner</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {banners.map((b) => (
          <div key={b.id} className="card overflow-hidden">
            <div className="relative h-40">
              <img src={b.image_url ?? ''} alt={b.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <p className="font-display font-bold text-white">{b.title}</p>
                {b.subtitle && <p className="text-sm text-white/80 line-clamp-1">{b.subtitle}</p>}
              </div>
            </div>
            <div className="p-3 flex justify-end gap-1">
              <button onClick={() => openEdit(b)} className="p-2 text-navy-400 hover:text-royal-600 transition"><Edit className="h-4 w-4" /></button>
              <button onClick={() => remove(b)} className="p-2 text-navy-400 hover:text-rose-500 transition"><Trash2 className="h-4 w-4" /></button>
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
                <h2 className="font-display text-lg font-bold text-navy-900">{editing ? 'Edit' : 'Add'} Banner</h2>
                <button onClick={() => setShowForm(false)} className="text-navy-400"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-3">
                <div><label className="text-sm font-medium mb-1 block">Title</label><input className="input py-2 text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="text-sm font-medium mb-1 block">Subtitle</label><input className="input py-2 text-sm" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></div>
                <div><label className="text-sm font-medium mb-1 block">Image URL</label><input className="input py-2 text-sm" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></div>
                <div><label className="text-sm font-medium mb-1 block">CTA Text</label><input className="input py-2 text-sm" value={form.cta_text} onChange={(e) => setForm({ ...form, cta_text: e.target.value })} /></div>
                <div><label className="text-sm font-medium mb-1 block">CTA Link</label><input className="input py-2 text-sm" value={form.cta_link} onChange={(e) => setForm({ ...form, cta_link: e.target.value })} /></div>
              </div>
              <button onClick={save} className="btn-primary w-full mt-4">{editing ? 'Update' : 'Create'} Banner</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
