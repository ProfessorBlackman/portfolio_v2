
import React, { useState } from 'react';
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
    <section id="projects" className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-woodblock pb-6">
        <div>
          <h3 className="text-3xl font-bold tracking-generous text-washi mb-2">
            FEATURED <span className="text-cinnabar">PROJECTS</span>
          </h3>
          <p className="text-washi/50 text-sm">Selected works that define my engineering philosophy.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[10px] uppercase tracking-generous px-3 py-1 transition-all ${
                filter === cat ? 'bg-cinnabar text-washi' : 'bg-woodblock/50 text-washi/40 hover:text-washi'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="group relative bg-woodblock/10 overflow-hidden flex flex-col cursor-pointer transition-transform hover:-translate-y-2"
            onClick={() => onSelectProject?.(project)}
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0 opacity-80"
              />
              <div className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-1 tracking-widest uppercase ${
                project.status === 'Completed' ? 'bg-indigo text-washi' : 'bg-cinnabar text-washi animate-pulse'
              }`}>
                {project.status}
              </div>
            </div>
            <div className="p-6 grow space-y-4">
              <h4 className="text-xl font-bold text-washi group-hover:text-cinnabar transition-colors">{project.title}</h4>
              <p className="text-washi/60 text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags?.map(tag => (
                  <span key={tag} className="text-[10px] text-washi/40 border border-woodblock px-2 py-0.5 tracking-wider">
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
