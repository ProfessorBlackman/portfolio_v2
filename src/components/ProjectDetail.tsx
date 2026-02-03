
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-32 space-y-20 animate-in fade-in duration-700 max-w-6xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-4 text-xs font-bold uppercase tracking-generous text-washi/40 hover:text-cinnabar transition-colors mb-12"
      >
        <span className="text-xl">←</span> BACK TO GALLERY
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-cinnabar">
              <span>{project.category}</span>
              <span className="w-8 h-px bg-woodblock"></span>
              <span className={`px-2 py-0.5 ${project.status === 'Completed' ? 'bg-indigo/20 text-indigo-300' : 'bg-cinnabar/20 text-cinnabar'}`}>
                {project.status}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-washi leading-none">
              {project.title}
            </h1>
          </div>

          <div className="aspect-video relative overflow-hidden border-2 border-woodblock shadow-2xl">
            <Image 
              src={project.image || ""} 
              alt={project.title} 
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-xs uppercase tracking-generous text-cinnabar font-bold">About the project</h2>
            <div className="text-2xl md:text-3xl text-washi/80 font-light leading-relaxed whitespace-pre-line">
              {project.details || project.description}
            </div>
          </div>

          {/* Project Media Gallery */}
          {project.media && project.media.length > 0 && (
            <div className="space-y-12 pt-12 border-t border-woodblock">
              <h3 className="text-2xl font-black text-washi tracking-tighter uppercase">Media Gallery</h3>
              <div className="grid grid-cols-1 gap-12">
                {project.media.map((item, idx) => (

                  <figure key={idx} className="space-y-4 group">
                    <div className="overflow-hidden border border-woodblock/50 bg-woodblock/20 relative aspect-video">
                      {item.type === 'image' ? (
                        <Image
                          src={item.url} 
                          alt={item.caption || project.title} 
                          fill
                          className="grayscale group-hover:grayscale-0 transition-all duration-700 object-cover"
                          sizes="(max-width: 1024px) 100vw, 58vw"
                        />
                      ) : (
                        <video src={item.url} controls className="w-full" />
                      )}
                    </div>
                    {item.caption && (
                      <figcaption className="text-xs uppercase tracking-generous text-washi/30 font-bold text-center">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32 h-fit">
          <div className="bg-woodblock/10 p-10 border-l-4 border-cinnabar space-y-10">
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-generous text-washi/30 font-bold">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {(project.tags || []).map(tech => (
                  <span key={tech} className="px-4 py-2 bg-sumi border border-woodblock/40 text-sm font-bold text-washi/70 tracking-widest">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
               {project.githubUrl && (
                 <a 
                   href={project.githubUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="block text-center py-4 border border-cinnabar text-cinnabar font-bold uppercase tracking-generous text-[10px] hover:bg-cinnabar hover:text-washi transition-all"
                 >
                   GITHUB
                 </a>
               )}
               {project.liveUrl && (
                 <a 
                   href={project.liveUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="block text-center py-4 bg-cinnabar text-washi font-bold uppercase tracking-generous text-[10px] hover:-translate-y-0.5 transition-all"
                 >
                   LIVE DEMO
                 </a>
               )}
            </div>
          </div>

          <div className="kanji-accent text-cinnabar/10 text-[15rem] leading-none select-none text-right">
            作品
          </div>
        </div>
      </div>
    </div>
  );
};
