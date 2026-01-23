'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Briefcase, Clock, 
  DollarSign, Users, Building
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
  posted_date: string;
  applicants_count: number;
  is_active: boolean;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, jobs]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('posted_date', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
      setFilteredJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    if (!searchTerm) {
      setFilteredJobs(jobs);
      return;
    }
    
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-300 mb-6">
              <Building className="w-5 h-5" />
              <span className="text-sm font-medium">Careers at Infogrowth</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Join Our Team
            </h1>
            
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
              Discover exciting opportunities and build your career with us.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs by title, location, or department..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Current Openings</h2>
            <p className="text-gray-600">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 overflow-hidden flex flex-col h-full"
              >
                <Link 
                  href={`/careers/${job.id}`}
                  className="flex flex-col h-full"
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{job.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{job.department}</span>
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                          </span>
                        </div>
                      </div>
                      <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-semibold text-sm whitespace-nowrap ml-2 flex-shrink-0">
                        {job.type}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div className="mb-4 flex-1 min-h-[60px]">
                      <p className="text-gray-600 line-clamp-2">{job.description}</p>
                    </div>
                    
                    {/* Job Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 flex-shrink-0 text-gray-500" />
                        <span className="text-sm truncate">{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <DollarSign className="w-4 h-4 flex-shrink-0 text-gray-500" />
                        <span className="text-sm truncate">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4 flex-shrink-0 text-gray-500" />
                        <span className="text-sm truncate">
                          {job.applicants_count} applicant{job.applicants_count !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    
                    {/* Footer Section */}
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 truncate mr-2">
                          Posted on {new Date(job.posted_date).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/careers/${job.id}`;
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No jobs found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any jobs matching your search. Try adjusting your filters or check back later for new opportunities.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      
    </div>
  );
}