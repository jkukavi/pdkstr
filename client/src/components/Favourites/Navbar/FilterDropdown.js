import React, { useState } from "react";

import chevron from "../../../icons/chevron.png";

import {
  favouritesFilterNames as filterNames,
  favouritesFilters as filters,
} from "../../../consts";

const FilterDropdown = ({ filter, setFilter }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <div style={{ width: "5rem", margin: 0 }} className={"dropDownContainer"}>
        <div
          className={"dropDownIcon active"}
          style={{ fontSize: "12px", color: "whitesmoke" }}
          tabIndex="-1"
          onKeyPress={() => {
            setDropdown((dropdown) => !dropdown);
            if (!dropdown) {
              setTimeout(
                () => document.getElementById("alternateEngines").focus(),
                0
              );
            }
          }}
          onMouseDown={() => {
            setDropdown((dropdown) => !dropdown);
            if (!dropdown) {
              setTimeout(
                () => document.getElementById("alternateEngines").focus(),
                0
              );
            }
          }}
        >
          {filterNames[filter]}
          <img className="chevron" src={chevron} alt="alt" />
        </div>
        {dropdown && (
          <div
            onBlur={() => {
              setDropdown(false);
            }}
            id="alternateEngines"
            tabIndex="-1"
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
