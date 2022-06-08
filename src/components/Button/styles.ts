import { HTMLAttributes } from "react";
import styled from "styled-components";

export const Button = styled.button<HTMLAttributes<HTMLButtonElement>>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary);
  padding: 0.5rem 1rem;
  color: var(--white);
  border-radius: 5px;
  border: none;

  :hover {
    cursor: pointer;
    opacity: 0.6;
    transition: 0.2s;
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
