import React from 'react';
import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import { sanityService } from '@/lib/sanity/lib/service';
import { Experience, Profile, Skill } from '@/lib/types';
import { PortableComponents } from '@/components/blog/portable-components';
import { PageIntro } from '@/components/PageIntro';
import { ArrowLink, Container, Eyebrow } from '@/components/ui/primitives';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'About | Methuselah Nwodobeh',
  description: 'Software engineer and product builder based in Ghana — how I think, what I work on, and where I have worked.',
};

const SKILL_GROUPS: Record<string, string> = {
  languages: 'Languages',
  frameworks: 'Frameworks',
  mobile: 'Mobile',
  backend: 'Backend',
  databases: 'Databases',
  cloud: 'Cloud & infrastructure',
  cicd: 'CI/CD',
  'ci/cd': 'CI/CD',
  monitoring: 'Monitoring',
  security: 'Security',
  tools: 'Tools',
  interests: 'Interests',
  other: 'Other',
};

const monthYear = (date?: string) =>
  date ? new Date(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : '';

/** Two-column section: label on the left, content on the right (stacks on mobile). */
const AboutSection: React.FC<{ index: string; label: string; title: string; children: React.ReactNode }> = ({
  index,
  label,
  title,
  children,
}) => (
  <section aria-labelledby={`about-${index}`} className="border-t border-subtle py-14 md:py-20 first:border-0 first:pt-0">
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12">
      <div>
        <Eyebrow index={index}>{label}</Eyebrow>
        <h2 id={`about-${index}`} className="mt-4 text-[1.75rem] md:text-[2rem] leading-[1.15] font-medium tracking-[-0.02em]">
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </div>
  </section>
);

export default async function AboutPage() {
  const [profile, experiences, skills] = await Promise.all([
    sanityService.getProfile().catch(() => null as Profile | null),
    sanityService.getExperiences().catch(() => [] as Experience[]),
    sanityService.getSkills().catch(() => [] as Skill[]),
  ]);

  const skillGroups = Object.entries(
    skills.reduce<Record<string, string[]>>((groups, skill) => {
      const group = SKILL_GROUPS[skill.category ?? 'other'] ?? 'Other';
      (groups[group] ??= []).push(skill.name);
      return groups;
    }, {}),
  );

  let index = 0;
  const next = () => String(++index).padStart(2, '0');

  return (
    <main>
      <PageIntro
        eyebrow="04 / A little context"
        title={
          <>
            Engineer by craft.
            <br />
            Builder by instinct.
          </>
        }
        lede={profile?.shortBio?.split('\n')[0]}
      >
        {profile?.location && (
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Based in {profile.location}
          </p>
        )}
      </PageIntro>

      <Container className="pt-14 md:pt-20 pb-16 md:pb-24">
        {profile?.fullBio?.length ? (
          <AboutSection index={next()} label="Background" title="How I got here">
            <div className="longform-body max-w-reading">
              <PortableText value={profile.fullBio} components={PortableComponents} />
            </div>
          </AboutSection>
        ) : null}

        {profile?.thoughtProcess?.length ? (
          <AboutSection index={next()} label="Principles" title="How I think">
            <ol className="divide-y divide-subtle border-y border-subtle">
              {profile.thoughtProcess.map((principle: string, i: number) => (
                <li key={principle} className="flex gap-5 py-4 text-lg leading-snug">
                  <span className="font-mono text-[11px] text-muted pt-1.5">{String(i + 1).padStart(2, '0')}</span>
                  {principle}
                </li>
              ))}
            </ol>
            {profile.values && (
              <blockquote className="mt-10 border-l-2 border-signal pl-5 text-[1.2rem] md:text-[1.35rem] leading-snug font-medium tracking-[-0.01em]">
                {profile.values}
              </blockquote>
            )}
          </AboutSection>
        ) : null}

        {profile?.focusAreas?.length ? (
          <AboutSection index={next()} label="Focus" title="What I work on">
            <ul className="grid gap-4 sm:grid-cols-2">
              {profile.focusAreas.map((area: { _key?: string; title: string; desc: string }) => (
                <li key={area._key ?? area.title} className="bg-surface p-5">
                  <h3 className="text-base font-semibold">{area.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{area.desc}</p>
                </li>
              ))}
            </ul>
          </AboutSection>
        ) : null}

        {experiences.length > 0 && (
          <AboutSection index={next()} label="Experience" title="Where I’ve worked">
            <ol className="divide-y divide-subtle border-y border-subtle">
              {experiences.map((exp) => (
                <li key={exp._id} className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:pt-1.5">
                    {monthYear(exp.startDate)} — {exp.isCurrent ? 'Present' : monthYear(exp.endDate)}
                  </p>
                  <div>
                    <h3 className="text-lg font-medium">{exp.role}</h3>
                    <p className="text-[15px] text-ink/70">
                      {exp.company}
                      {exp.location && <span className="text-muted"> · {exp.location}</span>}
                    </p>
                    {[...(exp.description ?? []), ...(exp.achievements ?? [])].length > 0 && (
                      <ul className="mt-3 space-y-1.5 pl-5 list-disc marker:text-muted text-[15px] leading-relaxed text-ink/80">
                        {[...(exp.description ?? []), ...(exp.achievements ?? [])].map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            {profile?.resume && (
              <ArrowLink href={profile.resume} external className="mt-6">
                Download my CV
              </ArrowLink>
            )}
          </AboutSection>
        )}

        {skillGroups.length > 0 && (
          <AboutSection index={next()} label="Toolkit" title="What I build with">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {skillGroups.map(([group, names]) => (
                <div key={group}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{group}</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed">{names.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </AboutSection>
        )}
      </Container>
    </main>
  );
}
