"use client";

import { useState } from "react";
import { codeToHtml, BundledLanguage } from "shiki";
import {CopyButton} from "@/components/blog/code-block-client";
interface FileItem {
  filename: string;
  language: BundledLanguage;
  code: string;
}

export async function CodeGroup({ files }: { files: FileItem[] }) {
  const initial = await Promise.all(
    files.map(async (f) => ({
      ...f,
      html: await codeToHtml(f.code, {
        lang: f.language,
        themes: { light: "github-light", dark: "github-dark" },
      }),
    }))
  );

  return <CodeGroupClient files={initial} />;
}

function CodeGroupClient({ files }: { files: any[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="my-6 border rounded-lg bg-neutral-50 dark:bg-neutral-900 shadow-sm">
      {/* Tabs */}
      <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 border-b px-2">
        {files.map((f, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-3 py-2 text-sm font-mono ${
              i === active
                ? "bg-white dark:bg-neutral-900 border-b-2 border-blue-500"
                : "opacity-60"
            }`}
          >
            {f.filename}
          </button>
        ))}

        <div className="ml-auto pr-2">
          <CopyButton code={files[active].code} />
        </div>
      </div>

      {/* Code */}
      <div
        className="p-0"
        dangerouslySetInnerHTML={{ __html: files[active].html }}
      />
    </div>
  );
}
