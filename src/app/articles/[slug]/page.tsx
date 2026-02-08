'use client';

import React, { use, useState, useEffect } from 'react';
import { ArticleDetail } from '@/components/ArticleDetail';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { sanityService } from '@/lib/sanity/lib/service';
import { Article } from '@/lib/types';

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await sanityService.getArticleBySlug(slug);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen w-full max-w-full overflow-x-hidden pattern-bg flex items-center justify-center">
        <div className="text-cinnabar text-2xl font-bold animate-pulse">LOADING...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen w-full max-w-full overflow-x-hidden pattern-bg flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold text-washi">Article not found</h1>
        <button
          onClick={() => router.push('/articles')}
          className="px-8 py-3 bg-cinnabar text-washi font-bold"
        >
          BACK TO ARTICLES
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden pattern-bg selection:bg-cinnabar selection:text-washi">
      <Header />
      <main className="w-full max-w-7xl lg:max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12">
        <ArticleDetail article={article} onBack={() => router.push('/articles')} />
      </main>
      <Footer />
    </div>
  );
}
