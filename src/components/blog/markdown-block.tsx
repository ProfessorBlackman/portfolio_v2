import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  code: string;
}

export function MarkdownBlock({ code }: Props) {
  return (
    <div className="prose dark:prose-invert">
      <ReactMarkdown>{code}</ReactMarkdown>
    </div>
  );
}
