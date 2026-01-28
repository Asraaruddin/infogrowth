// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import {
//   FolderOpen, 
//   Briefcase, 
//   Users, 
//   FileText, 
//   TrendingUp, 
//   Calendar,
//   Eye,
//   Download,
//   Filter,
//   Search,
//   ChevronRight,
//   ChevronDown,
//   CheckCircle,
//   Clock,
//   Award,
//   X,
//   Mail,
//   Phone,
//   GraduationCap,
//   MapPin,
//   ExternalLink,
//   MoreVertical,
//   Star,
//   Edit,
//   MessageSquare,
//   CalendarDays,
//   AlertCircle,
//   Loader2
// } from 'lucide-react';
// import { supabase } from '@/app/lib/supabase';
// import ApplicationModal from '@/app/components/ApplicationModal';

// interface DashboardStats {
//   totalJobs: number;
//   activeJobs: number;
//   totalApplications: number;
//   pendingApplications: number;
//   interviewStage: number;
//   screeningStage: number;
//   hiredCount: number;
// }

// interface RecentApplication {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   job_title: string;
//   job_id: string;
//   status: string;
//   stage: string;
//   created_at: string;
//   resume_url: string;
//   skills: string[];
//   university: string;
//   experience: string;
// }

// interface JobOpening {
//   id: string;
//   title: string;
//   department: string;
//   location: string;
//   type: string;
//   applicants_count: number;
//   is_active: boolean;
//   posted_date: string;
// }

// interface ApplicationDetails {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   job_title: string;
//   status: string;
//   stage: string;
//   created_at: string;
//   resume_url: string;
//   skills: string[];
//   university: string;
//   branch: string;
//   graduation_year: number;
//   current_company: string;
//   current_ctc: string;
//   expected_ctc: string;
//   notice_period: string;
//   location_preference: string;
//   postgres_experience: string;
//   nextjs_experience: string;
//   cover_letter: string;
//   is_fresher: boolean;
//   custom_answers: any[];
// }

// export default function RecruiterDashboard() {
//   const [stats, setStats] = useState<DashboardStats>({
//     totalJobs: 0,
//     activeJobs: 0,
//     totalApplications: 0,
//     pendingApplications: 0,
//     interviewStage: 0,
//     screeningStage: 0,
//     hiredCount: 0
//   });
  
//   const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
//   const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [stageFilter, setStageFilter] = useState('all');
//   const [selectedApplication, setSelectedApplication] = useState<ApplicationDetails | null>(null);
//   const [showApplicationModal, setShowApplicationModal] = useState(false);
//   const [updatingStage, setUpdatingStage] = useState<string | null>(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch jobs stats
//       const { data: jobsData, error: jobsError } = await supabase
//         .from('jobs')
//         .select('*');

//       if (jobsError) throw jobsError;

//       // Fetch applications with job details
//       const { data: appsData, error: appsError } = await supabase
//         .from('applications')
//         .select(`
//           *,
//           jobs (
//             title,
//             department
//           )
//         `)
//         .order('created_at', { ascending: false })
//         .limit(20);

//       if (appsError) throw appsError;

//       // Calculate stats
//       const totalJobs = jobsData?.length || 0;
//       const activeJobs = jobsData?.filter(job => job.is_active).length || 0;
//       const totalApplications = appsData?.length || 0;
//       const pendingApplications = appsData?.filter(app => app.status === 'pending').length || 0;
//       const interviewStage = appsData?.filter(app => app.stage === 'interview').length || 0;
//       const screeningStage = appsData?.filter(app => app.stage === 'screening').length || 0;
//       const hiredCount = appsData?.filter(app => app.status === 'hired').length || 0;

//       setStats({
//         totalJobs,
//         activeJobs,
//         totalApplications,
//         pendingApplications,
//         interviewStage,
//         screeningStage,
//         hiredCount
//       });

