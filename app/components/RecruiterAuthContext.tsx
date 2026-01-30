'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';

interface RecruiterAuthContextType {
  user: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const RecruiterAuthContext = createContext<RecruiterAuthContextType | undefined>(undefined);

export function useRecruiterAuth() {
  const context = useContext(RecruiterAuthContext);
  if (context === undefined) {
    throw new Error('useRecruiterAuth must be used within a RecruiterAuthProvider');
  }
  return context;
}

export function RecruiterAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle redirects based on auth state - IMPORTANT: Redirects to JOBS, not dashboard
  useEffect(() => {
    if (loading) return;

    const isLoginPage = pathname === '/recruiter/login';
    
    if (!user && !isLoginPage) {
      // Not logged in and not on login page → redirect to login
      router.push('/recruiter/login');
    } else if (user && isLoginPage) {
      // Logged in and on login page → redirect to JOBS (not dashboard)
      router.push('/recruiter/jobs');
    }
  }, [user, loading, pathname, router]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/recruiter/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    loading,
    signOut,
  };

  return (
    <RecruiterAuthContext.Provider value={value}>
      {children}
    </RecruiterAuthContext.Provider>
  );
}