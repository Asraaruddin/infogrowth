import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const page = () => {
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
              Fill out the form below and we’ll get back to you as soon as possible.
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#0B3C6D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#09325A] transition"
              >
                Send Message
              </button>
            </form>
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
                  <p className="text-gray-700">+1 (555) 123-4567</p>
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
                  <p className="text-gray-700">infogrowth@gmail.com</p>
                  <p className="text-sm text-gray-500">
                    We’ll respond within 24 hours
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
                    href="https://share.google/eZZkYohXQCkCQXsd6"
                    target="_blank"
                    className="text-blue-700 hover:underline"
                  >
                    123 Business Avenue, City, State 12345
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
                    Monday – Friday: 8AM – 8PM
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

export default page;
