"use client";

/* --------------------------------------------- */
/* Copy Button Component */
/* --------------------------------------------- */

import {useState} from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={copy}
      className="px-2 py-1 text-xs rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
