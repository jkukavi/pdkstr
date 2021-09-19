import React, { useState, useMemo, useEffect, useCallback } from "react";

import { debounce } from "../helpers/helpers";
import magnifier from "../icons/magnifier.png";
import Cards from "../components/Cards";

const History = ({ listHistory, history = [], cardProps }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(listHistory, []);

  const [queryString, setQueryString] = useState(null);

  const filteredItems = useMemo(() => {
    return queryString
      ? history.filter((item) =>
          item.title?.toLowerCase().includes(queryString.toLowerCase())
        )
      : history;
  }, [history, queryString]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilter = useCallback(debounce(setQueryString, 400), [
    setQueryString,
  ]);

  return (
    <>
      <div className="filterNavbarContainer">
        <div className="filterNavbar">
          <h2>History</h2>
          <div className="verticalLine"></div>
          <input
            style={{ margin: "3px 0 3px" }}
            type="text"
            placeholder="Search history"
            onChange={(e) => {
              debouncedSetFilter(e.target.value);
            }}
          />

          <div className="iconHolder">
            <img src={magnifier} alt="alt" />
          </div>
        </div>
      </div>

      <Cards
        {...{
          ...cardProps,
          searchArray: (filteredItems || []).slice(0, 10),
        }}
      />
    </>
  );
};

export default History;
