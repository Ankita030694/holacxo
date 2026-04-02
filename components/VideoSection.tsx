export default function VideoSection() {
  return (
    <section className="w-full bg-[#F0EDE6] py-28 px-6 flex flex-col items-center">
      <h2 className="text-3xl md:text-[36px] text-[#1A3FA8] font-medium text-center max-w-3xl mb-14 leading-tight">
        Built on insider understanding of enterprise buying behavior and decision-making.
      </h2>
      
      {/* Video Placeholder */}
      <div className="w-full max-w-5xl aspect-[16/9] bg-[#D3DBFF] rounded-sm shadow-sm flex items-center justify-center">
        {/* Subtle text for the placeholder logic, you can remove this when you add a video */}
        <span className="text-[#24429A]/50 font-medium tracking-widest text-sm uppercase">Video Placeholder</span>
      </div>
    </section>
  );
}
