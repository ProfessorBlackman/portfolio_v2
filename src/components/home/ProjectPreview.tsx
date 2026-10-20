import React from 'react';
import Image from 'next/image';
import { Project } from '@/lib/types';

/*
 * Coded product previews from the design, keyed by a normalised project title.
 * The project's own Sanity image always wins; these only fill in for projects
 * that have no image uploaded.
 */

const Panel: React.FC<{ children: React.ReactNode; tone: 'wash' | 'cool' | 'dark' }> = ({ children, tone }) => (
  <div
    className={`relative h-full w-full overflow-hidden p-4 md:p-5 ${
      tone === 'dark' ? 'bg-ink text-paper' : tone === 'cool' ? 'bg-wash-cool' : 'bg-wash'
    }`}
  >
    {children}
  </div>
);

const Label: React.FC<{ children: React.ReactNode; signal?: boolean }> = ({ children, signal }) => (
  <p className={`font-mono text-[9px] uppercase tracking-[0.14em] ${signal ? 'text-signal' : 'text-ink/60'}`}>
    {children}
  </p>
);

const MedVerifyPreview = () => (
  <Panel tone="wash">
    <div className="flex items-center gap-3">
      <Label>MedVerify</Label>
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] bg-signal/40 text-ink/80 px-1.5 py-1">
        Evidence check
      </span>
    </div>
    <div className="mt-2 flex gap-4 md:gap-6">
      <div className="bg-surface w-28 md:w-32 shrink-0 p-3 pb-6">
        <div className="h-1 w-full bg-signal-ink/70" />
        <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-ink/60">Paracetamol</p>
        <p className="mt-1 text-base">500 mg</p>
      </div>
      <ul className="text-[12px] leading-6 text-ink/90 pt-1">
        <li>Product record</li>
        <li>Registration data</li>
        <li>Evidence score <span className="text-ink/50">/</span> 82</li>
      </ul>
    </div>
  </Panel>
);

const VersaLearnPreview = () => (
  <Panel tone="cool">
    <Label>Video → Knowledge</Label>
    <p className="mt-1 text-[1.6rem] md:text-[1.9rem] leading-[1.05] tracking-[-0.02em]">
      A course,
      <br />
      structured.
    </p>
    <div className="mt-2 flex flex-wrap gap-1.5">
      {['01 Foundations', '02 Core concepts', '03 Practice'].map((step) => (
        <span key={step} className="bg-surface text-[10px] px-2 py-1">{step}</span>
      ))}
    </div>
  </Panel>
);

const BogosortPreview = () => (
  <Panel tone="dark">
    <Label signal>Bogosort_AI / Code search</Label>
    <p className="mt-2 bg-paper/10 font-mono text-[12px] px-3 py-2">find symbols across a codebase</p>
    <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[10px]">
      {[
        ['src/indexer.py', 'Tree-sitter parse tree'],
        ['search/query.py', 'ranked symbol match'],
        ['extension.ts', 'editor result preview'],
      ].map(([file, note]) => (
        <React.Fragment key={file}>
          <dt className="font-mono text-paper/50">{file}</dt>
          <dd className="text-paper/85">{note}</dd>
        </React.Fragment>
      ))}
    </dl>
  </Panel>
);

const NixPreview = () => (
  <Panel tone="dark">
    <Label signal>Nix / System insight</Label>
    <p className="mt-1 text-[1.6rem] md:text-[1.9rem] leading-[1.05] tracking-[-0.02em]">
      Storage,
      <br />
      understood.
    </p>
    <div className="mt-2 space-y-2">
      {[
        { name: 'System', width: '70%', bar: 'bg-signal' },
        { name: 'Projects', width: '44%', bar: 'bg-paper/40' },
        { name: 'Other', width: '22%', bar: 'bg-paper/25' },
      ].map((row) => (
        <div key={row.name}>
          <p className="font-mono text-[8px] text-paper/60">{row.name}</p>
          <div className="mt-0.5 h-1 bg-paper/10">
            <div className={`h-full ${row.bar}`} style={{ width: row.width }} />
          </div>
        </div>
      ))}
    </div>
  </Panel>
);

const previews: Record<string, React.FC> = {
  medverify: MedVerifyPreview,
  'versa-learn': VersaLearnPreview,
  bogosort_ai: BogosortPreview,
  nix: NixPreview,
};

const previewKey = (title: string) => title.trim().toLowerCase().replace(/\s+/g, '-');

export const ProjectPreview: React.FC<{ project: Project }> = ({ project }) => {
  const Preview = previews[previewKey(project.title)];

  return (
    <div aria-hidden="true" className="relative aspect-[16/10] sm:aspect-[2/1] w-full">
      {project.image ? (
        <div className="relative h-full w-full bg-wash">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            // Project images are mostly site screenshots; keep their header in frame.
            className="object-cover object-top"
          />
        </div>
      ) : Preview ? (
        <Preview />
      ) : (
        <Panel tone="wash">
          <Label>{project.category || 'Project'}</Label>
          <p className="mt-1 text-[1.6rem] leading-[1.1] tracking-[-0.02em]">{project.title}</p>
        </Panel>
      )}
    </div>
  );
};
