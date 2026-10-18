import type { Metadata } from 'next';
import { sanityService } from '@/lib/sanity/lib/service';
import { WritingSummary } from '@/lib/types';
import { PageIntro } from '@/components/PageIntro';
import { WritingSearch } from '@/components/writing/WritingSearch';
import { ArrowLink, Container } from '@/components/ui/primitives';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Case Studies | Methuselah Nwodobeh',
  description: 'In-depth engineering stories: the problem, the decisions, the trade-offs, and what was learned.',
};

export default async function CaseStudiesIndex({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const caseStudies = await sanityService.getCaseStudySummaries().catch(() => [] as WritingSummary[]);

  return (
    <main>
      <PageIntro
        eyebrow="Writing / Case studies"
        title="The full engineering story."
        lede="The problem, the decisions, the trade-offs, and what was learned — with the evidence attached."
      />
      <Container className="pt-10 md:pt-12 pb-16 md:pb-24">
        <WritingSearch
          items={caseStudies}
          noun="case studies"
          initialQuery={q}
          emptyMessage="No case studies published yet."
        />
        <ArrowLink href="/articles" className="mt-10">
          All writing
        </ArrowLink>
      </Container>
    </main>
  );
}
