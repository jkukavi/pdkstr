import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { debounce } from "helpers";
import { favouritesFilters as filters } from "consts";

import { useUserData } from "contexts/UserData";
import Cards from "components/Cards";

import Navbar from "./Navbar";

const Favourites = () => {
  const history = useHistory();
  const { favourites, loadFavourites, loading } = useUserData();
  const [type, setType] = useState<ItemType>("item");
  const [queryString, setQueryString] = useState("");

  useEffect(() => loadFavourites(type, queryString), [type, queryString]);

  const debouncedSetQueryString = useCallback(debounce(setQueryString, 600), [
    setQueryString,
  ]);

  return (
    <>
      <Navbar
        title="Favourites"
        filter={type}
        setFilter={setType}
        setQueryString={debouncedSetQueryString}
        queryString={queryString}
      />
      <Cards
        loading={loading}
        searchArray={favourites}
        channelClickAction={() => {
          history.push("/");
        }}
      />
    </>
  );
};

export default Favourites;