//       // Transform applications data
//       const transformedApplications: RecentApplication[] = (appsData || []).map(app => ({
//         id: app.id,
//         name: app.name,
//         email: app.email,
//         phone: app.phone || '',
//         job_title: app.jobs?.title || 'N/A',
//         job_id: app.job_id,
//         status: app.status || 'applied',
//         stage: app.stage || 'applied',
//         created_at: app.created_at,
//         resume_url: app.resume_url || '',
//         skills: Array.isArray(app.skills) ? app.skills : [],
//         university: app.university || '',
//         experience: app.experience || '{}'
//       }));

//       setRecentApplications(transformedApplications);

//       // Get active job openings
//       const activeJobsList = (jobsData || [])
//         .filter(job => job.is_active)
//         .slice(0, 5)
//         .map(job => ({
//           id: job.id,
//           title: job.title,
//           department: job.department,
//           location: job.location,
//           type: job.type,
//           applicants_count: job.applicants_count || 0,
//           is_active: job.is_active,
//           posted_date: job.posted_date
//         }));

//       setJobOpenings(activeJobsList);

//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchApplicationDetails = async (applicationId: string) => {
//     try {
//       const { data: appData, error } = await supabase
//         .from('applications')
//         .select(`
//           *,
//           jobs (
//             title,
//             department
//           ),
//           application_answers (
//             questions (
//               question_text,
//               question_type
//             ),
//             answer
//           )
//         `)
//         .eq('id', applicationId)
//         .single();

//       if (error) throw error;

//       // Transform custom answers
//       const customAnswers = appData.application_answers?.map((answer: any) => ({
//         question: answer.questions?.question_text,
//         type: answer.questions?.question_type,
//         answer: answer.answer
//       })) || [];

//       const applicationDetails: ApplicationDetails = {
//         id: appData.id,
//         name: appData.name,
//         email: appData.email,
//         phone: appData.phone || '',
//         job_title: appData.jobs?.title || 'N/A',
//         status: appData.status || 'applied',
//         stage: appData.stage || 'applied',
//         created_at: appData.created_at,
//         resume_url: appData.resume_url || '',
//         skills: Array.isArray(appData.skills) ? appData.skills : [],
//         university: appData.university || '',
//         branch: appData.branch || '',
//         graduation_year: appData.graduation_year,
//         current_company: appData.current_company || '',
//         current_ctc: appData.current_ctc || '',
//         expected_ctc: appData.expected_ctc || '',
//         notice_period: appData.notice_period || '',
//         location_preference: appData.location_preference || '',
//         postgres_experience: appData.postgres_experience || '',
//         nextjs_experience: appData.nextjs_experience || '',
//         cover_letter: appData.cover_letter || '',
//         is_fresher: appData.is_fresher || true,
//         custom_answers: customAnswers
//       };

//       setSelectedApplication(applicationDetails);
//       setShowApplicationModal(true);
//     } catch (error) {
//       console.error('Error fetching application details:', error);
//     }
//   };

//   const updateApplicationStage = async (applicationId: string, newStage: string) => {
//     try {
//       setUpdatingStage(applicationId);
//       const { error } = await supabase
//         .from('applications')
//         .update({ stage: newStage })
//         .eq('id', applicationId);

//       if (error) throw error;

//       // Update local state
//       setRecentApplications(prev =>
//         prev.map(app =>
//           app.id === applicationId ? { ...app, stage: newStage } : app
//         )
//       );

//       if (selectedApplication?.id === applicationId) {
//         setSelectedApplication(prev => prev ? { ...prev, stage: newStage } : null);
//       }
//     } catch (error) {
//       console.error('Error updating stage:', error);
//     } finally {
//       setUpdatingStage(null);
//     }
//   };

//   const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
//     try {
//       const { error } = await supabase
//         .from('applications')
//         .update({ status: newStatus })
//         .eq('id', applicationId);

//       if (error) throw error;

//       // Update local state
//       setRecentApplications(prev =>
//         prev.map(app =>
//           app.id === applicationId ? { ...app, status: newStatus } : app
//         )
//       );

