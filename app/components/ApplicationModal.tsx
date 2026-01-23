'use client';

import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  Award,
  Star,
  MessageSquare,
  ExternalLink,
  Copy,
  CheckCircle,
  Clock,
  Users,
  Loader2
} from 'lucide-react';

interface ApplicationDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  job_title: string;
  status: string;
  stage: string;
  created_at: string;
  resume_url: string;
  skills: string[];
  university: string;
  branch: string;
  graduation_year: number;
  current_company: string;
  current_ctc: string;
  expected_ctc: string;
  notice_period: string;
  location_preference: string;
  postgres_experience: string;
  nextjs_experience: string;
  cover_letter: string;
  is_fresher: boolean;
  custom_answers: any[];
}

interface ApplicationModalProps {
  application: ApplicationDetails;
  onClose: () => void;
  onUpdateStage: (applicationId: string, newStage: string) => Promise<void>;
  onUpdateStatus: (applicationId: string, newStatus: string) => Promise<void>;
  updatingStage: string | null;
}

const stages = [
  { value: 'applied', label: 'Applied' },
  { value: 'screening', label: 'Screening' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'hired', label: 'Hired' },
  { value: 'rejected', label: 'Rejected' }
];

const statuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'hired', label: 'Hired' }
];

export default function ApplicationModal({ 
  application, 
  onClose, 
  onUpdateStage, 
  onUpdateStatus,
  updatingStage 
}: ApplicationModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'hired': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'applied': return 'bg-gray-100 text-gray-800';
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'offer': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Application Details</h2>
                <p className="text-sm text-gray-600 mt-1">{application.job_title}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Candidate Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold text-white">
                          {application.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{application.name}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{application.email}</span>
                            <button
                              onClick={() => copyToClipboard(application.email)}
                              className="ml-1 p-1 text-gray-400 hover:text-gray-600"
                              title="Copy email"
                            >
                              {copiedEmail ? (
                                <CheckCircle className="w-3 h-3 text-green-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{application.phone || 'Not provided'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                      <div className="relative">
                        <select
                          value={application.stage}
                          onChange={(e) => onUpdateStage(application.id, e.target.value)}
                          disabled={updatingStage === application.id}
                          className={`appearance-none w-full text-center px-3 py-1 rounded-full text-sm font-medium ${getStageColor(application.stage)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          {stages.map(stage => (
                            <option key={stage.value} value={stage.value}>
                              {stage.label}
                            </option>
                          ))}
                        </select>
                        {updatingStage === application.id && (
                          <Loader2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 animate-spin text-blue-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  {application.skills && application.skills.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {application.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resume */}
                  {application.resume_url && (
                    <div className="mt-6">
                      <a
                        href={application.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download Resume
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Education & Experience */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Education & Experience</h3>
                  
                  <div className="space-y-4">
                    {/* Education */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{application.university || 'Not specified'}</h4>
                        <p className="text-sm text-gray-600">
                          {application.branch || 'Not specified'} • {application.graduation_year || 'Not specified'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {application.is_fresher ? 'Fresher' : 'Experienced'}
                        </p>
                      </div>
                    </div>

                    {/* Current Company */}
                    {!application.is_fresher && application.current_company && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <Briefcase className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{application.current_company}</h4>
                          <p className="text-sm text-gray-600">Current Company</p>
                        </div>
                      </div>
                    )}

                    {/* Location Preference */}
                    {application.location_preference && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <MapPin className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Location Preference</h4>
                          <p className="text-sm text-gray-600">{application.location_preference}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Current CTC</p>
                      <p className="font-medium text-gray-900">{application.current_ctc || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expected CTC</p>
                      <p className="font-medium text-gray-900">{application.expected_ctc || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Notice Period</p>
                      <p className="font-medium text-gray-900">{application.notice_period || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">PostgreSQL Experience</p>
                      <p className="font-medium text-gray-900">{application.postgres_experience || 'Not specified'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600">Next.js/React/TypeScript Experience</p>
                      <p className="font-medium text-gray-900">{application.nextjs_experience || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                {application.cover_letter && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Letter</h3>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">{application.cover_letter}</p>
                    </div>
                  </div>
                )}

                {/* Custom Questions */}
                {application.custom_answers && application.custom_answers.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Questions</h3>
                    <div className="space-y-4">
                      {application.custom_answers.map((answer: any, index: number) => (
                        <div key={index} className="space-y-1">
                          <p className="text-sm font-medium text-gray-900">{answer.question}</p>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {answer.answer || 'Not answered'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Actions & Timeline */}
              <div className="space-y-6">
                {/* Actions */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => onUpdateStatus(application.id, 'shortlisted')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors"
                    >
                      <Star className="w-4 h-4" />
                      Shortlist Candidate
                    </button>
                    
                    <button
                      onClick={() => onUpdateStatus(application.id, 'rejected')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Reject Application
                    </button>
                    
                    <button
                      onClick={() => setShowNotes(!showNotes)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Add Notes
                    </button>
                    
                    <a
                      href={`mailto:${application.email}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Send Email
                    </a>
                  </div>
                </div>

                {/* Notes Section */}
                {showNotes && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Notes</h3>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add your notes about this candidate..."
                      className="w-full h-32 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Save Notes
                      </button>
                      <button
                        onClick={() => {
                          setNotes('');
                          setShowNotes(false);
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                        <p className="text-xs text-gray-500">
                          {new Date(application.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Clock className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Status Updated</p>
                        <p className="text-xs text-gray-500">Pending</p>
                        <p className="text-xs text-gray-500">
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Stage</p>
                        <p className="text-xs text-gray-500">
                          {application.stage.charAt(0).toUpperCase() + application.stage.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Info */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Info</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Application ID</span>
                      <span className="text-sm font-medium text-gray-900">{application.id.slice(0, 8)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Applied On</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(application.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Job Title</span>
                      <span className="text-sm font-medium text-gray-900">{application.job_title}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}