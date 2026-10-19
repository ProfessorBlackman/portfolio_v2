import type { Metadata } from 'next';
import { sanityService } from '@/lib/sanity/lib/service';
import { WritingSummary } from '@/lib/types';
import { PageIntro } from '@/components/PageIntro';
import { WritingSearch } from '@/components/writing/WritingSearch';
import { ArrowLink, Container } from '@/components/ui/primitives';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Writing | Methuselah Nwodobeh',
  description: 'Notes on debugging, architectural trade-offs, and the lessons hidden inside the work.',
};

export default async function ArticlesIndex({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const { category, q } = await searchParams;
  const [articles, caseStudies] = await Promise.all([
    sanityService.getArticleSummaries().catch(() => [] as WritingSummary[]),
    sanityService.getCaseStudySummaries().catch(() => [] as WritingSummary[]),
  ]);

  return (
    <main>
      <PageIntro
        eyebrow="Notes & writing"
        title="Things I’ve written."
        lede="Notes on debugging, architectural trade-offs, and the lessons hidden inside the work."
      />

      <Container className="pt-10 md:pt-12 pb-16 md:pb-24">
        <WritingSearch
          items={articles}
          noun="articles"
          initialQuery={q}
          initialCategory={category}
          emptyMessage="No articles published yet."
        />

        {caseStudies.length > 0 && (
          <aside className="mt-12 bg-wash p-6 md:p-8 md:flex md:items-center md:justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Longer reads</p>
              <p className="mt-2 text-lg font-medium">
                {caseStudies.length} in-depth case {caseStudies.length === 1 ? 'study' : 'studies'} with the full engineering story.
              </p>
            </div>
            <ArrowLink href="/case-studies" className="mt-4 md:mt-0 shrink-0">
              Read the case studies
            </ArrowLink>
          </aside>
        )}
      </Container>
    </main>
  );
}
