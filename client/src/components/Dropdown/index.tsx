import React, { useRef, useState } from "react";
import chevron from "icons/chevron.svg";
import styled from "styled-components";

const DropDownContainer = styled.div`
  position: relative;
  width: fit-content;
  height: 2rem;
  margin-right: 0.3rem;
  background-color: ${theme.DropDownContainer.backgroundColor};
`;

const DropDownShelf = styled.div`
  border: 1px solid ${theme.DropDownShelf.border};
  box-shadow: 0px 1px 3px 0px ${theme.DropDownShelf.boxShadow};
  border-top: none;
  background-color: ${theme.DropDownShelf.backgroundColor};
  border-radius: 0 0 6px 6px;
  overflow: hidden;
`;

const DropDownIcon = styled.div`
  cursor: pointer;
  padding: 0 0.5rem;
  height: 2rem;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:focus {
    outline: none;
  }
  & img {
    height: 100%;
  }
  & .chevron {
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const DropDownIconActiveStyle = styled(DropDownIcon)`
  border-radius: 2px 2px 0 0;
  border: 1px solid ${theme.DropDownIconActiveStyle.border};
  & > *:first-child {
    filter: drop-shadow(0px 0px 1px ${theme.DropDownIconActiveStyle.filter});
  }
  & img:last-child {
    filter: contrast(0.2);
  }
  &:not(.active):hover {
    background-color: ${theme.DropDownIconActiveStyle.backgroundColor};
  }
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
    <>
      <DropDownContainer>
        <DropDownIconActiveStyle
          // className={"dropDownIcon active"}
          tabIndex={0}
          onClick={handleClick}
        >
          {frontItem}

          <img className="chevron" src={chevron} alt="alt" />
        </DropDownIconActiveStyle>
        {dropdown && (
          <DropDownShelf
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
                className="dropDownIcon"
                key={i}
                onClick={() => {
                  setDropdown(false);
                  onClick();
                }}
              >
                {component}
              </DropDownIcon>
            ))}
          </DropDownShelf>
        )}
      </DropDownContainer>
    </>
  );
};

export default DropDown;
