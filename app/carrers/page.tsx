'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, X, Briefcase, Clock, DollarSign, ChevronRight, ChevronLeft, ExternalLink, Mail, Phone, Globe, Users, Award, Zap, Heart, Building } from 'lucide-react';

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Software Developer',
    department: 'Engineering',
    location: 'Bangalore, India',
    type: 'Full Time',
    experience: '4-6 years',
    salary: '₹12-20 LPA',
    description: 'Design and develop high-volume, low-latency applications for mission-critical systems, ensuring top-tier availability and performance. Contribute to architecture decisions and mentor junior developers.',
    responsibilities: [
      'Design, develop, and maintain scalable web applications',
      'Collaborate with cross-functional teams to define, design, and ship new features',
      'Write clean, maintainable, and efficient code',
      'Mentor junior developers and conduct code reviews',
      'Optimize applications for maximum speed and scalability'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '4+ years of experience in full-stack development',
      'Strong proficiency in JavaScript, TypeScript, and React',
      'Experience with Node.js, Python, or Java',
      'Familiarity with cloud platforms (AWS, Azure, or GCP)',
      'Knowledge of database technologies (SQL and NoSQL)'
    ],
    benefits: [
      'Health insurance for you and your family',
      'Flexible working hours and remote options',
      'Annual learning budget of ₹50,000',
      'Stock options and performance bonuses',
      'Quarterly team outings and events'
    ],
    postedDate: '2024-01-15',
    applicants: 42
  },
  {
    id: 2,
    title: 'Web Developer',
    department: 'Engineering',
    location: 'Chennai, India',
    type: 'Full Time',
    experience: '2-4 years',
    salary: '₹8-12 LPA',
    description: 'Develop new components based on design specs. Work independently and write maintainable code. Understand existing code and suggest optimization in terms of performance and scalability.',
    responsibilities: [
      'Translate UI/UX designs into functional web applications',
      'Build reusable components and front-end libraries',
      'Ensure technical feasibility of UI/UX designs',
      'Optimize applications for maximum speed and scalability',
      'Collaborate with back-end developers and web designers'
    ],
    requirements: [
      '2+ years of experience in web development',
      'Proficient in HTML5, CSS3, JavaScript, and React',
      'Experience with responsive and mobile-first design',
      'Knowledge of version control systems (Git)',
      'Understanding of SEO principles'
    ],
    benefits: [
      'Comprehensive health coverage',
      'Work-from-home flexibility',
      'Learning and development programs',
      'Performance-based bonuses',
      'Modern workspace with amenities'
    ],
    postedDate: '2024-01-10',
    applicants: 28
  },
  {
    id: 3,
    title: 'QA Engineer',
    department: 'Quality Assurance',
    location: 'Hyderabad, India',
    type: 'Full Time',
    experience: '3-5 years',
    salary: '₹10-15 LPA',
    description: 'Experience in manual and automation testing. Knowledge of Java Programming (data types, variables, operators, flow control statements, methods (built-in and user-defined).',
    responsibilities: [
      'Design and execute test plans and test cases',
      'Perform manual and automated testing',
      'Identify, record, and track bugs',
      'Collaborate with development teams',
      'Develop and maintain automated test scripts'
    ],
    requirements: [
      '3+ years of experience in software testing',
      'Knowledge of automation tools (Selenium, Cypress)',
      'Experience with test management tools',
      'Understanding of Agile/Scrum methodologies',
      'Strong analytical and problem-solving skills'
    ],
    benefits: [
      'Health and wellness programs',
      'Flexible working hours',
      'Professional certification support',
      'Team building activities',
      'Competitive salary package'
    ],
    postedDate: '2024-01-12',
    applicants: 19
  },
  {
    id: 4,
    title: 'Content/Technical Writer',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full Time',
    experience: '2-4 years',
    salary: '₹6-10 LPA',
    description: 'Ideate and create content for blogs, articles, social media copies, and other formats on a regular basis. Stay up to date with content in the market to produce relevant and engaging content.',
    responsibilities: [
      'Create technical documentation and user guides',
      'Write engaging blog posts and articles',
      'Develop content for social media and marketing campaigns',
      'Collaborate with product and engineering teams',
      'Maintain brand voice across all content'
    ],
    requirements: [
      'Excellent writing and editing skills',
      'Experience with technical documentation',
      'Knowledge of SEO best practices',
      'Portfolio of published articles',
      'Ability to simplify complex technical concepts'
    ],
    benefits: [
      'Remote-first work culture',
      'Annual content creation budget',
      'Health insurance coverage',
      'Learning stipend for courses',
      'Quarterly performance bonuses'
    ],
    postedDate: '2024-01-08',
    applicants: 35
  },
  {
    id: 5,
    title: 'Technical Support Engineer',
    department: 'Customer Success',
    location: 'Pune, India',
    type: 'Full Time',
    experience: '1-3 years',
    salary: '₹5-8 LPA',
    description: 'Provide voice-based support to international/domestic customers over the phone (Inbound and Outbound). Build a rapport with customers with clear and concise communication.',
    responsibilities: [
      'Provide technical support to customers',
      'Troubleshoot and resolve technical issues',
      'Document customer interactions and solutions',
      'Escalate complex issues to appropriate teams',
      'Contribute to knowledge base articles'
    ],
    requirements: [
      'Excellent communication skills',
      'Basic technical troubleshooting skills',
      'Customer service experience',
      'Ability to work in shifts',
      'Patience and problem-solving attitude'
    ],
    benefits: [
      'Comprehensive training program',
      'Night shift allowances',
      'Health and wellness benefits',
      'Career growth opportunities',
      'Team outings and events'
    ],
    postedDate: '2024-01-05',
    applicants: 56
  },
  {
    id: 6,
    title: 'Digital Marketing Analyst',
    department: 'Marketing',
    location: 'Delhi, India',
    type: 'Full Time',
    experience: '3-5 years',
    salary: '₹9-14 LPA',
    description: 'Manage Google Adwords Campaigns to improve Return on Investment and generate reports. Develop performance metrics to provide recommendations and continuous improvement.',
    responsibilities: [
      'Manage and optimize digital marketing campaigns',
      'Analyze campaign performance and ROI',
      'Generate reports and insights for stakeholders',
      'Stay updated with digital marketing trends',
      'Collaborate with content and design teams'
    ],
    requirements: [
      'Experience with Google Analytics and AdWords',
      'Knowledge of SEO and SEM strategies',
      'Analytical and data-driven mindset',
      'Experience with marketing automation tools',
      'Strong communication and presentation skills'
    ],
    benefits: [
      'Performance-based incentives',
      'Marketing conference budget',
      'Health and dental insurance',
      'Flexible working arrangements',
      'Professional development allowance'
    ],
    postedDate: '2024-01-03',
    applicants: 22
  },
  {
    id: 7,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Bangalore, India',
    type: 'Full Time',
    experience: '3-6 years',
    salary: '₹10-18 LPA',
    description: 'Help build design work across multiple mediums on various projects, from small pieces to multi-channel campaigns. Build digital assets for marketing campaigns and product interfaces.',
    responsibilities: [
      'Design user interfaces for web and mobile applications',
      'Create wireframes, prototypes, and mockups',
      'Conduct user research and usability testing',
      'Collaborate with product and engineering teams',
      'Maintain and evolve design systems'
    ],
    requirements: [
      'Portfolio showcasing UI/UX design work',
      'Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)',
      'Understanding of user-centered design principles',
      'Experience with responsive and mobile design',
      'Knowledge of front-end development principles'
    ],
    benefits: [
      'Latest design software and tools',
      'Annual conference budget',
      'Health and wellness programs',
      'Creative workspace environment',
      'Stock options'
    ],
    postedDate: '2024-01-14',
    applicants: 31
  },
  {
    id: 8,
    title: 'Sales Executive',
    department: 'Sales',
    location: 'Mumbai, India',
    type: 'Full Time',
    experience: '2-4 years',
    salary: '₹7-12 LPA + Commission',
    description: 'Build rapport with contacts and understand where the prospect is in the buying process. Identify opportunities that meet a minimum qualification criteria and manage the sales pipeline.',
    responsibilities: [
      'Generate new business opportunities',
      'Manage sales pipeline and forecasts',
      'Build and maintain client relationships',
      'Achieve sales targets and quotas',
      'Collaborate with marketing and product teams'
    ],
    requirements: [
      'Proven sales experience in B2B/B2C',
      'Excellent communication and negotiation skills',
      'Ability to build relationships with clients',
      'Goal-oriented and self-motivated',
      'Experience with CRM software'
    ],
    benefits: [
      'Uncapped commission structure',
      'Sales performance bonuses',
      'Company car allowance',
      'Health insurance coverage',
      'International travel opportunities'
    ],
    postedDate: '2024-01-07',
    applicants: 45
  },
  {
    id: 9,
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full Time',
    experience: '5-8 years',
    salary: '₹20-30 LPA',
    description: 'Write, rewrite, test, and maintain website and landing pages. Create and maintain accurate comparison documents. Write briefs for ads, landing pages, and marketing campaigns.',
    responsibilities: [
      'Define product vision and strategy',
      'Create and maintain product roadmap',
      'Collaborate with engineering, design, and marketing teams',
      'Conduct market research and competitive analysis',
      'Define and analyze product metrics'
    ],
    requirements: [
      '5+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Experience with Agile methodologies',
      'Excellent communication and leadership skills',
      'Technical background or understanding'
    ],
    benefits: [
      'Remote work flexibility',
      'Stock options and equity',
      'Comprehensive health coverage',
      'Annual learning budget',
      'Quarterly performance bonuses'
    ],
    postedDate: '2024-01-06',
    applicants: 27
  }
];

