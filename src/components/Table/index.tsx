import React, { Key, ReactNode } from "react";
import Spinner from "./../Spinner";
import { PaginationContainer, SpinnerWrapper, StyledTable } from "./styles";

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
    <StyledTable cellSpacing={1}>
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
              <SpinnerWrapper>
                <Spinner />
                <p>Loading...</p>
              </SpinnerWrapper>
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
            <PaginationContainer>
              <p>
                Showing {1 + (currentPage - 1) * 10} to {currentPage * 10} of{" "}
                {totalItems} entries
              </p>
              <button
                onClick={onClickPreviousPage}
                disabled={isPreviousPageDisabled}>
                previous
              </button>
              <p>
                {currentPage} / {Math.ceil(totalItems / pageSize)}
              </p>
              <button onClick={onClickNextPage} disabled={isNextPageDisabled}>
                next
              </button>
            </PaginationContainer>
          </td>
        </tr>
      </tfoot>
    </StyledTable>
  );
};

export default Table;
