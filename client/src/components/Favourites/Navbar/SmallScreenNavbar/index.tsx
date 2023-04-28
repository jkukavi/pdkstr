import React from "react";
import { INavbar } from "components/Favourites/Navbar";

import FilterDropdown from "./FilterDropdown";

import InputDropdown from "./InputDropdown";

const SmallScreenNavbar = ({
  title,
  filter,
  setFilter,
  queryString,
  setQueryString,
}: INavbar) => {
  return (
    <div className="filterNavbarContainer">
      <div style={{ padding: 0 }} className="filterNavbar">
        <h2 style={{ paddingLeft: "0.3rem" }}>{title}</h2>
        <div className="verticalLine"></div>

        <FilterDropdown filter={filter} setFilter={setFilter} />

        <div className="verticalLine"></div>

        <InputDropdown
          queryString={queryString}
          debouncedSetQueryString={setQueryString}
          deleteQuery={() => setQueryString("")}
        />
      </div>
    </div>
  );
};

export default SmallScreenNavbar;
