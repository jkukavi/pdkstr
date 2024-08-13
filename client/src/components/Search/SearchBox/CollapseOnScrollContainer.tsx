import React from "react";
import { useScrollingDownContext } from "contexts/ScrollingDown";
import styled, { css, useTheme } from "styled-components";

const collapsedProps = css`
  transition: transform 1s;
  transform: translate(0, -2.7rem);
`;

const SearchBoxContainer = styled.div<{ collapsed: boolean }>`
  position: relative;
  background-color: #343434;
  border-bottom: 1px solid #6b6b6b;
  box-shadow: 0px 1px 3px 0px #000000;
  transition: transform 0.5s;
  ${({ collapsed }) => collapsed && collapsedProps}
`;

const CollapseOnScrollContainer = ({ children }: { children: any }) => {
  const scrollingDown = useScrollingDownContext("cardContainer");

  const theme = useTheme();

  theme.button.backgroundColor;

  return (
    <>
      {/* <div className={`searchBoxContainer ${scrollingDown ? "collapsed" : ""}`}>
        {children}
      </div>

      <div
        style={{
          //searchBoxContainer stilovi
          ...(scrollingDown && {
            backgroundColor: theme.button.backgroundColor,
          }),
        }}
      >
        {children}
      </div>
*/}
      <SearchBoxContainer collapsed={scrollingDown}>
        {children}
      </SearchBoxContainer>
    </>
  );
};

export default CollapseOnScrollContainer;
