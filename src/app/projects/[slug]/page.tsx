'use client';

import React, { use, useState, useEffect } from 'react';
import { ProjectDetail } from '@/components/ProjectDetail';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { sanityService } from '@/lib/sanity/lib/service';
import { Project } from '@/lib/types';

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await sanityService.getProjectBySlug(slug);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pattern-bg flex items-center justify-center">
        <div className="text-cinnabar text-2xl font-bold animate-pulse">LOADING...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pattern-bg flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold text-washi">Project not found</h1>
        <button 
          onClick={() => router.push('/')}
          className="px-8 py-3 bg-cinnabar text-washi font-bold"
        >
          BACK HOME
        </button>
      </div>
    );
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
