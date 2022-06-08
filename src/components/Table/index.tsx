import React, { Key, ReactNode } from "react";
import { Button } from "..";
import Spinner from "./../Spinner";
import {
  Container,
  PaginationContainer,
  SpinnerWrapper,
  StyledTable,
  TableCell,
  TableContainer,
} from "./styles";

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
  highlightWord?: string;
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
  highlightWord,
}: TableProps<T>) => {
  const pageSize = 10;
  const isPreviousPageDisabled = currentPage === 1;
  const isNextPageDisabled =
    currentPage * pageSize >= totalItems || rows.length < pageSize;

  const transformCell = (cellValue: string): ReactNode => {
    return cellValue
      ?.replaceAll(", ", ",")
      ?.split(",")
      .map<ReactNode>((text) => {
        if (text.includes("http")) {
          return (
            <a href={text} target="_blank" rel="noreferrer" key={text}>
              {text}
            </a>
          );
        }
        if (highlightWord && text.includes(highlightWord)) {
          return <strong key={text}>{text}</strong>;
        } else {
          return text;
        }
      })
      .reduce((prev, curr) => [prev, ", ", curr]);
  };

  return (
    <Container>
      <TableContainer>
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
                    <td key={name as Key}>
                      <TableCell>{transformCell(String(row[name]))}</TableCell>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableContainer>
      <PaginationContainer>
        <p>
          Showing {1 + (currentPage - 1) * 10} to {currentPage * 10} of{" "}
          {totalItems} entries
        </p>
        <Button onClick={onClickPreviousPage} disabled={isPreviousPageDisabled}>
          previous
        </Button>
        <p>
          {currentPage} / {Math.ceil(totalItems / pageSize)}
        </p>
        <Button onClick={onClickNextPage} disabled={isNextPageDisabled}>
          next
        </Button>
      </PaginationContainer>
    </Container>
  );
};

export default Table;
