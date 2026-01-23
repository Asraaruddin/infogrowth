// app/recruiter/login/page.tsx (UPDATED)
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Briefcase, Mail, AlertCircle } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

export default function RecruiterLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('recruiter@infogrowth.com');
  const [password, setPassword] = useState('recruiter123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', { email, password });
      
      // First, let's check if Supabase is connected
      const { data: healthCheck, error: healthError } = await supabase
        .from('recruiters')
        .select('count')
        .limit(1);

      if (healthError) {
        console.error('Supabase connection error:', healthError);
        setError('Database connection failed. Please check Supabase setup.');
        setLoading(false);
        return;
      }

      console.log('Health check passed, checking credentials...');

      // Check if recruiter exists
      const { data: recruiter, error: queryError } = await supabase
        .from('recruiters')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      console.log('Query result:', { recruiter, queryError });

      if (queryError) {
        if (queryError.code === 'PGRST116') {
          // No rows returned
          setError('Invalid email or password');
        } else {
          console.error('Query error details:', queryError);
          setError(`Database error: ${queryError.message}`);
        }
        setLoading(false);
        return;
      }

      if (!recruiter) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      console.log('Login successful, setting cookies...');

      // Set authentication cookies
      const cookieOptions = [
        `recruiter-authenticated=true`,
        `recruiter-id=${recruiter.id}`,
        `path=/recruiter`,
        `max-age=86400`,
        `SameSite=Strict`
      ];

      if (process.env.NODE_ENV === 'production') {
        cookieOptions.push('Secure');
      }

      document.cookie = cookieOptions.join('; ');
      
      // Redirect to dashboard
      console.log('Redirecting to dashboard...');
      router.push('/recruiter/dashboard');
      
    } catch (error: any) {
      console.error('Login catch error:', error);
      setError(`Login failed: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const createTestRecruiter = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase
        .from('recruiters')
        .insert([
          {
            email: 'recruiter@infogrowth.com',
            password: 'recruiter123',
            name: 'Test Recruiter',
            company: 'Infogrowth'
          }
        ])
        .select();

      if (error) {
        if (error.code === '23505') {
          setError('Recruiter already exists. Try logging in.');
        } else {
          setError(`Failed to create recruiter: ${error.message}`);
        }
      } else {
        alert('✅ Test recruiter created successfully!\n\nEmail: recruiter@infogrowth.com\nPassword: recruiter123\n\nYou can now login.');
        setEmail('recruiter@infogrowth.com');
        setPassword('recruiter123');
      }
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkDatabaseSetup = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase
        .from('recruiters')
        .select('*');

      if (error) {
        setError(`Database error: ${error.message}\n\nPlease run the SQL setup script in Supabase.`);
      } else {
        alert(`✅ Found ${data?.length || 0} recruiters in database.\n\nYou can try logging in now.`);
      }
    } catch (error: any) {
      setError(`Check failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Recruiter Portal
          </h1>
          <p className="text-gray-400">
            Manage job postings and applications
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700/50">
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg">
              <div className="flex items-center gap-2 text-red-300 mb-2">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Error</span>
              </div>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="recruiter@company.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Setup Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-3">
                  <strong>Test credentials (auto-filled):</strong>
                </p>
                <div className="text-sm text-gray-400 space-y-1 bg-gray-900/50 p-3 rounded-lg">
                  <div>Email: <code className="px-2 py-1 rounded">recruiter@infogrowth.com</code></div>
                  <div>Password: <code className="px-2 py-1 rounded">recruiter123</code></div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={checkDatabaseSetup}
                  disabled={loading}
                  className="w-full text-sm bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  Check Database Connection
                </button>
                
                <button
                  onClick={createTestRecruiter}
                  disabled={loading}
                  className="w-full text-sm bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  Create Test Recruiter Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}