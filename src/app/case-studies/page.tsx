import type { Metadata } from 'next';
import { sanityService } from '@/lib/sanity/lib/service';
import { WritingSummary } from '@/lib/types';
import { PageIntro } from '@/components/PageIntro';
import { WritingList } from '@/components/writing/WritingList';
import { ArrowLink, Container } from '@/components/ui/primitives';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Case Studies | Methuselah Nwodobeh',
  description: 'In-depth engineering stories: the problem, the decisions, the trade-offs, and what was learned.',
};

export default async function CaseStudiesIndex() {
  const caseStudies = await sanityService.getCaseStudySummaries().catch(() => [] as WritingSummary[]);

  return (
    <main>
      <PageIntro
        eyebrow="Writing / Case studies"
        title="The full engineering story."
        lede="The problem, the decisions, the trade-offs, and what was learned — with the evidence attached."
      />
      <Container className="pb-16 md:pb-24">
        <WritingList items={caseStudies} emptyMessage="No case studies published yet." />
        <ArrowLink href="/articles" className="mt-10">
          All writing
        </ArrowLink>
      </Container>
    </main>
  );
}
