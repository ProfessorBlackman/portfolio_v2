
import React from 'react';
import { Experience } from '@/lib/types';

interface ExperienceSectionProps {
  experiences?: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const displayExperiences = experiences && experiences.length > 0 ? experiences : [];

  return (
    <section id="experience" className="space-y-12">
      <div className="flex items-center justify-between border-b border-woodblock pb-6">
        <h3 className="text-3xl font-bold tracking-generous text-washi">
          WORK <span className="text-cinnabar">EXPERIENCE</span>
        </h3>
        <span className="text-woodblock text-4xl font-black select-none">履歴</span>
      </div>

      <div className="space-y-8">
        {displayExperiences.map((exp, idx) => (
          <div key={exp._id} className={`group relative bg-woodblock/20 p-6 md:p-8 border-l-2 transition-all duration-300 hover:bg-woodblock/40 ${idx % 2 === 0 ? 'border-cinnabar md:mr-12' : 'border-indigo md:ml-12'}`}>
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              <div>
                <h4 className="text-xl font-bold text-washi group-hover:text-cinnabar transition-colors">{exp.role}</h4>
                <p className="text-washi/50 font-medium tracking-generous text-xs uppercase">{exp.company}</p>
              </div>
              <div className="text-washi/40 text-xs font-mono">
                {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : (exp.isCurrent ? '- Present' : '')}
              </div>
            </div>
            <div className="space-y-3">
              {Array.isArray(exp.description) ? (
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-washi/70 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-cinnabar rounded-full shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-washi/70 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="space-y-3 pt-2">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-washi/70 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-indigo rounded-full shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
