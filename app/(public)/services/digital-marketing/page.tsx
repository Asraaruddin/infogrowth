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
} from "lucide-react";

export default function DigitalMarketingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Why is digital marketing important for my firm, and what does it entail?",
      a: "Digital marketing uses email, search engines, social media, and other online platforms to promote your business. In the digital age, connecting with your target market and boosting exposure and revenue are critical for sustained growth."
    },
    {
      q: "What services does InfoGrowth offer in terms of digital marketing?",
      a: "We provide comprehensive digital marketing services including Website Development, SEO, PPC, Social Media Management, Content Marketing, Graphic Design, Email Marketing, Programmatic Advertising, Conversion Rate Optimization, and more."
    },
    {
      q: "How quickly can I anticipate using digital marketing to get results?",
      a: "Initial results can be seen within 30-60 days for PPC campaigns, while SEO typically shows measurable improvements in 3-6 months. We provide detailed performance reports from day one to track progress."
    },
    {
      q: "Can InfoGrowth improve my company's Google ranking?",
      a: "Absolutely. Our proven SEO strategies have helped clients achieve top Google rankings through technical optimization, quality content creation, and authoritative link building."
    },
    {
      q: "How is the effectiveness of digital marketing efforts measured by InfoGrowth?",
      a: "We use advanced analytics tools to track KPIs like traffic, conversions, ROI, and engagement. You'll receive detailed monthly reports with clear metrics and actionable insights."
    }
  ];

  const serviceCategories = [
    {
      category: "Google Ads",
      description: "Maximize your reach and conversions with strategic Google Ads campaigns that target your ideal customers at every stage of their journey.",
      image1: "/ads.avif",
      image2: "/ads2.avif",
      services: [
        { name: "Search Advertising", description: "Target users actively searching for your products/services with optimized keyword strategies" },
        { name: "Display Advertising", description: "Reach potential customers across millions of websites with visually engaging banner ads" },
        { name: "Shopping Campaigns", description: "Showcase products directly in Google search results with optimized product feeds" },
        { name: "Video Advertising", description: "Engage audiences with compelling video content on YouTube and across the web" },
      ],
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      category: "Google Analytics",
      description: "Gain actionable insights to drive data-driven marketing decisions with comprehensive analytics and reporting.",
      image1: "/newpic.jpg",
      services: [
        { name: "Performance Tracking", description: "Monitor campaign effectiveness in real-time with custom dashboards and reports" },
        { name: "Conversion Analytics", description: "Understand customer journey and optimize touchpoints for maximum conversions" },
        { name: "Audience Segmentation", description: "Identify high-value customer segments for targeted marketing campaigns" },
        { name: "ROI Measurement", description: "Calculate precise return on marketing investment with advanced attribution modeling" },
      ],
      icon: <PieChart className="w-6 h-6" />
    },
    {
      category: "SEO Services",
      description: "Improve organic visibility and drive sustainable traffic growth with our comprehensive SEO strategies.",
      image1: "/seo.jpg",
      services: [
        { name: "Technical SEO", description: "Optimize website structure, speed, and mobile-friendliness for better search rankings" },
        { name: "On-Page Optimization", description: "Enhance content and metadata for better rankings and click-through rates" },
        { name: "Content Strategy", description: "Create valuable, engaging content that ranks well and converts visitors" },
        { name: "Link Building", description: "Build authoritative backlinks from reputable sources to boost domain authority" },
      ],
      icon: <Search className="w-6 h-6" />
    }
  ];

  const industries = [
    { icon: <Hotel className="w-6 h-6" />, name: "Hospitality", description: "B2C hotels and resorts in USA/UK markets" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "E-commerce", description: "Small to medium region-specific online stores" },
    { icon: <Building className="w-6 h-6" />, name: "Small Businesses", description: "Local and regional service providers" },
    { icon: <Monitor className="w-6 h-6" />, name: "Tech Startups", description: "Software and technology companies" },
  ];

  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Grow Your Staff and Save Money",
      description: "Access a team of digital marketing experts without the overhead of a full-time internal team. Focus on your core business while we manage all aspects of your campaigns."
    },
    {
      icon: <Tag className="w-8 h-8" />,
      title: "Cost-Effective Expertise",
      description: "Hire experienced professionals at a fraction of the cost of building an internal team with the same level of expertise and technology access."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Proven Track Record",
      description: "Our strategies have generated over $10 billion in revenue for clients across various industries through personalized marketing approaches."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Comprehensive Support",
      description: "A dedicated account manager supported by a team of digital marketing experts ensures seamless execution and continuous optimization."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-r from-[#96bb57] via-[#3f7ec1] to-[#0A4C8A] text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Digital Excellence
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            Digital Marketing
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
              That Drives Revenue
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto mb-12">
            A full-service digital marketing team providing Website Development, SEO, PPC, Social Media Management, 
            Content Marketing, Graphic Design, and more to boost conversions and accelerate revenue growth.
          </p>
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
                  Boost Your Revenue with InfoGrowth's Digital Marketing Services
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our customized digital marketing tactics at InfoGrowth will boost your website's traffic, leads, and income. 
                  Thanks to our specialized strategies, thorough ROI tracking, and data-driven insights generated by cutting-edge 
                  marketing technology, our digital marketing services will aid you in achieving the outcomes that are most 
                  important to your company.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We provide all the resources you require to oversee successful digital marketing initiatives, from strategy 
                  development to expert team execution. You can deal with the data points by powering the success of the clients 
                  on the basis of our comprehensive digital marketing services.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">20%+</div>
                    <div className="text-sm text-gray-600">Average ROI Increase</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">$10B+</div>
                    <div className="text-sm text-gray-600">Revenue Generated</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/digitalmarketing2.avif"
                  alt="Digital Marketing Strategy"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 w-64 border border-gray-100">
                <div className="flex items-center gap-3">
                  <ThumbsUp className="w-10 h-10 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
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
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-6">
        <Zap className="w-4 h-4" />
        Complete Digital Solutions
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Comprehensive Digital Marketing Services
      </h2>

      <p className="text-lg text-gray-600 leading-relaxed">
        Scalable, performance-driven solutions built to help modern businesses grow faster and smarter.
      </p>
    </div>

    {/* ================= GOOGLE ADS ================= */}
    <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">

      {/* Image */}
      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
        <Image
          src={serviceCategories[0].image1}
          alt="Google Ads Services"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <DollarSign className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold text-blue-700">
            Google Ads
          </span>
        </div>

        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Google Advertising Solutions
        </h3>

        <p className="text-gray-600 text-lg mb-10">
          Reach high-intent customers instantly with conversion-focused Google Ads strategies built for measurable ROI.
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

    {/* ================= GOOGLE ANALYTICS ================= */}
    <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">

      {/* Content */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
            <PieChart className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold text-emerald-700">
            Google Analytics
          </span>
        </div>

        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Advanced Analytics & Insights
        </h3>

        <p className="text-gray-600 text-lg mb-10">
          Transform raw data into actionable insights that guide smarter marketing and business decisions.
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
          alt="Analytics Dashboard"
          fill
          className="object-cover"
        />
      </div>
    </div>

    {/* ================= SEO ================= */}
    <div className="grid lg:grid-cols-2 gap-20 items-center">

      {/* Image */}
      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
        <Image
          src={serviceCategories[2].image1}
          alt="SEO Services"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white">
            <Search className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold text-purple-700">
            SEO Services
          </span>
        </div>

        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Search Engine Optimization
        </h3>

        <p className="text-gray-600 text-lg mb-10">
          Build long-term visibility and authority with proven SEO strategies that compound growth over time.
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
{/* Industries We Serve */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
              <Target className="w-4 h-4 mr-2" />
              Industries We Serve
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Specialized Digital Marketing for Your Industry
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We focus on B2C markets in USA/UK regions, serving hotels, e-commerce, and diverse industries
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
              Why Choose InfoGrowth for Digital Marketing Services?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Selecting InfoGrowth as your digital marketing partner gives you access to unrivaled expertise 
              that boosts sales and expands your company.
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
                  The Digital Marketing Services to Increase Your ROI
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our mission at InfoGrowth is to support you in increasing the following metrics and driving tangible business results:
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { metric: "Online and offline sales", icon: <DollarSign className="w-5 h-5" /> },
                    { metric: "Lead generation and quality", icon: <Users className="w-5 h-5" /> },
                    { metric: "Search engine rankings", icon: <Search className="w-5 h-5" /> },
                    { metric: "Internet presence", icon: <Globe className="w-5 h-5" /> },
                    { metric: "User experience", icon: <Smartphone className="w-5 h-5" /> },
                    { metric: "Customer loyalty", icon: <ThumbsUp className="w-5 h-5" /> },
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
                  Increase Your Return on Investment with Our Tailored Digital Marketing Services!
                </h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-8">
                Our services, which range from website design and SEO to PPC and social media advertising, are intended to 
                support your company's growth, recruitment of new customers, and exceptional performance in your sector.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Customized digital marketing strategy aligned with business goals",
                  "Transparent reporting with clear ROI calculations",
                  "Continuous optimization based on performance data",
                  "Dedicated account management and support"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
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
              Common questions about our digital marketing services and processes
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
    </main>
  );
}