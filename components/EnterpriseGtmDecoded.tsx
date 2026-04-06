import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string; 
  subtitle?: string;
  created?: number;
  slug: string;
}

interface EnterpriseGtmDecodedProps {
  articles?: Blog[];
}

export default function EnterpriseGtmDecoded({ articles = [] }: EnterpriseGtmDecodedProps) {
  // Function to strip HTML tags for the description snippet
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  };

  if (articles.length === 0) return null;

  return (
    <section className="w-full bg-[#F0EDE6] py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-[#1A3FA8] text-3xl md:text-[44px] font-bold tracking-tight md:mb-16 text-center">
        Enterprise GTM Decoded
      </h2>

      {/* Cards Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" style={{scale: 0.9}}>
        {articles.map((article, idx) => (
          <Link href={`/blog/${article.slug}`} key={article.id} className="flex flex-col group cursor-pointer">
            {/* Top Image Container */}
            <div className="w-full aspect-[4/3] bg-[#F1F4F8] flex items-center justify-center relative overflow-hidden">
              {article.image ? (
                <Image 
                  src={article.image} 
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="p-8">
                  <svg 
                    className="w-28 h-28 md:w-32 md:h-32 text-[#6D7B8C]" 
                    viewBox="0 0 100 100" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="8" y="8" width="84" height="84" rx="4" fill="currentColor"/>
                    <circle cx="32" cy="32" r="8" fill="#F1F4F8"/>
                    <path d="M8 92L46 44L68 68L88 50V92H8Z" fill="#F1F4F8"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Bottom Content Container */}
            <div className="w-full bg-[#E5E3DD] p-6 md:p-8 flex flex-col flex-grow">
              <span className="text-[#3A6DFF] text-[13px] md:text-sm font-medium tracking-wide uppercase mb-3">
                STORIES
              </span>
              
              <h3 className={`text-[#1A2045] text-[18px] md:text-[22px] leading-tight font-medium mb-4 group-hover:text-[#1A3FA8] group-hover:underline decoration-2 underline-offset-4 transition-all line-clamp-2`}>
                {article.title}
              </h3>
              
              <p className="text-[#5B5D71] text-[14px] md:text-[15px] leading-relaxed mb-8 flex-grow line-clamp-3">
                {article.subtitle || stripHtml(article.description).substring(0, 150) + '...'}
              </p>
              
              <span className="text-[#1A2045] font-semibold text-[15px] flex items-center group-hover:text-[#3A6DFF] transition-colors">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
