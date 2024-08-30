import React from "react";
import styled from "styled-components";

const SpinningLoader = styled.div<{ sizeInPx: number; color: string }>`
  border-radius: 50%;
  border: ${({ sizeInPx }) => Math.ceil(sizeInPx * 0.05)}px solid transparent;
  border-top: ${({ sizeInPx }) => Math.ceil(sizeInPx * 0.05)}px solid
    ${({ color }) => color};
  width: ${({ sizeInPx }) => sizeInPx}px;
  height: ${({ sizeInPx }) => sizeInPx}px;
  animation: spin 1.4s linear infinite;
  filter: drop-shadow(1px 1px 0.8px #000000);

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default SpinningLoader;
