// app/terms-and-conditions/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Shield, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle,
  Lock,
  Users,
  Calendar,
  Bell,
  ClipboardCheck,
  Building,
  Scale,
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  Download,
  Printer
} from "lucide-react";

interface TermSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  sectionId: string;
}

function TermSection({ icon, title, children, defaultOpen = false, sectionId }: TermSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div id={sectionId} className="border border-gray-200 rounded-2xl overflow-hidden mb-6 scroll-mt-24">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors text-left group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center text-blue-600 transition-colors">
            {icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-blue-600 hidden sm:inline-block">
            {isOpen ? "Click to collapse" : "Click to expand"}
          </span>
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-gray-500 group-hover:text-gray-700" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-gray-700" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="p-6 md:p-8 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

export default function TermsAndConditionsPage() {
  const [accepted, setAccepted] = useState(false);
  const [activeSection, setActiveSection] = useState("the-contract");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-r from-gray-900 to-slate-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-8">
              <FileText className="w-5 h-5" />
              <span className="font-semibold">Legal Agreement</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Terms & Conditions
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              These terms govern your use of InfoGrowth services. Please read them carefully before engaging with our business.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Effective Date: December 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span>Last Updated: December 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Version 4.2</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">          
          <div className="text-sm text-gray-600">
            <span className="font-medium">Reading time:</span> ~12 minutes
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center text-blue-600 mb-4 transition-colors">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Contractual Agreement</h3>
            <p className="text-gray-600 text-sm">
              Independent contractor relationship with clear commencement dates and monthly reporting.
            </p>
          </div>
          
          <div className="group bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center text-green-600 mb-4 transition-colors">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Payment Terms</h3>
            <p className="text-gray-600 text-sm">
              100% advance payment required with monthly invoicing and strict payment terms.
            </p>
          </div>
          
          <div className="group bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-xl flex items-center justify-center text-purple-600 mb-4 transition-colors">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Privacy & Security</h3>
            <p className="text-gray-600 text-sm">
              SSL encrypted transactions, limited liability, and data protection measures in place.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="#the-contract" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('the-contract')?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection('the-contract');
              }}
              className={`flex items-center p-3 rounded-lg transition-all ${activeSection === 'the-contract' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
            >
              <div className={`w-2 h-2 rounded-full mr-3 ${activeSection === 'the-contract' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
              <span className="font-medium">The Contract</span>
            </a>
            
            <a 
              href="#payment" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('payment')?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection('payment');
              }}
              className={`flex items-center p-3 rounded-lg transition-all ${activeSection === 'payment' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
            >
              <div className={`w-2 h-2 rounded-full mr-3 ${activeSection === 'payment' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
              <span className="font-medium">Payment Terms</span>
            </a>
            
            <a 
              href="#liability" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('liability')?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection('liability');
              }}
              className={`flex items-center p-3 rounded-lg transition-all ${activeSection === 'liability' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
            >
              <div className={`w-2 h-2 rounded-full mr-3 ${activeSection === 'liability' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
              <span className="font-medium">Liability</span>
            </a>
            
            <a 
              href="#privacy" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('privacy')?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection('privacy');
              }}
              className={`flex items-center p-3 rounded-lg transition-all ${activeSection === 'privacy' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
            >
              <div className={`w-2 h-2 rounded-full mr-3 ${activeSection === 'privacy' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
              <span className="font-medium">Privacy Rights</span>
            </a>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="mb-16">
          <TermSection 
            icon={<Building className="w-6 h-6" />}
            title="The Contract"
            defaultOpen={true}
            sectionId="the-contract"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Independent Contractor Relationship</h4>
                  <p className="text-gray-700">
                    An independent contractor relationship will be created between the clients and InfoGrowth, 
                    and no partnership or joint venture is intended or implied by either party.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Commencement Date</h4>
                  </div>
                  <p className="text-gray-700">
                    The date of commencement of the services will be agreed upon by both parties and charges 
                    will be applicable according to that date.
                  </p>
                </div>
                
                <div className="p-6 bg-white border border-gray-200 rounded-xl hover:border-green-300 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <ClipboardCheck className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-gray-900">Monthly Reporting</h4>
                  </div>
                  <p className="text-gray-700">
                    A monthly report of performance services will be given to the clients.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-semibold text-gray-900">Important Notices</h4>
                  </div>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Either party may not cancel or fully transfer the service responsibilities to another service vendor before a prior notice of at least 10 business days.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>InfoGrowth reserves the right to subcontract a third-party service provider for some of the service tasks.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>A person who is not a party to the Contract shall not have any rights under or in connection with it.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TermSection>

          <TermSection 
            icon={<DollarSign className="w-6 h-6" />}
            title="Payment Terms"
            sectionId="payment"
          >
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 md:p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Advance Payment Policy</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-green-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <span className="font-bold text-green-700 text-xl">100%</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Monthly Service Packages</h5>
                        <p className="text-gray-600 text-sm">Full payment in advance</p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      If clients avail of any monthly service package of InfoGrowth then they are obliged to pay a full chargeable amount prior to the commencement of the work.
                    </p>
                  </div>
                  
                  <div className="bg-white border border-green-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <span className="font-bold text-green-700 text-xl">100%</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Fixed Quote Services</h5>
                        <p className="text-gray-600 text-sm">Complete payment upfront</p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      If InfoGrowth and the client agree on a fixed quote regarding any services then they are liable to pay 100% of the billable amount in advance, prior to the commencement of the work.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-red-50 border border-red-100 rounded-xl">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Important Payment Terms</h4>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        InfoGrowth shall invoice the clients monthly, in advance.
                      </p>
                      <div className="bg-white border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 font-medium">
                          If the clients do not pay a monthly invoice when it is due, InfoGrowth shall terminate the services immediately. In this case, we will not be liable to issue a 10-day prior notice.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 01118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Payment Methods</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span>Bank Transfer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span>Credit/Debit Cards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span>Online Payment Gateways</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Tax Invoicing</h4>
                  </div>
                  <p className="text-gray-700">
                    All payments include applicable taxes. Tax invoices are provided with each payment.
                  </p>
                </div>
              </div>
            </div>
          </TermSection>

          <TermSection 
            icon={<AlertTriangle className="w-6 h-6" />}
            title="Liability"
            sectionId="liability"
          >
            <div className="space-y-8">
              <div className="p-6 md:p-8 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Limited Liability</h4>
                <p className="text-gray-700 mb-8 text-lg">
                  InfoGrowth will not be liable for any indirect or consequential losses due to delay in obligated service deliverables, where the delay is because of natural or ungovernable causes.
                </p>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Client Indemnification</h5>
                  <p className="text-gray-700 mb-6">
                    The clients will defend, cover and hold InfoGrowth harmless from and against any and all claims, losses, liabilities, and expenses related to the services provided by InfoGrowth to the clients under this agreement, including without limitation claims made by third parties related to:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 font-semibold text-sm">1</span>
                        </div>
                        <span className="text-gray-700">False advertising claims</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 font-semibold text-sm">2</span>
                        </div>
                        <span className="text-gray-700">Liability claims for products or services sold by the client</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 font-semibold text-sm">3</span>
                        </div>
                        <span className="text-gray-700">Patent, copyright or trademark infringement</span>
                      </li>
                    </ul>
                    
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 font-semibold text-sm">4</span>
                        </div>
                        <span className="text-gray-700">Disruption or malfunction of services provided</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 font-semibold text-sm">5</span>
                        </div>
                        <span className="text-gray-700">Any content submitted by you for publication by InfoGrowth</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Digital Content Publication</h4>
                    <p className="text-gray-700">
                      Due to the nature of digital media, any content/information given by the clients to InfoGrowth for publication will be accessible to the public as soon as the publication is carried out. InfoGrowth will not be responsible for screening the material and any damages or losses of profit, goodwill, or any business asset due to the nature of the content being publicized.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Force Majeure</h4>
                  <p className="text-gray-700 text-sm">
                    Neither party shall be liable for any failure or delay in performing its obligations under this agreement if such failure or delay is due to circumstances beyond its reasonable control.
                  </p>
                </div>

                <div className="p-6 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Maximum Liability</h4>
                  <p className="text-gray-700 text-sm">
                    InfoGrowth's maximum liability to the client for any claim arising out of or relating to this agreement shall not exceed the total fees paid by the client in the 12 months preceding the claim.
                  </p>
                </div>
              </div>
            </div>
          </TermSection>

          <TermSection 
            icon={<CheckCircle className="w-6 h-6" />}
            title="Waiver"
            sectionId="waiver"
          >
            <div className="space-y-8">
              <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Performance Waiver</h4>
                    <p className="text-gray-700 text-lg">
                      If at any time during the term of a service contract, we fail to insist upon the strict performance of any of your obligations under the service contract or any of these terms and conditions, then this will not automatically free of you from any of the obligations mentioned in the terms and conditions and will not constitute a waiver.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Official Communication</h4>
                    <p className="text-gray-700">
                      Any waiver of terms and conditions will be valid officially only if it is communicated to you in writing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-200 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Non-Waiver Clause</h4>
                  <p className="text-gray-700 text-sm">
                    The failure of either party to enforce any provision of this agreement shall not be construed as a waiver or limitation of that party's right to subsequently enforce and compel strict compliance with every provision.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Written Waivers Only</h4>
                  <p className="text-gray-700 text-sm">
                    No waiver of any breach of any provision of this agreement shall constitute a waiver of any prior, concurrent or subsequent breach of the same or any other provisions hereof.
                  </p>
                </div>
              </div>
            </div>
          </TermSection>

          <TermSection 
            icon={<Lock className="w-6 h-6" />}
            title="Privacy Rights"
            sectionId="privacy"
          >
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <Shield className="w-8 h-8 text-gray-700" />
                    <h4 className="text-lg font-semibold text-gray-900">Information Collection</h4>
                  </div>
                  <p className="text-gray-700">
                    Information like name, email, contact number, and website URL that the clients provide us by filling out the contact form will be kept confidential and not be exposed to a third party, without their prior consent. However, the information will be made privy to the employees of InfoGrowth.
                  </p>
                </div>
                
                <div className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <Lock className="w-8 h-8 text-gray-700" />
                    <h4 className="text-lg font-semibold text-gray-900">Data Protection</h4>
                  </div>
                  <p className="text-gray-700">
                    InfoGrowth will take reasonable precautions to prevent the loss, misuse, or alteration of your personal information.
                  </p>
                </div>
              </div>
              
              <div className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl">
                <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">Online Security Measures</h4>
                
                <div className="space-y-8">
                  <div className="bg-white border border-indigo-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-700 font-bold text-lg">
                        SSL
                      </div>
                      <div>
                        <h5 className="text-xl font-semibold text-gray-900">Encrypted Transactions</h5>
                        <p className="text-gray-600">Secure Socket Layer Technology</p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Although the transfer of data over the internet is inherently insecure, and any kind of security in this regard cannot be guaranteed by InfoGrowth, we use SSL encrypted technology for making any kind of money transaction to ensure maximum security against online theft and fraud.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h5 className="font-semibold text-gray-900 mb-3">Cookie Usage</h5>
                      <p className="text-gray-700 text-sm">
                        Cookies are used to track the browsing information/preferences of web users and we may use cookies to gather statistical data about your browsing pattern for optimizing our site.
                      </p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h5 className="font-semibold text-gray-900 mb-3">Third-Party Cookies</h5>
                      <p className="text-gray-700 text-sm">
                        Some of the third-party advertisers who have their ad links on our website may also use cookies to gather statistical information about you. However, in no way do Cookies give access to any of your personal information either to us or a third-party entity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">Data Retention Policy</h4>
                </div>
                <p className="text-gray-700">
                  We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, unless a longer retention period is required by law. We have established minimum and maximum retention periods based on the type of data and purpose.
                </p>
              </div>
            </div>
          </TermSection>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Important Notice</h3>
              <p className="text-gray-700 mb-6 text-lg">
                InfoGrowth reserves the right to modify the above terms and conditions at any point of time, including the time of an ongoing contract, and changes in the terms and conditions will be notified to the clients through company email.
              </p>
              <div className="flex items-center gap-3 text-red-700 font-medium">
                <Bell className="w-5 h-5" />
                <span className="text-lg">Clients are responsible for reviewing any modifications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptance Section */}
        <div className="bg-white border border-gray-300 rounded-2xl p-8 shadow-lg mb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Acknowledge Terms</h3>
              <p className="text-gray-600 text-lg">
                By engaging with InfoGrowth services, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>

        
      </main>
    </div>
  );
}