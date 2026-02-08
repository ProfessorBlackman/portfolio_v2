
import React from 'react';
import { Profile } from '@/lib/types';
import { PortableText } from 'next-sanity';
import { PortableComponents } from './blog/portable-components';

interface AboutProps {
  profile?: Profile | null;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  return (
    <section id="about" className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-generous text-washi lg:sticky lg:top-32 text-balance">
            THE <br /><span className="text-cinnabar uppercase">{profile?.profession?.split(' ')[1] || 'ENGINEER'}</span>
          </h3>
        </div>

        <div className="lg:col-span-8 space-y-8 sm:space-y-10 md:space-y-12">
          <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl lg:text-2xl text-washi/80 leading-relaxed whitespace-pre-wrap">
            {profile?.fullBio ? (
              <PortableText value={profile.fullBio} components={PortableComponents} />
            ) : (
              <>
                <p>
                  I work primarily on backend systems, APIs, authentication, data pipelines, and services that need to be reliable long after the excitement of launch fades.
                </p>
                <p>
                  My background is in <span className="text-washi font-bold">Python and Java</span>, but I’m comfortable moving across stacks when the problem requires it: <span className="text-indigo-300">Python</span> for tooling, <span className="text-blue-300">Flutter</span> for tightly scoped applications, and <span className="text-yellow-200">JavaScript</span> for frontend.
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                  The tools matter less to me than the structure, trade-offs, and guarantees behind them. I don't chase scale for its own sake. I care about whether a system makes sense and holds up over time.
                </p>
              </>
            )}
          </div>

          {(profile?.values || profile?.thoughtProcess) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 pt-6 sm:pt-8 border-t border-woodblock">
              {profile?.values && (
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-cinnabar font-bold uppercase tracking-widest text-xs sm:text-sm">Core Values</h4>
                  <p className="text-sm sm:text-base md:text-lg text-washi/60 whitespace-pre-wrap">
                    {profile.values}
                  </p>
                </div>
              )}
              {profile?.thoughtProcess && (
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-cinnabar font-bold uppercase tracking-widest text-xs sm:text-sm">Thought Process</h4>
                  <p className="text-sm sm:text-base md:text-lg text-washi/60 whitespace-pre-wrap">
                    {profile.thoughtProcess}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
