'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Briefcase, MapPin, Clock, DollarSign, 
  Users, ChevronRight, Award, Upload, FileText,
  CheckCircle, XCircle, X, Building, Calendar,
  Globe, Mail
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

interface Job {
  id: string;
  custom_job_id: string;
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
}

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  is_required: boolean;
  validation?: {
    min?: number;
    max?: number;
  };
  display_order: number;
}

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  current_ctc: string;
  expected_ctc: string;
  notice_period: string;
  relevant_experience: string;
  total_experience: string;
  current_location: string;
  screeningAnswers: Record<string, string | number | boolean>;
  resume: File | null;
  skills: string;
  linkedin_url: string;
}

type FormErrors = Record<string, string>;

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params?.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    current_ctc: '',
    expected_ctc: '',
    notice_period: 'immediate',
    relevant_experience: '',
    total_experience: '',
    current_location: '',
    screeningAnswers: {},
    resume: null,
    skills: '',
    linkedin_url: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Notice period options
  const noticePeriodOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: '15 days', label: '15 days' },
    { value: '30 days', label: '30 days' },
    { value: '45 days', label: '45 days' },
    { value: '60 days', label: '60 days' },
    { value: '90 days', label: '90 days' }
  ];

  useEffect(() => {
    if (jobId) {
      fetchJobAndQuestions();
    }
  }, [jobId]);

  const fetchJobAndQuestions = async () => {
    try {
      setLoading(true);
      
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (jobError) throw jobError;
      setJob(jobData);

      const { data: jobQuestionsData, error: jqError } = await supabase
        .from('job_questions')
        .select(`
          question_id,
          display_order,
          is_required,
          questions (
            id,
            question_text,
            question_type,
            options,
            validation
          )
        `)
        .eq('job_id', jobId)
        .order('display_order', { ascending: true });

      if (jqError) throw jqError;

      const transformedQuestions: Question[] = (jobQuestionsData || []).map((jq: any) => ({
        id: jq.questions.id,
        question_text: jq.questions.question_text,
        question_type: jq.questions.question_type,
        options: jq.questions.options || [],
        validation: jq.questions.validation,
        is_required: jq.is_required,
        display_order: jq.display_order
      }));

      setQuestions(transformedQuestions);

    } catch (error) {
      console.error('Error fetching job and questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateLinkedInUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    return linkedinPattern.test(url);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^\d]/g, ''))) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
    }

    if (step === 2) {
      if (!formData.current_ctc.trim()) newErrors.current_ctc = 'Current CTC is required';
      if (!formData.expected_ctc.trim()) newErrors.expected_ctc = 'Expected CTC is required';
      if (!formData.relevant_experience.trim()) newErrors.relevant_experience = 'Relevant experience is required';
      if (!formData.total_experience.trim()) newErrors.total_experience = 'Total experience is required';
      if (!formData.current_location.trim()) newErrors.current_location = 'Current location is required';

      questions.forEach(question => {
        const answer = formData.screeningAnswers[question.id];
        
        if (question.is_required) {
          if (answer === undefined || answer === null || answer === '') {
            newErrors[`screening_${question.id}`] = 'This field is required';
          }
        }

        if (question.question_type === 'number' && answer !== undefined && answer !== '') {
          const numAnswer = Number(answer);
          if (question.validation) {
            if (question.validation.min !== undefined && numAnswer < question.validation.min) {
              newErrors[`screening_${question.id}`] = `Minimum value is ${question.validation.min}`;
            }
            if (question.validation.max !== undefined && numAnswer > question.validation.max) {
              newErrors[`screening_${question.id}`] = `Maximum value is ${question.validation.max}`;
            }
          }
        }
      });
    }

    if (step === 3) {
      if (!formData.resume) newErrors.resume = 'Resume is required';
      if (!formData.skills.trim()) newErrors.skills = 'Skills are required';
      if (!formData.linkedin_url.trim()) {
        newErrors.linkedin_url = 'LinkedIn profile URL is required';
      } else if (!validateLinkedInUrl(formData.linkedin_url)) {
        newErrors.linkedin_url = 'Please enter a valid LinkedIn profile URL (https://www.linkedin.com/in/username)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(applicationStep)) {
      setApplicationStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setApplicationStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileSelect = (file: File) => {
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: 'Please upload a PDF or Word document' }));
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File size should be less than 2MB' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, resume: file }));
      if (errors.resume) {
        const newErrors = { ...errors };
        delete newErrors.resume;
        setErrors(newErrors);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleScreeningAnswerChange = (questionId: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      screeningAnswers: {
        ...prev.screeningAnswers,
        [questionId]: value
      }
    }));
    
    const errorKey = `screening_${questionId}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const handleSubmitApplication = async () => {
    if (!validateStep(3) || !formData.resume || !job) {
      return;
    }

    setUploading(true);
    setSubmitStatus(null);
    
    try {
      // 1. Upload resume
      const fileExt = formData.resume.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `applications/${job.id}/${fileName}`;

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, formData.resume, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(progressInterval);
      setUploadProgress(95);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      // 2. Create application record with new status "applied"
      const { data: applicationData, error: applicationError } = await supabase
        .from('applications')
        .insert([{
          job_id: job.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          resume_url: publicUrl,
          skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
          current_ctc: formData.current_ctc,
          expected_ctc: formData.expected_ctc,
          notice_period: formData.notice_period,
          relevant_experience: formData.relevant_experience,
          total_experience: formData.total_experience,
          current_location: formData.current_location,
          linkedin_url: formData.linkedin_url,
          status: 'applied',
          is_fresher: parseInt(formData.total_experience) === 0,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (applicationError) throw applicationError;

      // 3. Save screening question answers
      if (Object.keys(formData.screeningAnswers).length > 0) {
        try {
          const answersToInsert = Object.entries(formData.screeningAnswers).map(([questionId, answer]) => {
            return {
              application_id: applicationData.id,
              question_id: questionId,
              answer_text: String(answer),
              created_at: new Date().toISOString()
            };
          });

          const { error: answersError } = await supabase
            .from('application_answers')
            .insert(answersToInsert);

          if (answersError) {
            console.log('Could not save screening answers:', answersError);
          }
        } catch (answersError) {
          console.error('Error saving answers:', answersError);
        }
      }

      // 4. Update job applicants count
      await supabase
        .from('jobs')
        .update({ applicants_count: (job.applicants_count || 0) + 1 })
        .eq('id', job.id);

      setUploadProgress(100);

      // SUCCESS
      setSubmitStatus({
        type: 'success',
        message: `Application submitted successfully! Your application ID: ${applicationData.id.substring(0, 8)}...`
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        resetForm();
      }, 3000);

    } catch (error: any) {
      console.error('Error submitting application:', error);
      setSubmitStatus({
        type: 'error',
        message: `Failed to submit application: ${error.message || 'Please try again'}`
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      current_ctc: '',
      expected_ctc: '',
      notice_period: 'immediate',
      relevant_experience: '',
      total_experience: '',
      current_location: '',
      screeningAnswers: {},
      resume: null,
      skills: '',
      linkedin_url: ''
    });
    setErrors({});
    setApplicationStep(1);
    setSubmitStatus(null);
    setShowModal(false);
  };

  const renderProgressBar = () => {
    const steps = [
      { number: 1, label: 'Personal' },
      { number: 2, label: 'Experience' },
      { number: 3, label: 'Resume' },
      { number: 4, label: 'Review' }
    ];

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  applicationStep > step.number 
                    ? 'bg-green-500 border-green-500' 
                    : applicationStep === step.number
                      ? 'bg-blue-600 border-blue-600 ring-2 ring-blue-100'
                      : 'bg-white border-gray-300'
                }`}>
                  {applicationStep > step.number ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className={`font-bold text-sm ${
                      applicationStep >= step.number ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.number}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 text-gray-600 font-medium">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-all duration-500 rounded ${
                  applicationStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderApplicationForm = () => {
    switch (applicationStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-3 py-1">
              <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
              <p className="text-xs text-gray-500">All fields are required</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="+91 XXXXX XXXXX"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.phone}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-3 py-1">
              <h3 className="text-lg font-semibold text-gray-900">Experience & Screening</h3>
              <p className="text-xs text-gray-500">All fields are required</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current CTC (₹ LPA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="current_ctc"
                    value={formData.current_ctc}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.current_ctc ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="8.5"
                  />
                  {errors.current_ctc && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.current_ctc}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected CTC (₹ LPA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="expected_ctc"
                    value={formData.expected_ctc}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.expected_ctc ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="12"
                  />
                  {errors.expected_ctc && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.expected_ctc}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notice Period <span className="text-red-500">*</span>
                </label>
                <select
                  name="notice_period"
                  value={formData.notice_period}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.notice_period ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                >
                  {noticePeriodOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.notice_period && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.notice_period}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relevant Experience (years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="relevant_experience"
                    value={formData.relevant_experience}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.relevant_experience ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="3.5"
                  />
                  {errors.relevant_experience && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.relevant_experience}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Experience (years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="total_experience"
                    value={formData.total_experience}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.total_experience ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="5"
                  />
                  {errors.total_experience && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.total_experience}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="current_location"
                  value={formData.current_location}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.current_location ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Hyderabad, India"
                />
                {errors.current_location && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.current_location}</p>}
              </div>

              {questions.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Screening Questions
                  </h4>
                  <div className="space-y-4">
                    {questions.map(question => (
                      <div key={question.id} className="bg-gray-50 rounded-md p-3 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {question.question_text}
                          {question.is_required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        
                        {question.question_type === 'text' && (
                          <input
                            type="text"
                            value={String(formData.screeningAnswers[question.id] || '')}
                            onChange={(e) => handleScreeningAnswerChange(question.id, e.target.value)}
                            className={`w-full border ${
                              errors[`screening_${question.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                            placeholder="Your answer"
                          />
                        )}

                        {question.question_type === 'number' && (
                          <div>
                            <input
                              type="number"
                              value={formData.screeningAnswers[question.id] as number || ''}
                              onChange={(e) => handleScreeningAnswerChange(question.id, e.target.value)}
                              min={question.validation?.min}
                              max={question.validation?.max}
                              className={`w-full border ${
                                errors[`screening_${question.id}`] ? 'border-red-500' : 'border-gray-300'
                              } rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                              placeholder={question.validation ? `${question.validation.min} - ${question.validation.max}` : 'Enter number'}
                            />
                            {question.validation && (
                              <p className="text-xs text-gray-500 mt-1">
                                Range: {question.validation.min} - {question.validation.max}
                              </p>
                            )}
                          </div>
                        )}

                        {question.question_type === 'textarea' && (
                          <textarea
                            value={String(formData.screeningAnswers[question.id] || '')}
                            onChange={(e) => handleScreeningAnswerChange(question.id, e.target.value)}
                            className={`w-full border ${
                              errors[`screening_${question.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                            rows={2}
                            placeholder="Your answer"
                          />
                        )}

                        {question.question_type === 'dropdown' && question.options.length > 0 && (
                          <select
                            value={String(formData.screeningAnswers[question.id] || '')}
                            onChange={(e) => handleScreeningAnswerChange(question.id, e.target.value)}
                            className={`w-full border ${
                              errors[`screening_${question.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                          >
                            <option value="">Select an option</option>
                            {question.options.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}

                        {errors[`screening_${question.id}`] && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> {errors[`screening_${question.id}`]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-3 py-1">
              <h3 className="text-lg font-semibold text-gray-900">Documents & Links</h3>
              <p className="text-xs text-gray-500">Upload your resume and add LinkedIn profile</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Resume <span className="text-red-500">*</span>
                </label>
                <div className={`border ${errors.resume ? 'border-red-500' : 'border-dashed border-gray-300'} rounded-md p-4 text-center hover:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-blue-50`}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-700 font-medium text-sm mb-1">
                      {formData.resume ? formData.resume.name : 'Click to upload resume'}
                    </p>
                    <p className="text-xs text-gray-500">PDF or Word (max 2MB)</p>
                    {formData.resume && (
                      <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded text-xs">
                        <CheckCircle className="w-3 h-3" />
                        <span className="font-medium">File selected</span>
                      </div>
                    )}
                  </label>
                </div>
                {errors.resume && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.resume}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.skills ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="React, Node.js, TypeScript, Python, etc. (comma-separated)"
                  rows={2}
                />
                {errors.skills && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.skills}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.linkedin_url ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="https://www.linkedin.com/in/yourusername"
                />
                {errors.linkedin_url && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-3 h-3" /> {errors.linkedin_url}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Must be in format: https://www.linkedin.com/in/username
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-3 py-1">
              <h3 className="text-lg font-semibold text-gray-900">Review Your Application</h3>
              <p className="text-xs text-gray-500">Please review all information before submitting</p>
            </div>
            
            {submitStatus && (
              <div className={`rounded-md p-3 ${submitStatus.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center gap-2">
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <p className={`text-sm font-medium ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                    {submitStatus.message}
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <div className="bg-white rounded-md border border-gray-200 p-3">
                <h4 className="font-medium text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Personal Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Full Name</p>
                    <p className="font-medium text-gray-900">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{formData.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-md border border-gray-200 p-3">
                <h4 className="font-medium text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  Experience
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Current CTC</p>
                    <p className="font-medium text-gray-900">₹{formData.current_ctc} LPA</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Expected CTC</p>
                    <p className="font-medium text-gray-900">₹{formData.expected_ctc} LPA</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Notice Period</p>
                    <p className="font-medium text-gray-900">{formData.notice_period}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Current Location</p>
                    <p className="font-medium text-gray-900">{formData.current_location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Relevant Experience</p>
                    <p className="font-medium text-gray-900">{formData.relevant_experience} years</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Experience</p>
                    <p className="font-medium text-gray-900">{formData.total_experience} years</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-md border border-gray-200 p-3">
                <h4 className="font-medium text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <Upload className="w-4 h-4 text-green-600" />
                  Documents
                </h4>
                <div className="space-y-1 text-sm">
                  <div>
                    <p className="text-gray-600">Resume</p>
                    <p className="font-medium text-gray-900 flex items-center gap-2">
                      <FileText className="w-3 h-3 text-green-600" />
                      {formData.resume ? formData.resume.name : 'No resume uploaded'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Skills</p>
                    <p className="font-medium text-gray-900">{formData.skills}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">LinkedIn</p>
                    <a href={formData.linkedin_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline text-sm">
                      {formData.linkedin_url}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {uploading && (
              <div className="mt-4 bg-blue-50 rounded-md p-3 border border-blue-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-blue-900">Uploading Application...</span>
                  <span className="text-xs font-bold text-blue-900">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 text-sm mb-4">The job posting you're looking for doesn't exist or has been removed.</p>
          <a href="/careers" className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
            Browse All Jobs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
              <Building className="w-3 h-3" />
              <span className="text-xs font-semibold">Job ID: {job.custom_job_id}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{job.type} • {job.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>{job.salary}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3 text-blue-200 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{job.applicants_count} applicants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Posted {new Date(job.posted_date).toLocaleDateString()}</span>
                </div>
              </div>
              {!job.is_active && (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Position Closed
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Job Description</h2>
                <p className="text-gray-600 text-sm">Learn more about this opportunity</p>
              </div>
              {job.is_active && (
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm"
                >
                  Apply Now
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">{job.description}</p>

              {job.responsibilities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Benefits & Perks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {job.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 bg-green-50 p-3 rounded-lg border border-green-200">
                        <Award className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full my-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-4 flex justify-between items-center rounded-t-xl">
              <div>
                <h2 className="text-lg font-bold">Apply for {job.title}</h2>
                <p className="text-blue-100 text-xs mt-0.5">Job ID: {job.custom_job_id}</p>
              </div>
              <button
                onClick={() => {
                  if (!uploading && !submitStatus) {
                    resetForm();
                  } else if (uploading) {
                    if (confirm('Application is uploading. Are you sure you want to cancel?')) {
                      resetForm();
                    }
                  } else {
                    resetForm();
                  }
                }}
                className="text-white hover:bg-white/20 p-1.5 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 py-5 max-h-[calc(100vh-150px)] overflow-y-auto">
              {renderProgressBar()}
              {renderApplicationForm()}

              <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                {applicationStep > 1 && applicationStep < 4 && (
                  <button
                    onClick={handlePrevStep}
                    className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    Previous
                  </button>
                )}
                
                <div className="flex gap-3 ml-auto">
                  {applicationStep < 4 && (
                    <button
                      onClick={() => resetForm()}
                      className="px-5 py-2 border border-red-300 text-red-600 rounded-md font-medium hover:bg-red-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  )}
                  
                  {applicationStep < 4 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md font-medium hover:shadow-md transition-all duration-300 flex items-center gap-2 text-sm"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : !submitStatus ? (
                    <button
                      onClick={handleSubmitApplication}
                      disabled={uploading}
                      className={`px-6 py-2 ${uploading ? 'bg-blue-400' : 'bg-gradient-to-r from-green-600 to-green-700'} text-white rounded-md font-medium hover:shadow-md transition-all duration-300 disabled:opacity-50 flex items-center gap-2 text-sm`}
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Submit Application
                        </>
                      )}
                    </button>
                  ) : submitStatus.type === 'success' ? (
                    <button
                      onClick={resetForm}
                      className="px-6 py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition-colors text-sm"
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      onClick={() => setSubmitStatus(null)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors text-sm"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
