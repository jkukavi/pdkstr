import React, { useState } from "react";

import Cards from "components/Cards";

import SearchBox from "./SearchBox";

const Search = () => {
  const [searchArray, setSearchArray] = useState<AnyItem[]>([]);
  const [arrayLoading, setArrayLoading] = useState(false);

  return (
    <>
      <SearchBox
        setSearchArray={setSearchArray}
        setArrayLoading={setArrayLoading}
      />
      <Cards searchArray={searchArray} loading={arrayLoading} />
    </>
  );
};

export default Search;
