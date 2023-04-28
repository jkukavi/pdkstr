import React, { useEffect, useRef } from "react";

import { favouritesFilters, favouritesFilterNames } from "consts";
import magnifier from "icons/magnifier.svg";
import { INavbar } from "components/Favourites/Navbar";

const WideScreenNavbar = ({
  title,
  filter,
  setFilter,
  setQueryString,
  queryString,
}: INavbar) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = queryString;
    }
  }, []);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newString = e.target.value;
    setQueryString(newString);
  };

  const inputProps = {
    type: "text",
    placeholder: "Filter favourites",
    onChange: onInputChange,
  };

  return (
    <div className="filterNavbarContainer">
      <div style={{ padding: 0 }} className="filterNavbar">
        <h2 style={{ paddingLeft: "0.3rem" }}>{title}</h2>

        <div className="verticalLine"></div>

        <FilterButons filter={filter} setFilter={setFilter} />

        <div className="verticalLine"></div>

        <div style={{ display: "flex", height: "100%" }}>
          <input
            ref={inputRef}
            style={{ margin: "3px 0 3px" }}
            {...inputProps}
          />
          <div className="iconHolder">
            <img src={magnifier} alt="alt" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WideScreenNavbar;

const filtersArray = Object.values(favouritesFilters);

const FilterButons = ({
  setFilter,
  filter,
}: {
  setFilter: INavbar["setFilter"];
  filter: INavbar["filter"];
}) => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      {filtersArray.map((currentFilter, i) => (
        <div
          key={i}
          className={`button ${filter === currentFilter ? "active" : ""}`}
          onClick={() => {
            setFilter(currentFilter);
          }}
        >
          {favouritesFilterNames[currentFilter]}
        </div>
      ))}
    </div>
  );
};
