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
    <section className="w-full bg-[#F0EDE6] py-16 md:py-20 px-2 sm:px-6 flex flex-col items-center">
      <h2 className="text-[26px] md:text-[36px] text-[#1A3FA8] font-medium text-center mb-6 md:mb-16">
        Track Record
      </h2>

      <div className="w-full max-w-6xl grid grid-cols-3 md:border border-[#1A3FA8]/20 bg-transparent md:bg-[#F0EDE6]/30 gap-1 md:gap-0">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-start md:justify-center py-2 px-1 md:py-12 md:px-6 text-center ${
              index !== stats.length - 1 ? "md:border-r border-[#1A3FA8]/20" : ""
            }`}
          >
            <span className="text-[19px] sm:text-[22px] md:text-3xl font-bold text-[#161662] mb-1.5 md:mb-3 whitespace-nowrap tracking-tight md:tracking-normal">
              {stat.value}
            </span>
            <span className="text-[13px] sm:text-[14px] md:text-lg text-[#161662]/70 font-medium whitespace-normal md:whitespace-nowrap leading-[1.2] md:leading-normal">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
