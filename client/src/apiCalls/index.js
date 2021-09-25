import { paths } from "../consts";
import { instance as axios } from "../contexts/axiosInstance";
import { notify } from "../components/Notifications";
import { searchEngines } from "../consts";
import { addRandomKey } from "../helpers/helpers";

export const addToHistory = async (item) => {
  try {
    await axios.post("/users/my/history", { item });
  } catch (e) {
    notify("Unable to record this listening to history.");
  }
};

export const addToFavourites = async (item) => {
  try {
    await axios.post("/users/my/favourites", { item });
    notify("Added to favourites");
  } catch (e) {
    notify("Unable to add to favourites");
  }
};

export const getPlaylistItems = async (playlist) => {
  const path = paths.playlistItems[playlist.engine];

  const id = playlist.id;

  try {
    const response = await axios.post(path, {
      id,
    });
    const { playlistItems } = response.data;
    return playlistItems;
  } catch (e) {
    notify("Something went wrong. Try again.");
  }
};

const getChannelIdFromPlaylist = (item) => {
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

const getChannelInfoFromPlaylist = (item) => {
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

export const getChannelPlaylists = async (item) => {
  const path = paths.channelPlaylists[item.engine];

  const channelId = getChannelIdFromPlaylist(item);
  const channelInfo = getChannelInfoFromPlaylist(item);

  const response = await axios.post(path, {
    channelId,
  });

  const searchResultsArray = response.data.searchResultsArray.map(addRandomKey);

  return {
    channelInfo: { ...channelInfo, engine: item.engine },
    searchResultsArray,
  };
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

export const getChannelItems = async (item) => {
  const path = paths.channelItems[item.engine];

  const channelId = channelIdFromItem(item);
  const channelInfo = channelInfoFromItem(item);

  const response = await axios.post(path, {
    channelId,
  });
  const searchResultsArray = response.data.searchResultsArray.map(addRandomKey);

  return {
    channelId,
    channelInfo: { ...channelInfo, engine: item.engine },
    searchResultsArray,
  };
};

export const getChannelItemsFromId = async (channelId, engine) => {
  const path = paths.channelItems[engine];

  const response = await axios.post(path, {
    channelId,
  });
  const searchResultsArray = response.data.searchResultsArray.map(addRandomKey);
  const channelInfo = channelInfoFromItem(searchResultsArray[0]);

  return {
    channelInfo: { ...channelInfo, engine },
    searchResultsArray,
  };
};
