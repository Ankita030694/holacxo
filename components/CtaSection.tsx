import Image from "next/image";

export default function CtaSection() {
  return (
    <section className="relative w-full py-16 md:py-20 px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/CTA.jpg.jpeg"
          alt="CTA Background Pattern"
          fill
          className="object-cover"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        <h2 className="text-[22px] md:text-[32px] text-[#161662] font-medium mb-6 leading-snug">
          Your Revenue Goal Shapes Everything. Let's Build the GTM Around it.
        </h2>
        
        <button className="bg-[#1A3FA8] hover:bg-[#122A80] text-white font-medium text-[16px] px-8 py-3.5 transition-colors shadow-sm">
          See it in action
        </button>
      </div>
    </section>
  );
}
