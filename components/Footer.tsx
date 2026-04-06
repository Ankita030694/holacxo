import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    {
      title: "Pages",
      links: [
        { name: "Home", href: "/" },
        { name: "Solution", href: "/#solution" },
        { name: "Resources", href: "/blog" },
        { name: "Pricing", href: "/contact" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy policy", href: "/contact" },
        { name: "Terms & conditions", href: "/contact" }
      ]
    }
  ];

  return (
    <footer className="relative w-full overflow-hidden py-16 px-6 md:px-16 flex justify-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-[#0A163B]">
        {/* Desktop Image */}
        <Image
          src="/hero/HERO IMAGE.png"
          alt="Footer Background"
          fill
          className="object-cover hidden sm:block"
        />
        {/* Mobile Image */}
        <Image
          src="/hero_mobile.png"
          alt="Footer Background Mobile"
          fill
          className="object-cover block sm:hidden"
        />
        {/* Adds a slight dark overlay to ensure text legibility just in case */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between w-full mb-16 pb-4">
          
          {/* Logo & Description */}
          <div className="w-full lg:w-1/3 mb-12 lg:mb-0">
            {/* Logo Image */}
            <div className="relative w-[180px] h-[75px] mb-6">
              <Image
                src="/hero/Group 36.svg"
                alt="HolaCXO Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-white/90 text-[15px] leading-[1.6] max-w-sm">
              We map buying behaviour, identify real signals, and create CXO-level conversations that convert into revenue.
            </p>
          </div>

          {/* Links Columns */}
          <div className="w-full lg:w-2/3 flex flex-col sm:flex-row justify-start lg:justify-end gap-16 md:gap-42">
            {footerLinks.map((column, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="text-white text-[20px] font-semibold mb-6">
                  {column.title}
                </h4>
                <div className="flex flex-col gap-5">
                  {column.links.map((link, linkIdx) => (
                    <Link 
                      key={linkIdx} 
                      href={link.href} 
                      className="text-white/80 hover:text-white transition-colors text-[16px] w-fit"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-end items-start md:items-end w-full mt-8 md:mt-12">
          {/* Social Icons */}
          <div className="flex gap-4">
            {/* LinkedIn icon */}
            <Link href="https://www.linkedin.com/company/holacxo" className="w-[50px] h-[50px] bg-[#F2F0EB] flex items-center justify-center hover:bg-white transition-colors">
              <svg className="w-6 h-6 text-[#111155]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
          </div>
          
        </div>
        
      </div>
    </footer>
  );
}
