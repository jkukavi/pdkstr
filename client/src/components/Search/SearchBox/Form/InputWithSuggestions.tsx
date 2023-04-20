import React, { useState, useEffect, useCallback } from "react";

import { addRandomKey, debounce } from "helpers";

import { instance as axios } from "contexts/axiosInstance";
import { notify } from "components/Notifications";

import { SearchEngineDropdown } from "./SearchEngineDropdown";

let preventBlur = false;
let inputFocused = false;

type Suggestion = {
  string: string;
  key: string;
};

const InputWithSuggestions = () => {
  const [suggestions, setSuggestions] = useState<{
    show: boolean;
    array: Suggestion[];
  }>({
    show: false,
    array: [],
  });

  useEffect(() => {
    function blurHandler() {
      if (preventBlur) {
        preventBlur = false;
        setSuggestions((suggestions) => ({ ...suggestions, show: false }));
      }
    }

    window.addEventListener("mouseup", blurHandler);

    return () => window.removeEventListener("mouseup", blurHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    debouncedGetSuggestions(e.target.value.toString());
  };

  const getSuggestions = async (string: string) => {
    if (!string) {
      setSuggestions({ show: false, array: [] });
      return;
    }
    try {
      const response = await axios.post(
        `/suggestions/${SearchEngineDropdown.selected}`,
        {
          searchString: string,
        }
      );
      const { suggestionsArray } = response.data;
      if (inputFocused) {
        setSuggestions({
          show: true,
          array: suggestionsArray
            .map((string: string) => ({
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
  const debouncedGetSuggestions = useCallback(
    debounce(getSuggestions, 200),
    []
  );

  const submitSuggestion: React.MouseEventHandler<HTMLParagraphElement> = (
    e
  ) => {
    // eslint-disable-next-line no-unused-vars
    preventBlur = false;
    const searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    const searchForm = document.getElementById("searchForm");
    if (searchInput && searchForm) {
      searchInput.value = e.currentTarget.textContent || "";
      searchForm.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
      setSuggestions({ ...suggestions, show: false });
    }
  };

  const onMouseDownSuggestion = () => {
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
        onFocus={(e) => {
          inputFocused = true;
          getSuggestions(e.target.value.toString());
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
            <p
              key={suggestion.key}
              className="suggestion"
              onMouseDown={onMouseDownSuggestion}
              onMouseUp={submitSuggestion}
            >
              {suggestion.string}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputWithSuggestions;
