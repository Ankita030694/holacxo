export default function CtaSection() {
  return (
    <section className="relative w-full py-10 sm:py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Coded Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] to-white"></div>
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Soft Glow Accents */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] bg-[#1A3FA8] opacity-[0.04] rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[80%] bg-[#1A3FA8] opacity-[0.04] rounded-full blur-3xl"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        <h2 className="text-[22px] md:text-[32px] text-[#161662] font-medium mb-6 leading-snug">
          Your Revenue Goal Shapes Everything. Let&apos;s Build the GTM Around it.
        </h2>
        
        <button className="bg-[#1A3FA8] hover:bg-[#122A80] text-white font-medium text-[16px] px-8 py-3.5 transition-colors shadow-sm relative overflow-hidden group">
          <span className="relative z-10">See it in action</span>
        </button>
      </div>
    </section>
  );
}
