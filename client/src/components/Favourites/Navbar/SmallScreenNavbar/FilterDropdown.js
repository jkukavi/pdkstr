import React from "react";

import {
  favouritesFilterNames as filterNames,
  favouritesFilters as filters,
} from "../../../../consts";

import DropDown from "../../../Dropdown";

const FilterDropdown = ({ filter, setFilter }) => {
  const dropdownItems = Object.values(filters).map((item) => {
    return {
      component: <Text>{filterNames[item]}</Text>,
      onClick: () => {
        setFilter(item);
      },
    };
  });

  return (
    <DropDown
      frontItem={<Text>{filterNames[filter]}</Text>}
      dropdownItems={dropdownItems}
    />
  );
};

export default FilterDropdown;

const Text = ({ children }) => {
  return (
    <span style={{ fontSize: "12px", color: "whitesmoke" }}>{children}</span>
  );
};
