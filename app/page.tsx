import Image from "next/image";
import Link from "next/link";
import VideoSection from "../components/VideoSection";
import FrameworkSection from "../components/FrameworkSection";
import TrackRecordSection from "../components/TrackRecordSection";
import TestimonialSection from "../components/TestimonialSection";
import CtaSection from "../components/CtaSection";
import TimelineSection from "../components/TimelineSection";
import ComparisonSection from "../components/ComparisonSection";
import WhatMakesPossible from "../components/WhatMakesPossible";
import OrchestrationSection from "../components/OrchestrationSection";
import EnterpriseGtmDecoded, { Blog } from "../components/EnterpriseGtmDecoded";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Metadata } from "next";
import Script from "next/script";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const metadata: Metadata = {
  title: "B2B Pipeline Generation & GTM Strategy | HolaCXO",
  description: "Accelerate your enterprise sales with HolaCXO. We provide a proven GTM system designed to close enterprise deals in 90 days. Generate $5M+ ARR in pipeline.",
  alternates: {
    canonical: "https://www.holacxo.com",
  },
};

async function getBlogs(): Promise<Blog[]> {
  try {
    const blogsCollection = collection(db, "blogs");
    const q = query(blogsCollection, orderBy("created", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Blog));
  } catch (error) {
    console.error("Error fetching blogs for home page:", error);
    return [];
  }
}

export default async function Home() {
  const blogs = await getBlogs();
  const brandLogos = [
    "Clip path group.svg",
    "Company Logo 1.svg",
    "Group 29.svg",
    "Group 30.svg",
    "Vector.svg",
    "Ramco.svg",
    "salesforce 1.svg"
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HolaCXO",
    "url": "https://www.holacxo.com",
    "logo": "https://www.holacxo.com/favicon.ico",
    "description": "A GTM System Designed to Close Enterprise Deals in 90 Days",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+918700343611",
      "contactType": "sales",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.linkedin.com/company/holacxo",
      "https://twitter.com/holacxo"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HolaCXO",
    "url": "https://www.holacxo.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.holacxo.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <main className="w-full flex flex-col">
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col overflow-hidden bg-[#0A163B]">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Image */}
          <Image
            src="/hero/HERO IMAGE.png"
            alt="Hero Background"
            fill
            className="object-cover hidden sm:block"
            priority
          />
          {/* Mobile Image */}
          <Image
            src="/hero_mobile.png"
            alt="Hero Background Mobile"
            fill
            className="object-cover block sm:hidden"
            priority
          />
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Hero Content - Centered */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
          {/* Inner padded container for hero text */}
          <div className="px-6 flex flex-col items-center text-center">
            <h1 className="text-[32px] sm:text-[24px] md:text-[44px] lg:text-[64px] font-semibold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto px-2">
              Generate $5M+ ARR <br className="block sm:hidden" /> in Enterprise Pipeline
            </h1>
            
            <p className="mt-6 md:mt-6 text-[19px] sm:text-[17px] md:text-[21px] text-blue-100/70 font-medium max-w-2xl mx-auto px-4 leading-relaxed">
              A GTM System Designed to Close Enterprise Deals in 90 Days
            </p>

            <Link href="/contact" className="mt-10 md:mt-10 px-8 py-3 md:px-8 md:py-3.5 w-full sm:w-auto max-w-[220px] bg-[#f5f5f0] text-[#0A163B] rounded font-semibold text-[19px] hover:bg-white transition-colors shadow-lg shadow-white/5 flex items-center justify-center active:bg-[#1A3FA8] active:text-white active:scale-95">
              Get a demo
            </Link>
          </div>
        </div>

        {/* Brand Slider (At the Bottom) */}
        <div className="relative z-10 w-full flex flex-col items-center pb-12 md:pb-20 mt-auto">
          <p className="text-blue-100/80 text-[18px] md:text-[20px] mb-8 md:mb-10 px-6 text-center">
            Trusted by leading B2B software firms
          </p>
          
          <div className="w-full overflow-hidden mask-gradient relative flex">
            <div className="flex whitespace-nowrap animate-marquee items-center w-max hover:[animation-play-state:paused]">
              {/* Duplicate exactly 2 times so that -50% translateX is perfectly seamless */}
              {[...brandLogos, ...brandLogos].map((logo, index) => (
                <div key={index} className="flex-none px-12 md:px-20 flex items-center h-20 relative">
                  <div className={`relative ${logo.includes('salesforce') ? 'h-16 w-56 md:h-20 md:w-64' : 'h-10 w-40 md:h-12 md:w-48'}`}>
                    <Image
                      src={`/brandslider/${logo}`}
                      alt="Brand Logo"
                      fill
                      className="object-contain brightness-0 invert opacity-80"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video / Value Proposition Section */}
      <VideoSection />
      
      {/* Framework Interactive Section */}
      <FrameworkSection />

      {/* Track Record Section */}
      <TrackRecordSection />
      
      {/* Client Testimonial Section */}
      <TestimonialSection />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* What Makes Possible Section */}
      <WhatMakesPossible />

      {/* CTA Section */}
      <CtaSection />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Orchestration Chart Section */}
      <OrchestrationSection />

      {/* Enterprise GTM Decoded Section */}
      <EnterpriseGtmDecoded articles={blogs} />

      <CtaSection />


      {/* Main Footer */}
      <Footer />
    </main>
  );
}
