import React from "react";

import {
  favouritesFilterNames as filterNames,
  favouritesFilters as filters,
} from "consts";

import DropDown from "components/Dropdown";

const FilterDropdown = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
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

const Text = ({ children }: { children: string }) => {
  return (
    <span style={{ fontSize: "12px", color: "whitesmoke" }}>{children}</span>
  );
};
