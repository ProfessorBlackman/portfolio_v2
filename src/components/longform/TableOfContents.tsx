'use client';

import React, { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
  number?: string;
}

/** Tracks which section is in view. Sections are the elements whose ids match the items. */
const useActiveSection = (items: TocItem[]) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A band in the upper part of the viewport decides which section is "current".
      { rootMargin: '-15% 0px -70% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return active;
};

const TocList: React.FC<{ items: TocItem[]; active: string | null; onNavigate?: () => void }> = ({
  items,
  active,
  onNavigate,
}) => (
  <ol className="space-y-1.5">
    {items.map((item) => {
      const isActive = item.id === active;
      return (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            aria-current={isActive ? 'location' : undefined}
            className={`group flex gap-3 font-mono text-[11px] leading-5 transition-colors ${
              isActive ? 'text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            <span className={`w-5 shrink-0 ${isActive ? 'text-signal-ink' : ''}`}>{item.number ?? ''}</span>
            <span className={isActive ? 'underline decoration-signal decoration-2 underline-offset-4' : ''}>
              {item.label}
            </span>
          </a>
        </li>
      );
    })}
  </ol>
);

export const TableOfContents: React.FC<{ items: TocItem[] }> = ({ items }) => {
  const active = useActiveSection(items);
  if (items.length < 2) return null;

  return (
    <nav aria-label="In this article" className="sticky top-24">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">In this article</p>
      <TocList items={items} active={active} />
    </nav>
  );
};

/** Collapsible contents list for small screens. */
export const MobileTableOfContents: React.FC<{ items: TocItem[] }> = ({ items }) => {
  const [open, setOpen] = useState(false);
  if (items.length < 2) return null;

  return (
    <nav aria-label="In this article" className="border-y border-subtle">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-toc"
        className="flex w-full items-center justify-between py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
      >
        In this article
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div id="mobile-toc" className="pb-4">
          <TocList items={items} active={null} onNavigate={() => setOpen(false)} />
        </div>
      )}
    </nav>
  );
};
