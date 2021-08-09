import React, { useEffect, useCallback } from "react";
import axios from "axios";

import { debounce } from "../helpers";

import recognizeAndStartSearch from "../speechRecognition";
import microphone from "../icons/microphone.png";
import magnifier from "../icons/magnifier.png";
import youtube from "../icons/youtube.png";
import soundcloud from "../icons/soundcloud.png";
import Notification from "./Notification";
import { searchEngines } from "../App";

let preventBlur = false;
let inputFocused = false;

const SearchBox = ({
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
}) => {
  useEffect(() => {
    window.addEventListener("mouseup", () => {
      if (preventBlur) {
        preventBlur = false;
        setSuggestions((suggestions) => ({ ...suggestions, show: false }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      window.alert("some error happened, please kontakt the dev team");
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

  return (
    <div className="searchBoxFixedContainer">
      <div className={`searchBoxContainer ${scrollingDown ? "collapsed" : ""}`}>
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
          <div style={{ position: "relative" }}>
            <input
              className="input"
              value={searchString}
              onChange={handleInput}
              ref={input}
              onClick={() => {
                setSuggestions({ ...suggestions, show: true });
              }}
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

          <button className="button" type="submit">
            <img src={magnifier} alt="alt" />
          </button>
          <div
            className="button microphone"
            onClick={recognizeAndStartSearch(startSearch, notify)}
          >
            <img src={microphone} alt="alt" />
          </div>

          <div className="searchEngineIcons">
            <div
              className={`searchBoxIcon ${
                searchEngine === searchEngines.YT ? "active" : ""
              }`}
              onClick={() => {
                setSearchEngine(searchEngines.YT);
              }}
            >
              <img src={youtube} alt="alt" />
            </div>
            <div
              className={`searchBoxIcon ${
                searchEngine === searchEngines.SC ? "active" : ""
              }`}
              onClick={() => {
                setSearchEngine(searchEngines.SC);
              }}
            >
              <img src={soundcloud} alt="alt" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
