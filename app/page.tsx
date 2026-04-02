import Image from "next/image";
import Link from "next/link";
import VideoSection from "../components/VideoSection";
import FrameworkSection from "../components/FrameworkSection";
import TrackRecordSection from "../components/TrackRecordSection";
import TestimonialSection from "../components/TestimonialSection";
import CtaSection from "../components/CtaSection";
import TimelineSection from "../components/TimelineSection";
import ComparisonSection from "../components/ComparisonSection";
import WhatMakesPossible from "../components/WhatMakesPossible";
import OrchestrationSection from "../components/OrchestrationSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const brandLogos = [
    "Clip path group.svg",
    "Company Logo 1.svg",
    "Group 29.svg",
    "Group 30.svg",
    "Vector.svg",
    "ramco-logo.png_width=130&height=28&name=ramco-logo 1.svg",
    "salesforce 1.svg"
  ];

  return (
    <main className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col overflow-hidden bg-[#0A163B]">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero/HERO IMAGE.png"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Hero Content - Centered */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
          {/* Inner padded container for hero text */}
          <div className="px-6 flex flex-col items-center text-center">
            <h1 className="text-[40px] sm:text-[44px] md:text-5xl lg:text-[64px] font-semibold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto px-2">
              Generate $5M+ ARR <br className="block sm:hidden" /> in Enterprise Pipeline
            </h1>
            
            <p className="mt-6 md:mt-6 text-[19px] sm:text-[17px] md:text-[21px] text-blue-100/70 font-medium max-w-2xl mx-auto px-4 leading-relaxed">
              A GTM System Designed to Close Enterprise Deals in 90 Days
            </p>

            <button className="mt-10 md:mt-10 px-8 py-3 md:px-8 md:py-3.5 w-full sm:w-auto max-w-[220px] bg-[#f5f5f0] text-[#0A163B] rounded font-semibold text-[19px] hover:bg-white transition-colors shadow-lg shadow-white/5">
              Get a demo
            </button>
          </div>
        </div>

        {/* Brand Slider (At the Bottom) */}
        <div className="relative z-10 w-full flex flex-col items-center pb-12 md:pb-20 mt-auto">
          <p className="text-blue-100/80 text-[18px] md:text-[20px] mb-8 md:mb-10 px-6 text-center">
            Trusted by leading B2B software firms
          </p>
          
          <div className="w-full overflow-hidden mask-gradient relative flex">
            <div className="flex whitespace-nowrap animate-marquee items-center min-w-full hover:[animation-play-state:paused]">
              {/* Duplicate the array multi-times for a smoother long loop */}
              {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, index) => (
                <div key={index} className="flex-none px-12 md:px-20 flex items-center h-20 relative">
                  <div className={`relative ${logo.includes('salesforce') ? 'h-16 w-56 md:h-20 md:w-64' : 'h-10 w-40 md:h-12 md:w-48'}`}>
                    <Image
                      src={`/brandslider/${logo}`}
                      alt="Brand Logo"
                      fill
                      className="object-contain brightness-0 invert opacity-80"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video / Value Proposition Section */}
      <VideoSection />
      
      {/* Framework Interactive Section */}
      <FrameworkSection />

      {/* Track Record Section */}
      <TrackRecordSection />
      
      {/* Client Testimonial Section */}
      <TestimonialSection />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* What Makes Possible Section */}
      <WhatMakesPossible />

      {/* CTA Section */}
      <CtaSection />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Orchestration Chart Section */}
      <OrchestrationSection />

      {/* Main Footer */}
      <Footer />
    </main>
  );
}
