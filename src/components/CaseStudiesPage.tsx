
import React, { useState, useMemo } from 'react';
import { CASE_STUDIES } from '@/constants';
import { CaseStudy } from '@/types';

interface CaseStudiesPageProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onSelectCaseStudy }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    CASE_STUDIES.forEach(cs => cs.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filteredStudies = useMemo(() => {
    return CASE_STUDIES.filter(cs => {
      const matchesSearch = cs.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            cs.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            cs.overview.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = !activeTag || cs.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, activeTag]);

  return (
    <div className="py-32 space-y-16 animate-in fade-in duration-700">
      <div className="space-y-6">
        <h2 className="text-7xl font-black tracking-tighter text-washi uppercase">
          Case <span className="text-cinnabar">Studies</span>
        </h2>
        <p className="text-2xl text-washi/60 max-w-3xl leading-relaxed font-light border-l-4 border-woodblock pl-8">
          Deep dives into complex engineering problems, architectural trade-offs, and measurable outcomes in real-world environments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Content: Case Study List */}
        <div className="lg:col-span-8 space-y-12">
          {filteredStudies.length > 0 ? filteredStudies.map((cs) => (
            <div 
              key={cs._id} 
              className="group grid grid-cols-1 md:grid-cols-12 gap-0 bg-woodblock/10 border border-woodblock/20 hover:border-cinnabar transition-all cursor-pointer overflow-hidden rounded-md"
              onClick={() => onSelectCaseStudy(cs)}
            >
              <div className="md:col-span-4 relative overflow-hidden h-48 md:h-auto">
                <img 
                  src={cs.coverImage} 
                  alt={cs.title} 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-sumi/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="md:col-span-8 p-8 space-y-6 flex flex-col justify-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-cinnabar">
                    <span>{cs.duration}</span>
                    <span className="w-2 h-[1px] bg-woodblock"></span>
                    <span className="text-washi/40">{cs.client}</span>
                  </div>
                  <h3 className="text-3xl font-black text-washi leading-tight tracking-tighter group-hover:text-cinnabar transition-colors">
                    {cs.title}
                  </h3>
                </div>
                <p className="text-sm text-washi/50 leading-relaxed line-clamp-2">
                  {cs.overview[0]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cs.tags.map(tag => (
                    <span key={tag} className="text-[9px] uppercase tracking-widest text-washi/30 font-bold border border-woodblock px-2 py-0.5">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )) : (
            <div className="py-20 text-center bg-woodblock/5 rounded-md border border-dashed border-woodblock">
              <p className="text-2xl text-washi/40 italic">No case studies match your selection.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveTag(null); }}
                className="mt-4 text-cinnabar underline font-bold uppercase tracking-generous text-xs"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Filters */}
        <div className="lg:col-span-4 space-y-8 sticky top-32">
          {/* Search */}
          <div className="bg-woodblock/10 p-8 border border-woodblock/20 rounded-md space-y-6">
            <h4 className="text-lg font-bold text-washi tracking-widest uppercase border-b border-woodblock/20 pb-4">Search</h4>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-washi/30">🔍</span>
              <input 
                type="text" 
                placeholder="Search case studies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-sumi border border-woodblock/40 p-4 pl-12 text-sm text-washi focus:border-cinnabar outline-none transition-all placeholder:text-washi/20 rounded-sm"
              />
            </div>
          </div>

          {/* Tags / Areas of Study */}
          <div className="bg-woodblock/10 p-8 border border-woodblock/20 rounded-md space-y-6">
            <h4 className="text-lg font-bold text-washi tracking-widest uppercase border-b border-woodblock/20 pb-4">Focus Areas</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all border ${
                  !activeTag ? 'bg-cinnabar border-cinnabar text-washi' : 'bg-sumi border-woodblock/40 text-washi/40 hover:border-washi/60'
                }`}
              >
                All Areas
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all border ${
                    activeTag === tag ? 'bg-cinnabar border-cinnabar text-washi' : 'bg-sumi border-woodblock/40 text-washi/40 hover:border-washi/60 hover:text-washi'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Contextual Note */}
          <div className="bg-woodblock/10 p-8 border border-woodblock/20 rounded-md space-y-4">
            <h4 className="text-lg font-bold text-washi tracking-widest uppercase border-b border-woodblock/20 pb-4">Engineering Depth</h4>
            <p className="text-sm text-washi/50 leading-relaxed">
              These case studies focus on the architecture, trade-offs, and reasoning behind my engineering decisions. I prioritize systems that solve real human problems under harsh technical constraints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
