import React from 'react';

export default function ContactStats() {
  const stats = [
    {
      label: "Estimated retainer",
      value: "$5K",
      sublabel: "starting point"
    },
    {
      label: "Pipeline we target",
      value: "$4M",
      sublabel: "annual pipeline"
    },
    {
      label: "Est. deal cycle",
      value: "3–6 mo",
      sublabel: "to first close"
    }
  ];

  return (
    <section className="w-full bg-[#F0EDE6] py-12 sm:py-20 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 md:gap-12">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-[#E0DDD6] p-6 sm:p-10 md:p-12 flex flex-col items-start min-h-[180px] sm:min-h-[280px] md:min-h-[320px] justify-between shadow-sm"
          >
            <h4 className="text-[#161662] text-lg md:text-xl font-medium">
              {stat.label}
            </h4>
            
            <div className="flex flex-col gap-2">
              <span className="text-[#161662] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
                {stat.value}
              </span>
              <span className="text-[#161662]/80 text-lg font-medium">
                {stat.sublabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
