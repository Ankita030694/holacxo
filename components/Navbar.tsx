"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <div className="relative w-32 h-11 transition-opacity hover:opacity-90">
            <Image
              src="/hero/Group 36.svg"
              alt="HolaCXO Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
        
        <div className="h-6 w-px bg-white/30 hidden md:block"></div>
        
        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-blue-100/80">
          <Link href="/" className="hover:text-white transition-colors">Solution</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Resources</Link>
          <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
        </div>
      </div>
      
      <div className="flex items-center">
        <Link 
          href="/contact" 
          className="px-6 py-2.5 rounded border border-white/20 text-[15px] font-medium text-white hover:bg-white/10 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
