"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function ThankYouContent() {
  return (
    <main className="min-h-screen bg-[#0A163B] text-white flex flex-col font-inter">
      <Navbar />
      
      <section className="flex-1 flex items-center justify-center relative overflow-hidden py-24 px-4">
        {/* Decorative elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
        ></motion.div>
        
        <div className="relative z-10 max-w-2xl w-full text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8"
          >
            <motion.svg 
              className="w-10 h-10 text-emerald-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </motion.svg>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
          >
            Thank you!
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-blue-100/70 mb-10 leading-relaxed max-w-lg mx-auto"
          >
            Your inquiry has been received. Our team of GTM experts will review your details and get back to you within 24 hours.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/"
              className="px-8 py-4 bg-[#F2F0EB] text-[#0A163B] font-bold rounded hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:bg-[#1A3FA8] active:text-white active:scale-95"
            >
              Return Home
            </Link>
            <Link 
              href="/blog"
              className="px-8 py-4 bg-white/5 text-white font-semibold rounded border border-white/10 hover:bg-white/10 transition-all active:bg-[#3A6DFF] active:text-white active:border-[#3A6DFF] active:scale-95"
            >
              Explore our Blog
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
