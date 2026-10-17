import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container, Eyebrow } from '@/components/ui/primitives';
import { MobileTableOfContents, TableOfContents, TocItem } from '@/components/longform/TableOfContents';

export type { TocItem };

export interface Crumb {
  label: string;
  href?: string;
}

export interface GlanceItem {
  label: string;
  value: React.ReactNode;
}

export interface RelatedLink {
  kicker: string;
  title: string;
  href: string;
}

interface LongformLayoutProps {
  breadcrumbs: Crumb[];
  title: string;
  dek?: string;
  byline?: string[];
  meta?: (string | null | undefined)[];
  glance?: GlanceItem[];
  cover?: { src: string; alt: string };
  toc: TocItem[];
  children: React.ReactNode;
  /** Printed after the last section, e.g. "Last updated October 2026". */
  endNote?: string | null;
  next?: { kicker: string; label: string; href: string };
  related?: RelatedLink | null;
}

// Keep the standfirst short: whole sentences up to ~200 characters.
const toDek = (text: string) => {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  let dek = '';
  for (const sentence of sentences) {
    if (dek && (dek + sentence).length > 200) break;
    dek += sentence;
  }
  return dek.trim();
};

const Dot = () => (
  <span aria-hidden="true" className="mx-2">
    /
  </span>
);

const MetaLine: React.FC<{ items: (string | null | undefined)[]; className?: string }> = ({ items, className }) => {
  const present = items.filter(Boolean) as string[];
  if (!present.length) return null;
  return (
    <p className={`font-mono text-[10px] uppercase tracking-[0.14em] text-muted ${className ?? ''}`}>
      {present.map((item, i) => (
        <React.Fragment key={item}>
          {i > 0 && <Dot />}
          {item}
        </React.Fragment>
      ))}
    </p>
  );
};

export const LongformLayout: React.FC<LongformLayoutProps> = ({
  breadcrumbs,
  title,
  dek,
  byline,
  meta,
  glance,
  cover,
  toc,
  children,
  endNote,
  next,
  related,
}) => (
  <main>
    <Container className="pt-10 md:pt-14 pb-20 md:pb-28">
      <div className="lg:grid lg:grid-cols-[11rem_minmax(0,46rem)] lg:gap-x-16 lg:justify-center">
        <header className="lg:col-start-2">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {breadcrumbs.map((crumb, i) => (
                <li key={`${crumb.label}-${i}`} className="flex items-center">
                  {i > 0 && <Dot />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-ink transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={i === breadcrumbs.length - 1 ? 'page' : undefined}>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="mt-5 text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] leading-[1.08] font-medium tracking-[-0.03em] text-balance">
            {title}
          </h1>
          {dek && <p className="mt-5 text-lg md:text-xl leading-relaxed text-ink/60 max-w-2xl">{toDek(dek)}</p>}
          {byline && byline.length > 0 && <MetaLine items={byline} className="mt-5" />}

          <div className="mt-6 border-t border-subtle pt-4">
            <MetaLine items={meta ?? []} />
          </div>

          {glance && glance.length > 0 && (
            <section aria-label="At a glance" className="mt-8 bg-wash p-5 md:p-6">
              <Eyebrow>At a glance</Eyebrow>
              <dl className="mt-3 grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-[auto_1fr]">
                {glance.map((item) => (
                  <React.Fragment key={item.label}>
                    <dt className="text-ink/60">{item.label}</dt>
                    <dd className="text-ink">{item.value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </section>
          )}

          {cover && (
            <figure className="mt-8 relative aspect-[16/9] bg-wash">
              <Image src={cover.src} alt={cover.alt} fill priority sizes="(min-width: 1024px) 46rem, 100vw" className="object-contain" />
            </figure>
          )}

          <div className="mt-8 lg:hidden">
            <MobileTableOfContents items={toc} />
          </div>
        </header>

        {/* Second grid row: the contents list sits level with the body, not the title. */}
        <div className="hidden lg:block lg:col-start-1 lg:row-start-2 lg:pt-12">
          <TableOfContents items={toc} />
        </div>

        <article className="pt-10 md:pt-12 lg:col-start-2 lg:row-start-2">
          {children}

          {endNote && (
            <p className="mt-14 border-t border-subtle pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              End of article
              <Dot />
              {endNote}
            </p>
          )}

          {(next || related) && (
            <div className="mt-14 border-t border-subtle pt-10">
              {next && (
                <>
                  <Eyebrow>{next.kicker}</Eyebrow>
                  <Link
                    href={next.href}
                    className="group mt-3 inline-flex items-center gap-2 text-2xl md:text-[1.75rem] font-medium tracking-[-0.02em]"
                  >
                    {next.label}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
                      →
                    </span>
                  </Link>
                </>
              )}
              {related && (
                <Link href={related.href} className="group mt-8 block bg-wash p-5 md:p-6 hover:bg-subtle/60 transition-colors">
                  <Eyebrow>{related.kicker}</Eyebrow>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-base font-medium">
                    {related.title}
                    <ArrowUpRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )}
            </div>
          )}
        </article>
      </div>
    </Container>
  </main>
);

/** Unnumbered opening block, e.g. "Abstract / Summary". */
export const LongformIntro: React.FC<{ id: string; eyebrow: string; title: string; children: React.ReactNode }> = ({
  id,
  eyebrow,
  title,
  children,
}) => (
  <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 id={`${id}-title`} className="mt-3 text-[1.75rem] md:text-[2rem] leading-[1.15] font-medium tracking-[-0.02em]">
      {title}
    </h2>
    <div className="longform-body mt-5">{children}</div>
  </section>
);

export const LongformSection: React.FC<{
  id: string;
  number?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, number, eyebrow, title, children }) => (
  <section id={id} aria-labelledby={`${id}-title`} className="mt-14 border-t border-subtle pt-10 scroll-mt-24">
    {(number || eyebrow) && <Eyebrow index={number}>{eyebrow ?? ''}</Eyebrow>}
    <h2 id={`${id}-title`} className="mt-3 text-[1.75rem] md:text-[2rem] leading-[1.15] font-medium tracking-[-0.02em]">
      {title}
    </h2>
    <div className="longform-body mt-5">{children}</div>
  </section>
);

export const References: React.FC<{
  items?: { title: string; author?: string; link?: string; year?: string }[];
}> = ({ items }) => {
  if (!items?.length) return null;
  return (
    <ol className="space-y-3 pl-5 list-decimal marker:font-mono marker:text-[0.85em] marker:text-muted">
      {items.map((ref, i) => (
        <li key={i} className="pl-1">
          {ref.author && <>{ref.author}. </>}
          {ref.year && <>({ref.year}). </>}
          {ref.link ? (
            <a
              href={ref.link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-signal decoration-2 underline-offset-[3px]"
            >
              <em>{ref.title}</em>
            </a>
          ) : (
            <em>{ref.title}</em>
          )}
        </li>
      ))}
    </ol>
  );
};

/** Two-digit section numbers: 1 → "01". */
export const sectionNumber = (index: number) => String(index + 1).padStart(2, '0');
