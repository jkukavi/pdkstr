import { paths } from "consts";
import { instance as axios } from "contexts/axiosInstance";
import { notify } from "components/Notifications";
import { addRandomKey } from "helpers";

export const tryRestartingService = async () => {
  try {
    await axios.post("/service/restart");
    notify("Successfuly restarted.");
  } catch (e) {
    notify(
      "Unable to restart service. Could be that you have unsufficient permissions."
    );
  }
};

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
  engine: Engine;
  url: string;
}) => {
  const path = paths.directUrl[engine];
  const response = await axios.post(path, {
    id,
    ...(engine === "soundcloud" && { fromUrl: url }),
  });
  const { directUrl } = response.data;
  return directUrl;
};

export const fetchItems = async (
  searchString: string,
  searchEngine: Engine
) => {
  const url = paths.search[searchEngine];
  const response = await axios.post(url, {
    searchString,
  });
  const searchResultsArray = response.data.searchResultsArray.map(addRandomKey);
  return searchResultsArray;
};

const getChannelIdFromItem = (item: any): string => {
  return {
    youtube: (type: AnyItem["type"]) =>
      ({
        channel: item.channelID,
        playlist: item.channelID,
        video: item.author?.channelID,
      }[type]),
    soundcloud: (type: AnyItem["type"]) =>
      ({ playlist: item.id, video: item.author?.id, channel: item.id }[type]),
  }[item.engine as Engine](item.type);
};

const getChannelInfoFromItem = (item: any) => {
  return {
    youtube: (type: AnyItem["type"]) =>
      ({
        channel: item,
        playlist: item,
        video: item.author,
      }[type]),
    soundcloud: (type: AnyItem["type"]) =>
      ({ playlist: item, video: item.author, channel: item }[type]),
  }[item.engine as Engine](item.type);
};

export const getChannelPlaylists = async (item: AnyItem) => {
  const path = paths.channelPlaylists[item.engine];

  const channelId = getChannelIdFromItem(item);
  const channelInfo = getChannelInfoFromItem(item);

  const response = await axios.post(path, {
    channelId,
  });

  const searchResultsArray = response.data.searchResultsArray.map(addRandomKey);

  return {
    channelInfo: { ...channelInfo, engine: item.engine },
    searchResultsArray,
  };
};

const channelIdFromItem = (item: any): string => {
  return {
    youtube: (type: AnyItem["type"]) =>
      ({
        channel: item.channelID,
        playlist: item.channelID,
        video: item.author?.channelID,
      }[type]),
    soundcloud: (type: AnyItem["type"]) =>
      ({ playlist: item.id, video: item.author?.id, channel: item.id }[type]),
  }[item.engine as Engine](item.type);
};

const channelInfoFromItem = (item: any) => {
  return {
    youtube: (type: AnyItem["type"]) =>
      ({
        channel: item,
        playlist: item,
        video: item.author,
      }[type]),
    soundcloud: (type: AnyItem["type"]) =>
      ({ playlist: item, video: item.author, channel: item }[type]),
  }[item.engine as Engine](item.type);
};

export const getChannelItems = async (item: AnyItem) => {
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

export const ping = async (engine: Engine): Promise<void> => {
  const path = paths.ping[engine];

  await axios.get(path);
};
