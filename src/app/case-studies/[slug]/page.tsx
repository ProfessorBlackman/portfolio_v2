/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { cache } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { sanityService } from '@/lib/sanity/lib/service';
import { CaseStudy } from '@/lib/types';
import { PortableComponents } from '@/components/blog/portable-components';
import { Interactions } from '@/components/Interactions';
import {
  GlanceItem,
  LongformIntro,
  LongformLayout,
  LongformSection,
  References,
  sectionNumber,
  TocItem,
} from '@/components/longform/Longform';
import { formatDuration, formatMonthYear, formatYear, readingMinutes } from '@/lib/text';

export const revalidate = 300;

const getStudy = cache((slug: string) => sanityService.getCaseStudyBySlug(slug));

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = await getStudy((await params).slug);
  if (!study) return {};
  return {
    title: `${study.title} | Case Study | Methuselah Nwodobeh`,
    description: (study.seoDescription || study.subtitle)?.slice(0, 160),
  };
}

// The case-study schema has fixed fields; this sets their reading order and headings.
const SECTIONS: { key: keyof CaseStudy; eyebrow: string; title: string }[] = [
  { key: 'background', eyebrow: 'Introduction', title: 'Background' },
  { key: 'problem', eyebrow: 'Problem & context', title: 'Problem statement' },
  { key: 'investigation', eyebrow: 'Investigation', title: 'Investigation' },
  { key: 'methodology', eyebrow: 'Methodology', title: 'Approach and methodology' },
  { key: 'findings', eyebrow: 'Findings', title: 'Findings' },
  { key: 'solution', eyebrow: 'System design', title: 'The solution' },
  { key: 'implementation', eyebrow: 'Implementation', title: 'Implementation details' },
  { key: 'results', eyebrow: 'Evaluation', title: 'Evaluation and results' },
  { key: 'conclusion', eyebrow: 'Conclusion', title: 'Conclusion' },
];

// The author field is free text and sometimes just "Me".
const authorName = (author?: string) =>
  !author || author.trim().toLowerCase() === 'me' ? 'Methuselah Nwodobeh' : author;

const hasBlocks = (value: unknown): value is any[] => Array.isArray(value) && value.length > 0;

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const [study, summaries] = await Promise.all([
    getStudy(slug),
    sanityService.getCaseStudySummaries().catch(() => []),
  ]);
  if (!study) notFound();

  const present = SECTIONS.filter((section) => hasBlocks(study[section.key]));
  const media = study.media?.filter((item) => item?.url) ?? [];
  const minutes =
    formatDuration(study.duration) ??
    `${readingMinutes(study.overview, ...present.map((section) => study[section.key] as any[]))} min`;

  // Numbered sections: the schema sections, then figures, then references/appendix.
  const numbered: { id: string; label: string }[] = [
    ...present.map((section) => ({ id: String(section.key), label: section.title })),
    ...(media.length ? [{ id: 'figures', label: 'Figures' }] : []),
    ...(study.references?.length || hasBlocks(study.appendix) ? [{ id: 'references', label: 'References' }] : []),
  ];
  const numberOf = (id: string) => sectionNumber(numbered.findIndex((item) => item.id === id));

  const toc: TocItem[] = [
    ...(hasBlocks(study.overview) ? [{ id: 'summary', label: 'Summary' }] : []),
    ...numbered.map((item, i) => ({ ...item, number: sectionNumber(i) })),
    { id: 'discussion', label: 'Discussion' },
  ];

  const glance: GlanceItem[] = [
    ...(study.client ? [{ label: 'Context', value: study.client }] : []),
    ...(study.tags?.length ? [{ label: 'Topics', value: study.tags.join(' · ') }] : []),
    ...(study.metrics ?? []).map((metric) => ({ label: metric.label, value: metric.value })),
  ];

  const index = summaries.findIndex((item) => item._id === study._id);
  const nextStudy = summaries.length > 1 ? summaries[(index + 1) % summaries.length] : null;

  return (
    <LongformLayout
      breadcrumbs={[
        { label: 'Writing', href: '/articles' },
        { label: 'Case studies', href: '/case-studies' },
        ...(study.tags?.[0] ? [{ label: study.tags[0] }] : []),
      ]}
      title={study.title}
      dek={study.subtitle}
      byline={[authorName(study.author), 'Software engineer']}
      meta={['Case study', `${minutes} read`, formatYear(study.date)]}
      glance={glance}
      cover={study.coverImage ? { src: study.coverImage, alt: '' } : undefined}
      toc={toc}
      endNote={formatMonthYear(study.date) && `Published ${formatMonthYear(study.date)}`}
      next={{ kicker: 'Next in selected work', label: 'Explore another project', href: '/#work' }}
      related={
        nextStudy && nextStudy._id !== study._id
          ? { kicker: 'Related case study', title: nextStudy.title, href: `/case-studies/${nextStudy.slug}` }
          : { kicker: 'More writing', title: 'Notes, essays and field reports', href: '/articles' }
      }
    >
      {hasBlocks(study.overview) && (
        <LongformIntro id="summary" eyebrow="Abstract" title="Summary">
          <PortableText value={study.overview} components={PortableComponents} />
        </LongformIntro>
      )}

      {present.map((section) => (
        <LongformSection
          key={String(section.key)}
          id={String(section.key)}
          number={numberOf(String(section.key))}
          eyebrow={section.eyebrow}
          title={section.title}
        >
          <PortableText value={study[section.key] as any[]} components={PortableComponents} />
        </LongformSection>
      ))}

      {media.length > 0 && (
        <LongformSection id="figures" number={numberOf('figures')} eyebrow="Figures" title="Figures">
          {media.map((item, i) => (
            <figure key={i} className="my-8">
              {item.type === 'video' ? (
                <video src={item.url} controls className="w-full bg-wash" />
              ) : (
                <div className="relative aspect-[16/10] bg-wash">
                  <Image src={item.url} alt={item.caption || ''} fill sizes="(min-width: 1024px) 46rem, 100vw" className="object-contain" />
                </div>
              )}
              <figcaption className="mt-2 text-[13px] text-muted">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]">Figure {i + 1}</span>
                {item.caption && <> — {item.caption}</>}
              </figcaption>
            </figure>
          ))}
        </LongformSection>
      )}

      {(study.references?.length || hasBlocks(study.appendix)) && (
        <LongformSection id="references" number={numberOf('references')} eyebrow="References & appendix" title="References">
          <References items={study.references} />
          {hasBlocks(study.appendix) && (
            <>
              <h3 className="mt-10 mb-3 text-[1.35rem] font-medium">Appendix</h3>
              <PortableText value={study.appendix} components={PortableComponents} />
            </>
          )}
        </LongformSection>
      )}

      <LongformSection id="discussion" eyebrow="Discussion" title="What do you think?">
        <Interactions contentId={study._id} />
      </LongformSection>
    </LongformLayout>
  );
}
