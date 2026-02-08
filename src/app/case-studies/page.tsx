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
        console.log("getCaseStudies");
        console.log(data);
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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden pattern-bg selection:bg-cinnabar selection:text-washi">
      <Header />
      <main className="w-full max-w-7xl lg:max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12">
        <CaseStudiesPage caseStudies={caseStudies} onSelectCaseStudy={handleSelectCaseStudy} />
      </main>
      <Footer />
    </div>
  );
}
