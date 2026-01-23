'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown,
  Copy,
  Check,
  X,
  AlertCircle,
  Eye,
  Building,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  is_predefined: boolean;
  validation?: {
    min?: number;
    max?: number;
  };
}

interface JobQuestion extends Question {
  display_order: number;
  is_required: boolean;
  is_selected: boolean;
}

interface JobFormData {
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
  is_active: boolean;
}

// Predefined departments
const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'Customer Support',
  'Research & Development',
  'Quality Assurance',
  'Business Development',
  'IT',
  'Administration',
  'Legal'
];

// Indian metro cities
const LOCATIONS = [
  'Bengaluru, India',
  'Mumbai, India',
  'Delhi, India',
  'Hyderabad, India',
  'Chennai, India',
  'Pune, India',
  'Kolkata, India',
  'Ahmedabad, India',
  'Jaipur, India',
  'Lucknow, India',
  'Indore, India',
  'Bhopal, India',
  'Chandigarh, India',
  'Remote',
  'Other'
];

// Experience levels
const EXPERIENCE_LEVELS = [
  '0-1 years',
  '1-3 years',
  '3-5 years',
  '5-8 years',
  '8-10 years',
  '10+ years'
];

// Salary ranges (without ₹ symbol as requested)
const SALARY_RANGES = [
  '0-3 LPA',
  '3-6 LPA',
  '6-12 LPA',
  '12-15 LPA',
  '15-20 LPA',
  '20-30 LPA',
  '30-50 LPA',
  '50+ LPA'
];

// Most important questions for everyone
const IMPORTANT_QUESTIONS = [
  "How many years of relevant experience do you have?",
  "What is your expected salary?",
  "Are you willing to relocate for this position?",
  "When can you start?",
  "Why are you interested in this role?",
  "Do you have experience working remotely?",
  "Are you currently employed?",
  "What is your notice period?",
  "What are your key skills for this role?",
  "Do you have any certifications relevant to this position?"
];

// Prefilled content templates
const TEMPLATES = {
  responsibilities: [
    "Design, develop, test, and maintain robust and scalable software applications",
    "Lead technical design discussions and contribute to architectural decisions",
    "Write clean, efficient, and well-documented code following best practices",
    "Review code and mentor junior and mid-level developers",
    "Collaborate with product managers, designers, and QA teams to deliver features on time",
    "Troubleshoot, debug, and optimize application performance",
    "Ensure application security, data protection, and compliance standards",
    "Participate in Agile/Scrum ceremonies including sprint planning and retrospectives"
  ],
  requirements: [
    "5+ years of professional software development experience",
    "Strong proficiency in one or more languages such as JavaScript, TypeScript, Java, Python, or C#",
    "Experience with modern frameworks (React, Angular, Vue, Node.js, Spring Boot, .NET, etc.)",
    "Strong knowledge of REST APIs, databases (SQL/NoSQL), and cloud platforms (AWS, Azure, or GCP)",
    "Experience with Git, CI/CD pipelines, and version control best practices",
    "Solid understanding of software design patterns and system architecture",
    "Excellent problem-solving and communication skills",
    "Bachelor's degree in Computer Science or equivalent practical experience"
  ],
  benefits: [
    "Competitive salary and performance bonuses",
    "Health insurance for you and your family",
    "Flexible working hours and remote work options",
    "Professional development and training budget",
    "Stock options or equity",
    "Paid time off and holidays",
    "Team outings and company events",
    "Modern office with amenities"
  ]
};

