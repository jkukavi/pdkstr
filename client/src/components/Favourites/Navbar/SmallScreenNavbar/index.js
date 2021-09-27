import React from "react";

import FilterDropdown from "./FilterDropdown";

import InputDropdown from "./InputDropdown";

const SmallScreenNavbar = ({
  filter,
  setFilter,
  queryString,
  debouncedSetQueryString,
  deleteQuery,
}) => {
  return (
    <div className="filterNavbarContainer">
      <div style={{ padding: 0 }} className="filterNavbar">
        <h2 style={{ paddingLeft: "0.3rem" }}>Favourites</h2>
        <div className="verticalLine"></div>

        <FilterDropdown filter={filter} setFilter={setFilter} />

        <div className="verticalLine"></div>

        <InputDropdown
          queryString={queryString}
          debouncedSetQueryString={debouncedSetQueryString}
          deleteQuery={deleteQuery}
        />
      </div>
    </div>
  );
};

export default SmallScreenNavbar;
