import React, { Key, ReactNode } from "react";
import Spinner from "./Spinner";

interface TableColumn<T> {
  name: keyof T;
  label: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  keyExtractor: (row: T) => string;
  loading?: boolean;
  error?: string | null;
  errorMessage?: string;
}

const Table = <T,>({
  columns,
  rows,
  keyExtractor,
  loading,
  error,
  errorMessage = "Fail to retrieve data",
}: TableProps<T>) => {
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
        {loading ? (
          <tr>
            <td colSpan={columns.length}>
              <Spinner />
            </td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan={columns.length}>
              <p>{errorMessage}</p>
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={keyExtractor(row)}>
              {columns.map(({ name }) => (
                <td key={name as Key}>{row[name] as unknown as ReactNode}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
