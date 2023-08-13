import React, { useState } from "react";

import youtube from "icons/youtube.svg";
import soundcloud from "icons/soundcloud.svg";
import DropDown from "components/Dropdown";

export const SearchEngineDropdown: {
  selectEngine: (newEngine: Engine) => void;
  selected: Engine;
} = {
  selectEngine: () => {},
  selected: "youtube",
};

const SearchEngineDropdownComponent = () => {
  const [searchEngine, setSearchEngine] = useState<Engine>(
    SearchEngineDropdown.selected
  );

  SearchEngineDropdown.selected = searchEngine;
  SearchEngineDropdown.selectEngine = setSearchEngine;

  return (
    <>
      <DropDown
        frontItem={
          <img
            src={searchEngine === "youtube" ? youtube : soundcloud}
            alt="alt"
          />
        }
        dropdownItems={[
          {
            component: <img src={youtube} alt="alt"></img>,
            onClick: () => {
              setSearchEngine("youtube");
            },
          },
          {
            component: <img src={soundcloud} alt="alt"></img>,
            onClick: () => {
              setSearchEngine("soundcloud");
            },
          },
        ]}
      />
    </>
  );
};

export default SearchEngineDropdownComponent;
