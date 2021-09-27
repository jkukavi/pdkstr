import React from "react";

import DropDown from "../../../components/Dropdown";

import youtube from "../../../icons/youtube.png";
import soundcloud from "../../../icons/soundcloud.png";
import { searchEngines } from "../../../consts";

const SearchEngineDropdown = ({ searchEngine, setSearchEngine }) => {
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

export default SearchEngineDropdown;
