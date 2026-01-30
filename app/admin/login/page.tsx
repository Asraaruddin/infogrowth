'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { useAuth } from '../../components/AuthContext';

export default function AdminLogin() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in - using window.location for reliability
  useEffect(() => {
    if (!loading && user) {
      console.log('✅ User already logged in, redirecting...');
      window.location.href = '/admin';
    }
  }, [loading, user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoginLoading(true);

    try {
      console.log('🔐 Attempting login...');

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('❌ Login error:', signInError);
        throw signInError;
      }
      
      console.log('✅ Login successful, redirecting...');
      
      // Use window.location for reliable redirect in production
      setTimeout(() => {
        window.location.href = '/admin';
      }, 500);
      
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      setError(error.message || 'Invalid email or password. Please try again.');
      setLoginLoading(false);
    }
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user exists, show redirecting state
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-2 text-sm text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Brand */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center">
            <span className="font-[Poppins] text-[22px] font-extrabold tracking-tight text-[#96bb57]">
              Info
            </span>
            <span className="font-[Poppins] text-[22px] font-extrabold tracking-tight text-[#3f7ec1]">
              Growth
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-8 text-center text-2xl font-semibold text-[#2563eb]">
          Sign into Admin Dashboard
        </h1>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@infogrowth.com"
                autoComplete="email"
                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                disabled={loginLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-11 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                disabled={loginLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={loginLoading}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full rounded-lg bg-[#2563eb] py-3 text-sm font-semibold text-white transition hover:bg-[#1e4ed8] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loginLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} InfoGrowth. All rights reserved.
        </p>
      </div>
    </div>
  );
}