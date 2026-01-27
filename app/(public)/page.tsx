"use client";

import Image from "next/image";
import Link from "next/link";
import ContactForm from '@/app/components/ContactForm'
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
  ArrowRight,
  Cloud,
} from "lucide-react";

interface ServiceWideCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

interface OverviewCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  gradient?: string;
  href: string;
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface HighlightCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

function ServiceWideCard({ icon, title, description, href }: ServiceWideCardProps) {
  return (
    <Link href={href} className="group" aria-label={`Learn more about ${title}`}>
      <div
        className="
          h-full
          bg-white
          border border-gray-200
          rounded-2xl
          p-6
          flex items-start gap-4
          hover:border-blue-500
          hover:shadow-lg
          transition-all duration-300
        "
      >
        <div
          className="
            flex-shrink-0
            w-12 h-12
            rounded-xl
            bg-blue-50
            text-blue-600
            flex items-center justify-center
            group-hover:bg-blue-600
            group-hover:text-white
            transition
          "
        >
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

function OverviewCard({ icon, title, description, points }: OverviewCardProps) {
  return (
    <article className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 text-left shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>

      <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
        {description}
      </p>

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
    </article>
  );
}

function ServiceCard({ icon, title, text, gradient = "from-blue-500 to-blue-600", href }: ServiceCardProps) {
  return (
    <article className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group border border-gray-100">
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
        {text}
      </p>
      <div className="mt-8 pt-6 border-t border-gray-100">
        <Link
          href={href}
          className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors group/link"
          aria-label={`Learn more about ${title} services`}
        >
          Learn more
          <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

function LogoCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        h-28 md:h-36
        flex items-center justify-center
        bg-gray-50
        rounded-2xl
        transition-all duration-300
        hover:bg-white hover:shadow-lg
      "
    >
      {children}
    </div>
  );
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-5 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{value}</h4>
      <p className="text-gray-600 font-medium text-sm md:text-base">{label}</p>
    </div>
  );
}

function HighlightCard({ title, description, icon, delay }: HighlightCardProps) {
  return (
    <div 
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="w-full overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center pt-24">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/home.jpg"
            alt="InfoGrowth Technology Solutions - Empowering businesses through digital transformation"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05325A]/50 via-[#05325A]/45 to-transparent" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* LEFT-ONLY CONTENT */}
          <div className="max-w-3xl">
            {/* Heading */}
            <h1
              className="
                text-white
                font-semibold
                leading-snug
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                mb-4
                max-w-2xl
              "
            >
              Empowering Businesses Through{" "}
              <span className="text-[#96bb57] font-bold">
                Technology
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mb-12">
              Delivering comprehensive technology solutions that empower businesses
              to grow faster, operate efficiently, and scale with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                href="/contact-us"
                className="
                  inline-flex items-center justify-center
                  px-8 py-4 rounded-full font-semibold text-white
                  bg-gradient-to-r from-[#96bb57] to-[#3f7ec1]
                  hover:scale-[1.03] hover:shadow-xl
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent
                "
                aria-label="Consult with InfoGrowth for technology solutions"
              >
                Consult Us
              </Link>

              <Link
                href="/services"
                className="
                  inline-flex items-center justify-center
                  px-8 py-4 rounded-full font-semibold text-white
                  bg-white/10 backdrop-blur-sm border border-white/30
                  hover:bg-white/20 transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent
                "
                aria-label="Explore InfoGrowth technology services"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE SECTION ================= */}
      <section
        id="about"
        className="
          relative py-24
          overflow-hidden
        "
      >
        {/* Background image */}
        <div
          className="
            absolute inset-0
            hidden md:block
            bg-no-repeat bg-center bg-cover
          "
          style={{ backgroundImage: "url('/bg.png')" }}
          aria-hidden="true"
        />

        {/* Seam-fixing gradient (IMPORTANT) */}
        <div className="absolute inset-0 bg-gradient-to-b 
          from-[#041E3A]/90 
          via-[#041E3A]/85 
          to-[#041E3A] 
        " />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header */}
          <div className="mb-20">
            <span className="inline-block px-4 py-2 bg-white/10 text-blue-300 rounded-full text-sm font-semibold mb-4 backdrop-blur">
              About Us
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Who We Are
            </h2>

            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              InfoGrowth is a technology and staffing solutions company enabling
              organizations to scale faster. Every solution we deliver is built
              around innovation, reliability, and long-term value.
            </p>
          </div>

          {/* Cards – ONLY 2 (clean & premium) */}
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
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
          </div>

          {/* Stats Section */}
          <div className="mt-28 pt-16 border-t border-white/10">
            <h3 className="text-3xl font-bold text-white mb-12">
              Our Impact in Numbers
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={<Briefcase className="w-6 h-6" />}
                value="6+"
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
                value="110+"
                label="Successful Projects"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CLIENTS & PARTNERS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[
              { src: "/awslogo.png", alt: "Amazon Web Services (AWS) Cloud Computing Platform", scale: "scale-110" },
              { src: "/GoogleCloudlogo.png", alt: "Google Cloud Platform Cloud Computing Services", scale: "scale-145" },
              { src: "/google-marketing-platform.png", alt: "Google Marketing Platform Digital Marketing Solutions", scale: "scale-100" },
              { src: "/Microsoft-Azure-Symbol.png", alt: "Microsoft Azure Cloud Computing Services", scale: "scale-105" },
            ].map((logo, index) => (
              <div
                key={index}
                className="
                  h-28 md:h-36
                  bg-gray-50
                  rounded-2xl
                  flex items-center justify-center
                  transition-all duration-300
                  hover:bg-white hover:shadow-lg
                "
              >
                {/* LOGO WRAPPER */}
                <div className="relative w-44 h-16 md:w-48 md:h-20">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className={`object-contain ${logo.scale}`}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUICK INQUIRY ================= */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="contact">
        <ContactForm 
          variant="quick"
          title="Get answers to your questions"
          description="Our clients turn to us to help them reimagine ways of working with technology."
        />
      </section>
    </main>
  );
}