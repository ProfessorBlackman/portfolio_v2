import React, {useEffect, useMemo} from 'react';
import {Article} from '@/lib/types';
import {Interactions} from './Interactions';
import {PortableText} from 'next-sanity';
import {PortableComponents} from './blog/portable-components';
import {CaseStudyNav} from './CaseStudyNav';
import Image from "next/image";

interface ArticleDetailProps {
    article: Article;
    onBack: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({article, onBack}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navSections = useMemo(() => {
        const sections = [
            { id: 'introduction', label: 'Introduction', isPresent: true }
        ];

        if (Array.isArray(article.body)) {
            article.body.forEach((block: any) => {
                if (
                    block._type === 'block' &&
                    ['h1', 'h2', 'h3', 'h4'].includes(block.style) &&
                    block.children?.[0]?.text
                ) {
                    const text = block.children[0].text;
                    sections.push({
                        id: text.toLowerCase().replace(/\s+/g, '-'),
                        label: text,
                        isPresent: true
                    });
                }
            });
        }

        sections.push({ id: 'discussion', label: 'Discussion', isPresent: true });

        return sections;
    }, [article.body]);

    console.log("articleDetail: ")
    console.log(article.image)

    return (
        <div className="py-20 pt-32 sm:py-24 sm:pt-28 md:py-28 lg:py-32 animate-in fade-in duration-700">
            <div className="max-w-8xl mx-auto">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-10 sm:space-y-12 md:space-y-16">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-generous text-washi/40 hover:text-cinnabar transition-colors mb-8 sm:mb-10 md:mb-12"
                        >
                            <span className="text-lg sm:text-xl">←</span> BACK TO ARTICLES
                        </button>

                        <div id="introduction" className="space-y-6 sm:space-y-8 border-l-4 sm:border-l-6 md:border-l-8 border-cinnabar pl-4 sm:pl-6 md:pl-8 scroll-mt-32">
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cinnabar">
                                <span>{article.category}</span>
                                <span className="w-2 h-px bg-woodblock"></span>
                                <span className="text-washi/40">{article.publishedAt}</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-washi leading-none">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {article.tags?.map(tag => (
                                    <span key={tag}
                                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-woodblock/20 text-[9px] sm:text-[10px] uppercase tracking-widest text-washi/50">
                          {tag}
                        </span>
                                ))}
                            </div>
                        </div>
                        {/* Hero Image */}
                        {article.image && (
                            <div className="h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] relative overflow-hidden border-y border-woodblock">
                                <Image
                                    src={article.image}
                                    fill
                                    className="object-cover"
                                    alt={article.title}
                                    priority
                                />
                            </div>
                        )}

                        <div className="relative py-12 sm:py-16 md:py-20">
                            <div
                                className="hidden md:block absolute top-0 right-0 opacity-5 text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif select-none pointer-events-none kanji-accent">
                                論
                            </div>
                            <div
                                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-washi/80 leading-relaxed font-light space-y-8 sm:space-y-10 md:space-y-12 whitespace-pre-wrap first-letter:text-4xl sm:first-letter:text-5xl md:first-letter:text-6xl lg:first-letter:text-7xl first-letter:font-black first-letter:text-cinnabar first-letter:float-left first-letter:mr-3 sm:first-letter:mr-4 first-letter:mt-1 sm:first-letter:mt-2">
                                <PortableText value={article.body} components={PortableComponents}/>
                            </div>
                        </div>

                        <div id="discussion" className="scroll-mt-32">
                            <Interactions contentId={article._id || ""}/>
                        </div>

                        <div
                            className="border-t border-woodblock pt-10 sm:pt-12 md:pt-16 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
                            <div className="space-y-1 sm:space-y-2 text-center md:text-left">
                                <p className="text-[9px] sm:text-[10px] uppercase tracking-generous text-washi/40 font-bold">WRITTEN BY</p>
                                <p className="text-lg sm:text-xl md:text-2xl font-bold text-washi">Methuselah Nwodobeh</p>
                            </div>
                            <button
                                onClick={onBack}
                                className="px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 bg-woodblock/20 border border-woodblock/40 text-washi font-bold uppercase tracking-generous hover:border-cinnabar hover:text-cinnabar transition-all text-xs sm:text-sm"
                            >
                                EXPLORE MORE THOUGHTS
                            </button>
                        </div>
                    </div>

                    {/* Sticky Navigation Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3 ml-20 mt-12 relative">
                        <div className="fixed top-32">
                            <CaseStudyNav sections={navSections} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};
