import React, { useState } from "react";

import chevron from "icons/chevron.svg";

const DropDown = ({ frontItem, dropdownItems }) => {
  const [dropdown, setDropdown] = useState(false);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setDropdown((dropdown) => !dropdown);
    if (!dropdown) {
      setTimeout(() => document.getElementById("alternateEngines").focus(), 0);
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
