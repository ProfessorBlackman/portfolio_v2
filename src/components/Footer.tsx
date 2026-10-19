'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { sanityService } from '@/lib/sanity/lib/service';
import { Profile } from '@/lib/types';
import { ArrowLink, Container, Eyebrow } from '@/components/ui/primitives';

// Long-form reading pages (and the contact page itself) get a compact footer instead of the call to action.
const isCompactPage = (pathname: string) =>
  /^\/(articles|case-studies|projects)\/[^/]+/.test(pathname) || pathname.startsWith('/contact');

// Ignore placeholder profile links such as "https://twitter.com/" with no handle.
const isRealProfileLink = (url?: string) => {
  if (!url) return false;
  try {
    return new URL(url).pathname.replace(/\//g, '').length > 0;
  } catch {
    return false;
  }
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-xs text-ink/70 hover:text-ink transition-colors"
  >
    {children}
    <ArrowUpRight aria-hidden="true" className="w-3 h-3" />
    <span className="sr-only">(opens in a new tab)</span>
  </a>
);

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [socialLinks, setSocialLinks] = useState<Profile['socialLinks']>();
  const year = new Date().getFullYear();

  useEffect(() => {
    sanityService
      .getProfile()
      .then((profile) => setSocialLinks(profile?.socialLinks))
      .catch((error) => console.error('Error fetching profile links:', error));
  }, []);

  if (isCompactPage(pathname)) {
    return (
      <footer className="on-dark bg-ink text-paper">
        <Container className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-12 md:py-16">
          <Link href="/" className="text-[15px] font-semibold tracking-[0.04em]">
            METHUSELAH.
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal"
          >
            Interesting problem? Get in touch
            <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Container>
      </footer>
    );
  }

  return (
    <footer>
      <section aria-labelledby="footer-cta" className="px-4 sm:px-6 md:px-0">
        <div className="on-dark bg-ink text-paper">
          <Container className="py-12 md:py-20">
            <Eyebrow tone="signal">Have a good problem?</Eyebrow>
            <h2 id="footer-cta" className="mt-4 text-[2rem] md:text-[2.75rem] leading-[1.1] font-medium tracking-[-0.02em] max-w-xl">
              Let&apos;s build something useful.
            </h2>
            <p className="mt-5 text-paper/75 max-w-md leading-relaxed">
              Open to thoughtful collaborations, interesting engineering challenges, and conversations about products.
            </p>
            <ArrowLink href="/contact" className="mt-6 text-paper">
              Get in touch
            </ArrowLink>
          </Container>
        </div>
      </section>

      <Container className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          © {year} Methuselah Nwodobeh
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {isRealProfileLink(socialLinks?.github) && (
            <li><FooterLink href={socialLinks!.github!}>GitHub</FooterLink></li>
          )}
          {isRealProfileLink(socialLinks?.linkedin) && (
            <li><FooterLink href={socialLinks!.linkedin!}>LinkedIn</FooterLink></li>
          )}
          {isRealProfileLink(socialLinks?.twitter) && (
            <li><FooterLink href={socialLinks!.twitter!}>X / Twitter</FooterLink></li>
          )}
          <li>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0 })}
              className="text-xs text-ink/70 hover:text-ink transition-colors"
            >
              Back to top <span aria-hidden="true">↑</span>
            </button>
          </li>
        </ul>
      </Container>
    </footer>
  );
};
