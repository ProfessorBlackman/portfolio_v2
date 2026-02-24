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
        const rendered = await codeToHtml(code, {
          lang,
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
          defaultColor: "dark",
        });
        if (!cancelled) setHtml(rendered);
      } catch (e) {
        // Fallback: leave html as null to render plain text
        if (!cancelled) setHtml(null);
      }
    }

    highlight();
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <div className="my-6 rounded-lg border bg-neutral-50 dark:bg-neutral-900 overflow-hidden shadow-sm">
      {/* --- Header (Title + Copy button) --- */}
      <div className="flex items-center justify-between px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border-b">
        <span className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
          {title || (lang as string)}
        </span>

        <CopyButton code={code} />
      </div>

      {/* --- Code Block --- */}
      {html ? (
        <div className="relative text-sm" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className="relative text-sm overflow-auto p-3">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
