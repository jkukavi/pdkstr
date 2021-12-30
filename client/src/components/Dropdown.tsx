import React, { useState } from "react";

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

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setDropdown((dropdown) => !dropdown);
    if (!dropdown) {
      setTimeout(() => document.getElementById("alternateEngines")?.focus(), 0);
    }
  };
  return (
    <div className={"dropDownContainer"}>
      <div
        className={"dropDownIcon active"}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        //so it can be opened with keyboard
        onKeyPress={handlePointerDown}
      >
        {frontItem}

        <img className="chevron" src={chevron} alt="alt" />
      </div>
      {dropdown && (
        <div
          //tabIndex="-1" so it can catch focus, and therefore trigger onblur
          tabIndex={0}
          onBlur={() => {
            setDropdown(false);
          }}
          id="alternateEngines"
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
