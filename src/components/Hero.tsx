
import React from 'react';
import { Profile } from '@/lib/types';

interface HeroProps {
  profile?: Profile | null;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center border-b border-woodblock">
      <div className="space-y-12 relative z-10">
        <div className="space-y-4">
          <h2 className="text-cinnabar uppercase tracking-generous text-lg md:text-xl font-bold">{profile?.profession || 'Software Engineer'}</h2>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold text-washi tracking-tighter leading-none">
            {profile?.name.split(' ')[0] || 'Methuselah'}<span className="text-cinnabar">.</span>
          </h1>
        </div>

        <div className="max-w-3xl space-y-8">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-washi/90 italic border-l-4 border-cinnabar pl-6 md:pl-8 leading-snug">
            &#34;{profile?.headline || 'I care about how systems work, why they work, and whether they should.'}&#34;
          </p>

          <div className="text-lg md:text-xl lg:text-2xl text-washi/70 leading-relaxed space-y-4">
            <p>
              {profile?.subtitle || 'I’m a backend-focused software engineer who designs and builds systems with clarity, context, and long-term thinking in mind.'}
            </p>
            {profile?.shortBio && (
              <p className="font-bold text-washi">
                {profile.shortBio}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-8 pt-8">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 md:px-12 md:py-5 bg-cinnabar text-washi font-bold tracking-generous transition-all hover:-translate-y-1 hover:shadow-[0_10px_0_0_#1d3557] cursor-pointer text-sm md:text-base"
          >
            LET&#39;S TALK
          </button>
        </div>
      </div>

      {/* Visual background Kanji for 'Clarity' or 'Structure' */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-5 pointer-events-none text-[30rem] font-serif select-none hidden lg:block">
        構
      </div>
    </section>
  );
};
