
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-full bg-sumi border-t border-woodblock py-12">
      <div className="w-full max-w-7xl lg:max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold tracking-generous text-washi">
              MN<span className="text-cinnabar">.</span>
            </span>
            <p className="text-washi/40 text-[10px] mt-2 tracking-generous">
              Backend Developer specializing in scalable solutions
            </p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-washi/40 hover:text-cinnabar transition-colors text-[10px] uppercase tracking-widest font-bold">LinkedIn</a>
            <a href="#" className="text-washi/40 hover:text-cinnabar transition-colors text-[10px] uppercase tracking-widest font-bold">GitHub</a>
            <a href="#" className="text-washi/40 hover:text-cinnabar transition-colors text-[10px] uppercase tracking-widest font-bold">Twitter</a>
          </div>
          <p className="text-washi/30 text-[10px] uppercase tracking-widest">
            © 2026 Methuselah Nwodobeh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
