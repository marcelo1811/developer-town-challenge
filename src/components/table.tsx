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
  onClickNextPage?: () => void;
  onClickPreviousPage?: () => void;
  currentPage: number;
  totalItems: number;
}

const Table = <T,>({
  columns,
  rows,
  keyExtractor,
  loading,
  error,
  errorMessage = "Fail to retrieve data",
  onClickNextPage,
  onClickPreviousPage,
  currentPage,
  totalItems,
}: TableProps<T>) => {
  const pageSize = 10;
  const isPreviousPageDisabled = currentPage === 1;
  const isNextPageDisabled =
    currentPage * pageSize >= totalItems || rows.length < pageSize;

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
      <tfoot>
        <tr>
          <td colSpan={columns.length}>
            <button
              onClick={onClickPreviousPage}
              disabled={isPreviousPageDisabled}>
              previous
            </button>
            <button onClick={onClickNextPage} disabled={isNextPageDisabled}>
              next
            </button>
            <p>
              current page: {currentPage} / {Math.ceil(totalItems / pageSize)}
            </p>
            <p>total items: {totalItems}</p>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
