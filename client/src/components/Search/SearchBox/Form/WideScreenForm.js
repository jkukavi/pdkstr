import recognizeAndStartSearch from "../../../../helpers/speechRecognition";
import microphone from "../../../../icons/microphone.png";
import magnifier from "../../../../icons/magnifier.png";
import SearchEngineDropdown from "./SearchEngineDropdown";
import UserDropdown from "./UserDropdown";
import InputWithSuggestions from "./InputWithSuggestions";
import { SearchBox } from "..";

const WideScreenForm = ({
  searchForm,
  searchEngine,
  searchFromVoiceInput,
  setSearchEngine,
  searchForItems,
}) => {
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
      <SearchEngineDropdown
        searchEngine={searchEngine}
        setSearchEngine={setSearchEngine}
      />
      <UserDropdown />
    </form>
  );
};

export default WideScreenForm;
