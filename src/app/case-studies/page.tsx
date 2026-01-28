'use client';

import React from 'react';
import { CaseStudiesPage } from '@/components/CaseStudiesPage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { CaseStudy } from '@/types';

export default function CaseStudies() {
  const router = useRouter();

  const handleSelectCaseStudy = (study: CaseStudy) => {
    router.push(`/case-studies/${study._id}`);
  };

  return (
    <div className="min-h-screen pattern-bg selection:bg-cinnabar selection:text-washi">
      <Header />
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <CaseStudiesPage onSelectCaseStudy={handleSelectCaseStudy} />
      </main>
      <Footer />
    </div>
  );
}
