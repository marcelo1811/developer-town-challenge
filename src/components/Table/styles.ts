import { HTMLProps } from "react";
import styled from "styled-components";

export const StyledTable = styled.table<HTMLProps<HTMLTableElement>>`
  border-collapse: collapse;
  width: 90%;
  overflow-x: scroll;
  height: 80vh;

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
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const PaginationContainer = styled.div`
  height: 100%;
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;
