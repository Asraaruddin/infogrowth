"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Clock,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Target,
  TrendingUp,
  Search,
  MessageSquare,
  FileText,
  Users,
  Globe,
  Shield,
  Zap,
  HeadphonesIcon,
  ChevronDown,
  Mail,
  Phone,
  ArrowUpRight,
  Tag,
  Award,
  Rocket,
  Sparkles,
  Smartphone,
  Cloud,
  PieChart,
  Target as TargetIcon,
  DollarSign,
  MousePointer,
  Hash,
  ThumbsUp,
  Building,
  ShoppingBag,
  Hotel,
  Monitor,
  Server,
  Database,
  Network,
  Lock,
  Wifi,
  HardDrive,
  Cpu,
  CloudCog,
  ShieldCheck,
  RefreshCw,
  Code,
  Terminal,
} from "lucide-react";

export default function ManagedITServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What are Managed IT Services and how can they benefit my business?",
      a: "Managed IT Services involve outsourcing your IT operations to experts who proactively monitor, manage, and maintain your technology infrastructure. This reduces downtime, improves security, and allows you to focus on core business activities while we handle the technical complexities."
    },
    {
      q: "What IT services does InfoGrowth offer?",
      a: "We provide comprehensive Managed IT Services including 24/7 Network Monitoring, Cybersecurity Solutions, Cloud Migration & Management, Data Backup & Recovery, IT Help Desk Support, Software Management, Hardware Maintenance, and Strategic IT Consulting."
    },
    {
      q: "How quickly can you respond to IT issues?",
      a: "Our average response time is under 15 minutes for critical issues, with most problems resolved within 2 hours. We offer 24/7/365 monitoring and support with guaranteed SLAs to ensure minimal disruption to your operations."
    },
    {
      q: "Can InfoGrowth help with cloud migration?",
      a: "Absolutely. We specialize in seamless cloud migration strategies, moving your infrastructure, applications, and data to secure cloud environments with minimal downtime and comprehensive post-migration support."
    },
    {
      q: "How do you ensure our data security?",
      a: "We implement multi-layered security protocols including advanced firewalls, endpoint protection, regular security audits, employee training, and compliance management. Our security solutions are updated in real-time to protect against emerging threats."
    }
  ];

  const serviceCategories = [
    {
      category: "IT Infrastructure",
      description: "Comprehensive management of your entire IT ecosystem ensuring maximum uptime, performance, and scalability for business growth.",
      image1: "/manageditsolutions.avif",
      image2: "/manageditsolutions2.avif",
      services: [
        { name: "Network Monitoring & Management", description: "24/7 proactive monitoring of your network infrastructure with predictive maintenance" },
        { name: "Server Administration", description: "Complete server management including configuration, optimization, and security hardening" },
        { name: "Hardware Lifecycle Management", description: "Strategic planning, procurement, and maintenance of all IT hardware assets" },
        { name: "Virtualization Solutions", description: "Efficient resource utilization through advanced virtualization technologies" },
      ],
      icon: <Server className="w-6 h-6" />
    },
    {
      category: "Cloud Solutions",
      description: "Seamless cloud migration and management services that enhance flexibility, collaboration, and operational efficiency.",
      image1: "/manageditsolutions3.avif",
      image2: "/manageditsolutions2.avif",
      services: [
        { name: "Cloud Migration Services", description: "Strategic planning and execution of cloud migration with zero data loss guarantee" },
        { name: "Cloud Infrastructure Management", description: "Ongoing optimization and management of cloud environments (AWS, Azure, GCP)" },
        { name: "Hybrid Cloud Solutions", description: "Integration of on-premise and cloud infrastructure for optimal performance" },
        { name: "Cloud Security & Compliance", description: "Advanced security protocols and compliance management for cloud environments" },
      ],
      icon: <CloudCog className="w-6 h-6" />
    },
    {
      category: "Cybersecurity",
      description: "Proactive protection against evolving cyber threats with enterprise-grade security solutions and continuous monitoring.",
      image1: "/manageditsolutions2.avif",
      image2: "/manageditsolutions.avif",
      services: [
        { name: "Advanced Threat Protection", description: "Multi-layered security solutions including EDR, firewalls, and threat intelligence" },
        { name: "Security Audits & Compliance", description: "Regular security assessments and compliance management (GDPR, HIPAA, PCI-DSS)" },
        { name: "Data Encryption & Protection", description: "End-to-end encryption and data loss prevention strategies" },
        { name: "Security Awareness Training", description: "Employee training programs to prevent social engineering and phishing attacks" },
      ],
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  const clients = [
    { name: "TechFlow Systems", industry: "Technology Solutions", region: "USA/UK" },
    { name: "DataSecure Inc", industry: "Data Security", region: "USA" },
    { name: "CloudMatrix", industry: "Cloud Services", region: "UK" },
    { name: "NetworkPro", industry: "Networking", region: "USA/UK" },
  ];

  const industries = [
    { icon: <Hotel className="w-6 h-6" />, name: "Healthcare", description: "HIPAA-compliant IT solutions for medical practices" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Retail", description: "PCI-DSS compliant retail IT infrastructure" },
    { icon: <Building className="w-6 h-6" />, name: "Financial Services", description: "Secure IT solutions for financial institutions" },
    { icon: <Monitor className="w-6 h-6" />, name: "Legal Firms", description: "Confidential data management for legal practices" },
  ];

  const benefits = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "Proactive IT Management",
      description: "24/7 monitoring and maintenance prevents issues before they impact your business, ensuring 99.9% uptime and optimal system performance."
    },
    {
      icon: <Tag className="w-8 h-8" />,
      title: "Predictable IT Costs",
      description: "Replace unpredictable IT expenses with a fixed monthly fee that includes all monitoring, maintenance, and support services."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Enterprise-Grade Security",
      description: "Access advanced cybersecurity measures typically only available to large corporations, protecting your business from modern threats."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Strategic IT Partnership",
      description: "Dedicated account managers and technical experts who understand your business goals and align technology accordingly."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            IT Excellence
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            Managed IT Services
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
              That Drive Business Efficiency
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto mb-12">
            Complete IT infrastructure management, cybersecurity solutions, cloud services, and 24/7 technical 
            support to keep your business running smoothly and securely.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-white text-[#05325A] px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-3">
              Get Your Free IT Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/15 hover:border-white/60 transition-all duration-300">
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                  <Rocket className="w-4 h-4 mr-2" />
                  Our Approach
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Transform Your IT Operations with Expert Management
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  At InfoGrowth, we provide comprehensive Managed IT Services that proactively monitor, maintain, 
                  and optimize your technology infrastructure. Our expert team ensures maximum uptime, enhanced 
                  security, and seamless operations so you can focus on growing your business.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  From network monitoring and cybersecurity to cloud management and strategic IT consulting, 
                  we offer end-to-end solutions tailored to your specific business needs. Our proactive approach 
                  prevents issues before they impact your operations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime Guarantee</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">Technical Support</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/manageditsolutions.avif"
                  alt="Managed IT Services Infrastructure"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 w-64 border border-gray-100">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-10 h-10 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">Security Compliance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section - Zig Zag Layout */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Complete IT Solutions
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Managed IT Services
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              End-to-end IT management solutions designed to optimize performance, enhance security, and drive business growth.
            </p>
          </div>

          {/* IT Infrastructure */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            {/* Image */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={serviceCategories[0].image1}
                alt="IT Infrastructure Management"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Server className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-blue-700">
                  IT Infrastructure
                </span>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Infrastructure Management
              </h3>

              <p className="text-gray-600 text-lg mb-10">
                24/7 monitoring and management of your entire IT ecosystem ensuring maximum uptime, performance, and scalability.
              </p>

              <div className="space-y-6">
                {serviceCategories[0].services.map((service, idx) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {service.name}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cloud Solutions */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <CloudCog className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-emerald-700">
                  Cloud Solutions
                </span>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Cloud Migration & Management
              </h3>

              <p className="text-gray-600 text-lg mb-10">
                Seamless transition to cloud environments with ongoing optimization, security, and performance management.
              </p>

              <div className="space-y-6">
                {serviceCategories[1].services.map((service, idx) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {service.name}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={serviceCategories[1].image1}
                alt="Cloud Solutions"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Cybersecurity */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={serviceCategories[2].image1}
                alt="Cybersecurity Services"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-purple-700">
                  Cybersecurity
                </span>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Advanced Cybersecurity Protection
              </h3>

              <p className="text-gray-600 text-lg mb-10">
                Proactive protection against evolving cyber threats with enterprise-grade security solutions and continuous monitoring.
              </p>

              <div className="space-y-6">
                {serviceCategories[2].services.map((service, idx) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {service.name}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#96bb57]/5 via-[#3f7ec1]/5 to-[#0A4C8A]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              <Code className="w-4 h-4 mr-2" />
              Additional Services
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Web Development & Applications
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Custom digital solutions built to enhance your online presence and business operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Web Development */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-blue-600 mb-6">
                <Code className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Web Development</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Responsive, high-performance websites built with modern frameworks and best practices
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Custom WordPress Development
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  React/Next.js Applications
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  E-commerce Solutions
                </li>
              </ul>
            </div>

            {/* Web Applications */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center text-green-600 mb-6">
                <Terminal className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Web Applications</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Custom web applications tailored to your business processes and workflow requirements
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  CRM & ERP Systems
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Business Process Automation
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  API Integration
                </li>
              </ul>
            </div>

            {/* Content Production */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 flex items-center justify-center text-purple-600 mb-6">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Content Production</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                High-quality, engaging content that resonates with your audience and drives conversions
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Strategic Content Planning
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Multimedia Content Creation
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  SEO-Optimized Writing
                </li>
              </ul>
            </div>

            {/* Rich Content Development */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-orange-600 mb-6">
                <Monitor className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rich Content Development</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Interactive and multimedia content that enhances user engagement and brand storytelling
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Interactive Infographics
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Video Production
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Animation & Motion Graphics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
              <Building className="w-4 h-4 mr-2" />
              Our Clients
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Technology Leaders
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We partner with businesses across various sectors to provide reliable IT infrastructure management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-blue-600 mb-6">
                  <Server className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{client.name}</h3>
                <p className="text-gray-600 mb-2">{client.industry}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Globe className="w-4 h-4" />
                  {client.region}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
              <Target className="w-4 h-4 mr-2" />
              Industries We Serve
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Specialized IT Solutions for Your Industry
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Industry-specific IT solutions with compliance requirements and security standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{industry.name}</h3>
                <p className="text-gray-600 leading-relaxed">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4 mr-2" />
              Why Choose InfoGrowth
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose InfoGrowth for Managed IT Services?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Selecting InfoGrowth as your IT partner gives you access to enterprise-grade technology management 
              at a fraction of the cost of an internal IT department.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-[#96bb57]/10 via-[#3f7ec1]/10 to-[#0A4C8A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white rounded-full text-sm font-semibold mb-6">
                  <Target className="w-4 h-4 mr-2" />
                  Measurable Results
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Maximize Your IT Investment with Managed Services
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our Managed IT Services help you achieve measurable business outcomes through optimized technology infrastructure:
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { metric: "Reduced IT Costs", icon: <DollarSign className="w-5 h-5" /> },
                    { metric: "Increased Productivity", icon: <TrendingUp className="w-5 h-5" /> },
                    { metric: "Enhanced Security", icon: <ShieldCheck className="w-5 h-5" /> },
                    { metric: "System Reliability", icon: <Server className="w-5 h-5" /> },
                    { metric: "Scalable Infrastructure", icon: <Cloud className="w-5 h-5" /> },
                    { metric: "Strategic IT Planning", icon: <BarChart3 className="w-5 h-5" /> },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm">
                        {item.icon}
                      </div>
                      <span className="font-medium text-gray-700">{item.metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white text-2xl font-bold mb-4 mx-auto">
                  ROI
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Increase Your Technology ROI with Expert Management!
                </h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-8">
                Our comprehensive IT services transform technology from a cost center to a strategic asset, 
                delivering measurable returns through efficiency gains, risk reduction, and business enablement.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Predictable monthly IT costs with no surprise expenses",
                  "Proactive maintenance preventing costly downtime",
                  "Scalable solutions that grow with your business",
                  "Expert guidance on technology investments"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3">
                Get Your IT Assessment
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white">
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
              Common questions about our Managed IT Services and processes
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
                      openFaq === index ? "rotate-180 text-blue-600" : "text-gray-400"
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
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Ready to Optimize?
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Contact us today for a comprehensive IT infrastructure assessment
          </h2>
          
          <p className="text-xl text-white/95 max-w-2xl mx-auto mb-12 leading-relaxed">
            Complete with detailed analysis, strategic recommendations, and a clear roadmap for IT optimization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#05325A] px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg">
              Request Free IT Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/15 hover:border-white/60 transition-all duration-300 backdrop-blur-sm">
              <Phone className="w-5 h-5 inline mr-2" />
              Call Now: (555) 123-4567
            </button>
          </div>
          
          <div className="mt-16 pt-16 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white/90">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>itservices@infogrowth.com</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center gap-3">
                <HeadphonesIcon className="w-5 h-5" />
                <span>24/7 IT Support Desk</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span>Emergency Response: 15 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}