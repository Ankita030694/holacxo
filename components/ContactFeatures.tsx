import React from 'react';
import Image from 'next/image';

export default function ContactFeatures() {
  const features = [
    // ROW 1
    {
      icon: "/contact/features/firstcolumn.svg",
      title: "5-year deal behaviour dataset",
      description: "We recognise patterns — not guesses — to know when an account is actually in-market."
    },
    {
      icon: "/contact/features/second.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    {
      icon: "/contact/features/third.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    // ROW 2
    {
      icon: "/contact/features/firstcolumn.svg",
      title: "5-year deal behaviour dataset",
      description: "We recognise patterns — not guesses — to know when an account is actually in-market."
    },
    {
      icon: "/contact/features/second.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    {
      icon: "/contact/features/third.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    // ROW 3
    {
      icon: "/contact/features/firstcolumn.svg",
      title: "5-year deal behaviour dataset",
      description: "We recognise patterns — not guesses — to know when an account is actually in-market."
    },
    {
      icon: "/contact/features/second.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    {
      icon: "/contact/features/third.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    // ROW 4
    {
      icon: "/contact/features/firstcolumn.svg",
      title: "5-year deal behaviour dataset",
      description: "We recognise patterns — not guesses — to know when an account is actually in-market."
    },
    {
      icon: "/contact/features/second.svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    {
      icon: "/contact/features/third.svg",
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
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Icon Wrapper (The SVGs already have their own background squares) */}
            <div className="w-16 h-16 relative mb-8 flex items-center justify-center rounded-sm overflow-hidden">
              <Image
                src={feature.icon}
                alt={feature.title}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-[#161662] text-[22px] font-semibold mb-4 leading-tight">
              {feature.title}
            </h3>
            <p className="text-[#161662]/70 text-[17px] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
