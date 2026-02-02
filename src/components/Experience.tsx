
import React from 'react';
import { EXPERIENCE } from '@/lib/constants';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="space-y-12">
      <div className="flex items-center justify-between border-b border-woodblock pb-6">
        <h3 className="text-3xl font-bold tracking-generous text-washi">
          WORK <span className="text-cinnabar">EXPERIENCE</span>
        </h3>
        <span className="text-woodblock text-4xl font-black select-none">履歴</span>
      </div>

      <div className="space-y-8">
        {EXPERIENCE.map((exp, idx) => (
          <div key={exp.id} className={`group relative bg-woodblock/20 p-8 border-l-2 transition-all duration-300 hover:bg-woodblock/40 ${idx % 2 === 0 ? 'border-cinnabar ml-0 mr-12' : 'border-indigo ml-12 mr-0'}`}>
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              <div>
                <h4 className="text-xl font-bold text-washi group-hover:text-cinnabar transition-colors">{exp.role}</h4>
                <p className="text-washi/50 font-medium tracking-generous text-xs uppercase">{exp.company}</p>
              </div>
              <div className="text-washi/40 text-xs font-mono">
                {exp.period}
              </div>
            </div>
            <ul className="space-y-3">
              {exp.description.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-washi/70 text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-cinnabar rounded-full shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
