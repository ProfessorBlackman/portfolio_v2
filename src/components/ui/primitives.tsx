import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

/** Page-width wrapper with the standard side gutters. */
export const Container: React.FC<{ children: React.ReactNode; className?: string; narrow?: boolean }> = ({
  children,
  className,
  narrow,
}) => (
  <div className={cx('w-full mx-auto px-4 sm:px-6 lg:px-8', narrow ? 'max-w-reading' : 'max-w-page', className)}>
    {children}
  </div>
);

/** Mono metadata label, e.g. "01 / SELECTED WORK". */
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  index?: string;
  className?: string;
  tone?: 'muted' | 'signal';
}> = ({ children, index, className, tone = 'muted' }) => (
  <p
    className={cx(
      'font-mono text-[11px] uppercase tracking-[0.14em]',
      tone === 'signal' ? 'text-signal' : 'text-muted',
      className,
    )}
  >
    {index}
    {index && children && <span aria-hidden="true" className="mx-2">/</span>}
    {children}
  </p>
);

export const SectionHeading: React.FC<{
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}> = ({ children, as: Tag = 'h2', className }) => (
  <Tag className={cx('text-[1.75rem] md:text-[2rem] leading-[1.15] font-medium tracking-[-0.02em] text-ink', className)}>
    {children}
  </Tag>
);

export const Tag: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span
    className={cx(
      'inline-flex items-center font-mono text-[10px] uppercase tracking-[0.1em] bg-wash text-ink/70 px-2 py-1',
      className,
    )}
  >
    {children}
  </span>
);

export const TagList: React.FC<{ tags?: string[]; className?: string }> = ({ tags, className }) => {
  if (!tags?.length) return null;
  return (
    <ul className={cx('flex flex-wrap gap-2', className)} aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
};

/** Text link with the ↗ marker. Works for internal routes and external URLs. */
export const ArrowLink: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}> = ({ href, children, className, external, onClick }) => {
  const classes = cx(
    'group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 decoration-signal decoration-2 hover:underline',
    className,
  );
  const content = (
    <>
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
};

/** Small signal-coloured dot for "available" / "active" states. */
export const StatusDot: React.FC<{ className?: string; pulse?: boolean }> = ({ className, pulse }) => (
  <span aria-hidden="true" className={cx('relative inline-flex w-2 h-2', className)}>
    {pulse && (
      <span className="absolute inset-0 rounded-full bg-signal opacity-60 animate-ping motion-reduce:hidden" />
    )}
    <span className="relative inline-flex w-2 h-2 rounded-full bg-signal" />
  </span>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cx('bg-surface p-5 md:p-6', className)}>{children}</div>
);

/** Dark terminal-style panel used for code listings and the lab teaser. */
export const CodePanel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cx('on-dark bg-code text-paper font-mono text-[13px] leading-7 p-4 md:p-5 overflow-x-auto', className)}>
    {children}
  </div>
);

export const Rule: React.FC<{ className?: string }> = ({ className }) => (
  <hr className={cx('border-0 border-t border-subtle', className)} />
);
