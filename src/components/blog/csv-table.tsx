import React, { useMemo } from 'react';
import Papa from 'papaparse';

interface CsvTableWithHeaderProps {
  csvData: string;
  hasHeader?: boolean;
  className?: string;
}

export function CsvTableWithHeader({
  csvData,
  hasHeader = true,
  className = '',
}: CsvTableWithHeaderProps) {
  const tableData = useMemo(() => {
    if (!csvData) {
      return [];
    }
    const parsedData = Papa.parse(csvData.trim(), { header: false });
    return parsedData.data as string[][];
  }, [csvData]);

  if (!tableData || tableData.length === 0) {
    return <p>No table data available</p>;
  }

  const headerRow = hasHeader ? tableData[0] : null;
  const bodyRows = hasHeader ? tableData.slice(1) : tableData;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border-collapse border border-gray-300">
        {headerRow && (
          <thead className="bg-gray-100">
            <tr>
              {headerRow.map((cell, cellIndex) => (
                <th
                  key={cellIndex}
                  className="border border-gray-300 dark:border-gray-800 dark:bg-gray-300 dark:text-black px-4 py-2 text-left font-semibold"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-300 px-4 py-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
