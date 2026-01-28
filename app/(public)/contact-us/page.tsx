"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/app/components/ContactForm";
import Image from "next/image";

const ContactPage = () => {
  // Google Maps URL for the address
  const googleMapsUrl = "https://www.google.com/maps/place/4th+floor,+InfoGrowth,+Capital+Park,+403A,+Capital+Pk+Rd,+above+Capital+Park,+Ayyappa+Society,+VIP+Hills,+Silicon+Valley,+Madhapur,+Hyderabad,+Telangana+500081/data=!4m2!3m1!1s0x3bcb911e31e22de7:0x99f377929c8f46bd!17m2!4m1!1e3!18m1!1e1?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI2LjMuMTEYACCenQoqfiw5NDI4NjU5MCw5NDI2NzcyNyw5NDI3NTQwNyw5NDI5MjE5NSw5NDI5OTUzMiw5NDI4NDQ5MCw5NDI4MDU3Niw5NDIwNzM5NCw5NDIwNzUwNiw5NDIwODUwNiw5NDIxODY1Myw5NDIyOTgzOSw5NDI3NTE2OCw5NDI3OTYxOUICSU4%3D&skid=9ff36a25-953e-4bb9-9b35-ce924c79a96b";

  return (
    <main className="w-full overflow-hidden">

      {/* ===== Hero Section ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/contact.avif"
            alt="Contact InfoGrowth - IT Services and Staffing Solutions"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3C6D]/90 via-[#0B3C6D]/80 to-[#0B3C6D]/70" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Heading with proper spacing */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Contact Us
            </h1>
            
            {/* Description with better contrast */}
            <p className="text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl mx-auto">
              Get in touch with our expert team for personalized IT and staffing solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Content Section ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
    
          {/* ===== Left: Send a Message ===== */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Send us a Message
            </h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            <ContactForm variant="full" />
          </div>

          {/* ===== Right: Get in Touch ===== */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Ready to start your journey? Contact our expert team today for personalized guidance.
            </p>

            <div className="space-y-6">

              {/* Phone */}
              <div className="flex items-start gap-4 border border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                <div className="bg-blue-50 p-3 rounded-full flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Phone</p>
                  <a 
                    href="tel:+918247654443" 
                    className="text-gray-700 text-lg hover:text-blue-600 transition-colors inline-block mt-1"
                  >
                    +91 8247654443
                  </a>
                  <p className="text-gray-500 text-sm mt-2">
                    Mon–Fri 8AM–8PM, Sat 9AM–5PM
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 border border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                <div className="bg-blue-50 p-3 rounded-full flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Email</p>
                  <a 
                    href="mailto:Contact@infogrowth.in" 
                    className="text-gray-700 text-lg hover:text-blue-600 transition-colors inline-block mt-1"
                  >
                    Contact@infogrowth.in
                  </a>
                  <p className="text-gray-500 text-sm mt-2">
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 border border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                <div className="bg-blue-50 p-3 rounded-full flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
  <p className="font-semibold text-gray-900 text-lg">Address</p>

  <a
    href={googleMapsUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800 text-lg mt-1 inline-block transition-colors"
  >
    Capital Park, 4th Floor, Office 403
    <span className="block text-gray-700 text-base">
      Hyderabad, Telangana
    </span>
  </a>

  <p className="text-gray-500 text-sm mt-2">
    Click to open in Google Maps
  </p>
</div>

              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4 border border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                <div className="bg-blue-50 p-3 rounded-full flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Business Hours</p>
                  <p className="text-gray-700 text-lg mt-1">
                    Monday – Saturday: 8AM – 8PM
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Sunday: Closed
                  </p>
                </div>
              </div>

            </div>

            {/* Additional Info */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-gray-900 text-lg mb-3">Why Choose InfoGrowth?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>24/7 dedicated support team</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Industry-leading expertise</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Customized solutions for your business</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default ContactPage;   