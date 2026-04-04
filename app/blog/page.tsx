import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BlogHero from "@/components/BlogHero";
import FeaturedArticle, { Blog } from "@/components/FeaturedArticle";
import OtherArticles from "@/components/OtherArticles";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Navbar from "@/components/Navbar";

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

  return (
    <main className="w-full flex flex-col bg-[#EBE7DF]">
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
