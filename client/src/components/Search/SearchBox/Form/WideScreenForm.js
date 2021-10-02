import SearchEngineDropdown from "./SearchEngineDropdown";
import UserDropdown from "./UserDropdown";
import InputWithSuggestions from "./InputWithSuggestions";
import { StartSearchButton, VoiceSearchButton } from "./buttons";

const WideScreenForm = ({ searchEngine, setSearchEngine }) => {
  return (
    <>
      <InputWithSuggestions />
      <StartSearchButton />
      <VoiceSearchButton />
      <SearchEngineDropdown
        searchEngine={searchEngine}
        setSearchEngine={setSearchEngine}
      />
      <UserDropdown />
    </>
  );
};

export default WideScreenForm;
