import { useEffect, useState } from 'react';
import { Plus, Trash2, MapPin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';
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

  const getStorageKey = () => (session?.user?.id ? `addresses_${session.user.id}` : 'addresses_guest');

  useEffect(() => {
    async function load() {
      if (!session?.user?.id) return;

      // Try Firestore first
      if (db) {
        try {
          const q = query(collection(db, 'addresses'), where('user_id', '==', session.user.id));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const list: Address[] = [];
            snap.forEach((d) => {
              list.push({ id: d.id, ...(d.data() as Omit<Address, 'id'>) });
            });
            list.sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0));
            setAddresses(list);
            return;
          }
        } catch (err) {
          console.warn('Could not read addresses from Firestore, checking localStorage:', err);
        }
      }

      // Fallback to localStorage
      try {
        const raw = localStorage.getItem(getStorageKey());
        if (raw) {
          setAddresses(JSON.parse(raw));
        }
      } catch {
        setAddresses([]);
      }
    }
    load();
  }, [session]);

  function saveToLocal(list: Address[]) {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(list));
    } catch {
      // ignore
    }
  }

  async function addAddress() {
    if (!session?.user?.id) return;
    const isFirst = addresses.length === 0;
    const newAddrData = {
      user_id: session.user.id,
      label: 'Address',
      ...form,
      country: 'Nigeria',
      is_default: isFirst,
      created_at: new Date().toISOString(),
    };

    let createdId = `addr-${Date.now()}`;

    if (db) {
      try {
        const docRef = await addDoc(collection(db, 'addresses'), newAddrData);
        createdId = docRef.id;
      } catch (err) {
        console.warn('Failed to add address in Firestore, saving locally:', err);
      }
    }

    const newAddr: Address = { id: createdId, ...newAddrData };
    const next = isFirst ? [newAddr] : [...addresses, newAddr];
    setAddresses(next);
    saveToLocal(next);
    setForm({ full_name: '', phone: '', address_line1: '', address_line2: '', city: '', state: '', postal_code: '' });
    setShowForm(false);
    toast('Address added');
  }

  async function deleteAddress(id: string) {
    if (db) {
      try {
        await deleteDoc(doc(db, 'addresses', id));
      } catch (err) {
        console.warn('Failed to delete address from Firestore:', err);
      }
    }
    const next = addresses.filter((a) => a.id !== id);
    setAddresses(next);
    saveToLocal(next);
    toast('Address removed', 'info');
  }

  async function setDefault(id: string) {
    if (!session?.user?.id) return;

    if (db) {
      try {
        const firestore = db;
        const batch = writeBatch(firestore);
        addresses.forEach((a) => {
          batch.update(doc(firestore, 'addresses', a.id), { is_default: a.id === id });
        });
        await batch.commit();
      } catch (err) {
        console.warn('Failed to update default address in Firestore:', err);
      }
    }

    const next = addresses.map((a) => ({ ...a, is_default: a.id === id }));
    setAddresses(next);
    saveToLocal(next);
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
