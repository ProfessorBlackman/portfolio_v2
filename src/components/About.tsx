
'use client';

import React, { useState } from 'react';
import { Profile } from '@/lib/types';
import { PortableText } from 'next-sanity';
import { PortableComponents } from './blog/portable-components';

interface AboutProps {
  profile?: Profile | null;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
        <div
          className="lg:col-span-4 flex justify-between items-start cursor-pointer lg:cursor-default"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-generous text-washi lg:sticky lg:top-32 text-balance">
            THE <br /><span className="text-cinnabar uppercase">{profile?.profession?.split(' ')[1] || 'ENGINEER'}</span>
          </h3>
          <div className="lg:hidden text-cinnabar mt-1">
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="-rotate-90">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            )}
          </div>
        </div>

        <div className={`${isExpanded ? 'block' : 'hidden'} lg:block lg:col-span-8 space-y-8 sm:space-y-10 md:space-y-12`}>
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
                  The tools matter less to me than the structure, trade-offs, and guarantees behind them. I don&#39;t chase scale for its own sake. I care about whether a system makes sense and holds up over time.
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
