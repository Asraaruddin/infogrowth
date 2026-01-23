"use client";

import Image from "next/image";
import { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import {
  Handshake,
  Globe,
  Users,
  Target,
  Award,
  BarChart3,
  Shield,
  HeadphonesIcon,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowUpRight,
  Network,
  ChevronRight,
  Rocket,
  Clock,
  Star,
  HeartHandshake,
  TrendingUp,
  Zap,
  Cloud,
  Code2,
  Briefcase,
  Loader2,
  Check
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";

export default function BecomePartnerPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
    country: "",
    website: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert data into Supabase
      const { data, error } = await supabase
        .from('partner_applications_infogrowth')
        .insert([
          {
            company_name: formData.companyName,
            contact_person: formData.contactPerson,
            email: formData.email,
            phone: formData.phone,
            partnership_type: formData.partnershipType,
            country: formData.country,
            website: formData.website || null,
            message: formData.message,
            status: 'pending'
          }
        ]);

      if (error) {
        throw error;
      }

      // Success
      toast.success('Application submitted successfully! We\'ll contact you within 24 hours.');
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        partnershipType: "",
        message: "",
        country: "",
        website: "",
      });

      // Show success for 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-white">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 5000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/partner.avif"
            alt="Partnership Collaboration"
            fill
            className="object-cover opacity-90"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-blue-900/30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-10 border border-white/20">
              <Handshake className="w-4 h-4 mr-3" />
              Partner With Us
            </div>
            
            <h1 className="text-4xl  text-white sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Partner With
              <span className="block mt-4">
                <span className="text-[#96bb57]">Info</span>
                <span className="text-[#3f7ec1]">Growth</span>
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-12 px-4">
              Join our global partner network to drive innovation, accelerate growth, and deliver exceptional value to enterprise clients worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
              <Target className="w-4 h-4 mr-2" />
              Why Partner With Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Accelerate Growth Together
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed px-4">
              Join forces with a trusted technology partner committed to mutual success and long-term collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Reach",
                description: "Access enterprise clients across 25+ countries through our established network."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Proven Delivery",
                description: "Join a partner with 100+ successful enterprise projects and 4.9/5 client rating."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Scalable Models",
                description: "Flexible engagement models from referral to full strategic partnerships."
              },
              {
                icon: <HeartHandshake className="w-8 h-8" />,
                title: "Long-term Focus",
                description: "Dedicated partner success teams ensuring mutual growth and collaboration."
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-6">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Partner Benefits
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Drive Value Together
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our partner program is designed to provide comprehensive support and resources that enable you to grow your business while delivering exceptional value to shared clients.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  From technical enablement to co-marketing opportunities, we invest in our partners' success with dedicated resources and shared goals.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  "Competitive revenue sharing and referral fees",
                  "Technical training and certification programs",
                  "Co-marketing funds and campaign support",
                  "Access to enterprise client opportunities",
                  "Dedicated partner support team",
                  "Joint solution development",
                  "Sales and technical enablement",
                  "Priority lead sharing and deal registration",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/becomepartner2.avif"
                  alt="Partner Benefits"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 w-56 sm:w-64 border border-gray-100">
                <div className="flex items-center gap-3">
                  <Award className="w-10 h-10 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">Partner Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold mb-6">
              <Network className="w-4 h-4 mr-2" />
              Partner Types
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Choose Your Partnership Path
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed px-4">
              Multiple partnership models designed to match your business goals and capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: <Code2 className="w-8 h-8" />,
                title: "Technology Partners",
                description: "ISVs, platform providers, and technology innovators integrating solutions.",
                features: ["Solution integration", "Joint product development", "Technical collaboration"],
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Cloud className="w-8 h-8" />,
                title: "Cloud & Infrastructure",
                description: "Cloud providers, infrastructure partners, and managed service providers.",
                features: ["Cloud migration", "Infrastructure solutions", "Managed services"],
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Briefcase className="w-8 h-8" />,
                title: "Consulting Partners",
                description: "Implementation experts, system integrators, and consulting firms.",
                features: ["Joint implementations", "Solution delivery", "Client advisory"],
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Channel Partners",
                description: "Resellers, distributors, and referral partners expanding market reach.",
                features: ["Reseller programs", "Referral networks", "Market expansion"],
                gradient: "from-orange-500 to-red-500"
              },
            ].map((type, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${type.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {type.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">{type.description}</p>
                <ul className="space-y-3">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-semibold mb-6">
              <Rocket className="w-4 h-4 mr-2" />
              Partnership Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Simple Path to Partnership
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed px-4">
              A streamlined process designed to onboard partners quickly and effectively.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  step: "1",
                  title: "Apply",
                  description: "Submit your partnership application with company details and goals.",
                  icon: <FileText className="w-8 h-8" />
                },
                {
                  step: "2",
                  title: "Evaluation",
                  description: "Our team reviews your application and schedules an introductory call.",
                  icon: <Target className="w-8 h-8" />
                },
                {
                  step: "3",
                  title: "Onboarding",
                  description: "Complete training and certification to become a certified partner.",
                  icon: <HeadphonesIcon className="w-8 h-8" />
                },
                {
                  step: "4",
                  title: "Go-to-Market",
                  description: "Launch joint initiatives and access enterprise opportunities.",
                  icon: <TrendingUp className="w-8 h-8" />
                },
              ].map((process, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-6 mx-auto">
                      {process.step}
                    </div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-blue-600 mb-6 mx-auto">
                      {process.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{process.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-blue-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/becomepartner3.avif"
                  alt="Trusted Partnership"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 w-56 sm:w-64 border border-gray-100">
                <div className="flex items-center gap-3">
                  <Star className="w-10 h-10 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">110+</div>
                    <div className="text-sm text-gray-600">Active Partners</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-semibold mb-6">
                  <Shield className="w-4 h-4 mr-2" />
                  Why Partners Trust Us
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Built on Trust & Excellence
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our commitment to partner success is reflected in our track record of delivering value, maintaining transparency, and fostering long-term relationships.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We measure our success by the success of our partners, ensuring mutual growth and shared achievements.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">10+</div>
                  <div className="text-sm font-medium text-gray-700">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">25+</div>
                  <div className="text-sm font-medium text-gray-700">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">250+</div>
                  <div className="text-sm font-medium text-gray-700">Enterprise Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
                  <div className="text-sm font-medium text-gray-700">Partner Rating</div>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  "Enterprise-grade solutions and support",
                  "Transparent revenue sharing models",
                  "Dedicated partner success managers",
                  "Regular performance reviews and growth planning",
                  "Access to training and certification programs",
                  "Joint marketing and sales enablement",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Application Form */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                  <Handshake className="w-4 h-4 mr-2" />
                  Become a Partner
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Start Your Partnership Journey
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Join our network of trusted partners and unlock new growth opportunities. Our partner success team will contact you within 24 hours to discuss partnership possibilities.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're a technology innovator, consulting firm, or channel partner, we have a place for you in our ecosystem.
                </p>
              </div>

              <div className="space-y-6 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 flex items-center justify-center text-blue-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Quick Response</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Typically respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-center text-green-600">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Dedicated Support</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Personalized onboarding and ongoing support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
                  <p className="text-gray-600 mb-8">
                    Thank you for your interest in partnering with InfoGrowth. Our team will review your application and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Partnership Type *
                      </label>
                      <select
                        name="partnershipType"
                        value={formData.partnershipType}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-sm sm:text-base"
                      >
                        <option value="">Select type</option>
                        <option value="technology">Technology Partner</option>
                        <option value="cloud">Cloud & Infrastructure</option>
                        <option value="consulting">Consulting Partner</option>
                        <option value="channel">Channel Partner</option>
                        <option value="strategic">Strategic Partner</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-sm sm:text-base"
                      >
                        <option value="">Select country</option>
                        <option value="us">United States</option>
                        <option value="in">India</option>
                        <option value="ph">Philippines</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                        <option value="uae">UAE</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-sm sm:text-base"
                      placeholder="Tell us about your company and partnership goals..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1 accent-blue-600"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      I agree to the processing of my personal data as described in the{" "}
                      <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 font-medium">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Partnership Application
                        <ArrowUpRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}