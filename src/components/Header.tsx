
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'About', id: 'about', type: 'home', path: '/#about' },
    { name: 'Philosophy', id: 'philosophy', type: 'home', path: '/#philosophy' },
    { name: 'Focus', id: 'focus', type: 'home', path: '/#focus' },
    { name: 'Experience', id: 'experience', type: 'home', path: '/#experience' },
    { name: 'Skills', id: 'skills', type: 'home', path: '/#skills' },
    { name: 'Projects', id: 'projects', type: 'home', path: '/#projects' },
    { name: 'Case Studies', id: 'case-studies', type: 'page', path: '/case-studies' },
    { name: 'Articles', id: 'articles', type: 'page', path: '/articles' },
    { name: 'Contact', id: 'contact', type: 'home', path: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    if (item.type === 'home' && pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(item.id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        window.history.pushState(null, '', `#${item.id}`);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sumi/90 backdrop-blur-xl border-b border-woodblock">
      <div className=" mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <div className="shrink-0">
            <Link 
              href="/"
              className="text-3xl font-black tracking-tighter text-washi cursor-pointer" 
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.history.pushState(null, '', '/');
                }
              }}
            >
              M<span className="text-cinnabar">.</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6 lg:space-x-10">
            {navItems.map((item) => {
              const isActive = (item.type === 'home' && pathname === '/' && activeSection === item.id) || 
                             (item.type === 'page' && pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-[10px] uppercase tracking-generous transition-all duration-300 hover:text-cinnabar hover:translate-y-[-2px] ${
                    isActive ? 'text-cinnabar font-bold' : 'text-washi/40'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
