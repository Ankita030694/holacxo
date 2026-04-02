import React from 'react';

export default function TestimonialSection() {
  const testimonials = Array(6).fill({
    quote: "“Working with Hola CXO completely changed how we approach enterprise sales. Within the first few weeks, we were already in meaningful conversations with senior decision-makers, not just collecting leads. Their signal-led outreach and deep understanding of buying cycles helped us enter deals at the right moment, which significantly shortened our sales cycle. Instead of chasing volume”",
    name: "Lauren Meyers",
    title: "Growth Strategist",
  });

  const TestimonialCard = ({ t, isMobile }: {t: any, isMobile?: boolean}) => (
    <div className={`bg-white flex flex-col items-start text-left shadow-sm ${isMobile ? 'w-[92vw] sm:w-[94vw] p-8 shrink-0 whitespace-normal mx-2' : 'p-8 lg:p-10 w-full'}`}>
      {/* Stars */}
      <div className="flex gap-[3px] mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className="w-[22px] h-[22px] text-[#FFDE00]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <p className="text-[#161662] text-[17px] leading-[1.6] mb-12 flex-1">
        {t.quote}
      </p>

      <div className="flex items-center gap-4 mt-auto">
        {/* Pink Avatar */}
        <div className="w-14 h-14 rounded-full bg-[#FFA09E] shrink-0"></div>
        <div className="flex flex-col">
          <span className="text-[#161662] font-medium text-[16px]">{t.name}</span>
          <span className="text-[#5A5B74] text-[14px] mt-0.5">{t.title}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#EBE8E1] py-24 flex flex-col items-center overflow-hidden">
      <div className="text-center mb-16 px-6">
        <h3 className="text-[#5b5b72] text-[16px] md:text-[15px] font-semibold tracking-wider uppercase mb-5">
          What Our Clients Say
        </h3>
        <h2 className="text-4xl md:text-[40px] text-[#1A3FA8] font-medium max-w-2xl mx-auto leading-snug">
          Real outcomes from teams closing enterprise deals faster.
        </h2>
      </div>

      {/* Mobile Marquee Carousel */}
      <div className="md:hidden w-full relative flex max-w-[100vw]">
        <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
          {[...testimonials, ...testimonials].map((t, idx) => (
            <TestimonialCard key={`mobile-${idx}`} t={t} isMobile={true} />
          ))}
        </div>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid w-full max-w-7xl grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-6">
        {testimonials.map((t, idx) => (
          <TestimonialCard key={`desktop-${idx}`} t={t} isMobile={false} />
        ))}
      </div>
    </section>
  );
}
