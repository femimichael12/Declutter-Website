import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/context/ToastContext';
import { mockProducts, mockCategories, mockCoupons, mockBanners, mockReviews, mockSettings } from '@/lib/mockData';

const settingKeys = [
  { key: 'site_name', label: 'Site Name' },
  { key: 'whatsapp_number', label: 'WhatsApp Number' },
  { key: 'contact_email', label: 'Contact Email' },
  { key: 'contact_phone', label: 'Contact Phone' },
  { key: 'address', label: 'Business Address' },
  { key: 'free_shipping_threshold', label: 'Free Shipping Threshold (₦)' },
  { key: 'flat_shipping_rate', label: 'Flat Shipping Rate (₦)' },
  { key: 'currency', label: 'Currency Code' },
  { key: 'currency_symbol', label: 'Currency Symbol' },
];

export function AdminSettings() {
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured || !supabase) { setValues(mockSettings); return; }
      const { data } = await supabase!.from('settings').select('key, value');
      const map: Record<string, string> = {};
      for (const row of data ?? []) map[row.key] = row.value ?? '';
      setValues(map);
    }
    load();
  }, []);

  async function save() {
    setSaving(true);
    for (const { key } of settingKeys) {
      await supabase!.from('settings').upsert({ key, value: values[key] ?? '' }, { onConflict: 'key' });
    }
    toast('Settings saved');
    setSaving(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-navy-900">Website Settings</h1>
        <button onClick={save} disabled={saving} className="btn-primary"><Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Settings'}</button>
      </div>

      <div className="card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {settingKeys.map(({ key, label }) => (
            <div key={key}>
              <label className="text-sm font-medium text-navy-700 mb-1.5 block">{label}</label>
              <input
                className="input"
                value={values[key] ?? ''}
                onChange={(e) => setValues({ ...values, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <button onClick={save} disabled={saving} className="btn-primary mt-5"><Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Settings'}</button>
      </div>
    </div>
  );
}
