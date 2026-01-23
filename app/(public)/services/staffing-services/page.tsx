"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  Briefcase,
  Globe,
  Shield,
  HeadphonesIcon,
  ChevronDown,
  Mail,
  Phone,
  ArrowUpRight,
  Award,
  Rocket,
  Sparkles,
  Building,
  Target,
  TrendingUp,
  Zap,
  MapPin,
  Cpu,
  Database,
  Network,
  Code2,
  Cloud,
  FileText,
  MessageSquare,
  PieChart,
  ThumbsUp,
  DollarSign,
  Search,
} from "lucide-react";

export default function StaffingServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Function to handle PDF download
  const handleDownloadPdf = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = "/Staffing.pdf";
    link.download = "InfoGrowth-Staffing-Services-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const faqs = [
    {
      q: "What industries do you serve with staffing services?",
      a: "We serve a wide range of industries including IT, Healthcare, Finance, Retail, Manufacturing, Logistics, and more. Our expertise spans both technical and non-technical domains across multiple sectors."
    },
    {
      q: "What is the typical hiring timeline for staffing services?",
      a: "For immediate requirements, we can provide suitable candidates within 48-72 hours. For specialized roles, the process typically takes 1-2 weeks from requirement understanding to candidate submission."
    },
    {
      q: "Do you provide staff for both contract and permanent positions?",
      a: "Yes, we offer flexible staffing solutions including contract staffing, permanent placement, contract-to-hire, and project-based staffing to meet your specific business needs."
    },
    {
      q: "How do you ensure the quality of candidates?",
      a: "We follow a rigorous 5-step screening process including skills assessment, technical interviews, background verification, reference checks, and cultural fit evaluation to ensure top-quality candidates."
    },
    {
      q: "What regions do you currently operate in?",
      a: "We currently operate in India and UAE, with expansion plans for USA coming soon. We can support global staffing requirements through our international network."
    }
  ];

  const staffingCategories = [
    {
      category: "IT Staffing",
      description: "Access top-tier technology talent with specialized skills to drive your digital transformation and technical initiatives.",
      image: "/staff5.avif",
      positions: [
        "Software Developers & Engineers",
        "Cloud & DevOps Engineers",
        "Data Scientists & Analysts",
        "Cybersecurity Specialists",
        "IT Project Managers",
        "System Administrators",
        "UX/UI Designers",
        "Quality Assurance Engineers"
      ],
      benefits: [
        "Access to pre-vetted technical talent",
        "Industry-specific expertise",
        "Flexible engagement models",
        "24/7 technical support availability"
      ]
    },
    {
      category: "Non-IT Staffing",
      description: "Reliable and skilled professionals for your business operations, administrative, and support functions.",
      image: "/staff2.avif",
      positions: [
        "Business Analysts & Consultants",
        "Customer Service Representatives",
        "Administrative & HR Professionals",
        "Finance & Accounting Specialists",
        "Sales & Marketing Executives",
        "Operations & Logistics Managers",
        "Healthcare Professionals",
        "Education & Training Specialists"
      ],
      benefits: [
        "Domain-specific expertise",
        "Cultural fit assessment",
        "Quick turnaround time",
        "Scalable workforce solutions"
      ]
    }
  ];

  const regions = [
    {
      name: "UAE",
      status: "Active",
      icon: <Building className="w-6 h-6" />,
      color: "text-[#96bb57]",
      bgColor: "bg-[#96bb57]/10",
      clients: ["Leading Retail Chains", "Hospitality Groups", "Financial Institutions", "Technology Companies"],
      focus: "Hospitality, Retail, Finance, Technology"
    },
    {
      name: "India",
      status: "Active",
      icon: <Globe className="w-6 h-6" />,
      color: "text-[#3f7ec1]",
      bgColor: "bg-[#3f7ec1]/10",
      clients: ["IT Services Companies", "Manufacturing Units", "BPO/KPO Centers", "Healthcare Organizations"],
      focus: "IT Services, Manufacturing, Healthcare, BPO/KPO"
    },
    {
      name: "USA",
      status: "Coming Soon",
      icon: <Rocket className="w-6 h-6" />,
      color: "text-[#0A4C8A]",
      bgColor: "bg-[#0A4C8A]/10",
      clients: ["Technology Startups", "Financial Services", "Healthcare Providers", "Retail Chains"],
      focus: "Technology, Finance, Healthcare, Retail"
    }
  ];

  const clientsByIndustry = [
    {
      industry: "Technology",
      count: "50+",
      icon: <Code2 className="w-6 h-6" />,
      examples: ["Software Companies", "IT Services", "Tech Startups", "Digital Agencies"]
    },
    {
      industry: "Healthcare",
      count: "30+",
      icon: <Shield className="w-6 h-6" />,
      examples: ["Hospitals", "Clinics", "Pharmaceuticals", "Medical Devices"]
    },
    {
      industry: "Finance",
      count: "25+",
      icon: <DollarSign className="w-6 h-6" />,
      examples: ["Banks", "Insurance Companies", "Financial Services", "Investment Firms"]
    },
    {
      industry: "Retail",
      count: "40+",
      icon: <ShoppingBag className="w-6 h-6" />,
      examples: ["E-commerce", "Department Stores", "Specialty Retail", "Supermarkets"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Requirement Analysis",
      description: "We conduct detailed consultations to understand your specific staffing needs, team culture, and project requirements.",
      icon: <Search className="w-6 h-6" />
    },
    {
      step: "2",
      title: "Candidate Sourcing",
      description: "Leveraging our extensive talent network and advanced sourcing strategies to identify the best-fit candidates.",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "3",
      title: "Screening & Assessment",
      description: "Rigorous technical assessments, interviews, and background checks to ensure candidate quality and fit.",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: "4",
      title: "Client Interviews",
      description: "Facilitating seamless interview processes between shortlisted candidates and your hiring team.",
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      step: "5",
      title: "Onboarding Support",
      description: "Assisting with offer negotiation, onboarding processes, and ensuring smooth transition into your team.",
      icon: <ThumbsUp className="w-6 h-6" />
    },
    {
      step: "6",
      title: "Post-placement Support",
      description: "Continuous support during probation period and regular check-ins to ensure satisfaction.",
      icon: <HeadphonesIcon className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Rapid Deployment",
      description: "Quick turnaround time with most positions filled within 2 weeks, reducing your time-to-hire significantly."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Stringent 5-level screening process ensuring only top-quality candidates reach your interview panel."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost Effective",
      description: "Optimize your staffing costs with flexible models and transparent pricing without compromising on quality."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Talent Pool",
      description: "Access to a diverse talent pool across multiple regions with localized expertise and cultural understanding."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8">
            <Users className="w-4 h-4 mr-2" />
            Talent Solutions
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            Staffing Services
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
              That Scale With You
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto mb-12">
            Comprehensive IT and Non-IT staffing solutions connecting businesses with top-tier talent across India, UAE, and USA (coming soon).
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Updated: "Get Staffing Support" button now navigates to /contact-us */}
            <Link
              href="/contact-us"
              className="group bg-white text-[#05325A] px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              Get Staffing Support
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* Updated: "Download Staffing Brochure" button now triggers PDF download */}
            <button
              onClick={handleDownloadPdf}
              className="bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/15 hover:border-white/60 transition-all duration-300"
            >
              Download Staffing Brochure
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
                <div className="inline-flex items-center justify-center px-4 py-2 bg-[#3f7ec1]/10 text-[#3f7ec1] rounded-full text-sm font-semibold mb-6">
                  <Target className="w-4 h-4 mr-2" />
                  Our Expertise
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Connecting Talent with Opportunity
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  InfoGrowth Staffing Services specializes in delivering comprehensive workforce solutions that bridge the gap between exceptional talent and forward-thinking organizations. With our deep understanding of both technical and non-technical domains, we provide staffing solutions that drive business growth and operational excellence.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our extensive network and rigorous screening processes ensure that we deliver candidates who not only meet the technical requirements but also align with your organizational culture and long-term objectives.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#96bb57]/10 flex items-center justify-center text-[#96bb57]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">85%</div>
                    <div className="text-sm text-gray-600">Placement Success Rate</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">14 Days</div>
                    <div className="text-sm text-gray-600">Average Time-to-Fill</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/wearehiring.png"
                  alt="Staffing Services Team"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 w-64 border border-gray-100">
                <div className="flex items-center gap-3">
                  <Users className="w-10 h-10 text-[#3f7ec1]" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Active Placements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IT & Non-IT Staffing */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#0A4C8A]/10 text-[#0A4C8A] rounded-full text-sm font-semibold mb-6">
              <Users className="w-4 h-4 mr-2" />
              Our Staffing Categories
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              IT & Non-IT Staffing Solutions
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Comprehensive staffing services covering both technical and business domain expertise
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
            {staffingCategories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Image Header */}
                <div className="relative h-56">
                  <Image
                    src={category.image}
                    alt={category.category}
                    fill
                    className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* STRONG OVERLAY for readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20"></div>

                  {/* Category Badge */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                          {category.category}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Specialized Staffing Solutions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 text-lg leading-relaxed mb-10">
                    {category.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-8">
                    {/* Positions */}
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-4">
                        Key Positions
                      </h4>
                      <ul className="space-y-3">
                        {category.positions.slice(0, 4).map((position, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 text-[#96bb57] mt-0.5" />
                            <span>{position}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-4">
                        Benefits
                      </h4>
                      <ul className="space-y-3">
                        {category.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 text-[#3f7ec1] mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Global Presence */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#0A4C8A]/10 text-[#0A4C8A] rounded-full text-sm font-semibold mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Our Global Reach
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Serving Clients Across Regions
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Strategic presence in key markets with plans for expansion into USA
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {regions.map((region, index) => (
              <div key={index} className={`group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${region.status === 'Coming Soon' ? 'opacity-90' : ''}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${region.bgColor} flex items-center justify-center ${region.color}`}>
                    {region.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${region.status === 'Active' ? 'bg-[#96bb57]/10 text-[#96bb57]' : 'bg-[#0A4C8A]/10 text-[#0A4C8A]'}`}>
                    {region.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{region.name}</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Key Clients</h4>
                    <ul className="space-y-1">
                      {region.clients.map((client, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <Building className="w-4 h-4" />
                          {client}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Industry Focus</h4>
                    <p className="text-sm text-gray-600">{region.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients by Industry */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#96bb57]/10 text-[#96bb57] rounded-full text-sm font-semibold mb-6">
              <Building className="w-4 h-4 mr-2" />
              Industry Expertise
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Serving diverse industries with specialized staffing solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {clientsByIndustry.map((industry, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3f7ec1]/10 to-[#0A4C8A]/10 flex items-center justify-center text-[#3f7ec1] mb-6 group-hover:scale-110 transition-transform">
                  {industry.icon}
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <div className="text-3xl font-bold text-gray-900">{industry.count}</div>
                  <div className="text-sm text-gray-500">Clients</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{industry.industry}</h3>
                <ul className="space-y-2">
                  {industry.examples.map((example, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3f7ec1]"></div>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Our Process */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#3f7ec1]/10 text-[#3f7ec1] rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Streamlined Hiring Process
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A systematic approach to ensure quality talent acquisition
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] flex items-center justify-center text-white text-xl font-bold">
                        {step.step}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3f7ec1]/10 to-[#0A4C8A]/10 flex items-center justify-center text-[#3f7ec1]">
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
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#96bb57]/10 text-[#96bb57] rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Partner with InfoGrowth Staffing?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Comprehensive staffing solutions that deliver measurable business impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3f7ec1]/10 to-[#0A4C8A]/10 flex items-center justify-center text-[#3f7ec1] mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-20 border-t border-gray-200">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Comprehensive Staffing Solutions Tailored to Your Needs
                </h3>
                
                <div className="space-y-4">
                  {[
                    "End-to-end recruitment process outsourcing (RPO)",
                    "Project-based staffing for short-term requirements",
                    "Managed staffing services with dedicated account managers",
                    "Talent acquisition consulting and optimization",
                    "Workforce planning and strategy development",
                    "Compliance and legal support for international hiring"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#96bb57] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] flex items-center justify-center text-white mb-6">
                  <Users className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Ready to Scale Your Team?
                </h4>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Whether you need IT specialists, business professionals, or specialized talent, our staffing solutions are designed to help you build high-performing teams that drive business success.
                </p>
              </div>
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
              Common questions about our staffing services and processes
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