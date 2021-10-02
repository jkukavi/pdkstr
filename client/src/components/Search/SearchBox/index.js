import React, { useState } from "react";

import {
  fetchItems,
  getChannelItems,
  getChannelPlaylists,
} from "../../../apiCalls";

import { notify } from "../../Notifications";

import Form from "./Form";

import { addRandomKey } from "../../../helpers/helpers";

import ChannelInfo from "../../ChannelInfo";

import CollapseOnScrollContainer from "./CollapseOnScrollContainer";
import { SearchEngineDropdown } from "./Form/SearchEngineDropdown";
import useConnectPropsToObserver from "../../../hooks/useConnectPropsToObserver";

export const SearchBox = {
  viewingChannel: false,
  setSearchArray: null,
  setArrayLoading: null,
  setViewingChannel: null,
  loadChannelItems: async function (item) {
    this.setSearchArray([]);
    this.setArrayLoading(true);
    try {
      const { channelInfo, searchResultsArray } = await getChannelItems(item);
      this.setViewingChannel(channelInfo);
      this.setSearchArray(searchResultsArray);
    } catch (e) {
      notify("Unable to fetch channel data.");
    } finally {
      this.setArrayLoading(false);
    }
  },
  loadChannelPlaylists: async function (item) {
    this.setSearchArray([]);
    this.setArrayLoading(true);
    try {
      const { channelInfo, searchResultsArray } = await getChannelPlaylists(
        item
      );
      this.setViewingChannel(channelInfo);
      this.setSearchArray(searchResultsArray);
    } catch (e) {
      notify("Unable to fetch channel data.");
    } finally {
      this.setArrayLoading(false);
    }
  },
  searchForItems: async function (event, newSearchString) {
    const searchString = newSearchString || event.target.searchString.value;
    if (event?.preventDefault) event.preventDefault();
    if (!searchString && !newSearchString) {
      return;
    }
    this.setSearchArray([]);
    this.setArrayLoading(true);
    this.setViewingChannel(false);
    try {
      const searchResultsArray = await fetchItems(
        searchString,
        SearchEngineDropdown.selected
      );
      this.setSearchArray(searchResultsArray.map(addRandomKey));
      this.setViewingChannel(false);
    } catch (e) {
      notify("Something went wrong. Try changing your search.");
    } finally {
      this.setArrayLoading(false);
    }
  },
  searchFromVoiceInput: function (recognizedVoiceInput) {
    const element = document.getElementById("searchInput");
    if (element) element.value = recognizedVoiceInput;
    this.searchForItems(null, recognizedVoiceInput);
  },
};

const SearchBoxComponent = React.memo(({ setSearchArray, setArrayLoading }) => {
  const [viewingChannel, setViewingChannel] = useState(
    SearchBox.viewingChannel
  );

  const props = {
    viewingChannel,
    setSearchArray,
    setArrayLoading,
    setViewingChannel,
  };

  useConnectPropsToObserver(props, SearchBox);

  return (
    <div className="searchBoxFixedContainer">
      <CollapseOnScrollContainer>
        <Form />
        {viewingChannel && <ChannelInfo channelInfo={viewingChannel} />}
      </CollapseOnScrollContainer>
    </div>
  );
});

export default SearchBoxComponent;
