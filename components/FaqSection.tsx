'use client';

import React, { useState } from 'react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is this worth the cost compared to hiring in-house?",
      answer: "An in-house enterprise SDR costs $80–120K per year in salary alone, plus tools, management, ramp time, and benefits. Most take 6–9 months to hit quota — if they ever do. Hola CXO is operational in 5 days, brings existing deal behaviour data, and costs a fraction of a full-time hire. The first deal we close typically covers the full year's retainer."
    },
    {
      question: "What exactly am I paying for?",
      answer: "You are paying for pipeline momentum — not activity. That means signal mapping, account selection, content-led outreach, appointment setting, deal orchestration, champion development, content, and full follow-through. Everything is tied to moving your deals forward, not generating vanity metrics."
    },
    {
      question: "How quickly will I see results?",
      answer: "Week 1 — first enterprise conversations booked. Week 3 — serious CXO-level engagement underway. Month 1–2 — deal momentum with multiple accounts in parallel. Month 3 — low-hanging fruit reaches contract stage. We enter accounts at their natural buying window, which is why the cycle is dramatically shorter than traditional outbound."
    },
    {
      question: "Do you work with companies outside the US?",
      answer: "Yes. We run enterprise GTM across North America, EMEA, and APAC. Our signal dataset and buying behaviour intelligence spans global enterprise accounts. Geography changes the entry point and cultural mechanics — not the framework."
    },
    {
      question: "Is there a minimum commitment?",
      answer: "We ask for a minimum of 3 months. Enterprise deals have natural timelines — 3 months lets us identify the right buying windows, enter accounts at the right moment, and show meaningful pipeline progress. We are not a campaign. We are a GTM motion."
    },
    {
      question: "How is pricing determined?",
      answer: "Pricing is set around your annual revenue goal — not our volume or package tiers. We scope the engagement to match your target, your market, and the number of deals we need to run in parallel to get you there. Growth starts from $5K/month. Fully-cycle GTM is custom-scoped in a discovery call."
    },
    {
      question: "Is there a refund clause?",
      answer: "Yes. If we miss the estimated results we commit to at the start of your engagement, we refund 100% of your retainer fee. No negotiation, no caveats."
    }
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#F0EDE6] py-14 sm:py-24 px-4 sm:px-6 flex flex-col items-center">
      <h2 className="text-[#1A3FA8] text-2xl sm:text-3xl md:text-[42px] font-medium mb-10 sm:mb-20 text-center">
        FAQ - Enterprise GTM
      </h2>

      <div className="w-full max-w-4xl flex flex-col">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border-b border-[#1A2045]/20 overflow-hidden"
          >
            <button 
              onClick={() => toggle(index)}
              className="w-full py-5 sm:py-8 flex justify-between items-center text-left group"
            >
              <span className="text-[#1A2045] text-base sm:text-xl md:text-2xl font-medium pr-4 sm:pr-8">
                {faq.question}
              </span>
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {openIndex === index ? (
                  <svg className="w-6 h-6 text-[#1A2045]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-[#1A2045]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-[400px] opacity-100 pb-6 sm:pb-10' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-[#5B5D71] text-sm sm:text-lg md:text-[19px] leading-relaxed pr-4 sm:pr-12">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
