import React, { useState, useMemo, useEffect, useCallback } from "react";

import { debounce } from "../helpers/helpers";
import magnifier from "../icons/magnifier.png";
import Cards from "../components/Cards";

import { addRandomKey } from "../helpers/helpers";
import { notify } from "./Notifications";

import { instance as axios } from "../contexts/axiosInstance";

const History = ({ history, setHistory, cardProps }) => {
  useEffect(() => {
    listHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listHistory = async () => {
    try {
      const response = await axios.get("/users/my/history");
      const fetchedHistory = response.data.map(addRandomKey);
      setHistory(fetchedHistory);
    } catch (e) {
      notify("Unable to fetch history");
    }
  };

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
