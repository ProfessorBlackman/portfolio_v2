import React from 'react';
import { Container, Eyebrow, Rule } from '@/components/ui/primitives';

/** Opening block for index pages (Writing, Lab, About, Contact). */
export const PageIntro: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ eyebrow, title, lede, children }) => (
  <Container className="pt-14 md:pt-24">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h1 className="mt-5 text-[2.5rem] sm:text-[3rem] md:text-[3.75rem] leading-[1.05] font-medium tracking-[-0.03em] max-w-3xl text-balance">
      {title}
    </h1>
    {lede && <p className="mt-6 text-lg md:text-xl leading-relaxed text-ink/70 max-w-2xl">{lede}</p>}
    {children}
    <Rule className="mt-12 md:mt-16" />
  </Container>
);
