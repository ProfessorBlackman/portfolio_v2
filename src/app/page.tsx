'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { HowIThink } from '@/components/HowIThink';
import { FocusAreas } from '@/components/FocusAreas';
import { ExperienceSection } from '@/components/Experience';
import { SkillsSection } from '@/components/Skills';
import { ProjectsSection } from '@/components/Projects';
import { ContactSection } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'philosophy', 'focus', 'experience', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectProject = (project: any) => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <div className="min-h-screen pattern-bg selection:bg-cinnabar selection:text-washi">
      <Header activeSection={activeSection} />
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <div className="animate-in fade-in duration-700">
          <Hero />
          <About />
          <HowIThink />
          <FocusAreas />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection onSelectProject={handleSelectProject} />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
