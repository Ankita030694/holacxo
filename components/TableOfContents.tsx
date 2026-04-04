"use client";
import { useState, useEffect } from 'react';

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
  orientation?: 'vertical' | 'horizontal';
}

export default function TableOfContents({ sections, orientation = 'horizontal' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Small delay to ensure dangerouslySetInnerHTML has rendered into the DOM
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          // When multiple sections are in view, we want to pick the latest one
          // that entered our "active area" which is the top of the screen.
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        // Root margin: top is -100px to account for the header, 
        // bottom is -80% to detect the section when it's near the top
        { 
          root: null,
          rootMargin: '-100px 0px -60% 0px',
          threshold: [0, 1]
        }
      );

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => {
        observer.disconnect();
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm ${orientation === 'vertical' ? 'sticky top-24' : 'mb-8'}`}>
      <h2 className="text-xs font-bold text-[#0A163B] uppercase tracking-[0.2em] mb-6 whitespace-nowrap">Table of Contents</h2>
      <ul className={`space-y-4 ${orientation === 'horizontal' ? 'grid md:grid-cols-2 lg:grid-cols-2 gap-4' : ''}`}>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`block text-sm transition-all duration-300 hover:text-[#0A163B] ${
                activeId === section.id 
                  ? 'text-[#0A163B] font-bold translate-x-2' 
                  : 'text-gray-500 hover:translate-x-1'
              }`}
            >
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-3 transition-all ${activeId === section.id ? 'bg-[#0A163B] scale-125' : 'bg-gray-200'}`}></span>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