//       if (selectedApplication?.id === applicationId) {
//         setSelectedApplication(prev => prev ? { ...prev, status: newStatus } : null);
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const statCards = [
//     {
//       title: 'Total Jobs',
//       value: stats.totalJobs,
//       icon: Briefcase,
//       color: 'from-blue-500 to-blue-600',
//       textColor: 'text-blue-700',
//       bgColor: 'bg-blue-50',
//       change: '+12%',
//       trend: 'up'
//     },
//     {
//       title: 'Open Positions',
//       value: stats.activeJobs,
//       icon: FolderOpen,
//       color: 'from-green-500 to-green-600',
//       textColor: 'text-green-700',
//       bgColor: 'bg-green-50',
//       change: '+3',
//       trend: 'up'
//     },
//     {
//       title: 'Total Applications',
//       value: stats.totalApplications,
//       icon: Users,
//       color: 'from-purple-500 to-purple-600',
//       textColor: 'text-purple-700',
//       bgColor: 'bg-purple-50',
//       change: '+24%',
//       trend: 'up'
//     },
//     {
//       title: 'Screening',
//       value: stats.screeningStage,
//       icon: FileText,
//       color: 'from-yellow-500 to-yellow-600',
//       textColor: 'text-yellow-700',
//       bgColor: 'bg-yellow-50',
//       change: '+5',
//       trend: 'up'
//     },
//     {
//       title: 'Interview',
//       value: stats.interviewStage,
//       icon: Calendar,
//       color: 'from-orange-500 to-orange-600',
//       textColor: 'text-orange-700',
//       bgColor: 'bg-orange-50',
//       change: '+3',
//       trend: 'up'
//     },
//     {
//       title: 'Hired',
//       value: stats.hiredCount,
//       icon: Award,
//       color: 'from-teal-500 to-teal-600',
//       textColor: 'text-teal-700',
//       bgColor: 'bg-teal-50',
//       change: '+2',
//       trend: 'up'
//     }
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'reviewed': return 'bg-blue-100 text-blue-800';
//       case 'shortlisted': return 'bg-green-100 text-green-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       case 'hired': return 'bg-teal-100 text-teal-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStageColor = (stage: string) => {
//     switch (stage) {
//       case 'applied': return 'bg-gray-100 text-gray-800';
//       case 'screening': return 'bg-yellow-100 text-yellow-800';
//       case 'interview': return 'bg-blue-100 text-blue-800';
//       case 'offer': return 'bg-purple-100 text-purple-800';
//       case 'hired': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const stages = [
//     { value: 'applied', label: 'Applied' },
//     { value: 'screening', label: 'Screening' },
//     { value: 'interview', label: 'Interview' },
//     { value: 'offer', label: 'Offer' },
//     { value: 'hired', label: 'Hired' },
//     { value: 'rejected', label: 'Rejected' }
//   ];

//   const statuses = [
//     { value: 'pending', label: 'Pending' },
//     { value: 'reviewed', label: 'Reviewed' },
//     { value: 'shortlisted', label: 'Shortlisted' },
//     { value: 'rejected', label: 'Rejected' },
//     { value: 'hired', label: 'Hired' }
//   ];

//   const filteredApplications = recentApplications.filter(app => {
//     const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          app.job_title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
//     const matchesStage = stageFilter === 'all' || app.stage === stageFilter;
//     return matchesSearch && matchesStatus && matchesStage;
//   });

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Application Details Modal */}
//       {showApplicationModal && selectedApplication && (
//         <ApplicationModal
//           application={selectedApplication}
//           onClose={() => setShowApplicationModal(false)}
//           onUpdateStage={updateApplicationStage}
//           onUpdateStatus={updateApplicationStatus}
//           updatingStage={updatingStage}
//         />
//       )}

