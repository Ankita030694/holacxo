"use client";
import Image from "next/image";
import Link from "next/link";

export interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string; 
  subtitle?: string;
  created?: number;
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  author?: string;
}

interface OtherArticlesProps {
  articles?: Blog[];
}

export default function OtherArticles({ articles = [] }: OtherArticlesProps) {
  // Function to strip HTML tags for the description snippet
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  };

  if (articles.length === 0) return null;

  return (
    <section className="w-full relative z-10 py-16 md:py-24 max-w-[1280px] mx-auto px-6">
      <h2 className="text-3xl md:text-[34px] font-bold text-[#1F3361] mb-12">
        Other Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {articles.map((article) => (
          <article 
            key={article.id} 
            className="flex flex-col overflow-hidden h-full transform transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Image Section */}
            <div className="w-full bg-[#EFF1F4] aspect-[16/10] flex items-center justify-center relative overflow-hidden">
              {article.image ? (
                <Image 
                  src={article.image} 
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-6">
                  {/* Placeholder SVG - Mountain Icon */}
                  <svg 
                    className="w-1/3 max-w-[100px] h-auto text-[#7A8491]" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5ZM6.5 9.5C6.5 8.1 7.6 7 9 7C10.4 7 11.5 8.1 11.5 9.5C11.5 10.9 10.4 12 9 12C7.6 12 6.5 10.9 6.5 9.5Z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="w-full flex-grow bg-[#E2DED6] p-5 lg:p-6 flex flex-col">
              <span className="text-[#6D93D3] text-[12px] font-semibold tracking-wider uppercase mb-2">
                INSIGHTS
              </span>
              
              <h3 className="text-[20px] md:text-[22px] font-medium text-[#1F3361] leading-[1.2] mb-3 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-[#727B8E] text-[14px] leading-relaxed mb-4 flex-grow line-clamp-3">
                {article.subtitle || stripHtml(article.description).substring(0, 120) + '...'}
              </p>
              
              <div className="mt-auto">
                <Link 
                  href={`/blog/${article.slug}`} 
                  className="inline-flex items-center text-[15px] text-[#1F3361] font-semibold hover:text-[#0a1128] transition-colors group"
                >
                  Read More
                  <svg 
                    className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

