
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
    <section id="philosophy" className="bg-woodblock/20 -mx-16 px-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-8 order-2 lg:order-1">
          <h3 className="text-4xl md:text-5xl font-bold tracking-generous text-washi mb-12">
            HOW I <span className="text-cinnabar">THINK</span>
          </h3>
          <ul className="space-y-8">
            {principles.map((p, i) => (
              <li key={i} className="flex items-center gap-8 text-2xl md:text-3xl text-washi/90 font-light">
                <span className="text-cinnabar font-bold text-4xl">0{i+1}</span>
                <span className="border-b border-woodblock pb-2 w-full">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
           <div className="kanji-accent text-cinnabar/30 text-[12rem] select-none">
             哲学
           </div>
        </div>
      </div>
    </section>
  );
};
