import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { debounce } from "helpers";
import { favouritesFilters as filters } from "consts";

import { useUserData } from "contexts/UserData";
import Cards from "components/Cards";

import Navbar from "./Navbar";

const Favourites = () => {
  const history = useHistory();

  const { favourites, loadFavourites } = useUserData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadFavourites, []);

  const [filter, setFilter] = useState(filters.TRACKS);
  const [queryString, setQueryString] = useState("");

  const filteredItems = useMemo(() => {
    const favouriteItems = (favourites || []).filter(
      (item) => item.type === filter
    );
    const queriedItems = queryString
      ? favouriteItems.filter((item) =>
          (item as any).title.toLowerCase().includes(queryString.toLowerCase())
        )
      : favouriteItems;
    return queriedItems;
  }, [favourites, queryString, filter]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQueryString = useCallback(debounce(setQueryString, 500), [
    setQueryString,
  ]);

  const deleteQuery = () => {
    setQueryString("");
  };

  return (
    <>
      <Navbar
        filter={filter}
        setFilter={setFilter}
        debouncedSetQueryString={debouncedSetQueryString}
        deleteQuery={deleteQuery}
        queryString={queryString}
      />
      <Cards
        searchArray={filteredItems}
        channelClickAction={() => {
          history.push("/");
        }}
      />
    </>
  );
};

export default Favourites;
