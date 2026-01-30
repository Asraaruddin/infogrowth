'use client';

import React, { useState, useEffect } from 'react';
import { 
  Eye, Download, Filter, Search, ChevronDown, 
  Users, Calendar, Briefcase, Building, 
  Mail, Phone, MapPin, FileText, Award,
  CheckCircle, Clock, UserCheck, XCircle, 
  RefreshCw, ExternalLink, MoreVertical,
  ChevronRight, X, Globe, GraduationCap,
  DollarSign, BriefcaseBusiness, Navigation,
  Linkedin, Github, AlertCircle, PauseCircle,
  ArrowUpDown, User, Loader2, Hash
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

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
  relevant_experience: string | null;
  total_experience: string | null;
  current_location: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  status: string;
  created_at: string;
  is_fresher: boolean;
  job_id: string;
  jobs: {
    title: string;
    department: string;
    custom_job_id: string;
    location: string;
  } | null;
}

interface ScreeningAnswer {
  id: string;
  question_id: string;
  question_text: string;
  question_type: string;
  answer: string;
  created_at: string;
}

interface Job {
  id: string;
  title: string;
}

interface Stats {
  total: number;
  applied: number;
  screening: number;
  shortlisted: number;
  l1_schedule: number;
  l1_rejected: number;
  l1_selected: number;
  l2_schedule: number;
  l2_rejected: number;
  l2_selected: number;
  l3_schedule: number;
  l3_rejected: number;
  l3_selected: number;
  final_selected: number;
}

