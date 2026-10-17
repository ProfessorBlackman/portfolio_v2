import React from 'react';
import type { Metadata } from 'next';
import { sanityService } from '@/lib/sanity/lib/service';
import { LabItem } from '@/lib/types';
import { slugify } from '@/lib/text';
import { PageIntro } from '@/components/PageIntro';
import { ArrowLink, CodePanel, Container, StatusDot, TagList } from '@/components/ui/primitives';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Lab | Methuselah Nwodobeh',
  description: 'Small tools, technical experiments, prototypes, and ideas worth following before they are finished.',
};

const STATUS_LABELS: Record<LabItem['status'], string> = {
  exploring: 'Exploring',
  prototype: 'Prototype',
  shipped: 'Shipped',
  paused: 'Paused',
  abandoned: 'Abandoned',
};

const StatusLabel: React.FC<{ status: LabItem['status'] }> = ({ status }) => (
  <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
    {status === 'exploring' || status === 'prototype' ? (
      <StatusDot />
    ) : (
      <span aria-hidden="true" className={`w-2 h-2 rounded-full ${status === 'shipped' ? 'bg-ink' : 'border border-muted'}`} />
    )}
    {STATUS_LABELS[status] ?? status}
  </span>
);

export default async function LabPage() {
  const items = await sanityService.getLabItems().catch(() => [] as LabItem[]);

  return (
    <main>
      <PageIntro
        eyebrow="02 / The lab"
        title="Curiosity, in progress."
        lede="Small tools, technical experiments, prototypes, and ideas that are worth following even before they are finished. Statuses are honest — some of these will never ship."
      />

      <Container className="pb-16 md:pb-24">
        {items.length === 0 ? (
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <p className="text-lg leading-relaxed text-ink/70 max-w-md">
              The bench is being set up. Experiments will appear here as soon as they are worth showing — finished or not.
            </p>
            <CodePanel>
              <p className="text-signal">~/lab $ ls -la</p>
              <p className="text-paper/60">total 0</p>
              <p>
                <span className="animate-pulse motion-reduce:animate-none">▍</span>
              </p>
            </CodePanel>
          </div>
        ) : (
          <ul className="grid gap-px bg-subtle sm:grid-cols-2 lg:grid-cols-3 border border-subtle">
            {items.map((item) => (
              <li key={item._id} className="bg-paper p-6 flex flex-col">
                <p className="font-mono text-[11px] text-muted">~/lab/{item.slug || slugify(item.title)}/</p>
                <h2 className="mt-3 text-xl font-medium tracking-[-0.01em]">{item.title}</h2>
                <div className="mt-2">
                  <StatusLabel status={item.status} />
                </div>
                {item.summary && <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{item.summary}</p>}
                <TagList tags={item.tags} className="mt-4" />
                {(item.link || item.repo) && (
                  <div className="mt-auto pt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {item.link && <ArrowLink href={item.link} external>Try it</ArrowLink>}
                    {item.repo && <ArrowLink href={item.repo} external>Source</ArrowLink>}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
