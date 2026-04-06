"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function ContactFeatures() {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const features = [
    {
      icon: "/contact/features/1.svg",
      title: "Account database",
      description: "Live ICP-matched database, continuously enriched with firmographic and intent data."
    },
    {
      icon: "/contact/features/2.svg",
      title: "Signal mapping",
      description: "Buying triggers tracked per account — leadership changes, budget cycles, regulatory shifts, tech transitions."
    },
    {
      icon: "/contact/features/3.svg",
      title: "Context-led messaging",
      description: "Every message written from scratch — account-specific, signal-driven, never templated."
    },
    {
      icon: "/contact/features/4.svg",
      title: "Email outreach",
      description: "Multi-touch sequences timed to buying windows, not calendar slots."
    },
    {
      icon: "/contact/features/5.svg",
      title: "LinkedIn outreach",
      description: "Personalised engagement — DMs, connection requests, and content interactions timed to signal activity."
    },
    {
      icon: "/contact/features/6.svg",
      title: "Cold calling",
      description: "Direct calls to decision-makers — triggered by signal, not a dialer list."
    },
    {
      icon: "/contact/features/7.svg",
      title: "ABM campaigns",
      description: "Account-specific content, ads, and outreach aligned to each account’s internal buying dynamics."
    },
    {
      icon: "/contact/features/8.svg",
      title: "Content and personal branding",
      description: "Founder-voice thought leadership published on LinkedIn to build authority and warm inbound."
    },
    {
      icon: "/contact/features/9.svg",
      title: "Appointment setting",
      description: "Qualified meetings booked into your calendar — pre-screened and context-briefed."
    },
    {
      icon: "/contact/features/10.svg",
      title: "Account management",
      description: "A dedicated lead owns your pipeline — every deal, stakeholder, and open thread tracked continuously."
    },
    {
      icon: "/contact/features/11.svg",
      title: "Follow-up and nurture",
      description: "Every conversation followed through — warm sequences and long-cycle nurture for accounts not yet in a buying window."
    },
    {
      icon: "/contact/features/12.svg",
      title: "Pipeline reporting",
      description: "Live dashboard — accounts, signals, deal stages, and pipeline value. Updated continuously."
    },
  ];

  return (
    <section className="w-full bg-[#F0EDE6] py-14 sm:py-24 px-4 sm:px-6 flex flex-col items-center">
      {/* Centered Header */}
      <div className="text-center mb-12 sm:mb-24 max-w-4xl mx-auto">
        <p className="text-[#5B5D71] font-semibold tracking-widest text-[12px] sm:text-[13px] uppercase mb-4 sm:mb-6">
          GET IN TOUCH
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[44px] font-semibold text-[#1A3FA8] leading-tight mb-4 sm:mb-8">
          Tell us your revenue goal. <br className="hidden md:block" /> We&apos;ll design the GTM around it.
        </h2>
        <p className="text-[#5B5D71] text-base sm:text-lg md:text-[19px] leading-relaxed max-w-2xl mx-auto">
          A 30-minute call where we scope your pipeline motion around the number you&apos;re building toward.
        </p>
      </div>

      {/* 4x3 Feature Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-12 gap-y-8 sm:gap-y-10 md:gap-y-20">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex-col items-start md:items-center text-left md:text-center ${!showAllFeatures && index >= 4 ? 'hidden md:flex' : 'flex'}`}
          >
            {/* Icon Wrapper added background color to support new SVGs */}
            <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-16 md:h-16 relative mb-3 sm:mb-4 md:mb-8 flex items-center justify-center bg-gradient-to-b from-[#1E1E1E] to-[#1A3FA8]">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={32}
                height={32}
                className="object-contain w-5 h-5 sm:w-8 sm:h-8"
              />
            </div>
            <h3 className="text-[#161662] text-[17px] sm:text-[20px] md:text-[22px] font-medium md:font-semibold mb-1 sm:mb-1.5 md:mb-4 leading-tight">
              {feature.title}
            </h3>
            <p className="text-[#161662]/80 md:text-[#161662]/70 text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed pr-4 md:pr-0">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile "View More" Button */}
      {!showAllFeatures && (
        <div className="w-full flex justify-center mt-10 md:hidden">
          <button 
            onClick={() => setShowAllFeatures(true)}
            className="px-10 py-3 bg-blue-500 text-white text-[15px] font-medium hover:bg-blue-600 transition-colors shadow-sm active:bg-[#161662] active:scale-95"
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
}
