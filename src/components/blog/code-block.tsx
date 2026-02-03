import { BundledLanguage, codeToHtml } from "shiki";
import {CopyButton} from "@/components/blog/code-block-client";

interface Props {
  code: string;
  lang: BundledLanguage;
  title?: string;
}

export async function CodeBlock({ code, lang, title }: Props) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark"
    },
    defaultColor: "dark",
  });

  return (
    <div className="my-6 rounded-lg border bg-neutral-50 dark:bg-neutral-900 overflow-hidden shadow-sm">
      {/* --- Header (Title + Copy button) --- */}
      <div className="flex items-center justify-between px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border-b">
        <span className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
          {title || lang}
        </span>

        <CopyButton code={code} />
      </div>

      {/* --- Code Block --- */}
      <div
        className="relative text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
