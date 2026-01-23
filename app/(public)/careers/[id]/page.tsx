'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Briefcase, MapPin, Clock, DollarSign, 
  Users, ChevronRight, Award, Upload, FileText,
  CheckCircle, XCircle, X
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
}

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  is_required: boolean;
}

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  skills: string;
  university: string;
  graduationYear: string;
  branch: string;
  isFresher: boolean;
  currentCompany: string;
  currentCtc: string;
  expectedCtc: string;
  noticePeriod: string;
  locationPreference: string;
  postgresExperience: string;
  nextjsExperience: string;
  coverLetter: string;
  resume: File | null;
  customAnswers: Record<string, string>;
}

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    skills: '',
    university: '',
    graduationYear: '',
    branch: '',
    isFresher: true,
    currentCompany: '',
    currentCtc: '',
    expectedCtc: '',
    noticePeriod: '',
    locationPreference: '',
    postgresExperience: '',
    nextjsExperience: '',
    coverLetter: '',
    resume: null,
    customAnswers: {}
  });
  const [errors, setErrors] = useState<Partial<ApplicationFormData & Record<string, string>>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchJobAndQuestions();
    }
  }, [params.id]);

  const fetchJobAndQuestions = async () => {
    try {
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', params.id)
        .single();

      if (jobError) throw jobError;
      setJob(jobData);

      const { data: questionData, error: questionError } = await supabase
        .from('job_questions')
        .select(`
          display_order,
          is_required,
          questions (
            id,
            question_text,
            question_type,
            options
          )
        `)
        .eq('job_id', params.id)
        .order('display_order', { ascending: true });

      if (questionError) throw questionError;

      const formattedQuestions = (questionData || []).map(q => ({
        id: q.questions.id,
        question_text: q.questions.question_text,
        question_type: q.questions.question_type,
        options: q.questions.options || [],
        is_required: q.is_required
      }));

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error fetching job and questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<ApplicationFormData & Record<string, string>> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.resume) newErrors.resume = 'Resume is required';
    }

    if (step === 2) {
      if (!formData.skills.trim()) newErrors.skills = 'Skills are required';
      if (!formData.university.trim()) newErrors.university = 'University is required';
      if (!formData.graduationYear.trim()) newErrors.graduationYear = 'Graduation year is required';
      if (!formData.branch.trim()) newErrors.branch = 'Branch is required';
      if (!formData.isFresher && !formData.currentCompany.trim()) {
        newErrors.currentCompany = 'Current company is required';
      }
    }

    if (step === 3) {
      if (!formData.currentCtc.trim()) newErrors.currentCtc = 'Current CTC is required';
      if (!formData.expectedCtc.trim()) newErrors.expectedCtc = 'Expected CTC is required';
      if (!formData.noticePeriod.trim()) newErrors.noticePeriod = 'Notice period is required';
      
      questions.forEach(question => {
        if (question.is_required && !formData.customAnswers[question.id]?.trim()) {
          newErrors[`question_${question.id}`] = 'This question is required';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(applicationStep)) {
      setApplicationStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setApplicationStep(prev => prev - 1);
  };

  const handleFileSelect = (file: File) => {
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    if (errors[name as keyof ApplicationFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCustomQuestionChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      customAnswers: {
        ...prev.customAnswers,
        [questionId]: value
      }
    }));
    if (errors[`question_${questionId}`]) {
      setErrors(prev => ({ ...prev, [`question_${questionId}`]: undefined }));
    }
  };

  const handleSubmitApplication = async () => {
    if (!validateStep(3) || !formData.resume) {
      alert('Please fill all required fields and upload resume');
      return;
    }

    setUploading(true);
    try {
      const fileExt = formData.resume.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, formData.resume, {
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setUploadProgress(percent);
          }
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      const { data: applicationData, error: insertError } = await supabase
        .from('applications')
        .insert([{
          job_id: params.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          skills: formData.skills.split(',').map(s => s.trim()),
          university: formData.university,
          graduation_year: parseInt(formData.graduationYear),
          branch: formData.branch,
          is_fresher: formData.isFresher,
          current_company: formData.isFresher ? null : formData.currentCompany,
          current_ctc: formData.currentCtc,
          expected_ctc: formData.expectedCtc,
          notice_period: formData.noticePeriod,
          cover_letter: formData.coverLetter,
          resume_url: urlData.publicUrl,
          status: 'pending'
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      if (Object.keys(formData.customAnswers).length > 0) {
        const answers = Object.entries(formData.customAnswers).map(([questionId, answer]) => ({
          application_id: applicationData.id,
          question_id: questionId,
          answer: answer
        }));

        const { error: answersError } = await supabase
          .from('application_answers')
          .insert(answers);

        if (answersError) throw answersError;
      }

      await supabase
        .from('jobs')
        .update({ applicants_count: (job?.applicants_count || 0) + 1 })
        .eq('id', params.id);

      alert('✅ Application submitted successfully! We will get back to you soon.');
      resetForm();
      
    } catch (error: any) {
      console.error('Error submitting application:', error);
      alert(`Failed to submit application: ${error.message}`);
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
      skills: '',
      university: '',
      graduationYear: '',
      branch: '',
      isFresher: true,
      currentCompany: '',
      currentCtc: '',
      expectedCtc: '',
      noticePeriod: '',
      locationPreference: '',
      postgresExperience: '',
      nextjsExperience: '',
      coverLetter: '',
      resume: null,
      customAnswers: {}
    });
    setApplicationStep(1);
    setShowModal(false);
    fetchJobAndQuestions();
  };

  const renderProgressBar = () => {
    const steps = [
      { number: 1, label: 'Personal' },
      { number: 2, label: 'Education' },
      { number: 3, label: 'Details' },
      { number: 4, label: 'Review' }
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  applicationStep > step.number 
                    ? 'bg-blue-600 border-blue-600' 
                    : applicationStep === step.number
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-white border-gray-300'
                }`}>
                  {applicationStep > step.number ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <span className={`font-semibold ${
                      applicationStep >= step.number ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.number}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-2 text-gray-600 font-medium">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all ${
                  applicationStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
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
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Personal Details & Resume</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">
                      {formData.resume ? formData.resume.name : 'Click to upload resume'}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">PDF or Word (max 5MB)</p>
                  </label>
                </div>
                {errors.resume && <p className="text-red-500 text-sm mt-2">{errors.resume}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="+91 XXXXX XXXXX"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Education & Experience</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Skills *</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.skills ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="React, Node.js, TypeScript, etc."
                  rows={3}
                />
                {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">University/College *</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.university ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Your university name"
                />
                {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.graduationYear ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="2023"
                  />
                  {errors.graduationYear && <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch *</label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.branch ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Computer Science"
                  />
                  {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                </div>
              </div>

              <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                <input
                  type="checkbox"
                  id="isFresher"
                  name="isFresher"
                  checked={formData.isFresher}
                  onChange={(e) => setFormData(prev => ({ ...prev, isFresher: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="isFresher" className="ml-3 text-gray-700 font-medium">
                  I am a fresher
                </label>
              </div>

              {!formData.isFresher && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Company *</label>
                  <input
                    type="text"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.currentCompany ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Your current company"
                  />
                  {errors.currentCompany && <p className="text-red-500 text-sm mt-1">{errors.currentCompany}</p>}
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Job Specific Details</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current CTC (₹ LPA) *</label>
                  <input
                    type="text"
                    name="currentCtc"
                    value={formData.currentCtc}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.currentCtc ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="8.5"
                  />
                  {errors.currentCtc && <p className="text-red-500 text-sm mt-1">{errors.currentCtc}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected CTC (₹ LPA) *</label>
                  <input
                    type="text"
                    name="expectedCtc"
                    value={formData.expectedCtc}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.expectedCtc ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="12"
                  />
                  {errors.expectedCtc && <p className="text-red-500 text-sm mt-1">{errors.expectedCtc}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period (days) *</label>
                <input
                  type="number"
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.noticePeriod ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="30"
                />
                {errors.noticePeriod && <p className="text-red-500 text-sm mt-1">{errors.noticePeriod}</p>}
              </div>

              {questions.length > 0 && (
                <div className="pt-4 border-t">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Questions</h4>
                  <div className="space-y-4">
                    {questions.map(question => (
                      <div key={question.id} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {question.question_text}
                          {question.is_required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        
                        {question.question_type === 'text' && (
                          <input
                            type="text"
                            value={formData.customAnswers[question.id] || ''}
                            onChange={(e) => handleCustomQuestionChange(question.id, e.target.value)}
                            className={`w-full border ${
                              errors[`question_${question.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="Your answer"
                          />
                        )}

                        {question.question_type === 'textarea' && (
                          <textarea
                            value={formData.customAnswers[question.id] || ''}
                            onChange={(e) => handleCustomQuestionChange(question.id, e.target.value)}
                            className={`w-full border ${
                              errors[`question_${question.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            rows={3}
                            placeholder="Your answer"
                          />
                        )}

                        {question.question_type === 'dropdown' && question.options.length > 0 && (
                          <select
                            value={formData.customAnswers[question.id] || ''}
                            onChange={(e) => handleCustomQuestionChange(question.id, e.target.value)}
                            className={`w-full border ${
                              errors[`question_${question.id}`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          >
                            <option value="">Select an option</option>
                            {question.options.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}

                        {errors[`question_${question.id}`] && (
                          <p className="text-red-500 text-sm">{errors[`question_${question.id}`]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter (Optional)</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us why you're a great fit..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Review & Submit</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Personal Details</h4>
                <p className="text-gray-700">{formData.name}</p>
                <p className="text-gray-600 text-sm">{formData.email}</p>
                <p className="text-gray-600 text-sm">{formData.phone}</p>
                <p className="text-gray-600 text-sm mt-2">📄 {formData.resume?.name}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                <p className="text-gray-700">{formData.university}</p>
                <p className="text-gray-600 text-sm">{formData.branch} • Class of {formData.graduationYear}</p>
                <p className="text-gray-600 text-sm">Skills: {formData.skills}</p>
                {!formData.isFresher && (
                  <p className="text-gray-600 text-sm mt-2">Current: {formData.currentCompany}</p>
                )}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Compensation</h4>
                <p className="text-gray-600 text-sm">Current CTC: ₹{formData.currentCtc} LPA</p>
                <p className="text-gray-600 text-sm">Expected CTC: ₹{formData.expectedCtc} LPA</p>
                <p className="text-gray-600 text-sm">Notice Period: {formData.noticePeriod} days</p>
              </div>

              {questions.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Additional Responses</h4>
                  <div className="space-y-2">
                    {questions.map(question => (
                      <div key={question.id}>
                        <p className="text-sm font-medium text-gray-700">{question.question_text}</p>
                        <p className="text-gray-600 text-sm">
                          {formData.customAnswers[question.id] || 'Not answered'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {uploading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Uploading resume... {Math.round(uploadProgress)}%</p>
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
          <p className="text-gray-600">The job you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Job Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                {job.department}
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {job.experience}
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                {job.salary}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-blue-200">
                {job.applicants_count} applicants
              </div>
              <div className="text-blue-200">
                Posted on {new Date(job.posted_date).toLocaleDateString()}
              </div>
              {!job.is_active && (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  Position Closed
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
                </div>
                {job.is_active && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                  >
                    Apply Now
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              <p className="text-gray-700 mb-8 whitespace-pre-line">{job.description}</p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Responsibilities</h3>
              <ul className="space-y-3 mb-8">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{resp}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
              <ul className="space-y-3 mb-8">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits & Perks</h3>
              <div className="grid grid-cols-2 gap-4">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center bg-blue-50 p-4 rounded-lg">
                    <Award className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to close? Your progress will be lost.')) {
                    resetForm();
                  }
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 py-6">
              {renderProgressBar()}
              {renderApplicationForm()}

              <div className="flex justify-between mt-8 pt-6 border-t">
                {applicationStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                <div className="flex gap-4 ml-auto">
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel? Your progress will be lost.')) {
                        resetForm();
                      }
                    }}
                    className="px-6 py-3 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  {applicationStep < 4 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      Next Step
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitApplication}
                      disabled={uploading}
                      className={`px-8 py-3 ${uploading ? 'bg-blue-400' : 'bg-green-600'} text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2`}
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Submit Application
                        </>
                      )}
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