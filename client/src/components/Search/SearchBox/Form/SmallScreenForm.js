import { useState } from "react";

import recognizeAndStartSearch from "../../../../helpers/speechRecognition";
import microphone from "../../../../icons/microphone.png";
import magnifier from "../../../../icons/magnifier.png";
import chevron from "../../../../icons/chevron.png";
import SearchEngineDropdown from "./SearchEngineDropdown";
import UserDropdown from "./UserDropdown";
import InputWithSuggestions from "./InputWithSuggestions";

const SmallScreenForm = ({
  searchForm,
  searchYoutube,
  searchEngine,
  searchFromVoiceInput,
  setSearchEngine,
}) => {
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
        searchYoutube(e);
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

          <InputWithSuggestions
            searchEngine={searchEngine}
            searchForm={searchForm}
          />
          <button className="button search" type="submit">
            <img src={magnifier} alt="alt" />
          </button>

          <div
            className="button microphone"
            onClick={recognizeAndStartSearch(searchFromVoiceInput)}
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
            onClick={recognizeAndStartSearch(searchFromVoiceInput)}
          >
            <img src={microphone} alt="alt" />
          </div>
          <SearchEngineDropdown
            searchEngine={searchEngine}
            setSearchEngine={setSearchEngine}
          />
          <UserDropdown />
        </>
      )}
    </form>
  );
};

export default SmallScreenForm;
