import React, { useState, useEffect, useCallback, useRef } from "react";

import { useLocation } from "react-router";

import { addRandomKey, debounce, throttle } from "../../../helpers/helpers";

import { paths, searchEngines } from "../../../consts";

import recognizeAndStartSearch from "../../../helpers/speechRecognition";
import microphone from "../../../icons/microphone.png";
import magnifier from "../../../icons/magnifier.png";
import chevron from "../../../icons/chevron.png";

import { instance as axios } from "../../../contexts/axiosInstance";
import { notify } from "../../Notifications";

import SearchEngineDropdown from "./SearchEngineDropdown";
import UserDropdown from "./UserDropdown";
import ChannelInfo from "../../ChannelInfo";
import { useScrollingDownContext } from "../../../contexts/ScrollingDown";

const SearchBox = ({
  setSearchArray,
  setArrayLoading,
  setViewingChannel,
  viewingChannel,
  loadChannelItems,
  loadChannelPlaylists,
}) => {
  const location = useLocation();
  const scrollingDown = useScrollingDownContext("cardContainer");
  const [showInput, setShowInput] = useState(false);
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 600);
  const [searchEngine, setSearchEngine] = useState(searchEngines.YT);

  const searchYoutube = async (event, newSearchString) => {
    const searchString = newSearchString || event.target.searchString.value;

    if (event?.preventDefault) event.preventDefault();
    if (!searchString && !newSearchString) {
      return;
    }
    setSearchArray([]);
    setArrayLoading(true);
    setViewingChannel(false);
    console.log(searchString);
    const url = paths.search[searchEngine];
    try {
      const response = await axios.post(url, {
        searchString,
      });
      const searchResultsArray = response.data.searchResultsArray;
      setSearchArray(searchResultsArray.map(addRandomKey));
      setViewingChannel(false);
    } catch (e) {
    } finally {
      setArrayLoading(false);
    }
  };

  const startSearch = (recognizedString) => {
    const element = document.getElementById("searchInput");
    if (element) element.value = recognizedString;
    searchYoutube(null, recognizedString);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const checkResize = () => {
      if (window.innerWidth < 600 && !smallScreen) {
        setSmallScreen(true);
        setShowInput(false);
      } else if (window.innerWidth >= 600 && smallScreen) {
        setSmallScreen(false);
        setShowInput(false);
      }
    };
    const throttledCheckResize = throttle(checkResize, 100);

    window.addEventListener("resize", throttledCheckResize);

    return () => window.removeEventListener("resize", throttledCheckResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smallScreen, setSmallScreen]);

  const viewingSearch = location.pathname === "/";
  const collapsedClassName =
    viewingChannel && !viewingSearch ? "collapsed2x" : "collapsed";

  const openInput = () => {
    setShowInput(true);
  };

  const closeInput = () => {
    setShowInput(false);
  };

  const searchForm = useRef();

  return (
    <div className="searchBoxFixedContainer">
      <div
        className={`searchBoxContainer ${
          scrollingDown ? collapsedClassName : ""
        }`}
      >
        <form
          className="searchBox"
          name="searchForm"
          id="searchForm"
          ref={searchForm}
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            searchYoutube(e);
            document.activeElement?.blur();
          }}
        >
          {(showInput || !smallScreen) && (
            <>
              {smallScreen && (
                <button
                  className="button microphone"
                  type="button"
                  style={{ padding: 0 }}
                  onClick={closeInput}
                >
                  <img
                    src={chevron}
                    alt="alt"
                    style={{ transform: "rotate(90deg)" }}
                  />
                </button>
              )}

              <InputWithSuggestions
                searchEngine={searchEngine}
                searchForm={searchForm}
              />
              <button className="button search" type="submit">
                <img src={magnifier} alt="alt" />
              </button>
              {smallScreen && (
                <div
                  className="button microphone"
                  onClick={recognizeAndStartSearch(startSearch)}
                >
                  <img src={microphone} alt="alt" />
                </div>
              )}
            </>
          )}

          {(!showInput || !smallScreen) && (
            <>
              {smallScreen && (
                <button
                  className="button microphone"
                  type="button"
                  onClick={openInput}
                >
                  <img src={magnifier} alt="alt" />
                </button>
              )}
              <div
                className="button microphone"
                onClick={recognizeAndStartSearch(startSearch)}
              >
                <img src={microphone} alt="alt" />
              </div>
            </>
          )}

          {(!showInput || !smallScreen) && (
            <>
              <SearchEngineDropdown
                searchEngine={searchEngine}
                setSearchEngine={setSearchEngine}
              />
              <UserDropdown />
            </>
          )}
        </form>
        {viewingChannel && (
          <ChannelInfo
            channelInfo={viewingChannel}
            loadChannelItems={loadChannelItems}
            loadChannelPlaylists={loadChannelPlaylists}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBox;

let preventBlur = false;
let inputFocused = false;

const InputWithSuggestions = ({ searchEngine, searchForm }) => {
  const [suggestions, setSuggestions] = useState({ show: false, array: [] });

  useEffect(() => {
    function blurHandler() {
      if (preventBlur) {
        console.log("preventBlu");
        preventBlur = false;
        setSuggestions((suggestions) => ({ ...suggestions, show: false }));
      }
    }

    window.addEventListener("mouseup", blurHandler);

    return () => window.removeEventListener("mouseup", blurHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e) => {
    debouncedGetSuggestions(e.target.value.toString());
  };

  const getSuggestions = async (string) => {
    if (!string) {
      setSuggestions({ show: false, array: [] });
      return;
    }
    try {
      const response = await axios.post(`/suggestions/${searchEngine}`, {
        searchString: string,
      });
      const { suggestionsArray } = response.data;
      if (inputFocused) {
        setSuggestions({
          show: true,
          array: suggestionsArray
            .map((string) => ({
              string,
            }))
            .map(addRandomKey),
        });
      }
    } catch (e) {
      notify("Something went wrong. Try again.");
    } finally {
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetSuggestions = useCallback(debounce(getSuggestions, 200), [
    searchEngine,
  ]);

  const submitSuggestion = (e) => {
    // eslint-disable-next-line no-unused-vars
    preventBlur = false;
    document.getElementById("searchInput").value = e.target.innerText;
    searchForm.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
    setSuggestions({ ...suggestions, show: false });
  };

  const onMouseDownSuggestion = (e) => {
    preventBlur = true;
  };

  return (
    <div className="inputHolder">
      <input
        className="input"
        name="searchString"
        id="searchInput"
        placeholder={"Search"}
        onChange={handleInput}
        onFocus={() => {
          inputFocused = true;
          setSuggestions({ ...suggestions, show: true });
        }}
        onBlur={() => {
          inputFocused = false;
          if (!preventBlur) setSuggestions({ ...suggestions, show: false });
        }}
      />
      {suggestions.show && !!suggestions.array.length && (
        <div className="suggestionsContainer">
          {suggestions.array.map((suggestion) => (
            <div
              key={suggestion.key}
              className="suggestion"
              onMouseDown={onMouseDownSuggestion}
              onMouseUp={submitSuggestion}
              value={suggestion.string}
            >
              {suggestion.string}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
