'use client';

import React, { useState, useEffect } from 'react';
import { ArticlesPage } from '@/components/ArticlesPage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { Article } from '@/lib/types';
import { sanityService } from '@/lib/sanity/lib/service';

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await sanityService.getArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const handleSelectArticle = (article: Article) => {
    router.push(`/articles/${article.slug || article._id}`);
  };

  return (
    <div className="min-h-screen pattern-bg selection:bg-cinnabar selection:text-washi">
      <Header />
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <ArticlesPage articles={articles} onSelectArticle={handleSelectArticle} />
      </main>
      <Footer />
    </div>
  );
}
