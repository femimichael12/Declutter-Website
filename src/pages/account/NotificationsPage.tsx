import { useEffect, useState } from 'react';
import { Bell, Check, Package, Info, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import type { Notification } from '@/types';

const iconMap: Record<string, typeof Bell> = {
  order: Package,
  info: Info,
  alert: AlertCircle,
};

export function NotificationsPage() {
  const { session } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function load() {
      if (!session?.user?.id) {
        setNotifications([]);
        return;
      }

      if (db) {
        try {
          const q = query(collection(db, 'notifications'), where('user_id', '==', session.user.id));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const list: Notification[] = [];
            snap.forEach((d) => list.push({ id: d.id, ...(d.data() as Omit<Notification, 'id'>) }));
            list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setNotifications(list);
            return;
          }
        } catch (err) {
          console.warn('Firestore notifications fallback:', err);
        }
      }

      try {
        const raw = localStorage.getItem(`notifications_${session.user.id}`);
        if (raw) {
          setNotifications(JSON.parse(raw));
        } else {
          setNotifications([]);
        }
      } catch {
        setNotifications([]);
      }
    }
    load();
  }, [session]);

  function saveToLocal(list: Notification[]) {
    if (session?.user?.id) {
      try {
        localStorage.setItem(`notifications_${session.user.id}`, JSON.stringify(list));
      } catch {
        // ignore
      }
    }
  }

  async function markRead(id: string) {
    if (db) {
      try {
        await updateDoc(doc(db, 'notifications', id), { is_read: true });
      } catch {
        // ignore
      }
    }
    const next = notifications.map((n) => (n.id === id ? { ...n, is_read: true } : n));
    setNotifications(next);
    saveToLocal(next);
  }

  async function markAllRead() {
    if (!session?.user?.id) return;
    if (db) {
      try {
        const unread = notifications.filter((n) => !n.is_read);
        for (const u of unread) {
          await updateDoc(doc(db, 'notifications', u.id), { is_read: true }).catch(() => {});
        }
      } catch {
        // ignore
      }
    }
    const next = notifications.map((n) => ({ ...n, is_read: true }));
    setNotifications(next);
    saveToLocal(next);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold text-navy-900">Notifications</h2>
        {notifications.some((n) => !n.is_read) && (
          <button onClick={markAllRead} className="text-sm text-royal-600 hover:underline">Mark all as read</button>
        )}
      </div>
      {notifications.length === 0 ? (
        <div className="card p-12 text-center">
          <Bell className="mx-auto h-12 w-12 text-navy-300 mb-3" />
          <p className="text-navy-500">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => {
            const Icon = iconMap[notif.type] ?? Bell;
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`card p-4 flex items-start gap-3 ${!notif.is_read ? 'border-royal-300' : ''}`}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 ${notif.is_read ? 'bg-navy-100' : 'bg-royal-100'}`}>
                  <Icon className={`h-4 w-4 ${notif.is_read ? 'text-navy-400' : 'text-royal-600'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-navy-900">{notif.title}</p>
                  {notif.body && <p className="text-sm text-navy-500 mt-0.5">{notif.body}</p>}
                  <p className="text-xs text-navy-400 mt-1">{new Date(notif.created_at).toLocaleString()}</p>
                </div>
                {!notif.is_read && (
                  <button onClick={() => markRead(notif.id)} className="p-1.5 text-navy-400 hover:text-royal-600 transition">
                    <Check className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
