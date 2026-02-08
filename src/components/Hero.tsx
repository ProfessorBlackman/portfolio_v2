
import React from 'react';
import { Profile } from '@/lib/types';

interface HeroProps {
  profile?: Profile | null;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section id="hero" className="lg:min-h-screen lg:h-screen flex flex-col justify-center border-b border-woodblock py-20 sm:py-24 md:py-28 lg:py-0">
      <div className="space-y-8 sm:space-y-12 relative z-10 pt-28">
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-cinnabar uppercase tracking-generous text-sm sm:text-base md:text-lg lg:text-xl font-bold">{profile?.profession || 'Software Engineer'}</h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-extrabold text-washi tracking-tighter leading-none">
            {profile?.name.split(' ')[0] || 'Methuselah'}<span className="text-cinnabar">.</span>
          </h1>
        </div>

        <div className="max-w-3xl space-y-6 sm:space-y-8">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-washi/90 italic border-l-4 border-cinnabar pl-4 sm:pl-6 md:pl-8 leading-snug">
            &#34;{profile?.headline || 'I care about how systems work, why they work, and whether they should.'}&#34;
          </p>

          <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-washi/70 leading-relaxed space-y-4">
            <p>
              {profile?.subtitle || "I'm a backend-focused software engineer who designs and builds systems with clarity, context, and long-term thinking in mind."}
            </p>
            {profile?.shortBio && (
              <p className="font-bold text-washi">
                {profile.shortBio}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-8">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 bg-cinnabar text-washi font-bold tracking-generous transition-all hover:-translate-y-1 hover:shadow-[0_10px_0_0_#1d3557] cursor-pointer text-xs sm:text-sm md:text-base"
          >
            LET&#39;S TALK
          </button>
        </div>
      </div>

      {/* Visual background Kanji for 'Clarity' or 'Structure' */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-5 pointer-events-none text-[20rem] lg:text-[30rem] font-serif select-none hidden md:block">
        構
      </div>
    </section>
  );
};
