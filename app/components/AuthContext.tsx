'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        setLoading(true);
        
        // Check if Supabase is configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.error('❌ Supabase environment variables are missing!');
          console.error('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing');
          console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing');
          setLoading(false);
          return;
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setSession(null);
          setUser(null);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          console.log('✅ Session loaded:', session ? 'User logged in' : 'No user');
        }
      } catch (error) {
        console.error('Error in getSession:', error);
        setSession(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          console.log('✅ User signed in');
        } else if (event === 'SIGNED_OUT') {
          console.log('🚪 User signed out');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle redirects based on auth state
  useEffect(() => {
    // Don't redirect while loading or already redirecting
    if (loading || redirecting) return;

    const isLoginPage = pathname === '/admin/login';
    
    // Redirect logic with timeout to prevent infinite loops
    const handleRedirect = async () => {
      if (!user && !isLoginPage) {
        console.log('🔄 Redirecting to login (no user)');
        setRedirecting(true);
        await router.push('/admin/login');
        setTimeout(() => setRedirecting(false), 500);
      } else if (user && isLoginPage) {
        console.log('🔄 Redirecting to dashboard (user logged in)');
        setRedirecting(true);
        await router.push('/admin');
        setTimeout(() => setRedirecting(false), 500);
      }
    };

    handleRedirect();
  }, [user, loading, pathname, router, redirecting]);

  const signOut = async () => {
    try {
      setRedirecting(true);
      await supabase.auth.signOut();
      router.push('/admin/login');
      setTimeout(() => setRedirecting(false), 500);
    } catch (error) {
      console.error('Sign out error:', error);
      setRedirecting(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}