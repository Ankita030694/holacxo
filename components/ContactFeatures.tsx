"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function ContactFeatures() {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const features = [
    // ROW 1
    {
      icon: "/contact/features/1.svg",
      title: "5-year deal behaviour dataset",
      description: "We recognise patterns — not guesses — to know when an account is actually in-market."
    },
    {
      icon: "/contact/features/2.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    {
      icon: "/contact/features/3.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    // ROW 2
    {
      icon: "/contact/features/4.svg",
      title: "5-year deal behaviour dataset",
      description: "We recognise patterns — not guesses — to know when an account is actually in-market."
    },
    {
      icon: "/contact/features/5.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    {
      icon: "/contact/features/6.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    // ROW 3
    {
      icon: "/contact/features/7.svg",
      title: "5-year deal behaviour dataset",
      description: "We recognise patterns — not guesses — to know when an account is actually in-market."
    },
    {
      icon: "/contact/features/8.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    {
      icon: "/contact/features/9.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    // ROW 4
    {
      icon: "/contact/features/10.svg",
      title: "5-year deal behaviour dataset",
      description: "We recognise patterns — not guesses — to know when an account is actually in-market."
    },
    {
      icon: "/contact/features/11.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    {
      icon: "/contact/features/12.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
  ];

  return (
    <section className="w-full bg-[#F0EDE6] py-24 px-6 flex flex-col items-center">
      {/* Centered Header */}
      <div className="text-center mb-24 max-w-4xl mx-auto">
        <p className="text-[#5B5D71] font-semibold tracking-widest text-[13px] uppercase mb-6">
          GET IN TOUCH
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-[44px] font-semibold text-[#1A3FA8] leading-tight mb-8">
          Tell us your revenue goal. <br className="hidden md:block" /> We'll design the GTM around it.
        </h2>
        <p className="text-[#5B5D71] text-lg md:text-[19px] leading-relaxed max-w-2xl mx-auto">
          A 30-minute call where we scope your pipeline motion around the number you're building toward.
        </p>
      </div>

      {/* 4x3 Feature Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 md:gap-y-20">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex-col items-start md:items-center text-left md:text-center ${!showAllFeatures && index >= 4 ? 'hidden md:flex' : 'flex'}`}
          >
            {/* Icon Wrapper added background color to support new SVGs */}
            <div className="w-[50px] h-[50px] md:w-16 md:h-16 relative mb-4 md:mb-8 flex items-center justify-center bg-[#161662] shadow-sm">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <h3 className="text-[#161662] text-[20px] md:text-[22px] font-medium md:font-semibold mb-1.5 md:mb-4 leading-tight">
              {feature.title}
            </h3>
            <p className="text-[#161662]/80 md:text-[#161662]/70 text-[15px] md:text-[17px] leading-relaxed pr-4 md:pr-0">
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
            className="px-10 py-3 bg-blue-500 text-white text-[15px] font-medium hover:bg-blue-600 transition-colors shadow-sm"
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
}
