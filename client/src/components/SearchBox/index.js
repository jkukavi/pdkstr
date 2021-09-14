import React, { useState, useEffect, useCallback } from "react";

import { useLocation } from "react-router";

import { debounce, throttle } from "../../helpers/helpers";

import recognizeAndStartSearch from "../../helpers/speechRecognition";
import microphone from "../../icons/microphone.png";
import magnifier from "../../icons/magnifier.png";
import chevron from "../../icons/chevron.png";
import Notification from "../Notification";

import { instance as axios } from "../../contexts/axiosInstance";

import SearchEngineDropdown from "./SearchEngineDropdown";
import UserDropdown from "./UserDropdown";
import ChannelInfo from "../../components/ChannelInfo";

let preventBlur = false;
let inputFocused = false;

const SearchBox = ({
  addToFavourites,
  scrollingDown,
  searchEngine,
  setSearchEngine,
  searchForm,
  searchYoutube,
  searchString,
  input,
  setSuggestions,
  suggestions,
  setSearchString,
  startSearch,
  notifications,
  notify,
  viewingChannel,
  getChannelItems,
  getChannelPlaylists,
}) => {
  const location = useLocation();
  const [showInput, setShowInput] = useState(false);
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 600);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const blurHandler = () => {
      if (preventBlur) {
        preventBlur = false;
        setSuggestions((suggestions) => ({ ...suggestions, show: false }));
      }
    };

    window.addEventListener("mouseup", blurHandler);

    return window.removeEventListener("mouseup", blurHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSuggestions]);

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
        setSuggestions({ show: true, array: suggestionsArray });
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

  const handleInput = (e) => {
    setSearchString(e.target.value);
    debouncedGetSuggestions(e.target.value.toString());
  };

  const viewingSearch = location.pathname === "/";
  const collapsedClassName =
    viewingChannel && !viewingSearch ? "collapsed2x" : "collapsed";

  const openInput = () => {
    setShowInput(true);
  };

  const closeInput = () => {
    setShowInput(false);
  };

  return (
    <div className="searchBoxFixedContainer">
      <div
        className={`searchBoxContainer ${
          scrollingDown ? collapsedClassName : ""
        }`}
      >
        <div className="notificationsContainer">
          {notifications.map((notification) => (
            <Notification notification={notification} />
          ))}
        </div>
        <form
          className="searchBox"
          name="searchForm"
          ref={searchForm}
          onSubmit={(e) => {
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

              <div className="inputHolder">
                <input
                  className="input"
                  value={searchString}
                  placeholder={"Search"}
                  onChange={handleInput}
                  ref={input}
                  onFocus={() => {
                    inputFocused = true;
                    setSuggestions({ ...suggestions, show: true });
                  }}
                  onBlur={() => {
                    inputFocused = false;
                    if (!preventBlur)
                      setSuggestions({ ...suggestions, show: false });
                  }}
                />
                {suggestions.show && !!suggestions.array.length && (
                  <div className="suggestionsContainer">
                    {suggestions.array.map((suggestionString) => (
                      <div
                        className="suggestion"
                        onMouseDown={(e) => {
                          preventBlur = true;
                        }}
                        onMouseUp={(e) => {
                          // eslint-disable-next-line no-unused-vars
                          preventBlur = false;
                          setSearchString(suggestionString);
                          searchYoutube(e, suggestionString);
                        }}
                      >
                        {suggestionString}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button className="button search" type="submit">
                <img src={magnifier} alt="alt" />
              </button>
              {smallScreen && (
                <div
                  className="button microphone"
                  onClick={recognizeAndStartSearch(startSearch, notify)}
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
                onClick={recognizeAndStartSearch(startSearch, notify)}
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
              <UserDropdown notify={notify} />
            </>
          )}
        </form>
        {viewingChannel && (
          <ChannelInfo
            channelInfo={viewingChannel}
            getChannelItems={getChannelItems}
            getChannelPlaylists={getChannelPlaylists}
            addToFavourites={addToFavourites}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBox;
