import React from "react";
import useScreenSize from "./useScreenSize";

import SmallScreenForm from "./SmallScreenForm";
import WideScreenForm from "./WideScreenForm";
import { SearchBox } from "../";

const Form = () => {
  const smallScreen = useScreenSize();
  const FormContent = smallScreen ? SmallScreenForm : WideScreenForm;
  return (
    <form
      className="searchBox"
      id="searchForm"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        SearchBox.searchForItems(e);
        (document.activeElement as HTMLButtonElement)?.blur();
      }}
    >
      <FormContent />
    </form>
  );
};

export default Form;
