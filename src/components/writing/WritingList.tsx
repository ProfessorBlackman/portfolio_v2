import React from 'react';
import Link from 'next/link';
import { WritingSummary } from '@/lib/types';
import { formatDuration, formatMonthYear } from '@/lib/text';

export const writingHref = (item: WritingSummary) =>
  item._type === 'caseStudy' ? `/case-studies/${item.slug}` : `/articles/${item.slug}`;

/** Ruled list of articles / case studies; each row is one link. */
export const WritingList: React.FC<{ items: WritingSummary[]; emptyMessage?: string }> = ({ items, emptyMessage }) => {
  if (!items.length) {
    return <p className="py-12 text-ink/60">{emptyMessage ?? 'Nothing here yet.'}</p>;
  }

  return (
    <ul className="divide-y divide-subtle">
      {items.map((item) => {
        const duration = formatDuration(item.duration);
        return (
          <li key={item._id}>
            <Link
              href={writingHref(item)}
              className="group grid gap-2 py-7 md:grid-cols-[12rem_1fr] md:gap-8 hover:bg-surface/60 transition-colors -mx-3 px-3"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted md:pt-1.5 md:leading-6">
                <p className="inline md:block">{item.category || 'Field notes'}</p>
                {(duration || item.date) && (
                  <p className="inline md:block">
                    <span aria-hidden="true" className="mx-2 md:hidden">/</span>
                    {[duration, formatMonthYear(item.date)].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
              <div>
                <h2 className="text-xl md:text-[1.4rem] leading-snug font-medium tracking-[-0.01em] group-hover:underline decoration-signal decoration-2 underline-offset-4">
                  {item.title}
                </h2>
                {item.excerpt && (
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70 line-clamp-2 max-w-2xl">{item.excerpt}</p>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
