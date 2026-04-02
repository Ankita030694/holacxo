import React from 'react';

export default function TimelineSection() {
  const timelineData = [
    {
      time: "WEEK 1",
      title: "First conversations begin",
      desc: "We map the approval chain and sequence outreach to match how decisions actually move.",
      tag: "Conversations begin",
      side: "left"
    },
    {
      time: "WEEK 3",
      title: "Serious conversations",
      desc: "CXO-level engagement. Buying intent confirmed. Champions identified.",
      tag: "CXO-level access",
      side: "right"
    },
    {
      time: "MONTH 1–2",
      title: "Deal momentum established",
      desc: "Multiple deals in parallel. Champions active, stakeholders aligned.",
      tag: "Pipeline live",
      side: "left"
    },
    {
      time: "MONTH 3",
      title: "First deals close",
      desc: "Low-hanging fruit reaches contract stage. Revenue in, cycle proven.",
      tag: "Closed revenue",
      side: "right"
    }
  ];

  return (
    <section className="w-full bg-[#F0EDE6] py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Headings */}
      <div className="text-center mb-24 md:mb-32">
        <h3 className="text-[#5B5D71] text-[15px] font-medium tracking-[0.05em] uppercase mb-4">
          HOW SOON CAN YOU SEE RESULTS
        </h3>
        <h2 className="text-3xl md:text-[42px] text-[#1A3FA8] font-medium leading-[1.2] max-w-2xl mx-auto">
          From onboarding to closed deal in 90 days.
        </h2>
      </div>

      <div className="relative w-full max-w-5xl mx-auto pb-10">
        {/* Central Vertical Blue Line */}
        <div className="absolute left-[26px] md:left-1/2 top-4 bottom-0 w-1.5 bg-[#3B66F5] md:-translate-x-1/2 rounded-full z-0"></div>

        <div className="flex flex-col gap-12 md:gap-16">
          {timelineData.map((item, index) => {
            const isLeft = item.side === "left";

            return (
              <div key={index} className={`flex w-full relative ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* Mobile-only: Central Node Dot & Branch */}
                <div className="absolute left-[26px] top-[40%] w-[22px] h-[22px] bg-[#0B1038] rounded-full transform -translate-x-1/2 shadow-lg md:hidden z-10"></div>
                <div className="absolute left-[26px] top-[40%] mt-[9px] w-6 h-[4px] bg-[#0B1038] md:hidden z-0"></div>

                {/* Card Wrapper Desktop/Mobile */}
                <div className={`w-full md:w-1/2 flex relative
                  ${isLeft ? 'md:justify-end md:pr-14' : 'md:justify-start md:pl-14'}
                  pl-14 pr-0 md:pl-0`}
                >
                  
                  {/* Desktop: Horizontal branch line connected to vertical line */}
                  <div className={`hidden md:block absolute top-[40%] -translate-y-1/2 w-14 h-[4px] bg-[#0B1038] z-0
                      ${isLeft ? 'right-0' : 'left-0'}`}>
                  </div>
                  
                  {/* Desktop: Node Dot */}
                  <div className={`hidden md:block absolute top-[40%] -translate-y-1/2 w-[22px] h-[22px] bg-[#0B1038] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.4)] z-10
                      ${isLeft ? '-right-[11px]' : '-left-[11px]'}`}>
                  </div>

                  {/* Card Component */}
                  <div className="bg-[#C5D4FF] p-6 md:p-7 w-full max-w-[420px] shadow-sm transform transition-all duration-300">
                    <div className="text-[#161662] text-[15px] font-medium tracking-wide mb-2">
                      {item.time}
                    </div>
                    
                    <h3 className="text-[#161662] text-2xl md:text-[24px] font-medium leading-[1.3] mb-3">
                      {item.title}
                    </h3>
                    
                    <p className="text-[#3D3D5C] text-[15px] md:text-[16px] leading-[1.6] mb-5 pr-4">
                      {item.desc}
                    </p>
                    
                    <div className="border border-[#3D3D5C]/40 px-5 py-1.5 text-[#5B5D71] text-[14px] font-medium w-fit">
                      {item.tag}
                    </div>
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
