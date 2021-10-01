import React, { useState } from "react";

import SearchBox from "./SearchBox";
import Cards from "../Cards";

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
