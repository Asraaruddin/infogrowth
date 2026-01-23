// app/payment-policy/page.tsx
import React from 'react';

const PaymentPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Fixed positioning & improved spacing */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-r from-indigo-900 to-blue-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              Payment Policy
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
              Clear guidelines on payments, refunds, and terms of service for InfoGrowth Pvt Ltd.
            </p>
            <div className="inline-flex items-center space-x-2 text-gray-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base">Last Updated: December 2023</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 -mt-6 sm:-mt-8 lg:-mt-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Table of Contents - Improved responsive layout */}
          <div className="mb-12 p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Contents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <a href="#payment-terms" className="group flex items-center p-4 bg-gray-50 hover:bg-indigo-50 rounded-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-gray-700 group-hover:text-indigo-600 font-medium transition-colors">Payment Terms & Conditions</span>
              </a>
              <a href="#refund-cancellation" className="group flex items-center p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-gray-700 group-hover:text-green-600 font-medium transition-colors">Refund & Cancellation Policy</span>
              </a>
              <a href="#digital-marketing" className="group flex items-center p-4 bg-gray-50 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-gray-700 group-hover:text-purple-600 font-medium transition-colors">Digital Marketing Refunds</span>
              </a>
              <a href="#legal-terms" className="group flex items-center p-4 bg-gray-50 hover:bg-red-50 rounded-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-gray-700 group-hover:text-red-600 font-medium transition-colors">Legal Terms & Conditions</span>
              </a>
            </div>
          </div>

          {/* Payment Terms Section */}
          <section id="payment-terms" className="mb-16 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 gap-4">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Payment Terms & Conditions</h2>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-gray-900">Advance Payment</p>
                </div>
                <p className="text-gray-700 text-lg">
                  Payments for the services offered by InfoGrowth shall be on a <span className="font-bold text-indigo-700">100% advance basis</span>. Refund if any will be at the sole discretion of InfoGrowth Pvt Ltd.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-gray-900">Service Guarantees & Liabilities</p>
                </div>
                <div className="space-y-4">
                  <p>
                    IPL offers no guarantees whatsoever for the accuracy or timeliness of the refunds reaching the Customers card/bank accounts. IPL gives no guarantees of server uptime or applications working properly.
                  </p>
                  <p>
                    All is on a <span className="font-bold">best effort basis</span> and liability is limited to refund of amount only. IPL undertakes no liability for free services.
                  </p>
                  <p>
                    IPL reserves its right to amend / alter or change all or any disclaimers or terms of agreements at any time without any prior notice.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 bg-indigo-50 rounded-2xl border border-indigo-100 hover:border-indigo-200 transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-indigo-900">Set-off Rights</h4>
                  </div>
                  <p className="text-gray-700">
                    Subscriber/user acknowledges and agrees that InfoGrowth, at its sole discretion and without prejudice to other rights and remedies that it may have under the applicable laws, shall be entitled to set off the amount paid or payable by a subscriber/user against any amount(s) payable by Subscriber/user to IPL under any other agreement or commercial relationship towards other products/services.
                  </p>
                </div>

                <div className="p-6 sm:p-8 bg-indigo-50 rounded-2xl border border-indigo-100 hover:border-indigo-200 transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-indigo-900">Data Publication Rights</h4>
                  </div>
                  <p className="text-gray-700">
                    InfoGrowth Pvt Ltd. further reserves its right to post the data on the website InfoGrowth or on such other affiliated sites and publications as InfoGrowth Pvt Ltd. may deem fit and proper at no extra cost to the subscriber / user.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Refund & Cancellation Policy */}
          <section id="refund-cancellation" className="mb-16 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Refund & Cancellation Policy</h2>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 mb-8 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Cancellation Timeline</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">5</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Within 5 Days</h4>
                  </div>
                  <p className="text-gray-700">
                    Full refund will be made if you decide to cancel our services within 5 days of making the payment.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-yellow-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">5+</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">After 5 Days</h4>
                  </div>
                  <p className="text-gray-700">
                    If you choose to terminate our services after the initial 5 days then you will be charged an amount equivalent to the working hours put into the project. The balance will be credited to the account from which you made payment within 45 days of cancellation.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">10</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Service Renewal</h4>
                  </div>
                  <p className="text-gray-700">
                    Cancellation of any service renewal should be done 10 days prior to the start of next billing cycle.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-bold text-gray-900">Post-Billing Cycle Cancellation</p>
                </div>
                <p className="text-gray-700 text-sm">
                  If cancellations are made after the start of the billing cycle then an amount equivalent to the working hours put into the project during that month will be billable, which the clients will be entitled to pay.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-bold text-gray-900">Non-Usage Policy</p>
                </div>
                <p className="text-gray-700 text-sm">
                  If you signed up for our services, but did not make use of them then you are still entitled to pay us.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="font-bold text-gray-900">Refund Processing</p>
                </div>
                <p className="text-gray-700 text-sm">
                  Amount of refund will be credited in the account from which the payment was made within 45 days of service cancellation.
                </p>
              </div>
            </div>
          </section>

          {/* Digital Marketing Refund Policy */}
          <section id="digital-marketing" className="mb-16 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Digital Marketing Refund Policy</h2>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 mb-8 border border-purple-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Refund Guarantee Situations</h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  InfoGrowth will not be liable for a refund or guarantee of top search ranking under the following circumstances:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">Algorithm Changes</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    In case of effect on SEO ranking due to changes in ranking algorithm, policies, or functionality of search engines.
                  </p>
                </div>

                <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">Incorrect Information</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Link building is carried out based on the information you provide us. In case the URLs given by you are incorrect, we will not be responsible for any subsequent errors.
                  </p>
                </div>

                <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">Third-Party Services</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    InfoGrowth will not be responsible for SEO results if the client engages with any other third-party SEO services.
                  </p>
                </div>

                <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">Ranking Variations</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    The number of times and rank of a website appears on the search list varies and thus an immediate change in the search ranking cannot be guaranteed.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-sm">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Commitment</h3>
                <p className="text-gray-700 text-center mb-8 text-lg leading-relaxed">
                  We make no guarantee that our SEO services will show the client's website in the top ten search rank. However, understand that we work in your best interest and put in our best effort to provide genuinely profitable results. Our aim is to make your life simpler and your business more lucrative.
                </p>
                <div className="text-center text-gray-600 italic border-t border-blue-200 pt-6">
                  <p className="text-sm">*InfoGrowth reserves the right to change the above refund and cancellation policy at any given point without any prior notice.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Terms */}
          <section id="legal-terms" className="scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 gap-4">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Legal Terms & Conditions</h2>
            </div>

            <div className="space-y-8">
              <div className="p-8 bg-white rounded-2xl border-2 border-gray-300 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Indemnification Clause</h3>
                <div className="bg-red-50 p-6 rounded-xl mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    BY ACCEPTING THESE TERMS AND CONDITIONS, YOU AGREE TO INDEMNIFY AND OTHERWISE HOLD HARMLESS IPL, ITS DIRECTORS, OFFICERS, EMPLOYERS, AGENTS, SUBSIDIARIES, AFFILIARIES AND OTHER PARTNERS FROM ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES ARISING OUT OF, RELATING TO, OR RESULTING FROM YOUR USE OF THE SERVICES OBTAINED THROUGH INFOGROWTH INCLUDING BUT NOT LIMITED TO INFORMATION PROVIDED BY YOU OR ANY OTHER MATTER RELATING TO INFOGROWTH.
                  </p>
                </div>
                <div className="p-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Tax Liability</h4>
                  <p className="text-gray-700">
                    ANY REFERENCE TO DUTIES AND TAXES ETC IN THESE TERMS OF USE SHALL INCLUDE GOODS AND SERVICES TAX (HEREIN REFERRED AS GST) FROM THE DATE GST LAW IS IMPLEMENTED IN INDIA. ANY ADDITIONAL TAX LIABILITY ARISING ON ACCOUNT OF INTRODUCTION OF GST (WHETHER ON ACCOUNT OF INCREASE IN RATE OR ANY CHANGE BROUGHT IN BY THE NEW TAX REGIME) WOULD BE RECOVERED OVER AND ABOVE THE AGREED CONTRACT PRICE / SERVICE FEE.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Dispute Resolution</h4>
                  <div className="space-y-6">
                    <div className="flex items-start bg-white p-4 rounded-lg border border-gray-300">
                      <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">1</span>
                      </div>
                      <p className="text-gray-700 pt-1">Disputes shall be referred to a sole arbitrator identified by the Company</p>
                    </div>
                    <div className="flex items-start bg-white p-4 rounded-lg border border-gray-300">
                      <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">2</span>
                      </div>
                      <p className="text-gray-700 pt-1">Arbitrator's decision shall be final and binding</p>
                    </div>
                    <div className="flex items-start bg-white p-4 rounded-lg border border-gray-300">
                      <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">3</span>
                      </div>
                      <p className="text-gray-700 pt-1">Place of arbitration: New Delhi, India</p>
                    </div>
                    <div className="flex items-start bg-white p-4 rounded-lg border border-gray-300">
                      <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">4</span>
                      </div>
                      <p className="text-gray-700 pt-1">Governed by The Arbitration & Conciliation Act, 1996</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Jurisdiction & Governing Law</h4>
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <p className="font-bold text-gray-900 text-lg">Governing Law</p>
                      </div>
                      <p className="text-gray-700">Laws of Republic of India</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <p className="font-bold text-gray-900 text-lg">Exclusive Forum</p>
                      </div>
                      <p className="text-gray-700">Court of law located in Hyderabad, India</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <p className="font-bold text-gray-900 text-lg">Headquarters</p>
                      </div>
                      <p className="text-gray-700">Noida, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-red-50 rounded-2xl border-2 border-red-200">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-red-900">Important Notices</h4>
                </div>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-red-200">
                    <p className="font-bold text-gray-900 mb-2">Non-Poach Agreement</p>
                    <p className="text-gray-700">
                      The subscription / agreement between IPL and the subscriber / user is not a "non-poach agreement" nor can the same be termed or used as an alternative to "non-poach agreement".
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-red-200">
                    <p className="font-bold text-gray-900 mb-2">Non-Exclusivity</p>
                    <p className="text-gray-700">
                      Any agreement for a subscription / usage entered into by IPL does not confer exclusivity of service on any subscriber / user.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-red-200">
                    <p className="font-bold text-gray-900 mb-2">Legal Proceedings</p>
                    <p className="text-gray-700">
                      InfoGrowth Pvt Ltd will not be party to any legal proceedings between a user and a party contracted through the site. Costs will be recovered from the party that names InfoGrowth Pvt Ltd.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PaymentPolicyPage;