import { useState, useRef } from "react";

import recognizeAndStartSearch from "../../../../helpers/speechRecognition";
import microphone from "../../../../icons/microphone.png";
import magnifier from "../../../../icons/magnifier.png";
import chevron from "../../../../icons/chevron.png";
import SearchEngineDropdown from "./SearchEngineDropdown";
import UserDropdown from "./UserDropdown";
import InputWithSuggestions from "./InputWithSuggestions";
import { SearchBox } from "..";

const SmallScreenForm = () => {
  const searchForm = useRef();
  const [showInput, setShowInput] = useState(false);

  const openInput = () => {
    setShowInput(true);
  };

  const closeInput = () => {
    setShowInput(false);
  };
  return (
    <form
      className="searchBox"
      name="searchForm"
      id="searchForm"
      ref={searchForm}
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        SearchBox.searchForItems(e);
        document.activeElement?.blur();
      }}
    >
      {showInput && (
        <>
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

          <InputWithSuggestions searchForm={searchForm} />
          <button className="button search" type="submit">
            <img src={magnifier} alt="alt" />
          </button>

          <div
            className="button microphone"
            onClick={recognizeAndStartSearch()}
          >
            <img src={microphone} alt="alt" />
          </div>
        </>
      )}

      {!showInput && (
        <>
          <button
            className="button microphone"
            type="button"
            onClick={openInput}
          >
            <img src={magnifier} alt="alt" />
          </button>
          <div
            className="button microphone"
            onClick={recognizeAndStartSearch()}
          >
            <img src={microphone} alt="alt" />
          </div>
          <SearchEngineDropdown />
          <UserDropdown />
        </>
      )}
    </form>
  );
};

export default SmallScreenForm;
