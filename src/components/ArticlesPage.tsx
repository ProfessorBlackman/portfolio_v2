
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Article } from '@/lib/types';
import { Filter, X } from 'lucide-react';

interface ArticlesPageProps {
  articles?: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ articles, onSelectArticle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
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

  const displayArticles = articles && articles.length > 0 ? articles : [];

  const categories = useMemo(() => ['All', ...Array.from(new Set(displayArticles.map(a => a.category).filter(Boolean) as string[]))], [displayArticles]);
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    displayArticles.forEach(a => a.tags?.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [displayArticles]);

  const popularPosts = useMemo(() => displayArticles.slice(0, 3), [displayArticles]);

  const filteredArticles = useMemo(() => {
    return displayArticles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchesTag = !activeTag || article.tags?.includes(activeTag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [displayArticles, searchQuery, activeCategory, activeTag]);

  return (
    <div className="py-32 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <h2 className="text-6xl font-black tracking-tighter text-washi">
          Blog
        </h2>
      </div>

      {/* Mobile Search & Filter Bar */}
      <div className="lg:hidden space-y-4">
        <div className="flex gap-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-washi/30">🔍</span>
            <input
              type="text"
              placeholder="Search posts..."
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
            {/* Categories */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-washi tracking-widest uppercase border-b border-woodblock/20 pb-3">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all border ${
                      activeCategory === cat ? 'bg-cinnabar border-cinnabar text-washi' : 'bg-woodblock/30 border-woodblock/40 text-washi/40 hover:border-washi/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-washi tracking-widest uppercase border-b border-woodblock/20 pb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
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
            {(searchQuery || activeCategory !== 'All' || activeTag) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
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
        {/* Main Content: Article List */}
        <div className="lg:col-span-8 space-y-8">
          {filteredArticles.length > 0 ? filteredArticles.map((article) => (
            <article 
              key={article._id}
              className="group cursor-pointer space-y-6 bg-woodblock/70 p-10 border border-woodblock/70 hover:border-cinnabar transition-all hover:bg-woodblock/20 rounded-md"
              onClick={() => onSelectArticle(article)}
            >
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest">
                <span className="px-3 py-1 bg-washi/10 text-washi rounded-full">
                  {article.category}
                </span>
                <span className="text-washi/40 flex items-center gap-2">
                   📅 {article.publishedAt}
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-washi leading-tight group-hover:text-cinnabar transition-colors">
                {article.title}
              </h3>
              
              <p className="text-lg text-washi/60 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {article.tags?.map(tag => (
                  <span 
                    key={tag} 
                    className={`text-[11px] uppercase tracking-widest font-bold px-3 py-1 rounded-md border transition-colors ${
                      activeTag === tag ? 'bg-cinnabar border-cinnabar text-washi' : 'bg-washi/5 border-woodblock text-washi/40'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          )) : (
            <div className="py-20 text-center bg-woodblock/5 rounded-md border border-dashed border-woodblock">
              <p className="text-2xl text-washi/40 italic">No articles match your search criteria.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveTag(null); }}
                className="mt-4 text-cinnabar underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:block lg:col-span-4 space-y-8">
          {/* Search Widget */}
          <div className="bg-woodblock/70 p-8 border border-woodblock/70 rounded-md space-y-6">
            <h4 className="text-lg font-bold text-washi tracking-widest uppercase border-b border-woodblock/20 pb-4">Search</h4>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-washi/30">🔍</span>
              <input 
                type="text" 
                placeholder="Search posts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-sumi border border-woodblock/40 p-4 pl-12 text-sm text-washi focus:border-cinnabar outline-none transition-all placeholder:text-washi/20 rounded-sm"
              />
            </div>
          </div>

          {/* Categories Widget */}
          <div className="bg-woodblock/70 p-8 border border-woodblock/70 rounded-md space-y-6">
            <h4 className="text-lg font-bold text-washi tracking-widest uppercase border-b border-woodblock/20 pb-4">Categories</h4>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-3 w-full text-left text-sm font-medium transition-all hover:text-cinnabar ${
                      activeCategory === cat ? 'text-cinnabar' : 'text-washi/70'
                    }`}
                  >
                    <span className="text-cinnabar">◇</span> {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags Widget */}
          <div className="bg-woodblock/70 p-8 border border-woodblock/70 rounded-md space-y-6">
            <h4 className="text-lg font-bold text-washi tracking-widest uppercase border-b border-woodblock/20 pb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded transition-all border ${
                    activeTag === tag ? 'bg-cinnabar border-cinnabar text-washi' : 'bg-sumi border-woodblock/40 text-washi/40 hover:border-washi/60 hover:text-washi'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Posts Widget - Hidden on Small Devices */}
          <div className="hidden md:block bg-woodblock/70 p-8 border border-woodblock/70 rounded-md space-y-6">
            <h4 className="text-lg font-bold text-washi tracking-widest uppercase border-b border-woodblock/20 pb-4">Popular Posts</h4>
            <div className="space-y-6">
              {popularPosts.map((post, idx) => (
                <div key={post._id} className="flex gap-4 group cursor-pointer" onClick={() => onSelectArticle(post)}>
                  <span className="shrink-0 w-6 h-6 bg-woodblock/40 text-washi/40 flex items-center justify-center text-[10px] font-bold rounded-full border border-woodblock/20">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-washi group-hover:text-cinnabar transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About Widget - Hidden on Small Devices */}
          <div className="hidden md:block bg-woodblock/70 p-8 border border-woodblock/70 rounded-md space-y-6">
            <h4 className="text-lg font-bold text-washi tracking-widest uppercase border-b border-woodblock/20 pb-4">About</h4>
            <p className="text-sm text-washi/50 leading-relaxed">
              Welcome to my corner of the internet where I write about whatever catches my eye in the world of software development, from backend adventures and microservices mishaps to AI experiments and the occasional deep dive into something weird but wonderful. If it&#39;s interesting, useful, or just plain cool, you&#39;ll probably find me writing about it here. Stick around, you might just learn something new (or at least leave with a few tabs open).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
