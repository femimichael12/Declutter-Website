import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { mockSettings } from '@/lib/mockData';
import type { Settings } from '@/types';

interface SettingsContextValue {
  settings: Settings;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(mockSettings);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setSettings(mockSettings);
      setLoading(false);
      return;
    }
    const { data } = await supabase.from('settings').select('key, value');
    if (data) {
      const map: Settings = { ...mockSettings };
      for (const row of data) {
        if (row.value !== null) map[row.key] = row.value;
      }
      setSettings(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return <SettingsContext.Provider value={{ settings, loading }}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
