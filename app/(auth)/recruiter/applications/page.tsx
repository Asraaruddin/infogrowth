'use client';

import React, { useState, useEffect } from 'react';
import { 
  Eye, Download, Filter, Search, ChevronDown, 
  Users, Calendar, Briefcase, Building, 
  Mail, Phone, MapPin, FileText, Award,
  CheckCircle, Clock, UserCheck, XCircle, 
  RefreshCw, ExternalLink, MoreVertical
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  resume_url: string | null;
  skills: string[];
  university: string | null;
  branch: string | null;
  graduation_year: number | null;
  current_company: string | null;
  current_ctc: string | null;
  expected_ctc: string | null;
  notice_period: string | null;
  location_preference: string | null;
  postgres_experience: string | null;
  nextjs_experience: string | null;
  cover_letter: string | null;
  status: string;
  created_at: string;
  is_fresher: boolean;
  job_id: string;
  jobs: {
    title: string;
    department: string;
  } | null;
}

interface Job {
  id: string;
  title: string;
}

interface Stats {
  total: number;
  pending: number;
  screening: number;
  interview: number;
  shortlisted: number;
  selected: number;
  rejected: number;
}

const statusOptions = [
  { value: 'pending', label: 'Applied', color: 'bg-blue-100 text-blue-800', icon: Clock },
  { value: 'screening', label: 'Screening', color: 'bg-purple-100 text-purple-800', icon: Eye },
  { value: 'interview', label: 'Interview', color: 'bg-yellow-100 text-yellow-800', icon: UserCheck },
  { value: 'shortlisted', label: 'Shortlisted', color: 'bg-green-100 text-green-800', icon: Award },
  { value: 'selected', label: 'Selected', color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    screening: 0,
    interview: 0,
    shortlisted: 0,
    selected: 0,
    rejected: 0
  });
  
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    job: 'all',
    dateRange: 'all'
  });
  
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [applications]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch applications with job details
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (
            title,
            department
          )
        `)
        .order('created_at', { ascending: false });

      if (applicationsError) throw applicationsError;
      setApplications(applicationsData || []);

      // Fetch all jobs for filter
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('id, title')
        .order('title');

      if (jobsError) throw jobsError;
      setJobs(jobsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const stats = {
      total: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      screening: applications.filter(app => app.status === 'screening').length,
      interview: applications.filter(app => app.status === 'interview').length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      selected: applications.filter(app => app.status === 'selected').length,
      rejected: applications.filter(app => app.status === 'rejected').length
    };
    setStats(stats);
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      setUpdatingStatus(applicationId);
      
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) throw error;

      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));

    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredApplications = applications.filter(app => {
    // Search filter
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm) ||
      app.phone.includes(searchTerm) ||
      app.jobs?.title.toLowerCase().includes(searchTerm) ||
      app.skills.join(', ').toLowerCase().includes(searchTerm);

    // Status filter
    const matchesStatus = filters.status === 'all' || app.status === filters.status;
    
    // Job filter
    const matchesJob = filters.job === 'all' || app.job_id === filters.job;

    // Date filter (simplified - you can implement actual date range logic)
    const matchesDate = filters.dateRange === 'all';

    return matchesSearch && matchesStatus && matchesJob && matchesDate;
  });

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      job: 'all',
      dateRange: 'all'
    });
  };

  const viewApplication = (application: Application) => {
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  const downloadResume = async (resumeUrl: string, fileName: string) => {
    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume');
    }
  };

  const renderStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    if (!statusOption) return null;
    
    const Icon = statusOption.icon;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusOption.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {statusOption.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">Manage and review all job applications</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
            {Object.values(filters).some(v => v !== 'all' && v !== '') && (
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </button>
          <button
            onClick={fetchData}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Applied</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Screening</p>
              <p className="text-2xl font-bold text-gray-900">{stats.screening}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Interview</p>
              <p className="text-2xl font-bold text-gray-900">{stats.interview}</p>
            </div>
            <UserCheck className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Shortlisted</p>
              <p className="text-2xl font-bold text-gray-900">{stats.shortlisted}</p>
            </div>
            <Award className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Selected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.selected}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  placeholder="Search by name, email, job..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job</label>
              <select
                value={filters.job}
                onChange={(e) => setFilters({...filters, job: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Jobs</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">All Applications</h2>
              <p className="text-sm text-gray-600">
                Showing {filteredApplications.length} of {applications.length} applications
              </p>
            </div>
            {filteredApplications.length > 0 && (
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Export to CSV
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">
              {applications.length === 0 
                ? "No applications have been submitted yet." 
                : "No applications match your current filters."}
            </p>
            {applications.length === 0 && (
              <Link
                href="/recruiter/jobs"
                className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800"
              >
                <Briefcase className="w-4 h-4" />
                Create a job posting to receive applications
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                          {application.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium text-gray-900">
                              {application.name}
                            </h4>
                            {application.is_fresher && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Fresher
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Mail className="w-3 h-3 mr-1" />
                            {application.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {application.jobs?.title || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {application.jobs?.department || 'N/A'}
                        </p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      {application.resume_url ? (
                        <button
                          onClick={() => downloadResume(application.resume_url!, `${application.name.replace(/\s+/g, '_')}_resume`)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">No resume</span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="relative">
                        <select
                          value={application.status}
                          onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                          disabled={updatingStatus === application.id}
                          className={`appearance-none ${statusOptions.find(opt => opt.value === application.status)?.color} 
                            px-3 py-1 rounded-full text-xs font-medium border border-transparent
                            hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none" />
                      </div>
                      {updatingStatus === application.id && (
                        <span className="text-xs text-gray-500 mt-1 block">Updating...</span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(application.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(application.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => viewApplication(application)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View Details"
                        >
                         
                        </button>
                        <button
                          onClick={() => downloadResume(application.resume_url!, `${application.name.replace(/\s+/g, '_')}_resume`)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
                          title="Download Resume"
                          disabled={!application.resume_url}
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <Link
                          href={`/recruiter/jobs/${application.job_id}`}
                          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                          title="View Job"
                        >
                       
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredApplications.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{filteredApplications.length}</span> of{' '}
                <span className="font-medium">{filteredApplications.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-blue-50 text-blue-700">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
              onClick={() => setShowApplicationModal(false)}
            />

            {/* Modal container */}
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              {/* Modal header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Application Details
                    </h3>
                    <p className="text-blue-100 mt-1">
                      {selectedApplication.name} • {selectedApplication.jobs?.title || 'N/A'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowApplicationModal(false)}
                    className="text-white hover:bg-blue-800 p-2 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal body */}
              <div className="bg-white px-6 py-6">
                <div className="max-h-[70vh] overflow-y-auto pr-2">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Personal Info */}
                    <div className="lg:col-span-1">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="text-center mb-6">
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                            {selectedApplication.name.charAt(0).toUpperCase()}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {selectedApplication.name}
                          </h3>
                          <div className="mt-2">
                            {renderStatusBadge(selectedApplication.status)}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-5 h-5 mr-3 text-gray-400" />
                            <span>{selectedApplication.email}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-5 h-5 mr-3 text-gray-400" />
                            <span>{selectedApplication.phone}</span>
                          </div>
                          {selectedApplication.location_preference && (
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                              <span>{selectedApplication.location_preference}</span>
                            </div>
                          )}
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                            <span>
                              Applied on {new Date(selectedApplication.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {selectedApplication.resume_url && (
                          <button
                            onClick={() => downloadResume(selectedApplication.resume_url!, `${selectedApplication.name.replace(/\s+/g, '_')}_resume`)}
                            className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                          >
                            <Download className="w-5 h-5" />
                            Download Resume
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Education */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-blue-500" />
                          Education
                        </h4>
                        <div className="space-y-3">
                          {selectedApplication.university && (
                            <div>
                              <p className="font-medium text-gray-900">{selectedApplication.university}</p>
                              <p className="text-gray-600">
                                {selectedApplication.branch}
                                {selectedApplication.graduation_year && ` • ${selectedApplication.graduation_year}`}
                              </p>
                            </div>
                          )}
                          {selectedApplication.is_fresher ? (
                            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              Fresher Candidate
                            </span>
                          ) : (
                            <div>
                              <p className="font-medium text-gray-900">Current Company</p>
                              <p className="text-gray-600">{selectedApplication.current_company || 'N/A'}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedApplication.skills?.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Job Specific Details */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Job Specific Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Current CTC</p>
                            <p className="font-medium">{selectedApplication.current_ctc || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Expected CTC</p>
                            <p className="font-medium">{selectedApplication.expected_ctc || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Notice Period</p>
                            <p className="font-medium">{selectedApplication.notice_period || 'N/A'} days</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">PostgreSQL Exp.</p>
                            <p className="font-medium">{selectedApplication.postgres_experience || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Next.js Exp.</p>
                            <p className="font-medium">{selectedApplication.nextjs_experience || 'N/A'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Cover Letter */}
                      {selectedApplication.cover_letter && (
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Cover Letter</h4>
                          <p className="text-gray-700 whitespace-pre-line">
                            {selectedApplication.cover_letter}
                          </p>
                        </div>
                      )}

                      {/* Status Update */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h4>
                        <div className="flex flex-wrap gap-2">
                          {statusOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                              <button
                                key={option.value}
                                onClick={() => updateApplicationStatus(selectedApplication.id, option.value)}
                                disabled={updatingStatus === selectedApplication.id}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                  selectedApplication.status === option.value
                                    ? option.color
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                        {updatingStatus === selectedApplication.id && (
                          <p className="text-sm text-gray-500 mt-2">Updating status...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}