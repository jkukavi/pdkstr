import React, { useState, useEffect } from "react";
import qs from "query-string";
import { useLocation, useHistory } from "react-router";

import SearchBox from "./SearchBox";
import Cards from "../Cards";

import {
  paths,
  searchEngines,
  searchEngineShortcuts,
  searchEnginesByShortcut,
} from "../../consts";
import { addRandomKey } from "../../helpers/helpers";
import { instance as axios } from "../../contexts/axiosInstance";

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
      getChannelItemsFromId(channelId, engine);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChannelItemsFromId = async (channelId, engine) => {
    const path = paths.channelItems[engine];

    try {
      const response = await axios.post(path, {
        channelId,
      });
      const searchResultsArray = response.data.searchResultsArray;
      const channelInfo = channelInfoFromItem(searchResultsArray[0]);
      setViewingChannel({ ...channelInfo, engine });
      setSearchArray(searchResultsArray.map(addRandomKey));
    } catch (e) {
    } finally {
      setArrayLoading(false);
    }
  };

  const channelIdFromItem = (item) => {
    return {
      [searchEngines.YT]: (type) =>
        ({
          channel: item.channelID,
          [undefined]: item.channelID,
          video: item.author?.channelID,
        }[type]),
      [searchEngines.SC]: (type) =>
        ({ [undefined]: item.id, video: item.author?.id }[type]),
    }[item.engine](item.type);
  };

  const channelInfoFromItem = (item) => {
    return {
      [searchEngines.YT]: (type) =>
        ({
          channel: item,
          [undefined]: item,
          video: item.author,
        }[type]),
      [searchEngines.SC]: (type) =>
        ({ [undefined]: item, video: item.author }[type]),
    }[item.engine](item.type);
  };

  const getChannelItems = async (item) => {
    setSearchArray([]);
    setArrayLoading(true);

    const path = paths.channelItems[item.engine];

    const channelId = channelIdFromItem(item);
    const channelInfo = channelInfoFromItem(item);

    try {
      const response = await axios.post(path, {
        channelId,
      });
      const searchResultsArray = response.data.searchResultsArray;
      setViewingChannel({ ...channelInfo, engine: item.engine });
      setSearchArray(searchResultsArray.map(addRandomKey));
    } catch (e) {
    } finally {
      history.push(
        `?channel=${searchEngineShortcuts[item.engine]}.${channelId}`
      );
      setArrayLoading(false);
    }
  };

  const getChannelPlaylists = async (item) => {
    setSearchArray([]);
    setArrayLoading(true);

    const path = paths.channelPlaylists[item.engine];

    const channelId = {
      [searchEngines.YT]: (type) =>
        ({
          channel: item.channelID,
          [undefined]: item.channelID,
          video: item.author?.channelID,
        }[type]),
      [searchEngines.SC]: (type) =>
        ({ [undefined]: item.id, video: item.author?.id }[type]),
    }[item.engine](item.type);

    const channelInfo = {
      [searchEngines.YT]: (type) =>
        ({
          channel: item,
          [undefined]: item,
          video: item.author,
        }[type]),
      [searchEngines.SC]: (type) =>
        ({ [undefined]: item, video: item.author }[type]),
    }[item.engine](item.type);

    try {
      const response = await axios.post(path, {
        channelId,
      });
      const searchResultsArray = response.data.searchResultsArray;
      setViewingChannel({ ...channelInfo, engine: item.engine });
      setSearchArray(searchResultsArray.map(addRandomKey));
    } catch (e) {
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
          getChannelItems,
          getChannelPlaylists,
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
          getChannelItems,
          getChannelPlaylists,
        }}
      />
    </>
  );
};

export default Search;
