"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import {
  Cloud,
  Shield,
  Cpu,
  Eye,
  Database,
  Lock,
  Users,
  Target,
  Award,
  Clock,
  TrendingUp,
  Zap,
  Sparkles,
  Building,
  ShoppingBag,
  Hotel,
  Monitor,
  DollarSign,
  Search,
  CheckCircle,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  ChevronDown,
  HeadphonesIcon,
  BarChart3,
  FileText,
  MessageSquare,
  PieChart,
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
} from "lucide-react";

type ServiceItem = {
  name: string;
  description: string;
  icon: React.ReactNode;
};

type CloudProvider = {
  name: string;
  description: string;
  image: string;
  services: ServiceItem[];
};

export default function CloudServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeProvider, setActiveProvider] = useState<"aws" | "azure">("aws");

  const faqs = [
    {
      q: "What cloud services does InfoGrowth offer?",
      a: "We offer comprehensive cloud solutions including AWS & Azure consulting, cloud migration, managed services, billing optimization, DevOps, cloud security, cost optimization, and 24/7 monitoring and support for businesses of all sizes."
    },
    {
      q: "How long does a typical cloud migration take?",
      a: "Cloud migration timelines vary based on complexity. Small to medium deployments take 4-8 weeks, while enterprise migrations with multiple applications typically take 12-24 weeks. We provide detailed project plans with clear milestones."
    },
    {
      q: "Do you offer ongoing cloud management and support?",
      a: "Yes, we provide 24/7 managed cloud services including monitoring, security, patching, backups, cost optimization, and performance tuning. Our NOC (Network Operations Center) ensures your cloud environment runs optimally."
    },
    {
      q: "How do you ensure cloud security and compliance?",
      a: "We implement multi-layered security including network security, identity management, encryption, compliance frameworks (GDPR, HIPAA, PCI-DSS), regular security audits, and threat monitoring to protect your cloud assets."
    },
    {
      q: "Can you help reduce our cloud costs?",
      a: "Absolutely. Our cloud cost optimization services typically reduce client cloud spending by 30-50% through right-sizing instances, reserved instances, spot instances optimization, and eliminating unused resources."
    }
  ];

  const cloudProviders: Record<"aws" | "azure", CloudProvider> = {
    aws: {
      name: "AWS Services",
      description: "Comprehensive Amazon Web Services solutions for scalable, secure, and cost-effective cloud infrastructure.",
      image: "/cloud4.avif",
      services: [
        {
          name: "EC2 & Compute",
          description: "Elastic compute capacity with auto-scaling and load balancing",
          icon: <Cpu className="w-6 h-6" />
        },
        {
          name: "S3 & Storage",
          description: "Scalable object storage with high durability and availability",
          icon: <Database className="w-6 h-6" />
        },
        {
          name: "RDS Databases",
          description: "Managed relational databases with automated backups",
          icon: <Server className="w-6 h-6" />
        },
        {
          name: "CloudFront CDN",
          description: "Global content delivery network for low-latency delivery",
          icon: <Globe className="w-6 h-6" />
        },
        {
          name: "Lambda Serverless",
          description: "Event-driven compute service for scalable applications",
          icon: <Zap className="w-6 h-6" />
        },
        {
          name: "Security & IAM",
          description: "Identity and access management with advanced security",
          icon: <ShieldCheck className="w-6 h-6" />
        }
      ]
    },
    azure: {
      name: "Azure Services",
      description: "Microsoft Azure solutions for hybrid cloud, enterprise applications, and AI-driven business transformation.",
      image: "/cloud3.avif",
      services: [
        {
          name: "Azure Virtual Machines",
          description: "Scalable compute with Windows and Linux support",
          icon: <Cpu className="w-6 h-6" />
        },
        {
          name: "Azure SQL Database",
          description: "Fully managed relational database service",
          icon: <Database className="w-6 h-6" />
        },
        {
          name: "Azure Kubernetes",
          description: "Managed Kubernetes container orchestration",
          icon: <Network className="w-6 h-6" />
        },
        {
          name: "Azure AI & ML",
          description: "Artificial intelligence and machine learning services",
          icon: <Brain className="w-6 h-6" />
        },
        {
          name: "Azure DevOps",
          description: "CI/CD pipelines and application lifecycle management",
          icon: <Code2 className="w-6 h-6" />
        },
        {
          name: "Azure Security Center",
          description: "Unified security management and threat protection",
          icon: <ShieldCheck className="w-6 h-6" />
        }
      ]
    }
  };

  const cloudServices = [
    {
      category: "Consulting",
      description: "Strategic cloud advisory and architecture design",
      icon: <Users className="w-8 h-8" />,
      features: ["Cloud Strategy", "Architecture Design", "ROI Analysis", "Compliance Assessment"]
    },
    {
      category: "Billing",
      description: "Cost optimization and financial governance",
      icon: <DollarSign className="w-8 h-8" />,
      features: ["Cost Optimization", "Budget Management", "Reserved Instances", "Spend Analytics"]
    },
    {
      category: "Migration",
      description: "Seamless cloud migration with zero downtime",
      icon: <ArrowLeftRight className="w-8 h-8" />,
      features: ["Assessment & Planning", "Lift & Shift", "Re-platforming", "Refactoring"]
    },
    {
      category: "Managed Services",
      description: "24/7 monitoring, management, and support",
      icon: <HeadphonesIcon className="w-8 h-8" />,
      features: ["24/7 Monitoring", "Security Management", "Performance Tuning", "Backup & Recovery"]
    }
  ];

  const technologies = [
    { name: "Cloud Platform", icon: <Cloud className="w-6 h-6" /> },
    { name: "Security", icon: <Shield className="w-6 h-6" /> },
    { name: "Cloud Infrastructure", icon: <Cpu className="w-6 h-6" /> },
    { name: "Observability", icon: <Eye className="w-6 h-6" /> },
    { name: "Data Streaming", icon: <Database className="w-6 h-6" /> },
    { name: "Data Protection", icon: <Lock className="w-6 h-6" /> },
  ];

  const competencies = [
    { value: "200+", label: "Live Workloads", icon: <Server className="w-8 h-8" /> },
    { value: "20+", label: "Years of Experience", icon: <Award className="w-8 h-8" /> },
    { value: "24x7", label: "NOC Services", icon: <Clock className="w-8 h-8" /> },
    { value: "10000+", label: "Resources Managed", icon: <Users className="w-8 h-8" /> },
    { value: "100%", label: "Certified Team", icon: <BadgeCheck className="w-8 h-8" /> },
    { value: "99.9%", label: "Uptime SLA", icon: <TrendingUp className="w-8 h-8" /> },
  ];

  const timeline = [
    { year: "1999", event: "Online Portals & Ad Serving" },
    { year: "2003", event: "Managed Services" },
    { year: "2008", event: "Data Center & Private Cloud Offerings" },
    { year: "2015", event: "Started Our AWS Partnership" },
    { year: "2016", event: "Cloud Services Launch" },
    { year: "2017", event: "Elevated To AWS Advanced Consulting Partners" },
    { year: "2018", event: "Microsoft Workloads Competency" },
    { year: "2019", event: "Amazon CloudFront SDP" },
    { year: "2020", event: "AWS WAF SDP" },
    { year: "2021", event: "AWS Config SDP" },
    { year: "2022", event: "AWS RDS SDP" },
  ];

  const offerings = [
    "Cloud Advisory Services",
    "Cloud Design & Deployment Services",
    "Cloud Transformation Services",
    "Cloud Migration Services",
    "Managed AWS & Azure Clouds",
    "Cost Optimization & Billing",
    "Cloud Automation & DevOps",
    "Cloud Applications & Integration Services",
    "Cloud Security Services"
  ];

  const solutions = [
    { name: "CDN & Edge Solutions", icon: <Globe className="w-5 h-5" /> },
    { name: "DBaaS & DaaS", icon: <Database className="w-5 h-5" /> },
    { name: "Backup & Archival", icon: <Lock className="w-5 h-5" /> },
    { name: "Endpoint Data Protection", icon: <Shield className="w-5 h-5" /> },
    { name: "Big Data & Analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "AI & ML Solutions", icon: <Brain className="w-5 h-5" /> },
    { name: "Business Collaboration Tools", icon: <Users className="w-5 h-5" /> },
    { name: "IoT Platform Services", icon: <Cpu className="w-5 h-5" /> },
  ];

  const verticals = [
    { name: "Media & Entertainment", clients: 25 },
    { name: "Automobiles", clients: 18 },
    { name: "Retail & Consumer Markets", clients: 42 },
    { name: "Digital Agencies", clients: 35 },
    { name: "Financial Services", clients: 28 },
    { name: "E-commerce", clients: 50 },
    { name: "Education & Training", clients: 22 },
    { name: "Pharmaceuticals", clients: 15 },
    { name: "Healthcare & Life Sciences", clients: 30 },
    { name: "Tourism & Hospitality", clients: 20 },
    { name: "Public Sector & Government", clients: 12 },
    { name: "Manufacturing", clients: 25 },
    { name: "Information Technology", clients: 45 },
  ];

  const benefits = [
    "24/7 technical support",
    "Cost savings on IT spends",
    "Customized services",
    "Certified cloud consulting experts",
    "Greater flexibility and operational efficiency",
    "Improved IT security, governance & management",
    "Enhanced scalability",
    "Faster time to market and application development",
    "Seamless cloud journey",
    "Reduced infrastructure management overhead"
  ];

  const partners = [
    { name: "Amazon Web Services", tier: "Advanced Consulting Partner" },
    { name: "Microsoft Azure", tier: "Gold Partner" },
    { name: "Google Cloud Platform", tier: "Premier Partner" },
    { name: "VMware", tier: "Partner Advantage" },
    { name: "Red Hat", tier: "Advanced Business Partner" },
    { name: "Dell Technologies", tier: "Titanium Partner" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8">
            <Cloud className="w-4 h-4 mr-2" />
            Cloud Excellence
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            Cloud Services
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
              Empowering Digital Transformation
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto mb-12">
            Empowering businesses with cutting-edge cloud technology solutions. We define your cloud journey and provide the right expertise to make your transition smooth and successful.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-white text-[#05325A] px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-3">
              Get Free Cloud Assessment
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
                <div className="inline-flex items-center justify-center px-4 py-2 bg-[#3f7ec1]/10 text-[#3f7ec1] rounded-full text-sm font-semibold mb-6">
                  <Rocket className="w-4 h-4 mr-2" />
                  Our Story
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Your Cloud Journey Starts Here
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  InfoGrowth Cloud Services is a fast-paced, dexterous company born with a mission to define your cloud journey and help you navigate it with the right expertise and know-how for a smooth transition.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded at the forefront of the cloud technology revolution, we help businesses achieve their goals by leveraging our extensive expertise in cloud computing, data centers, and managed services.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our versatile experience in hosting, data center management, and cloud services gives us a unique edge. Our proficiency in security, CDN edge services, and comprehensive cloud solutions sets us apart in the industry.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#96bb57]/10 flex items-center justify-center text-[#96bb57]">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Our Vision</div>
                    <div className="text-sm text-gray-600">Market leader in IT solutions</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Our Mission</div>
                    <div className="text-sm text-gray-600">Customer-driven excellence</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/cloud2.avif"
                  alt="Cloud Infrastructure"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 w-64 border border-gray-100">
                <div className="flex items-center gap-3">
                  <Award className="w-10 h-10 text-[#3f7ec1]" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">20+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Competencies */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#0A4C8A]/10 text-[#0A4C8A] rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4 mr-2" />
              Our Competencies
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted Cloud Excellence
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Delivering exceptional cloud services with proven expertise and unmatched reliability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {competencies.map((item, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1]">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{item.value}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.label}</h3>
                <p className="text-gray-600">
                  {index === 0 && "Successfully deployed and managed across global enterprises"}
                  {index === 1 && "Combined team experience in cloud technologies"}
                  {index === 2 && "Network Operations Center providing continuous monitoring"}
                  {index === 3 && "Virtual machines, containers, and serverless functions"}
                  {index === 4 && "AWS, Azure, and Google Cloud certified professionals"}
                  {index === 5 && "Guaranteed uptime with comprehensive SLA"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Providers Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#96bb57]/10 text-[#96bb57] rounded-full text-sm font-semibold mb-6">
              <Cloud className="w-4 h-4 mr-2" />
              Cloud Providers
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AWS & Azure Solutions
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Comprehensive cloud services across leading platforms with certified expertise
            </p>
          </div>

          {/* Provider Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-2xl bg-gray-100 p-1">
              <button
                onClick={() => setActiveProvider("aws")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${activeProvider === "aws" ? "bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white shadow-lg" : "text-gray-600 hover:text-gray-900"}`}
              >
                AWS Services
              </button>
              <button
                onClick={() => setActiveProvider("azure")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${activeProvider === "azure" ? "bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white shadow-lg" : "text-gray-600 hover:text-gray-900"}`}
              >
                Azure Services
              </button>
            </div>
          </div>

          {/* Provider Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={cloudProviders[activeProvider].image}
                  alt={cloudProviders[activeProvider].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">Certified</div>
                  <div className="text-xs text-gray-600">Partner</div>
                </div>
              </div>
            </div>

            {/* Services List */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{cloudProviders[activeProvider].name}</h3>
              <p className="text-lg text-gray-600 mb-10">{cloudProviders[activeProvider].description}</p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {cloudProviders[activeProvider].services.map((service: ServiceItem, index: number) => (
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

              <button className="mt-10 w-full md:w-auto bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3">
                Explore {activeProvider === "aws" ? "AWS" : "Azure"} Solutions
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#0A4C8A]/10 text-[#0A4C8A] rounded-full text-sm font-semibold mb-6">
              <Wrench className="w-4 h-4 mr-2" />
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Consulting, Billing, Migration & Managed Services
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              End-to-end cloud solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cloudServices.map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.category}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#96bb57]" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technology Stack */}
          <div className="mt-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Technology Services
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Comprehensive cloud provider expertise across multiple domains
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

      {/* Our Partners */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#96bb57]/10 text-[#96bb57] rounded-full text-sm font-semibold mb-6">
              <Handshake className="w-4 h-4 mr-2" />
              Our Partners
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Strategic Technology Alliances
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We have strategically joined hands with industry leaders to provide advanced cloud solutions and dependable services to our valued clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1] mb-6">
                  <BadgeCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                <div className="inline-flex px-3 py-1 bg-[#3f7ec1]/10 text-[#3f7ec1] rounded-full text-sm font-semibold">
                  {partner.tier}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-[#96bb57]/10 via-[#3f7ec1]/10 to-[#0A4C8A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white rounded-full text-sm font-semibold mb-6">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Your Cloud Advantage
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Your Cloud Journey is Seamless with InfoGrowth
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  We ensure that you get the most out of your cloud investment. Our cloud specialists can help you draft a roadmap, develop and manage the cloud for you through a range of cloud services we provide.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {benefits.slice(0, 8).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#96bb57] mt-1" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white text-2xl font-bold mb-4 mx-auto">
                  <Cloud className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Simplify and Optimize Your Cloud Journey
                </h3>
              </div>
              
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-4">Our Offerings:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {offerings.map((offering, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#3f7ec1]"></div>
                      <span className="text-sm text-gray-700">{offering}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3">
                Get Your Cloud Strategy
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Verticals We Serve */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#0A4C8A]/10 text-[#0A4C8A] rounded-full text-sm font-semibold mb-6">
              <Building className="w-4 h-4 mr-2" />
              Industry Verticals
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Specialized cloud solutions for diverse industries with domain-specific expertise
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {verticals.map((vertical, index) => (
              <div key={index} className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-[#3f7ec1] hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-gray-900">{vertical.name}</h3>
                  <div className="text-sm font-semibold text-[#3f7ec1]">{vertical.clients}+</div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#96bb57] to-[#3f7ec1]"
                    style={{ width: `${Math.min(100, vertical.clients)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#3f7ec1]/10 text-[#3f7ec1] rounded-full text-sm font-semibold mb-6">
              <Code2 className="w-4 h-4 mr-2" />
              Our Solutions
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Cloud Solutions
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Advanced cloud-based solutions to drive innovation and business growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <div key={index} className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-[#3f7ec1] hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#96bb57]/10 to-[#3f7ec1]/10 flex items-center justify-center text-[#3f7ec1] mb-4">
                  {solution.icon}
                </div>
                <h3 className="font-bold text-gray-900">{solution.name}</h3>
              </div>
            ))}
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
              Common questions about our cloud services and solutions
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

      {/* Final CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8">
            <Cloud className="w-4 h-4 mr-2" />
            Ready for Cloud Transformation?
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Trust Us for the Most Efficient Cloud Services
          </h2>
          
          <p className="text-xl text-white/95 max-w-2xl mx-auto mb-12 leading-relaxed">
            Share your contact details and our cloud experts will get in touch within 24 hours.
          </p>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#3f7ec1] focus:ring-2 focus:ring-[#3f7ec1]/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Organization</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#3f7ec1] focus:ring-2 focus:ring-[#3f7ec1]/20 outline-none transition-all"
                    placeholder="Your Company"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email ID *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#3f7ec1] focus:ring-2 focus:ring-[#3f7ec1]/20 outline-none transition-all"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#3f7ec1] focus:ring-2 focus:ring-[#3f7ec1]/20 outline-none transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Submit Request
              </button>
            </form>
          </div>
          
          <div className="mt-16 pt-16 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white/90">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>cloud@infogrowth.com</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center gap-3">
                <HeadphonesIcon className="w-5 h-5" />
                <span>24/7 Cloud Support</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span>Response within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}