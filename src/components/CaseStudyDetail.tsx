
import React, { useEffect } from 'react';
import Image from 'next/image';
import { CaseStudy } from '@/lib/types';
import { Interactions } from './Interactions';
import { PortableText } from 'next-sanity';
import { PortableComponents } from './blog/portable-components';

interface CaseStudyDetailProps {
  study: CaseStudy;
  onBack: () => void;
}

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ study, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // SEO Meta Updates
    const previousTitle = document.title;
    document.title = `${study.title} | Case Study | Methuselah Nwodobeh`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || "";
    
    if (metaDescription) {
      metaDescription.setAttribute('content', study.seoDescription || "");
    } else if (study.seoDescription) {
      metaDescription = document.createElement('meta');
      (metaDescription as HTMLMetaElement).name = "description";
      (metaDescription as HTMLMetaElement).content = study.seoDescription;
      document.head.appendChild(metaDescription);
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription && originalDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, [study]);

  return (
    <div className="py-32 space-y-24 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="space-y-16">
        <button 
          onClick={onBack}
          className="flex items-center gap-4 text-xs font-bold uppercase tracking-generous text-washi/40 hover:text-cinnabar transition-colors"
        >
          <span className="text-xl">←</span> BACK TO CASE STUDIES
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-cinnabar">
              <span className="bg-cinnabar text-washi px-3 py-1">CLIENT: {study.client}</span>
              <span className="text-washi/40">{study.date}</span>
              <span className="text-washi/40">DURATION: {study.duration}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-washi leading-none">
              {study.title}
            </h1>
            <p className="text-3xl md:text-4xl text-washi/70 font-light italic leading-tight">
              {study.subtitle}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end space-y-4 lg:text-right border-t lg:border-t-0 lg:border-l border-woodblock pt-8 lg:pt-0 lg:pl-8">
             <div className="space-y-1">
               <p className="text-[10px] uppercase tracking-generous text-washi/30 font-bold">AUTHOR</p>
               <p className="text-2xl font-bold text-washi">{study.author}</p>
             </div>
             <div className="flex flex-wrap lg:justify-end gap-2">
               {study.tags?.map(t => <span key={t} className="text-[10px] uppercase text-cinnabar/60 border border-cinnabar/20 px-2 py-0.5">#{t}</span>)}
             </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="h-[60vh] relative overflow-hidden border-y border-woodblock">
        <Image 
          src={study.coverImage} 
          fill 
          className="object-cover grayscale opacity-60" 
          alt={study.title}
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
           <div className="bg-sumi/80 backdrop-blur p-12 max-w-2xl border-l-8 border-cinnabar">
             <h3 className="text-xs uppercase tracking-generous text-cinnabar font-bold mb-4">Overview</h3>
             <div className="text-xl md:text-2xl text-washi font-light leading-relaxed space-y-4 whitespace-pre-wrap">
               <PortableText value={study.overview} components={PortableComponents} />
             </div>
           </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-woodblock border-y border-woodblock">
        {study.metrics?.map((m, i) => (
          <div key={i} className="bg-sumi p-12 flex flex-col items-center justify-center space-y-4">
            <span className="text-7xl font-black text-cinnabar tracking-tighter">{m.value}</span>
            <span className="text-xs uppercase tracking-generous text-washi/40 font-bold">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Detailed Content Sections */}
      <div className="max-w-4xl mx-auto space-y-32">
        {/* The Problem */}
        {study.problem && (
          <section className="space-y-12">
            <h3 className="text-4xl font-bold tracking-tighter text-washi flex items-center gap-6">
              <span className="text-cinnabar">01.</span> THE PROBLEM
            </h3>
            <div className="text-2xl text-washi/70 leading-relaxed space-y-8 font-light whitespace-pre-wrap">
              <PortableText value={study.problem} components={PortableComponents} />
            </div>
          </section>
        )}

        {/* Media Block 1 */}
        {study.media && study.media.length > 0 && (
          <div className="space-y-12">
            <h4 className="text-xs uppercase tracking-generous text-cinnabar font-bold">Visualization</h4>
            {study.media.map((item, i) => (
              <figure key={i} className="space-y-4 border border-woodblock p-4 bg-woodblock/5">
                {item._type === 'image' ? (
                  <div className="relative aspect-video">
                    <Image 
                      src={item.url} 
                      fill 
                      className="grayscale hover:grayscale-0 transition-all duration-700 object-cover" 
                      alt={item.caption || study.title} 
                    />
                  </div>
                ) : (
                  <video src={item.url} controls className="w-full" />
                )}
                {item.caption && <figcaption className="text-sm text-washi/40 italic font-mono uppercase text-center tracking-widest">{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {/* The Solution */}
        {study.solution && (
          <section className="space-y-12 bg-woodblock/10 p-12 border-l-4 border-cinnabar">
            <h3 className="text-4xl font-bold tracking-tighter text-washi flex items-center gap-6">
              <span className="text-cinnabar">02.</span> THE SOLUTION
            </h3>
            <div className="text-2xl text-washi leading-relaxed space-y-8 whitespace-pre-wrap">
              <PortableText value={study.solution} components={PortableComponents} />
            </div>
          </section>
        )}

        {/* Methodology */}
        {study.methodology && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
             <div className="md:col-span-4">
               <h3 className="text-4xl font-bold tracking-tighter text-washi sticky top-32">
                 METHOD<br />OLOGY
               </h3>
             </div>
             <div className="md:col-span-8 text-xl text-washi/60 leading-relaxed space-y-6 whitespace-pre-wrap">
               <PortableText value={study.methodology} components={PortableComponents} />
             </div>
          </section>
        )}

        {/* Implementation & Results */}
        {study.results && (
          <div className="space-y-16 border-t border-woodblock pt-16">
            <div className="space-y-8">
               <h4 className="text-xs uppercase tracking-generous text-cinnabar font-bold">Outcome</h4>
               <h3 className="text-5xl font-black text-washi tracking-tighter">Implementation & Results</h3>
               <div className="text-2xl text-washi/80 leading-relaxed space-y-8 font-light whitespace-pre-wrap">
                 <PortableText value={study.results} components={PortableComponents} />
               </div>
            </div>
          </div>
        )}

        {/* Conclusion */}
        {study.conclusion && (
          <div className="bg-cinnabar p-16 space-y-8">
             <h3 className="text-5xl font-black text-washi tracking-tighter">Conclusion</h3>
             <div className="text-2xl text-washi/90 leading-relaxed space-y-6 whitespace-pre-wrap">
               <PortableText value={study.conclusion} components={PortableComponents} />
             </div>
          </div>
        )}

        <Interactions contentId={study._id} />

        {/* Footer Navigation */}
        <div className="pt-16 flex justify-center">
           <button 
             onClick={onBack}
             className="px-16 py-6 border-2 border-cinnabar text-cinnabar font-bold uppercase tracking-generous hover:bg-cinnabar hover:text-washi transition-all text-xl"
           >
             BACK TO CASE STUDIES
           </button>
        </div>
      </div>
    </div>
  );
};
