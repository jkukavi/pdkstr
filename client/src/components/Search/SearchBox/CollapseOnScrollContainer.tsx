import React from "react";
import { useScrollingDownContext } from "contexts/ScrollingDown";
import styled, { css } from "styled-components";

const collapsedProps = css`
  transition: transform 1s;
  transform: translate(0, -2.7rem);
`;

const SearchBoxContainer = styled.div<{ collapsed: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.searchbox.container.backgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.searchbox.borderBottomColor};
  box-shadow: 0px 1px 3px 0px
    ${({ theme }) => theme.searchbox.container.boxShadowColor};
  transition: transform 0.5s;
  ${({ collapsed }) => collapsed && collapsedProps}
`;

const CollapseOnScrollContainer = ({ children }: { children: any }) => {
  const scrollingDown = useScrollingDownContext("cardContainer");

  return (
    <>
      <SearchBoxContainer collapsed={scrollingDown}>
        {children}
      </SearchBoxContainer>
    </>
  );
};

export default CollapseOnScrollContainer;
