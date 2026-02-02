'use client';

import React from 'react';
import { ArticlesPage } from '@/components/ArticlesPage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { Article } from '@/lib/types';

export default function Articles() {
  const router = useRouter();

  const handleSelectArticle = (article: Article) => {
    router.push(`/articles/${article.id}`);
  };

  return (
    <div className="min-h-screen pattern-bg selection:bg-cinnabar selection:text-washi">
      <Header />
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <ArticlesPage onSelectArticle={handleSelectArticle} />
      </main>
      <Footer />
    </div>
  );
}
