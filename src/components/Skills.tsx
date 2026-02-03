
import React from 'react';
import { Skill } from '@/lib/types';

interface SkillsSectionProps {
  skills?: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const displaySkills = skills && skills.length > 0 ? skills : [];
  // Group skills by their type
  const categories = Array.from(new Set(displaySkills.map(s => s.category || 'Other')));

  return (
    <section id="skills" className="relative space-y-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-baseline gap-8 border-b-2 border-woodblock pb-8">
        <h3 className="text-6xl md:text-7xl font-black tracking-tighter text-washi">
          SKILLS<span className="text-cinnabar">.</span>
        </h3>
        <p className="text-washi/40 text-xl tracking-generous uppercase font-light">
          Technical Arsenal & Proficiency
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Vertical Kanji Accent for the section */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="kanji-accent text-cinnabar/20 text-8xl sticky top-40 select-none">
            技術
          </div>
        </div>

        <div className="lg:col-span-11 space-y-20">
          {categories.map((category) => (
            <div key={category} className="space-y-10">
              <div className="flex items-center gap-6">
                <span className="h-0.5 w-12 bg-cinnabar"></span>
                <h4 className="text-3xl font-bold text-washi tracking-generous uppercase">
                  {category}
                </h4>
              </div>

              <div className="flex flex-wrap gap-6">
                {displaySkills.filter(s => (s.category || 'Other') === category).map((skill) => (
                  <div 
                    key={skill.name} 
                    className="px-8 py-4 border-2 border-woodblock text-washi/60 text-lg font-bold tracking-widest hover:border-cinnabar hover:text-cinnabar hover:bg-woodblock/10 transition-all cursor-default"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools & Ecosystem - "The Ink & Brushes" */}
      <div className="pt-16 border-t border-woodblock">
        <h4 className="text-xs tracking-generous text-washi/30 uppercase mb-8">Ecosystem & Tooling</h4>
        <div className="flex flex-wrap gap-6">
          {['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'GraphQL', 'Redis', 'Kafka', 'Terraform', 'Jira'].map(tool => (
            <div 
              key={tool} 
              className="px-8 py-4 border-2 border-woodblock text-washi/60 text-lg font-bold tracking-widest hover:border-cinnabar hover:text-cinnabar hover:bg-woodblock/10 transition-all cursor-default"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
