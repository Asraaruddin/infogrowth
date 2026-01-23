// components/ApplicationForm/ApplicationForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, GraduationCap, Building, 
  Briefcase, Award, X, CheckCircle, Edit, 
  Save, AlertCircle, FileText, Download
} from 'lucide-react';

interface ApplicationFormProps {
  jobId: string;
  parsedData: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  skills: string[];
  education: Array<{
    degree: string;
    university: string;
    year: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  currentCompany: string;
  graduationYear: string;
  university: string;
  branch: string;
  coverLetter: string;
  isFresher: boolean;
}

export default function ApplicationForm({ jobId, parsedData, onSubmit, onCancel }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    resume: null,
    skills: [],
    education: [],
    experience: [],
    currentCompany: '',
    graduationYear: '',
    university: '',
    branch: '',
    coverLetter: '',
    isFresher: false
  });
  const [skillInput, setSkillInput] = useState('');
  const [editing, setEditing] = useState({
    name: false,
    email: false,
    phone: false,
    skills: false,
    education: false,
    experience: false,
    currentCompany: false,
    graduationYear: false,
    university: false,
    branch: false
  });
  const [showExtractedText, setShowExtractedText] = useState(false);

  useEffect(() => {
    if (parsedData) {
      console.log('Setting parsed data:', parsedData);
      setFormData(prev => ({
        ...prev,
        name: parsedData.name || '',
        email: parsedData.email || '',
        phone: parsedData.phone || '',
        skills: parsedData.skills || [],
        education: parsedData.education || [],
        experience: parsedData.experience || [],
        currentCompany: parsedData.currentCompany || '',
        graduationYear: parsedData.graduationYear || '',
        university: parsedData.university || '',
        branch: parsedData.branch || '',
        isFresher: !parsedData.currentCompany
      }));
    }
  }, [parsedData]);

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    onSubmit(formData);
  };

  const toggleEdit = (field: keyof typeof editing) => {
    setEditing(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, field: keyof typeof editing) => {
    if (e.key === 'Enter') {
      toggleEdit(field);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Application Form</h3>
          <p className="text-gray-600 mt-1">
            Review and submit your application
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* "Check Your Details" Banner */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 mb-1">Check Your Details</h4>
            <p className="text-sm text-blue-700 mb-2">
              We've auto-filled your details from your resume. Please verify them carefully.
              You can edit any information by clicking on the edit icon (✏️).
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowExtractedText(!showExtractedText)}
                className="text-xs px-3 py-1 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50"
              >
                {showExtractedText ? 'Hide Extracted Text' : 'Show Extracted Text'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
              >
                Upload Different Resume
              </button>
            </div>
          </div>
        </div>

        {/* Extracted Text Preview */}
        {showExtractedText && parsedData?.extractedText && (
          <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700">Extracted Text Preview:</span>
              <FileText className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xs text-gray-600 max-h-32 overflow-y-auto">
              {parsedData.extractedText}
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Name Found</div>
          <div className="font-medium text-gray-900">
            {formData.name ? '✓ Yes' : '✗ No'}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Email Found</div>
          <div className="font-medium text-gray-900">
            {formData.email ? '✓ Yes' : '✗ No'}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Skills Found</div>
          <div className="font-medium text-gray-900">
            {formData.skills.length} skills
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Education Found</div>
          <div className="font-medium text-gray-900">
            {formData.education.length > 0 ? '✓ Yes' : '✗ No'}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h4>
            <span className="text-xs text-red-600">* Required fields</span>
          </div>
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                onKeyPress={(e) => handleKeyPress(e, 'name')}
                className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="Enter your full name"
              />
              <button
                type="button"
                onClick={() => toggleEdit('name')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600"
                title="Edit name"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, 'email')}
                  className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="your@email.com"
                />
                <button
                  type="button"
                  onClick={() => toggleEdit('email')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600"
                  title="Edit email"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, 'phone')}
                  className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="10-digit phone number"
                  pattern="[0-9]{10}"
                />
                <button
                  type="button"
                  onClick={() => toggleEdit('phone')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600"
                  title="Edit phone"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Skills
            <span className="ml-2 text-xs text-gray-500">
              ({formData.skills.length} skills auto-detected)
            </span>
          </h4>
          
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              placeholder="Add a skill"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border border-gray-200 rounded-lg bg-gray-50">
            {formData.skills.length > 0 ? (
              formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-2"
                >
                  <span className="text-sm text-gray-800">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm italic">
                No skills detected. Add skills manually above.
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Education
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University / College *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, 'university')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Enter your university"
                />
                <button
                  type="button"
                  onClick={() => toggleEdit('university')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graduation Year *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, 'graduationYear')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="e.g., 2023"
                />
                <button
                  type="button"
                  onClick={() => toggleEdit('graduationYear')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch / Stream *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
                onKeyPress={(e) => handleKeyPress(e, 'branch')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="e.g., Computer Science"
              />
              <button
                type="button"
                onClick={() => toggleEdit('branch')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Experience
          </h4>
          
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              id="fresher"
              checked={formData.isFresher}
              onChange={(e) => setFormData({...formData, isFresher: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="fresher" className="text-sm text-gray-700">
              I am a fresher (no work experience)
            </label>
          </div>

          {!formData.isFresher && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current / Last Company
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.currentCompany}
                  onChange={(e) => setFormData({...formData, currentCompany: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, 'currentCompany')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Leave empty if fresher"
                />
                <button
                  type="button"
                  onClick={() => toggleEdit('currentCompany')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cover Letter */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Cover Letter (Optional)
          </h4>
          
          <textarea
            value={formData.coverLetter}
            onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us why you're interested in this position and what makes you a good fit..."
          />
          <p className="text-xs text-gray-500">
            This is your chance to stand out! Share your motivation, relevant experience, and why you're excited about this role.
          </p>
        </div>

        {/* Submit Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-gray-400" />
                <span>Make sure all information is correct before submitting</span>
              </div>
              <p className="text-xs text-gray-500">
                Your application will be saved and visible to recruiters
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                <Save className="w-4 h-4" />
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}