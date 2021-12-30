import SearchEngineDropdown from "./SearchEngineDropdown";
import UserDropdown from "./UserDropdown";
import InputWithSuggestions from "./InputWithSuggestions";
import { StartSearchButton, VoiceSearchButton } from "./buttons";

const WideScreenForm = () => {
  return (
    <>
      <InputWithSuggestions />
      <StartSearchButton />
      <VoiceSearchButton />
      <SearchEngineDropdown />
      <UserDropdown />
    </>
  );
};

export default WideScreenForm;
