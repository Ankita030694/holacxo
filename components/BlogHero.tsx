"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

export default function BlogHero() {
  return (
    <section className="relative min-h-[600px] flex flex-col overflow-hidden bg-[#0a1128] pb-48 lg:pb-64">
      {/* Background with vertical stripes matching the reference */}
      <div className="absolute inset-0 z-0 flex">
        <div className="flex-1 bg-[#0a1128]"></div>
        <div className="flex-1 bg-[#0d1631]"></div>
        <div className="flex-1 bg-[#101b3b]"></div>
        <div className="flex-1 bg-[#152349]"></div>
        <div className="flex-1 bg-[#192b56]"></div>
        <div className="flex-1 bg-[#1c2e5b]"></div>
        <div className="flex-1 bg-[#192b56]"></div>
        <div className="flex-1 bg-[#101b3b]"></div>
        <div className="flex-1 bg-[#0a1128]"></div>
      </div>
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A163B]/10 via-transparent to-[#0a1128]/80"></div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 mt-20 lg:mt-24 mb-10">
        <div className="flex flex-col gap-4">
          <span className="text-[14px] font-medium tracking-wider text-white/90 uppercase">
            Blogs
          </span>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <h1 className="lg:col-span-7 text-4xl md:text-5xl lg:text-[54px] font-normal text-white leading-[1.15] tracking-tight">
              Insights, Ideas & Industry Perspectives
            </h1>
            
            <div className="lg:col-span-5 flex h-full pt-4">
              <p className="text-[15px] md:text-[16px] text-white/70 leading-relaxed max-w-sm">
                Explore expert articles, practical guides, and the latest updates to help you stay informed, make smarter decisions, and grow with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
