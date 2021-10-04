import React, { useState, useMemo, useEffect, useCallback } from "react";

import { debounce } from "helpers";

import Navbar from "./Navbar";
import Cards from "../../components/Cards";

import { useUserData } from "../../contexts/UserData";

const History = () => {
  const { loadHistory, history } = useUserData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadHistory, []);

  const [queryString, setQueryString] = useState(null);

  const filteredItems = useMemo(() => {
    return queryString
      ? history.filter((item) =>
          item.title?.toLowerCase().includes(queryString.toLowerCase())
        )
      : history;
  }, [history, queryString]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQueryString = useCallback(debounce(setQueryString, 400), [
    setQueryString,
  ]);

  const handleInputChange = (e) => {
    debouncedSetQueryString(e.target.value);
  };

  return (
    <>
      <Navbar handleInputChange={handleInputChange} />
      <Cards searchArray={(filteredItems || []).slice(0, 10)} />
    </>
  );
};

export default History;
