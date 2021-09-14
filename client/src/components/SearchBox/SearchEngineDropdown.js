import React, { useState } from "react";

import chevron from "../../icons/chevron.png";
import youtube from "../../icons/youtube.png";
import soundcloud from "../../icons/soundcloud.png";
import { searchEngines } from "../../consts";

const SearchEngineDropdown = ({ searchEngine, setSearchEngine }) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <div className={"dropDownContainer"}>
        <div
          className={"dropDownIcon active"}
          tabIndex="-1"
          onKeyPress={() => {
            setDropdown((dropdown) => !dropdown);
            if (!dropdown) {
              setTimeout(
                () => document.getElementById("alternateEngines").focus(),
                0
              );
            }
          }}
          onMouseDown={() => {
            setDropdown((dropdown) => !dropdown);
            if (!dropdown) {
              setTimeout(
                () => document.getElementById("alternateEngines").focus(),
                0
              );
            }
          }}
        >
          <img
            src={searchEngine === searchEngines.YT ? youtube : soundcloud}
            alt="alt"
          />

          <img className="chevron" src={chevron} alt="alt" />
        </div>
        {dropdown && (
          <div
            tabIndex="-1"
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
