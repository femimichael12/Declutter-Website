import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/products';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { formatPrice } from '@/lib/utils';
import type { Order, Product } from '@/types';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    customers: 0,
    pendingOrders: 0,
    lowStock: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const products = await getProducts();
        let orders: Order[] = [];
        let customersCount = 0;

        if (isFirebaseConfigured && db) {
          try {
            const ordersSnap = await getDocs(collection(db, 'orders'));
            ordersSnap.forEach((d) => orders.push({ id: d.id, ...(d.data() as Omit<Order, 'id'>) }));

            const profilesSnap = await getDocs(collection(db, 'profiles'));
            customersCount = profilesSnap.size;
          } catch (err) {
            console.warn('Firestore stats query fallback:', err);
          }
        }

        orders.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

        const revenue = orders
          .filter((o) => o.payment_status === 'paid')
          .reduce((sum, o) => sum + Number(o.total || 0), 0);

        setStats({
          revenue,
          orders: orders.length,
          products: products.length,
          customers: customersCount,
          pendingOrders: orders.filter((o) => o.status === 'pending' || o.status === 'confirmed').length,
          lowStock: products.filter((p) => p.stock <= 5).length,
        });

        setRecentOrders(orders.slice(0, 5));
        setTopProducts([...products].sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0)).slice(0, 5));
      } catch (err) {
        console.error('Error loading admin dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="skeleton h-96 rounded-2xl" />;
  }

  const cards = [
    { label: 'Total Revenue', value: formatPrice(stats.revenue), icon: DollarSign, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Orders', value: stats.orders, icon: ShoppingCart, color: 'from-royal-500 to-royal-600' },
    { label: 'Products', value: stats.products, icon: Package, color: 'from-amber-500 to-amber-600' },
    { label: 'Customers', value: stats.customers, icon: Users, color: 'from-navy-500 to-navy-600' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-navy-900">Dashboard Overview</h1>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-5"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} mb-3`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm text-navy-500">{card.label}</p>
              <p className="font-display text-2xl font-bold text-navy-900 mt-1">{card.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Alerts */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/admin/orders" className="card p-4 flex items-center gap-3 hover:shadow-soft-lg transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
            <TrendingUp className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-navy-900">{stats.pendingOrders} Pending Orders</p>
            <p className="text-sm text-navy-500">Awaiting processing</p>
          </div>
          <ArrowRight className="h-4 w-4 text-navy-400" />
        </Link>
        <Link to="/admin/products" className="card p-4 flex items-center gap-3 hover:shadow-soft-lg transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100">
            <Package className="h-5 w-5 text-rose-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-navy-900">{stats.lowStock} Low Stock Items</p>
            <p className="text-sm text-navy-500">5 or fewer in stock</p>
          </div>
          <ArrowRight className="h-4 w-4 text-navy-400" />
        </Link>
      </div>

      {/* Recent orders + top products */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="font-display text-lg font-bold text-navy-900 mb-4">Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-navy-500">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-navy-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-navy-900">#{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-navy-500">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-navy-900">{formatPrice(order.total)}</p>
                    <span className="text-xs text-navy-500 capitalize">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5">
          <h2 className="font-display text-lg font-bold text-navy-900 mb-4">Top Selling Products</h2>
          {topProducts.length === 0 ? (
            <p className="text-sm text-navy-500">No products yet.</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((p) => (
                <div key={p.id} className="flex items-center gap-3 py-2 border-b border-navy-100 last:border-0">
                  <img src={p.images[0]} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy-900 truncate">{p.name}</p>
                    <p className="text-xs text-navy-500">{p.sales_count} sold</p>
                  </div>
                  <span className="text-sm font-bold text-navy-900">{formatPrice(p.price)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
