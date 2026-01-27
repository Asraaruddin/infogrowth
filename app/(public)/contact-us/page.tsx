"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/app/components/ContactForm";

const ContactPage = () => {
  return (
    <main className="w-full">

      {/* ===== Hero Section ===== */}
      <section className="bg-gradient-to-r from-[#0B3C6D] to-[#1E6BB8] py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact Us
        </h1>
        <p className="max-w-2xl mx-auto text-white/90 text-lg">
          Get in touch with our expert team for personalized IT and staffing solutions.
        </p>
      </section>

      {/* ===== Content Section ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
    
          {/* ===== Left: Send a Message ===== */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Send us a Message
            </h2>
            <p className="text-gray-600 mb-10">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <ContactForm variant="full" />
          </div>

          {/* ===== Right: Get in Touch ===== */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-10">
              Ready to start your journey? Contact our expert team today for personalized guidance.
            </p>

            <div className="space-y-6">

              {/* Phone */}
              <div className="flex items-start gap-4 border rounded-xl p-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-700">+91 8247654443</p>
                  <p className="text-sm text-gray-500">
                    Mon–Fri 8AM–8PM, Sat 9AM–5PM
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 border rounded-xl p-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-700">Contact@infogrowth.in</p>
                  <p className="text-sm text-gray-500">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 border rounded-xl p-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    Capital park  4th  floor  403 
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4 border rounded-xl p-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Clock className="text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold">Business Hours</p>
                  <p className="text-gray-700">
                    Monday – Saturday: 8AM – 8PM
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default ContactPage;