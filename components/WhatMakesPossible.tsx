import Image from "next/image";

export default function WhatMakesPossible() {
  const features = [
    {
      icon: "/whatMakes/Frame 43.svg", 
      title: "5-year deal behaviour dataset",
      description: "We recognise patterns — not guesses — to know when an account is actually in-market."
    },
    {
      icon: "/whatMakes/Frame 43 (1).svg",
      title: "Signal-led account selection",
      description: "Only accounts showing confirmed buying triggers — not a spray of cold names."
    },
    {
      icon: "/whatMakes/Frame 43 (2).svg",
      title: "Internal buying mechanics",
      description: "We map the approval chain and sequence outreach to match how decisions actually move."
    },
    {
      icon: "/whatMakes/Frame 43 (3).svg",
      title: "Context before contact",
      description: "Budget cycle, tech stack, trigger events — every outreach reads as relevant, not generic."
    }
  ];

  return (
    <section className="w-full bg-[#F0EDE6] py-24 px-6 flex flex-col items-center">
      <h2 className="text-[#1A3FA8] text-[28px] md:text-[36px] font-bold tracking-tight uppercase mb-20 text-center">
        WHAT MAKES THIS POSSIBLE
      </h2>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center max-w-md mx-auto">
            <div className="w-16 h-16 relative mb-8 flex items-center justify-center">
              <Image
                src={feature.icon}
                alt={feature.title}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-[#161662] text-2xl md:text-[26px] font-semibold mb-4 leading-tight">
              {feature.title}
            </h3>
            <p className="text-[#161662]/70 text-lg md:text-[19px] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
