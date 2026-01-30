'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Mail, 
  LogOut, 
  Menu, 
  X,
  Bell,
  ChevronDown,
  PlusCircle,
  ClipboardList,
  Handshake,
  ChevronRight,
  Home,
  Loader2
} from 'lucide-react';
import { useAuth } from './AuthContext';

const menuLinks = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: LayoutDashboard,
    breadcrumb: 'Dashboard Overview'
  },
  { 
    name: 'Job Posting', 
    href: '/admin/job-posting', 
    icon: PlusCircle,
    breadcrumb: 'Job Posting'
  },
  { 
    name: 'Applications', 
    href: '/admin/applications', 
    icon: ClipboardList,
    breadcrumb: 'Applications'
  },
  { 
    name: 'Contact Forms', 
    href: '/admin/contact-forms', 
    icon: Mail,
    breadcrumb: 'Contact Forms'
  },
  { 
    name: 'Partner Forms', 
    href: '/admin/partner-applications', 
    icon: Handshake,
    breadcrumb: 'Partner Applications'
  },
];

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  
  // ALL HOOKS FIRST - React Rules of Hooks
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  // Auth check - redirect to login if not authenticated
  useEffect(() => {
    // Skip if on login page or already redirected or still loading
    if (isLoginPage || hasRedirected || loading) return;

    // If no user after loading, redirect to login
    if (!user) {
      console.log('🔒 Not authenticated, redirecting to login');
      setHasRedirected(true);
      window.location.href = '/admin/login';
    }
  }, [user, loading, isLoginPage, hasRedirected]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-profile-dropdown]')) {
          setProfileOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  // Render login page without layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user, show loading while redirecting
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-2 text-sm text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Helper functions
  const getBreadcrumbItems = () => {
    const items = [];
    
    items.push({
      label: 'Dashboard',
      href: '/admin',
      icon: <Home className="w-4 h-4" />
    });
    
    const currentPage = menuLinks.find(link => 
      pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
    );
    
    if (currentPage && currentPage.href !== '/admin') {
      items.push({
        label: currentPage.breadcrumb || currentPage.name,
        href: currentPage.href,
        icon: null
      });
    }
    
    return items;
  };

  const getCurrentPageTitle = () => {
    if (pathname === '/admin') return '';
    
    const currentPage = menuLinks.find(link => 
      pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
    );
    
    return currentPage ? currentPage.breadcrumb || currentPage.name : '';
  };

  const breadcrumbItems = getBreadcrumbItems();
  const currentPageTitle = getCurrentPageTitle();
  const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'Admin User';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-56 bg-white
          transform transition-transform duration-300 ease-in-out
          lg:fixed lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col border-r border-gray-200
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IG</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Infogrowth</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <div className="space-y-0.5">
            {menuLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== '/admin' && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-l-full" />
                  )}
                  
                  <link.icon className={`
                    w-5 h-5 flex-shrink-0
                    ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}
                  `} />
                  
                  <span className={`
                    font-medium text-sm
                    ${isActive ? 'text-blue-600' : 'text-gray-700 group-hover:text-gray-900'}
                  `}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="p-2 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={signOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all group"
          >
            <LogOut className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-56">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex-shrink-0">
          <div className="h-full flex items-center justify-between px-6">
            <div className="flex items-center gap-6">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Navigation Breadcrumb */}
              {breadcrumbItems.length > 1 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    {breadcrumbItems.map((item, index) => (
                      <React.Fragment key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-1.5 ${
                            index === breadcrumbItems.length - 1
                              ? 'text-gray-900 font-semibold'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {item.icon && <span className="text-gray-500">{item.icon}</span>}
                          <span className="text-sm">{item.label}</span>
                        </Link>
                        {index < breadcrumbItems.length - 1 && (
                          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Current Page Title */}
              {currentPageTitle && breadcrumbItems.length <= 1 && (
                <h1 className="text-lg font-semibold text-gray-900">{currentPageTitle}</h1>
              )}
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              {/* User Profile */}
              <div className="relative" data-profile-dropdown>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900">{userName}</span>
                    <span className="text-xs text-gray-500">Administrator</span>
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{userName}</p>
                      <p className="text-sm text-gray-500 mt-0.5">Administrator</p>
                    </div>
                    
                    <div className="py-2">
                      <button
                        onClick={signOut}
                        className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left transition-colors"
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
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            <div className="w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}