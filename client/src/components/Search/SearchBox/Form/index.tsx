import React from "react";
import useScreenSize from "./useScreenSize";

import SmallScreenForm from "./SmallScreenForm";
import WideScreenForm from "./WideScreenForm";
import { SearchBox } from "../";
import { useHistory } from "react-router-dom";
import { getQueryParams } from "helpers/pushToParams";
import queryString from "query-string";

const Form = () => {
  const smallScreen = useScreenSize();
  const FormContent = smallScreen ? SmallScreenForm : WideScreenForm;

  const history = useHistory();

  const goToSearch = (keyword: string) => {
    const params = getQueryParams();
    const newParams = { ...params, search: keyword };
    const newQueryParams = queryString.stringify(newParams);
    history.push(`?${newQueryParams}`);
  };

  return (
    <form
      className="searchBox"
      id="searchForm"
      autoComplete="off"
      onSubmit={(e: any) => {
        e.preventDefault();
        SearchBox.searchForItems(e);
        goToSearch(e.target.searchString.value);
        (document.activeElement as HTMLButtonElement)?.blur();
      }}
    >
      <FormContent />
    </form>
  );
};

export default Form;
