"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full relative z-50 px-4 pt-5 lg:px-0 lg:pt-0">
      <div className={`w-full max-w-8xl mx-auto flex flex-col ${isOpen ? 'bg-[#0a1128]' : 'bg-[#0a1128] lg:bg-transparent'}`}>
        <nav className="w-full px-5 py-4 lg:px-36 lg:py-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="relative w-[120px] h-[34px] md:w-42 md:h-11 transition-opacity hover:opacity-90">
                <Image
                  src="/hero/Group 36.svg"
                  alt="HolaCXO Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
            
            <div className="h-6 w-px bg-white/30 hidden lg:block"></div>
            
            <div className="hidden lg:flex items-center gap-8 text-[18px] font-medium text-blue-100/80">
              <Link href="/" className="hover:text-white transition-colors">Solution</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Resources</Link>
              <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <Link 
              href="/contact" 
              className="hidden lg:block px-6 py-2.5 rounded border border-white/20 text-[18px] font-medium text-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-50 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                // X icon
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // 2-line Hamburger
                <div className="w-6 flex flex-col gap-[5px]">
                  <span className="block w-full h-[2px] bg-white rounded-full"></span>
                  <span className="block w-full h-[2px] bg-white rounded-full"></span>
                </div>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Overlay (integrated into the floating box) */}
        {isOpen && (
          <div className="w-full flex flex-col pt-4 pb-8 px-6 lg:hidden border-t border-white/5 shadow-2xl">
            <div className="flex flex-col items-center gap-6 text-[17px] text-blue-100/90 font-medium">
              <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Solution</Link>
              <Link href="/blog" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Resources</Link>
              <Link href="#" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Pricing</Link>
            </div>
            
            <div className="mt-8 px-2 w-full">
              <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-3.5 rounded bg-[#f5f5f0] text-[#0A163B] text-[16px] font-medium hover:bg-white transition-colors shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
