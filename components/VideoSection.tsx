export default function VideoSection() {
  return (
    <section className="w-full bg-[#F0EDE6] pt-30 pb-20 px-6 flex flex-col items-center">
      <h2 className="text-3xl md:text-[44px] text-[#1A3FA8] font-bold text-center max-w-5xl mb-14 leading-tight">
        Built On Insider Understanding Of Enterprise Buying Behavior And Decision-Making.
      </h2>
      
      {/* Video Placeholder */}
      <div className="w-full max-w-6xl aspect-[16/9] bg-[#D3DBFF] rounded-sm shadow-sm flex items-center justify-center">
        {/* Subtle text for the placeholder logic, you can remove this when you add a video */}
        <span className="text-[#24429A]/50 font-medium tracking-widest text-sm uppercase">Video Placeholder</span>
      </div>
    </section>
  );
}
