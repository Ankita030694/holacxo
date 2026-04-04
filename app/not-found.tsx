import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A163B] text-white flex flex-col font-inter">
      <Navbar />
      
      <section className="flex-1 flex items-center justify-center relative overflow-hidden py-24 px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl w-full text-center">
          <h1 className="text-8xl sm:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/30 mb-8">
            404
          </h1>
          
          <h2 className="text-2xl sm:text-4xl font-semibold mb-6">Page Not Found</h2>
          
          <p className="text-lg text-blue-100/70 mb-10 leading-relaxed max-w-lg mx-auto">
            The page you are looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="px-8 py-4 bg-[#F2F0EB] text-[#0A163B] font-bold rounded hover:bg-white transition-all shadow-lg"
            >
              Return Home
            </Link>
            <Link 
              href="/blog"
              className="px-8 py-4 bg-white/5 text-white font-semibold rounded border border-white/10 hover:bg-white/10 transition-all"
            >
              Explore our Blog
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
