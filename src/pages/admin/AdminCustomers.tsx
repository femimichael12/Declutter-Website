import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';
import { mockProducts, mockCategories, mockCoupons, mockBanners, mockReviews, mockSettings } from '@/lib/mockData';
import type { Profile, Order } from '@/types';

export function AdminCustomers() {
  const [customers, setCustomers] = useState<Profile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured || !supabase) { setCustomers([]); setOrders([]); setLoading(false); return; }
      const [profRes, orderRes] = await Promise.all([
        supabase!.from('profiles').select('*').eq('role', 'customer').order('created_at', { ascending: false }),
        supabase!.from('orders').select('*'),
      ]);
      setCustomers(profRes.data as Profile[] ?? []);
      setOrders(orderRes.data as Order[] ?? []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="skeleton h-96 rounded-2xl" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy-900 mb-6">Customers ({customers.length})</h1>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-navy-50">
            <tr>
              <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3">Customer</th>
              <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3 hidden sm:table-cell">Phone</th>
              <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3">Orders</th>
              <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3">Total Spent</th>
              <th className="text-left text-xs font-semibold text-navy-500 px-4 py-3 hidden sm:table-cell">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {customers.map((c) => {
              const custOrders = orders.filter((o) => o.user_id === c.id);
              const totalSpent = custOrders.filter((o) => o.payment_status === 'paid').reduce((sum, o) => sum + Number(o.total), 0);
              return (
                <tr key={c.id} className="hover:bg-navy-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-600 text-white text-xs font-bold">
                        {c.full_name?.[0]?.toUpperCase() ?? c.email[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900">{c.full_name ?? 'Unknown'}</p>
                        <p className="text-xs text-navy-500">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-600 hidden sm:table-cell">{c.phone ?? 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-navy-600">{custOrders.length}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-navy-900">{formatPrice(totalSpent)}</td>
                  <td className="px-4 py-3 text-sm text-navy-500 hidden sm:table-cell">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
