
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CaseStudy } from '@/lib/types';
import { CaseStudyCard } from './CaseStudyCard';
import { Filter, X } from 'lucide-react';

interface CaseStudiesPageProps {
  caseStudies?: CaseStudy[];
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ caseStudies, onSelectCaseStudy }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFilterOpen &&
        filterRef.current &&
        filterButtonRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  const displayCaseStudies = useMemo(() => {
    return caseStudies && caseStudies.length > 0 ? caseStudies : [];
  }, [caseStudies]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    displayCaseStudies.forEach(cs => cs.tags?.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [displayCaseStudies]);

  const filteredStudies = useMemo(() => {
    return displayCaseStudies.filter(cs => {
      const matchesSearch = cs.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (cs.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
                            (Array.isArray(cs.overview) ? cs.overview.some(p => {
                              if (typeof p === 'string') return p.toLowerCase().includes(searchQuery.toLowerCase());
                              if (p && typeof p === 'object' && 'children' in p && Array.isArray(p.children)) {
                                return p.children.some((child: any) => 
                                  typeof child.text === 'string' && child.text.toLowerCase().includes(searchQuery.toLowerCase())
                                );
                              }
                              return false;
                            }) : typeof cs.overview === 'string' && (cs.overview as string).toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = !activeTag || cs.tags?.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [displayCaseStudies, searchQuery, activeTag]);

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

      {/* Mobile Search & Filter Bar */}
      <div className="lg:hidden space-y-4">
        <div className="flex gap-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-washi/30">🔍</span>
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-woodblock/70 border border-woodblock/40 p-4 pl-12 text-sm text-washi focus:border-cinnabar outline-none transition-all placeholder:text-washi/20 rounded-sm"
            />
          </div>

          {/* Filter Button */}
          <button
            ref={filterButtonRef}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-4 py-4 bg-woodblock/70 border border-woodblock/40 text-washi hover:text-cinnabar hover:border-cinnabar transition-all rounded-sm flex items-center gap-2"
          >
            {isFilterOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Filter Dropdown */}
        {isFilterOpen && (
          <div
            ref={filterRef}
            className="bg-sumi border border-woodblock shadow-2xl rounded-sm p-6 space-y-6 animate-in slide-in-from-top-4 duration-300"
          >
            {/* Tags / Areas of Study */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-washi tracking-widest uppercase border-b border-woodblock/20 pb-3">Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setActiveTag(null);
                    setIsFilterOpen(false);
                  }}
                  className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all border ${
                    !activeTag ? 'bg-cinnabar border-cinnabar text-washi' : 'bg-woodblock/30 border-woodblock/40 text-washi/40 hover:border-washi/60'
                  }`}
                >
                  All Areas
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setActiveTag(activeTag === tag ? null : tag);
                      setIsFilterOpen(false);
                    }}
                    className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all border ${
                      activeTag === tag ? 'bg-cinnabar border-cinnabar text-washi' : 'bg-woodblock/30 border-woodblock/40 text-washi/40 hover:border-washi/60 hover:text-washi'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || activeTag) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveTag(null);
                  setIsFilterOpen(false);
                }}
                className="w-full text-cinnabar underline font-bold uppercase tracking-generous text-xs py-2"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Content: Case Study List */}
        <div className="lg:col-span-8 space-y-12">
          {filteredStudies.length > 0 ? filteredStudies.map((cs) => (
            <CaseStudyCard
              key={cs._id}
              study={cs}
              onSelect={onSelectCaseStudy}
            />
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

        {/* Sidebar Filters - Desktop Only */}
        <div className="hidden lg:block lg:col-span-4 space-y-8 sticky top-32">
          {/* Search */}
          <div className="bg-woodblock/70 p-8 border border-woodblock/70 rounded-md space-y-6">
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
          <div className="bg-woodblock/70 p-8 border border-woodblock/70 rounded-md space-y-6">
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

          {/* Contextual Note - Hidden on Small Devices */}
          <div className="hidden md:block bg-woodblock/70 p-8 border border-woodblock/70 rounded-md space-y-4">
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
