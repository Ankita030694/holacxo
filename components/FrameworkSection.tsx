"use client";

import { useState } from "react";
import Image from "next/image";

const frameworkData = [
  {
    id: 0,
    title: "Capturing demand that already exists",
    description: "We use organizational buying signals to identify the accounts most likely to feel the strongest need for your product right now.",
    imagePath: "/framework/1.jpg", 
    icon: (
      <svg className="w-14 h-14 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <circle cx="12" cy="13" r="8"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4l2 2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3L2 6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 6l-3-3" />
      </svg>
    ),
  },
  {
    id: 1,
    title: "Identifying buying urgency windows",
    description: "We identify the moments when internal urgency is most likely to rise and enterprise buying is more likely to accelerate.",
    imagePath: "/framework/2.jpg", 
    icon: (
      <svg className="w-14 h-14 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6v8a8 8 0 1016 0V6M4 6h4v4H4zM16 6h4v4h-4z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Connecting With Buyer Context",
    description: "We craft messaging around what is happening inside the account right now. That makes conversations more relevant, credible, and commercially aligned.",
    imagePath: "/framework/3.jpg", 
    icon: (
      <svg className="w-14 h-14 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Building Internal Buy-In Early",
    description: "Enterprise deals move faster when your company feels more trusted, more familiar, and easier to support internally. We help build that confidence early, before formal evaluation slows the deal down.",
    imagePath: "/framework/4.jpg", 
    icon: (
      <svg className="w-14 h-14 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  }
];

export default function FrameworkSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // For desktop display when no option is clicked, default to the first item visually
  const displayIndex = activeIndex !== null ? activeIndex : 0;

  return (
    <section className="w-full bg-[#F0EDE6] pb-24 px-6 flex flex-col items-center">
      {/* Headings */}
      <h3 className="text-[#5b5b72] text-[14px] md:text-[15px] font-semibold tracking-wider uppercase mb-4">
        Hola CXO's Framework That Closes
      </h3>
      <h2 className="text-3xl md:text-[42px] text-[#1A3FA8] font-medium text-center mb-16">
        Enterprise Deals in 90 Days
      </h2>

      {/* Main Grid container */}
      <div className="w-full max-w-[1240px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column - Buttons & Mobile Accordion */}
        <div className="lg:col-span-5 flex flex-col gap-4 md:gap-8 h-full">
          {frameworkData.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={item.id} className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className={`flex items-center justify-between gap-5 py-3 px-6 md:px-8 text-left transition-all duration-300 border-none outline-none min-h-[80px]
                    ${isActive 
                      ? "bg-[#161662] text-white shadow-xl" 
                      : "bg-[#E5E2DC] text-[#161662] hover:bg-[#DCD8D0]"
                    }
                    ${activeIndex === null && index === 0 ? "lg:bg-[#161662] lg:text-white lg:shadow-xl" : ""}
                  `}
                >
                  <div className="flex items-center gap-5">
                    <div className={isActive ? "text-white" : `text-[#161662] ${activeIndex === null && index === 0 ? "lg:text-white" : ""}`}>
                      {item.icon}
                    </div>
                    <span className="text-[18px] md:text-[22px] font-medium leading-[1.2] max-w-[280px]">
                      {item.title}
                    </span>
                  </div>
                  
                  {/* Chevron for mobile */}
                  <div className="lg:hidden flex-shrink-0">
                    <svg 
                      className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Mobile Accordion Content */}
                {isActive && (
                  <div className="lg:hidden bg-[#161662] w-full p-6 flex flex-col items-start justify-start shadow-xl">
                    <p className="text-white text-base md:text-lg font-medium text-left leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="w-full shadow-2xl overflow-hidden rounded-sm mt-auto">
                      <Image 
                        src={item.imagePath} 
                        alt={item.title} 
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto block object-cover" 
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column - Dynamic Content (Desktop Only) */}
        <div className="hidden lg:flex lg:col-span-7 bg-[#161662] w-full h-full p-10 flex-col items-start justify-start shadow-xl">
          <p className="text-white text-lg font-medium text-left leading-relaxed mb-6 max-w-2xl flex-shrink-0">
            {frameworkData[displayIndex].description}
          </p>

          <div className="w-full shadow-2xl overflow-hidden rounded-sm mt-auto">
            <Image 
              src={frameworkData[displayIndex].imagePath} 
              alt={frameworkData[displayIndex].title} 
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto block object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
