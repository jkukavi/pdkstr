import { useState } from "react";

import SearchEngineDropdown from "./SearchEngineDropdown";
import UserDropdown from "./UserDropdown";
import InputWithSuggestions from "./InputWithSuggestions";
import {
  GoBackButton,
  ShowInputButton,
  StartSearchButton,
  VoiceSearchButton,
} from "./buttons";

const SmallScreenForm = () => {
  const [showInput, setShowInput] = useState(false);

  const openInput = () => {
    setShowInput(true);
  };

  const closeInput = () => {
    setShowInput(false);
  };
  return (
    <>
      {showInput && (
        <>
          <GoBackButton onClick={closeInput} />
          <InputWithSuggestions />
          <StartSearchButton />
          <VoiceSearchButton />
        </>
      )}

      {!showInput && (
        <>
          <ShowInputButton onClick={openInput} />
          <VoiceSearchButton />
          <SearchEngineDropdown />
          <UserDropdown />
        </>
      )}
    </>
  );
};

export default SmallScreenForm;
