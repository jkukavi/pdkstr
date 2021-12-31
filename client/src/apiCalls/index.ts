import { paths } from "consts";
import { instance as axios } from "contexts/axiosInstance";
import { notify } from "components/Notifications";
import { searchEngines } from "consts";
import { addRandomKey } from "helpers";

export const addToHistory = async (item: AnyItem) => {
  try {
    await axios.post("/users/my/history", { item });
  } catch (e) {
    notify("Unable to record this listening to history.");
  }
};

export const addToFavourites = async (item: AnyItem) => {
  try {
    await axios.post("/users/my/favourites", { item });
    notify("Added to favourites");
  } catch (e) {
    notify("Unable to add to favourites");
  }
};

export const getPlaylistItems = async (playlist: Playlist): Promise<Item[]> => {
  const path = paths.playlistItems[playlist.engine];

  const id = playlist.id;

  let fetchedPlaylistItems = [];

  try {
    const response = await axios.post(path, {
      id,
    });
    const { playlistItems } = response.data;
    fetchedPlaylistItems = playlistItems || [];
  } catch (e) {
    notify("Something went wrong. Try again.");
  } finally {
    return fetchedPlaylistItems;
  }
};

export const fetchDirectUrl = async ({
  id,
  engine,
  url,
}: {
  id: string;
  engine: string;
  url: string;
}) => {
  const path = paths.directUrl[engine];
  const response = await axios.post(path, {
    id,
    ...(engine === searchEngines.SC && { fromUrl: url }),
  });
  const { directUrl } = response.data;
  return directUrl;
};

export const fetchItems = async (
  searchString: string,
  searchEngine: string
) => {
  const url = paths.search[searchEngine];
  const response = await axios.post(url, {
    searchString,
  });
  const searchResultsArray = response.data.searchResultsArray.map(addRandomKey);
  return searchResultsArray;
};

const getChannelIdFromPlaylist = (item: any) => {
  return {
    [searchEngines.YT]: (type: AnyItem["type"]) =>
      ({
        channel: item.channelID,
        playlist: item.channelID,
        video: item.author?.channelID,
      }[type]),
    [searchEngines.SC]: (type: AnyItem["type"]) =>
      ({ playlist: item.id, video: item.author?.id, channel: item.id }[type]),
  }[item.engine](item.type);
};

const getChannelInfoFromPlaylist = (item: any) => {
  return {
    [searchEngines.YT]: (type: AnyItem["type"]) =>
      ({
        channel: item,
        playlist: item,
        video: item.author,
      }[type]),
    [searchEngines.SC]: (type: AnyItem["type"]) =>
      ({ playlist: item, video: item.author, channel: item }[type]),
  }[item.engine](item.type);
};

export const getChannelPlaylists = async (item: AnyItem) => {
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

const channelIdFromItem = (item: any) => {
  return {
    [searchEngines.YT]: (type: AnyItem["type"]) =>
      ({
        channel: item.channelID,
        playlist: item.channelID,
        video: item.author?.channelID,
      }[type]),
    [searchEngines.SC]: (type: AnyItem["type"]) =>
      ({ playlist: item.id, video: item.author?.id, channel: item.id }[type]),
  }[item.engine](item.type);
};

const channelInfoFromItem = (item: any) => {
  return {
    [searchEngines.YT]: (type: AnyItem["type"]) =>
      ({
        channel: item,
        playlist: item,
        video: item.author,
      }[type]),
    [searchEngines.SC]: (type: AnyItem["type"]) =>
      ({ playlist: item, video: item.author, channel: item }[type]),
  }[item.engine](item.type);
};

export const getChannelItems = async (item: AnyItem) => {
  const path = paths.channelItems[item.engine];
  debugger;

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

export const getChannelItemsFromId = async (
  channelId: string,
  engine: Engine
) => {
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
