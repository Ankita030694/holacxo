import BlogHero from "@/components/BlogHero";
import FeaturedArticle from "@/components/FeaturedArticle";
import OtherArticles from "@/components/OtherArticles";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";

export default function BlogPage() {
  return (
    <main className="w-full flex flex-col bg-[#EBE7DF]">
      {/* Hero Section */}
      <BlogHero />

      {/* Featured Article - Overlaps Hero and Below Section */}
      <FeaturedArticle />

      {/* Other Articles Section */}
      <OtherArticles />

      <FaqSection />
      <CtaSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
