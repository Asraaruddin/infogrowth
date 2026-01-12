'use client';
// Add this line to disable static generation
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';
import { 
  Mail, User, Calendar, MessageSquare, 
  Search, Eye, Trash2, CheckCircle, 
  RefreshCw, Download, Phone, Building,
  ChevronDown, LogOut, Shield, Bell,
  XCircle, Filter
} from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
    archived: 0
  });

  // Check authentication
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const adminCookie = cookies.find(cookie => 
      cookie.trim().startsWith('admin-authenticated=')
    );
    
    if (!adminCookie || !adminCookie.includes('true')) {
      router.push('/admin/login');
    }
  }, [router]);

  // Fetch submissions from Supabase
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSubmissions(data || []);
      updateStats(data || []);
    } catch (err: any) {
      setError('Failed to load submissions. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Update stats
  const updateStats = (data: ContactSubmission[]) => {
    const total = data.length;
    const newCount = data.filter(s => s.status === 'new').length;
    const readCount = data.filter(s => s.status === 'read').length;
    const repliedCount = data.filter(s => s.status === 'replied').length;
    const archivedCount = data.filter(s => s.status === 'archived').length;

    setStats({ total, new: newCount, read: readCount, replied: repliedCount, archived: archivedCount });
  };

  // Filter submissions
  useEffect(() => {
    let filtered = [...submissions];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.name.toLowerCase().includes(term) ||
        sub.email.toLowerCase().includes(term) ||
        (sub.company && sub.company.toLowerCase().includes(term)) ||
        sub.subject.toLowerCase().includes(term) ||
        sub.message.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    setFilteredSubmissions(filtered);
  }, [searchTerm, statusFilter, submissions]);

  // Handle status change
  const handleStatusChange = async (id: string, newStatus: ContactSubmission['status']) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setSubmissions(prev =>
        prev.map(sub =>
          sub.id === id ? { ...sub, status: newStatus } : sub
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove from local state
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
    } catch (err) {
      console.error('Error deleting submission:', err);
      alert('Failed to delete submission');
    }
  };

  // Handle export
  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Company', 'Subject', 'Message', 'Status', 'Date'],
      ...filteredSubmissions.map(sub => [
        sub.name,
        sub.email,
        sub.phone || '',
        sub.company || '',
        sub.subject,
        sub.message.replace(/[,]/g, ' ').replace(/\n/g, ' '),
        sub.status,
        new Date(sub.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle logout
  const handleLogout = () => {
    document.cookie = 'admin-authenticated=; path=/admin; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Contact Submissions
                </h1>
                <p className="text-sm text-gray-600">
                  Manage contact form inquiries
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchSubmissions}
                disabled={loading}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm opacity-90">Total</div>
              </div>
              <Mail className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.new}</div>
                <div className="text-sm opacity-90">New</div>
              </div>
              <Bell className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.read}</div>
                <div className="text-sm opacity-90">Read</div>
              </div>
              <Eye className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.replied}</div>
                <div className="text-sm opacity-90">Replied</div>
              </div>
              <CheckCircle className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.archived}</div>
                <div className="text-sm opacity-90">Archived</div>
              </div>
              <Eye className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 sm:px-6 pb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or message..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="px-4 sm:px-6 pb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-500">Loading submissions...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-2">{error}</p>
              <button
                onClick={fetchSubmissions}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No submissions found</p>
              <p className="text-sm text-gray-400 mt-1">
                {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No contact submissions yet'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 sm:px-6 text-left text-sm font-medium text-gray-700">Contact</th>
                      <th className="py-3 px-4 sm:px-6 text-left text-sm font-medium text-gray-700 hidden sm:table-cell">Subject</th>
                      <th className="py-3 px-4 sm:px-6 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="py-3 px-4 sm:px-6 text-left text-sm font-medium text-gray-700 hidden md:table-cell">Date</th>
                      <th className="py-3 px-4 sm:px-6 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredSubmissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{submission.name}</div>
                              <div className="text-sm text-gray-600">{submission.email}</div>
                              {submission.phone && (
                                <div className="text-sm text-gray-600 flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {submission.phone}
                                </div>
                              )}
                              {submission.company && (
                                <div className="text-sm text-gray-600 flex items-center gap-1">
                                  <Building className="w-3 h-3" />
                                  {submission.company}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 sm:px-6 hidden sm:table-cell">
                          <div className="max-w-xs truncate" title={submission.subject}>
                            {submission.subject}
                          </div>
                          <div className="text-xs text-gray-500 truncate max-w-xs" title={submission.message}>
                            {submission.message.substring(0, 60)}...
                          </div>
                        </td>
                        <td className="py-4 px-4 sm:px-6">
                          <select
                            value={submission.status}
                            onChange={(e) => handleStatusChange(submission.id, e.target.value as any)}
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${
                              submission.status === 'new' 
                                ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
                                : submission.status === 'read'
                                ? 'bg-blue-100 text-blue-800 border-blue-200'
                                : submission.status === 'replied'
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : 'bg-gray-100 text-gray-800 border-gray-200'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 sm:px-6 hidden md:table-cell">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {formatDate(submission.created_at)}
                          </div>
                        </td>
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => window.open(`mailto:${submission.email}?subject=Re: ${submission.subject}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Reply"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(submission.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Info */}
              <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {filteredSubmissions.length} of {submissions.length} submissions
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}