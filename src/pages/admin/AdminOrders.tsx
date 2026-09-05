import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/lib/utils';
import type { Order, OrderItem, OrderStatus } from '@/types';

const statuses: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-royal-100 text-royal-700',
  processing: 'bg-royal-100 text-royal-700',
  shipped: 'bg-royal-100 text-royal-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-rose-100 text-rose-700',
  refunded: 'bg-navy-100 text-navy-600',
};

export function AdminOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    if (!isFirebaseConfigured || !db) {
      setOrders([]);
      setLoading(false);
      return;
    }
    try {
      const snap = await getDocs(collection(db, 'orders'));
      const list: Order[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...(d.data() as Omit<Order, 'id'>) }));
      list.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
      setOrders(list);
    } catch (err) {
      console.warn('Error loading orders from Firestore:', err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleOrder(id: string) {
    if (expanded === id) {
      setExpanded(null);
      return;
    }
    setExpanded(id);
    if (!orderItems[id] && isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'order_items'), where('order_id', '==', id));
        const snap = await getDocs(q);
        const items: OrderItem[] = [];
        snap.forEach((d) => items.push({ id: d.id, ...(d.data() as Omit<OrderItem, 'id'>) }));
        setOrderItems((prev) => ({ ...prev, [id]: items }));
      } catch (err) {
        console.warn('Error loading order items:', err);
      }
    }
  }

  async function updateStatus(orderId: string, status: OrderStatus) {
    if (!isFirebaseConfigured || !db) return;
    try {
      await updateDoc(doc(db, 'orders', orderId), { status, updated_at: new Date().toISOString() });
      toast('Order status updated');
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    } catch {
      toast('Failed to update status', 'error');
    }
  }

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy-900 mb-6">Orders ({orders.length})</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${filter === 'all' ? 'bg-royal-600 text-white' : 'bg-navy-100 text-navy-600'}`}
        >
          All ({orders.length})
        </button>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition capitalize ${filter === s ? 'bg-royal-600 text-white' : 'bg-navy-100 text-navy-600'}`}
          >
            {s} ({orders.filter((o) => o.status === s).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="skeleton h-64 rounded-2xl" />
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center text-navy-500">No orders found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="card overflow-hidden">
              <button onClick={() => toggleOrder(order.id)} className="w-full flex items-center justify-between p-4 hover:bg-navy-50 transition">
                <div className="flex items-center gap-4">
                  <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
                  <div className="text-left">
                    <p className="font-semibold text-navy-900">#{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-navy-500">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-navy-900">{formatPrice(order.total)}</span>
                  <ChevronDown className={`h-4 w-4 text-navy-400 transition-transform ${expanded === order.id ? 'rotate-180' : ''}`} />
                </div>
              </button>
              <AnimatePresence>
                {expanded === order.id && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-navy-100">
                    <div className="p-4">
                      <div className="space-y-2 mb-4">
                        {(orderItems[order.id] ?? []).map((item) => (
                          <div key={item.id} className="flex gap-3 text-sm">
                            {item.image_url && <img src={item.image_url} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />}
                            <div className="flex-1">
                              <p className="font-medium text-navy-900">{item.name}</p>
                              <p className="text-xs text-navy-500">Qty: {item.quantity} · {formatPrice(item.price)}</p>
                            </div>
                            <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      {order.shipping_address && (
                        <div className="mb-4 p-3 rounded-lg bg-navy-50 text-sm">
                          <p className="font-medium text-navy-700 mb-1">Shipping Address:</p>
                          <p className="text-navy-500">
                            {(order.shipping_address as { full_name?: string }).full_name ?? ''} · {(order.shipping_address as { phone?: string }).phone ?? ''}
                          </p>
                          <p className="text-navy-500">
                            {(order.shipping_address as { address_line1?: string }).address_line1 ?? ''}, {(order.shipping_address as { city?: string }).city ?? ''}, {(order.shipping_address as { state?: string }).state ?? ''}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-navy-700">Update status:</label>
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                          className="input py-1.5 text-sm w-auto"
                        >
                          {statuses.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
