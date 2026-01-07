"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const servicesItems = [
    { name: "Digital Marketing", href: "/services/digital-marketing" },
    { name: "Staffing Services", href: "/services/staffing-services" },
    { name: "BPO Services", href: "/services/bpo-services" },
    { name: "SAP Services", href: "/services/sap-services" },
    { name: "FinTech - Order to Cash", href: "/services/fintech-order-to-cash" },
    { name: "Cloud Services", href: "/services/cloud-services" },
    { name: "Managed IT Services", href: "/services/managed-it-services" },
  ];

  const navItems = [
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "#", dropdown: servicesItems },
    { name: "Become a Partner", href: "/become-apartner" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#05325A] via-[#0A4C8A] to-[#0F5FA8] shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* ===== Brand Logo ===== */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.jpeg"
                  alt="InfoGrowth Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <span className="text-white text-xl font-bold tracking-tight">
              InfoGrowth
            </span>
          </Link>

          {/* ===== Desktop Navigation ===== */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation Links */}
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors font-medium text-sm py-2">
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Services Dropdown */}
                      {servicesOpen && (
                        <div className="absolute left-0 top-full pt-2 w-64">
                          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                            {item.dropdown.map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-sm border-b border-gray-100 last:border-b-0"
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="relative text-white/80 hover:text-white transition-colors font-medium text-sm py-2 group/link"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover/link:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact-us"
              className="
                bg-gradient-to-r from-[#96bb57] to-[#3f7ec1]
                text-white
                px-6 py-2.5 rounded-full
                text-sm font-semibold tracking-wide
                hover:shadow-lg hover:scale-105
                transition-all duration-200
                shadow-md
              "
            >
              Consult Us
            </Link>
          </div>

          {/* ===== Mobile Menu Button ===== */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ===== Mobile Menu ===== */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <div className="space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <button
                        className="flex items-center justify-between w-full text-white hover:text-white/90 font-medium py-2"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {mobileServicesOpen && (
                        <div className="ml-4 space-y-2 border-l border-white/20 pl-4">
                          {item.dropdown.map((service) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              className="block text-white/70 hover:text-white transition-colors py-2 text-sm"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-white hover:text-white/90 font-medium py-2 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-white/20">
                <Link
                  href="/contact-us"
                  className="
                    block w-full text-center
                    bg-gradient-to-r from-[#96bb57] to-[#3f7ec1]
                    text-white
                    px-6 py-3 rounded-full
                    font-semibold tracking-wide
                    hover:shadow-lg
                    transition-all duration-200
                    shadow-md
                  "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Consult Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}