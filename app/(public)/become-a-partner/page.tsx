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
  Check,
  Sparkles,
  Building,
  Phone,
  Mail,
  MapPin
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

      toast.success('Application submitted successfully! We\'ll contact you within 24 hours.');
      setIsSubmitted(true);
      
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

      {/* Hero Section - IMPROVED */}
      <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/partner.avif"
            alt="Partnership Collaboration"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
          {/* Enhanced overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/70 lg:to-black/85"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Enhanced badge with better visibility */}
            <div className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-full text-sm font-semibold mb-8 sm:mb-10 lg:mb-12 border border-white/30 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2 text-cyan-300" />
              <span className="text-white font-medium">Partner With Us</span>
            </div>
            
            {/* Improved heading with better contrast */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-4 leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Partner With
              </h1>
              <div className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
                <span className="text-[#96bb57] font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Info</span>
                <span className="text-[#3f7ec1] font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Growth</span>
              </div>
            </div>
            
            {/* Enhanced description with better visibility */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 px-2 sm:px-4 font-light">
              Join our global partner network to drive innovation, accelerate growth, and deliver exceptional value to enterprise clients worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a
                href="#application"
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#benefits"
                className="group border-2 border-white/40 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2"></div>
          </div>
        </div>
      </section>
 {/* Why Partner With Us */}
      <section id="benefits" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <Target className="w-4 h-4 mr-2" />
              Why Partner With Us
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Accelerate Growth Together
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-2 sm:px-4">
              Join forces with a trusted technology partner committed to mutual success and long-term collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Global Reach",
                description: "Access enterprise clients across 25+ countries through our established network."
              },
              {
                icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Proven Delivery",
                description: "Join a partner with 100+ successful enterprise projects and 4.9/5 client rating."
              },
              {
                icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Scalable Models",
                description: "Flexible engagement models from referral to full strategic partnerships."
              },
              {
                icon: <HeartHandshake className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Long-term Focus",
                description: "Dedicated partner success teams ensuring mutual growth and collaboration."
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-blue-600 mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Partner Benefits
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Drive Value Together
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Our partner program is designed to provide comprehensive support and resources that enable you to grow your business while delivering exceptional value to shared clients.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  From technical enablement to co-marketing opportunities, we invest in our partners' success with dedicated resources and shared goals.
                </p>
              </div>

              <ul className="space-y-3 sm:space-y-4">
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
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                    <span className="font-medium text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative group order-first lg:order-last">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
                <Image
                  src="/becomepartner2.avif"
                  alt="Partner Benefits"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 w-44 sm:w-56 lg:w-64 border border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">4.9/5</div>
                    <div className="text-xs sm:text-sm text-gray-600">Partner Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <Network className="w-4 h-4 mr-2" />
              Partner Types
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Choose Your Partnership Path
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-2 sm:px-4">
              Multiple partnership models designed to match your business goals and capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: <Code2 className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Technology Partners",
                description: "ISVs, platform providers, and technology innovators integrating solutions.",
                features: ["Solution integration", "Joint product development", "Technical collaboration"],
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Cloud className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Cloud & Infrastructure",
                description: "Cloud providers, infrastructure partners, and managed service providers.",
                features: ["Cloud migration", "Infrastructure solutions", "Managed services"],
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Consulting Partners",
                description: "Implementation experts, system integrators, and consulting firms.",
                features: ["Joint implementations", "Solution delivery", "Client advisory"],
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Channel Partners",
                description: "Resellers, distributors, and referral partners expanding market reach.",
                features: ["Reseller programs", "Referral networks", "Market expansion"],
                gradient: "from-orange-500 to-red-500"
              },
            ].map((type, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-r ${type.gradient} flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                  {type.icon}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm lg:text-base">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <Rocket className="w-4 h-4 mr-2" />
              Partnership Process
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Simple Path to Partnership
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-2 sm:px-4">
              A streamlined process designed to onboard partners quickly and effectively.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  step: "1",
                  title: "Apply",
                  description: "Submit your partnership application with company details and goals.",
                  icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
                },
                {
                  step: "2",
                  title: "Evaluation",
                  description: "Our team reviews your application and schedules an introductory call.",
                  icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />
                },
                {
                  step: "3",
                  title: "Onboarding",
                  description: "Complete training and certification to become a certified partner.",
                  icon: <HeadphonesIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                },
                {
                  step: "4",
                  title: "Go-to-Market",
                  description: "Launch joint initiatives and access enterprise opportunities.",
                  icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
                },
              ].map((process, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 mx-auto">
                      {process.step}
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-blue-600 mb-4 sm:mb-6 mx-auto">
                      {process.icon}
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">{process.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">{process.description}</p>
                  </div>
                  {index < 3 && (
                    <>
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="lg:hidden flex items-center justify-center my-4">
                        <ArrowRight className="w-5 h-5 text-blue-500 transform rotate-90" />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <div className="relative group order-first lg:order-first">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
                <Image
                  src="/becomepartner3.avif"
                  alt="Trusted Partnership"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 w-44 sm:w-56 lg:w-64 border border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-yellow-500 flex-shrink-0" />
                  <div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">110+</div>
                    <div className="text-xs sm:text-sm text-gray-600">Active Partners</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                  <Shield className="w-4 h-4 mr-2" />
                  Why Partners Trust Us
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Built on Trust & Excellence
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Our commitment to partner success is reflected in our track record of delivering value, maintaining transparency, and fostering long-term relationships.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  We measure our success by the success of our partners, ensuring mutual growth and shared achievements.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 pt-6">
                <div className="text-center bg-gradient-to-b from-blue-50 to-white p-3 sm:p-4 rounded-xl">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1">10+</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">Years Experience</div>
                </div>
                <div className="text-center bg-gradient-to-b from-blue-50 to-white p-3 sm:p-4 rounded-xl">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1">25+</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">Countries Served</div>
                </div>
                <div className="text-center bg-gradient-to-b from-blue-50 to-white p-3 sm:p-4 rounded-xl">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1">250+</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">Enterprise Clients</div>
                </div>
                <div className="text-center bg-gradient-to-b from-blue-50 to-white p-3 sm:p-4 rounded-xl">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1">4.9/5</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">Partner Rating</div>
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4 pt-4">
                {[
                  "Enterprise-grade solutions and support",
                  "Transparent revenue sharing models",
                  "Dedicated partner success managers",
                  "Regular performance reviews and growth planning",
                  "Access to training and certification programs",
                  "Joint marketing and sales enablement",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                    <span className="font-medium text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Application Form */}
      <section id="application" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                  <Handshake className="w-4 h-4 mr-2" />
                  Become a Partner
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Start Your Partnership Journey
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Join our network of trusted partners and unlock new growth opportunities. Our partner success team will contact you within 24 hours to discuss partnership possibilities.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Whether you're a technology innovator, consulting firm, or channel partner, we have a place for you in our ecosystem.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Quick Response</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Typically respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-center text-green-600 flex-shrink-0">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Dedicated Support</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Personalized onboarding and ongoing support</p>
                  </div>
                </div>
              </div>
</div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8">
              {isSubmitted ? (
                <div className="text-center py-8 sm:py-10 lg:py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Check className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Application Submitted!</h3>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                    Thank you for your interest in partnering with InfoGrowth. Our team will review your application and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                        placeholder="+91 8247654443"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-sm sm:text-base"
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

                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Partnership Type *
                      </label>
                      <select
                        name="partnershipType"
                        value={formData.partnershipType}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-sm sm:text-base"
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
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Company Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-sm sm:text-base"
                      placeholder="Tell us about your company and partnership goals..."
                    />
                  </div>

                  <div className="flex items-start gap-2 sm:gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1 sm:mt-1.5 accent-blue-600 flex-shrink-0"
                    />
                    <label htmlFor="privacy" className="text-xs sm:text-sm text-gray-600 leading-relaxed">
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
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Partnership Application
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
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