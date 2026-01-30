"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);

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
    { name: "Services", href: "/services", dropdown: servicesItems },
    { name: "Become a Partner", href: "/become-a-partner" },
    { name: "Careers", href: "/careers" }, 
    { name: "Blogs", href: "/blogs" },
  ];

  /* ===== Scroll Effect ===== */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== Click Outside Close ===== */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-[#05325A]/95 via-[#0A4C8A]/95 to-[#0F5FA8]/95 backdrop-blur-md shadow-xl py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* ===== Logo ===== */}
          <Link
            href="/"
            className="flex items-center gap-3 group select-none"
          >
            {/* Logo Image */}
            <div
              className="
                relative
                w-10 h-10 sm:w-12 sm:h-12
                flex items-center justify-center
                transition-transform duration-300 ease-out
                group-hover:scale-[1.06]
              "
            >
              <Image
                src="/logo4k.png"
                alt="InfoGrowth Logo"
                width={512}
                height={512}
                className="
                  object-contain
                  rounded-full
                  shadow-md
                  transition-shadow duration-300
                  group-hover:shadow-lg
                "
                priority
              />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col justify-center leading-tight">
              <div className="flex items-center">
                <span
                  className="
                    font-[Poppins]
                    text-[18px] sm:text-[20px] md:text-[22px]
                    font-extrabold
                    tracking-tight
                    text-[#96bb57]
                    transition-colors duration-300
                    group-hover:text-[#86a94c]
                  "
                >
                  Info
                </span>

                <span
                  className="
                    font-[Poppins]
                    text-[18px] sm:text-[20px] md:text-[22px]
                    font-extrabold
                    tracking-tight
                    text-[#3f7ec1]
                    transition-colors duration-300
                    group-hover:text-[#356fb0]
                  "
                >
                  Growth
                </span>
              </div>

              

              {/* Tagline */}
              <span
                className="
                  text-[10px] sm:text-[11px]
                  tracking-wide
                  text-white
                  transition-opacity duration-300
                  group-hover:opacity-80
                "
              >
                IT Services & Staffing
              </span>
            </div>
          </Link>

          {/* ===== Desktop Menu ===== */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="relative" ref={servicesRef}>
                  <div className="flex items-center gap-1">
                    {/* Services LINK - Now clickable */}
                    <Link
                      href={item.href}
                      className="text-white/90 hover:text-white font-semibold text-[15px] relative group/link"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] transition-all duration-300 group-hover/link:w-full"></span>
                    </Link>

                    {/* Dropdown Trigger - Only the arrow */}
                    <button
                      onClick={() => setServicesOpen((prev) => !prev)}
                      className="p-1 text-white/80 hover:text-white transition-colors"
                      aria-label="Toggle services dropdown"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Dropdown */}
                  <div 
                    className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 transition-all duration-200 transform ${
                      servicesOpen 
                        ? 'opacity-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                      {servicesItems.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          onClick={() => setServicesOpen(false)}
                          className="block px-6 py-3.5 text-gray-800 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-200 border-b border-gray-100 last:border-b-0 hover:pl-8 group/item"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                            {service.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/90 hover:text-white font-semibold text-[15px] relative group/link"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#96bb57] to-[#3f7ec1] transition-all duration-300 group-hover/link:w-full"></span>
                </Link>
              )
            )}

            {/* CTA */}
            <Link
              href="/contact-us"
              className="
                relative
                bg-gradient-to-r from-[#96bb57] to-[#3f7ec1]
                text-white px-7 py-3 rounded-full
                text-sm font-bold hover:scale-105
                transition-all duration-300
                shadow-lg hover:shadow-2xl
                overflow-hidden
                group/cta
                min-w-[140px] text-center
              "
            >
              <span className="relative z-10">Consult Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3f7ec1] to-[#96bb57] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* ===== Mobile Toggle ===== */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </button>
        </div>

        {/* ===== Mobile Menu with Solid Background ===== */}
        <div 
          className={`
            lg:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="
            bg-gradient-to-r from-[#05325A] via-[#0A4C8A] to-[#0F5FA8]
            rounded-xl shadow-2xl
            border border-white/10
            p-4
            space-y-2
          ">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.name}>
                  {/* Mobile Services Item - Split into Link and Button */}
                  <div className="flex items-center justify-between w-full">
                    {/* Clickable Services Link */}
                    <Link
                      href={item.href}
                      className="
                        flex-1
                        text-white font-semibold 
                        py-3.5 px-4 
                        rounded-lg hover:bg-white/10 
                        transition-colors
                        text-left
                      "
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileServicesOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                    
                    {/* Dropdown Toggle Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileServicesOpen(!mobileServicesOpen);
                      }}
                      className="
                        p-2
                        text-white/80 hover:text-white 
                        transition-colors
                        rounded-lg hover:bg-white/10
                      "
                      aria-label="Toggle services dropdown"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Services Dropdown Items */}
                  <div 
                    className={`
                      ml-3 space-y-1 overflow-hidden transition-all duration-300
                      ${mobileServicesOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
                    `}
                  >
                    {servicesItems.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="
                          block text-white/90 hover:text-white 
                          py-3 px-6 
                          rounded-lg hover:bg-white/10 
                          transition-all
                        "
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileServicesOpen(false);
                        }}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="
                    block text-white font-semibold 
                    py-3.5 px-4 
                    rounded-lg hover:bg-white/10 
                    transition-colors
                  "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            
            {/* CTA Button */}
            <div className="pt-4 mt-4 border-t border-white/20">
              <Link
                href="/contact-us"
                className="
                  block w-full text-center
                  bg-gradient-to-r from-[#96bb57] to-[#3f7ec1]
                  text-white px-6 py-3.5 rounded-full
                  font-bold tracking-wide hover:shadow-xl
                  transition-all duration-300
                  shadow-lg
                "
                onClick={() => setMobileMenuOpen(false)}
              >
                Consult Us
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}