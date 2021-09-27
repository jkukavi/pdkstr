import React, { useState } from "react";

import chevron from "../../../icons/chevron.png";
import youtube from "../../../icons/youtube.png";
import soundcloud from "../../../icons/soundcloud.png";
import { searchEngines } from "../../../consts";

const SearchEngineDropdown = ({ searchEngine, setSearchEngine }) => {
  const [dropdown, setDropdown] = useState(false);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setDropdown((dropdown) => !dropdown);
    if (!dropdown) {
      setTimeout(() => document.getElementById("alternateEngines").focus(), 0);
    }
  };
  return (
    <>
      <div className={"dropDownContainer"}>
        <div
          className={"dropDownIcon active"}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          //so it can be opened with keyboard
          onKeyPress={handlePointerDown}
        >
          <img
            src={searchEngine === searchEngines.YT ? youtube : soundcloud}
            alt="alt"
          />

          <img className="chevron" src={chevron} alt="alt" />
        </div>
        {dropdown && (
          <div
            //tabIndex="-1" so it can catch focus, and therefore trigger onblur
            tabIndex={0}
            onBlur={() => {
              setDropdown(false);
            }}
            id="alternateEngines"
            className="dropDown"
          >
            <div
              className="dropDownIcon"
              onClick={() => {
                setDropdown(false);
                setSearchEngine(searchEngines.YT);
              }}
            >
              <img src={youtube} alt="alt"></img>
            </div>
            <div
              className="dropDownIcon"
              onClick={() => {
                setDropdown(false);
                setSearchEngine(searchEngines.SC);
              }}
            >
              <img src={soundcloud} alt="alt"></img>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchEngineDropdown;
