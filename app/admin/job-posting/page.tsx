'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Search,
  Filter,
  ChevronRight,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Building,
  TrendingUp,
  CheckCircle,
  XCircle,
  Loader2,
  Save,
  X,
  ExternalLink,
  FileText,
  ListChecks,
  Award,
  AlertCircle,
  PauseCircle
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  posted_date: string;
  applicants_count: number;
  is_active: boolean;
  created_at: string;
  custom_job_id: string;
  status: 'opened' | 'closed' | 'on_hold' | 'draft';
}

// Define job status options
const jobStatuses = [
  { value: 'opened', label: 'Opened', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { value: 'closed', label: 'Closed', color: 'bg-red-100 text-red-800', icon: XCircle },
  { value: 'on_hold', label: 'On Hold', color: 'bg-yellow-100 text-yellow-800', icon: PauseCircle },
  { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: FileText }
];

export default function JobPostingsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Modal states
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Job>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map database is_active to extended status
      const jobsWithStatus = (data || []).map(job => ({
        ...job,
        status: job.is_active ? 'opened' : 'closed' // Default mapping
      }));
      
      setJobs(jobsWithStatus);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Open view modal
  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setEditForm({ ...job });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setIsEditing(false);
  };

  // Handle edit toggle
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle array field changes
  const handleArrayChange = (field: 'responsibilities' | 'requirements' | 'benefits', index: number, value: string) => {
    setEditForm(prev => {
      const currentArray = prev[field] || [];
      const newArray = [...currentArray];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  // Add new array item
  const handleAddArrayItem = (field: 'responsibilities' | 'requirements' | 'benefits') => {
    setEditForm(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  // Remove array item
  const handleRemoveArrayItem = (field: 'responsibilities' | 'requirements' | 'benefits', index: number) => {
    setEditForm(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  // Save edited job
  const handleSaveJob = async () => {
    if (!selectedJob) return;

    try {
      setSaving(true);
      
      // Map status to is_active for database
      const is_active = editForm.status === 'opened';
      
      const { error } = await supabase
        .from('jobs')
        .update({
          title: editForm.title,
          department: editForm.department,
          location: editForm.location,
          type: editForm.type,
          experience: editForm.experience,
          salary: editForm.salary,
          description: editForm.description,
          responsibilities: editForm.responsibilities,
          requirements: editForm.requirements,
          benefits: editForm.benefits,
          is_active,
          posted_date: editForm.posted_date
        })
        .eq('id', selectedJob.id);

      if (error) throw error;

      // Update local state
      const updatedJobs = jobs.map(job => 
        job.id === selectedJob.id 
          ? { ...job, ...editForm, is_active, status: editForm.status as any }
          : job
      );
      
      setJobs(updatedJobs);
      setSelectedJob({ ...selectedJob, ...editForm, is_active, status: editForm.status as any });
      setIsEditing(false);
      
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(jobId);
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) throw error;

      setJobs(prev => prev.filter(job => job.id !== jobId));
      if (selectedJob?.id === jobId) {
        closeModal();
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // Cycle through statuses
  const toggleJobStatus = async (jobId: string, currentStatus: string) => {
    try {
      const currentIndex = jobStatuses.findIndex(s => s.value === currentStatus);
      const nextIndex = (currentIndex + 1) % jobStatuses.length;
      const newStatus = jobStatuses[nextIndex].value;
      const is_active = newStatus === 'opened';
      
      const { error } = await supabase
        .from('jobs')
        .update({ 
          is_active,
          status: newStatus // This will only work if you have a status column in your database
        })
        .eq('id', jobId);

      if (error) throw error;

      setJobs(prev =>
        prev.map(job =>
          job.id === jobId ? { ...job, is_active, status: newStatus as any } : job
        )
      );
      
      // Update modal if open
      if (selectedJob?.id === jobId) {
        setSelectedJob(prev => prev ? { ...prev, is_active, status: newStatus as any } : null);
        setEditForm(prev => ({ ...prev, status: newStatus as any }));
      }
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  const getUniqueDepartments = () => {
    const departments = jobs.map(job => job.department);
    return [...new Set(departments)];
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const stats = {
    total: jobs.length,
    active: jobs.filter(job => job.status === 'opened').length,
    applicants: jobs.reduce((sum, job) => sum + (job.applicants_count || 0), 0),
    avgApplicants: jobs.length > 0 ? (jobs.reduce((sum, job) => sum + (job.applicants_count || 0), 0) / jobs.length).toFixed(1) : 0
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading job postings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-600 mt-2">Manage and review all your job listings</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/job-posting/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Post New Job
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applicants</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.applicants}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, department, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              {jobStatuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
            
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Departments</option>
              {getUniqueDepartments().map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-gradient-to-r from-blue-800 to-blue-900">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Job Details</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Applicants</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Posted Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>No jobs found</p>
                      <p className="text-sm mt-1">Try changing your filters or post a new job</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => {
                  const StatusIcon = jobStatuses.find(s => s.value === job.status)?.icon || AlertCircle;
                  const statusConfig = jobStatuses.find(s => s.value === job.status) || jobStatuses[0];
                  
                  return (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                              <MapPin className="w-3.5 h-3.5" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                              <Clock className="w-3.5 h-3.5" />
                              {job.type}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                              <DollarSign className="w-3.5 h-3.5" />
                              {job.salary}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700 font-medium">{job.department}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleJobStatus(job.id, job.status || 'closed')}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${statusConfig.color}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusConfig.label}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <span className="font-bold text-gray-900">{job.applicants_count || 0}</span>
                            <span className="text-xs text-gray-500 ml-1">applicants</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700 font-medium">
                            {new Date(job.posted_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleViewJob(job)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          <Link
                            href={`/careers/${job.id}`}
                            target="_blank"
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Public View"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            disabled={deletingId === job.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete Job"
                          >
                            {deletingId === job.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {filteredJobs.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredJobs.length}</span> of <span className="font-medium">{jobs.length}</span> jobs
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          {/* Backdrop with less opacity for better visibility */}
          <div className="fixed inset-0 bg-black/50" onClick={closeModal} />
          
          {/* Modal Container */}
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden z-50">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {isEditing ? 'Edit Job' : 'Job Details'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Job ID: {selectedJob.custom_job_id || selectedJob.id.slice(0, 8)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveJob}
                      disabled={saving}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEditToggle}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={closeModal}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Close
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 80px)' }}>
              {isEditing ? (
                // Edit Form
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department *
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={editForm.department || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={editForm.location || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Type *
                      </label>
                      <select
                        name="type"
                        value={editForm.type || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience *
                      </label>
                      <input
                        type="text"
                        name="experience"
                        value={editForm.experience || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary *
                      </label>
                      <input
                        type="text"
                        name="salary"
                        value={editForm.salary || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={editForm.status || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        {jobStatuses.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Posted Date *
                      </label>
                      <input
                        type="date"
                        name="posted_date"
                        value={editForm.posted_date || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={editForm.description || ''}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Responsibilities
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddArrayItem('responsibilities')}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Item
                      </button>
                    </div>
                    {(editForm.responsibilities || []).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <ListChecks className="w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter responsibility"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem('responsibilities', index)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Requirements */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Requirements
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddArrayItem('requirements')}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Item
                      </button>
                    </div>
                    {(editForm.requirements || []).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter requirement"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem('requirements', index)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Benefits
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddArrayItem('benefits')}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Item
                      </button>
                    </div>
                    {(editForm.benefits || []).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter benefit"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem('benefits', index)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="space-y-6">
                  {/* Job Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                            <Building className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-700">{selectedJob.department}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                            <MapPin className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">{selectedJob.location}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-700">{selectedJob.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2 mb-2">
                          <Users className="w-5 h-5 text-gray-600" />
                          <span className="text-lg font-bold text-gray-900">{selectedJob.applicants_count || 0}</span>
                          <span className="text-sm text-gray-600">applicants</span>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {new Date(selectedJob.posted_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Experience Required
                      </h3>
                      <p className="text-gray-900 font-medium">{selectedJob.experience}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Salary
                      </h3>
                      <p className="text-gray-900 font-medium">{selectedJob.salary}</p>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                    <div className="prose max-w-none text-gray-700">
                      {selectedJob.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-3">{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <ListChecks className="w-5 h-5 text-green-600" />
                        Key Responsibilities
                      </h3>
                      <ul className="space-y-2">
                        {selectedJob.responsibilities.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Requirements */}
                  {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits */}
                  {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-600" />
                        Benefits
                      </h3>
                      <ul className="space-y-2">
                        {selectedJob.benefits.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}