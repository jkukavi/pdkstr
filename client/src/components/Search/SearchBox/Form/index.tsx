import React from "react";
import useScreenSize from "./useScreenSize";

import SmallScreenForm from "./SmallScreenForm";
import WideScreenForm from "./WideScreenForm";
import { SearchBox } from "../";
import { useHistory } from "react-router-dom";
import { getQueryParams } from "helpers/pushToParams";
import queryString from "query-string";
import styled from "styled-components";

const SearchBoxForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0.3rem 0 0.3rem;
  padding-left: calc(100vw - 100%);
  row-gap: 0.3rem;
  min-height: 2rem;
  z-index: 1;

  @media screen and (max-width: 600px) {
    flex-wrap: nowrap;
    padding-left: 0.2rem;
  }
`;

const Form = () => {
  const smallScreen = useScreenSize();
  const FormContent = smallScreen ? SmallScreenForm : WideScreenForm;

  const history = useHistory();

  const goToSearch = (keyword: string) => {
    const params = getQueryParams();
    const newParams = { ...params, search: keyword };
    const newQueryParams = queryString.stringify(newParams);
    history.push(`/?${newQueryParams}`);
  };

  return (
    <SearchBoxForm
      /*className="searchBox"*/
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
    </SearchBoxForm>
  );
};

export default Form;
