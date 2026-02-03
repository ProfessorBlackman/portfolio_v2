
import React from 'react';
import { ARTICLES } from '@/lib/constants';
import Link from 'next/link';

export const ArticlesSection: React.FC = () => {
  return (
    <section id="articles" className="space-y-12">
      <div className="flex items-center justify-between border-b border-woodblock pb-6">
        <h3 className="text-3xl font-bold tracking-generous text-washi">
          LATEST <span className="text-cinnabar">ARTICLES</span>
        </h3>
        <Link href="/articles" className="text-xs text-washi/40 hover:text-cinnabar transition-colors uppercase tracking-generous">View All</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {ARTICLES.slice(0, 4).map((article) => (
          <Link href={`/articles/${article._id}`} key={article._id} className="space-y-4 group block">
            <div className="flex items-center gap-4 text-[10px] text-washi/40 uppercase tracking-widest">
              <span className="text-cinnabar font-bold">{article.category}</span>
              <span className="w-1 h-1 bg-woodblock rounded-full"></span>
              <span>{article.publishedAt}</span>
            </div>
            <h4 className="text-2xl font-bold text-washi leading-snug group-hover:text-cinnabar transition-colors cursor-pointer">
              {article.title}
            </h4>
            <p className="text-washi/60 text-sm leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {(article.tags || []).map(tag => (
                <span key={tag} className="text-[10px] text-washi/30 bg-woodblock/20 px-2 py-0.5 border border-woodblock/30">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
