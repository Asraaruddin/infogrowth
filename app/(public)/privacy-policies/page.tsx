// app/privacy-policy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | InfoGrowth Limited",
  description:
    "Privacy policy explaining how InfoGrowth Limited collects, uses, stores, and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Fixed for navbar */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-8">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-semibold">Legal Document</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Privacy Policy
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
              InfoGrowth Limited is committed to respecting your privacy and safeguarding your personal information.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Last Updated: December 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <span>Version 3.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
        {/* Table of Contents */}
        <div className="mb-12 p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Navigation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="#section-1" className="group p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm">I</span>
                </div>
                <span className="text-gray-700 group-hover:text-blue-700 font-medium">Information Collection</span>
              </div>
            </a>
            
            <a href="#section-4" className="group p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-gray-700 group-hover:text-green-700 font-medium">Cookie Policy</span>
              </div>
            </a>
            
            <a href="#section-5" className="group p-4 bg-gray-50 hover:bg-purple-50 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-gray-700 group-hover:text-purple-700 font-medium">Data Rights</span>
              </div>
            </a>
            
            <a href="#section-9" className="group p-4 bg-gray-50 hover:bg-red-50 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-gray-700 group-hover:text-red-700 font-medium">Contact Us</span>
              </div>
            </a>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Intro Section */}
          <div id="intro" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Introduction</h2>
                <p className="text-gray-600">Our commitment to your privacy</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                InfoGrowth Limited, hereinafter referred to as{" "}
                <strong className="text-blue-700">InfoGrowth</strong>, is committed to respecting your privacy and choices while using our website. This privacy statement outlines how we collect, use, and protect the Personal Information we hold about you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">Data Protection</h4>
                </div>
                <p className="text-gray-700 text-sm">Industry-standard encryption and security measures</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">No Third-Party Sharing</h4>
                </div>
                <p className="text-gray-700 text-sm">Your data is never sold or shared without consent</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">Transparent Practices</h4>
                </div>
                <p className="text-gray-700 text-sm">Clear policies with regular updates</p>
              </div>
            </div>
          </div>

          {/* Section I */}
          <div id="section-1" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 scroll-mt-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-700 font-bold text-xl">I</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information We May Collect and Process</h2>
                <p className="text-gray-600">What data we collect and how we use it</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-indigo-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Definition of Personal Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  Personal Information refers to any data that can identify an individual, either directly or indirectly, and which is in the possession of InfoGrowth.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Technical Data</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    You may browse our website without providing Personal Information. However, technical data such as IP address, demographics, operating system, and browser type may be collected for usability, troubleshooting, and analytics.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Contact Information</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    When you request information or services, we may collect Personal Information such as your name, email address, and telephone number.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h4 className="font-semibold text-gray-900">Important Note</h4>
                </div>
                <p className="text-gray-700">
                  We only collect information necessary to provide our services and improve user experience. We never collect sensitive information without explicit consent.
                </p>
              </div>
            </div>
          </div>

          {/* Section II */}
          <div id="section-2" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 scroll-mt-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-red-700 font-bold text-xl">II</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Consequences of Not Providing Personal Information</h2>
                <p className="text-gray-600">What happens when you choose not to share data</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Limited Service Access</h3>
                  <p className="text-gray-600">Some features may be unavailable</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-red-200">
                <p className="text-gray-700 leading-relaxed text-lg">
                  If you choose not to provide mandatory Personal Information required to process your request, InfoGrowth may not be able to provide the requested service. However, you can still browse our website and access publicly available information.
                </p>
              </div>
            </div>
          </div>

          {/* Section III */}
          <div id="section-3" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 scroll-mt-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-purple-700 font-bold text-xl">III</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Recipients, Transfer, and Disclosure</h2>
                <p className="text-gray-600">How we share and protect your information</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">No Marketing Sharing</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    InfoGrowth does not share Personal Information with third parties for marketing purposes without your explicit consent.
                  </p>
                </div>

                <div className="p-6 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Service Partners</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Personal Information may be shared within InfoGrowth, its affiliates, business partners, service providers, or authorized agents worldwide for processing, storage, or service delivery, subject to contractual data protection obligations.
                  </p>
                </div>

                <div className="p-6 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Legal Requirements</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    We may disclose Personal Information to law enforcement or regulatory authorities when required by law.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">International Data Transfers</h4>
                <p className="text-gray-700">
                  When we transfer data internationally, we ensure appropriate safeguards are in place, including standard contractual clauses and adherence to global data protection standards.
                </p>
              </div>
            </div>
          </div>

          {/* Section IV */}
          <div id="section-4" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 scroll-mt-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-green-700 font-bold text-xl">IV</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Use of Cookies</h2>
                <p className="text-gray-600">How we use cookies to enhance your experience</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Cookie Types Explained</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900">Session Cookies</h4>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Temporary cookies that expire when you close your browser and help with navigation and secure access.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900">Persistent Cookies</h4>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Stored after sessions end to remember preferences such as language or region.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cookie Management</h4>
                    <p className="text-gray-700">
                      You can manage or disable cookies via browser settings. Disabling cookies may impact certain website features. Most browsers allow you to control cookies through their settings preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section V */}
          <div id="section-5" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 scroll-mt-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-blue-700 font-bold text-xl">V</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Access, Correction, and Objection</h2>
                <p className="text-gray-600">Your rights regarding personal data</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Data Rights</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  You have the right to access, update, or correct your Personal Information
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Right to Access</h4>
                  <p className="text-gray-700 text-sm">Request a copy of your personal data</p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Right to Rectification</h4>
                  <p className="text-gray-700 text-sm">Correct inaccurate personal data</p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Right to Object</h4>
                  <p className="text-gray-700 text-sm">Object to processing of your data</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-4">How to Exercise Your Rights</h4>
                <p className="text-gray-700 mb-4">
                  Subject to applicable laws, you may access, update, or correct your Personal Information by contacting us at:
                </p>
                <a
                  href="mailto:Contact@infogrowth.in"
                  className="inline-flex items-center gap-3 text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89-4.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact@infogrowth.in
                </a>
                <p className="text-gray-600 text-sm mt-4">We respond to all requests within 30 days</p>
              </div>
            </div>
          </div>

          {/* Section VI */}
          <div id="section-6" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 scroll-mt-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-700 font-bold text-xl">VI</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Security</h2>
                <p className="text-gray-600">How we protect your information</p>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-r from-gray-900 to-slate-800 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">Enterprise-Grade Security</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-center mb-2">Access Controls</h4>
                  <p className="text-gray-300 text-sm text-center">Role-based access with multi-factor authentication</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-center mb-2">Encryption</h4>
                  <p className="text-gray-300 text-sm text-center">End-to-end encryption for data in transit and at rest</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-center mb-2">Monitoring</h4>
                  <p className="text-gray-300 text-sm text-center">24/7 security monitoring and threat detection</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <p className="text-white text-lg text-center">
                  InfoGrowth implements reasonable administrative, physical, and technical safeguards to protect Personal Information against unauthorized access or disclosure.
                </p>
              </div>
            </div>
          </div>

          {/* Section VII */}
          <div id="section-7" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 scroll-mt-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-gray-700 font-bold text-xl">VII</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Retention</h2>
                <p className="text-gray-600">How long we keep your information</p>
              </div>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Retention Periods</h3>
                  <p className="text-gray-600">Data is kept only as long as necessary</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Business Purposes</h4>
                  <p className="text-gray-700 text-sm">
                    Personal Information is retained only as long as required for the purpose for which it was collected.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Legal Compliance</h4>
                  <p className="text-gray-700 text-sm">
                    Data may be retained longer when required by law, regulation, or contractual obligations.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h4 className="font-semibold text-gray-900">Data Deletion</h4>
                </div>
                <p className="text-gray-700">
                  Once the retention period expires, personal data is securely deleted or anonymized.
                </p>
              </div>
            </div>
          </div>

          {/* Section VIII */}
          <div id="section-8" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 scroll-mt-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-blue-700 font-bold text-xl">VIII</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Linked Websites</h2>
                <p className="text-gray-600">Third-party websites and services</p>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">External Links Disclaimer</h3>
                  <p className="text-gray-600">Our website may contain links to other sites</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-blue-200">
                <p className="text-gray-700 text-lg">
                  InfoGrowth may link to third-party websites. We are not responsible for their privacy practices or content. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>
            </div>
          </div>

          {/* Section IX */}
          <div id="section-9" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 scroll-mt-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-green-700 font-bold text-xl">IX</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">How to Contact Us</h2>
                <p className="text-gray-600">Get in touch with our privacy team</p>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy Office Contact</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  For any questions regarding this Privacy Policy or to exercise your data rights
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89-4.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                  <a
                    href="mailto:Contact@infogrowth.in"
                    className="text-lg font-semibold text-green-600 hover:text-green-700 transition-colors"
                  >
                    Contact@infogrowth.in
                  </a>
                  <p className="text-gray-600 text-sm mt-2">Primary contact method</p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Data Protection Officer</h4>
                  <p className="text-gray-700">Designated DPO available for complex queries</p>
                  <p className="text-gray-600 text-sm mt-2">Response within 48 hours</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-xl border border-green-200">
                <p className="text-gray-700 text-center">
                  For any questions regarding this Privacy Policy, contact us at{" "}
                  <a
                    href="mailto:Contact@infogrowth.in"
                    className="font-semibold text-green-600 hover:text-green-700 hover:underline"
                  >
                    Contact@infogrowth.in
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Section X */}
          <div id="section-10" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 scroll-mt-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-purple-700 font-bold text-xl">X</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Updates to This Privacy Statement</h2>
                <p className="text-gray-600">How we handle policy changes</p>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Policy Updates</h3>
                  <p className="text-gray-600">We continuously improve our privacy practices</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-purple-200">
                <p className="text-gray-700 text-lg mb-6">
                  InfoGrowth may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, and other factors. Updates will be published on this page while our commitment to privacy remains unchanged.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Notification</h4>
                    <p className="text-gray-700 text-sm">
                      We will notify users of significant changes through email or website notices.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Review Period</h4>
                    <p className="text-gray-700 text-sm">
                      We encourage you to review this policy periodically to stay informed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Documents */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/terms-and-conditions" 
              className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-700">Terms & Conditions</h4>
                  <p className="text-gray-600 text-sm">Service agreement and legal terms</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Read our comprehensive terms of service and legal agreement
              </p>
            </Link>
            
            <Link 
              href="/payment-policy" 
              className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-green-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-green-700">Payment Policy</h4>
                  <p className="text-gray-600 text-sm">Payment terms and refund policy</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Understand our payment terms, refunds, and cancellation policies
              </p>
            </Link>
            
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Need Help?</h4>
                  <p className="text-gray-600 text-sm">Contact our support team</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Have questions about our policies? Our team is here to help you.
              </p>
              <a 
                href="mailto:support@infogrowth.in" 
                className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-700"
              >
                support@infogrowth.in →
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}