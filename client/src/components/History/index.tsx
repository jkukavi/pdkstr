import { useState, useMemo, useEffect, useCallback } from "react";

import { debounce } from "helpers";

import { useUserData } from "contexts/UserData";
import Cards from "components/Cards";

import Navbar from "./Navbar";

const History = () => {
  const { loadHistory, history } = useUserData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadHistory, []);

  const [queryString, setQueryString] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return queryString
      ? history.filter((item: Item) =>
          item.title?.toLowerCase().includes(queryString.toLowerCase())
        )
      : history;
  }, [history, queryString]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQueryString = useCallback(debounce(setQueryString, 400), [
    setQueryString,
  ]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
