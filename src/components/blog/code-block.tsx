'use client';

import type { BundledLanguage } from "shiki";
import { CopyButton } from "@/components/blog/code-block-client";
import React, { useEffect, useState } from "react";

interface Props {
  code: string;
  lang: BundledLanguage;
  title?: string;
}

export function CodeBlock({ code, lang, title }: Props) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      try {
        const { codeToHtml } = await import("shiki");
        const rendered = await codeToHtml(code, { lang, theme: "github-dark-default" });
        if (!cancelled) setHtml(rendered);
      } catch {
        // Unknown language: keep the plain-text fallback.
        if (!cancelled) setHtml(null);
      }
    }

    highlight();
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <figure className="my-8">
      <figcaption className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        Listing <span aria-hidden="true" className="mx-1.5">/</span> {title || (lang as string) || "code"}
      </figcaption>
      <div className="on-dark relative bg-code text-paper">
        <div className="absolute right-2 top-2 z-10">
          <CopyButton code={code} />
        </div>
        {html ? (
          <div className="code-surface text-[13px] leading-7" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="code-surface text-[13px] leading-7">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </figure>
  );
}
