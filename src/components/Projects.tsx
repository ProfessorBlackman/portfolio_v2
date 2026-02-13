
import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/types';

interface ProjectsSectionProps {
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onSelectProject }) => {
  const [filter, setFilter] = useState('All');
  
  const displayProjects = projects && projects.length > 0 ? projects : [];
  const categories = ['All', ...new Set(displayProjects.map(p => p.category).filter(Boolean) as string[])];

  const filteredProjects = filter === 'All' 
    ? displayProjects 
    : displayProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="space-y-8 sm:space-y-10 md:space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-woodblock pb-4 sm:pb-6">
        <div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-generous text-washi mb-2">
            FEATURED <span className="text-cinnabar">PROJECTS</span>
          </h3>
          <p className="text-washi/50 text-xs sm:text-sm">Selected works that define my engineering philosophy. (Click any to view in detail)</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[9px] sm:text-[10px] uppercase tracking-generous px-2 sm:px-3 py-1 transition-all ${
                filter === cat ? 'bg-cinnabar text-washi' : 'bg-woodblock/50 text-washi/40 hover:text-washi'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="group relative bg-woodblock/10 overflow-hidden flex flex-col cursor-pointer transition-transform hover:-translate-y-2"
            onClick={() => onSelectProject?.(project)}
          >
            <div className="aspect-video relative overflow-hidden">
              <Image 
                src={project.image || ""}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0 opacity-80"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={`absolute top-4 right-4 z-10 text-[10px] font-bold px-2 py-1 tracking-widest uppercase ${
                project.status === 'Completed' ? 'bg-indigo text-washi' : 'bg-cinnabar text-washi animate-pulse'
              }`}>
                {project.status}
              </div>
            </div>
            <div className="p-4 sm:p-5 md:p-6 grow space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-xl font-bold text-washi group-hover:text-cinnabar transition-colors">{project.title}</h4>
              <p className="text-washi/60 text-xs sm:text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                {project.tags?.map(tag => (
                  <span key={tag} className="text-[9px] sm:text-[10px] text-washi/40 border border-woodblock px-1.5 sm:px-2 py-0.5 tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
