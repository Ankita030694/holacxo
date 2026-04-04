"use client";

import { useState } from "react";
import Image from "next/image";

const frameworkData = [
  {
    id: 0,
    title: "Capturing demand that already exists",
    description: "We use organizational buying signals to identify the accounts most likely to feel the strongest need for your product right now.",
    imagePath: "/framework/1.jpg", 
    iconWhite: "/enterprice-deals/1.svg",
    iconBlue: "/enterprice-deals/Group 41.svg",
  },
  {
    id: 1,
    title: "Identifying buying urgency windows",
    description: "We identify the moments when internal urgency is most likely to rise and enterprise buying is more likely to accelerate.",
    imagePath: "/framework/2.jpg", 
    iconWhite: "/enterprice-deals/2.svg",
    iconBlue: "/enterprice-deals/Group 42.svg",
  },
  {
    id: 2,
    title: "Connecting With Buyer Context",
    description: "We craft messaging around what is happening inside the account right now. That makes conversations more relevant, credible, and commercially aligned.",
    imagePath: "/framework/3.jpg", 
    iconWhite: "/enterprice-deals/3.svg",
    iconBlue: "/enterprice-deals/Vector.svg",
  },
  {
    id: 3,
    title: "Building Internal Buy-In Early",
    description: "Enterprise deals move faster when your company feels more trusted, more familiar, and easier to support internally. We help build that confidence early, before formal evaluation slows the deal down.",
    imagePath: "/framework/4.jpg", 
    iconWhite: "/enterprice-deals/4.svg",
    iconBlue: "/enterprice-deals/Group 43.svg",
  }
];

export default function FrameworkSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  
  // For desktop display when no option is clicked, default to the first item visually
  const displayIndex = activeIndex !== null ? activeIndex : 0;

  return (
    <section id="solution" className="w-full bg-[#F0EDE6] py-10 px-6 flex flex-col items-center">
      {/* Headings */}
      <h3 className="text-[#5b5b72] text-[14px] md:text-[18px] font-semibold tracking-wider uppercase mb-4">
        Hola CXO's Framework That Closes
      </h3>
      <h2 className="text-3xl md:text-[44px] text-[#1A3FA8] font-bold text-center mb-2">
        Enterprise Deals in 90 Days
      </h2>

      {/* Main Grid container */}
      <div className="w-full max-w-[1240px] grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch" style={{scale: 0.9}}>
        
        {/* Left Column - Buttons & Mobile Accordion */}
        <div className="lg:col-span-5 flex flex-col gap-4 md:gap-22 h-full">
          {frameworkData.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={item.id} className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className={`flex items-center justify-between gap-5 py-3 px-6 md:px-6 text-left transition-all duration-300 border-none outline-none min-h-[120px]
                    ${isActive 
                      ? "bg-[#161662] text-white shadow-xl" 
                      : "bg-[#E5E2DC] text-[#161662] hover:bg-[#DCD8D0]"
                    }
                    ${activeIndex === null && index === 0 ? "lg:bg-[#161662] lg:text-white lg:shadow-xl" : ""}
                  `}
                >
                  <div className="flex items-center gap-5">
                    <div className={isActive ? "text-white" : `text-[#161662] ${activeIndex === null && index === 0 ? "lg:text-white" : ""}`}>
                      {isActive && (
                        <Image src={item.iconWhite} alt={item.title} width={56} height={56} className="w-14 h-14 flex-shrink-0" />
                      )}
                      
                      {!isActive && activeIndex === null && index === 0 && (
                        <>
                          <Image src={item.iconBlue} alt={item.title} width={56} height={56} className="w-14 h-14 flex-shrink-0 lg:hidden" />
                          <Image src={item.iconWhite} alt={item.title} width={56} height={56} className="w-14 h-14 flex-shrink-0 hidden lg:block" />
                        </>
                      )}

                      {!isActive && !(activeIndex === null && index === 0) && (
                         <Image src={item.iconBlue} alt={item.title} width={56} height={56} className="w-14 h-14 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-[18px] md:text-[26px] font-light leading-[1.2] max-w-[580px]">
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
                        width={1200}
                        height={800}
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
        <div className="hidden lg:flex lg:col-span-7 bg-[#161662] w-full h-full p-6 flex-col items-start justify-start shadow-xl">
          <p className="text-white text-lg font-medium text-left leading-relaxed mb-6 max-w-2xl flex-shrink-0">
            {frameworkData[displayIndex].description}
          </p>

          <div className="w-full shadow-2xl overflow-hidden rounded-sm mt-auto">
            <Image 
              src={frameworkData[displayIndex].imagePath} 
              alt={frameworkData[displayIndex].title} 
              width={1200}
              height={800}
              sizes="100vw"
              className="w-full h-auto block object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
