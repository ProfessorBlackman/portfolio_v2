
import React from 'react';
import { Profile } from '@/lib/types';

interface HowIThinkProps {
  profile?: Profile | null;
}

export const HowIThink: React.FC<HowIThinkProps> = ({ profile }) => {
  const principles = profile?.thoughtProcess || [
    "I optimize for clarity before cleverness",
    "I question requirements before implementing them",
    "I prefer boring, proven technology used well",
    "I design systems to survive real users, bad networks, and future maintainers",
    "I care about trade-offs, every decision costs something"
  ];

  return (
    <section id="philosophy" className="bg-woodblock/20 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 xl:-mx-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-8 order-2 lg:order-1">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-generous text-washi mb-8 sm:mb-10 md:mb-12">
            HOW I <span className="text-cinnabar">THINK</span>
          </h3>
          <ul className="space-y-6 sm:space-y-8">
            {principles.map((p, i) => (
              <li key={i} className="flex items-center gap-4 sm:gap-6 md:gap-8 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-washi/90 font-light">
                <span className="text-cinnabar font-bold text-2xl sm:text-3xl md:text-4xl shrink-0">0{i+1}</span>
                <span className="border-b border-woodblock pb-2 w-full">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
           {/*<div className="kanji-accent text-cinnabar/30 text-[8rem] sm:text-[10rem] md:text-[12rem] select-none">*/}
           {/*  哲学*/}
           {/*</div>*/}
        </div>
      </div>
    </section>
  );
};
