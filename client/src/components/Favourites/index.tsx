import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "helpers";
import Cards from "components/Cards";

import Navbar from "./Navbar";
import { notify } from "components/Notifications";
import { getMyFavourites } from "apiCalls";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState<AnyItem[]>([]);
  const [type, setType] = useState<ItemType>("item");
  const [page, setPage] = useState(0);
  const [queryString, setQueryString] = useState("");

  const loadFirstPage = async (
    type: ItemType = "item",
    queryString: string
  ) => {
    setLoading(true);
    try {
      const fetchedFavourites = await getMyFavourites(type, queryString);
      setFavourites(fetchedFavourites);
    } catch (e) {
      notify("Unable to fetch history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    setFavourites([]);
    loadFirstPage(type, queryString);
  }, [queryString, type]);

  const loadMoreHistory = () => {
    setPage((page) => page + 1);
  };

  const fetchMoreHistory = async () => {
    setLoading(true);
    try {
      const fetchedFavourites = await getMyFavourites(type, queryString, page);
      setFavourites([...favourites, ...fetchedFavourites]);
    } catch (e) {
      notify("Unable to fetch history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page !== 0) {
      fetchMoreHistory();
    }
  }, [page]);

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
        onBottomReached={loadMoreHistory}
      />
    </>
  );
};

export default Favourites;