//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
//           <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your recruitment.</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Link
//             href="/recruiter/jobs/new"
//             className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
//           >
//             <Briefcase className="w-5 h-5" />
//             Post New Job
//           </Link>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//         {statCards.map((stat, index) => (
//           <div
//             key={index}
//             className={`${stat.bgColor} rounded-xl p-5 border border-gray-200/50 hover:border-gray-300 transition-all duration-200 hover:shadow-sm`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                 <p className={`text-2xl font-bold ${stat.textColor} mt-1`}>
//                   {stat.value}
//                 </p>
//               </div>
//               <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg shadow-sm`}>
//                 <stat.icon className="w-5 h-5 text-white" />
//               </div>
//             </div>
//             <div className="mt-4 flex items-center justify-between">
//               <div className="flex items-center text-sm">
//                 {stat.trend === 'up' ? (
//                   <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//                 ) : (
//                   <TrendingUp className="w-4 h-4 text-red-500 mr-1 rotate-180" />
//                 )}
//                 <span className={`${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} font-medium`}>
//                   {stat.change}
//                 </span>
//               </div>
//               <span className="text-xs text-gray-500">from last month</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Left Column: Job Openings and Quick Stats */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Recent Applications */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
//                   <p className="text-sm text-gray-600 mt-1">Latest job applications received</p>
//                 </div>
//                 <div className="flex flex-wrap items-center gap-3">
//                   {/* Search */}
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search applications..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   {/* Filters */}
//                   <div className="flex items-center gap-2">
//                     <select
//                       value={statusFilter}
//                       onChange={(e) => setStatusFilter(e.target.value)}
//                       className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="all">All Status</option>
//                       {statuses.map(status => (
//                         <option key={status.value} value={status.value}>
//                           {status.label}
//                         </option>
//                       ))}
//                     </select>
                    
//                     <select
//                       value={stageFilter}
//                       onChange={(e) => setStageFilter(e.target.value)}
//                       className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="all">All Stages</option>
//                       {stages.map(stage => (
//                         <option key={stage.value} value={stage.value}>
//                           {stage.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Candidate
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Position
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Stage
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Applied
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredApplications.length === 0 ? (
//                     <tr>
//                       <td colSpan={6} className="px-6 py-12 text-center">
//                         <div className="text-gray-500">
//                           <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
//                           <p>No applications found</p>
//                           <p className="text-sm mt-1">Try changing your filters</p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredApplications.slice(0, 8).map((app) => (
//                       <tr key={app.id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4">
//                           <div>
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
//                                 <span className="text-xs font-medium text-white">
//                                   {app.name.split(' ').map(n => n[0]).join('').toUpperCase()}
//                                 </span>
//                               </div>
//                               <div>
//                                 <p className="text-sm font-medium text-gray-900">{app.name}</p>
//                                 <p className="text-xs text-gray-500">{app.email}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <p className="text-sm text-gray-900">{app.job_title}</p>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
//                             {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="relative">
//                             <select
//                               value={app.stage}
//                               onChange={(e) => updateApplicationStage(app.id, e.target.value)}
//                               disabled={updatingStage === app.id}
//                               className={`appearance-none bg-transparent border-none text-xs font-medium px-2 py-1 rounded ${getStageColor(app.stage)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                             >
//                               {stages.map(stage => (
//                                 <option key={stage.value} value={stage.value}>
//                                   {stage.label}
//                                 </option>
//                               ))}
//                             </select>
//                             {updatingStage === app.id && (
//                               <Loader2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 animate-spin text-blue-600" />
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-500">
//                           {new Date(app.created_at).toLocaleDateString()}
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => fetchApplicationDetails(app.id)}
//                               className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
//                             >
//                               <Eye className="w-4 h-4" />
//                               View
//                             </button>
//                             {app.resume_url && (
//                               <a
//                                 href={app.resume_url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
//                               >
//                                 <Download className="w-4 h-4" />
//                                 Resume
//                               </a>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
            
//             <div className="px-6 py-4 border-t border-gray-200">
//               <div className="flex items-center justify-between">
//                 <p className="text-sm text-gray-600">
//                   Showing {Math.min(filteredApplications.length, 8)} of {filteredApplications.length} applications
//                 </p>
//                 <Link
//                   href="/recruiter/applications"
//                   className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
//                 >
//                   View all applications
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-white/20 rounded-lg">
//                   <Briefcase className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="font-medium">Post a New Job</h3>
//                   <p className="text-sm opacity-90 mt-1">Create a new job listing</p>
//                 </div>
//               </div>
//               <Link
//                 href="/recruiter/jobs/new"
//                 className="inline-block mt-4 w-full text-center py-2.5 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
//               >
//                 Post New Job
//               </Link>
//             </div>

