import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  code: string;
}

export function MarkdownBlock({ code }: Props) {
  return (
    <div className="markdown-block my-6">
      <ReactMarkdown>{code}</ReactMarkdown>
    </div>
  );
}
