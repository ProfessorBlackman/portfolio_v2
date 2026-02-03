import React from "react";

interface TableRendererProps {
  value: {
    head?: { cells: { text: string }[] }[];
    body?: { cells: { text: string }[] }[];
  };
}

/**
 * Renders a simple table from the @sanity/table plugin data.
 */
export const TableRenderer: React.FC<TableRendererProps> = ({ value }) => {
  if (!value || (!value.head && !value.body)) return null;

  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
        {/* Table Head */}
        {value.head && value.head.length > 0 && (
          <thead className="bg-gray-100 dark:bg-gray-800">
            {value.head.map((row, i) => (
              <tr key={i}>
                {row.cells.map((cell, j) => (
                  <th
                    key={j}
                    className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left"
                  >
                    {cell.text}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}

        {/* Table Body */}
        {value.body && value.body.length > 0 && (
          <tbody>
            {value.body.map((row, i) => (
              <tr key={i} className="even:bg-gray-50 dark:even:bg-gray-900">
                {row.cells.map((cell, j) => (
                  <td
                    key={j}
                    className="border border-gray-300 dark:border-gray-600 px-4 py-2"
                  >
                    {cell.text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
