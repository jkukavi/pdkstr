import React from "react";
import useScreenSize from "./useScreenSize";

import SmallScreenForm from "./SmallScreenForm";
import WideScreenForm from "./WideScreenForm";
import { SearchBox } from "../";
import { useHistory } from "react-router-dom";

const Form = () => {
  const smallScreen = useScreenSize();
  const FormContent = smallScreen ? SmallScreenForm : WideScreenForm;

  const history = useHistory();

  const goToSearch = (keyword: string) => {
    history.push(`/?search=${keyword}`);
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
