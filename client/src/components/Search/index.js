import React, { useState, useEffect } from "react";
import qs from "query-string";
import { useLocation, useHistory } from "react-router";

import SearchBox from "./SearchBox";
import Cards from "../Cards";

import { searchEngineShortcuts, searchEnginesByShortcut } from "../../consts";
import {
  getChannelItems,
  getChannelPlaylists,
  getChannelItemsFromId,
} from "../../apiCalls";

import { notify } from "../Notifications";

const Search = ({ cardProps, ...rest }) => {
  const [searchArray, setSearchArray] = useState([]);
  const [arrayLoading, setArrayLoading] = useState(false);
  const [viewingChannel, setViewingChannel] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const queryString = qs.parse(location.search);
    if (queryString.channel) {
      const [engineShortcut, channelId] = queryString.channel.split(".");
      const engine = searchEnginesByShortcut[engineShortcut];
      loadChannelItemsFromId(channelId, engine);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadChannelItemsFromId = async (channelId, engine) => {
    try {
      const { channelInfo, searchResultsArray } = await getChannelItemsFromId(
        channelId,
        engine
      );
      setViewingChannel(channelInfo);
      setSearchArray(searchResultsArray);
    } catch (e) {
      notify("Unable to fetch channel data.");
    } finally {
      setArrayLoading(false);
    }
  };

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

  return (
    <>
      <SearchBox
        {...{
          ...rest,
          setSearchArray,
          setArrayLoading,
          loadChannelItems,
          loadChannelPlaylists,
          viewingChannel,
          setViewingChannel,
        }}
      />
      <Cards
        {...{
          ...cardProps,
          searchArray,
          arrayLoading,
          viewingChannel,
          loadChannelItems,
        }}
      />
    </>
  );
};

export default Search;
