import React from 'react';
import Image from 'next/image';
import { CaseStudy } from '@/lib/types';
import { PortableText } from 'next-sanity';
import { PortableComponents } from './blog/portable-components';

interface CaseStudyCardProps {
  study: CaseStudy;
  onSelect: (study: CaseStudy) => void;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, onSelect }) => {
  return (
    <div 
      className="group grid grid-cols-1 md:grid-cols-12 gap-0 bg-woodblock/50 border border-woodblock/20 hover:border-cinnabar transition-all cursor-pointer overflow-hidden rounded-md"
      onClick={() => onSelect(study)}
    >
      <div className="md:col-span-4 relative overflow-hidden h-48 md:h-auto">
        <Image 
          src={study.coverImage} 
          alt={study.title} 
          fill
          className="object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-sumi/20 group-hover:bg-transparent transition-colors z-10"></div>
      </div>
      <div className="md:col-span-8 p-8 space-y-6 flex flex-col justify-center">
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-cinnabar">
            <span>{study.duration}</span>
            <span className="w-2 h-px bg-woodblock"></span>
            <span className="text-washi/40">{study.client}</span>
          </div>
          <h3 className="text-3xl font-black text-washi leading-tight tracking-tighter group-hover:text-cinnabar transition-colors">
            {study.title}
          </h3>
        </div>
        <div className="text-sm text-washi/50 leading-relaxed line-clamp-2">
          <PortableText value={study.overview} components={PortableComponents} />
        </div>
        <div className="flex flex-wrap gap-2">
          {study.tags?.map(tag => (
            <span key={tag} className="text-[9px] uppercase tracking-widest text-washi/30 font-bold border border-woodblock px-2 py-0.5">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
