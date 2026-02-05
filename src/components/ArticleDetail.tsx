import React, {useEffect} from 'react';
import {Article} from '@/lib/types';
import {Interactions} from './Interactions';
import {PortableText} from 'next-sanity';
import {PortableComponents} from './blog/portable-components';
import Image from "next/image";

interface ArticleDetailProps {
    article: Article;
    onBack: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({article, onBack}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log("articleDetail: ")
    console.log(article.image)

    return (
        <div className="py-32 space-y-16 animate-in fade-in duration-700 max-w-7xl mx-auto">
            <button
                onClick={onBack}
                className="flex items-center gap-4 text-xs font-bold uppercase tracking-generous text-washi/40 hover:text-cinnabar transition-colors mb-12"
            >
                <span className="text-xl">←</span> BACK TO ARTICLES
            </button>

            <div className="space-y-8 border-l-8 border-cinnabar pl-8">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-cinnabar">
                    <span>{article.category}</span>
                    <span className="w-2 h-px bg-woodblock"></span>
                    <span className="text-washi/40">{article.publishedAt}</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-washi leading-none">
                    {article.title}
                </h1>
                <div className="flex flex-wrap gap-3">
                    {article.tags?.map(tag => (
                        <span key={tag}
                              className="px-4 py-2 bg-woodblock/20 text-[10px] uppercase tracking-widest text-washi/50">
              {tag}
            </span>
                    ))}
                </div>
            </div>
            {/* Hero Image */}
            {article.image && (
                <div className="h-[60vh] relative overflow-hidden border-y border-woodblock">
                    <Image
                        src={article.image}
                        fill
                        className="object-cover"
                        alt={article.title}
                        priority
                    />
                </div>
            )}

            <div className="relative py-20">
                <div
                    className="absolute top-0 right-0 opacity-5 text-9xl font-serif select-none pointer-events-none kanji-accent">
                    論
                </div>
                <div
                    className="text-2xl md:text-3xl text-washi/80 leading-relaxed font-light space-y-12 whitespace-pre-wrap first-letter:text-7xl first-letter:font-black first-letter:text-cinnabar first-letter:float-left first-letter:mr-4 first-letter:mt-2">
                    <PortableText value={article.body} components={PortableComponents}/>
                </div>
            </div>

            <Interactions contentId={article._id || ""}/>

            <div
                className="border-t border-woodblock pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-generous text-washi/40 font-bold">WRITTEN BY</p>
                    <p className="text-2xl font-bold text-washi">Methuselah Nwodobeh</p>
                </div>
                <button
                    onClick={onBack}
                    className="px-10 py-4 bg-woodblock/20 border border-woodblock/40 text-washi font-bold uppercase tracking-generous hover:border-cinnabar hover:text-cinnabar transition-all"
                >
                    EXPLORE MORE THOUGHTS
                </button>
            </div>
        </div>
    );
};
