"use client";

import { useEffect, useState } from "react";
import type { BundledLanguage } from "shiki";
import {CopyButton} from "@/components/blog/code-block-client";

interface FileItem {
  filename: string;
  language: BundledLanguage;
  code: string;
}

export function CodeGroup({ files }: { files: FileItem[] }) {
  const [active, setActive] = useState(0);
  const [html, setHtml] = useState<(string | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { codeToHtml } = await import("shiki");
      const rendered = await Promise.all(
        files.map((f) =>
          codeToHtml(f.code, { lang: f.language, theme: "github-dark-default" }).catch(() => null)
        )
      );
      if (!cancelled) setHtml(rendered);
    })();
    return () => {
      cancelled = true;
    };
  }, [files]);

  if (!files?.length) return null;
  const current = files[active];

  return (
    <div className="on-dark my-8 bg-code text-paper">
      <div className="flex items-center gap-1 border-b border-paper/10 px-2" role="tablist">
        {files.map((f, i) => (
          <button
            key={f.filename}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`px-3 py-2.5 font-mono text-[11px] border-b-2 -mb-px transition-colors ${
              i === active ? "border-signal text-paper" : "border-transparent text-paper/50 hover:text-paper/80"
            }`}
          >
            {f.filename}
          </button>
        ))}
        <div className="ml-auto">
          <CopyButton code={current.code} />
        </div>
      </div>
      {html[active] ? (
        <div className="code-surface text-[13px] leading-7" dangerouslySetInnerHTML={{ __html: html[active]! }} />
      ) : (
        <pre className="code-surface text-[13px] leading-7">
          <code>{current.code}</code>
        </pre>
      )}
    </div>
  );
}
