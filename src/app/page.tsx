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
import { sanityService } from '@/lib/sanity/lib/service';
import { Profile, Experience, Skill, Project } from '@/lib/types';

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, experiencesData, skillsData, projectsData] = await Promise.all([
          sanityService.getProfile(),
          sanityService.getExperiences(),
          sanityService.getSkills(),
          sanityService.getProjects(),
        ]);
        setProfile(profileData);
        setExperiences(experiencesData);
        setSkills(skillsData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
      }
    };
    fetchData();
  }, []);

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
    router.push(`/projects/${project._id}`);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden pattern-bg selection:bg-cinnabar selection:text-washi">
      <Header activeSection={activeSection} />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12">
        <div className="animate-in fade-in duration-700">
          <Hero profile={profile} />
          <About profile={profile} />
          <HowIThink profile={profile} />
          <FocusAreas profile={profile} />
          <ExperienceSection experiences={experiences} />
          <SkillsSection skills={skills} />
          <ProjectsSection projects={projects} onSelectProject={handleSelectProject} />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
