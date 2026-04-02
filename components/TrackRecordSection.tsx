export default function TrackRecordSection() {
  const stats = [
    {
      value: "3–9 months",
      label: "Average Deal Cycle",
    },
    {
      value: "$3M–$5M",
      label: "Average Pipeline Generated",
    },
    {
      value: "5:1",
      label: "Lead-to-Deal Ratio",
    },
  ];

  return (
    <section className="w-full bg-[#F0EDE6] py-20 px-6 flex flex-col items-center">
      <h2 className="text-3xl md:text-[36px] text-[#1A3FA8] font-medium text-center mb-16">
        Track Record
      </h2>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 border border-[#1A3FA8]/20 bg-[#F0EDE6]/30">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center py-12 px-6 text-center ${
              index !== stats.length - 1 ? "border-b md:border-b-0 md:border-r border-[#1A3FA8]/20" : ""
            }`}
          >
            <span className="text-2xl md:text-3xl font-bold text-[#161662] mb-3">
              {stat.value}
            </span>
            <span className="text-base md:text-lg text-[#161662]/70 font-medium whitespace-nowrap">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
