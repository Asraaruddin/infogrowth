// app/components/Footer.tsx - Minimal Version
"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#05325A] via-[#0A4C8A] to-[#0F5FA8] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single Row Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          
          {/* Left Section: Logo + Since 2019 */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="InfoGrowth Logo"
              width={32}
              height={32}
              className="object-contain rounded-full"
            />
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-bold text-[#96bb57]">Info</span>
                <span className="font-bold  text-[#3f7ec1]">Growth</span>
              </div>
              <span className="text-white/70 text-xs">Since 2019</span>
            </div>
          </div>

          {/* Center Section: Legal Links */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link 
              href="/TermsandConditions" 
              className="text-white/80 hover:text-white text-xs sm:text-sm transition-colors"
            >
              Terms
            </Link>
            <span className="text-white/50">|</span>
            <Link 
              href="/payment-policy" 
              className="text-white/80 hover:text-white text-xs sm:text-sm transition-colors"
            >
              Payment Policy
            </Link>
            <span className="text-white/50">|</span>
            <Link 
              href="/privacy-policies" 
              className="text-white/80 hover:text-white text-xs sm:text-sm transition-colors"
            >
              Privacy
            </Link>
          </div>

          {/* Right Section: Email */}
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-white/70" />
            <a 
              href="mailto:Contact@infogrowth.in" 
              className="text-white/80 hover:text-white text-xs sm:text-sm transition-colors"
            >
              Contact@infogrowth.in
            </a>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="border-t border-white/10 py-4">
          <p className="text-center text-white/60 text-xs">
            © {currentYear} InfoGrowth Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}