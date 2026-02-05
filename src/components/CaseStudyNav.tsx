'use client';

import React, { useState, useEffect } from 'react';

interface NavSection {
  id: string;
  label: string;
  isPresent: boolean;
}

interface CaseStudyNavProps {
  sections: NavSection[];
}

export const CaseStudyNav: React.FC<CaseStudyNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better UX

      // Calculate overall scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = (window.scrollY / scrollableHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Find which section is currently in view
      const visibleSection = sections
        .filter(section => section.isPresent)
        .find(section => {
          const element = document.getElementById(section.id);
          if (!element) return false;

          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          return scrollPosition >= elementTop && scrollPosition < elementBottom;
        });

      if (visibleSection) {
        setActiveSection(visibleSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset from top
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const visibleSections = sections.filter(section => section.isPresent);

  if (visibleSections.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-32 space-y-4">
      <div className="flex items-start gap-6">
        {/* Vertical Progress Bar */}
        <div className="relative w-1 bg-woodblock/30 rounded-full overflow-hidden" style={{ height: `${Math.max(visibleSections.length * 40, 300)}px` }}>
          <div
            className="absolute top-0 left-0 w-full bg-cinnabar transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        {/* Navigation Content */}
        <div className="flex-1">
          <h4 className="text-[10px] uppercase tracking-generous text-washi/30 font-bold mb-6">
            Contents
          </h4>
          <ul className="space-y-3">
            {visibleSections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left text-sm font-medium tracking-wide transition-all duration-200 hover:text-cinnabar ${
                    activeSection === section.id
                      ? 'text-cinnabar font-bold'
                      : 'text-washi/40'
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
