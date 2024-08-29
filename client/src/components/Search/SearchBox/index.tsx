import React, { useState } from "react";

import { fetchItems, getChannelItems, getChannelPlaylists } from "apiCalls";
import { addRandomKey } from "helpers";
import useConnectPropsToObserver from "hooks/useConnectPropsToObserver";

import { notify } from "components/Notifications";

import CollapseOnScrollContainer from "./CollapseOnScrollContainer";
import Form from "./Form";
import { SearchEngineDropdown } from "./Form/SearchEngineDropdown";
import ChannelInfo from "./ChannelInfo";
import { pushToParams } from "helpers/pushToParams";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

const updateSearchInputValue = (value: string) => {
  const element = document.getElementById("searchInput");
  if (element) (element as HTMLInputElement).value = value;
};

interface SearchBoxInterface {
  viewingChannel: Channel | null;
  setSearchArray: VoidFunction;
  setArrayLoading: VoidFunction;
  searchForItems: (event: any, newSearchString?: any) => Promise<void>;
  searchFromVoiceInput: (recognizedInput: string) => void;
}

const SearchBoxFixedContainer = styled.div`
  position: fixed;
  height: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

export const SearchBox: SearchBoxInterface = {
  viewingChannel: null,
  setSearchArray: () => {},
  setArrayLoading: () => {},
  searchForItems: async function (event, newSearchString) {
    const searchString = newSearchString || event.target.searchString.value;
    if (event?.preventDefault) event.preventDefault();

    if (!event && newSearchString) {
      updateSearchInputValue(newSearchString);
    }

    this.setSearchArray([]);
    this.setArrayLoading(true);
    try {
      const searchResultsArray = await fetchItems(
        searchString,
        SearchEngineDropdown.selected
      );
      this.setSearchArray(searchResultsArray.map(addRandomKey));
    } catch (e) {
      notify("Something went wrong. Try changing your search.");
    } finally {
      this.setArrayLoading(false);
    }
  },
  searchFromVoiceInput: function (recognizedVoiceInput) {
    updateSearchInputValue(recognizedVoiceInput);
    this.searchForItems(null, recognizedVoiceInput);
  },
};

const Component = (props: {
  setSearchArray: React.Dispatch<React.SetStateAction<AnyItem[]>>;
  setArrayLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useConnectPropsToObserver(props, SearchBox);

  return (
    <SearchBoxFixedContainer>
      <CollapseOnScrollContainer>
        <Form />
        <Switch>
          <Route path={"/channel/:engine/:channelId"}>
            <ChannelInfo {...props} />
          </Route>
        </Switch>
      </CollapseOnScrollContainer>
    </SearchBoxFixedContainer>
  );
};

const SearchBoxComponent = React.memo(Component);

export default SearchBoxComponent;
