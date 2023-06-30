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
  const endReached = useRef(false);

  const setEndReached = (isEndReached: boolean) => {
    endReached.current = isEndReached;
  };

  const loadFirstPage = async (
    type: ItemType = "item",
    queryString: string
  ) => {
    setLoading(true);
    try {
      const fetchedHistory = await getMyHistory(type, queryString);
      setHistory(fetchedHistory);

      if (fetchedHistory.length === 0) {
        setEndReached(true);
      }
    } catch (e) {
      notify("Unable to fetch history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    setHistory([]);
    setEndReached(false);
    loadFirstPage(type, queryString);
  }, [queryString, type]);

  useEffect(() => {
    if (page !== 0) {
      fetchMoreHistory();
    }
  }, [page]);

  const loadMoreHistory = () => {
    if (endReached.current) return;
    setPage((page) => page + 1);
  };

  const fetchMoreHistory = async () => {
    setLoading(true);
    try {
      const fetchedHistory = await getMyHistory(type, queryString, page);
      setHistory([...history, ...fetchedHistory]);
      if (fetchedHistory.length === 0) {
        setEndReached(true);
      }
    } catch (e) {
      notify("Unable to fetch history");
    } finally {
      setLoading(false);
    }
  };

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
