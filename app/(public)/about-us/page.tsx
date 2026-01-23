// app/about/page.tsx
import Image from "next/image";
import {
  Code2,
  Target,
  Rocket,
  Users,
  Globe,
  Layers,
  CheckCircle,
  MapPin,
  Calendar,
  Building,
  ArrowRight,
  TrendingUp,
  Shield,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/aboutusbg.jpg"
            alt="InfoGrowth About Us Background"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-blue-900/30"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 border border-white/40 text-white">
  Our Story
</span>

          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
            <span className=" text-white">About</span> <span className="  text-[#3f7ec1]">Info</span><span className="text-[#96bb57]">Growth</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto text-white/90 leading-relaxed mb-12 px-4">
            Empowering businesses worldwide through digital transformation,
            innovation, and technology-driven solutions that deliver measurable impact.
          </p>

          {/* Stats/Chips Section */}
         <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-3xl mx-auto">
  <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl border border-white/40 hover:bg-white/30 transition-all duration-300 shadow-lg">
    <Globe className="w-5 h-5 text-white flex-shrink-0" />
    <span className="font-medium text-white">Global Presence</span>
  </div>

  <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl border border-white/40 hover:bg-white/30 transition-all duration-300 shadow-lg">
    <TrendingUp className="w-5 h-5 text-white flex-shrink-0" />
    <span className="font-medium text-white">Growth Focused</span>
  </div>

  <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl border border-white/40 hover:bg-white/30 transition-all duration-300 shadow-lg">
    <Shield className="w-5 h-5 text-white flex-shrink-0" />
    <span className="font-medium text-white">Trusted Partner</span>
  </div>
</div>

        </div>
      </section>

      {/* WHY INFOGROWTH */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
                  Our Foundation
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Why InfoGrowth Was Founded
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  InfoGrowth was founded with a clear purpose — to help organizations
                  embrace digital transformation and unlock sustainable growth.
                  We saw businesses struggling with fragmented technology,
                  inefficient operations, and limited digital visibility.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Inspired by the belief of <strong className="text-blue-600 font-semibold">"Hope with InfoGrowth"</strong>,
                  we created a company that partners with clients as collaborators,
                  not just service providers. Our focus is on innovation, agility,
                  and measurable impact.
                </p>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Technology Innovation",
                    "Client Partnership",
                    "Global Expertise",
                    "Sustainable Growth",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative group">
              <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/aboutuspic.png"
                  alt="Digital Transformation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-56 sm:w-64">
                <HeartHandshake className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-3 sm:mb-4" />
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Partnering for Success</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Building lasting relationships that drive growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR GLOBAL TEAM */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative group order-2 lg:order-1">
              <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/aboutus.png"
                  alt="Our Global Team"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white p-5 sm:p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">250+</div>
                    <div className="text-xs sm:text-sm text-gray-600">Global Experts</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <span className="inline-block px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-semibold mb-6">
                  Our Team
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Global Talent, Local Impact
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our diverse team of experts spans across continents, bringing together
                  unique perspectives, skills, and cultural insights to deliver
                  exceptional solutions for our clients.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We believe in nurturing talent and fostering innovation through
                  continuous learning and collaborative work environments that
                  empower our team to do their best work.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Global Reach</h4>
                  <p className="text-gray-600 text-sm">Operational excellence across 5+ regions</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-4">
                    <Building className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Expert Network</h4>
                  <p className="text-gray-600 text-sm">Specialized professionals across domains</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold mb-6">
              Worldwide Operations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Global Presence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Strategic locations enabling seamless service delivery across time zones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <PresenceCard
              icon={<Calendar className="w-8 h-8" />}
              title="Founded in 2020"
              description="Established with a vision to deliver global-class digital and technology services."
              gradient="from-blue-500 to-cyan-500"
            />
            <PresenceCard
              icon={<MapPin className="w-8 h-8" />}
              title="Worldwide Locations"
              description="Operations across India, Philippines, and the United States with strategic partners."
              gradient="from-purple-500 to-pink-500"
            />
            <PresenceCard
              icon={<Layers className="w-8 h-8" />}
              title="Group of Companies"
              description="Includes Infopharma LLC, Epresentkart LLC, InfoCloud LLC, and more."
              gradient="from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* EVOLUTION */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Evolution Timeline
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From a visionary startup to a trusted global technology partner
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500 hidden md:block"></div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 relative">
              <JourneyCard
                year="2020"
                title="The Beginning"
                text="InfoGrowth founded with a focus on digital marketing and consulting, laying the foundation for growth."
                position="left"
              />
              <JourneyCard
                year="2022"
                title="Expansion Era"
                text="Expanded into BPO, cloud services, and global client engagement with strategic partnerships."
                position="center"
              />
              <JourneyCard
                year="Today"
                title="Global Partner"
                text="A multi-service technology partner helping enterprises scale efficiently across industries."
                position="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Core Philosophy
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Guiding principles that shape our approach and define our purpose
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            <MissionVision
              icon={<Target className="w-10 h-10" />}
              title="Our Mission"
              text="To empower organizations with technology-driven solutions that improve efficiency, accelerate growth, and create long-term value for stakeholders."
              gradient="from-blue-500 to-blue-600"
              points={[
                "Drive digital transformation",
                "Accelerate business growth",
                "Create sustainable value"
              ]}
            />

            <MissionVision
              icon={<Rocket className="w-10 h-10" />}
              title="Our Vision"
              text="To become a globally trusted digital transformation partner, driving innovation across industries and shaping the future of business."
              gradient="from-cyan-500 to-blue-500"
              points={[
                "Global technology leadership",
                "Innovation across industries",
                "Future-ready solutions"
              ]}
            />
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-6">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Comprehensive Solutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              End-to-end services designed to meet your business needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: "Digital Marketing Solutions",
                description: "Data-driven strategies for growth",
                icon: "📈",
                color: "bg-blue-50 text-blue-600",
                href: "/services/digital-marketing"
              },
              {
                title: "Technology & Cloud Services",
                description: "Scalable infrastructure solutions",
                icon: "☁️",
                color: "bg-cyan-50 text-cyan-600",
                href: "/services/cloud-services"
              },
              {
                title: "IT Services",
                description: "Web Development & Applications",
                icon: "</>",
                color: "bg-purple-50 text-purple-600",
                href: "/services/managed-it-services"
              },
              {
                title: "Customer Care & BPO",
                description: "24/7 customer support solutions",
                icon: "👥",
                color: "bg-green-50 text-green-600",
                href: "/services/bpo-services"
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${service.color} flex items-center justify-center text-2xl mb-6`}>
                  {service.icon}
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-6">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:gap-2 transition-all"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white text-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            Ready to Transform Your Business?
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-12">
            Join hundreds of businesses that trust InfoGrowth for their digital
            transformation journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:bg-slate-800 hover:shadow-2xl transition-all duration-300"
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

/* COMPONENTS */

function PresenceCard({ icon, title, description, gradient }: any) {
  return (
    <div className="group bg-white p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
        {description}
      </p>
    </div>
  );
}

function JourneyCard({ year, title, text, position }: any) {
  return (
    <div className={`relative bg-white p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${position === 'center' ? 'md:mt-8 lg:mt-12' : ''}`}>
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold shadow-lg text-sm sm:text-base">
        {year}
      </div>
      <div className="pt-6 sm:pt-8">
        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{title}</h4>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{text}</p>
      </div>
      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full hidden md:block"></div>
    </div>
  );
}

function MissionVision({ icon, title, text, gradient, points }: any) {
  return (
    <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-6 sm:mb-8`}>
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{title}</h3>
      <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">{text}</p>
      <ul className="space-y-3 sm:space-y-4">
        {points.map((point: string, index: number) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-700 font-medium text-sm sm:text-base">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}