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

export const PortableComponents: Partial<PortableTextReactComponents> = {
    types: {
        image: ({value}: { value: any }) => {
            return (
                <div className="relative w-full h-96 my-8">
                    <Image
                        className="object-cover object-center"
                        src={urlFor(value).url()}
                        alt={value.alt || "Blog Post Image"}
                        fill
                    />
                </div>
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
        h1: ({children, value}: { children?: React.ReactNode, value: any }) => {
            const id = value.children?.[0]?.text?.toLowerCase().replace(/\s+/g, '-') || '';
            return <h1 id={id} className="text-4xl font-bold my-6 scroll-mt-32">{children}</h1>;
        },
        h2: ({children, value}: { children?: React.ReactNode, value: any }) => {
            const id = value.children?.[0]?.text?.toLowerCase().replace(/\s+/g, '-') || '';
            return <h2 id={id} className="text-3xl font-bold my-5 scroll-mt-32">{children}</h2>;
        },
        h3: ({children, value}: { children?: React.ReactNode, value: any }) => {
            const id = value.children?.[0]?.text?.toLowerCase().replace(/\s+/g, '-') || '';
            return <h3 id={id} className="text-2xl font-bold my-4 scroll-mt-32">{children}</h3>;
        },
        h4: ({children, value}: { children?: React.ReactNode, value: any }) => {
            const id = value.children?.[0]?.text?.toLowerCase().replace(/\s+/g, '-') || '';
            return <h4 id={id} className="text-xl font-bold my-3 scroll-mt-32">{children}</h4>;
        },
        blockquote: ({children}: { children?: React.ReactNode }) => (
            <blockquote className="border-l-4 border-gray-400 pl-4 my-6 italic">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({children}: { children?: React.ReactNode }) => (
            <ul className="list-disc list-inside my-6">{children}</ul>
        ),
        number: ({children}: { children?: React.ReactNode }) => (
            <ol className="list-decimal list-inside my-6">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({children}: { children?: React.ReactNode }) => (
            <li className="mb-2">{children}</li>
        ),
        number: ({children}: { children?: React.ReactNode }) => (
            <li className="mb-2">{children}</li>
        ),
    },
    marks: {
        link: ({children, value}: { children?: React.ReactNode; value?: { href: string } }) => {
            const rel = !value?.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            const target = !value?.href.startsWith('/') ? '_blank' : undefined;
            return (
                <a
                    href={value?.href}
                    rel={rel}
                    target={target}
                    className="text-cinnabar underline hover:text-cinnabar/80 transition-colors font-medium"
                >
                    {children}
                </a>
            );
        },
    },
}
