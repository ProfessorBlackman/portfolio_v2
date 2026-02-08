
import React from 'react';
import { Profile } from '@/lib/types';

interface FocusAreasProps {
  profile?: Profile | null;
}

export const FocusAreas: React.FC<FocusAreasProps> = ({ profile }) => {
  const areas = profile?.focusAreas || [
    {
      title: "Backend systems & APIs",
      desc: "Designing services that are secure, maintainable, and explicit about their responsibilities."
    },
    {
      title: "Authentication & security",
      desc: "Identity, access control, and data handling where mistakes are expensive."
    },
    {
      title: "Developer & AI Tools",
      desc: "Tools that help people reason better or learn more effectively, not replace thinking."
    },
    {
      title: "Education Platforms",
      desc: "Systems that make structured learning possible from messy or unstructured inputs."
    }
  ];

  return (
    <section id="focus" className="space-y-10 sm:space-y-12 md:space-y-16">
      <div className="flex flex-col md:flex-row items-end justify-between gap-4 sm:gap-6 md:gap-8 border-b border-woodblock pb-6 sm:pb-8">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-generous text-washi">
          WHAT I <span className="text-cinnabar">WORK ON</span>
        </h3>
        <p className="text-washi/40 text-sm sm:text-base md:text-lg lg:text-xl max-w-sm italic">
          &#34;Problems that require careful thinking rather than brute force execution.&#34;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-woodblock">
        {areas.map((area, i) => (
          <div key={i} className="bg-sumi p-6 sm:p-8 md:p-10 lg:p-12 space-y-4 sm:space-y-6 hover:bg-woodblock/10 transition-colors">
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-washi uppercase tracking-widest">{area.title}</h4>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-washi/60 leading-relaxed">{area.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-cinnabar p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
        <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-washi tracking-tighter">WHAT I VALUE</h4>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-washi/90 max-w-2xl leading-tight">
          &#34;I'm more interested in building useful, understandable software than chasing trends, titles, or hype. I prefer depth over noise.&#34;
        </p>
      </div>
    </section>
  );
};
