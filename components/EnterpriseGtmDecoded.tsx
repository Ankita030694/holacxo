import React from 'react';

export default function EnterpriseGtmDecoded() {
  const cards = [
    {
      label: "STORIES",
      title: "The Future of Digital Experiences in a Fast-Moving World",
      description: "Discover how modern businesses are leveraging technology, design, and data-driven strategies to build seamless user experiences that drive engagement and long-term growth across platforms.",
      linkText: "Read More \u2192",
      active: false,
    },
    {
      label: "STORIES",
      title: "The Future of Digital Experiences in a Fast-Moving World",
      description: "Discover how modern businesses are leveraging technology, design, and data-driven strategies to build seamless user experiences that drive engagement and long-term growth across platforms.",
      linkText: "Read More \u2192",
      active: true,
    },
    {
      label: "STORIES",
      title: "The Future of Digital Experiences in a Fast-Moving World",
      description: "Discover how modern businesses are leveraging technology, design, and data-driven strategies to build seamless user experiences that drive engagement and long-term growth across platforms.",
      linkText: "Read More \u2192",
      active: false,
    }
  ];

  return (
    <section className="w-full bg-[#F0EDE6] py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-[#1A3FA8] text-3xl md:text-[44px] font-bold tracking-tight md:mb-16 text-center">
        Enterprise GTM Decoded
      </h2>

      {/* Cards Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" style={{scale: 0.9}}>
        {cards.map((card, idx) => (
          <div key={idx} className="flex flex-col group cursor-pointer">
            {/* Top Image Container */}
            <div className="w-full aspect-[4/3] bg-[#F1F4F8] flex items-center justify-center p-8">
              {/* Custom SVG Placeholder Icon matching the design */}
              <svg 
                className="w-28 h-28 md:w-32 md:h-32 text-[#6D7B8C]" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Rect */}
                <rect x="8" y="8" width="84" height="84" rx="4" fill="currentColor"/>
                {/* Sun/Circle */}
                <circle cx="32" cy="32" r="8" fill="#F1F4F8"/>
                {/* Mountains */}
                <path d="M8 92L46 44L68 68L88 50V92H8Z" fill="#F1F4F8"/>
              </svg>
            </div>

            {/* Bottom Content Container */}
            <div className="w-full bg-[#E5E3DD] p-6 md:p-8 flex flex-col flex-grow">
              <span className="text-[#3A6DFF] text-[13px] md:text-sm font-medium tracking-wide uppercase mb-3">
                {card.label}
              </span>
              
              <h3 className={`text-[#1A2045] text-[18px] md:text-[22px] leading-tight font-medium mb-4 ${card.active ? 'underline decoration-2 underline-offset-4 text-[#1A3FA8]' : 'group-hover:text-[#1A3FA8] group-hover:underline decoration-2 underline-offset-4'} transition-all`}>
                {card.title}
              </h3>
              
              <p className="text-[#5B5D71] text-[14px] md:text-[15px] leading-relaxed mb-8 flex-grow">
                {card.description}
              </p>
              
              <span className="text-[#1A2045] font-semibold text-[15px] flex items-center group-hover:text-[#3A6DFF] transition-colors">
                {card.linkText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
