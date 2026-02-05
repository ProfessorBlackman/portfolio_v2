
import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { CaseStudy } from '@/lib/types';
import { Interactions } from './Interactions';
import { PortableText } from 'next-sanity';
import { PortableComponents } from './blog/portable-components';
import { CaseStudyNav } from './CaseStudyNav';

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

  // Build navigation sections based on what's present in the case study
  const navSections = useMemo(() => [
    { id: 'overview', label: 'Overview', isPresent: !!study.overview },
    { id: 'metrics', label: 'Metrics', isPresent: !!study.metrics && study.metrics.length > 0 },
    { id: 'problem', label: 'The Problem', isPresent: !!study.problem },
    { id: 'background', label: 'Background', isPresent: !!study.background },
    { id: 'investigation', label: 'Investigation', isPresent: !!study.investigation },
    { id: 'findings', label: 'Findings', isPresent: !!study.findings },
    { id: 'media', label: 'Visualization', isPresent: !!study.media && study.media.length > 0 },
    { id: 'solution', label: 'The Solution', isPresent: !!study.solution },
    { id: 'methodology', label: 'Methodology', isPresent: !!study.methodology },
    { id: 'implementation', label: 'Implementation', isPresent: !!study.implementation },
    { id: 'results', label: 'Results', isPresent: !!study.results },
    { id: 'conclusion', label: 'Conclusion', isPresent: !!study.conclusion },
    { id: 'references', label: 'References', isPresent: !!study.references && study.references.length > 0 },
    { id: 'appendix', label: 'Appendix', isPresent: !!study.appendix },
    { id: 'interactions', label: 'Discussion', isPresent: true },
  ], [study])

  return (
    <div className="py-32 animate-in fade-in duration-700">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16">
        {/* Main Content */}
        <div className="lg:col-span-9 space-y-24">
      {/* Header Section */}
      <div className="space-y-16">
        <button 
          onClick={onBack}
          className="flex items-center gap-4 text-xs font-bold uppercase tracking-generous text-washi/40 hover:text-cinnabar transition-colors"
        >
          <span className="text-xl">←</span> BACK TO CASE STUDIES
        </button>

        <div className="flex flex-col justify-between items-start gap-12 w-full">
          <div className="lg:col-span-8 space-y-8 ">
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
          <div className="lg:col-span-4 flex flex-col justify-start space-y-4 border-t lg:border-t-0 lg:border-l border-woodblock pt-8 lg:pt-0 lg:pl-8">
             <div className="space-y-1">
               <p className="text-[10px] uppercase tracking-generous text-washi/30 font-bold">AUTHOR</p>
               <p className="text-2xl font-bold text-washi">{study.author}</p>
             </div>
             <div className="flex flex-wrap lg:justify-end gap-2">
               {study.tags?.map(t => <span key={t} className="text-[10px] uppercase text-cinnabar/80 border border-cinnabar/20 px-2 py-0.5">#{t}</span>)}
             </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="h-[60vh] relative overflow-hidden border-y border-woodblock">
        <Image 
          src={study.coverImage} 
          fill 
          className="object-cover" 
          alt={study.title}
          priority
        />
      </div>

      {/* Overview Section */}
      <div id="overview" className="mx-auto w-full py-24 px-6 md:px-0 scroll-mt-32">
         <div className="border-l-8 border-cinnabar p-12 bg-woodblock/5">
           <h3 className="text-xs uppercase tracking-generous text-cinnabar font-bold mb-8">Overview</h3>
           <div className="text-2xl md:text-3xl text-washi font-light leading-relaxed space-y-4 whitespace-pre-wrap">
             <PortableText value={study.overview} components={PortableComponents} />
           </div>
         </div>
      </div>

      {/* Metrics Row */}
      {study.metrics && study.metrics.length > 0 && (
      <div id="metrics" className="grid grid-cols-1 md:grid-cols-3 gap-px bg-woodblock border-y border-woodblock scroll-mt-32">
        {study.metrics.map((m, i) => (
          <div key={i} className="bg-sumi p-12 flex flex-col items-center justify-center space-y-4">
            <span className="text-7xl font-black text-cinnabar tracking-tighter">{m.value}</span>
            <span className="text-xs uppercase tracking-generous text-washi/40 font-bold">{m.label}</span>
          </div>
        ))}
      </div>
      )}

      {/* Detailed Content Sections */}
      <div className=" mx-auto space-y-32">
        {/* The Problem */}
        {study.problem && (
          <section id="problem" className="space-y-12 scroll-mt-32">
            <h3 className="text-4xl font-bold tracking-tighter text-washi flex items-center gap-6">
              <span className="text-cinnabar">01.</span> THE PROBLEM
            </h3>
            <div className="text-2xl text-washi/70 leading-relaxed space-y-8 font-light whitespace-pre-wrap">
              <PortableText value={study.problem} components={PortableComponents} />
            </div>
          </section>
        )}

        {/* Background */}
        {study.background && (
          <section id="background" className="space-y-12 scroll-mt-32">
            <h3 className="text-4xl font-bold tracking-tighter text-washi flex items-center gap-6">
              <span className="text-cinnabar">02.</span> BACKGROUND
            </h3>
            <div className="text-2xl text-washi/70 leading-relaxed space-y-8 font-light whitespace-pre-wrap">
              <PortableText value={study.background} components={PortableComponents} />
            </div>
          </section>
        )}

        {/* Investigation */}
        {study.investigation && (
          <section id="investigation" className="space-y-12 scroll-mt-32">
            <h3 className="text-4xl font-bold tracking-tighter text-washi flex items-center gap-6">
              <span className="text-cinnabar">03.</span> INVESTIGATION
            </h3>
            <div className="text-2xl text-washi/70 leading-relaxed space-y-8 font-light whitespace-pre-wrap">
              <PortableText value={study.investigation} components={PortableComponents} />
            </div>
          </section>
        )}

        {/* Findings */}
        {study.findings && (
          <section id="findings" className="space-y-12 scroll-mt-32">
            <h3 className="text-4xl font-bold tracking-tighter text-washi flex items-center gap-6">
              <span className="text-cinnabar">04.</span> FINDINGS
            </h3>
            <div className="text-2xl text-washi/70 leading-relaxed space-y-8 font-light whitespace-pre-wrap">
              <PortableText value={study.findings} components={PortableComponents} />
            </div>
          </section>
        )}

        {/* Media Block 1 */}
        {study.media && study.media.length > 0 && (
          <div id="media" className="space-y-12 scroll-mt-32">
            <h4 className="text-xs uppercase tracking-generous text-cinnabar font-bold">Visualization</h4>
            {study.media.map((item, i) => (
              <figure key={i} className="space-y-4 border border-woodblock p-4 bg-woodblock/5">
                {item.type === 'image' ? (
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
          <section id="solution" className="space-y-12 bg-woodblock/10 p-12 border-l-4 border-cinnabar scroll-mt-32">
            <h3 className="text-4xl font-bold tracking-tighter text-washi flex items-center gap-6">
              <span className="text-cinnabar">05.</span> THE SOLUTION
            </h3>
            <div className="text-2xl text-washi leading-relaxed space-y-8 whitespace-pre-wrap">
              <PortableText value={study.solution} components={PortableComponents} />
            </div>
          </section>
        )}

        {/* Methodology */}
          {study.methodology && (
          <section id="methodology" className="space-y-12 bg-woodblock/10 p-12 border-l-4 border-cinnabar scroll-mt-32">
            <h3 className="text-4xl font-bold tracking-tighter text-washi flex items-center gap-6">
              <span className="text-cinnabar">06.</span> METHODOLOGY
            </h3>
            <div className="text-2xl text-washi leading-relaxed space-y-8 whitespace-pre-wrap">
              <PortableText value={study.methodology} components={PortableComponents} />
            </div>
          </section>
        )}

        {/* Implementation */}
        {study.implementation && (
          <section id="implementation" className="space-y-12 scroll-mt-32">
            <h3 className="text-4xl font-bold tracking-tighter text-washi flex items-center gap-6">
              <span className="text-cinnabar">07.</span> IMPLEMENTATION
            </h3>
            <div className="text-2xl text-washi/70 leading-relaxed space-y-8 font-light whitespace-pre-wrap">
              <PortableText value={study.implementation} components={PortableComponents} />
            </div>
          </section>
        )}
        {/*{study.methodology && (*/}
        {/*  <section className="grid grid-cols-1 md:grid-cols-12 gap-12">*/}
        {/*     <div className="md:col-span-4">*/}
        {/*       <h3 className="text-4xl font-bold tracking-tighter text-washi sticky top-32">*/}
        {/*         METHOD<br />OLOGY*/}
        {/*       </h3>*/}
        {/*     </div>*/}
        {/*     <div className="md:col-span-8 text-xl text-washi/60 leading-relaxed space-y-6 whitespace-pre-wrap">*/}
        {/*       <PortableText value={study.methodology} components={PortableComponents} />*/}
        {/*     </div>*/}
        {/*  </section>*/}
        {/*)}*/}

        {/* Results */}
        {study.results && (
          <div id="results" className="space-y-16 border-t border-woodblock pt-16 scroll-mt-32">
            <div className="space-y-8">
               <h4 className="text-xs uppercase tracking-generous text-cinnabar font-bold">Outcome</h4>
               <h3 className="text-5xl font-black text-washi tracking-tighter">Results</h3>
               <div className="text-2xl text-washi/80 leading-relaxed space-y-8 font-light whitespace-pre-wrap">
                 <PortableText value={study.results} components={PortableComponents} />
               </div>
            </div>
          </div>
        )}

        {/* Conclusion */}
        {study.conclusion && (
          <div id="conclusion" className="bg-cinnabar/30 border-t border-woodblock p-16 space-y-8 scroll-mt-32">
             <h3 className="text-5xl font-black text-washi tracking-tighter">Conclusion</h3>
             <div className="text-2xl text-washi/90 leading-relaxed space-y-6 whitespace-pre-wrap">
               <PortableText value={study.conclusion} components={PortableComponents} />
             </div>
          </div>
        )}

        {/* References */}
        {study.references && study.references.length > 0 && (
          <div id="references" className="space-y-12 scroll-mt-32">
            <h3 className="text-4xl font-bold tracking-tighter text-washi">References</h3>
            <ol className="space-y-4 list-decimal list-inside text-washi/70">
              {study.references.map((ref, i) => (
                <li key={i} className="text-lg">
                  {ref.author}. ({ref.year}). <em>{ref.title}</em>.
                  {ref.link && (
                    <a
                      href={ref.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cinnabar hover:underline ml-2"
                    >
                      Link
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Appendix */}
        {study.appendix && (
          <div id="appendix" className="space-y-12 border-t border-woodblock pt-16 scroll-mt-32">
            <h3 className="text-4xl font-bold tracking-tighter text-washi">Appendix</h3>
            <div className="text-lg text-washi/70 leading-relaxed space-y-6 whitespace-pre-wrap">
              <PortableText value={study.appendix} components={PortableComponents} />
            </div>
          </div>
        )}

        <div id="interactions" className="scroll-mt-32">
          <Interactions contentId={study._id} />
        </div>

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

        {/* Sticky Navigation Sidebar */}
        <div className="lg:col-span-3 ml-20 mt-12">
          <CaseStudyNav sections={navSections} />
        </div>
      </div>
    </div>
  );
};
