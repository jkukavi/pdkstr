import React, { useState, useRef } from "react";

import { useHistory, useLocation } from "react-router";

import {
  fetchItems,
  getChannelItems,
  getChannelPlaylists,
} from "../../../apiCalls";

import { notify } from "../../Notifications";

import Form from "./Form";

import { addRandomKey } from "../../../helpers/helpers";
import { searchEngineShortcuts } from "../../../consts";
import ChannelInfo from "../../ChannelInfo";

import CollapseOnScrollContainer from "./CollapseOnScrollContainer";
import { SearchEngineDropdown } from "./Form/SearchEngineDropdown";

const SearchBox = {
  loadChannelItems: null,
  loadChannelPlaylists: null,
  searchForItems: null,
  searchFromVoiceInput: null,
  state: {
    viewingChannel: false,
  },
};

const SearchBoxComponent = ({ setSearchArray, setArrayLoading }) => {
  const location = useLocation();
  const [viewingChannel, setViewingChannel] = useState(
    SearchBox.state.viewingChannel
  );

  const history = useHistory();

  console.log("searchbox");

  const loadChannelItems = async (item) => {
    setSearchArray([]);
    setArrayLoading(true);
    try {
      const { channelId, channelInfo, searchResultsArray } =
        await getChannelItems(item);
      setViewingChannel(channelInfo);
      setSearchArray(searchResultsArray);
      history.push(
        `?channel=${searchEngineShortcuts[item.engine]}.${channelId}`
      );
    } catch (e) {
      notify("Unable to fetch channel data.");
    } finally {
      setArrayLoading(false);
    }
  };

  const loadChannelPlaylists = async (item) => {
    setSearchArray([]);
    setArrayLoading(true);
    try {
      const { channelInfo, searchResultsArray } = await getChannelPlaylists(
        item
      );
      setViewingChannel(channelInfo);
      setSearchArray(searchResultsArray);
    } catch (e) {
      notify("Unable to fetch channel data.");
    } finally {
      setArrayLoading(false);
    }
  };

  const searchForItems = async (event, newSearchString) => {
    const searchString = newSearchString || event.target.searchString.value;
    if (event?.preventDefault) event.preventDefault();
    if (!searchString && !newSearchString) {
      return;
    }
    setSearchArray([]);
    setArrayLoading(true);
    // setViewingChannel(false);
    try {
      const searchResultsArray = await fetchItems(
        searchString,
        SearchEngineDropdown.selected
      );
      setSearchArray(searchResultsArray.map(addRandomKey));
      // setViewingChannel(false);
    } catch (e) {
    } finally {
      setArrayLoading(false);
    }
  };

  const searchFromVoiceInput = (recognizedVoiceInput) => {
    const element = document.getElementById("searchInput");
    if (element) element.value = recognizedVoiceInput;
    searchForItems(null, recognizedVoiceInput);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const viewingSearch = location.pathname === "/";

  const searchForm = useRef();

  const collapsedClassName =
    viewingChannel && !viewingSearch ? "collapsed2x" : "collapsed";

  SearchBox.state = {
    viewingChannel,
  };

  return (
    <div className="searchBoxFixedContainer">
      <CollapseOnScrollContainer collapsedClassName={collapsedClassName}>
        <Form
          searchForm={searchForm}
          searchForItems={searchForItems}
          searchFromVoiceInput={searchFromVoiceInput}
        />
        {viewingChannel && (
          <ChannelInfo
            channelInfo={viewingChannel}
            loadChannelItems={loadChannelItems}
            loadChannelPlaylists={loadChannelPlaylists}
          />
        )}
      </CollapseOnScrollContainer>
    </div>
  );
};

export default React.memo(SearchBoxComponent);
