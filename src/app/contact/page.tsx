import type { Metadata } from 'next';
import { sanityService } from '@/lib/sanity/lib/service';
import { Profile } from '@/lib/types';
import { PageIntro } from '@/components/PageIntro';
import { ContactForm } from '@/components/ContactForm';
import { ArrowLink, Container, Eyebrow } from '@/components/ui/primitives';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Contact | Methuselah Nwodobeh',
  description: 'Open to thoughtful collaborations, interesting engineering challenges, and conversations about products.',
};

export default async function ContactPage() {
  const profile = await sanityService.getProfile().catch(() => null as Profile | null);
  const email = profile?.email ?? 'methuselahnwodobeh@gmail.com';
  const links = profile?.socialLinks;

  return (
    <main>
      <PageIntro
        eyebrow="Have a good problem?"
        title="Let’s build something useful."
        lede="Open to thoughtful collaborations, interesting engineering challenges, and conversations about products. Tell me what you’re working on."
      />

      <Container className="pt-12 md:pt-16 pb-16 md:pb-24 grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-16">
        <ContactForm />

        <aside className="space-y-8">
          <div>
            <Eyebrow>Prefer email?</Eyebrow>
            <a
              href={`mailto:${email}`}
              className="mt-2 inline-block text-[15px] break-all underline decoration-signal decoration-2 underline-offset-4"
            >
              {email}
            </a>
          </div>
          {profile?.location && (
            <div>
              <Eyebrow>Based in</Eyebrow>
              <p className="mt-2 text-[15px]">{profile.location}</p>
            </div>
          )}
          {(links?.github || links?.linkedin) && (
            <div>
              <Eyebrow>Elsewhere</Eyebrow>
              <ul className="mt-2 space-y-1.5">
                {links?.github && <li><ArrowLink href={links.github} external>GitHub</ArrowLink></li>}
                {links?.linkedin && <li><ArrowLink href={links.linkedin} external>LinkedIn</ArrowLink></li>}
              </ul>
            </div>
          )}
        </aside>
      </Container>
    </main>
  );
}