export default function CreateJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<JobQuestion[]>([]);
  const [predefinedQuestions, setPredefinedQuestions] = useState<Question[]>([]);
  const [newCustomQuestion, setNewCustomQuestion] = useState({
    text: '',
    type: 'text',
    options: [''],
    is_required: true,
    min_value: '',
    max_value: ''
  });
  const [showAlert, setShowAlert] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showImportantQuestions, setShowImportantQuestions] = useState(false);
  const [reviewErrors, setReviewErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experience: '',
    salary: '',
    description: '',
    responsibilities: [''],
    requirements: [''],
    benefits: [''],
    is_active: true
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data: predefinedData } = await supabase
        .from('questions')
        .select('*')
        .eq('is_predefined', true)
        .order('created_at', { ascending: true });

      setPredefinedQuestions(predefinedData || []);
      
      // Don't auto-select any questions initially
      setQuestions([]);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleFormChange = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof JobFormData, index: number, value: string) => {
    const newArray = [...(formData[field] as string[])];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: keyof JobFormData) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayItem = (field: keyof JobFormData, index: number) => {
    const newArray = (formData[field] as string[]).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const loadTemplate = (templateKey: keyof typeof TEMPLATES) => {
    setFormData(prev => ({
      ...prev,
      [templateKey]: TEMPLATES[templateKey]
    }));
  };

  const toggleQuestionSelection = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const addPredefinedQuestion = (question: Question) => {
    // Check if question already exists
    const existingQuestion = questions.find(q => q.id === question.id);
    
    if (existingQuestion) {
      setShowAlert('This question is already added');
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    const maxOrder = Math.max(...questions.map(q => q.display_order), -1);
    
    const newQuestion: JobQuestion = {
      ...question,
      display_order: maxOrder + 1,
      is_required: true,
      is_selected: true
    };
    
    setQuestions(prev => [...prev, newQuestion]);
  };

  const addImportantQuestion = (questionText: string) => {
    // Check if question already exists
    const existingQuestion = questions.find(q => 
      q.question_text.toLowerCase() === questionText.toLowerCase()
    );
    
    if (existingQuestion) {
      setShowAlert('This question is already added');
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    const maxOrder = Math.max(...questions.map(q => q.display_order), -1);
    
    const newQuestion: JobQuestion = {
      id: `important-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question_text: questionText,
      question_type: 'text',
      options: [],
      is_predefined: true,
      display_order: maxOrder + 1,
      is_required: true,
      is_selected: true
    };

    setQuestions(prev => [...prev, newQuestion]);
  };

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    setQuestions(prev => {
      const questionIndex = prev.findIndex(q => q.id === questionId);
      if (questionIndex === -1) return prev;
      
      if (direction === 'up' && questionIndex > 0) {
        const newQuestions = [...prev];
        const temp = newQuestions[questionIndex];
        newQuestions[questionIndex] = newQuestions[questionIndex - 1];
        newQuestions[questionIndex - 1] = temp;
        
        // Update display orders
        return newQuestions.map((q, idx) => ({
          ...q,
          display_order: idx
        }));
      } else if (direction === 'down' && questionIndex < prev.length - 1) {
        const newQuestions = [...prev];
        const temp = newQuestions[questionIndex];
        newQuestions[questionIndex] = newQuestions[questionIndex + 1];
        newQuestions[questionIndex + 1] = temp;
        
        // Update display orders
        return newQuestions.map((q, idx) => ({
          ...q,
          display_order: idx
        }));
      }
      return prev;
    });
  };

  const addCustomQuestion = () => {
    if (!newCustomQuestion.text.trim()) {
      setShowAlert('Please enter a question');
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    // Check if similar question already exists
    const existingQuestion = questions.find(q => 
      q.question_text.toLowerCase() === newCustomQuestion.text.toLowerCase()
    );
    
    if (existingQuestion) {
      setShowAlert('Similar question already exists');
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    const maxOrder = Math.max(...questions.map(q => q.display_order), -1);
    
    // Prepare validation for number type
    const validation = newCustomQuestion.type === 'number' ? {
      min: newCustomQuestion.min_value ? parseInt(newCustomQuestion.min_value) : undefined,
      max: newCustomQuestion.max_value ? parseInt(newCustomQuestion.max_value) : undefined
    } : undefined;

    const newQuestion: JobQuestion = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question_text: newCustomQuestion.text,
      question_type: newCustomQuestion.type,
      options: newCustomQuestion.type === 'dropdown' ? newCustomQuestion.options.filter(o => o.trim()) : [],
      is_predefined: false,
      display_order: maxOrder + 1,
      is_required: newCustomQuestion.is_required,
      is_selected: true,
      validation
    };

    setQuestions(prev => [...prev, newQuestion]);
    setNewCustomQuestion({
      text: '',
      type: 'text',
      options: [''],
      is_required: true,
      min_value: '',
      max_value: ''
    });
  };

  const addOptionToCustomQuestion = () => {
    setNewCustomQuestion(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const updateCustomQuestionOption = (index: number, value: string) => {
    const newOptions = [...newCustomQuestion.options];
    newOptions[index] = value;
    setNewCustomQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const removeCustomQuestionOption = (index: number) => {
    setNewCustomQuestion(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const performReview = () => {
    const errors: string[] = [];

    if (!formData.title) errors.push('Job title is required');
    if (!formData.department) errors.push('Department is required');
    if (!formData.location) errors.push('Location is required');
    if (!formData.description) errors.push('Job description is required');
    
    const selectedQuestions = questions.filter(q => q.is_selected);
    if (selectedQuestions.length === 0) {
      errors.push('Please add at least one question');
    }

    setReviewErrors(errors);
    return errors.length === 0;
  };

  const handleReview = () => {
    if (performReview()) {
      setShowReviewModal(true);
    } else {
      setShowAlert(`Please fix the following errors: ${reviewErrors.join(', ')}`);
      setTimeout(() => setShowAlert(null), 5000);
    }
  };

  const handleSubmit = async () => {
    setShowReviewModal(false);
    setLoading(true);

    try {
      // 1. Create the job
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .insert([{
          title: formData.title,
          department: formData.department,
          location: formData.location,
          type: formData.type,
          experience: formData.experience,
          salary: formData.salary,
          description: formData.description,
          responsibilities: formData.responsibilities.filter(r => r.trim()),
          requirements: formData.requirements.filter(r => r.trim()),
          benefits: formData.benefits.filter(b => b.trim()),
          is_active: formData.is_active,
          applicants_count: 0
        }])
        .select()
        .single();

      if (jobError) throw jobError;

      // 2. Save custom questions that are selected and not predefined
      const customQuestionsToSave = questions
        .filter(q => !q.is_predefined && q.is_selected)
        .map(q => ({
          question_text: q.question_text,
          question_type: q.question_type,
          options: q.options,
          is_predefined: false,
          validation: q.validation
        }));

      let allQuestionIds = [...questions.filter(q => q.is_selected)];
      
      if (customQuestionsToSave.length > 0) {
        const { data: savedQuestions, error: questionsError } = await supabase
          .from('questions')
          .insert(customQuestionsToSave)
          .select();

        if (questionsError) throw questionsError;

        // Update custom questions with their new IDs from database
        allQuestionIds = questions.filter(q => q.is_selected).map(q => {
          if (q.is_predefined) return q;
          const savedQuestion = savedQuestions?.find(sq => 
            sq.question_text === q.question_text && 
            sq.question_type === q.question_type
          );
          return savedQuestion ? { ...q, id: savedQuestion.id } : q;
        });
      }

      // 3. Link questions to job
      const jobQuestions = allQuestionIds.map((q, index) => ({
        job_id: jobData.id,
        question_id: q.id,
        display_order: q.display_order,
        is_required: q.is_required
      }));

      if (jobQuestions.length > 0) {
        const { error: linkError } = await supabase
          .from('job_questions')
          .insert(jobQuestions);

        if (linkError) throw linkError;
      }

      setShowAlert('Job posted successfully!');
      setTimeout(() => {
        router.push('/recruiter/dashboard');
      }, 2000);
    } catch (error: any) {
      console.error('Error creating job:', error);
      setShowAlert(`Error: ${error.message}`);
      setTimeout(() => setShowAlert(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  // Review Modal Component
  const ReviewModal = () => {
    if (!showReviewModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Review Job Posting</h2>
            <button
              onClick={() => setShowReviewModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {/* Job Header Preview */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title || 'Job Title'}</h1>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium">{formData.department || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{formData.location || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Job Type</p>
                    <p className="font-medium">{formData.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Salary</p>
                    <p className="font-medium">{formData.salary || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {formData.description || 'No description provided'}
                </p>
              </div>
            </div>

            {/* Responsibilities */}
            {formData.responsibilities.filter(r => r.trim()).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {formData.responsibilities
                      .filter(r => r.trim())
                      .map((resp, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{resp}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Requirements */}
            {formData.requirements.filter(r => r.trim()).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {formData.requirements
                      .filter(r => r.trim())
                      .map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Benefits */}
            {formData.benefits.filter(b => b.trim()).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {formData.benefits
                      .filter(b => b.trim())
                      .map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Application Questions */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Application Questions ({questions.filter(q => q.is_selected).length})</h3>
              <div className="space-y-3">
                {questions
                  .filter(q => q.is_selected)
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-800">
                              {index + 1}. {question.question_text}
                            </span>
                            {question.is_required && (
                              <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded">
                                Required
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end gap-3">
            <button
              onClick={() => setShowReviewModal(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              Go Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Publishing...' : 'Confirm & Publish Job'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const selectedQuestions = questions
    .filter(q => q.is_selected)
    .sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Alert */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`${showAlert.includes('Error') ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'} border-l-4 p-4 rounded-r-lg shadow-lg`}>
            <div className="flex items-center">
              {showAlert.includes('Error') ? (
                <AlertCircle className="h-5 w-5 text-red-400" />
              ) : (
                <Check className="h-5 w-5 text-green-400" />
              )}
              <div className="ml-3">
                <p className={`text-sm ${showAlert.includes('Error') ? 'text-red-700' : 'text-green-700'}`}>{showAlert}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
            <p className="text-gray-600 mt-1 text-sm">Fill in job details and add custom questions</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReview}
              disabled={loading}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center gap-2 text-sm"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Publishing...' : 'Publish Job'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Job Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleFormChange('department', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => handleFormChange('location', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  >
                    <option value="">Select Location</option>
                    {LOCATIONS.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleFormChange('type', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => handleFormChange('experience', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  >
                    <option value="">Select Experience</option>
                    {EXPERIENCE_LEVELS.map((exp) => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary
                  </label>
                  <select
                    value={formData.salary}
                    onChange={(e) => handleFormChange('salary', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  >
                    <option value="">Select Salary Range</option>
                    {SALARY_RANGES.map((salary) => (
                      <option key={salary} value={salary}>{salary}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  placeholder="Describe the job role, expectations, etc."
                />
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Responsibilities</h2>
              <button
                onClick={() => loadTemplate('responsibilities')}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 border border-blue-200 rounded-lg hover:bg-blue-50"
              >
                Load Template
              </button>
            </div>
            <div className="space-y-3">
              {formData.responsibilities.map((resp, index) => (
                <div key={`resp-${index}`} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <textarea
                    value={resp}
                    onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                    rows={2}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                    placeholder="Add a responsibility"
                  />
                  {formData.responsibilities.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('responsibilities', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('responsibilities')}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Responsibility
              </button>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Requirements</h2>
              <button
                onClick={() => loadTemplate('requirements')}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 border border-blue-200 rounded-lg hover:bg-blue-50"
              >
                Load Template
              </button>
            </div>
            <div className="space-y-3">
              {formData.requirements.map((req, index) => (
                <div key={`req-${index}`} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <textarea
                    value={req}
                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                    rows={2}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                    placeholder="Add a requirement"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('requirements', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('requirements')}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Requirement
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Benefits & Perks</h2>
              <button
                onClick={() => loadTemplate('benefits')}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 border border-blue-200 rounded-lg hover:bg-blue-50"
              >
                Load Template
              </button>
            </div>
            <div className="space-y-3">
              {formData.benefits.map((benefit, index) => (
                <div key={`benefit-${index}`} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <textarea
                    value={benefit}
                    onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                    rows={2}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                    placeholder="Add a benefit"
                  />
                  {formData.benefits.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('benefits', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('benefits')}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Benefit
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Questions */}
        <div className="space-y-6">
          {/* Important Questions Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-5">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowImportantQuestions(!showImportantQuestions)}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Important Questions</h3>
                  <p className="text-xs text-gray-600">Most preferred questions for everyone</p>
                </div>
              </div>
              {showImportantQuestions ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
            
            {showImportantQuestions && (
              <div className="mt-3 space-y-2">
                {IMPORTANT_QUESTIONS.map((question, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <span className="text-xs text-gray-800">{question}</span>
                    <button
                      onClick={() => addImportantQuestion(question)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Questions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Selected Questions ({selectedQuestions.length})</h2>
                <p className="text-xs text-gray-600 mt-0.5">These questions will appear in the application form</p>
              </div>
            </div>
            
            {selectedQuestions.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-gray-400 mb-2">
                  <Users className="w-10 h-10 mx-auto" />
                </div>
                <p className="text-gray-500 text-xs">No questions selected</p>
                <p className="text-gray-400 text-xs mt-0.5">Add questions from below sections</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {selectedQuestions.map((question, index) => (
                  <div 
                    key={question.id} 
                    className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-medium text-gray-800 leading-tight">
                            {question.question_text}
                          </span>
                        </div>
                        
                        {question.options.length > 0 && (
                          <div className="mt-1.5">
                            <p className="text-xs text-gray-500 mb-0.5">Options:</p>
                            <div className="flex flex-wrap gap-0.5">
                              {question.options.map((opt, i) => (
                                <span 
                                  key={`${question.id}-opt-${i}`} 
                                  className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100"
                                >
                                  {opt}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveQuestion(question.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                          title="Move up"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveQuestion(question.id, 'down')}
                          disabled={index === selectedQuestions.length - 1}
                          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                          title="Move down"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={question.is_required}
                              onChange={() => {
                                const updatedQuestions = questions.map(q => 
                                  q.id === question.id ? { ...q, is_required: !q.is_required } : q
                                );
                                setQuestions(updatedQuestions);
                              }}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                              question.is_required 
                                ? 'bg-blue-500 border-blue-500' 
                                : 'bg-white border-gray-300'
                            }`}>
                              {question.is_required && (
                                <Check className="w-3.5 h-3.5 text-white" />
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-gray-600">
                            Required
                          </span>
                        </label>
                      </div>
                      
                      <button
                        onClick={() => toggleQuestionSelection(question.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Remove question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Custom Question */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Add Your Own Question</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Question Text
                </label>
                <input
                  type="text"
                  value={newCustomQuestion.text}
                  onChange={(e) => setNewCustomQuestion(prev => ({ ...prev, text: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                  placeholder="e.g., How much would you rate yourself in React (0-10)?"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Question Type
                </label>
                <select
                  value={newCustomQuestion.type}
                  onChange={(e) => setNewCustomQuestion(prev => ({ 
                    ...prev, 
                    type: e.target.value,
                    options: e.target.value === 'dropdown' ? [''] : []
                  }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                >
                  <option value="text">Text Input</option>
                  <option value="number">Number Input</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="textarea">Text Area</option>
                </select>
              </div>

              {newCustomQuestion.type === 'number' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Min Value
                    </label>
                    <input
                      type="number"
                      value={newCustomQuestion.min_value}
                      onChange={(e) => setNewCustomQuestion(prev => ({ ...prev, min_value: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                      placeholder="e.g., 0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Max Value
                    </label>
                    <input
                      type="number"
                      value={newCustomQuestion.max_value}
                      onChange={(e) => setNewCustomQuestion(prev => ({ ...prev, max_value: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                      placeholder="e.g., 10"
                    />
                  </div>
                </div>
              )}

              {newCustomQuestion.type === 'dropdown' && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Options
                  </label>
                  <div className="space-y-1.5">
                    {newCustomQuestion.options.map((option, index) => (
                      <div key={`option-${index}`} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateCustomQuestionOption(index, e.target.value)}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                          placeholder={`Option ${index + 1}`}
                        />
                        {newCustomQuestion.options.length > 1 && (
                          <button
                            onClick={() => removeCustomQuestionOption(index)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addOptionToCustomQuestion}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                    >
                      <Plus className="w-3 h-3" />
                      Add Option
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="is-required"
                      checked={newCustomQuestion.is_required}
                      onChange={(e) => setNewCustomQuestion(prev => ({ ...prev, is_required: e.target.checked }))}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                      newCustomQuestion.is_required 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'bg-white border-gray-300'
                    }`}>
                      {newCustomQuestion.is_required && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="ml-2 text-xs text-gray-600">
                    Required
                  </span>
                </label>
              </div>

              <button
                onClick={addCustomQuestion}
                disabled={!newCustomQuestion.text.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Question to Form
              </button>
            </div>
          </div>

          {/* Predefined Questions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Predefined Questions</h2>
                <p className="text-xs text-gray-600 mt-0.5">Quickly add common questions</p>
              </div>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {predefinedQuestions.length === 0 ? (
                <div className="text-center py-4 text-gray-500 text-xs">
                  No predefined questions available
                </div>
              ) : (
                predefinedQuestions.map((question) => {
                  const isAdded = questions.some(q => q.id === question.id);
                  return (
                    <div 
                      key={question.id} 
                      className={`p-2.5 border rounded-lg transition-all duration-200 ${
                        isAdded 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-white border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-800">{question.question_text}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                              {question.question_type}
                            </span>
                            {isAdded && (
                              <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded">
                                Added
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => addPredefinedQuestion(question)}
                          disabled={isAdded}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isAdded 
                              ? 'text-green-600 bg-green-100' 
                              : 'text-blue-600 hover:bg-blue-50'
                          }`}
                          title={isAdded ? "Already added" : "Add question"}
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal />
    </div>
  );
}