
import React from 'react';
import Link from 'next/link';
import { CASE_STUDIES } from '@/constants';

export const CaseStudiesSection: React.FC = () => {
  const latestStudy = CASE_STUDIES[0];
  
  return (
    <section id="case-studies" className="space-y-12">
      <div className="asymmetric-border pl-8 py-4">
        <h3 className="text-3xl font-bold tracking-generous text-washi">
          CASE <span className="text-cinnabar">STUDIES</span>
        </h3>
        <p className="text-washi/50 text-sm mt-2">Detailed explorations of selected technical challenges.</p>
      </div>

      {latestStudy && (
        <Link href={`/case-studies/${latestStudy._id}`} className="block relative group overflow-hidden bg-woodblock/30 border border-woodblock/50">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 space-y-6">
              <span className="inline-block px-3 py-1 bg-indigo/40 text-washi text-[10px] uppercase tracking-generous">{latestStudy.client}</span>
              <h4 className="text-2xl md:text-3xl font-bold text-washi leading-tight group-hover:text-cinnabar transition-colors">
                {latestStudy.title}
              </h4>
              <p className="text-washi/70 leading-relaxed italic line-clamp-2">
                "{latestStudy.subtitle}"
              </p>
              <div className="flex items-center gap-4 text-cinnabar font-bold uppercase tracking-generous text-xs group-hover:gap-6 transition-all">
                VIEW CASE STUDY <span className="text-lg">→</span>
              </div>
            </div>
            <div className="h-64 lg:h-auto bg-woodblock relative">
              <img 
                src={latestStudy.coverImage} 
                alt={latestStudy.title} 
                className="w-full h-full object-cover opacity-60 grayscale brightness-75 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sumi to-transparent lg:hidden"></div>
            </div>
          </div>
        </Link>
      )}
    </section>
  );
};
