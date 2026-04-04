import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BlogHero from "@/components/BlogHero";
import FeaturedArticle, { Blog } from "@/components/FeaturedArticle";
import OtherArticles from "@/components/OtherArticles";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Insights & Strategy Blog | HolaCXO",
  description: "Read our latest insights on B2B GTM strategy, enterprise pipeline generation, and closing multi-million dollar deals.",
  alternates: {
    canonical: "https://www.holacxo.com/blog",
  },
};

// Explicitly set revalidation or dynamic behavior if needed
export const dynamic = 'force-dynamic';

async function getBlogs(): Promise<Blog[]> {
  try {
    const blogsCollection = collection(db, "blogs");
    const q = query(blogsCollection, orderBy("created", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Blog));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogPage() {
  const allBlogs = await getBlogs();
  
  const featuredBlog = allBlogs.length > 0 ? allBlogs[0] : undefined;
  const otherBlogs = allBlogs.length > 1 ? allBlogs.slice(1) : [];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.holacxo.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.holacxo.com/blog"
      }
    ]
  };

  return (
    <main className="w-full flex flex-col bg-[#EBE7DF]">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Section */}
      <BlogHero />

      {/* Featured Article - Overlaps Hero and Below Section */}
      {featuredBlog && <FeaturedArticle blog={featuredBlog} />}

      {/* Other Articles Section */}
      {otherBlogs.length > 0 && <OtherArticles articles={otherBlogs} />}

      <FaqSection />
      <CtaSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
