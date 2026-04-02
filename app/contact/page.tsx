"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactStats from "@/components/ContactStats";
import ContactFeatures from "@/components/ContactFeatures";
import CtaSection from "@/components/CtaSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Thank you! Our team will contact you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          companyName: ""
        });
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Failed to connect to the server.");
    }
  };

  return (
    <main className="w-full flex flex-col min-h-screen">
      {/* Contact Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0A163B]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero/Home.jpg.jpeg"
            alt="Contact Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle dark overlay to match the reference image */}
          <div className="absolute inset-0 bg-blue-900/40"></div>
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Hero Content Grid */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full px-6 py-20">
          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col text-white max-w-xl font-inter">
              <p className="text-[#A2BAFF] font-semibold tracking-widest text-sm uppercase mb-8">
                GET IN TOUCH
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] mb-8">
                Tell us your revenue goal. We'll design the GTM around it.
              </h1>
              <p className="text-blue-100/70 text-lg md:text-xl font-medium leading-relaxed">
                A 30-minute call where we scope your pipeline motion around the number you're building toward.
              </p>
            </div>

            {/* Right Content - Form */}
            <div className="w-full flex justify-end">
              <div className="w-full max-w-lg bg-[#050B1B]/60 backdrop-blur-md p-10 rounded-lg border border-white/10 shadow-2xl font-inter">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-white/80 text-sm font-medium">First name *</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                        className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-white/80 text-sm font-medium">Last name *</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required 
                        className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">Work email *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">Phone number *</label>
                    <input 
                      type="tel" 
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required 
                      className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">Company name *</label>
                    <input 
                      type="text" 
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required 
                      className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="mt-4 bg-[#F2F0EB] text-[#0A163B] py-4 rounded font-bold text-base hover:bg-white transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Submitting..." : "Submit"}
                  </button>

                  {message && (
                    <p className={`text-center text-sm mt-2 ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                      {message}
                    </p>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ContactStats />

      {/* Features Section */}
      <ContactFeatures />

      {/* CTA Section */}
      <CtaSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}




