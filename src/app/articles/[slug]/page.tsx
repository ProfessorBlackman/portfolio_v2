/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { sanityService } from '@/lib/sanity/lib/service';
import { PortableComponents } from '@/components/blog/portable-components';
import { Interactions } from '@/components/Interactions';
import { LongformLayout, LongformSection, sectionNumber, TocItem } from '@/components/longform/Longform';
import { blockText, formatDuration, formatMonthYear, formatYear, readingMinutes, slugify } from '@/lib/text';

export const revalidate = 300;

const getArticle = cache((slug: string) => sanityService.getArticleBySlug(slug));

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) return {};
  return {
    title: `${article.title} | Methuselah Nwodobeh`,
    description: article.excerpt?.slice(0, 160),
  };
}

interface BodySection {
  id: string;
  title: string;
  blocks: any[];
}

/**
 * Splits a Portable Text body at its top-level headings so each one becomes a
 * numbered section. Content before the first heading is the introduction.
 */
const splitBody = (body: any[]) => {
  const blocks = Array.isArray(body) ? body : [];
  const level = ['h1', 'h2', 'h3'].find((style) =>
    blocks.some((block) => block._type === 'block' && block.style === style),
  );
  const intro: any[] = [];
  const sections: BodySection[] = [];
  const usedIds = new Set(['introduction', 'discussion']);

  for (const block of blocks) {
    const title = block._type === 'block' && block.style === level ? blockText(block).trim() : '';
    if (title) {
      let id = slugify(title) || `section-${sections.length + 1}`;
      while (usedIds.has(id)) id = `${id}-${sections.length + 1}`;
      usedIds.add(id);
      sections.push({ id, title, blocks: [] });
    } else {
      (sections.at(-1)?.blocks ?? intro).push(block);
    }
  }
  return { intro, sections };
};

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const [article, summaries] = await Promise.all([
    getArticle(slug),
    sanityService.getArticleSummaries().catch(() => []),
  ]);
  if (!article) notFound();

  const { intro, sections } = splitBody(article.body);
  const minutes = formatDuration(article.duration) ?? `${readingMinutes(article.body)} min`;

  const toc: TocItem[] = [
    ...(intro.length ? [{ id: 'introduction', label: 'Introduction' }] : []),
    ...sections.map((section, i) => ({ id: section.id, label: section.title, number: sectionNumber(i) })),
    { id: 'discussion', label: 'Discussion' },
  ];

  const index = summaries.findIndex((item) => item._id === article._id);
  const nextArticle = summaries.length > 1 ? summaries[(index + 1) % summaries.length] : null;

  return (
    <LongformLayout
      breadcrumbs={[
        { label: 'Writing', href: '/articles' },
        ...(article.category ? [{ label: article.category }] : []),
      ]}
      title={article.title}
      dek={article.excerpt}
      byline={['Methuselah Nwodobeh', 'Software engineer']}
      meta={['Essay', `${minutes} read`, formatYear(article.publishedAt)]}
      glance={
        article.tags?.length
          ? [
              { label: 'Topics', value: article.tags.join(' · ') },
              ...(article.publishedAt ? [{ label: 'Published', value: formatMonthYear(article.publishedAt) }] : []),
            ]
          : undefined
      }
      cover={article.image ? { src: article.image, alt: '' } : undefined}
      toc={toc}
      endNote={formatMonthYear(article.publishedAt) && `Published ${formatMonthYear(article.publishedAt)}`}
      next={{ kicker: 'Keep reading', label: 'All writing', href: '/articles' }}
      related={
        nextArticle && nextArticle._id !== article._id
          ? { kicker: 'Up next', title: nextArticle.title, href: `/articles/${nextArticle.slug}` }
          : null
      }
    >
      {intro.length > 0 && (
        <section id="introduction" aria-label="Introduction" className="longform-body scroll-mt-24">
          <PortableText value={intro} components={PortableComponents} />
        </section>
      )}

      {sections.map((section, i) => (
        <LongformSection key={section.id} id={section.id} number={sectionNumber(i)} title={section.title}>
          <PortableText value={section.blocks} components={PortableComponents} />
        </LongformSection>
      ))}

      <LongformSection id="discussion" eyebrow="Discussion" title="What do you think?">
        <Interactions contentId={article._id} />
      </LongformSection>
    </LongformLayout>
  );
}
