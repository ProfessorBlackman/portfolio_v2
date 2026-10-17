/* eslint-disable @typescript-eslint/no-explicit-any */

/** Stable anchor id for a heading. Shared by the Portable Text renderer and the table of contents. */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

/** Plain text of a Portable Text block. */
export const blockText = (block: any): string =>
  Array.isArray(block?.children) ? block.children.map((child: any) => child.text ?? '').join('') : '';

/** Rough reading time across any number of Portable Text arrays (≈220 wpm). */
export const readingMinutes = (...blockArrays: (any[] | undefined)[]) => {
  const words = blockArrays
    .flatMap((blocks) => (Array.isArray(blocks) ? blocks : []))
    .map((block) => (block?._type === 'block' ? blockText(block) : block?.code ?? ''))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

// Sanity stores durations inconsistently ("11", "4 mins"); show them as "11 min".
export const formatDuration = (duration?: string) => {
  const minutes = duration?.match(/\d+/)?.[0];
  return minutes ? `${minutes.padStart(2, '0')} min` : null;
};

export const formatMonthYear = (date?: string) => {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
};

export const formatYear = (date?: string) => {
  if (!date) return null;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : String(parsed.getFullYear());
};
