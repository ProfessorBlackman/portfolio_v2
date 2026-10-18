'use client';

import React, { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { WritingSummary } from '@/lib/types';
import { WritingList } from '@/components/writing/WritingList';

const searchableText = (item: WritingSummary) =>
  [item.title, item.subtitle, item.excerpt, item.category, ...(item.tags ?? [])].filter(Boolean).join(' ').toLowerCase();

/** Every word of the query must appear somewhere in the item. */
const matches = (item: WritingSummary, query: string) => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const text = searchableText(item);
  return terms.every((term) => text.includes(term));
};

// Mirror the filters in the address bar (?q=, ?category=) so results can be shared, without a navigation.
const syncUrl = (query: string, category: string | null) => {
  const url = new URL(window.location.href);
  if (query.trim()) url.searchParams.set('q', query.trim());
  else url.searchParams.delete('q');
  if (category) url.searchParams.set('category', category);
  else url.searchParams.delete('category');
  window.history.replaceState(window.history.state, '', url);
};

const chipClass = (selected: boolean) =>
  `inline-flex font-mono text-[10px] uppercase tracking-[0.12em] px-2.5 py-1.5 transition-colors ${
    selected ? 'bg-ink text-paper' : 'bg-wash text-ink/70 hover:text-ink'
  }`;

/** Search box plus optional category chips over a list of articles or case studies. */
export const WritingSearch: React.FC<{
  items: WritingSummary[];
  /** e.g. "articles" or "case studies" — used in the label and messages. */
  noun: string;
  initialQuery?: string;
  initialCategory?: string;
  emptyMessage?: string;
}> = ({ items, noun, initialQuery = '', initialCategory, emptyMessage }) => {
  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category).filter(Boolean) as string[])).sort(),
    [items],
  );
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string | null>(
    initialCategory && categories.includes(initialCategory) ? initialCategory : null,
  );

  const results = useMemo(
    () => items.filter((item) => (!category || item.category === category) && matches(item, query)),
    [items, category, query],
  );
  const filtering = query.trim().length > 0 || category !== null;

  const updateQuery = (value: string) => {
    setQuery(value);
    syncUrl(value, category);
  };
  const updateCategory = (value: string | null) => {
    setCategory(value);
    syncUrl(query, value);
  };

  const emptyText = query.trim()
    ? `No ${noun} match “${query.trim()}”${category ? ` in ${category}` : ''}.`
    : category
      ? `No ${noun} in ${category} yet.`
      : emptyMessage;

  return (
    <div>
      <div role="search" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">Search {noun}</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && updateQuery('')}
            placeholder={`Search ${noun}…`}
            className="w-full bg-surface border border-subtle pl-10 pr-10 py-2.5 text-[15px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => updateQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted hover:text-ink"
            >
              <X aria-hidden="true" className="w-4 h-4" />
            </button>
          )}
        </label>
        <p aria-live="polite" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {filtering ? `${results.length} of ${items.length} ${noun}` : `${items.length} ${noun}`}
        </p>
      </div>

      {categories.length > 1 && (
        <div role="group" aria-label="Filter by category" className="mt-4 flex flex-wrap gap-2">
          <button type="button" aria-pressed={category === null} onClick={() => updateCategory(null)} className={chipClass(category === null)}>
            All
          </button>
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => updateCategory(category === option ? null : option)}
              className={chipClass(category === option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 border-t border-subtle">
        <WritingList items={results} emptyMessage={emptyText} />
      </div>
    </div>
  );
};
