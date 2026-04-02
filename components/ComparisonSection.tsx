import React from 'react';
import Image from 'next/image';

export default function ComparisonSection() {
  const comparisonData = [
    {
      other: "SDR methods applied to enterprise",
      us: "Enterprise deal behaviour mapping"
    },
    {
      other: "Volume without context. Land in spam.",
      us: "1,000+ accounts each with signals and context."
    },
    {
      other: "12–18 months. Pushing against locked doors.",
      us: "3–9 months. We enter at the right internal moment."
    },
    {
      other: "$1.8M / year. High volume, low conversion.",
      us: "$4M / year. Fewer accounts, higher-quality closes."
    },
    {
      other: "100 leads to 1 customer.",
      us: "5 leads to 1 customer."
    },
    {
      other: "Generic personas. No buying dynamics mapped.",
      us: (
        <>
          <span className="block">5 years of deal behaviour.</span>
          <span className="block text-white/70">Buying mechanics mapped before outreach begins.</span>
        </>
      )
    }
  ];

  return (
    <section className="w-full bg-[#F0EDE6] py-16 px-4 sm:px-6 md:px-12 flex justify-center">
      <div className="relative w-full max-w-6xl rounded-lg overflow-hidden flex flex-col items-center pt-12 pb-16 px-6 md:px-12 shadow-2xl">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 bg-[#0A0706]">
          {/* We assume the provided JPG handles the subtle gradient/lighting effect seen in the design */}
          <Image
            src="/whyWeAreDifferent/Compare.jpg.jpeg"
            alt="Comparison Background"
            fill
            className="object-cover opacity-80"
          />
          {/* Fallback dark overlay just in case image is too bright */}
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full flex flex-col items-center">
          
          <h3 className="text-white/70 tracking-widest text-sm font-semibold uppercase mb-4 text-center">
            HOLA CXO — WHY WE'RE DIFFERENT
          </h3>
          
          <h2 className="text-white text-3xl md:text-5xl lg:text-[48px] font-medium text-center max-w-3xl leading-tight mb-12 font-serif">
            Enterprise demand generation built around how deals actually close.
          </h2>

          {/* Comparison Table / Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm bg-black/20">
            
            {/* Left Column (Others) */}
            <div className="flex flex-col bg-[#1A1616]/70 pb-6">
              <div className="p-6 text-center text-white font-medium text-lg border-b border-white/10 mx-6 pt-6">
                Other B2B demand gen agencies
              </div>
              <div className="flex flex-col gap-6 px-8 xl:px-12 py-8">
                {comparisonData.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <svg className="w-5 h-5 text-[#FF4B4B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-white/90 text-[15px] sm:text-base leading-snug">
                      {item.other}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (Us) */}
            <div className="flex flex-col pb-6 relative">
              {/* Subtle distinct background for our column */}
              <div className="absolute inset-0 bg-white/5 z-0 pointer-events-none"></div>
              
              <div className="relative z-10 p-6 text-center text-white font-bold text-lg tracking-wide border-b border-white/10 mx-6 pt-6 flex items-center justify-center min-h-[80px]">
                {/* Logo Placeholder */}
                LOGO
              </div>
              <div className="relative z-10 flex flex-col gap-6 px-8 xl:px-12 py-8">
                {comparisonData.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <svg className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="text-white text-[15px] sm:text-base leading-snug">
                      {item.us}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
