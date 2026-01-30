'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderOpen, 
  Briefcase, 
  Users, 
  FileText, 
  TrendingUp, 
  Eye,
  RefreshCw,
  Clock,
  Award,
  Mail,
  Building,
  Bell,
  Loader2,
  ChevronRight,
  XCircle,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  interviewStage: number;
  screeningStage: number;
  hiredCount: number;
  contactSubmissions: number;
  contactNew: number;
  partnerApplications: number;
  partnerNew: number;
}

interface RecentActivity {
  id: string;
  type: 'contact' | 'partner' | 'application' | 'job';
  title: string;
  description: string;
  time: string;
  status: 'new' | 'read' | 'pending' | 'completed' | 'active' | 'rejected';
  icon: any;
  color: string;
  metadata?: {
    email?: string;
    company?: string;
    jobTitle?: string;
    stage?: string;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    interviewStage: 0,
    screeningStage: 0,
    hiredCount: 0,
    contactSubmissions: 0,
    contactNew: 0,
    partnerApplications: 0,
    partnerNew: 0
  });
  
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'all' | 'applications' | 'contacts' | 'partners' | 'jobs'>('all');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch jobs stats
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('*');

      // Fetch applications with job details
      const { data: appsData, error: appsError } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (
            title,
            department
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch contact submissions
      const { data: contactData, error: contactError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch partner applications
      const { data: partnerData, error: partnerError } = await supabase
        .from('partner_applications_infogrowth')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (jobsError || appsError || contactError || partnerError) {
        throw new Error('Failed to fetch data');
      }

      // Calculate stats
      const totalJobs = jobsData?.length || 0;
      const activeJobs = jobsData?.filter(job => job.is_active).length || 0;
      const totalApplications = appsData?.length || 0;
      const pendingApplications = appsData?.filter(app => app.status === 'pending').length || 0;
      const interviewStage = appsData?.filter(app => app.stage === 'interview').length || 0;
      const screeningStage = appsData?.filter(app => app.stage === 'screening').length || 0;
      const hiredCount = appsData?.filter(app => app.status === 'hired').length || 0;
      const contactSubmissions = contactData?.length || 0;
      const contactNew = contactData?.filter(c => c.status === 'new').length || 0;
      const partnerApplications = partnerData?.length || 0;
      const partnerNew = partnerData?.filter(p => p.status === 'pending').length || 0;

      setStats({
        totalJobs,
        activeJobs,
        totalApplications,
        pendingApplications,
        interviewStage,
        screeningStage,
        hiredCount,
        contactSubmissions,
        contactNew,
        partnerApplications,
        partnerNew
      });

      // Build recent activity
      const activities: RecentActivity[] = [];

      // Add active job openings
      (jobsData || []).filter(job => job.is_active).slice(0, 4).forEach(job => {
        activities.push({
          id: job.id,
          type: 'job',
          title: job.title,
          description: `${job.department} • ${job.location}`,
          time: formatTimeAgo(job.posted_date),
          status: 'active',
          icon: FileText,
          color: 'bg-orange-500',
          metadata: { jobTitle: job.title }
        });
      });

      // Add recent contact submissions
      (contactData || []).slice(0, 3).forEach(contact => {
        activities.push({
          id: contact.id,
          type: 'contact',
          title: contact.name,
          description: contact.subject,
          time: formatTimeAgo(contact.created_at),
          status: contact.status === 'new' ? 'new' : contact.status === 'replied' ? 'completed' : 'read',
          icon: Mail,
          color: 'bg-blue-500',
          metadata: { email: contact.email, company: contact.company }
        });
      });

      // Add recent partner applications
      (partnerData || []).slice(0, 3).forEach(partner => {
        activities.push({
          id: partner.id,
          type: 'partner',
          title: partner.company_name,
          description: `${partner.partnership_type} partnership`,
          time: formatTimeAgo(partner.created_at),
          status: partner.status === 'pending' ? 'pending' : partner.status === 'approved' ? 'completed' : 'rejected',
          icon: Users,
          color: 'bg-green-500',
          metadata: { email: partner.email }
        });
      });

      // Add recent job applications
      (appsData || []).slice(0, 4).forEach(app => {
        activities.push({
          id: app.id,
          type: 'application',
          title: app.name,
          description: app.jobs?.title || 'Job application',
          time: formatTimeAgo(app.created_at),
          status: app.status === 'pending' ? 'pending' : app.status === 'hired' ? 'completed' : 'rejected',
          icon: Briefcase,
          color: 'bg-purple-500',
          metadata: { email: app.email, jobTitle: app.jobs?.title, stage: app.stage }
        });
      });

      // Sort by time
      activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setRecentActivity(activities.slice(0, 12));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const statCards = [
    {
      title: 'Contact Forms',
      value: stats.contactSubmissions,
      newItems: stats.contactNew,
      icon: Mail,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      change: '+12%',
      trend: 'up',
      link: '/admin/contact-forms'
    },
    {
      title: 'Partner Applications',
      value: stats.partnerApplications,
      newItems: stats.partnerNew,
      icon: Users,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      change: '+8%',
      trend: 'up',
      link: '/admin/partner-applications'
    },
    {
      title: 'Job Applications',
      value: stats.totalApplications,
      newItems: stats.pendingApplications,
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
      change: '+24%',
      trend: 'up',
      link: '/admin/applications'
    },
    {
      title: 'Active Jobs',
      value: stats.activeJobs,
      newItems: 0,
      icon: FolderOpen,
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50',
      change: '+3',
      trend: 'up',
      link: '/admin/job-posting'
    },
    {
      title: 'Screening',
      value: stats.screeningStage,
      newItems: 0,
      icon: FileText,
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      change: '+5',
      trend: 'up',
      link: '/admin/applications'
    },
    {
      title: 'Total Hired',
      value: stats.hiredCount,
      newItems: 0,
      icon: Award,
      color: 'from-teal-500 to-teal-600',
      textColor: 'text-teal-700',
      bgColor: 'bg-teal-50',
      change: '+2',
      trend: 'up',
      link: '/admin/applications'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'read':
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'replied':
      case 'approved':
      case 'completed':
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived':
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
      case 'pending': return <Clock className="w-3.5 h-3.5" />;
      case 'read':
      case 'reviewed': return <Eye className="w-3.5 h-3.5" />;
      case 'replied':
      case 'approved':
      case 'completed':
      case 'active': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'archived':
      case 'rejected': return <XCircle className="w-3.5 h-3.5" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const filteredActivities = recentActivity.filter(activity => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'applications') return activity.type === 'application';
    if (selectedTab === 'contacts') return activity.type === 'contact';
    if (selectedTab === 'partners') return activity.type === 'partner';
    if (selectedTab === 'jobs') return activity.type === 'job';
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-all hover:shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            className="block group"
          >
            <div className={`${stat.bgColor} rounded-xl p-5 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md h-full`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg shadow-sm`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                {stat.newItems > 0 && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                    {stat.newItems} new
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center text-sm">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1.5" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-red-500 mr-1.5 rotate-180" />
                  )}
                  <span className={`${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                    {stat.change}
                  </span>
                </div>
                <span className="text-xs text-gray-500">vs last week</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <p className="text-gray-600 mt-1">Latest submissions and active job openings</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedTab('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedTab('applications')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedTab === 'applications' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Jobs
              </button>
              <button
                onClick={() => setSelectedTab('contacts')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedTab === 'contacts' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Contacts
              </button>
              <button
                onClick={() => setSelectedTab('partners')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedTab === 'partners' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Partners
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredActivities.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">No recent activity</p>
              <p className="text-sm text-gray-400 mt-1">Submissions will appear here</p>
            </div>
          ) : (
            filteredActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`${activity.color} p-3 rounded-lg flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${activity.color} text-white`}>
                              {activity.type.toUpperCase()}
                            </span>
                            <h4 className="font-semibold text-gray-900 truncate">{activity.title}</h4>
                          </div>
                          <p className="text-gray-600 text-sm">{activity.description}</p>
                          
                          {activity.metadata && (
                            <div className="mt-2 flex flex-wrap gap-3 text-sm">
                              {activity.metadata.email && (
                                <div className="flex items-center gap-1.5 text-gray-500">
                                  <Mail className="w-3.5 h-3.5" />
                                  <span className="truncate">{activity.metadata.email}</span>
                                </div>
                              )}
                              {activity.metadata.company && (
                                <div className="flex items-center gap-1.5 text-gray-500">
                                  <Building className="w-3.5 h-3.5" />
                                  <span>{activity.metadata.company}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activity.status)}`}>
                            {getStatusIcon(activity.status)}
                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          </span>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-500 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {activity.time}
                            </span>
                            <Link
                              href={
                                activity.type === 'contact' ? `/admin/contact-forms` :
                                activity.type === 'partner' ? `/admin/partner-applications` :
                                `/admin/applications`
                              }
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              View →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {filteredActivities.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-center">
              <Link
                href="/admin/applications"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                View all activity
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}