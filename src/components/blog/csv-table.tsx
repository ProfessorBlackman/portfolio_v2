import React, { useMemo } from 'react';
import Papa from 'papaparse';
import { DataTable } from '@/components/blog/table-renderer';

interface CsvTableWithHeaderProps {
  csvData: string;
  hasHeader?: boolean;
}

export function CsvTableWithHeader({ csvData, hasHeader = true }: CsvTableWithHeaderProps) {
  const tableData = useMemo(() => {
    if (!csvData) {
      return [];
    }
    const parsedData = Papa.parse(csvData.trim(), { header: false });
    return parsedData.data as string[][];
  }, [csvData]);

  if (!tableData || tableData.length === 0) {
    return null;
  }

  return (
    <DataTable
      head={hasHeader ? tableData[0] : null}
      rows={hasHeader ? tableData.slice(1) : tableData}
    />
  );
}
