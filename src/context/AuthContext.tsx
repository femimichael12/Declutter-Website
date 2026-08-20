import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Profile } from '@/types';

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (!data.session) setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !session) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase!.from('profiles').select('*').eq('id', session.user.id).maybeSingle();
      if (!cancelled) {
        setProfile(data as Profile | null);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [session]);

  async function signIn(email: string, password: string) {
    if (!supabase) return { error: 'Authentication is not available in demo mode.' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signUp(email: string, password: string, fullName: string) {
    if (!supabase) return { error: 'Authentication is not available in demo mode.' };
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { data: { full_name: fullName } },
    });
    if (error) return { error: error.message };
    if (data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, email, full_name: fullName });
    }
    return { error: null };
  }

  async function signInWithGoogle() {
    if (!supabase) return { error: 'Authentication is not available in demo mode.' };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    setProfile(null);
    setSession(null);
  }

  async function resetPassword(email: string) {
    if (!supabase) return { error: 'Password reset is not available in demo mode.' };
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error: error?.message ?? null };
  }

  async function refreshProfile() {
    if (!supabase || !session) return;
    const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).maybeSingle();
    setProfile(data as Profile | null);
  }

  return (
    <AuthContext.Provider
      value={{
        session, profile, loading,
        isAdmin: profile?.role === 'admin',
        isDemoMode: !isSupabaseConfigured,
        signIn, signUp, signInWithGoogle, signOut, resetPassword, refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
