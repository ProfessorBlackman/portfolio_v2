'use client';

import React, { useState, useEffect } from 'react';
import { CaseStudiesPage } from '@/components/CaseStudiesPage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { CaseStudy } from '@/lib/types';
import { sanityService } from '@/lib/sanity/lib/service';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await sanityService.getCaseStudies();
        setCaseStudies(data);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      }
    };
    fetchCaseStudies();
  }, []);

  const handleSelectCaseStudy = (study: CaseStudy) => {
    router.push(`/case-studies/${study.slug || study._id}`);
  };

  return (
    <div className="min-h-screen pattern-bg selection:bg-cinnabar selection:text-washi">
      <Header />
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <CaseStudiesPage caseStudies={caseStudies} onSelectCaseStudy={handleSelectCaseStudy} />
      </main>
      <Footer />
    </div>
  );
}
