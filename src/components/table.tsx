import React, { Key, ReactNode } from "react";

interface TableColumn<T> {
  name: keyof T;
  label: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  keyExtractor: (row: T) => string;
}

const Table = <T,>({ columns, rows, keyExtractor }: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ name, label }) => (
            <th key={name as Key}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={keyExtractor(row)}>
            {columns.map(({ name }) => (
              <td key={name as Key}>{row[name] as unknown as ReactNode}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
