import React, { useRef, useState } from "react";

import chevron from "icons/chevron.svg";

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

  let blurHappened = useRef(false);

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
    <div className={"dropDownContainer"}>
      <div className={"dropDownIcon active"} tabIndex={0} onClick={handleClick}>
        {frontItem}

        <img className="chevron" src={chevron} alt="alt" />
      </div>
      {dropdown && (
        <div
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
          className="dropDown"
        >
          {dropdownItems.map(({ component, onClick }) => (
            <div
              className="dropDownIcon"
              onClick={() => {
                setDropdown(false);
                onClick();
              }}
            >
              {component}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
