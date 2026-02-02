
import React from 'react';
import { SKILLS } from '@/lib/constants';

export const SkillsSection: React.FC = () => {
  // Group skills by their type
  const categories = Array.from(new Set(SKILLS.map(s => s.type)));

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
                <span className="h-[2px] w-12 bg-cinnabar"></span>
                <h4 className="text-3xl font-bold text-washi tracking-generous uppercase">
                  {category}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                {SKILLS.filter(s => s.type === category).map((skill) => (
                  <div key={skill.name} className="group space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-semibold text-washi/90 group-hover:text-cinnabar transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-cinnabar font-mono text-lg font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar Container */}
                    <div className="h-4 bg-woodblock/30 relative overflow-hidden">
                      {/* Subgrid lines within bar for a "digital woodblock" look */}
                      <div className="absolute inset-0 flex justify-between px-1 opacity-10 pointer-events-none">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="w-[1px] h-full bg-washi"></div>
                        ))}
                      </div>
                      
                      {/* Actual Progress Fill */}
                      <div 
                        className="h-full bg-cinnabar absolute left-0 top-0 transition-all duration-1000 ease-out group-hover:bg-indigo shadow-[0_0_15px_rgba(230,57,70,0.3)]"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
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
