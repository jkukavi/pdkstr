import React, { useState } from "react";

import Cards from "components/Cards";

import SearchBox from "./SearchBox";

const Search = () => {
  const [searchArray, setSearchArray] = useState([]);
  const [arrayLoading, setArrayLoading] = useState(false);

  return (
    <>
      <SearchBox
        setSearchArray={setSearchArray}
        setArrayLoading={setArrayLoading}
      />
      <Cards searchArray={searchArray} arrayLoading={arrayLoading} />
    </>
  );
};

export default Search;
