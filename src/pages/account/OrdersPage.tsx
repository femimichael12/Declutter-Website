import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import type { Order, OrderItem, OrderStatus } from '@/types';

const statusConfig: Record<OrderStatus, { color: string; icon: typeof Clock; label: string }> = {
  pending: { color: 'bg-amber-100 text-amber-700', icon: Clock, label: 'Pending' },
  confirmed: { color: 'bg-royal-100 text-royal-700', icon: CheckCircle, label: 'Confirmed' },
  processing: { color: 'bg-royal-100 text-royal-700', icon: Package, label: 'Processing' },
  shipped: { color: 'bg-royal-100 text-royal-700', icon: Truck, label: 'Shipped' },
  delivered: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle, label: 'Delivered' },
  cancelled: { color: 'bg-rose-100 text-rose-700', icon: XCircle, label: 'Cancelled' },
  refunded: { color: 'bg-navy-100 text-navy-600', icon: XCircle, label: 'Refunded' },
};

export function OrdersPage() {
  const { session } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!session?.user?.id) {
        setOrders([]);
        setLoading(false);
        return;
      }

      if (db) {
        try {
          const q = query(collection(db, 'orders'), where('user_id', '==', session.user.id));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const list: Order[] = [];
            snap.forEach((d) => {
              list.push({ id: d.id, ...(d.data() as Omit<Order, 'id'>) });
            });
            list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setOrders(list);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Firestore orders query fallback:', err);
        }
      }

      // Check local storage for placed orders
      try {
        const raw = localStorage.getItem(`orders_${session.user.id}`);
        if (raw) {
          setOrders(JSON.parse(raw));
        } else {
          setOrders([]);
        }
      } catch {
        setOrders([]);
      }
      setLoading(false);
    }
    load();
  }, [session]);

  async function toggleOrder(orderId: string) {
    if (expanded === orderId) {
      setExpanded(null);
      return;
    }
    setExpanded(orderId);
    if (!orderItems[orderId]) {
      if (db) {
        try {
          const q = query(collection(db, 'order_items'), where('order_id', '==', orderId));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const items: OrderItem[] = [];
            snap.forEach((d) => items.push({ id: d.id, ...(d.data() as Omit<OrderItem, 'id'>) }));
            setOrderItems((prev) => ({ ...prev, [orderId]: items }));
            return;
          }
        } catch {
          // fallback
        }
      }
      // Check local order items
      try {
        const raw = localStorage.getItem(`order_items_${orderId}`);
        if (raw) {
          setOrderItems((prev) => ({ ...prev, [orderId]: JSON.parse(raw) }));
        }
      } catch {
        // ignore
      }
    }
  }

  if (loading) {
    return <div className="card p-6"><div className="skeleton h-32 rounded-xl" /></div>;
  }

  if (orders.length === 0) {
    return (
      <div className="card p-12 text-center">
        <Package className="mx-auto h-12 w-12 text-navy-300 mb-3" />
        <h2 className="font-display text-lg font-bold text-navy-900">No orders yet</h2>
        <p className="text-sm text-navy-500 mt-1">When you place orders, they'll appear here.</p>
        <Link to="/products" className="btn-primary mt-4 inline-flex">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => {
        const cfg = statusConfig[order.status] ?? statusConfig.pending;
        const StatusIcon = cfg.icon;
        return (
          <div key={order.id} className="card overflow-hidden">
            <button
              onClick={() => toggleOrder(order.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-navy-50 transition"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${cfg.color}`}>
                  <StatusIcon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-navy-900">#{order.id.slice(0, 8)}</p>
                  <p className="text-xs text-navy-500">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${cfg.color}`}>{cfg.label}</span>
                <span className="font-bold text-navy-900">{formatPrice(order.total)}</span>
                <ChevronDown className={`h-4 w-4 text-navy-400 transition-transform ${expanded === order.id ? 'rotate-180' : ''}`} />
              </div>
            </button>
            <AnimatePresence>
              {expanded === order.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-navy-100"
                >
                  <div className="p-4 space-y-3">
                    {(orderItems[order.id] ?? []).map((item) => (
                      <div key={item.id} className="flex gap-3">
                        {item.image_url && <img src={item.image_url} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-navy-900">{item.name}</p>
                          <p className="text-xs text-navy-500">Qty: {item.quantity} · {formatPrice(item.price)}</p>
                        </div>
                        <span className="text-sm font-semibold text-navy-900">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-navy-100 flex justify-between text-sm">
                      <span className="text-navy-500">Total</span>
                      <span className="font-bold text-navy-900">{formatPrice(order.total)}</span>
                    </div>
                    {order.tracking_number && (
                      <p className="text-sm text-navy-600">Tracking: {order.tracking_number}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
