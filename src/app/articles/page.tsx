import type { Metadata } from 'next';
import { sanityService } from '@/lib/sanity/lib/service';
import { WritingSummary } from '@/lib/types';
import { PageIntro } from '@/components/PageIntro';
import { FilterLinks, WritingList } from '@/components/writing/WritingList';
import { ArrowLink, Container } from '@/components/ui/primitives';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Writing | Methuselah Nwodobeh',
  description: 'Notes on debugging, architectural trade-offs, and the lessons hidden inside the work.',
};

export default async function ArticlesIndex({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const [articles, caseStudies] = await Promise.all([
    sanityService.getArticleSummaries().catch(() => [] as WritingSummary[]),
    sanityService.getCaseStudySummaries().catch(() => [] as WritingSummary[]),
  ]);

  const categories = Array.from(new Set(articles.map((a) => a.category).filter(Boolean) as string[])).sort();
  const visible = category ? articles.filter((a) => a.category === category) : articles;

  return (
    <main>
      <PageIntro
        eyebrow="Notes & writing"
        title="Things I’ve written."
        lede="Notes on debugging, architectural trade-offs, and the lessons hidden inside the work."
      >
        <FilterLinks basePath="/articles" options={categories} active={category} label="Filter by category" />
      </PageIntro>

      <Container className="pb-16 md:pb-24">
        <WritingList items={visible} emptyMessage="No writing in this category yet." />

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
