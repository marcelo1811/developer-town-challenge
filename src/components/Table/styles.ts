import { HTMLProps } from "react";
import styled from "styled-components";

export const StyledTable = styled.table<HTMLProps<HTMLTableElement>>`
  border-collapse: collapse;
  width: 100%;
  thead {
    background: var(--primary);
    color: var(--white);
  }

  th {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border: none;
    text-align: left;
  }

  tr {
    text-align: left;
    height: 3rem;
    border-bottom: 1px solid var(--gray);
  }

  tbody {
    tr:hover {
      background-color: var(--gray);
    }
  }

  td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 30vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const PaginationContainer = styled.div`
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 20px;
`;

export const TableCell = styled.div``;

export const Container = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  justify-content: center;
`;
