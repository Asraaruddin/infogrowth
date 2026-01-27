"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import {
  Heart,
  ShoppingBag,
  DollarSign,
  CreditCard,
  BarChart3,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Building,
  Target,
  Award,
  HeadphonesIcon,
  Mail,
  Phone,
  ChevronDown,
  PieChart,
  FileText,
  MessageSquare,
  Database,
  Cpu,
  Cloud,
  Search,
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
  Receipt,
  Package,
  Truck,
  Wallet,
  FileCheck,
  Calculator,
  Bell,
  RefreshCw,
  ChartBar,
  Lock,
  Smartphone,
  Monitor,
  Workflow,
} from "lucide-react";

type ServiceItem = {
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
};

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: string[];
};

type BenefitItem = {
  title: string;
  description: string;
  value: string;
  icon: React.ReactNode;
};

export default function FintechOrderToCashPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeProcess, setActiveProcess] = useState<number>(0);

  const faqs = [
    {
      q: "What is Order to Cash (O2C) in FinTech?",
      a: "Order to Cash (O2C) is a complete business process that starts from receiving a customer order and ends with collecting payment. In FinTech, we automate and optimize this entire workflow using advanced technology to reduce errors, accelerate cash flow, and improve customer experience."
    },
    {
      q: "How does your FinTech O2C solution reduce payment processing time?",
      a: "Our solution reduces payment processing time by up to 70% through automated invoice generation, real-time payment processing, AI-powered collections, and seamless integration with banking systems. Most transactions are processed within 24 hours compared to traditional 5-7 day cycles."
    },
    {
      q: "What security measures are in place for payment processing?",
      a: "We implement bank-level security including PCI DSS compliance, end-to-end encryption, multi-factor authentication, fraud detection algorithms, regular security audits, and secure cloud infrastructure to protect all financial transactions and customer data."
    },
    {
      q: "Can your solution integrate with our existing ERP systems?",
      a: "Yes, our platform integrates seamlessly with all major ERP systems including SAP, Oracle, Microsoft Dynamics, NetSuite, and custom solutions through REST APIs, webhooks, and pre-built connectors. Implementation typically takes 4-8 weeks depending on complexity."
    },
    {
      q: "What industries do you serve with your FinTech O2C solutions?",
      a: "We serve diverse industries including E-commerce, Manufacturing, Retail, Healthcare, SaaS, Professional Services, Logistics, and B2B enterprises with specialized workflows tailored to each sector's unique requirements and compliance needs."
    },
    {
      q: "How does your AI-powered collections work?",
      a: "Our AI analyzes payment history, customer behavior, and market conditions to predict payment delays, optimize collection timing, personalize communication strategies, and prioritize high-risk accounts, improving collection rates by 40-60%."
    }
  ];

  const o2cServices: ServiceItem[] = [
    {
      name: "Order Management",
      description: "Automated order processing with real-time inventory checks, pricing validation, and seamless customer onboarding.",
      icon: <Package className="w-8 h-8" />,
      features: [
        "Automated order entry and validation",
        "Real-time inventory synchronization",
        "Dynamic pricing and discounts",
        "Customer credit checks",
        "Order tracking and status updates",
        "Multi-channel order management"
      ]
    },
    {
      name: "Invoice Automation",
      description: "Intelligent invoice generation, delivery, and management with configurable billing rules and compliance checks.",
      icon: <Receipt className="w-8 h-8" />,
      features: [
        "Automated invoice generation",
        "Multi-currency and tax compliance",
        "Recurring billing automation",
        "Electronic invoice delivery",
        "Real-time invoice tracking",
        "Automated payment reminders"
      ]
    },
    {
      name: "Payment Processing",
      description: "Secure, multi-channel payment processing with real-time reconciliation and fraud detection.",
      icon: <CreditCard className="w-8 h-8" />,
      features: [
        "Multiple payment gateway integration",
        "Real-time payment processing",
        "Automated reconciliation",
        "Fraud detection and prevention",
        "Payment plan management",
        "Chargeback management"
      ]
    },
    {
      name: "Collections Management",
      description: "AI-powered collections with predictive analytics, automated workflows, and personalized customer engagement.",
      icon: <Wallet className="w-8 h-8" />,
      features: [
        "AI-powered collection prioritization",
        "Automated payment reminders",
        "Collection workflow automation",
        "Customer communication management",
        "Dispute resolution tracking",
        "Performance analytics"
      ]
    },
    {
      name: "Cash Application",
      description: "Intelligent cash application with machine learning for accurate payment matching and exception handling.",
      icon: <FileCheck className="w-8 h-8" />,
      features: [
        "Automated payment matching",
        "Machine learning for exceptions",
        "Bank reconciliation automation",
        "Unapplied cash management",
        "Real-time cash position",
        "Exception workflow automation"
      ]
    },
    {
      name: "Reporting & Analytics",
      description: "Comprehensive dashboards and predictive analytics for cash flow forecasting and performance optimization.",
      icon: <ChartBar className="w-8 h-8" />,
      features: [
        "Real-time cash flow dashboards",
        "Predictive analytics for collections",
        "Customer payment behavior insights",
        "Dunning effectiveness metrics",
        "Revenue recognition tracking",
        "Custom report generation"
      ]
    }
  ];

  const o2cProcess: ProcessStep[] = [
    {
      step: "01",
      title: "Order Capture & Validation",
      description: "Seamless order intake with automated validation, credit checks, and inventory verification to ensure order feasibility.",
      icon: <Package className="w-6 h-6" />,
      metrics: ["Order processing time reduced by 80%", "Error rate reduction by 90%", "Real-time order validation"]
    },
    {
      step: "02",
      title: "Credit Management",
      description: "Automated credit assessment, risk scoring, and credit limit management to minimize bad debt exposure.",
      icon: <Shield className="w-6 h-6" />,
      metrics: ["Credit decision time reduced to minutes", "Bad debt reduction by 40%", "Dynamic credit limit adjustment"]
    },
    {
      step: "03",
      title: "Invoice Generation & Delivery",
      description: "Automated invoice creation with compliance checks, multi-channel delivery, and real-time tracking.",
      icon: <Receipt className="w-6 h-6" />,
      metrics: ["Invoice generation time reduced by 85%", "Electronic delivery rate 95%+", "Real-time invoice tracking"]
    },
    {
      step: "04",
      title: "Payment Processing",
      description: "Secure payment collection across multiple channels with real-time processing and automated reconciliation.",
      icon: <CreditCard className="w-6 h-6" />,
      metrics: ["Payment processing time reduced by 70%", "Reconciliation automation 90%", "Fraud detection accuracy 99.5%"]
    },
    {
      step: "05",
      title: "Collections & Dunning",
      description: "AI-powered collections workflow with personalized communication, payment plans, and dispute management.",
      icon: <Wallet className="w-6 h-6" />,
      metrics: ["Collection rate improvement 40-60%", "Dunning cost reduction by 65%", "Automated collection workflows"]
    },
    {
      step: "06",
      title: "Cash Application & Reporting",
      description: "Intelligent cash application, real-time reporting, and predictive analytics for cash flow optimization.",
      icon: <FileCheck className="w-6 h-6" />,
      metrics: ["Cash application automation 95%", "Real-time cash visibility", "Predictive cash flow accuracy 90%+"]
    }
  ];

  const benefits: BenefitItem[] = [
    {
      title: "Accelerated Cash Flow",
      description: "Reduce Days Sales Outstanding (DSO) by up to 45% through automated workflows and faster payment processing",
      value: "45%",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      title: "Cost Reduction",
      description: "Lower operational costs by 50-70% through automation of manual processes and reduced errors",
      value: "70%",
      icon: <DollarSign className="w-8 h-8" />
    },
    {
      title: "Improved Accuracy",
      description: "Reduce billing and collection errors by 90% with automated validation and reconciliation",
      value: "90%",
      icon: <CheckCircle className="w-8 h-8" />
    },
    {
      title: "Enhanced Security",
      description: "Bank-level security with PCI DSS compliance and advanced fraud detection protecting all transactions",
      value: "99.9%",
      icon: <ShieldCheck className="w-8 h-8" />
    }
  ];

  const technologies = [
    { name: "AI/ML for Collections", icon: <Brain className="w-6 h-6" /> },
    { name: "Blockchain Security", icon: <Lock className="w-6 h-6" /> },
    { name: "Real-time Analytics", icon: <BarChart3 className="w-6 h-6" /> },
    { name: "Cloud Infrastructure", icon: <Cloud className="w-6 h-6" /> },
    { name: "API Integration", icon: <Code2 className="w-6 h-6" /> },
    { name: "Mobile Payments", icon: <Smartphone className="w-6 h-6" /> },
  ];

  const metrics = [
    { value: "$10B+", label: "Transactions Processed" },
    { value: "99.5%", label: "System Uptime" },
    { value: "500+", label: "Enterprise Clients" },
    { value: "40+", label: "Countries Supported" },
    { value: "50ms", label: "Average Processing Time" },
    { value: "24/7", label: "Support Availability" },
  ];

  const industries = [
    {
      name: "E-commerce",
      description: "Automated payment processing and order fulfillment for online retailers",
      icon: <ShoppingBag className="w-6 h-6" />,
      clients: 120
    },
    {
      name: "Manufacturing",
      description: "B2B invoicing, credit management, and supply chain financing",
      icon: <Package className="w-6 h-6" />,
      clients: 85
    },
    {
      name: "SaaS",
      description: "Recurring billing, subscription management, and revenue recognition",
      icon: <Cloud className="w-6 h-6" />,
      clients: 150
    },
    {
      name: "Healthcare",
      description: "Patient billing, insurance claims, and payment plans",
      icon: <Heart className="w-6 h-6" />,
      clients: 75
    },
    {
      name: "Retail",
      description: "Multi-channel payments, inventory financing, and loyalty programs",
      icon: <ShoppingBag className="w-6 h-6" />,
      clients: 200
    },
    {
      name: "Logistics",
      description: "Freight billing, payment tracking, and carrier settlements",
      icon: <Truck className="w-6 h-6" />,
      clients: 60
    },
  ];

  const features = [
    "Real-time payment processing",
    "Automated invoice generation",
    "AI-powered collections",
    "Multi-currency support",
    "Bank reconciliation automation",
    "Fraud detection algorithms",
    "Custom reporting dashboards",
    "Mobile payment acceptance",
    "Recurring billing automation",
    "Credit risk assessment",
    "Payment plan management",
    "Compliance management"
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8">
            <DollarSign className="w-4 h-4 mr-2" />
            FinTech Excellence
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            Order to Cash Solutions
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
              Accelerate Your Cash Flow with Intelligent Automation
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto mb-12">
            Transform your financial operations with our comprehensive FinTech Order to Cash platform. 
            Automate the entire order-to-cash cycle from order processing to payment collection, 
            reducing DSO by up to 45% and improving operational efficiency by 70%.
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
                  Financial Operations Transformation
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Revolutionizing Order to Cash with FinTech Innovation
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  In today's fast-paced business environment, efficient cash flow management is critical for success. 
                  Our FinTech Order to Cash platform leverages cutting-edge technology to automate and optimize the 
                  entire revenue cycle, from order intake to cash collection.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We combine artificial intelligence, machine learning, and blockchain technology to create a 
                  seamless, secure, and intelligent O2C ecosystem that reduces manual intervention, minimizes errors, 
                  and accelerates revenue realization.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#96bb57]/10 flex items-center justify-center text-[#96bb57]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">70% Faster</div>
                    <div className="text-sm text-gray-600">Payment Processing</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">45% Reduction</div>
                    <div className="text-sm text-gray-600">In DSO (Days Sales Outstanding)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/fintech2.avif"
                  alt="FinTech Order to Cash Platform"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 w-64 border border-gray-100">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="w-10 h-10 text-[#3f7ec1]" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">PCI DSS</div>
                    <div className="text-sm text-gray-600">Level 1 Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve - MOVED TO TOP */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#96bb57]/10 text-[#96bb57] rounded-full text-sm font-semibold mb-6">
              <Building className="w-4 h-4 mr-2" />
              Industry Solutions
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Serving Diverse Industries
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Customized FinTech O2C solutions tailored to specific industry requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                    {industry.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{industry.clients}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{industry.name}</h3>
                <p className="text-gray-600 mb-6">{industry.description}</p>
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-[#96bb57]" />
                    <span>Industry-specific workflows</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#0A4C8A]/10 text-[#0A4C8A] rounded-full text-sm font-semibold mb-6">
              <BarChart3 className="w-4 h-4 mr-2" />
              Proven Performance
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Driving Financial Excellence
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our platform delivers measurable results that transform financial operations and accelerate business growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="text-3xl font-bold text-gray-900 mb-3">{metric.value}</div>
                <div className="text-gray-600">{metric.label}</div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 text-[#96bb57]" />
                    <span>Verified Performance Metrics</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O2C Services */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#96bb57]/10 text-[#96bb57] rounded-full text-sm font-semibold mb-6">
              <Package className="w-4 h-4 mr-2" />
              Complete O2C Suite
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              End-to-End Order to Cash Solutions
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Comprehensive FinTech solutions covering every aspect of the order-to-cash lifecycle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {o2cServices.map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#96bb57] mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
               
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O2C Process Flow */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white rounded-full text-sm font-semibold mb-6">
              <Workflow className="w-4 h-4 mr-2" />
              Automated Workflow
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Intelligent Order to Cash Process
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A seamless, automated workflow that transforms your financial operations
            </p>
          </div>

          {/* Process Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap justify-center gap-2">
              {o2cProcess.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProcess(index)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeProcess === index ? "bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:text-gray-900"}`}
                >
                  {step.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Process Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] flex items-center justify-center text-white text-xl font-bold">
                  {o2cProcess[activeProcess].step}
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{o2cProcess[activeProcess].title}</h3>
              </div>
              
              <p className="text-lg text-gray-600 mb-10">{o2cProcess[activeProcess].description}</p>
              
              <div className="space-y-4 mb-10">
                <h4 className="font-bold text-gray-900">Key Benefits:</h4>
                {o2cProcess[activeProcess].metrics.map((metric, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#96bb57]" />
                    <span className="text-gray-700">{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/fintech.jpg"
                  alt="FinTech Process Flow"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3f7ec1]">Step {activeProcess + 1}</div>
                  <div className="text-sm text-gray-600">of {o2cProcess.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#0A4C8A]/10 text-[#0A4C8A] rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4 mr-2" />
              Business Impact
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transformative Benefits for Your Business
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our FinTech O2C platform delivers measurable results that directly impact your bottom line
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

          {/* Technology Stack */}
          <div className="bg-gradient-to-r from-[#96bb57]/5 via-[#3f7ec1]/5 to-[#0A4C8A]/5 rounded-3xl p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Powered by Advanced Technology
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform leverages cutting-edge technologies to deliver exceptional performance and security
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <div key={index} className="group bg-white rounded-xl border border-gray-200 p-6 text-center hover:border-[#3f7ec1] hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1] mb-4 mx-auto">
                    {tech.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-[#3f7ec1]/10 text-[#3f7ec1] rounded-full text-sm font-semibold mb-6">
                  <Zap className="w-4 h-4 mr-2" />
                  Platform Features
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Comprehensive Feature Set
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Our FinTech O2C platform includes a wide range of features designed to optimize every aspect 
                of your financial operations, from order processing to cash collection.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#96bb57] mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] rounded-2xl p-8 text-white">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-[#3f7ec1] text-2xl font-bold mb-4 mx-auto">
                  <DollarSign className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Transform Your Cash Flow?
                </h3>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Free O2C process assessment",
                  "Customized implementation plan",
                  "ROI analysis and projection",
                  "Dedicated implementation team",
                  "Training and knowledge transfer",
                  "Ongoing support and optimization"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
              Common questions about our FinTech Order to Cash solutions
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