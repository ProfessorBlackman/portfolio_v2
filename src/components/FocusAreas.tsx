
import React from 'react';

export const FocusAreas: React.FC = () => {
  const areas = [
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
    <section id="focus" className="space-y-16">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-woodblock pb-8">
        <h3 className="text-5xl font-bold tracking-generous text-washi">
          WHAT I <span className="text-cinnabar">WORK ON</span>
        </h3>
        <p className="text-washi/40 text-xl max-w-sm italic">
          "Problems that require careful thinking rather than brute force execution."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-woodblock">
        {areas.map((area, i) => (
          <div key={i} className="bg-sumi p-12 space-y-6 hover:bg-woodblock/10 transition-colors">
            <h4 className="text-2xl font-bold text-washi uppercase tracking-widest">{area.title}</h4>
            <p className="text-xl text-washi/60 leading-relaxed">{area.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-cinnabar p-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <h4 className="text-4xl font-extrabold text-washi tracking-tighter">WHAT I VALUE</h4>
        <p className="text-2xl text-washi/90 max-w-2xl leading-tight">
          "I’m more interested in building useful, understandable software than chasing trends, titles, or hype. I prefer depth over noise."
        </p>
      </div>
    </section>
  );
};
