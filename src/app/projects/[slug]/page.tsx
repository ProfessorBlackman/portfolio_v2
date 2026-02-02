'use client';

import React, { use } from 'react';
import { PROJECTS } from '@/lib/constants';
import { ProjectDetail } from '@/components/ProjectDetail';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRouter, notFound } from 'next/navigation';

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pattern-bg selection:bg-cinnabar selection:text-washi">
      <Header />
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <ProjectDetail project={project} onBack={() => router.push('/')} />
      </main>
      <Footer />
    </div>
  );
}
