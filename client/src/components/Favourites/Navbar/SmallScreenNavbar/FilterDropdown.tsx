import React from "react";

import {
  favouritesFilterNames as filterNames,
  favouritesFilters as filters,
} from "consts";

import DropDown from "components/Dropdown";
import { INavbar } from "components/Favourites/Navbar";

const FilterDropdown = ({
  filter,
  setFilter,
}: {
  filter: INavbar["filter"];
  setFilter: INavbar["setFilter"];
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
