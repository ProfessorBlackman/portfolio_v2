import React from "react";

interface TableRendererProps {
  value: {
    head?: { cells: { text: string }[] }[];
    body?: { cells: { text: string }[] }[];
  };
}

/** Shared table chrome for Sanity tables and CSV tables. */
export const DataTable: React.FC<{ head?: string[] | null; rows: string[][] }> = ({ head, rows }) => (
  <div className="my-8 overflow-x-auto bg-surface">
    <table className="min-w-full border-collapse text-[14px] leading-relaxed">
      {head && head.length > 0 && (
        <thead>
          <tr className="border-b border-ink/20">
            {head.map((cell, i) => (
              <th
                key={i}
                scope="col"
                className="px-4 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink/70"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-subtle last:border-0">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 align-top text-ink/85">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * Renders a simple table from the @sanity/table plugin data.
 */
export const TableRenderer: React.FC<TableRendererProps> = ({ value }) => {
  if (!value || (!value.head && !value.body)) return null;

  return (
    <DataTable
      head={value.head?.[0]?.cells.map((cell) => cell.text)}
      rows={(value.body ?? []).map((row) => row.cells.map((cell) => cell.text))}
    />
  );
};
