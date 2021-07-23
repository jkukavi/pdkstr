import React, { useEffect } from "react";

import recognizeAndStartSearch from "../speechRecognition";
import microphone from "../icons/microphone.png";
import magnifier from "../icons/magnifier.png";
import Notification from "./Notification";

let preventBlur = false;

const SearchBox = ({
  scrollingDown,
  searchForm,
  searchYoutube,
  searchString,
  handleInput,
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
          onSubmit={searchYoutube}
        >
          <input
            className="input"
            value={searchString}
            onChange={handleInput}
            ref={input}
            onClick={() => {
              setSuggestions({ ...suggestions, show: true });
            }}
            onFocus={() => {
              setSuggestions({ ...suggestions, show: true });
            }}
            onBlur={() => {
              if (!preventBlur) setSuggestions({ ...suggestions, show: false });
            }}
          ></input>

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
                    if (!preventBlur) searchYoutube(e, suggestionString);
                  }}
                >
                  {suggestionString}
                </div>
              ))}
            </div>
          )}
          <button className="button" type="submit">
            <img src={magnifier} alt="alt" />
          </button>
          <div
            className="button microphone"
            onClick={recognizeAndStartSearch(startSearch, notify)}
          >
            <img src={microphone} alt="alt" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
