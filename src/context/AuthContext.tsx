import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  isFirebaseConfigured,
  getFirebaseAuthErrorMessage,
} from '@/lib/firebase';
import type { Profile } from '@/types';

export interface AuthSession {
  user: {
    id: string;
    email: string;
  };
}

interface AuthContextValue {
  user: User | null;
  session: AuthSession | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
  updateUserProfile: (data: { full_name?: string; phone?: string; avatar_url?: string }) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to load or create profile from Firestore or Auth User
  async function fetchOrCreateProfile(firebaseUser: User, customFullName?: string): Promise<Profile> {
    const defaultProfile: Profile = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      full_name: customFullName || firebaseUser.displayName || null,
      phone: firebaseUser.phoneNumber || null,
      avatar_url: firebaseUser.photoURL || null,
      role: 'customer',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (!db) {
      return defaultProfile;
    }

    try {
      const profileRef = doc(db, 'profiles', firebaseUser.uid);
      const snapshot = await getDoc(profileRef);

      if (snapshot.exists()) {
        const data = snapshot.data() as Profile;
        // If customFullName provided and different, update it
        if (customFullName && data.full_name !== customFullName) {
          const updated = { ...data, full_name: customFullName, updated_at: new Date().toISOString() };
          await setDoc(profileRef, updated, { merge: true });
          return updated;
        }
        return data;
      } else {
        // Create initial document in Firestore
        await setDoc(profileRef, defaultProfile);
        return defaultProfile;
      }
    } catch (err) {
      console.warn('Firestore profile sync fallback:', err);
      return defaultProfile;
    }
  }

  // Subscribe to Firebase Auth state changes
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      console.error(
        'Firebase is not configured. Real authentication requires valid VITE_FIREBASE_* environment variables.'
      );
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userProfile = await fetchOrCreateProfile(currentUser);
          setProfile(userProfile);
        } catch (error) {
          console.error('Failed to load profile for user:', error);
          setProfile({
            id: currentUser.uid,
            email: currentUser.email || '',
            full_name: currentUser.displayName || null,
            phone: currentUser.phoneNumber || null,
            avatar_url: currentUser.photoURL || null,
            role: 'customer',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    if (!isFirebaseConfigured || !auth) {
      return { error: 'Firebase configuration is missing. Please check your environment variables.' };
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const loadedProfile = await fetchOrCreateProfile(userCredential.user);
      setUser(userCredential.user);
      setProfile(loadedProfile);
      return { error: null };
    } catch (error: any) {
      return { error: getFirebaseAuthErrorMessage(error) };
    }
  }

  async function signUp(email: string, password: string, fullName: string) {
    if (!isFirebaseConfigured || !auth) {
      return { error: 'Firebase configuration is missing. Please check your environment variables.' };
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const firebaseUser = userCredential.user;

      if (fullName.trim()) {
        try {
          await updateFirebaseProfile(firebaseUser, { displayName: fullName.trim() });
        } catch (err) {
          console.warn('Failed to update displayName in Firebase Auth:', err);
        }
      }

      const createdProfile = await fetchOrCreateProfile(firebaseUser, fullName.trim() || undefined);
      setUser(firebaseUser);
      setProfile(createdProfile);
      return { error: null };
    } catch (error: any) {
      return { error: getFirebaseAuthErrorMessage(error) };
    }
  }

  async function signInWithGoogle() {
    if (!isFirebaseConfigured || !auth) {
      return { error: 'Firebase configuration is missing. Please check your environment variables.' };
    }
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const loadedProfile = await fetchOrCreateProfile(userCredential.user);
      setUser(userCredential.user);
      setProfile(loadedProfile);
      return { error: null };
    } catch (error: any) {
      return { error: getFirebaseAuthErrorMessage(error) };
    }
  }

  async function signOut() {
    if (auth) {
      await firebaseSignOut(auth);
    }
    setUser(null);
    setProfile(null);
  }

  async function resetPassword(email: string) {
    if (!isFirebaseConfigured || !auth) {
      return { error: 'Firebase configuration is missing. Please check your environment variables.' };
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { error: null };
    } catch (error: any) {
      return { error: getFirebaseAuthErrorMessage(error) };
    }
  }

  async function refreshProfile() {
    if (!auth?.currentUser) return;
    const currentUser = auth.currentUser;
    const refreshed = await fetchOrCreateProfile(currentUser);
    setProfile(refreshed);
  }

  async function updateUserProfile(data: { full_name?: string; phone?: string; avatar_url?: string }) {
    if (!auth?.currentUser || !profile) {
      return { error: 'You must be signed in to update your profile.' };
    }

    try {
      const currentUser = auth.currentUser;
      if (data.full_name !== undefined && data.full_name !== currentUser.displayName) {
        await updateFirebaseProfile(currentUser, { displayName: data.full_name });
      }

      const updatedFields: Partial<Profile> = {
        ...data,
        updated_at: new Date().toISOString(),
      };

      if (db) {
        const profileRef = doc(db, 'profiles', currentUser.uid);
        await setDoc(profileRef, updatedFields, { merge: true });
      }

      setProfile((prev) => (prev ? { ...prev, ...updatedFields } : null));
      return { error: null };
    } catch (error: any) {
      return { error: getFirebaseAuthErrorMessage(error) };
    }
  }

  const session: AuthSession | null = user
    ? {
        user: {
          id: user.uid,
          email: user.email || '',
        },
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isAdmin: profile?.role === 'admin',
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
        refreshProfile,
        updateUserProfile,
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
