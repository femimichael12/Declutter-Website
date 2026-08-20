import { useEffect, useState } from 'react';
import { Check, X, Star } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/context/ToastContext';
import { mockProducts, mockCategories, mockCoupons, mockBanners, mockReviews, mockSettings } from '@/lib/mockData';
import type { Review } from '@/types';

export function AdminReviews() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'all'>('pending');

  useEffect(() => { load(); }, []);

  async function load() {
    if (!isSupabaseConfigured || !supabase) { setReviews(mockReviews); return; }
    const { data } = await supabase!.from('reviews').select('*').order('created_at', { ascending: false });
    setReviews(data as Review[] ?? []);
  }

  async function approve(r: Review) {
    await supabase!.from('reviews').update({ is_approved: true }).eq('id', r.id);
    toast('Review approved');
    load();
  }

  async function remove(r: Review) {
    if (!confirm('Delete this review?')) return;
    await supabase!.from('reviews').delete().eq('id', r.id);
    toast('Review deleted', 'info');
    load();
  }

  const filtered = filter === 'all' ? reviews : filter === 'approved' ? reviews.filter((r) => r.is_approved) : reviews.filter((r) => !r.is_approved);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy-900 mb-6">Review Moderation</h1>

      <div className="flex gap-2 mb-4">
        {(['pending', 'approved', 'all'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition ${filter === f ? 'bg-royal-600 text-white' : 'bg-navy-100 text-navy-600'}`}>
            {f} ({f === 'pending' ? reviews.filter((r) => !r.is_approved).length : f === 'approved' ? reviews.filter((r) => r.is_approved).length : reviews.length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center text-navy-500">No reviews found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-navy-900">{r.author_name ?? 'Anonymous'}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-navy-300'}`} />
                      ))}
                    </div>
                    {r.is_approved ? (
                      <span className="badge bg-emerald-100 text-emerald-700">Approved</span>
                    ) : (
                      <span className="badge bg-amber-100 text-amber-700">Pending</span>
                    )}
                  </div>
                  {r.title && <p className="font-medium text-sm text-navy-900">{r.title}</p>}
                  {r.comment && <p className="text-sm text-navy-600 mt-1">{r.comment}</p>}
                  <p className="text-xs text-navy-400 mt-2">{new Date(r.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-1">
                  {!r.is_approved && (
                    <button onClick={() => approve(r)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition" title="Approve">
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button onClick={() => remove(r)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition" title="Delete">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
