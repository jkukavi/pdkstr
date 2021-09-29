import React, { useState, useRef } from "react";

import { useLocation } from "react-router";

import { addRandomKey } from "../../../helpers/helpers";

import { paths, searchEngines } from "../../../consts";

import Form from "./Form";

import { instance as axios } from "../../../contexts/axiosInstance";

import ChannelInfo from "../../ChannelInfo";

import CollapseOnScrollContainer from "./CollapseOnScrollContainer";

const SearchBox = ({
  setSearchArray,
  setArrayLoading,
  setViewingChannel,
  viewingChannel,
  loadChannelItems,
  loadChannelPlaylists,
}) => {
  const location = useLocation();
  const [searchEngine, setSearchEngine] = useState(searchEngines.YT);

  const searchYoutube = async (event, newSearchString) => {
    const searchString = newSearchString || event.target.searchString.value;

    if (event?.preventDefault) event.preventDefault();
    if (!searchString && !newSearchString) {
      return;
    }
    setSearchArray([]);
    setArrayLoading(true);
    setViewingChannel(false);
    const url = paths.search[searchEngine];
    try {
      const response = await axios.post(url, {
        searchString,
      });
      const searchResultsArray = response.data.searchResultsArray;
      setSearchArray(searchResultsArray.map(addRandomKey));
      setViewingChannel(false);
    } catch (e) {
    } finally {
      setArrayLoading(false);
    }
  };

  const searchFromVoiceInput = (recognizedVoiceINput) => {
    const element = document.getElementById("searchInput");
    if (element) element.value = recognizedVoiceINput;
    searchYoutube(null, recognizedVoiceINput);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const viewingSearch = location.pathname === "/";

  const searchForm = useRef();

  const collapsedClassName =
    viewingChannel && !viewingSearch ? "collapsed2x" : "collapsed";

  return (
    <div className="searchBoxFixedContainer">
      <CollapseOnScrollContainer collapsedClassName={collapsedClassName}>
        <Form
          searchForm={searchForm}
          searchYoutube={searchYoutube}
          searchEngine={searchEngine}
          searchFromVoiceInput={searchFromVoiceInput}
          setSearchEngine={setSearchEngine}
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

export default SearchBox;
