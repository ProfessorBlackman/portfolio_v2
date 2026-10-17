import { sanityService } from '@/lib/sanity/lib/service';
import { Project, WritingSummary } from '@/lib/types';
import { pickFeatured } from '@/lib/featured';
import {
  FeaturedWriting,
  HomeHero,
  LabTeaser,
  LittleContext,
  SelectedWork,
} from '@/components/home/HomeSections';

export const revalidate = 300;

export default async function Home() {
  const [projects, articles, labItems] = await Promise.all([
    sanityService.getProjects().catch((error) => {
      console.error('Error fetching projects:', error);
      return [] as Project[];
    }),
    sanityService.getArticleSummaries().catch((error) => {
      console.error('Error fetching articles:', error);
      return [] as WritingSummary[];
    }),
    sanityService.getLabItems().catch(() => []),
  ]);

  return (
    <main>
      <HomeHero />
      <SelectedWork projects={pickFeatured(projects)} />
      <LabTeaser items={labItems} />
      <FeaturedWriting article={articles[0] ?? null} />
      <LittleContext />
    </main>
  );
}
