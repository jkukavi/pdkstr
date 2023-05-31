import React, { useState, useEffect, useCallback, useRef } from "react";

import { debounce } from "helpers";
import { useUserData } from "contexts/UserData";
import Cards from "components/Cards";
import Navbar from "components/Favourites/Navbar";
import { notify } from "components/Notifications";
import { getMyHistory } from "apiCalls";

const History = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<AnyItem[]>([]);
  const [type, setType] = useState<ItemType>("item");
  const [page, setPage] = useState(0);
  const [queryString, setQueryString] = useState("");

  const loadFirstPage = async (
    type: ItemType = "item",
    queryString: string
  ) => {
    setLoading(true);
    try {
      const fetchedHistory = await getMyHistory(type, queryString);
      setHistory(fetchedHistory);
    } catch (e) {
      notify("Unable to fetch history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    setHistory([]);
    loadFirstPage(type, queryString);
  }, [queryString, type]);

  const loadMoreHistory = () => {
    setPage((page) => page + 1);
  };

  const fetchMoreHistory = async () => {
    setLoading(true);
    try {
      const fetchedHistory = await getMyHistory(type, queryString, page);
      setHistory([...history, ...fetchedHistory]);
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
        title="History"
        filter={type}
        setFilter={setType}
        setQueryString={debouncedSetQueryString}
        queryString={queryString}
      />
      <Cards
        loading={loading}
        searchArray={history}
        onBottomReached={loadMoreHistory}
      />
    </>
  );
};

export default History;
