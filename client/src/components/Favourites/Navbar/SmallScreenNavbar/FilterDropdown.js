import React, { useState } from "react";

import chevron from "../../../../icons/chevron.png";

import {
  favouritesFilterNames as filterNames,
  favouritesFilters as filters,
} from "../../../../consts";

const FilterDropdown = ({ filter, setFilter }) => {
  const [dropdown, setDropdown] = useState(false);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setDropdown((dropdown) => !dropdown);
    if (!dropdown) {
      setTimeout(() => document.getElementById("alternateEngines").focus(), 0);
    }
  };
  return (
    <>
      <div style={{ width: "5rem", margin: 0 }} className={"dropDownContainer"}>
        <div
          className={"dropDownIcon active"}
          style={{ fontSize: "12px", color: "whitesmoke" }}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onKeyPress={handlePointerDown}
        >
          {filterNames[filter]}
          <img className="chevron" src={chevron} alt="alt" />
        </div>
        {dropdown && (
          <div
            onBlur={() => {
              setDropdown(false);
            }}
            tabIndex="-1"
            id="alternateEngines"
            className="dropDown"
          >
            {Object.values(filters).map((item) => (
              <div
                className="dropDownIcon"
                style={{ color: "whitesmoke" }}
                onClick={() => {
                  setFilter(item);
                  setDropdown(false);
                }}
              >
                <p style={{ fontSize: "12px", textAlign: "left" }}>
                  {filterNames[item]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FilterDropdown;
