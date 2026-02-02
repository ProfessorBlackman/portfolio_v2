'use client';

import React, { use } from 'react';
import { CASE_STUDIES } from '@/lib/constants';
import { CaseStudyDetail } from '@/components/CaseStudyDetail';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRouter, notFound } from 'next/navigation';

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const study = CASE_STUDIES.find((cs) => cs._id === slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen pattern-bg selection:bg-cinnabar selection:text-washi">
      <Header />
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <CaseStudyDetail study={study} onBack={() => router.push('/case-studies')} />
      </main>
      <Footer />
    </div>
  );
}
