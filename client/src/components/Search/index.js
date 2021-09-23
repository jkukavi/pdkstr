import React from "react";
import SearchBox from "./SearchBox";
import Cards from "../Cards";

const Search = ({ cardProps, ...rest }) => {
  return (
    <>
      <SearchBox {...rest} />
      <Cards {...cardProps} />
    </>
  );
};

export default Search;
