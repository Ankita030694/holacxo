'use client';

import React, { useState } from 'react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is this worth the cost compared to hiring in-house?",
      answer: "An in-house enterprise SDR costs $80–120K per year in salary alone, plus tools, management, ramp time, and benefits. Most take 6–9 months to hit quota — if they ever do. Hola CXO is operational in 5 days, brings existing deal behaviour data, and costs a fraction of a full-time hire. The first deal typically covers the full year's retainer."
    },
    {
      question: "Is this worth the cost compared to hiring in-house?",
      answer: "An in-house enterprise SDR costs $80–120K per year in salary alone, plus tools, management, ramp time, and benefits. Most take 6–9 months to hit quota — if they ever do. Hola CXO is operational in 5 days, brings existing deal behaviour data, and costs a fraction of a full-time hire. The first deal typically covers the full year's retainer."
    },
    {
      question: "Is this worth the cost compared to hiring in-house?",
      answer: "An in-house enterprise SDR costs $80–120K per year in salary alone, plus tools, management, ramp time, and benefits. Most take 6–9 months to hit quota — if they ever do. Hola CXO is operational in 5 days, brings existing deal behaviour data, and costs a fraction of a full-time hire. The first deal typically covers the full year's retainer."
    }
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#F0EDE6] py-24 px-6 flex flex-col items-center">
      <h2 className="text-[#1A3FA8] text-3xl md:text-[42px] font-medium mb-20 text-center">
        Common Questions
      </h2>

      <div className="w-full max-w-4xl flex flex-col">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border-b border-[#1A2045]/20 overflow-hidden"
          >
            <button 
              onClick={() => toggle(index)}
              className="w-full py-8 flex justify-between items-center text-left group"
            >
              <span className="text-[#1A2045] text-xl md:text-2xl font-medium pr-8">
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
                openIndex === index ? 'max-h-[300px] opacity-100 pb-10' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-[#5B5D71] text-lg md:text-[19px] leading-relaxed pr-12">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
