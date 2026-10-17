'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

const navItems = [
  { name: 'Work', href: '/#work', match: ['/projects'] },
  { name: 'Lab', href: '/lab', match: ['/lab'] },
  { name: 'Writing', href: '/articles', match: ['/articles', '/case-studies'] },
  { name: 'About', href: '/about', match: ['/about'] },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isActive = (match: string[]) => match.some((path) => pathname.startsWith(path));

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-paper/90 backdrop-blur-md border-b border-subtle">
      <div className="w-full max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-[4.5rem]">
          <Link href="/" className="group leading-tight" aria-label="Methuselah — home">
            <span className="block text-[15px] font-semibold tracking-[0.04em] text-ink">
              METHUSELAH<span className="group-hover:text-signal-ink transition-colors">.</span>
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
              <span className="hidden sm:inline">Software engineer / Product builder</span>
              <span className="sm:hidden">Engineer / Builder</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.match) ? 'page' : undefined}
                    className={`text-sm transition-colors hover:text-ink ${
                      isActive(item.match) ? 'text-ink underline decoration-signal decoration-2 underline-offset-8' : 'text-ink/60'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  aria-current={pathname.startsWith('/contact') ? 'page' : undefined}
                  className="group inline-flex items-center gap-1 text-sm font-semibold text-ink"
                >
                  Contact
                  <ArrowUpRight
                    aria-hidden="true"
                    className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </li>
            </ul>
          </nav>

          <button
            ref={buttonRef}
            type="button"
            className="md:hidden -mr-2 p-2 text-ink"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span aria-hidden="true" className="relative block w-6 h-3">
              <span
                className={`absolute left-0 w-6 h-px bg-ink transition-transform duration-200 motion-reduce:transition-none ${
                  isMenuOpen ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 w-6 h-px bg-ink transition-transform duration-200 motion-reduce:transition-none ${
                  isMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="md:hidden absolute top-full inset-x-0 bg-paper border-b border-subtle"
        >
          <nav aria-label="Primary" className="px-4 sm:px-6 py-4">
            <ul className="divide-y divide-subtle">
              {[...navItems, { name: 'Contact', href: '/contact', match: ['/contact'] }].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive(item.match) ? 'page' : undefined}
                    className="flex items-center justify-between py-4 text-lg text-ink"
                  >
                    {item.name}
                    {isActive(item.match) && (
                      <span aria-hidden="true" className="w-2 h-2 rounded-full bg-signal" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