const departments = ['All Departments', 'Engineering', 'Quality Assurance', 'Marketing', 'Customer Success', 'Design', 'Sales', 'Product'];
const locations = ['All Locations', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Delhi', 'Mumbai', 'Remote'];
const jobTypes = ['All Types', 'Full Time', 'Part Time', 'Contract', 'Internship'];

interface ApplyFormData {
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  jobId: string;
}

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(jobOpenings[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [range, setRange] = useState(10);
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [filteredJobs, setFilteredJobs] = useState(jobOpenings);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [applyForm, setApplyForm] = useState<ApplyFormData>({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    jobId: ''
  });

  useEffect(() => {
    filterJobs();
  }, [searchTerm, locationFilter, range, departmentFilter, typeFilter]);

  const filterJobs = () => {
    let filtered = jobOpenings;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter && locationFilter !== 'All Locations') {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (departmentFilter !== 'All Departments') {
      filtered = filtered.filter(job => job.department === departmentFilter);
    }

    if (typeFilter !== 'All Types') {
      filtered = filtered.filter(job => job.type === typeFilter);
    }

    setFilteredJobs(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setLocationFilter('');
    setDepartmentFilter('All Departments');
    setTypeFilter('All Types');
    setRange(10);
  };

  const handleApplyJob = (jobId: number) => {
    setApplyForm({
      ...applyForm,
      jobId: jobId.toString()
    });
    alert(`Application started for Job ID: ${jobId}. Please fill the application form.`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setApplyForm({ ...applyForm, resume: file });
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!applyForm.name || !applyForm.email || !applyForm.phone || !applyForm.resume) {
      alert('Please fill all required fields and upload your resume.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applyForm.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate phone number (basic validation for Indian numbers)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(applyForm.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    // Validate file type
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileName = applyForm.resume.name.toLowerCase();
    const isValidType = allowedTypes.some(type => fileName.endsWith(type));
    
    if (!isValidType) {
      alert('Please upload a valid file type (PDF, DOC, or DOCX).');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (applyForm.resume.size > maxSize) {
      alert('File size should be less than 5MB.');
      return;
    }

    // In real implementation, this would submit to backend
    console.log('Application Data:', applyForm);
    
    alert('Application submitted successfully! We will contact you soon.');
    
    // Reset form
    setApplyForm({
      name: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: '',
      jobId: ''
    });

    // Reset file input
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-300 mb-6">
              <Building className="w-5 h-5" />
              <span className="text-sm font-medium">Careers at Infogrowth</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              We're more than a workplace. We're a family.
            </h1>
            
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
              We know that finding a meaningful and rewarding career can be a long journey. 
              Our goal is to make that process easy for you and to create a work environment 
              that's enriching—one that you'll look forward to every day.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                View Openings
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300">
                Join us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section id="openings" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Full time · {jobOpenings.length} Jobs
              </div>
              <div className="text-gray-600">
                Software Developers · Web Developers · QA Engineers · And more...
              </div>
            </div>
          </div>

{/* Hero Search Section */}
<div className="bg-gradient-to-r from-[#0b1437] to-[#0f1d4d] rounded-2xl p-8 md:p-12 shadow-xl mb-12">
  {/* Heading */}
  <h1 className="text-white text-4xl md:text-5xl font-light mb-8">
    partner for talent.
  </h1>

  {/* Search Row */}
  <div className="grid md:grid-cols-12 gap-4 items-end">
    
    {/* Job Title */}
    <div className="md:col-span-4">
      <label className="block text-sm text-gray-300 mb-2">
        search for
      </label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="job title or keyword"
        className="w-full px-4 py-4 rounded-lg bg-white text-gray-900 focus:outline-none"
      />
    </div>

    {/* Location */}
    <div className="md:col-span-4">
      <label className="block text-sm text-gray-300 mb-2">
        where?
      </label>
      <input
        type="text"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        placeholder="location or postcode"
        className="w-full px-4 py-4 rounded-lg bg-white text-gray-900 focus:outline-none"
      />
    </div>

    {/* Range */}
    <div className="md:col-span-2">
      <label className="block text-sm text-gray-300 mb-2">
        range
      </label>
      <select
        value={range}
        onChange={(e) => setRange(Number(e.target.value))}
        className="w-full px-4 py-4 rounded-lg bg-white text-gray-900 focus:outline-none"
      >
        <option value={5}>5 km</option>
        <option value={10}>10 km</option>
        <option value={25}>25 km</option>
        <option value={50}>50 km</option>
        <option value={100}>100 km</option>
      </select>
    </div>

    {/* Search Button */}
    <div className="md:col-span-2">
      <button
        onClick={filterJobs}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition"
      >
        search {filteredJobs.length} jobs
      </button>
    </div>
  </div>

  {/* Footer Row */}
  <div className="flex flex-wrap items-center justify-between mt-6 text-sm text-gray-300">
    
    {/* Use Location */}
    <button
      onClick={() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              alert(
                `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
              );
            },
            () => alert('Location access denied')
          );
        }
      }}
      className="flex items-center gap-2 hover:text-white transition"
    >
      <MapPin className="w-4 h-4" />
      use current location
    </button>

    {/* Last Search */}
    <div className="flex items-center gap-2">
      <Search className="w-4 h-4" />
      last search:
      <span className="text-blue-400 font-medium">
        1 filter
      </span>
    </div>
  </div>
</div>

          {/* Job Listings */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Job List */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => {
                      setSelectedJob(job);
                      setShowJobDetails(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${selectedJob.id === job.id ? 'border-blue-500' : 'border-transparent hover:border-blue-200'}`}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-1" />
                              {job.department}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                          </div>
                        </div>
                        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-semibold text-sm">
                          {job.type}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{job.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{job.applicants} applicants</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Posted on {new Date(job.postedDate).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyJob(job.id);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          type="button"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Jobs Found */}
              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                  <button
                    onClick={handleClearSearch}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    type="button"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Job Details Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                {showJobDetails && selectedJob && (
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h3>
                          <div className="flex items-center gap-2 text-blue-600">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-medium">{selectedJob.department}</span>
                          </div>
                        </div>
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-bold">
                          {selectedJob.type}
                        </div>
                      </div>

                      {/* Job Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Location</div>
                          <div className="flex items-center font-medium">
                            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                            {selectedJob.location}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Experience</div>
                          <div className="flex items-center font-medium">
                            <Clock className="w-4 h-4 mr-2 text-blue-600" />
                            {selectedJob.experience}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Salary</div>
                          <div className="flex items-center font-medium">
                            <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                            {selectedJob.salary}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Applicants</div>
                          <div className="flex items-center font-medium">
                            <Users className="w-4 h-4 mr-2 text-blue-600" />
                            {selectedJob.applicants}
                          </div>
                        </div>
                      </div>

                      {/* Detailed Description */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h4>
                        <p className="text-gray-700 mb-4">{selectedJob.description}</p>
                        
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Responsibilities</h4>
                        <ul className="space-y-2 mb-6">
                          {selectedJob.responsibilities.map((resp, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{resp}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h4>
                        <ul className="space-y-2 mb-6">
                          {selectedJob.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Benefits & Perks</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedJob.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center bg-blue-50 p-3 rounded-lg">
                              <Award className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-sm text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Application Form */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Apply for this Position</h4>
                        <form onSubmit={handleSubmitApplication}>
                          <div className="space-y-4 mb-6">
                            <input
                              type="text"
                              placeholder="Full Name *"
                              value={applyForm.name}
                              onChange={(e) => setApplyForm({...applyForm, name: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                            <div className="grid md:grid-cols-2 gap-4">
                              <input
                                type="email"
                                placeholder="Email Address *"
                                value={applyForm.email}
                                onChange={(e) => setApplyForm({...applyForm, email: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                              <input
                                type="tel"
                                placeholder="Phone Number *"
                                value={applyForm.phone}
                                onChange={(e) => setApplyForm({...applyForm, phone: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Resume/CV * (PDF, DOC, DOCX, max 5MB)
                              </label>
                              <input
                                id="resume-upload"
                                type="file"
                                onChange={handleFileUpload}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                accept=".pdf,.doc,.docx"
                                required
                              />
                              {applyForm.resume && (
                                <div className="mt-2 text-sm text-green-600">
                                  ✓ Selected: {applyForm.resume.name} ({(applyForm.resume.size / 1024 / 1024).toFixed(2)} MB)
                                </div>
                              )}
                            </div>
                            <textarea
                              placeholder="Cover Letter (Optional)"
                              value={applyForm.coverLetter}
                              onChange={(e) => setApplyForm({...applyForm, coverLetter: e.target.value})}
                              rows={4}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                          >
                            Submit Application
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Portal Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Can't find any job matches?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Register in Infogrowth's Candidate Portal to get notified for new positions matching your skills. 
              We're always looking for talented individuals to join our growing team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => alert('Talent pool registration feature coming soon!')}
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300"
              >
                Join Talent Pool
              </button>
              <button 
                onClick={() => alert('Job alerts subscription coming soon!')}
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300"
              >
                Subscribe to Job Alerts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join Infogrowth?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We foster an environment where innovation thrives and careers flourish
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation & Growth</h3>
              <p className="text-gray-600">
                Work with cutting-edge technologies and contribute to projects that impact millions of users worldwide.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Collaborative Culture</h3>
              <p className="text-gray-600">
                Join a diverse team of passionate professionals who support each other's growth and success.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Career Development</h3>
              <p className="text-gray-600">
                Continuous learning opportunities, mentorship programs, and clear career progression paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact HR Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Have Questions?</h3>
                <p className="mb-8">
                  Our HR team is here to help you with any questions about our recruitment process, 
                  open positions, or life at Infogrowth.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3" />
                    <span>careers@infogrowth.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3" />
                    <span>+91 80 1234 5678</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3" />
                    <span>www.infogrowth.com/careers</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Inquiry</h3>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thank you for your inquiry! We will get back to you soon.');
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}