//             <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-white/20 rounded-lg">
//                   <FileText className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="font-medium">Manage Questions</h3>
//                   <p className="text-sm opacity-90 mt-1">Add or edit custom questions</p>
//                 </div>
//               </div>
//               <Link
//                 href="/recruiter/questions"
//                 className="inline-block mt-4 w-full text-center py-2.5 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
//               >
//                 View Questions
//               </Link>
//             </div>

//             <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-white/20 rounded-lg">
//                   <Users className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="font-medium">View All Applications</h3>
//                   <p className="text-sm opacity-90 mt-1">Review all applications</p>
//                 </div>
//               </div>
//               <Link
//                 href="/recruiter/applications"
//                 className="inline-block mt-4 w-full text-center py-2.5 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
//               >
//                 See Applications
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Job Openings and Activity */}
//         <div className="space-y-6">
//           {/* Job Openings */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-lg font-semibold text-gray-900">Active Job Openings</h2>
//                 <Link
//                   href="/recruiter/jobs"
//                   className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
//                 >
//                   View all
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//               </div>
//               <p className="text-sm text-gray-600 mt-1">Currently active positions</p>
//             </div>
            
//             <div className="divide-y divide-gray-200">
//               {jobOpenings.length === 0 ? (
//                 <div className="px-6 py-8 text-center">
//                   <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
//                   <p className="text-gray-500">No active job openings</p>
//                   <p className="text-sm text-gray-400 mt-1">Post your first job to get started</p>
//                 </div>
//               ) : (
//                 jobOpenings.map((job) => (
//                   <div key={job.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <h3 className="font-medium text-gray-900">{job.title}</h3>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-xs text-gray-500">{job.department}</span>
//                           <span className="text-xs text-gray-300">•</span>
//                           <span className="text-xs text-gray-500">{job.location}</span>
//                         </div>
//                         <div className="flex items-center gap-3 mt-3">
//                           <div className="flex items-center gap-1">
//                             <Users className="w-4 h-4 text-gray-400" />
//                             <span className="text-xs text-gray-600">{job.applicants_count} applicants</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-4 h-4 text-gray-400" />
//                             <span className="text-xs text-gray-600">
//                               {new Date(job.posted_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         Active
//                       </span>
//                     </div>
//                     <div className="mt-3 flex items-center gap-2">
//                       <Link
//                         href={`/recruiter/jobs/${job.id}`}
//                         className="flex-1 text-center py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
//                       >
//                         View Details
//                       </Link>
//                       <Link
//                         href={`/careers/${job.id}`}
//                         target="_blank"
//                         className="flex-1 text-center py-1.5 text-xs bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
//                       >
//                         Public View
//                       </Link>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Recruitment Stages */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900">Recruitment Funnel</h2>
//               <p className="text-sm text-gray-600 mt-1">Applications by stage</p>
//             </div>
            
//             <div className="p-6">
//               <div className="space-y-4">
//                 {stages.map((stage) => {
//                   const count = recentApplications.filter(app => app.stage === stage.value).length;
//                   const percentage = recentApplications.length > 0 ? (count / recentApplications.length) * 100 : 0;
                  
//                   return (
//                     <div key={stage.value} className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium text-gray-700">{stage.label}</span>
//                         <span className="text-sm text-gray-600">{count} candidates</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div 
//                           className={`h-2 rounded-full ${stage.value === 'hired' ? 'bg-green-500' : stage.value === 'interview' ? 'bg-blue-500' : stage.value === 'screening' ? 'bg-yellow-500' : 'bg-gray-400'}`}
//                           style={{ width: `${percentage}%` }}
//                         ></div>
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {percentage.toFixed(1)}% of total applications
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-600">Total in pipeline:</span>
//                   <span className="font-medium text-gray-900">{recentApplications.length} candidates</span>
//                 </div>
//                 <div className="flex items-center justify-between text-sm mt-2">
//                   <span className="text-gray-600">Conversion rate:</span>
//                   <span className="font-medium text-green-600">
//                     {recentApplications.length > 0 ? 
//                       ((stats.hiredCount / recentApplications.length) * 100).toFixed(1) : 0}%
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }