import React, { useState, useEffect, useCallback } from "react";
import { styled, css } from "styled-components";

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

const InputHolder = styled.div`
  width: 40vw;
  height: 2rem;
  position: relative;

  @media screen and (max-width: 600px) {
    flex-grow: 1;
    position: static;
  }

  & input {
    width: 100%;
    height: 100%;
    font-size: 1.1rem;
    color: #c7c7c7;
    padding-left: 12px;
    outline: none;
    border: none;
    background-color: #222222;
    border-radius: 2px 0 0 2px;
    border: 1px solid rgb(82, 82, 82);
    transition: width 0.5s;
  }

  & input:focus {
    border: 1px solid salmon;
  }
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  background-color: #292929;
  box-shadow: 1px 2px 3px #000000c2;
  bottom: 0;
  left: 0;
  transform: translate(0, 100%);
  padding: 0.4rem 0;

  & p {
  }
`;

//suggestion className on line 147.

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
    }
  };

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
    <InputHolder /*className="inputHolder"*/>
      <input
        /* className="input"*/
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
        <SuggestionsContainer /*className="suggestionsContainer"*/>
          {suggestions.array.map((suggestion) => (
            <p
              key={suggestion.key}
              className="suggestion" /*suggestion*/
              onMouseDown={onMouseDownSuggestion}
              onMouseUp={submitSuggestion}
            >
              {suggestion.string}
            </p>
          ))}
        </SuggestionsContainer>
      )}
    </InputHolder>
  );
};

export default InputWithSuggestions;
