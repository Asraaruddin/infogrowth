"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import {
  Database,
  BarChart3,
  Users,
  Building,
  GraduationCap,
  Heart,
  Briefcase,
  Home,
  Plane,
  Target,
  CheckCircle,
  ArrowRight,
  ArrowUpRight,
  Shield,
  Zap,
  Sparkles,
  Clock,
  TrendingUp,
  Award,
  HeadphonesIcon,
  Mail,
  Phone,
  ChevronDown,
  Cpu,
  Cloud,
  PieChart,
  DollarSign,
  Search,
  FileText,
  MessageSquare,
  ThumbsUp,
  Network,
  Code2,
  Tag,
  Calendar,
  Globe,
  Server,
  Wrench,
  ArrowLeftRight,
  ShieldCheck,
  Brain,
  Handshake,
  Rocket,
  BadgeCheck,
  LineChart,
  Layers,
  Workflow,
  Settings,
  Monitor,
  Shield as ShieldIcon,
} from "lucide-react";

type ServiceItem = {
  name: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
};

type IndustryItem = {
  name: string;
  description: string;
  icon: React.ReactNode;
};

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function SapServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What makes InfoGrowth the best SAP consulting firm?",
      a: "InfoGrowth is a top SAP consulting firm due to our team of experienced SAP professionals delivering tailored solutions with a focus on customer satisfaction. Our successful track record across industries, commitment to excellence, and innovative approach make us the best choice for all SAP consulting needs."
    },
    {
      q: "How long does it typically take to implement or upgrade an SAP system?",
      a: "SAP implementation timelines vary based on complexity. Small to medium businesses typically take 3-6 months, while enterprise implementations take 6-12 months. Upgrades generally take 2-4 months depending on customization and data migration requirements."
    },
    {
      q: "How do we get started with InfoGrowth's SAP consulting services?",
      a: "Getting started is simple. Contact us for a free consultation where we'll assess your needs, provide a roadmap, and create a tailored implementation plan. We'll guide you through every step of the process."
    },
    {
      q: "What is InfoGrowth's approach to SAP consulting and project management?",
      a: "We follow a structured Agile methodology with clear milestones, regular updates, and continuous feedback. Our approach focuses on minimizing disruption while maximizing ROI through phased implementation and comprehensive testing."
    },
    {
      q: "How can SAP consulting services benefit my organization?",
      a: "SAP services can streamline operations, improve decision-making with real-time data, enhance efficiency, reduce costs, ensure compliance, and provide scalability for future growth. Typical ROI ranges from 30-50% within the first year."
    }
  ];

  const sapServices: ServiceItem[] = [
    {
      name: "SAP S/4HANA Services",
      description: "Comprehensive SAP consulting services including SAP S/4HANA, Analytics Cloud, SuccessFactors, and Ariba to help businesses assess and implement optimal technology solutions.",
      icon: <Database className="w-8 h-8" />,
      details: [
        "SAP S/4HANA implementation and migration",
        "Finance and supply chain transformation",
        "Real-time analytics and reporting",
        "Cloud and on-premise deployment",
        "Integration with existing systems",
        "Post-implementation support"
      ]
    },
    {
      name: "SAP Business One (B1)",
      description: "Complete SAP B1 solutions for small to mid-sized businesses, offering integrated business management across finance, sales, customer relationship, and operations.",
      icon: <Briefcase className="w-8 h-8" />,
      details: [
        "SAP B1 implementation and customization",
        "Financial management and accounting",
        "Sales and customer management",
        "Inventory and distribution",
        "Manufacturing and production",
        "Reporting and analytics"
      ]
    },
    {
      name: "SAP Business Technology Platform (BTP)",
      description: "Customized solutions catering to your organization's unique needs, from implementation to ongoing support, optimizing your SAP investment and achieving remarkable results.",
      icon: <Cloud className="w-8 h-8" />,
      details: [
        "Application development and integration",
        "Database and data management",
        "Analytics and business intelligence",
        "AI and machine learning capabilities",
        "Process automation",
        "Security and compliance"
      ]
    },
    {
      name: "SAP Analytics Cloud Services (SAC)",
      description: "Advanced analytics and planning solutions that provide real-time insights, predictive analytics, and collaborative enterprise planning for smarter business decisions.",
      icon: <BarChart3 className="w-8 h-8" />,
      details: [
        "Business intelligence and visualization",
        "Predictive analytics and forecasting",
        "Enterprise planning and budgeting",
        "Integrated financial planning",
        "Collaborative analytics",
        "Mobile analytics access"
      ]
    },
    {
      name: "SAP SuccessFactors Services",
      description: "Comprehensive human experience management (HXM) solutions including implementation, customization, integration, support, and optimization of your HR processes.",
      icon: <Users className="w-8 h-8" />,
      details: [
        "Core HR and payroll management",
        "Talent acquisition and onboarding",
        "Learning and development",
        "Performance and goals management",
        "Compensation and benefits",
        "Workforce analytics"
      ]
    },
    {
      name: "SAP Enterprise Portfolio and Project Management (EPPM)",
      description: "Experienced SAP consulting team offering services like implementation, customization, integration, support, and optimization, focusing on modernizing existing systems and reducing technical debt.",
      icon: <Workflow className="w-8 h-8" />,
      details: [
        "Project portfolio management",
        "Resource and capacity planning",
        "Project financial management",
        "Risk and issue management",
        "Time and expense tracking",
        "Integration with enterprise systems"
      ]
    }
  ];

  const industries: IndustryItem[] = [
    {
      name: "Education",
      description: "Helping schools and universities simplify their operations and focus on better learning with SAP.",
      icon: <GraduationCap className="w-8 h-8" />
    },
    {
      name: "Healthcare",
      description: "Making healthcare smoother and more patient-friendly with smart SAP solutions.",
      icon: <Heart className="w-8 h-8" />
    },
    {
      name: "Business",
      description: "Boosting your business with SAP tools that make work easier and decisions smarter.",
      icon: <Building className="w-8 h-8" />
    },
    {
      name: "Human Resource",
      description: "Simplifying HR tasks so you can focus on building great teams with SAP.",
      icon: <Users className="w-8 h-8" />
    },
    {
      name: "Real Estate",
      description: "Making property management and sales a breeze with SAP solutions made for real estate.",
      icon: <Home className="w-8 h-8" />
    },
    {
      name: "Travel",
      description: "Taking the hassle out of travel management with SAP tools that keep everything on track.",
      icon: <Plane className="w-8 h-8" />
    }
  ];

  const processSteps: ProcessStep[] = [
    {
      step: "01",
      title: "Requirement Analysis",
      description: "We prioritize understanding your business requirements because it is critical to the implementation's success.",
      icon: <Search className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Strategy Creation",
      description: "Our skilled consultants develop a customized, user-defined approach to ease SAP implementation with necessary inputs.",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Execution",
      description: "Incorporating business-specific features and modules into the SAP system to construct the desired application.",
      icon: <Settings className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Performance Measurement",
      description: "Testing and validating processes in the SAP system and evaluating performance metrics.",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      step: "05",
      title: "Final Optimizations",
      description: "Performing vital optimizations based on performance reports, followed by final handover of the SAP system.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      step: "06",
      title: "Ongoing Support",
      description: "Providing continuous support, updates, and enhancements to ensure optimal system performance.",
      icon: <HeadphonesIcon className="w-6 h-6" />
    }
  ];

  const whyChooseUs = [
    {
      title: "SAP Implementation",
      description: "We offer customized SAP solutions tailored to your business needs, collaborating with you to understand requirements and design solutions that suit your organization.",
      icon: <Settings className="w-8 h-8" />
    },
    {
      title: "SAP Integration Solutions",
      description: "Our team facilitates seamless integration of SAP solutions into your existing systems, minimizing disruptions to your operations.",
      icon: <Network className="w-8 h-8" />
    },
    {
      title: "SAP Customization",
      description: "We offer customized SAP solutions to meet specific business requirements, including custom reports, workflows, and interfaces.",
      icon: <Code2 className="w-8 h-8" />
    },
    {
      title: "SAP Support",
      description: "We provide continuous support to ensure smooth operation of SAP solutions, assisting in troubleshooting issues and providing timely solutions.",
      icon: <ShieldIcon className="w-8 h-8" />
    }
  ];

  const industriesWeServe = [
    { name: "Manufacturing", clients: 45 },
    { name: "Retail", clients: 60 },
    { name: "Healthcare", clients: 35 },
    { name: "Finance", clients: 40 },
    { name: "Education", clients: 25 },
    { name: "Technology", clients: 50 },
    { name: "Logistics", clients: 30 },
    { name: "Energy", clients: 20 },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8">
            <Database className="w-4 h-4 mr-2" />
            SAP Excellence
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            SAP Services
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
              Transforming Businesses with Intelligent ERP
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto mb-12">
            Comprehensive SAP consulting services including SAP S/4HANA, SAP B1, Analytics Cloud, SuccessFactors, and more to help businesses assess and implement optimal technology solutions.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-[#3f7ec1]/10 text-[#3f7ec1] rounded-full text-sm font-semibold mb-6">
                  <Target className="w-4 h-4 mr-2" />
                  SAP Business One (B1) & S/4HANA
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  SAP Services We Offer
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  At InfoGrowth, we provide comprehensive SAP consulting services to help businesses assess and implement optimal technology solutions. Our expertise spans across SAP S/4HANA, SAP Business One (B1), Analytics Cloud, SuccessFactors, and more.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're a small business looking for SAP B1 implementation or an enterprise seeking S/4HANA transformation, our team delivers tailored solutions that drive efficiency, improve decision-making, and accelerate growth.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#96bb57]/10 flex items-center justify-center text-[#96bb57]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">40%+</div>
                    <div className="text-sm text-gray-600">Average Efficiency Gain</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">110+</div>
                    <div className="text-sm text-gray-600">SAP Projects Delivered</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/sap2.jpg"
                  alt="SAP Services"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 w-64 border border-gray-100">
                <div className="flex items-center gap-3">
                  <Database className="w-10 h-10 text-[#3f7ec1]" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">SAP B1</div>
                    <div className="text-sm text-gray-600">Specialized Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAP Services Grid */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#0A4C8A]/10 text-[#0A4C8A] rounded-full text-sm font-semibold mb-6">
              <Layers className="w-4 h-4 mr-2" />
              Comprehensive Solutions
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Complete SAP Services Portfolio
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              End-to-end SAP solutions tailored to your business needs, from implementation to ongoing support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sapServices.map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                    <div className="text-sm text-[#3f7ec1] font-semibold">SAP Certified</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.details.slice(0, 4).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#96bb57] mt-0.5" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#96bb57]/10 text-[#96bb57] rounded-full text-sm font-semibold mb-6">
              <Building className="w-4 h-4 mr-2" />
              Industry Expertise
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At InfoGrowth, we deliver top-notch SAP Consulting Services across diverse industries with specialized domain expertise.
            </p>
          </div>

          {/* Industry Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {industries.map((industry, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1] mb-6 group-hover:scale-110 transition-transform">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{industry.name}</h3>
                <p className="text-gray-600 leading-relaxed">{industry.description}</p>
              </div>
            ))}
          </div>

          {/* Industries Chart */}
          <div className="bg-gradient-to-r from-[#96bb57]/5 via-[#3f7ec1]/5 to-[#0A4C8A]/5 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">SAP Implementation Across Industries</h3>
            <div className="space-y-6">
              {industriesWeServe.map((industry, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{industry.name}</span>
                    <span className="text-sm font-semibold text-[#3f7ec1]">{industry.clients} Clients</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] rounded-full"
                      style={{ width: `${Math.min(100, industry.clients)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white rounded-full text-sm font-semibold mb-6">
              <Rocket className="w-4 h-4 mr-2" />
              Our Methodology
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our SAP Service Process
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Learn more about how InfoGrowth develops, implements, and maintains your SAP solution while exceeding all industry expectations.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] flex items-center justify-center text-white text-xl font-bold">
                        {step.step}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  {index < 5 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-[#3f7ec1]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#0A4C8A]/10 text-[#0A4C8A] rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4 mr-2" />
              Why Choose InfoGrowth
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose InfoGrowth for SAP Consulting
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Selecting InfoGrowth as your SAP partner gives you access to unrivaled expertise that transforms operations and accelerates growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1] mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 pt-20 border-t border-gray-200">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/sap3.png"
                    alt="SAP Dashboard"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
              
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  SAP Implementation Excellence
                </h3>
                
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    Our SAP implementation methodology ensures successful deployment with minimal disruption. We focus on aligning SAP solutions with your business processes to maximize ROI and operational efficiency.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Project Success Rate", value: "98%" },
                      { label: "On-Time Delivery", value: "95%" },
                      { label: "Client Satisfaction", value: "4.9/5" },
                      { label: "Cost Savings Delivered", value: "30-50%" },
                    ].map((stat, index) => (
                      <div key={index} className="bg-gradient-to-br from-[#96bb57]/5 to-[#3f7ec1]/5 rounded-xl p-4">
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold mb-6">
              <HeadphonesIcon className="w-4 h-4 mr-2" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Common questions about our SAP services and implementation process
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-8">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180 text-[#3f7ec1]" : "text-gray-400"
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-[#96bb57] mt-1 flex-shrink-0" />
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </main>
  );
}