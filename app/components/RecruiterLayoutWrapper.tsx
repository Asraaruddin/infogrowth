'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Briefcase, 
  Users, 
  FileText, 
  LogOut, 
  Menu, 
  X,
  PlusCircle,
  ChevronRight,
  Bell,
  User,
  Loader2,
  ChevronDown,
  Settings,
  HelpCircle
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { useRecruiterAuth } from './RecruiterAuthContext';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants_count: number;
  is_active: boolean;
  posted_date: string;
}

export function RecruiterLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading: authLoading, signOut } = useRecruiterAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'New application for Frontend Developer', time: '5 min ago', read: false },
    { id: 2, text: 'Job posting approved', time: '1 hour ago', read: true },
    { id: 3, text: 'Weekly report ready', time: '2 hours ago', read: true },
  ]);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const profileDropdown = document.getElementById('profile-dropdown');
      const profileButton = document.getElementById('profile-button');
      const notificationsDropdown = document.getElementById('notifications-dropdown');
      const notificationsButton = document.getElementById('notifications-button');

      if (showProfileDropdown && 
          profileDropdown && 
          !profileDropdown.contains(event.target as Node) &&
          profileButton && 
          !profileButton.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }

      if (showNotifications && 
          notificationsDropdown && 
          !notificationsDropdown.contains(event.target as Node) &&
          notificationsButton && 
          !notificationsButton.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileDropdown, showNotifications]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setJobsLoading(false);
    }
  };

  // Don't render layout for login page
  if (pathname === '/recruiter/login') {
    return <>{children}</>;
  }

  // Show loading while checking auth
  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-white mx-auto" />
          <p className="mt-2 text-sm text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'Recruiter';
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Menu button and Logo */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center ml-4 lg:ml-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">InfoGrowth Recruiter</span>
              </div>
            </div>

            {/* Center: Navigation links for desktop */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <Link
                href="/recruiter/jobs"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/recruiter/jobs' || pathname.includes('/recruiter/jobs/')
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Job Postings
                </div>
              </Link>
              <Link
                href="/recruiter/applications"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.includes('/recruiter/applications')
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Applications
                </div>
              </Link>
              <Link
                href="/recruiter/questions"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/recruiter/questions'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Questions
                </div>
              </Link>
            </div>

            {/* Right side: Notifications and Profile */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  id="notifications-button"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                {showNotifications && (
                  <div id="notifications-dropdown" className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                        <button className="text-xs text-blue-600 hover:text-blue-800">
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center">
                          <p className="text-sm text-gray-500">No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                          >
                            <p className="text-sm text-gray-900">{notification.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <Link href="/recruiter/notifications" className="text-sm text-blue-600 hover:text-blue-800 w-full text-center block">
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Separator */}
              <div className="h-6 w-px bg-gray-300"></div>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  id="profile-button"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{userInitial}</span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">Recruiter</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showProfileDropdown && (
                  <div id="profile-dropdown" className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* Profile Info */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{userInitial}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{userName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Menu Items */}
                    <div className="py-2">  
                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <span className="ml-3 text-lg font-bold text-gray-900">Recruiter Portal</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* User Profile in Mobile Sidebar */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{userInitial}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">Recruiter</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1">
              <Link
                href="/recruiter/jobs/new"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="font-medium">Post New Job</span>
              </Link>

              <Link
                href="/recruiter/jobs"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  pathname === '/recruiter/jobs' || pathname.includes('/recruiter/jobs/')
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span className="font-medium">Job Postings</span>
              </Link>

              <Link
                href="/recruiter/applications"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  pathname.includes('/recruiter/applications')
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Applications</span>
              </Link>

              <Link
                href="/recruiter/questions"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  pathname === '/recruiter/questions'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Custom Questions</span>
              </Link>

              {/* Recent Jobs Section */}
              <div className="pt-4">
                <div className="px-3 mb-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Jobs</h3>
                </div>
                
                <div className="space-y-1">
                  {jobsLoading ? (
                    <div className="px-3 space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                  ) : jobs.length === 0 ? (
                    <div className="px-3 py-2 text-center text-gray-500 text-sm">
                      No jobs posted yet
                    </div>
                  ) : (
                    jobs.map(job => (
                      <Link
                        key={job.id}
                        href={`/recruiter/jobs/${job.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className="block px-3 py-2.5 rounded-lg hover:bg-gray-100"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {job.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                                job.is_active 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {job.is_active ? 'Active' : 'Closed'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {job.applicants_count} apps
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-2"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}