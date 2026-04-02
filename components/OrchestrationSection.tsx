import React from 'react';
import Image from 'next/image';

export default function OrchestrationSection() {
  const columns = [
    {
      title: "Outbound",
      subtitle: "Direct reach",
      items: ["LinkedIn outbounds", "Email outreach", "Cold calling", "ABM"]
    },
    {
      title: "Inbound",
      subtitle: "Pull and attract",
      items: ["LinkedIn inbound", "Content Marketing", "Personal branding"]
    },
    {
      title: "Network",
      subtitle: "Warm access",
      items: ["Executive network", "Partner network", "PR and thought leadership"]
    }
  ];

  return (
    <section className="w-full bg-[#F0EDE6] py-24 md:py-10 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center z-0">
      
      {/* Headings */}
      <div className="text-center mb-16 relative z-10">
        <h3 className="text-[#5B5D71] text-[14px] md:text-[15px] font-medium tracking-wide uppercase mb-6">
          HOW WE ORCHESTRATE ENTERPRISE DEALS
        </h3>
        <h2 className="text-2xl md:text-[40px] lg:text-[42px] text-[#1A3FA8] font-medium leading-[1.3] max-w-4xl mx-auto px-4">
          A multi-channel GTM motion designed to move $100K+ ACV deals from first touch to closed revenue.
        </h2>
      </div>

      {/* Main Container for Chart */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center mt-10">
        
        {/* Glow effect matching color #A2BAFF behind the logo/trunk */}
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#A2BAFF] rounded-full blur-[110px] opacity-[0.85] pointer-events-none z-0"></div>

        {/* Top Node (LOGO) */}
        <div className="flex items-center justify-center w-[150px] md:w-[220px] h-[55px] md:h-[75px] mb-[-1px] relative z-20">
          <Image 
            src="/hero/Group 36.svg" 
            alt="Logo" 
            width={220} 
            height={75} 
            className="object-contain brightness-0"
          />
        </div>

        <div className="w-full h-[120px] md:h-[180px] relative z-10">
          <svg className="w-full h-full" viewBox="0 0 1000 180" preserveAspectRatio="none">
            <defs>
              <linearGradient 
                id="flowGradient" 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="150" 
                gradientUnits="userSpaceOnUse" 
                spreadMethod="repeat"
              >
                <stop offset="0%" stopColor="#3A6DFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#3A6DFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#3A6DFF" stopOpacity="0" />
                <animate 
                  attributeName="y1" 
                  from="0" 
                  to="150" 
                  dur="2s" 
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="y2" 
                  from="150" 
                  to="300" 
                  dur="2s" 
                  repeatCount="indefinite" 
                />
              </linearGradient>
            </defs>
            {/* Trunk split: Left Curve */}
            <path d="M 500 0 C 500 120, 166.6 70, 166.6 180" stroke="#3A6DFF" strokeWidth="12" className="md:stroke-[16] opacity-20" fill="none" />
            <path d="M 500 0 C 500 120, 166.6 70, 166.6 180" stroke="url(#flowGradient)" strokeWidth="12" className="md:stroke-[16]" fill="none" />
            
            {/* Trunk split: Right Curve */}
            <path d="M 500 0 C 500 120, 833.3 70, 833.3 180" stroke="#3A6DFF" strokeWidth="12" className="md:stroke-[16] opacity-20" fill="none" />
            <path d="M 500 0 C 500 120, 833.3 70, 833.3 180" stroke="url(#flowGradient)" strokeWidth="12" className="md:stroke-[16]" fill="none" />
            
            {/* Center Trunk */}
            <path d="M 500 0 L 500 180" stroke="#3A6DFF" strokeWidth="12" className="md:stroke-[16] opacity-20" fill="none" />
            <path d="M 500 0 L 500 180" stroke="url(#flowGradient)" strokeWidth="12" className="md:stroke-[16]" fill="none" />
          </svg>
        </div>

        {/* 3 Columns Grid */}
        <div className="w-full grid grid-cols-3 relative z-20 px-0 items-start">
          
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col items-center relative w-full">
              
              {/* Continuous vertical line running through the column with fade out at bottom */}
              <div className="absolute top-0 bottom-[28px] left-1/2 w-[8px] md:w-[16px] bg-[#3A6DFF]/20 transform -translate-x-1/2 -z-10 rounded-b-full overflow-hidden">
                <div className="absolute inset-0 animate-flow-down"></div>
              </div>
              
              {/* Column Header (Square, bordered) */}
              <div className="w-[90%] md:w-[85%] max-w-[220px] bg-[#EBE9E4] border border-[#1A2045]/20 py-3 md:py-6 px-1 md:px-4 text-center mb-[30px] md:mb-[50px] relative z-20 mt-[-2px]">
                <div className="text-[#1A2045] text-[12px] md:text-[20px] font-medium mb-0.5 md:mb-1.5 leading-tight">
                  {col.title}
                </div>
                <div className="text-[#5B5D71] text-[9px] md:text-[15px]">
                  {col.subtitle}
                </div>
              </div>

              {/* Items (Soft pill shape, large shadow, no border) */}
              <div className="flex flex-col gap-[20px] md:gap-[40px] items-center w-full">
                {col.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className="w-[90%] md:w-[85%] max-w-[220px] bg-[#E3E0DA]/95 backdrop-blur-md rounded-lg md:rounded-xl py-2.5 md:py-4 px-2 md:px-6 text-center shadow-[0_10px_20px_rgba(0,0,0,0.08)] flex items-center justify-center relative z-20"
                  >
                    <span className="text-[#1A2045] font-medium text-[10px] md:text-[16px] leading-[1.2] md:leading-[1.3]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              
            </div>
          ))}
          
        </div>
        
      </div>
    </section>
  );
}
