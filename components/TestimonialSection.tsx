"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "“Working with Hola CXO completely changed how we approach enterprise sales. Within the first few weeks, we were already in meaningful conversations with senior decision-makers, not just collecting leads. Their signal-led outreach and deep understanding of buying cycles helped us enter deals at the right moment, which significantly shortened our sales cycle. Instead of chasing volume”",
    name: "Lauren Meyers",
    title: "Growth Strategist",
    id: 1
  },
  {
    quote: "“The level of strategic insight Hola CXO brings is unparalleled. They don’t just provide leads; they provide bridges to the right people at the right companies. Our pipeline has never been healthier, and for the first time, our sales team isn't just busy—they're effective. Their approach is data-backed yet deeply human, which is rare in this space.”",
    name: "Marcus Chen",
    title: "Head of Sales",
    id: 2
  },
  {
    quote: "“We struggled with long sales cycles for years. Hola CXO's framework allowed us to identify intent signals we were completely missing. They taught us how to speak the language of decision-makers. The transformation was immediate. Our win rate for enterprise contracts has increased by 40% in just two quarters. Truly a game-changer for us.”",
    name: "Sarah Jenkins",
    title: "CEO, TechFlow",
    id: 3
  },
  {
    quote: "“Hola CXO is not just a service provider; they are a strategic partner. They took the time to understand our complex product and helped us simplify our message for the C-suite. Their outreach strategy is sophisticated and gets results. We've booked more high-value demos in the last month than we did in the entire previous year.”",
    name: "David Rodriguez",
    title: "VP Business Development",
    id: 4
  },
  {
    quote: "“The precision of their outreach is what sets them apart. We no longer waste time on companies that aren't ready to buy. Hola CXO's signal-based approach means we're hitting companies exactly when they need us. It’s significantly boosted our ROI and team morale. Our sales development reps are finally seeing the fruit of their labor.”",
    name: "Elena Petrova",
    title: "Director of Marketing",
    id: 5
  },
  {
    quote: "“In the crowded world of sales automation, Hola CXO stands out with their focus on quality and strategy. They’ve helped us build a predictable revenue engine by focusing on high-intent accounts. Their guidance on enterprise deal management was the missing piece in our growth strategy. I can't recommend them highly enough to any B2B SaaS.”",
    name: "James Wilson",
    title: "Founder, ScaleUp",
    id: 6
  }
];

export default function TestimonialSection() {
  // Triple the array for seamless infinite scrolling
  const displayItems = [...testimonials, ...testimonials, ...testimonials];
  const [currentIndex, setCurrentIndex] = useState(testimonials.length);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Handle instant jump for infinite loop
  useEffect(() => {
    if (currentIndex >= testimonials.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(testimonials.length);
      }, 500); // Wait for animation duration
      return () => clearTimeout(timer);
    }
    if (currentIndex <= testimonials.length - 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(testimonials.length * 2 - 1);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsTransitioning(true);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 2000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="bg-white flex flex-col items-start text-left shadow-xl p-8 lg:p-10 h-full border border-[#0000000a]">
      {/* Stars */}
      <div className="flex gap-[3px] mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className="w-[18px] h-[18px] text-[#FFDE00]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <p className="text-[#161662] text-[16px] md:text-[17px] leading-[1.6] mb-12 flex-1 italic">
        {testimonial.quote}
      </p>

      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full bg-[#FFA09E] shrink-0 flex items-center justify-center text-white font-bold text-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="text-[#161662] font-semibold text-[16px]">{testimonial.name}</span>
          <span className="text-[#5A5B74] text-[13px] mt-0.5">{testimonial.title}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#F0EDE6] py-24 flex flex-col items-center overflow-hidden">
      <div className="text-center mb-10 px-6">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#5b5b72] text-[15px] md:text-[18px] font-bold tracking-[0.2em] uppercase mb-4"
        >
          Success Stories
        </motion.h3>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-[44px] text-[#1A3FA8] font-bold max-w-4xl mx-auto mb-4"
        >
          Real Outcomes From Teams Closing Enterprise Deals Faster.
        </motion.h2>

      </div>

      <div className="relative w-full max-w-7xl px-8" 
           onMouseEnter={() => setIsPaused(true)}
           onMouseLeave={() => setIsPaused(false)}>
        
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 hidden md:block">
          <button 
            onClick={handlePrev}
            className="p-4 bg-white hover:bg-[#1A3FA8] hover:text-white text-[#1A3FA8] rounded-full shadow-xl transition-all border border-[#0000000a] group"
          >
            <ChevronLeft size={28} />
          </button>
        </div>
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 hidden md:block">
          <button 
            onClick={handleNext}
            className="p-4 bg-white hover:bg-[#1A3FA8] hover:text-white text-[#1A3FA8] rounded-full shadow-xl transition-all border border-[#0000000a] group"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <motion.div 
            className="flex"
            animate={{
              x: `-${(currentIndex / displayItems.length) * 100}%`
            }}
            transition={isTransitioning ? {
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 1
            } : { duration: 0 }}
            style={{ width: `${(displayItems.length / visibleCards) * 100}%` }}
          >
            {displayItems.map((testimonial, idx) => (
              <div 
                key={`${testimonial.id}-${idx}`}
                className="w-full shrink-0 px-3 lg:px-4"
                style={{ width: `${100 / displayItems.length}%` }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(testimonials.length + idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex % testimonials.length === idx 
                ? 'w-10 bg-[#1A3FA8]' 
                : 'w-2.5 bg-[#1A3FA840] hover:bg-[#1A3FA880]'
              }`}
            />
          ))}
        </div>
      </div>


      {/* Mobile Swipe Notice (Only visible on small screens) */}
      <div className="md:hidden mt-8 text-[#5A5B74] text-sm font-medium animate-pulse">
        Swipe to see more
      </div>
    </section>
  );
}

