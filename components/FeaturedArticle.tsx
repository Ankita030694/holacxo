"use client";

import Image from "next/image";
import Link from "next/link";

export default function FeaturedArticle() {
  return (
    <div className="relative z-20 w-full max-w-[1280px] mx-auto px-6 -mt-36 md:-mt-44 lg:-mt-52">
      <div className="flex flex-col lg:flex-row shadow-2xl overflow-hidden min-h-[500px]">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 bg-[#EDEDED] min-h-[350px] lg:min-h-[500px] flex items-center justify-center p-8">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Placeholder SVG - Mountain Icon */}
            <svg 
              className="w-1/2 max-w-[200px] h-auto text-[#7A8491]" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5ZM6.5 9.5C6.5 8.1 7.6 7 9 7C10.4 7 11.5 8.1 11.5 9.5C11.5 10.9 10.4 12 9 12C7.6 12 6.5 10.9 6.5 9.5Z" />
            </svg>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 bg-[#222222] p-10 md:p-14 lg:p-[72px] flex flex-col justify-center">
          <div className="space-y-6">
            <span className="text-[#6D93D3] text-[13px] font-medium tracking-wider uppercase">
              Featured Article
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-normal text-white leading-[1.2] mt-2 mb-4">
              The Future of Digital Experiences in a Fast-Moving World
            </h2>
            
            <p className="text-[#9CA3AF] text-[15px] md:text-[16px] leading-relaxed max-w-md">
              Discover how modern businesses are leveraging technology, design, and data-driven strategies to build seamless user experiences that drive engagement and long-term growth across platforms.
            </p>
            
            <div className="pt-2">
              <Link 
                href="#" 
                className="inline-flex items-center text-[15px] text-white font-medium hover:text-[#6D93D3] transition-colors group"
              >
                Read More
                <svg 
                  className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Article Footer */}
          <div className="mt-16 pt-6 border-t border-[#4A4A4A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[13px] text-[#9CA3AF]">
            <div className="flex items-center gap-[6px]">
              <span>By</span>
              <span className="text-white font-normal">Username</span>
            </div>
            
            <div className="flex items-center gap-[6px]">
              <span>Apr 12, 2026</span>
              <span className="w-1 h-1 bg-[#9CA3AF] rounded-full mx-1"></span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
