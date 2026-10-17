import Image from 'next/image';
import { ArrowLink, Container, Eyebrow } from '@/components/ui/primitives';

export default function NotFound() {
  return (
    <main>
      <Container className="py-16 md:py-28 grid gap-10 md:grid-cols-[minmax(0,1fr)_18rem] md:items-center">
        <div>
          <Eyebrow>404 / Page not found</Eyebrow>
          <h1 className="mt-5 text-[2.5rem] sm:text-[3rem] md:text-[3.75rem] leading-[1.05] font-medium tracking-[-0.03em]">
            This page flew the coop.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/70 max-w-md">
            The link may be old, or the page may have moved. Either way, there&apos;s nothing to see here — except this guy.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <ArrowLink href="/">Back home</ArrowLink>
            <ArrowLink href="/#work">Selected work</ArrowLink>
            <ArrowLink href="/articles">Writing</ArrowLink>
          </div>
        </div>
        <Image
          src="/mascot/rooster-mono.webp"
          alt="A cartoon rooster in glasses, a backwards cap and a hoodie, looking unbothered."
          width={560}
          height={544}
          className="w-56 md:w-full h-auto"
          priority
        />
      </Container>
    </main>
  );
}
