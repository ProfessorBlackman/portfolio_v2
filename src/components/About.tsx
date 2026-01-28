
import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <h3 className="text-5xl font-bold tracking-generous text-washi sticky top-32">
            THE <br /><span className="text-cinnabar">ENGINEER</span>
          </h3>
        </div>
        
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-8 text-2xl text-washi/80 leading-relaxed">
            <p>
              I work primarily on backend systems, APIs, authentication, data pipelines, and services that need to be reliable long after the excitement of launch fades.
            </p>
            <p>
              My background is in <span className="text-washi font-bold">Python and Java</span>, but I’m comfortable moving across stacks when the problem requires it: <span className="text-indigo-300">Python</span> for tooling, <span className="text-blue-300">Flutter</span> for tightly scoped applications, and <span className="text-yellow-200">JavaScript</span> for frontend.
            </p>
            <p className="text-xl">
              The tools matter less to me than the structure, trade-offs, and guarantees behind them. I don’t chase scale for its own sake. I care about whether a system makes sense and holds up over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-woodblock">
            <div className="space-y-4">
              <h4 className="text-cinnabar font-bold uppercase tracking-widest text-sm">Contextual Interest</h4>
              <p className="text-lg text-washi/60">
                I enjoy working on problems that sit at the intersection of system design, correctness, and real-world constraints, especially in Ghana and similar contexts.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-cinnabar font-bold uppercase tracking-widest text-sm">Communication</h4>
              <p className="text-lg text-washi/60">
                Good software, to me, is not impressive. It’s understandable. I optimize for clarity so future maintainers (including myself) aren&#39;t left guessing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
