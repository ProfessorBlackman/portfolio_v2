import React from 'react';
import Link from 'next/link';
import { LabItem, Project, WritingSummary } from '@/lib/types';
import { formatDuration, slugify } from '@/lib/text';
import { ArrowLink, CodePanel, Container, Eyebrow, Rule, StatusDot, TagList } from '@/components/ui/primitives';
import { ProjectPreview } from '@/components/home/ProjectPreview';

const sectionSpacing = 'py-16 md:py-24';

const SectionIntro: React.FC<{ index: string; label: string; title: string; id: string }> = ({
  index,
  label,
  title,
  id,
}) => (
  <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6 mb-8 md:mb-10">
    <Eyebrow index={index}>{label}</Eyebrow>
    <h2 id={id} className="text-[1.75rem] md:text-[1.75rem] leading-[1.15] font-medium tracking-[-0.02em]">
      {title}
    </h2>
  </div>
);

export const HomeHero: React.FC = () => (
  <Container className="pt-16 pb-16 md:pt-28 md:pb-24">
    <Eyebrow>
      Software engineer
      <span aria-hidden="true" className="mx-3">/</span>
      <span className="md:hidden">Product builder</span>
      <span className="hidden md:inline">Independent product builder</span>
    </Eyebrow>
    <h1 className="mt-5 text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] leading-[1.04] font-medium tracking-[-0.035em]">
      I make ideas work <br className="hidden md:block" />
      in the real world.
    </h1>
    <p className="mt-6 text-lg md:text-xl leading-relaxed text-ink/75 max-w-xl">
      I build software, explore technical problems, and turn interesting ideas into useful products.
    </p>
    <ul className="mt-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
      <li className="flex items-center gap-3">
        <StatusDot />
        Based in Ghana
      </li>
      <li>
        <Link href="#work" className="hover:text-ink transition-colors">
          <span className="md:hidden">Explore selected work</span>
          <span className="hidden md:inline">Selected work</span> <span aria-hidden="true">↓</span>
        </Link>
      </li>
      <li className="hidden md:block">Open to interesting problems</li>
    </ul>
    <Rule className="mt-16 md:mt-24" />
  </Container>
);

export const SelectedWork: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <section id="work" aria-labelledby="work-title" className="scroll-mt-20">
    <Container>
      <SectionIntro index="01" label="Selected work" title="A few things I’ve built." id="work-title" />
      <ol className="divide-y divide-subtle">
        {projects.map((project, i) => {
          const number = String(i + 1).padStart(2, '0');
          return (
            <li key={project._id} className="py-8 first:pt-0 md:py-6">
              <article className="grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:gap-8 lg:gap-10 md:items-start">
                <ProjectPreview project={project} />
                <div className="md:pt-5">
                  <Eyebrow index={number} className="hidden md:block">
                    {project.category || 'Selected work'}
                  </Eyebrow>
                  <h3 className="md:mt-4 text-2xl md:text-[1.75rem] leading-tight font-medium tracking-[-0.02em]">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70 max-w-md line-clamp-3">
                      {project.description}
                    </p>
                  )}
                  <TagList tags={project.tags?.slice(0, 3)} className="mt-4" />
                  <ArrowLink href={`/projects/${project._id}`} className="mt-5">
                    View project
                  </ArrowLink>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </Container>
  </section>
);

// Shown until real lab items are published in Sanity.
const placeholderLabEntries = ['ai-playground/', 'tiny-tools/', 'motion-tests/', 'things-i-might-finish/'];

export const LabTeaser: React.FC<{ items?: LabItem[] }> = ({ items }) => {
  const labEntries = items?.length
    ? items.slice(0, 4).map((item) => `${item.slug || slugify(item.title)}/`)
    : placeholderLabEntries;

  return (
  <section aria-labelledby="lab-title" className={sectionSpacing}>
    <Container>
      <div className="bg-wash p-6 md:p-10 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow index="02">The lab</Eyebrow>
          <h2 id="lab-title" className="mt-4 text-[1.75rem] md:text-[2rem] leading-[1.15] font-medium tracking-[-0.02em]">
            Curiosity, in progress.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/70 max-w-sm">
            Small tools, technical experiments, prototypes, and ideas that are worth following even before they are
            finished.
          </p>
          <ArrowLink href="/lab" className="mt-5">
            Explore the lab
          </ArrowLink>
        </div>
        <CodePanel>
          <p className="text-signal">
            ~/lab <span className="ml-2">$ ls<span className="hidden md:inline"> -la</span></span>
          </p>
          <ul>
            {labEntries.map((entry, i) => (
              <li key={entry} className={i === labEntries.length - 1 ? 'hidden md:block' : undefined}>
                {entry}
              </li>
            ))}
          </ul>
        </CodePanel>
      </div>
    </Container>
  </section>
  );
};

export const FeaturedWriting: React.FC<{ article: WritingSummary | null }> = ({ article }) => {
  if (!article) return null;
  const duration = formatDuration(article.duration);

  return (
    <section aria-labelledby="writing-title" className="pb-16 md:pb-24">
      <Container>
        <SectionIntro index="03" label="Notes & writing" title="Ideas worth writing down." id="writing-title" />
        <article className="bg-surface p-5 md:p-6 grid gap-3 md:grid-cols-[10rem_1fr] md:gap-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted md:pt-6 md:leading-6">
            <p className="inline md:block">{article.category || 'Field notes'}</p>
            {duration && (
              <p className="inline md:block">
                <span aria-hidden="true" className="mx-2 md:hidden">/</span>
                Essay · {duration}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-xl md:text-[1.4rem] leading-snug font-medium tracking-[-0.01em]">{article.title}</h3>
            {article.excerpt && (
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70 line-clamp-2 max-w-2xl">{article.excerpt}</p>
            )}
            <ArrowLink href={`/articles/${article.slug}`} className="mt-3">
              Read the writing
            </ArrowLink>
          </div>
        </article>
      </Container>
    </section>
  );
};

export const LittleContext: React.FC = () => (
  <section aria-labelledby="context-title" className="border-t border-subtle py-16 md:py-20">
    <Container className="grid gap-5 md:grid-cols-2 md:gap-10">
      <div>
        <Eyebrow index="04">A little context</Eyebrow>
        <h2 id="context-title" className="mt-4 text-[1.75rem] md:text-[2.25rem] leading-[1.15] font-medium tracking-[-0.02em]">
          Engineer by craft.
          <br />
          Builder by instinct.
        </h2>
      </div>
      <div>
        <p className="text-[15px] md:text-base leading-relaxed text-ink/75 max-w-md">
          I enjoy understanding how things work, working through messy constraints, and building software that solves
          real problems. I’m happiest somewhere between a good technical question and a useful first version.
        </p>
        <ArrowLink href="/about" className="mt-4">
          More about me
        </ArrowLink>
      </div>
    </Container>
  </section>
);
