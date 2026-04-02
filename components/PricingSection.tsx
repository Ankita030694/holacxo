import React from 'react';
import Image from 'next/image';

export default function PricingSection() {
  const plans = [
    {
      tag: "Pipeline builder",
      title: "Growth",
      desc: "For B2B tech companies building their first enterprise pipeline. You have the product. We build the momentum.",
      price: "From $5K/mo",
      subPrice: "Retainer · Min. 3 months · Custom scope",
      featuresHeader: "WHAT'S INCLUDED",
      features: [
        "Signal mapping — 1,000+ accounts/month",
        "Buying window identification",
        "Context-led outreach and messaging",
        "Appointment setting",
        "Follow-up and nurture sequences"
      ],
      buttonLabel: "Talk to us",
      primary: false
    },
    {
      tag: "Most chosen",
      title: "Full-cycle GTM",
      desc: "For companies ready to run multiple enterprise deals simultaneously with end-to-end orchestration and CXO-level access.",
      price: "Custom/mo",
      subPrice: "Based on your annual revenue goal · Scoped to your market",
      featuresHeader: "EVERYTHING IN GROWTH, +",
      features: [
        "CXO-to-CXO introductions",
        "Internal champion development",
        "Multi-deal orchestration — 5+ in parallel",
        "RFP positioning — before procurement opens",
        "Signal to signed — full deal lifecycle"
      ],
      buttonLabel: "Design my GTM",
      primary: true
    }
  ];
  return (
    <section className="w-full bg-[#F0EDE6] py-12 sm:py-16 px-4 sm:px-6 md:px-12 flex flex-col items-center">
      
      {/* Centered Header */}
      <div className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto">
        <p className="text-[#5B5D71] font-semibold tracking-widest text-[12px] sm:text-[13px] uppercase mb-3 sm:mb-4">
          PRICING
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[44px] font-semibold text-[#1A3FA8] leading-tight mb-4 sm:mb-6">
          Priced around your revenue goal. <br className="hidden md:block" /> Not our volume.
        </h2>
        <p className="text-[#5B5D71] text-sm sm:text-lg md:text-[19px] leading-relaxed max-w-3xl mx-auto">
          We don&apos;t sell packages. We build a GTM motion around the annual number you want to hit — and price accordingly. Most clients start at $5K/month and see their first enterprise conversation within five days.
        </p>
      </div>

      <div className="relative w-full max-w-6xl rounded-lg overflow-hidden flex flex-col items-center py-4 sm:py-8 px-4 sm:px-6 md:px-10 shadow-2xl">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 bg-[#0A0706]">
          <Image
            src="/whyWeAreDifferent/Compare.jpg.jpeg"
            alt="Pricing Background"
            fill
            className="object-cover opacity-80"
          />
          {/* Fallback dark overlay */}
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        </div>

        {/* Foreground Content - Two Pricing Cards Grid */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-stretch pt-2">
          
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col p-6 sm:p-8 md:p-10 border border-white/5 transition-all duration-300 relative overflow-hidden backdrop-blur-sm ${
                plan.primary ? 'bg-white/[0.03]' : 'bg-transparent'
              }`}
            >
              {/* Top Tag */}
              <div className="flex mb-4 sm:mb-6">
                <span className={`px-4 py-1.5 text-[13px] font-bold uppercase tracking-wider rounded-sm ${
                  plan.primary ? 'bg-[#3A6DFF] text-white' : 'bg-[#F2F0EB] text-[#1A3FA8]'
                }`}>
                  {plan.tag}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-white text-2xl sm:text-3xl font-medium mb-2 sm:mb-3">
                {plan.title}
              </h3>
              <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed mb-5 sm:mb-8 min-h-[40px]">
                {plan.desc}
              </p>

              {/* Pricing */}
              <div className="mb-5 sm:mb-8">
                <div className="text-white text-3xl sm:text-5xl md:text-[50px] font-semibold tracking-tight mb-1 sm:mb-2">
                  {plan.price}
                </div>
                <div className="text-white/50 text-xs sm:text-sm font-medium">
                  {plan.subPrice}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/10 mb-5 sm:mb-8"></div>

              {/* Features List */}
              <div className="flex-1">
                <h4 className="text-white/40 text-[12px] sm:text-[13px] font-bold tracking-widest uppercase mb-4 sm:mb-6">
                  {plan.featuresHeader}
                </h4>
                <div className="flex flex-col gap-3 sm:gap-5 mb-6 sm:mb-10">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex gap-4 items-start">
                      <svg className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/90 text-[15px] leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <button 
                className={`w-full py-4 font-bold text-base transition-all duration-300 rounded-sm ${
                  plan.primary 
                  ? 'bg-[#3A6DFF] text-white hover:bg-[#2A5DFF] shadow-[0_12px_24px_rgba(58,109,255,0.3)]' 
                  : 'bg-[#F2F0EB] text-[#1A3FA8] hover:bg-white'
                }`}
              >
                {plan.buttonLabel}
              </button>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
