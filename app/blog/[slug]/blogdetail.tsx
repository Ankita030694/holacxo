'use client'
import { useEffect, useState, useMemo, memo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TableOfContents from '../../../components/TableOfContents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

// Lazy load heavy components
const LazyImage = dynamic(() => import('next/image'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
});

// Define interfaces
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

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
}

interface BlogDetailProps {
  blog: Blog;
  faqs: FAQ[];
  reviews: Review[];
  relatedBlogs: Blog[];
}

// Define author bios
const authorBios = {
  "Team HolaCXO": {
    name: "Team HolaCXO",
    description: "The expert team at HolaCXO providing strategic GTM insights, enterprise pipeline growth strategies, and direct CXO access solutions for B2B software firms.",
    image: "/hero/Group 36.svg",
    linkedInUrl: "https://www.linkedin.com/company/holacxo/"
  },
};

// Helper to process content and extract TOC
const processContent = (html: string) => {
  if (!html) return { content: '', sections: [] };
  const sections: { id: string, title: string }[] = [];
  // Regex to match h1-h4 tags, including potential newlines inside and attributes
  // Using [\s\S] instead of . to match across newlines if necessary
  const headingRegex = /<(h[1-4])([\s\S]*?)>([\s\S]*?)<\/\1>/gi;
  
  let modifiedContent = html.replace(headingRegex, (match, tag, attrs, title) => {
    // Strip HTML from title for the TOC label
    const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
    if (!cleanTitle) return match; // Skip empty headings

    // Extract existing ID if present
    const idMatch = attrs.match(/id=["'](.*?)["']/i);
    let id = "";

    if (idMatch && idMatch[1]) {
      id = idMatch[1];
    } else {
      // Generate ID from title if no ID exists
      id = cleanTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    }
    
    sections.push({ id, title: cleanTitle });
    
    // If ID already exists, return the match. Otherwise, inject our generated ID.
    if (idMatch) {
      return match;
    }
    
    return `<${tag} id="${id}"${attrs}>${title}</${tag}>`;
  });

  // Fix known broken links in blog content (from database)
  modifiedContent = modifiedContent
    .replace(/href=["']https:\/\/www\.amalegalsolutions\.com\/services\/legal-strategy["']/gi, 'href="/services"')
    .replace(/href=["']\/services\/legal-strategy["']/gi, 'href="/services"')
    .replace(/href=["']https:\/\/www\.amalegalsolutions\.com\/legal-notice-to-bank-format["']/gi, 'href="/how-can-i-send-legal-notice"')
    .replace(/href=["']\/legal-notice-to-bank-format["']/gi, 'href="/how-can-i-send-legal-notice"')
    .replace(/href=["']https:\/\/www\.amalegalsolutions\.com\/resources["']/gi, 'href="/blog"')
    .replace(/href=["']\/resources["']/gi, 'href="/blog"');

  // Strip nofollow from internal links (links to our own domain or relative paths)
  // This prevents SEO tools from flagging our own pages as "blocked by nofollow"
  modifiedContent = modifiedContent.replace(
    /<a\s([^>]*?)>/gi,
    (match, attrs) => {
      const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
      const href = hrefMatch ? hrefMatch[1] : '';
      const isInternal =
        href.startsWith('/') ||
        href.includes('://www.amalegalsolutions.com') ||
        href.includes('://amalegalsolutions.com');

      if (isInternal) {
        // Remove nofollow from rel attribute for internal links
        const cleanedAttrs = attrs.replace(
          /rel=["']([^"']*)["']/gi,
          (relMatch: string, relValue: string) => {
            const newRel = relValue
              .split(/\s+/)
              .filter((r: string) => r.toLowerCase() !== 'nofollow')
              .join(' ')
              .trim();
            return newRel ? `rel="${newRel}"` : '';
          }
        );
        return `<a ${cleanedAttrs}>`;
      }
      return match;
    }
  );
  
  return { content: modifiedContent, sections };
};


const ArticleDetail = memo(function ArticleDetail({ blog, faqs, reviews, relatedBlogs }: BlogDetailProps) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [expandedFaqs, setExpandedFaqs] = useState<string[]>([]);
  
  // Process content for TOC
  const { content: processedContent, sections: tocSections } = useMemo(() => {
    return processContent(blog.description);
  }, [blog.description]);

    useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const toggleFaq = (faqId: string) => {
    setExpandedFaqs(prev => 
      prev.includes(faqId)
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  const handleShare = (platform: string) => {
    const title = blog.title;
    let shareUrl = '';

    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: blog.title, href: `/blog/${blog.slug}` },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Image Section */}
      <div className="w-full h-[400px] md:h-[500px] relative bg-[#1a202c]">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: blog.image ? `url("${blog.image}")` : 'none' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 max-w-[1600px] py-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Blog Header Content */}
        <div className="text-center mb-12 max-w-4xl mx-auto mt-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            {blog.title}
          </h1>
          {blog.subtitle && (
            <p className="text-xl md:text-2xl mb-6 text-gray-600">
              {blog.subtitle}
            </p>
          )}
          <div className="flex justify-center items-center space-x-4 text-sm md:text-base text-gray-500">
            <span>{blog.date}</span>
            <span>•</span>
            <span>Team HolaCXO</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-8 items-start">
          
          {/* Left Sidebar - TOC (Desktop) */}
          <div className="hidden lg:block sticky top-24">
             <TableOfContents sections={tocSections} orientation="vertical" />
          </div>

          {/* Main Content Area */}
          <div className="min-w-0">
            {/* TOC (Mobile) */}
            <div className="lg:hidden mb-8">
               <TableOfContents sections={tocSections} />
            </div>

            <div className="bg-white border border-gray-100 p-6 md:p-12 rounded-2xl shadow-sm space-y-12">
              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none text-gray-700 tiptap-content"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Tiptap Styles */}
              <style jsx global>{`
                .tiptap-content { scroll-behavior: smooth; }
                .tiptap-content h1 { font-size: 2em; font-weight: bold; margin-top: 1.5em; margin-bottom: 0.8em; color: #0A163B; scroll-margin-top: 120px; }
                .tiptap-content h2 { font-size: 1.75em; font-weight: bold; margin-top: 1.5em; margin-bottom: 0.8em; color: #0A163B; scroll-margin-top: 120px; }
                .tiptap-content h3 { font-size: 1.5em; font-weight: bold; margin-top: 1.2em; margin-bottom: 0.6em; color: #1a202c; scroll-margin-top: 120px; }
                .tiptap-content h4 { font-size: 1.25em; font-weight: bold; margin-top: 1.2em; margin-bottom: 0.6em; color: #1a202c; scroll-margin-top: 120px; }
                .tiptap-content p { margin-bottom: 1.2em; line-height: 1.8; }
                .tiptap-content ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1.2em; }
                .tiptap-content ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 1.2em; }
                .tiptap-content li { margin-bottom: 0.5em; }
                .tiptap-content blockquote { border-left: 4px solid #0A163B; padding-left: 1em; font-style: italic; color: #4a5568; background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; }
                .tiptap-content img { border-radius: 0.5rem; box-shadow: 0 4px 15px -1px rgba(0, 0, 0, 0.1); margin: 2rem 0; }
                .tiptap-content a { color: #0A163B; text-decoration: underline; font-weight: 500; }
                .tiptap-content table { width: 100%; border-collapse: collapse; margin: 2rem 0; }
                .tiptap-content th { background: #f1f5f9; padding: 0.75rem; text-align: left; font-weight: 600; border: 1px solid #e2e8f0; }
                .tiptap-content td { padding: 0.75rem; border: 1px solid #e2e8f0; }
              `}</style>
              
              {/* Share Section */}
              <div className="border-t border-gray-100 pt-8 mt-8">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">Share this article:</span>
                  <div className="flex space-x-4">
                    <button onClick={() => handleShare('facebook')} className="text-gray-400 hover:text-[#0A163B] transition-colors">
                      <span className="sr-only">Facebook</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </button>
                    <button onClick={() => handleShare('twitter')} className="text-gray-400 hover:text-[#0A163B] transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                    </button>
                    <button onClick={() => handleShare('linkedin')} className="text-gray-400 hover:text-[#0A163B] transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              {reviews.length > 0 && (
                <section id="reviews" className="scroll-mt-32 border-t border-gray-100 pt-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Client Reviews</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative">
                        <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-[#0A163B] opacity-10 absolute top-4 left-4" />
                        <div className="relative z-10">
                          <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <FontAwesomeIcon 
                                  key={i} 
                                  icon={faStar} 
                                  className={i < review.rating ? "text-yellow-400" : "text-gray-300"} 
                                />
                              ))}
                            </div>
                            <span className="font-bold text-gray-900">{review.rating}.0</span>
                          </div>
                          <p className="text-gray-600 italic mb-4">"{review.review}"</p>
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-3">
                              <FontAwesomeIcon icon={faUser} />
                            </div>
                            <p className="font-bold text-gray-900">{review.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs Section */}
              {faqs.length > 0 && (
                <section id="faqs" className="scroll-mt-32 border-t border-gray-100 pt-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="border border-gray-100 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="flex justify-between items-center w-full text-left p-4 font-medium text-gray-900 hover:bg-gray-50 focus:outline-none transition-colors"
                        >
                          <span className="flex items-center">
                            <span className="text-[#0A163B] mr-3 font-bold">Q.</span>
                            {faq.question}
                          </span>
                          <span className={`transform transition-transform duration-200 ${expandedFaqs.includes(faq.id) ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </span>
                        </button>
                        {expandedFaqs.includes(faq.id) && (
                          <div className="px-4 pb-4 pt-0 text-gray-600 leading-relaxed pl-10 border-t border-gray-50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Articles */}
              {relatedBlogs.length > 0 && (
                <section className="border-t border-gray-100 pt-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {relatedBlogs.map((article) => (
                      <Link key={article.id} href={`/blog/${article.slug}`} className="group">
                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={article.image || '/placeholder-blog.jpg'} 
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-bold text-[#0A163B]">
                              {article.date}
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#0A163B] transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            {article.subtitle && (
                              <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
                                {article.subtitle}
                              </p>
                            )}
                            <span className="text-[#0A163B] font-medium text-sm flex items-center mt-auto">
                              Read Article <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Right Sidebar - Author & CTA */}
          <div className="space-y-8 sticky top-24">
              {/* Author Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">About Author</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-black flex items-center justify-center p-2">
                    <img 
                      src={authorBios["Team HolaCXO"]?.image || "/hero/Group 36.svg"}
                      alt="Team HolaCXO"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Team HolaCXO</h4>
                    <Link 
                      href="/about"
                      className="text-xs text-[#0A163B] hover:underline"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                  {authorBios["Team HolaCXO"]?.description}
                </p>
                
              </div>

              {/* Contact Card */}
              <div className="bg-[#0A163B] p-6 rounded-xl shadow-xl text-white">
                <h3 className="text-xl font-bold mb-4">Need Pipeline Growth?</h3>
                <p className="text-blue-100/70 mb-6 text-sm leading-relaxed">
                  Get expert advice on enterprise GTM and CXO-direct strategies.
                </p>
                <Link 
                  href="/contact" 
                  className="block w-full bg-[#f5f5f0] text-[#0A163B] text-center py-3 rounded font-semibold hover:bg-white transition-colors mb-4"
                >
                  Book a Strategy Call
                </Link>
                <Link 
                  href="/contact" 
                  className="block w-full border border-white/20 text-white text-center py-3 rounded font-semibold hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
});

export default ArticleDetail;
