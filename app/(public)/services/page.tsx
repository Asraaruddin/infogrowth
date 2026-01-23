"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Code2,
  Cloud,
  BarChart3,
  Briefcase,
  ChevronDown,
  Database,
  CreditCard,
  Server,
  Zap,
  ArrowRight,
  CheckCircle,
  Shield,
  Globe,
  TrendingUp,
  Clock,
  Users,
  Target,
  Award,
  FileText,
  HeadphonesIcon,
} from "lucide-react";

const faqs = [
  {
    q: "What industries does InfoGrowth serve?",
    a: "We work with startups, mid-size companies, and enterprises across IT, healthcare, finance, retail, consulting, and e-commerce industries.",
  },
  {
    q: "Do you provide end-to-end project delivery?",
    a: "Yes. From strategy and design to development, deployment, and post-launch support, we deliver complete end-to-end solutions with dedicated project management.",
  },
  {
    q: "Can we hire dedicated developers or consultants?",
    a: "Absolutely. We offer flexible engagement models including dedicated resources, project-based delivery, staff augmentation, and managed services.",
  },
  {
    q: "How do you ensure project quality?",
    a: "We follow proven development methodologies, rigorous testing processes, continuous client collaboration, and maintain ISO 9001 standards for quality assurance.",
  },
  {
    q: "Do you offer cloud migration services?",
    a: "Yes. We specialize in cloud migration, optimization, and management across AWS, Azure, and Google Cloud platforms with 24/7 monitoring support.",
  },
  {
    q: "What is your typical project timeline?",
    a: "Timelines vary by project scope, but we deliver MVP in 4-8 weeks, with full-scale solutions in 3-6 months. We provide detailed project plans upfront.",
  },
  {
    q: "Do you provide ongoing support and maintenance?",
    a: "Yes, we offer comprehensive support packages including bug fixes, updates, security patches, and performance optimization with dedicated SLAs.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32 bg-gradient-to-br from-[#0A1F36] via-[#0A4C8A] to-[#05325A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-10 border border-white/20">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-3" />
              Enterprise Solutions
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Comprehensive
              <span className="block mt-4 bg-gradient-to-r from-cyan-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                Digital Services
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100/90 leading-relaxed max-w-3xl mx-auto mb-12 px-4">
              End-to-end technology solutions designed to accelerate growth and drive measurable digital transformation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              {[
                { icon: Globe, text: "Global Delivery" },
                { icon: Shield, text: "Enterprise-Grade" },
                { icon: TrendingUp, text: "ROI Focused" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <item.icon className="w-5 h-5 text-cyan-300 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Detailed Service Sections */}
      <div className="py-20 sm:py-24 lg:py-32 space-y-20 lg:space-y-32">
        {detailedServices.map((service, index) => (
          <DetailedServiceSection
            key={index}
            {...service}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      {/* Methodology Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              <Target className="w-4 h-4 mr-2" />
              Our Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              How We Deliver Excellence
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed px-4">
              A proven framework that ensures successful project delivery and maximum business value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {methodologySteps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold mb-6">
              <FileText className="w-4 h-4 mr-2" />
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Common questions about our services, processes, and engagement models.
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
                  <span className="font-semibold text-gray-900 pr-8 text-sm sm:text-base">
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
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 pt-16 border-t border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
              <HeadphonesIcon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Our team is ready to help you find the perfect solution for your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
<section className="py-24 bg-white text-slate-900">
  <div className="max-w-5xl mx-auto px-6 text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
      Ready to Transform Your Business?
    </h2>

    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12">
      Join hundreds of businesses that trust InfoGrowth for their digital
      transformation journey.
    </p>

    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <Link
        href="/contact-us"
        className="group inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-slate-800 hover:shadow-2xl transition-all duration-300"
      >
        Get in Touch
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
</section>

    </main>
  );
}

// Service Card Component for Grid View
const ServiceCard = ({ icon, title, description, gradient }: any) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
      {description}
    </p>
    <div className="mt-6 pt-6 border-t border-gray-100">
    </div>
  </div>
);

// Detailed Service Section Component
const DetailedServiceSection = ({ 
  title, 
  description, 
  points, 
  image, 
  icon, 
  gradient, 
  reverse, 
  stats,
  href 
}: any) => (
  <section className="bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Image Container */}
        <div className={`relative ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
          
          {/* Stats Card - Fixed Alignment */}
          {stats && stats.length > 0 && (
            <div className="absolute -bottom-6 -right-6 lg:-right-4 bg-white rounded-2xl shadow-xl p-6 w-56 sm:w-64 z-10 border border-gray-100">
              <div className="space-y-4">
                {stats.map((stat: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium text-right">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className={`${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}>
              {icon}
            </div>
            <span className={`inline-block px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r ${gradient} bg-opacity-10 text-gray-700`}>
              Enterprise Solution
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 leading-relaxed">
            {description}
          </p>

          <ul className="space-y-4 mb-8 sm:mb-12">
            {points.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-4 text-gray-700">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="font-medium text-sm sm:text-base">{point}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <Link
              href={href}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-3"
            >
              Learn More
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Data Arrays
const servicesData = [
  {
    icon: <Code2 className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Web & Mobile Development",
    description: "Scalable, secure applications using modern technologies and best practices.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Cloud className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Cloud Solutions",
    description: "Enhance agility, scalability, and performance while reducing costs.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <Database className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "SAP Consulting",
    description: "End-to-end SAP implementation and optimization for enterprise processes.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: <CreditCard className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "FinTech Solutions",
    description: "Order-to-Cash automation and financial operations streamlining.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Digital Marketing",
    description: "Data-driven strategies to increase visibility, engagement, and conversions.",
    gradient: "from-indigo-500 to-blue-500",
  },
];

const detailedServices = [
  {
    title: "Web & Mobile App Development",
    description: "We design and build scalable, secure, and high-performance web and mobile applications using modern technologies and industry best practices. Our solutions drive user engagement and business growth.",
    points: [
      "Custom web & mobile application development",
      "UI/UX focused product design with prototyping",
      "Enterprise-grade scalability & security architecture",
      "API development & third-party integrations",
      "Progressive Web Apps (PWA) & responsive design",
      "Performance optimization & analytics integration",
    ],
    image: "/webdev.jpg",
    icon: <Code2 className="w-6 h-6 sm:w-7 sm:h-7" />,
    gradient: "from-blue-500 to-cyan-500",
    stats: [
      { value: "300+", label: "Apps Delivered" },
      { value: "4.9/5", label: "Client Rating" },
      { value: "40%", label: "Faster Time-to-Market" },
    ],
    href: "/services/managed-it-services"
  },
  {
    title: "Cloud Solutions & Infrastructure",
    description: "Leverage the power of cloud to enhance agility, scalability, and performance while reducing infrastructure costs. Our certified architects ensure optimal cloud strategy implementation.",
    points: [
      "Cloud migration, modernization & optimization",
      "AWS, Azure & Google Cloud certified solutions",
      "DevOps, CI/CD pipeline automation",
      "Cloud security, compliance & cost optimization",
      "24/7 monitoring & managed cloud services",
      "Disaster recovery & business continuity",
    ],
    image: "/cloud.avif",
    icon: <Cloud className="w-6 h-6 sm:w-7 sm:h-7" />,
    gradient: "from-purple-500 to-pink-500",
    stats: [
      { value: "99.9%", label: "Uptime SLA" },
      { value: "60%", label: "Cost Reduction" },
      { value: "50+", label: "Cloud Projects" },
    ],
    href: "/services/cloud-services"
  },
  {
    title: "SAP Implementation & Consulting",
    description: "Transform your business operations with comprehensive SAP solutions. We deliver end-to-end SAP implementation, customization, and support to optimize your enterprise processes.",
    points: [
      "SAP S/4HANA implementation & migration",
      "Custom SAP development & ABAP programming",
      "SAP FICO, MM, SD, PP modules implementation",
      "SAP Business One for SMEs",
      "SAP integration with third-party systems",
      "SAP support, maintenance & upgrades",
    ],
    image: "/sap.jpg",
    icon: <Database className="w-6 h-6 sm:w-7 sm:h-7" />,
    gradient: "from-green-500 to-emerald-500",
    stats: [
      { value: "25+", label: "SAP Projects" },
      { value: "30%", label: "Process Efficiency" },
      { value: "100%", label: "Success Rate" },
    ],
    href: "/services/sap-services"
  },
  {
    title: "FinTech Solutions - Order to Cash",
    description: "Streamline your financial operations with our comprehensive Order-to-Cash solutions. Automate processes from order management to payment collection for improved cash flow.",
    points: [
      "Order management & processing automation",
      "Automated invoicing & billing solutions",
      "Payment processing & reconciliation",
      "Credit management & collections automation",
      "Real-time financial analytics & reporting",
      "Integration with ERP & accounting systems",
    ],
    image: "/fintech.avif",
    icon: <CreditCard className="w-6 h-6 sm:w-7 sm:h-7" />,
    gradient: "from-orange-500 to-red-500",
    stats: [
      { value: "45%", label: "Faster Collections" },
      { value: "99%", label: "Accuracy Rate" },
      { value: "24/7", label: "Processing" },
    ],
    href: "/services/fintech-order-to-cash"
  },
];

const methodologySteps = [
  {
    icon: <Server className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Discovery & Planning",
    description: "Comprehensive analysis and strategic planning to define project scope and objectives.",
  },
  {
    icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Agile Development",
    description: "Iterative development with regular client feedback and milestone reviews.",
  },
  {
    icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Quality Assurance",
    description: "Rigorous testing and quality checks to ensure flawless performance.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Launch & Optimize",
    description: "Deployment, monitoring, and continuous optimization for ongoing success.",
  },
];