import React, { useState } from "react";

import DropDown from "../../../../components/Dropdown";

import { searchEngines } from "../../../../consts";

import youtube from "../../../../icons/youtube.png";
import soundcloud from "../../../../icons/soundcloud.png";

export const SearchEngineDropdown = {
  selected: searchEngines.YT,
};

const SearchEngineDropdownComponent = () => {
  const [searchEngine, setSearchEngine] = useState(
    SearchEngineDropdown.selected
  );

  SearchEngineDropdown.selected = searchEngine;

  return (
    <>
      <DropDown
        searchEngine={searchEngine}
        setSearchEngine={setSearchEngine}
        frontItem={
          <img
            src={searchEngine === searchEngines.YT ? youtube : soundcloud}
            alt="alt"
          />
        }
        dropdownItems={[
          {
            component: <img src={youtube} alt="alt"></img>,
            onClick: () => {
              setSearchEngine(searchEngines.YT);
            },
          },
          {
            component: <img src={soundcloud} alt="alt"></img>,
            onClick: () => {
              setSearchEngine(searchEngines.SC);
            },
          },
        ]}
      />
    </>
  );
};

export default SearchEngineDropdownComponent;
