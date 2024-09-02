import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import chevron from "icons/chevron.svg";
import { theme } from "consts/theme";

const DropDownContainer = styled.div`
  position: relative;
  width: fit-content;
  height: 2rem;
  margin-right: 0.3rem;
  background-color: ${({ theme }) => theme.dropDown.container.backgroundColor};
`;

const DropDownStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.dropDown.style.border};
  box-shadow: 0px 1px 3px 0px
    ${({ theme }) => theme.dropDown.style.boxshadowColor};
  border-top: none;
  background-color: ${({ theme }) => theme.dropDown.style.backgroundColor};
  border-radius: 0 0 6px 6px;
  overflow: hidden;
  :focus {
    outline: none;
  }
`;
const DropDownActiveStyles = css`
  & {
    border-radius: 2px 2px 0 0;
    border: 1px solid ${({ theme }) => theme.dropDown.icon.borderColor};
  }
  & > *:first-child {
    filter: drop-shadow(
      0px 0px 1px ${({ theme }) => theme.dropDown.icon.dropShadowColor}
    );
  }
`;
const DropDownIcon = styled.div<{ active?: boolean }>`
  cursor: pointer;
  padding: 0 0.5rem;
  height: 2rem;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 100%;
  }
  ${({ active }) => active && DropDownActiveStyles}
`;
const Chevron = styled.img`
  width: 0.8rem;
  height: 0.8rem;
  margin-left: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: contrast(0.2);
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactComponent = (props: any) => JSX.Element;

type DropDownItem = {
  component: ReactComponent | JSX.Element;
  onClick: VoidFunction;
};

const DropDown = ({
  frontItem,
  dropdownItems,
}: {
  frontItem: ReactComponent | JSX.Element;
  dropdownItems: DropDownItem[];
}) => {
  const [dropdown, setDropdown] = useState(false);

  const blurHappened = useRef(false);

  const dropDownElement = useRef<HTMLDivElement>(null);

  const handleClick = (
    e:
      | React.PointerEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    if (blurHappened.current) {
      blurHappened.current = false;
      return;
    }

    setDropdown(true);
    setTimeout(() => {
      dropDownElement.current?.focus();
    });
  };

  return (
    <DropDownContainer>
      <DropDownIcon active={true} tabIndex={0} onClick={handleClick}>
        {frontItem}
        <Chevron src={chevron} alt="alt" />
      </DropDownIcon>
      {dropdown && (
        <DropDownStyle
          //tabIndex="-1" so it can catch focus, and therefore trigger onblur
          tabIndex={0}
          onBlur={() => {
            setDropdown(false);
            blurHappened.current = true;
            setTimeout(() => {
              blurHappened.current = false;
            }, 500);
          }}
          ref={dropDownElement}
        >
          {dropdownItems.map(({ component, onClick }, i) => (
            <DropDownIcon
              key={i}
              onClick={() => {
                setDropdown(false);
                onClick();
              }}
            >
              {component}
            </DropDownIcon>
          ))}
        </DropDownStyle>
      )}
    </DropDownContainer>
  );
};

export default DropDown;
