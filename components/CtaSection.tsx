import Link from "next/link";
import Image from "next/image";

export default function CtaSection() {
  return (
    <section className="relative w-full py-10 sm:py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden bg-[#0A163B]">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Desktop Image */}
        <Image
          src="/hero/HERO IMAGE.png"
          alt="CTA Background"
          fill
          className="object-cover hidden sm:block"
        />
        {/* Mobile Image */}
        <Image
          src="/hero_mobile.png"
          alt="CTA Background Mobile"
          fill
          className="object-cover block sm:hidden"
        />
        {/* Adds a slight dark overlay to ensure text legibility just in case */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        <h2 className="text-[22px] md:text-[32px] text-white font-medium mb-6 leading-snug">
          Your Revenue Goal Shapes Everything. Let&apos;s Build the GTM Around it.
        </h2>
        
        <Link href="/contact" className="bg-[#1A3FA8] hover:bg-[#122A80] text-white font-medium text-[16px] px-8 py-3.5 transition-colors shadow-sm relative overflow-hidden group">
          <span className="relative z-10">See it in action</span>
        </Link>
      </div>
    </section>
  );
}
