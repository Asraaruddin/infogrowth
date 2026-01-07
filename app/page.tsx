"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Users,
  Target,
  Rocket,
  Layers,
  Code2,
  Briefcase,
  Network,
  CheckCircle,
  Globe,
  Award,
} from "lucide-react";

/* ================= CAROUSEL DATA ================= */
const slides = [
  {
    src: "/carousel1.avif",
    title: "Empowering Businesses Through Technology",
    subtitle: "Scalable IT solutions built for growth",
    overlay: true,
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="w-full overflow-hidden">
      {/* ================= HERO CAROUSEL ================= */}
      <section className="relative h-[90vh]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000
            ${current === index ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"}`}
          >
            <Image
              src={slide.src}
              alt="carousel"
              fill
              className="object-cover"
              priority={index === 0}
            />

            {slide.overlay && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#05325A]/70 via-[#05325A]/50 to-transparent" />
            )}

            {slide.title && (
              <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className="text-white max-w-3xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl">
                    {slide.subtitle}
                  </p>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center mt-10 bg-white text-[#05325A] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    Get Started
                    <Rocket className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ================= WHO WE ARE SECTION ================= */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Who We Are
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              InfoGrowth is a technology and staffing solutions company enabling
              organizations to scale faster. Every solution we deliver is built
              around innovation, reliability, and long-term value.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <OverviewCard
              icon={<Target className="w-7 h-7" />}
              title="Our Vision"
              description="To be a globally trusted digital partner enabling businesses to unlock their full potential through technology."
              points={[
                "Drive sustainable digital transformation",
                "Empower innovation-led organizations",
                "Create measurable business outcomes",
              ]}
            />

            <OverviewCard
              icon={<Rocket className="w-7 h-7" />}
              title="Our Mission"
              description="We help organizations succeed by delivering scalable technology solutions and high-quality talent."
              points={[
                "Deliver future-ready digital solutions",
                "Maintain speed without compromising quality",
                "Adopt modern, secure architectures",
              ]}
            />

            <OverviewCard
              icon={<Users className="w-7 h-7" />}
              title="Who We Serve"
              description="We work with businesses across industries and growth stages, adapting to their unique needs."
              points={[
                "Startups & scale-ups",
                "Mid-size & enterprise companies",
                "Global technology-driven teams",
              ]}
            />

            <OverviewCard
              icon={<Layers className="w-7 h-7" />}
              title="Why InfoGrowth"
              description="Our strength lies in combining domain expertise with agility and a customer-first mindset."
              points={[
                "Experienced technology professionals",
                "Flexible engagement models",
                "Proven delivery excellence",
              ]}
            />
          </div>

          {/* Stats Section */}
          <div className="mt-24 pt-16 border-t border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-12">
              Our Impact in Numbers
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={<Briefcase className="w-6 h-6" />}
                value="10+"
                label="Years Experience"
              />
              <StatCard
                icon={<Users className="w-6 h-6" />}
                value="250+"
                label="Skilled Professionals"
              />
              <StatCard
                icon={<Globe className="w-6 h-6" />}
                value="5+"
                label="Global Regions"
              />
              <StatCard
                icon={<Award className="w-6 h-6" />}
                value="100+"
                label="Successful Projects"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              What We Do
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Comprehensive technology solutions tailored to drive your business forward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Code2 className="w-7 h-7" />}
              title="Web & App Development"
              text="Enterprise-grade applications using modern technologies with focus on performance and scalability."
              gradient="from-blue-500 to-cyan-500"
            />
            <ServiceCard
              icon={<Network className="w-7 h-7" />}
              title="IT Consulting"
              text="Strategy-driven consulting to scale technology operations and optimize digital transformation."
              gradient="from-purple-500 to-pink-500"
            />
            <ServiceCard
              icon={<Briefcase className="w-7 h-7" />}
              title="Staffing Solutions"
              text="Right talent for the right role at the right time with our extensive network of professionals."
              gradient="from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* ================= CLIENTS & PARTNERS ================= */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    {/* Heading */}
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold mb-4">
        Trusted By
      </span>
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Our Clients & Partners
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Driving innovation and technology excellence with leading global partners
      </p>
    </div>

    {/* Logos Grid */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
      {[
        { src: "/aws.png", alt: "AWS" },
        { src: "/Google-Cloud-Logo.png", alt: "Google Cloud" },
        { src: "/google-marketing-platform.png", alt: "Google Marketing Platform" },
        { src: "/Redington.png", alt: "Redington" },
        { src: "/Microsoft-Azure-Symbol.png", alt: "Microsoft Azure" },
      ].map((logo, index) => (
        <div
          key={index}
          className="
            h-32
            flex items-center justify-center
            bg-gray-50 rounded-2xl
            hover:bg-white hover:shadow-lg
            transition-all duration-300
            group
          "
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={160}
            height={80}
            className="
              max-h-12
              w-auto
              object-contain
              grayscale opacity-70
              group-hover:grayscale-0 group-hover:opacity-100
              transition duration-300
            "
          />
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ================= QUICK INQUIRY ================= */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get answers to your questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our clients turn to us to help them reimagine ways of working with technology.
            </p>
          </div>

          {/* FORM CARD */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 md:p-12">
            <form className="grid md:grid-cols-2 gap-6">
              {[
                { placeholder: "Name*", type: "text" },
                { placeholder: "Email*", type: "email" },
                { placeholder: "Organization*", type: "text" },
                { placeholder: "Contact Number*", type: "tel" },
              ].map((field, index) => (
                <div key={index} className="relative">
                  <input
                    type={field.type}
                    className="w-full border border-gray-300 rounded-xl px-5 py-4
                             focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500
                             text-gray-700 transition-all duration-300 bg-white"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-xl px-5 py-4
                           focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500
                           text-gray-700 bg-white appearance-none"
                >
                  <option>Region*</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia Pacific</option>
                  <option>Middle East</option>
                </select>
              </div>

              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-xl px-5 py-4
                           focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500
                           text-gray-700 bg-white appearance-none"
                >
                  <option>Inquiry Type*</option>
                  <option>Web Development</option>
                  <option>IT Consulting</option>
                  <option>Staffing Solutions</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <textarea
                  className="w-full border border-gray-300 rounded-xl px-5 py-4
                           focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500
                           text-gray-700 h-44 resize-none bg-white transition-all duration-300"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              {/* PRIVACY */}
              <div className="md:col-span-2 flex items-start gap-4">
                <div className="flex items-center h-6">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  I agree to the processing of my personal data as described in the{" "}
                  <span className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700">
                    Privacy Notice
                  </span>
                  .
                </p>
              </div>

              {/* SUBMIT */}
              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 
                           rounded-xl font-semibold hover:shadow-2xl hover:-translate-y-1 
                           transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Submit Inquiry
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-gray-500 text-sm text-center mt-4">
                  We'll respond within 24 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

interface OverviewCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
}

function OverviewCard({ icon, title, description, points }: OverviewCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-8 text-left shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 mb-7 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>

      {/* Points */}
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-gray-700 group-hover:text-gray-800 transition-colors"
          >
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  gradient?: string;
}

function ServiceCard({ icon, title, text, gradient = "from-blue-500 to-blue-600" }: ServiceCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group border border-gray-100">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-7 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {text}
      </p>
      <div className="mt-8 pt-6 border-t border-gray-100">
        <Link
          href="/services"
          className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
        >
          Learn more
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-4xl font-bold text-gray-900 mb-2">{value}</h4>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  );
}