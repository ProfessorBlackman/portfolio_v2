import { cache } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { sanityService } from '@/lib/sanity/lib/service';
import { Project } from '@/lib/types';
import { pickFeatured, projectStatusLabel } from '@/lib/featured';
import { ArrowLink, StatusDot, TagList } from '@/components/ui/primitives';
import {
  GlanceItem,
  LongformIntro,
  LongformLayout,
  LongformSection,
  sectionNumber,
  TocItem,
} from '@/components/longform/Longform';

export const revalidate = 300;

const getProject = cache((slug: string) => sanityService.getProjectBySlug(slug));

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} | Methuselah Nwodobeh`,
    description: project.description?.slice(0, 160),
  };
}

const stackOf = (project: Project) => {
  const stack = project.techStack;
  const fromStack = [stack?.frontend, stack?.backend, stack?.database, stack?.others].flat().filter(Boolean) as string[];
  return fromStack.length ? fromStack : project.technologies?.length ? project.technologies : project.tags ?? [];
};

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const [project, allProjects, articles] = await Promise.all([
    getProject(slug),
    sanityService.getProjects().catch(() => [] as Project[]),
    sanityService.getArticleSummaries().catch(() => []),
  ]);
  if (!project) notFound();

  const status = projectStatusLabel(project.status);
  const stack = stackOf(project);
  const github = project.githubUrl || project.githubLink;
  const live = project.liveUrl || project.liveLink;
  // The description is already the standfirst; only show an overview when there is more to say.
  const longDescription = project.fullDescription || project.details;
  const overview = longDescription && longDescription.trim() !== project.description?.trim() ? longDescription : null;
  const media = project.media?.filter((item) => item?.url) ?? [];

  // A write-up is any article that names the project in its title.
  const writeUp = articles.find((article) => article.title.toLowerCase().includes(project.title.toLowerCase()));

  const featured = pickFeatured(allProjects);
  const position = featured.findIndex((item) => item._id === project._id);
  const nextProject = featured.length > 1 ? featured[(position + 1) % featured.length] : null;

  const numbered = [
    ...(project.features?.length ? [{ id: 'features', label: 'Key features' }] : []),
    ...(project.architecture ? [{ id: 'architecture', label: 'Architecture' }] : []),
    ...(media.length ? [{ id: 'gallery', label: 'Gallery' }] : []),
  ];
  const numberOf = (id: string) => sectionNumber(numbered.findIndex((item) => item.id === id));
  const toc: TocItem[] = [
    ...(overview ? [{ id: 'overview', label: 'Overview' }] : []),
    ...numbered.map((item, i) => ({ ...item, number: sectionNumber(i) })),
  ];

  const glance: GlanceItem[] = [
    ...(status
      ? [{
          label: 'Status',
          value: (
            <span className="inline-flex items-center gap-2">
              {project.status === 'In Progress' && <StatusDot />}
              {status}
            </span>
          ),
        }]
      : []),
    ...(project.category ? [{ label: 'Category', value: project.category }] : []),
    ...(stack.length ? [{ label: 'Stack', value: stack.join(' · ') }] : []),
    ...(github || live
      ? [{
          label: 'Links',
          value: (
            <span className="flex flex-wrap gap-x-5 gap-y-1">
              {live && <ArrowLink href={live} external>Live site</ArrowLink>}
              {github && <ArrowLink href={github} external>Source code</ArrowLink>}
            </span>
          ),
        }]
      : []),
  ];

  return (
    <LongformLayout
      breadcrumbs={[
        { label: 'Work', href: '/#work' },
        ...(project.category ? [{ label: project.category }] : []),
        { label: project.title },
      ]}
      title={project.title}
      dek={project.description}
      meta={['Project', status, project.category]}
      glance={glance}
      cover={project.image ? { src: project.image, alt: `${project.title} screenshot` } : undefined}
      toc={toc}
      next={nextProject && nextProject._id !== project._id
        ? { kicker: 'Next in selected work', label: nextProject.title, href: `/projects/${nextProject._id}` }
        : { kicker: 'Selected work', label: 'Explore other projects', href: '/#work' }}
      related={writeUp ? { kicker: 'Related writing', title: writeUp.title, href: `/articles/${writeUp.slug}` } : null}
    >
      {overview && (
        <LongformIntro id="overview" eyebrow="Overview" title="What it is">
          <p className="my-5 whitespace-pre-line">{overview}</p>
          <TagList tags={project.tags} className="mt-6" />
        </LongformIntro>
      )}

      {project.features && project.features.length > 0 && (
        <LongformSection id="features" number={numberOf('features')} eyebrow="Capabilities" title="Key features">
          <ul className="my-5 space-y-2 pl-5 list-disc marker:text-muted">
            {project.features.map((feature) => (
              <li key={feature} className="pl-1">{feature}</li>
            ))}
          </ul>
        </LongformSection>
      )}

      {project.architecture && (
        <LongformSection id="architecture" number={numberOf('architecture')} eyebrow="System design" title="Architecture">
          <p className="my-5 whitespace-pre-line">{project.architecture}</p>
        </LongformSection>
      )}

      {media.length > 0 && (
        <LongformSection id="gallery" number={numberOf('gallery')} eyebrow="Real project imagery" title="Gallery">
          {media.map((item, i) => (
            <figure key={i} className="my-8">
              {item.type === 'video' ? (
                <video src={item.url} controls className="w-full bg-wash" />
              ) : (
                <div className="relative aspect-[16/10] bg-wash">
                  <Image src={item.url} alt={item.caption || `${project.title} screenshot ${i + 1}`} fill sizes="(min-width: 1024px) 46rem, 100vw" className="object-contain" />
                </div>
              )}
              {item.caption && <figcaption className="mt-2 text-[13px] text-muted">{item.caption}</figcaption>}
            </figure>
          ))}
        </LongformSection>
      )}
    </LongformLayout>
  );
}
