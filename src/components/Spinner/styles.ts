import styled, { keyframes } from "styled-components";

const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: ${(props) => props.color || "black"} solid 5px;
  border-radius: 50%;
  border-left-color: transparent;
  animation: ${Rotate} 2s linear infinite;
`;
