import React, { useState, useEffect, useCallback } from "react";

import { debounce } from "helpers";
import { useUserData } from "contexts/UserData";
import Cards from "components/Cards";
import Navbar from "components/Favourites/Navbar";

const History = () => {
  const { loadHistory, history, loading } = useUserData();
  const [type, setType] = useState<ItemType>("item");
  const [queryString, setQueryString] = useState<string>("");

  useEffect(() => loadHistory(type, queryString), [queryString, type]);

  const debouncedSetQueryString = useCallback(debounce(setQueryString, 400), [
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
      <Cards loading={loading} searchArray={history} />
    </>
  );
};

export default History;
