/* eslint-disable @typescript-eslint/no-explicit-any */
import {PortableTextReactComponents} from "next-sanity"
import Image from "next/image"
import {MermaidBlock} from "@/components/blog/mermaid-block";
import {CodeGroup} from "@/components/blog/code-group";
import {TableRenderer} from "@/components/blog/table-renderer";
import {CodeBlock} from "@/components/blog/code-block";
import React from "react";
import {urlFor} from "@/lib/sanity/lib/client";
import {MarkdownBlock} from "@/components/blog/markdown-block";
import {CsvRowData} from "@/lib/types";
import {CsvTableWithHeader} from "@/components/blog/csv-table";
import {blockText, slugify} from "@/lib/text";

const headingId = (value: any) => slugify(blockText(value));

export const PortableComponents: Partial<PortableTextReactComponents> = {
    types: {
        image: ({value}: { value: any }) => {
            const caption = value.caption || value.alt;
            return (
                <figure className="my-8">
                    <div className="relative w-full aspect-[16/10] bg-wash">
                        <Image
                            className="object-contain"
                            src={urlFor(value).width(1600).url()}
                            alt={value.alt || ""}
                            fill
                            sizes="(min-width: 1024px) 46rem, 100vw"
                        />
                    </div>
                    {caption && (
                        <figcaption className="mt-2 text-[13px] leading-relaxed text-muted">{caption}</figcaption>
                    )}
                </figure>
            )
        },
        table: ({value}) => <TableRenderer value={value}/>,
        codeGroup: ({ value }) => <CodeGroup files={value.files} />,
        code: ({value}) => {
            if (value.language === "mermaid") {
                return <MermaidBlock code={value.code}/>;
            }
            if (value.language === "markdown") {
                return <MarkdownBlock code={value.code} />;
            }
            return <CodeBlock code={value.code} lang={value.language} title={value.filename}/>;
        },
        csvTable: ({ value }: { value: { data: CsvRowData[] } }) => {
            const csvData = value.data.map((row: CsvRowData) => row.cells.join(','));
            return <CsvTableWithHeader csvData={csvData.join("\n")} />;
        },
    },
    block: {
        normal: ({children}) => <p className="my-5">{children}</p>,
        // h1/h2 inside a body sit below the section title, so they render one step smaller.
        h1: ({children, value}) => (
            <h3 id={headingId(value)} className="mt-10 mb-3 text-[1.35rem] leading-snug font-medium tracking-[-0.01em] text-ink scroll-mt-24">{children}</h3>
        ),
        h2: ({children, value}) => (
            <h3 id={headingId(value)} className="mt-10 mb-3 text-[1.35rem] leading-snug font-medium tracking-[-0.01em] text-ink scroll-mt-24">{children}</h3>
        ),
        h3: ({children, value}) => (
            <h3 id={headingId(value)} className="mt-8 mb-2 text-[1.2rem] leading-snug font-medium text-ink scroll-mt-24">{children}</h3>
        ),
        h4: ({children, value}) => (
            <h4 id={headingId(value)} className="mt-6 mb-2 text-base font-semibold text-ink scroll-mt-24">{children}</h4>
        ),
        blockquote: ({children}) => (
            <blockquote className="my-8 border-l-2 border-signal pl-5 md:pl-6 text-[1.2rem] md:text-[1.35rem] leading-snug font-medium tracking-[-0.01em] text-ink">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({children}) => (
            <ul className="my-5 space-y-2 pl-5 list-disc marker:text-muted">{children}</ul>
        ),
        number: ({children}) => (
            <ol className="my-5 space-y-2 pl-5 list-decimal marker:font-mono marker:text-[0.85em] marker:text-muted">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({children}) => <li className="pl-1">{children}</li>,
        number: ({children}) => <li className="pl-1">{children}</li>,
    },
    marks: {
        code: ({children}) => (
            <code className="font-mono text-[0.88em] bg-wash px-1.5 py-0.5">{children}</code>
        ),
        link: ({children, value}: { children?: React.ReactNode; value?: { href: string } }) => {
            const external = !value?.href?.startsWith('/') && !value?.href?.startsWith('#');
            return (
                <a
                    href={value?.href}
                    rel={external ? 'noreferrer noopener' : undefined}
                    target={external ? '_blank' : undefined}
                    className="text-ink underline decoration-signal decoration-2 underline-offset-[3px] hover:decoration-signal-ink transition-colors"
                >
                    {children}
                </a>
            );
        },
    },
}