// Enhanced status options
const statusOptions = [
  { value: 'applied', label: 'Applied', color: 'bg-blue-100 text-blue-800', icon: Clock },
  { value: 'screening', label: 'Screening', color: 'bg-purple-100 text-purple-800', icon: Eye },
  { value: 'shortlisted', label: 'Shortlisted', color: 'bg-green-100 text-green-800', icon: Award },
  { value: 'l1_schedule', label: 'L1 Scheduled', color: 'bg-yellow-100 text-yellow-800', icon: Calendar },
  { value: 'l1_rejected', label: 'L1 Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
  { value: 'l1_selected', label: 'L1 Selected', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { value: 'l2_schedule', label: 'L2 Scheduled', color: 'bg-yellow-100 text-yellow-800', icon: Calendar },
  { value: 'l2_rejected', label: 'L2 Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
  { value: 'l2_selected', label: 'L2 Selected', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { value: 'l3_schedule', label: 'L3 Scheduled', color: 'bg-yellow-100 text-yellow-800', icon: Calendar },
  { value: 'l3_rejected', label: 'L3 Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
  { value: 'l3_selected', label: 'L3 Selected', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { value: 'final_selected', label: 'Final Selected', color: 'bg-emerald-100 text-emerald-800', icon: UserCheck },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    applied: 0,
    screening: 0,
    shortlisted: 0,
    l1_schedule: 0,
    l1_rejected: 0,
    l1_selected: 0,
    l2_schedule: 0,
    l2_rejected: 0,
    l2_selected: 0,
    l3_schedule: 0,
    l3_rejected: 0,
    l3_selected: 0,
    final_selected: 0
  });
  
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    job: 'all',
    dateRange: 'all'
  });
  
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [screeningAnswers, setScreeningAnswers] = useState<ScreeningAnswer[]>([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'}>({
    key: 'created_at',
    direction: 'desc'
  });
  const [isLoadingAnswers, setIsLoadingAnswers] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [applications]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch applications with job details
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (
            title,
            department,
            custom_job_id,
            location
          )
        `)
        .order('created_at', { ascending: false });

      if (applicationsError) {
        console.error('Error fetching applications:', applicationsError);
        throw applicationsError;
      }
      
      setApplications(applicationsData || []);

      // Fetch all jobs for filter
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('id, title')
        .order('title');

      if (jobsError) {
        console.error('Error fetching jobs:', jobsError);
        throw jobsError;
      }
      
      setJobs(jobsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchScreeningAnswers = async (applicationId: string) => {
    try {
      setIsLoadingAnswers(true);
      setError(null);
      
      console.log('Fetching screening answers for application:', applicationId);
      
      const { data, error } = await supabase
        .from('application_answers')
        .select(`
          id,
          answer,
          created_at,
          questions (
            id,
            question_text,
            question_type
          )
        `)
        .eq('application_id', applicationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase error fetching screening answers:', error);
        throw error;
      }

      console.log('Raw screening answers data:', data);

      if (!data || data.length === 0) {
        console.log('No screening answers found for this application');
        setScreeningAnswers([]);
        return;
      }

      // Transform the data to match our interface
      const answers: ScreeningAnswer[] = data.map((item: any) => ({
        id: item.id,
        question_id: item.questions?.id || '',
        question_text: item.questions?.question_text || 'Unknown Question',
        question_type: item.questions?.question_type || 'text',
        answer: item.answer || '',
        created_at: item.created_at
      }));

      console.log('Transformed screening answers:', answers);
      setScreeningAnswers(answers);
      
    } catch (error: any) {
      console.error('Error fetching screening answers:', error);
      setError(`Failed to load screening answers: ${error.message || 'Unknown error'}`);
      setScreeningAnswers([]);
    } finally {
      setIsLoadingAnswers(false);
    }
  };

  const calculateStats = () => {
    const newStats = {
      total: applications.length,
      applied: applications.filter(app => app.status === 'applied').length,
      screening: applications.filter(app => app.status === 'screening').length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      l1_schedule: applications.filter(app => app.status === 'l1_schedule').length,
      l1_rejected: applications.filter(app => app.status === 'l1_rejected').length,
      l1_selected: applications.filter(app => app.status === 'l1_selected').length,
      l2_schedule: applications.filter(app => app.status === 'l2_schedule').length,
      l2_rejected: applications.filter(app => app.status === 'l2_rejected').length,
      l2_selected: applications.filter(app => app.status === 'l2_selected').length,
      l3_schedule: applications.filter(app => app.status === 'l3_schedule').length,
      l3_rejected: applications.filter(app => app.status === 'l3_rejected').length,
      l3_selected: applications.filter(app => app.status === 'l3_selected').length,
      final_selected: applications.filter(app => app.status === 'final_selected').length
    };
    setStats(newStats);
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      setUpdatingStatus(applicationId);
      
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) {
        console.error('Error updating application status:', error);
        throw error;
      }

      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));

      // Update selected application if open
      if (selectedApplication?.id === applicationId) {
        setSelectedApplication(prev => prev ? { ...prev, status: newStatus } : null);
      }

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
      (app.phone && app.phone.includes(searchTerm)) ||
      app.jobs?.title.toLowerCase().includes(searchTerm) ||
      app.jobs?.department.toLowerCase().includes(searchTerm) ||
      app.skills?.join(', ').toLowerCase().includes(searchTerm);

    // Status filter
    const matchesStatus = filters.status === 'all' || app.status === filters.status;
    
    // Job filter
    const matchesJob = filters.job === 'all' || app.job_id === filters.job;

    // Date filter
    const matchesDate = filters.dateRange === 'all';

    return matchesSearch && matchesStatus && matchesJob && matchesDate;
  });

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    let aValue: any = a;
    let bValue: any = b;
    
    const keys = sortConfig.key.split('.');
    keys.forEach(key => {
      aValue = aValue?.[key];
      bValue = bValue?.[key];
    });
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      job: 'all',
      dateRange: 'all'
    });
  };

  const viewApplication = async (application: Application) => {
    try {
      setSelectedApplication(application);
      setShowApplicationModal(true);
      await fetchScreeningAnswers(application.id);
    } catch (error) {
      console.error('Error viewing application:', error);
    }
  };

  const downloadResume = async (resumeUrl: string, fileName: string) => {
    try {
      const response = await fetch(resumeUrl);
      if (!response.ok) {
        throw new Error(`Failed to download resume: ${response.statusText}`);
      }
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
      alert('Failed to download resume. Please try again.');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    if (!statusOption) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>
      );
    }
    
    const Icon = statusOption.icon;
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusOption.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {statusOption.label}
      </span>
    );
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.color : 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 text-sm mt-1">Manage and review all job applications</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {Object.values(filters).some(v => v !== 'all' && v !== '') && (
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </button>
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards - Compact Version */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Total</p>
              <p className="text-base font-bold text-gray-900 mt-0.5">{stats.total}</p>
            </div>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Applied</p>
              <p className="text-base font-bold text-gray-900 mt-0.5">{stats.applied}</p>
            </div>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Screening</p>
              <p className="text-base font-bold text-gray-900 mt-0.5">{stats.screening}</p>
            </div>
            <Eye className="w-4 h-4 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Shortlisted</p>
              <p className="text-base font-bold text-gray-900 mt-0.5">{stats.shortlisted}</p>
            </div>
            <Award className="w-4 h-4 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">L1 Selected</p>
              <p className="text-base font-bold text-gray-900 mt-0.5">{stats.l1_selected}</p>
            </div>
            <Calendar className="w-4 h-4 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">L2 Selected</p>
              <p className="text-base font-bold text-gray-900 mt-0.5">{stats.l2_selected}</p>
            </div>
            <Calendar className="w-4 h-4 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Final Selected</p>
              <p className="text-base font-bold text-gray-900 mt-0.5">{stats.final_selected}</p>
            </div>
            <UserCheck className="w-4 h-4 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  placeholder="Search applications..."
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full text-sm border border-gray-300 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
              <label className="block text-xs font-medium text-gray-700 mb-1">Job</label>
              <select
                value={filters.job}
                onChange={(e) => setFilters({...filters, job: e.target.value})}
                className="w-full text-sm border border-gray-300 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
              <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="w-full text-sm border border-gray-300 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-3">
            <button
              onClick={handleResetFilters}
              className="text-xs text-gray-600 hover:text-gray-900 px-2 py-1"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">All Applications</h2>
              <p className="text-xs text-gray-600">
                Showing {filteredApplications.length} of {applications.length} applications
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-xs text-gray-600">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-900 mb-0.5">No applications found</h3>
            <p className="text-xs text-gray-600">
              {applications.length === 0 
                ? "No applications have been submitted yet." 
                : "No applications match your current filters."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-900">
                <tr>
                  <th 
                    className="px-3 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Applicant
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('jobs.title')}
                  >
                    <div className="flex items-center gap-1">
                      Job Position
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('created_at')}
                  >
                    <div className="flex items-center gap-1">
                      Applied Date
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedApplications.map((application) => {
                  const formattedDate = formatDate(application.created_at);
                  
                  return (
                    <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                      {/* Applicant Column */}
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                            {application.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <p className="text-xs font-medium text-gray-900 truncate">
                                {application.name}
                              </p>
                              {application.is_fresher && (
                                <span className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  Fresher
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate flex items-center gap-0.5">
                              <Mail className="w-3 h-3" />
                              {application.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                      {/* Job Position Column */}
                      <td className="px-3 py-2.5">
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {application.jobs?.title || 'N/A'}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-600">
                              {application.jobs?.department || 'N/A'}
                            </span>
                            {application.jobs?.custom_job_id && (
                              <span className="text-xs text-gray-400">
                                ID: {application.jobs.custom_job_id}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      {/* Status Column */}
                      <td className="px-3 py-2.5">
                        <div className="relative">
                          <select
                            value={application.status}
                            onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                            disabled={updatingStatus === application.id}
                            className={`appearance-none ${getStatusColor(application.status)} 
                              px-2 py-1 rounded-full text-xs font-medium border border-transparent
                              hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer w-28`}
                          >
                            {statusOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 text-gray-500 pointer-events-none" />
                        </div>
                      </td>
                      
                      {/* Applied Date Column */}
                      <td className="px-3 py-2.5">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1 text-xs text-gray-900">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            {formattedDate.date}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formattedDate.time}
                          </div>
                        </div>
                      </td>
                      
                      {/* Actions Column */}
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => viewApplication(application)}
                            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => application.resume_url && downloadResume(application.resume_url, `${application.name.replace(/\s+/g, '_')}_resume`)}
                            className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Download Resume"
                            disabled={!application.resume_url}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filteredApplications.length > 0 && (
          <div className="px-3 py-2 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">
                Showing <span className="font-medium">{filteredApplications.length}</span> applications
              </p>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-2 py-1 text-xs border border-gray-300 rounded bg-blue-50 text-blue-700">
                  1
                </button>
                {filteredApplications.length > 10 && (
                  <>
                    <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                      3
                    </button>
                  </>
                )}
                <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setShowApplicationModal(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden z-50">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Application Details</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  {selectedApplication.name} • {selectedApplication.jobs?.title || 'N/A'}
                </p>
              </div>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(90vh - 64px)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Personal Info */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Applicant Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                        {selectedApplication.name.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="text-sm font-bold text-gray-900">
                        {selectedApplication.name}
                      </h3>
                      <div className="mt-1.5">
                        {getStatusBadge(selectedApplication.status)}
                      </div>
                      {selectedApplication.is_fresher && (
                        <span className="inline-block mt-1.5 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                          Fresher Candidate
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <Mail className="w-3.5 h-3.5 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{selectedApplication.email}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Phone className="w-3.5 h-3.5 mr-2 text-gray-400 flex-shrink-0" />
                        <span>{selectedApplication.phone}</span>
                      </div>
                      {selectedApplication.current_location && (
                        <div className="flex items-center text-xs text-gray-600">
                          <MapPin className="w-3.5 h-3.5 mr-2 text-gray-400 flex-shrink-0" />
                          <span>{selectedApplication.current_location}</span>
                        </div>
                      )}
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-gray-400 flex-shrink-0" />
                        <span>
                          Applied {new Date(selectedApplication.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    {selectedApplication.resume_url && (
                      <button
                        onClick={() => downloadResume(selectedApplication.resume_url!, `${selectedApplication.name.replace(/\s+/g, '_')}_resume`)}
                        className="w-full mt-4 flex items-center justify-center gap-1.5 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-xs font-medium"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download Resume
                      </button>
                    )}
                  </div>

                  {/* Job Card */}
                  {selectedApplication.jobs && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                        Applied Position
                      </h4>
                      <div className="space-y-1.5">
                        <div>
                          <p className="text-xs text-gray-600">Job Title</p>
                          <p className="text-xs font-medium text-gray-900">{selectedApplication.jobs.title}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Department</p>
                          <p className="text-xs font-medium text-gray-900">{selectedApplication.jobs.department}</p>
                        </div>
                        {selectedApplication.jobs.location && (
                          <div>
                            <p className="text-xs text-gray-600">Location</p>
                            <p className="text-xs font-medium text-gray-900">{selectedApplication.jobs.location}</p>
                          </div>
                        )}
                        {selectedApplication.jobs.custom_job_id && (
                          <div>
                            <p className="text-xs text-gray-600">Job ID</p>
                            <p className="text-xs font-medium text-gray-900">{selectedApplication.jobs.custom_job_id}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Personal Details */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Personal Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Full Name</p>
                        <p className="text-sm font-medium text-gray-900">{selectedApplication.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Email Address</p>
                        <p className="text-sm font-medium text-gray-900">{selectedApplication.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Phone Number</p>
                        <p className="text-sm font-medium text-gray-900">{selectedApplication.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Current Location</p>
                        <p className="text-sm font-medium text-gray-900">{selectedApplication.current_location || 'Not specified'}</p>
                      </div>
                      {selectedApplication.linkedin_url && (
                        <div className="md:col-span-2">
                          <p className="text-xs text-gray-600 mb-0.5">LinkedIn Profile</p>
                          <a 
                            href={selectedApplication.linkedin_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            View Profile
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Experience Details */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Experience Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Current CTC</p>
                        <p className="text-sm font-medium text-gray-900">{selectedApplication.current_ctc || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Expected CTC</p>
                        <p className="text-sm font-medium text-gray-900">{selectedApplication.expected_ctc || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Notice Period</p>
                        <p className="text-sm font-medium text-gray-900">{selectedApplication.notice_period || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Current Location</p>
                        <p className="text-sm font-medium text-gray-900">{selectedApplication.current_location || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Relevant Experience</p>
                        <p className="text-sm font-medium text-gray-900">{selectedApplication.relevant_experience || '0'} years</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Total Experience</p>
                        <p className="text-sm font-medium text-gray-900">{selectedApplication.total_experience || '0'} years</p>
                      </div>
                    </div>
                  </div>

                  {/* Screening Questions */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      Screening Questions & Answers
                      {isLoadingAnswers && (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />
                      )}
                    </h4>
                    
                    {isLoadingAnswers ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-xs text-gray-600">Loading screening answers...</p>
                      </div>
                    ) : screeningAnswers.length > 0 ? (
                      <div className="space-y-3">
                        {screeningAnswers.map((qa, index) => (
                          <div key={qa.id || index} className="bg-gray-50 rounded p-3 border border-gray-200">
                            <div className="flex items-start gap-2">
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-blue-700">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-medium text-gray-900 mb-1">
                                  {qa.question_text}
                                </p>
                                <div className="mt-1">
                                  {qa.question_type === 'number' ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-gray-900">{qa.answer}</span>
                                      <span className="text-xs text-gray-500">years</span>
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-900">{qa.answer}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-xs text-gray-600">No screening questions answered for this application.</p>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  {selectedApplication.skills && selectedApplication.skills.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedApplication.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status Update */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Update Status</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {statusOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => updateApplicationStatus(selectedApplication.id, option.value)}
                            disabled={updatingStatus === selectedApplication.id}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                              selectedApplication.status === option.value
                                ? option.color + ' border border-transparent'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                    {updatingStatus === selectedApplication.id && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-600">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Updating status...
                      </div>
                    )}
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