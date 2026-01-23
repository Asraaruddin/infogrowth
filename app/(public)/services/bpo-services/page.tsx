"use client";

import Image from "next/image";
import { useState, ReactElement } from "react";
import {
  Phone,
  MessageSquare,
  Mail,
  Users,
  HeadphonesIcon,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowUpRight,
  Shield,
  Zap,
  Sparkles,
  Building,
  ShoppingBag,
  Hotel,
  Monitor,
  Target,
  TrendingUp,
  BarChart3,
  Globe,
  Award,
  Rocket,
  ChevronDown,
  FileText,
  Smartphone,
  Cloud,
  PieChart,
  DollarSign,
  Search,
  ThumbsUp,
  Cpu,
  Database,
  Network,
  Code2,
  Tag,
  Calendar,
} from "lucide-react";

type ServiceItem = {
  name: string;
  description: string;
  icon: ReactElement;
};

type BpoServiceType = {
  title: string;
  description: string;
  image: string;
  services: ServiceItem[];
};

type BpoServices = {
  voice: BpoServiceType;
  nonVoice: BpoServiceType;
};

export default function BpoServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeService, setActiveService] = useState<"voice" | "nonVoice">("voice");

  const faqs = [
    {
      q: "What BPO services do you offer?",
      a: "We offer comprehensive BPO services including inbound/outbound call center services, customer support, technical support, back-office processing, data entry, email support, live chat support, and specialized services for various industries including healthcare, e-commerce, and finance."
    },
    {
      q: "What industries do you serve with BPO services?",
      a: "We serve multiple industries including Healthcare, E-commerce, Retail, Finance & Banking, Technology, Travel & Hospitality, Insurance, Telecommunications, and Education with specialized solutions for each sector."
    },
    {
      q: "What is your typical turnaround time for BPO projects?",
      a: "We can deploy a dedicated team within 2-3 weeks. For urgent requirements, we can provide immediate support through our shared services model within 48-72 hours."
    },
    {
      q: "How do you ensure quality in BPO services?",
      a: "We implement a 7-layer quality assurance process including agent training, call monitoring, performance metrics tracking, customer satisfaction surveys, regular audits, and continuous improvement programs to ensure exceptional service quality."
    },
    {
      q: "Do you offer 24/7 support services?",
      a: "Yes, we provide round-the-clock support services with dedicated teams for different time zones. Our operations centers in India and UAE ensure 24/7 coverage for global clients."
    }
  ];

  const bpoServices: BpoServices = {
    voice: {
      title: "Voice Services",
      description: "Professional call center solutions with native English proficiency for superior customer interactions.",
      image: "/bpo.png",
      services: [
        {
          name: "Inbound Call Center",
          description: "Handle customer inquiries, orders, support requests with trained professionals",
          icon: <Phone className="w-6 h-6" />
        },
        {
          name: "Outbound Call Center",
          description: "Sales, telemarketing, surveys, and lead generation campaigns",
          icon: <Users className="w-6 h-6" />
        },
        {
          name: "Customer Support",
          description: "24/7 customer service, complaint resolution, and relationship management",
          icon: <HeadphonesIcon className="w-6 h-6" />
        },
        {
          name: "Sales & Telemarketing",
          description: "Professional sales teams for appointment setting and revenue generation",
          icon: <TrendingUp className="w-6 h-6" />
        },
        {
          name: "Technical Support",
          description: "Tier 1-3 technical assistance for software and hardware issues",
          icon: <Cpu className="w-6 h-6" />
        },
        {
          name: "Appointment Setting",
          description: "Professional scheduling and calendar management services",
          icon: <Calendar className="w-6 h-6" />
        }
      ]
    },
    nonVoice: {
      title: "Non-Voice Services",
      description: "Comprehensive back-office and digital support solutions for operational excellence.",
      image: "/bpo2.png",
      services: [
        {
          name: "Email Support",
          description: "Professional email management and customer response services",
          icon: <Mail className="w-6 h-6" />
        },
        {
          name: "Live Chat Support",
          description: "Real-time customer engagement through chat interfaces",
          icon: <MessageSquare className="w-6 h-6" />
        },
        {
          name: "Data Entry & Processing",
          description: "Accurate data management and processing services",
          icon: <Database className="w-6 h-6" />
        },
        {
          name: "Back Office Operations",
          description: "Document processing, accounting, and administrative support",
          icon: <FileText className="w-6 h-6" />
        },
        {
          name: "Social Media Management",
          description: "Customer engagement and support across social platforms",
          icon: <ThumbsUp className="w-6 h-6" />
        },
        {
          name: "Content Moderation",
          description: "Platform monitoring and content management services",
          icon: <Shield className="w-6 h-6" />
        }
      ]
    }
  };

  const industries = [
    {
      name: "Healthcare",
      description: "Medical billing, patient support, appointment scheduling",
      clients: 35,
      icon: <Shield className="w-6 h-6" />
    },
    {
      name: "E-commerce",
      description: "Order processing, customer support, returns management",
      clients: 45,
      icon: <ShoppingBag className="w-6 h-6" />
    },
    {
      name: "Finance & Banking",
      description: "Customer service, loan processing, fraud monitoring",
      clients: 30,
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      name: "Travel & Hospitality",
      description: "Reservation management, customer support, booking assistance",
      clients: 25,
      icon: <Hotel className="w-6 h-6" />
    },
    {
      name: "Technology",
      description: "Technical support, software troubleshooting, customer onboarding",
      clients: 40,
      icon: <Monitor className="w-6 h-6" />
    },
    {
      name: "Retail",
      description: "Customer service, inventory support, order management",
      clients: 50,
      icon: <Tag className="w-6 h-6" />
    }
  ];

  const specializations = [
    {
      category: "Rentals",
      description: "Temporary staffing solutions for seasonal peaks and special projects",
      features: [
        "Flexible contract terms",
        "Quick deployment",
        "Cost-effective solutions",
        "Scalable team sizes"
      ],
      icon: <Users className="w-8 h-8" />
    },
    {
      category: "Sales",
      description: "Dedicated sales teams for lead generation and revenue growth",
      features: [
        "Lead qualification",
        "Appointment setting",
        "Sales conversion",
        "CRM management"
      ],
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      category: "Customer Support",
      description: "Comprehensive customer service solutions for enhanced satisfaction",
      features: [
        "Multi-channel support",
        "Quality monitoring",
        "Performance metrics",
        "Customer feedback"
      ],
      icon: <HeadphonesIcon className="w-8 h-8" />
    }
  ];

  const benefits = [
    {
      title: "Cost Reduction",
      description: "Save up to 60% on operational costs compared to in-house teams",
      value: "60%",
      icon: <DollarSign className="w-8 h-8" />
    },
    {
      title: "Scalability",
      description: "Easily scale operations up or down based on business needs",
      value: "Flexible",
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      title: "24/7 Availability",
      description: "Round-the-clock support across different time zones",
      value: "24/7",
      icon: <Clock className="w-8 h-8" />
    },
    {
      title: "Quality Assurance",
      description: "99% customer satisfaction rate with rigorous quality checks",
      value: "99%",
      icon: <Award className="w-8 h-8" />
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Requirement Analysis",
      description: "We analyze your business needs and define clear objectives",
      icon: <Search className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Solution Design",
      description: "Custom BPO solution tailored to your specific requirements",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Team Setup",
      description: "Deployment of trained professionals matching your needs",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Implementation",
      description: "Integration with your systems and processes",
      icon: <Zap className="w-6 h-6" />
    },
    {
      step: "05",
      title: "Quality Monitoring",
      description: "Continuous performance tracking and improvement",
      icon: <Shield className="w-6 h-6" />
    },
    {
      step: "06",
      title: "Reporting",
      description: "Regular performance reports and insights",
      icon: <PieChart className="w-6 h-6" />
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Business Process Optimization
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            BPO Services
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
              Optimize Your Business Processes
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto mb-12">
            We're shaking up the call center companies scene by providing all of the BPO outsourcing services you need at a fraction of the cost.
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
                  Inbound & Outbound Specialists
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Are Inbound and Outbound Call Center Specialists
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  You asked. We delivered.
                </p>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  We maintain the front and back office staffing you need, plus inbound and outbound call center calls in a variety of industries with service oriented and English‑proficient agents.
                </p>
                
                <div className="bg-gradient-to-r from-[#96bb57]/5 to-[#3f7ec1]/5 rounded-2xl p-6 border border-[#3f7ec1]/10">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">With our nearshore BPO outsourcing services, you will get:</h4>
                  <ul className="space-y-3">
                    {[
                      "Cost-effective solutions with up to 60% savings",
                      "24/7 customer support across all time zones",
                      "Scalable operations that grow with your business",
                      "Advanced technology and infrastructure",
                      "Dedicated account management",
                      "Regular performance reporting and insights"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#96bb57]" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/bpo3.avif"
                  alt="BPO Call Center"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 w-72 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] flex items-center justify-center text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Trained Professionals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BPO Services Section - Voice & Non-Voice */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#0A4C8A]/10 text-[#0A4C8A] rounded-full text-sm font-semibold mb-6">
              <Phone className="w-4 h-4 mr-2" />
              Comprehensive Solutions
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Voice & Non-Voice BPO Services
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Access a full suite of affordable call center services. Get that extra mile of performance you need, and increase business efficiency.
            </p>
          </div>

          {/* Service Type Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-2xl bg-gray-100 p-1">
              <button
                onClick={() => setActiveService("voice")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${activeService === "voice" ? "bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white shadow-lg" : "text-gray-600 hover:text-gray-900"}`}
              >
                Voice Services
              </button>
              <button
                onClick={() => setActiveService("nonVoice")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${activeService === "nonVoice" ? "bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white shadow-lg" : "text-gray-600 hover:text-gray-900"}`}
              >
                Non-Voice Services
              </button>
            </div>
          </div>

          {/* Service Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={bpoServices[activeService].image}
                  alt={bpoServices[activeService].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3f7ec1]">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Services List */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{bpoServices[activeService].title}</h3>
              <p className="text-lg text-gray-600 mb-10">{bpoServices[activeService].description}</p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {bpoServices[activeService].services.map((service: ServiceItem, index: number) => (
                  <div key={index} className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-[#3f7ec1] hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#96bb57]/10 text-[#96bb57] rounded-full text-sm font-semibold mb-6">
              <Target className="w-4 h-4 mr-2" />
              Our Specializations
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Rentals, Sales & Customer Support
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Leaders in outsourcing companies built for every industry. We provide customized solutions that allow our clients to achieve differentiation in their market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specializations.map((spec, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {spec.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{spec.category}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{spec.description}</p>
                <ul className="space-y-3">
                  {spec.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#96bb57]" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#0A4C8A]/10 text-[#0A4C8A] rounded-full text-sm font-semibold mb-6">
              <Building className="w-4 h-4 mr-2" />
              Industry Expertise
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Customized call center outsourcing solutions for diverse industries with specialized domain expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                    {industry.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{industry.clients}+</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{industry.name}</h3>
                <p className="text-gray-600 mb-6">{industry.description}</p>
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-[#96bb57]" />
                    <span>Specialized Solutions Available</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4 mr-2" />
              Why Choose InfoGrowth BPO
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Business Operations
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              When you partner with InfoGrowth BPO, we'll streamline your business processes with cutting‑edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                    {benefit.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{benefit.value}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Our Process */}
          <div className="bg-gradient-to-r from-[#96bb57]/5 via-[#3f7ec1]/5 to-[#0A4C8A]/5 rounded-3xl p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our 6-Step BPO Process
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                A structured approach to ensure seamless implementation and exceptional results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] flex items-center justify-center text-white text-lg font-bold">
                        {step.step}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                        {step.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h4>
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
              Common questions about our BPO services and processes
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
