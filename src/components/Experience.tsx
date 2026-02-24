
'use client';

import React, { useState } from 'react';
import { Experience } from '@/lib/types';
import {Sankofa, Sankofa1} from "ghicons";

interface ExperienceSectionProps {
  experiences?: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

  const toggleExpand = (idx: number) => {
    const newSet = new Set(expandedIndices);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setExpandedIndices(newSet);
  };

  const displayExperiences = experiences && experiences.length > 0 ? experiences : [];

  return (
    <section id="experience" className="space-y-8 sm:space-y-10 md:space-y-12">
      <div className="flex items-center justify-between border-b border-woodblock pb-4 sm:pb-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-generous text-washi">
          WORK <span className="text-cinnabar">EXPERIENCE</span>
        </h3>
        <span className="text-woodblock opacity-35 text-2xl sm:text-3xl md:text-4xl font-black select-none hidden sm:flex">
          <Sankofa size={32} color="#fff" />
          <Sankofa1 size={32} color="#fff" />
        </span>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {displayExperiences.map((exp, idx) => (
          <div 
            key={exp._id} 
            className={`group relative bg-woodblock/20 p-4 sm:p-5 md:p-6 lg:p-8 border-l-2 transition-all duration-300 hover:bg-woodblock/40 cursor-pointer md:cursor-default ${idx % 2 === 0 ? 'border-cinnabar md:mr-8 lg:mr-12' : 'border-indigo md:ml-8 lg:ml-12'}`}
            onClick={() => toggleExpand(idx)}
          >
            <div className="flex flex-col md:flex-row justify-between mb-3 sm:mb-4 gap-2 sm:gap-4">
              <div className="flex justify-between items-start md:block">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-washi group-hover:text-cinnabar transition-colors">{exp.role}</h4>
                  <p className="text-washi/50 font-medium tracking-generous text-[10px] sm:text-xs uppercase">{exp.company}</p>
                </div>
                <div className="md:hidden text-cinnabar mt-1">
                  {expandedIndices.has(idx) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="-rotate-90">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  )}
                </div>
              </div>
              <div className="text-washi/40 text-[10px] sm:text-xs font-mono">
                {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : (exp.isCurrent ? '- Present' : '')}
              </div>
            </div>
            <div className={`${expandedIndices.has(idx) ? 'block' : 'hidden md:block'} space-y-2 sm:space-y-3`}>
              {Array.isArray(exp.description) ? (
                <ul className="space-y-2 sm:space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 sm:gap-4 text-washi/70 text-xs sm:text-sm leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-cinnabar rounded-full shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-washi/70 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="space-y-2 sm:space-y-3 pt-2">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 sm:gap-4 text-washi/70 text-xs sm:text-sm leading-relaxed">
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
