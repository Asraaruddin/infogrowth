"use client";

import React, { useState } from 'react';
import { Rocket, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ContactFormProps {
  variant?: 'full' | 'quick'; // 'full' for contact-us page, 'quick' for home page
  title?: string;
  description?: string;
  className?: string;
}

export default function ContactForm({ 
  variant = 'full', 
  title, 
  description, 
  className = '' 
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    organization: '',
    subject: '',
    message: '',
    region: '',
    inquiry_type: '',
    privacy_agreed: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Prepare data based on form variant
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: variant === 'quick' ? formData.organization : formData.company,
        subject: variant === 'quick' 
          ? (formData.inquiry_type || 'Quick Inquiry') 
          : formData.subject,
        message: formData.message,
        region: variant === 'quick' ? formData.region : null,
        inquiry_type: variant === 'quick' ? formData.inquiry_type : null,
        privacy_agreed: variant === 'quick' ? formData.privacy_agreed : false
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        organization: '',
        subject: '',
        message: '',
        region: '',
        inquiry_type: '',
        privacy_agreed: false
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 md:p-12">
        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
            ✅ Thank you for your message! We'll get back to you within 24 hours.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email - Always shown */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Phone and Company/Organization */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {variant === 'quick' ? 'Organization *' : 'Company'}
              </label>
              <input
                type="text"
                name={variant === 'quick' ? 'organization' : 'company'}
                value={variant === 'quick' ? formData.organization : formData.company}
                onChange={handleChange}
                placeholder={variant === 'quick' ? "Enter your organization" : "Enter your company name"}
                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 transition-all duration-300"
                required={variant === 'quick'}
              />
            </div>
          </div>

          {/* Region and Inquiry Type - Only for quick variant */}
          {variant === 'quick' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Region *
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700"
                  required
                >
                  <option value="">Select Region</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia Pacific">Asia Pacific</option>
                  <option value="Middle East">Middle East</option>
                  <option value="Africa">Africa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Inquiry Type *
                </label>
                <select
                  name="inquiry_type"
                  value={formData.inquiry_type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700"
                  required
                >
                  <option value="">Select Inquiry Type</option>
                  <option value="Web Development">Web Development</option>
                  <option value="IT Consulting">IT Consulting</option>
                  <option value="Staffing Solutions">Staffing Solutions</option>
                  <option value="Cloud Services">Cloud Services</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="fintech-order-to-cash">fintech-order-to-cash</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
          )}

          {/* Subject - Only for full variant */}
          {variant === 'full' && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 transition-all duration-300"
                required
              />
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder={variant === 'quick' ? "Tell us about your project or inquiry..." : "Write your message here..."}
              className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 resize-none transition-all duration-300"
              required
            />
          </div>

          {/* Privacy Agreement - Only for quick variant */}
          {variant === 'quick' && (
            <div className="flex items-start gap-4">
              <div className="flex items-center h-6">
                <input
                  type="checkbox"
                  name="privacy_agreed"
                  checked={formData.privacy_agreed}
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  required
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                I agree to the processing of my personal data as described in the{" "}
                <Link href="/privacy-policies" className="text-blue-600 font-semibold hover:text-blue-700 underline">
                  Privacy Notice
                </Link>
                .
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  {variant === 'quick' ? 'Submit Inquiry' : 'Send Message'}
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <p className="text-gray-500 text-sm text-center mt-4">
              We'll respond within 24 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}