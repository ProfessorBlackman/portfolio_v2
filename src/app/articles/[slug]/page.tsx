'use client';

import React, { use } from 'react';
import { ARTICLES } from '@/lib/constants';
import { ArticleDetail } from '@/components/ArticleDetail';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRouter, notFound } from 'next/navigation';

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const article = ARTICLES.find((a) => a.id === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen pattern-bg selection:bg-cinnabar selection:text-washi">
      <Header />
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <ArticleDetail article={article} onBack={() => router.push('/articles')} />
      </main>
      <Footer />
    </div>
  );
}
